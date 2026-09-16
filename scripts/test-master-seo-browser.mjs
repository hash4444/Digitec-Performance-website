import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Usage: node scripts/test-master-seo-browser.mjs <bundled-runtime-directory> <local-preview-url>
const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
const base = new URL(process.argv[3] || 'http://127.0.0.1:5190').origin;
assert.ok(['127.0.0.1', 'localhost', '[::1]'].includes(new URL(base).hostname), 'Use a local preview, never production.');
const origin = 'https://digitecme.com';
const output = 'outputs/seo-2026-09-16/browser';
await mkdir(output, { recursive: true });

const owners = [
  { name: 'bmw', route: '/brands/bmw-service-dubai', h1: 'BMW Service & Repair Dubai', hero: true },
  { name: 'rolls-royce', route: '/brands/rolls-royce-service-dubai', h1: 'Rolls-Royce Service & Repair Dubai', hero: true },
  { name: 'aston-martin', route: '/brands/aston-martin-service-dubai', h1: 'Aston Martin Service & Repair Dubai', hero: true },
  { name: 'bentley', route: '/brands/bentley-service-dubai', h1: 'Bentley Service & Repair Dubai', hero: true },
  { name: 'ppf', route: '/services/paint-protection-film', h1: 'Paint Protection Film (PPF) Dubai', section: '#ppf-care' },
  { name: 'ceramic', route: '/services/ceramic-coating', h1: 'Ceramic Coating Dubai' },
  { name: 'cue', route: '/services/cadillac-cue-screen-repair-dubai', h1: 'Cadillac CUE Screen Repair & Replacement in Dubai', newPage: true },
  { name: 'electrical', route: '/services/auto-electrical-repair-dubai', h1: 'Car Electrical Repair in Dubai' },
  { name: 'head-unit', route: '/services/head-unit-repair-dubai', h1: 'Head Unit & Mercedes COMAND Repair in Dubai', newPage: true },
  { name: 'mercedes-audio', route: '/services/mercedes-audio-upgrade-dubai', h1: 'Mercedes Stereo & Audio Upgrades in Dubai', newPage: true },
  { name: 'bentley-camera', route: '/brands/bentley-service-dubai/electrical-repair', h1: 'Bentley Electrical Repair Dubai', section: '#reverse-camera' },
  { name: 'tyres', route: '/services/tire-repair-dubai', h1: 'Tyre Repair Dubai' },
];
const mercedesElectrical = { name: 'mercedes-electrical', route: '/services/mercedes-electrical-repair-dubai', h1: 'Mercedes Electrical Fault Diagnosis & Repair in Dubai' };
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow', width: 320, height: 844 },
];
const report = {
  passed: false,
  testedAt: new Date().toISOString(),
  base,
  browser: 'Headless Microsoft Edge',
  pageChecks: [],
  interactions: [],
  screenshots: [],
  spaNavigation: [],
  runtimeOrHydrationErrors: [],
  failedLocalResponses: [],
  blockedExternalRequests: {},
  blockedLocalWrites: [],
  unexpectedPopups: [],
  enquirySafety: 'External requests and contact navigation are blocked. No form is submitted and no enquiry is sent.',
};
let browser;
let page;
let activeCheck = 'browser startup';

const saveScreenshot = async (name) => {
  const filename = `${output}/${name}.png`;
  await page.screenshot({ path: filename, fullPage: false, animations: 'disabled' });
  report.screenshots.push(filename);
  return filename;
};

async function checkViewport() {
  await page.waitForFunction(() => Array.from(document.images).filter((img) => {
    const rect = img.getBoundingClientRect();
    const style = getComputedStyle(img);
    return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth && style.display !== 'none' && style.visibility !== 'hidden';
  }).every((img) => img.complete), undefined, { timeout: 12000 });
  const result = await page.evaluate(() => {
    const images = Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      const style = getComputedStyle(img);
      return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth && style.display !== 'none' && style.visibility !== 'hidden';
    }).map((img) => ({ src: img.currentSrc || img.src, alt: img.alt, loaded: img.complete && img.naturalWidth > 0 }));
    const overflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth;
    return { overflow, images };
  });
  assert.ok(result.overflow <= 1, `${activeCheck}: horizontal overflow ${result.overflow}px`);
  assert.deepEqual(result.images.filter((img) => !img.loaded), [], `${activeCheck}: unloaded visible images`);
  return result;
}

