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
              content: `You analyze YouTube video transcripts
              Respond ONLY with valid JSON, no markdown and no extra text.
              Use exactly this shape:
              {
                "summary": string,
                "by_the_end": {"able": string, "description": string}[]
              }

              SUMMARY STYLE (very important):
              - Exactly 2 sentences.
              - Sentence 1: explain the core idea of the topic itself, as if teaching it in plain words. State the knowledge directly.
              - Sentence 2: start with "This video explains..." and say what questions or parts of the topic the video answers.
              - Use simple language. If a technical term is needed, explain it in parentheses.
              - NEVER narrate what the speaker did. Do NOT use phrases like "The lecture introduces", "The speaker outlines", "The session then moves to", "Finally,".
              - NEVER list the video's sections in order like a table of contents.

              Example of the exact style wanted:
              "Prices in a market come from buyers (demand) meeting sellers (supply). This video explains how each side reacts when prices change, and where the equilibrium price settles."
                          
              BY_THE_END RULES:
              - 3-6 items describing what the viewer will be able to do after watching.
              - "able": ONE word only, chosen from this list exactly:
                Explain, Read, Analyze, Calculate, Compare, Apply, Identify, Understand
              - "description": a short noun phrase (3-10 words) naming the topic, NOT a full sentence.
                No verb at the start, no period at the end.
              - Use the topic's own names and terms from the transcript.
              - Only include what is actually covered in the transcript. Do not invent content.

              "able" must be one of these, chosen by what the video ACTUALLY teaches:
              - Understand: the video teaches a concept or idea (theory, how something works)
              - Apply: the video shows how to do or build something (steps, tools, coding, practice)
              - Identify: the video teaches how to recognize or tell things apart
              - Compare: the video contrasts two or more options
              - Calculate: the video works through numbers, formulas, or math
              - Read: the video teaches how to interpret graphs, charts, code, or documents
              - Explain: ONLY if the video is deep enough that the viewer could teach it to others (use sparingly)
              - Analyze: ONLY if the video evaluates cause and effect, or breaks down data or arguments

              Example of the exact style wanted:
              "by_the_end": [
                { "able": "Explain", "description": "The law of demand and the law of supply" },
                { "able": "Read", "description": "Supply and demand graphs" },
                { "able": "Analyze", "description": "How price changes shift the equilibrium" }
              ]
              `,
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
      fullTranscript,
    });
  } catch (error) {
    next(error);
  }
};

export { createStudyCard };
