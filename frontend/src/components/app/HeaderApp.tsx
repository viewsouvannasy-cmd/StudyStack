// library
import { Link } from "@tanstack/react-router";

// api
import { useUser } from "../../api/user/user";

import useTheme from "../../theme/useTheme";

export function HeaderApp() {
  const { data } = useUser();

  const { theme } = useTheme();

  return (
    <div className="flex w-full max-w-[2000px] items-center justify-between p-4">
      <Link
        to="/"

        className="flex items-center gap-2.5"
      >
        <img
          className="h-5.5 w-5.5"
          src={`/studystack_icon_${theme === "light" ? "dark" : "light"}.svg`}
        />
        <p className="text-logo font-medium sm:flex">StudyStack</p>
      </Link>

      <div className="h-8.5 w-8.5 cursor-pointer overflow-hidden rounded-full border border-(--color-border-strong)">
        <img
          src={data?.profile_url ?? "/image/user-base-profile.png"}
          alt="User profile"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
