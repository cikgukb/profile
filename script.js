const projects = [
    { name: 'serviceiklan', title: 'Service Iklan Landing Page', category: 'Website & Client', language: 'HTML', description: 'Landing page servis iklan dan content marketing untuk tawaran bisnes kecil.', repo: 'https://github.com/cikgukb/serviceiklan', demo: 'https://cikgukb.github.io/serviceiklan/', image: '' },
    { name: 'wabot-wakaf-sedekah', title: 'WA Bot Wakaf Sedekah', category: 'Automation', language: 'Python', description: 'Automation WhatsApp untuk kempen wakaf, sedekah dan follow-up komuniti.', repo: 'https://github.com/cikgukb/wabot-wakaf-sedekah', demo: '', image: '' },
    { name: 'tasbih99', title: 'Tasbih 99', category: 'Interactive Apps', language: 'HTML', description: 'Aplikasi tasbih digital untuk zikir, kiraan harian dan target amalan.', repo: 'https://github.com/cikgukb/tasbih99', demo: 'https://cikgukb.github.io/tasbih99/', image: 'assets/portfolio/tasbih99.png' },
    { name: 'jomsplit', title: 'JomSplit Expense Splitter', category: 'Interactive Apps', language: 'JavaScript', description: 'Aplikasi kalkulator pintar kongsi bayaran dan agihan bil (split bill) untuk makan bersama, bil rumah, dan percutian kumpulan.', repo: 'https://github.com/cikgukb/jomsplit', demo: 'https://jomsplit.vercel.app', image: 'assets/portfolio/jomsplit.png' },
    { name: 'mierayoga', title: 'Miera Yoga Appointment Website', category: 'Website & Client', language: 'CSS', description: 'Premium bilingual yoga appointment website untuk Master Mira di Bandar Kinrara.', repo: 'https://github.com/cikgukb/mierayoga', demo: 'https://cikgukb.github.io/mierayoga/', image: '' },
    { name: 'cashflowgame', title: 'Cashflow Usahawan', category: 'Games & Simulators', language: 'TypeScript', description: 'Game simulasi cashflow SME Malaysia dengan keputusan marketing, KPI, risiko dan leverage cards.', repo: 'https://github.com/cikgukb/cashflowgame', demo: 'https://cashflowgame-one.vercel.app', image: 'assets/portfolio/cashflowgame.png' },
    { name: '-mybha-mymfh-audit', title: 'MYBHA MYMFH Audit', category: 'Operations', language: 'TypeScript', description: 'Sistem audit halal budget-friendly untuk hotel dan operasi hospitaliti.', repo: 'https://github.com/cikgukb/-mybha-mymfh-audit', demo: 'https://mybha-mymfh-audit.vercel.app', image: 'assets/portfolio/halalaudit.png' },
    { name: 'guerillamarketingkit', title: 'Guerrilla Marketing Command Kit', category: 'Marketing & Sales', language: 'HTML', description: 'Planner taktikal mobile-first untuk usahawan mikro dan kecil Malaysia.', repo: 'https://github.com/cikgukb/guerillamarketingkit', demo: 'https://cikgukb.github.io/guerillamarketingkit/', image: '' },
    { name: 'tiktoklivescript', title: 'TikTok Live Script', category: 'Marketing & Sales', language: 'JavaScript', description: 'Tool penyusunan skrip TikTok Live untuk host, seller dan campaign jualan.', repo: 'https://github.com/cikgukb/tiktoklivescript', demo: 'https://cikgukb.github.io/tiktoklivescript/', image: 'assets/portfolio/tiktoklivescript.png' },
    { name: 'jimengtool', title: 'Jimeng Tool', category: 'AI & Prompt', language: 'JavaScript', description: 'Tool kreatif untuk workflow prompt, visual idea dan eksperimen AI generatif.', repo: 'https://github.com/cikgukb/jimengtool', demo: 'https://jimengtool.vercel.app', image: 'assets/portfolio/jimengtool.png' },
    { name: 'kitjimatcermat', title: 'Kit Jimat Cermat', category: 'Operations', language: 'JavaScript', description: 'Kit digital untuk bantu pengguna merancang bajet, jimat cermat dan keputusan belanja.', repo: 'https://github.com/cikgukb/kitjimatcermat', demo: 'https://kitjimatcermat.vercel.app', image: 'assets/portfolio/kitjimatcermat.png' },
    { name: 'ai-sales-kit', title: 'AI Sales Kit', category: 'AI & Prompt', language: 'TypeScript', description: 'AI Sales Kit untuk SME menjana bahan marketing dan jualan yang lebih meyakinkan.', repo: 'https://github.com/cikgukb/ai-sales-kit', demo: 'https://ai-sales-kit-chi.vercel.app', image: 'assets/portfolio/aisaleskit.png' },
    { name: 'vizuail-marketing-strategist', title: 'VizuAIl Marketing Strategist', category: 'AI & Prompt', language: 'JavaScript', description: 'AI product photography prompt generator dengan 13 visual angles dan formula 5T.', repo: 'https://github.com/cikgukb/vizuail-marketing-strategist', demo: 'https://cikgukb.github.io/vizuail-marketing-strategist/', image: '' },
    { name: 'katalog-funnel-hacker', title: 'Katalog Funnel Hacker', category: 'Marketing & Sales', language: 'JavaScript', description: 'Sistem interaktif katalog strategi pemasaran funnel hacker untuk usahawan.', repo: 'https://github.com/cikgukb/katalog-funnel-hacker', demo: 'https://cikgukb.github.io/katalog-funnel-hacker/', image: '' },
    { name: 'Google-Ads-Takeoff', title: 'Google Ads Takeoff', category: 'Marketing & Sales', language: 'JavaScript', description: 'Google Ads copy generator web app untuk rangka iklan dan variasi copy campaign.', repo: 'https://github.com/cikgukb/Google-Ads-Takeoff', demo: 'https://cikgukb.github.io/Google-Ads-Takeoff/', image: '' },
    { name: 'sme-prompt-generator', title: 'SME Prompt Generator', category: 'AI & Prompt', language: 'JavaScript', description: 'Penjana prompt AI bilingual untuk usahawan SME menggunakan kerangka BROKE.', repo: 'https://github.com/cikgukb/sme-prompt-generator', demo: 'https://cikgukb.github.io/sme-prompt-generator/', image: '' },
    { name: 'G0DM0D3', title: 'G0DM0D3 AI Chat', category: 'AI & Prompt', language: 'TypeScript', description: 'Eksperimen AI chat interface untuk eksplorasi pengalaman perbualan yang bebas dan pantas.', repo: 'https://github.com/cikgukb/G0DM0D3', demo: 'https://cikgukb.github.io/G0DM0D3/', image: '' },
    { name: 'penjanagambaraya', title: 'Penjana Gambar Raya', category: 'AI & Prompt', language: 'HTML', description: 'Generator visual bertema raya untuk kempen kreatif, ucapan dan bahan social media.', repo: 'https://github.com/cikgukb/penjanagambaraya', demo: 'https://cikgukb.github.io/penjanagambaraya/', image: '' },
    { name: 'Open-Higgsfield-AI', title: 'Open Higgsfield AI', category: 'AI & Prompt', language: 'JavaScript', description: 'Open-source AI image generation and cinema studio with multiple model workflows.', repo: 'https://github.com/cikgukb/Open-Higgsfield-AI', demo: 'https://cikgukb.github.io/Open-Higgsfield-AI/', image: '' },
    { name: 'katahikmah', title: 'Kata Hikmah Video Generator', category: 'AI & Prompt', language: 'JavaScript', description: 'Penjana video daripada kata-kata hikmah untuk konten motivasi dan social media.', repo: 'https://github.com/cikgukb/katahikmah', demo: 'https://katahikmah.vercel.app', image: 'assets/portfolio/katahikmah.png' },
    { name: 'menunasikandar', title: 'Menu Nasi Kandar', category: 'Website & Client', language: 'CSS', description: 'Menu digital dan laman promosi untuk bisnes makanan atau restoran lokal.', repo: 'https://github.com/cikgukb/menunasikandar', demo: 'https://cikgukb.github.io/menunasikandar/', image: '' },
    { name: 'foodexplorer', title: 'Food Explorer', category: 'Interactive Apps', language: 'JavaScript', description: 'App explorer makanan untuk browsing menu, lokasi atau idea makan secara interaktif.', repo: 'https://github.com/cikgukb/foodexplorer', demo: 'https://cikgukb.github.io/foodexplorer/', image: '' },
    { name: 'kbbeyondcreative.my', title: 'KB Beyond Creative', category: 'Website & Client', language: 'HTML', description: 'Website brand dan portfolio untuk identiti kreatif KB Beyond Creative.', repo: 'https://github.com/cikgukb/kbbeyondcreative.my', demo: 'https://kbbeyondcreative.my', image: '' },
    { name: 'projectcrm', title: 'Project CRM', category: 'Operations', language: 'Prototype', description: 'Eksperimen sistem CRM untuk pengurusan lead, pelanggan dan operasi follow-up.', repo: 'https://github.com/cikgukb/projectcrm', demo: '', image: '' },
    { name: 'hqclearningcentre', title: 'HQC Learning Centre', category: 'Website & Client', language: 'JavaScript', description: 'Website atau deployment project untuk learning centre dan program pendidikan.', repo: 'https://github.com/cikgukb/hqclearningcentre', demo: 'https://cikgukb.github.io/hqclearningcentre/', image: '' },
    { name: 'almarji', title: 'Al Marji', category: 'Operations', language: 'TypeScript', description: 'Digital reference app yang dibina dan dideploy untuk akses maklumat berstruktur.', repo: 'https://github.com/cikgukb/almarji', demo: 'https://almarji.vercel.app', image: 'assets/portfolio/almarji.png' },
    { name: 'remotion', title: 'Remotion Video Lab', category: 'AI & Prompt', language: 'TypeScript', description: 'Eksperimen video programmatic menggunakan Remotion untuk motion, caption dan render automation.', repo: 'https://github.com/cikgukb/remotion', demo: '', image: 'assets/videos/paris_travel.png' },
    { name: 'akademiurut', title: 'Akademi Urut', category: 'Website & Client', language: 'HTML', description: 'Website akademi urut untuk penerangan program, servis dan pendaftaran prospek.', repo: 'https://github.com/cikgukb/akademiurut', demo: 'https://cikgukb.github.io/akademiurut/', image: '' },
    { name: 'sistem-kad-kahwin-cikgukb', title: 'Sistem Kad Kahwin', category: 'Interactive Apps', language: 'JavaScript', description: 'Sistem tempahan kad kahwin premium dengan localStorage dan flow tempahan ringkas.', repo: 'https://github.com/cikgukb/sistem-kad-kahwin-cikgukb', demo: 'https://cikgukb.github.io/sistem-kad-kahwin-cikgukb/', image: '' },
    { name: 'ukurtanahmalaysia', title: 'Ukur Tanah Malaysia', category: 'Website & Client', language: 'JavaScript', description: 'Website atau tool untuk servis ukur tanah Malaysia dan penerangan perkhidmatan.', repo: 'https://github.com/cikgukb/ukurtanahmalaysia', demo: 'https://cikgukb.github.io/ukurtanahmalaysia/', image: 'assets/portfolio/ukurtanahmalaysia.png' },
    { name: 'tukanggunting', title: 'Tukang Gunting', category: 'Website & Client', language: 'JavaScript', description: 'Website servis barber atau grooming dengan fokus tempahan dan promosi lokal.', repo: 'https://github.com/cikgukb/tukanggunting', demo: 'https://cikgukb.github.io/tukanggunting/', image: '' },
    { name: 'Optometri', title: 'Optometri Website', category: 'Website & Client', language: 'CSS', description: 'Front-end website untuk servis optometri, klinik mata atau promosi pemeriksaan penglihatan.', repo: 'https://github.com/cikgukb/Optometri', demo: 'https://cikgukb.github.io/Optometri/', image: '' },
    { name: 'bopindo', title: 'Bopindo Website', category: 'Website & Client', language: 'HTML', description: 'Website front-end untuk brand atau projek Bopindo.', repo: 'https://github.com/cikgukb/bopindo', demo: 'https://cikgukb.github.io/bopindo/', image: '' },
    { name: 'serundinghajiwan', title: 'Serunding Haji Wan', category: 'Website & Client', language: 'HTML', description: 'Landing page produk makanan premium untuk Serunding Haji Wan.', repo: 'https://github.com/cikgukb/serundinghajiwan', demo: 'https://cikgukb.github.io/serundinghajiwan/', image: 'assets/portfolio/serundinghajiwan.png' },
    { name: 'qwen', title: 'Qwen AI Experiment', category: 'AI & Prompt', language: 'Prototype', description: 'Repo eksperimen berkaitan Qwen dan workflow AI.', repo: 'https://github.com/cikgukb/qwen', demo: '', image: '' },
    { name: 'gamelokaliti', title: 'Game Lokaliti', category: 'Games & Simulators', language: 'TypeScript', description: 'Game strategy tentang cara menguasai kawasan lokaliti dan membuat keputusan taktikal.', repo: 'https://github.com/cikgukb/gamelokaliti', demo: 'https://cikgukb.github.io/gamelokaliti/', image: '' },
    { name: 'spinwin', title: 'Spin & Win', category: 'Games & Simulators', language: 'CSS', description: 'Laman web permainan spin and win untuk kempen promo, lead capture atau engagement.', repo: 'https://github.com/cikgukb/spinwin', demo: 'https://cikgukb.github.io/spinwin/', image: 'assets/portfolio/spinwin.png' },
    { name: 'mlm', title: 'MLM Prototype', category: 'Operations', language: 'CSS', description: 'Front-end eksperimen untuk struktur bisnes, jaringan atau pembentangan model pemasaran.', repo: 'https://github.com/cikgukb/mlm', demo: 'https://cikgukb.github.io/mlm/', image: '' },
    { name: 'veo3promptbuilder', title: 'Veo 3 Prompt Builder', category: 'AI & Prompt', language: 'HTML', description: 'App untuk bantu bina prompt Veo 3 dengan struktur yang lebih jelas dan mudah digunakan.', repo: 'https://github.com/cikgukb/veo3promptbuilder', demo: 'https://cikgukb.github.io/veo3promptbuilder/', image: 'assets/portfolio/veo3promptbuilder.png' }
];

