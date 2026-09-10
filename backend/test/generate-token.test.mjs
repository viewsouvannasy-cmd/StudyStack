import assert from "node:assert/strict";
import test from "node:test";
import jwt from "jsonwebtoken";

process.env.OTP_TOKEN_SECRET = "test-otp-secret";

const { generateOtpToken } = await import("../src/utils/generateToken.ts");

test("generateOtpToken signs the username, email, and OTP hash for five minutes", () => {
  const token = generateOtpToken(
    "learner",
    "learner@gmail.com",
    "otp-hash",
  );
  const payload = jwt.verify(token, "test-otp-secret");

  assert.equal(payload.user_name, "learner");
  assert.equal(payload.user_email, "learner@gmail.com");
  assert.equal(payload.otp_hash, "otp-hash");
  assert.equal(payload.exp - payload.iat, 5 * 60);
});
