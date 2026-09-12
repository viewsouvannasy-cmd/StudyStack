// library
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";

// middleware
import errorHandle from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import verifyJwt from "./middleware/token/VerifyJwt.js";

// routes
import authRoute from "./routes/auth-route.js";
import oauthRoute from "./routes/oauth-route.js";
import refreshRoute from "./routes/refresh-token-route.js";
import userRoute from "./routes/user-route.js";

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
app.use(passport.initialize());

app.use("/api/auth", authRoute);
app.use("/api/oauth", oauthRoute);
app.use("/api/refresh-token", refreshRoute);

app.use("/api/user", verifyJwt, userRoute);

app.use(notFoundHandler);
app.use(errorHandle);

export default app;
