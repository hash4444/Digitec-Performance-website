import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Run only after the final build is served by the production-aware local preview:
// node outputs/five-brand-service-2026-10-19/conversion/test-five-brand-browser.mjs
// Optional arguments: local origin, output directory. Never permits production.
const runtimeModules = 'C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const require = createRequire(path.join(runtimeModules, 'playwright', 'package.json'));
const { chromium } = require('playwright');
const base = new URL(process.argv[2] || 'http://127.0.0.1:5194').origin;
assert.ok(['http://127.0.0.1:5194', 'http://127.0.0.1:5195'].includes(base), 'Use a dedicated local preview on 127.0.0.1:5194 or :5195 only');
const output = process.argv[3] || 'outputs/five-brand-service-2026-10-19/conversion/browser';
await mkdir(output, { recursive: true });
const origin = 'https://digitecme.com';
const brands = [
  { slug: 'rolls-royce-service-dubai', name: 'Rolls-Royce' },
  { slug: 'lamborghini-service-dubai', name: 'Lamborghini' },
  { slug: 'volkswagen-service-dubai', name: 'Volkswagen' },
  { slug: 'mercedes-benz-service-dubai', name: 'Mercedes-Benz' },
  { slug: 'bmw-service-dubai', name: 'BMW' },
];
const routes = brands.flatMap(brand => ['en', 'ar'].map(language => ({
  ...brand, language, route: `${language === 'ar' ? '/ar' : ''}/brands/${brand.slug}`,
})));
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow', width: 320, height: 844 },
];
const report = {
  checkedAt: new Date().toISOString(), passed: false, base,
  browser: 'Headless Microsoft Edge through bundled Playwright',
  pageChecks: [], interactions: [], noJavaScript: [], screenshots: [], failures: [],
  runtimeOrHydrationErrors: [], failedLocalResponses: [], unexpectedPopups: [],
  blockedExternalRequests: {}, blockedLocalWrites: [],
  safety: 'Only local GET/HEAD requests are allowed. External contact navigation is prevented. window.open is stubbed, so no WhatsApp draft is opened in a real app and no message or enquiry is sent.',
  limitations: 'Tests local rendered output and client behavior. Does not verify WhatsApp delivery, connected calls, GA4 ingestion, CRM receipt, confirmed enquiries or field Core Web Vitals.',
};
let activeCheck = 'startup';
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
      report.blockedLocalWrites.push({ path: url.pathname, method: request.method() });
      return route.abort();
    }
    return route.continue();
  });
  if (javaScriptEnabled) await context.addInitScript(() => {
    window.__fiveBrandOpens = [];
    window.__fiveBrandEvents = [];
    window.open = (...args) => { window.__fiveBrandOpens.push(args); return null; };
    document.addEventListener('click', event => {
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (anchor && new URL(anchor.href, location.href).origin !== location.origin) event.preventDefault();
    }, true);
  });
}

function monitor(page) {
  page.on('pageerror', error => report.runtimeOrHydrationErrors.push({ at: activeCheck, message: error.message }));
  page.on('console', message => {
    if (['error', 'warning'].includes(message.type()) && /hydrat|did not match|Minified React error|Uncaught|error while hydrating/i.test(message.text())) {
      report.runtimeOrHydrationErrors.push({ at: activeCheck, message: message.text() });
    }
  });
  page.on('response', response => {
    if (new URL(response.url()).origin === base && response.status() >= 400) {
      report.failedLocalResponses.push({ at: activeCheck, path: new URL(response.url()).pathname, status: response.status() });
    }
  });
  page.on('popup', async popup => {
    report.unexpectedPopups.push({ at: activeCheck, url: popup.url() });
    await popup.close();
  });
}

async function screenshot(page, name) {
  const filename = path.join(output, `${name}.png`);
  await page.screenshot({ path: filename, fullPage: false, animations: 'disabled' });
  report.screenshots.push(filename.replaceAll('\\', '/'));
}

