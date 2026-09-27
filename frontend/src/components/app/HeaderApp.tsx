// components
import { FullLogo } from "../logo/FullLogo";

// api
import { useUser } from "../../api/user/user";

export function HeaderApp() {
  const { data } = useUser();

  return (
    <div className="flex w-full max-w-[2000px] items-center justify-between p-4">
      <FullLogo classIcon="w-8" />
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
