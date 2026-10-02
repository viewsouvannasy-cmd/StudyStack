import { Router } from "express";
const route = Router();

import {
  createStudyCard,
  getListStudyCard,
  getStudyCardLesson,
} from "../../controllers/study-card/study-card-controller.js";

route.post("/create", createStudyCard);
route.get("/get-list", getListStudyCard);
route.get("/get/:sci_id", getStudyCardLesson);

export default route;
