import assert from "node:assert/strict";
import { mock, test } from "node:test";

let mutationOptions;
const mutationResult = { mutate: () => undefined };

mock.module("@tanstack/react-query", {
  namedExports: {
    useMutation(options) {
      mutationOptions = options;
      return mutationResult;
    },
  },
});
mock.module("../src/api/auth/auth-func", {
  namedExports: {
    login: async () => undefined,
    signup: async () => undefined,
    verifyOtp: async () => undefined,
  },
});

const { useLogin } = await import("../src/api/auth/auth.ts");

test("useLogin registers the login request as its mutation function", () => {
  const result = useLogin();

  assert.equal(result, mutationResult);
  assert.equal(mutationOptions.mutationFn.name, "login");
});