async function checkRoute(spec) {
  await page.waitForFunction((expected) => document.querySelector('link[rel="canonical"]')?.getAttribute('href') === expected, `${origin}${spec.route}`);
  await page.locator('h1').waitFor({ state: 'visible' });
  await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
  assert.equal(await page.locator('h1').count(), 1, `${spec.route}: exactly one H1`);
  assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim(), spec.h1);
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
  assert.equal(await page.locator('meta[name="description"]').count(), 1);
  assert.ok((await page.locator('meta[name="description"]').getAttribute('content'))?.trim());
  assert.ok((await page.title()).trim());
  assert.ok(!(await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
  assert.equal(await page.locator('script[data-route-jsonld="true"]').count(), 1, 'One route schema container after navigation');
  const nodes = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) => scripts.flatMap((script) => {
    const value = JSON.parse(script.textContent);
    return value['@graph'] || [value];
  }));
  const services = nodes.filter((node) => [].concat(node['@type']).includes('Service'));
  const breadcrumbs = nodes.filter((node) => [].concat(node['@type']).includes('BreadcrumbList'));
  assert.equal(services.length, 1, `${spec.route}: one Service, no stale route graph`);
  assert.equal(services[0]['@id'], `${origin}${spec.route}#service`);
  assert.equal(services[0].provider['@id'], `${origin}/#business`);
  assert.equal(breadcrumbs.length, 1, `${spec.route}: one breadcrumb graph`);
  assert.equal(breadcrumbs[0].itemListElement.at(-1).item, `${origin}${spec.route}`);
  const nodeIds = nodes.map((node) => node['@id']).filter(Boolean);
  assert.equal(new Set(nodeIds).size, nodeIds.length, `${spec.route}: duplicate top-level entity IDs`);
  const ctas = await page.locator('a[data-cta-placement]').evaluateAll((links) => links.map((a) => ({ href: a.getAttribute('href'), placement: a.dataset.ctaPlacement })));
  const whatsapp = ctas.filter((a) => a.href?.startsWith('https://wa.me/'));
  assert.ok(whatsapp.length > 0, `${spec.route}: tracked WhatsApp CTA`);
  for (const cta of whatsapp) assert.equal(new URL(cta.href).pathname, '/97143402223');
  assert.ok((await page.locator('a[href="tel:+97143402223"]').count()) > 0, `${spec.route}: workshop telephone link`);
  if (spec.newPage) assert.equal(await page.locator('link[rel="alternate"][hreflang="ar-AE"]').count(), 0, 'No invented Arabic alternate');
  return { title: await page.title(), canonical: `${origin}${spec.route}`, h1: spec.h1, trackedWhatsAppLinks: whatsapp.length, graphNodes: nodes.length };
}

async function gotoOwner(spec, suffix = '') {
  const response = await page.goto(`${base}${spec.route}${suffix}`, { waitUntil: 'networkidle' });
  assert.equal(response?.status(), 200, `${spec.route}: HTTP 200`);
  return checkRoute(spec);
}

async function accordionCheck(spec, viewport) {
  const trigger = page.locator('main button[aria-expanded][data-radix-collection-item]').first();
  await trigger.waitFor({ state: 'attached' });
  const triggerId = await trigger.getAttribute('id');
  assert.ok(triggerId, 'Disclosure trigger has a stable label ID');
  const content = page.locator(`[role="region"][aria-labelledby="${triggerId}"]`);
  await trigger.scrollIntoViewIfNeeded();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  await trigger.click();
  await page.waitForFunction((id) => document.getElementById(id)?.getAttribute('aria-expanded') === 'true', triggerId);
  await content.waitFor({ state: 'visible' });
  assert.ok((await content.innerText()).trim().length > 30);
  await checkViewport();
  if (viewport !== 'narrow') await saveScreenshot(`${spec.name}-${viewport}-faq-open`);
  await trigger.focus();
  await trigger.press('Enter');
  await content.waitFor({ state: 'hidden' });
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  report.interactions.push({ route: spec.route, viewport, check: 'FAQ expands by click with visible labelled answer and collapses by keyboard Enter' });
}

async function spaTo(spec) {
  activeCheck = `SPA to ${spec.route}`;
  const before = await page.evaluate(() => window.__masterSeoDocumentId);
  await page.locator(`main a[href="${spec.route}"]`).first().click();
  await page.waitForURL(`${base}${spec.route}`);
  await checkRoute(spec);
  assert.equal(await page.evaluate(() => window.__masterSeoDocumentId), before, 'Navigation must reuse the SPA document');
  report.spaNavigation.push(spec.route);
}

