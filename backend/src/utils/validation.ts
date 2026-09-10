function validateFormatEmail(email: string): boolean {
  const regexEmail =
    /^(?!.*\.\.)[a-zA-Z0-9](?:[a-zA-Z0-9.]{4,28}[a-zA-Z0-9])?@gmail\.com$/;
  return regexEmail.test(email);
}

export { validateFormatEmail };
