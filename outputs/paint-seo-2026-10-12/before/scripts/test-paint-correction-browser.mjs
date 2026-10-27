import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
const base = process.argv[3] || 'http://127.0.0.1:5176';
const route = '/services/car-polishing-dubai';
const output = process.env.QA_OUTPUT_DIR || 'paint-correction-qa.local';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const events = [];
const errors = [];
const requests = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
await context.exposeFunction('capturePaintEvent', (event) => events.push(event));
const blockExternal = async (request) => {
  if (request.request().url().startsWith(base)) return request.continue();
  requests.push(request.request().url());
  return request.abort();
};
await context.route('**/*', blockExternal);
await context.addInitScript(() => {
  window.paintMetrics = { lcpMs: null, cls: 0 };
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.paintMetrics.lcpMs = entry.startTime;
  }).observe({ type: 'largest-contentful-paint', buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.paintMetrics.cls += entry.value;
  }).observe({ type: 'layout-shift', buffered: true });
});
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
const initTracking = async () => page.evaluate(() => {
  window.dataLayer = [];
  window.dataLayer.push = (...items) => {
    items.forEach((item) => window.capturePaintEvent(item));
    return Array.prototype.push.apply(window.dataLayer, items);
  };
  window.gtag = (...args) => window.dataLayer.push(args);
});
try {
  await page.goto(`${base}${route}`);
  await page.locator('#paint-title').waitFor();
  await page.locator('.paint-hero-photo img').evaluate((image) => image.decode());
  await initTracking();
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('h1').textContent(), 'Car Polishing & Paint Correction Dubai');
  assert.equal(await page.title(), 'Car Polishing & Paint Correction Dubai | DIGI-TEC');
  assert.equal(await page.locator('.paint-brands a').count(), 9);
  assert.equal(await page.locator('.paint-faqs details').count(), 16);
  assert.equal(await page.locator('link[hreflang="ar-AE"]').count(), 0);
  assert.equal(await page.locator('#paint-projects').count(), 0);
  assert.equal(await page.locator('.paint-price').first().textContent(), 'Price based on vehicle & paint condition');
  await page.screenshot({ path: `${output}/desktop.png` });
  await page.waitForFunction(() => window.paintMetrics.lcpMs !== null, null, { timeout: 10000 });
  const desktopMetrics = await page.evaluate(() => window.paintMetrics);
  await page.locator('.paint-workshop img').scrollIntoViewIfNeeded();
  await page.locator('.paint-workshop img').evaluate((image) => image.decode());
  await page.screenshot({ path: `${output}/desktop-full.png`, fullPage: true });
  await page.locator('.paint-faqs summary').first().click();
  assert.equal(await page.locator('.paint-faqs details').first().getAttribute('open'), '');
  await page.locator('.paint-faqs summary').first().press('Enter');
  assert.equal(await page.locator('.paint-faqs details').first().getAttribute('open'), null);
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert.equal(await overflow(), false);
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await overflow(), false, `Horizontal overflow at ${width}px`);
    assert.ok(await page.locator('.paint-mobile-contact').isVisible());
    await page.screenshot({ path: `${output}/mobile-${width}.png` });
    if (width === 390) {
      await page.locator('#paint-assessment').scrollIntoViewIfNeeded();
      await page.screenshot({ path: `${output}/mobile-form.png` });
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => document.documentElement.classList.add('theme-light'));
  await page.locator('#paint-problems').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/light.png` });
  await page.locator('#paint-assessment').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/light-form.png` });
  await page.evaluate(() => document.documentElement.classList.remove('theme-light'));
  const whatsapps = page.locator('a[data-cta-placement^="paint_"][href*="wa.me"]');
  const ctaCount = await whatsapps.count();
  for (let index = 0; index < ctaCount; index++) {
    events.length = 0;
    await whatsapps.nth(index).evaluate((anchor) => {
      anchor.addEventListener('click', (event) => event.preventDefault(), { once: true }); anchor.click();
    });
    assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 1);
    assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'whatsapp_chat_opened').length, 1);
    assert.ok(!JSON.stringify(events).includes('?text='));
  }
  events.length = 0;
  await page.locator('a[data-cta-placement="paint_contact"][href^="tel:"]').first().evaluate((anchor) => {
    anchor.addEventListener('click', (event) => event.preventDefault(), { once: true }); anchor.click();
  });
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'telephone_link_clicked').length, 1);
  events.length = 0;
  await page.locator('#paint-assessment-form button[type=submit]').click();
  assert.equal(events.length, 0, 'Empty form must not create a contact event');
  const sentinel = 'QA private Ω & value';
  await page.getByLabel('Vehicle brand', { exact: true }).fill('   ');
  await page.getByLabel('Vehicle model', { exact: true }).fill('Model-Test');
  await page.getByLabel('Year', { exact: true }).fill('2025');
  await page.locator('#paint-assessment-form button[type=submit]').click();
  assert.ok(await page.getByRole('alert').filter({ hasText: 'Please enter your vehicle' }).isVisible());
  await page.getByLabel('Vehicle brand', { exact: true }).fill(sentinel);
  await page.getByLabel('Year', { exact: true }).fill('1800');
  await page.locator('#paint-assessment-form button[type=submit]').click();
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 0);
  await page.getByLabel('Year', { exact: true }).fill('2025');
  await page.getByRole('combobox', { name: 'Main concern', exact: true }).click();
  await page.getByRole('option', { name: 'Scratches', exact: true }).click();
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'quote_started').length, 1);
  assert.ok(!JSON.stringify(events).includes(sentinel));
  const draftRequest = page.waitForRequest((request) => request.url().startsWith('https://wa.me/'));
  await page.locator('#paint-assessment-form button[type=submit]').click();
  const draft = new URL((await draftRequest).url());
  assert.ok(draft.searchParams.get('text').includes(sentinel));
  assert.ok(draft.searchParams.get('text').includes('Main concern: Scratches'));
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 1);
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'whatsapp_draft_opened').length, 1);
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'whatsapp_chat_opened').length, 0);
  assert.ok(!JSON.stringify(events).includes(sentinel));
  assert.ok(!JSON.stringify(events).includes('Model-Test'));
  assert.ok(!JSON.stringify(events).includes('?text='));
  assert.deepEqual(errors, []);
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  await noJsContext.route('**/*', blockExternal);
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(`${base}${route}`);
  assert.equal(await noJsPage.locator('h1').count(), 1);
  assert.equal(await noJsPage.locator('.paint-faqs details').count(), 16);
  assert.equal(await noJsPage.locator('.paint-hero').evaluate((element) => getComputedStyle(element).display), 'grid');
  await noJsPage.screenshot({ path: `${output}/no-javascript.png` });
  await noJsContext.close();
  const mobilePerfPage = await context.newPage();
  await mobilePerfPage.setViewportSize({ width: 390, height: 844 });
  const cdp = await context.newCDPSession(mobilePerfPage);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 200000, uploadThroughput: 93750 });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  await mobilePerfPage.goto(`${base}${route}`);
  await mobilePerfPage.locator('.paint-hero-photo img').evaluate((image) => image.decode());
  await mobilePerfPage.screenshot({ path: `${output}/mobile-performance.png` });
  await mobilePerfPage.waitForFunction(() => window.paintMetrics.lcpMs !== null, null, { timeout: 10000 });
  const mobileMetrics = await mobilePerfPage.evaluate(() => window.paintMetrics);
  await mobilePerfPage.close();
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ passed: true, viewports: [1440, 390, 320], whatsappCtas: ctaCount, runtimeErrors: errors, quoteEvents: events, localDesktopMetrics: desktopMetrics, localMobileMetrics: mobileMetrics, mobileEmulation: { latencyMs: 150, downloadMbps: 1.6, uploadMbps: 0.75, cpuSlowdown: 4 }, externalRequestsBlocked: requests.length, noJavaScript: 'content and CSS verified' }, null, 2));
  console.log(`Paint correction browser checks passed: ${ctaCount} WhatsApp CTAs, call, form validation, one start/contact event, no entered data in analytics, desktop/mobile, light theme, FAQ keyboard operation and no-JavaScript rendering.`);
  console.log(`Local desktop timing only (not field Core Web Vitals): ${JSON.stringify(desktopMetrics)}`);
  console.log(`Local mobile timing with network/CPU emulation (not field Core Web Vitals): ${JSON.stringify(mobileMetrics)}`);
} finally { await browser.close(); }
