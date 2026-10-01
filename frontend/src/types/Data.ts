export interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: boolean;
  profile_url: string | null;
  image_id: string | null;
  create_at: Date;
  update_at: Date;
}

export interface StudyCard {
  sci_id: number;
  credit_source: string;
  sci_name: string;
  color: "blue" | "violet" | "amber" | "rose" | "teal" | "green";
  title: string;
  total_chapters: number;
  total_length_seconds: number;
  video_thumbnail_url: string;
  create_at: Date;
}
