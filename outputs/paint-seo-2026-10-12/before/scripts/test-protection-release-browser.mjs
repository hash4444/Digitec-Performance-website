import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
const base = process.argv[3] || 'http://127.0.0.1:5190';
const output = 'release-qa.local/integration';
await mkdir(output, { recursive: true });
const pages = [
  { route: '/services/paint-protection-film', h1: 'Paint Protection Film (PPF) Dubai', marker: '#ppf-quote-form button[type=submit]:not([disabled])' },
  { route: '/services/ceramic-coating', h1: 'Ceramic Coating Dubai', marker: '.cc-faq button[aria-expanded]' },
  { route: '/services/car-polishing-dubai', h1: 'Car Polishing & Paint Correction Dubai', marker: '#paint-assessment-form button[type=submit]:not([disabled])' },
];
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.route('**/*', (request) => new URL(request.request().url()).origin === base ? request.continue() : request.abort());
const page = await context.newPage();
const errors = [];
const failedLocalResponses = [];
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error' && /hydrat|Minified React error|chunk/i.test(message.text())) errors.push(message.text()); });
page.on('response', (response) => { if (response.url().startsWith(base) && response.status() >= 400) failedLocalResponses.push({ url: response.url(), status: response.status() }); });
async function check(spec) {
  await page.locator(spec.marker).first().waitFor({ state: 'attached' });
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('h1').textContent(), spec.h1);
  assert.equal(await page.locator('link[rel=canonical]').count(), 1);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://digitecme.com${spec.route}`);
  assert.ok(!(await page.locator('body').innerText()).includes('Service Not Found'));
  const nodes = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.flatMap((script) => { const graph = JSON.parse(script.textContent); return graph['@graph'] || [graph]; }));
  const service = nodes.filter((node) => node['@type'] === 'Service');
  assert.equal(service.length, 1, `One current Service graph after navigation to ${spec.route}`);
  assert.equal(service[0]['@id'], `https://digitecme.com${spec.route}#service`);
  assert.equal(service[0].provider['@id'], 'https://digitecme.com/#business');
  assert.equal(nodes.filter((node) => node['@type'] === 'BreadcrumbList').length, 1);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
}
const requests = [];
try {
  for (const spec of pages) {
    for (const suffix of ['', '?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=release_qa', '/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=release_slash']) {
      const url = `${base}${spec.route}${suffix}`;
      const response = await context.request.get(url, { maxRedirects: 0 });
      if (suffix.startsWith('/')) {
        assert.equal(response.status(), 308);
        assert.equal(response.headers().location, url.replace(`${spec.route}/?`, `${spec.route}?`));
      } else {
        assert.equal(response.status(), 200);
        assert.ok((await response.text()).includes(spec.h1.replaceAll('&', '&amp;')), `Initial HTML: ${url}`);
      }
      requests.push({ path: spec.route + suffix, status: response.status(), location: response.headers().location });
      await page.goto(url);
      await check(spec);
      await page.reload();
      await check(spec);
    }
  }
  await page.goto(`${base}/services`);
  for (const spec of pages) assert.equal(await page.locator(`a[href="${spec.route}"]`).count(), 1);
  await page.locator(`a[href="${pages[0].route}"]`).click();
  await check(pages[0]);
  for (const spec of [pages[1], pages[2], pages[0]]) {
    await page.locator(`main a[href="${spec.route}"]:visible`).first().click();
    await check(spec);
  }
  await page.goBack(); await check(pages[2]);
  await page.goForward(); await check(pages[0]);
  for (const spec of pages) {
    await page.goto(`${base}${spec.route}`);
    await check(spec);
    const other = pages.find((item) => item !== spec);
    await page.locator(`main a[href="${other.route}"]:visible`).first().click();
    await check(other);
    await page.goBack(); await check(spec);
  }
  const missing = await context.request.get(`${base}/services/release-check-does-not-exist`);
  assert.equal(missing.status(), 404);
  assert.ok(missing.headers()['x-robots-tag'].includes('noindex'));
  assert.deepEqual(errors, []);
  assert.deepEqual(failedLocalResponses, []);
  const build = JSON.parse(await readFile('release-qa.local/build-results.json', 'utf8'));
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ passed: true, testedAt: new Date().toISOString(), sourceSha256: build.sourceSha256, requests, spaNavigation: 'directory to PPF to ceramic to polishing to PPF; back, forward and return checks passed', runtimeOrHydrationErrors: errors, failedLocalResponses, unknownServiceStatus: 404 }, null, 2));
  console.log('Combined browser routing passed: initial HTTP/HTML, clean and tagged URLs, slash redirects, reloads, directory/cross-service SPA navigation, back/forward, canonical/schema replacement and real unknown-route 404.');
} finally { await browser.close(); }
