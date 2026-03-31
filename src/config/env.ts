type AppEnvironment = "development" | "staging" | "production";

function readEnv(name: keyof ImportMetaEnv): string | undefined {
  return import.meta.env[name];
}

function readOptionalEnv(name: keyof ImportMetaEnv, fallback = ""): string {
  return readEnv(name) ?? fallback;
}

function readRequiredEnv(name: keyof ImportMetaEnv): string {
  const value = readEnv(name);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function normalizeEnvironment(value: string): AppEnvironment {
  if (value === "staging" || value === "production") {
    return value;
  }

  return "development";
}

export const env = {
  appEnv: normalizeEnvironment(readOptionalEnv("VITE_APP_ENV", "development")),
  apiBaseUrl: readRequiredEnv("VITE_API_BASE_URL"),
} as const;
