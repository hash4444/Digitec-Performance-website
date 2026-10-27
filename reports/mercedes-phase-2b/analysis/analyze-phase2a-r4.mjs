// Offline evidence analysis only. No network, browser, API or configuration actions.
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, relative } from 'node:path';

const here = fileURLToPath(new URL('./', import.meta.url));
const workspace = fileURLToPath(new URL('../../../', import.meta.url));
const deployment = resolve(workspace, 'reports/mercedes-phase-2/deployment-2026-10-26');
const paths = {
  checkpoint: resolve(deployment, 'verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/capture.json'),
  baseline: resolve(deployment, 'preflight/http-pre-2026-10-26T07-06-59-812Z/capture.json'),
  beforeInventory: resolve(deployment, 'cloudflare/before-inventory.json'),
  afterInventory: resolve(deployment, 'cloudflare/after-inventory.json'),
  activations: resolve(deployment, 'cloudflare/activations.json'),
  verifier: resolve(deployment, 'verification/verify-staged.mjs')
};
const raw = Object.fromEntries(await Promise.all(Object.entries(paths).map(async ([key, path]) => [key, await readFile(path, 'utf8')])));
const sourceHashes = Object.fromEntries(Object.entries(raw).map(([key, content]) => [key, {
  path: relative(workspace, paths[key]).replaceAll('\\', '/'),
  sha256: createHash('sha256').update(content).digest('hex')
}]));
const checkpoint = JSON.parse(raw.checkpoint);
const baseline = JSON.parse(raw.baseline);
const before = JSON.parse(raw.beforeInventory);
const after = JSON.parse(raw.afterInventory);
const activation = JSON.parse(raw.activations).find(x => x.rule === 'R4');
const sourceCases = checkpoint.cases.filter(c => c.group === 'source' && c.rule === 'ar-mechanical-repair');
if (sourceCases.length !== 48 || checkpoint.syntheticOnly || checkpoint.notAProductionPostDeploymentResult) throw new Error('Expected the 48 real R4 source cases.');
const delta = (a, b) => (Date.parse(a) - Date.parse(b)) / 1000;
const rows = sourceCases.map(c => {
  const u = new URL(c.url), first = c.chain[0], last = c.chain.at(-1);
  const assertions = checkpoint.assertions.filter(a => a.name.startsWith(c.key + ':'));
  return {
    key: c.key, requestStartedAtUtc: first.at,
    secondsAfterR4EnabledFirstObserved: delta(first.at, activation.activeObservedAt),
    method: c.method, url: c.url, scheme: u.protocol.slice(0, -1), host: u.hostname,
    path: u.pathname, trailingSlash: u.pathname.endsWith('/'),
    queryClass: u.search === '' ? 'empty' : u.search.startsWith('?utm_source=') ? 'campaign' : 'repeated-encoded-blank',
    rawQuery: u.search, status: first.status, location: first.headers.location || null,
    cfRay: first.headers['cf-ray'] || null,
    cfRayColoSuffix: first.headers['cf-ray']?.split('-').at(-1) || null,
    cfCacheStatus: first.headers['cf-cache-status'] || null,
    age: first.headers.age || null, cacheControl: first.headers['cache-control'] || null,
    responseDate: first.headers.date || null, chainResponses: c.chain.length,
    finalStatus: last.status, finalUrl: last.url, finalCanonical: last.canonical || [],
    loop: c.loop, failedAssertions: assertions.filter(a => a.pass === false).map(a => a.name),
    directRedirectPass: first.status === 308 && first.headers.location === c.expectedTarget && c.chain.length === 2 && last.status === 200 && last.url === c.expectedTarget && !c.loop,
    getFinalCanonicalPass: c.method !== 'GET' ? null : last.canonical?.length === 1 && last.canonical[0] === c.expectedTarget.split('?')[0]
  };
});
const failed = rows.filter(r => !r.directRedirectPass);
if (failed.length !== 1 || failed[0].key !== 'source-ar-mechanical-repair-6') throw new Error('Historical failure shape unexpectedly changed.');
const failure = failed[0];
const failedCase = sourceCases.find(c => c.key === failure.key);
const baselineCase = baseline.cases.find(c => c.url === failure.url && c.method === failure.method);
const homepageCase = baseline.cases.find(c => c.group === 'control' && c.url === 'https://digitecme.com/' && c.method === 'GET');
const group = field => [...new Set(rows.map(r => r[field]))].map(value => {
  const selected = rows.filter(r => r[field] === value);
  return {value, cases: selected.length, directRedirectPasses: selected.filter(r => r.directRedirectPass).length, failures: selected.filter(r => !r.directRedirectPass).length};
});
function literalRuleMatch(rule, request) {
  // Only the simple literal equality/set expressions actually present in this inventory.
  const expression = rule.expression, u = new URL(request.url);
  const clauses = [];
  for (const field of ['http.host', 'http.request.method', 'http.request.uri.path']) {
    const literalSet = expression.match(new RegExp(field.replaceAll('.', '\\.') + '\\s+in\\s+\\{([^}]+)\\}'));
    const literalEq = expression.match(new RegExp(field.replaceAll('.', '\\.') + '\\s+eq\\s+"([^"]+)"'));
    const actual = field === 'http.host' ? u.hostname : field === 'http.request.method' ? request.method : u.pathname;
    if (literalSet) clauses.push({field, actual, allowed: [...literalSet[1].matchAll(/"([^"]+)"/g)].map(m => m[1])});
    if (literalEq) clauses.push({field, actual, allowed: [literalEq[1]]});
  }
  if (clauses.length === 0) throw new Error('Unrecognized inventory expression.');
  return {id: rule.id, order: rule.order, enabled: rule.enabled, clauses, matchesLiteralTuple: rule.enabled && clauses.every(c => c.allowed.includes(c.actual))};
}
const sameColo = rows.filter(r => r.cfRayColoSuffix === failure.cfRayColoSuffix && r.directRedirectPass);
const nearestSameColoPass = sameColo.reduce((a, b) => Math.abs(delta(a.requestStartedAtUtc, failure.requestStartedAtUtc)) < Math.abs(delta(b.requestStartedAtUtc, failure.requestStartedAtUtc)) ? a : b);
const stableFields = r => ({id:r.id,description:r.description,enabled:r.enabled,expression:r.expression,action:r.action,action_parameters:r.action_parameters});
const originalRuleComparison = before.rules.map(r => ({id:r.id, unchangedFunctionalFields:JSON.stringify(stableFields(r)) === JSON.stringify(stableFields(after.rules.find(a=>a.id===r.id)))}));
const result = {
  purpose: 'Historical Phase 2A R4 failure analysis; offline evidence only; no fresh results claimed.',
  generatedAtUtc: new Date().toISOString(), sourceHashes,
  originalRuleComparison,
  originalRelativeOrderUnchanged: JSON.stringify(before.rules.map(r=>r.id)) === JSON.stringify(after.rules.filter(r=>before.rules.some(b=>b.id===r.id)).map(r=>r.id)),
  afterOrder: after.rules.map(r=>({id:r.id,order:r.order,enabled:r.enabled})),
  r4Activation: {...activation, internalActivationTimestampAvailable:false},
  sourceWindow: {start:rows.map(r=>r.requestStartedAtUtc).sort()[0],end:rows.map(r=>r.requestStartedAtUtc).sort().at(-1)},
  summary: {r4SourceCases:rows.length, directRedirectPasses:rows.filter(r=>r.directRedirectPass).length,failedSourceCases:failed.length,failedAssertions:checkpoint.assertions.filter(a=>!a.pass),exactFailedMethodUrlOccurrences:rows.filter(r=>r.method===failure.method&&r.url===failure.url).length},
  failure,
  failureBody: {
    title:failedCase.chain[0].title,canonical:failedCase.chain[0].canonical,mainTextSha256:failedCase.chain[0].mainTextSha256,
    matchesFreshBaselineSameUrlMainText:failedCase.chain[0].mainTextSha256 === baselineCase.chain.at(-1).mainTextSha256,
    matchesFreshBaselineHomepageMainText:failedCase.chain[0].mainTextSha256 === homepageCase.chain[0].mainTextSha256,
    xDeploymentId:failedCase.chain[0].headers['x-deployment-id'] || null,
    originProvenByDirectOriginLog:false
  },
  literalMatching: {scope:'Offline evaluation of inventoried simple literal sets against saved tuple; no Cloudflare request trace or server rule evaluation.',before:before.rules.map(r=>literalRuleMatch(r,failure)),after:after.rules.map(r=>literalRuleMatch(r,failure))},
  distributions:Object.fromEntries(['cfRayColoSuffix','method','scheme','host','trailingSlash','queryClass'].map(field=>[field,group(field)])),
  nearestSameColoPass:{...nearestSameColoPass,secondsAfterFailureRequestStart:delta(nearestSameColoPass.requestStartedAtUtc,failure.requestStartedAtUtc),sameMethodUrlAsFailure:false},
  requestEvidenceLimits:{singleVerifierRuntime:true,concurrency:4,userAgent:'DIGI-TEC-Phase2-ReadOnly-HTTP-Verification/1.0',browserJavascript:false,manualRedirectCapture:true,explicitNoCacheRequestHeaders:false,cachePurge:false,sameRequestSameColoRepeatInPhase2A:false,exactServerActivationTimestamp:false,edgeRequestTrace:false,directOriginRequestOrLogs:false,controlledIndependentGeographicVantages:false},
  hypotheses:[
    {name:'Transient edge configuration propagation or consistency',assessment:'Plausible, unproven',support:'One miss shortly after enablement amid 47 passes; no displayed field defect.',limit:'No per-edge config version/trace; same AMS suffix also returned 308; exact tuple not repeated in Phase 2A.'},
    {name:'Cloudflare cached homepage HIT',assessment:'Not supported by the failed response headers',support:'Failed response reports DYNAMIC, no Age, and no-cache/must-revalidate/max-age=0.',limit:'Response headers alone do not identify every upstream intermediary or explain why the redirect was not applied.'},
    {name:'Incorrect displayed R4 expression/destination/order',assessment:'No defect found in saved functional configuration',support:'Failed tuple literally matches enabled R4 only; target is correct; R4 is before www; original rules exclude its path.',limit:'UI inventory is not a per-request ruleset/version trace.'},
    {name:'www host canonicalization conflict',assessment:'Not supported for the failed request',support:'Failed host is apex; www rule condition is false. All www R4 source cases were direct 308.',limit:'Does not prove every network intermediary normalized the host identically internally.'},
    {name:'URI normalization mismatch',assessment:'No mismatch evident in the saved request tuple',support:'ASCII source uses ordinary single slashes, no percent encodings, and exactly equals one R4 path literal; slash and slashless variants are present.',limit:'No trace of the internal evaluated path was captured.'},
    {name:'Legacy homepage fallback after redirect was bypassed',assessment:'Homepage fallback body confirmed; causal routing layer unresolved',support:'Failed body canonical/title/main-text hash equals the pre-deployment homepage fallback.',limit:'No direct origin response/log establishes where the redirect bypass happened; response body identity is not root-cause evidence.'}
  ],
  evidenceNeeded:['Fresh exact failed GET/URL repeats with default fetch and Connection: close, preserving initial response and relevant headers; neither mode establishes an independent network vantage or exact edge instance.','Fresh full R4 variant matrix and protected existing/new-rule controls.','Fresh authenticated functional configuration inventory compared with Phase 2A after-state.','For definitive cause attribution: Cloudflare per-request trace/log or support evidence identifying evaluated normalized fields, rule IDs and configuration version for the failed CF-Ray; unavailable in historical capture.'],
  documentation:[
    {url:'https://developers.cloudflare.com/rules/url-forwarding/',verifiedBy:'Root agent in Phase 2B',relevance:'First matching redirect applies; Single Redirects evaluate before later rewrite/origin/bulk/cache products.'},
    {url:'https://developers.cloudflare.com/cache/concepts/cache-responses/',verifiedBy:'Root agent in Phase 2B',relevance:'DYNAMIC is not a Cloudflare cache HIT and indicates ineligible cache treatment.'},
    {url:'https://developers.cloudflare.com/fundamentals/reference/http-headers/',verifiedBy:'Root agent in Phase 2B',relevance:'Response CF-Ray suffix denotes a processing colo, not a controlled client location or exact edge instance.'},
    {url:'https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/',verifiedBy:'Root agent in Phase 2B',relevance:'One client may be routed to different colos; observed suffix diversity is not controlled geographic testing.'}
  ],
  r4SourceRows:rows
};
await mkdir(here,{recursive:true});
await writeFile(resolve(here,'phase2a-failure-analysis.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({output:relative(workspace,resolve(here,'phase2a-failure-analysis.json')),summary:result.summary,distributions:result.distributions,nearestSameColoPass:result.nearestSameColoPass.key,secondsAfterFailure:result.nearestSameColoPass.secondsAfterFailureRequestStart,originalRuleComparison}));
