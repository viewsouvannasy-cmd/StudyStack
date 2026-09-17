import { describe, it, expect, afterEach, vi } from "vitest";
import { getEnv } from "../../src/utils/getEnv";

describe("getEnv", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns the env value when it is set", () => {
    vi.stubEnv("VITE_SERVER_HOST", "http://localhost:3000");

    expect(getEnv("VITE_SERVER_HOST")).toBe("http://localhost:3000");
  });

  it("throws when the env value is missing", () => {
    vi.stubEnv("VITE_MISSING_KEY", "");

    expect(() => getEnv("VITE_MISSING_KEY")).toThrow("VITE_MISSING_KEY is not set");
  });

  it("throws when the env key does not exist", () => {
    expect(() => getEnv("VITE_DOES_NOT_EXIST")).toThrow(
      "VITE_DOES_NOT_EXIST is not set",
    );
  });
});
