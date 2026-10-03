// library
import { Link } from "@tanstack/react-router";

// component
import { IconArrow } from "../../../icon/icon-static/IconArrow";

interface TabHeaderProp {
  sci_id: string;
  section: string;
}

export function TabHeader({ sci_id, section }: TabHeaderProp) {
  return (
    <div className="flex items-center justify-between border-b border-(--color-border-strong) p-1">
      <div className="flex items-center gap-2">
        <Link
          to="/app/study-card"
          type="submit"
          className="group relative flex size-9 cursor-pointer justify-center justify-self-end overflow-hidden rounded-full shadow"
        >
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
          <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <span className="relative flex items-center justify-center">
            <IconArrow className="rotate-270" color="#fff" size={25} />
          </span>
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
  );
}
