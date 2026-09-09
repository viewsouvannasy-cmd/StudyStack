// library
import { Router } from "express";

// middleware
import checkLength from "../middleware/checkLength.js";
import validateEmail from "../middleware/validateEmail.js";

// controller
import { createAccount } from "../controllers/auth-controller.js";
import { verifyOtp } from "../controllers/auth-controller.js";

const route = Router();

route.post("/signup", checkLength, validateEmail, createAccount);
route.post("/verify-otp", checkLength, validateEmail, verifyOtp);

export default route;
