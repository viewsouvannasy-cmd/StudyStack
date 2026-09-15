import type { IconStatic } from "../../../types/icon/icon-static";

export function IconBook({
  size = 24,
  color = "#000",
  strokeWidth = 2.2,
}: IconStatic) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 2 11 Q 14 5 24 11 L 24 41.5 Q 12 34.75 2 39 Z" />
      <path d="M 46 11 Q 34 5 24 11 L 24 41.5 Q 36 34.75 46 39 Z" />
    </svg>
  );
}
