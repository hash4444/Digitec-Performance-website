import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { access, mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

// Local production assets only. All external requests and contact navigation
// are blocked. Form drafts are captured in memory; no enquiry is sent.
const output = path.resolve(process.argv[2] || 'outputs/porsche-p2-2026-11-04/browser');
const port = Number(process.argv[3] || 5226);
const base = `http://127.0.0.1:${port}`;
const require = createRequire(path.resolve('package.json'));
let chromium;
try { ({ chromium } = require('playwright')); }
catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') throw error;
  ({ chromium } = createRequire(path.join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json'))('playwright'));
}
await mkdir(output, { recursive: true });
const hub = '/brands/porsche-service-dubai';
const bilingual = [hub, ...['transmission-repair', 'battery-replacement', 'engine-diagnostics', 'suspension-repair', 'brake-repair'].map(s => `${hub}/${s}`), '/blog/porsche-maintenance-guide-dubai', '/best-porsche-workshop-dubai'];
const porschePaths = [...bilingual.flatMap(p => [p, `/ar${p}`]), '/porsche/macan', '/blog/porsche-911-service-dubai-guide', ...['997', '991', '992'].map(g => `/porsche/911/${g}`)];
const sentinels = ['/brands/mercedes-benz-service-dubai', '/services/mercedes-diagnostics-dubai', '/tuning', '/tuning/mercedes-amg-gt', '/brands/range-rover-service-dubai', '/brands/defender-service-dubai', '/about'];
const report = { passed: false, checkedAt: new Date().toISOString(), cases: [], noJavaScript: [], contacts: [], forms: [], languageSwitches: [], spaViews: [], screenshots: [], runtimeErrors: [], localErrors: [], externalRequestsBlocked: 0, blockedWrites: [], failures: [] };
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', String(port)], { windowsHide: true, stdio: 'ignore' });
let serverExited = false;
server.once('exit', () => { serverExited = true; });
let browser;
let active = 'startup';
async function protect(context) {
  await context.route('**/*', route => {
    const request = route.request();
    if (new URL(request.url()).origin !== base) { report.externalRequestsBlocked++; return route.abort(); }
    if (!['GET', 'HEAD'].includes(request.method())) { report.blockedWrites.push({ url: request.url(), method: request.method() }); return route.abort(); }
    return route.continue();
  });
  await context.addInitScript(() => {
    window.__p2Events = [];
    window.__p2Drafts = [];
    document.addEventListener('click', event => {
      const a = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (a && new URL(a.href, location.href).origin !== location.origin) event.preventDefault();
    }, true);
    document.addEventListener('submit', event => event.preventDefault(), true);
    window.open = url => { window.__p2Drafts.push(String(url)); return null; };
  });
}
function watch(page) {
  page.on('pageerror', error => report.runtimeErrors.push({ at: active, message: error.message }));
  page.on('console', message => { if (message.type() === 'error' && /hydrat|Minified React error|Uncaught/i.test(message.text())) report.runtimeErrors.push({ at: active, message: message.text() }); });
  page.on('response', response => { if (new URL(response.url()).origin === base && response.status() >= 400) report.localErrors.push({ at: active, status: response.status(), url: response.url() }); });
}
const messageFields = (text, isArabic) => (isArabic ? ['طراز بورشه:', 'سنة الصنع:', 'المسافة المقطوعة:', 'الخدمة المطلوبة أو الأعراض:', 'نص التحذير', 'سجل الصيانة'] : ['Porsche model:', 'Model year:', 'Mileage:', 'Requested service or symptoms:', 'Exact warning', 'Service history']).every(field => text.includes(field));
async function contacts(page, route) {
  const anchor = page.locator('main a[href^="https://wa.me/"][data-cta-placement]').first();
  assert.ok(await anchor.count(), `${active}: tracked main WhatsApp CTA`);
  const href = await anchor.getAttribute('href');
  assert.ok(messageFields(new URL(href).searchParams.get('text') || '', route.startsWith('/ar/')), `${active}: qualified prefill`);
  await page.evaluate(() => { window.__p2Events = []; window.gtag = (...args) => window.__p2Events.push(args); });
  const before = await page.evaluate(() => window.dataLayer?.length || 0);
  await anchor.dispatchEvent('click');
  const events = await page.evaluate(() => window.__p2Events);
  const opened = events.filter(e => e[0] === 'event' && e[1] === 'whatsapp_chat_opened');
  assert.equal(opened.length, 1, `${active}: one chat-open event`);
  assert.equal(opened[0][2].page_path, route);
  assert.equal(opened[0][2].link_url, 'https://wa.me/97143402223');
  assert.notEqual(opened[0][2].cta_placement, 'unspecified');
  const layer = await page.evaluate(start => window.dataLayer.slice(start).filter(e => e?.event === 'whatsapp_click'), before);
  assert.equal(layer.length, 1, `${active}: preserved dataLayer event`);
  assert.ok(!JSON.stringify([...events, ...layer]).includes('?text='), `${active}: no draft in analytics`);
  assert.ok(!events.some(e => /generate_lead|booking_confirmed|purchase/.test(e[1] || '')), `${active}: draft is not a lead`);
  report.contacts.push({ path: route, placement: opened[0][2].cta_placement, passed: true });
  const phone = page.locator('main a[href^="tel:"][data-cta-placement]').first();
  if (await phone.count()) {
    await page.evaluate(() => { window.__p2Events = []; });
    await phone.dispatchEvent('click');
    assert.equal(await page.evaluate(() => window.__p2Events.filter(e => e[0] === 'event' && e[1] === 'telephone_link_clicked').length), 1);
  }
}
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (serverExited) throw Error('Local preview exited');
    try { if ((await fetch(base + hub)).ok) { ready = true; break; } } catch { /* startup */ }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  assert.ok(ready, 'Local production preview ready');
  let channel = process.env.PLAYWRIGHT_CHANNEL;
  if (!channel && process.platform === 'win32') try { await access('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'); channel = 'msedge'; } catch { /* use bundled browser */ }
  browser = await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  await protect(context);
  const page = await context.newPage();
  watch(page);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const route of [...porschePaths, ...sentinels]) {
      active = `${width}:${route}`;
      try {
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), `https://digitecme.com${route}`);
        const isArabic = route.startsWith('/ar/');
        assert.equal(await page.locator('html').getAttribute('lang'), isArabic ? 'ar' : 'en');
        if (isArabic) assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
        await page.locator('footer').first().scrollIntoViewIfNeeded();
        await page.waitForTimeout(80);
        const layout = await page.evaluate(() => ({ overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth, brokenImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src) }));
        assert.ok(layout.overflow <= 1, `Horizontal overflow: ${layout.overflow}`);
        assert.deepEqual(layout.brokenImages, []);
        const ids = await page.locator('script[type="application/ld+json"]').allTextContents();
        ids.forEach(json => JSON.parse(json));
        if (route.includes('porsche') && width === 390) await contacts(page, route);
        if (route === `${hub}/engine-diagnostics`) assert.equal(await page.title(), 'Porsche Diagnostics Dubai | PIWIS 3 | DIGI-TEC');
        if (route === '/blog/porsche-911-service-dubai-guide') for (const generation of ['997', '991', '992']) assert.equal(await page.locator(`nav[aria-label="911 generations"] a[href="/porsche/911/${generation}"]`).count(), 1);
        if ((route === hub || route === `/ar${hub}` || route === '/porsche/macan') && width === 390) {
          const form = page.locator('#brand-booking-form');
          assert.equal(await form.count(), 1);
          await page.locator('#bf-issue').fill(isArabic ? 'اختبار محلي: طلب صيانة مع سجل غير مكتمل' : 'Local QA: maintenance request with incomplete service history');
          await page.evaluate(() => { window.__p2Events = []; window.__p2Drafts = []; });
          await form.locator('button[type="submit"]').click();
          const drafts = await page.evaluate(() => window.__p2Drafts);
          assert.equal(drafts.length, 1);
          assert.ok(messageFields(new URL(drafts[0]).searchParams.get('text') || '', isArabic));
          const events = await page.evaluate(() => window.__p2Events);
          assert.equal(events.filter(e => e[0] === 'event' && e[1] === 'whatsapp_draft_opened').length, 1);
          assert.ok(!events.some(e => /generate_lead|booking_confirmed|purchase/.test(e[1] || '')));
          report.forms.push({ path: route, draftOnly: true, passed: true });
        }
        if ([hub, `${hub}/engine-diagnostics`, `/ar${hub}`, `/ar${hub}/engine-diagnostics`, '/blog/porsche-maintenance-guide-dubai', '/ar/blog/porsche-maintenance-guide-dubai', '/porsche/macan', '/blog/porsche-911-service-dubai-guide'].includes(route)) {
          await page.evaluate(() => scrollTo(0, 0));
          const file = `${width}-${route.slice(1).replaceAll('/', '__')}.png`;
          await page.screenshot({ path: path.join(output, file), fullPage: true });
          report.screenshots.push(file);
          const viewportFile = file.replace('.png', '-viewport.png');
          await page.screenshot({ path: path.join(output, viewportFile) });
          report.screenshots.push(viewportFile);
        }
        report.cases.push({ path: route, width, passed: true, ...layout });
      } catch (error) { report.failures.push({ at: active, error: error.message }); }
    }
  }
  for (const route of [hub, `${hub}/engine-diagnostics`, '/blog/porsche-maintenance-guide-dubai', '/ar/blog/porsche-maintenance-guide-dubai']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const target = route.startsWith('/ar/') ? route.slice(3) : `/ar${route}`;
    await page.getByRole('button', { name: route.startsWith('/ar/') ? 'اختيار اللغة' : 'Language selection', exact: true }).click();
    const candidate = page.locator(`header a[href="${target}"]`).first();
    assert.ok(await candidate.count(), `${route}: language destination exists`);
    await candidate.click();
    await page.waitForURL(base + target);
    report.languageSwitches.push({ from: route, to: target, passed: true });
  }
  await page.goto(`${base}/porsche/macan?utm_source=google&utm_medium=organic`, { waitUntil: 'networkidle' });
  await page.evaluate(() => { window.__p2Events = []; window.gtag = (...args) => window.__p2Events.push(args); });
  await page.locator(`main a[href="${hub}"]`).first().click();
  await page.waitForURL(base + hub);
  await page.waitForTimeout(100);
  const views = await page.evaluate(() => window.__p2Events.filter(e => e[0] === 'event' && e[1] === 'page_view'));
  assert.equal(views.length, 1, 'One SPA page view per navigation');
  assert.equal(views[0][2].page_path, hub);
  report.spaViews.push({ from: '/porsche/macan', to: hub, passed: true });
  const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await protect(noJs);
  const noJsPage = await noJs.newPage();
  for (const route of [hub, `${hub}/transmission-repair`, `${hub}/engine-diagnostics`, '/porsche/macan', '/ar/blog/porsche-maintenance-guide-dubai']) {
    const response = await noJsPage.goto(base + route);
    assert.equal(response.status(), 200);
    assert.equal(await noJsPage.locator('h1').count(), 1);
    assert.ok(await noJsPage.locator('main a[href^="https://wa.me/"]').count() > 0);
    report.noJavaScript.push({ path: route, passed: true });
  }
  await noJs.close();
  await context.close();
} catch (error) { report.failures.push({ at: active, error: error.message }); }
finally {
  if (browser) await browser.close();
  server.kill();
  report.passed = report.failures.length === 0 && report.runtimeErrors.length === 0 && report.localErrors.length === 0 && report.blockedWrites.length === 0;
  await writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ...report, cases: report.cases.length, screenshots: report.screenshots.length, contacts: report.contacts.length }, null, 2));
}
assert.equal(report.passed, true, 'Porsche P2 browser failures; see browser-results.json');
