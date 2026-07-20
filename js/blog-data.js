/* ============================================================
   DATA BLOG & ARTIKEL — cikgukb.my
   ------------------------------------------------------------
   Fail ini menguruskan artikel, panduan dan penulisan Cikgu KB.
   Diuruskan secara automatik menerusi admin.html atau suntingan terus.
   ============================================================ */

const BLOG_DATA = [
    {
        id: 'panduan-prompting-ai-sme',
        slug: 'panduan-prompting-ai-sme',
        category: 'ai', // 'ai' | 'marketing' | 'automation' | 'strategy'
        date: '2026-07-15',
        readTime: {
            ms: '5 min bacaan',
            en: '5 min read'
        },
        title: {
            ms: 'Panduan Asas AI Prompting untuk Usahawan SME: Dari Teori ke Operasi Harian',
            en: 'Basic AI Prompting Guide for SME Entrepreneurs: From Theory to Daily Operations'
        },
        excerpt: {
            ms: 'Ramai usahawan mencuba ChatGPT atau Gemini tetapi mendapat jawapan yang terlalu umum. Artikel ini menerangkan cara menyusun arahan berstruktur supaya AI menghasilkan jawapan tepat untuk bisnes anda.',
            en: 'Many entrepreneurs try ChatGPT or Gemini but receive overly generic responses. This article explains how to structure prompts so AI delivers precise outputs for your business.'
        },
        coverImage: 'assets/img/projects/sme-prompt-generator.webp',
        author: 'Kamarul Bahareen (Cikgu KB)',
        tags: ['AI Marketing', 'ChatGPT', 'Prompt Engineering', 'SME'],
        content: {
            ms: `
<p>Apabila kita bercakap tentang penggunaan kecerdasan buatan (AI) seperti ChatGPT, Claude atau Google Gemini dalam perniagaan, cabaran utama bukanlah teknologi itu sendiri — tetapi cara kita memberikan arahan (prompting).</p>

<h3>Mengapa Arahan Ringkas Selalunya Gagal?</h3>
<p>Bayangkan anda menggaji seorang pembantu pejabat baharu dan hanya memberi arahan: <em>"Tolong buatkan iklan untuk produk saya."</em> Pembantu itu tentu bingung kerana dia tidak tahu siapa pelanggan anda, apa kelebihan produk, nada suara yang diingini, atau di mana iklan itu akan disiarkan.</p>
<p>Begitu juga dengan model AI. Sekiranya anda hanya menaip <code>"Buatkan iklan sabun mawar"</code>, AI akan memberikan jawapan generik yang kaku dan kurang daya penarik.</p>

<h3>Rumus 5 Elemen Prompt Berkesan</h3>
<p>Untuk mendapat hasil bertaraf profesional, pastikan arahan anda mengandungi 5 elemen ini:</p>

<ol>
    <li><strong>Konteks & Latar Belakang (Background):</strong> Jelaskan industri, saiz syarikat, dan niche produk anda.</li>
    <li><strong>Peranan AI (Role):</strong> Tetapkan kepakaran AI, contohnya: <em>"Bertindak sebagai pakar copywriting pemasaran digital yang berpengalaman 10 tahun di Malaysia."</em></li>
    <li><strong>Tugasan Spesifik (Task):</strong> Nyatakan dengan jelas apa yang perlu dihasilkan (contoh: 3 variasi kapsyen Facebook).</li>
    <li><strong>Audiens Sasaran (Target Audience):</strong> Terangkan siapa pembaca utama (contoh: ibu bekerja berusia 25–40 tahun).</li>
    <li><strong>Format & Kekangan (Format & Constraints):</strong> Tetapkan panjang ayat, nada (mesra, ramah, profesional), dan perkataan yang perlu dihindari.</li>
</ol>

<blockquote>
    <p>"AI tidak menggantikan pemikiran strategik anda; ia mempercepatkan pelaksanaan apabila strategi anda sudah jelas."</p>
</blockquote>

<h3>Langkah Seterusnya untuk Bisnes Anda</h3>
<p>Mulakan hari ini dengan menyusun katalog prompt khas untuk perniagaan anda. Simpan templat arahan yang memberikan hasil terbaik supaya pasukan anda boleh mengulangi proses tersebut secara konsisten.</p>
            `,
            en: `
<p>When discussing artificial intelligence (AI) adoption in business, the primary challenge is rarely the technology itself — but rather how we structure our prompts.</p>

<h3>Why Generic Prompts Fail</h3>
<p>Imagine hiring a new assistant and simply saying: <em>"Write an ad for my product."</em> The assistant will naturally struggle because they don't know your audience, product differentiation, tone of voice, or target platform.</p>

<h3>The 5-Element Effective Prompt Formula</h3>
<ol>
    <li><strong>Background:</strong> Define your industry, company scope, and product niche.</li>
    <li><strong>Role:</strong> Set the persona: <em>"Act as a senior digital marketing copywriter with 10 years experience."</em></li>
    <li><strong>Task:</strong> State clearly what needs to be produced.</li>
    <li><strong>Target Audience:</strong> Describe who will read the output.</li>
    <li><strong>Format & Constraints:</strong> Set character limits, tone, and forbidden phrases.</li>
</ol>
            `
        }
    },
    {
        id: 'perbandingan-model-ai-generatif-2026',
        slug: 'perbandingan-model-ai-generatif-2026',
        category: 'ai',
        date: '2026-07-10',
        readTime: {
            ms: '6 min bacaan',
            en: '6 min read'
        },
        title: {
            ms: 'Perbandingan Model AI Generatif 2026: ChatGPT, Gemini & Claude untuk Bisnes Malaysia',
            en: 'Generative AI Models Comparison 2026: ChatGPT, Gemini & Claude for Malaysian Business'
        },
        excerpt: {
            ms: 'Setiap model AI mempunyai keunikan tersendiri. Artikel ini meneliti kekuatan ChatGPT 4o/5, Google Gemini 1.5/2.0 dan Claude 3.5 Sonnet dalam pemprosesan Bahasa Melayu, analisis dokumen dan pemasaran.',
            en: 'Every AI model has unique strengths. This article evaluates ChatGPT, Google Gemini, and Claude 3.5 Sonnet in Malay NLP, document processing, and marketing.'
        },
        coverImage: 'assets/img/videos/clip3.webp',
        author: 'Kamarul Bahareen (Cikgu KB)',
        tags: ['AI Models', 'Gemini', 'Claude', 'ChatGPT', 'Comparison'],
        content: {
            ms: `
<p>Sehingga tahun 2026, persaingan antara gergasi AI telah menghasilkan model-model yang sangat matang. Walau bagaimanapun, untuk kegunaan syarikat dan usahawan di Malaysia, setiap satu mempunyai kelebihan yang berbeza mengikut skop tugas.</p>

<h3>1. Claude 3.5 Sonnet / Opus — Penguasa Copywriting & Bahasa Melayu Semulajadi</h3>
<p>Claude menonjol daripada segi nada bahasa Melayu yang lebih natural, mengelakkan struktur ayat yang terasa 'diterjemah secara langsung dari Bahasa Inggeris'. Ia amat sesuai untuk penulisan artikel panjang, emel rasmi, dan cadangan perniagaan.</p>

<h3>2. Google Gemini 1.5 Pro / 2.0 — Juara Pemprosesan Dokumen Panjang & Ekosistem Google</h3>
<p>Dengan tetingkap konteks (context window) melebihi 1 juta token, Gemini mampu membaca keseluruhan PDF laporan kewangan 500 muka surat atau menganalisis rakaman video 1 jam dalam satu sesi. Integrasinya dengan Google Docs & Drive menjadikan ia alat produktiviti terbaik bagi organisasi.</p>

<h3>3. ChatGPT 4o / GPT-5 — Rangka Kerja Serba Boleh & Ekosistem Custom GPTs</h3>
<p>OpenAI kekal relevan dengan ciri pembantu suara masa nyata (real-time voice), penjanaan imej bersepadu, dan koleksi Custom GPTs yang membolehkan anda membina ejen AI khusus untuk tugasan harian tanpa pengetahuan kod.</p>

<h3>Kesimpulan Ringkas</h3>
<p>Gunakan <strong>Claude</strong> untuk penulisan emel dan copywriting rasmi, <strong>Gemini</strong> untuk analisis fail/dokumen besar, dan <strong>ChatGPT</strong> untuk eksperimen perbualan interaktif & integrasi alatan.</p>
            `,
            en: `
<p>By 2026, competition among AI giants has produced mature models. However, for Malaysian businesses, each tool excels in distinct operational domains.</p>

<h3>1. Claude — Natural Malay Copywriting</h3>
<p>Claude excels in natural Malay phrasing, avoiding direct English-to-Malay literal translations.</p>

<h3>2. Google Gemini — Large Context Window & Document Processing</h3>
<p>With massive context windows, Gemini parses long PDFs and hour-long videos effortlessly.</p>
            `
        }
    },
    {
        id: 'automasi-kandungan-media-sosial-ai-webhook',
        slug: 'automasi-kandungan-media-sosial-ai-webhook',
        category: 'automation',
        date: '2026-06-28',
        readTime: {
            ms: '7 min bacaan',
            en: '7 min read'
        },
        title: {
            ms: 'Cara Automasi Kandungan Media Sosial Menggunakan AI & Webhook Tanpa Kod',
            en: 'How to Automate Social Media Content Using AI & No-Code Webhooks'
        },
        excerpt: {
            ms: 'Menghasilkan kandungan secara konsisten adalah masalah terbesar usahawan. Ketahui cara menghubungkan penjanaan idea AI dengan jadual hantaran media sosial secara automatik.',
            en: 'Consistent content generation is a major hurdle for business owners. Learn how to connect AI idea generation with automated social posting.'
        },
        coverImage: 'assets/img/videos/clip1.webp',
        author: 'Kamarul Bahareen (Cikgu KB)',
        tags: ['Automation', 'Webhook', 'Social Media', 'Content Creation'],
        content: {
            ms: `
<p>Mengekalkan kehadiran aktif di Facebook, Instagram, TikTok dan LinkedIn memerlukan disiplin yang tinggi. Namun, jika anda memandu keseluruhan proses secara manual dari awal hingga akhir, masa anda akan habis pada tugasan rutin.</p>

<h3>Aliran Kerja Automasi Kandungan 3 Langkah</h3>

<ol>
    <li><strong>Sistem Penjanaan Idea AI:</strong> Sediakan borang ringkas di mana anda memasukkan tajuk atau berita industri. Prompt AI akan menjana 3 variasi sudut penyampaian (educate, entertain, sell).</li>
    <li><strong>Penyimpanan Berstruktur (Airtable / Google Sheets):</strong> Webhook menghantar hasil penulisan AI terus ke jadual kandungan untuk disemak dan diluluskan.</li>
    <li><strong>Auto-Posting (Make / Zapier):</strong> Sebaik sahaja status kandungan ditukar kepada <em>'Approved'</em>, pautan webhook akan menjadualkan hantaran ke akaun sosial syarikat anda.</li>
</ol>

<p>Dengan persediaan ini, anda hanya perlu meluangkan masa 1 jam seminggu untuk menyemak kandungan, manakala sistem menggerakkan selebihnya.</p>
            `,
            en: `
<p>Maintaining active social presences requires discipline. Automating routine workflows frees your time for strategic decisions.</p>
            `
        }
    },
    {
        id: 'kerangka-broke-arahan-ai-penjawat-awam',
        slug: 'kerangka-broke-arahan-ai-penjawat-awam',
        category: 'strategy',
        date: '2026-06-10',
        readTime: {
            ms: '8 min bacaan',
            en: '8 min read'
        },
        title: {
            ms: 'Penggunaan AI Dalam Sektor Awam: Etika, Protokol Rasmi & Templat Prompt Penjawat Awam',
            en: 'AI Usage in Public Sector: Ethics, Official Protocol & Civil Servant Prompt Templates'
        },
        excerpt: {
            ms: 'Kertas kerja, memo rasmi, dan minit mesyuarat memerlukan nada dan struktur yang khusus. Belajar cara menggunakan kerangka BROKE untuk mempercepat penulisan dokumen rasmi.',
            en: 'Official papers, memos, and meeting minutes require specific tone and structure. Learn how the BROKE framework accelerates official document drafting.'
        },
        coverImage: 'assets/img/projects/promptkakitanganawam.webp',
        author: 'Kamarul Bahareen (Cikgu KB)',
        tags: ['BROKE Framework', 'Public Sector', 'Prompt Engineering', 'AI Ethics'],
        content: {
            ms: `
<p>Sektor awam dan korporat mempunyai bahasa serta etika penulisan yang ketat. Menggunakan AI tanpa kerangka arahan yang jelas kerap menghasilkan teks yang tidak sesuai dengan protokol rasmi.</p>

<h3>Memahami Kerangka BROKE</h3>
<p>Kerangka BROKE direka untuk memastikan AI memahami peranan dan konteks perkhidmatan awam Malaysia:</p>
<ul>
    <li><strong>B — Background (Latar Belakang):</strong> Berikan konteks jabatan atau isu semasa.</li>
    <li><strong>R — Role (Peranan):</strong> Tetapkan AI sebagai Pegawai Pentadbir yang mahir atau Perunding Pemasaran.</li>
    <li><strong>O — Objectives (Objektif):</strong> Nyatakan tujuan dokumen (contoh: maklum balas aduan awam).</li>
    <li><strong>K — Key Result (Hasil Utama):</strong> Bentuk dokumen yang diperlukan (nota taklimat, emel rasmi).</li>
    <li><strong>E — Expectation (Jangkaan & Nada):</strong> Gunakan Bahasa Melayu berekonomi, sopan dan mematuhi format rasmi.</li>
</ul>

<h3>Kerahsiaan Data & Keselamatan Maklumat</h3>
<p>Sentiasa ingat: <strong>Jangan sekali-kali memasukkan maklumat peribadi sensitif (NOC/IC), dokumen terperingkat Rahsia/Sulit, atau kata laluan ke dalam model AI awam.</strong></p>
            `,
            en: `
<p>Public and corporate sectors maintain strict document etiquette. Prompting AI without a structured framework often yields text non-compliant with official protocols.</p>
            `
        }
    },
    {
        id: '5-alat-ai-visual-video-terbaik-2026',
        slug: '5-alat-ai-visual-video-terbaik-2026',
        category: 'ai',
        date: '2026-05-20',
        readTime: {
            ms: '6 min bacaan',
            en: '6 min read'
        },
        title: {
            ms: '5 Alat AI Visual & Video Terbaik 2026 untuk Menjana Visual Iklan Produk SME',
            en: '5 Best AI Visual & Video Tools 2026 for SME Product Ad Visuals'
        },
        excerpt: {
            ms: 'Penjanaan visual berkualiti tinggi tidak lagi memerlukan studio mahal. Terokai Midjourney, Flux, Kling AI, Luma Dream Machine dan Veo 3 untuk rekaan visual jenama anda.',
            en: 'High-quality visual generation no longer demands costly studios. Explore Midjourney, Flux, Kling AI, Luma Dream Machine, and Veo 3 for your brand.'
        },
        coverImage: 'assets/img/projects/vizuail.webp',
        author: 'Kamarul Bahareen (Cikgu KB)',
        tags: ['Visual AI', 'Midjourney', 'Veo 3', 'Product Photography', 'Generative Video'],
        content: {
            ms: `
<p>Bagi peniaga kecil dan pemilik jenama, menghasilkan foto produk dan klip video iklan yang nampak profesional selalunya menelan belanja besar. Perkembangan teknologi penjanaan imej & video AI dalam 2026 menukar lanskap ini secara drastik.</p>

<h3>1. Flux.1 & Midjourney v6.5 — Fotografi Produk Sinematik</h3>
<p>Flux dan Midjourney kini mampu menghasilkan tekstur bahan produk, biasan cahaya studio, dan bayangan yang sangat realistik berdasarkan input gambar asal produk anda.</p>

<h3>2. Google Veo 3 & Kling AI — Pembinaan Klip Iklan Pendek</h3>
<p>Untuk video iklan TikTok dan Reels, model video generasi terkini seperti Veo 3 membolehkan pergerakan kamera sinematik (pan, zoom, orbit) dijana daripada arahan teks yang ringkas.</p>

<h3>3. CapCut AI & Remotion — Automasi Suntingan & Subtajuk</h3>
<p>Mengabungkan aset video AI dengan automasi templat subtajuk dan susunan audio untuk kempen promosi sedia siar dalam beberapa minit.</p>
            `,
            en: `
<p>For small business owners, creating professional product photography and video ads used to be expensive. 2026 AI visual generation changes everything.</p>
            `
        }
    }
];
