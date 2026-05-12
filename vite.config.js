import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project sites live under /<repo-name>/ — set VITE_BASE_PATH in CI (see .github/workflows).
const base = process.env.VITE_BASE_PATH || "/";
const normalizedBase = base === "/" ? "/" : base.endsWith("/") ? base : `${base}/`;

export default defineConfig({
  base: normalizedBase,
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
