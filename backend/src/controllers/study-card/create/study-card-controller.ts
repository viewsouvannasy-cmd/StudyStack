// library
import { Response, Request, NextFunction } from "express";
import { sql } from "../../../config/database.js";

// query
import {
  writePublicStudyCard,
  writeStudyCard,
  writePublicChaptersAndUserChapters,
  writeUserChapter,
} from "./sc-query.js";

// helper function
import { getEnv } from "../../../utils/getEnv.js";
import {
  extractVideoId,
  matchChapterWithTranscript,
  getTranscript,
  getVideoChapter,
} from "../../../utils/hanlderYouTubeVideo.js";

// constants
import { ANALYSIS_YOUTUBE_VIDEO } from ".././../../constants/system-prompt.js";

const createStudyCard = async (
  req: Request<
    {},
    {},
    { user_id: number; card_name: string; color: string; video_url: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id, card_name, color, video_url } = req.body;

    if (!color || !video_url) {
      return res.status(400).json({
        ok: false,
        msg: "Please provide all requires",
      });
    }

    // get video id for video url
    const videoId = extractVideoId(video_url);
    if (!videoId) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "invalid Youtube URL",
      });
    }

    // check existing video to reuse it
    const findExistVideo = (await sql`
    SELECT 
    pc.pc_id
    FROM public_study_card_items as psci
    INNER JOIN public_chapters as pc
    ON psci.psci_id = pc.psci_id
    WHERE psci.psci_id = ${videoId}
    `) as { pc_id: number }[];
    if (findExistVideo.length > 0) {
      const [isUserAlreadyHave] = await sql`
      SELECT 
      * 
      FROM study_card_items 
      WHERE user_id = ${user_id} 
      AND psci_id = ${videoId}
      `;
      if (isUserAlreadyHave) {
        return res.status(400).json({
          ok: false,
          point: "input-youtube-video",
          msg: "You are already have one",
        });
      }

      const studyCardItem = await writeStudyCard(
        user_id,
        card_name,
        color,
        videoId,
      );

      // create user chapter
      await writeUserChapter(findExistVideo, studyCardItem);

      res.status(200).json({
        ok: true,
        msg: "Create successfull",
      });
    }

    // get video transcript
    const transcript = await getTranscript(videoId);
    if (!transcript) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "can not get transcript from this video",
      });
    }

    // get video chapters and detail
    const videoDatail = await getVideoChapter(videoId);
    if (!videoDatail || !videoDatail.chapters) {
      return res.status(400).json({
        ok: false,
        point: "input-youtube-url",
        msg: "this video is not have an any chapters",
      });
    }

    // match transcript to it own chapter
    const videoFullDatail = await matchChapterWithTranscript(
      transcript,
      videoDatail,
    );

    const shortTranscript = videoFullDatail.chapters
      .slice(0, 2)
      .map((item) => item.transcript)
      .join();
    // request to ai to get analysis the source type
    // ai will return be text  Json format
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
              content: shortTranscript,
            },
          ],
        }),
      },
    );

    const resultResponse = await response.json();

    // change text to exact JSON and parse it
    const raw: string = resultResponse.choices?.[0]?.message?.content ?? "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const paresValue = JSON.parse(cleaned);

    // add source type to video detail
    videoFullDatail.source_type = paresValue.source_type;

    // create pulice study card item
    await writePublicStudyCard(videoFullDatail, videoId, video_url);

    // create a user study card
    const studyCardItem = await writeStudyCard(
      user_id,
      card_name,
      color,
      videoId,
    );

    // create a public chapters and user chapter
    await writePublicChaptersAndUserChapters(
      videoFullDatail,
      videoId,
      studyCardItem,
    );

    res.status(200).json({
      ok: true,
      msg: "Create successfull",
    });
  } catch (error) {
    next(error);
  }
};

export { createStudyCard };
