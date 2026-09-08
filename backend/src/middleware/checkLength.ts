import { Request, Response, NextFunction } from "express";

import type { UserForm, ResponseForm } from "../types/FormType.js";

const checkLength = async (
  req: Request<{}, ResponseForm, UserForm>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
      return res.status(400).json({ ok: false, msg: "Please provide require" });
    }

    if (user_name.length > 50) {
      return res
        .status(400)
        .json({ ok: false, point: "name", msg: "limit character is 50" });
    }

    if (user_password.length > 50) {
      return res
        .status(400)
        .json({ ok: false, point: "password", msg: "limit character is 50" });
    }

    if (user_name.length < 3) {
      return res.status(400).json({
        ok: false,
        point: "name",
        msg: "password should character more then 3",
      });
    }

    if (user_password.length < 8) {
      return res.status(400).json({
        ok: false,
        point: "password",
        msg: "password should character more then 8",
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default checkLength;
