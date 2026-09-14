import { Link } from "@tanstack/react-router";
import useTheme from "../../theme/useTheme";

export function Logo() {
  const { theme } = useTheme();
  return (
    <Link to="/">
      <img
        className="h-7 w-7"
        src={`/studystack_icon_${theme === "light" ? "dark" : "light"}.svg`}
      />
    </Link>
  );
}
