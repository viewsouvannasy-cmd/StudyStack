// library
import { Router } from "express";
import passport from "../config/passport/google-login.js";

// controller
import { googleLogin } from "../controllers/oauth-controller.js";

const route = Router();

route.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    prompt: "select_account",
  }),
);

route.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  googleLogin,
);

export default route;
