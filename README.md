# cikgukb.my — Arkitek Marketing Solutions

Laman web profesional **Kamarul Bahareen (Cikgu KB)** — merancang strategi,
membina sistem, menggerakkan pemasaran.

Laman statik tanpa build step, dihoskan melalui GitHub Pages pada domain `cikgukb.my`.

## Struktur

| Fail / Folder | Fungsi |
|---|---|
| `index.html` | Halaman utama + metadata SEO + JSON-LD |
| `profil.html` | Profil profesional (resume versi web, boleh dicetak ke PDF) |
| `projek.html` | Projek pilihan + arkib penuh bertapis |
| `blog.html` | Senarai penuh artikel blog |
| `css/main.css` | Sistem reka bentuk (token warna, tipografi, komponen, motion) |
| `js/i18n.js` | Semua teks UI dalam BM dan EN |
| `js/projects-data.js` | **Satu-satunya fail untuk urus projek** (pilihan + arkib) |
| `js/testimonials-data.js` | Testimoni — seksyen hanya muncul jika fail ini ada isi |
| `js/main.js` | Interaksi dikongsi semua halaman: bahasa, modal, penapis, borang, dok mudah alih |
| `assets/img/` | Imej dioptimumkan (WebP) — jangan padam folder asal |
| `assets/portfolio/`, `assets/videos/` | Imej asal (rujukan) |
| `assets/img/profil/` | Foto galeri latihan & sijil untuk `profil.html` |
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
