export const TIMEZONE = 'Asia/Kuala_Lumpur';
export const TOPICS = {
  marketing: 'Pemasaran digital', setting: 'Belajar setting (iklan digital)',
  video: 'Buat video AI', image: 'Buat gambar AI', funnel: 'Bina sistem dan funnel jualan'
} as const;
export const LEVELS = { beginner: 'Baru bermula', tried: 'Pernah cuba', improving: 'Sudah buat tetapi mahu tambah baik' } as const;
export const APPROACHES = { guided: 'Bimbingan langkah demi langkah', review: 'Semak dan baiki kerja sedia ada', strategy: 'Susun strategi dan pelan tindakan' } as const;
export const SLOT_TIMES = ['09:00', '14:00', '20:00'] as const;
export const THANK_YOU = 'Terima kasih kerana memberi input ini. Nanti pihak KBB yang kreatif akan hubungi anda selepas mendapat informasi ini.';
export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
export interface CoachingRequest {
  id: string; topic: keyof typeof TOPICS; level: keyof typeof LEVELS;
  need: string; outcome: string; kpi: string; approach: keyof typeof APPROACHES;
  format: 'online' | 'physical'; location: string; date: string; time: string; name: string; phone: string;
}
export interface Busy { start: string; end: string }
export interface Slot { date: string; time: string; start: string; end: string }
const dayMs = 86400000;
export const localDate = (now: number) => new Date(now + 8 * 3600000).toISOString().slice(0, 10);
export function dateBounds(now = Date.now()) { return { minDate: localDate(now), maxDate: localDate(now + 60 * dayMs) }; }
export function validateDate(date: string, now = Date.now()) {
  const parsed = new Date(`${date}T00:00:00+08:00`).getTime();
  const { minDate, maxDate } = dateBounds(now);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed) || localDate(parsed) !== date || date < minDate || date > maxDate)
    throw new ApiError(400, 'invalid_date', 'Pilih tarikh dalam 60 hari akan datang.');
}
export function makeSlot(date: string, time: string): Slot {
  const start = new Date(`${date}T${time}:00+08:00`);
  return { date, time, start: start.toISOString(), end: new Date(start.getTime() + 3 * 3600000).toISOString() };
}
export function availableSlots(date: string, busy: Busy[], now = Date.now()): Slot[] {
  validateDate(date, now);
  return SLOT_TIMES.map(time => makeSlot(date, time)).filter(slot => {
    const start = Date.parse(slot.start), end = Date.parse(slot.end);
    return start >= now + dayMs && !busy.some(b => start < Date.parse(b.end) && end > Date.parse(b.start));
  });
}
function text(value: unknown, label: string, max: number, optional = false): string {
  if (typeof value !== 'string') throw new ApiError(400, 'validation', `Semak ${label}.`);
  const normalized = value.replace(/\s+/g, ' ').trim();
  if ((!optional && !normalized) || normalized.length > max || /[\u0000-\u001f\u007f]/.test(normalized))
    throw new ApiError(400, 'validation', `Semak ${label} (maksimum ${max} aksara).`);
  return normalized;
}
function choice<T extends Record<string, string>>(value: unknown, choices: T): keyof T {
  if (typeof value !== 'string' || !Object.hasOwn(choices, value)) throw new ApiError(400, 'validation', 'Pilih satu jawapan yang sah.');
  return value;
}
export function normalizeRequest(value: unknown): CoachingRequest {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new ApiError(400, 'validation', 'Borang tidak sah.');
  const v = value as Record<string, unknown>;
  if (v.website) throw new ApiError(400, 'validation', 'Borang tidak sah.');
  if (typeof v.id !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v.id))
    throw new ApiError(400, 'validation', 'Rujukan permohonan tidak sah.');
  const format = choice(v.format, { online: 'Online', physical: 'Fizikal' });
  let phone = text(v.phone, 'nombor WhatsApp', 25).replace(/[\s()+-]/g, '');
  if (phone.startsWith('0')) phone = '6' + phone;
  if (!/^[1-9]\d{7,14}$/.test(phone)) throw new ApiError(400, 'validation', 'Masukkan nombor WhatsApp yang sah, termasuk kod negara.');
  const time = text(v.time, 'masa', 5);
  if (!SLOT_TIMES.some(t => t === time)) throw new ApiError(400, 'validation', 'Pilih slot tiga jam yang sah.');
  return {
    id: v.id.toLowerCase(), topic: choice(v.topic, TOPICS), level: choice(v.level, LEVELS),
    need: text(v.need, 'keperluan', 120), outcome: text(v.outcome, 'hasil', 120), kpi: text(v.kpi, 'KPI', 100),
    approach: choice(v.approach, APPROACHES), format,
    location: format === 'physical' ? text(v.location, 'lokasi', 80) : '',
    date: text(v.date, 'tarikh', 10), time,
    name: text(v.name, 'nama', 60), phone
  };
}
export function templateParams(r: CoachingRequest): string[] {
  return [r.id, r.name, r.phone, TOPICS[r.topic], LEVELS[r.level], r.need, r.outcome, r.kpi,
    APPROACHES[r.approach], r.format === 'online' ? 'Online' : `Fizikal: ${r.location}`,
    `${r.date} ${r.time}–${String(Number(r.time.slice(0, 2)) + 3).padStart(2, '0')}:00 (MYT)`];
}
