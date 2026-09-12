// library
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// helper function
import { getEnv } from "../../utils/getEnv.js";

// type
import type { JwtPayload } from "jsonwebtoken";

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ ok_verify_token: false, msg: "invalie" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(
      token,
      getEnv("ACCESS_TOKEN_SECRET"),
    ) as JwtPayload;
    req.body = {
      ...req.body,
      user_id: payload.user_id,
    };
    next();
  } catch (error) {
    return res.status(401).json({ ok_verify_token: false, msg: "invalie" });
  }
};

export default verifyJwt;
