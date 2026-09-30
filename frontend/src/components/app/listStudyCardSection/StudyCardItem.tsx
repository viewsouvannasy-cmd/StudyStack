// component
import { IconPlay } from "../../icon/icon-static/IconPlay";
import { IconThreeDot } from "../../icon/icon-static/IconThreeDot";

// constands
import { STUDY_CARD_COLOR_PATTERNS } from "../../../constants/color";

interface StudyCardItemProps {
  color: "blue" | "violet" | "amber" | "rose" | "teal" | "green";
}

export function StudyCardItem({ color }: StudyCardItemProps) {
  const pattern = STUDY_CARD_COLOR_PATTERNS[color];

  return (
    <div
      style={{
        backgroundColor: pattern.bg,
      }}
      className="relative flex cursor-pointer flex-col overflow-hidden rounded-xl bg-(--color-surface-subtle) transition-shadow duration-200 hover:shadow-(--shadow-card)"
    >
      <div
        className="absolute -bottom-5 flex h-20 w-100 blur-lg"
        style={{ backgroundColor: pattern.blur }}
      ></div>
      <div className="z-1 flex flex-col gap-px p-2 sm:p-3">
        <div className="flex h-30 w-full items-center justify-center">
          <IconPlay
            className="h-full w-full"
            size={40}
            color={pattern.stroke}
          />
        </div>
        <div className="flex flex-1 flex-col">
          <p className="sml:text-subsection text-body overflow-hidden font-medium text-ellipsis whitespace-nowrap">
            Introduce Supply and Demand
          </p>
          <div className="sml:flex-row flex flex-col gap-1.5">
            <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
              <p className="text-caption">8 Chapters</p>
            </div>
            <p className="sml:flex hidden">&middot;</p>
            <div className="flex items-center gap-1 [&>svg]:hidden min-[430px]:[&>svg]:flex">
              <p className="text-caption">3h 45mn</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex w-[70%] overflow-hidden">
            <div
              style={{
                color: pattern.stroke,
              }}
              className="text-caption max-w-full min-w-0 truncate rounded-full bg-white/50 px-3 py-1 font-medium"
            >
              MIT OpenCoruseWare
            </div>
          </div>
          <div className="flex items-center justify-center rounded-full bg-[rgba(255,255,255,0.5)] p-1">
            <IconThreeDot size={18} color={pattern.stroke} />
          </div>
        </div>
      </div>
    </div>
  );
}
