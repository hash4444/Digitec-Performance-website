import fs from 'node:fs/promises';
import { getPublicRoutes, renderRoute } from '../../dist-server/entry-server.js';
const rows = [];
for (const route of getPublicRoutes()) {
  const result = await renderRoute(route.path);
  rows.push({...route, seo: result.seo});
}
await fs.writeFile(new URL('./source-after.json', import.meta.url), JSON.stringify(rows, null, 2));
console.log(`Recorded ${rows.length} final source routes.`);
