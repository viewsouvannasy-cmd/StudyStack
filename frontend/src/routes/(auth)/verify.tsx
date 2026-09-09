// library
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

// components
import { Logo } from "../../components/logo/Logo";

export const Route = createFileRoute("/(auth)/verify")({
  component: RouteComponent,
});

function RouteComponent() {
  const [inputOtp, setInputOtp] = useState("");

  function handleInputOtp(value: string) {
    if (isNaN(Number(value))) {
      return;
    }

    setInputOtp(value);
  }

  function handleSubmitOtp() {
    if (inputOtp.length !== 6) {
      return;
    }
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
        <button className="btn-form-auth w-full">Verify</button>
        <span className="text-caption mt-4 text-(--color-text-secondary)">
          Didn't receive code?{" "}
          <button className="cursor-pointer text-(--color-primary)">
            Resend OTP
          </button>
        </span>
      </form>
    </div>
  );
}
