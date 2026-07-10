/* ============================================================
   DATA PROJEK — cikgukb.my
   ------------------------------------------------------------
   Fail ini ialah satu-satunya tempat untuk mengurus projek.

   • FEATURED_PROJECTS : projek pilihan di halaman utama,
     setiap satu dengan kajian kes penuh (BM + EN).
   • ARCHIVE_PROJECTS  : arkib penuh, dipapar dalam grid
     bertapis. Susunan array = susunan paparan.

   Panduan penyelenggaraan: lihat docs/MAINTENANCE.md
   ============================================================ */

const FEATURED_PROJECTS = [
    {
        id: 'noir-skincare',
        name: 'NOIR — Analisis Skincare AI',
        tagline: {
            ms: 'Aplikasi analisis wajah berkuasa AI dengan computer vision dalam pelayar.',
            en: 'AI-powered facial analysis app with in-browser computer vision.'
        },
        category: { ms: 'AI & Computer Vision', en: 'AI & Computer Vision' },
        tech: ['React', 'MediaPipe', 'Cloudflare Workers', 'D1', 'OpenAI Vision', 'Capacitor'],
        status: 'prototype', // live | prototype | repo
        image: '', // tiada demo awam — kad tipografi dipapar, bukan skrin rekaan

        imageAlt: { ms: 'Kad kulit projek NOIR Analisis Skincare', en: 'Cover card for the NOIR skincare analysis project' },
        repo: 'https://github.com/cikgukb/projekanalisisskincare',
        demo: '',
        caseStudy: {
            problem: {
                ms: 'Bisnes penjagaan kulit sukar memberi konsultasi peribadi pada skala besar — setiap pelanggan perlu dinilai secara manual sebelum produk yang sesuai boleh dicadangkan.',
                en: 'Skincare businesses struggle to give personal consultation at scale — every customer needs manual assessment before the right products can be recommended.'
            },
            audience: {
                ms: 'Pengguna akhir yang mahu penilaian kulit pantas, dan bisnes skincare yang mahu alat konsultasi digital.',
                en: 'End users who want a fast skin assessment, and skincare businesses that want a digital consultation tool.'
            },
            solution: {
                ms: 'Aplikasi mudah alih yang menerima imej wajah, mengesan mata wajah menggunakan MediaPipe FaceLandmarker terus dalam pelayar, kemudian menghantar imej ke Cloudflare Worker yang memanggil OpenAI Vision untuk analisis berstruktur. Keputusan — skor semasa, skor potensi dan cadangan rutin — disimpan dalam pangkalan data D1.',
                en: 'A mobile app that accepts a facial image, detects face landmarks with MediaPipe FaceLandmarker directly in the browser, then sends the image to a Cloudflare Worker that calls OpenAI Vision for structured analysis. Results — current score, potential score and routine recommendations — are stored in a D1 database.'
            },
            features: {
                ms: ['Tangkapan kamera & pengesanan wajah dalam pelayar (tiada muat naik sebelum sah)', 'Analisis AI berstruktur dengan skor 0–100 semasa dan potensi', 'Cadangan rutin penjagaan langkah demi langkah', 'Sejarah analisis per peranti dalam Cloudflare D1', 'Binaan APK Android melalui Capacitor'],
                en: ['In-browser camera capture & face detection (nothing uploads until valid)', 'Structured AI analysis with 0–100 current and potential scores', 'Step-by-step skincare routine recommendations', 'Per-device analysis history in Cloudflare D1', 'Android APK build via Capacitor']
            },
            value: {
                ms: 'Menunjukkan keupayaan membina solusi AI berdepan pelanggan dari hujung ke hujung: frontend, computer vision, API pelayan, pangkalan data dan pembungkusan mudah alih.',
                en: 'Demonstrates end-to-end capability to build customer-facing AI solutions: frontend, computer vision, server API, database and mobile packaging.'
            },
            statusNote: {
                ms: 'Prototaip berfungsi — sedang dalam pembangunan aktif, belum dilancarkan secara awam.',
                en: 'Working prototype — under active development, not yet publicly launched.'
            }
        }
    },
    {
        id: 'tanahpro',
        name: 'TanahPro — Laman Kaspan',
        tagline: {
            ms: 'Laman jualan hartanah langsung di domain sendiri untuk 20 lot banglo di Batu Pahat.',
            en: 'Live property sales site on its own domain for 20 bungalow lots in Batu Pahat.'
        },
        category: { ms: 'Web & Industri', en: 'Web & Industry' },
        tech: ['HTML', 'CSS', 'JavaScript', 'Domain sendiri'],
        status: 'live',
        image: 'assets/img/projects/tanahpro.webp',
        imageAlt: { ms: 'Paparan laman web TanahPro dengan hero tanah lot Parit Raja', en: 'TanahPro website hero showing Parit Raja land lots' },
        repo: 'https://github.com/cikgukb/projektanahlotbatupahat',
        demo: 'https://tanahpro.my',
        caseStudy: {
            problem: {
                ms: 'Jualan lot tanah biasanya bergantung pada papan tanda, ejen dan poster WhatsApp yang bersepah — sukar untuk prospek menilai lokasi, pelan dan status kelulusan dengan yakin.',
                en: 'Land lot sales usually rely on signboards, agents and scattered WhatsApp posters — prospects find it hard to assess location, plans and approval status with confidence.'
            },
            audience: {
                ms: 'Pembeli hartanah di Johor yang mencari lot banglo, dan pemilik tanah yang mahu saluran jualan yang teratur.',
                en: 'Property buyers in Johor looking for bungalow lots, and the land owner who wants an organised sales channel.'
            },
            solution: {
                ms: 'Laman jualan dwibahasa (BM/EN) di domain tanahpro.my yang menyusun semua maklumat keputusan di satu tempat: pelan lot, keluasan, status kelulusan MPBP, lokasi berhampiran UTHM dan tindakan WhatsApp terus kepada penjual.',
                en: 'A bilingual (BM/EN) sales site on the tanahpro.my domain that puts every decision-making detail in one place: lot plans, sizes, MPBP approval status, location near UTHM and a direct WhatsApp action to the seller.'
            },
            features: {
                ms: ['Domain komersial sendiri (tanahpro.my)', 'Pelan lot dan spesifikasi setiap unit', 'Dwibahasa dengan penukar BM/EN', 'CTA WhatsApp terus dari setiap seksyen', 'Reka bentuk premium yang sepadan dengan nilai produk'],
                en: ['Its own commercial domain (tanahpro.my)', 'Lot plans and per-unit specifications', 'Bilingual with a BM/EN switcher', 'Direct WhatsApp CTA from every section', 'Premium design that matches the product value']
            },
            value: {
                ms: 'Contoh sebenar bagaimana produk bernilai tinggi tempatan boleh dipasarkan dengan sistem digital yang kemas — bukan sekadar iklan, tetapi saluran jualan lengkap.',
                en: 'A real example of how a high-value local product can be marketed with a clean digital system — not just an ad, but a complete sales channel.'
            },
            statusNote: {
                ms: 'Live di tanahpro.my.',
                en: 'Live at tanahpro.my.'
            }
        }
    },
    {
        id: 'ai-sales-kit',
        name: 'AI Sales Kit',
        tagline: {
            ms: 'Penjana bahan jualan dan pemasaran berkuasa AI untuk SME.',
            en: 'AI-powered sales and marketing material generator for SMEs.'
        },
        category: { ms: 'AI & Pemasaran', en: 'AI & Marketing' },
        tech: ['React', 'TypeScript', 'Vite', 'Serverless API', 'Replicate'],
        status: 'live',
        image: 'assets/img/projects/aisaleskit.webp',
        imageAlt: { ms: 'Antara muka aplikasi AI Sales Kit', en: 'AI Sales Kit application interface' },
        repo: 'https://github.com/cikgukb/ai-sales-kit',
        demo: 'https://ai-sales-kit-chi.vercel.app',
        caseStudy: {
            problem: {
                ms: 'Kebanyakan SME tahu mereka perlu bahan pemasaran yang meyakinkan, tetapi tiada masa, pasukan kreatif atau bajet agensi untuk menghasilkannya secara konsisten.',
                en: 'Most SMEs know they need convincing marketing material, but lack the time, creative team or agency budget to produce it consistently.'
            },
            audience: {
                ms: 'Pemilik SME dan pasukan pemasaran kecil yang mahu bahan jualan siap guna tanpa proses kreatif yang panjang.',
                en: 'SME owners and small marketing teams who want ready-to-use sales material without a long creative process.'
            },
            solution: {
                ms: 'Aplikasi web React + TypeScript dengan fungsi API pelayan yang menjana bahan pemasaran — termasuk visual melalui model penjanaan imej — daripada input ringkas tentang produk dan tawaran.',
                en: 'A React + TypeScript web app with server-side API functions that generate marketing material — including visuals via image-generation models — from simple inputs about the product and offer.'
            },
            features: {
                ms: ['Penjanaan bahan jualan daripada input berstruktur', 'Penjanaan imej AI di pelayan (kunci API tidak terdedah)', 'Antara muka moden yang mesra bukan-teknikal', 'Demo awam yang boleh dicuba terus'],
                en: ['Sales material generation from structured inputs', 'Server-side AI image generation (API keys never exposed)', 'Modern interface friendly to non-technical users', 'Public demo you can try immediately']
            },
            value: {
                ms: 'Menggabungkan pemahaman jualan (struktur tawaran, copywriting) dengan pelaksanaan teknikal — jenis alat yang boleh disesuaikan untuk mana-mana industri.',
                en: 'Combines sales understanding (offer structure, copywriting) with technical execution — the kind of tool that can be adapted for any industry.'
            },
            statusNote: {
                ms: 'Live — demo awam di Vercel.',
                en: 'Live — public demo on Vercel.'
            }
        }
    },
    {
        id: 'skyframe',
        name: 'SKYFRAME — Servis Dron',
        tagline: {
            ms: 'Laman perkhidmatan fotografi dan videografi udara dengan tempahan WhatsApp.',
            en: 'Aerial photography and videography service site with WhatsApp booking.'
        },
        category: { ms: 'Web & Industri', en: 'Web & Industry' },
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'live',
        image: 'assets/img/projects/skyframe.webp',
        imageAlt: { ms: 'Hero laman SKYFRAME dengan juruterbang dron dan dron di udara', en: 'SKYFRAME site hero with a drone pilot and drone in flight' },
        repo: 'https://github.com/cikgukb/droneservice',
        demo: 'https://cikgukb.github.io/droneservice/',
        caseStudy: {
            problem: {
                ms: 'Perkhidmatan dron tempatan selalunya dipasarkan hanya melalui media sosial — tiada tempat tetap untuk prospek menilai portfolio, servis dan cara menempah.',
                en: 'Local drone services are often marketed only through social media — there is no fixed place for prospects to assess the portfolio, services and how to book.'
            },
            audience: {
                ms: 'Pemilik hartanah, pemaju, agensi kreatif dan penganjur acara yang memerlukan rakaman udara.',
                en: 'Property owners, developers, creative agencies and event organisers who need aerial footage.'
            },
            solution: {
                ms: 'Laman satu halaman dengan penjenamaan penuh — portfolio kerja, senarai servis (pemeriksaan tanah, hartanah, landskap) dan tempahan terus melalui WhatsApp.',
                en: 'A fully branded one-page site — work portfolio, service list (land inspection, real estate, landscape) and direct WhatsApp booking.'
            },
            features: {
                ms: ['Penjenamaan lengkap (nama, logo, identiti visual)', 'Seksyen portfolio dan senarai servis', 'Tempahan WhatsApp satu klik', 'Reka bentuk sinematik yang menjual kualiti rakaman'],
                en: ['Complete branding (name, logo, visual identity)', 'Portfolio section and service list', 'One-click WhatsApp booking', 'Cinematic design that sells footage quality']
            },
            value: {
                ms: 'Menunjukkan proses penuh membina kehadiran digital untuk bisnes perkhidmatan: penjenamaan, struktur tawaran dan saluran tempahan dalam satu laman.',
                en: 'Shows the full process of building a digital presence for a service business: branding, offer structure and a booking channel in one page.'
            },
            statusNote: {
                ms: 'Live di GitHub Pages.',
                en: 'Live on GitHub Pages.'
            }
        }
    },
    {
        id: 'prompt-kakitangan-awam',
        name: 'Katalog Prompt Kakitangan Awam',
        tagline: {
            ms: 'Katalog prompt AI siap guna untuk tugasan harian penjawat awam Malaysia.',
            en: 'Ready-to-use AI prompt catalog for Malaysian civil servants’ daily tasks.'
        },
        category: { ms: 'AI & Latihan', en: 'AI & Training' },
        tech: ['HTML', 'CSS', 'JavaScript'],
        status: 'live',
        image: 'assets/img/projects/promptkakitanganawam.webp',
        imageAlt: { ms: 'Katalog Prompt Kakitangan Awam dengan kad prompt dan penapis kategori', en: 'Civil servant prompt catalog with prompt cards and category filters' },
        repo: 'https://github.com/cikgukb/promptkakitanganawam',
        demo: 'https://cikgukb.github.io/promptkakitanganawam/',
        caseStudy: {
            problem: {
                ms: 'Ramai penjawat awam mahu menggunakan AI seperti Gemini atau Claude dalam kerja harian, tetapi tidak pasti cara menulis arahan yang sesuai dengan konteks dan nada rasmi kerajaan.',
                en: 'Many civil servants want to use AI like Gemini or Claude in daily work, but are unsure how to write instructions that fit government context and formal tone.'
            },
            audience: {
                ms: 'Penjawat awam Malaysia — daripada pegawai yang menulis memo dan minit mesyuarat sehingga unit yang mengurus aduan awam.',
                en: 'Malaysian civil servants — from officers writing memos and meeting minutes to units managing public complaints.'
            },
            solution: {
                ms: 'Katalog prompt dwibahasa yang disusun mengikut tugasan sebenar: e-mel rasmi, memo, aduan awam, minit mesyuarat, laporan, teks ucapan dan hebahan acara — setiap satu boleh disalin dengan satu klik, lengkap dengan tutorial penggunaan.',
                en: 'A bilingual prompt catalog organised by real tasks: official emails, memos, public complaints, meeting minutes, reports, speeches and event announcements — each copyable in one click, complete with usage tutorials.'
            },
            features: {
                ms: ['Prompt dikategorikan mengikut tugasan sebenar sektor awam', 'Salin satu klik terus ke Gemini atau Claude', 'Dwibahasa BM/EN', 'Seksyen tutorial dan tips penggunaan AI'],
                en: ['Prompts categorised by real public-sector tasks', 'One-click copy straight into Gemini or Claude', 'Bilingual BM/EN', 'Tutorial and AI usage tips section']
            },
            value: {
                ms: 'Bukti pemahaman konteks sektor awam — jenis alat sokongan yang menjadikan latihan AI untuk agensi kerajaan praktikal, bukan teori.',
                en: 'Proof of public-sector context understanding — the kind of support tool that makes AI training for government agencies practical, not theoretical.'
            },
            statusNote: {
                ms: 'Live di GitHub Pages — digunakan sebagai bahan sokongan latihan.',
                en: 'Live on GitHub Pages — used as training support material.'
            }
        }
    },
    {
        id: 'cashflow-usahawan',
        name: 'Cashflow Usahawan',
        tagline: {
            ms: 'Simulasi aliran tunai SME Malaysia — belajar keputusan bisnes melalui permainan.',
            en: 'Malaysian SME cash-flow simulation — learn business decisions through play.'
        },
        category: { ms: 'Alat Latihan', en: 'Training Tool' },
        tech: ['TypeScript', 'React', 'Vite'],
        status: 'live',
        image: 'assets/img/projects/cashflowgame.webp',
        imageAlt: { ms: 'Antara muka permainan simulasi Cashflow Usahawan', en: 'Cashflow Usahawan simulation game interface' },
        repo: 'https://github.com/cikgukb/cashflowgame',
        demo: 'https://cashflowgame-one.vercel.app',
        caseStudy: {
            problem: {
                ms: 'Konsep aliran tunai, KPI dan risiko selalunya diajar melalui slaid — peserta faham secara teori tetapi tidak merasai kesan keputusan mereka.',
                en: 'Cash flow, KPI and risk concepts are usually taught through slides — participants understand in theory but never feel the impact of their decisions.'
            },
            audience: {
                ms: 'Usahawan SME dan peserta program latihan keusahawanan.',
                en: 'SME entrepreneurs and entrepreneurship training participants.'
            },
            solution: {
                ms: 'Permainan simulasi dalam TypeScript di mana pemain menguruskan SME Malaysia — membuat keputusan pemasaran, mengurus KPI, menimbang risiko dan menggunakan kad leverage — sambil melihat kesan setiap keputusan pada aliran tunai.',
                en: 'A TypeScript simulation game where players manage a Malaysian SME — making marketing decisions, managing KPIs, weighing risks and playing leverage cards — while seeing how every decision hits cash flow.'
            },
            features: {
                ms: ['Simulasi keputusan pemasaran dan operasi', 'Sistem KPI, risiko dan kad leverage', 'Konteks bisnes Malaysia yang dikenali peserta', 'Boleh dimainkan terus dalam pelayar'],
                en: ['Marketing and operations decision simulation', 'KPI, risk and leverage card systems', 'Malaysian business context participants recognise', 'Playable directly in the browser']
            },
            value: {
                ms: 'Contoh pendekatan latihan saya: bina alat interaktif supaya konsep melekat melalui pengalaman, bukan hafalan.',
                en: 'An example of my training approach: build interactive tools so concepts stick through experience, not memorisation.'
            },
            statusNote: {
                ms: 'Live di Vercel — digunakan sebagai alat bantu latihan.',
                en: 'Live on Vercel — used as a training aid.'
            }
        }
    }
];

