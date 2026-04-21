import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

/** For GitHub Pages project sites only: `MARKETING_MVP_BASE=/<repo>/` at build time. */
function normalizeBase(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "/";
  if (trimmed === "./") return "./";
  const withLeading = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeading.endsWith("/") ? withLeading : `${withLeading}/`;
}

/** Vercel (and similar) always serves this app from `/`. Ignore stray MARKETING_MVP_BASE in env. */
const onVercel = process.env.VERCEL === "1";
const customBase = process.env.MARKETING_MVP_BASE?.trim();
const base = onVercel ? "/" : customBase ? normalizeBase(customBase) : "/";

export default defineConfig({
  base,
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
