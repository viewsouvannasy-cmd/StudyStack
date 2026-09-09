// library
import axios from "axios";

// helper function
import { getEnv } from "../../utils/getEnv";

// type
import type {
  ResponseStatus,
  authAccept,
  authAcceptOtp,
} from "../../types/auth-type";

const signup = async ({
  user_email,
  user_name,
  user_password,
}: authAccept): Promise<ResponseStatus> => {
  const response = await axios.post(
    `${getEnv("VITE_SERVER_HOST")}/api/auth/signup`,
    { user_email, user_name, user_password },
    { withCredentials: true },
  );
  return response.data;
};

const verifyOtp = async ({
  user_email,
  user_name,
  user_password,
  otp_code,
}: authAcceptOtp) => {
  const response = await axios.post(
    `${getEnv("VITE_SERVER_HOST")}/api/auth/verify-otp`,
    { user_email, user_name, user_password, otp_code },
    { withCredentials: true },
  );

  return response.data;
};

export { signup, verifyOtp };
