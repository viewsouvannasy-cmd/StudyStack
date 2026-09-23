import type { Icon } from "../../../types/icon";

interface IconThreeDotProps extends Icon {
  vertical?: boolean;
}

export function IconThreeDot({
  size = 22,
  vertical = true,
  color = "#000",
  ...props
}: IconThreeDotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      {...props}
    >
      <g transform={vertical ? "rotate(90 12 12)" : undefined}>
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
      </g>
    </svg>
  );
}
