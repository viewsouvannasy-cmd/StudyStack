// library
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

// helper function
import { getEnv } from "../utils/getEnv.js";

dotenv.config({ path: "./.env" });

const sql = neon(getEnv("NEON_URL"));

const connectDB = async () => {
  try {
    console.time();
    const result = await sql`SELECT NOW()`;
    console.timeEnd();

    console.log("NeonDB connected", result[0].now);
  } catch (error) {
    console.log("NeonDB connection Error", error);
    process.exit(1);
  }
};

export { connectDB, sql };
