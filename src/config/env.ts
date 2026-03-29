type AppEnvironment = "development" | "staging" | "production";

function readEnv(name: keyof ImportMetaEnv): string | undefined {
  return import.meta.env[name];
}

function readOptionalEnv(name: keyof ImportMetaEnv, fallback = ""): string {
  return readEnv(name) ?? fallback;
}

function normalizeEnvironment(value: string): AppEnvironment {
  if (value === "staging" || value === "production") {
    return value;
  }

  return "development";
}

export const env = {
  appEnv: normalizeEnvironment(readOptionalEnv("VITE_APP_ENV", "development")),
  // WIRE-UP: replace readOptionalEnv with a required check when connecting to a real backend:
  //   apiBaseUrl: (() => { const v = import.meta.env.VITE_API_BASE_URL; if (!v) throw new Error("Missing VITE_API_BASE_URL"); return v; })()
  apiBaseUrl: readOptionalEnv("VITE_API_BASE_URL", ""),
  printfulStoreId: readOptionalEnv("VITE_PRINTFUL_STORE_ID"),
} as const;
