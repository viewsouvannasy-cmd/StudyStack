import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useMediaQuery from "../../src/hook/useMediaQuery";

type MatchMediaMock = {
  matches: boolean;
  media: string;
  addEventListener: ReturnType<typeof vi.fn>;
  removeEventListener: ReturnType<typeof vi.fn>;
  dispatchChange: (matches: boolean) => void;
};

function createMatchMedia(initialMatches: boolean): MatchMediaMock {
  const listeners = new Set<(event: MediaQueryListEvent) => void>();

  const mediaQueryList: MatchMediaMock = {
    matches: initialMatches,
    media: "",
    addEventListener: vi.fn((event: string, listener: EventListener) => {
      if (event === "change") {
        listeners.add(listener as (e: MediaQueryListEvent) => void);
      }
    }),
    removeEventListener: vi.fn((event: string, listener: EventListener) => {
      if (event === "change") {
        listeners.delete(listener as (e: MediaQueryListEvent) => void);
      }
    }),
    dispatchChange(matches: boolean) {
      mediaQueryList.matches = matches;
      const event = { matches } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  };

  return mediaQueryList;
}

describe("useMediaQuery", () => {
  let originalMatchMedia: typeof window.matchMedia;

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it("returns true when the media query matches on mount", () => {
    const media = createMatchMedia(true);
    window.matchMedia = vi.fn().mockReturnValue(media);

    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 640px)");
    expect(result.current).toBe(true);
  });

  it("returns false when the media query does not match on mount", () => {
    const media = createMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(media);

    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    expect(result.current).toBe(false);
  });

  it("updates when the media query change event fires", () => {
    const media = createMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(media);

    const { result } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    expect(result.current).toBe(false);

    act(() => {
      media.dispatchChange(true);
    });

    expect(result.current).toBe(true);
  });

  it("subscribes to change and unsubscribes on unmount", () => {
    const media = createMatchMedia(false);
    window.matchMedia = vi.fn().mockReturnValue(media);

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 640px)"));

    expect(media.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );

    const handler = media.addEventListener.mock.calls[0][1];

    unmount();

    expect(media.removeEventListener).toHaveBeenCalledWith("change", handler);
  });

  it("resubscribes when the query changes", () => {
    const firstMedia = createMatchMedia(true);
    const secondMedia = createMatchMedia(false);
    window.matchMedia = vi
      .fn()
      .mockReturnValueOnce(firstMedia)
      .mockReturnValueOnce(firstMedia)
      .mockReturnValueOnce(secondMedia)
      .mockReturnValueOnce(secondMedia);

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      { initialProps: { query: "(min-width: 640px)" } },
    );

    expect(result.current).toBe(true);

    rerender({ query: "(min-width: 1024px)" });

    expect(firstMedia.removeEventListener).toHaveBeenCalled();
    expect(secondMedia.addEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function),
    );
    expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
  });
});
