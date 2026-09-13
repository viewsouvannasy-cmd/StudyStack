import { Link } from "@tanstack/react-router";

export function FullLogo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img className="h-6 w-6" src="/studystack_icon.svg" />
      <p className="text-logo hidden font-medium sm:flex">StudyStack</p>
    </Link>
  );
}
