const projects = [
    { name: 'serviceiklan', title: 'Service Iklan Landing Page', category: 'Website & Client', language: 'HTML', description: 'Landing page servis iklan dan content marketing untuk tawaran bisnes kecil.', repo: 'https://github.com/cikgukb/serviceiklan', demo: '', image: '' },
    { name: 'wabot-wakaf-sedekah', title: 'WA Bot Wakaf Sedekah', category: 'Automation', language: 'Python', description: 'Automation WhatsApp untuk kempen wakaf, sedekah dan follow-up komuniti.', repo: 'https://github.com/cikgukb/wabot-wakaf-sedekah', demo: '', image: '' },
    { name: 'tasbih99', title: 'Tasbih 99', category: 'Interactive Apps', language: 'HTML', description: 'Aplikasi tasbih digital untuk zikir, kiraan harian dan target amalan.', repo: 'https://github.com/cikgukb/tasbih99', demo: '', image: '' },
    { name: 'mierayoga', title: 'Miera Yoga Appointment Website', category: 'Website & Client', language: 'CSS', description: 'Premium bilingual yoga appointment website untuk Master Mira di Bandar Kinrara.', repo: 'https://github.com/cikgukb/mierayoga', demo: '', image: '' },
    { name: 'cashflowgame', title: 'Cashflow Usahawan', category: 'Games & Simulators', language: 'TypeScript', description: 'Game simulasi cashflow SME Malaysia dengan keputusan marketing, KPI, risiko dan leverage cards.', repo: 'https://github.com/cikgukb/cashflowgame', demo: 'https://cashflowgame-one.vercel.app', image: '' },
    { name: '-mybha-mymfh-audit', title: 'MYBHA MYMFH Audit', category: 'Operations', language: 'TypeScript', description: 'Sistem audit halal budget-friendly untuk hotel dan operasi hospitaliti.', repo: 'https://github.com/cikgukb/-mybha-mymfh-audit', demo: 'https://mybha-mymfh-audit.vercel.app', image: '' },
    { name: 'guerillamarketingkit', title: 'Guerrilla Marketing Command Kit', category: 'Marketing & Sales', language: 'HTML', description: 'Planner taktikal mobile-first untuk usahawan mikro dan kecil Malaysia.', repo: 'https://github.com/cikgukb/guerillamarketingkit', demo: '', image: '' },
    { name: 'tiktoklivescript', title: 'TikTok Live Script', category: 'Marketing & Sales', language: 'JavaScript', description: 'Tool penyusunan skrip TikTok Live untuk host, seller dan campaign jualan.', repo: 'https://github.com/cikgukb/tiktoklivescript', demo: '', image: 'assets/portfolio/tiktoklivescript.png' },
    { name: 'jimengtool', title: 'Jimeng Tool', category: 'AI & Prompt', language: 'JavaScript', description: 'Tool kreatif untuk workflow prompt, visual idea dan eksperimen AI generatif.', repo: 'https://github.com/cikgukb/jimengtool', demo: 'https://jimengtool.vercel.app', image: 'assets/videos/ai_animation.png' },
    { name: 'kitjimatcermat', title: 'Kit Jimat Cermat', category: 'Operations', language: 'JavaScript', description: 'Kit digital untuk bantu pengguna merancang bajet, jimat cermat dan keputusan belanja.', repo: 'https://github.com/cikgukb/kitjimatcermat', demo: 'https://kitjimatcermat.vercel.app', image: '' },
    { name: 'ai-sales-kit', title: 'AI Sales Kit', category: 'AI & Prompt', language: 'TypeScript', description: 'AI Sales Kit untuk SME menjana bahan marketing dan jualan yang lebih meyakinkan.', repo: 'https://github.com/cikgukb/ai-sales-kit', demo: 'https://ai-sales-kit-eight.vercel.app', image: 'assets/videos/marketing_strategy.png' },
    { name: 'vizuail-marketing-strategist', title: 'VizuAIl Marketing Strategist', category: 'AI & Prompt', language: 'JavaScript', description: 'AI product photography prompt generator dengan 13 visual angles dan formula 5T.', repo: 'https://github.com/cikgukb/vizuail-marketing-strategist', demo: '', image: '' },
    { name: 'katalog-funnel-hacker', title: 'Katalog Funnel Hacker', category: 'Marketing & Sales', language: 'JavaScript', description: 'Sistem interaktif katalog strategi pemasaran funnel hacker untuk usahawan.', repo: 'https://github.com/cikgukb/katalog-funnel-hacker', demo: '', image: '' },
    { name: 'Google-Ads-Takeoff', title: 'Google Ads Takeoff', category: 'Marketing & Sales', language: 'JavaScript', description: 'Google Ads copy generator web app untuk rangka iklan dan variasi copy campaign.', repo: 'https://github.com/cikgukb/Google-Ads-Takeoff', demo: '', image: '' },
    { name: 'sme-prompt-generator', title: 'SME Prompt Generator', category: 'AI & Prompt', language: 'JavaScript', description: 'Penjana prompt AI bilingual untuk usahawan SME menggunakan kerangka BROKE.', repo: 'https://github.com/cikgukb/sme-prompt-generator', demo: '', image: '' },
    { name: 'G0DM0D3', title: 'G0DM0D3 AI Chat', category: 'AI & Prompt', language: 'TypeScript', description: 'Eksperimen AI chat interface untuk eksplorasi pengalaman perbualan yang bebas dan pantas.', repo: 'https://github.com/cikgukb/G0DM0D3', demo: '', image: '' },
    { name: 'penjanagambaraya', title: 'Penjana Gambar Raya', category: 'AI & Prompt', language: 'HTML', description: 'Generator visual bertema raya untuk kempen kreatif, ucapan dan bahan social media.', repo: 'https://github.com/cikgukb/penjanagambaraya', demo: '', image: '' },
    { name: 'Open-Higgsfield-AI', title: 'Open Higgsfield AI', category: 'AI & Prompt', language: 'JavaScript', description: 'Open-source AI image generation and cinema studio with multiple model workflows.', repo: 'https://github.com/cikgukb/Open-Higgsfield-AI', demo: '', image: '' },
    { name: 'katahikmah', title: 'Kata Hikmah Video Generator', category: 'AI & Prompt', language: 'JavaScript', description: 'Penjana video daripada kata-kata hikmah untuk konten motivasi dan social media.', repo: 'https://github.com/cikgukb/katahikmah', demo: 'https://katahikmah.vercel.app', image: '' },
    { name: 'menunasikandar', title: 'Menu Nasi Kandar', category: 'Website & Client', language: 'CSS', description: 'Menu digital dan laman promosi untuk bisnes makanan atau restoran lokal.', repo: 'https://github.com/cikgukb/menunasikandar', demo: '', image: '' },
    { name: 'foodexplorer', title: 'Food Explorer', category: 'Interactive Apps', language: 'JavaScript', description: 'App explorer makanan untuk browsing menu, lokasi atau idea makan secara interaktif.', repo: 'https://github.com/cikgukb/foodexplorer', demo: '', image: '' },
    { name: 'kbbeyondcreative.my', title: 'KB Beyond Creative', category: 'Website & Client', language: 'HTML', description: 'Website brand dan portfolio untuk identiti kreatif KB Beyond Creative.', repo: 'https://github.com/cikgukb/kbbeyondcreative.my', demo: '', image: '' },
    { name: 'projectcrm', title: 'Project CRM', category: 'Operations', language: 'Prototype', description: 'Eksperimen sistem CRM untuk pengurusan lead, pelanggan dan operasi follow-up.', repo: 'https://github.com/cikgukb/projectcrm', demo: '', image: '' },
    { name: 'hqclearningcentre', title: 'HQC Learning Centre', category: 'Website & Client', language: 'JavaScript', description: 'Website atau deployment project untuk learning centre dan program pendidikan.', repo: 'https://github.com/cikgukb/hqclearningcentre', demo: '', image: '' },
    { name: 'almarji', title: 'Al Marji', category: 'Operations', language: 'TypeScript', description: 'Digital reference app yang dibina dan dideploy untuk akses maklumat berstruktur.', repo: 'https://github.com/cikgukb/almarji', demo: 'https://almarji.vercel.app', image: '' },
    { name: 'remotion', title: 'Remotion Video Lab', category: 'AI & Prompt', language: 'TypeScript', description: 'Eksperimen video programmatic menggunakan Remotion untuk motion, caption dan render automation.', repo: 'https://github.com/cikgukb/remotion', demo: '', image: 'assets/videos/paris_travel.png' },
    { name: 'akademiurut', title: 'Akademi Urut', category: 'Website & Client', language: 'HTML', description: 'Website akademi urut untuk penerangan program, servis dan pendaftaran prospek.', repo: 'https://github.com/cikgukb/akademiurut', demo: '', image: '' },
    { name: 'sistem-kad-kahwin-cikgukb', title: 'Sistem Kad Kahwin', category: 'Interactive Apps', language: 'JavaScript', description: 'Sistem tempahan kad kahwin premium dengan localStorage dan flow tempahan ringkas.', repo: 'https://github.com/cikgukb/sistem-kad-kahwin-cikgukb', demo: '', image: '' },
    { name: 'ukurtanahmalaysia', title: 'Ukur Tanah Malaysia', category: 'Website & Client', language: 'JavaScript', description: 'Website atau tool untuk servis ukur tanah Malaysia dan penerangan perkhidmatan.', repo: 'https://github.com/cikgukb/ukurtanahmalaysia', demo: '', image: 'assets/portfolio/ukurtanahmalaysia.png' },
    { name: 'tukanggunting', title: 'Tukang Gunting', category: 'Website & Client', language: 'JavaScript', description: 'Website servis barber atau grooming dengan fokus tempahan dan promosi lokal.', repo: 'https://github.com/cikgukb/tukanggunting', demo: '', image: '' },
    { name: 'Optometri', title: 'Optometri Website', category: 'Website & Client', language: 'CSS', description: 'Front-end website untuk servis optometri, klinik mata atau promosi pemeriksaan penglihatan.', repo: 'https://github.com/cikgukb/Optometri', demo: '', image: '' },
    { name: 'bopindo', title: 'Bopindo Website', category: 'Website & Client', language: 'HTML', description: 'Website front-end untuk brand atau projek Bopindo.', repo: 'https://github.com/cikgukb/bopindo', demo: '', image: '' },
    { name: 'serundinghajiwan', title: 'Serunding Haji Wan', category: 'Website & Client', language: 'HTML', description: 'Landing page produk makanan premium untuk Serunding Haji Wan.', repo: 'https://github.com/cikgukb/serundinghajiwan', demo: '', image: 'assets/portfolio/serundinghajiwan.png' },
    { name: 'qwen', title: 'Qwen AI Experiment', category: 'AI & Prompt', language: 'Prototype', description: 'Repo eksperimen berkaitan Qwen dan workflow AI.', repo: 'https://github.com/cikgukb/qwen', demo: '', image: '' },
    { name: 'gamelokaliti', title: 'Game Lokaliti', category: 'Games & Simulators', language: 'TypeScript', description: 'Game strategy tentang cara menguasai kawasan lokaliti dan membuat keputusan taktikal.', repo: 'https://github.com/cikgukb/gamelokaliti', demo: '', image: '' },
    { name: 'spinwin', title: 'Spin & Win', category: 'Games & Simulators', language: 'CSS', description: 'Laman web permainan spin and win untuk kempen promo, lead capture atau engagement.', repo: 'https://github.com/cikgukb/spinwin', demo: '', image: 'assets/portfolio/spinwin.png' },
    { name: 'mlm', title: 'MLM Prototype', category: 'Operations', language: 'CSS', description: 'Front-end eksperimen untuk struktur bisnes, jaringan atau pembentangan model pemasaran.', repo: 'https://github.com/cikgukb/mlm', demo: '', image: '' },
    { name: 'veo3promptbuilder', title: 'Veo 3 Prompt Builder', category: 'AI & Prompt', language: 'HTML', description: 'App untuk bantu bina prompt Veo 3 dengan struktur yang lebih jelas dan mudah digunakan.', repo: 'https://github.com/cikgukb/veo3promptbuilder', demo: '', image: 'assets/portfolio/veo3promptbuilder.png' }
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

let activeCategory = 'Semua';
let searchTerm = '';

function projectInitial(title) {
    return title
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map(word => word[0])
        .join('')
        .toUpperCase();
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
        return `<button class="filter-btn${isActive}" type="button" data-category="${category}">${category}</button>`;
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
    resultCount.textContent = `${visibleProjects.length} projek dipaparkan`;

    grid.innerHTML = visibleProjects.map(project => {
        const visual = project.image
            ? `<img src="${project.image}" alt="Preview ${project.title}">`
            : `<span class="project-initial">${projectInitial(project.title)}</span>`;
        const demoLink = project.demo
            ? `<a href="${project.demo}" target="_blank" rel="noopener"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Demo</a>`
            : '';

        return `
            <article class="project-card" data-category="${project.category}">
                <div class="project-visual">
                    ${visual}
                    <span class="project-status">${project.demo ? 'Live' : 'Repo'}</span>
                </div>
                <div class="project-body">
                    <div class="project-kicker">
                        <span class="tag">${project.category}</span>
                        <span class="tag">${project.language}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-links">
                        ${demoLink}
                        <a href="${project.repo}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> GitHub</a>
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
    renderCategoryFilters();
    initSearch();
    renderProjects();
});
