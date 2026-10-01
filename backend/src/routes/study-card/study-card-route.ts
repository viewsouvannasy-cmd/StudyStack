import { Router } from "express";
const route = Router();

import {
  createStudyCard,
  getUserStudyCard,
} from "../../controllers/study-card/study-card-controller.js";

route.post("/create", createStudyCard);
route.get("/get", getUserStudyCard);

export default route;
