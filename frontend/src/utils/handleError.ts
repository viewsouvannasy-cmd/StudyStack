import axios from "axios";
import { fetchRefreshToken } from "../api/refresh-token";

export const handleAccessTokenError = async <T>(
  error: unknown,
  isRetry: boolean,
  retry: () => Promise<T>,
): Promise<T> => {
  if (axios.isAxiosError(error) && error.response) {
    if (error.response.status === 401 && !error.response.data.ok_verify_token) {
      const code = error.response.data.code;

      if (code === "TOKEN_EXPIRED" || code === "TOKEN_MISSING" || !isRetry) {
        await fetchRefreshToken();
        return await retry();
      }

      if (error.response.data.code === "TOKEN_INVALID") {
        window.location.href = "/";
        throw error;
      }
    }

    window.location.href = "/error";
    throw error;
  }

  window.location.href = "/";
  throw error;
};
