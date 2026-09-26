import { google } from "googleapis";
import { getEnv } from "../utils/getEnv.js";

const youtube = google.youtube({
  version: "v3",
  auth: getEnv("YOUTUBE_API_KEY"),
});

export default youtube;
