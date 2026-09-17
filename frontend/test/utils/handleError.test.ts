import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axios from "axios";
import { handleAccessTokenError } from "../../src/utils/handleError";
import { fetchRefreshToken } from "../../src/api/refresh-token";

vi.mock("../../src/api/refresh-token", () => ({
  fetchRefreshToken: vi.fn(),
}));

function axiosError(status: number, data: unknown) {
  return {
    isAxiosError: true,
    response: { status, data },
    message: "request failed",
  };
}

describe("handleAccessTokenError", () => {
  const fetchRefreshTokenMock = vi.mocked(fetchRefreshToken);
  const originalLocation = window.location;

  beforeEach(() => {
    fetchRefreshTokenMock.mockReset();
    fetchRefreshTokenMock.mockResolvedValue(undefined);

    Object.defineProperty(window, "location", {
      configurable: true,
      value: { href: "http://localhost/" },
    });
  });

  afterEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });
    vi.restoreAllMocks();
  });

  it("refreshes the token and retries when the access token is expired", async () => {
    const retryResult = { id: "user-1" };
    const func = vi.fn().mockResolvedValue(retryResult);
    const error = axiosError(401, {
      ok_verify_token: false,
      code: "TOKEN_EXPIRED",
    });

    await expect(handleAccessTokenError(error, false, func)).resolves.toEqual(
      retryResult,
    );

    expect(fetchRefreshTokenMock).toHaveBeenCalledOnce();
    expect(func).toHaveBeenCalledWith(true);
  });

  it("refreshes the token and retries when the access token is missing", async () => {
    const func = vi.fn().mockResolvedValue("ok");
    const error = axiosError(401, {
      ok_verify_token: false,
      code: "TOKEN_MISSING",
    });

    await expect(handleAccessTokenError(error, true, func)).resolves.toBe("ok");

    expect(fetchRefreshTokenMock).toHaveBeenCalledOnce();
    expect(func).toHaveBeenCalledWith(true);
  });

  it("refreshes and retries on first 401 even when the code is not expired or missing", async () => {
    const func = vi.fn().mockResolvedValue("retried");
    const error = axiosError(401, {
      ok_verify_token: false,
      code: "TOKEN_INVALID",
    });

    await expect(handleAccessTokenError(error, false, func)).resolves.toBe(
      "retried",
    );

    expect(fetchRefreshTokenMock).toHaveBeenCalledOnce();
    expect(func).toHaveBeenCalledWith(true);
  });

  it("redirects home when the token is invalid after a retry", async () => {
    const func = vi.fn();
    const error = axiosError(401, {
      ok_verify_token: false,
      code: "TOKEN_INVALID",
    });

    await expect(handleAccessTokenError(error, true, func)).rejects.toBe(error);

    expect(fetchRefreshTokenMock).not.toHaveBeenCalled();
    expect(func).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/");
  });

  it("redirects to /error for other axios responses", async () => {
    const func = vi.fn();
    const error = axiosError(500, { message: "server error" });

    await expect(handleAccessTokenError(error, false, func)).rejects.toBe(error);

    expect(fetchRefreshTokenMock).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/error");
  });

  it("redirects to /error for 401 responses that already verified the token", async () => {
    const func = vi.fn();
    const error = axiosError(401, { ok_verify_token: true });

    await expect(handleAccessTokenError(error, false, func)).rejects.toBe(error);

    expect(fetchRefreshTokenMock).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/error");
  });

  it("redirects home for non-axios errors", async () => {
    const func = vi.fn();
    const error = new Error("network down");

    await expect(handleAccessTokenError(error, false, func)).rejects.toBe(error);

    expect(axios.isAxiosError(error)).toBe(false);
    expect(fetchRefreshTokenMock).not.toHaveBeenCalled();
    expect(window.location.href).toBe("/");
  });
});
