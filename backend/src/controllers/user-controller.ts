// library
import { sql } from "../config/database.js";
import { Response, Request, NextFunction } from "express";

// type
import type { User } from "../types/Data.js";

const getUser = async (
  req: Request<{}, { user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;

    const [user] = (await sql`
    SELECT 
    user_name,
    user_email,
    user_password,
    profile_url,
    create_at,
    update_at
    FROM users 
    WHERE user_id = ${user_id}
    `) as [User];

    if (!user) {
      return res.status(404).json({ ok: false, msg: "user is not found" });
    }

    const isHavePassword = user.user_password ? true : false;
    user.user_password = isHavePassword;

    res.status(200).json({ ok: true, result: user });
  } catch (error) {
    next(error);
  }
};

export { getUser };
