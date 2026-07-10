# Panduan Penyelenggaraan — cikgukb.my

Semua kandungan boleh dikemas kini dengan mengedit fail teks. Tiada build step,
tiada Node — simpan fail, commit, push, siap.

## 1. Tambah projek baharu (arkib)

Buka `js/projects-data.js`, cari `ARCHIVE_PROJECTS`, tambah satu entri:

```js
{ name: 'Nama Projek', cat: 'ai', tech: 'JavaScript',
  desc: { ms: 'Ayat ringkas BM.', en: 'Short English sentence.' },
  repo: 'https://github.com/cikgukb/nama-repo',
  demo: 'https://cikgukb.github.io/nama-repo/',   // kosongkan '' jika tiada
  image: 'assets/img/projects/nama.webp' },        // kosongkan '' untuk kad inisial
```

Kategori (`cat`): `ai` | `marketing` | `web` | `app` | `automation` | `interactive` | `experiment`.

Untuk thumbnail: ambil screenshot 1440×900, kecilkan ke lebar 880, simpan sebagai
WebP dalam `assets/img/projects/`. (Python: `Image.open(x).resize(...).save('nama.webp')`.)

## 2. Jadikan projek "pilihan" (featured)

Projek pilihan berada dalam `FEATURED_PROJECTS` (fail sama) dan memerlukan kajian
kes penuh — salin satu blok sedia ada dan isi setiap medan `ms`/`en`:
`problem`, `audience`, `solution`, `features`, `value`, `statusNote`.

`status` mestilah: `live` (demo awam), `prototype` (belum dilancar) atau `repo`.
Susunan array = susunan paparan. Kekalkan 4–6 projek pilihan sahaja.

## 3. Kemas kini statistik hero

Dalam `index.html`, cari `cred-strip`. Nombor dikawal oleh atribut:

```html
<span class="cred-num" data-count="40" data-suffix="+">40+</span>
```

Tukar `data-count` DAN teks di dalamnya (teks = nilai akhir tanpa JS).
Jangan letak angka yang tidak boleh dibuktikan.

## 4. Tukar gambar profil

Gambar dipapar dari `assets/img/`:
- `portrait-hero.webp` + `portrait-hero-sm.webp` (hero, 760/480 lebar)
- `portrait-about.webp` (tentang), `portrait-cta.webp` (hubungi, latar lutsinar)

Letak gambar asal dalam `assets/`, hasilkan versi WebP dengan saiz sama,
dan kekalkan nama fail supaya tiada HTML perlu diubah.

## 5. Edit teks / terjemahan

Semua teks UI dalam `js/i18n.js` — kamus `ms` dan `en` dengan kunci yang sama.
Ubah KEDUA-DUA bahasa setiap kali. Teks projek pula dalam `js/projects-data.js`
(medan `{ ms: …, en: … }`).

Selepas ubah fail JS/CSS, naikkan nombor versi query string dalam `index.html`
(cth. `?v=20260710` → tarikh baharu) supaya cache pelawat dikosongkan.

## 6. Kemas kini pautan hubungan

Nombor WhatsApp/emel muncul di TIGA tempat:
1. `index.html` — seksyen hubungi + footer + JSON-LD
2. `js/main.js` — fungsi borang pertanyaan (`wa.me/...` dan `mailto:`)

Cari "60133815817" dan "kbcimb@gmail.com" untuk jumpa semuanya.

## 7. Deploy

1. Commit dan push ke cabang `main`.
2. Jika GitHub Pages diset kepada cabang `gh-pages`, kemas kini juga:
   `git checkout gh-pages && git merge main && git push`.
3. Jangan sentuh fail `CNAME` (domain cikgukb.my).
4. Semak https://cikgukb.my selepas 1–2 minit.

## 8. Semakan berkala (setiap beberapa bulan)

- Klik semua pautan "Demo Langsung" — buang/tandakan yang mati.
- Kemas kini `sitemap.xml` `<lastmod>` selepas perubahan besar.
- Semak harga/pautan buku di laman penjual masih sah.
