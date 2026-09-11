// library
import { Router } from "express";
import passport from "../config/passport/google-login.js";
import { Request, Response, NextFunction } from "express";

// controller
import {
  googleLogin,
  redirectToGoogle,
} from "../controllers/oauth-controller.js";

const route = Router();

route.get("/google", redirectToGoogle);

route.get("/google/callback", googleLogin);

export default route;
