// library
import { Request, Response, NextFunction } from "express";
import bcryto from "bcrypt";
import { sql } from "../config/database.js";

// helper function
import { generateRefreshToken } from "../utils/generateToken.js";
import { generateCookieRefresh } from "../utils/generateCookie.js";
import { getEnv } from "../utils/getEnv.js";

// type
import type { User } from "../types/DataInfoType.js";

const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id } = req.user as User;

    const refreshToken = generateRefreshToken(user_id);

    const refreshTokenHash = await bcryto.hash(refreshToken, 10);

    await sql`
        UPDATE users 
        SET refresh_token = ${refreshTokenHash}
        WHERE user_id = ${user_id}
        `;

    res.cookie("ss_session", refreshToken, generateCookieRefresh());

    res.redirect(`${getEnv("CLIENT_HOST")}/app/all`);
  } catch (error) {
    next(error);
  }
};

export { googleLogin };
