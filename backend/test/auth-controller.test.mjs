import assert from "node:assert/strict";
import { beforeEach, mock, test } from "node:test";

const database = {
  calls: [],
  error: undefined,
  results: [],
  async sql(strings, ...values) {
    database.calls.push({ query: strings.join("?"), values });
    if (database.error) throw database.error;
    return database.results.shift() ?? [];
  },
};

const bcrypt = {
  compareCalls: [],
  compareResults: [],
  hashCalls: [],
  hashResults: [],
  async compare(value, hash) {
    bcrypt.compareCalls.push([value, hash]);
    return bcrypt.compareResults.shift() ?? false;
  },
  async hash(value, rounds) {
    bcrypt.hashCalls.push([value, rounds]);
    return bcrypt.hashResults.shift() ?? "generated-hash";
  },
};

const tokens = {
  accessCalls: [],
  otpCalls: [],
  refreshCalls: [],
  generateAccessToken(userId) {
    tokens.accessCalls.push(userId);
    return "access-token";
  },
  generateOtpToken(userName, userEmail, otpHash) {
    tokens.otpCalls.push([userName, userEmail, otpHash]);
    return "otp-token";
  },
  generateRefreshToken(userId) {
    tokens.refreshCalls.push(userId);
    return "refresh-token";
  },
};

const email = {
  generatedOtp: "123456",
  sendResult: true,
  sendCalls: [],
  generateOtp() {
    return email.generatedOtp;
  },
  sendMailOtp(address, otp) {
    email.sendCalls.push([address, otp]);
    return email.sendResult;
  },
};

const jwt = {
  payload: {},
  verifyCalls: [],
  verify(token, secret) {
    jwt.verifyCalls.push([token, secret]);
    return jwt.payload;
  },
  sign() {
    return "signed-token";
  },
};

mock.module("../src/config/database.js", {
  namedExports: { sql: database.sql },
});
mock.module("bcrypt", { defaultExport: bcrypt });
mock.module("jsonwebtoken", { defaultExport: jwt });
mock.module("../src/service/emailService.js", {
  namedExports: {
    generateOtp: email.generateOtp,
    sendMailOtp: email.sendMailOtp,
  },
});
mock.module("../src/utils/generateToken.js", {
  namedExports: {
    generateAccessToken: tokens.generateAccessToken,
    generateOtpToken: tokens.generateOtpToken,
    generateRefreshToken: tokens.generateRefreshToken,
  },
});
mock.module("../src/utils/generateCookie.js", {
  namedExports: {
    generateCookieOtp: () => ({ maxAge: 300_000 }),
    generateCookieRefresh: () => ({ maxAge: 2_592_000_000 }),
  },
});
mock.module("../src/utils/getEnv.js", {
  namedExports: { getEnv: () => "otp-secret" },
});
mock.module("../src/middleware/validateEmail.js", {
  defaultExport: () => undefined,
});

const { createAccount, handleLogin, verifyOtp } = await import(
  "../src/controllers/auth-controller.ts"
);

