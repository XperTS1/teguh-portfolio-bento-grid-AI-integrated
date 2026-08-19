# 📊 PROGRESS — Teguh Web Portfolio

> **Untuk AI agent / developer lain:** baca file ini dulu sebelum mengerjakan apa pun.
> Ini berisi status proyek, struktur, konvensi penting, dan catatan perubahan.
> **WAJIB: setiap ada perubahan pada proyek, update file ini juga — sekecil apa pun.**

---

## 📌 Gambaran Proyek

- **Apa:** Portofolio bento-grid satu halaman + asisten AI (chat) berbasis Groq, untuk Teguh Saputra Monoarfa (HRIS / HR Operations).
- **Stack:** HTML/CSS/JS murni (tanpa framework) di `index.html` · Node.js `server.js` (dev lokal) · `api/chat.js` (serverless Vercel) · **ESM** (`"type": "module"`).
- **Live:** https://teguh-web-portfolio.vercel.app/
- **Repo:** github.com/XperTS1/teguh-portfolio-bento-grid-AI-integrated · branch `main`.
- **Deploy:** push ke `main` → Vercel auto-deploy (tidak ada build step).

## 📁 Struktur & Peran File

| File | Peran |
|---|---|
| `index.html` | Halaman utama (semua CSS + JS inline) + snapshot konten `const D` & `const P` |
| `data/profile.json` | Konten yang bisa diedit dari UI — sumber kebenaran, dimuat ulang saat runtime |
| `lib/system-prompt.js` | Prompt AI bersama (single source of truth) — dipakai `server.js` & `api/chat.js` |
| `api/chat.js` | Fungsi serverless Vercel untuk chat Groq (rute `/api/chat`) |
| `server.js` | Server dev lokal — `node server.js` → http://localhost:3000 |
| `images/` | `favicon.svg`, `og.jpg`, `photo.webp`, `proj-0..6.webp` |
| `PROGRESS.md` | File ini — log progress proyek |

## ⚠️ Konvensi Penting (JANGAN dilanggar)

1. **Jangan duplikasi `SYSTEM_PROMPT`** — satu-satunya sumber ada di `lib/system-prompt.js` (di-import `server.js` & `api/chat.js`).
2. **Sinkronisasi konten:** blok `const D` (dan `const P`) di `index.html` harus selalu identik dengan `data/profile.json`. Situs render dari `D` dulu (anti flash), lalu refresh dari JSON. **Kalau mengubah salah satu, ubah keduanya.**
3. **ESM:** semua file `.js` memakai `import`/`export`. Skrip uji sementara yang pakai `require` harus berekstensi `.cjs`.
4. **PIN Edit Mode** = `9999` (di client-side saja — ini gembok kosmetik, bukan pengaman sungguhan).
5. **Env:** `GROQ_API_KEY` di `.env.local` (lokal) / Environment Variables Vercel (produksi). `GROQ_MODEL` opsional, default `openai/gpt-oss-120b`.
6. **Chat:** server hanya memakai **12 pesan terakhir**; client mengirim `history.slice(-12)`.
7. **File temp** (`_*.js`, `_*.cjs`, `_*.txt`, dsb.) jangan di-commit. `.gitignore` sudah meng-cover `graphify-out/`, `.env*`, `node_modules/`.

## 🚀 Cara Menjalankan

```bash
node server.js        # lalu buka http://localhost:3000
```

- Tanpa `.env.local` berisi `GROQ_API_KEY`, halaman tetap jalan tapi `/api/chat` balas 500 "GROQ_API_KEY not set" (normal).
- Deploy: cukup `git push` ke branch `main`.

## 📝 Progress Log

### 2026-08-19 — Sesi "clean up small things" (commit `17c597e`, sudah di-push)
1. **Perbaiki drift data:** `cta_p` di `index.html` (inline `D`) disamakan dengan `data/profile.json` → 0 perbedaan.
2. **Bersih-bersih:** hapus `_D_extract.txt` & `graphify-out/`; tambah `graphify-out/` ke `.gitignore`.
3. **Deduplikasi prompt AI:** `SYSTEM_PROMPT` dipindah ke `lib/system-prompt.js`, dipakai `server.js` & `api/chat.js`.
4. **ESM konsisten:** `package.json` +`"type": "module"`; `server.js` & `lib/system-prompt.js` dikonversi ke ESM; warning `MODULE_TYPELESS_PACKAGE_JSON` hilang. Nama file `api/chat.js` **tidak diubah** (menghindari risiko routing Vercel).
5. **Gambar preview:** `og.png` (383,8 KB) → `og.jpg` (39,6 KB, ~90% lebih ringan, kualitas 82). Meta `og:image` & `twitter:image` diarahkan ke `og.jpg`.

### 2026-08-19 — Sesi "change tagline" (commit `866e2b9`, sudah di-push)
6. **Tagline:** "CX & Operations professional" → **"HRIS Professional"** di 3 meta description (`description`, `og:description`, `twitter:description`).

### 2026-08-19 — Perbaikan tampilan (commit "fix cta section alignment")
7. **Section "Let's talk" (CTA):** `.cta-flex { align-items: flex-start }` → `align-items: center` supaya tombol kanan sejajar vertikal dengan teks kiri.

### 2026-08-19 — Audit menyeluruh (commit "update progress: audit penuh")
8. **Audit seluruh proyek — SEMUA SELARAS:** referensi gambar ✓ · sinkronisasi data inline vs `profile.json` (D & P) ✓ · prompt AI single-source ✓ · ESM konsisten ✓ · meta tag `og.jpg` & tagline HRIS ✓ · tidak ada file temp ✓ · syntax & server E2E ✓

## ✅ Status Saat Ini

- Website live & sehat; semua perubahan ter-push ke `main`.
- Konten inline (`index.html`) sinkron dengan `data/profile.json` (0 diff).
- Chat AI jalan lokal & produksi (butuh `GROQ_API_KEY`).

## 📋 Todo / Catatan Terbuka

> **Keputusan pemilik (2026-08-19):** item opsional di bawah sudah direview & **diputuskan untuk tidak dikerjakan saat ini** — website statis dengan risiko rendah, dianggap sudah aman-aman saja.

- [ ] (Opsional, ditunda) PIN Edit Mode dicek di server (keamanan sungguhan). Berguna jika kelak edit mode bisa menyimpan langsung ke server.
- [ ] (Opsional, ditunda) Security headers / `vercel.json` (X-Content-Type-Options, X-Frame-Options, Referrer-Policy). CSP tidak disarankan karena semua CSS/JS inline.
- [ ] (Catatan) `og.jpg` cache WhatsApp/LinkedIn/Facebook — bukan tugas kode; cache pihak ketiga akan refresh sendiri, atau lewat Sharing Debugger / Post Inspector.
