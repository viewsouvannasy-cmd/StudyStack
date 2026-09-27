import { Link } from "@tanstack/react-router";

export function Logo({ className = "w-7" }) {
  return (
    <Link to="/">
      <img className={className} src="/studyframes-icon.svg" />
    </Link>
  );
}
