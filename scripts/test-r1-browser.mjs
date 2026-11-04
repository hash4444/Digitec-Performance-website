import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { access, mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

// Built local site only. Contact drafts/clicks are intercepted; no enquiry is sent.
const hubsOnly = process.argv.includes('--hubs');
const bodyOnly = process.argv.includes('--body');
const growth = process.argv.includes('--growth');
const out = path.resolve(`${growth ? 'outputs/r11' : 'outputs/r1'}/${bodyOnly ? 'browser-body' : hubsOnly ? 'browser-hubs' : 'browser'}`);
const port = Number(process.argv[2] || 5214);
const base = `http://127.0.0.1:${port}`;
const require = createRequire(path.resolve('package.json'));
let chromium;
try { ({ chromium } = require('playwright')); }
catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') throw error;
  ({ chromium } = createRequire(path.join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'))('playwright'));
}
await mkdir(out, { recursive: true });
const brands = ['range-rover', 'defender'];
const suffixes = ['', '/suspension-repair', '/transmission-repair', '/mechanical-repair', '/engine-diagnostics', '/ac-repair', '/electrical-repair', '/brake-repair', '/oil-change'];
const english = [...brands.flatMap(brand => suffixes.map(suffix => `/brands/${brand}-service-dubai${suffix}`)), '/brands/land-rover-service-dubai', ...['range-rover-sport', 'range-rover-vogue', 'defender'].map(brand => `/blog/${brand}-service-dubai-guide`), ...(growth ? ['/brands/range-rover-service-dubai/body-repair'] : [])];
const paths = english.filter(url => bodyOnly ? url === '/brands/range-rover-service-dubai/body-repair' : !hubsOnly || /^\/brands\/[^/]+$/.test(url)).flatMap(url => [url, `/ar${url}`]);
assert.ok(paths.length > 0, 'No browser routes selected; body checks require --growth');
const report = { passed: false, checkedAt: new Date().toISOString(), cases: [], noJavaScript: [], contactEvents: [], bookingForms: [], modelEnquiries: [], growthChecks: [], keyboard: [], languageSwitches: [], screenshots: [], runtimeErrors: [], localErrors: [], blockedWrites: [], externalRequestsBlocked: 0, failures: [] };
let active = 'startup';
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', String(port)], { windowsHide: true, stdio: 'ignore' });
let exited = false;
server.once('exit', () => { exited = true; });
let browser;
const normalize = value => value.replace(/\s+/g, ' ').trim();
async function protect(context) {
  await context.route('**/*', route => {
    const request = route.request();
    if (new URL(request.url()).origin !== base) { report.externalRequestsBlocked++; return route.abort(); }
    if (!['GET', 'HEAD'].includes(request.method())) { report.blockedWrites.push({ url: request.url(), method: request.method() }); return route.abort(); }
    return route.continue();
  });
  await context.addInitScript(() => {
    window.__r1Events = [];
    window.__r1External = [];
    window.__r1CLS = 0;
    try { new PerformanceObserver(list => { for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__r1CLS += entry.value; }).observe({ type: 'layout-shift', buffered: true }); } catch { /* Unsupported browser metric. */ }
    document.addEventListener('click', event => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor && new URL(anchor.href, location.href).origin !== location.origin) { window.__r1External.push(anchor.href); event.preventDefault(); }
    }, true);
    document.addEventListener('submit', event => event.preventDefault(), true);
    window.open = url => { window.__r1External.push(String(url)); return null; };
  });
}
function errors(page) {
  page.on('pageerror', error => report.runtimeErrors.push({ at: active, message: error.message }));
  page.on('console', msg => { if (msg.type() === 'error' && /hydrat|Minified React error|Uncaught/i.test(msg.text())) report.runtimeErrors.push({ at: active, message: msg.text() }); });
  page.on('response', response => { if (new URL(response.url()).origin === base && response.status() >= 400) report.localErrors.push({ at: active, status: response.status(), url: response.url() }); });
}
async function contact(page, url, selector, eventName, expectedMethod) {
  const link = page.locator(selector).first();
  assert.ok(await link.count(), `${active}: contact link`);
  const href = await link.getAttribute('href');
  await page.evaluate(() => { window.__r1Events = []; window.gtag = (...args) => window.__r1Events.push(args); });
  const previous = await page.evaluate(() => window.dataLayer?.length || 0);
  // Dispatch the real bubbled event without opening a phone/WhatsApp application.
  await link.dispatchEvent('click');
  const events = await page.evaluate(() => window.__r1Events);
  const match = events.filter(entry => entry[0] === 'event' && entry[1] === eventName);
  assert.equal(match.length, 1, `${active}: one ${eventName}`);
  assert.equal(match[0][2].page_path, url);
  assert.equal(match[0][2].method, expectedMethod);
  assert.notEqual(match[0][2].cta_placement, 'unspecified', `${active}: placement`);
  if (expectedMethod === 'whatsapp') {
    assert.equal(match[0][2].link_url, 'https://wa.me/97143402223');
    const layer = await page.evaluate(start => window.dataLayer.slice(start).filter(entry => entry?.event === 'whatsapp_click'), previous);
    assert.equal(layer.length, 1, `${active}: dataLayer WhatsApp event`);
    assert.ok(!JSON.stringify([...match, ...layer]).includes('?text='), `${active}: draft stays out of analytics`);
    const draft = new URL(href).searchParams.get('text') || '';
    assert.match(draft, url.includes('defender') ? /Defender|ديفندر/i : /Range Rover|رينج روفر/i);
  }
  report.contactEvents.push({ path: url, event: eventName, placement: match[0][2].cta_placement, passed: true });
}
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (exited) throw new Error('Preview server exited');
    try { if ((await fetch(`${base}/brands/range-rover-service-dubai`)).ok) { ready = true; break; } } catch { /* startup */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'Local production preview ready');
  let channel = process.env.PLAYWRIGHT_CHANNEL;
  if (!channel && process.platform === 'win32') {
    try { await access('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'); channel = 'msedge'; } catch { /* Bundled Chromium fallback. */ }
  }
  browser = await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await protect(context);
  const page = await context.newPage();
  errors(page);
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const url of paths) {
      active = `${width}:${url}`;
      try {
        const response = await page.goto(base + url, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200, `${active}: HTTP`);
        assert.equal(await page.locator('h1').count(), 1, `${active}: H1`);
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        assert.equal(canonical, `https://digitecme.com${url}`);
        assert.equal(await page.locator('html').getAttribute('lang'), url.startsWith('/ar/') ? 'ar' : 'en');
        if (url.startsWith('/ar/')) assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
        await page.locator('footer').first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(60);
        const layout = await page.evaluate(() => ({ overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth, broken: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src), cls: window.__r1CLS }));
        assert.ok(layout.overflow <= 1, `${active}: overflow ${layout.overflow}`);
        assert.deepEqual(layout.broken, [], `${active}: images`);
        const specialist = url.includes('/brands/') && !url.includes('land-rover-service-dubai');
        if (specialist && width === 390) {
          await contact(page, url, 'main a[href^="https://wa.me/"][data-cta-placement]', 'whatsapp_chat_opened', 'whatsapp');
          await contact(page, url, 'main a[href^="tel:"][data-cta-placement]', 'telephone_link_clicked', 'phone');
        }
        const isHub = /\/brands\/(range-rover|defender)-service-dubai$/.test(url);
        if (isHub && width === 390) {
          const bar = page.locator('aside a[href^="https://wa.me/"][data-cta-placement="mobile_bar"]');
          assert.ok(await bar.isVisible(), `${active}: mobile booking bar`);
          const summary = page.locator('main details summary').first();
          await summary.focus();
          await page.keyboard.press('Enter');
          assert.ok(await summary.evaluate(el => el.parentElement.open), `${active}: FAQ keyboard`);
          await page.keyboard.press('Enter');
          report.keyboard.push({ path: url, nativeFaq: true });
          if (hubsOnly || growth) {
            const marker = 'LOCAL_QA_SERVICE_REQUEST';
            const before = await page.evaluate(() => { window.__r1Events = []; return window.dataLayer.length; });
            await page.locator('#bf-issue').fill(marker);
            await page.locator('#brand-booking-form button[type="submit"]').click();
            const formResult = await page.evaluate(start => ({ events: window.__r1Events, layer: window.dataLayer.slice(start), draft: window.__r1External.at(-1) }), before);
            const drafts = formResult.events.filter(entry => entry[0] === 'event' && entry[1] === 'whatsapp_draft_opened');
            assert.equal(drafts.length, 1, `${active}: one booking draft event`);
            assert.equal(drafts[0][2].page_path, url);
            assert.equal(drafts[0][2].cta_placement, 'booking_form');
            assert.match(drafts[0][2].brand, url.includes('defender') ? /Defender|ديفندر/ : /Range Rover|رينج روفر/);
            assert.equal(formResult.layer.filter(entry => entry?.event === 'whatsapp_click').length, 1);
            assert.ok(!JSON.stringify([...formResult.events, ...formResult.layer]).includes(marker), `${active}: form text excluded from analytics`);
            const draft = new URL(formResult.draft);
            assert.equal(draft.origin + draft.pathname, 'https://wa.me/97143402223');
            assert.ok(draft.searchParams.get('text').includes(marker));
            await page.locator('#bf-issue').fill('');
            report.bookingForms.push({ path: url, brand: drafts[0][2].brand, piiExcluded: true, passed: true });
          }
          await page.evaluate(() => scrollTo(0, 0));
          const name = `${url.startsWith('/ar/') ? 'ar' : 'en'}-${url.includes('defender') ? 'defender' : 'range-rover'}-${width}.png`;
          await page.screenshot({ path: path.join(out, name), fullPage: true });
          await page.screenshot({ path: path.join(out, name.replace('.png', '-hero.png')) });
          report.screenshots.push(name);
          if (hubsOnly || growth) {
            const alternate = url.startsWith('/ar/') ? url.slice(3) : `/ar${url}`;
            for (const destination of [alternate, url]) {
              await page.locator('header button').filter({ hasText: /^(EN|AR)$/ }).click();
              await page.locator(`header a[href="${destination}"]`).click();
              await page.waitForURL(base + destination);
              await page.waitForFunction(expected => document.documentElement.lang === expected, destination.startsWith('/ar/') ? 'ar' : 'en');
              assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://digitecme.com${destination}`);
            }
            report.languageSwitches.push({ path: url, alternate, returned: true });
          }
        }
        if (isHub && width === 1440) {
          await page.evaluate(() => scrollTo(0, 0));
          const name = `${url.startsWith('/ar/') ? 'ar' : 'en'}-${url.includes('defender') ? 'defender' : 'range-rover'}-${width}.png`;
          await page.screenshot({ path: path.join(out, name), fullPage: true });
          await page.screenshot({ path: path.join(out, name.replace('.png', '-hero.png')) });
          report.screenshots.push(name);
        }
        if (growth && width === 390 && isHub) {
          const arabic = url.startsWith('/ar/');
          if (url.includes('defender')) {
            const models = page.locator('main a[data-cta-placement^="model_"]');
            assert.equal(await models.count(), 3);
            for (let i = 0; i < 3; i++) {
              const link = models.nth(i);
              const draft = new URL(await link.getAttribute('href')).searchParams.get('text');
              assert.ok(draft.includes(['90', '110', '130'][i]));
              if (i === 2) assert.ok(draft.includes('V8'));
              await page.evaluate(() => { window.__r1Events = []; window.gtag = (...args) => window.__r1Events.push(args); });
              await link.dispatchEvent('click');
              const event = await page.evaluate(() => window.__r1Events.find(args => args[1] === 'whatsapp_chat_opened'));
              assert.equal(event[2].page_path, url);
              assert.equal(event[2].cta_placement, `model_${i + 1}`);
              assert.equal(event[2].link_url, 'https://wa.me/97143402223');
              report.modelEnquiries.push({ path: url, modelContext: ['90', '110', '130/V8'][i], placement: event[2].cta_placement, passed: true });
            }
          } else {
            const bodyPath = `${arabic ? '/ar' : ''}/brands/range-rover-service-dubai/body-repair`;
            assert.equal(await page.locator(`main a[href="${bodyPath}"]`).count(), 1, 'Body owner is promoted without duplicate directory links');
            report.growthChecks.push({ path: url, bodyLink: bodyPath, passed: true });
          }
          await page.locator('#r1-models').screenshot({ path: path.join(out, `${arabic ? 'ar' : 'en'}-${url.includes('defender') ? 'defender' : 'range-rover'}-models.png`) });
        }
        if (growth && url.endsWith('/range-rover-service-dubai/body-repair')) {
          const photo = page.locator('[data-r1-service-scope] img[loading="lazy"]');
          assert.ok(await photo.count());
          await photo.scrollIntoViewIfNeeded();
          await page.waitForFunction(() => { const img = document.querySelector('[data-r1-service-scope] img[loading="lazy"]'); return img?.complete && img.naturalWidth > 0; });
          const draft = new URL(await page.locator('main a[href^="https://wa.me/"][data-cta-placement]').first().getAttribute('href')).searchParams.get('text');
          assert.match(draft, /damage|ضرر|الضرر/i);
          if (width === 390 || width === 1440) await page.locator('[data-r1-service-scope]').screenshot({ path: path.join(out, `${url.startsWith('/ar/') ? 'ar' : 'en'}-range-rover-body-${width}.png`) });
          report.growthChecks.push({ path: url, width, bodyDraftAndPhoto: true, passed: true });
        }
        if (growth && isHub && url.includes('range-rover') && width >= 768) {
          const bodyCard = page.locator('article.r1-service-card').filter({ has: page.locator('a[data-cta-placement="service_body-repair"]') });
          const grid = await page.locator('.r1-service-grid').boundingBox();
          const card = await bodyCard.boundingBox();
          assert.ok(Math.abs(grid.width - card.width) <= 2, `${active}: body-repair card spans the service grid`);
          await bodyCard.screenshot({ path: path.join(out, `${url.startsWith('/ar/') ? 'ar' : 'en'}-body-card-${width}.png`) });
          report.growthChecks.push({ path: url, width, bodyCardSpansGrid: true, passed: true });
        }
        report.cases.push({ path: url, width, h1: normalize(await page.locator('h1').innerText()), overflow: layout.overflow, layoutShiftObserved: layout.cls, passed: true });
      } catch (error) { report.failures.push({ at: active, message: error.message }); }
    }
  }
  await context.close();
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await protect(noJs);
  const noJsPage = await noJs.newPage();
  for (const url of paths) {
    active = `noJS:${url}`;
    try {
      assert.equal((await noJsPage.goto(base + url, { waitUntil: 'domcontentloaded' })).status(), 200);
      assert.equal(await noJsPage.locator('h1').count(), 1);
      assert.ok((await noJsPage.locator('main').innerText()).length > 300);
      assert.ok(await noJsPage.locator('script[type="application/ld+json"]').count());
      report.noJavaScript.push({ path: url, passed: true });
    } catch (error) { report.failures.push({ at: active, message: error.message }); }
  }
  await noJs.close();
  report.passed = !report.failures.length && !report.runtimeErrors.length && !report.localErrors.length;
} catch (error) { report.failures.push({ at: active, message: error.message }); }
finally {
  await browser?.close();
  server.kill();
  await writeFile(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ passed: report.passed, responsiveCases: report.cases.length, noJavaScript: report.noJavaScript.length, contactEvents: report.contactEvents.length, runtimeErrors: report.runtimeErrors, localErrors: report.localErrors, failures: report.failures }, null, 2));
if (!report.passed) process.exitCode = 1;
