import type { SVGProps } from "react";

export interface Icon extends SVGProps<SVGSVGElement> {
  size?: number;
}

export interface IconWithBg extends Icon {
  h?: string;
  w?: string;
  z?: string;
}

export interface IconEyeType extends Icon {
  isShowPassword: boolean;
}
