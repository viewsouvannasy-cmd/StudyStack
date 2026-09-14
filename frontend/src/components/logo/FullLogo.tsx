import { Link } from "@tanstack/react-router";
import useTheme from "../../theme/useTheme";

export function FullLogo() {
  const { theme } = useTheme();

  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        className="h-6 w-6"
        src={`/studystack_icon_${theme === "light" ? "dark" : "light"}.svg`}
      />
      <p className="text-logo hidden font-medium sm:flex">StudyStack</p>
    </Link>
  );
}
