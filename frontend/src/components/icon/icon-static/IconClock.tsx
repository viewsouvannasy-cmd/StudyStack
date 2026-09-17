import type { Icon } from "../../../types/icon";

export function IconClock({
  size = 24,
  color = "#000",
  strokeWidth = 1.5,
  ...props
}: Icon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
