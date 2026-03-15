import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/pod-template/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