function createResponse() {
  return {
    body: undefined,
    cookies: [],
    statusCode: undefined,
    cookie(name, value, options) {
      this.cookies.push({ name, options, value });
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
  };
}

function createNext() {
  const next = (error) => next.calls.push(error);
  next.calls = [];
  return next;
}

beforeEach(() => {
  database.calls = [];
  database.error = undefined;
  database.results = [];
  bcrypt.compareCalls = [];
  bcrypt.compareResults = [];
  bcrypt.hashCalls = [];
  bcrypt.hashResults = [];
  tokens.accessCalls = [];
  tokens.otpCalls = [];
  tokens.refreshCalls = [];
  email.generatedOtp = "123456";
  email.sendResult = true;
  email.sendCalls = [];
  jwt.payload = {};
  jwt.verifyCalls = [];
});

test("createAccount binds the submitted email into the OTP token", async () => {
  database.results = [[], []];
  bcrypt.hashResults = ["otp-hash"];
  const response = createResponse();
  const next = createNext();

  await createAccount(
    {
      body: {
        user_email: "learner@gmail.com",
        user_name: "learner",
        user_password: "password123",
      },
    },
    response,
    next,
  );

  assert.deepEqual(email.sendCalls, [["learner@gmail.com", "123456"]]);
  assert.deepEqual(bcrypt.hashCalls, [["123456", 10]]);
  assert.deepEqual(tokens.otpCalls, [
    ["learner", "learner@gmail.com", "otp-hash"],
  ]);
  assert.deepEqual(response.cookies, [
    {
      name: "ss_session_otp",
      options: { maxAge: 300_000 },
      value: "otp-token",
    },
  ]);
  assert.equal(response.statusCode, 202);
  assert.deepEqual(next.calls, []);
});

test("verifyOtp rejects an OTP token issued for a different email", async () => {
  jwt.payload = {
    otp_hash: "stored-otp-hash",
    user_email: "other@gmail.com",
    user_name: "learner",
  };
  bcrypt.compareResults = [true];
  const response = createResponse();

  await verifyOtp(
    {
      body: {
        otp_code: "123456",
        user_email: "learner@gmail.com",
        user_name: "learner",
        user_password: "password123",
      },
      cookies: { ss_session_otp: "otp-cookie" },
    },
    response,
    createNext(),
  );

  assert.equal(response.statusCode, 401);
  assert.deepEqual(response.body, {
    msg: "invalid otp",
    ok: false,
    point: "otp",
  });
  assert.equal(database.calls.length, 0);
  assert.equal(tokens.accessCalls.length, 0);
});

test("verifyOtp creates the account when name, email, and OTP all match", async () => {
  jwt.payload = {
    otp_hash: "stored-otp-hash",
    user_email: "learner@gmail.com",
    user_name: "learner",
  };
  bcrypt.compareResults = [true];
  bcrypt.hashResults = ["password-hash", "refresh-hash"];
  database.results = [[{ user_id: "user-7" }], []];
  const response = createResponse();

  await verifyOtp(
    {
      body: {
        otp_code: "123456",
        user_email: "learner@gmail.com",
        user_name: "learner",
        user_password: "password123",
      },
      cookies: { ss_session_otp: "otp-cookie" },
    },
    response,
    createNext(),
  );

  assert.deepEqual(jwt.verifyCalls, [["otp-cookie", "otp-secret"]]);
  assert.deepEqual(bcrypt.compareCalls, [["123456", "stored-otp-hash"]]);
  assert.deepEqual(bcrypt.hashCalls, [
    ["password123", 10],
    ["refresh-token", 10],
  ]);
  assert.deepEqual(tokens.accessCalls, ["user-7"]);
  assert.deepEqual(tokens.refreshCalls, ["user-7"]);
  assert.equal(database.calls.length, 2);
  assert.deepEqual(database.calls[0].values, [
    "learner",
    "learner@gmail.com",
    "password-hash",
  ]);
  assert.deepEqual(database.calls[1].values, ["refresh-hash", "user-7"]);
  assert.deepEqual(response.cookies, [
    {
      name: "ss_session",
      options: { maxAge: 2_592_000_000 },
      value: "refresh-token",
    },
  ]);
  assert.equal(response.statusCode, 202);
  assert.deepEqual(response.body, { accessToken: "access-token", ok: false });
});

test("handleLogin rejects an invalid email before querying the database", async () => {
  const response = createResponse();

  await handleLogin(
    { body: { user_EON: "learner@example.com", user_password: "secret123" } },
    response,
    createNext(),
  );

  assert.equal(response.statusCode, 400);
  assert.deepEqual(response.body, {
    msg: "not found account",
    ok: false,
    point: "login",
  });
  assert.equal(database.calls.length, 0);
  assert.equal(bcrypt.compareCalls.length, 0);
});

test("handleLogin authenticates a valid Gmail address and rotates its refresh token", async () => {
  database.results = [
    [{ user_id: "user-8", user_password: "saved-password-hash" }],
    [],
  ];
  bcrypt.compareResults = [true];
  bcrypt.hashResults = ["refresh-hash"];
  const response = createResponse();

  await handleLogin(
    { body: { user_EON: "person@gmail.com", user_password: "secret123" } },
    response,
    createNext(),
  );

  assert.match(database.calls[0].query, /WHERE user_email/);
  assert.deepEqual(database.calls[0].values, ["person@gmail.com"]);
  assert.deepEqual(bcrypt.compareCalls, [
    ["secret123", "saved-password-hash"],
  ]);
  assert.deepEqual(tokens.refreshCalls, ["user-8"]);
  assert.deepEqual(database.calls[1].values, ["refresh-hash", "user-8"]);
  assert.deepEqual(response.cookies, [
    {
      name: "ss_session",
      options: { maxAge: 2_592_000_000 },
      value: "refresh-token",
    },
  ]);
  assert.equal(response.statusCode, 202);
  assert.deepEqual(response.body, {
    msg: "login success",
    ok: true,
    point: "login",
  });
});

test("handleLogin returns the same response for an unknown account and a bad password", async (t) => {
  const expected = {
    msg: "not found account",
    ok: false,
    point: "login",
  };

  await t.test("unknown username", async () => {
    database.results = [[]];
    const response = createResponse();
    await handleLogin(
      { body: { user_EON: "learner", user_password: "secret123" } },
      response,
      createNext(),
    );
    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, expected);
  });

  await t.test("incorrect password", async () => {
    database.results = [[{ user_id: "user-9", user_password: "saved-hash" }]];
    bcrypt.compareResults = [false];
    const response = createResponse();
    await handleLogin(
      { body: { user_EON: "learner", user_password: "wrong-password" } },
      response,
      createNext(),
    );
    assert.equal(response.statusCode, 400);
    assert.deepEqual(response.body, expected);
    assert.equal(tokens.refreshCalls.length, 0);
  });
});

test("handleLogin enforces username boundaries without database work", async (t) => {
  for (const userEON of ["ab", "x".repeat(51)]) {
    await t.test(`rejects length ${userEON.length}`, async () => {
      const response = createResponse();
      await handleLogin(
        { body: { user_EON: userEON, user_password: "secret123" } },
        response,
        createNext(),
      );
      assert.equal(response.statusCode, 400);
      assert.equal(database.calls.length, 0);
    });
  }
});

test("handleLogin accepts usernames at both supported boundaries", async (t) => {
  for (const userEON of ["abc", "x".repeat(50)]) {
    await t.test(`accepts length ${userEON.length}`, async () => {
      database.calls = [];
      database.results = [
        [{ user_id: `user-${userEON.length}`, user_password: "saved-hash" }],
        [],
      ];
      bcrypt.compareResults = [true];
      bcrypt.hashResults = ["refresh-hash"];
      const response = createResponse();

      await handleLogin(
        { body: { user_EON: userEON, user_password: "secret123" } },
        response,
        createNext(),
      );

      assert.match(database.calls[0].query, /WHERE user_name/);
      assert.deepEqual(database.calls[0].values, [userEON]);
      assert.equal(response.statusCode, 202);
    });
  }
});

test("handleLogin forwards database failures to Express error handling", async () => {
  const failure = new Error("database unavailable");
  database.error = failure;
  const next = createNext();

  await handleLogin(
    { body: { user_EON: "learner", user_password: "secret123" } },
    createResponse(),
    next,
  );

  assert.deepEqual(next.calls, [failure]);
});
