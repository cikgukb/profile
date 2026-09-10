# Personal coaching — operasi dan pelancaran

## Hasil implementasi

`coaching.html` ialah halaman Bahasa Melayu yang berasingan daripada borang pertanyaan umum. UI menggunakan satu soalan setiap langkah, pilihan topik tunggal, KPI/hasil ringkas, pilihan online/fizikal dan tarikh yang disemak oleh server. Tiada bayaran atau tempahan disahkan secara automatik.

Backend di `backend/` menggunakan Cloudflare Worker dan D1. Rekod permohonan serta outbox notifikasi disimpan dalam satu baris atomik. Status permohonan sentiasa `pending_confirmation`; status notifikasi tidak mengubah status permohonan. Masukkan sesi dalam Google Calendar secara manual selepas mengesahkan dengan pemohon.

## Status pelancaran pada 10 September 2026

- Worker aktif: `https://cikgukb-coaching-api.kbcimb.workers.dev`.
- Database D1 khusus `cikgukb-coaching` (`7245607b-8e8f-4975-b216-1d4da2d99ac2`) telah dicipta dan migrasi remote berjaya. Tiada database projek lain dikongsi.
- Projek Google Cloud `cikgukb-coaching` mempunyai Google Calendar API yang aktif. Key khusus dihadkan kepada Google Calendar API dan disimpan sebagai rahsia Worker. FreeBusy sebenar berjaya: 15 September tiada slot; 18 September tiga slot tersedia.
- Murpati sesi `official:15553963664`, penerima tetap `60133815817`. Templat `coaching_request_admin` (Utility, `ms`) berstatus **Approved**.
- Ketiga-tiga rahsia server tersedia dan `NOTIFICATIONS_ENABLED=true`. Frontend menggunakan URL Worker production; GitHub Pages kekal main/root.
- Sepuluh ujian automatik dan semakan TypeScript lulus. QA desktop/mobile serta aliran bersyarat telah diuji secara tempatan. Penerimaan WhatsApp sebenar perlu disahkan dalam ujian akhir pelancaran; status `sent` hanya bukti penerimaan API.

## Penyediaan dan deploy

Jalankan dari `backend/` dengan Node 22+:

```powershell
npm ci
npm run typecheck
npm test

```

Database production sudah ditetapkan dalam `wrangler.jsonc`; jangan cipta semula. Untuk persekitaran baharu, cipta database berasingan dan gantikan ID konfigurasi. Jadual: `coaching_requests` dan `coaching_rate_limits`.

```powershell
npm run migrate:local
npm run migrate:remote
npx wrangler deploy
npx wrangler secret put GOOGLE_CALENDAR_API_KEY
npx wrangler secret put MURPATI_API_KEY
npx wrangler secret put RATE_LIMIT_SECRET
```

Gunakan nilai rawak sekurang-kurangnya 32 bait bagi `RATE_LIMIT_SECRET`. Jangan simpan rahsia dalam sumber, konfigurasi awam atau log. `.dev.vars` diabaikan oleh Git; fail contoh hanya mengandungi nama rahsia. Google API key mesti dihadkan kepada Google Calendar API; aktifkan API tersebut pada projek berkenaan. Ia digunakan untuk membaca kalendar awam, tanpa kebenaran mencipta acara.

Semak `coaching_request_admin` sudah Approved dan nombor penghantar ialah nombor yang dikehendaki. Gunakan satu ujian berlabel UJIAN kepada nombor penerima pemilik sahaja. Sahkan mesej sebenar diterima dengan semua 11 parameter. Selepas itu tetapkan `NOTIFICATIONS_ENABLED=true`, deploy semula dan semak endpoint health.

Tetapkan `window.COACHING_CONFIG.apiBase` dalam `js/coaching-config.js` kepada asal HTTPS Worker (tanpa `/api/coaching`). GitHub Pages kekal sebagai hosting frontend. CORS hanya menerima `cikgukb.my`, `www.cikgukb.my` dan `cikgukb.github.io`; tambahkan asal pratonton secara eksplisit jika diperlukan. Jangan gunakan `*`.

Terbitkan fail halaman/CSS/JS dan dua pautan di `index.html` menggunakan aliran GitHub Pages sedia ada hanya selepas integrasi siap. Jangan ubah CNAME atau borang pertanyaan lama. Jika rollback diperlukan, keluarkan pautan coaching dan tetapkan `NOTIFICATIONS_ENABLED=false`; kekalkan rekod D1.

## Kontrak API

