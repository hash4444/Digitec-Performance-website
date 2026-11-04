import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';
import ts from 'typescript';

// Usage: node scripts/test-tuning-models-browser.mjs [output-directory] [port]
// Exercises the built local edge router. All external navigation and writes are
// blocked, including WhatsApp clicks; no enquiry is sent during this test.
const output = path.resolve(process.argv[2] || 'outputs/t3/qa/browser');
const port = Number(process.argv[3] || 5213);
const base = `http://127.0.0.1:${port}`;
const origin = 'https://digitecme.com';
const root = process.cwd();
const require = createRequire(path.join(root, 'package.json'));
let chromium;
try {
  ({ chromium } = process.env.PLAYWRIGHT_MODULE_PATH ? createRequire(path.resolve(process.env.PLAYWRIGHT_MODULE_PATH))('playwright') : require('playwright'));
} catch (error) {
  if (process.env.PLAYWRIGHT_MODULE_PATH || error.code !== 'MODULE_NOT_FOUND') throw error;
  const bundled = path.join(homedir(), '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules', 'playwright', 'package.json');
  ({ chromium } = createRequire(bundled)('playwright'));
}
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText).toString('base64')}`;
const carsUrl = moduleUrl(await readFile('src/data/tuningCars.ts', 'utf8'));
const { tuningCars, stageLabels } = await import(carsUrl);
const { tuningModelPages } = await import(moduleUrl((await readFile('src/data/tuningModelPages.ts', 'utf8')).replace("'@/data/tuningCars'", JSON.stringify(carsUrl))));
const { publishedTuningMods, getTuningPriceNote, getTuningPublicationNote } = await import(moduleUrl(await readFile('src/data/tuningPublication.ts', 'utf8')));
const normalize = value => String(value).replace(/\s+/g, ' ').trim();
await mkdir(output, { recursive: true });
const report = { passed: false, checkedAt: new Date().toISOString(), cases: [], selections: [], keyboard: [], noJavaScript: [], analytics: [], languageSwitches: [], screenshots: [], runtimeErrors: [], failedLocalResponses: [], blockedWrites: [], blockedExternalRequests: 0, failures: [], safety: 'Built local GET/HEAD only; all external requests, WhatsApp navigation and form submissions blocked.' };
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', String(port)], { cwd: root, windowsHide: true, stdio: 'ignore' });
let serverExited = false;
server.once('exit', () => { serverExited = true; });
let browser;
let activeCase = 'startup';

async function protect(context) {
  await context.route('**/*', route => {
    const request = route.request();
    if (new URL(request.url()).origin !== base) { report.blockedExternalRequests++; return route.abort(); }
    if (!['GET', 'HEAD'].includes(request.method())) { report.blockedWrites.push({ url: request.url(), method: request.method() }); return route.abort(); }
    return route.continue();
  });
  await context.addInitScript(() => {
    window.__modelExternalClicks = [];
    window.__modelGtagEvents = [];
    document.addEventListener('click', event => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor && new URL(anchor.href, location.href).origin !== location.origin) {
        window.__modelExternalClicks.push(anchor.href);
        event.preventDefault();
      }
    }, true);
    document.addEventListener('submit', event => event.preventDefault(), true);
    window.open = url => { window.__modelExternalClicks.push(String(url)); return null; };
  });
}

function captureErrors(page) {
  page.on('pageerror', error => report.runtimeErrors.push({ at: activeCase, message: error.message }));
  page.on('console', message => { if (message.type() === 'error' && /hydrat|Minified React error|Uncaught/i.test(message.text())) report.runtimeErrors.push({ at: activeCase, message: message.text() }); });
  page.on('response', response => { if (new URL(response.url()).origin === base && response.status() >= 400) report.failedLocalResponses.push({ at: activeCase, url: response.url(), status: response.status() }); });
}

async function overflow(page) {
  const excess = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth);
  assert.ok(excess <= 1, `${activeCase}: horizontal overflow ${excess}px`);
  return excess;
}

async function checkStage(page, model, car, stage, width) {
  const selector = page.locator('[data-model-stage-selector]');
  const info = car.stages[stage];
  const button = selector.getByRole('button', { name: stageLabels[stage], exact: true });
  await button.click();
  assert.equal(await button.getAttribute('aria-pressed'), 'true', `${car.id}:${stage}: selected state`);
  assert.equal(await selector.locator('button[aria-pressed="true"]').count(), 1, `${car.id}:${stage}: one selected stage`);
  const number = value => Number(String(value).replace(/[^\d.]/g, ''));
  assert.equal(number(await selector.locator('[data-stage-hp]').innerText()), info.spec.hp, `${car.id}:${stage}: HP`);
  assert.equal(number(await selector.locator('[data-stage-torque]').innerText()), info.spec.torque, `${car.id}:${stage}: Nm`);
  assert.equal(normalize(await selector.locator('[data-stage-price]').innerText()), info.price, `${car.id}:${stage}: exact source EUR price`);
  assert.equal(normalize(await selector.locator('[data-stage-time]').innerText()), info.time, `${car.id}:${stage}: time`);
  assert.deepEqual((await selector.locator('[data-stage-mods] > li').allTextContents()).map(normalize), publishedTuningMods(car.id, stage, info.mods), `${car.id}:${stage}: public package work`);
  if (car.id === 'db11') {
    assert.doesNotMatch(await selector.locator('[data-stage-mods]').innerText(), /\bMCT\b|wet clutch/);
    assert.ok(normalize(await selector.innerText()).includes(getTuningPublicationNote(car.id)), 'DB11 compatibility notice retained');
  }
  const priceNote = getTuningPriceNote(car.id, stage);
  if (priceNote) assert.ok(normalize(await selector.innerText()).includes(priceNote), `${car.id}:${stage}: price endpoints explained`);
  const cta = selector.locator('a[href^="https://wa.me/"]').first();
  const href = new URL(await cta.getAttribute('href'));
  assert.equal(href.pathname, '/97143402223');
  assert.ok(href.searchParams.get('text').includes(model.name), `${model.path}: model in stage draft`);
  assert.ok(href.searchParams.get('text').includes(stageLabels[stage]), `${model.path}: selected stage in draft`);
  assert.ok(await cta.getAttribute('data-cta-placement'), 'CTA placement attribution');
  await overflow(page);
  report.selections.push({ width, model: model.slug, car: car.id, stage, hp: info.spec.hp, torque: info.spec.torque, price: info.price, passed: true });
}

async function checkAnalytics(page, model) {
  const selector = page.locator('[data-model-stage-selector]');
  const cta = selector.locator('a[href^="https://wa.me/"]').first();
  const placement = await cta.getAttribute('data-cta-placement');
  await page.evaluate(() => {
    window.__modelGtagEvents = [];
    window.__originalModelGtag ??= window.gtag;
    window.gtag = (...args) => { window.__modelGtagEvents.push(args); window.__originalModelGtag?.(...args); };
  });
  const before = await page.evaluate(() => ({ length: window.dataLayer?.length || 0, href: location.href, clicks: window.__modelExternalClicks.length }));
  await cta.click();
  await page.waitForFunction(start => window.dataLayer?.slice(start).some(item => item?.event === 'whatsapp_click'), before.length);
  const result = await page.evaluate(start => ({ entries: window.dataLayer.slice(start), events: window.__modelGtagEvents, href: location.href, clicks: window.__modelExternalClicks }), before.length);
  const clicks = result.entries.filter(item => item?.event === 'whatsapp_click');
  const contacts = result.events.filter(item => item[0] === 'event' && item[1] === 'whatsapp_chat_opened');
  assert.equal(clicks.length, 1);
  assert.equal(contacts.length, 1);
  assert.equal(clicks[0].link_url, 'https://wa.me/97143402223');
  assert.equal(clicks[0].page_path, model.path);
  assert.equal(contacts[0][2].cta_placement, placement);
  assert.equal(contacts[0][2].link_url, 'https://wa.me/97143402223');
  assert.ok(!JSON.stringify(result.entries).includes('text=') && !JSON.stringify(result.events).includes('text='), 'Message excluded from analytics');
  assert.equal(result.href, before.href, 'No external navigation');
  assert.equal(result.clicks.length, before.clicks + 1, 'One prevented draft click');
  report.analytics.push({ path: model.path, placement, whatsappClickCount: 1, chatOpenedCount: 1, passed: true });
}

try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    if (serverExited) throw new Error('Local preview exited');
    try { if ((await fetch(base + '/tuning', { signal: AbortSignal.timeout(1000) })).status === 200) { ready = true; break; } } catch { /* Startup. */ }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'Local production preview ready');
  let channel = process.env.PLAYWRIGHT_CHANNEL;
  if (!channel && process.platform === 'win32') {
    try { await access('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'); channel = 'msedge'; } catch { /* Bundled Chromium fallback. */ }
  }
  browser = await chromium.launch({ headless: true, ...(channel ? { channel } : {}) });
  const context = await browser.newContext({ reducedMotion: 'reduce', serviceWorkers: 'block' });
  context.setDefaultTimeout(15000);
  await protect(context);
  const page = await context.newPage();
  captureErrors(page);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const model of tuningModelPages) {
      activeCase = `${model.slug} ${width}px`;
      try {
        assert.equal((await page.goto(base + model.path, { waitUntil: 'networkidle' }))?.status(), 200);
        await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
        assert.equal(await page.locator('h1').count(), 1);
        // textContent verifies the semantic source; Urus deliberately styles
        // its visible heading in uppercase without changing the authored H1.
        assert.equal(normalize(await page.locator('h1').textContent()), model.h1);
        assert.equal(await page.title(), model.metaTitle);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), origin + model.path);
        assert.equal(await page.locator('link[hreflang="ar-AE"]').count(), 0, 'No unpublished Arabic alternate');
        const selector = page.locator('[data-model-stage-selector]');
        await selector.waitFor();
        assert.equal(await selector.getByRole('button', { name: stageLabels.stage1, exact: true }).getAttribute('aria-pressed'), 'true', 'Stage 1 default');
        const expectedPackages = model.carIds.reduce((sum, id) => sum + tuningCars.find(car => car.id === id).availableStages.length - 1, 0);
        assert.equal(await page.locator('tr[data-tuning-package]').count(), expectedPackages);
        if (['mercedes-amg-g63', 'mercedes-amg-gt63', 'aston-martin-db11'].includes(model.slug)) {
          const hero = `${model.slug}-${width}-hero.png`;
          await page.mouse.move(0, 0);
          await page.screenshot({ path: path.join(output, hero), fullPage: false, animations: 'disabled' });
          report.screenshots.push(hero);
        }
        for (const carId of model.carIds) {
          const car = tuningCars.find(record => record.id === carId);
          if (model.carIds.length > 1) await selector.getByLabel('Vehicle variant', { exact: true }).selectOption(car.id);
          for (const stage of car.availableStages.filter(item => item !== 'stock')) await checkStage(page, model, car, stage, width);
        }
        const stage1 = selector.getByRole('button', { name: stageLabels.stage1, exact: true });
        await stage1.focus();
        await stage1.press('Enter');
        assert.equal(await stage1.getAttribute('aria-pressed'), 'true', 'Keyboard stage selection');
        report.keyboard.push({ path: model.path, width, passed: true });
        if (width === 390) await checkAnalytics(page, model);
        if (['mercedes-amg-g63', 'mercedes-amg-gt63', 'aston-martin-db11'].includes(model.slug)) {
          await selector.scrollIntoViewIfNeeded();
          const shot = `${model.slug}-${width}-stages.png`;
          await page.mouse.move(0, 0);
          await page.screenshot({ path: path.join(output, shot), fullPage: false, animations: 'disabled' });
          report.screenshots.push(shot);
        }
        report.cases.push({ path: model.path, width, packages: expectedPackages, overflow: await overflow(page), passed: true });
      } catch (error) { report.failures.push({ at: activeCase, error: error.message }); }
    }
  }
  activeCase = 'model language fallback';
  await page.goto(base + '/tuning/mercedes-amg-g63', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Language selection', exact: true }).click();
  await page.locator('header').getByRole('link', { name: 'العربية', exact: true }).click();
  await page.waitForURL(base + '/ar/tuning');
  await page.waitForFunction(() => document.documentElement.dir === 'rtl' && document.querySelector('link[rel="canonical"]')?.href === 'https://digitecme.com/ar/tuning');
  report.languageSwitches.push({ from: '/tuning/mercedes-amg-g63', to: '/ar/tuning', passed: true });
  await context.close();
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 1000 }, serviceWorkers: 'block' });
  await protect(noJsContext);
  const noJs = await noJsContext.newPage();
  captureErrors(noJs);
  for (const model of tuningModelPages) {
    activeCase = `${model.slug} no JavaScript`;
    try {
      assert.equal((await noJs.goto(base + model.path, { waitUntil: 'networkidle' }))?.status(), 200);
      assert.equal(await noJs.locator('h1').count(), 1);
      const expectedPackages = model.carIds.reduce((sum, id) => sum + tuningCars.find(car => car.id === id).availableStages.length - 1, 0);
      assert.equal(await noJs.locator('tr[data-tuning-package]').count(), expectedPackages);
      for (const carId of model.carIds) {
        const details = noJs.locator(`#${carId}-packages`);
        if (await details.getAttribute('open') === null) await details.locator('summary').click();
        await details.locator('table').waitFor({ state: 'visible' });
      }
      assert.ok(await noJs.locator('main a[href^="https://wa.me/97143402223"]').count() > 0, 'Usable native WhatsApp links');
      report.noJavaScript.push({ path: model.path, packages: expectedPackages, overflow: await overflow(noJs), passed: true });
    } catch (error) { report.failures.push({ at: activeCase, error: error.message }); }
  }
  await noJsContext.close();
  assert.deepEqual(report.runtimeErrors, []);
  assert.deepEqual(report.failedLocalResponses, []);
  assert.deepEqual(report.blockedWrites, []);
  report.passed = report.failures.length === 0 && report.cases.length === 18 && report.selections.length === 104 && report.noJavaScript.length === 9 && report.analytics.length === 9 && report.languageSwitches.length === 1;
} catch (error) { report.failures.push({ at: activeCase, error: error.message }); }
finally {
  await browser?.close();
  server.kill();
  if (!serverExited) await new Promise(resolve => server.once('exit', resolve));
}
await writeFile(path.join(output, 'model-browser-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: report.passed, cases: report.cases.length, stageSelections: report.selections.length, keyboard: report.keyboard.length, noJavaScript: report.noJavaScript.length, analytics: report.analytics.length, failures: report.failures, runtimeErrors: report.runtimeErrors }, null, 2));
if (!report.passed) process.exitCode = 1;
