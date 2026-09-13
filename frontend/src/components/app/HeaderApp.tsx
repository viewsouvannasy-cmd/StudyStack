// library
import { Link } from "@tanstack/react-router";

// api
import { useUser } from "../../api/user/user";

export function HeaderApp() {
  const { data } = useUser();

  return (
    <div className="flex w-full max-w-[2000px] items-center justify-between p-4">
      <Link
        to="/"

        className="flex items-center gap-2.5"
      >
        <img className="h-6 w-6" src="/studystack_icon.svg" />
        <p className="text-logo font-medium sm:flex">StudyStack</p>
      </Link>

      <div className="h-10 w-10 cursor-pointer overflow-hidden rounded-full border border-(--color-border-strong)">
        <img
          src={data?.profile_url ?? "/image/user-base-profile.png"}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
