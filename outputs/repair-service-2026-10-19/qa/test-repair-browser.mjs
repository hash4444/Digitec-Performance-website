import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { routes } from './repair-routes.mjs';

// Final built output must be served by the production-aware local preview.
// All requests except same-origin GET/HEAD are blocked. No customer message,
// appointment, telephone call, backend write, or confirmed enquiry is sent.
const modules = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const require = createRequire(path.join(modules, 'playwright', 'package.json'));
const { chromium } = require('playwright');
const base = new URL(process.argv[2] || 'http://127.0.0.1:5196').origin;
assert.ok(['http://127.0.0.1:5196', 'http://127.0.0.1:5197'].includes(base), 'Only dedicated local previews are permitted');
const output = process.argv[3] || 'outputs/repair-service-2026-10-19/qa/browser';
await mkdir(output, { recursive: true });
const origin = 'https://digitecme.com';
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow', width: 320, height: 844 },
];
const report = {
  checkedAt: new Date().toISOString(), base, passed: false,
  browser: 'Headless Microsoft Edge using bundled Playwright',
  pageChecks: [], interactions: [], noJavaScript: [], hubLinks: [], screenshots: [],
  failures: [], runtimeOrHydrationErrors: [], failedLocalResponses: [],
  blockedExternalRequests: {}, blockedLocalWrites: [], unexpectedPopups: [],
  safety: 'External requests and contact navigation blocked; non-GET/HEAD requests blocked; window.open stubbed. Contact clicks are interest signals, never confirmed enquiries.',
  limitations: 'Local built HTML and browser behavior only. No delivery, CRM receipt, field Core Web Vitals, GA4 ingestion, live ranking, or confirmed customer enquiry is asserted.',
};
let active = 'startup';
let browser;

async function protect(context, javaScriptEnabled) {
  await context.route('**/*', async route => {
    const request = route.request();
    const url = new URL(request.url());
    if (url.origin !== base) {
      report.blockedExternalRequests[url.origin] = (report.blockedExternalRequests[url.origin] || 0) + 1;
      return route.abort();
    }
    if (!['GET', 'HEAD'].includes(request.method())) {
      report.blockedLocalWrites.push({ at: active, method: request.method(), path: url.pathname });
      return route.abort();
    }
    return route.continue();
  });
  if (javaScriptEnabled) await context.addInitScript(() => {
    window.__repairOpens = [];
    window.__repairEvents = [];
    window.open = (...args) => { window.__repairOpens.push(args); return null; };
    document.addEventListener('click', event => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor && new URL(anchor.href, location.href).origin !== location.origin) event.preventDefault();
    }, true);
  });
}

function monitor(page) {
  page.on('pageerror', error => report.runtimeOrHydrationErrors.push({ at: active, message: error.message }));
  page.on('console', message => {
    if (['error', 'warning'].includes(message.type()) && /hydrat|did not match|Minified React error|Uncaught|error while hydrating/i.test(message.text())) {
      report.runtimeOrHydrationErrors.push({ at: active, message: message.text() });
    }
  });
  page.on('response', response => {
    if (new URL(response.url()).origin === base && response.status() >= 400) {
      report.failedLocalResponses.push({ at: active, path: new URL(response.url()).pathname, status: response.status() });
    }
  });
  page.on('popup', async popup => {
    report.unexpectedPopups.push({ at: active, url: popup.url() });
    await popup.close();
  });
}

async function screenshot(page, name) {
  const file = path.join(output, `${name}.png`);
  await page.screenshot({ path: file, fullPage: false, animations: 'disabled' });
  report.screenshots.push(file.replaceAll('\\', '/'));
}

async function layoutCheck(page) {
  const layout = await page.evaluate(() => ({
    viewportWidth: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
  }));
  assert.ok(layout.overflow <= 1, `${active}: ${layout.overflow}px horizontal overflow`);
  return layout;
}

