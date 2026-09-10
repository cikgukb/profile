(() => {
  'use strict';
  if (location.protocol === 'http:' && ['cikgukb.my', 'www.cikgukb.my', 'cikgukb.github.io'].includes(location.hostname)) {
    location.replace(`https://${location.host}${location.pathname}${location.search}${location.hash}`);
    return;
  }
  const topics = [
    ['marketing', 'Pemasaran digital'], ['setting', 'Belajar setting', 'Setting iklan digital'],
    ['video', 'Buat video AI'], ['image', 'Buat gambar AI'], ['funnel', 'Bina sistem dan funnel jualan']
  ];
  const levels = [['beginner', 'Baru bermula'], ['tried', 'Pernah cuba'], ['improving', 'Sudah buat tetapi mahu tambah baik']];
  const approaches = [['guided', 'Bimbingan langkah demi langkah'], ['review', 'Semak dan baiki kerja sedia ada'], ['strategy', 'Susun strategi dan pelan tindakan']];
  const formats = [['online', 'Online', 'Disarankan — lebih mudah, tanpa kos perjalanan'], ['physical', 'Fizikal']];
  const examples = {
    marketing: ['Contoh: Saya mahu susun pemasaran untuk bisnes makanan.', 'Contoh: Ada pelan kandungan yang boleh saya terus gunakan.', 'Contoh: Siapkan pelan kandungan untuk 7 hari.'],
    setting: ['Contoh: Saya mahu belajar setting Meta Ads atau TikTok Ads.', 'Contoh: Boleh menyediakan kempen iklan sendiri.', 'Contoh: Siapkan satu kempen iklan untuk semakan.'],
    video: ['Contoh: Saya mahu buat video AI untuk promosi produk.', 'Contoh: Faham proses daripada idea hingga video siap.', 'Contoh: Hasilkan satu video AI pendek.'],
    image: ['Contoh: Saya mahu buat gambar produk menggunakan AI.', 'Contoh: Boleh menghasilkan visual mengikut identiti bisnes.', 'Contoh: Hasilkan tiga gambar AI untuk media sosial.'],
    funnel: ['Contoh: Saya mahu bina aliran daripada iklan kepada jualan.', 'Contoh: Ada struktur funnel yang sesuai untuk produk saya.', 'Contoh: Siapkan satu pelan funnel dan borang prospek.']
  };
  const slotLabels = { '09:00': '9 pagi–12 tengah hari', '14:00': '2–5 petang', '20:00': '8–11 malam' };
  const travelNote = 'Ada tambahan kos petrol dan penginapan sekiranya lokasi jauh daripada Bestari Jaya dan Klang Valley. Kos akan dimaklumkan sebelum sesi disahkan.';
  const thanks = 'Terima kasih kerana memberi input ini. Nanti pihak KBB yang kreatif akan hubungi anda selepas mendapat informasi ini.';
  const storageKey = 'cikgukb-coaching-v1';
  const form = document.querySelector('#coaching-form'), question = document.querySelector('#question');
  const next = document.querySelector('#next'), back = document.querySelector('#back'), error = document.querySelector('#form-error');
  const progress = document.querySelector('#progress'), stepLabel = document.querySelector('#step-label');
  const apiBase = (window.COACHING_CONFIG?.apiBase || '').replace(/\/$/, '');
  let answers = {}, index = 0, id = crypto.randomUUID(), pending = null, receipt = null;
  let busy = false, editing = false, calendarSequence = 0;
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey));
    if (saved && Date.now() - saved.savedAt < 86400000) {
      answers = saved.answers || {}; id = saved.id || id; pending = saved.pending || null; receipt = saved.receipt || null;
    }
  } catch { /* Storage is optional; the form still works without it. */ }
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ answers, id, pending, receipt, savedAt: Date.now() })); } catch { /* Private browsing / quota. */ }
  }
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const label = (choices, value) => choices.find(c => c[0] === value)?.[1] || '—';
  const currentDate = offset => new Date(Date.now() + 8 * 3600000 + offset * 86400000).toISOString().slice(0, 10);
  function steps() { return ['topic', 'level', 'need', 'outcome', 'kpi', 'approach', 'format', ...(answers.format === 'physical' ? ['location'] : []), 'slot', 'name', 'phone', 'review']; }
  const titles = {
    topic: 'Anda mahu coaching dalam bidang apa?', level: 'Tahap anda sekarang?', need: 'Apa yang anda mahu dibantu?',
    outcome: 'Selepas sesi ini, apa hasil yang anda mahu capai?', kpi: 'Bagaimana anda mahu ukur kejayaan sesi ini?',
    approach: 'Cara belajar yang anda lebih suka?', format: 'Anda pilih sesi online atau fizikal?', location: 'Di bandar atau kawasan mana?',
    slot: 'Bila anda ingin mengikuti sesi?', name: 'Siapa nama anda?', phone: 'Nombor WhatsApp untuk kami hubungi?', review: 'Semak dahulu. Kemudian, hantar.'
  };
  function choicesHtml(key, choices) {
    return `<fieldset aria-labelledby="question-title"><legend class="sr-only">${escape(titles[key] || 'Slot tersedia')}</legend><div class="choices">${choices.map(([value, title, note]) =>
      `<label class="choice"><input type="radio" name="${key}" value="${escape(value)}" ${answers[key] === value ? 'checked' : ''}><span>${escape(title)}${note ? `<small>${escape(note)}</small>` : ''}</span></label>`).join('')}</div></fieldset>`;
  }
  function answerHtml(key, max, multiline = true) {
    const value = escape(answers[key] || '');
    return `${multiline ? `<textarea class="answer" id="answer" name="${key}" aria-labelledby="question-title" aria-describedby="question-hint" maxlength="${max}" rows="4">${value}</textarea>` :
      `<input class="answer" id="answer" name="${key}" aria-labelledby="question-title" aria-describedby="question-hint" maxlength="${max}" value="${value}" ${key === 'name' ? 'autocomplete="name"' : key === 'phone' ? 'type="tel" inputmode="tel" autocomplete="tel"' : ''}>`}
      <p class="counter"><span id="character-count">${(answers[key] || '').length}</span> / ${max}</p>`;
  }
  function focusQuestion() { question.focus({ preventScroll: true }); if (window.scrollY > 140) question.scrollIntoView({ block: 'start', behavior: 'instant' }); }
  function render() {
    calendarSequence++;
    if (receipt) { showReceipt(); return; }
    const flow = steps(); index = Math.max(0, Math.min(index, flow.length - 1));
    const key = flow[index];
    error.textContent = '';
    const percent = Math.round(index / flow.length * 100);
    stepLabel.textContent = `Langkah ${index + 1} daripada ${flow.length}`;
    progress.value = percent; document.querySelector('#progress-percent').textContent = `${percent}%`;
    back.hidden = index === 0 || Boolean(pending); back.disabled = busy;
    next.disabled = busy;
    next.textContent = key === 'review' ? (pending ? 'Cuba semula penghantaran' : 'Hantar Permohonan') : editing ? 'Simpan jawapan' : 'Seterusnya →';
    let hint = '', body = '';
    if (key === 'topic') { hint = 'Pilih satu bidang sahaja. Harga dimaklumkan selepas semakan keperluan anda.'; body = choicesHtml(key, topics); }
    if (key === 'level') { hint = 'Tiada jawapan betul atau salah. Ini membantu kami sesuaikan sesi.'; body = choicesHtml(key, levels); }
    if (['need', 'outcome', 'kpi'].includes(key)) {
      hint = examples[answers.topic || 'marketing'][['need', 'outcome', 'kpi'].indexOf(key)];
      body = answerHtml(key, key === 'kpi' ? 100 : 120);
      if (key === 'kpi') body += `<label class="checkbox"><input id="kpi-unsure" type="checkbox" ${answers.kpiUnsure ? 'checked' : ''}>Belum pasti, bantu saya tentukan</label><p class="hint" style="margin-top:14px">KPI ini ialah sasaran untuk dibincangkan, bukan jaminan hasil.</p>`;
    }
    if (key === 'approach') { hint = 'Pilih pendekatan yang paling membantu anda.'; body = choicesHtml(key, approaches); }
    if (key === 'format') { hint = 'Kedua-dua format diperuntukkan tiga jam. Pilih yang sesuai untuk anda.'; body = choicesHtml(key, formats); }
    if (key === 'location') { hint = 'Nama bandar atau kawasan sudah memadai pada peringkat ini.'; body = answerHtml(key, 80, false) + `<p class="notice">${travelNote}</p>`; }
    if (key === 'name') { hint = 'Nama yang anda mahu kami gunakan ketika menghubungi anda.'; body = answerHtml(key, 60, false); }
    if (key === 'phone') { hint = 'Contoh: 0133815817 atau +60133815817. Untuk nombor luar Malaysia, sertakan kod negara.'; body = answerHtml(key, 25, false); }
    if (key === 'slot') {
      hint = 'Isnin–Ahad · 3 jam · Waktu Malaysia (GMT+8). Pilih sekurang-kurangnya 24 jam lebih awal, sehingga 60 hari ke hadapan.';
      answers.date ||= currentDate(1);
      body = `<label class="field-label" for="session-date">Tarikh pilihan</label><input class="answer" id="session-date" type="date" min="${currentDate(0)}" max="${currentDate(60)}" value="${escape(answers.date)}"><div id="slots" class="slot-list" aria-live="polite"></div><p class="notice">Tarikh pilihan tertakluk pada pengesahan. Permohonan ini belum menyekat slot dalam kalendar.</p>`;
    }
    if (key === 'review') {
      hint = 'Harga akan dimaklumkan selepas semakan. Sesi hanya disahkan selepas perbincangan bersama kami.';
      const rows = [
        ['topic', 'Bidang', label(topics, answers.topic)], ['level', 'Tahap semasa', label(levels, answers.level)],
        ['need', 'Keperluan', answers.need], ['outcome', 'Hasil yang diingini', answers.outcome], ['kpi', 'Sasaran / KPI', answers.kpi],
        ['approach', 'Pendekatan', label(approaches, answers.approach)], ['format', 'Format', label(formats, answers.format)],
        ...(answers.format === 'physical' ? [['location', 'Lokasi', answers.location]] : []),
        ['slot', 'Tarikh & masa (Malaysia)', `${answers.date} · ${slotLabels[answers.time] || '—'}`], ['name', 'Nama', answers.name], ['phone', 'WhatsApp', answers.phone]
      ];
      body = `<dl class="review">${rows.map(([field, title, value]) => `<div class="review-row"><dt>${escape(title)}</dt><dd>${escape(value)}</dd><button type="button" data-edit="${field}" ${pending ? 'disabled' : ''} aria-label="Ubah ${escape(title)}">Ubah</button></div>`).join('')}</dl>`;
      if (answers.format === 'physical') body += `<p class="notice">${travelNote}</p>`;
      if (pending && !busy) body += '<p class="notice">Penghantaran terdahulu belum dapat dipastikan. Cuba semula dengan rujukan yang sama supaya permohonan tidak berganda.</p>';
    }
    question.innerHTML = `<h2 id="question-title">${titles[key]}</h2><p class="hint" id="question-hint">${hint}</p>${body}`;
    const answer = question.querySelector('#answer');
    if (answer) {
      if (key === 'kpi' && answers.kpiUnsure) answer.disabled = true;
      answer.addEventListener('input', () => { answers[key] = answer.value; document.querySelector('#character-count').textContent = answer.value.length; save(); });
    }
    question.querySelectorAll('input[type=radio]').forEach(input => input.addEventListener('change', () => {
      answers[key] = input.value;
      if (key === 'format' && input.value === 'online') delete answers.location;
      save(); error.textContent = '';
    }));
    question.querySelector('#kpi-unsure')?.addEventListener('change', event => {
      answers.kpiUnsure = event.target.checked;
      if (event.target.checked) { answers.kpiDraft = answer.value; answers.kpi = 'Belum pasti, bantu saya tentukan'; }
      else answers.kpi = answers.kpiDraft || '';
      answer.disabled = event.target.checked; answer.value = answers.kpi;
      document.querySelector('#character-count').textContent = answer.value.length; save();
    });
    question.querySelectorAll('[data-edit]').forEach(button => button.addEventListener('click', () => {
      editing = true; index = steps().indexOf(button.dataset.edit); render(); focusQuestion();
    }));
    if (key === 'slot') {
      question.querySelector('#session-date').addEventListener('change', event => { answers.date = event.target.value; delete answers.time; save(); loadSlots(); });
      loadSlots();
    }
  }
  async function api(path, options = {}) {
    if (!apiBase) throw Object.assign(new Error('Borang sedang disediakan. Sila hubungi kami melalui WhatsApp atau cuba lagi kemudian.'), { code: 'not_ready', status: 503 });
    const response = await fetch(`${apiBase}/api/coaching/${path}`, { ...options, signal: AbortSignal.timeout(20000) });
    let data;
    try { data = await response.json(); } catch { throw new Error('Sistem tidak dapat dihubungi. Sila cuba semula.'); }
    if (!response.ok) throw Object.assign(new Error(data.message || 'Sila cuba semula.'), { code: data.code, status: response.status });
    return data;
  }
  async function loadSlots() {
    const sequence = ++calendarSequence, date = answers.date, box = question.querySelector('#slots');
    if (!box) return;
    next.disabled = true;
    box.innerHTML = '<p class="loading">Menyemak kekosongan kalendar…</p>';
    try {
      const result = await api(`availability?date=${encodeURIComponent(date)}`);
      if (sequence !== calendarSequence) return;
      if (!Array.isArray(result.slots)) throw new Error('Maklumat kalendar tidak dapat dibaca.');
      if (!result.slots.some(s => s.time === answers.time)) delete answers.time;
      save();
      if (!result.slots.length) box.innerHTML = '<p class="notice">Tiada slot tersedia untuk tarikh ini. Sila pilih tarikh lain.</p>';
      else {
        box.innerHTML = '<p class="field-label">Slot tersedia</p>' + choicesHtml('time', result.slots.map(s => [s.time, slotLabels[s.time]]));
        box.querySelectorAll('input').forEach(input => input.addEventListener('change', () => { answers.time = input.value; save(); error.textContent = ''; }));
        next.disabled = false;
      }
    } catch (err) {
      if (sequence !== calendarSequence) return;
      box.innerHTML = `<p class="error">${escape(err.message)}</p><button type="button" class="text-button" id="retry-calendar">Cuba semula</button> · <a class="text-button" href="https://wa.me/60133815817">Hubungi melalui WhatsApp</a>`;
      box.querySelector('#retry-calendar').addEventListener('click', loadSlots);
    }
  }
  function valid(key) {
    if (key === 'slot') {
      if (!answers.date || !answers.time) return 'Sila pilih tarikh dan satu slot tersedia.';
    } else if (!String(answers[key] || '').trim()) return 'Sila berikan jawapan sebelum meneruskan.';
    if (key === 'phone') {
      let value = answers.phone.replace(/[\s()+-]/g, '');
      if (value.startsWith('0')) value = '6' + value;
      if (!/^[1-9]\d{7,14}$/.test(value)) return 'Masukkan nombor WhatsApp yang sah, termasuk kod negara.';
    }
    return '';
  }
  function showReceipt() {
    calendarSequence++;
    progress.value = 100; document.querySelector('#progress-percent').textContent = '100%'; stepLabel.textContent = 'Permohonan diterima';
    document.querySelector('#navigation').hidden = true; error.textContent = '';
    question.innerHTML = `<div class="success-mark" aria-hidden="true">✓</div><h2>Terima kasih.</h2><p class="success-copy">${thanks}</p><p class="reference">Nombor rujukan<br><strong>${escape(receipt.reference)}</strong></p><p class="notice">Tarikh pilihan tertakluk pada pengesahan.</p><div class="success-links"><a href="index.html">Kembali ke laman utama →</a><a href="https://wa.me/60133815817" target="_blank" rel="noopener">Hubungi melalui WhatsApp</a></div>`;
  }
  async function submit() {
    if (busy) return;
    if (!pending) {
      const invalid = steps().find(key => key !== 'review' && valid(key));
      if (invalid) { index = steps().indexOf(invalid); editing = false; render(); error.textContent = valid(invalid); focusQuestion(); return; }
      pending = { ...answers, id, website: form.elements.website.value };
      delete pending.kpiDraft; delete pending.kpiUnsure;
      save();
    }
    busy = true; render(); next.textContent = 'Menghantar…';
    try {
      const result = await api('requests', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(pending) });
      if (!result.reference || result.status !== 'pending_confirmation') throw new Error('Pengesahan sistem belum diterima. Sila cuba semula.');
      receipt = result; pending = null; answers = {}; save(); showReceipt(); focusQuestion();
    } catch (err) {
      if ((err.status && err.status < 500 && err.code !== 'idempotency_conflict') || err.code === 'not_ready' || err.code === 'calendar_unavailable') pending = null;
      if (err.code === 'slot_unavailable') { delete answers.time; index = steps().indexOf('slot'); editing = false; }
      save(); busy = false; render(); error.textContent = err.message || 'Penghantaran belum dapat dipastikan. Sila cuba semula.';
    } finally { busy = false; if (!receipt) next.disabled = steps()[index] === 'slot' ? next.disabled : false; }
  }
  form.addEventListener('submit', event => {
    event.preventDefault(); if (busy) return;
    const key = steps()[index];
    if (key === 'review') { submit(); return; }
    const message = valid(key);
    if (message) { error.textContent = message; question.querySelector('input,textarea')?.focus(); return; }
    save();
    if (editing) { index = steps().length - 1; editing = false; } else index++;
    render(); focusQuestion();
  });
  back.addEventListener('click', () => {
    if (busy || pending) return;
    if (editing) { index = steps().length - 1; editing = false; } else index--;
    render(); focusQuestion();
  });
  if (pending) index = steps().length - 1;
  render();
})();