const categoryOrder = [
    'Semua',
    'AI & Prompt',
    'Marketing & Sales',
    'Automation',
    'Operations',
    'Website & Client',
    'Interactive Apps',
    'Games & Simulators'
];

const translations = {
    ms: {
        'nav.home': 'Utama',
        'nav.about': 'Profil',
        'nav.expertise': 'Kepakaran',
        'nav.experience': 'Pengalaman',
        'nav.book': 'Buku',
        'nav.video': 'Video',
        'nav.catalog': 'Katalog Projek',
        'nav.contact': 'Hubungi',
        'hero.title': 'Hai, saya <span class="highlight">Kamarul Bahareen</span>',
        'hero.text': 'Trainer Marketing Consultant, Marketing & Visual Specialist, penulis buku dan pembina sistem digital untuk usahawan. Saya gabungkan latihan, strategi pemasaran, multimedia dan AI tools untuk bantu SME bergerak lebih laju.',
        'hero.cta': 'Hubungi Saya',
        'hero.resume': 'Muat Turun Resume',
        'stats.experience': 'Tahun Pengalaman',
        'stats.builds': 'Projek GitHub',
        'stats.videos': 'Hasil Video',
        'about.kicker': 'Butiran Profil',
        'about.title': 'Tentang Saya',
        'about.p1': 'Saya ialah <strong>Kamarul Bahareen Bin Kamarudin</strong>, Trainer Marketing Consultant di <strong>KB Beyond Creative Sdn Bhd</strong>. Kerja saya berpusat pada latihan pemasaran digital, multimedia, content creation, AI marketing dan pembangunan sistem ringkas yang membantu usahawan bertindak dengan lebih jelas.',
        'about.p2': 'Latar belakang saya bermula daripada bidang teknikal dan sistem, kemudian berkembang kepada sales, digital marketing, fotografi, videografi, WordPress design dan penggunaan AI seperti ChatGPT, Midjourney dan GenAI untuk pemasaran moden.',
        'about.current': '<strong>Kini:</strong> Trainer Marketing Consultant, KB Beyond Creative Sdn Bhd',
        'about.certified': '<strong>Diiktiraf:</strong> HRD Corp Accredited Certified Trainer #7703',
        'about.education': '<strong>Pendidikan:</strong> Diploma in Computer Science, Universiti Teknologi Malaysia',
        'about.resume': 'Lihat Resume',
        'about.work': 'Lihat Hasil Kerja',
        'expertise.kicker': 'Keupayaan',
        'expertise.title': 'Kepakaran Saya',
        'expertise.subtitle': 'Menggabungkan kemahiran teknikal, pengalaman latihan dan pelaksanaan kreatif.',
        'expertise.digital.title': 'Pemasaran Digital',
        'expertise.digital.p': 'Facebook, Google Ads, pemasaran TikTok, SEO dan perancangan kempen berasaskan data.',
        'expertise.ai.title': 'Generative AI',
        'expertise.ai.p': 'ChatGPT, Midjourney, GenAI, AI copywriting, sistem prompt dan automasi pemasaran.',
        'expertise.training.title': 'Latihan',
        'expertise.training.p': 'Latihan bertauliah HRD Corp untuk AI marketing, branding, bisnes digital dan pertumbuhan SME.',
        'expertise.visual.title': 'Fotografi & Video',
        'expertise.visual.p': 'Fotografi produk, video content marketing, live streaming dan pengarahan kreatif.',
        'expertise.web.title': 'Web & Tools',
        'expertise.web.p': 'Rekaan WordPress, tools HTML/CSS/JS, landing page dan sistem bisnes ringan.',
        'expertise.packaging.title': 'Packaging & Persediaan Eksport',
        'expertise.packaging.p': 'Pembungkusan inovatif, penjenamaan kreatif, perlabelan logistik dan persediaan eksport.',
        'experience.kicker': 'Perjalanan Kerjaya',
        'experience.title': 'Pengalaman Profesional',
        'experience.subtitle': 'Lebih dua dekad merentasi teknologi, kepimpinan jualan, pemasaran dan latihan.',
        'experience.current.p': 'Menyampaikan latihan praktikal dan konsultasi dalam pemasaran digital, kandungan multimedia, AI marketing dan pendigitalan bisnes untuk usahawan.',
        'experience.agency.p': 'Memimpin aktiviti jualan, pembangunan agensi dan prestasi pasukan.',
        'experience.backup.p': 'Mengurus operasi backup, recovery dan teknologi simpanan data.',
        'experience.system.p': 'Mengendalikan infrastruktur IT, sokongan sistem dan pelaksanaan teknikal.',
        'experience.technical.p': 'Memulakan kerjaya profesional dalam pelaksanaan teknikal dan sokongan pembuatan.',
        'book.kicker': 'Buku Terbitan',
        'book.text': 'Buku fizikal untuk usahawan yang mahu menggunakan ChatGPT sebagai pembantu bisnes harian. Kandungannya membantu pembaca membina prompt untuk BMC, proposal perniagaan, copywriting dan tugasan pemasaran lain.',
        'book.point1': 'Panduan prompt untuk kegunaan perniagaan',
        'book.point2': 'Contoh arahan untuk BMC, proposal dan copywriting',
        'book.point3': 'QR code video kelas ChatGPT untuk pengalaman lebih mendalam',
        'book.point4': 'Sentuh penggunaan AI untuk lagu, imej, video dan konten kreatif',
        'book.priceLabel': 'Info laman produk',
        'book.priceNote': 'Harga promosi daripada RM49, tertakluk kepada perubahan di laman penjual.',
        'book.cta': 'Tempah Buku',
        'videos.kicker': 'Hasil Video',
        'videos.title': 'Koleksi Video',
        'videos.subtitle': 'Hasil suntingan, pengarahan dan eksperimen video kreatif.',
        'videos.watch': 'Tonton di Facebook',
        'catalog.kicker': 'Karya Digital',
        'catalog.title': 'Koleksi Tools & Sistem',
        'catalog.subtitle': 'hasil kerja cikgukb',
        'catalog.search': 'Cari projek, kategori atau bahasa',
        'cta.kicker': 'Jom Bina',
        'cta.title': 'Sedia untuk kembangkan bisnes anda?',
        'cta.text': 'Mari gabungkan latihan, kreativiti, teknologi dan strategi untuk gerakkan bisnes anda ke depan.',
        'cta.button': 'Hubungi Saya',
        'footer.bio': 'Trainer Marketing Consultant dan Marketing & Visual Specialist dari Malaysia.',
        'footer.contact': 'Maklumat Hubungan',
        'footer.quick': 'Pautan Pantas',
        'footer.copy': '&copy; 2026 Kamarul Bahareen. Hak cipta terpelihara.'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.expertise': 'Expertise',
        'nav.experience': 'Experience',
        'nav.book': 'Book',
        'nav.video': 'Videos',
        'nav.catalog': 'Project Catalog',
        'nav.contact': 'Contact',
        'hero.title': 'Hi, I\'m <span class="highlight">Kamarul Bahareen</span>',
        'hero.text': 'Trainer Marketing Consultant, Marketing & Visual Specialist, author and digital systems builder for entrepreneurs. I combine training, marketing strategy, multimedia and AI tools to help SMEs move faster.',
        'hero.cta': 'Let\'s Talk',
        'hero.resume': 'Download Resume',
        'stats.experience': 'Years Experience',
        'stats.builds': 'GitHub Builds',
        'stats.videos': 'Video Works',
        'about.kicker': 'Profile Details',
        'about.title': 'About Me',
        'about.p1': 'I am <strong>Kamarul Bahareen Bin Kamarudin</strong>, Trainer Marketing Consultant at <strong>KB Beyond Creative Sdn Bhd</strong>. My work focuses on digital marketing training, multimedia, content creation, AI marketing and simple systems that help entrepreneurs act with clarity.',
        'about.p2': 'My background began in technical systems, then expanded into sales, digital marketing, photography, videography, WordPress design and modern AI tools such as ChatGPT, Midjourney and GenAI for marketing.',
        'about.current': '<strong>Current:</strong> Trainer Marketing Consultant, KB Beyond Creative Sdn Bhd',
        'about.certified': '<strong>Certified:</strong> HRD Corp Accredited Certified Trainer #7703',
        'about.education': '<strong>Education:</strong> Diploma in Computer Science, Universiti Teknologi Malaysia',
        'about.resume': 'View Resume',
        'about.work': 'View Work',
        'expertise.kicker': 'Capabilities',
        'expertise.title': 'My Expertise',
        'expertise.subtitle': 'Combining technical skill, training experience and creative execution.',
        'expertise.digital.title': 'Digital Marketing',
        'expertise.digital.p': 'Facebook, Google Ads, TikTok marketing, SEO and data-driven campaign planning.',
        'expertise.ai.title': 'Generative AI',
        'expertise.ai.p': 'ChatGPT, Midjourney, GenAI, AI copywriting, prompt systems and marketing automation.',
        'expertise.training.title': 'Training',
        'expertise.training.p': 'HRD Corp accredited training for AI marketing, branding, digital business and SME growth.',
        'expertise.visual.title': 'Photography & Video',
        'expertise.visual.p': 'Product photography, video content marketing, live streaming and creative direction.',
        'expertise.web.title': 'Web & Tools',
        'expertise.web.p': 'WordPress design, HTML/CSS/JS tools, landing pages and lightweight business systems.',
        'expertise.packaging.title': 'Packaging & Export Prep',
        'expertise.packaging.p': 'Innovative packaging, creative branding, logistics labelling and export preparation.',
        'experience.kicker': 'Career Journey',
        'experience.title': 'Professional Experience',
        'experience.subtitle': 'Over two decades across technology, sales leadership, marketing and training.',
        'experience.current.p': 'Delivering practical training and consulting in digital marketing, multimedia content, AI marketing and business digitalization for entrepreneurs.',
        'experience.agency.p': 'Led sales activity, agency development and team performance.',
        'experience.backup.p': 'Managed backup, recovery and data storage technology operations.',
        'experience.system.p': 'Handled IT infrastructure, system support and technical implementation.',
        'experience.technical.p': 'Started professional career in technical execution and manufacturing support.',
        'book.kicker': 'Published Book',
        'book.text': 'A physical book for entrepreneurs who want to use ChatGPT as a daily business assistant. It helps readers build prompts for BMC, business proposals, copywriting and other marketing tasks.',
        'book.point1': 'Prompt guide for business use',
        'book.point2': 'Example instructions for BMC, proposals and copywriting',
        'book.point3': 'QR code video classes for deeper ChatGPT learning',
        'book.point4': 'Covers AI use for songs, images, videos and creative content',
        'book.priceLabel': 'Product page info',
        'book.priceNote': 'Promotional price from RM49 to RM30, subject to seller page changes.',
        'book.cta': 'Order Book',
        'videos.kicker': 'Video Works',
        'videos.title': 'Video Collection',
        'videos.subtitle': 'Editing, direction and creative video experiments.',
        'videos.watch': 'Watch on Facebook',
        'catalog.kicker': 'Digital Work',
        'catalog.title': 'Tools & Systems Collection',
        'catalog.subtitle': 'cikgukb work archive',
        'catalog.search': 'Search project, category or language',
        'cta.kicker': 'Let\'s Build',
        'cta.title': 'Ready to scale your business?',
        'cta.text': 'Let\'s combine training, creativity, technology and strategy to move your business forward.',
        'cta.button': 'Get In Touch',
        'footer.bio': 'Trainer Marketing Consultant and Marketing & Visual Specialist based in Malaysia.',
        'footer.contact': 'Contact Info',
        'footer.quick': 'Quick Links',
        'footer.copy': '&copy; 2026 Kamarul Bahareen. All rights reserved.'
    }
};

