import type { Icon } from "../../types/icon";

export function VideoThumbnail({ color, size = 22, strokeWidth = 5 }: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 46"
      width={size}
      height={size}
    >
      <polygon
        points="4,4 4,42 36,23"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
