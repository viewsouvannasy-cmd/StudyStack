import type { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {
  size?: number;
}

// h = height , w = width , z = z-index , r = rounded
export interface IconWithBg extends Icon {
  h?: string;
  w?: string;
  z?: string;
  r?: string;
}

export interface IconEyeType extends Icon {
  isShowPassword: boolean;
}
