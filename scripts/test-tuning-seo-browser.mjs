import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';

// Usage: node scripts/test-tuning-seo-browser.mjs [output-directory] [port]
// Requires Playwright and an installed Chromium browser. Resolve Playwright from
// this project or Codex's bundled runtime, or set PLAYWRIGHT_MODULE_PATH to an
// existing Playwright package.json. PLAYWRIGHT_CHANNEL optionally selects a
// browser channel (for example, msedge); otherwise use Playwright's Chromium.
// Exercises the built edge router and rendered website; never contacts production.
const output = path.resolve(process.argv[2] || 'tuning-seo-qa.local/browser');
const port = Number(process.argv[3] || 5212);
const base = `http://127.0.0.1:${port}`;
const origin = 'https://digitecme.com';
const root = process.cwd();
const require = createRequire(path.join(root, 'package.json'));
const playwrightModulePath = process.env.PLAYWRIGHT_MODULE_PATH;
let chromium;
try {
  ({ chromium } = playwrightModulePath
    ? createRequire(path.resolve(playwrightModulePath))('playwright')
    : require('playwright'));
} catch (error) {
  if (playwrightModulePath || error.code !== 'MODULE_NOT_FOUND') throw error;
  const bundledPackage = path.join(homedir(), '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules', 'playwright', 'package.json');
  try { ({ chromium } = createRequire(bundledPackage)('playwright')); }
  catch (cause) { throw new Error('Install Playwright or set PLAYWRIGHT_MODULE_PATH to an existing Playwright package.json.', { cause }); }
}
const asModule = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64')}`;
const { tuningCars, stageLabels } = await import(asModule(await readFile('src/data/tuningCars.ts', 'utf8')));
const { arTuning, arabicStageLabels, localizeDuration, localizeTuningMod } = await import(asModule(await readFile('src/i18n/ar-tuning.ts', 'utf8')));
const { hasPublishedTuningPackage, publishedTuningMods } = await import(asModule(await readFile('src/data/tuningPublication.ts', 'utf8')));
// Preserve the original message at the Phase T2 base d835f04, independently of
// the current source and HEAD so committed changes cannot redefine the baseline.
const expectedHeroHref = isArabic => `https://wa.me/97143402223?text=${encodeURIComponent(isArabic ? 'مرحباً، أود الاستفسار عن تطوير أداء سيارتي باستخدام حلول GAD.' : "Hi, I'm interested in GAD performance tuning for my car.")}`;
const expectedFinalHref = `https://wa.me/97143402223?text=${encodeURIComponent("Hi, I'd like to schedule a consultation at Digi-Tec Performance Center.")}`;
await mkdir(output, { recursive: true });
const report = {
  passed: false, checkedAt: new Date().toISOString(), cases: [], selections: [], noJavaScript: [], anchors: [], analytics: [], languageSwitches: [],
  failures: [], runtimeErrors: [], failedLocalResponses: [], blockedExternalRequests: 0, blockedWrites: [], screenshots: [],
  safety: 'Local GET/HEAD only. External navigation and submissions prevented; intended contact href captured without opening WhatsApp or sending an enquiry.',
};
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', String(port)], { cwd: root, windowsHide: true, stdio: 'ignore' });
let serverExited = false;
server.once('exit', () => { serverExited = true; });
let browser;
let activeCase = 'startup';
const normalize = value => value.replace(/\s+/g, ' ').trim();

async function protect(context) {
  await context.route('**/*', route => {
    const request = route.request();
    if (new URL(request.url()).origin !== base) { report.blockedExternalRequests++; return route.abort(); }
    if (!['GET', 'HEAD'].includes(request.method())) { report.blockedWrites.push({ url: request.url(), method: request.method() }); return route.abort(); }
    return route.continue();
  });
  await context.addInitScript(() => {
    window.__tuningSeoExternalClicks = [];
    document.addEventListener('click', event => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor && new URL(anchor.href, location.href).origin !== location.origin) {
        window.__tuningSeoExternalClicks.push(anchor.href);
        event.preventDefault();
      }
    }, true);
    document.addEventListener('submit', event => event.preventDefault(), true);
    window.open = url => { window.__tuningSeoExternalClicks.push(String(url)); return null; };
  });
}

