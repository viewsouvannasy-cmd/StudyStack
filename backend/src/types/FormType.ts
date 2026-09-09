export interface UserForm {
  user_email: string;
  user_name: string;
  user_password: string;
}

export interface UserFormOtp extends UserForm {
  otp_code: string;
}

export interface ResponseForm {
  ok: boolean;
  point?: string;
  msg?: string;
}
