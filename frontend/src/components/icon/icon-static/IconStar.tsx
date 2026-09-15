import type { IconStatic } from "../../../types/icon/icon-static";

export function IconStarFill({ size = 24, color = "#000" }: IconStatic) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill={color}
    >
      <path d="M 22.618 8.716 Q 24.000 5.500 25.382 8.716 L 28.127 15.102 Q 28.996 17.123 31.187 17.325 L 38.109 17.962 Q 41.595 18.283 38.964 20.591 L 33.738 25.176 Q 32.084 26.627 32.569 28.772 L 34.102 35.553 Q 34.874 38.967 31.866 37.178 L 25.891 33.625 Q 24.000 32.500 22.109 33.625 L 16.134 37.178 Q 13.126 38.967 13.898 35.553 L 15.431 28.772 Q 15.916 26.627 14.262 25.176 L 9.036 20.591 Q 6.405 18.283 9.891 17.962 L 16.813 17.325 Q 19.004 17.123 19.873 15.102 L 22.618 8.716 Z" />
    </svg>
  );
}

export function IconStarOutline({
  size = 24,
  color = "#000",
  strokeWidth = 2,
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
      <path d="M 22.618 8.716 Q 24.000 5.500 25.382 8.716 L 28.127 15.102 Q 28.996 17.123 31.187 17.325 L 38.109 17.962 Q 41.595 18.283 38.964 20.591 L 33.738 25.176 Q 32.084 26.627 32.569 28.772 L 34.102 35.553 Q 34.874 38.967 31.866 37.178 L 25.891 33.625 Q 24.000 32.500 22.109 33.625 L 16.134 37.178 Q 13.126 38.967 13.898 35.553 L 15.431 28.772 Q 15.916 26.627 14.262 25.176 L 9.036 20.591 Q 6.405 18.283 9.891 17.962 L 16.813 17.325 Q 19.004 17.123 19.873 15.102 L 22.618 8.716 Z" />
    </svg>
  );
}
