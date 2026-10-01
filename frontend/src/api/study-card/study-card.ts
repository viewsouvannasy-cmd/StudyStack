import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/queryClient";

// call func
import { createStudyCardWithYouTube, getStudyCard } from "./study-card-func";

// tyep
import type { ResponseStatus } from "../../types/auth-type";
import type { AxiosError } from "axios";

export const useCreateStudyCard = () => {
  return useMutation<
    { ok: boolean; results?: string },
    AxiosError<ResponseStatus>,
    { card_name: string; color: string; video_url: string }
  >({
    mutationFn: (variable) => createStudyCardWithYouTube(false, variable),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study_card"] });
    },
  });
};

export const useGetStudyCard = () => {
  return useQuery({
    queryKey: ["study_card"],
    queryFn: () => getStudyCard(),
  });
};
