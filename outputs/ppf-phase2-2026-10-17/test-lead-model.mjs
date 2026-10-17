import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Local design-contract checks, with synthetic fixtures only. No CRM adapter,
// receipt endpoint, customer record, production storage or event is created.
const output = path.resolve('outputs/ppf-phase2-2026-10-17');
const pnpm = path.resolve('node_modules/.pnpm');
const packages = await readdir(pnpm);
const ajvPackage = packages.find(name => /^ajv@8\./.test(name));
const formatsPackage = packages.find(name => /^ajv-formats@3\./.test(name));
if (!ajvPackage || !formatsPackage) throw new Error('Installed Ajv 8 + ajv-formats are required; this script does not install dependencies.');
const Ajv2020 = (await import(pathToFileURL(path.join(pnpm, ajvPackage, 'node_modules/ajv/dist/2020.js')).href)).default;
const addFormats = (await import(pathToFileURL(path.join(pnpm, formatsPackage, 'node_modules/ajv-formats/dist/index.js')).href)).default;
// Decimal AED amounts need the documented precision option when validated as
// JS numbers. A future intake adapter must make the same deliberate choice.
const ajv = new Ajv2020({ strict: true, allErrors: true, multipleOfPrecision: 8 });
addFormats(ajv);
const schema = JSON.parse(await readFile(path.join(output, 'lead-model.schema.json'), 'utf8'));
const validate = ajv.compile(schema);
const helperSource = await readFile('src/lib/ppf-enquiry.ts', 'utf8');
const helperJs = ts.transpileModule(helperSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { buildPpfEnquiryContext } = await import('data:text/javascript;base64,' + Buffer.from(helperJs).toString('base64'));
const fixture = {
  lead_id: '0a0a0a0a-1b1b-4c4c-8d8d-0e0e0e0e0e0e',
  received_at: '2026-10-17T10:00:00Z', receipt_evidence_id: 'synthetic-received-message-pointer',
  source: 'unknown', medium: 'unknown', campaign: 'unknown', ad_group: 'unknown', landing_page: null,
  attribution_basis: 'unknown', vehicle_make: 'Fixture Make', vehicle_model: 'Fixture Model', vehicle_year: 2026,
  coverage_requested: 'Unsure — advise me', qualification_status: 'pending', quotation_status: 'not_prepared',
  quotation_value_aed: null, booking_status: 'not_booked', invoice_status: 'not_issued', final_invoiced_value_aed: null,
};
const tests = [];
const valid = (name, patch = {}) => {
  const record = { ...fixture, ...patch };
  assert.equal(validate(record), true, name + ': ' + JSON.stringify(validate.errors));
  tests.push({ name, expected: 'valid', passed: true });
};
const invalid = (name, patch = {}, omitted = []) => {
  const record = { ...fixture, ...patch };
  for (const key of omitted) delete record[key];
  assert.equal(validate(record), false, name + ' unexpectedly passed');
  tests.push({ name, expected: 'invalid', passed: true });
};
valid('Minimal synthetic received record; unknown landing is null');
valid('Optional draft reference', { enquiry_reference: 'PPF-' + 'A'.repeat(24) });
invalid('Malformed draft reference', { enquiry_reference: 'PPF-not-a-reference' });
invalid('Received record requires receipt evidence', {}, ['receipt_evidence_id']);
invalid('Received record requires a stable CRM ID', {}, ['lead_id']);
invalid('Non-UUID CRM ID rejected', { lead_id: 'not-a-uuid' });
invalid('Invalid receipt timestamp rejected', { received_at: 'yesterday' });
invalid('Unspecified personal-data field rejected', { customer_email: 'synthetic@example.test' });

const origin = 'https://digitecme.com';
for (const landing of schema.properties.landing_page.enum.filter(value => value !== null)) {
  valid('Approved landing path: ' + landing, { landing_page: landing });
  assert.equal(buildPpfEnquiryContext(origin + landing).landing_page, landing, 'Contract landing path must be recognized by helper');
}
for (const landing of ['unknown', '/PRIVATE_NAME', '/services/paint-protection-film?email=synthetic@example.test', '/services/paint-protection-film#PRIVATE_NOTE', 'https://digitecme.com/services/paint-protection-film', 'https://evil.example/?phone=PRIVATE_PHONE']) {
  invalid('Arbitrary/query/fragment landing rejected: ' + landing, { landing_page: landing });
}
for (const medium of ['cpc', 'ppc', 'paid_search']) {
  for (const group of ['ppf_general', 'ppf_full_body', 'ppf_quote', 'unknown']) {
    valid('Search taxonomy: ' + medium + '/' + group, { source: 'google', medium, campaign: 'ppf_search', ad_group: group });
  }
}
for (const source of ['facebook', 'instagram']) {
  for (const [campaign, group] of [['ppf_meta_prospecting', 'ppf_prospecting'], ['ppf_meta_retargeting', 'ppf_retargeting']]) {
    for (const adGroup of [group, 'unknown']) valid('Meta taxonomy: ' + source + '/' + campaign + '/' + adGroup, { source, medium: 'paid_social', campaign, ad_group: adGroup });
  }
}
for (const patch of [
  { source: 'instagram', medium: 'cpc', campaign: 'ppf_search', ad_group: 'ppf_quote' },
  { source: 'google', medium: 'organic', campaign: 'ppf_search', ad_group: 'ppf_quote' },
  { source: 'google', medium: 'cpc', campaign: 'ppf_search', ad_group: 'ppf_prospecting' },
  { source: 'google', medium: 'paid_social', campaign: 'ppf_meta_prospecting', ad_group: 'ppf_prospecting' },
  { source: 'facebook', medium: 'cpc', campaign: 'ppf_meta_prospecting', ad_group: 'ppf_prospecting' },
  { source: 'facebook', medium: 'paid_social', campaign: 'ppf_meta_prospecting', ad_group: 'ppf_retargeting' },
  { source: 'instagram', medium: 'paid_social', campaign: 'ppf_meta_retargeting', ad_group: 'ppf_prospecting' },
  { source: 'instagram', medium: 'paid_social', campaign: 'ppf_meta_retargeting', ad_group: 'ppf_quote' },
  { source: 'google', medium: 'cpc', campaign: 'unknown', ad_group: 'ppf_quote' },
  { source: 'google', medium: 'cpc', campaign: 'PRIVATE_CAMPAIGN', ad_group: 'PRIVATE_GROUP' },
]) invalid('Mismatched or edited taxonomy: ' + JSON.stringify(patch), patch);

for (const search of [
  '?utm_source=google&utm_medium=cpc&utm_campaign=ppf_search&utm_content=ppf_quote',
  '?utm_source=instagram&utm_medium=paid_social&utm_campaign=ppf_meta_prospecting&utm_content=ppf_prospecting',
  '?utm_source=facebook&utm_medium=paid_social&utm_campaign=ppf_meta_retargeting&utm_content=ppf_retargeting',
  '?utm_source=PRIVATE_NAME&utm_campaign=PRIVATE_CAMPAIGN&gclid=PRIVATE_CLICK',
  '',
]) {
  const context = buildPpfEnquiryContext(origin + '/services/paint-protection-film' + search);
  valid('Frontend context maps into received contract: ' + search, { ...context, landing_page: context.landing_page === 'unknown' ? null : context.landing_page });
}
const unknownLanding = buildPpfEnquiryContext(origin + '/services/paint-protection-film', { landing_page: '/PRIVATE_PATH' });
assert.equal(unknownLanding.landing_page, 'unknown');
valid('Unknown frontend landing explicitly maps to intake null', { ...unknownLanding, landing_page: null });

invalid('Confirmed booking requires ID/time', { booking_status: 'confirmed' });
invalid('Confirmed booking rejects null ID', { booking_status: 'confirmed', booking_id: null, booking_confirmed_at: '2026-10-17T10:30:00Z' });
valid('Confirmed booking with fixture source record', { booking_status: 'confirmed', booking_id: 'fixture-booking-1', booking_confirmed_at: '2026-10-17T10:30:00Z' });
invalid('Sent quote requires quote ID/value', { quotation_status: 'sent' });
valid('Sent quote permits actual zero amount', { quotation_status: 'sent', quote_id: 'fixture-quote-1', quotation_value_aed: 0 });
valid('Sent quote accepts ordinary two-decimal AED amount', { quotation_status: 'sent', quote_id: 'fixture-quote-1', quotation_value_aed: 1234.56 });
invalid('Issued invoice requires ID/value', { invoice_status: 'issued' });
valid('Paid invoice requires actual record/value', { invoice_status: 'paid', invoice_id: 'fixture-invoice-1', final_invoiced_value_aed: 1234.56 });
invalid('Negative invoice value rejected', { final_invoiced_value_aed: -1 });
invalid('Three-decimal amount rejected', { quotation_value_aed: 1.234 });
invalid('Vehicle year lower bound enforced', { vehicle_year: 1899 });
// JSON Schema has no dynamic current-year keyword. This passing fixture records
// the limitation, not permission for a production adapter to accept the value.
valid('Design-schema limit: future upper year requires intake runtime validation', { vehicle_year: new Date().getFullYear() + 2 });

const header = (await readFile(path.join(output, 'lead-register-template.csv'), 'utf8')).trim().split(',');
assert.deepEqual([...header].sort(), Object.keys(schema.properties).sort(), 'Empty register header and schema property contract agree');
tests.push({ name: 'Empty register/schema field consistency', expected: 'matching field sets', passed: true });
const result = {
  passed: true, checks: tests.length, tests,
  validator: ajvPackage + ' draft-2020-12 + ' + formatsPackage,
  validationOptions: { strict: true, formats: true, multipleOfPrecision: 8 },
  scope: 'Local synthetic design-contract validation only; no approved CRM integration, receipt authentication, booking verification, datastore or analytics import exists.',
  limitations: [
    'JSON Schema cannot authenticate receipt evidence or paid-click provenance; future adapter must verify protected source-system records.',
    'Vehicle year upper bound must be current year + 1 in the future intake adapter; this static schema only enforces the lower bound.',
    'Frontend unknown landing label must explicitly map to null at intake; schema rejects unknown as a path.',
    'A future JS-number adapter must deliberately preserve currency precision; these tests configure Ajv multipleOfPrecision=8.',
  ],
};
await writeFile(path.join(output, 'lead-model-test-results.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify({ passed: true, checks: result.checks, validator: result.validator, scope: result.scope, limitations: result.limitations }, null, 2));
