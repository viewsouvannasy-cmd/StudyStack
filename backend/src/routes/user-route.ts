import { Router } from "express";
import { getUser } from "../controllers/user-controller.js";
const route = Router();

route.get("/get", getUser);

export default route;
