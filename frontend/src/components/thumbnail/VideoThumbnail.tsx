import type { Icon } from "../../types/icon";

interface ThumbnailProps extends Icon {
  color: "blue" | "violet" | "amber" | "rose" | "teal" | "green";
  className?: string;
}

import { THUMBNAIL_COLOR_PATTERNS } from "../../constants/color";

export function VideoThumbnail({
  color,
  size = 22,
  strokeWidth = 5,
  className,
}: ThumbnailProps) {
  const pattern = THUMBNAIL_COLOR_PATTERNS[color];

  return (
    <div
      style={{
        backgroundColor: pattern.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 40 46"
        width={size}
        height={size}
      >
        <polygon
          points="4,4 4,42 36,23"
          fill="none"
          stroke={pattern.stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

interface ClannelProps {
  name: string;
  color: "blue" | "violet" | "amber" | "rose" | "teal" | "green";
  className: string;
}

export function Clannel({ name, color, className }: ClannelProps) {
  const pattern = THUMBNAIL_COLOR_PATTERNS[color];

  return (
    <div
      className={className}
      style={{ backgroundColor: pattern.bg, color: pattern.stroke }}
    >
      {name}
    </div>
  );
}
