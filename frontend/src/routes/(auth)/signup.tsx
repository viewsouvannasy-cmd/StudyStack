// library
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// component
import { Logo } from "../../components/logo/Logo";
import { IconEye } from "../../components/icon/IconEye";
import { SipnnerLoad } from "../../components/loading-state/SipnnerLoad";

// api
import { useSignup } from "../../api/auth/auth";

import type { ResponseStatus } from "../../types/auth-type";

export const Route = createFileRoute("/(auth)/signup")({
  component: SignUpPage,
});

function SignUpPage() {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);

  // form state
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [resultResponse, setResultReponse] = useState<ResponseStatus>();

  const { mutate, isPending } = useSignup();

  const handleSubmitSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      {
        user_email: inputEmail,
        user_name: inputName,
        user_password: inputPassword,
      },
      {
        onSuccess: () => {
          navigate({ to: "/verify" });
        },
        onError: (error) => {
          if (error.response) {
            setResultReponse(error.response.data);
          }
        },
      },
    );
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-90 flex-col gap-5">
        <div className="flex w-full max-w-100 flex-col items-center justify-center gap-2">
          <Logo />
          <h1 className="text-[20px] font-medium">Sign up to StudyStack</h1>
        </div>
        <form onSubmit={handleSubmitSignup} className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-1">
            <label className="text-small">Email</label>
            <input
              className={`input-form-auth ${resultResponse?.point === "email" ? "border-(--color-error-text)" : ""}`}
              type="email"
              onChange={(e) => setInputEmail(e.target.value)}
              value={inputEmail}
              required
            />
            {resultResponse?.point === "email" && (
              <span className="text-caption text-(--color-error-text)">
                {resultResponse.msg}
              </span>
            )}
          </div>
          <div className="mt-3.5 flex w-full flex-col gap-1">
            <label className="text-small">Username</label>
            <input
              className={`input-form-auth ${resultResponse?.point === "name" ? "border-(--color-error-text)" : ""}`}
              type="text"
              minLength={3}
              maxLength={50}
              onChange={(e) => setInputName(e.target.value)}
              value={inputName}
              required
            />
            {resultResponse?.point === "name" && (
              <span className="text-caption text-(--color-error-text)">
                {resultResponse.msg}
              </span>
            )}
          </div>
          <div className="relative mt-3.5 flex w-full flex-col gap-1 [&>button]:absolute [&>button]:top-[57%] [&>button]:right-3 [&>button]:hidden focus-within:[&>button]:flex">
            <label className="text-small">Password</label>
            <input
              className={`input-form-auth ${resultResponse?.point === "password" ? "border-(--color-error-text)" : ""}`}
              type={isShowPassword ? "text" : "password"}
              minLength={8}
              maxLength={50}
              onChange={(e) => setInputPassword(e.target.value)}
              value={inputPassword}
              required
            />
            <button type="button">
              <IconEye
                isShowPassword={isShowPassword}
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
            </button>
            {resultResponse?.point === "password" && (
              <span className="text-caption text-(--color-error-text)">
                {resultResponse.msg}
              </span>
            )}
          </div>
          <button
            className={isPending ? "btn-form-auth-not-allow" : "btn-form-auth"}
            disabled={isPending}
          >
            {isPending && <SipnnerLoad />}
            {!isPending && "Create account"}
          </button>
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
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-(--color-text-primary) hover:underline"
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}
