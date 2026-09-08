//  library
import { useMutation } from "@tanstack/react-query";

// auth-func
import { signup } from "./auth-func";

// type
import type { ResponseStatus, authAccept } from "../../types/auth-type";
import type { AxiosError } from "axios";

export const useSignup = () => {
  return useMutation<ResponseStatus, AxiosError<ResponseStatus>, authAccept>({
    mutationFn: signup,
  });
};
