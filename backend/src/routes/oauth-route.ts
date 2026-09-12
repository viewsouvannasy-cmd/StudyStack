// library
import { Router } from "express";

// controller
import {
  googleLogin,
  redirectToGoogle,
} from "../controllers/oauth-controller.js";

const route = Router();

route.get("/google", redirectToGoogle);

route.get("/google/callback", googleLogin);

export default route;
