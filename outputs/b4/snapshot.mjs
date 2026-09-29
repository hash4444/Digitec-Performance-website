import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

const out = path.resolve('outputs/b4/after-rendered');
await fs.mkdir(out, { recursive: true });
const { getPublicRoutes, renderRoute } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
await fs.writeFile('outputs/b4/after-routes.json', JSON.stringify(routes, null, 2));
const summary = [];
for (const route of routes) {
  const result = await renderRoute(route.path);
  const id = createHash('sha256').update(route.path).digest('hex').slice(0, 16);
  const htmlFile = `after-rendered/${id}.html.gz`;
  await fs.writeFile(path.join(out, `${id}.html.gz`), gzipSync(result.html));
  summary.push({ path: route.path, seo: result.seo, htmlHash: createHash('sha256').update(result.html).digest('hex'), htmlFile });
}
await fs.writeFile('outputs/b4/after-pages.json', JSON.stringify(summary, null, 2));
console.log(`Saved ${summary.length} current routes and rendered SEO snapshots`);


