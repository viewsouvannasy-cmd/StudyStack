import assert from "node:assert/strict";
import { beforeEach, mock, test } from "node:test";

const axios = {
  calls: [],
  implementation: async () => ({ data: undefined }),
  async post(...args) {
    axios.calls.push(args);
    return axios.implementation(...args);
  },
};

mock.module("axios", { defaultExport: axios });
mock.module("../src/utils/getEnv", {
  namedExports: {
    getEnv(name) {
      assert.equal(name, "VITE_SERVER_HOST");
      return "https://api.studystack.test";
    },
  },
});

const { login } = await import("../src/api/auth/auth-func.ts");

beforeEach(() => {
  axios.calls = [];
  axios.implementation = async () => ({ data: undefined });
});

test("login posts credentials to the login endpoint and returns the response body", async () => {
  const responseBody = { msg: "login success", ok: true, point: "login" };
  axios.implementation = async () => ({ data: responseBody });

  const result = await login({
    user_EON: "learner@gmail.com",
    user_password: "password123",
  });

  assert.deepEqual(axios.calls, [
    [
      "https://api.studystack.test/api/auth/login",
      { user_EON: "learner@gmail.com", user_password: "password123" },
      { withCredentials: true },
    ],
  ]);
  assert.equal(result, responseBody);
});

test("login propagates API failures without changing them", async () => {
  const failure = new Error("request failed");
  axios.implementation = async () => {
    throw failure;
  };

  await assert.rejects(
    login({ user_EON: "learner", user_password: "password123" }),
    (error) => error === failure,
  );
});
