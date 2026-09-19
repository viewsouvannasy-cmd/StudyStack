import type { IconWithBg } from "../../../types/icon";

export function IconYouTube({
  size = 33,
  h = "h-16",
  w = "w-16",
  z = "z-0",
  r = "rounded-[20px]",
  strokeWidth = 3.5,
  ...props
}: IconWithBg) {
  return (
    <div
      className={`flex ${h} ${w} ${z} ${r} items-center justify-center bg-[#FFF0F2]`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size - 11}
        viewBox="0 0 39 28"
        role="img"
        aria-labelledby="youtube-logo-title youtube-logo-desc"
        {...props}
      >
        <title id="youtube-logo-title">YouTube logo</title>
        <desc id="youtube-logo-desc">A red outlined YouTube play logo.</desc>

        <rect
          x="1.75"
          y="1.75"
          width="35.5"
          height="24.5"
          rx="5.25"
          fill="none"
          stroke="#d94652"
          strokeWidth={strokeWidth}
        />

        <path
          d="M16 8.5 L16 19.5 L25.5 14 Z"
          fill="none"
          stroke="#d94652"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
