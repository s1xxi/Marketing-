import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Always `/` so GitHub → Vercel works with zero extra config (no env vars).
  base: "/",
  plugins: [react()],
  root,
  server: {
    host: true,
    port: 5174,
    strictPort: false,
  },
  build: {
    chunkSizeWarningLimit: 768,
  },
});
