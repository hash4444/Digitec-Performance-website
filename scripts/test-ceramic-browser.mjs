import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
const base = process.argv[3] || 'http://127.0.0.1:5187';
const route = '/services/ceramic-coating';
const output = process.env.QA_OUTPUT_DIR || 'ceramic-qa.local';
const buildDist = process.argv[4] || 'ceramic-qa.local/build/dist';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const errors = [];
let externalBlocked = 0;
// No production analytics, WhatsApp enquiries or external page visits during QA.
await context.route('**/*', (request) => {
  if (new URL(request.request().url()).origin === base) return request.continue();
  externalBlocked++;
  return request.abort();
});
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
try {
  await page.goto(`${base}${route}`);
  await page.locator('#ceramic-heading').waitFor();
  await page.waitForFunction(() => !!document.querySelector('.cc-faq button[aria-expanded]'));
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('h1').textContent(), 'Ceramic Coating Dubai');
  assert.equal(await page.title(), 'Ceramic Coating Dubai | Car Paint Protection | DIGI-TEC');
  assert.equal(await page.locator('link[rel=canonical]').count(), 1);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://digitecme.com${route}`);
  assert.equal(await page.locator('.cc-faq button').count(), 16);
  assert.equal(await page.locator('.cc-brand-links a').count(), 9);
  assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'index, follow, max-image-preview:large');
  if (!base.endsWith(':5173')) {
    const legacy = await context.request.get(`${base}/ceramic-coating`, { maxRedirects: 0 });
    assert.equal(legacy.status(), 308);
    assert.equal(legacy.headers().location, `${base}${route}`);
    const arabicLegacy = await context.request.get(`${base}/ar/ceramic-coating`, { maxRedirects: 0 });
    assert.equal(arabicLegacy.status(), 308);
    assert.equal(arabicLegacy.headers().location, `${base}/ar${route}`);
    assert.equal((await context.request.get(`${base}/not-a-real-ceramic-page`)).status(), 404);
  }
  const routeGraph = await page.locator('script[data-route-jsonld=true]').textContent();
  const nodes = JSON.parse(routeGraph)['@graph'];
  assert.deepEqual(nodes.map((node) => node['@type']).sort(), ['BreadcrumbList', 'Service', 'WebPage']);
  for (const img of await page.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((image) => image.decode());
    assert.ok(await img.evaluate((image) => image.naturalWidth > 0));
    assert.ok(await img.getAttribute('width'));
    assert.ok(await img.getAttribute('height'));
  }
  // Confirm every crawlable internal destination and fragment in page content.
  const hrefs = await page.locator('main a[href]').evaluateAll((anchors) => [...new Set(anchors.map((a) => a.getAttribute('href')))]);
  for (const href of hrefs.filter((href) => href.startsWith('/') || href.startsWith('#'))) {
    const target = new URL(href, `${base}${route}`);
    if (href.startsWith('#')) { assert.equal(await page.locator(target.hash).count(), 1, href); continue; }
    const response = await context.request.get(target.href);
    assert.equal(response.status(), 200, href);
    if (target.hash && !base.endsWith(':5173')) assert.ok((await response.text()).includes(`id="${target.hash.slice(1)}"`), href);
  }
  const firstFaq = page.locator('.cc-faq button').first();
  await firstFaq.click();
  assert.equal(await firstFaq.getAttribute('aria-expanded'), 'true');
  await firstFaq.press('Enter');
  assert.equal(await firstFaq.getAttribute('aria-expanded'), 'false');
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await overflow(), false, `Horizontal overflow at ${width}px`);
    if (width < 768) {
      assert.equal(await page.locator('.cc-mobile-contact').isVisible(), true);
      assert.equal(await page.locator('.ppf-mobile-contact').count(), 0);
    }
    await page.screenshot({ path: `${output}/ceramic-${width}.png`, fullPage: false });
    if (width !== 320) await page.screenshot({ path: `${output}/ceramic-${width}-full.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole('button', { name: 'Use light theme', exact: true }).click();
  await page.screenshot({ path: `${output}/ceramic-light-full.png`, fullPage: true });
  await page.getByRole('button', { name: 'Use dark theme', exact: true }).click();
  // Check at 200% text size for usable wrapping and page overflow.
  await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(await overflow(), false, 'Overflow with 200% text');
  await page.screenshot({ path: `${output}/ceramic-large-text.png`, fullPage: false });
  await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => {
    window.gtag = (...args) => window.dataLayer.push({ ga4: args });
    document.addEventListener('click', (event) => {
      if (event.target.closest('a[data-cta-placement^="ceramic_"]')) event.preventDefault();
    });
  });
  const contacts = page.locator('a[data-cta-placement^="ceramic_"]');
  const count = await contacts.count();
  for (let index = 0; index < count; index++) {
    const anchor = contacts.nth(index);
    const href = await anchor.getAttribute('href');
    await page.evaluate(() => { window.dataLayer = []; });
    await anchor.evaluate((a) => a.click());
    const events = await page.evaluate(() => window.dataLayer);
    const expected = href.startsWith('tel:') ? 'telephone_link_clicked' : href.startsWith('mailto:') ? 'email_link_clicked' : href.includes('wa.me') ? 'whatsapp_chat_opened' : 'directions_clicked';
    assert.equal(events.filter((event) => event.ga4?.[1] === expected).length, 1, href);
    if (href.includes('wa.me')) {
      assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 1);
      assert.ok(!JSON.stringify(events).includes('?text='));
      assert.ok(!JSON.stringify(events).includes('Make/model'));
      assert.equal(events.find((event) => event.event === 'whatsapp_click').page_path, route);
      assert.equal(new URL(href).pathname, '/97143402223');
    }
  }
  // FAQ content and page styling also work without hydration.
  if (!base.endsWith(':5173')) {
    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    await noJs.route('**/*', (request) => new URL(request.request().url()).origin === base ? request.continue() : request.abort());
    const staticPage = await noJs.newPage();
    await staticPage.goto(`${base}${route}`);
    assert.equal(await staticPage.locator('h1').textContent(), 'Ceramic Coating Dubai');
    assert.equal(await staticPage.locator('.cc-faq [role=region]').count(), 16);
    assert.equal(await staticPage.locator('.cc-faq [role=region]').last().isVisible(), true);
    assert.equal(await staticPage.locator('.cc-faq [role=region]').last().evaluate((element) => getComputedStyle(element).animationName), 'none', 'No-JavaScript answers must not run the closing animation');
    const raw = await readFile(path.join(buildDist, 'services/ceramic-coating/index.html'), 'utf8');
    assert.ok(raw.includes('There is no universal lifespan'));
    assert.equal(await staticPage.locator('.cc-hero').evaluate((el) => getComputedStyle(el).display), 'grid');
    await staticPage.screenshot({ path: `${output}/ceramic-no-js.png`, fullPage: false });
    await noJs.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  await writeFile(`${output}/ceramic-browser-results.json`, JSON.stringify({ passed: true, viewports: [1440, 390, 320], contactsTested: count, internalLinksTested: hrefs.length, externalBlocked, errors }, null, 2));
  console.log(`Ceramic browser QA passed: ${count} contact links, single WhatsApp events, privacy, ${hrefs.length} links, FAQ, desktop/mobile, 200% text and light/dark themes.`);
} finally { await browser.close(); }
