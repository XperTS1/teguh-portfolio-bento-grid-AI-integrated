# 📊 PROGRESS — Teguh Web Portfolio

> **For other AI agents / developers:** read this file first before touching anything.
> It contains the project status, structure, key conventions, and change log.
> **REQUIRED: update this file on every project change, no matter how small.**

---

## 📌 Project Overview

- **What:** A single-page bento-grid portfolio + an AI chat assistant powered by Groq, for Teguh Saputra Monoarfa (HRIS / HR Operations).
- **Stack:** Pure HTML/CSS/JS (no framework) in `index.html` · Node.js `server.js` (local dev) · `api/chat.js` (Vercel serverless) · **ESM** (`"type": "module"`).
- **Live:** https://teguh-web-portfolio.vercel.app/
- **Repo:** github.com/XperTS1/teguh-portfolio-bento-grid-AI-integrated · branch `main`.
- **Deploy:** push to `main` → Vercel auto-deploys (no build step).

## 📁 File Structure & Roles

| File | Role |
|---|---|
| `index.html` | Main page (all inline CSS + JS) + content snapshot `const D` & `const P` |
| `data/profile.json` | UI-editable content — the source of truth, reloaded at runtime |
| `lib/system-prompt.js` | Shared AI prompt (single source of truth) — used by `server.js` & `api/chat.js` |
| `api/chat.js` | Vercel serverless function for Groq chat (`/api/chat` route) |
| `server.js` | Local development server — `node server.js` → http://localhost:3000 |
| `images/` | `favicon.svg`, `og.jpg`, `photo.webp`, `proj-0..6.webp` |
| `PROGRESS.md` | This file — the project progress log |

## ⚠️ Important Conventions (DO NOT break)

1. **Do not duplicate `SYSTEM_PROMPT`** — the single source lives in `lib/system-prompt.js` (imported by `server.js` & `api/chat.js`).
2. **Content sync:** the `const D` block (and `const P`) in `index.html` must always be identical to `data/profile.json`. The site renders from `D` first (anti-flash), then refreshes from JSON. **If you change one, change both.**
3. **ESM:** every `.js` file uses `import`/`export`. Temporary test scripts that rely on `require` must use the `.cjs` extension.
4. **Edit Mode PIN** = `9999` (client-side only — this is a cosmetic lock, not real security).
5. **Env:** `GROQ_API_KEY` in `.env.local` (local) / Vercel Environment Variables (production). `GROQ_MODEL` is optional; defaults to `openai/gpt-oss-120b`.
6. **Chat:** the server only uses the **last 12 messages**; the client sends `history.slice(-12)`.
7. **Temp files** (`_*.js`, `_*.cjs`, `_*.txt`, etc.) must not be committed. `.gitignore` already covers `graphify-out/`, `.env*`, `node_modules/`.

## 🚀 How to Run

```bash
node server.js        # then open http://localhost:3000
```

- Without a `.env.local` containing `GROQ_API_KEY`, the page still loads but `/api/chat` returns 500 "GROQ_API_KEY not set" (expected).
- Deploy: just `git push` to the `main` branch.

## 📝 Progress Log

### 2026-08-19 — Session "clean up small things" (commit `17c597e`, pushed)

1. **Fixed data drift:** `cta_p` in `index.html` (inline `D`) aligned with `data/profile.json` → 0 differences.
2. **Cleanup:** removed `_D_extract.txt` & `graphify-out/`; added `graphify-out/` to `.gitignore`.
3. **Deduplicated the AI prompt:** moved `SYSTEM_PROMPT` to `lib/system-prompt.js`, used by `server.js` & `api/chat.js`.
4. **Consistent ESM:** `package.json` +`"type": "module"`; converted `server.js` & `lib/system-prompt.js` to ESM; the `MODULE_TYPELESS_PACKAGE_JSON` warning is gone. `api/chat.js` filename **unchanged** (to avoid Vercel routing risk).
5. **Preview image:** `og.png` (383.8 KB) → `og.jpg` (39.6 KB, ~90% lighter, quality 82). `og:image` & `twitter:image` meta now point to `og.jpg`.

### 2026-08-19 — Session "change tagline" (commit `866e2b9`, pushed)

6. **Tagline:** "CX & Operations professional" → **"HRIS Professional"** in the 3 meta descriptions (`description`, `og:description`, `twitter:description`).

### 2026-08-19 — Visual fix (commit "fix cta section alignment")

7. **"Let's talk" (CTA) section:** `.cta-flex { align-items: flex-start }` → `align-items: center` so the right-side button aligns vertically with the left-side text.

### 2026-08-19 — Full audit (commit "update progress: audit penuh")

8. **Full project audit — ALL ALIGNED:** image references ✓ · inline data vs `profile.json` sync (D & P) ✓ · single-source AI prompt ✓ · consistent ESM ✓ · `og.jpg` meta & "HRIS" tagline ✓ · no temp files ✓ · syntax & server E2E ✓

## ✅ Current Status

- Website is live & healthy; all changes pushed to `main`.
- Inline content (`index.html`) is in sync with `data/profile.json` (0 diff).
- Chat AI works locally & in production (requires `GROQ_API_KEY`).
