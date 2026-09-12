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
