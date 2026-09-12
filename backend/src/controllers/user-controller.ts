// library
import { sql } from "../config/database.js";
import { Response, Request, NextFunction } from "express";

// type
import type { User } from "../types/DataInfoType.js";

const getUser = async (
  req: Request<{}, { user_id: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_id } = req.body;

    const [user] = (await sql`
    SELECT 
    * 
    FROM users 
    WHERE user_id = ${user_id}
    `) as [User];

    if (!user) {
      return res.status(404).json({ ok: false, msg: "user is not found" });
    }

    res.status(202).json({ ok: true, result: user });
  } catch (error) {
    next(error);
  }
};

export { getUser };