const categoryLabels = {
    ms: {
        'Semua': 'Semua',
        'AI & Prompt': 'AI & Prompt',
        'Marketing & Sales': 'Marketing & Sales',
        'Automation': 'Automation',
        'Operations': 'Operations',
        'Website & Client': 'Website & Client',
        'Interactive Apps': 'Interactive Apps',
        'Games & Simulators': 'Games & Simulators'
    },
    en: {
        'Semua': 'All',
        'AI & Prompt': 'AI & Prompt',
        'Marketing & Sales': 'Marketing & Sales',
        'Automation': 'Automation',
        'Operations': 'Operations',
        'Website & Client': 'Websites & Clients',
        'Interactive Apps': 'Interactive Apps',
        'Games & Simulators': 'Games & Simulators'
    }
};

let activeCategory = 'Semua';
let searchTerm = '';
let currentLang = getSavedLanguage();

function getSavedLanguage() {
    try {
        return localStorage.getItem('siteLang') === 'en' ? 'en' : 'ms';
    } catch (error) {
        return 'ms';
    }
}

function saveLanguage(lang) {
    try {
        localStorage.setItem('siteLang', lang);
    } catch (error) {
        // The language toggle still works when storage is unavailable on file:// pages.
    }
}

function t(key) {
    return translations[currentLang]?.[key] || translations.ms[key] || key;
}

