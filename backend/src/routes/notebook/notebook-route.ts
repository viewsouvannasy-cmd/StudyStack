import { Router } from "express";
const route = Router();

import { createNotebook } from "../../controllers/notebook/notebook-controller.js";

route.post("/create", createNotebook);

export default route;
