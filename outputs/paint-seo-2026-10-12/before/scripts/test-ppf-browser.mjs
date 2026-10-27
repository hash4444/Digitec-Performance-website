import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
let base = process.argv[3] || 'http://127.0.0.1:4173';
const route = '/services/paint-protection-film';
const output = process.env.QA_OUTPUT_DIR || 'ppf-qa.local';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
let builtServer;
if (process.argv.includes('--prerendered')) {
  // Vite preview falls back to the homepage for slashless directory URLs.
  // Serve the built HTML at its canonical path, as the generated edge router
  // does, so these checks actually exercise PPF hydration and initial CSS.
  const dist = path.resolve('dist');
  builtServer = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const filePath = path.resolve(dist, `.${pathname}`, path.extname(pathname) ? '' : 'index.html');
      if (!filePath.startsWith(`${dist}${path.sep}`)) { response.writeHead(404); response.end(); return; }
      const content = await readFile(filePath);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };
      response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
      response.end(content);
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise((resolve) => builtServer.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${builtServer.address().port}`;
}
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const requests = [];
const events = [];
const errors = [];
await context.exposeFunction('capturePpfEvent', (event) => events.push(event));
// Local QA must never send enquiries or analytics to production services.
await context.route('**/*', async (request) => {
  if (request.request().url().startsWith(base)) return request.continue();
  requests.push(request.request().url());
  return request.abort();
});
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
const ready = async () => {
  await page.goto(`${base}${route}`);
  await page.locator('#ppf-heading').waitFor();
  await page.waitForFunction(() => document.querySelector('#ppf-quote-form button[type=submit]')?.disabled === false);
  await page.locator('.ppf-hero-image img').evaluate((img) => img.decode());
  await page.evaluate(() => {
    window.dataLayer = [];
    window.dataLayer.push = (...items) => {
      items.forEach((item) => window.capturePpfEvent(item));
      return Array.prototype.push.apply(window.dataLayer, items);
    };
    window.gtag = (...args) => window.dataLayer.push(args);
  });
};
try {
  await ready();
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('h1').textContent(), 'Paint Protection Film (PPF) Dubai');
  assert.equal(await page.title(), 'PPF Dubai | Paint Protection Film for Cars | DIGI-TEC');
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://digitecme.com${route}`);
  assert.equal(await page.locator('.ppf-faqs details').count(), 14);
  assert.equal(await page.locator('.ppf-brand-links a').count(), 9);
  for (const img of await page.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((element) => element.decode());
    assert.ok(await img.evaluate((element) => element.naturalWidth > 0));
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `${output}/desktop.png`, fullPage: false });
  await page.screenshot({ path: `${output}/desktop-full.png`, fullPage: true });
  await page.locator('.ppf-faqs summary').first().click();
  assert.equal(await page.locator('.ppf-faqs details').first().getAttribute('open'), '');
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert.equal(await overflow(), false, 'Desktop page overflows horizontally');
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await overflow(), false, `Page overflows at ${width}px`);
    assert.equal(await page.locator('.ppf-mobile-contact').isVisible(), true);
    await page.screenshot({ path: `${output}/mobile-${width}.png`, fullPage: false });
    if (width === 390) await page.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => { document.documentElement.classList.add('theme-light'); scrollTo(0, 0); });
  await page.screenshot({ path: `${output}/light-full.png`, fullPage: true });
  await page.locator('#ppf-coverage').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/light-coverage.png` });
  await page.locator('#ppf-workshop').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/workshop.png` });
  await page.evaluate(() => document.documentElement.classList.remove('theme-light'));
  await page.goto(`${base}/services/ceramic-coating`);
  await page.locator('a[href^="/services/paint-protection-film"]').first().click();
  await page.locator('#ppf-heading').waitFor();
  await page.goto(`${base}${route}#ppf-comparison`);
  await page.waitForFunction(() => Math.abs(document.getElementById('ppf-comparison')?.getBoundingClientRect().top - 100) < 10);
  await ready();
  // All PPF WhatsApp anchors pass through the existing delegated tracking once.
  const ctas = await page.locator('a[data-cta-placement^=ppf_][href*="wa.me"]').count();
  for (let index = 0; index < ctas; index++) {
    events.length = 0;
    await page.locator('a[data-cta-placement^=ppf_][href*="wa.me"]').nth(index).evaluate((a) => {
      a.addEventListener('click', (event) => event.preventDefault(), { once: true });
      a.click();
    });
    await page.waitForFunction(() => window.dataLayer.length > 0);
    assert.equal(events.filter((e) => e.event === 'whatsapp_click').length, 1);
    assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'whatsapp_chat_opened').length, 1);
    assert.ok(!JSON.stringify(events).includes('?text='));
  }
  events.length = 0;
  await page.locator('a[data-cta-placement="ppf_hero"][href^="tel:"]').evaluate((a) => {
    a.addEventListener('click', (event) => event.preventDefault(), { once: true }); a.click();
  });
  assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'telephone_link_clicked').length, 1);
  events.length = 0;
  await page.locator('#ppf-quote-form button[type=submit]').click();
  assert.equal(events.length, 0, 'Empty form must not record completion');
  const sentinel = 'QA-private-value-&-Ω';
  await page.getByLabel('Vehicle brand', { exact: true }).fill(sentinel);
  await page.getByLabel('Vehicle model', { exact: true }).fill('911 Test & Model');
  await page.getByLabel('Year', { exact: true }).fill('2025');
  await page.getByRole('combobox', { name: 'Requested coverage' }).click();
  await page.getByRole('option', { name: 'Full Front', exact: true }).click();
  assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'quote_started').length, 1);
  const nav = page.waitForRequest((request) => request.url().startsWith('https://wa.me/'));
  await page.locator('#ppf-quote-form button[type=submit]').click();
  const destination = new URL((await nav).url());
  assert.ok(destination.searchParams.get('text').includes(sentinel));
  assert.ok(destination.searchParams.get('text').includes('Full Front'));
  assert.equal(events.filter((e) => e.event === 'whatsapp_click').length, 1);
  assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'whatsapp_draft_opened').length, 1);
  assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'whatsapp_chat_opened').length, 0);
  assert.ok(!JSON.stringify(events).includes(sentinel), 'Entered details leaked to analytics');
  assert.ok(!JSON.stringify(events).includes('911 Test'));
  assert.ok(!JSON.stringify(events).includes('?text='));
  if (process.argv.includes('--prerendered')) {
    const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    await staticContext.route('**/*', (request) => request.request().url().startsWith(base) ? request.continue() : request.abort());
    const staticPage = await staticContext.newPage();
    await staticPage.goto(`${base}${route}`);
    assert.equal(await staticPage.locator('.ppf-hero').evaluate((element) => getComputedStyle(element).display), 'grid');
    assert.equal(await staticPage.locator('.ppf-faqs details').count(), 14);
    assert.equal(await staticPage.locator('#ppf-quote-form button[type=submit]').isDisabled(), true);
    await staticPage.locator('.ppf-faqs summary').first().click();
    assert.equal(await staticPage.locator('.ppf-faqs details').first().getAttribute('open'), '');
    await staticContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ passed: true, base, prerenderedWithoutJavaScript: process.argv.includes('--prerendered'), viewportWidths: [1440, 390, 320], whatsappCtas: ctas, quoteEvents: events, externalRequestsBlocked: requests.length, errors }, null, 2));
  console.log(`PPF browser checks passed: desktop/mobile, metadata, FAQ, ${ctas} WhatsApp CTAs, call, quote validation, event counts and privacy. External requests were blocked.`);
} finally {
  await browser.close();
  if (builtServer) await new Promise((resolve) => builtServer.close(resolve));
}
