import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DISCOVERY_AGENTS, PRIORITY_PATHS, SITE_ORIGIN, htmlChecks, inspectHtml, parseRobots, robotsPermission, sitemapLinks } from './ai-discovery-utils.mjs';

// Read-only GETs: no forms, lead events, indexing requests or settings changes.
// Run after deployment; --origin=http://localhost:4173 can inspect a preview.
const option = name => process.argv.find(value => value.startsWith(`--${name}=`))?.slice(name.length + 3);
const inputOrigin = new URL(option('origin') ?? SITE_ORIGIN);
if (!['https:', 'http:'].includes(inputOrigin.protocol) || inputOrigin.username || inputOrigin.password || inputOrigin.pathname !== '/' || inputOrigin.search || inputOrigin.hash) throw new Error('--origin must be a plain HTTP(S) origin without credentials, a path or query.');
const origin = inputOrigin.origin;
const out = path.resolve(option('out') ?? 'outputs/ai-visibility-2026-11-04');
const paths = PRIORITY_PATHS.filter(value => ['/', '/brands/mercedes-benz-service-dubai', '/services/mercedes-diagnostics-dubai', '/mercedes/problems/airmatic-malfunction', '/tuning/mercedes-amg-g63', '/ar/brands/mercedes-benz-service-dubai'].includes(value));
const agents = {
  baseline: 'DIGI-TEC Discovery Check/1.0',
  'OAI-SearchBot': 'Mozilla/5.0 (compatible; OAI-SearchBot/1.4; +https://openai.com/searchbot)',
  Googlebot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  bingbot: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
};
async function request(pathname, agent) {
  const started = Date.now();
  try {
    const response = await fetch(`${origin}${pathname}`, {
      method: 'GET', redirect: 'manual',
      headers: { 'user-agent': agents[agent], 'cache-control': 'no-cache' },
      signal: AbortSignal.timeout(15000),
    });
    return { path: pathname, agent, status: response.status, location: response.headers.get('location'), contentType: response.headers.get('content-type'), xRobotsTag: response.headers.get('x-robots-tag'), seconds: (Date.now() - started) / 1000, body: await response.text() };
  } catch (error) {
    return { path: pathname, agent, status: null, seconds: (Date.now() - started) / 1000, error: error.message, networkErrorCode: error.cause?.code ?? error.code ?? null };
  }
}
const infrastructure = await Promise.all(['/robots.txt', '/sitemap.xml', '/llms.txt'].map(value => request(value, 'baseline')));
const robotsResponse = infrastructure.find(item => item.path === '/robots.txt');
const robots = robotsResponse.status === 200 ? parseRobots(robotsResponse.body) : null;
const sitemapResponse = infrastructure.find(item => item.path === '/sitemap.xml');
const sitemap = new Set(sitemapResponse.status === 200 ? sitemapLinks(sitemapResponse.body) : []);
const probes = [];
const queue = paths.flatMap(pathname => Object.keys(agents).map(agent => ({ pathname, agent })));
let cursor = 0;
await Promise.all(Array.from({ length: 4 }, async () => {
  while (cursor < queue.length) {
    const { pathname, agent } = queue[cursor++];
    const result = await request(pathname, agent);
    const page = result.body ? inspectHtml(result.body) : null;
    const checks = {
      status: result.status === 200,
      contentType: /text\/html/i.test(result.contentType ?? ''),
      headerSnippetEligible: !/(?:^|[,\s:])(?:noindex|none|nosnippet)(?:$|[,\s])|max-snippet\s*:\s*0(?:$|[,\s])/i.test(result.xRobotsTag ?? ''),
      ...(page ? htmlChecks(page, pathname) : { readableHtml: false }),
      sitemap: sitemap.has(`${SITE_ORIGIN}${pathname}`),
      robots: robots ? DISCOVERY_AGENTS.every(token => robotsPermission(robots, token, pathname).allowed) : false,
    };
    const { body, ...http } = result;
    probes.push({ ...http, probeType: agent === 'baseline' ? 'baseline_http' : 'simulated_user_agent', actualCrawlerOriginVerified: false, page, checks, passed: Object.values(checks).every(Boolean) });
  }
}));
const report = {
  checkedAt: new Date().toISOString(), origin, scope: 'HTTP response probes from the current execution environment',
  passed: infrastructure.every(item => item.status === 200) && probes.every(item => item.passed),
  actualCrawlerAccessVerified: false,
  indexingVerified: false, aiRecommendationsMeasured: false,
  interpretation: [
    'A copied user-agent tests response behavior only. It cannot prove access from genuine OpenAI, Google or Bing IP addresses.',
    'Confirm genuine crawler requests in production CDN/server logs against each provider\'s published IP ranges or verification procedure.',
    'Google-Extended has no independent HTTP user-agent. This checker evaluates its robots.txt token, not a simulated Google-Extended request.',
    'Network failures describe this execution environment; they do not prove a production outage or crawler block.',
    'Successful responses do not prove indexing, ranking, citation frequency or future inclusion in AI answers.',
  ],
  infrastructure: infrastructure.map(({ body, ...record }) => ({ ...record, bytes: Buffer.byteLength(body ?? ''), ...(record.path === '/robots.txt' ? { body } : {}) })),
  probes: probes.sort((a, b) => a.path.localeCompare(b.path) || a.agent.localeCompare(b.agent)),
};
await mkdir(out, { recursive: true });
await writeFile(path.join(out, 'http-discovery.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ passed: report.passed, origin, probes: probes.length, failures: probes.filter(item => !item.passed).map(({ path, agent, status, error, networkErrorCode, checks }) => ({ path, agent, status, error, networkErrorCode, failedChecks: Object.entries(checks).filter(([, value]) => !value).map(([name]) => name) })), actualCrawlerAccessVerified: false, report: path.join(out, 'http-discovery.json') }, null, 2));
if (!report.passed) process.exitCode = 1;
