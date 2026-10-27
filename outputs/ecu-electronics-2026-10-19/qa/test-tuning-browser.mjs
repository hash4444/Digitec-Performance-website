import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve(process.argv[2]);
const root = process.cwd();
assert.ok(root.includes('ecu-electronics-2026-10-19') && root.endsWith('candidate.local'), 'Run only inside the isolated candidate');
await mkdir(output, { recursive: true });
const require = createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = require('playwright');
const ts = createRequire(path.join(root, 'package.json'))('typescript');
const compiled = ts.transpileModule(await readFile('src/data/tuningCars.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { tuningCars, stageLabels } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const db11 = tuningCars.find(car => car.id === 'db11');
const s63 = tuningCars.find(car => car.id === 's63');
const base = 'http://127.0.0.1:5208';
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', '5208'], { cwd: root, windowsHide: true, stdio: 'ignore' });
let serverExited = false; server.once('exit', () => { serverExited = true; });
const report = { checkedAt: new Date().toISOString(), passed: false, cases: [], failures: [], errors: [], failedLocalResponses: [], blockedExternalRequests: 0, blockedWrites: 0, screenshots: [], safety: 'Only local GET/HEAD; external links prevented; no message, enquiry, call or production request.' };
let browser;
try {
  let ready = false;
  for (let i = 0; i < 50; i++) {
    if (serverExited) throw Error('Local preview exited');
    try { if ((await fetch(base + '/tuning', { signal: AbortSignal.timeout(1000) })).status === 200) { ready = true; break; } } catch { /* Startup. */ }
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  assert.ok(ready, 'Preview ready');
  browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ reducedMotion: 'reduce', serviceWorkers: 'block' });
  await context.route('**/*', route => {
    const request = route.request();
    if (new URL(request.url()).origin !== base) { report.blockedExternalRequests++; return route.abort(); }
    if (!['GET', 'HEAD'].includes(request.method())) { report.blockedWrites++; return route.abort(); }
    return route.continue();
  });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('response', response => { if (new URL(response.url()).origin === base && response.status() >= 400) report.failedLocalResponses.push({ url: response.url(), status: response.status() }); });
  for (const width of [1440, 390, 320]) for (const language of ['en', 'ar']) {
    const route = `${language === 'ar' ? '/ar' : ''}/tuning`;
    try {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal((await page.goto(base + route, { waitUntil: 'networkidle' }))?.status(), 200);
      await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://digitecme.com' + route);
      assert.equal(await page.locator('tr[data-tuning-package]').count(), 62, '62 published source packages remain available');
      const configurator = page.locator('#performance-configurator');
      await configurator.locator(`button[aria-label="${language === 'ar' ? 'اختر' : 'Select'} ${db11.name}"]`).click();
      await configurator.getByRole('button', { name: language === 'ar' ? 'المرحلة 3' : stageLabels.stage3, exact: true }).click();
      await page.waitForFunction(({ name, price }) => { const section = document.querySelector('#performance-configurator'); return section?.textContent.includes(name) && section?.textContent.includes(price); }, { name: db11.name, price: db11.stages.stage3.price });
      const text = await configurator.innerText();
      assert.ok(text.includes(db11.stages.stage3.price), 'Selected DB11 source price');
      assert.doesNotMatch(text, /\bMCT\b|wet clutch|قابض رطب/, 'Withheld DB11 reinforcement remains absent');
      await configurator.locator(`button[aria-label="${language === 'ar' ? 'اختر' : 'Select'} ${s63.name}"]`).click();
      await configurator.locator('[data-tuning-enquiry="s63"]').waitFor({ state: 'visible' });
      assert.equal(await configurator.getByRole('button', { name: language === 'ar' ? 'المرحلة 3' : stageLabels.stage3, exact: true }).count(), 0, 'Unverified S63 package selector remains withheld');
      assert.equal(await configurator.locator('[data-tuning-enquiry="s63"] a[href^="https://wa.me/97143402223"]').count(), 1);
      assert.ok(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth <= 1), 'No horizontal overflow');
      if (width === 390) { const screenshot = path.join(output, `tuning-${language}-mobile.png`); await page.screenshot({ path: screenshot, fullPage: false }); report.screenshots.push(screenshot); }
      report.cases.push({ route, width, publishedPackages: 62, db11PriceRetained: true, db11WithheldTermsAbsent: true, s63EnquiryOnly: true, passed: true });
    } catch (error) { report.failures.push({ route, width, error: error.message }); }
  }
  assert.deepEqual(report.errors, []); assert.deepEqual(report.failedLocalResponses, []);
  report.passed = report.cases.length === 6 && report.failures.length === 0;
} catch (error) { report.failures.push({ at: 'orchestration', error: error.message }); }
finally { await browser?.close(); server.kill(); if (!serverExited) await new Promise(resolve => server.once('exit', resolve)); }
await writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: report.passed, cases: report.cases.length, failures: report.failures, errors: report.errors }, null, 2));
if (!report.passed) process.exitCode = 1;
