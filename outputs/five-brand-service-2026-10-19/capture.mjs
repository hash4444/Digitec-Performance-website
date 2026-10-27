import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = 'outputs/five-brand-service-2026-10-19';
const phase = process.argv[2] || 'baseline';
const dir = `${root}/${phase}`;
await mkdir(`${dir}/html`, { recursive: true });
const slugs = ['rolls-royce', 'lamborghini', 'volkswagen', 'mercedes-benz', 'bmw'];
const routes = slugs.flatMap(s => [`/brands/${s}-service-dubai`, `/ar/brands/${s}-service-dubai`]);
const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const plain = s => decode(s.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
function inspect(html) {
  const tags = [...html.matchAll(/<meta\b[^>]*>/g)].map(m => m[0]);
  const attr = (tag, key) => decode(tag.match(new RegExp(`${key}="([^"]*)"`))?.[1] || '');
  const nodes = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].flatMap(m => { const g=JSON.parse(m[1]); return g['@graph'] || [g]; });
  return {
    title: plain(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''),
    description: attr(tags.find(t => attr(t, 'name') === 'description') || '', 'content'),
    robots: attr(tags.find(t => attr(t, 'name') === 'robots') || '', 'content'),
    canonical: attr(html.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0] || '', 'href'),
    alternates: [...html.matchAll(/<link\b[^>]*hreflang[^>]*>/g)].map(m => ({ language: attr(m[0], 'hreflang'), href: attr(m[0], 'href') })),
    headings: [...html.matchAll(/<(h[1-6])\b[^>]*>(.*?)<\/\1>/gs)].map(m => ({ level: m[1], text: plain(m[2]) })),
    links: [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gs)].map(m => ({ href: decode(m[1]), text: plain(m[2]) })),
    nodes,
  };
}
if (phase !== 'live') {
  const server = process.argv[3] || 'dist-server/entry-server.js';
  const { renderRoute } = await import(pathToFileURL(path.resolve(server)));
  const records = [];
  for (const route of routes) {
    const result = await renderRoute(route);
    await writeFile(`${dir}/html/${route.slice(1).replaceAll('/', '__')}.html`, result.html);
    records.push({ route, seo: result.seo, body: inspect(result.html) });
  }
  await writeFile(`${dir}/rendered.json`, JSON.stringify(records, null, 2));
  const manifest = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, {withFileTypes:true})) {
      const file = `${directory}/${entry.name}`;
      if (entry.isDirectory()) await walk(file);
      else manifest.push({ file, sha256: createHash('sha256').update(await readFile(file)).digest('hex') });
    }
  }
  for (const directory of ['src', 'public', 'scripts', 'cloudflare', 'supabase']) await walk(directory);
  await writeFile(`${dir}/source-manifest.json`, JSON.stringify(manifest, null, 2));
  console.log(`Captured ${records.length} rendered routes and ${manifest.length} source hashes`);
} else {
  const records = await Promise.all(routes.map(async route => {
    try {
      const response = await fetch(`https://digitecme.com${route}`, {signal: AbortSignal.timeout(30000)});
      const html = await response.text();
      await writeFile(`${dir}/html/${route.slice(1).replaceAll('/', '__')}.html`, html);
      return {route, url:response.url, status:response.status, headers:Object.fromEntries([...response.headers].filter(([key]) => key !== 'set-cookie')), ...inspect(html)};
    } catch(error) { return {route,error:String(error)}; }
  }));
  for (const route of ['/robots.txt', '/sitemap.xml']) {
    const response = await fetch(`https://digitecme.com${route}`, {signal:AbortSignal.timeout(30000)});
    await writeFile(`${dir}/${route.slice(1)}`, await response.text());
  }
  await writeFile(`${dir}/http-audit.json`, JSON.stringify({capturedAt:new Date().toISOString(),records}, null, 2));
  console.log(records.map(({route,status,error,title}) => ({route,status,error,title})));
}
