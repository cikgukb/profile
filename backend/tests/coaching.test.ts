import { test, before, after, afterEach, mock } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import worker, { getAvailability, notifyRequest } from '../src/index';
import { availableSlots, normalizeRequest, localDate, validateDate, templateParams, TOPICS } from '../src/domain';

const fixed = Date.parse('2026-09-10T10:00:00+08:00');
const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, script: 'export default {fetch(){return new Response("test")}}', compatibilityDate: '2026-09-10', d1Databases: ['DB'] }));
let env;
before(async () => {
  const DB = await mf.getD1Database('DB');
  const sql = await readFile(new URL('../migrations/0001_coaching.sql', import.meta.url), 'utf8');
  for (const statement of sql.split(';').filter(s => s.trim())) await DB.prepare(statement).run();
  env = { DB, ALLOWED_ORIGINS: 'https://cikgukb.my', CALENDAR_ID: 'cikgukb.my@gmail.com',
    GOOGLE_CALENDAR_API_KEY: 'test-only', MURPATI_API_KEY: 'test-only', RATE_LIMIT_SECRET: 'test-only',
    MURPATI_SESSION_ID: 'official:test', MURPATI_RECIPIENT: '60133815817', MURPATI_TEMPLATE: 'coaching_request_admin', MURPATI_LANGUAGE: 'ms', NOTIFICATIONS_ENABLED: 'true' };
});
after(async () => { await mf.dispose(); });
afterEach(async () => { mock.restoreAll(); await env.DB.prepare('DELETE FROM coaching_requests').run(); await env.DB.prepare('DELETE FROM coaching_rate_limits').run(); });
function payload(overrides = {}) {
  return { id: crypto.randomUUID(), topic: 'video', level: 'beginner', need: 'Video produk', outcome: 'Boleh buat video', kpi: 'Satu video',
    approach: 'guided', format: 'online', location: '', date: localDate(Date.now() + 3 * 86400000), time: '09:00', name: 'Ujian Coaching', phone: '0133815817', ...overrides };
}
function upstream(busy = []) {
  return mock.method(globalThis, 'fetch', async (url, options) => {
    if (String(url).includes('googleapis')) return Response.json({ calendars: { [env.CALENDAR_ID]: { busy } } });
    return Response.json({ success: true, message_id: 'wamid.test' });
  });
}
async function post(body, context = undefined, origin = 'https://cikgukb.my') {
  const tasks = [];
  const response = await worker.fetch(new Request('https://worker.test/api/coaching/requests', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1' }, body: JSON.stringify(body) }), env, context || { waitUntil(p) { tasks.push(p); } });
  await Promise.all(tasks);
  return response;
}
test('Malaysia time boundaries, exact 24-hour notice and three-hour duration', () => {
  assert.deepEqual(availableSlots('2026-09-11', [], fixed).map(s => s.time), ['14:00', '20:00']);
  const exact = availableSlots('2026-09-11', [], fixed - 3600000);
  assert.equal(exact[0].time, '09:00');
  assert.equal(Date.parse(exact[0].end) - Date.parse(exact[0].start), 3 * 3600000);
  assert.equal(localDate(Date.parse('2026-09-10T17:00:00Z')), '2026-09-11');
  assert.throws(() => validateDate('2026-09-31', fixed));
  assert.throws(() => validateDate('2026-11-10', fixed));
});
test('overlaps, boundary-adjacent events and all-day busy events', () => {
  assert.deepEqual(availableSlots('2026-09-12', [{ start: '2026-09-12T11:59:00+08:00', end: '2026-09-12T14:00:00+08:00' }], fixed).map(s => s.time), ['14:00', '20:00']);
  assert.equal(availableSlots('2026-09-12', [{ start: '2026-09-12T00:00:00+08:00', end: '2026-09-13T00:00:00+08:00' }], fixed).length, 0);
});
test('five single-select topics; physical location required; online strips stale location', () => {
  for (const topic of Object.keys(TOPICS)) assert.equal(normalizeRequest(payload({ topic })).topic, topic);
  assert.throws(() => normalizeRequest(payload({ topic: ['video', 'image'] })));
  assert.throws(() => normalizeRequest(payload({ topic: '__proto__' })));
  assert.throws(() => normalizeRequest(payload({ format: 'physical' })));
  assert.equal(normalizeRequest(payload({ location: 'stale location' })).location, '');
  assert.equal(normalizeRequest(payload()).phone, '60133815817');
  assert.throws(() => normalizeRequest(payload({ need: 'x'.repeat(121) })));
  assert.throws(() => normalizeRequest(payload({ website: 'spam' })));
  assert.equal(templateParams(normalizeRequest(payload({ format: 'physical', location: 'Klang' })))[9], 'Fizikal: Klang');
});
test('calendar errors never become available slots', async () => {
  const fetch = mock.method(globalThis, 'fetch', async () => Response.json({ calendars: { [env.CALENDAR_ID]: { errors: [{ reason: 'notFound' }] } } }));
  await assert.rejects(getAvailability(env, '2026-09-12', fixed), /kalendar/);
  fetch.mock.mockImplementation(async () => Response.json({ calendars: {} }));
  await assert.rejects(getAvailability(env, '2026-09-12', fixed));
  fetch.mock.mockImplementation(async () => { throw new Error('offline'); });
  await assert.rejects(getAvailability(env, '2026-09-12', fixed));
});
test('stores before sending; retries same request without another row or send', async () => {
  const spy = upstream(); const tasks = []; const context = { waitUntil(p) { tasks.push(p); } }; const body = payload();
  const response = await post(body, context); assert.equal(response.status, 201);
  const receipt = await response.json(); assert.equal(receipt.status, 'pending_confirmation');
  await Promise.all(tasks);
  assert.equal((await env.DB.prepare('SELECT notification_status FROM coaching_requests').first()).notification_status, 'sent');
  const second = await post(body, context); assert.equal(second.status, 200);
  assert.equal((await second.json()).reference, receipt.reference);
  assert.equal((await env.DB.prepare('SELECT COUNT(*) AS n FROM coaching_requests').first()).n, 1);
  const sends = spy.mock.calls.filter(c => String(c.arguments[0]).includes('murpati'));
  assert.equal(sends.length, 1);
  const sent = JSON.parse(sends[0].arguments[1].body);
  assert.equal(sent.to, '60133815817'); assert.equal(sent.body_params.length, 11);
  assert.equal(sends[0].arguments[1].headers['Idempotency-Key'], `coaching-${body.id}`);
  const conflict = await post({ ...body, name: 'Changed' }); assert.equal(conflict.status, 409);
});
test('concurrent identical submissions share one durable record', async () => {
  upstream(); const body = payload();
  const results = await Promise.all([post(body), post(body)]);
  assert.ok(results.every(r => r.status === 201 || r.status === 200));
  assert.equal((await env.DB.prepare('SELECT COUNT(*) AS n FROM coaching_requests').first()).n, 1);
});
test('rechecks slot on submit, no stored record when busy', async () => {
  const body = payload(); upstream([{ start: `${body.date}T00:00:00+08:00`, end: `${body.date}T23:59:59+08:00` }]);
  const response = await post(body); assert.equal(response.status, 409);
  assert.equal((await response.json()).code, 'slot_unavailable');
  assert.equal((await env.DB.prepare('SELECT COUNT(*) AS n FROM coaching_requests').first()).n, 0);
});
test('storage failure returns error and never sends WhatsApp', async () => {
  const spy = upstream();
  const brokenEnv = { ...env, DB: { prepare() { throw new Error('disk failed'); } } };
  const response = await worker.fetch(new Request('https://worker.test/api/coaching/requests', { method: 'POST', headers: { Origin: 'https://cikgukb.my', 'Content-Type': 'application/json' }, body: JSON.stringify(payload()) }), brokenEnv, { waitUntil() {} });
  assert.equal(response.status, 503); assert.equal(spy.mock.callCount(), 0);
});
test('rate limit, malicious origin and recipient override', async () => {
  const spy = upstream();
  assert.equal((await post(payload(), undefined, 'https://evil.example')).status, 403);
  const tasks = []; const body = payload({ to: '60111111111' });
  await post(body, { waitUntil(p) { tasks.push(p); } }); await Promise.all(tasks);
  const sent = spy.mock.calls.find(c => String(c.arguments[0]).includes('murpati'));
  assert.equal(JSON.parse(sent.arguments[1].body).to, env.MURPATI_RECIPIENT);
  await post(payload()); await post(payload());
  assert.equal((await post(payload())).status, 429);
});
test('transient failure retries immutable payload/key, uncertain and rejected need intervention', async () => {
  const spy = upstream(); const body = payload();
  // Capture background tasks so no asynchronous work leaks into another test.
  const initial = []; await post(body, { waitUntil(p) { initial.push(p); } }); await Promise.all(initial);
  await env.DB.prepare("UPDATE coaching_requests SET notification_status='pending',notification_attempts=0,next_attempt_at=0").run();
  spy.mock.mockImplementation(async () => new Response('{}', { status: 503 }));
  await notifyRequest(env, body.id);
  assert.equal((await env.DB.prepare('SELECT notification_status FROM coaching_requests').first()).notification_status, 'retry');
  await env.DB.prepare('UPDATE coaching_requests SET next_attempt_at=0').run();
  spy.mock.mockImplementation(async () => Response.json({ success: true, message_id: 'wamid.retry' }));
  await notifyRequest(env, body.id);
  const calls = spy.mock.calls.filter(c => String(c.arguments[0]).includes('murpati'));
  assert.equal(calls.at(-1).arguments[1].body, calls.at(-2).arguments[1].body);
  assert.equal(calls.at(-1).arguments[1].headers['Idempotency-Key'], calls.at(-2).arguments[1].headers['Idempotency-Key']);
  for (const [code, status] of [[202, 'needs_attention'], [409, 'needs_attention'], [422, 'failed']]) {
    await env.DB.prepare("UPDATE coaching_requests SET notification_status='pending',next_attempt_at=0").run();
    spy.mock.mockImplementation(async () => new Response('{}', { status: code }));
    await notifyRequest(env, body.id);
    assert.equal((await env.DB.prepare('SELECT notification_status FROM coaching_requests').first()).notification_status, status);
  }
});
