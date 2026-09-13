// library
import axios from "axios";

// helper function
import { getEnv } from "../../utils/getEnv";
import { getAccessToken } from "../../token/access-token";

import { handleAccessTokenError } from "../../utils/handleError";

// type
import type { User } from "../../types/Data";

const getUser = async (isRetry = false): Promise<User> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.get(
      `${getEnv("VITE_SERVER_HOST")}/api/user/get`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data.result;
  } catch (error) {
    return await handleAccessTokenError(error, isRetry, getUser);
  }
};

export { getUser };