async function overflowCheck(page, label) {
  const layout = await page.evaluate(() => ({
    viewportWidth: innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
  }));
  assert.ok(layout.overflow <= 1, `${label}: horizontal overflow of ${layout.overflow}px`);
  return layout;
}

async function routeCheck(page, spec, viewport) {
  const response = await page.goto(base + spec.route, { waitUntil: 'networkidle' });
  assert.equal(response?.status(), 200, `${spec.route}: HTTP 200`);
  await page.locator('main h1').waitFor({ state: 'visible' });
  await page.waitForFunction(expected => document.querySelector('link[rel="canonical"]')?.href === expected, origin + spec.route);
  // Mounting Analytics gives a concrete hydration marker without an arbitrary sleep.
  await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch') !== null);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.textContent = 'html { scroll-behavior: auto !important; } *, *::before, *::after { animation-duration: 0s !important; transition-duration: 0s !important; }';
    document.head.append(style);
    window.__fiveBrandEvents = [];
    const original = window.gtag;
    window.gtag = (...args) => { window.__fiveBrandEvents.push(args); original?.(...args); };
  });
  assert.equal(await page.locator('h1').count(), 1, 'One H1');
  const h1 = (await page.locator('h1').innerText()).replace(/\s+/g, ' ').trim();
  assert.ok(h1.length > 12, 'Descriptive H1');
  if (spec.language === 'en') assert.ok(h1.includes(spec.name), `${spec.name} in English H1`);
  else {
    assert.match(h1, /[\u0600-\u06ff]/, 'Arabic heading');
    assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  }
  assert.equal(await page.locator('link[rel="canonical"]').count(), 1);
  assert.equal(await page.locator('meta[name="description"]').count(), 1);
  assert.ok((await page.locator('meta[name="description"]').getAttribute('content')).length > 30);
  assert.doesNotMatch(await page.locator('meta[name="robots"]').getAttribute('content'), /noindex/i);

  const heroWhatsApp = page.locator('main a[data-cta-placement="hero"][href^="https://wa.me/"]');
  const heroPhone = page.locator('main a[data-cta-placement="hero"][href="tel:+97143402223"]');
  assert.equal(await heroWhatsApp.count(), 1, 'One hero WhatsApp action');
  assert.equal(await heroPhone.count(), 1, 'One hero phone action');
  if (spec.language === 'ar') {
    assert.equal(await heroPhone.locator('bdi[dir="ltr"]').count(), 1, 'Arabic hero telephone digits have explicit left-to-right isolation');
  }
  assert.equal(new URL(await heroWhatsApp.getAttribute('href')).pathname, '/97143402223');
  const heroDraft = new URL(await heroWhatsApp.getAttribute('href')).searchParams.get('text');
  assert.ok(heroDraft && heroDraft.length > 35, 'Useful prefilled brand draft');
  if (spec.language === 'en') assert.ok(heroDraft.toLowerCase().includes(spec.name.toLowerCase().replace('-benz', '')));
  const beforeClicks = await page.evaluate(() => window.dataLayer?.length || 0);
  await heroWhatsApp.click();
  await heroPhone.click();
  const clickState = await page.evaluate(start => ({
    entries: window.dataLayer?.slice(start) || [], events: window.__fiveBrandEvents,
    pathname: location.pathname, opens: window.__fiveBrandOpens.length,
  }), beforeClicks);
  const whatsAppClick = clickState.entries.filter(entry => entry?.event === 'whatsapp_click');
  assert.equal(whatsAppClick.length, 1);
  assert.equal(whatsAppClick[0].link_url, 'https://wa.me/97143402223');
  assert.equal(clickState.events.filter(event => event[0] === 'event' && event[1] === 'whatsapp_chat_opened').length, 1);
  assert.equal(clickState.events.filter(event => event[0] === 'event' && event[1] === 'telephone_link_clicked').length, 1);
  assert.equal(clickState.pathname, spec.route, 'Contact anchors remain on local route');
  assert.equal(clickState.opens, 0, 'No popup from prevented contact anchors');

  const mobileWhatsApp = page.locator('a[data-cta-placement="mobile_bar"][href^="https://wa.me/"]');
  const mobilePhone = page.locator('a[data-cta-placement="mobile_bar"][href="tel:+97143402223"]');
  assert.equal(await mobileWhatsApp.count(), 1, 'One mobile WhatsApp action');
  assert.equal(await mobilePhone.count(), 1, 'One mobile phone action');
  assert.equal(await mobileWhatsApp.isVisible(), viewport.width < 768, 'Mobile bar breakpoint');
  assert.equal(await mobilePhone.isVisible(), viewport.width < 768, 'Phone mobile bar breakpoint');
  if (spec.language === 'ar') {
    assert.match(await mobileWhatsApp.textContent(), /واتساب/);
    assert.match(await mobilePhone.textContent(), /اتصل بالورشة/);
  } else assert.match(await mobilePhone.textContent(), /Call Workshop/);
  const mobileBounds = viewport.width < 768 ? await mobileWhatsApp.boundingBox() : null;
  if (mobileBounds) {
    assert.ok(mobileBounds.height >= 44, 'Mobile CTA minimum 44px height');
    assert.ok(mobileBounds.y >= 0 && mobileBounds.y + mobileBounds.height <= viewport.height + 1, 'Mobile action visible within viewport');
  }

  if (spec.language === 'ar' || spec.slug === 'volkswagen-service-dubai') {
    const scope = page.locator('section[aria-labelledby="brand-service-scope-title"]');
    assert.equal(await scope.count(), 1, 'Targeted maintenance/diagnosis/mechanical/electrical scope');
    assert.equal(await scope.locator('article').count(), 4);
    const hrefs = await scope.locator('article a').evaluateAll(links => links.map(a => a.getAttribute('href')));
    assert.equal(hrefs.length, 4);
    assert.ok(hrefs.every(href => href.startsWith(spec.language === 'ar' ? '/ar/' : '/')));
  }
  const visibleImages = await page.evaluate(() => [...document.images].filter(image => {
    const rect = image.getBoundingClientRect();
    const style = getComputedStyle(image);
    return rect.width && rect.height && rect.top < innerHeight && rect.bottom > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  }).map(image => ({ source: image.getAttribute('src'), loaded: image.complete && image.naturalWidth > 0 })));
  assert.deepEqual(visibleImages.filter(image => !image.loaded), [], 'Visible hero/logo images load');
  await page.evaluate(() => window.scrollTo(0, 0));
  const layout = await overflowCheck(page, activeCheck);
  return { route: spec.route, language: spec.language, viewport: viewport.name, width: viewport.width, h1, title: await page.title(), mobileBarVisible: viewport.width < 768, heroDraftPresent: true, heroContactClicksTrackedWithoutNavigation: true, visibleImages, ...layout };
}

