// library
import { YoutubeTranscript } from "youtube-transcript";
import axios from "axios";

// config
import youtube from "../config/googleServices.js";

// component
import { getEnv } from "./getEnv.js";

interface TranscriptResponseDev {
  text: string;
  duration: number;
  offset: number;
}

interface TranscriptResponseProduction {
  text: string;
  start: number;
  duration: number;
}

interface Chapter {
  time: string;
  seconds: number;
  title: string;
}

export interface ChapterMatchTranscript {
  chapter: number;
  start_second: number;
  title: string;
  transcript: string;
}

interface VideoDetail {
  channel: string | null | undefined;
  title: string | null | undefined;
  total_chapters: number;
  total_length_seconds: number | undefined;
  video_thumbnail_url: string | null | undefined;
  instructor: string | null;
  license: string | null;
  chapters: Chapter[] | null;
}

export interface VideoFullDatail {
  channel: string | null | undefined;
  title: string | null | undefined;
  total_chapters: number;
  total_length_seconds: number | undefined;
  source_type: string;
  video_thumbnail_url: string | null | undefined;
  instructor: string | null;
  license: string | null;
  chapters: ChapterMatchTranscript[];
}

// this function is use extreact video id
export function extractVideoId(input: string): string | null {
  if (/^[\w-]{11}$/.test(input)) return input;

  try {
    const url = new URL(input);
    if (url.hostname === "youtu.be") return url.pathname.slice(1, 12);
    if (url.hostname.endsWith("youtube.com")) {
      const v = url.searchParams.get("v");
      if (v) return v;
      const m = url.pathname.match(/^\/(shorts|embed|live)\/([\w-]{11})/);
      if (m) return m[2];
    }
  } catch {
    return null;
  }
  return null;
}

// this function is use get transcript on dev
const devTranscript = async (
  videoId: string,
  preferredLangs = ["en", "th"],
): Promise<TranscriptResponseDev[] | null> => {
  for (const lang of preferredLangs) {
    try {
      const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
        lang,
      });
      return transcript;
    } catch (e) {
      continue;
    }
  }
  console.log("Fail to get transcript");
  return null;
};

// this function use get transcript on the production
const productionTranscript = async (
  videoId: string,
): Promise<TranscriptResponseProduction[] | null> => {
  try {
    const res = await axios.get(
      `https://transcriptapi.com/api/v2/youtube/transcript?video_url=${videoId}`,
      { headers: { Authorization: `Bearer ${getEnv("TRANSCRIPT_API_KEY")}` } },
    );

    return res.data.transcript;
  } catch (error) {
    console.log("Fail to get transcript", error);
    return null;
  }
};

// get chapter for the youtube video
export const getVideoChapter = async (
  videoId: string,
): Promise<VideoDetail | null> => {
  try {
    const res = await youtube.videos.list({
      part: ["snippet", "contentDetails"],
      id: [videoId],
    });

    const description = res.data.items?.[0]?.snippet?.description;
    if (!description) {
      return null;
    }

    const instructorRegex =
      /^\s*(?:instructors?|speakers?|presented by|taught by|lecturer)\s*[:\-–]\s*(.+?)\s*$/im;

    const licenseRegex =
      /^\s*(?:licen[sc]e|licensed under)\s*[:\-–]?\s*(.+?)\s*$/im;

    const chapterRegex =
      /^[ \t]*(?:[-•*·▪●]\s*)?\[?(\d{1,2}:\d{2}(?::\d{2})?)\]?(?:\([^)\s]*\))?(?:[^\S\r\n]+|[^\S\r\n]*\r?\n\s*)[-–—]?\s*([^\r\n]+?)\s*$/gm;

    const chapters: Chapter[] = [];

    let match;

    while ((match = chapterRegex.exec(description)) !== null) {
      const [, time, title] = match;
      chapters.push({
        time,
        seconds: timeToSeconds(time),
        title: title.trim(),
      });
    }

    const isValid = chapters.length >= 3 && chapters[0].seconds === 0;

    const chapterAndDetail: VideoDetail = {
      channel: res.data.items?.[0]?.snippet?.channelTitle,
      title: res.data.items?.[0]?.snippet?.title,
      total_chapters: chapters.length,
      total_length_seconds: isoDurationToSeconds(
        res.data.items?.[0]?.contentDetails?.duration,
      ),
      video_thumbnail_url:
        res.data.items?.[0]?.snippet?.thumbnails?.standard?.url,
      instructor: extract(description, instructorRegex),
      license: extract(description, licenseRegex),
      chapters: isValid ? chapters : null,
    };

    return chapterAndDetail;
  } catch (error) {
    console.log("Fail to get chapters", error);
    return null;
  }
};

function timeToSeconds(time: string): number {
  const parts = time.split(":").map(Number);
  return parts.reduce((acc, val) => acc * 60 + val, 0);
}

// get transcript follow the state
export const getTranscript = async (videoId: string) => {
  const result =
    getEnv("NODE_ENV") === "production"
      ? await productionTranscript(videoId)
      : await devTranscript(videoId);

  return result;
};

// match transcript to it own chapters
export const matchChapterWithTranscript = async (
  transcript: TranscriptResponseDev[] | TranscriptResponseProduction[],
  videoDetail: VideoDetail,
) => {
  const result: VideoFullDatail = {
    channel: videoDetail.channel,
    title: videoDetail.title,
    total_chapters: videoDetail.total_chapters,
    total_length_seconds: videoDetail.total_length_seconds,
    video_thumbnail_url: videoDetail.video_thumbnail_url,
    instructor: videoDetail.instructor,
    license: videoDetail.license,
    source_type: "",
    chapters: [],
  };

  const chapters = videoDetail.chapters!;

  let transcriptIndex = 0;
  for (let i = 0; i < chapters.length; i++) {
    result.chapters.push({
      chapter: 1 + i,
      start_second: chapters[i].seconds,
      title: chapters[i].title,
      transcript: "",
    });
    const start = chapters[i].seconds;
    const end = i + 1 < chapters.length ? chapters[i + 1].seconds : Infinity;

    let j = transcriptIndex;
    for (; j < transcript.length; j++) {
      const seg = getSegmentShape(transcript[j]);

      if (seg.start < start) {
        continue;
      }

      if (seg.start > end) {
        break;
      }

      result.chapters[i].transcript += " " + seg.text;
    }

    transcriptIndex = j;

    await yieldToEventLoop();
  }

  return result;
};

// ----- help function ------

function yieldToEventLoop() {
  return new Promise((resolve) => setImmediate(resolve));
}

function getSegmentShape(
  item: TranscriptResponseDev | TranscriptResponseProduction,
) {
  return "offset" in item
    ? { text: item.text, start: item.offset / 1000, duration: item.duration }
    : { text: item.text, start: item.start, duration: item.duration };
}

function isoDurationToSeconds(iso: string | null | undefined) {
  if (!iso) {
    return;
  }

  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);

  return hours * 3600 + minutes * 60 + seconds;
}

function extract(text: string, regex: RegExp): string | null {
  const match = text.match(regex);
  if (!match) return null;

  const value = match[1].trim();

  return value;
}
