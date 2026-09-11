// library
import { Response, Request, NextFunction } from "express";
import { sql } from "../../config/database.js";
import bcrypt from "bcrypt";

// hepler function
import { validateFormatEmail } from "../../utils/validation.js";
import { generateRefreshToken } from "../../utils/generateToken.js";
import { generateCookieRefresh } from "../../utils/generateCookie.js";
import { getEnv } from "../../utils/getEnv.js";

// type
import type { ResponseForm } from "../../types/FormType.js";

const isEmailLogin = async (
  req: Request<{}, ResponseForm, { user_EON: string; user_password: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    // EON mean email or name
    const { user_EON, user_password } = req.body;

    // if user use email with password to login
    if (user_EON.includes("@")) {
      // check email Format
      if (!validateFormatEmail(user_EON)) {
        return res
          .status(401)
          .json({ ok: false, point: "login", msg: "not found account" });
      }

      const findUser = await sql`
      SELECT 
      *
      FROM users 
      WHERE user_email = ${user_EON}
      `;
      if (findUser.length === 0) {
        // protact timing attack
        await bcrypt.compare(user_password, getEnv("DUMMY_HASH"));

        return res.status(401).json({
          ok: false,
          point: "login",
          msg: "not found account",
        });
      }

      if (!findUser[0].user_password) {
        return res.status(401).json({
          ok: false,
          point: "login",
          msg: "not found account",
        });
      }

      // compare hash password
      const comparePassword = await bcrypt.compare(
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
      const refreshTokenHash = await bcrypt.hash(refreshToken, 10);

      await sql`
        UPDATE users
        SET refresh_token = ${refreshTokenHash}
        WHERE user_id = ${findUser[0].user_id}
        `;

      res.cookie("ss_session", refreshToken, generateCookieRefresh());

      return res
        .status(202)
        .json({ ok: true, point: "login", msg: "login success" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default isEmailLogin;
