// components
import { IconPlus } from "../icon/icon-static/IconPlus";
import { IconClock } from "../icon/icon-static/IconClock";
import { IconBook } from "../icon/icon-static/IconBook";

// context
import useTheme from "../../theme/useTheme";
import useOpenPopup from "../../context/useOpenPopup";

interface DisplayItemSectionProps {
  tab: string;
  title: string;
}

export function DisplayItemSection({ title }: DisplayItemSectionProps) {
  const { theme } = useTheme();

  const { handleOpenPopup } = useOpenPopup();

  return (
    <div className="flex w-full max-w-300 flex-col gap-3 p-4">
      <h1 className="text-section">{title}</h1>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        <div
          onClick={() => handleOpenPopup("add-soruse")}
          className="group relative flex min-h-53.5 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-(--color-border-strong) bg-(--color-background)"
        >
          <div className="relative z-10 overflow-hidden rounded-full bg-(--color-primary-soft) p-3 before:absolute before:right-0 before:bottom-0 before:left-0 before:-z-10 before:h-0 before:bg-amber-200 before:bg-linear-to-t before:from-(--color-primary-soft) before:to-(--color-primary) before:mask-[linear-gradient(to_top,black_85%,transparent_100%)] before:transition-[height] before:duration-200 before:ease-in-out group-hover:before:h-full">
            <IconPlus
              size={30}
              color={theme === "light" ? "#2c7aff" : "#fff"}
            />
          </div>
          <p className="sml:text-body text-caption z-10">Create New Learning</p>
        </div>

        <div className="flex cursor-pointer flex-col gap-2 rounded-md border border-(--color-border-strong) bg-(--color-surface-muted) p-3 transition-shadow duration-200 hover:shadow-(--shadow-card)">
          <div className="h-25 w-full overflow-hidden rounded border border-(--color-border-strong)">
            <img src="/test-image.jpg" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <p className="sml:text-large-body text-body overflow-hidden font-medium text-ellipsis whitespace-nowrap">
              Introduce Supply and Demand
            </p>
            <div className="sml:flex-row flex flex-col gap-1.5">
              <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
                <IconBook
                  size={16}
                  color={theme === "light" ? "#525252" : "#d4d4d4"}
                  strokeWidth={3.5}
                />
                <p className="text-caption text-(--color-text-secondary)">
                  8 Chapters
                </p>
              </div>
              <p className="sml:flex hidden text-(--color-text-secondary)">
                &middot;
              </p>
              <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
                <IconClock
                  size={16}
                  color={theme === "light" ? "#525252" : "#d4d4d4"}
                />
                <p className="text-caption text-(--color-text-secondary)">
                  3h 45mn
                </p>
              </div>
            </div>
            <div className="flex items-center justify-start gap-1.5 overflow-hidden">
              <div className="text-caption rounded-full bg-purple-200 px-3.5 py-0.5 text-purple-600">
                Stanford
              </div>
              <p className="text-caption">|</p>
              <p className="text-caption overflow-hidden text-ellipsis whitespace-nowrap text-(--color-text-secondary)">
                18 / 01 / 2037
              </p>
            </div>
          </div>
        </div>

        <div className="min-h-53.5 border"></div>
        <div className="min-h-53.5 border"></div>
        <div className="min-h-53.5 border"></div>
        <div className="min-h-53.5 border"></div>
        <div className="min-h-53.5 border"></div>
      </div>
    </div>
  );
}