async function schemaCheck(page, spec) {
  const nodes = await page.locator('script[type="application/ld+json"]').evaluateAll(scripts => scripts.flatMap(script => {
    const value = JSON.parse(script.textContent);
    return value['@graph'] || [value];
  }));
  const services = nodes.filter(node => [].concat(node['@type']).includes('Service'));
  const breadcrumbs = nodes.filter(node => [].concat(node['@type']).includes('BreadcrumbList'));
  const faqs = nodes.filter(node => [].concat(node['@type']).includes('FAQPage'));
  const ids = nodes.map(node => node['@id']).filter(Boolean);
  assert.equal(new Set(ids).size, ids.length, 'No duplicate top-level entity IDs');
  assert.equal(services.length, 1, 'Exactly one Service');
  assert.equal(services[0]['@id'], `${origin}${spec.route}#service`);
  assert.equal(services[0].provider?.['@id'], `${origin}/#business`, 'Established business identity retained');
  assert.equal(breadcrumbs.length, 1, 'Exactly one breadcrumb graph');
  assert.equal(breadcrumbs[0].itemListElement.at(-1).item, `${origin}${spec.route}`);
  assert.equal(faqs.length, 1, 'One FAQ graph');
  assert.ok(faqs[0].mainEntity.length >= 3, 'Substantial FAQ graph');
  const body = await page.locator('main').textContent();
  for (const faq of faqs[0].mainEntity) {
    const normal = value => value.replace(/\s+/g, ' ').trim();
    assert.ok(normal(body).includes(normal(faq.name)), 'Schema question is retained in rendered body');
    assert.ok(normal(body).includes(normal(faq.acceptedAnswer.text)), 'Schema answer matches crawlable body');
  }
  return { graphNodes: nodes.length, serviceProvider: services[0].provider['@id'], faqQuestions: faqs[0].mainEntity.length };
}

async function contactCheck(page, spec, viewport) {
  const heroWhatsApp = page.locator('main a[data-cta-placement="hero"][href^="https://wa.me/"]');
  const heroPhone = page.locator('main a[data-cta-placement="hero"][href="tel:+97143402223"]');
  const finalWhatsApp = page.locator(`main a[data-cta-placement="${spec.preservedOwner ? 'final_cta' : 'repair_quote'}"][href^="https://wa.me/"]`);
  assert.equal(await heroWhatsApp.count(), 1, 'One hero WhatsApp action');
  assert.equal(await heroPhone.count(), 1, 'One hero telephone action');
  assert.equal(await finalWhatsApp.count(), 1, 'One final appointment or quote action');
  const href = await heroWhatsApp.getAttribute('href');
  const draft = new URL(href);
  assert.equal(draft.origin + draft.pathname, 'https://wa.me/97143402223');
  assert.ok(draft.searchParams.get('text')?.length > 25, 'Useful prefilled repair enquiry');
  if (!spec.preservedOwner) {
    const panel = page.locator('#service-booking [data-repair-enquiry]');
    assert.equal(await panel.count(), 1, 'One targeted repair assessment and quote panel');
    assert.equal(await page.locator('main a[data-cta-placement="final_cta"]').count(), 0, 'Repair panel is the final appointment action');
    assert.equal(await finalWhatsApp.getAttribute('href'), href, 'Hero and repair panel retain identical repair context');
    const note = (await panel.locator('[data-repair-draft-note]').textContent()).trim();
    const fields = spec.language === 'ar'
      ? ['الطراز:', 'سنة الصنع:', 'المسافة:', 'سجل الصيانة', 'التحذير', 'متى تظهر:', 'الموعد المفضل:']
      : ['Model:', 'Year:', 'Mileage:', 'Service history', 'Warning or symptoms:', 'When it occurs:', 'Preferred appointment time:'];
    for (const field of fields) assert.ok(draft.searchParams.get('text').includes(field), `Draft requests ${field}`);
    assert.match(note, spec.language === 'ar' ? /إرسال.*واتساب/ : /press Send in WhatsApp/);
    assert.match(note, spec.language === 'ar' ? /لا يؤكد.*حجز موعد/ : /does not confirm receipt or an appointment/);
    assert.equal(await panel.locator('nav a[href^="/"]').count(), 2, 'Two direct related repair paths');
    if (spec.language === 'ar') {
      assert.equal(await heroPhone.locator('bdi[dir="ltr"]').count(), 1, 'Arabic hero telephone is direction-isolated');
      assert.equal(await panel.locator('a[href="tel:+97143402223"] bdi[dir="ltr"]').count(), 1, 'Arabic quotation telephone is direction-isolated');
    }
  } else assert.equal(await page.locator('[data-repair-enquiry]').count(), 0, 'Preserved diagnostics owner retains its original conversion section');
  const contactLinks = await page.locator('main a[data-cta-placement][href^="https://wa.me/"]').evaluateAll(links => links.map(a => ({ href: a.href, placement: a.dataset.ctaPlacement, label: a.textContent.trim() })));
  assert.ok(contactLinks.every(link => new URL(link.href).pathname === '/97143402223'), 'Consistent workshop WhatsApp number');
  const start = await page.evaluate(() => window.dataLayer?.length || 0);
  await heroWhatsApp.click();
  await heroPhone.click();
  await finalWhatsApp.scrollIntoViewIfNeeded();
  if (viewport.name === 'mobile') await screenshot(page, `${spec.key}-${spec.language}-mobile-booking`);
  await finalWhatsApp.click();
  const state = await page.evaluate(startIndex => ({
    entries: window.dataLayer?.slice(startIndex) || [],
    events: window.__repairEvents,
    opens: window.__repairOpens,
    pathname: location.pathname,
  }), start);
  assert.equal(state.pathname, spec.route, 'Safe contact clicks retain local route');
  assert.equal(state.opens.length, 0, 'Anchors open no real window');
  assert.equal(state.entries.filter(entry => entry?.event === 'whatsapp_click').length, 2);
  assert.equal(state.events.filter(event => event[0] === 'event' && event[1] === 'whatsapp_chat_opened').length, 2);
  assert.equal(state.events.filter(event => event[0] === 'event' && event[1] === 'telephone_link_clicked').length, 1);
  assert.ok(!JSON.stringify([state.events, state.entries]).includes('generate_lead'), 'Contact clicks do not become confirmed enquiry events');
  await layoutCheck(page);
  return { repairDraft: draft.searchParams.get('text'), contactLinks, safeWhatsAppClicks: 2, safePhoneClicks: 1, confirmedEnquiries: 0 };
}

