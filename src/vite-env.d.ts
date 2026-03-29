/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: "development" | "staging" | "production";
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_PRINTFUL_STORE_ID?: "17908744";
  readonly VITE_STRIPE_PUBLIC_KEY?: string;
  readonly VITE_USE_MOCK_ORDER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
