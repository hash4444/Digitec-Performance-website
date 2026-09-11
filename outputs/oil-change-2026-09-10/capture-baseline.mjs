import { readFile, writeFile } from 'node:fs/promises';
const dir = 'outputs/oil-change-2026-09-10';
const source = JSON.parse(await readFile('outputs/search-query-2026-09-09/source.json', 'utf8'));
const summary = JSON.parse(await readFile('outputs/search-query-2026-09-09/summary.json', 'utf8'));
const queries = JSON.parse(await readFile('outputs/search-query-2026-09-09/query-map.json', 'utf8')).filter(q => q.owner === 'https://digitecme.com/services/oil-change-dubai');
const page = source.Pages.find(row => row[0] === 'https://digitecme.com/services/oil-change-dubai');
const impressions = queries.reduce((sum, q) => sum + q.impressions, 0);
const clicks = queries.reduce((sum, q) => sum + q.clicks, 0);
const baseline = {
  export: 'digitecme.com-Performance-on-Search-2026-09-08 (2).xlsx',
  dateRange: summary.dates,
  url: { url: page[0], clicks: page[1], impressions: page[2], exportedCtr: page[3], calculatedCtr: page[1] / page[2], averagePosition: page[4] },
  assignedQueryCluster: { rows: queries.length, clicks, impressions, ctr: clicks / impressions, impressionWeightedPosition: queries.reduce((sum, q) => sum + q.impressions * q.position, 0) / impressions },
  caveat: 'Query rows are property-level observations assigned to the proposed intent owner. The export does not contain query/page pairs; these are not URL-filtered query metrics. The user’s approximate position 15 is separate context, not a replacement for this dated export.',
  queries,
};
await writeFile(`${dir}/search-console-baseline.json`, JSON.stringify(baseline, null, 2));
const decode = text => text.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const snapshot = html => ({
  title: decode(html.match(/<title>(.*?)<\/title>/s)?.[1] || ''),
  description: decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] || ''),
  h1: [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gs)].map(m => decode(m[1])),
  h2: [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/gs)].map(m => decode(m[1])),
});
const comparisonPaths = ['/services/oil-change-dubai', '/ar/services/oil-change-dubai', '/services/car-service-dubai', '/services/mechanical-repair-dubai', '/brands/audi-service-dubai/oil-change', '/brands/bmw-service-dubai/oil-change'];
const before = {};
for (const route of comparisonPaths) {
  const html = await readFile(`dist${route}/index.html`, 'utf8');
  const file = `${route.slice(1).replaceAll('/', '__')}.before.html`;
  await writeFile(`${dir}/${file}`, html);
  before[route] = { ...snapshot(html), file };
}
await writeFile(`${dir}/before-local.json`, JSON.stringify(before, null, 2));
try {
  const response = await fetch('https://digitecme.com/services/oil-change-dubai', {headers: {'cache-control':'no-cache'}, signal:AbortSignal.timeout(30000)});
  const html = await response.text();
  await writeFile(`${dir}/before-live.html`, html);
  await writeFile(`${dir}/before-live.json`, JSON.stringify({checkedAt:new Date().toISOString(), status:response.status, finalUrl:response.url, ...snapshot(html)}, null, 2));
  console.log(JSON.stringify({baseline:baseline.url, cluster:baseline.assignedQueryCluster, live: {status:response.status, ...snapshot(html)}}));
} catch(error) { console.log(JSON.stringify({baseline:baseline.url, liveError:error.message})); }