async function faqCheck(page, spec, viewport) {
  const trigger = page.locator('#service-faqs button[aria-expanded]').first();
  assert.equal(await trigger.count(), 1, 'FAQ disclosure exists');
  await trigger.scrollIntoViewIfNeeded();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  const id = await trigger.getAttribute('id');
  assert.ok(id, 'FAQ has labelled control');
  const answer = page.locator(`#service-faqs [role="region"][aria-labelledby="${id}"]`);
  assert.equal(await answer.count(), 1);
  await trigger.click();
  await answer.waitFor({ state: 'visible' });
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  assert.ok((await answer.innerText()).length > 25);
  await layoutCheck(page);
  if (viewport.name === 'mobile') await screenshot(page, `${spec.key}-${spec.language}-mobile-faq`);
  await trigger.focus();
  await trigger.press('Enter');
  await answer.waitFor({ state: 'hidden' });
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  return { faqOpensByClick: true, faqClosesByKeyboard: true, labelledAnswer: true };
}

async function checkPage(page, spec, viewport) {
  const response = await page.goto(base + spec.route, { waitUntil: 'networkidle' });
  assert.equal(response?.status(), 200);
  await page.locator('main h1').waitFor({ state: 'visible' });
  await page.waitForFunction(expected => document.querySelector('link[rel="canonical"]')?.href === expected, origin + spec.route);
  await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = 'html { scroll-behavior:auto!important } *,*::before,*::after { animation-duration:0s!important;transition-duration:0s!important }';
    document.head.append(style);
    window.__repairEvents = [];
    const original = window.gtag;
    window.gtag = (...args) => { window.__repairEvents.push(args); original?.(...args); };
  });
  assert.equal(await page.locator('h1').count(), 1, 'One H1');
  const h1 = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
  assert.ok(h1.length > 12);
  if (spec.language === 'en') assert.ok(h1.includes(spec.brand), 'Brand in English heading');
  else {
    assert.match(h1, /[\u0600-\u06ff]/, 'Arabic heading');
    assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  }
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
  assert.equal(await page.locator('meta[name="description"]').count(), 1);
  assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 35);
  assert.doesNotMatch(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/i);
  assert.ok((await page.title()).length > 15);
  for (const [language, route] of [['en-AE', spec.route.replace(/^\/ar/, '')], ['ar-AE', `/ar${spec.route.replace(/^\/ar/, '')}`]]) {
    assert.equal(await page.locator(`link[rel="alternate"][hreflang="${language}"]`).getAttribute('href'), origin + route);
  }
  const process = await page.locator('#service-process').textContent();
  assert.ok(process.trim().length > 200, 'Diagnostic and repair process is crawlable');
  assert.ok(await page.locator(`main a[href="${spec.hub}"]`).count(), 'Crawlable link back to correct localized brand hub');
  const schema = await schemaCheck(page, spec);
  const images = await page.evaluate(() => [...document.images].filter(img => {
    const rect = img.getBoundingClientRect();
    return rect.width && rect.height && rect.top < innerHeight && rect.bottom > 0 && getComputedStyle(img).visibility !== 'hidden';
  }).map(img => ({ source: img.getAttribute('src'), loaded: img.complete && img.naturalWidth > 0 })));
  assert.deepEqual(images.filter(img => !img.loaded), [], 'Visible images load');
  const layout = await layoutCheck(page);
  if (viewport.name !== 'narrow') await screenshot(page, `${spec.key}-${spec.language}-${viewport.name}-hero`);
  const faq = await faqCheck(page, spec, viewport);
  const contacts = await contactCheck(page, spec, viewport);
  return { route: spec.route, language: spec.language, viewport: viewport.name, width: viewport.width, title: await page.title(), h1, images, ...layout, ...schema, ...faq, ...contacts, passed: true };
}

