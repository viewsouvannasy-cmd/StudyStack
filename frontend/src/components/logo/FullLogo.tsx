import { Link } from "@tanstack/react-router";

export function FullLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img className="h-7 w-7" src="/studystack_icon.svg" />
      <p className="text-page-title hidden font-medium sm:flex">StudyStack</p>
    </Link>
  );
}
