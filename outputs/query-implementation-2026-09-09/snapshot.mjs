import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPublicRoutes, renderRoute } from './ssr-before/entry-server.js';
await fs.mkdir(new URL('./source-before/', import.meta.url), { recursive: true });
const rows=[];
for (const route of getPublicRoutes()) {
 const r=await renderRoute(route.path);
 rows.push({...route,seo:r.seo});
 await fs.writeFile(path.join(fileURLToPath(new URL('./source-before/',import.meta.url)),`${encodeURIComponent(route.path)}.html`),r.html);
}
await fs.writeFile(new URL('./source-before.json',import.meta.url),JSON.stringify(rows,null,2));
console.log(`Recorded ${rows.length} reconciled source routes before editing.`);
