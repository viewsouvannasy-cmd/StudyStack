import { sql } from "../../../config/database.js";

import type {
  VideoFullDatail,
  ChapterMatchTranscript,
} from "../../../utils/hanlderYouTubeVideo.js";

export const writePublicStudyCard = async (
  videoFullDatail: VideoFullDatail,
  videoId: string,
  video_url: string,
) => {
  await sql`
    INSERT INTO public_study_card_items (psci_id ,title, total_chapters, total_length_seconds, source_type, instructor, video_url, video_thumbnail_url, license, psci_type, is_reusable)
    VALUES (
    ${videoId},
    ${videoFullDatail.title},
    ${videoFullDatail.total_chapters},
    ${videoFullDatail.total_length_seconds},
    ${videoFullDatail.source_type},
    ${videoFullDatail.instructor},
    ${video_url},
    ${videoFullDatail.video_thumbnail_url},
    ${videoFullDatail.license},
    'YouTube video',
    ${true}
    )
    `;
};

export const writeStudyCard = async (
  user_id: number,
  card_name: string,
  color: string,
  videoId: string,
) => {
  const [studyCardItem] = (await sql`
    INSERT INTO study_card_items (user_id, sci_name, color, psci_id)
    VALUES (
    ${user_id},
    ${!card_name ? "Untitled" : card_name},
    ${color},
    ${videoId}
    )
    RETURNING sci_id
    `) as { sci_id: number }[];

  return studyCardItem;
};

export const writePublicChaptersAndUserChapters = async (
  videoFullDatail: VideoFullDatail,
  videoId: string,
  studyCardItem: { sci_id: number },
) => {
  for (let i = 0; i < videoFullDatail.chapters.length; i++) {
    const [publicChapters] = (await sql`
      INSERT INTO public_chapters (psci_id, pc_title, start_time , pc_number, transcript)
      VALUES (
      ${videoId},
      ${videoFullDatail.chapters[i].title},
      ${videoFullDatail.chapters[i].start_second},
      ${videoFullDatail.chapters[i].chapter},
      ${videoFullDatail.chapters[i].transcript}
      )
      RETURNING pc_id
      `) as { pc_id: number }[];

    await sql`INSERT INTO chapters (sci_id, pc_id, is_generated)
      VALUES (
      ${studyCardItem.sci_id},
      ${publicChapters.pc_id},
      ${i === 0 ? true : false}
      )
      `;
  }
};

export const writeUserChapter = async (
  chapters: { pc_id: number }[],
  studyCardItem: { sci_id: number },
) => {
  for (let i = 0; i < chapters.length; i++) {
    await sql`INSERT INTO chapters (sci_id, pc_id, is_generated)
      VALUES (
      ${studyCardItem.sci_id},
      ${chapters[i].pc_id},
      ${i === 0 ? true : false}
      )
      `;
  }
};
