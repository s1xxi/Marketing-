# NextBound

Marketing demo (dummy data): funnel, cohorts, CAC vs LTV. **Vite + React.**

---

## Host on Vercel (easiest path)

### 1. Code is on GitHub

Your repo should show `package.json` and `src/` at the **top level** (not buried inside another folder).

### 2. Open Vercel and import

1. Go to **[vercel.com/new](https://vercel.com/new)** and sign in.
2. If GitHub is not connected yet: **Connect GitHub** → allow access → pick **All repositories** or only **NextBound**.
3. Click **Import** next to your **NextBound** repo.
4. On the configure screen: **do not change anything.** Leave Framework as **Vite**, Build `npm run build`, Output `dist` (Vercel fills this in automatically).
5. Click **Deploy**.

When it turns green, open the **Visit** link. Done.

### 3. If you see “Something went wrong” **before** you can pick a repo

That is usually **GitHub ↔ Vercel**, not your code.

- Vercel: **Account Settings** (profile menu) → **Authentication** / **Git** → **Reconnect** GitHub, or **Configure** and re-approve the NextBound repo.
- Or try **Import Git Repository** again in an incognito window after logging into both sites.

### 4. If the deploy **fails** (red build)

- Open the failed deployment → **Building** → scroll the log.
- Common fix: in project **Settings → Environment Variables**, remove any variable named `MARKETING_MVP_BASE` (you do not need any env vars for this app).

### 5. If the page is **blank** but build succeeded

Hard refresh: **Ctrl + Shift + R**.  
Still blank: browser **F12** → **Console** and **Network** → look for red **404** lines and fix env vars as in step 4.

---

## Run on your computer

```bash
npm install
npm run dev
```

Then open the URL Vite prints (often [http://localhost:5174](http://localhost:5174)).
