/* ============================================================
   INTERAKSI — cikgukb.my
   Dikongsi oleh index.html, projek.html, profil.html, blog.html.
   Bergantung pada: js/i18n.js (I18N). Data lain adalah pilihan —
   setiap fungsi render menyemak dahulu sama ada elemen & datanya wujud:
     js/projects-data.js      FEATURED_PROJECTS, ARCHIVE_PROJECTS, ARCHIVE_CATEGORIES
     js/events-data.js        EVENTS_DATA
     js/blog-data.js          BLOG_DATA
     js/testimonials-data.js  TESTIMONIALS
   ============================================================ */

(function () {
    'use strict';

    /* ---------- keadaan ---------- */
    let lang = getSavedLang();
    let activeCat = getInitialCat();
    let searchTerm = '';
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const PAGE = document.body.dataset.page || 'home';

    const HAS = {
        projects: typeof FEATURED_PROJECTS !== 'undefined' && typeof ARCHIVE_PROJECTS !== 'undefined',
        events: typeof EVENTS_DATA !== 'undefined' && Array.isArray(EVENTS_DATA),
        blog: typeof BLOG_DATA !== 'undefined' && Array.isArray(BLOG_DATA),
        testimonials: typeof TESTIMONIALS !== 'undefined' && Array.isArray(TESTIMONIALS) && TESTIMONIALS.length > 0
    };

    const MONTHS = {
        ms: ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogo', 'Sep', 'Okt', 'Nov', 'Dis'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    function getSavedLang() {
        try {
            const saved = localStorage.getItem('siteLang');
            return saved === 'en' ? 'en' : 'ms';
        } catch (e) { return 'ms'; }
    }

    function getInitialCat() {
        try {
            const cat = new URLSearchParams(window.location.search).get('cat');
            if (cat && typeof ARCHIVE_CATEGORIES !== 'undefined' && ARCHIVE_CATEGORIES.some(c => c.id === cat)) return cat;
        } catch (e) { /* URL tidak disokong */ }
        return 'all';
    }

    function t(key) {
        return (I18N[lang] && I18N[lang][key]) || I18N.ms[key] || key;
    }

    function loc(field) {
        if (field == null) return '';
        return typeof field === 'object' && !Array.isArray(field) ? (field[lang] || field.ms || '') : field;
    }

    const esc = s => String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    // '2026-10-01' → { day: '1', month: 'Okt', year: '2026' } tanpa anjakan zon masa
    function dateParts(iso) {
        const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || '');
        if (!m) return null;
        return { day: String(Number(m[3])), month: MONTHS[lang][Number(m[2]) - 1], year: m[1] };
    }

    function formatDate(iso) {
        const d = dateParts(iso);
        return d ? d.day + ' ' + d.month + ' ' + d.year : (iso || '');
    }

    /* ---------- bahasa ---------- */
    function applyLanguage(next) {
        lang = next === 'en' ? 'en' : 'ms';
        try { localStorage.setItem('siteLang', lang); } catch (e) { /* file:// */ }
        document.documentElement.lang = lang;

        const archiveTotal = HAS.projects ? String(ARCHIVE_PROJECTS.length) : '';
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = t(el.dataset.i18n).replace('{n}', archiveTotal);
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            el.setAttribute('placeholder', t(el.dataset.i18nPh));
        });
        document.querySelectorAll('[data-i18n-label]').forEach(el => {
            el.setAttribute('aria-label', t(el.dataset.i18nLabel));
        });

        // setiap halaman ada meta & tajuk sendiri (kunci: meta.description.<page>, meta.title.<page>)
        const metaKey = 'meta.description.' + PAGE;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', I18N.ms[metaKey] ? t(metaKey) : t('meta.description'));
        const titleKey = 'meta.title.' + PAGE;
        if (I18N.ms[titleKey]) document.title = t(titleKey);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            const on = btn.dataset.lang === lang;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', String(on));
        });

        renderFeatured();
        renderFilters();
        renderArchive();
        renderArchiveTeaser();
        renderEventsFilter();
        renderEvents();
        renderBlogFilter();
        renderBlog();
        renderTestimonials();
    }

    /* ---------- ikon SVG ---------- */
    const ICON_EXT = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const ICON_CLOCK = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>';
    const ICON_PIN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>';

    /* ---------- modal (kajian kes, butiran acara, pembaca artikel) ---------- */
    const modal = document.getElementById('caseModal');
    const caseBody = document.getElementById('caseBody');
    let lastFocus = null;

    function openModal(html, variant) {
        if (!modal || !caseBody) return;
        caseBody.innerHTML = html;
        modal.classList.toggle('is-article', variant === 'article');
        lastFocus = document.activeElement;
        modal.hidden = false;
        document.body.classList.add('modal-open');
        const panel = modal.querySelector('.case-panel');
        if (panel) panel.scrollTop = 0;
        modal.querySelector('.case-close').focus();
        caseBody.querySelectorAll('[data-close-goto]').forEach(a => {
            a.addEventListener('click', () => closeModal());
        });
        updateDock();
    }

    function closeModal() {
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        document.body.classList.remove('modal-open');
        if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
        updateDock();
    }

    if (modal) {
        modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
        document.addEventListener('keydown', e => {
            if (modal.hidden) return;
            if (e.key === 'Escape') closeModal();
            if (e.key === 'Tab') {
                const focusables = modal.querySelectorAll('button, a[href], input, select, textarea');
                const first = focusables[0], last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
                else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
            }
        });
    }

    function caseSection(title, html) {
        return '<div class="case-section"><h4>' + esc(title) + '</h4>' + html + '</div>';
    }

    /* ---------- projek pilihan ---------- */
    function statusLabel(status) {
        return t('proj.status.' + status);
    }

    function renderFeatured() {
        const grid = document.getElementById('featuredGrid');
        if (!grid || !HAS.projects) return;

        grid.innerHTML = FEATURED_PROJECTS.map((p, i) => {
            const visual = p.image
                ? '<img src="' + esc(p.image) + '" width="880" height="550" loading="lazy" alt="' + esc(loc(p.imageAlt)) + '">'
                : '<div class="feat-cover" role="img" aria-label="' + esc(loc(p.imageAlt)) + '">' +
                  '<span class="cover-name">' + esc(p.name.split('—')[0].trim()) + '</span>' +
                  '<span class="cover-sub">' + esc(loc(p.category)) + '</span></div>';

            const demo = p.demo
                ? '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + t('proj.demo') + ' ' + ICON_EXT + '</a>'
                : '';

            return '<article class="feat-card">' +
                '<div class="feat-visual">' + visual +
                '<span class="feat-status is-' + esc(p.status) + '">' + esc(statusLabel(p.status)) + '</span></div>' +
                '<div class="feat-body">' +
                '<span class="feat-cat mono">' + esc(loc(p.category)) + '</span>' +
                '<h3>' + esc(p.name) + '</h3>' +
                '<p>' + esc(loc(p.tagline)) + '</p>' +
                '<div class="tech-row">' + p.tech.map(x => '<span class="tech-tag">' + esc(x) + '</span>').join('') + '</div>' +
                '<div class="feat-links">' +
                '<button type="button" class="case-btn" data-case="' + i + '">' + t('proj.case') + '</button>' +
                demo +
                '</div></div></article>';
        }).join('');

        grid.querySelectorAll('[data-case]').forEach(btn => {
            btn.addEventListener('click', () => openCase(Number(btn.dataset.case)));
        });
    }

    function openCase(index) {
        const p = FEATURED_PROJECTS[index];
        if (!p) return;
        const cs = p.caseStudy;

        const demo = p.demo
            ? '<a class="btn btn-solid" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + t('proj.demo') + ' ' + ICON_EXT + '</a>'
            : '';
        const contactHref = document.getElementById('hubungi') ? '#hubungi' : 'index.html#hubungi';

        openModal(
            '<span class="case-kicker mono">' + esc(loc(p.category)) + ' · ' + esc(statusLabel(p.status)) + '</span>' +
            '<h3 id="caseTitle">' + esc(p.name) + '</h3>' +
            '<p class="case-tagline">' + esc(loc(p.tagline)) + '</p>' +
            caseSection(t('case.problem'), '<p>' + esc(loc(cs.problem)) + '</p>') +
            caseSection(t('case.audience'), '<p>' + esc(loc(cs.audience)) + '</p>') +
            caseSection(t('case.solution'), '<p>' + esc(loc(cs.solution)) + '</p>') +
            caseSection(t('case.features'), '<ul>' + (cs.features[lang] || cs.features.ms).map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>') +
            caseSection(t('case.tech'), '<div class="tech-row">' + p.tech.map(x => '<span class="tech-tag">' + esc(x) + '</span>').join('') + '</div>') +
            caseSection(t('case.value'), '<p>' + esc(loc(cs.value)) + '</p>') +
            caseSection(t('case.status'), '<p>' + esc(loc(cs.statusNote)) + '</p>') +
            '<div class="case-links">' + demo +
            '<a class="text-link" href="' + contactHref + '" data-close-goto>' + t('case.cta') + '</a></div>'
        );
    }

    /* ---------- arkib projek (projek.html) ---------- */
    function renderFilters() {
        const root = document.getElementById('archiveFilters');
        if (!root || !HAS.projects) return;
        root.innerHTML = ARCHIVE_CATEGORIES.map(c =>
            '<button type="button" class="filter-btn' + (c.id === activeCat ? ' active' : '') +
            '" data-cat="' + esc(c.id) + '" aria-pressed="' + (c.id === activeCat) + '">' + esc(loc(c.label)) + '</button>'
        ).join('');
        root.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeCat = btn.dataset.cat;
                renderFilters();
                renderArchive();
            });
        });
    }

    function renderArchive() {
        const grid = document.getElementById('archiveGrid');
        const count = document.getElementById('archiveCount');
        if (!grid || !count || !HAS.projects) return;

        const visible = ARCHIVE_PROJECTS.filter(p => {
            const inCat = activeCat === 'all' || p.cat === activeCat;
            const hay = (p.name + ' ' + p.tech + ' ' + loc(p.desc)).toLowerCase();
            return inCat && hay.includes(searchTerm);
        });

        count.textContent = visible.length + ' ' + t('proj.count');

        if (!visible.length) {
            grid.innerHTML = '<p class="empty-note">' + t('proj.empty') + '</p>';
            return;
        }

        const catLabel = id => {
            const c = ARCHIVE_CATEGORIES.find(x => x.id === id);
            return c ? loc(c.label) : id;
        };

        grid.innerHTML = visible.map(p => {
            const initials = p.name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
            const visual = p.image
                ? '<img src="' + esc(p.image) + '" width="880" height="550" loading="lazy" alt="' + esc(p.name) + '">'
                : '<div class="arch-initial" aria-hidden="true">' + esc(initials) + '</div>';
            const demo = p.demo
                ? '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + t('proj.demo') + ' ' + ICON_EXT + '</a>'
                : '';
            return '<article class="arch-card">' +
                '<div class="arch-visual">' + visual + '</div>' +
                '<div class="arch-body">' +
                '<div class="arch-meta"><span class="tech-tag">' + esc(catLabel(p.cat)) + '</span>' +
                '<span class="tech-tag">' + esc(p.tech) + '</span></div>' +
                '<h4>' + esc(p.name) + '</h4>' +
                '<p>' + esc(loc(p.desc)) + '</p>' +
                (demo ? '<div class="arch-links">' + demo + '</div>' : '') +
                '</div></article>';
        }).join('');
    }

    const searchInput = document.getElementById('archiveSearch');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchTerm = e.target.value.trim().toLowerCase();
            renderArchive();
        });
    }

    // halaman utama: hanya pautan kategori + kiraan, arkib penuh di projek.html
    function renderArchiveTeaser() {
        const root = document.getElementById('archiveCats');
        if (!root || !HAS.projects) return;
        root.innerHTML = ARCHIVE_CATEGORIES.filter(c => c.id !== 'all').map(c => {
            const n = ARCHIVE_PROJECTS.filter(p => p.cat === c.id).length;
            if (!n) return '';
            return '<a class="chip" href="projek.html?cat=' + encodeURIComponent(c.id) + '#arkib">' +
                esc(loc(c.label)) + '<span class="chip-count">' + n + '</span></a>';
        }).join('');
    }

    /* ---------- borang pertanyaan ---------- */
    const TYPE_LABELS = {
        training: { ms: 'Latihan / Bengkel', en: 'Training / Workshop' },
        consulting: { ms: 'Konsultasi Strategi', en: 'Strategy Consulting' },
        system: { ms: 'Sistem / Aplikasi Digital', en: 'Digital System / Application' },
        collab: { ms: 'Kerjasama Strategik', en: 'Strategic Collaboration' },
        speaking: { ms: 'Jemputan Penceramah', en: 'Speaking Invitation' }
    };

    const form = document.getElementById('enquiryForm');
    if (form) {
        const nameInput = form.querySelector('[name="nama"]');
        const nameError = document.getElementById('namaError');

        const setNameError = on => {
            if (!nameInput) return;
            nameInput.setAttribute('aria-invalid', String(on));
            if (nameError) nameError.textContent = on ? t('contact.nameError') : '';
        };
        if (nameInput) nameInput.addEventListener('input', () => setNameError(false));

        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(form);
            const nama = (data.get('nama') || '').toString().trim();
            const org = (data.get('organisasi') || '').toString().trim();
            const jenis = (data.get('jenis') || 'training').toString();
            const mesej = (data.get('mesej') || '').toString().trim();
            const via = (data.get('via') || 'whatsapp').toString();

            if (!nama) { setNameError(true); nameInput.focus(); return; }

            const jenisLabel = loc(TYPE_LABELS[jenis] || TYPE_LABELS.training);
            const lines = lang === 'en'
                ? ['Hello Cikgu KB,', '', 'Name: ' + nama]
                : ['Salam Cikgu KB,', '', 'Nama: ' + nama];
            if (org) lines.push((lang === 'en' ? 'Organisation: ' : 'Organisasi: ') + org);
            lines.push((lang === 'en' ? 'Enquiry: ' : 'Keperluan: ') + jenisLabel);
            if (mesej) lines.push('', mesej);
            const text = lines.join('\n').trim();

            if (via === 'email') {
                const subject = (lang === 'en' ? 'Enquiry: ' : 'Pertanyaan: ') + jenisLabel + ' — ' + nama;
                window.location.href = 'mailto:kbcimb@gmail.com?subject=' +
                    encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
            } else {
                window.open('https://wa.me/60133815817?text=' + encodeURIComponent(text), '_blank', 'noopener');
            }
        });
    }

    // pra-pilih jenis apabila CTA tertentu diklik (cth. Minta Proposal Latihan)
    document.querySelectorAll('[data-enquiry]').forEach(el => {
        el.addEventListener('click', () => {
            const select = document.getElementById('enquiryType');
            if (select) select.value = el.dataset.enquiry;
        });
    });

    /* ---------- menu mudah alih ---------- */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('navLinks');

    function setMenu(open) {
        if (!hamburger || !navLinks) return;
        navLinks.classList.toggle('open', open);
        document.body.classList.toggle('menu-open', open);
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.setAttribute('aria-label', open ? t('nav.close') : t('nav.open'));
        updateDock();
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && navLinks.classList.contains('open')) { setMenu(false); hamburger.focus(); }
        });
    }

    /* ---------- nav: bayang semasa skrol + seksyen aktif ---------- */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('header[id], section[id]');
    // hanya pautan dalam-halaman (#id) dijejak; pautan halaman lain kekal dengan kelas aktif statik
    const spyAnchors = Array.from(document.querySelectorAll('.nav-links a')).filter(a => (a.getAttribute('href') || '').charAt(0) === '#');
    if ('IntersectionObserver' in window && sections.length && spyAnchors.length) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const id = entry.target.dataset.nav || entry.target.id;
                spyAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(s => spy.observe(s));
    }

    /* ---------- dok tindakan (mudah alih) ---------- */
    const dock = document.getElementById('ctaDock');
    let contactInView = false;

    function updateDock() {
        if (!dock) return;
        const blocked = contactInView || document.body.classList.contains('menu-open') || document.body.classList.contains('modal-open');
        dock.classList.toggle('show', window.scrollY > 520 && !blocked);
    }

    function onScroll() {
        if (navbar) navbar.classList.toggle('is-scrolled', window.scrollY > 12);
        updateDock();
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    if (dock) {
        document.body.classList.add('has-dock');
        const contact = document.getElementById('hubungi');
        if (contact && 'IntersectionObserver' in window) {
            new IntersectionObserver(entries => {
                contactInView = entries[0].isIntersecting;
                updateDock();
            }, { threshold: 0.15 }).observe(contact);
        }
    }

    /* ---------- kalendar & acara ---------- */
    let eventFilter = 'all';

    // acara yang tarikhnya sudah lepas dikira "selesai" walaupun data belum dikemas kini
    function eventStatus(ev) {
        if (ev.status === 'completed') return 'completed';
        const end = new Date((ev.endDate || ev.date) + 'T23:59:59');
        return !isNaN(end) && end < new Date() ? 'completed' : ev.status;
    }

    function sortedEvents() {
        const live = [], done = [];
        EVENTS_DATA.forEach(ev => (eventStatus(ev) === 'completed' ? done : live).push(ev));
        live.sort((a, b) => a.date.localeCompare(b.date));
        done.sort((a, b) => b.date.localeCompare(a.date));
        return { live, done };
    }

    function renderEventsFilter() {
        const row = document.getElementById('eventFilters');
        if (!row || !HAS.events) return;

        const filters = [
            { id: 'all', labelKey: 'cal.filter.all' },
            { id: 'upcoming', labelKey: 'cal.filter.upcoming' },
            { id: 'completed', labelKey: 'cal.filter.completed' }
        ];

        row.innerHTML = filters.map(f => {
            const on = eventFilter === f.id;
            return '<button type="button" class="chip' + (on ? ' active' : '') + '" data-event-cat="' + f.id + '" aria-pressed="' + on + '">' + t(f.labelKey) + '</button>';
        }).join('');

        row.querySelectorAll('[data-event-cat]').forEach(btn => {
            btn.addEventListener('click', () => {
                eventFilter = btn.dataset.eventCat;
                renderEventsFilter();
                renderEvents();
            });
        });
    }

    function renderEvents() {
        const grid = document.getElementById('eventsGrid');
        if (!grid || !HAS.events) return;

        const { live, done } = sortedEvents();
        const list = eventFilter === 'upcoming' ? live : eventFilter === 'completed' ? done : live.concat(done);

        // tiada program terbuka → jemput tempahan sesi dalaman, jangan biar kosong
        const note = document.getElementById('eventsEmpty');
        if (note) note.hidden = live.length > 0;

        if (!list.length) {
            grid.innerHTML = '<p class="empty-note">' + t('cal.none') + '</p>';
            return;
        }

        grid.innerHTML = list.map(ev => {
            const status = eventStatus(ev);
            const d = dateParts(ev.date);
            return '<article class="event-row is-' + status + '" itemscope itemtype="https://schema.org/Event">' +
                '<meta itemprop="startDate" content="' + esc(ev.date) + '">' +
                '<meta itemprop="endDate" content="' + esc(ev.endDate || ev.date) + '">' +
                '<time class="event-when" datetime="' + esc(ev.date) + '">' +
                '<span class="event-day">' + (d ? d.day : '') + '</span>' +
                '<span class="event-month mono">' + (d ? d.month + ' ' + d.year : '') + '</span></time>' +
                '<div class="event-main">' +
                '<h3 class="event-title" itemprop="name">' + esc(loc(ev.title)) + '</h3>' +
                '<div class="event-meta-list">' +
                '<span class="event-meta-item">' + ICON_CLOCK + ' ' + esc(loc(ev.displayDate)) + '</span>' +
                '<span class="event-meta-item" itemprop="location" itemscope itemtype="https://schema.org/Place">' + ICON_PIN + ' <span itemprop="name">' + esc(loc(ev.location)) + '</span></span>' +
                '</div></div>' +
                '<div class="event-side">' +
                '<span class="event-status-tag is-' + status + '">' + esc(t('cal.status.' + status)) + '</span>' +
                '<div class="event-actions">' +
                '<button type="button" class="btn btn-line btn-sm" data-event-detail="' + esc(ev.id) + '">' + t('cal.info') + '</button>' +
                (ev.registrationUrl && status !== 'completed' ? '<a class="btn btn-solid btn-sm" href="' + esc(ev.registrationUrl) + '" target="_blank" rel="noopener">' + t('cal.register') + ' ' + ICON_EXT + '</a>' : '') +
                '</div></div>' +
                '</article>';
        }).join('');

        grid.querySelectorAll('[data-event-detail]').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = EVENTS_DATA.find(x => x.id === btn.dataset.eventDetail);
                if (item) openEventModal(item);
            });
        });
    }

    function openEventModal(ev) {
        const status = eventStatus(ev);
        const highlightsArr = ev.highlights ? (ev.highlights[lang] || ev.highlights.ms || ev.highlights) : null;
        const highlightsHtml = Array.isArray(highlightsArr) ? highlightsArr.map(h => '<li>' + esc(h) + '</li>').join('') : '';

        openModal(
            '<span class="case-kicker mono">' + esc(String(ev.type || '').toUpperCase()) + ' · ' + esc(t('cal.status.' + status)) + '</span>' +
            '<h2 id="caseTitle" class="case-title">' + esc(loc(ev.title)) + '</h2>' +
            '<p class="case-tagline">' + esc(loc(ev.summary)) + '</p>' +
            caseSection(t('cal.time'), '<p>' + esc(loc(ev.displayDate)) + ' · ' + esc(ev.time) + '</p>') +
            caseSection(t('cal.venue'), '<p>' + esc(loc(ev.venue)) + '</p>') +
            caseSection(t('cal.audience'), '<p>' + esc(loc(ev.targetAudience)) + '</p>') +
            (highlightsHtml ? caseSection(t('cal.highlights'), '<ul>' + highlightsHtml + '</ul>') : '') +
            (ev.registrationUrl && status !== 'completed'
                ? '<div class="case-links"><a class="btn btn-solid" href="' + esc(ev.registrationUrl) + '" target="_blank" rel="noopener">' + t('cal.register') + ' ' + ICON_EXT + '</a></div>'
                : '')
        );
    }

    /* ---------- blog & artikel ---------- */
    let blogCategory = 'all';
    let blogSearchTerm = '';

    function renderBlogFilter() {
        const row = document.getElementById('blogFilters');
        if (!row || !HAS.blog) return;

        const cats = [
            { id: 'all', labelKey: 'blog.filter.all' },
            { id: 'ai', labelKey: 'blog.filter.ai' },
            { id: 'marketing', labelKey: 'blog.filter.marketing' },
            { id: 'automation', labelKey: 'blog.filter.automation' },
            { id: 'strategy', labelKey: 'blog.filter.strategy' }
        ];

        row.innerHTML = cats.map(c => {
            const on = blogCategory === c.id;
            return '<button type="button" class="chip' + (on ? ' active' : '') + '" data-blog-cat="' + c.id + '" aria-pressed="' + on + '">' + t(c.labelKey) + '</button>';
        }).join('');

        row.querySelectorAll('[data-blog-cat]').forEach(btn => {
            btn.addEventListener('click', () => {
                blogCategory = btn.dataset.blogCat;
                renderBlogFilter();
                renderBlog();
            });
        });
    }

    function renderBlog() {
        const grid = document.getElementById('blogGrid');
        if (!grid || !HAS.blog) return;

        const term = blogSearchTerm.trim().toLowerCase();
        let filtered = BLOG_DATA.filter(b => {
            const matchCat = blogCategory === 'all' || b.category === blogCategory;
            const titleStr = loc(b.title).toLowerCase();
            const excStr = loc(b.excerpt).toLowerCase();
            const tagStr = (b.tags || []).join(' ').toLowerCase();
            const matchSearch = !term || titleStr.includes(term) || excStr.includes(term) || tagStr.includes(term);
            return matchCat && matchSearch;
        });

        // halaman utama memaparkan beberapa artikel terbaru sahaja (data-limit)
        const limit = Number(grid.dataset.limit) || 0;
        if (limit) filtered = filtered.slice(0, limit);

        if (filtered.length === 0) {
            grid.innerHTML = '<p class="empty-note">' + t('blog.empty') + '</p>';
            return;
        }

        grid.innerHTML = filtered.map(b => {
            const catLabel = t('blog.filter.' + b.category) === 'blog.filter.' + b.category ? b.category : t('blog.filter.' + b.category);
            const coverHtml = b.coverImage
                ? '<div class="blog-cover"><img src="' + esc(b.coverImage) + '" width="600" height="300" loading="lazy" alt=""></div>'
                : '<div class="blog-cover"><div class="blog-cover-placeholder" aria-hidden="true"><span class="cover-mark">' + esc(loc(b.title).charAt(0)) + '</span><span class="mono">' + esc(catLabel) + '</span></div></div>';

            return '<article class="blog-card" itemscope itemtype="https://schema.org/BlogPosting">' +
                coverHtml +
                '<div class="blog-body">' +
                '<div class="blog-meta-top">' +
                '<span class="blog-cat-tag">' + esc(catLabel) + '</span>' +
                '<span class="blog-read-time">' + esc(loc(b.readTime)) + '</span>' +
                '</div>' +
                '<h3 class="blog-title" itemprop="headline">' + esc(loc(b.title)) + '</h3>' +
                '<p class="blog-excerpt" itemprop="description">' + esc(loc(b.excerpt)) + '</p>' +
                '<div class="blog-footer">' +
                '<time class="blog-date" itemprop="datePublished" datetime="' + esc(b.date) + '">' + esc(formatDate(b.date)) + '</time>' +
                '<button type="button" class="blog-read-btn" data-read-blog="' + esc(b.id) + '">' + t('blog.readMore') + ' ' + ICON_EXT + '</button>' +
                '</div></div>' +
                '</article>';
        }).join('');

        grid.querySelectorAll('[data-read-blog]').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = BLOG_DATA.find(x => x.id === btn.dataset.readBlog);
                if (item) openBlogModal(item);
            });
        });
    }

    const blogSearchInput = document.getElementById('blogSearch');
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', e => {
            blogSearchTerm = e.target.value;
            renderBlog();
        });
    }

    function openBlogModal(post) {
        const shareUrl = encodeURIComponent('https://cikgukb.my/blog.html#' + post.slug);
        const shareText = encodeURIComponent(loc(post.title));
        const catLabel = t('blog.filter.' + post.category) === 'blog.filter.' + post.category ? post.category : t('blog.filter.' + post.category);

        openModal(
            '<div class="blog-article-content">' +
            '<div class="blog-article-header">' +
            '<span class="blog-cat-tag">' + esc(catLabel) + '</span>' +
            '<h2 id="caseTitle">' + esc(loc(post.title)) + '</h2>' +
            '<div class="blog-article-meta">' +
            '<span>' + t('blog.by') + ' <strong>' + esc(post.author) + '</strong></span>' +
            '<span><time datetime="' + esc(post.date) + '">' + esc(formatDate(post.date)) + '</time></span>' +
            '<span>' + esc(loc(post.readTime)) + '</span>' +
            '</div></div>' +
            '<div class="blog-article-body">' + loc(post.content) + '</div>' +
            '<div class="blog-article-footer">' +
            '<a class="btn btn-wa btn-sm" href="https://api.whatsapp.com/send?text=' + shareText + '%20' + shareUrl + '" target="_blank" rel="noopener">' + t('blog.share') + '</a>' +
            '<div class="tech-row">' + (post.tags || []).map(tag => '<span class="tech-tag">' + esc(tag) + '</span>').join('') + '</div>' +
            '</div></div>',
            'article'
        );
    }

    // pautan kongsi (…#slug-artikel) membuka terus artikel berkenaan
    function openArticleFromHash() {
        if (!HAS.blog || !window.location.hash) return;
        const slug = decodeURIComponent(window.location.hash.slice(1));
        const post = BLOG_DATA.find(b => b.slug === slug);
        if (post) openBlogModal(post);
    }

    /* ---------- testimoni (hanya dipapar jika ada data sah) ---------- */
    function renderTestimonials() {
        const section = document.getElementById('testimoni');
        const wall = document.getElementById('testimonialWall');
        if (!section || !wall) return;
        if (!HAS.testimonials) { section.hidden = true; return; }

        section.hidden = false;
        wall.innerHTML = TESTIMONIALS.map(q =>
            '<figure class="quote-card">' +
            '<blockquote>“' + esc(loc(q.quote)) + '”</blockquote>' +
            '<figcaption class="quote-who"><strong>' + esc(q.name) + '</strong>' +
            '<span>' + esc([loc(q.role), q.org].filter(Boolean).join(' · ')) + '</span></figcaption>' +
            '</figure>'
        ).join('');
    }

    /* ---------- JSON-LD dinamik untuk SEO & AI ---------- */
    function injectDynamicJsonLd() {
        if (HAS.events && document.getElementById('eventsGrid')) {
            const eventSchemas = EVENTS_DATA.map(ev => ({
                "@context": "https://schema.org",
                "@type": "EducationEvent",
                "name": loc(ev.title),
                "startDate": ev.date,
                "endDate": ev.endDate || ev.date,
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": (ev.venue && ev.venue.ms && (ev.venue.ms.toLowerCase().includes('talian') || ev.venue.ms.toLowerCase().includes('hybrid'))) ? "https://schema.org/MixedEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode",
                "location": {
                    "@type": "Place",
                    "name": loc(ev.venue),
                    "address": loc(ev.location)
                },
                "organizer": {
                    "@type": "Organization",
                    "name": ev.organizer,
                    "url": "https://cikgukb.my/"
                },
                "performer": {
                    "@type": "Person",
                    "name": "Kamarul Bahareen (Cikgu KB)",
                    "url": "https://cikgukb.my/"
                },
                "description": loc(ev.summary)
            }));

            const eventScript = document.createElement('script');
            eventScript.type = 'application/ld+json';
            eventScript.text = JSON.stringify(eventSchemas);
            document.head.appendChild(eventScript);
        }

        if (HAS.blog && document.getElementById('blogGrid')) {
            const blogSchemas = BLOG_DATA.map(b => ({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": loc(b.title),
                "description": loc(b.excerpt),
                "datePublished": b.date,
                "author": {
                    "@type": "Person",
                    "name": b.author,
                    "url": "https://cikgukb.my/"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "KB Beyond Creative Sdn Bhd",
                    "url": "https://cikgukb.my/"
                },
                "mainEntityOfPage": "https://cikgukb.my/blog.html#" + b.slug
            }));

            const blogScript = document.createElement('script');
            blogScript.type = 'application/ld+json';
            blogScript.text = JSON.stringify(blogSchemas);
            document.head.appendChild(blogScript);
        }
    }

    /* ---------- reveal semasa skrol ---------- */
    function initReveals() {
        const items = document.querySelectorAll('.reveal:not(.in)');
        if (REDUCED || !('IntersectionObserver' in window)) {
            items.forEach(el => el.classList.add('in'));
            return;
        }
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
        items.forEach(el => io.observe(el));
    }

    /* ---------- kiraan naik statistik ---------- */
    function initCounters() {
        const nums = document.querySelectorAll('[data-count]');
        if (REDUCED || !('IntersectionObserver' in window)) return;
        const io = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                io.unobserve(el);
                const target = Number(el.dataset.count);
                const suffix = el.dataset.suffix || '';
                const start = performance.now();
                const dur = 1200;
                const tick = now => {
                    const p = Math.min((now - start) / dur, 1);
                    const eased = 1 - Math.pow(1 - p, 3);
                    el.textContent = Math.round(target * eased).toLocaleString('en-US') + suffix;
                    if (p < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
        }, { threshold: 0.6 });
        nums.forEach(el => io.observe(el));
    }

    /* ---------- mula ---------- */
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    document.querySelectorAll('[data-print]').forEach(btn => {
        btn.addEventListener('click', () => window.print());
    });

    applyLanguage(lang);
    initReveals();
    initCounters();
    injectDynamicJsonLd();
    onScroll();
    openArticleFromHash();
    window.addEventListener('hashchange', openArticleFromHash);
})();
