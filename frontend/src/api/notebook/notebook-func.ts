import axios from "axios";
import { getEnv } from "../../utils/getEnv";
import { getAccessToken } from "../../token/access-token";
import { handleAccessTokenError } from "../../utils/handleError";

// type
import type { ResponseStatus } from "../../types/auth-type";

const createNotebookWithYouTube = async (
  isRetry = false,
  { video_link }: { video_link: string },
): Promise<{ ok: boolean; results?: string }> => {
  try {
    const accessToken = getAccessToken();
    const response = await axios.post(
      `${getEnv("VITE_SERVER_HOST")}/api/notebook/create`,
      { video_link },
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError<ResponseStatus>(error) &&
      error.response &&
      error.response.status !== 401
    ) {
      throw error;
    }

    return await handleAccessTokenError(error, isRetry, () =>
      createNotebookWithYouTube(true, { video_link }),
    );
  }
};
export default createNotebookWithYouTube;
