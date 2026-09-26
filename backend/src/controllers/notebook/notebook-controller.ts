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

const createNotebook = async (
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

    const videoChapter = await getVideoChapter(videoId);
    if (!videoChapter) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "this video is not have an any chapters",
      });
    }

    const results = await matchChapterWithTranscript(transcript, videoChapter);

    // const results = await getVideoChapter(videoId);

    // let response = await fetch(
    //   "https://openrouter.ai/api/v1/chat/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${getEnv("OPENROUTER_API_KEY")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       model: "deepseek/deepseek-v4-flash-0731",
    //       messages: [
    //         {
    //           role: "user",
    //           content: "what is your model and what you good at",
    //         },
    //       ],
    //     }),
    //   },
    // );

    // const results = await response.json();

    res.status(200).json({ ok: true, results });
  } catch (error) {
    next(error);
  }
};

export { createNotebook };
