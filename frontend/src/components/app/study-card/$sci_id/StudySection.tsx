// library
import { Resizable, type Enable } from "re-resizable";
import { Link } from "@tanstack/react-router";

// component
import { IconArrow } from "../../../icon/icon-static/IconArrow";

// helper function
import { formatDuration } from "../../../../utils/calculate";

// api
import { useGetStudyCardLesson } from "../../../../api/study-card/study-card";

const enableChat: Enable = {
  top: false,
  right: false,
  bottom: false,
  left: true,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

interface StudySectionProps {
  sci_id: string;
  section: string;
}

export function StudySection({ sci_id, section }: StudySectionProps) {
  const { data } = useGetStudyCardLesson(Number(sci_id));

  console.log(data);

  return (
    <div className="flex w-full max-w-[2000px] justify-between gap-3 p-4">
      <div className="flex-1 rounded-2xl border border-(--color-border-strong) shadow-md shadow-olive-300">
        <div className="flex items-center justify-between border-b border-(--color-border-strong) p-1">
          <div className="flex items-center gap-2">
            <Link
              to="/app/study-card"
              className="primary-linear-gradient flex size-9 items-center justify-center rounded-full"
            >
              <IconArrow className="rotate-270" color="#fff" size={25} />
            </Link>

            <Link
              to="/app/study-card/$sci_id/$section"
              params={{ sci_id: sci_id, section: "overview" }}
              className={`text-small flex h-9 items-center rounded-full border border-(--color-border-strong) ${section === "overview" ? "bg-(--color-primary-soft)" : ""} px-3`}
            >
              Overview
            </Link>

            <div className="flex h-9 items-center gap-0.5 overflow-hidden rounded-full border border-(--color-border-strong)">
              <Link
                to="/app/study-card/$sci_id/$section"
                params={{ sci_id: sci_id, section: "chapter-1" }}
                className={`text-small flex h-full items-center rounded-r-md ${section.split("-").includes("chapter") ? "bg-(--color-primary-soft) px-3" : "px-1 pl-3"}`}
              >
                Chapter 1
              </Link>
              <span className="text-small">|</span>
              <Link
                to="/app/study-card/$sci_id/$section/$quizs"
                params={{
                  sci_id: sci_id,
                  section: section === "overview" ? "chaprer-1" : section,
                  quizs: "quizs",
                }}
                className={`text-small flex h-full items-center rounded-l-md ${section === "quizs" ? "bg-(--color-primary-soft) px-3" : "px-1 pr-3"}`}
              >
                Quizs
              </Link>
            </div>
          </div>

          <button className="text-small hidden md:flex"></button>
        </div>

        <div className="p-4">
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
          <h1 className="mt-4 text-3xl font-semibold">{data?.[0].title}</h1>

          <div className="mt-2.5 flex items-center justify-between border-y border-(--color-border-strong) py-4">
            <div className="flex-1">
              <p className="font-medium">{data?.[0].credit_source}</p>
              <span className="text-small text-(--color-text-secondary)">
                Channel
              </span>
            </div>
            <div className="flex-1 border-l border-(--color-border-strong) pl-4">
              <p className="font-medium">
                {data ? formatDuration(data[0].total_length_seconds) : "N/A"}
              </p>
              <span className="text-small text-(--color-text-secondary)">
                Video Length
              </span>
            </div>
            <div className="flex-1 border-l border-(--color-border-strong) pl-4">
              <p className="font-medium">{data?.[0].source_type}</p>
              <span className="text-small text-(--color-text-secondary)">
                Type
              </span>
            </div>
            <div className="flex-1 border-l border-(--color-border-strong) pl-4">
              <p className="font-medium">0</p>
              <span className="text-small text-(--color-text-secondary)">
                Quizs
              </span>
            </div>
          </div>
        </div>
      </div>

      <Resizable
        enable={enableChat}
        defaultSize={{ width: "30%", height: "auto" }}
        minWidth="20%"
        maxWidth="40%"
        className="shadow shadow-olive-500"
      >
        <div>chat</div>
      </Resizable>
    </div>
  );
}
