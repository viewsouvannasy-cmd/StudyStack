import { create } from "zustand";

interface UseTheme {
  theme: "light" | "dark" | string;
  toggleTheme: () => void;
}

const useTheme = create<UseTheme>((set) => ({
  theme: getTheme(),

  toggleTheme: () => {
    toggleTheme();
    set({ theme: getTheme() });
  },
}));

export default useTheme;

function getTheme(): string {
  const theme = localStorage.getItem("theme") || "light";
  return theme;
}

function saveTheme() {
  const nextTheme = getTheme() === "light" ? "dark" : "light";
  localStorage.setItem("theme", nextTheme);
}

function addAndRemoveTransition() {
  const root = document.documentElement;

  root.classList.add("theme-transitioning");

  setTimeout(() => {
    root.classList.remove("theme-transitioning");
  }, 300);
}

export function setupTheme() {
  document.documentElement.setAttribute("data-theme", getTheme());
}

function toggleTheme() {
  addAndRemoveTransition();
  document.documentElement.setAttribute(
    "data-theme",
    document.documentElement.dataset.theme === "dark" ? "light" : "dark",
  );
  saveTheme();
}
