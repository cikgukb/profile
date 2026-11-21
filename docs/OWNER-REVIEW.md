# Untuk Semakan Pemilik — cikgukb.my (Julai 2026)

Perkara yang TIDAK dapat disahkan semasa overhaul, atau memerlukan keputusan anda.

## Perlu tindakan

1. **Nombor sijil HRD Corp.** Laman lama memaparkan "#7703" tetapi resume menunjukkan
   TTT Cert No. **27899**. Laman baharu memaparkan "HRD Corp Accredited Trainer"
   TANPA nombor. Sahkan nombor rasmi jika mahu dipaparkan semula.
2. **PDF resume awam mendedahkan nombor IC** (muka surat 1). PDF ini dipaut secara
   terbuka dari laman. Sangat disyorkan: ganti dengan versi tanpa IC.
3. **Resume bertarikh 2025.** Jika ada profil lebih baharu, ganti fail di
   `assets/resume/` dan kemas kini pautan dalam `index.html`.
4. **Bahasa Mandarin dibuang buat sementara.** Kandungan baharu jauh lebih banyak dan
   terjemahan ZH berkualiti tidak dapat dijamin. Rentetan lama masih ada dalam sejarah
   git (commit `dd65c52`). Jika mahu ZH kembali, dapatkan penterjemah dan tambah kamus
   `zh` dalam `js/i18n.js`.
5. **kbbeyondcreative.my sudah mati (404)** dan telah dibuang dari katalog. Jika domain
   itu akan dihidupkan semula, tambah semula dalam arkib.
6. **Homepage repo `ai-sales-kit` di GitHub** masih menghala ke deployment mati
   (`ai-sales-kit-eight`). Kemas kini di GitHub → Settings repo → Website kepada
   `https://ai-sales-kit-chi.vercel.app`.

## Andaian yang dibuat (sila sahkan)

- **"40+ Projek awam di GitHub"** — kiraan sebenar 45 pada 2026-07-10; "40+" dipilih
  supaya kekal benar walaupun ada repo dipadam.
- **NOIR dipapar sebagai "Prototaip"** kerana tiada URL awam ditemui. Jika sudah live,
  tambah `demo:` dalam `js/projects-data.js` dan tukar `status: 'live'`.
- **TanahPro / SKYFRAME / laman industri lain** dilabel "Web & Industri" tanpa
  menuntut ia projek klien berbayar (tidak dapat disahkan). Jika mahu label "Projek
  Klien", sahkan dahulu dengan pihak berkenaan.
- **Buku**: harga TIDAK dipaparkan (tertakluk laman penjual). Pautan affiliate
  coachzul.com dikekalkan daripada laman lama.
- **Testimoni**: tiada testimoni dipaparkan kerana tiada yang dapat disahkan dari
  repo/resume. Jika anda ada testimoni bertulis yang sah, ia boleh ditambah sebagai
  seksyen baharu.

## Cadangan penambahbaikan akan datang

1. Ganti PDF resume dengan versi web (halaman `/profil`) — lebih selamat dan SEO-friendly.
2. Tambah Google Analytics / Cloudflare Web Analytics jika mahu jejak CTA (perlu kelulusan anda).
3. Kumpul testimoni bertulis daripada peserta latihan (dengan kebenaran) untuk seksyen bukti sosial.
4. Sediakan kajian kes bergambar untuk 2–3 latihan korporat/kerajaan sebenar (foto sesi + hasil).
5. Apabila NOIR dilancarkan, naik taraf ke projek utama dengan demo awam + video pendek.
6. Pertimbangkan halaman `/latihan` berasingan dengan silibus penuh setiap program untuk SEO
   ("latihan AI Malaysia", "kursus pemasaran digital HRD Corp").
7. Hidupkan semula kbbeyondcreative.my atau alihkan domain itu ke cikgukb.my.

---

## Kemas kini 21 November 2026 — profil web & reka bentuk semula

**Selesai**

- PDF resume (yang memaparkan nombor IC pada ms. 1, 5 dan 6) telah **dibuang** daripada
  laman dan digantikan dengan `profil.html`. Nota: fail lama masih wujud dalam *sejarah*
  git repo awam ini — lihat perkara 1 di bawah.
- Halaman utama dipendekkan: arkib projek dipindah ke `projek.html`, blog memaparkan
  3 artikel terbaru, kalendar menjadi senarai agenda.
- Menu diringkaskan kepada 6 pautan + Hubungi; "Training Calendar" → "Kalendar".

**Perlu semakan anda**

1. **Sejarah git masih menyimpan PDF lama.** Sesiapa yang tahu caranya masih boleh
   memuat turunnya dari commit lama. Untuk membuang sepenuhnya, sejarah repo perlu
   ditulis semula (force-push) — tindakan yang tidak boleh diundur, jadi belum dibuat.
2. **ID Jurulatih HRD Corp "27899" dan tempoh sah 25 Mac 2025 – 25 Mac 2028** kini
   dipaparkan di `profil.html`, diambil terus daripada sijil akreditasi dalam PDF lama.
   Sahkan ia betul (lihat juga perkara 1 dalam senarai asal di atas tentang "#7703").
3. **Angka MDEC** — "2,640 peserta eUsahawan dilatih" dan "RM7.54 juta jualan dilaporkan"
   (2016–2021) diambil daripada grafik *eUsahawan Trainer Report 2021* dalam PDF lama.
   Kini dipaparkan di hero, seksyen Latihan dan profil. Sahkan anda selesa ia dipaparkan.
4. **Kapsyen galeri** di `profil.html` ditulis berdasarkan apa yang kelihatan dalam foto
   (cth. "Lawatan kerja ke Istanbul Chamber of Commerce", "Program kemahiran di MEATECH
   Creative Academy"). Betulkan jika acara sebenar berbeza.
5. **Peserta dalam foto galeri** — foto ini sudah ada dalam PDF awam sebelum ini, tetapi
   kini lebih menonjol. Buang mana-mana foto jika ada peserta yang tidak bersetuju.
6. **Tahun Diploma UTM** dipaparkan sebagai 2000 (ikut jadual resume); sijilnya sendiri
   bertarikh Mac 2002. Betulkan di `profil.html` jika perlu.
7. **Testimoni** masih kosong — isi `js/testimonials-data.js` apabila ada testimoni sah.
8. **Kalendar** — keempat-empat acara dalam `js/events-data.js` sudah lepas tarikh, jadi
   semuanya dilabel "Selesai". Tambah acara baharu melalui Admin Portal / fail data.
