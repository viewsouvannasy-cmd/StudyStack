import { getEnv } from "./getEnv.js";
import jwt from "jsonwebtoken";

function generateOtpToken(user_name: string, otpHash: string) {
  return jwt.sign(
    { user_name, otp_hash: otpHash },
    getEnv("OTP_TOKEN_SECRET"),
    {
      expiresIn: "5m",
    },
  );
}

function generateAccessToken(user_id: string) {
  return jwt.sign({ user_id }, getEnv("ACCESS_TOKEN_SECRET"), {
    expiresIn: "30m",
  });
}

function generateRefreshToken(user_id: string) {
  return jwt.sign({ user_id }, getEnv("REFRESH_TOKEN_SECRET"), {
    expiresIn: "15d",
  });
}

export { generateOtpToken, generateAccessToken, generateRefreshToken };