async function checkOverflow(page) {
  const overflow = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth);
  assert.ok(overflow <= 1, `${activeCase}: horizontal overflow ${overflow}px`);
  return overflow;
}

async function checkAnchors(page, label) {
  for (const id of ['performance-configurator', 'performance-packages']) {
    const section = page.locator(`#${id}`);
    assert.equal(await section.evaluate(element => getComputedStyle(element).scrollMarginTop), '112px', `${id}: fixed-header offset`);
    const anchor = page.locator(`main a[href="#${id}"]`).first();
    await anchor.focus();
    await anchor.press('Enter');
    // Poll from Node so this also works when application JavaScript is disabled.
    let targetTop;
    let previousTop;
    let stableMeasurements = 0;
    for (let attempt = 0; attempt < 80; attempt++) {
      targetTop = await section.evaluate(element => element.getBoundingClientRect().top);
      stableMeasurements = previousTop !== undefined && Math.abs(targetTop - previousTop) < 1 ? stableMeasurements + 1 : 0;
      if (stableMeasurements >= 10) break;
      previousTop = targetTop;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    assert.ok(stableMeasurements >= 10, `${id}: native anchor scroll settled`);
    const position = await section.evaluate(element => ({
      sectionTop: element.getBoundingClientRect().top,
      headingTop: element.querySelector('h2').getBoundingClientRect().top,
      headerBottom: document.querySelector('header').getBoundingClientRect().bottom,
      viewportWidth: innerWidth,
      viewportHeight: innerHeight,
    }));
    assert.ok(position.headingTop >= position.headerBottom, `${id}: heading clears fixed header`);
    assert.ok(position.headingTop >= (position.viewportWidth >= 1024 ? 126 : 98), `${id}: visible heading offset`);
    assert.ok(position.headingTop < position.viewportHeight - 40, `${id}: target heading in viewport`);
    await checkOverflow(page);
    report.anchors.push({ case: label, target: `#${id}`, scrollMarginTop: '112px', ...position, passed: true });
  }
}

async function checkPage(page, isArabic) {
  const route = `${isArabic ? '/ar' : ''}/tuning`;
  assert.equal((await page.goto(base + route, { waitUntil: 'networkidle' }))?.status(), 200);
  await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(normalize(await page.locator('h1').innerText()), isArabic ? `${arTuning.hero.titlePrefix} – ${arTuning.hero.titleSuffix}` : 'Car Tuning Dubai – ECU Remapping & Performance Tuning');
  assert.equal(await page.title(), isArabic ? arTuning.seo.title : 'Car Tuning Dubai | ECU Remapping & Chip Tuning | DIGI-TEC');
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
  assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), origin + route);
  assert.deepEqual(await page.locator('link[rel="alternate"][hreflang]').evaluateAll(links => links.map(link => [link.hreflang, link.href]).sort()), [
    ['ar-AE', origin + '/ar/tuning'], ['en-AE', origin + '/tuning'], ['x-default', origin + '/tuning'],
  ]);
  assert.match(await page.locator('meta[name="robots"]').getAttribute('content'), /index, follow/);
  assert.equal(await page.locator('html').getAttribute('lang'), isArabic ? 'ar' : 'en');
  assert.equal(await page.locator('html').getAttribute('dir'), isArabic ? 'rtl' : 'ltr');
  assert.equal(await page.locator('#performance-configurator button[aria-label][aria-pressed]').count(), 16);
  assert.equal(await page.locator('tr[data-tuning-package]').count(), 62);
  const headings = await page.locator('main h1, main h2, main h3, main h4, main h5, main h6').evaluateAll(elements => elements.map(element => ({ level: Number(element.tagName.slice(1)), text: element.textContent.trim() })));
  assert.ok(headings.every(heading => heading.text.length > 0), 'No empty accessible headings');
  for (let i = 1; i < headings.length; i++) assert.ok(headings[i].level <= headings[i - 1].level + 1, `Heading level skips before ${headings[i].text}`);
  const hero = page.locator('a[data-cta-placement="tuning_hero"]');
  assert.equal(await hero.getAttribute('href'), expectedHeroHref(isArabic), 'Existing hero WhatsApp URL retained');
  const finalCta = page.locator('main a[data-cta-placement="final_cta"][href^="https://wa.me/"]');
  assert.equal(await finalCta.getAttribute('href'), expectedFinalHref, 'Existing final WhatsApp URL retained');
  return { route, h1: normalize(await page.locator('h1').innerText()), title: await page.title(), overflow: await checkOverflow(page) };
}

