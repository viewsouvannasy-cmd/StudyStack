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

export const getVideoChapter = async (videoId: string) => {
  try {
    const res = await youtube.videos.list({
      part: ["snippet"],
      id: [videoId],
    });

    const description = res.data.items?.[0]?.snippet?.description;
    if (!description) {
      return null;
    }

    const regex = /^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)$/gm;
    const chapters: Chapter[] = [];
    let match;

    while ((match = regex.exec(description)) !== null) {
      const [, time, title] = match;
      chapters.push({
        time,
        seconds: timeToSeconds(time),
        title: title.trim(),
      });
    }

    const isValid = chapters.length >= 3 && chapters[0].seconds === 0;

    return isValid ? chapters : null;
  } catch (error) {
    console.log("Fail to get chapters", error);
    return null;
  }
};

function timeToSeconds(time: string): number {
  const parts = time.split(":").map(Number);
  return parts.reduce((acc, val) => acc * 60 + val, 0);
}

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

export const getTranscript = async (videoId: string) => {
  const result =
    getEnv("NODE_ENV") === "production"
      ? await productionTranscript(videoId)
      : await devTranscript(videoId);

  return result;
};

export const matchChapterWithTranscript = async (
  transcript: TranscriptResponseDev[] | TranscriptResponseProduction[],
  chapters: Chapter[],
) => {
  const result: {
    chapter: number;
    time: string;
    title: string;
    transcript: string;
  }[] = [];

  let transcriptIndex = 0;

  for (let i = 0; i < chapters.length; i++) {
    result.push({
      chapter: 1 + i,
      time: chapters[i].time,
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

      result[i].transcript += seg.text;
    }

    transcriptIndex = j;

    await yieldToEventLoop();
  }

  return result;
};

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
