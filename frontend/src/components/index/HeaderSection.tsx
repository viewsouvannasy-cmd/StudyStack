// library
import { Link } from "@tanstack/react-router";

// component
import { FullLogo } from "../FullLogo";

export function HeaderSection() {
  return (
    <div className="flex w-full max-w-[2000px] items-center justify-between p-4">
      <FullLogo />
      <div className="flex items-center gap-4">
        <Link
          className="cursor-pointer border p-1 pr-4 pl-4 text-[14px] md:text-[16px]"
          to="/login"
        >
          Log in
        </Link>
        <Link
          className="cursor-pointer border border-neutral-900 bg-black p-1 pr-4 pl-4 text-[14px] text-white md:text-[16px]"
          to="/signup"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
