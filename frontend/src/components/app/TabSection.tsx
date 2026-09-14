import { Link } from "@tanstack/react-router";

// components
import { IconGrid } from "../icon/icon-static/IconGrid";
import { IconLine } from "../icon/icon-static/IconLine";
import { IconSearch } from "../icon/icon-static/IconSearch";

// context
import useFormatLearnItem from "../../context/useFormatLearnItem";
import useTheme from "../../theme/useTheme";

interface TabSectionProp {
  tab: string;
}

export function TabSection({ tab }: TabSectionProp) {
  const { format, selectFormat } = useFormatLearnItem();

  const { theme } = useTheme();

  return (
    <div className="mt-3 flex w-full max-w-250 flex-col-reverse items-center justify-between gap-4 pr-4 pl-4 sm:flex-row">
      <div className="flex gap-2">
        <Link
          to="/app/all"
          className={`${tab === "all" ? "btn-tab-selected" : "btn-tab-not-select"} `}
        >
          All
        </Link>
        <Link
          to="/app/my-learning"
          className={`${tab === "my-learning" ? "btn-tab-selected" : "btn-tab-not-select"} `}
        >
          My Learning
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <button className="cursor-pointer rounded-full border border-(--color-border-strong) p-1.5 transition-colors hover:bg-(--color-primary-soft)">
          <IconSearch
            size={20}
            color={`${theme === "light" ? "#000" : "#fff"}`}
          />
        </button>
        <div className="flex overflow-hidden rounded-md border border-(--color-border-strong)">
          <button
            onClick={() => selectFormat("grid")}
            className={`${format === "grid" ? "bg-(--color-primary-soft) px-4.5" : "px-1.5"} cursor-pointer py-1.5 transition-all duration-100`}
          >
            <IconGrid
              size={20}
              color={`${theme === "light" ? "#000" : "#fff"}`}
            />
          </button>
          <button
            onClick={() => selectFormat("line")}

            className={`${format === "line" ? "bg-(--color-primary-soft) px-4.5" : "px-1.5"} cursor-pointer py-1.5 transition-all duration-100`}
          >
            <IconLine
              size={20}
              color={`${theme === "light" ? "#000" : "#fff"}`}
            />
          </button>
        </div>
        <button className="text-small cursor-pointer rounded-md bg-(--color-background-inverse) p-1.5 pr-3 pl-3 font-medium text-(--color-text-inverse)">
          + Add Source
        </button>
      </div>
    </div>
  );
}
