// library
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { sql } from "../config/database.js";
import bcrypt from "bcrypt";

// helper function
import { getEnv } from "../utils/getEnv.js";
import { generateAccessToken } from "../utils/generateToken.js";

// type
import type { User } from "../types/Data.js";
import type { JwtPayload } from "jsonwebtoken";

const refreshToken = async (
  req: Request<{}, { ok: boolean; accessToken?: string; msg?: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookie: string | null = req.cookies.ss_session;

    if (!cookie) {
      return res.status(401).json({ ok: false, msg: "invalid" });
    }

    const payload = jwt.verify(
      cookie,
      getEnv("REFRESH_TOKEN_SECRET"),
    ) as JwtPayload;
    if (!payload) {
      return res.status(401).json({ ok: false, msg: "invalid" });
    }

    const [user] = (await sql`
    SELECT 
    refresh_token
    FROM users
    WHERE user_id = ${payload.user_id}
    `) as [{ refresh_token: string }];
    if (!user) {
      return res.status(401).json({ ok: false, msg: "invalid" });
    }

    if (!user.refresh_token) {
      return res.status(401).json({ ok: false, msg: "invalid" });
    }

    // compare refresh token from db
    const compareRefresh = await bcrypt.compare(cookie, user.refresh_token);
    if (!compareRefresh) {
      return res.status(401).json({ ok: false, msg: "invalid token" });
    }

    const accessToken = generateAccessToken(payload.user_id);

    res.status(200).json({ ok: true, accessToken });
  } catch (error) {
    next(error);
  }
};

export { refreshToken };
