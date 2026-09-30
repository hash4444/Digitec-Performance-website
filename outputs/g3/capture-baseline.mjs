import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

const baselineHead = 'bbca5e0dbd49b0ff7ef9b7873aa09b2e2e600c9c';
const phase = process.argv[2] || 'baseline';
const root = path.resolve('outputs/g3/baseline');
await fs.mkdir(path.join(root, `${phase}-rendered`), { recursive: true });
const { getPublicRoutes, renderRoute } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const routes = getPublicRoutes();
const pages = [];
for (const route of routes) {
  const result = await renderRoute(route.path);
  const id = createHash('sha256').update(route.path).digest('hex').slice(0, 16);
  const htmlFile = `${phase}-rendered/${id}.html.gz`;
  await fs.writeFile(path.join(root, htmlFile), gzipSync(result.html));
  pages.push({ path: route.path, seo: result.seo, htmlFile });
}
await fs.writeFile(path.join(root, `${phase}-pages.json`), JSON.stringify(pages));
await fs.writeFile(path.join(root, `${phase}-routes.json`), JSON.stringify(routes));
console.log(`Captured ${pages.length} local baseline pages`);
