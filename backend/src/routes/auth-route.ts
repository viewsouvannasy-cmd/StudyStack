// library
import { Router } from "express";

// middleware
import checkLength from "../middleware/checkLength.js";
import validateEmail from "../middleware/validateEmail.js";
import isEmailLogin from "../middleware/login/isEmailLogin.js";

// controller
import {
  createAccount,
  verifyOtp,
  handleLogin,
} from "../controllers/auth-controller.js";

const route = Router();

route.post("/signup", checkLength, validateEmail, createAccount);
route.post("/verify-otp", checkLength, validateEmail, verifyOtp);
route.post("/login", isEmailLogin, handleLogin);

export default route;
