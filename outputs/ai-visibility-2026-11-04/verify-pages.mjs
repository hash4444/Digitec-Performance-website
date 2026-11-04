import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { homedir } from 'node:os';
import path from 'node:path';

const out = path.resolve('outputs/ai-visibility-2026-11-04/pages-browser');
await mkdir(out, { recursive: true });
const bundled = path.join(homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const { chromium } = createRequire(bundled)('playwright');
const base = 'http://127.0.0.1:5225';
const server = spawn(process.execPath, ['scripts/preview-production-local.mjs', '5225'], { windowsHide: true, stdio: 'ignore' });
const report = { passed: false, cases: [], runtimeErrors: [], localErrors: [], failures: [], screenshots: [], blockedExternal: 0 };
const routes = ['/about', '/ar/about', '/blog/mercedes-service-cost-dubai-guide', '/ar/blog/mercedes-benz-maintenance-guide-dubai', '/brands/mercedes-benz-service-dubai', '/ar/brands/mercedes-benz-service-dubai', '/mercedes/problems', '/mercedes/problems/airmatic-malfunction', '/tuning/mercedes-amg-g63'];
let browser;
try {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(base + '/about')).status === 200) break; } catch {}
    if (i === 49) throw new Error('Local preview unavailable');
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  browser = await chromium.launch({ headless: true, channel: 'msedge' });
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ javaScriptEnabled, viewport: { width: javaScriptEnabled ? 390 : 1440, height: 1000 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
    await context.route('**/*', route => {
      const req = route.request();
      if (new URL(req.url()).origin !== base) { report.blockedExternal++; return route.abort(); }
      return ['GET', 'HEAD'].includes(req.method()) ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    page.on('pageerror', error => report.runtimeErrors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) report.localErrors.push({ url: response.url(), status: response.status() }); });
    for (const route of routes) {
      try {
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200);
        assert.equal(await page.locator('h1').count(), 1);
        assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://digitecme.com' + route);
        const overflow = await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - innerWidth);
        assert.ok(overflow <= 1, `${overflow}px horizontal overflow`);
        if (route.endsWith('/about')) {
          assert.equal(await page.locator('#workshop-guides').count(), 1);
          assert.ok(await page.locator('#workshop-guides a[href^="mailto:"]').count());
        }
        if (route.includes('/blog/')) {
          const about = route.startsWith('/ar/') ? '/ar/about#workshop-guides' : '/about#workshop-guides';
          assert.ok(await page.locator(`main a[href="${about}"]`).count());
          assert.equal(await page.locator('#mercedes-next-step-heading').count(), 1);
        }
        if (route.includes('/brands/mercedes-')) assert.equal(await page.locator('#mercedes-next-step-heading').count(), 1);
        if (route === '/tuning/mercedes-amg-g63') {
          assert.ok((await page.locator('#tuning-evidence').innerText()).includes('not a before-and-after measurement'));
          assert.ok(await page.locator('#tuning-evidence a[href="/services/mercedes-diagnostics-dubai"]').count());
        }
        if (route.startsWith('/mercedes/problems')) assert.ok(await page.locator('main a[href="/services/mercedes-diagnostics-dubai"]').count());
        assert.equal(await page.getByText('Documented Mercedes repair cases', { exact: true }).count(), 0, 'No fabricated cases or empty proof cards');
        if (javaScriptEnabled && ['/about', '/ar/about', '/brands/mercedes-benz-service-dubai', '/tuning/mercedes-amg-g63'].includes(route)) {
          const locator = page.locator(route.endsWith('/about') ? '#workshop-guides' : route.startsWith('/tuning') ? '#tuning-evidence' : '#mercedes-next-step-heading');
          await locator.scrollIntoViewIfNeeded();
          await locator.evaluate(element => scrollTo(0, element.getBoundingClientRect().top + scrollY - 112));
          const file = route.replace(/\//g, '_') + '-390.png';
          await page.screenshot({ path: path.join(out, file), animations: 'disabled' });
          report.screenshots.push(file);
        }
        report.cases.push({ route, javaScriptEnabled, width: javaScriptEnabled ? 390 : 1440, overflow, passed: true });
      } catch (error) { report.failures.push({ route, javaScriptEnabled, error: error.message }); }
    }
    await context.close();
  }
  report.passed = report.cases.length === 18 && !report.failures.length && !report.runtimeErrors.length && !report.localErrors.length;
} catch (error) { report.failures.push({ error: error.message }); }
finally { await browser?.close(); server.kill(); }
await writeFile(path.join(out, 'results.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exitCode = 1;
