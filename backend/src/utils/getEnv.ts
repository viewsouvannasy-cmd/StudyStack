export function getEnv(value: string): string {
  const envValue = process.env[value];
  if (!envValue) {
    throw new Error(`${value} is not set`);
  }

  return envValue;
}
