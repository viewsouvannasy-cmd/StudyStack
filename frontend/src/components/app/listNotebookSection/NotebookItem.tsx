// component
import { VideoThumbnail } from "../../thumbnail/VideoThumbnail";
import { IconBook } from "../../icon/icon-static/IconBook";
import { IconClock } from "../../icon/icon-static/IconClock";
import { IconThreeDot } from "../../icon/icon-static/IconThreeDot";

// context
import useTheme from "../../../theme/useTheme";

export function NotebookItem() {
  const { theme } = useTheme();
  return (
    <div className="flex cursor-pointer flex-col gap-1 rounded-lg border border-(--color-border-strong) bg-(--color-surface-subtle) transition-shadow duration-200 hover:shadow-(--shadow-card)">
      <div className="flex flex-col gap-2 px-2 pt-2 sm:px-3 sm:pt-3">
        <div className="h-30 w-full overflow-hidden rounded-lg">
          <VideoThumbnail className="h-full w-full" size={30} color="blue" />
        </div>
        <div className="flex flex-1 flex-col">
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
        </div>
      </div>
      <div className="flex items-center justify-between overflow-hidden border-t border-t-(--color-border-strong) px-2 py-1 sm:px-3 sm:py-2">
        <div className="flex w-[70%]">
          <div
            className={`flex max-w-full justify-self-start overflow-hidden rounded-full bg-gray-200 px-3 py-1`}
          >
            <span className="text-caption overflow-hidden font-medium text-ellipsis whitespace-nowrap">
              MIT OpenCoruseWare
            </span>
          </div>
        </div>
        <IconThreeDot size={20} color="#525252" />
      </div>
    </div>
  );
}