/* ------------------------------------------------------------
   ARKIB — kategori: 'ai' | 'marketing' | 'web' | 'app' |
   'automation' | 'interactive' | 'experiment'
   ------------------------------------------------------------ */

const ARCHIVE_CATEGORIES = [
    { id: 'all', label: { ms: 'Semua', en: 'All' } },
    { id: 'ai', label: { ms: 'AI & Prompt', en: 'AI & Prompts' } },
    { id: 'marketing', label: { ms: 'Alat Pemasaran', en: 'Marketing Tools' } },
    { id: 'web', label: { ms: 'Web & Industri', en: 'Web & Industry' } },
    { id: 'app', label: { ms: 'Aplikasi', en: 'Apps' } },
    { id: 'automation', label: { ms: 'Automasi', en: 'Automation' } },
    { id: 'interactive', label: { ms: 'Interaktif & Permainan', en: 'Interactive & Games' } },
    { id: 'experiment', label: { ms: 'Eksperimen', en: 'Experiments' } }
];

const ARCHIVE_PROJECTS = [
    { name: 'MYBHA / MYMFH Audit', cat: 'web', tech: 'TypeScript', desc: { ms: 'Sistem audit halal mesra bajet untuk hotel dan operasi hospitaliti.', en: 'Budget-friendly halal audit system for hotels and hospitality operations.' }, repo: 'https://github.com/cikgukb/-mybha-mymfh-audit', demo: 'https://mybha-mymfh-audit.vercel.app', image: 'assets/img/projects/halalaudit.webp' },
    { name: 'Guerrilla Marketing Kit', cat: 'marketing', tech: 'HTML/JS', desc: { ms: 'Planner taktikal mobile-first untuk usahawan mikro dan kecil Malaysia.', en: 'Mobile-first tactical planner for Malaysian micro and small entrepreneurs.' }, repo: 'https://github.com/cikgukb/guerillamarketingkit', demo: 'https://cikgukb.github.io/guerillamarketingkit/', image: 'assets/img/projects/guerillamarketingkit.webp' },
    { name: 'SME Prompt Generator', cat: 'ai', tech: 'JavaScript', desc: { ms: 'Penjana prompt AI dwibahasa untuk usahawan SME menggunakan kerangka BROKE.', en: 'Bilingual AI prompt generator for SME entrepreneurs using the BROKE framework.' }, repo: 'https://github.com/cikgukb/sme-prompt-generator', demo: 'https://cikgukb.github.io/sme-prompt-generator/', image: 'assets/img/projects/sme-prompt-generator.webp' },
    { name: 'VizuAIl Marketing Strategist', cat: 'ai', tech: 'JavaScript', desc: { ms: 'Penjana prompt fotografi produk AI dengan 13 sudut visual dan formula 5T.', en: 'AI product photography prompt generator with 13 visual angles and the 5T formula.' }, repo: 'https://github.com/cikgukb/vizuail-marketing-strategist', demo: 'https://cikgukb.github.io/vizuail-marketing-strategist/', image: 'assets/img/projects/vizuail.webp' },
    { name: 'Katalog Funnel Hacker', cat: 'marketing', tech: 'JavaScript', desc: { ms: 'Katalog interaktif strategi pemasaran funnel untuk usahawan.', en: 'Interactive catalog of funnel marketing strategies for entrepreneurs.' }, repo: 'https://github.com/cikgukb/katalog-funnel-hacker', demo: 'https://cikgukb.github.io/katalog-funnel-hacker/', image: 'assets/img/projects/katalog-funnel-hacker.webp' },
    { name: 'Google Ads Takeoff', cat: 'marketing', tech: 'JavaScript', desc: { ms: 'Penjana copy iklan Google Ads untuk rangka iklan dan variasi kempen.', en: 'Google Ads copy generator for ad frameworks and campaign variations.' }, repo: 'https://github.com/cikgukb/Google-Ads-Takeoff', demo: 'https://cikgukb.github.io/Google-Ads-Takeoff/', image: 'assets/img/projects/google-ads-takeoff.webp' },
    { name: 'TikTok Live Script', cat: 'marketing', tech: 'JavaScript', desc: { ms: 'Alat penyusunan skrip TikTok Live untuk host, penjual dan kempen jualan.', en: 'TikTok Live script builder for hosts, sellers and sales campaigns.' }, repo: 'https://github.com/cikgukb/tiktoklivescript', demo: 'https://cikgukb.github.io/tiktoklivescript/', image: 'assets/img/projects/tiktoklivescript.webp' },
    { name: 'Veo 3 Prompt Builder', cat: 'ai', tech: 'HTML/JS', desc: { ms: 'Pembina prompt video Veo 3 dengan struktur yang jelas dan mudah diguna.', en: 'Veo 3 video prompt builder with a clear, easy-to-use structure.' }, repo: 'https://github.com/cikgukb/veo3promptbuilder', demo: 'https://cikgukb.github.io/veo3promptbuilder/', image: 'assets/img/projects/veo3promptbuilder.webp' },
    { name: 'Penjana Gambar Raya', cat: 'ai', tech: 'HTML/JS', desc: { ms: 'Penjana visual bertema raya untuk ucapan dan bahan media sosial.', en: 'Raya-themed visual generator for greetings and social media material.' }, repo: 'https://github.com/cikgukb/penjanagambaraya', demo: 'https://cikgukb.github.io/penjanagambaraya/', image: 'assets/img/projects/penjanagambaraya.webp' },
    { name: 'Jimeng Tool', cat: 'ai', tech: 'JavaScript', desc: { ms: 'Alat kreatif untuk aliran kerja prompt dan eksperimen AI generatif.', en: 'Creative tool for prompt workflows and generative AI experiments.' }, repo: 'https://github.com/cikgukb/jimengtool', demo: 'https://jimengtool.vercel.app', image: 'assets/img/projects/jimengtool.webp' },
    { name: 'Kata Hikmah Video', cat: 'ai', tech: 'JavaScript', desc: { ms: 'Penjana video daripada kata-kata hikmah untuk kandungan motivasi.', en: 'Video generator from words of wisdom for motivational content.' }, repo: 'https://github.com/cikgukb/katahikmah', demo: 'https://katahikmah.vercel.app', image: 'assets/img/projects/katahikmah.webp' },
    { name: 'JomSplit', cat: 'app', tech: 'JavaScript', desc: { ms: 'Kalkulator pintar kongsi bayaran dan agihan bil untuk kumpulan.', en: 'Smart bill-splitting calculator for groups.' }, repo: 'https://github.com/cikgukb/jomsplit', demo: 'https://jomsplit.vercel.app', image: 'assets/img/projects/jomsplit.webp' },
    { name: 'Kit Jimat Cermat', cat: 'app', tech: 'JavaScript', desc: { ms: 'Kit digital untuk merancang bajet dan keputusan perbelanjaan.', en: 'Digital kit for planning budgets and spending decisions.' }, repo: 'https://github.com/cikgukb/kitjimatcermat', demo: 'https://kitjimatcermat.vercel.app', image: 'assets/img/projects/kitjimatcermat.webp' },
    { name: 'Tasbih 99', cat: 'app', tech: 'HTML/JS', desc: { ms: 'Aplikasi tasbih digital untuk zikir, kiraan harian dan sasaran amalan.', en: 'Digital tasbih app for dhikr, daily counts and practice targets.' }, repo: 'https://github.com/cikgukb/tasbih99', demo: 'https://cikgukb.github.io/tasbih99/', image: 'assets/img/projects/tasbih99.webp' },
    { name: 'Food Explorer', cat: 'app', tech: 'JavaScript', desc: { ms: 'Aplikasi meneroka menu dan idea makan secara interaktif.', en: 'Interactive app for exploring menus and meal ideas.' }, repo: 'https://github.com/cikgukb/foodexplorer', demo: 'https://cikgukb.github.io/foodexplorer/', image: 'assets/img/projects/foodexplorer.webp' },
    { name: 'Al Marji', cat: 'app', tech: 'TypeScript', desc: { ms: 'Aplikasi rujukan digital untuk akses maklumat berstruktur.', en: 'Digital reference app for structured information access.' }, repo: 'https://github.com/cikgukb/almarji', demo: 'https://almarji.vercel.app', image: 'assets/img/projects/almarji.webp' },
    { name: 'Sistem Kad Kahwin', cat: 'app', tech: 'JavaScript', desc: { ms: 'Sistem tempahan kad kahwin dengan aliran tempahan ringkas.', en: 'Wedding card ordering system with a simple booking flow.' }, repo: 'https://github.com/cikgukb/sistem-kad-kahwin-cikgukb', demo: 'https://cikgukb.github.io/sistem-kad-kahwin-cikgukb/', image: 'assets/img/projects/sistem-kad-kahwin.webp' },
    { name: 'Miera Yoga', cat: 'web', tech: 'HTML/CSS', desc: { ms: 'Laman temu janji yoga dwibahasa dengan rekaan premium.', en: 'Bilingual yoga appointment site with a premium design.' }, repo: 'https://github.com/cikgukb/mierayoga', demo: 'https://cikgukb.github.io/mierayoga/', image: 'assets/img/projects/mierayoga.webp' },
    { name: 'Service Iklan', cat: 'marketing', tech: 'HTML', desc: { ms: 'Landing page servis iklan dan content marketing untuk bisnes kecil.', en: 'Landing page for ad and content marketing services for small businesses.' }, repo: 'https://github.com/cikgukb/serviceiklan', demo: 'https://cikgukb.github.io/serviceiklan/', image: 'assets/img/projects/serviceiklan.webp' },
    { name: 'Menu Nasi Kandar', cat: 'web', tech: 'HTML/CSS', desc: { ms: 'Menu digital dan laman promosi untuk restoran tempatan.', en: 'Digital menu and promo site for a local restaurant.' }, repo: 'https://github.com/cikgukb/menunasikandar', demo: 'https://cikgukb.github.io/menunasikandar/', image: 'assets/img/projects/menunasikandar.webp' },
    { name: 'Akademi Urut', cat: 'web', tech: 'HTML', desc: { ms: 'Laman akademi urut untuk penerangan program dan pendaftaran prospek.', en: 'Massage academy site for program info and prospect registration.' }, repo: 'https://github.com/cikgukb/akademiurut', demo: 'https://cikgukb.github.io/akademiurut/', image: 'assets/img/projects/akademiurut.webp' },
    { name: 'Ukur Tanah Malaysia', cat: 'web', tech: 'JavaScript', desc: { ms: 'Laman servis ukur tanah Malaysia dengan penerangan perkhidmatan.', en: 'Malaysian land survey service site with service explanations.' }, repo: 'https://github.com/cikgukb/ukurtanahmalaysia', demo: 'https://cikgukb.github.io/ukurtanahmalaysia/', image: 'assets/img/projects/ukurtanahmalaysia.webp' },
    { name: 'Tukang Gunting', cat: 'web', tech: 'JavaScript', desc: { ms: 'Laman servis barber dengan fokus tempahan dan promosi tempatan.', en: 'Barber service site focused on bookings and local promotion.' }, repo: 'https://github.com/cikgukb/tukanggunting', demo: 'https://cikgukb.github.io/tukanggunting/', image: 'assets/img/projects/tukanggunting.webp' },
    { name: 'Optometri', cat: 'web', tech: 'HTML/CSS', desc: { ms: 'Laman servis optometri dan promosi pemeriksaan penglihatan.', en: 'Optometry service site promoting vision checks.' }, repo: 'https://github.com/cikgukb/Optometri', demo: 'https://cikgukb.github.io/Optometri/', image: 'assets/img/projects/optometri.webp' },
    { name: 'Bopindo', cat: 'web', tech: 'HTML', desc: { ms: 'Laman web untuk brand Bopindo.', en: 'Website for the Bopindo brand.' }, repo: 'https://github.com/cikgukb/bopindo', demo: 'https://cikgukb.github.io/bopindo/', image: 'assets/img/projects/bopindo.webp' },
    { name: 'Serunding Haji Wan', cat: 'web', tech: 'HTML', desc: { ms: 'Landing page produk makanan premium Serunding Haji Wan.', en: 'Landing page for the Serunding Haji Wan premium food product.' }, repo: 'https://github.com/cikgukb/serundinghajiwan', demo: 'https://cikgukb.github.io/serundinghajiwan/', image: 'assets/img/projects/serundinghajiwan.webp' },
    { name: 'HQC Learning Centre', cat: 'web', tech: 'JavaScript', desc: { ms: 'Laman untuk pusat pembelajaran dan program pendidikan.', en: 'Site for a learning centre and education programs.' }, repo: 'https://github.com/cikgukb/hqclearningcentre', demo: 'https://cikgukb.github.io/hqclearningcentre/', image: 'assets/img/projects/hqclearningcentre.webp' },
    { name: 'WA Bot Wakaf Sedekah', cat: 'automation', tech: 'Python', desc: { ms: 'Automasi WhatsApp untuk kempen wakaf, sedekah dan susulan komuniti.', en: 'WhatsApp automation for wakaf and sedekah campaigns with community follow-up.' }, repo: 'https://github.com/cikgukb/wabot-wakaf-sedekah', demo: '', image: '' },
    { name: 'Sila Koyakkan (Poster Reveal)', cat: 'interactive', tech: 'HTML/JS', desc: { ms: 'Mikrosite kempen dengan tirai interaktif — koyak untuk dedah poster dan terus ke borang tempahan.', en: 'Campaign microsite with an interactive curtain — tear to reveal the poster, then straight to the order form.' }, repo: 'https://github.com/cikgukb/kelasanygen', demo: 'https://cikgukb.github.io/kelasanygen/', image: '' },
    { name: 'Spin & Win', cat: 'interactive', tech: 'HTML/CSS', desc: { ms: 'Permainan spin-and-win untuk kempen promosi dan kutipan lead.', en: 'Spin-and-win game for promo campaigns and lead capture.' }, repo: 'https://github.com/cikgukb/spinwin', demo: 'https://cikgukb.github.io/spinwin/', image: 'assets/img/projects/spinwin.webp' },
    { name: 'Game Lokaliti', cat: 'interactive', tech: 'TypeScript', desc: { ms: 'Permainan strategi menguasai kawasan lokaliti dengan keputusan taktikal.', en: 'Strategy game about dominating local areas through tactical decisions.' }, repo: 'https://github.com/cikgukb/gamelokaliti', demo: '', image: '' },
    { name: 'MLM Prototype', cat: 'experiment', tech: 'HTML/CSS', desc: { ms: 'Eksperimen front-end untuk struktur jaringan dan model pemasaran.', en: 'Front-end experiment for network structures and marketing models.' }, repo: 'https://github.com/cikgukb/mlm', demo: 'https://cikgukb.github.io/mlm/', image: 'assets/img/projects/mlm.webp' }
];
