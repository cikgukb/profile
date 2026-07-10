# Audit Laman Web cikgukb.my — Julai 2026

Audit penuh sebelum overhaul "Arkitek Marketing Solutions". Semua fakta di bawah disahkan
daripada repo `cikgukb/profile`, resume PDF, kod sumber projek GitHub dan semakan URL secara langsung.

## 1. Keadaan Semasa (sebelum overhaul)

- Laman statik satu halaman: `index.html` + `style.css` + `script.js`, deploy melalui GitHub Pages
  dengan CNAME `cikgukb.my`. Cabang `gh-pages` menyalin `main`.
- Tema monokrom generik, font Google (Outfit + Plus Jakarta Sans), ikon Font Awesome melalui CDN.
- Hero bermula dengan "Hi, I'm…" — positioning berpecah: "Trainer Marketing Consultant,
  Marketing & Visual Specialist, penulis buku, pembina sistem digital".
- 3 bahasa (BM / EN / ZH) melalui kamus `data-i18n` dalam `script.js`.
- Katalog GitHub: 38 projek dipaparkan tanpa susunan keutamaan.
- Timeline kerjaya 5 peringkat, 12 kad video Facebook (beberapa guna thumbnail placeholder yang sama),
  seksyen buku ChatGPT4Business dengan pautan affiliate coachzul.com.

## 2. Isu Ditemui

