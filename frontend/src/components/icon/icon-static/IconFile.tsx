import type { IconWithBg } from "../../../types/icon";

export function IconFile({
  size = 35,
  bgSize = 16,
  strokeWidth = 4,
  z = "z-0",
  ...props
}: IconWithBg) {
  return (
    <div
      className={`flex ${z} items-center justify-center bg-[#eff6ff]`}
      style={{
        height: bgSize * 4,
        width: bgSize * 4,
        borderRadius: Math.floor((bgSize * 4) / 3),
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size - 9}
        viewBox="0 0 31 40"
        role="img"
        aria-labelledby="file-logo-title file-logo-desc"
        {...props}
      >
        <title id="file-logo-title">File document logo</title>
        <desc id="file-logo-desc">A blue outlined document file logo.</desc>

        <path
          d="M3 4.5C3 2.84 4.34 1.5 6 1.5H19.5L28 10V35.5C28 37.16 26.66 38.5 25 38.5H6C4.34 38.5 3 37.16 3 35.5V4.5Z"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        <path
          d="M19.5 1.5V10H28"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />

        <path
          d="M9 20H22M9 28H22"
          fill="none"
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
