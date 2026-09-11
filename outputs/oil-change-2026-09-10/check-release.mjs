import assert from 'node:assert/strict';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
const dir = 'outputs/oil-change-2026-09-10';
const route = '/services/oil-change-dubai';
const html = await readFile(`dist${route}/index.html`, 'utf8');
const before = JSON.parse(await readFile(`${dir}/before-local.json`, 'utf8'));
const extract = (html, pattern) => html.match(pattern)?.[1] || '';
const title = extract(html, /<title>(.*?)<\/title>/s);
const description = extract(html, /<meta name="description" content="([^"]*)"/);
const { getPublicRoutes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const duplicates = [];
for (const item of getPublicRoutes()) {
  if (item.path === route) continue;
  const other = await readFile(`dist${item.path}/index.html`, 'utf8');
  if (extract(other, /<title>(.*?)<\/title>/s) === title || extract(other, /<meta name="description" content="([^"]*)"/) === description) duplicates.push(item.path);
}
assert.equal(duplicates.length, 0);
const unaffected = ['/ar/services/oil-change-dubai', '/services/car-service-dubai', '/services/mechanical-repair-dubai', '/brands/audi-service-dubai/oil-change'];
const retained = [];
for (const target of unaffected) {
  const old = await readFile(`${dir}/${before[target].file}`, 'utf8');
  const current = await readFile(`dist${target}/index.html`, 'utf8');
  const normalize = value => extract(value, /<main\b[^>]*>([\s\S]*?)<\/main>/).replace(/\/assets\/([^"\s]+)-[\w-]{8}\.(jpg|webp|png|svg)/g, '/assets/$1.$2');
  assert.equal(normalize(current), normalize(old), `Retained main content ${target}`);
  assert.equal(extract(current, /<title>(.*?)<\/title>/s), extract(old, /<title>(.*?)<\/title>/s), `Retained title ${target}`);
  retained.push(target);
}
const report = {checkedAt:new Date().toISOString(), passed:true, targetTitleAndMetaUniqueAcrossRoutes:getPublicRoutes().length, unchangedMainContentAndTitles:retained, heroBytes:{small:(await stat('public/images/paint-correction/workshop-floor-540.webp')).size, large:(await stat('public/images/paint-correction/workshop-floor-960.webp')).size}, productionBuild:JSON.parse(await readFile('release-qa.local/build-results.json', 'utf8')), oilChecks:JSON.parse(await readFile('docs/seo/oil-change-validation.json', 'utf8'))};
await writeFile(`${dir}/release-checks.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({passed:report.passed, uniqueRoutes:report.targetTitleAndMetaUniqueAcrossRoutes, unchanged:retained, heroBytes:report.heroBytes}));
