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

Halaman utama memaparkan projek pilihan + pautan kategori sahaja. Arkib penuh
(carian + penapis) berada di `projek.html` dan membaca fail data yang sama.

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

Selepas ubah fail JS/CSS, naikkan nombor versi query string (cth. `?v=20261121`
→ tarikh baharu) dalam SEMUA halaman yang memuatkannya — `index.html`,
`profil.html`, `projek.html`, `blog.html` — supaya cache pelawat dikosongkan.

## 6. Kemas kini pautan hubungan

Nombor WhatsApp/emel muncul di beberapa tempat:
1. `index.html` — seksyen hubungi + footer + dok mudah alih + JSON-LD
2. `profil.html`, `projek.html`, `blog.html` — footer + dok (dan hero profil)
3. `js/main.js` — fungsi borang pertanyaan (`wa.me/...` dan `mailto:`)

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

## 9. Profil profesional (`profil.html`)

Halaman ini menggantikan PDF resume. Kandungannya HTML biasa; teks yang ada
`data-i18n="prof.…"` diterjemah melalui `js/i18n.js` (kunci `prof.*`).

- **Tambah pengalaman / sijil / program**: salin satu blok `<article class="cv-row">`
  (atau `<div class="cv-row cv-row--tight">`) dalam seksyen berkenaan dan tukar isinya.
- **Tambah foto galeri**: simpan WebP (lebar ~960) dalam `assets/img/profil/`, kemudian
  salin satu `<figure>` dalam `.cv-gallery`. Kelas `wide` = separuh lebar, `full` = dua pertiga.
- **Butang "Cetak / Simpan PDF"** memanggil cetakan pelayar; susun atur cetak dikawal
  oleh blok `@media print` di hujung `css/main.css`.
- **JANGAN** masukkan nombor IC, alamat rumah atau imej sijil yang memaparkan IC.
  Profil rasmi untuk permohonan HRD Corp dihantar secara peribadi atas permintaan.

## 10. Testimoni

Buka `js/testimonials-data.js` dan ikut format dalam komen di atas fail. Selagi senarai
kosong, seksyen testimoni tidak dipaparkan langsung. Masukkan testimoni sebenar sahaja,
dengan kebenaran bertulis.

## 11. Kalendar acara

Acara dibaca dari `js/events-data.js`. Acara yang tarikh tamatnya sudah lepas dilabel
"Selesai" secara automatik walaupun `status` belum dikemas kini. Jika tiada acara akan
datang, laman memaparkan jemputan untuk meminta sesi dalaman.
