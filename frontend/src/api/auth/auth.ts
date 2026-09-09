//  library
import { useMutation } from "@tanstack/react-query";

// auth-func
import { signup, verifyOtp } from "./auth-func";

// type
import type {
  ResponseStatus,
  authAccept,
  ResponseOtp,
  authAcceptOtp,
} from "../../types/auth-type";
import type { AxiosError } from "axios";

const useSignup = () => {
  return useMutation<ResponseStatus, AxiosError<ResponseStatus>, authAccept>({
    mutationFn: signup,
  });
};

const useVerifyOpt = () => {
  return useMutation<ResponseStatus, AxiosError<ResponseOtp>, authAcceptOtp>({
    mutationFn: verifyOtp,
  });
};

export { useSignup, useVerifyOpt };