async function selectCar(page, car, isArabic) {
  const configurator = page.locator('#performance-configurator');
  await configurator.getByRole('button', { name: `${isArabic ? 'اختر' : 'Select'} ${car.name}`, exact: true }).click();
  await configurator.getByRole('heading', { name: car.name, exact: true }).waitFor({ state: 'visible' });
  if (!hasPublishedTuningPackage(car.id)) {
    await configurator.locator(`[data-tuning-enquiry="${car.id}"]`).waitFor({ state: 'visible' });
    assert.equal(await configurator.getByRole('button', { name: isArabic ? arabicStageLabels.stage1 : stageLabels.stage1, exact: true }).count(), 0);
    assert.equal(await configurator.locator('[data-tuning-enquiry] a[href^="https://wa.me/97143402223"]').count(), 1);
  }
  return configurator;
}

async function selectStage(page, car, stage, isArabic) {
  const configurator = page.locator('#performance-configurator');
  const label = isArabic ? arabicStageLabels[stage] : stageLabels[stage];
  const selector = configurator.getByRole('button', { name: label, exact: true });
  await selector.click();
  assert.equal(await selector.getAttribute('aria-pressed'), 'true');
  const packageHeading = configurator.getByRole('heading', { name: isArabic ? `${arTuning.configurator.package} ${label}` : `${label} Package`, exact: true });
  await packageHeading.waitFor({ state: 'visible' });
  const packageBlock = packageHeading.locator('..');
  const info = car.stages[stage];
  await packageBlock.getByText(info.price, { exact: true }).waitFor({ state: 'visible' });
  assert.ok(normalize(await packageBlock.innerText()).includes(isArabic ? localizeDuration(info.time) : info.time), 'Exact source workshop estimate');
  assert.deepEqual((await packageBlock.locator('ul li').allTextContents()).map(normalize), publishedTuningMods(car.id, stage, info.mods).map(mod => normalize(isArabic ? localizeTuningMod(mod) : mod)), 'Exact published source hardware');
  if (car.id === 'db11') assert.doesNotMatch(await packageBlock.innerText(), /\bMCT\b|wet clutch|قابض رطب/);
  report.selections.push({ language: isArabic ? 'ar' : 'en', car: car.id, stage, price: info.price, passed: true });
}

