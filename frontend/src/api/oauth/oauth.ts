import { getEnv } from "../../utils/getEnv";

export const googleLogin = () => {
  window.location.href = `${getEnv("VITE_SERVER_HOST")}/api/oauth/google`;
};
