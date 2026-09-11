//  library
import { sql } from "../config/database.js";
import { Request, Response, NextFunction } from "express";
import bcryto from "bcrypt";
import jwt from "jsonwebtoken";

// service
import { generateOtp } from "../service/emailService.js";

// hepler function
import {
  generateOtpToken,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import {
  generateCookieShortLive,
  generateCookieRefresh,
} from "../utils/generateCookie.js";
import { getEnv } from "../utils/getEnv.js";

// service
import { sendMailOtp } from "../service/emailService.js";

// type
import type { UserForm, ResponseForm, UserFormOtp } from "../types/FormType.js";
import type { JwtPayload } from "jsonwebtoken";

const createAccount = async (
  req: Request<{}, ResponseForm, UserForm>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_email, user_name } = req.body;

    // check duplicate name
    const isDuplicatrName = await sql`
    SELECT
    *
    FROM users
    WHERE user_name = ${user_name}
    `;
    if (isDuplicatrName.length !== 0) {
      return res
        .status(400)
        .json({ ok: false, point: "name", msg: "this name is already taken" });
    }

    // check duplicate email
    const isDuplicateEmail = await sql`
    SELECT
    *
    FROM users
    WHERE user_email = ${user_email}
    `;
    if (isDuplicateEmail.length !== 0) {
      return res
        .status(400)
        .json({ ok: false, point: "email", msg: "invalid email" });
    }

    // generate otp code be string
    const otpCode = generateOtp();

    // send mail
    const sendMail = sendMailOtp(user_email, otpCode);
    if (!sendMail) {
      return res.status(500).json({
        ok: false,
        msg: "Something was wrong when try to send mail. Try again",
      });
    }

    const otpHash = await bcryto.hash(otpCode, 10);
    const otpToken = generateOtpToken(user_name, user_email, otpHash);

    res.cookie("ss_session_otp", otpToken, generateCookieShortLive());

    res
      .status(202)
      .json({ ok: true, msg: "we have been send mail to your email" });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (
  req: Request<{}, ResponseForm, UserFormOtp>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_email, user_name, user_password, otp_code } = req.body;
    const cookieOtp = req.cookies.ss_session_otp;

    if (!cookieOtp) {
      return res.status(401).json({
        ok: false,
        point: "otp",
        msg: "otp is was expires",
      });
    }

    if (!otp_code || isNaN(Number(otp_code))) {
      return res
        .status(400)
        .json({ ok: false, point: "otp", msg: "invalid otp" });
    }

    if (otp_code.length < 6) {
      return res
        .status(400)
        .json({ ok: false, point: "otp", msg: "invalid otp" });
    }

    // check vail otp code
    const payload = jwt.verify(
      cookieOtp,
      getEnv("OTP_TOKEN_SECRET"),
    ) as JwtPayload;
    const compareOtp = await bcryto.compare(otp_code, payload.otp_hash);
    if (
      payload.user_name !== user_name ||
      payload.user_email !== user_email ||
      !compareOtp
    ) {
      return res
        .status(401)
        .json({ ok: false, point: "otp", msg: "invalid otp" });
    }

    const passwordHash = await bcryto.hash(user_password, 10);
    // store user into database
    const [{ user_id }] = await sql`
    INSERT INTO users (user_name, user_email, user_password)
    VALUES (
    ${user_name},
    ${user_email},
    ${passwordHash}
    )
    RETURNING user_id
    `;

    // create access and refresh token
    const accessToken = generateAccessToken(user_id);
    const refreshToken = generateRefreshToken(user_id);

    const refreshTokenHash = await bcryto.hash(refreshToken, 10);
    // store refresh hash token to database
    await sql`
    UPDATE users
    SET refresh_token = ${refreshTokenHash}
    WHERE user_id = ${user_id}
    `;

    // set cookie
    res.cookie("ss_session", refreshToken, generateCookieRefresh());

    res.status(202).json({ ok: false, accessToken });
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (
  req: Request<{}, ResponseForm, { user_EON: string; user_password: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // EON mean email or name
    const { user_EON, user_password } = req.body;

    if (user_EON.length > 50) {
      return res
        .status(401)
        .json({ ok: false, point: "login", msg: "not found account" });
    }

    if (user_EON.length < 3) {
      return res
        .status(401)
        .json({ ok: false, point: "login", msg: "not found account" });
    }

    const findUser = await sql`
    SELECT 
    *
    FROM users 
    WHERE user_name = ${user_EON}
    `;
    if (findUser.length === 0) {
      // protact timing attack
      await bcryto.compare(user_password, getEnv("DUMMY_HASH"));

      return res.status(401).json({
        ok: false,
        point: "login",
        msg: "not found account",
      });
    }

    // compare hash password
    const comparePassword = await bcryto.compare(
      user_password,
      findUser[0].user_password,
    );
    if (!comparePassword) {
      return res.status(401).json({
        ok: false,
        point: "login",
        msg: "not found account",
      });
    }

    const refreshToken = generateRefreshToken(findUser[0].user_id);
    const refreshTokenHash = await bcryto.hash(refreshToken, 10);

    await sql`
    UPDATE users
    SET refresh_token = ${refreshTokenHash}
    WHERE user_id = ${findUser[0].user_id}
    `;

    res.cookie("ss_session", refreshToken, generateCookieRefresh());

    return res.status(202).json({ ok: true, msg: "login success" });
  } catch (error) {
    next(error);
  }
};

export { createAccount, verifyOtp, handleLogin };
