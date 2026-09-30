import { Router } from "express";
const route = Router();

import { createStudyCard } from "../../controllers/study-card/create/study-card-controller.js";

route.post("/create", createStudyCard);

export default route;
