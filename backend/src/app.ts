// library
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// middleware
import errorHandle from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";

// routes
import authRoute from "./routes/auth-route.js";
import oauthRoute from "./routes/oauth-route.js";

// helper function
import { getEnv } from "./utils/getEnv.js";

const app = express();

app.use(
  cors({
    origin: getEnv("CLIENT_HOST"),
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/oauth", oauthRoute);

app.use(notFoundHandler);
app.use(errorHandle);

export default app;
