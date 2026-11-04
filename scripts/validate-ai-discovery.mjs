import assert from 'node:assert/strict';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { DISCOVERY_AGENTS, PRIORITY_PATHS, SITE_ORIGIN, htmlChecks, inspectHtml, markdownLinks, parseRobots, robotsPermission, sitemapLinks } from './ai-discovery-utils.mjs';

// Run after the production build. This checks published HTML, not source JSX.
// No network requests or ranking/citation estimates are made by this command.
const option = name => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3);
const dist = path.resolve(option('dist') ?? 'dist');
const out = path.resolve(option('out') ?? 'outputs/ai-visibility-2026-11-04');
const errors = [];
const warnings = [];

// Exercise the matching semantics on which access checks depend: longest agent,
// merged groups, wildcard exclusions, longest path and Allow winning a tie.
const fixture = parseRobots('User-agent: *\nDisallow: /\nUser-agent: Googlebot\nDisallow: /private\nAllow: /private/public\nUser-agent: Googlebot\nAllow: /same\nDisallow: /same\nDisallow: /*.pdf$');
assert.equal(robotsPermission(fixture, 'Googlebot', '/').allowed, true);
assert.equal(robotsPermission(fixture, 'Googlebot', '/private/record').allowed, false);
assert.equal(robotsPermission(fixture, 'Googlebot', '/private/public/record').allowed, true);
assert.equal(robotsPermission(fixture, 'Googlebot', '/same').allowed, true);
assert.equal(robotsPermission(fixture, 'Googlebot', '/manual.pdf').allowed, false);
assert.equal(robotsPermission(fixture, 'Googlebot', '/manual.pdf/notes').allowed, true);
assert.equal(robotsPermission(fixture, 'OAI-SearchBot', '/').allowed, false);
assert.equal(inspectHtml('<body><h1>Example</h1></body><meta name="robots" content="max-snippet:0">').restricted, true);
assert.equal(inspectHtml('<body><h1>Example</h1></body><meta name="robots" content="index, follow">').restricted, false);

const [robotsText, llmsText, sitemapText] = await Promise.all([
  readFile('public/robots.txt', 'utf8'), readFile('public/llms.txt', 'utf8'), readFile(path.join(dist, 'sitemap.xml'), 'utf8'),
]);
const robots = parseRobots(robotsText);
if (!robots.sitemaps.includes(`${SITE_ORIGIN}/sitemap.xml`)) errors.push('robots.txt does not identify the canonical sitemap.');
for (const name of ['robots.txt', 'llms.txt']) {
  const [source, built] = await Promise.all([readFile(`public/${name}`, 'utf8'), readFile(path.join(dist, name), 'utf8')]);
  if (source.replace(/\r\n/g, '\n') !== built.replace(/\r\n/g, '\n')) errors.push(`dist/${name} is stale; rebuild before release.`);
}
const sitemap = new Set(sitemapLinks(sitemapText));
const serverEntry = pathToFileURL(path.resolve('dist-server/entry-server.js')).href;
const { getPublicRoutes } = await import(serverEntry);
const routes = new Map(getPublicRoutes().map(route => [route.path, route]));
const linked = [...new Set(markdownLinks(llmsText))];
if (!linked.includes(`${SITE_ORIGIN}/brands/mercedes-benz-service-dubai`)) errors.push('Supplemental directory is missing the canonical Mercedes hub.');
for (const href of linked) {
  const url = new URL(href);
  if (url.origin !== SITE_ORIGIN || url.search || url.hash) { errors.push(`Directory link is not a clean canonical website URL: ${href}`); continue; }
  if (!routes.get(url.pathname)?.indexable || !sitemap.has(href)) errors.push(`Directory link is not an indexable sitemap owner: ${href}`);
}
const access = [];
for (const agent of [...DISCOVERY_AGENTS, 'GPTBot', 'ChatGPT-User', 'OtherCrawler']) {
  for (const pathname of PRIORITY_PATHS) {
    const result = robotsPermission(robots, agent, pathname);
    access.push({ agent, path: pathname, ...result });
    if (!result.allowed) errors.push(`${agent} is disallowed from ${pathname}.`);
  }
  for (const pathname of ['/wp-admin', '/wp-login']) {
    if (robotsPermission(robots, agent, pathname).allowed) errors.push(`${agent} lost the existing exclusion for ${pathname}.`);
  }
}
const pages = [];
for (const pathname of new Set([...PRIORITY_PATHS, ...linked.map(href => new URL(href).pathname)])) {
  if (!routes.get(pathname)?.indexable) { errors.push(`Priority route is not indexable: ${pathname}`); continue; }
  try {
    const page = inspectHtml(await readFile(path.join(dist, pathname.slice(1), 'index.html'), 'utf8'));
    const checks = { ...htmlChecks(page, pathname), sitemap: sitemap.has(`${SITE_ORIGIN}${pathname}`) };
    const failed = Object.entries(checks).filter(([, value]) => !value).map(([name]) => name);
    pages.push({ path: pathname, passed: failed.length === 0, checks, ...page });
    if (failed.length) errors.push(`${pathname}: ${failed.join(', ')}`);
  } catch (error) { errors.push(`${pathname}: ${error.message}`); }
}
warnings.push('robots.txt permissions and readable build HTML do not establish production CDN access, indexing, AI recommendations or citations.');
warnings.push('llms.txt is a supplemental directory, not a Google Search ranking or eligibility requirement.');
const report = { checkedAt: new Date().toISOString(), scope: 'local production build', dist, passed: errors.length === 0, linkedUrls: linked.length, pages, access, errors, warnings };
await mkdir(out, { recursive: true });
await writeFile(path.join(out, 'local-discovery.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ passed: report.passed, pages: pages.length, directoryUrls: linked.length, errors, warnings, report: path.join(out, 'local-discovery.json') }, null, 2));
if (!report.passed) process.exitCode = 1;
