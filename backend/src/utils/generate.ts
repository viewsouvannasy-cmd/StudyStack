import { sql } from "../config/database.js";
import slugify from "slugify";

async function generateUniqueUsername(baseName: string): Promise<string> {
  let username = slugify(baseName);
  let suffix = 0;

  while (true) {
    const candidate = suffix === 0 ? username : `${username}-${suffix}`;

    const existing = await sql`
      SELECT 1 FROM users WHERE user_name = ${candidate} LIMIT 1
    `;

    if (existing.length === 0) {
      return candidate; // เจอ username ที่ยังไม่มีคนใช้
    }

    suffix++;
  }
}

export { generateUniqueUsername };
