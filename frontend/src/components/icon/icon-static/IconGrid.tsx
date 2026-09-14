interface GridIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function IconGrid({
  size = 24,
  color = "#000000",
  strokeWidth = 1.5,
}: GridIconProps) {
  const r = 1.2; // corner radius (relative units)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx={r}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <rect
        x="14"
        y="3"
        width="8"
        height="8"
        rx={r}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <rect
        x="3"
        y="14"
        width="8"
        height="8"
        rx={r}
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <rect
        x="14"
        y="14"
        width="8"
        height="8"
        rx={r}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
}
