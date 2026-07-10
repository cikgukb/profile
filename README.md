# cikgukb.my — Arkitek Marketing Solutions

Laman web profesional **Kamarul Bahareen (Cikgu KB)** — merancang strategi,
membina sistem, menggerakkan pemasaran.

Laman statik tanpa build step, dihoskan melalui GitHub Pages pada domain `cikgukb.my`.

## Struktur

| Fail / Folder | Fungsi |
|---|---|
| `index.html` | Struktur halaman + metadata SEO + JSON-LD |
| `css/main.css` | Sistem reka bentuk (token warna, tipografi, komponen, motion) |
| `js/i18n.js` | Semua teks UI dalam BM dan EN |
| `js/projects-data.js` | **Satu-satunya fail untuk urus projek** (pilihan + arkib) |
| `js/main.js` | Interaksi: bahasa, modal kajian kes, penapis arkib, borang |
| `assets/img/` | Imej dioptimumkan (WebP) — jangan padam folder asal |
| `assets/portfolio/`, `assets/videos/` | Imej asal (rujukan) |
| `assets/resume/` | Profil PDF |
| `docs/` | Audit, panduan penyelenggaraan, senarai semakan pemilik |
| `sitemap.xml`, `robots.txt`, `404.html`, `CNAME` | SEO + deployment |

## Kemas kini kandungan

Lihat **[docs/MAINTENANCE.md](docs/MAINTENANCE.md)** untuk panduan langkah demi langkah:
tambah projek, tukar gambar, edit terjemahan, kemas kini statistik dan deploy.

## Lihat secara lokal

```
python -m http.server 4173
```

Kemudian buka `http://localhost:4173`. (Perlu server kerana data projek dimuat
melalui JavaScript — jangan buka `index.html` terus dari fail.)