async function faqCheck(page, spec, viewport) {
  const trigger = page.locator('main .brand-faq button[aria-expanded]').first();
  assert.ok(await trigger.count(), 'FAQ disclosure present');
  await trigger.scrollIntoViewIfNeeded();
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  const triggerId = await trigger.getAttribute('id');
  assert.ok(triggerId, 'FAQ trigger has a stable label ID');
  const answer = page.locator(`main .brand-faq [role="region"][aria-labelledby="${triggerId}"]`);
  assert.equal(await answer.count(), 1, 'FAQ answer is labelled by its trigger');
  await trigger.click();
  await answer.waitFor({ state: 'visible' });
  assert.equal(await trigger.getAttribute('aria-expanded'), 'true');
  assert.ok((await answer.innerText()).trim().length > 25);
  await overflowCheck(page, `${activeCheck} FAQ open`);
  if (viewport.name === 'mobile') await screenshot(page, `${spec.slug}-${spec.language}-mobile-faq`);
  await trigger.focus();
  await trigger.press('Enter');
  await answer.waitFor({ state: 'hidden' });
  assert.equal(await trigger.getAttribute('aria-expanded'), 'false');
  return { faqClickOpens: true, faqKeyboardEnterCloses: true, answerLabelled: true };
}

async function formCheck(page, spec, viewport) {
  const form = page.locator('#brand-booking-form');
  assert.equal(await form.count(), 1);
  const submit = form.locator('button[type="submit"]');
  await submit.click();
  await form.locator('#bf-issue-error').waitFor({ state: 'visible' });
  assert.equal(await form.locator('#bf-issue').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.evaluate(() => window.__fiveBrandOpens.length), 0, 'Empty form cannot open WhatsApp');

  await form.locator('#bf-issue').fill('Scheduled maintenance due. Model 2020; mileage 40000 km.');
  await form.locator('#bf-phone').fill('invalid');
  await submit.click();
  await form.locator('#bf-phone-error').waitFor({ state: 'visible' });
  assert.equal(await page.evaluate(() => window.__fiveBrandOpens.length), 0, 'Invalid optional callback blocks draft');

  const sentinel = 'FIVE_BRAND_QA_PRIVATE_SENTINEL';
  const brandLabel = await form.locator('#bf-brand').inputValue();
  await form.locator('#bf-name').fill(sentinel);
  await form.locator('#bf-phone').fill('+971 50 123 4567');
  await form.locator('#bf-issue').fill(`${sentinel}. Model 2020; mileage 40000 km; maintenance due.`);
  const beforeLength = await page.evaluate(() => window.dataLayer?.length || 0);
  await submit.click();
  await page.waitForFunction(() => window.__fiveBrandOpens.length === 1);
  const result = await page.evaluate(start => ({
    opens: window.__fiveBrandOpens,
    events: window.__fiveBrandEvents,
    entries: window.dataLayer?.slice(start) || [],
    location: location.pathname,
  }), beforeLength);
  assert.equal(result.opens[0][1], '_blank');
  assert.equal(result.opens[0][2], 'noopener,noreferrer');
  const draft = new URL(result.opens[0][0]);
  assert.equal(draft.origin + draft.pathname, 'https://wa.me/97143402223');
  assert.ok(draft.searchParams.get('text').includes(brandLabel), 'Form brand retained in draft');
  assert.ok(draft.searchParams.get('text').includes(sentinel), 'Entered details retained only in draft');
  assert.equal(result.location, spec.route, 'No contact navigation');
  assert.equal(result.entries.filter(entry => entry?.event === 'whatsapp_click').length, 1);
  assert.equal(result.events.filter(event => event[0] === 'event' && event[1] === 'whatsapp_draft_opened').length, 1);
  assert.ok(!JSON.stringify([result.events, result.entries]).includes(sentinel), 'Private form values excluded from analytics');
  assert.ok(!JSON.stringify([result.events, result.entries]).includes('123 4567'), 'Private phone excluded from analytics');
  assert.ok(!JSON.stringify(result.events).includes('generate_lead'), 'Draft is not a confirmed enquiry event');
  assert.equal(await form.locator('[role="alert"]').count(), 0, 'Validation errors clear');
  await overflowCheck(page, `${activeCheck} form`);
  if (viewport.name === 'mobile') await screenshot(page, `${spec.slug}-${spec.language}-mobile-form`);

  // The optional-field path is tested through the real hydrated form as well.
  await form.locator('#bf-name').fill('');
  await form.locator('#bf-phone').fill('');
  await form.locator('#bf-issue').fill('Maintenance due; please confirm the appropriate inspection.');
  await submit.click();
  await page.waitForFunction(() => window.__fiveBrandOpens.length === 2);
  return { emptyIssueRejected: true, invalidCallbackRejected: true, validDraftPreparedInStub: true, brandContextPreserved: true, privateValuesExcludedFromAnalytics: true, optionalPersonalDetailsAccepted: true, noConfirmedEnquiryClaim: true };
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
      activeCheck = `${spec.route} ${viewport.name}`;
      try {
        const state = await routeCheck(page, spec, viewport);
        await screenshot(page, `${spec.slug}-${spec.language}-${viewport.name}-hero`);
        const faq = await faqCheck(page, spec, viewport);
        const form = await formCheck(page, spec, viewport);
        report.pageChecks.push({ ...state, passed: true });
        report.interactions.push({ route: spec.route, viewport: viewport.name, ...faq, ...form });
      } catch (error) {
        report.failures.push({ at: activeCheck, message: error.message });
        console.error(`FAIL ${activeCheck}: ${error.message}`);
        await screenshot(page, `${spec.slug}-${spec.language}-${viewport.name}-failure`).catch(() => {});
      }
    }
    console.log(`${viewport.name}: ${report.pageChecks.filter(check => check.viewport === viewport.name).length}/${routes.length} routes passed`);
  }
  await context.close();

  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 }, serviceWorkers: 'block' });
  noJsContext.setDefaultTimeout(15000);
  await protect(noJsContext, false);
  const noJs = await noJsContext.newPage();
  monitor(noJs);
  for (const spec of routes) {
    activeCheck = `${spec.route} no JavaScript`;
    try {
      const response = await noJs.goto(base + spec.route, { waitUntil: 'networkidle' });
      assert.equal(response?.status(), 200);
      assert.equal(await noJs.locator('main h1').count(), 1);
      await noJs.locator('main h1').waitFor({ state: 'visible' });
      const bodyText = await noJs.locator('main').textContent();
      assert.ok(bodyText.length > 2500, 'Substantial prerendered brand body');
      assert.equal(await noJs.locator('link[rel="canonical"]').getAttribute('href'), origin + spec.route);
      assert.equal(await noJs.locator('main a[data-cta-placement="hero"][href^="https://wa.me/97143402223"]').count(), 1);
      assert.equal(await noJs.locator('main a[data-cta-placement="hero"][href="tel:+97143402223"]').count(), 1);
      const faqAnswers = await noJs.locator('main .brand-faq [role="region"]').evaluateAll(regions => regions.map(region => region.textContent.trim()));
      assert.ok(faqAnswers.length >= 3 && faqAnswers.every(answer => answer.length > 20), 'FAQ answers retained in raw HTML');
      const links = await noJs.locator('main a[href^="/"]').count();
      assert.ok(links > 10, 'Crawlable internal links');
      report.noJavaScript.push({ route: spec.route, passed: true, h1Visible: true, bodyCharacters: bodyText.length, faqAnswersInHtml: faqAnswers.length, internalLinks: links, heroContactLinks: true });
    } catch (error) {
      report.failures.push({ at: activeCheck, message: error.message });
      console.error(`FAIL ${activeCheck}: ${error.message}`);
    }
  }
  await noJsContext.close();
  assert.equal(report.pageChecks.length, routes.length * viewports.length, 'All 30 hydrated route/viewport cases pass');
  assert.equal(report.noJavaScript.length, routes.length, 'All 10 no-JavaScript routes pass');
  assert.deepEqual(report.runtimeOrHydrationErrors, [], 'No runtime/hydration errors');
  assert.deepEqual(report.failedLocalResponses, [], 'No failing local assets/routes');
  assert.deepEqual(report.blockedLocalWrites, [], 'No attempted local writes');
  assert.deepEqual(report.unexpectedPopups, [], 'No real popups');
  assert.deepEqual(report.failures, []);
  report.passed = true;
} catch (error) {
  report.failures.push({ at: activeCheck, message: error.message });
} finally {
  await browser?.close();
  report.finishedAt = new Date().toISOString();
  await writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ passed: report.passed, pageChecks: report.pageChecks.length, interactions: report.interactions.length, noJavaScript: report.noJavaScript.length, failures: report.failures, output }, null, 2));
if (!report.passed) process.exitCode = 1;
