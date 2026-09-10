// LOCAL QA ONLY. All external API calls are simulated; never deploy this server.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname } from 'node:path';
import { Miniflare, convertV4MiniflareOptions } from 'miniflare';
import worker from '../src/index';
const mf = new Miniflare(convertV4MiniflareOptions({ modules: true, script: 'export default {fetch(){return new Response("test")}}', compatibilityDate: '2026-09-10', d1Databases: ['DB'] }));
const DB = await mf.getD1Database('DB');
for (const sql of (await readFile(new URL('../migrations/0001_coaching.sql', import.meta.url), 'utf8')).split(';').filter(s => s.trim())) await DB.prepare(sql).run();
const env = { DB, ALLOWED_ORIGINS: 'http://127.0.0.1:8788', CALENDAR_ID: 'cikgukb.my@gmail.com', GOOGLE_CALENDAR_API_KEY: 'local-fixture',
  MURPATI_API_KEY: 'local-fixture', RATE_LIMIT_SECRET: 'local-fixture', MURPATI_SESSION_ID: 'official:test', MURPATI_RECIPIENT: '60133815817',
  MURPATI_TEMPLATE: 'coaching_request_admin', MURPATI_LANGUAGE: 'ms', NOTIFICATIONS_ENABLED: 'true' };
globalThis.fetch = async (url, options) => {
  if (String(url).includes('googleapis.com')) {
    const date = JSON.parse(String(options.body)).timeMin.slice(0, 10);
    // The afternoon is busy. Dates ending in 20 exercise the calendar failure UI.
    if (date.endsWith('-20')) return Response.json({ error: 'local fixture failure' }, { status: 503 });
    return Response.json({ calendars: { [env.CALENDAR_ID]: { busy: [{ start: `${date}T14:00:00+08:00`, end: `${date}T17:00:00+08:00` }] } } });
  }
  if (String(url).includes('api.murpati.com')) {
    const message = JSON.parse(String(options.body));
    console.log(JSON.stringify({ event: 'SIMULATED_WHATSAPP', reference: message.body_params[0], fields: message.body_params.length }));
    return Response.json({ success: true, message_id: 'simulated-not-sent' });
  }
  throw new Error('External network blocked in local QA server');
};
const root = fileURLToPath(new URL('../../', import.meta.url));
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg' };
const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://127.0.0.1:8788');
    if (url.pathname.startsWith('/api/coaching/')) {
      const chunks = []; for await (const chunk of req) chunks.push(chunk);
      const tasks = [];
      const response = await worker.fetch(new Request(url, { method: req.method, headers: req.headers, ...(req.method === 'POST' ? { body: Buffer.concat(chunks) } : {}) }), env, { waitUntil(p) { tasks.push(p); } });
      res.writeHead(response.status, Object.fromEntries(response.headers)); res.end(await response.text()); await Promise.all(tasks); return;
    }
    if (url.pathname === '/js/coaching-config.js') {
      res.writeHead(200, { 'Content-Type': 'text/javascript' }); res.end('window.COACHING_CONFIG={apiBase:"http://127.0.0.1:8788"}'); return;
    }
    const path = url.pathname === '/' ? '/coaching.html' : decodeURIComponent(url.pathname);
    if (!/^\/(?:[a-z-]+\.html|favicon\.svg|(?:css|js|assets)\/[\w/.-]+)$/.test(path) || path.includes('..')) { res.writeHead(404); res.end(); return; }
    const file = resolve(root, '.' + path);
    let data = await readFile(file);
    if (path === '/coaching.html') data = Buffer.from(data.toString().replace('<body>', '<body><div style="background:#fff2bf;text-align:center;font-size:12px;padding:5px">Pratonton ujian · slot dan WhatsApp simulasi</div>'));
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' }); res.end(data);
  } catch { res.writeHead(500); res.end('Local preview error'); }
});
server.listen(8788, '127.0.0.1', () => console.log('Local QA preview: http://127.0.0.1:8788/coaching.html'));
process.on('SIGINT', async () => { server.close(); await mf.dispose(); process.exit(0); });
