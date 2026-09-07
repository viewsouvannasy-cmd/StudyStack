import { connectDB } from "./config/database.js";
import app from "./app.js";

import { getEnv } from "./utils/getEnv.js";

const server = async () => {
  try {
    await connectDB();

    const port = getEnv("PORT") || 3000;
    app.listen(port, () => {
      console.log(`server run on port ${port}`);
    });
  } catch (error) {
    console.log("NeonDB connection Error", error);
  }
};

server();
