// component
import { IconSideBar } from "../../../icon/icon-static/IconSideBar";

// main component
import { TabHeader } from "./TabHeader";
import { HeroSection } from "./HeroSection";
import { CreditSourceSection } from "./CreditSourceSection";

import { ListChapterSection } from "./ListChapterSection";

interface StudySectionProps {
  sci_id: string;
  section: string;
}

export function StudySection({ sci_id, section }: StudySectionProps) {
  return (
    <div className="mb-20 flex w-full max-w-[2000px] items-start justify-between gap-3 p-4">
      <div className="min-w-0 flex-1 rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300">
        <TabHeader sci_id={sci_id} section={section} />

        <div className="flex flex-col gap-6 p-4">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Overview</span>
            {/* <div className="flex items-center gap-2">
              <div className="text-caption rounded-sm border border-(--color-border-strong) bg-(--color-surface-muted) p-1 px-2 text-(--color-text-secondary)">
                Youtube Video
              </div>
              <div className="text-caption rounded-sm border border-(--color-border-strong) bg-(--color-surface-muted) p-1 px-2 text-(--color-text-secondary)">
                Comment
              </div>
              <div className="text-caption rounded-sm border border-(--color-border-strong) bg-(--color-surface-muted) p-1 px-2 text-(--color-text-secondary)">
                20K take
              </div>
              <div className="text-caption rounded-sm border border-(--color-border-strong) bg-(--color-surface-muted) p-1 px-2 text-(--color-text-secondary)">
                5K star
              </div>
            </div> */}
          </div>

          <HeroSection sci_id={sci_id} />
          <ListChapterSection sci_id={sci_id} />
          <CreditSourceSection sci_id={sci_id} />

          <div className="flex items-center justify-between">
            <span className="text-caption text-(--color-text-secondary)">
              Generate new quizs <br /> when you finish your current chapter
            </span>
            <button
              type="submit"
              className="group relative flex cursor-pointer justify-center justify-self-end overflow-hidden rounded-lg p-2 px-6 shadow-lg"
            >
              <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
              <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <span className="text-small relative">Start</span>
            </button>
          </div>
        </div>
      </div>

      <div className="sticky top-4 h-140 w-[35%] rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300">
        <div className="border-b border-(--color-border-strong) p-1">
          <button className="flex size-9 cursor-pointer items-center justify-center rounded-full border border-(--color-border-strong) transition-colors duration-200 hover:bg-(--color-primary-soft)">
            <IconSideBar size={19} />
          </button>
        </div>
      </div>
    </div>
  );
}
