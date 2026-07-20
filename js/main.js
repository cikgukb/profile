/* ============================================================
   INTERAKSI — cikgukb.my
   Bergantung pada: js/i18n.js (I18N), js/projects-data.js
   (FEATURED_PROJECTS, ARCHIVE_PROJECTS, ARCHIVE_CATEGORIES)
   ============================================================ */

(function () {
    'use strict';

    /* ---------- keadaan ---------- */
    let lang = getSavedLang();
    let activeCat = 'all';
    let searchTerm = '';
    const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function getSavedLang() {
        try {
            const saved = localStorage.getItem('siteLang');
            return saved === 'en' ? 'en' : 'ms';
        } catch (e) { return 'ms'; }
    }

    function t(key) {
        return (I18N[lang] && I18N[lang][key]) || I18N.ms[key] || key;
    }

    function loc(field) {
        if (field == null) return '';
        return typeof field === 'object' ? (field[lang] || field.ms || '') : field;
    }

    const esc = s => String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));

    /* ---------- bahasa ---------- */
    function applyLanguage(next) {
        lang = next === 'en' ? 'en' : 'ms';
        try { localStorage.setItem('siteLang', lang); } catch (e) { /* file:// */ }
        document.documentElement.lang = lang;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.innerHTML = t(el.dataset.i18n);
        });
        document.querySelectorAll('[data-i18n-ph]').forEach(el => {
            el.setAttribute('placeholder', t(el.dataset.i18nPh));
        });
        const meta = document.querySelector('meta[name="description"]');
        if (meta) meta.setAttribute('content', t('meta.description'));

        document.querySelectorAll('.lang-btn').forEach(btn => {
            const on = btn.dataset.lang === lang;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', String(on));
        });

        renderFeatured();
        renderFilters();
        renderArchive();
        renderEventsFilter();
        renderEvents();
        renderBlogFilter();
        renderBlog();
    }

    /* ---------- ikon SVG ---------- */
    const ICON_EXT = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    /* ---------- projek pilihan ---------- */
    function statusLabel(status) {
        return t('proj.status.' + status);
    }

    function renderFeatured() {
        const grid = document.getElementById('featuredGrid');
        if (!grid) return;

        grid.innerHTML = FEATURED_PROJECTS.map((p, i) => {
            const visual = p.image
                ? '<img src="' + esc(p.image) + '" width="880" height="550" loading="lazy" alt="' + esc(loc(p.imageAlt)) + '">'
                : '<div class="feat-cover" role="img" aria-label="' + esc(loc(p.imageAlt)) + '">' +
                  '<span class="cover-name">' + esc(p.name.split('—')[0].trim()) + '</span>' +
                  '<span class="cover-sub">' + esc(loc(p.category)) + '</span></div>';

            const demo = p.demo
                ? '<a href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + t('proj.demo') + ' ' + ICON_EXT + '</a>'
                : '';

            return '<article class="feat-card reveal in">' +
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

    /* ---------- modal kajian kes ---------- */
    const modal = document.getElementById('caseModal');
    const caseBody = document.getElementById('caseBody');
    let lastFocus = null;

    function caseSection(title, html) {
        return '<div class="case-section"><h4>' + esc(title) + '</h4>' + html + '</div>';
    }

    function openCase(index) {
        const p = FEATURED_PROJECTS[index];
        if (!p || !modal) return;
        const cs = p.caseStudy;

        const demo = p.demo
            ? '<a class="btn btn-solid" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + t('proj.demo') + '</a>'
            : '';

        caseBody.innerHTML =
            '<span class="case-kicker mono">' + esc(loc(p.category)) + ' · ' + esc(statusLabel(p.status)) + '</span>' +
            '<h3 id="caseTitle">' + esc(p.name) + '</h3>' +
            '<p class="case-tagline">' + esc(loc(p.tagline)) + '</p>' +
            caseSection(t('case.problem'), '<p>' + esc(loc(cs.problem)) + '</p>') +
            caseSection(t('case.audience'), '<p>' + esc(loc(cs.audience)) + '</p>') +
            caseSection(t('case.solution'), '<p>' + esc(loc(cs.solution)) + '</p>') +
            caseSection(t('case.features'), '<ul>' + loc(cs.features).map(f => '<li>' + esc(f) + '</li>').join('') + '</ul>') +
            caseSection(t('case.tech'), '<div class="tech-row">' + p.tech.map(x => '<span class="tech-tag">' + esc(x) + '</span>').join('') + '</div>') +
            caseSection(t('case.value'), '<p>' + esc(loc(cs.value)) + '</p>') +
            caseSection(t('case.status'), '<p>' + esc(loc(cs.statusNote)) + '</p>') +
            '<div class="case-links">' + demo +
            '<a class="text-link" href="#hubungi" data-close-goto>' + t('case.cta') + '</a></div>';

        lastFocus = document.activeElement;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        modal.querySelector('.case-close').focus();

        caseBody.querySelectorAll('[data-close-goto]').forEach(a => {
            a.addEventListener('click', () => closeCase());
        });
    }

    function closeCase() {
        if (!modal || modal.hidden) return;
        modal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocus) lastFocus.focus();
    }

    if (modal) {
        modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeCase));
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeCase();
            if (e.key === 'Tab' && !modal.hidden) {
                const focusables = modal.querySelectorAll('button, a[href], input, select, textarea');
                const first = focusables[0], last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
                else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
            }
        });
    }

    /* ---------- arkib ---------- */
    function renderFilters() {
        const root = document.getElementById('archiveFilters');
        if (!root) return;
        root.innerHTML = ARCHIVE_CATEGORIES.map(c =>
            '<button type="button" class="filter-btn' + (c.id === activeCat ? ' active' : '') +
            '" data-cat="' + esc(c.id) + '">' + esc(loc(c.label)) + '</button>'
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
        if (!grid || !count) return;

        const visible = ARCHIVE_PROJECTS.filter(p => {
            const inCat = activeCat === 'all' || p.cat === activeCat;
            const hay = (p.name + ' ' + p.tech + ' ' + loc(p.desc)).toLowerCase();
            return inCat && hay.includes(searchTerm);
        });

        count.textContent = visible.length + ' ' + t('proj.count');

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
        form.addEventListener('submit', e => {
            e.preventDefault();
            const data = new FormData(form);
            const nama = (data.get('nama') || '').toString().trim();
            const org = (data.get('organisasi') || '').toString().trim();
            const jenis = (data.get('jenis') || 'training').toString();
            const mesej = (data.get('mesej') || '').toString().trim();
            const via = (data.get('via') || 'whatsapp').toString();

            if (!nama) { form.querySelector('[name="nama"]').focus(); return; }

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
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            document.body.classList.toggle('menu-open', open);
            hamburger.setAttribute('aria-expanded', String(open));
            hamburger.setAttribute('aria-label', open ? t('nav.close') : t('nav.open'));
        });
        navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }));
    }

    /* ---------- seksyen aktif dalam nav ---------- */
    const sections = document.querySelectorAll('header[id], section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');
    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navAnchors.forEach(a => a.classList.toggle('active',
                    a.getAttribute('href') === '#' + entry.target.id));
            });
        }, { rootMargin: '-40% 0px -55% 0px' });
        sections.forEach(s => spy.observe(s));
    }

    /* ---------- kalendar & acara ---------- */
    let eventFilter = 'all';

    function renderEventsFilter() {
        const row = document.getElementById('eventFilters');
        if (!row) return;

        const filters = [
            { id: 'all', labelKey: 'cal.filter.all' },
            { id: 'upcoming', labelKey: 'cal.filter.upcoming' },
            { id: 'completed', labelKey: 'cal.filter.completed' }
        ];

        row.innerHTML = filters.map(f => {
            const active = eventFilter === f.id ? ' active' : '';
            return '<button type="button" class="chip' + active + '" data-event-cat="' + f.id + '">' + t(f.labelKey) + '</button>';
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
        if (!grid || typeof EVENTS_DATA === 'undefined') return;

        const filtered = EVENTS_DATA.filter(ev => {
            if (eventFilter === 'upcoming') return ev.status === 'open' || ev.status === 'upcoming';
            if (eventFilter === 'completed') return ev.status === 'completed';
            return true;
        });

        grid.innerHTML = filtered.map((ev) => {
            const statusTagClass = 'is-' + ev.status;
            const statusLabelText = t('cal.status.' + ev.status);
            const highlightsList = loc(ev.highlights) && Array.isArray(loc(ev.highlights))
                ? loc(ev.highlights).slice(0, 3).map(h => '<li>' + esc(h) + '</li>').join('')
                : '';

            return '<article class="event-card reveal in" itemscope itemtype="https://schema.org/Event">' +
                '<meta itemprop="startDate" content="' + esc(ev.date) + '">' +
                '<meta itemprop="endDate" content="' + esc(ev.endDate || ev.date) + '">' +
                '<div class="event-top">' +
                '<span class="event-date-badge"><time datetime="' + esc(ev.date) + '">' + esc(loc(ev.displayDate)) + '</time></span>' +
                '<span class="event-status-tag ' + statusTagClass + '">' + esc(statusLabelText) + '</span>' +
                '</div>' +
                '<h3 class="event-title" itemprop="name">' + esc(loc(ev.title)) + '</h3>' +
                '<div class="event-meta-list">' +
                '<div class="event-meta-item"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> <span>' + esc(ev.time) + '</span></div>' +
                '<div class="event-meta-item" itemprop="location" itemscope itemtype="https://schema.org/Place"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> <span itemprop="name">' + esc(loc(ev.location)) + '</span></div>' +
                '</div>' +
                '<p class="event-summary" itemprop="description">' + esc(loc(ev.summary)) + '</p>' +
                (highlightsList ? '<ul class="event-highlights-list">' + highlightsList + '</ul>' : '') +
                '<div class="event-actions">' +
                '<button type="button" class="btn btn-line btn-sm" data-event-detail="' + ev.id + '">' + t('cal.info') + '</button>' +
                (ev.registrationUrl ? '<a class="btn btn-solid btn-sm" href="' + esc(ev.registrationUrl) + '" target="_blank" rel="noopener">' + t('cal.register') + ' ' + ICON_EXT + '</a>' : '') +
                '</div>' +
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
        const body = document.getElementById('caseBody');
        const modal = document.getElementById('caseModal');
        if (!body || !modal) return;

        const highlightsArr = loc(ev.highlights);
        const highlightsHtml = Array.isArray(highlightsArr) ? highlightsArr.map(h => '<li>' + esc(h) + '</li>').join('') : '';

        body.innerHTML = '<span class="case-kicker mono">' + esc(ev.type.toUpperCase()) + ' · ' + esc(loc(ev.displayDate)) + '</span>' +
            '<h2 id="caseTitle" class="case-title">' + esc(loc(ev.title)) + '</h2>' +
            caseSection(t('cal.time'), '<p>' + esc(ev.time) + '</p>') +
            caseSection(t('cal.venue'), '<p>' + esc(loc(ev.venue)) + '</p>') +
            caseSection(t('cal.audience'), '<p>' + esc(loc(ev.targetAudience)) + '</p>') +
            (highlightsHtml ? caseSection(t('cal.highlights'), '<ul>' + highlightsHtml + '</ul>') : '') +
            (ev.registrationUrl ? '<div class="case-links"><a class="btn btn-solid" href="' + esc(ev.registrationUrl) + '" target="_blank" rel="noopener">' + t('cal.register') + ' ' + ICON_EXT + '</a></div>' : '');

        modal.hidden = false;
        document.body.classList.add('menu-open');
    }

    /* ---------- blog & artikel ---------- */
    let blogCategory = 'all';

    function renderBlogFilter() {
        const row = document.getElementById('blogFilters');
        if (!row) return;

        const cats = [
            { id: 'all', labelKey: 'blog.filter.all' },
            { id: 'ai', labelKey: 'blog.filter.ai' },
            { id: 'marketing', labelKey: 'blog.filter.marketing' },
            { id: 'automation', labelKey: 'blog.filter.automation' },
            { id: 'strategy', labelKey: 'blog.filter.strategy' }
        ];

        row.innerHTML = cats.map(c => {
            const active = blogCategory === c.id ? ' active' : '';
            return '<button type="button" class="chip' + active + '" data-blog-cat="' + c.id + '">' + t(c.labelKey) + '</button>';
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
        if (!grid || typeof BLOG_DATA === 'undefined') return;

        const filtered = BLOG_DATA.filter(b => blogCategory === 'all' || b.category === blogCategory);

        grid.innerHTML = filtered.map(b => {
            const coverHtml = b.coverImage
                ? '<div class="blog-cover"><img src="' + esc(b.coverImage) + '" width="600" height="300" loading="lazy" alt="' + esc(loc(b.title)) + '"></div>'
                : '<div class="blog-cover"><div class="blog-cover-placeholder"><span class="blog-icon">📝</span><span class="mono">' + esc(b.category.toUpperCase()) + '</span></div></div>';

            return '<article class="blog-card reveal in" itemscope itemtype="https://schema.org/BlogPosting">' +
                coverHtml +
                '<div class="blog-body">' +
                '<div class="blog-meta-top">' +
                '<span class="blog-cat-tag">' + esc(b.category.toUpperCase()) + '</span>' +
                '<span class="blog-read-time">' + esc(loc(b.readTime)) + '</span>' +
                '</div>' +
                '<h3 class="blog-title" itemprop="headline">' + esc(loc(b.title)) + '</h3>' +
                '<p class="blog-excerpt" itemprop="description">' + esc(loc(b.excerpt)) + '</p>' +
                '<div class="blog-footer">' +
                '<span class="mono" style="font-size:0.75rem; color:var(--ink-3);"><time itemprop="datePublished" datetime="' + esc(b.date) + '">' + esc(b.date) + '</time></span>' +
                '<button type="button" class="blog-read-btn" data-read-blog="' + b.id + '">' + t('blog.readMore') + '</button>' +
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

    function openBlogModal(post) {
        const body = document.getElementById('caseBody');
        const modal = document.getElementById('caseModal');
        if (!body || !modal) return;

        const shareUrl = encodeURIComponent('https://cikgukb.my/#' + post.slug);
        const shareText = encodeURIComponent(loc(post.title));

        body.innerHTML = '<div class="blog-article-content">' +
            '<div class="blog-article-header">' +
            '<span class="blog-cat-tag">' + esc(post.category.toUpperCase()) + '</span>' +
            '<h2 id="caseTitle">' + esc(loc(post.title)) + '</h2>' +
            '<div class="blog-article-meta">' +
            '<span>' + t('blog.by') + ' <strong>' + esc(post.author) + '</strong></span> · ' +
            '<span><time datetime="' + esc(post.date) + '">' + esc(post.date) + '</time></span> · ' +
            '<span>' + esc(loc(post.readTime)) + '</span>' +
            '</div></div>' +
            '<div class="blog-article-body">' + loc(post.content) + '</div>' +
            '<div style="margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">' +
            '<a class="btn btn-solid btn-sm" href="https://api.whatsapp.com/send?text=' + shareText + '%20' + shareUrl + '" target="_blank" rel="noopener">📲 ' + t('blog.share') + ' WhatsApp</a>' +
            '<div style="display:flex; gap:0.5rem; flex-wrap:wrap;">' + (post.tags || []).map(t => '<span class="tech-tag">' + esc(t) + '</span>').join('') + '</div>' +
            '</div></div>';

        modal.hidden = false;
        document.body.classList.add('menu-open');
    }

    /* ---------- dynamic JSON-LD injection for SEO & AI ---------- */
    function injectDynamicJsonLd() {
        if (typeof EVENTS_DATA !== 'undefined' && Array.isArray(EVENTS_DATA)) {
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

        if (typeof BLOG_DATA !== 'undefined' && Array.isArray(BLOG_DATA)) {
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
                "mainEntityOfPage": "https://cikgukb.my/#" + b.slug
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
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
        items.forEach(el => io.observe(el));
    }

    /* ---------- kiraan naik statistik ---------- */
    function initCounters() {
        const nums = document.querySelectorAll('.cred-num[data-count]');
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
                    el.textContent = Math.round(target * eased) + suffix;
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

    applyLanguage(lang);
    initReveals();
    initCounters();
    injectDynamicJsonLd();
})();
