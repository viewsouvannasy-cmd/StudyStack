import assert from "node:assert/strict";
import { mock, test } from "node:test";

globalThis.React = {
  createElement(type, props, ...children) {
    return {
      props: {
        ...props,
        children:
          children.length === 0
            ? undefined
            : children.length === 1
              ? children[0]
              : children,
      },
      type,
    };
  },
};

function createSpy(implementation = () => undefined) {
  const spy = (...args) => {
    spy.calls.push(args);
    return implementation(...args);
  };
  spy.calls = [];
  return spy;
}

let stateIndex = 0;
let stateSetters = [];
let stateValues = [];
let effects = [];
let navigate = createSpy();
let signupContext = {
  changeUserInfoForm: createSpy(),
  info: { user_email: "", user_name: "", user_password: "" },
};
let authState = {
  login: { isPending: false, mutate: createSpy() },
  signup: { isPending: false, mutate: createSpy() },
  verify: { isPending: false, mutate: createSpy() },
};

function useState(initialValue) {
  const currentIndex = stateIndex++;
  const value = Object.hasOwn(stateValues, currentIndex)
    ? stateValues[currentIndex]
    : initialValue;
  const setter = createSpy();
  stateSetters.push(setter);
  return [value, setter];
}

function useEffect(effect) {
  effects.push(effect);
}

function Logo() {}
function IconEye() {}
function SipnnerLoad() {}
function Link() {}

mock.module("react", { namedExports: { useEffect, useState } });
mock.module("@tanstack/react-router", {
  namedExports: {
    Link,
    createFileRoute: () => (options) => options,
    useNavigate: () => navigate,
  },
});
mock.module("../src/components/logo/Logo", { namedExports: { Logo } });
mock.module("../src/components/icon/IconEye", { namedExports: { IconEye } });
mock.module("../src/components/loading-state/SipnnerLoad", {
  namedExports: { SipnnerLoad },
});
mock.module("../src/context/useUserInputForm", {
  defaultExport: () => signupContext,
});
mock.module("../src/api/auth/auth", {
  namedExports: {
    useLogin: () => authState.login,
    useSignup: () => authState.signup,
    useVerifyOpt: () => authState.verify,
  },
});

const [{ Route: LoginRoute }, { Route: SignupRoute }, { Route: VerifyRoute }] =
  await Promise.all([
    import("../src/routes/(auth)/login.tsx"),
    import("../src/routes/(auth)/signup.tsx"),
    import("../src/routes/(auth)/verify.tsx"),
  ]);

mock.method(console, "log", () => undefined);

function render(route, values = []) {
  stateIndex = 0;
  stateSetters = [];
  stateValues = values;
  effects = [];
  return route.component();
}

function allElements(node, result = []) {
  if (Array.isArray(node)) {
    for (const child of node) allElements(child, result);
    return result;
  }
  if (!node || typeof node !== "object") return result;
  if ("type" in node && "props" in node) {
    result.push(node);
    allElements(node.props.children, result);
  }
  return result;
}

function elementsOfType(tree, type) {
  return allElements(tree).filter((element) => element.type === type);
}

test("login submits entered credentials and handles success and API errors", () => {
  navigate = createSpy();
  const mutate = createSpy();
  authState.login = { isPending: false, mutate };
  const tree = render(LoginRoute, [
    false,
    "learner@gmail.com",
    "password123",
    undefined,
  ]);
  const form = elementsOfType(tree, "form")[0];
  const preventDefault = createSpy();

  form.props.onSubmit({ preventDefault });

  assert.equal(preventDefault.calls.length, 1);
  assert.deepEqual(mutate.calls[0][0], {
    user_EON: "learner@gmail.com",
    user_password: "password123",
  });

  const callbacks = mutate.calls[0][1];
  callbacks.onSuccess();
  assert.deepEqual(navigate.calls, [[{ to: "/app/all" }]]);

  const response = { msg: "not found account", ok: false, point: "login" };
  callbacks.onError({ response: { data: response } });
  assert.deepEqual(stateSetters[3].calls, [[response]]);
});

