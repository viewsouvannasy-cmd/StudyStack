// library
import { useQuery } from "@tanstack/react-query";

// auth-func
import { getUser } from "./user-func";

const USER_KEY = ["user"];

export const useUser = () => {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: () => getUser(),
    retry: 2,
  });
};
