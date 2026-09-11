// library
import { Router } from "express";
import passport from "../config/passport/google-login.js";

// controller
import {
  googleLogin,
  redirectToGoogle,
} from "../controllers/oauth-controller.js";

// helper function
import { getEnv } from "../utils/getEnv.js";

const route = Router();

route.get("/google", redirectToGoogle);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${getEnv("CLIENT_HOST")}/login`,
    session: false,
  }),
  googleLogin,
);

export default route;
