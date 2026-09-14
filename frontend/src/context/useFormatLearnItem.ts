import { create } from "zustand";

interface UseFormatLearnItem {
  format: "grid" | "line";
  selectFormat: (format: "grid" | "line") => void;
}

const useFormatLearnItem = create<UseFormatLearnItem>((set) => ({
  format: (localStorage.getItem("format_item") as "line" | "grid") || "grid",

  selectFormat: (format) => {
    set({ format });
    localStorage.setItem("format_item", format);
  },
}));

export default useFormatLearnItem;
