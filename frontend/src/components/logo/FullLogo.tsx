import { Link } from "@tanstack/react-router";

export function FullLogo({
  classIcon = "w-7",
  classText = "text-logo",
}: {
  classIcon?: string;
  classText?: string;
}) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img className={classIcon} src="/studyframes-icon.svg" />
      <p className={classText}>
        Study<span className="text-(--color-primary)">frames</span>
      </p>
    </Link>
  );
}