- `GET /api/coaching/health`: `{ready: boolean}`, termasuk pemeriksaan akses jadual D1; bukan bukti penghantaran WhatsApp berjaya.
- `GET /api/coaching/availability?date=YYYY-MM-DD`: `date`, `minDate`, `maxDate`, `timezone` dan `slots[]` (`date,time,start,end`). Tiada tajuk acara disampaikan kepada pelayar.
- `POST /api/coaching/requests`: JSON `id` UUID v4, `topic`, `level`, `need`, `outcome`, `kpi`, `approach`, `format`, `location`, `date`, `time`, `name`, `phone`, honeypot `website` kosong. Enumerasi ditetapkan dalam `src/domain.ts`. Jawapan teks satu baris dinormalisasikan dan dihadkan mengikut UI.
- Respons 201 (baharu) atau 200 (ulangan idempotent): `reference`, `status: pending_confirmation`, `notificationStatus`, `message`. UUID yang sama dengan jawapan berbeza menghasilkan 409. Telefon bermula 0 dinormalisasikan kepada kod Malaysia 60.
- Ralat 400/413/415 untuk input; 403 untuk asal tidak dibenarkan; 409 apabila slot berubah; 429 apabila had dicapai; 503 apabila kalendar/storan/konfigurasi gagal. Jangan anggap ralat kalendar sebagai hari kosong.
- Tempoh sesi tetap 3 jam, bermula 09:00 / 14:00 / 20:00 MYT. Waktu mula sekurang-kurangnya 24 jam akan datang, tarikh sehingga hari ke-60 termasuk hari tersebut. Pertindihan dikira dengan sempadan `[start,end)`.

## Templat Murpati dan outbox

Nama: `coaching_request_admin`; bahasa: `ms`; kategori dimohon: Utility. Teks yang dihantar untuk semakan:

```text
Permohonan personal coaching baharu untuk semakan KBB.

Rujukan permohonan: {{1}}
Nama pemohon: {{2}}
Nombor WhatsApp pemohon: {{3}}
Bidang coaching pilihan: {{4}}
Tahap pengalaman semasa: {{5}}
Bantuan yang diperlukan: {{6}}
Hasil yang ingin dicapai: {{7}}
Sasaran atau KPI: {{8}}
Pendekatan pembelajaran pilihan: {{9}}
Format sesi dan lokasi: {{10}}
Tarikh dan masa pilihan: {{11}}

Permohonan ini sedang menunggu pengesahan. Harga akan dimaklumkan selepas semakan. Sila hubungi pemohon untuk membincangkan keperluan dan mengesahkan sesi. KPI ialah sasaran untuk dibincangkan, bukan jaminan hasil.
```

Urutan `body_params` mesti tepat seperti di atas. Payload notifikasi dibekukan semasa simpan, termasuk penerima, sesi dan templat. Percubaan semula menghantar payload sama dengan `Idempotency-Key: coaching-<UUID>`; perubahan konfigurasi tidak mengubah notifikasi yang sedang menunggu.

Cron lima minit memproses sehingga 20 rekod yang perlu dicuba semula. Lease D1 mencegah dua proses menghantar rekod serentak. 429/5xx/kegagalan rangkaian dicuba semula sehingga enam cubaan; 202/409 tidak pasti menjadi `needs_attention` tanpa cubaan automatik. Penolakan lain menjadi `failed`. `sent` bermakna API Murpati menerima penghantaran dengan message ID, bukan pengesahan penerima membaca mesej.

Periksa rekod yang memerlukan perhatian melalui akses pentadbiran D1:

```sql
SELECT id, created_at, notification_status, notification_attempts, notification_error
FROM coaching_requests
WHERE notification_status IN ('failed','needs_attention')
ORDER BY created_at DESC;
```

Selepas membetulkan templat/credential dan memastikan mesej tidak diterima, tetapkan baris tertentu kepada `retry`, `next_attempt_at=0`, `lease_until=0` melalui pentadbiran D1. Kekalkan UUID dan payload asal. Jangan cetak jawapan pemohon atau API key dalam log.

## QA tempatan

```powershell
npm test
npm run typecheck
npx wrangler deploy --dry-run
npx tsx tests/preview.ts
```

Buka `http://127.0.0.1:8788/coaching.html`. Pratonton hanya mendengar pada loopback, menggunakan D1 sementara dan menyekat penghantaran keluar sebenar. Slot 14:00 disimulasikan sibuk; tarikh berakhir `-20` mensimulasikan kegagalan kalendar. Konfigurasi simulasi hanya disuntik oleh server ujian dan tidak dimasukkan ke frontend production.

Ujian automatik menggunakan D1 sebenar dalam Miniflare untuk semakan simpan, idempotency, concurrency, outbox serta kegagalan. UI telah diuji dengan aliran fizikal, perubahan ke online, KPI belum pasti, nombor tidak sah, kegagalan kalendar dan halaman terima kasih. Semak semula endpoint production dan penerimaan WhatsApp selepas semua prasyarat pelancaran diselesaikan.

`npm audit --omit=dev` tiada penemuan pada masa ujian. Audit penuh melaporkan kebergantungan development `sharp` melalui Miniflare/Wrangler; ia tidak dibundel dalam Worker. Jangan gunakan `npm audit fix --force` yang menurunkan versi tooling tanpa semakan keserasian.
