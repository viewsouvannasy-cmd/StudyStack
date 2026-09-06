// library
import { Link } from "@tanstack/react-router";

// component
import { FullLogo } from "../logo/FullLogo";

export function HeaderSection() {
  return (
    <div className="flex w-full max-w-[2000px] items-center justify-between p-4">
      <FullLogo />
      <div className="flex items-center gap-4">
        <Link
          className="text-small cursor-pointer border border-(--color-background-inverse) p-1 pr-4 pl-4 transition-all duration-200 hover:bg-(--color-background-inverse) hover:text-(--color-background)"
          to="/login"
        >
          Log in
        </Link>
        <Link
          className="text-small cursor-pointer border border-neutral-900 bg-(--color-background-inverse) p-1 pr-4 pl-4 text-(--color-text-inverse)"
          to="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