function projectInitial(title) {
    return title
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
}

function categoryLabel(category) {
    return categoryLabels[currentLang]?.[category] || category;
}

function applyLanguage(lang) {
    currentLang = lang === 'en' ? 'en' : 'ms';
    saveLanguage(currentLang);
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        element.innerHTML = t(element.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        element.setAttribute('placeholder', t(element.dataset.i18nPlaceholder));
    });

    document.querySelectorAll('.lang-btn').forEach(button => {
        button.classList.toggle('active', button.dataset.lang === currentLang);
        button.setAttribute('aria-pressed', String(button.dataset.lang === currentLang));
    });

    renderCategoryFilters();
    renderProjects();
}

function initLanguageToggle() {
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            applyLanguage(button.dataset.lang);
        });
    });
}

function matchesProject(project) {
    const inCategory = activeCategory === 'Semua' || project.category === activeCategory;
    const haystack = `${project.title} ${project.name} ${project.category} ${project.language} ${project.description}`.toLowerCase();
    return inCategory && haystack.includes(searchTerm);
}

function renderCategoryFilters() {
    const filterRoot = document.getElementById('categoryFilters');
    if (!filterRoot) return;

    filterRoot.innerHTML = categoryOrder.map(category => {
        const isActive = category === activeCategory ? ' active' : '';
        return `<button class="filter-btn${isActive}" type="button" data-category="${category}">${categoryLabel(category)}</button>`;
    }).join('');

    filterRoot.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            activeCategory = button.dataset.category;
            renderCategoryFilters();
            renderProjects();
        });
    });
}

