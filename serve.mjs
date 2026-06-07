import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PORT = process.env.PORT || 5173;

const MIME = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css; charset=utf-8',
  '.js':'application/javascript; charset=utf-8',
  '.mjs':'application/javascript; charset=utf-8',
  '.json':'application/json',
  '.webp':'image/webp',
  '.avif':'image/avif',
  '.jpg':'image/jpeg','.jpeg':'image/jpeg',
  '.png':'image/png','.svg':'image/svg+xml',
  '.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain'
};

const send = (res, code, body, type='text/plain') => {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': code===200 ? 'no-cache' : 'no-store' });
  res.end(body);
};

http.createServer(async (req, res) => {
  try {
    let url = decodeURIComponent(req.url.split('?')[0]);
    if (url === '/') url = '/index.html';
    const path = normalize(join(ROOT, url));
    if (!path.startsWith(ROOT)) return send(res, 403, 'forbidden');
    try { await stat(path); }
    catch {
      const fb = await readFile(join(ROOT, '404.html')).catch(()=>null);
      return fb ? send(res, 404, fb, 'text/html; charset=utf-8') : send(res, 404, 'not found');
    }
    const body = await readFile(path);
    send(res, 200, body, MIME[extname(path)] || 'application/octet-stream');
  } catch (e) {
    send(res, 500, String(e));
  }
}).listen(PORT, () => console.log(`Mother Roaster · http://localhost:${PORT}`));