try {
  browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', serviceWorkers: 'block' });
  context.setDefaultTimeout(15000);
  await context.route('**/*', async (route) => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== base) {
      report.blockedExternalRequests[url.origin] = (report.blockedExternalRequests[url.origin] || 0) + 1;
      await route.abort();
    } else if (!['GET', 'HEAD'].includes(request.method())) {
      report.blockedLocalWrites.push({ path: url.pathname, method: request.method() });
      await route.abort();
    } else await route.continue();
  });
  await context.addInitScript(() => {
    window.__masterSeoDocumentId = `${Date.now()}-${Math.random()}`;
    sessionStorage.removeItem('digitec_first_touch');
    document.addEventListener('click', (event) => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor && new URL(anchor.href, location.href).origin !== location.origin) event.preventDefault();
    }, true);
    document.addEventListener('submit', (event) => event.preventDefault(), true);
  });
  page = await context.newPage();
  page.on('pageerror', (error) => report.runtimeOrHydrationErrors.push({ at: activeCheck, message: error.message }));
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydrat|Minified React error|chunk|Uncaught/i.test(message.text())) report.runtimeOrHydrationErrors.push({ at: activeCheck, message: message.text() });
  });
  page.on('response', (response) => {
    if (new URL(response.url()).origin === base && response.status() >= 400) report.failedLocalResponses.push({ url: response.url(), status: response.status() });
  });
  page.on('popup', async (popup) => {
    report.unexpectedPopups.push({ at: activeCheck });
    await popup.close();
  });

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const spec of owners.filter((owner) => viewport.name !== 'narrow' || owner.newPage)) {
      activeCheck = `${spec.name} ${viewport.name}`;
      const routeCheck = await gotoOwner(spec);
      const viewportCheck = await checkViewport();
      report.pageChecks.push({ route: spec.route, viewport: viewport.name, dimensions: `${viewport.width}x${viewport.height}`, ...routeCheck, ...viewportCheck });
      if (spec.hero || spec.newPage) await saveScreenshot(`${spec.name}-${viewport.name}-hero`);
      if (spec.newPage) await accordionCheck(spec, viewport.name);
      if (spec.section) {
        const section = page.locator(spec.section);
        await section.scrollIntoViewIfNeeded();
        await section.evaluate((element) => element.scrollIntoView({ block: 'start' }));
        const sectionViewport = await checkViewport();
        report.interactions.push({ route: spec.route, viewport: viewport.name, check: `${spec.section} rendered without horizontal overflow`, ...sectionViewport });
        await saveScreenshot(`${spec.name}-${viewport.name}-section`);
        if (spec.name === 'bentley-camera') {
          const details = section.locator('details');
          assert.equal(await details.count(), 3);
          for (let i = 0; i < await details.count(); i++) {
            const item = details.nth(i);
            await item.locator('summary').click();
            assert.equal(await item.getAttribute('open'), '');
            await item.locator('p').waitFor({ state: 'visible' });
            await checkViewport();
            await item.locator('summary').click();
            assert.equal(await item.getAttribute('open'), null);
          }
          report.interactions.push({ route: spec.route, viewport: viewport.name, check: 'All three camera details expand and collapse' });
        }
      }
    }
  }

  for (const viewport of viewports.slice(0, 2)) {
    activeCheck = `Bentley camera fragment navigation ${viewport.name}`;
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await gotoOwner(owners.find((spec) => spec.name === 'bentley'));
    const cameraOwner = owners.find((spec) => spec.name === 'bentley-camera');
    const documentId = await page.evaluate(() => window.__masterSeoDocumentId);
    await page.locator(`main a[href="${cameraOwner.route}#reverse-camera"]`).first().click();
    await page.waitForURL(`${base}${cameraOwner.route}#reverse-camera`);
    await checkRoute(cameraOwner);
    await page.waitForFunction(() => {
      const top = document.getElementById('reverse-camera')?.getBoundingClientRect().top;
      return top !== undefined && top >= 0 && top < innerHeight * 0.5;
    }, undefined, { timeout: 5000 });
    assert.equal(await page.evaluate(() => window.__masterSeoDocumentId), documentId, 'Camera fragment uses SPA navigation');
    await checkViewport();
    await saveScreenshot(`bentley-camera-${viewport.name}-spa-anchor`);
    report.interactions.push({ route: `${cameraOwner.route}#reverse-camera`, viewport: viewport.name, check: 'Hub SPA link reveals camera section in viewport' });
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  const electrical = owners.find((spec) => spec.name === 'electrical');
  const cue = owners.find((spec) => spec.name === 'cue');
  const headUnit = owners.find((spec) => spec.name === 'head-unit');
  const audio = owners.find((spec) => spec.name === 'mercedes-audio');
  activeCheck = 'electronics SPA navigation';
  await gotoOwner(electrical);
  for (const spec of [cue, headUnit, audio, mercedesElectrical]) await spaTo(spec);
  const documentId = await page.evaluate(() => window.__masterSeoDocumentId);
  await page.goBack();
  await checkRoute(audio);
  assert.equal(await page.evaluate(() => window.__masterSeoDocumentId), documentId);
  report.spaNavigation.push(`back:${audio.route}`);
  await page.goForward();
  await checkRoute(mercedesElectrical);
  report.spaNavigation.push(`forward:${mercedesElectrical.route}`);
  await spaTo(electrical);

  activeCheck = 'prevented WhatsApp analytics and privacy';
  const sentinel = 'MASTER_QA_PRIVATE_MESSAGE_DO_NOT_LOG';
  await gotoOwner(cue, `?message=${sentinel}&utm_source=google&utm_medium=organic#qa-private`);
  // The attribution marker above is written by the mounted Analytics effect.
  // Spy on gtag only after mounting; do not replace application analytics logic.
  await page.evaluate(() => {
    window.__masterSeoGtagEvents = [];
    const original = window.gtag;
    window.gtag = (...args) => { window.__masterSeoGtagEvents.push(args); original?.(...args); };
  });
  const clickTarget = page.locator('main a[data-cta-placement="service_scope"][href^="https://wa.me/"]').first();
  const originalHref = await clickTarget.getAttribute('href');
  await clickTarget.evaluate((anchor, message) => {
    const url = new URL(anchor.href);
    url.searchParams.set('text', message);
    anchor.href = url.href;
  }, sentinel);
  const beforeClick = await page.evaluate(() => ({ length: window.dataLayer?.length || 0, url: location.href, documentId: window.__masterSeoDocumentId }));
  await clickTarget.click();
  await page.waitForFunction((start) => window.dataLayer?.slice(start).filter((item) => item?.event === 'whatsapp_click').length === 1, beforeClick.length);
  const analytics = await page.evaluate((start) => ({ entries: window.dataLayer.slice(start), events: window.__masterSeoGtagEvents, url: location.href, documentId: window.__masterSeoDocumentId }), beforeClick.length);
  const clickEvents = analytics.entries.filter((entry) => entry?.event === 'whatsapp_click');
  assert.equal(clickEvents.length, 1);
  assert.equal(clickEvents[0].link_url, 'https://wa.me/97143402223');
  assert.equal(clickEvents[0].page_path, cue.route);
  assert.ok(!JSON.stringify(analytics.entries).includes(sentinel), 'No prefilled message or URL query in analytics dataLayer');
  assert.ok(!JSON.stringify(analytics.events).includes(sentinel), 'No prefilled message or URL query in gtag');
  const contactEvents = analytics.events.filter((event) => event[0] === 'event' && event[1] === 'whatsapp_chat_opened');
  assert.equal(contactEvents.length, 1);
  assert.equal(contactEvents[0][2].cta_placement, 'service_scope');
  assert.equal(analytics.url, beforeClick.url, 'Contact navigation prevented');
  assert.equal(analytics.documentId, beforeClick.documentId);
  await clickTarget.evaluate((anchor, href) => { anchor.href = href; }, originalHref);
  report.analytics = { passed: true, whatsappClickCount: 1, chatOpenedCount: 1, placement: 'service_scope', sanitizedUrl: clickEvents[0].link_url, messageAndQueryExcluded: true, navigationPrevented: true };

  assert.deepEqual(report.runtimeOrHydrationErrors, []);
  assert.deepEqual(report.failedLocalResponses, []);
  assert.deepEqual(report.blockedLocalWrites, []);
  assert.deepEqual(report.unexpectedPopups, []);
  report.passed = true;
  console.log(`Master SEO browser checks passed: ${report.pageChecks.length} responsive owner checks, FAQs, camera details, electronics SPA route/schema replacement, and one prevented private WhatsApp click.`);
} catch (error) {
  report.failure = { at: activeCheck, message: error.message, stack: error.stack };
  if (page && !page.isClosed()) {
    try { await saveScreenshot('failure'); } catch (captureError) { report.failure.screenshotError = captureError.message; }
  }
  console.error(`Master SEO browser check failed at ${activeCheck}: ${error.message}`);
  process.exitCode = 1;
} finally {
  report.finishedAt = new Date().toISOString();
  await writeFile(`${output}/browser-results.json`, JSON.stringify(report, null, 2));
  if (browser) await browser.close();
}
