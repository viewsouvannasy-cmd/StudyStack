//  library
import { sql } from "../config/database.js";
import { Request, Response, NextFunction } from "express";

import type { UserForm, ResponseForm } from "../types/FormType.js";

const createAccount = async (
  req: Request<{}, ResponseForm, UserForm>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_email, user_name, user_password } = req.body;

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
    if (isDuplicatrName.length !== 0) {
      return res
        .status(400)
        .json({ ok: false, point: "email", msg: "invalid email" });
    }

    res.status(202).json({ ok: true });
  } catch (error) {
    next(error);
  }
};

export { createAccount };
