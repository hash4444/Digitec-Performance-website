import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';

const require = createRequire(path.resolve(process.argv[2] || '.', 'package.json'));
const { chromium } = require('playwright');
let base = process.argv[3] || 'http://127.0.0.1:4173';
const route = '/services/paint-protection-film';
const arabicRoute = `/ar${route}`;
const output = process.env.QA_OUTPUT_DIR || 'ppf-qa.local';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
let builtServer;
if (process.argv.includes('--prerendered')) {
  // Vite preview falls back to the homepage for slashless directory URLs.
  // Serve the built HTML at its canonical path, as the generated edge router
  // does, so these checks actually exercise PPF hydration and initial CSS.
  const dist = path.resolve('dist');
  builtServer = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      const filePath = path.resolve(dist, `.${pathname}`, path.extname(pathname) ? '' : 'index.html');
      if (!filePath.startsWith(`${dist}${path.sep}`)) { response.writeHead(404); response.end(); return; }
      const content = await readFile(filePath);
      const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.pdf': 'application/pdf' };
      response.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
      response.end(content);
    } catch { response.writeHead(404); response.end(); }
  });
  await new Promise((resolve) => builtServer.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${builtServer.address().port}`;
}
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const requests = [];
const events = [];
const storageWrites = [];
const errors = [];
await context.exposeFunction('capturePpfEvent', (event) => events.push(event));
await context.exposeFunction('capturePpfStorage', (entry) => storageWrites.push(entry));
// Capture the dedicated page view before React mounts. Google/GTM requests are
// blocked, so this measures application emission rather than GA ingestion.
await context.addInitScript(() => {
  const setItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function (key, value) {
    window.capturePpfStorage({ key, value });
    return setItem.call(this, key, value);
  };
  window.dataLayer = [];
  const push = window.dataLayer.push;
  window.dataLayer.push = function (...items) {
    items.forEach((item) => window.capturePpfEvent(item && typeof item.length === 'number' && !item.event ? Array.from(item) : item));
    return push.apply(this, items);
  };
});
// Local QA must never send enquiries or analytics to production services.
await context.route('**/*', async (request) => {
  if (new URL(request.request().url()).origin === new URL(base).origin) return request.continue();
  requests.push(request.request().url());
  return request.abort();
});
const page = await context.newPage();
page.on('pageerror', (error) => errors.push(error.message));
const ready = async (pathname = route) => {
  events.length = 0;
  await page.goto(`${base}${pathname}`);
  await page.locator('#ppf-quote-form').waitFor();
  await page.waitForFunction(() => document.querySelector('#ppf-quote-form button[type=submit]')?.disabled === false);
  if (pathname === route) await page.locator('.ppf-hero-image img').evaluate((img) => img.decode());
  await page.waitForFunction(() => window.dataLayer.some((item) => item?.[1] === 'ppf_page_view'));
  assert.equal(events.filter((item) => Array.isArray(item) && item[1] === 'ppf_page_view').length, 1, `${pathname}: one initial PPF page view`);
};
const clearEvents = async () => {
  events.length = 0;
  await page.evaluate(() => {
    window.dataLayer.length = 0;
  });
};
const eventCount = (name) => events.filter((item) => item?.event === name || (Array.isArray(item) && item[1] === name)).length;
const assertPageViewContext = async (pathname) => {
  await page.waitForFunction((value) => window.dataLayer.some((item) => item?.[1] === 'ppf_page_view' && item[2]?.page_path === value), pathname);
  const views = events.filter((item) => Array.isArray(item) && item[1] === 'ppf_page_view' && item[2]?.page_path === pathname);
  assert.equal(views.length, 1, `${pathname}: exactly one PPF page view for the SPA visit`);
  const payload = views[0][2];
  const location = new URL(payload.page_location);
  assert.equal(location.pathname, payload.page_path, 'PPF event location must describe the destination SPA route');
  assert.equal(location.search, '', 'PPF event location must omit the query');
  assert.equal(location.hash, '', 'PPF event location must omit the hash');
  assert.equal(payload.language, pathname.startsWith('/ar/') ? 'ar' : 'en');
  if (payload.page_referrer !== 'direct') {
    const referrer = new URL(payload.page_referrer);
    assert.equal(referrer.search + referrer.hash, '');
    assert.equal(referrer.pathname, '/');
  }
};
const noConfirmedLead = () => {
  for (const name of ['quote_submitted', 'quote_success', 'quote_form_submitted', 'generate_lead', 'booking_confirmed']) assert.equal(eventCount(name), 0, `${name} must not fire for a WhatsApp draft`);
};
const selectOption = async (id, value, label) => {
  const field = page.locator(`#${id}`);
  if (await field.evaluate((element) => element.tagName === 'SELECT')) await field.selectOption(value);
  else {
    await field.click();
    await page.getByRole('option', { name: label, exact: true }).click();
  }
};
const assertPrivateValuesExcluded = async (readCurrentStorage = true) => {
  assert.doesNotMatch(JSON.stringify(events), /QA-private|qa-private|911 Test|\?text=/, 'Entered values or draft query leaked to analytics');
  assert.doesNotMatch(JSON.stringify(storageWrites), /QA-private|qa-private|911 Test/, 'Entered details persisted in browser storage');
  if (readCurrentStorage) {
    const persistence = await page.evaluate(() => JSON.stringify({ local: { ...localStorage }, session: { ...sessionStorage } }));
    assert.doesNotMatch(persistence, /QA-private|qa-private|911 Test/, 'Entered details persisted in browser storage');
  }
};
const fillForm = async () => {
  await page.locator('#ppf-brand').fill('QA-private-value-&-Ω');
  await page.locator('#ppf-model').fill('911 Test & Model');
  await page.locator('#ppf-year').fill('2025');
  await page.locator('#ppf-name').fill('QA-private Customer');
  await page.locator('#ppf-contact-details').fill('+971501234567');
  await page.locator('#ppf-notes').fill('QA-private notes Ω & special characters');
};
const assertNoHandoff = async () => {
  assert.equal(eventCount('whatsapp_click'), 0);
  assert.equal(eventCount('whatsapp_draft_opened'), 0);
  noConfirmedLead();
};
const formResults = [];
const testForm = async (pathname) => {
  await ready(pathname);
  await clearEvents();
  const submit = page.locator('#ppf-quote-form button[type=submit]');
  assert.match(await page.locator('#ppf-requested-coverage').textContent(), pathname.startsWith('/ar') ? /غير|متأكد|نصيحة|اختيار/ : /Unsure/);
  assert.equal(await page.locator('#ppf-requested-coverage').inputValue(), 'Unsure — advise me', 'Coverage must not silently default to a sold package');
  assert.equal(await page.locator('#ppf-notes').getAttribute('required'), null, 'Notes remain optional');
  assert.ok(await page.locator('#ppf-privacy a[href="/privacy-policy.pdf"]').count());
  assert.equal(await page.locator('#ppf-quote-form input[type=checkbox]:checked').count(), 0, 'No preselected marketing consent');
  await submit.click();
  await assertNoHandoff();
  await fillForm();
  assert.equal(eventCount('quote_started'), 1, 'One form-start event across all field changes');
  const language = pathname.startsWith('/ar') ? 'ar' : 'en';
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    for (const theme of ['dark', 'light']) {
      await page.evaluate((value) => document.documentElement.classList.toggle('theme-light', value === 'light'), theme);
      await page.locator('#ppf-quote-form').scrollIntoViewIfNeeded();
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${language} ${theme} quotation form overflows at ${width}`);
      // Hide fixed chrome only in the isolated form capture, so a tall element
      // screenshot does not bake the viewport header/bar into its middle.
      await page.locator('#ppf-quote-form').screenshot({ path: `${output}/${language}-quote-${width}-${theme}.png`, style: 'header, .ppf-mobile-contact { visibility: hidden !important; }' });
    }
  }
  await page.evaluate(() => document.documentElement.classList.remove('theme-light'));
  await page.setViewportSize({ width: 1440, height: 1000 });
  // Validate all required data before leaving the page. Dispatch submit as
  // well as native clicks so JS validation cannot rely on browser UI alone.
  for (const [id, invalid, valid] of [
    ['ppf-brand', '   ', 'QA-private-value-&-Ω'],
    ['ppf-model', '   ', '911 Test & Model'],
    ['ppf-year', '1899', '2025'],
    ['ppf-year', String(new Date().getFullYear() + 2), '2025'],
    ['ppf-year', '2025.5', '2025'],
    ['ppf-name', '   ', 'QA-private Customer'],
    ['ppf-contact-details', 'abc', '+971501234567'],
  ]) {
    await page.locator(`#${id}`).fill(invalid);
    await page.locator('#ppf-quote-form').evaluate((form) => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
    await assertNoHandoff();
    assert.ok(await page.locator('#ppf-quote-form [role=alert]').count(), `${id}: accessible invalid-data feedback`);
    await page.locator(`#${id}`).fill(valid);
  }
  const method = page.locator('#ppf-contact-method');
  const methods = await method.evaluate((element) => element.tagName === 'SELECT' ? Array.from(element.options, (option) => ({ value: option.value, label: option.textContent })) : []);
  const emailOption = methods.find((option) => /email/i.test(option.value));
  const phoneOption = methods.find((option) => /phone|telephone/i.test(option.value));
  await selectOption('ppf-contact-method', emailOption?.value || 'email', emailOption?.label || (pathname.startsWith('/ar') ? 'البريد الإلكتروني' : 'Email'));
  await page.locator('#ppf-contact-details').fill('invalid-email');
  await page.locator('#ppf-quote-form').evaluate((form) => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await assertNoHandoff();
  await page.locator('#ppf-contact-details').fill('qa-private@example.test');
  await assertPrivateValuesExcluded();
  await selectOption('ppf-contact-method', phoneOption?.value || 'phone', phoneOption?.label || (pathname.startsWith('/ar') ? 'الهاتف' : 'Telephone'));
  await page.locator('#ppf-contact-details').fill('123');
  await page.locator('#ppf-quote-form').evaluate((form) => form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })));
  await assertNoHandoff();
  await page.locator('#ppf-contact-details').fill('+971501234567');
  assert.equal(eventCount('quote_started'), 1, 'Correction and method changes must not duplicate form-start');
  await assertPrivateValuesExcluded();
  const draftRequest = page.waitForRequest((request) => new URL(request.url()).hostname === 'wa.me');
  // Two rapid submit events must yield only one handoff even before React has
  // rendered the disabled button state.
  await page.locator('#ppf-quote-form').evaluate((form) => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
  const destination = new URL((await draftRequest).url());
  assert.equal(destination.origin + destination.pathname, 'https://wa.me/97143402223');
  const message = destination.searchParams.get('text');
  const enquiryReference = message.match(/Enquiry reference: (PPF-[0-9A-F]{24})/)?.[1];
  assert.ok(enquiryReference, 'Draft must have a nonpersonal reconciliation reference');
  assert.ok(!JSON.stringify(events).includes(enquiryReference), 'Reference must remain outside analytics');
  for (const detail of ['QA-private-value-&-Ω', '911 Test & Model', '2025', 'QA-private Customer', '+971501234567', 'QA-private notes Ω & special characters']) assert.ok(message.includes(detail), `${pathname}: structured draft includes ${detail}`);
  assert.match(message, /Unsure|غير|متأكد|نصيحة/);
  assert.equal(eventCount('whatsapp_click'), 1);
  assert.equal(eventCount('whatsapp_draft_opened'), 1);
  assert.equal(eventCount('whatsapp_chat_opened'), 0, 'Form does not also pass through delegated anchor tracking');
  noConfirmedLead();
  await assertPrivateValuesExcluded(false);
  formResults.push({ route: pathname, emptyBlocked: true, invalidVehicleAndContactBlocked: true, allContactMethods: true, unsureCoverage: true, duplicateHandoffSuppressed: true, personalDataExcluded: true, noConfirmedLeadEvent: true });
};
const validReplyMethods = [];
const testValidReplyMethod = async (method, contact) => {
  await ready();
  await clearEvents();
  await fillForm();
  await page.locator('#ppf-contact-method').selectOption(method);
  await page.locator('#ppf-contact-details').fill(contact);
  await page.locator('#ppf-notes').fill('');
  const request = page.waitForRequest((candidate) => new URL(candidate.url()).hostname === 'wa.me');
  await page.locator('#ppf-quote-form button[type=submit]').click();
  const message = new URL((await request).url()).searchParams.get('text');
  assert.ok(message.includes(`Preferred contact method: ${method}`));
  assert.ok(message.includes(contact));
  assert.ok(!message.includes('Customer notes:'), 'Empty optional notes omitted from draft');
  assert.equal(eventCount('whatsapp_draft_opened'), 1);
  noConfirmedLead();
  await assertPrivateValuesExcluded(false);
  validReplyMethods.push(method);
};
try {
  await ready();
  assert.equal(await page.locator('h1').count(), 1);
  assert.equal(await page.locator('h1').textContent(), 'Paint Protection Film (PPF) in Dubai');
  assert.equal(await page.title(), 'Paint Protection Film (PPF) Dubai | DIGI-TEC');
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://digitecme.com${route}`);
  assert.equal(await page.locator('.ppf-faqs details').count(), 14);
  assert.equal(await page.locator('.ppf-brand-links a').count(), 9);
  for (const img of await page.locator('main img').all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((element) => element.decode());
    assert.ok(await img.evaluate((element) => element.naturalWidth > 0));
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: `${output}/desktop.png`, fullPage: false });
  await page.screenshot({ path: `${output}/desktop-full.png`, fullPage: true });
  await page.locator('.ppf-faqs summary').first().click();
  assert.equal(await page.locator('.ppf-faqs details').first().getAttribute('open'), '');
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  assert.equal(await overflow(), false, 'Desktop page overflows horizontally');
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await overflow(), false, `Page overflows at ${width}px`);
    assert.equal(await page.locator('.ppf-mobile-contact').isVisible(), true);
    await page.screenshot({ path: `${output}/mobile-${width}.png`, fullPage: false });
    if (width === 390) await page.screenshot({ path: `${output}/mobile-full.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => { document.documentElement.classList.add('theme-light'); scrollTo(0, 0); });
  await page.screenshot({ path: `${output}/light-full.png`, fullPage: true });
  await page.locator('#ppf-coverage').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/light-coverage.png` });
  await page.locator('#ppf-workshop').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${output}/workshop.png` });
  await page.evaluate(() => document.documentElement.classList.remove('theme-light'));
  await page.goto(`${base}/services/ceramic-coating`);
  await clearEvents();
  await page.locator('a[href^="/services/paint-protection-film"]').first().click();
  await page.locator('#ppf-heading').waitFor();
  await assertPageViewContext(route);
  await page.goto(`${base}${route}#ppf-comparison`);
  await page.waitForFunction(() => Math.abs(document.getElementById('ppf-comparison')?.getBoundingClientRect().top - 100) < 10);
  await ready();
  // Query/hash-only changes do not represent another PPF visit.
  await page.evaluate(() => { history.pushState({}, '', '?qa=dedup#ppf-quote'); dispatchEvent(new PopStateEvent('popstate')); });
  await page.waitForTimeout(100);
  assert.equal(eventCount('ppf_page_view'), 1);
  await page.evaluate(() => { history.replaceState({}, '', '/services/paint-protection-film'); dispatchEvent(new PopStateEvent('popstate')); });
  // All PPF WhatsApp anchors pass through the existing delegated tracking once.
  const ctas = await page.locator('a[data-cta-placement^=ppf_][href*="wa.me"]').count();
  for (let index = 0; index < ctas; index++) {
    await clearEvents();
    await page.locator('a[data-cta-placement^=ppf_][href*="wa.me"]').nth(index).evaluate((a) => {
      a.addEventListener('click', (event) => event.preventDefault(), { once: true });
      a.click();
    });
    await page.waitForFunction(() => window.dataLayer.length > 0);
    assert.equal(events.filter((e) => e.event === 'whatsapp_click').length, 1);
    assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'whatsapp_chat_opened').length, 1);
    assert.ok(!JSON.stringify(events).includes('?text='));
  }
  await clearEvents();
  await page.locator('a[data-cta-placement="ppf_hero"][href^="tel:"]').evaluate((a) => {
    a.addEventListener('click', (event) => event.preventDefault(), { once: true }); a.click();
  });
  assert.equal(events.filter((e) => Array.isArray(e) && e[1] === 'telephone_link_clicked').length, 1);
  await testForm(route);
  await ready();
  // Follow the actual shared language switch in each direction.
  await clearEvents();
  await page.locator('header button[aria-expanded]').last().click();
  await page.locator(`header a[href="${arabicRoute}"]`).first().click();
  await page.locator('#ppf-quote-form').waitFor();
  await assertPageViewContext(arabicRoute);
  assert.equal(await page.locator('html').getAttribute('dir'), 'rtl');
  assert.match(await page.locator('html').getAttribute('lang'), /^ar/);
  assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://digitecme.com${arabicRoute}`);
  assert.equal(await page.locator('h1').count(), 1);
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await page.locator('#ppf-quote-form').scrollIntoViewIfNeeded();
    assert.equal(await overflow(), false, `Arabic form overflow at ${width}px`);
    await page.screenshot({ path: `${output}/arabic-quote-${width}.png` });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await clearEvents();
  await page.locator('header button[aria-expanded]').last().click();
  await page.locator(`header a[href="${route}"]`).first().click();
  await page.locator('#ppf-heading').waitFor();
  await assertPageViewContext(route);
  assert.equal(await page.locator('html').getAttribute('dir'), 'ltr');
  await testForm(arabicRoute);
  await testValidReplyMethod('WhatsApp', '+971501234567');
  await testValidReplyMethod('Email', 'qa-private@example.test');
  // Controlled campaign context accompanies only the editable WhatsApp draft.
  for (const [pathname, source, campaign, group] of [[route, 'google', 'ppf_search', 'ppf_quote'], [arabicRoute, 'instagram', 'ppf_meta_prospecting', 'ppf_prospecting']]) {
    const medium = source === 'google' ? 'cpc' : 'paid_social';
    await ready(pathname + `?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}&utm_content=${group}&gclid=QA-private-click`);
    await fillForm();
    for (const id of ['ppf-brand', 'ppf-model', 'ppf-name', 'ppf-notes']) assert.equal(await page.locator(`#${id}`).getAttribute('dir'), 'auto');
    await assertPrivateValuesExcluded();
    const request = page.waitForRequest(candidate => new URL(candidate.url()).hostname === 'wa.me');
    await page.locator('#ppf-quote-form button[type=submit]').click();
    const message = new URL((await request).url()).searchParams.get('text');
    const reference = message.match(/Enquiry reference: (PPF-[0-9A-F]{24})/)?.[1];
    assert.ok(reference);
    assert.ok(message.includes(`Reported source / medium: ${source} / ${medium}`));
    assert.ok(message.includes(`Reported campaign / ad group: ${campaign} / ${group}`));
    assert.ok(message.includes('Landing page: ' + pathname));
    assert.ok(!message.includes('QA-private-click'));
    assert.ok(!JSON.stringify(events).includes(reference));
    assert.ok(!JSON.stringify(events).includes(campaign));
    noConfirmedLead();
    await assertPrivateValuesExcluded(false);
  }
  if (process.argv.includes('--prerendered')) {
    const staticContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    await staticContext.route('**/*', (request) => new URL(request.request().url()).origin === new URL(base).origin ? request.continue() : request.abort());
    const staticPage = await staticContext.newPage();
    await staticPage.goto(`${base}${route}`);
    assert.equal(await staticPage.locator('.ppf-hero').evaluate((element) => getComputedStyle(element).display), 'grid');
    assert.equal(await staticPage.locator('.ppf-faqs details').count(), 14);
    assert.equal(await staticPage.locator('#ppf-quote-form button[type=submit]').isDisabled(), true);
    await staticPage.locator('.ppf-faqs summary').first().click();
    assert.equal(await staticPage.locator('.ppf-faqs details').first().getAttribute('open'), '');
    for (const pathname of [route, arabicRoute]) {
      await staticPage.goto(`${base}${pathname}`);
      assert.equal(await staticPage.locator('#ppf-quote-form button[type=submit]').isDisabled(), true);
      for (const id of ['ppf-brand', 'ppf-model', 'ppf-year', 'ppf-name', 'ppf-contact-details']) assert.equal(await staticPage.locator(`#${id}`).isDisabled(), true, 'No-JS form must not accept personal values into an implicit GET');
      await staticPage.locator('body').press('Enter');
      await staticPage.waitForTimeout(100);
      assert.equal(staticPage.url(), base + pathname, 'No GET fallback may expose entered details');
      assert.ok(await staticPage.locator('noscript').count());
    }
    await staticContext.close();
  }
  assert.deepEqual(errors, [], 'Browser runtime errors');
  await writeFile(`${output}/browser-results.json`, JSON.stringify({ passed: true, base, prerenderedWithoutJavaScript: process.argv.includes('--prerendered'), viewportWidths: [1440, 390, 320], whatsappCtas: ctas, quotationForms: formResults, validReplyMethods: ['Phone', ...validReplyMethods], enquiryReferenceInDraftOnly: true, restrictedCampaignAttribution: true, bidirectionalFreeText: true, languageSwitchRoundTrip: true, ppfSpaPageLocationVerified: true, ppfPageViewDeduplication: true, externalRequestsBlocked: requests.length, gaIngestionVerified: false, errors }, null, 2));
  console.log(`PPF browser checks passed: EN/AR forms and language switch, desktop/mobile, metadata, FAQ, ${ctas} WhatsApp CTAs, call, contact validation, duplicate suppression, no confirmed lead events and privacy. Every external request was blocked.`);
} finally {
  await browser.close();
  if (builtServer) await new Promise((resolve) => builtServer.close(resolve));
}