function renderProjects() {
    const grid = document.getElementById('catalogGrid');
    const resultCount = document.getElementById('resultCount');
    if (!grid || !resultCount) return;

    const visibleProjects = projects.filter(matchesProject);
    resultCount.textContent = currentLang === 'en'
        ? `${visibleProjects.length} projects shown`
        : `${visibleProjects.length} projek dipaparkan`;

    grid.innerHTML = visibleProjects.map(project => {
        const visual = project.image
            ? `<img src="${project.image}" alt="Preview ${project.title}">`
            : `<span class="project-initial">${projectInitial(project.title)}</span>`;
        const demoLink = project.demo
            ? `<a href="${project.demo}" target="_blank" rel="noopener" class="demo-link"><i class="fa-solid fa-arrow-up-right-from-square"></i> ${currentLang === 'en' ? 'Live Demo' : 'Demo'}</a>`
            : '';

        return `
            <article class="project-card" data-category="${project.category}">
                <div class="project-visual">
                    ${visual}
                    <span class="project-status">${project.demo ? 'Live' : 'Repo'}</span>
                </div>
                <div class="project-body">
                    <div class="project-kicker">
                        <span class="tag">${categoryLabel(project.category)}</span>
                        <span class="tag">${project.language}</span>
                    </div>
                    <h3>
                        <a href="${project.demo || project.repo}" target="_blank" rel="noopener" class="project-title-link">
                            ${project.title}
                        </a>
                    </h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        ${demoLink}
                        <a href="${project.repo}" target="_blank" rel="noopener" class="github-link"><i class="fa-brands fa-github"></i> GitHub</a>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function initSearch() {
    const searchInput = document.getElementById('projectSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', event => {
        searchTerm = event.target.value.trim().toLowerCase();
        renderProjects();
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        document.body.classList.toggle('menu-open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

function initActiveLinks() {
    const sections = [...document.querySelectorAll('header[id], section[id], footer[id]')];
    const links = [...document.querySelectorAll('.nav-links a')];
    if (!sections.length || !links.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initActiveLinks();
    initLanguageToggle();
    initSearch();
    applyLanguage(currentLang);
});