test("login toggles password visibility and disables actions while pending", () => {
  authState.login = { isPending: true, mutate: createSpy() };
  const tree = render(LoginRoute, [false, "learner", "password123", undefined]);
  const passwordInput = elementsOfType(tree, "input").find(
    (input) => input.props.minLength === 8,
  );
  const eye = elementsOfType(tree, IconEye)[0];
  const submit = elementsOfType(tree, "button").find(
    (button) => button.props.type === "submit",
  );
  const oauth = elementsOfType(tree, "button").find(
    (button) => button.props.className === "btn-resgiter-oauth",
  );

  assert.equal(passwordInput.props.type, "password");
  eye.props.onClick();
  assert.deepEqual(stateSetters[0].calls, [[true]]);
  assert.equal(submit.props.disabled, true);
  assert.match(submit.props.className, /btn-form-auth-not-allow/);
  assert.equal(elementsOfType(submit, SipnnerLoad).length, 1);
  assert.equal(oauth.props.disabled, true);
});

test("login renders server feedback only for login errors", () => {
  authState.login = { isPending: false, mutate: createSpy() };
  const loginError = { msg: "not found account", ok: false, point: "login" };
  const tree = render(LoginRoute, [false, "", "", loginError]);
  const errorMessage = elementsOfType(tree, "span").find(
    (span) => span.props.children === "not found account",
  );

  assert.ok(errorMessage);
  assert.ok(
    allElements(tree).some(
      (element) =>
        element.type === "div" && /mt-1/.test(element.props.className ?? ""),
    ),
  );

  const unrelatedTree = render(LoginRoute, [
    false,
    "",
    "",
    { msg: "invalid email", ok: false, point: "email" },
  ]);
  assert.equal(
    elementsOfType(unrelatedTree, "span").some(
      (span) => span.props.children === "invalid email",
    ),
    false,
  );
});

test("signup highlights the errored field and clears feedback when any field is focused", () => {
  authState.signup = { isPending: false, mutate: createSpy() };
  signupContext = {
    changeUserInfoForm: createSpy(),
    info: {
      user_email: "learner@gmail.com",
      user_name: "learner",
      user_password: "password123",
    },
  };
  const tree = render(SignupRoute, [
    false,
    { msg: "invalid email", ok: false, point: "email" },
  ]);
  const inputs = elementsOfType(tree, "input");

  assert.match(inputs[0].props.className, /border-\(--color-error-text\)/);
  assert.match(inputs[0].props.className, /bg-\(--color-error-background\)/);

  for (const input of inputs) input.props.onFocus();
  assert.equal(stateSetters[1].calls.length, 3);
  for (const [clearedResponse] of stateSetters[1].calls) {
    assert.deepEqual(clearedResponse, { msg: "", ok: false, point: "" });
  }
});

test("verification redirects when signup email context is missing", () => {
  navigate = createSpy();
  signupContext = {
    changeUserInfoForm: createSpy(),
    info: { user_email: "", user_name: "learner", user_password: "password123" },
  };

  render(VerifyRoute, ["", undefined]);
  assert.equal(effects.length, 1);
  effects[0]();

  assert.deepEqual(navigate.calls, [[{ to: "/" }]]);
});

test("verification accepts numeric input and submits exactly six digits", () => {
  navigate = createSpy();
  const verifyOtp = createSpy();
  authState.verify = { isPending: false, mutate: verifyOtp };
  signupContext = {
    changeUserInfoForm: createSpy(),
    info: {
      user_email: "learner@gmail.com",
      user_name: "learner",
      user_password: "password123",
    },
  };

  let tree = render(VerifyRoute, ["", undefined]);
  const input = elementsOfType(tree, "input")[0];
  input.props.onChange({ target: { value: "12a456" } });
  assert.equal(stateSetters[0].calls.length, 0);
  input.props.onChange({ target: { value: "123456" } });
  assert.deepEqual(stateSetters[0].calls, [["123456"]]);

  tree = render(VerifyRoute, ["12345", undefined]);
  elementsOfType(tree, "form")[0].props.onSubmit({
    preventDefault: createSpy(),
  });
  assert.equal(verifyOtp.calls.length, 0);

  tree = render(VerifyRoute, ["123456", undefined]);
  elementsOfType(tree, "form")[0].props.onSubmit({
    preventDefault: createSpy(),
  });
  assert.deepEqual(verifyOtp.calls[0][0], {
    otp_code: "123456",
    user_email: "learner@gmail.com",
    user_name: "learner",
    user_password: "password123",
  });
  verifyOtp.calls[0][1].onSuccess();
  assert.deepEqual(navigate.calls, [[{ to: "/app/all" }]]);
});
