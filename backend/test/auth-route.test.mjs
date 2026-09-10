import assert from "node:assert/strict";
import { mock, test } from "node:test";

const registrations = [];
const route = {
  post(path, ...handlers) {
    registrations.push({ handlers, path });
  },
};
const createAccount = () => undefined;
const handleLogin = () => undefined;
const verifyOtp = () => undefined;

mock.module("express", {
  namedExports: { Router: () => route },
});
mock.module("../src/middleware/checkLength.js", {
  defaultExport: () => undefined,
});
mock.module("../src/middleware/validateEmail.js", {
  defaultExport: () => undefined,
});
mock.module("../src/controllers/auth-controller.js", {
  namedExports: { createAccount, handleLogin, verifyOtp },
});

await import("../src/routes/auth-route.ts");

test("the auth router exposes the login controller at POST /login", () => {
  const loginRoute = registrations.find(({ path }) => path === "/login");

  assert.ok(loginRoute);
  assert.ok(loginRoute.handlers.includes(handleLogin));
});
