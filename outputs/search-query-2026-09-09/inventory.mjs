import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getPublicRoutes, renderRoute } from './ssr/entry-server.js';
const routes = getPublicRoutes();
const out = new URL('./', import.meta.url);
await fs.mkdir(new URL('snapshot/', out), { recursive: true });
const rows = [];
for (const route of routes) {
  const rendered = await renderRoute(route.path);
  rows.push({ ...route, seo: rendered.seo });
  await fs.writeFile(path.join(fileURLToPath(out), 'snapshot', `${encodeURIComponent(route.path)}.html`), rendered.html);
}
await fs.writeFile(new URL('route-seo.json', out), JSON.stringify(rows, null, 2));
console.log(JSON.stringify({routes:rows.length,indexable:rows.filter(r=>r.indexable).length}));
