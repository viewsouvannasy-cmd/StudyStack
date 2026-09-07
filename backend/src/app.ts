// library
import express from "express";
import cookieParser from "cookie-parser";

// middleware
import errorHandle from "./middleware/errorHandler.js";
import notFoundHandler from "./middleware/notFoundHandler.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(notFoundHandler);
app.use(errorHandle);

export default app;
