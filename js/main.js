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
    }

    /* ---------- ikon SVG ---------- */
    const ICON_EXT = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    const ICON_GH = '<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.1-4.7-5a4 4 0 0 1 1-2.8 3.7 3.7 0 0 1 .1-2.7s.9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.3.2 2.4.1 2.7a4 4 0 0 1 1 2.8c0 3.9-2.4 4.7-4.7 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z"/></svg>';

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
                '<a href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + t('proj.repo') + ' ' + ICON_GH + '</a>' +
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
            '<a class="btn btn-line" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + t('proj.repo') + '</a>' +
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
                '<div class="arch-links">' + demo +
                '<a href="' + esc(p.repo) + '" target="_blank" rel="noopener">GitHub ' + ICON_GH + '</a>' +
                '</div></div></article>';
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
})();
