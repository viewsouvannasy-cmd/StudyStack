import assert from "node:assert/strict";
import test from "node:test";

const { validateFormatEmail } = await import("../src/utils/validation.ts");

test("validateFormatEmail accepts Gmail usernames at the supported boundaries", () => {
  assert.equal(validateFormatEmail("abcdef@gmail.com"), true);
  assert.equal(validateFormatEmail(`${"a".repeat(30)}@gmail.com`), true);
});

test("validateFormatEmail rejects Gmail usernames outside the supported boundaries", () => {
  assert.equal(validateFormatEmail("abcde@gmail.com"), false);
  assert.equal(validateFormatEmail(`${"a".repeat(31)}@gmail.com`), false);
});

test("validateFormatEmail rejects malformed or non-Gmail addresses", () => {
  for (const address of [
    ".abcdef@gmail.com",
    "abcdef.@gmail.com",
    "abc..def@gmail.com",
    "abc_def@gmail.com",
    "abcdef+tag@gmail.com",
    "abcdef@example.com",
    "abcdef@GMAIL.COM",
    "not-an-email",
  ]) {
    assert.equal(validateFormatEmail(address), false, address);
  }
});