try {
  browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const context = await browser.newContext({ viewport: { width: viewports[0].width, height: viewports[0].height }, reducedMotion: 'reduce', serviceWorkers: 'block' });
  context.setDefaultTimeout(15000);
  await protect(context, true);
  const page = await context.newPage();
  monitor(page);
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    for (const spec of routes) {
      active = `${spec.route} ${viewport.name}`;
      try {
        const result = await checkPage(page, spec, viewport);
        report.pageChecks.push(result);
        report.interactions.push({ route: spec.route, viewport: viewport.name, faqOpensByClick: true, faqClosesByKeyboard: true, safeWhatsAppClicks: 2, safePhoneClicks: 1, confirmedEnquiries: 0 });
      } catch (error) {
        report.failures.push({ at: active, message: error.message });
        console.error(`FAIL ${active}: ${error.message}`);
        await screenshot(page, `${spec.key}-${spec.language}-${viewport.name}-failure`).catch(() => {});
      }
    }
    console.log(`${viewport.name}: ${report.pageChecks.filter(item => item.viewport === viewport.name).length}/${routes.length} route cases passed`);
  }
  // Links from completed brand hubs are inspected without changing hub content.
  for (const spec of routes) {
    active = `Hub link ${spec.hub} -> ${spec.route}`;
    try {
      assert.equal((await page.goto(base + spec.hub, { waitUntil: 'networkidle' }))?.status(), 200);
      const links = await page.locator(`main a[href="${spec.route}"]`).count();
      assert.ok(links > 0, 'Repair owner reachable from localized brand hub');
      report.hubLinks.push({ hub: spec.hub, owner: spec.route, links, passed: true });
    } catch (error) { report.failures.push({ at: active, message: error.message }); }
  }
  await context.close();
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  noJsContext.setDefaultTimeout(15000);
  await protect(noJsContext, false);
  const noJs = await noJsContext.newPage();
  monitor(noJs);
  for (const spec of routes) {
    active = `${spec.route} no JavaScript`;
    try {
      assert.equal((await noJs.goto(base + spec.route, { waitUntil: 'networkidle' }))?.status(), 200);
      assert.equal(await noJs.locator('main h1').count(), 1);
      await noJs.locator('main h1').waitFor({ state: 'visible' });
      const body = await noJs.locator('main').textContent();
      assert.ok(body.trim().length > 1500, 'Substantial prerendered repair content');
      assert.equal(await noJs.locator('link[rel="canonical"]').getAttribute('href'), origin + spec.route);
      const schema = await schemaCheck(noJs, spec);
      const answers = await noJs.locator('#service-faqs [role="region"]').allTextContents();
      assert.ok(answers.length >= 3 && answers.every(answer => answer.trim().length > 20), 'FAQ answers remain in raw HTML');
      assert.equal(await noJs.locator('main a[data-cta-placement="hero"][href^="https://wa.me/97143402223"]').count(), 1);
      assert.equal(await noJs.locator('main a[data-cta-placement="hero"][href="tel:+97143402223"]').count(), 1);
      if (!spec.preservedOwner) {
        assert.equal(await noJs.locator('#service-booking [data-repair-enquiry]').count(), 1, 'Repair quote and booking explanation is prerendered');
        assert.equal(await noJs.locator('[data-repair-draft-note]').count(), 1);
        assert.equal(await noJs.locator('a[data-cta-placement="repair_quote"][href^="https://wa.me/97143402223"]').count(), 1);
      }
      report.noJavaScript.push({ route: spec.route, passed: true, h1Visible: true, bodyCharacters: body.length, crawlableFAQAnswers: answers.length, contactLinks: true, ...schema });
    } catch (error) {
      report.failures.push({ at: active, message: error.message });
      console.error(`FAIL ${active}: ${error.message}`);
    }
  }
  await noJsContext.close();
  assert.equal(report.pageChecks.length, routes.length * viewports.length, 'All hydrated route/viewport cases pass');
  assert.equal(report.noJavaScript.length, routes.length, 'All no-JavaScript routes pass');
  assert.equal(report.hubLinks.length, routes.length, 'All localized hub links reach repair owner');
  assert.deepEqual(report.runtimeOrHydrationErrors, [], 'No runtime or hydration errors');
  assert.deepEqual(report.failedLocalResponses, [], 'No failed local responses');
  assert.deepEqual(report.blockedLocalWrites, [], 'No attempted backend writes');
  assert.deepEqual(report.unexpectedPopups, [], 'No real contact windows');
  assert.deepEqual(report.failures, []);
  report.passed = true;
} catch (error) { report.failures.push({ at: active, message: error.message }); }
finally {
  await browser?.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ passed: report.passed, pageChecks: report.pageChecks.length, noJavaScript: report.noJavaScript.length, hubLinks: report.hubLinks.length, failures: report.failures, output }, null, 2));
if (!report.passed) process.exitCode = 1;
