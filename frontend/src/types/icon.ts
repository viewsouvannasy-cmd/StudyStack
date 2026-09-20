import type { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {
  size?: number;
}

// bgSize 1 equal to 4px , z = z-index
export interface IconWithBg extends Icon {
  bgSize?: number;
  z?: string;
}

export interface IconEyeType extends Icon {
  isShowPassword: boolean;
}
