import type { Icon } from "../../../types/icon";

export function IconPlus({
  size = 24,
  color = "#000",
  strokeWidth = 4,
  ...props
}: Icon) {
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
      {...props}
    >
      <line x1="24" y1="9" x2="24" y2="39" />
      <line x1="9" y1="24" x2="39" y2="24" />
    </svg>
  );
}
