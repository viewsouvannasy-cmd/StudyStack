import type { Icon } from "../../../types/icon";

export function IconArrow({ size = 24, color = "#000", ...props }: Icon) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 19V5M12 5L5 12M12 5L19 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