async function checkAnalytics(page, isArabic) {
  const route = isArabic ? '/ar/tuning' : '/tuning';
  for (const placement of ['tuning_hero', 'final_cta']) {
    const anchor = page.locator(`main a[data-cta-placement="${placement}"][href^="https://wa.me/"]`);
    const href = await anchor.getAttribute('href');
    const resolvedHref = await anchor.evaluate(element => element.href);
    await page.evaluate(() => {
      window.__tuningSeoGtagEvents = [];
      window.__tuningSeoOriginalGtag ??= window.gtag;
      window.gtag = (...args) => { window.__tuningSeoGtagEvents.push(args); window.__tuningSeoOriginalGtag?.(...args); };
    });
    const before = await page.evaluate(() => ({ length: window.dataLayer?.length || 0, href: location.href, externalClicks: window.__tuningSeoExternalClicks.length }));
    await anchor.click();
    await page.waitForFunction(start => window.dataLayer?.slice(start).filter(item => item?.event === 'whatsapp_click').length === 1, before.length);
    const result = await page.evaluate(start => ({ entries: window.dataLayer.slice(start), events: window.__tuningSeoGtagEvents, href: location.href, externalClicks: window.__tuningSeoExternalClicks }), before.length);
    const clicks = result.entries.filter(item => item?.event === 'whatsapp_click');
    const contacts = result.events.filter(event => event[0] === 'event' && event[1] === 'whatsapp_chat_opened');
    assert.equal(clicks.length, 1);
    assert.equal(contacts.length, 1);
    assert.equal(clicks[0].link_url, 'https://wa.me/97143402223');
    assert.equal(clicks[0].page_path, route);
    assert.equal(contacts[0][2].cta_placement, placement);
    assert.equal(contacts[0][2].link_url, 'https://wa.me/97143402223');
    assert.ok(!JSON.stringify(result.entries).includes('text='), 'Prefilled message excluded from dataLayer');
    assert.ok(!JSON.stringify(result.events).includes('text='), 'Prefilled message excluded from GA4');
    assert.equal(result.href, before.href, 'Contact navigation prevented');
    assert.equal(result.externalClicks.length, before.externalClicks + 1);
    assert.equal(result.externalClicks.at(-1), resolvedHref, 'Original WhatsApp draft URL captured');
    assert.equal(await anchor.getAttribute('href'), href, 'Contact URL unchanged by interaction');
    report.analytics.push({ route, placement, whatsappClickCount: clicks.length, chatOpenedCount: contacts.length, passed: true });
  }
}

