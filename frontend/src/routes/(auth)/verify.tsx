// library
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// components
import { Logo } from "../../components/logo/Logo";
import { SipnnerLoad } from "../../components/loading-state/SipnnerLoad";

// context
import useUserInputSignup from "../../context/useUserInputForm";

// api
import { useVerifyOpt } from "../../api/auth/auth";

// types
import type { ResponseOtp } from "../../types/auth-type";

export const Route = createFileRoute("/(auth)/verify")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { info } = useUserInputSignup();

  const [inputOtp, setInputOtp] = useState("");

  const [resultResponse, setResultResponse] = useState<ResponseOtp>();

  const { mutate, isPending } = useVerifyOpt();

  function handleInputOtp(value: string) {
    if (isNaN(Number(value))) {
      return;
    }

    setInputOtp(value);
  }

  function handleSubmitOtp(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputOtp.length !== 6) {
      return;
    }

    mutate(
      {
        user_email: info.user_email,
        user_name: info.user_name,
        user_password: info.user_password,
        otp_code: inputOtp,
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

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-4 p-4">
      <Logo />
      <form
        onSubmit={handleSubmitOtp}
        className="flex w-full max-w-80 flex-col items-center"
      >
        <h1 className="text-[20px] font-medium">Verify OTP</h1>
        <span className="text-small text-(--color-text-secondary)">
          Enter the otp code send to email
        </span>
        <input
          className="mt-8 flex w-full justify-center border border-(--color-text-secondary) p-1 text-center text-[22px]"
          placeholder="XXXXXX"
          type="text"
          minLength={6}
          maxLength={6}
          onChange={(e) => handleInputOtp(e.target.value)}
          value={inputOtp}
          required
        />
        <div className="relative w-full">
          {resultResponse?.point === "otp" && (
            <span className="text-caption absolute text-(--color-error-text)">
              {resultResponse.msg}
            </span>
          )}
          <button
            type="submit"
            className={`${isPending ? "btn-form-auth-not-allow" : "btn-form-auth"} w-full`}
          >
            {isPending && <SipnnerLoad />}
            {!isPending && "Verify"}
          </button>
        </div>

        <span className="text-caption mt-4 text-(--color-text-secondary)">
          Didn't receive code?{" "}
          <button
            type="button"
            className="cursor-pointer text-(--color-primary)"
          >
            Resend OTP
          </button>
        </span>
      </form>
    </div>
  );
}
