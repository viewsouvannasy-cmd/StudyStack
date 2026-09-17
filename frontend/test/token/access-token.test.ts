import { it, expect, describe } from "vitest";
import {
  getAccessToken,
  saveAccessToken,
  clearAccessToken,
} from "../../src/token/access-token";

describe("getAccessToken / saveAccessToken / clearAccessToken", () => {
  it("return null by defaults", () => {
    expect(getAccessToken()).toBe(null);
  });

  it("return save token after call saveAccessToken", () => {
    saveAccessToken("123abc");
    expect(getAccessToken()).toBe("123abc");
  });

  it("clear token after call clearAccessToken", () => {
    saveAccessToken("123abc");
    clearAccessToken();
    expect(getAccessToken()).toBe(null);
  });
});
