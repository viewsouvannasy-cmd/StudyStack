// library
import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

// components
import { Logo } from "../../components/logo/Logo";
import { IconEye } from "../../components/icon/IconEye";
import { SipnnerLoad } from "../../components/loading-state/SipnnerLoad";

// api
import { useLogin } from "../../api/auth/auth";

// type
import type { ResponseStatus } from "../../types/auth-type";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  const [isInputNameOrEmail, setIsInputNameOrEmail] = useState("");
  const [isInputPassword, setIsInputPassword] = useState("");

  const [resultResponse, setResultResponse] = useState<ResponseStatus>();

  const { mutate, isPending } = useLogin();

  function handleSubmitLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    mutate(
      {
        user_EON: isInputNameOrEmail,
        user_password: isInputPassword,
      },
      {
        onSuccess: () => {
          navigate({ to: "/app/all" });
        },
        onError: (error) => {
          if (error.response) {
            setResultResponse(error.response.data);
          }
        },
      },
    );
  }

  console.log(resultResponse);

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-90 flex-col gap-5">
        <div className="flex w-full max-w-100 flex-col items-center justify-center gap-2">
          <Logo />
          <h1 className="text-[20px] font-medium">Log in to StudyStack</h1>
        </div>
        <form className="flex w-full flex-col" onSubmit={handleSubmitLogin}>
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
              type={isShowPassword ? "text" : "password"}
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
          <div
            className={`flex-1 ${resultResponse?.point === "login" ? "mt-1" : "mt-5"}`}
          >
            {resultResponse?.point === "login" && (
              <span className="text-caption text-(--color-error-text)">
                {resultResponse.msg}
              </span>
            )}
            <button
              className={`${isPending ? "btn-form-auth-not-allow" : "btn-form-auth"} w-full`}
              type="submit"
              disabled={isPending}
            >
              {isPending && <SipnnerLoad />}
              {!isPending && "Login"}
            </button>
          </div>
        </form>
        <div className="flex items-center gap-3">
          <div className="h-px w-full bg-(--color-background-inverse)"></div>
          <span className="text-[11px]">OR</span>
          <div className="h-px w-full bg-(--color-background-inverse)"></div>
        </div>
        <button className="btn-resgiter-oauth" disabled={isPending}>
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
