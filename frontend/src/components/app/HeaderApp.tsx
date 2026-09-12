import { Link } from "@tanstack/react-router";

export function HeaderApp() {
  return (
    <Link
      to="/"
      className="flex w-full max-w-[2000px] items-center justify-between p-4"
    >
      <div className="flex items-center gap-2.5">
        <img className="h-7 w-7" src="/studystack_icon.svg" />
        <p className="text-page-title font-medium sm:flex">StudyStack</p>
      </div>

      <div className="h-11 w-11 cursor-pointer overflow-hidden rounded-full border border-(--color-border-strong)">
        <img
          src="/image/user-base-profile.png"
          className="h-full w-full object-cover"
        />
      </div>
    </Link>
  );
}
