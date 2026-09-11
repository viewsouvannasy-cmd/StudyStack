// library
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { sql } from "../config/database.js";
import crypto from "crypto";
import passport from "../config/passport/google-login.js";

// helper function
import { generateRefreshToken } from "../utils/generateToken.js";
import {
  generateCookieRefresh,
  generateCookieShortLive,
} from "../utils/generateCookie.js";
import { getEnv } from "../utils/getEnv.js";

// type
import type { User } from "../types/DataInfoType.js";

const redirectToGoogle = (req: Request, res: Response, next: NextFunction) => {
  const state = crypto.randomBytes(34).toString("hex");

  // set cookie before redirect to google
  res.cookie("oauth_state", state, generateCookieShortLive());

  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
    state,
  })(req, res, next);
};

const googleLogin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err: any, user: User | false, info: any) => {
      try {
        if (err) {
          console.error("Google Auth Error:", err);
          return res.redirect(`${getEnv("CLIENT_HOST")}/login`);
        }

        if (!user) {
          console.log("Google Auth Failed Info:", info);
          return res.redirect(`${getEnv("CLIENT_HOST")}/login`);
        }

        const receviceState = req.query.state;
        const storeState = req.cookies.oauth_state;

        if (!receviceState || !storeState || receviceState !== storeState) {
          res.clearCookie("oauth_state", generateCookieShortLive());
          return res.status(403).json({ ok: false, msg: "invalid" });
        }

        res.clearCookie("oauth_state", generateCookieShortLive());

        const refreshToken = generateRefreshToken(user.user_id);

        const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

        await sql`
        UPDATE users 
        SET refresh_token = ${refreshTokenHash}
        WHERE user_id = ${user.user_id}
        `;

        res.cookie("ss_session", refreshToken, generateCookieRefresh());

        res.redirect(`${getEnv("CLIENT_HOST")}/app/all`);
      } catch (error) {
        next(error);
      }
    },
  )(req, res, next);
};

export { googleLogin, redirectToGoogle };
