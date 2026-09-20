import { useMutation } from "@tanstack/react-query";

// call func
import createNotebookWithYouTube from "./notebook-func";

// tyep
import type { ResponseStatus } from "../../types/auth-type";
import type { AxiosError } from "axios";

export const useCreateNotebook = () => {
  return useMutation<
    { ok: boolean; results?: string },
    AxiosError<ResponseStatus>,
    { video_link: string }
  >({
    mutationFn: (variable) => createNotebookWithYouTube(false, variable),
  });
};
