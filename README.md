# NextBound

Marketing intelligence demo (dummy data): funnel + revenue, cohort curves, CAC vs LTV scatter. Vite, React, TypeScript, Tailwind, Recharts.

## GitHub

Push **this folder** as its own repository root (all files at the top level — no parent `openclaw` folder).

## Vercel

1. **Add New Project** → import your GitHub repo.
2. **Root Directory:** leave as `.` (repo root).
3. **Framework Preset:** Vite (or auto-detect).
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. **Install Command:** `npm install`

**Environment variables:** leave empty on Vercel. Do **not** set `MARKETING_MVP_BASE` there (that is only for GitHub Pages subpath builds). If the site is blank, open DevTools → Network: if JS/CSS URLs start with something like `/openclaw/` or `/wrong-repo/`, remove that env var and redeploy.

**Vercel project settings:** Root directory `.`, Node 20+ (default is fine).

## Local

```bash
npm install
npm run dev
```

Default dev server: [http://localhost:5174](http://localhost:5174).
