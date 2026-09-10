// library
import { Request, Response, NextFunction } from "express";

// helper function
import { validateFormatEmail } from "../utils/validation.js";

// type
import type { UserForm } from "../types/FormType.js";

const validateEmail = async (
  req: Request<{}, {}, UserForm>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user_email } = req.body;

    if (!user_email) {
      return res
        .status(400)
        .json({ ok: false, point: "email", msg: "Please provide your email" });
    }

    // check email format
    if (!validateFormatEmail(user_email)) {
      return res
        .status(400)
        .json({ ok: false, point: "email", msg: "invalid email" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default validateEmail;
