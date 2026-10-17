import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile('src/lib/ppf-enquiry.ts', 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { buildPpfEnquiryContext: context, createPpfEnquiryReference: reference, ppfReferenceLines: lines } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
const base = 'https://digitecme.com/services/paint-protection-film';
for (const group of ['ppf_general', 'ppf_full_body', 'ppf_quote']) {
  assert.deepEqual(context(base + '?utm_source=google&utm_medium=cpc&utm_campaign=ppf_search&utm_content=' + group), {
    source: 'google', medium: 'cpc', campaign: 'ppf_search', ad_group: group, landing_page: '/services/paint-protection-film',
  });
}
const invalid = context(base + '?utm_source=PRIVATE_NAME&utm_medium=PRIVATE_PHONE&utm_campaign=PRIVATE_VIN&utm_content=PRIVATE_EMAIL&gclid=PRIVATE_CLICK#PRIVATE_HASH', { landing_page: 'https://evil.example/PRIVATE_PATH', name: 'PRIVATE_NAME' });
assert.deepEqual(invalid, { source: 'unknown', medium: 'unknown', campaign: 'unknown', ad_group: 'unknown', landing_page: '/services/paint-protection-film' });
assert.doesNotMatch(JSON.stringify(invalid), /PRIVATE|gclid|#/);
assert.equal(context(base, { landing_page: 'https://evil.example/private', utm_source: 'google', utm_medium: 'organic' }).landing_page, 'unknown');
assert.equal(context(base, { landing_page: 'https://digitecme.com/PRIVATE_NAME?phone=PRIVATE_PHONE', utm_source: 'google' }).landing_page, 'unknown');
const first = context(base, { landing_page: 'https://digitecme.com/services?name=PRIVATE_NAME', utm_source: 'bing', utm_medium: 'organic', utm_campaign: 'PRIVATE' });
assert.deepEqual(first, { source: 'bing', medium: 'organic', campaign: 'unknown', ad_group: 'unknown', landing_page: '/services' });
const mixed = context(base + '?utm_campaign=ppf_search&utm_content=ppf_general', { utm_source: 'google', utm_medium: 'cpc', landing_page: base });
assert.equal(mixed.campaign, 'unknown', 'Do not mix current campaign with a stored source from another visit');
for (const [campaign, group] of [['ppf_meta_prospecting', 'ppf_prospecting'], ['ppf_meta_retargeting', 'ppf_retargeting']]) {
  assert.equal(context(base + '?utm_source=instagram&utm_medium=paid_social&utm_campaign=' + campaign + '&utm_content=' + group).ad_group, group);
}
assert.equal(context(base + '?utm_source=facebook&utm_medium=paid_social&utm_campaign=ppf_meta_prospecting&utm_content=ppf_retargeting').ad_group, 'unknown');
assert.equal(context(base + '?utm_source=google&utm_medium=organic&utm_campaign=ppf_search&utm_content=ppf_general').campaign, 'unknown');
assert.equal(context(base, null).source, 'unknown');
const id = reference({ getRandomValues: bytes => bytes.fill(42) });
assert.match(id, /^PPF-[0-9A-F]{24}$/);
assert.equal(new Set(Array.from({ length: 1000 }, () => reference())).size, 1000);
assert.throws(() => reference({ getRandomValues() { throw new Error('unavailable'); } }));
assert.equal(lines(id, first)[0], 'Enquiry reference: ' + id);
assert.doesNotMatch(lines(id, first).join('\n'), /PRIVATE/);
assert.doesNotMatch(source, /localStorage|sessionStorage|window\.gtag|fetch\(/, 'Helper must have no analytics, persistence or network side effects');
console.log('PPF enquiry tests passed: random draft references, controlled acquisition labels, unknown attribution, no mixed touches, PII/query exclusion and no side effects.');
