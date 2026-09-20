// library
import { Response, Request, NextFunction } from "express";

// helper function
import { getEnv } from "../../utils/getEnv.js";
import {
  extractVideoId,
  getTranscript,
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

    const videoTranscript = await getTranscript(videoId);
    if (!videoTranscript) {
      return res
        .status(400)
        .json({
          ok: false,
          point: "input-youtube-url",
          msg: "Can not use this video",
        });
    }

    // let response = await fetch(
    //   "https://openrouter.ai/api/v1/chat/completions",
    //   {
    //     method: "POST",
    //     headers: {
    //       Authorization: `Bearer ${getEnv("OPENROUTER_API_KEY")}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       model: "deepseek/deepseek-v4-flash-0731:free",
    //       messages: [
    //         {
    //           role: "user",
    //           content: "what is model and what you good at",
    //         },
    //       ],
    //     }),
    //   },
    // );

    // const result = await response.json();
    // console.log(result.choices[0].message.content);

    res.status(200).json({ ok: true, results: videoTranscript });
  } catch (error) {
    next(error);
  }
};

export { createNotebook };
