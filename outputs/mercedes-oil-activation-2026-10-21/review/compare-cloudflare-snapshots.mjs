import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));
const folder = path.resolve(directory, '../cloudflare');
const root = path.resolve(directory, '../../..');
const baseline = JSON.parse(await readFile(path.join(root, 'outputs/mercedes-oil-routing-2026-10-21/proposal/observed-single-redirect-baseline.json'), 'utf8'));
const mode = process.argv.includes('--post') ? 'post' : 'pre';
const mercedes = await readFile(path.join(folder, `${mode}-mercedes-rule.txt`), 'utf8');
const www = await readFile(path.join(folder, `${mode}-www-rule.txt`), 'utf8');
const overview = await readFile(path.join(folder, `${mode}-rules-overview.txt`), 'utf8');
function form(text) { return text.slice(text.indexOf('- heading "Edit Single Redirect"'), text.indexOf('- contentinfo:', text.indexOf('- heading "Edit Single Redirect"'))); }
function parseMercedes(text) {
  const lines = form(text).split(/\r?\n/);
  const expressionLine = lines.find(line => line.includes(': "http.request.uri.path in '));
  assert.ok(expressionLine, 'Exact Mercedes expression visible');
  const expression = JSON.parse(expressionLine.slice(expressionLine.indexOf(': "http.request.uri.path') + 2));
  return {
    name: lines.find(line => line.startsWith('- textbox "Rule name (required)": '))?.split(': ').slice(1).join(': '),
    expression,
    target: lines.find(line => line.startsWith('- textbox "URL": '))?.slice('- textbox "URL": '.length),
    code301: lines.includes('- generic: 301 - Permanent Redirect'),
    query: lines.includes('- checkbox "Preserve query string" [checked]'),
  };
}
function parseWww(text) {
  const lines = form(text).split(/\r?\n/);
  return {
    name: lines.find(line => line.startsWith('- textbox "Rule name (required)": '))?.split(': ').slice(1).join(': '),
    expression: lines.find(line => line.startsWith('- generic: (http.host eq '))?.slice('- generic: '.length),
    target: lines.find(line => line.startsWith('- textbox "Expression": '))?.slice('- textbox "Expression": '.length),
    code301: lines.includes('- generic: 301 - Permanent Redirect'),
    query: lines.includes('- checkbox "Preserve query string" [checked]'),
  };
}
const actualMercedes = parseMercedes(mercedes);
const actualWww = parseWww(www);
assert.deepEqual(actualMercedes, { name: baseline.rules[0].description, expression: baseline.rules[0].expression, target: baseline.rules[0].action_parameters.from_value.target_url.value, code301: true, query: true });
assert.deepEqual(actualWww, { name: baseline.rules[1].description, expression: baseline.rules[1].expression, target: baseline.rules[1].action_parameters.from_value.target_url.expression, code301: true, query: true });
const oldMercedesIndex = overview.indexOf(`row "Drag row ${mode === 'pre' ? '1' : '2'} Legacy Mercedes URLs`);
const oldWwwIndex = overview.indexOf(`row "Drag row ${mode === 'pre' ? '2' : '3'} www to primary domain`);
assert.ok(oldMercedesIndex >= 0 && oldWwwIndex > oldMercedesIndex, 'Original rule order visible and preserved');
for (const rule of baseline.rules) assert.ok(overview.includes(`/rules/redirect-rules/${rule.id}`), `Original rule ID ${rule.id} retained`);
assert.ok(overview.includes('301 redirect to https://digitecme.com/brands/mercedes-benz-service-dubai Active Menu'));
assert.ok(overview.includes('http.request.uri.path) Active Menu'));
assert.ok(overview.includes('/ae62fc81b63f3450e5ab4b63b7b7ece4/digitecme.com/'), 'Controlling account and zone retained');
const report = { comparedAt: new Date().toISOString(), mode, passed: true, comparedToSavedBaseline: true, existingDefinitionsUnchanged: true, existingIdsRetained: baseline.rules.map(r => r.id), existingRelativeOrderPreserved: true, actualMercedes, actualWww, limitation: 'Visible authenticated DOM snapshots supplied by root; not an API ruleset/version export. Candidate post snapshot must also be independently checked.' };
await writeFile(path.join(directory, `${mode}-cloudflare-comparison.json`), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