try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    if (serverExited) throw Error('Local preview exited');
    try { if ((await fetch(base + '/tuning', { signal: AbortSignal.timeout(1000) })).status === 200) { ready = true; break; } } catch { /* Startup. */ }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'Built preview ready');
  browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}) });
  const context = await browser.newContext({ reducedMotion: 'reduce', serviceWorkers: 'block' });
  context.setDefaultTimeout(15000);
  await protect(context);
  const page = await context.newPage();
  page.on('pageerror', error => report.runtimeErrors.push({ at: activeCase, message: error.message }));
  page.on('console', message => { if (message.type() === 'error' && /hydrat|Minified React error|Uncaught/i.test(message.text())) report.runtimeErrors.push({ at: activeCase, message: message.text() }); });
  page.on('response', response => { if (new URL(response.url()).origin === base && response.status() >= 400) report.failedLocalResponses.push({ url: response.url(), status: response.status() }); });
  for (const width of [390, 768, 1440]) for (const isArabic of [false, true]) {
    activeCase = `${isArabic ? 'ar' : 'en'} ${width}px`;
    try {
      await page.setViewportSize({ width, height: 1000 });
      const result = await checkPage(page, isArabic);
      const heroShot = `tuning-${isArabic ? 'ar' : 'en'}-${width}-hero.png`;
      await page.screenshot({ path: path.join(output, heroShot), fullPage: false, animations: 'disabled' });
      report.screenshots.push(heroShot);
      await checkAnchors(page, activeCase);
      if (width === 1440) {
        for (const car of tuningCars) {
          await selectCar(page, car, isArabic);
          if (hasPublishedTuningPackage(car.id)) for (const stage of car.availableStages.filter(stage => stage !== 'stock')) await selectStage(page, car, stage, isArabic);
        }
      } else {
        const db11 = tuningCars.find(car => car.id === 'db11');
        await selectCar(page, db11, isArabic);
        for (const stage of ['stage1', 'stage3', 'stage5']) await selectStage(page, db11, stage, isArabic);
        await selectCar(page, tuningCars.find(car => car.id === 's63'), isArabic);
      }
      await checkOverflow(page);
      const configuratorShot = `tuning-${isArabic ? 'ar' : 'en'}-${width}-configurator.png`;
      await page.locator('#performance-configurator').scrollIntoViewIfNeeded();
      await page.screenshot({ path: path.join(output, configuratorShot), fullPage: false, animations: 'disabled' });
      report.screenshots.push(configuratorShot);
      if (width === 390) await checkAnalytics(page, isArabic);
      report.cases.push({ ...result, width, publishedPackages: 62, selectorVehicles: 16, passed: true });
    } catch (error) { report.failures.push({ at: activeCase, error: error.message }); }
  }
  activeCase = 'language switching';
  await page.setViewportSize({ width: 390, height: 1000 });
  await page.goto(base + '/tuning', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Language selection', exact: true }).click();
  await page.locator('header').getByRole('link', { name: 'العربية', exact: true }).click();
  await page.waitForURL(base + '/ar/tuning');
  await page.waitForFunction(() => document.documentElement.dir === 'rtl' && document.querySelector('link[rel="canonical"]')?.href === 'https://digitecme.com/ar/tuning');
  report.languageSwitches.push({ from: '/tuning', to: '/ar/tuning', passed: true });
  await page.getByRole('button', { name: 'اختيار اللغة', exact: true }).click();
  await page.locator('header').getByRole('link', { name: 'English', exact: true }).click();
  await page.waitForURL(base + '/tuning');
  await page.waitForFunction(() => document.documentElement.dir === 'ltr' && document.querySelector('link[rel="canonical"]')?.href === 'https://digitecme.com/tuning');
  report.languageSwitches.push({ from: '/ar/tuning', to: '/tuning', passed: true });
  await context.close();

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 1000 }, serviceWorkers: 'block' });
  await protect(noJsContext);
  const noJs = await noJsContext.newPage();
  for (const route of ['/tuning', '/ar/tuning']) {
    activeCase = `${route} without JavaScript`;
    assert.equal((await noJs.goto(base + route, { waitUntil: 'networkidle' }))?.status(), 200);
    assert.equal(await noJs.locator('tr[data-tuning-package]').count(), 62);
    assert.equal(await noJs.locator('h1').count(), 1);
    await checkAnchors(noJs, activeCase);
    const details = noJs.locator('#c63-w205-packages');
    assert.equal(await details.getAttribute('open'), null);
    await details.locator('summary').click();
    assert.notEqual(await details.getAttribute('open'), null);
    await details.locator('table').waitFor({ state: 'visible' });
    assert.equal(await details.locator('tr[data-tuning-package]').count(), tuningCars.find(car => car.id === 'c63-w205').availableStages.length - 1);
    await checkOverflow(noJs);
    const screenshot = `tuning-${route.startsWith('/ar') ? 'ar' : 'en'}-no-js-details.png`;
    await noJs.screenshot({ path: path.join(output, screenshot), fullPage: false });
    report.screenshots.push(screenshot);
    report.noJavaScript.push({ route, publishedPackages: 62, nativeDetailsExpanded: true, passed: true });
  }
  await noJsContext.close();
  assert.deepEqual(report.runtimeErrors, []);
  assert.deepEqual(report.failedLocalResponses, []);
  assert.deepEqual(report.blockedWrites, []);
  report.passed = report.failures.length === 0 && report.cases.length === 6 && report.noJavaScript.length === 2 && report.anchors.length === 16 && report.analytics.length === 4 && report.languageSwitches.length === 2;
} catch (error) { report.failures.push({ at: activeCase, error: error.message }); }
finally {
  await browser?.close();
  server.kill();
  if (!serverExited) await new Promise(resolve => server.once('exit', resolve));
}
await writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: report.passed, cases: report.cases.length, packageSelections: report.selections.length, noJavaScript: report.noJavaScript.length, anchors: report.anchors.length, analytics: report.analytics.length, languageSwitches: report.languageSwitches.length, failures: report.failures, runtimeErrors: report.runtimeErrors }, null, 2));
if (!report.passed) process.exitCode = 1;
