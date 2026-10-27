import assert from 'node:assert/strict';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';

// Source-level functional checks only. No browser navigation, network request,
// WhatsApp message, enquiry or backend write is made by this test.
const require = createRequire(path.resolve('package.json'));
const ts = require('typescript');
const zod = require('zod');
const source = await readFile('src/components/BrandBookingForm.tsx', 'utf8');
const tracking = await readFile('src/lib/whatsapp-tracking.ts', 'utf8');
const compiled = text => ts.transpileModule(text, { compilerOptions: {
  module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022,
  jsx: ts.JsxEmit.React, esModuleInterop: true,
} }).outputText;
const results = [];

function harness(brandName, values, isArabic = false) {
  const opens = [], events = [], writes = [];
  const window = {
    location: new URL(`https://digitecme.com/${isArabic ? 'ar/' : ''}brands/test-service-dubai`),
    dataLayer: [],
    open: (...args) => opens.push(args),
    gtag: (...args) => events.push(args),
  };
  const trackingExports = {};
  vm.runInNewContext(compiled(tracking), { exports: trackingExports, window, URL });
  let stateIndex = 0;
  const React = {
    createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
    useState: initial => {
      const index = stateIndex++;
      return [index === 0 ? values : initial, value => writes.push({ index, value })];
    },
  };
  const exports = {};
  const mockRequire = id => {
    if (id === 'react') return { __esModule: true, default: React, useState: React.useState };
    if (id === 'zod') return zod;
    if (id === 'lucide-react') return { MessageCircle: 'icon' };
    if (id === '@/i18n/use-locale') return { useLocale: () => ({ isArabic }) };
    if (id === '@/lib/whatsapp-tracking') return trackingExports;
    throw new Error(`Unexpected module: ${id}`);
  };
  vm.runInNewContext(compiled(source), { exports, require: mockRequire, window, URL, encodeURIComponent });
  const tree = exports.default({ brandName });
  assert.equal(tree.type, 'form');
  tree.props.onSubmit({ preventDefault() {} });
  return { opens, events, writes, dataLayer: window.dataLayer };
}

for (const brand of ['Rolls-Royce', 'Lamborghini', 'Volkswagen', 'Mercedes-Benz', 'BMW']) {
  const sentinel = 'AUDIT_PRIVATE_SENTINEL';
  const state = harness(brand, { name: sentinel, phone: '+971 50 123 4567', issue: `${sentinel} service due` });
  assert.equal(state.opens.length, 1);
  assert.equal(state.opens[0][1], '_blank');
  assert.equal(state.opens[0][2], 'noopener,noreferrer');
  const url = new URL(state.opens[0][0]);
  assert.equal(url.origin + url.pathname, 'https://wa.me/97143402223');
  assert.ok(url.searchParams.get('text').includes(`Brand: ${brand}`));
  assert.ok(url.searchParams.get('text').includes(sentinel));
  assert.equal(state.dataLayer.length, 1);
  assert.equal(state.dataLayer[0].event, 'whatsapp_click');
  assert.equal(state.dataLayer[0].link_url, 'https://wa.me/97143402223');
  assert.equal(state.events.length, 1);
  assert.equal(state.events[0][1], 'whatsapp_draft_opened');
  assert.ok(!JSON.stringify([state.dataLayer, state.events]).includes(sentinel));
  assert.ok(!JSON.stringify([state.dataLayer, state.events]).includes('123 4567'));
  assert.ok(!JSON.stringify(state.events).includes('generate_lead'));
  results.push({ brand, language: 'en', validDraftPrepared: true, brandContextPreserved: true, privateTextExcludedFromEvents: true, noConfirmedEnquiryEvent: true });
}

for (const [label, values, valid] of [
  ['optional name/phone', { name: '', phone: '', issue: 'Maintenance due' }, true],
  ['too-short issue', { name: '', phone: '', issue: 'no' }, false],
  ['invalid callback', { name: '', phone: 'letters', issue: 'Maintenance due' }, false],
  ['oversize issue', { name: '', phone: '', issue: 'x'.repeat(601) }, false],
]) {
  const state = harness('Volkswagen', values);
  assert.equal(state.opens.length, valid ? 1 : 0, label);
  if (!valid) {
    assert.equal(state.events.length, 0);
    assert.equal(state.dataLayer.length, 0);
    assert.ok(Object.keys(state.writes.at(-1).value).length > 0);
  }
  results.push({ case: label, passed: true });
}
const arabic = harness('Volkswagen', { name: '', phone: '', issue: 'طلب صيانة دورية' }, true);
assert.ok(new URL(arabic.opens[0][0]).searchParams.get('text').includes('العلامة: Volkswagen'));
results.push({ case: 'Arabic draft context', passed: true });
const report = { checkedAt: new Date().toISOString(), passed: true, sourceSha256: { form: createHash('sha256').update(source).digest('hex'), tracking: createHash('sha256').update(tracking).digest('hex') }, method: 'Actual form/tracking TypeScript transpiled in isolated Node VM with React state mocks', limitations: 'Does not verify browser rendering, popup success, WhatsApp delivery, GA4 ingestion, CRM receipt or confirmed enquiries.', results };
await writeFile('outputs/five-brand-service-2026-10-19/conversion/form-functional-tests.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
