import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
const base = process.argv[3] || 'http://127.0.0.1:5194';
const output = 'paint-care-integration-qa.local';
await mkdir(output, { recursive: true });
const specs = [
  { key: 'ppf', path: '/services/paint-protection-film', h1: 'Paint Protection Film (PPF) Dubai', form: '#ppf-quote-form', faq: '.ppf-faqs summary', count: 14, selector: '#ppf-requested-coverage', service: 'ppf' },
  { key: 'ceramic', path: '/services/ceramic-coating', h1: 'Ceramic Coating Dubai', faq: '.cc-faq button', count: 16 },
  { key: 'paint', path: '/services/car-polishing-dubai', h1: 'Car Polishing & Paint Correction Dubai', form: '#paint-assessment-form', faq: '.paint-faqs summary', count: 16, selector: '#paint-concern', service: 'paint_correction' },
];
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const events = [];
const errors = [];
let externalBlocked = 0;
await context.exposeFunction('captureClusterEvent', (event) => events.push(event));
await context.route('**/*', (route) => {
  if (new URL(route.request().url()).origin === base) return route.continue();
  externalBlocked++;
  return route.abort();
});
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
const initTracking = async () => {
  await page.evaluate(() => {
    window.dataLayer = [];
    window.dataLayer.push = (...items) => { items.forEach((item) => window.captureClusterEvent(item)); return Array.prototype.push.apply(window.dataLayer, items); };
    window.gtag = (...args) => window.dataLayer.push(args);
  });
  events.length = 0;
};
const ready = async (spec) => {
  await page.waitForFunction(({ route, h1 }) => location.pathname === route && document.querySelector('h1')?.textContent === h1 && document.querySelector('link[rel=canonical]')?.getAttribute('href') === `https://digitecme.com${route}`, { route: spec.path, h1: spec.h1 });
  if (spec.form) await page.locator(`${spec.form} button[type=submit]:not([disabled])`).waitFor();
  else await page.locator('.cc-faq button[aria-expanded]').first().waitFor();
};
const activateWhatsApp = async (locator, spec, keyboard = false) => {
  await initTracking();
  await locator.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault(), { once: true }));
  if (keyboard) { await locator.focus(); await locator.press('Enter'); } else await locator.click();
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 1);
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'whatsapp_chat_opened').length, 1);
  assert.equal(events.find((event) => event.event === 'whatsapp_click').page_path, spec.path);
  assert.ok(!JSON.stringify(events).includes('?text='));
};
const checkForm = async (spec) => {
  await ready(spec);
  await initTracking();
  const form = page.locator(spec.form);
  await form.locator('button[type=submit]').click();
  assert.equal(events.length, 0);
  await form.getByLabel('Vehicle brand', { exact: true }).fill('   ');
  await form.getByLabel('Vehicle model', { exact: true }).fill('Private Model Ω &');
  await form.getByLabel('Year', { exact: true }).fill('2025');
  await form.locator('button[type=submit]').click();
  assert.equal(await form.getByRole('alert').count(), 1);
  await form.getByLabel('Vehicle brand', { exact: true }).fill('Private Brand Ω &');
  await form.getByLabel('Year', { exact: true }).fill('1800');
  await form.locator('button[type=submit]').click();
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 0);
  await form.getByLabel('Year', { exact: true }).fill('2025');
  await page.locator(spec.selector).click();
  await page.getByRole('option', { name: spec.key === 'ppf' ? 'Full Front' : 'Scratches', exact: true }).click();
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'quote_started').length, 1);
  const request = page.waitForRequest((req) => req.url().startsWith('https://wa.me/'));
  await form.locator('button[type=submit]').click();
  const draft = new URL((await request).url());
  assert.equal(draft.pathname, '/97143402223');
  assert.ok(draft.searchParams.get('text').includes('Private Brand Ω &'));
  assert.ok(draft.searchParams.get('text').includes(spec.key === 'ppf' ? 'Requested coverage: Full Front' : 'Main concern: Scratches'));
  assert.equal(events.filter((event) => event.event === 'whatsapp_click').length, 1);
  const draftEvents = events.filter((event) => Array.isArray(event) && event[1] === 'whatsapp_draft_opened');
  assert.equal(draftEvents.length, 1);
  assert.equal(draftEvents[0][2].service, spec.service);
  assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'whatsapp_chat_opened').length, 0);
  assert.ok(!/Private Brand|Private Model|\?text=/.test(JSON.stringify(events)));
  assert.ok(!page.url().includes('vehicle_brand='));
};
const results = [];
try {
  for (const spec of specs) {
    await page.goto(base + spec.path); await ready(spec);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator(spec.faq).count(), spec.count);
    assert.equal(await page.locator('main [aria-label="Related paint care services"]').count(), 1);
    for (const image of await page.locator('main img').all()) { await image.scrollIntoViewIfNeeded(); await image.evaluate((element) => element.decode()); }
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
      await page.evaluate(() => scrollTo(0, 0));
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${spec.key} overflow at ${width}`);
      await page.screenshot({ path: `${output}/${spec.key}-${width}.png` });
    }
    const firstFaq = page.locator(spec.faq).first();
    await firstFaq.click();
    if (spec.key === 'ceramic') assert.equal(await firstFaq.getAttribute('aria-expanded'), 'true');
    else assert.equal(await firstFaq.evaluate((element) => element.parentElement.open), true);
    await firstFaq.press('Enter');
    if (spec.key === 'ceramic') assert.equal(await firstFaq.getAttribute('aria-expanded'), 'false');
    else assert.equal(await firstFaq.evaluate((element) => element.parentElement.open), false);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => document.documentElement.classList.add('theme-light'));
    await page.locator(spec.form || '#ceramic-cost').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${spec.key}-light.png` });
    await page.evaluate(() => document.documentElement.classList.remove('theme-light'));
    const contact = page.locator(`a[data-cta-placement^="${spec.key === 'paint' ? 'paint_' : spec.key + '_'}"][href*="wa.me"]`);
    const count = await contact.count();
    for (let index = 0; index < count; index++) {
      if (!(await contact.nth(index).isVisible())) await page.setViewportSize({ width: 390, height: 844 });
      await activateWhatsApp(contact.nth(index), spec, index === 0);
    }
    await initTracking();
    const phone = page.locator('a[data-cta-placement][href^="tel:"]').first();
    await phone.evaluate((anchor) => anchor.addEventListener('click', (event) => event.preventDefault(), { once: true }));
    await phone.click();
    assert.equal(events.filter((event) => Array.isArray(event) && event[1] === 'telephone_link_clicked').length, 1);
    results.push({ page: spec.path, viewports: [1440, 390, 320], whatsappActivations: count, keyboard: true, lightTheme: true, phone: true });
  }

  // A: PPF -> ceramic comparison -> PPF -> quote form.
  await page.goto(base + specs[0].path); await ready(specs[0]);
  await page.locator('main a[href="/services/ceramic-coating"]').click(); await ready(specs[1]);
  await page.locator('main a[href="/services/paint-protection-film"]').click(); await ready(specs[0]);
  await checkForm(specs[0]);
  // B: Ceramic -> preparation/correction -> assessment draft.
  await page.goto(base + specs[1].path); await ready(specs[1]);
  await page.locator('#ceramic-preparation a[href="/services/car-polishing-dubai"]').click(); await ready(specs[2]);
  await checkForm(specs[2]);
  // C: Polishing -> scratch explanation -> photos.
  await page.goto(base + specs[2].path); await ready(specs[2]);
  await activateWhatsApp(page.locator('a[data-cta-placement="paint_scratch_photo"]'), specs[2]);
  // D: A relevant brand context -> coating -> enquiry.
  await page.goto(base + '/brands/bmw-service-dubai');
  await page.locator('section[aria-label="BMW paint care"] a[href="/services/ceramic-coating"]').click(); await ready(specs[1]);
  await activateWhatsApp(page.locator('a[data-cta-placement="ceramic_hero"][href*="wa.me"]'), specs[1]);
  // E: Informational comparison -> PPF -> enquiry.
  await page.goto(base + '/blog/ceramic-coating-vs-ppf-dubai');
  await page.locator('article a[href="/services/paint-protection-film"]').click(); await ready(specs[0]);
  await activateWhatsApp(page.locator('a[data-cta-placement="ppf_hero"][href*="wa.me"]'), specs[0]);
  // Direct homepage and catalogue discovery.
  for (const source of ['/', '/services']) {
    await page.goto(base + source);
    await page.locator('a[href="/services/car-polishing-dubai"]').first().click(); await ready(specs[2]);
  }

  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await noJs.route('**/*', (route) => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const noJsPage = await noJs.newPage();
  for (const spec of specs) {
    await noJsPage.goto(base + spec.path);
    assert.equal(await noJsPage.locator('h1').textContent(), spec.h1);
    assert.equal(await noJsPage.locator(spec.faq).count(), spec.count);
    for (const other of specs.filter((candidate) => candidate !== spec)) assert.ok(await noJsPage.locator(`main a[href="${other.path}"]`).count());
    if (spec.form) {
      const form = noJsPage.locator(spec.form);
      assert.equal(await form.locator('button[type=submit]').isDisabled(), true);
      await form.getByLabel('Vehicle brand', { exact: true }).fill('Private NoJS');
      await form.getByLabel('Vehicle model', { exact: true }).fill('Private NoJS Model');
      await form.getByLabel('Year', { exact: true }).fill('2025');
      await form.getByLabel('Year', { exact: true }).press('Enter');
      await noJsPage.waitForTimeout(150);
      assert.equal(noJsPage.url(), base + spec.path, 'No GET fallback with form data');
    }
    await noJsPage.screenshot({ path: `${output}/${spec.key}-no-javascript.png` });
  }
  await noJs.close();
  assert.deepEqual(errors, []);
  const build = JSON.parse(await readFile('release-qa.local/build-results.json', 'utf8'));
  await writeFile(`${output}/journey-results.json`, JSON.stringify({ passed: true, checkedAt: new Date().toISOString(), sourceSha256: build.sourceSha256, pages: results, journeys: ['A: PPF/comparison/quote', 'B: ceramic/correction/assessment', 'C: scratch/photo', 'D: BMW/coating/enquiry', 'E: article/PPF/enquiry', 'Homepage and Services to polishing'], invalidFormsBlocked: true, noJavaScriptFormsDisabled: true, noEnteredDataInAnalytics: true, noDuplicateWhatsAppEvents: true, runtimeErrors: errors, externalBlocked }, null, 2));
  console.log('Paint-care journeys passed: all three pages in one build; desktop/mobile, dark/light, no-JavaScript, FAQs, both forms, five journeys, phone and single sanitized WhatsApp events.');
} finally { await browser.close(); }
