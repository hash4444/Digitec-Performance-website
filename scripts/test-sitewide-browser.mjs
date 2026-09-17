import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
const base = process.argv[3] || 'http://127.0.0.1:5190';
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(base).hostname), 'Local preview only');
const output = 'outputs/sitewide-seo-2026-09-17/browser';
await mkdir(output, { recursive: true });
const report = { passed: false, startedAt: new Date().toISOString(), pages: [], noJavaScript: [], navigation: [], errors: [] };
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const origin = 'https://digitecme.com';
const routes = ['/', '/ar', '/vrx', '/ar/vrx', '/brands/porsche-service-dubai', '/brands/bmw-service-dubai/brake-repair', '/brands/jeep-service-dubai/exhaust-repair', '/ar/brands/bmw-service-dubai/brake-repair', '/blog/car-battery-life-dubai-heat', '/ar/blog/car-battery-life-dubai-heat', '/services/paint-protection-film', '/services/head-unit-repair-dubai', '/blog/porsche-maintenance-guide-dubai', '/ar/blog/ferrari-maintenance-guide-dubai'];
const protect = async context => {
  await context.route('**/*', route => {
    const request = route.request();
    if (!request.url().startsWith(base) || !['GET', 'HEAD'].includes(request.method())) return route.abort();
    return route.continue();
  });
};
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    await protect(context);
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && /hydration|did not match|Minified React error/i.test(message.text())) report.errors.push(message.text()); });
    for (const route of routes) {
      const response = await page.goto(base + route, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, route);
      await page.waitForFunction(() => [...document.images].filter(img => img.getBoundingClientRect().top < innerHeight && img.getBoundingClientRect().bottom > 0).every(img => img.complete && img.naturalWidth > 0));
      const state = await page.evaluate(() => ({
        h1: [...document.querySelectorAll('h1')].map(el => el.textContent.trim()),
        canonical: document.querySelector('link[rel="canonical"]')?.href,
        ogImage: document.querySelector('meta[property="og:image"]')?.content,
        graphCount: document.querySelectorAll('script[data-route-jsonld="true"]').length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        articleDate: document.querySelector('meta[property="article:published_time"]')?.content || null,
        hero: document.querySelector('img[fetchpriority="high"]')?.currentSrc,
      }));
      assert.equal(state.h1.length, 1, `${route}: H1`);
      assert.equal(state.canonical, origin + route, `${route}: canonical`);
      assert.ok(state.ogImage.startsWith(origin + '/'), `${route}: absolute image`);
      assert.equal(state.graphCount, 1, `${route}: one route schema graph`);
      assert.equal(state.overflow, false, `${route}: overflow at ${width}`);
      report.pages.push({ route, width, ...state });
      if (['/', '/ar', '/ar/blog/car-battery-life-dubai-heat'].includes(route)) {
        await page.screenshot({ path: `${output}/${route.replace(/\//g, '_') || 'home'}-${width}.png` });
      }
    }
    // Real internal navigation must replace article metadata without stale dates.
    await page.goto(base + '/blog/car-battery-life-dubai-heat', { waitUntil: 'networkidle' });
    assert.ok(await page.locator('meta[property="article:published_time"]').count());
    await page.locator('footer a[href="/services"]').first().click();
    await page.waitForURL(base + '/services');
    await page.waitForFunction(() => document.querySelector('link[rel="canonical"]')?.href === 'https://digitecme.com/services');
    assert.equal(await page.locator('meta[property="article:published_time"]').count(), 0);
    await page.goBack({ waitUntil: 'networkidle' });
    await page.waitForFunction(() => !!document.querySelector('meta[property="article:published_time"]'));
    report.navigation.push({ width, articleToServiceAndBack: true });
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  await protect(context);
  const page = await context.newPage();
  for (const route of ['/', '/ar']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    const headings = await page.locator('h1,h2').evaluateAll(nodes => nodes.map(el => ({ text: el.textContent.trim(), hidden: !![el, ...function* () { let p = el.parentElement; while(p) { yield p; p = p.parentElement; } }()].find(node => getComputedStyle(node).opacity === '0' || getComputedStyle(node).visibility === 'hidden') })));
    assert.ok(headings.length > 5);
    assert.equal(headings.filter(h => h.hidden).length, 0, `${route}: initial visible headings`);
    assert.equal(await page.locator('main').count(), 1);
    report.noJavaScript.push({ route, visibleHeadings: headings.length, mainLandmark: true });
  }
  await context.close();
  assert.deepEqual(report.errors, [], 'Browser runtime or hydration errors');
  report.passed = true;
} finally {
  report.completedAt = new Date().toISOString();
  await writeFile(`${output}/verification.json`, JSON.stringify(report, null, 2));
  await browser.close();
}
console.log(`Sitewide browser checks passed: ${report.pages.length} responsive routes, ${report.noJavaScript.length} no-JavaScript pages and ${report.navigation.length} navigation journeys.`);
