// library
import { Router } from "express";

// middleware
import checkLength from "../middleware/checkLength.js";
import vaildateEmail from "../middleware/validateEmail.js";

// controller
import { createAccount } from "../controllers/auth-controller.js";

const router = Router();

router.post("/signup", checkLength, vaildateEmail, createAccount);

export default router;
