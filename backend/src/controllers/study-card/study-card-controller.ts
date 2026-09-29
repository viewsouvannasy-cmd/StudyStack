// library
import { Response, Request, NextFunction } from "express";

// helper function
import { getEnv } from "../../utils/getEnv.js";
import {
  extractVideoId,
  matchChapterWithTranscript,
  getTranscript,
  getVideoChapter,
} from "../../utils/hanlderYouTubeVideo.js";

// constants
import { ANALYSIS_YOUTUBE_VIDEO } from "./../../constants/system-prompt.js";

const createStudyCard = async (
  req: Request<{}, {}, { video_link: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { video_link } = req.body;

    const videoId = extractVideoId(video_link);
    if (!videoId) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "invalid Youtube URL",
      });
    }

    const transcript = await getTranscript(videoId);
    if (!transcript) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "can not get transcript from this video",
      });
    }

    const videoDatail = await getVideoChapter(videoId, video_link);
    if (!videoDatail || !videoDatail.chapters) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "this video is not have an any chapters",
      });
    }

    const videoDatailWithTranscript = await matchChapterWithTranscript(
      transcript,
      videoDatail,
    );

    const fullTranscript = videoDatailWithTranscript.chapters
      .map((item) => item.transcript)
      .join();

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getEnv("OPENROUTER_API_KEY")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "dots-studio/dots-3-note-preview:free",
          messages: [
            {
              role: "system",
              content: ANALYSIS_YOUTUBE_VIDEO,
            },
            {
              role: "user",
              content: fullTranscript,
            },
          ],
        }),
      },
    );

    const result = await response.json();

    const raw: string = result.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();

    res.status(200).json({
      ok: true,
      result: JSON.parse(cleaned),
    });
  } catch (error) {
    next(error);
  }
};

export { createStudyCard };
