import { useState, useEffect } from "react";

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const hanlder = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    mediaQuery.addEventListener("change", hanlder);
    return () => mediaQuery.removeEventListener("change", hanlder);
  }, [query]);

  return matches;
}

export default useMediaQuery;
