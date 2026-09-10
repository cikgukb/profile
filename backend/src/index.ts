import { ApiError, THANK_YOU, TIMEZONE, availableSlots, dateBounds, normalizeRequest, templateParams, validateDate } from './domain';
import type { Busy, CoachingRequest } from './domain';

type Secrets = { GOOGLE_CALENDAR_API_KEY?: string; MURPATI_API_KEY?: string; RATE_LIMIT_SECRET?: string };
export type RuntimeEnv = Env & Secrets;
interface StoredRequest {
  id: string; payload_hash: string; notification_status: string; notification_payload: string;
  notification_attempts: number;
}
function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}
function ready(env: RuntimeEnv) {
  return Boolean(env.GOOGLE_CALENDAR_API_KEY && env.MURPATI_API_KEY && env.RATE_LIMIT_SECRET && env.NOTIFICATIONS_ENABLED === 'true');
}
async function digest(value: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(bytes), b => b.toString(16).padStart(2, '0')).join('');
}
async function rateLimit(env: RuntimeEnv, key: string, limit: number, period: number) {
  if (!env.RATE_LIMIT_SECRET) throw new ApiError(503, 'not_ready', 'Borang sedang disediakan. Sila cuba lagi kemudian.');
  const now = Date.now(), bucketTime = Math.floor(now / period);
  const bucket = await digest(`${env.RATE_LIMIT_SECRET}:${key}:${bucketTime}`);
  const row = await env.DB.prepare(`INSERT INTO coaching_rate_limits(bucket,count,expires_at) VALUES (?,1,?)
    ON CONFLICT(bucket) DO UPDATE SET count=count+1 RETURNING count`).bind(bucket, (bucketTime + 1) * period).first<{ count: number }>();
  if (!row || row.count > limit) throw new ApiError(429, 'rate_limited', 'Terlalu banyak percubaan. Sila cuba lagi kemudian.');
}
export async function getAvailability(env: RuntimeEnv, date: string, now = Date.now()) {
  validateDate(date, now);
  if (!env.GOOGLE_CALENDAR_API_KEY) throw new ApiError(503, 'calendar_unavailable', 'Kalendar belum dapat disemak. Sila cuba lagi kemudian.');
  let response: Response;
  try {
    response = await fetch('https://www.googleapis.com/calendar/v3/freeBusy', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': env.GOOGLE_CALENDAR_API_KEY },
      body: JSON.stringify({ timeMin: `${date}T00:00:00+08:00`, timeMax: `${date}T23:59:59+08:00`, timeZone: TIMEZONE, items: [{ id: env.CALENDAR_ID }] }),
      signal: AbortSignal.timeout(10000)
    });
  } catch { throw new ApiError(503, 'calendar_unavailable', 'Kalendar tidak dapat dihubungi. Sila cuba semula.'); }
  if (!response.ok) throw new ApiError(503, 'calendar_unavailable', 'Kalendar tidak dapat disemak. Sila cuba semula.');
  const data = await response.json() as { calendars?: Record<string, { busy?: Busy[]; errors?: unknown[] }> };
  const calendar = data.calendars?.[env.CALENDAR_ID];
  if (!calendar || calendar.errors?.length || !Array.isArray(calendar.busy) || calendar.busy.some(b => !b || !Number.isFinite(Date.parse(b.start)) || !Number.isFinite(Date.parse(b.end)) || Date.parse(b.end) <= Date.parse(b.start)))
    throw new ApiError(503, 'calendar_unavailable', 'Maklumat kalendar belum tersedia. Sila cuba semula.');
  return { ...dateBounds(now), date, timezone: TIMEZONE, slots: availableSlots(date, calendar.busy, now) };
}
async function readBody(request: Request): Promise<unknown> {
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) throw new ApiError(415, 'content_type', 'Format borang tidak sah.');
  if (!request.body) throw new ApiError(400, 'validation', 'Borang kosong.');
  const reader = request.body.getReader(), chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 8192) { await reader.cancel(); throw new ApiError(413, 'too_large', 'Maklumat borang terlalu panjang.'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new ApiError(400, 'validation', 'Borang tidak dapat dibaca.'); }
}
function receipt(row: StoredRequest) {
  return { reference: row.id, status: 'pending_confirmation', notificationStatus: row.notification_status, message: THANK_YOU };
}
export async function notifyRequest(env: RuntimeEnv, id: string) {
  if (env.NOTIFICATIONS_ENABLED !== 'true' || !env.MURPATI_API_KEY) return;
  const now = Date.now();
  // Atomic lease prevents simultaneous request/cron workers from processing an outbox row.
  const row = await env.DB.prepare(`UPDATE coaching_requests SET notification_status='sending',
    notification_attempts=notification_attempts+1, lease_until=?
    WHERE id=? AND notification_status IN ('pending','retry','sending') AND lease_until<=? AND next_attempt_at<=?
    RETURNING id,notification_payload,notification_attempts`).bind(now + 60000, id, now, now).first<StoredRequest>();
  if (!row) return;
  let status = 'retry', error: string | null = null, messageId: string | null = null;
  try {
    const response = await fetch('https://api.murpati.com/v1/messages/send-template', {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'X-API-Key': env.MURPATI_API_KEY, 'Idempotency-Key': `coaching-${id}` },
      body: row.notification_payload, signal: AbortSignal.timeout(15000)
    });
    const data = await response.json() as { success?: boolean; message_id?: string; error?: unknown };
    if (response.status === 200 && data.success === true && typeof data.message_id === 'string') {
      status = 'sent'; messageId = data.message_id;
    } else if (response.status === 202 || response.status === 409) {
      status = 'needs_attention'; error = `murpati_${response.status}_uncertain`;
    } else if (response.status === 429 || response.status >= 500) {
      error = `murpati_${response.status}`;
    } else { status = 'failed'; error = `murpati_${response.status}`; }
  } catch { error = 'murpati_network_error'; }
  if (status === 'retry' && row.notification_attempts >= 6) status = 'needs_attention';
  const next = now + Math.min(3600000, 60000 * 2 ** row.notification_attempts);
  await env.DB.prepare(`UPDATE coaching_requests SET notification_status=?,notification_error=?,message_id=?,next_attempt_at=?,lease_until=0 WHERE id=?`)
    .bind(status, error, messageId, next, id).run();
  // Never log the API key, phone, answers, or provider response body.
  if (status !== 'sent') console.warn(JSON.stringify({ event: 'coaching_notification', reference: id, status, error }));
}
async function submit(request: Request, env: RuntimeEnv, ctx: ExecutionContext) {
  const payload: CoachingRequest = normalizeRequest(await readBody(request));
  const canonical = JSON.stringify(payload), hash = await digest(canonical);
  const existing = await env.DB.prepare('SELECT id,payload_hash,notification_status FROM coaching_requests WHERE id=?').bind(payload.id).first<StoredRequest>();
  if (existing) {
    if (existing.payload_hash !== hash) throw new ApiError(409, 'idempotency_conflict', 'Rujukan ini sudah digunakan. Muat semula borang untuk permohonan baharu.');
    return json(receipt(existing));
  }
  if (!ready(env)) throw new ApiError(503, 'not_ready', 'Borang sedang disediakan. Sila hubungi kami melalui WhatsApp atau cuba lagi kemudian.');
  await rateLimit(env, `submit:${request.headers.get('CF-Connecting-IP') || 'local'}`, 5, 3600000);
  await rateLimit(env, `phone:${payload.phone}`, 3, 86400000);
  const availability = await getAvailability(env, payload.date);
  if (!availability.slots.some(s => s.time === payload.time)) throw new ApiError(409, 'slot_unavailable', 'Slot ini tidak lagi tersedia. Sila pilih slot lain.');
  const now = Date.now();
  const notification = JSON.stringify({ session_id: env.MURPATI_SESSION_ID, pipeline: 'official', to: env.MURPATI_RECIPIENT,
    template_name: env.MURPATI_TEMPLATE, language: env.MURPATI_LANGUAGE, body_params: templateParams(payload) });
  await env.DB.prepare(`INSERT INTO coaching_requests(id,payload_hash,payload,created_at,notification_payload,next_attempt_at)
    VALUES (?,?,?,?,?,?) ON CONFLICT(id) DO NOTHING`).bind(payload.id, hash, canonical, now, notification, now).run();
  const stored = await env.DB.prepare('SELECT id,payload_hash,notification_status FROM coaching_requests WHERE id=?').bind(payload.id).first<StoredRequest>();
  if (!stored) throw new Error('request_not_persisted');
  if (stored.payload_hash !== hash) throw new ApiError(409, 'idempotency_conflict', 'Rujukan permohonan bertindih. Sila muat semula.');
  ctx.waitUntil(notifyRequest(env, payload.id).catch(() => console.error(JSON.stringify({ event: 'coaching_outbox_deferred', reference: payload.id }))));
  return json(receipt(stored), 201);
}
export default {
  async fetch(request: Request, env: RuntimeEnv, ctx: ExecutionContext): Promise<Response> {
    const origin = request.headers.get('Origin');
    const allowed = env.ALLOWED_ORIGINS.split(',');
    let result: Response;
    try {
      if (origin && !allowed.includes(origin)) throw new ApiError(403, 'origin', 'Permintaan tidak dibenarkan.');
      const url = new URL(request.url);
      if (request.method === 'OPTIONS') result = new Response(null, { status: 204 });
      else if (request.method === 'GET' && url.pathname === '/api/coaching/health') {
        await env.DB.prepare('SELECT 1 FROM coaching_requests LIMIT 1').first();
        result = json({ ready: ready(env) });
      } else if (request.method === 'GET' && url.pathname === '/api/coaching/availability') {
        await rateLimit(env, `availability:${request.headers.get('CF-Connecting-IP') || 'local'}`, 90, 60000);
        result = json(await getAvailability(env, url.searchParams.get('date') || ''));
      } else if (request.method === 'POST' && url.pathname === '/api/coaching/requests') {
        if (!origin) throw new ApiError(403, 'origin', 'Permintaan tidak dibenarkan.');
        await rateLimit(env, `post:${request.headers.get('CF-Connecting-IP') || 'local'}`, 30, 60000);
        result = await submit(request, env, ctx);
      } else result = json({ code: 'not_found', message: 'Laluan tidak ditemui.' }, 404);
    } catch (error) {
      if (error instanceof ApiError) result = json({ code: error.code, message: error.message }, error.status);
      else {
        console.error(JSON.stringify({ event: 'coaching_api_error' }));
        result = json({ code: 'service_error', message: 'Sistem tidak dapat memproses permintaan. Sila cuba semula.' }, 503);
      }
    }
    if (origin && allowed.includes(origin)) {
      result.headers.set('Access-Control-Allow-Origin', origin);
      result.headers.set('Vary', 'Origin');
      result.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      result.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    return result;
  },
  async scheduled(_event: ScheduledController, env: RuntimeEnv, _ctx: ExecutionContext) {
    await env.DB.prepare('DELETE FROM coaching_rate_limits WHERE expires_at<?').bind(Date.now() - 86400000).run();
    const { results } = await env.DB.prepare(`SELECT id FROM coaching_requests WHERE notification_status IN ('pending','retry','sending')
      AND next_attempt_at<=? AND lease_until<=? LIMIT 20`).bind(Date.now(), Date.now()).all<{ id: string }>();
    for (const row of results) await notifyRequest(env, row.id);
  }
} satisfies ExportedHandler<RuntimeEnv>;
