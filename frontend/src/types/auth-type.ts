export interface ResponseStatus {
  ok: boolean;
  point?: string;
  msg?: string;
}

export interface ResponseOtp extends ResponseStatus {
  accessToken: string;
}

export interface authAccept {
  user_email: string;
  user_name: string;
  user_password: string;
}

export interface authAcceptOtp extends authAccept {
  otp_code: string;
}
