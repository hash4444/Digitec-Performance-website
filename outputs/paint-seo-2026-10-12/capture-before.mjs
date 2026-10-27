import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
const output = 'outputs/paint-seo-2026-10-12';
const files = ['src/App.tsx', 'src/data/services.ts', 'src/pages/ServicePage.tsx', 'src/i18n/ar-protection-services.ts', 'scripts/validate-paint-correction.mjs', 'src/lib/route-manifest.ts', 'public/sitemap.xml', 'src/data/sitewideSeoUpdatedPaths.ts'];
for (const file of files) {
  const destination = path.join(output, 'before', file);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(file, destination);
}
const paths = ['/services/paint-protection-dubai', '/services/paint-protection-film', '/services/ceramic-coating', '/services/car-polishing-dubai', '/ar/services/paint-protection-dubai', '/ar/services/paint-protection-film', '/ar/services/ceramic-coating', '/blog/ceramic-coating-vs-ppf-dubai', '/blog/why-ceramic-coating-matters-uae'];
const decode = value => value?.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const records = [];
for (const route of paths) {
  const html = await readFile(path.join('dist', route, 'index.html'), 'utf8');
  const target = path.join(output, 'before/html', route, 'index.html');
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html);
  records.push({ route, title: decode(html.match(/<title>(.*?)<\/title>/s)?.[1]), description: decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1]), canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1], h1: decode(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]) });
}
await writeFile(path.join(output, 'before/metadata.json'), JSON.stringify(records, null, 2));
console.log(JSON.stringify(records, null, 2));
