// library
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

// components
import { Logo } from "../../components/logo/Logo";
import { IconEye } from "../../components/icon/IconEye";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isInputNameOrEmail, setIsInputNameOrEmail] = useState("");
  const [isInputPassword, setIsInputPassword] = useState("");

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-90 flex-col gap-5">
        <div className="flex w-full max-w-100 flex-col items-center justify-center gap-2">
          <Logo />
          <h1 className="text-section font-medium">Log in to StudyStack</h1>
        </div>
        <form className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-1">
            <label className="text-small">Email or Username</label>
            <input
              className="input-form-auth"
              type="text"
              minLength={3}
              maxLength={50}
              onChange={(e) => setIsInputNameOrEmail(e.target.value)}
              value={isInputNameOrEmail}
              required
            />
          </div>
          <div className="relative mt-3.5 flex w-full flex-col gap-1 [&>button]:absolute [&>button]:top-[57%] [&>button]:right-3 [&>button]:hidden focus-within:[&>button]:flex">
            <div className="flex justify-between">
              <label className="text-small">Password</label>
              <span className="text-small cursor-pointer text-(--color-primary)">
                Forgot Password?
              </span>
            </div>
            <input
              className="input-form-auth"
              minLength={8}
              maxLength={50}
              onChange={(e) => setIsInputPassword(e.target.value)}
              value={isInputPassword}
              required
            />
            <button type="button" onMouseDown={(e) => e.preventDefault()}>
              <IconEye
                isShowPassword={isShowPassword}
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </button>
          </div>
          <button className="btn-form-auth">Login</button>
        </form>
        <div className="flex items-center gap-3">
          <div className="h-px w-full bg-(--color-background-inverse)"></div>
          <span className="text-[11px]">OR</span>
          <div className="h-px w-full bg-(--color-background-inverse)"></div>
        </div>
        <button type="submit" className="btn-resgiter-oauth">
          <img className="h-5 w-5" src="/google-icon.svg" />
          Continue with Google
        </button>
        <span className="text-label mt-4 text-center text-(--color-text-muted)">
          Don't have an accound?{" "}
          <Link
            to="/signup"
            className="text-(--color-text-primary) hover:underline"
          >
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}
