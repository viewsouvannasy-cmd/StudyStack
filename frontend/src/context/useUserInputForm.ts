import { create } from "zustand";

import type { authAccept } from "../types/auth-type";

interface UseUserInputSignup {
  info: authAccept;
  changeUserInfoForm: (
    which: "user_email" | "user_name" | "user_password",
    value: string,
  ) => void;
}

const useUserInputSignup = create<UseUserInputSignup>((set) => ({
  info: { user_email: "", user_name: "", user_password: "" },

  changeUserInfoForm: (which, value) => {
    set((state) => ({ info: { ...state.info, [which]: value } }));
  },
}));

export default useUserInputSignup;
