# NextBound

Marketing demo (dummy data): funnel, cohorts, CAC vs LTV. **Vite + React.**

---

## Put this on GitHub (without “too many files”)

This repo should stay **small** (~20 files). **Never** upload the folder if it contains **`node_modules`** (that adds thousands of files and breaks GitHub’s web uploader).

**Recommended:** use **Git** from this folder (or **GitHub Desktop**).

```bash
cd nextobound
git add -A
git status   # you should NOT see node_modules
git commit -m "Update"
git push origin main
```

**After cloning** (or `npm install` locally):

```bash
npm install
npm run dev
```

If `node_modules` appears again, it is **ignored by git** — do not zip that folder for GitHub upload.

---

## Host on Vercel

1. **[vercel.com/new](https://vercel.com/new)** → Import your **NextBound** repo.
2. Leave defaults (**Vite**, `npm run build`, output **`dist`**).
3. **Deploy.** Vercel runs `npm install` for you — you still do not commit `node_modules`.

If GitHub ↔ Vercel says **“Something went wrong”**, reconnect GitHub under Vercel **Account → Git**.

---

## Local dev

```bash
npm install
npm run dev
```

Open the URL Vite prints (often [http://localhost:5174](http://localhost:5174)).
