import { Request, Response, NextFunction } from "express";
import { getEnv } from "../utils/getEnv.js";

const errorHandle = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  if (err instanceof Error) {
    return res.status(500).json({
      ok: false,
      msg:
        getEnv("NODE_ENV") === "production"
          ? "internal server error"
          : err.message,
    });
  }

  res.status(500).json({ msg: "internal server error" });
};

export default errorHandle;
