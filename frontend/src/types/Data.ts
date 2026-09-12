export interface User {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string | null;
  provider: string | null;
  refresh_token: string | null;
  profile_url: string | null;
  image_id: string | null;
  create_at: Date;
  update_at: Date;
}