| # | Isu | Bukti | Tindakan |
|---|-----|-------|----------|
| 1 | Pautan mati `kbbeyondcreative.my` | HTTP 404 | Buang daripada katalog |
| 2 | Homepage repo `ai-sales-kit` menghala ke deployment mati (`ai-sales-kit-eight`) | HTTP 404; `ai-sales-kit-chi.vercel.app` berfungsi | Guna URL yang sah |
| 3 | Nombor sijil di laman (#7703) tidak sepadan dengan resume (TTT No. 27899) | Resume ms. 1 | Papar tanpa nombor; rujuk pemilik |
| 4 | PDF resume awam mendedahkan nombor IC | Resume ms. 1 | Bendera untuk semakan pemilik |
| 5 | 4 projek terkuat terbaru tiada di laman | NOIR, TanahPro, SKYFRAME, Prompt Kakitangan Awam | Tambah sebagai projek pilihan |
| 6 | Tiada SEO teknikal: canonical, OG, structured data, sitemap, robots, favicon | Semakan `index.html` | Bina lengkap |
| 7 | Imej portfolio besar (sehingga 1.8MB PNG) | `assets/portfolio/` | Optimumkan ke WebP |
| 8 | Statistik "38 GitHub Builds" sudah lapuk | API GitHub: 45 repo awam | Kemas kini |
| 9 | Thumbnail video placeholder berulang (4 kad guna imej sama) | `assets/videos/` | Kurasi semula seksyen video |
| 10 | Font Awesome CDN — render-blocking, satu lagi origin | `index.html` | Ganti dengan SVG inline |

## 3. Fakta Disahkan (sumber kebenaran)

- **Nama**: Kamarul Bahareen Bin Kamarudin (Cikgu KB) — resume, laman semasa.
- **Syarikat**: KB Beyond Creative Sdn Bhd, Trainer Marketing Consultant, 2013–kini — resume ms. 2.
- **Kerjaya**: Perodua Manufacturing (2000–2004) → Gems Integrated Data Solution (2004–2006) →
  Shell IT International, Backup Engineer (2006–2008) → CIMB Wealth Advisor, Agency Supervisor
  (2008–2013) → KB Beyond Creative (2013–kini) — resume ms. 2.
- **Pendidikan**: Diploma in Computer Science, Universiti Teknologi Malaysia — resume ms. 1.
- **Akreditasi**: HRD Corp Accredited Trainer; Sijil Kemahiran Malaysia (Latihan Tenaga Pengajar, JPK);
  LRN Level 3 Digital Entrepreneurship — resume ms. 4–5.
- **Topik latihan** (resume ms. 3): AI Marketing (2022–2025), Branding Marketing (2016–2025),
  Asas Pemasaran Digital (2016–2025), Pengurusan Perniagaan Digital (2013–2025), AI Content
  Marketing (2023–2025), Fotografi Smartphone Produk (2022–2025), Video Content Marketing
  (2022–2025), Live Video Streaming (2022–2025).
- **Buku**: ChatGPT4Business — imej kulit dalam repo, halaman jualan coachzul.com aktif (HTTP 200).
- **Hubungan**: kbcimb@gmail.com, 013-3815817, wa.me/60133815817 — resume + laman semasa.
- **GitHub**: 45 repo awam pada 2026-07-10; 30+ demo langsung disahkan HTTP 200.

## 4. Penemuan Projek (inspeksi kod sumber)

- **NOIR — Analisis Skincare** (`projekanalisisskincare`): React + Vite, MediaPipe FaceLandmarker
  (pengesanan wajah dalam pelayar), Cloudflare Worker `/api/analyze` memanggil OpenAI Vision,
  D1 menyimpan skor semasa/potensi + hasil JSON, Capacitor untuk APK Android. Status: prototaip
  (tiada URL awam disahkan).
- **TanahPro** (`projektanahlotbatupahat`): laman jualan lot tanah Parit Raja, Batu Pahat.
  Live di domain sendiri **tanahpro.my** (HTTP 200). Projek industri sebenar.
- **SKYFRAME** (`droneservice`): laman perkhidmatan fotografi/videografi udara. Demo GitHub Pages live.
- **Prompt Kakitangan Awam** (`promptkakitanganawam`): katalog prompt AI untuk penjawat awam
  Malaysia (Gemini & Claude). Demo live. Relevan terus kepada audiens agensi kerajaan.
- **AI Sales Kit** (`ai-sales-kit`): React + TypeScript, fungsi API pelayan (`api/imagegen.js`,
  `api/replicate.js`) untuk penjanaan imej AI. Demo live di `ai-sales-kit-chi.vercel.app`.
- **Cashflow Usahawan** (`cashflowgame`): simulasi aliran tunai SME dalam TypeScript — alat latihan.
- **MYBHA/MYMFH Audit** (`-mybha-mymfh-audit`): sistem audit halal untuk hotel bajet — live.
- 30+ projek lain dikekalkan dalam arkib katalog dengan kategori.

## 5. Keputusan Seni Bina

- **Kekal statik tanpa build step** — GitHub Pages + CNAME kekal, deployment paling rendah risiko,
  pemilik boleh edit kandungan dalam satu fail data tanpa Node. (Kriteria prompt: "Do not migrate
  frameworks merely to appear modern.")
- Struktur baharu: `index.html`, `css/main.css` (design tokens), `js/i18n.js` (BM/EN),
  `js/projects-data.js` (data projek berkurasi + kajian kes), `js/main.js` (interaksi),
  `sitemap.xml`, `robots.txt`, `404.html`, `docs/`.
- **Bahasa**: BM utama + EN. ZH dibuang buat sementara — kualiti terjemahan penuh untuk kandungan
  baharu tidak dapat disahkan; rentetan lama kekal dalam sejarah git (`dd65c52`). Lihat senarai
  semakan pemilik.
- **Reka bentuk**: "Scandinavian clarity + architectural precision" — grid blueprint halus, anotasi
  mono bernombor, palet graphite gelap / off-white hangat / biru blueprint, tipografi editorial.

## 6. Apa Dikekalkan / Dibuang

- **Kekal**: semua aset imej sedia ada (dioptimumkan, asal tidak dipadam), resume PDF (dibendera),
  pautan buku affiliate, nombor WhatsApp/telefon/emel, senarai projek (dikurasi semula), CNAME.
- **Ditulis semula**: semua kandungan halaman, positioning, struktur navigasi, CSS, JS.
- **Dibuang**: Font Awesome CDN, bahasa ZH (sementara), pautan mati, statistik lapuk,
  timeline panjang (diganti naratif kredibiliti), grid video 12-kad (dikurasi ke pilihan terbaik).
