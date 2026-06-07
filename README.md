# Teguh Web Portfolio

Portfolio bento, dark/light, dengan **AI assistant** (Groq) yang dibatasi hanya menjawab seputar resume. Static site + satu serverless function. Siap deploy ke **Vercel**.

```
teguh-portfolio/
├── index.html              ← seluruh tampilan + logika (1 file)
├── api/
│   └── chat.js             ← serverless function ke Groq (baca GROQ_API_KEY dari env)
├── data/
│   └── profile.json        ← SEMUA konten ada di sini (ini yang kamu edit)
├── package.json
├── .gitignore
├── .env.local.example
└── README.md
```

---

## ⚠️ Keamanan API key (baca dulu)

- **JANGAN pernah menaruh API key di dalam file yang di-commit ke GitHub.** Bot crawler akan menemukannya dalam hitungan menit.
- Key dibaca dari environment variable `GROQ_API_KEY`. Repo tetap bersih.
- Karena key sempat dibagikan dalam bentuk teks biasa, **regenerate / rotate key tersebut di dashboard Groq**, lalu pakai key baru saat setup di Vercel.

---

## 🚀 Deploy ke Vercel (cara cepat)

1. **Rotate** API key di [console.groq.com](https://console.groq.com) → simpan key barunya.
2. Upload folder ini ke repository GitHub baru (pastikan `.env.local` TIDAK ikut — kalau belum pernah dibuat, aman).
3. Buka [vercel.com](https://vercel.com) → **Add New → Project** → import repo GitHub tadi.
4. Framework Preset: **Other** (biarkan default, tanpa build command).
5. Buka **Environment Variables**, tambahkan:
   - Name: `GROQ_API_KEY` — Value: *(key Groq baru kamu)*
   - (Opsional) `GROQ_MODEL` = `llama-3.3-70b-versatile`
6. Klik **Deploy**. Selesai — situs live, AI chat langsung jalan.

> Setiap kali kamu `git push`, Vercel otomatis redeploy.

---

## 🧪 Menjalankan lokal (opsional)

```bash
npm i -g vercel
cp .env.local.example .env.local      # lalu isi GROQ_API_KEY
vercel dev                            # buka http://localhost:3000
```

---

## ✏️ Mengedit konten

**Cara A — langsung edit `data/profile.json`** (lalu `git push`).
Semua teks, metrik, experience, project, skill, kontak ada di file ini.

**Cara B — Edit Mode di browser (lebih enak):**
1. Klik ikon **gembok** di kanan atas → masukkan PIN (default `9999`).
2. Edit teks langsung, upload foto / cover project, tambah item, tambah section.
3. Klik **Export profile.json** → salin isinya → timpa `data/profile.json` → `git push`.

> **Ganti PIN!** Buka `index.html`, cari `const PIN_CODE = "9999";`, ganti dengan PIN-mu.
> Catatan: PIN ini client-side (cukup untuk mencegah edit iseng, bukan keamanan tingkat tinggi).

---

## 📎 Foto, screenshot project, & file CV

Dua opsi:

- **Lewat Edit Mode** (paling mudah): upload gambar → tersimpan sebagai data di `profile.json`. Untuk gambar besar JSON bisa membengkak.
- **Lewat file statis**: taruh file di root repo (mis. `CV_Teguh_Saputra_Monoarfa.pdf`, `photo.jpg`), lalu di `profile.json`:
  - `profile.resumeUrl` → `"/CV_Teguh_Saputra_Monoarfa.pdf"`
  - `profile.photo` → `"/photo.jpg"`

File di root repo otomatis tersaji di Vercel pada path `/namafile`.

---

## ⚙️ Ganti model AI

Default: `llama-3.3-70b-versatile`. Ganti via env `GROQ_MODEL` (mis. `llama-3.1-8b-instant` untuk lebih cepat). Daftar model: console.groq.com/docs/models.
