interface IconSearchProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function IconSearch({
  size = 24,
  color = "#000",
  strokeWidth = 3,
}: IconSearchProps) {
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
      <circle cx="20.5" cy="20.5" r="12.5" />
      <line x1="30.636" y1="30.636" x2="40" y2="40" />
    </svg>
  );
}
