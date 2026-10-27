import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
const require = createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const base = 'http://127.0.0.1:5190';
const output = 'outputs/paint-seo-2026-10-12/browser';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const errors = [], results = [], events = [];
try {
  const context = await browser.newContext();
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  let page;
  context.on('page', current => current.on('pageerror', error => { errors.push(error.message); console.log(`Runtime error ${current.url()}: ${error.message}`); }));
  const routes = ['/services/paint-protection-dubai', '/ar/services/paint-protection-dubai', '/ar/services/paint-protection-film', '/ar/services/ceramic-coating'];
  for (const route of routes) for (const width of [320, 390, 1440]) for (const theme of ['dark', 'light']) {
    console.log(`Checking ${route} ${width}px ${theme}`);
    page = await context.newPage();
    // Seed the saved preference before any application effects run. Changing
    // storage during hydration races the header's legitimate persistence effect.
    await page.addInitScript(theme => localStorage.setItem('digitec-color-theme', theme), theme);
    await page.setViewportSize({ width, height: 950 });
    await page.goto(`${base}${route}`);
    await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch'));
    await page.waitForFunction(theme => document.documentElement.classList.contains('theme-light') === (theme === 'light'), theme);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://digitecme.com${route}`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow ${route} ${width} ${theme}`);
    if (route.includes('paint-protection-dubai')) {
      const breadcrumb = await page.locator('.ph-breadcrumb').boundingBox();
      const header = await page.locator('header').boundingBox();
      assert.ok(breadcrumb.y >= header.y + header.height, `Header obscures breadcrumb ${width}`);
      assert.equal(await page.locator('.ph-table tbody tr').count(), 8);
      await page.locator('#protection-faq summary').first().click();
      assert.ok(await page.locator('#protection-faq details').first().getAttribute('open') !== null);
      await page.evaluate(() => scrollTo(0, 0));
      const file = `${route.startsWith('/ar') ? 'ar' : 'en'}-hub-${width}-${theme}.png`;
      await page.screenshot({ path: `${output}/${file}` });
      if (width === 390) {
        await page.locator('#protection-comparison').scrollIntoViewIfNeeded();
        await page.screenshot({ path: `${output}/${file.replace('.png', '-comparison.png')}` });
      }
    } else if (width === 390 && theme === 'dark') await page.screenshot({ path: `${output}/${route.split('/').at(-1)}-ar-390.png` });
    results.push({ route, width, theme, overflow: false });
    await page.close();
  }
  page = await context.newPage();
  await page.goto(`${base}/services/paint-protection-dubai?utm_source=google&utm_medium=organic`);
  await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch'));
  await page.evaluate(() => {
    window.__paintEvents = [];
    window.gtag = (...args) => window.__paintEvents.push(args);
    document.addEventListener('click', event => { if (event.target.closest('a[href^="https://wa.me/"],a[href^="tel:"]')) event.preventDefault(); }, true);
  });
  await page.locator('.ph-hero-copy a[href^="https://wa.me/"]').click();
  await page.locator('.ph-hero-copy a[href^="tel:"]').click();
  events.push(...await page.evaluate(() => window.__paintEvents));
  assert.equal(events.filter(event => event[1] === 'whatsapp_chat_opened').length, 1);
  assert.equal(events.filter(event => event[1] === 'telephone_link_clicked').length, 1);
  for (const event of events.filter(event => event[0] === 'event')) assert.ok(!JSON.stringify(event).includes('Preferred coverage or goal'), 'WhatsApp draft leaked into analytics');
  await page.locator('main a[href="/services/paint-protection-film"]').first().click();
  await page.locator('#ppf-quote-form button[type=submit]:not([disabled])').waitFor();
  await page.locator('main a[href="/services/paint-protection-dubai"]').first().click();
  await page.locator('h1').filter({ hasText: 'Car Paint Protection in Dubai' }).waitFor();
  await page.waitForFunction(() => document.querySelector('link[rel=canonical]').getAttribute('href').endsWith('/services/paint-protection-dubai'));
  await page.goto(`${base}/ar/services/paint-protection-dubai`);
  await page.locator('.ph-hero').waitFor();
  await page.locator('main a[href="/services/car-polishing-dubai"]').click();
  await page.locator('#paint-assessment-form button[type=submit]:not([disabled])').waitFor();
  assert.equal(await page.locator('h1').textContent(), 'Car Polishing & Paint Correction Dubai');
  assert.equal(await page.locator('link[hreflang="ar-AE"]').count(), 0);
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 950 } });
  await noJs.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  const noJsPage = await noJs.newPage();
  for (const route of routes.slice(0, 2)) {
    await noJsPage.goto(base + route);
    assert.equal(await noJsPage.locator('.ph-table tbody tr').count(), 8);
    assert.equal(await noJsPage.locator('#protection-faq details').count(), 6);
    await noJsPage.locator('#protection-faq summary').first().click();
    assert.equal(await noJsPage.locator('#protection-faq details').first().getAttribute('open'), '');
    await noJsPage.screenshot({ path: `${output}/${route.startsWith('/ar') ? 'ar' : 'en'}-hub-no-javascript.png` });
  }
  await noJs.close();
  assert.deepEqual([...new Set(errors)], []);
  const build = JSON.parse(await readFile('release-qa.local/build-results.json', 'utf8'));
  await writeFile(`${output}/hub-browser-results.json`, JSON.stringify({ passed: true, sourceSha256: build.sourceSha256, cases: results, runtimeErrors: errors, events, noJavaScript: 'Both hub pages show all content, table and functional native FAQs', spaNavigation: 'Hub to PPF and back; Arabic hub to explicitly English polishing' }, null, 2));
  console.log('Hub/Arabic browser QA passed: 24 responsive/theme cases, header clearance, no overflow, native FAQs, two sanitized conversion events, locale/SPA navigation and no-JavaScript content.');
} finally { await browser.close(); }
