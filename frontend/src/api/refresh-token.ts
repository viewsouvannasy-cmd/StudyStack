import axios from "axios";
import { saveAccessToken, clearAccessToken } from "../token/access-token";
import { getEnv } from "../utils/getEnv";

let refreshPromise: null | Promise<void> = null;

const fetchRefreshToken = async () => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = axios
    .get(`${getEnv("VITE_SERVER_HOST")}/api/refresh-token`, {
      withCredentials: true,
    })
    .then((response) => {
      saveAccessToken(response.data.accessToken);
    })
    .catch((error) => {
      clearAccessToken();
      window.location.href = "/";
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

export { fetchRefreshToken };
