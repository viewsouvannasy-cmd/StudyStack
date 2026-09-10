import dns from "dns/promises";

function validateFormatEmail(email: string): boolean {
  const regexEmail =
    /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9.]{4,28}[a-zA-Z0-9])?@gmail\.com$/;
  return regexEmail.test(email);
}

const validateDomainEamil = async (email: string): Promise<boolean> => {
  try {
    const domain = email.split("@")[1];

    if (!domain) {
      return false;
    }

    const mxRecords = await dns.resolveMx(domain);

    return Boolean(mxRecords && mxRecords.length > 0);
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "code" in error) {
      const errCode = (error as { code?: string }).code;
      if (errCode === "ENOTFOUND" || errCode === "ENODATA") {
        return false;
      }
    }

    return false;
  }
};

export { validateDomainEamil, validateFormatEmail };
