import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import ts from 'typescript';

const source = await readFile('src/lib/contact-attribution.ts', 'utf8');
const compiled = ts.transpileModule(source, {compilerOptions: {module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022}}).outputText;
const {buildAttribution, sanitizeAttribution, analyticsPageUrl, analyticsReferrer} = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const origin = 'https://digitecme.com';
const path = '/brands/mercedes-benz-service-dubai';
const privateQuery = '?utm_source=ChatGPT&utm_medium=referral&utm_campaign=TEST_NAME&utm_content=TEST_PHONE&utm_term=TEST_VIN&name=TEST_NAME&phone=TEST_PHONE&issue=TEST_ISSUE';
const href = origin + path + privateQuery + '#TEST_PRIVATE';
const referrer = 'https://chatgpt.com/c/TEST_PRIVATE?name=TEST_NAME';
const safe = buildAttribution(href, referrer);
assert.deepEqual(safe, {landing_page: origin + path, initial_referrer: 'https://chatgpt.com', utm_source: 'chatgpt', utm_medium: 'referral', ai_referrer: 'chatgpt'});
assert.doesNotMatch(JSON.stringify(safe), /TEST_/);
assert.equal(analyticsPageUrl(href, origin), origin + path);
assert.equal(analyticsPageUrl('https://example.com/private', origin), origin);
assert.equal(analyticsReferrer('javascript:TEST_PRIVATE'), 'direct');
assert.deepEqual(sanitizeAttribution(null, origin), {});
assert.deepEqual(sanitizeAttribution(['TEST_NAME'], origin), {});
const legacy = sanitizeAttribution({...safe, landing_page: href, initial_referrer: referrer, name:'TEST_NAME', phone:'TEST_PHONE', vin:'TEST_VIN', utm_campaign:'TEST_NAME', ai_referrer:'TEST_NAME'}, origin);
assert.deepEqual(legacy, safe);
assert.equal(buildAttribution(origin + path, 'https://chatgpt.com.evil.example/conversation').ai_referrer, undefined);
assert.equal(buildAttribution(origin + path, 'https://www.perplexity.ai/search/private').ai_referrer, 'perplexity');

// Execute the real initial GA4 bootstrap: one configuration/page view, clean
// URLs, and recognised source/medium retained in GA4's standard fields.
const html = await readFile('index.html', 'utf8');
const bootstrap = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match=>match[1]).find(script=>script.includes("gtag('config', 'G-4TRCEJSY4S'"));
assert.ok(bootstrap, 'Missing GA4 bootstrap');
function runBootstrap(url, initialReferrer) {
  const location = new URL(url);
  const context = {window: {location}, document: {referrer: initialReferrer}, URL, URLSearchParams};
  Object.defineProperty(context, 'dataLayer', {get: () => context.window.dataLayer});
  vm.runInNewContext(bootstrap, context);
  return JSON.parse(JSON.stringify(context.window.dataLayer.map(args=>Array.from(args))));
}
const commands = runBootstrap(href, referrer);
const configurations = commands.filter(command=>command[0]==='config');
assert.equal(configurations.length, 1);
assert.deepEqual(configurations[0], ['config', 'G-4TRCEJSY4S', {campaign_source:'chatgpt', campaign_medium:'referral'}]);
assert.deepEqual(commands.find(command=>command[0]==='set'), ['set', {page_location:origin+path, page_referrer:'https://chatgpt.com'}]);
// Location belongs to global context so later SPA `set` commands can update it;
// a stream-level initial location would override those updates.
assert.equal(configurations[0][2].page_location, undefined);
assert.doesNotMatch(JSON.stringify(commands), /TEST_/);
const unknown = runBootstrap(origin + path + '?utm_source=TEST_NAME&utm_medium=TEST_PHONE', '');
assert.doesNotMatch(JSON.stringify(unknown), /TEST_/);
for (const channel of ['google','bing','chatgpt','openai','perplexity','gemini','claude','copilot','duckduckgo','instagram','facebook','youtube','newsletter','whatsapp']) {
  const url = `${origin}${path}?utm_source=${channel}&utm_medium=organic`;
  assert.equal(runBootstrap(url, '').find(command=>command[0]==='config')[2].campaign_source, buildAttribution(url, '').utm_source);
}
console.log('Contact attribution passed: enquiry data excluded, legacy storage sanitised, AI hosts checked, one initial GA4 configuration, recognised channels retained.');
