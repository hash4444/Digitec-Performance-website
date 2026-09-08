import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

// Exercise the final dist and its actual generated edge router locally.
const dist = path.resolve('dist');
const { handleRequest } = await import(pathToFileURL(path.join(dist, '_worker.js')).href);
const port = Number(process.argv[2] || 5190);
const origin = `http://127.0.0.1:${port}`;
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.xml': 'application/xml', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.txt': 'text/plain' };
const assets = { async fetch(request) {
  const pathname = decodeURIComponent(new URL(request.url).pathname);
  const file = path.resolve(dist, `.${pathname}`, path.extname(pathname) ? '' : 'index.html');
  if (!file.startsWith(dist + path.sep)) return new Response('Not found', { status: 404 });
  const body = await readFile(file).catch(() => null);
  return new Response(request.method === 'HEAD' ? null : body, { status: body ? 200 : 404, headers: { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' } });
} };
http.createServer(async (request, response) => {
  try {
    const result = await handleRequest(new Request(`https://digitecme.com${request.url}`, { method: request.method }), { ASSETS: assets });
    const headers = Object.fromEntries(result.headers);
    if (headers.location?.startsWith('https://digitecme.com')) headers.location = headers.location.replace('https://digitecme.com', origin);
    response.writeHead(result.status, headers);
    response.end(Buffer.from(await result.arrayBuffer()));
  } catch { response.writeHead(500); response.end('Local preview failed'); }
}).listen(port, '127.0.0.1', () => console.log(`Combined production preview: ${origin}/services/car-polishing-dubai`));
