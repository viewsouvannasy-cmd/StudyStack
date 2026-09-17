import { create } from "zustand";

interface UseOpenPopup {
  isOpen: null | string;
  isAnimation: "open" | "close";
  handleOpenPopup: (popup: string) => void;
  handlerClosePopup: (isDT?: boolean) => void;
}

const useOpenPopup = create<UseOpenPopup>((set) => ({
  isOpen: null,
  isAnimation: "close",

  handleOpenPopup: (popup) => {
    document.body.style.overflow = "hidden";

    set({ isOpen: popup, isAnimation: "open" });
  },

  handlerClosePopup: (isDT = false) => {
    set({ isAnimation: "close" });
    const delay = isDT ? 100 : 300;

    setTimeout(() => {
      document.body.style.overflow = "unset";
      set({ isOpen: null });
    }, delay);
  },
}));

export default useOpenPopup;
