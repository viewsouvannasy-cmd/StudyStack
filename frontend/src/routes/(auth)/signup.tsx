// library
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

// component
import { Logo } from "../../components/logo/Logo";

const SignUpPage = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-90 flex-col gap-5">
        <div className="flex w-full max-w-100 flex-col items-center justify-center gap-2">
          <Logo />
          <h1 className="text-section font-medium">Sign up to StudyStack</h1>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-1">
            <label className="text-small">Email</label>
            <input className="text-small border p-2" type="email" />
          </div>
          <div className="mt-3.5 flex w-full flex-col gap-1">
            <label className="text-small">Username</label>
            <input
              className="text-small border p-2"
              type="text"
              minLength={3}
              maxLength={50}
            />
          </div>
          <div className="mt-3.5 flex w-full flex-col gap-1">
            <label className="text-small">Password</label>
            <input
              className="text-small border p-2"
              minLength={8}
              maxLength={50}
            />
          </div>
          <button className="text-small mt-5 cursor-pointer bg-(--color-primary) p-2.5 text-(--color-text-inverse) transition-colors duration-200 hover:bg-(--color-primary-hover)">
            Create account
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-px w-full bg-(--color-background-inverse)"></div>
          <span className="text-[11px]">OR</span>
          <div className="h-px w-full bg-(--color-background-inverse)"></div>
        </div>
        <button className="text-small flex cursor-pointer items-center justify-center gap-2 rounded-full border border-(--color-border-strong) bg-(--color-background) p-3 text-(--color-text) hover:bg-(--color-info-background)">
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
};

export const Route = createFileRoute("/(auth)/signup")({
  component: SignUpPage,
});
