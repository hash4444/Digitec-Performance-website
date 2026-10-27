// Bounded read-only Phase 2B investigation. Exactly twelve source GETs.
// No cache-busting queries, cache headers, cookies, configuration or API writes.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./', import.meta.url));
const runId = 'repeat-' + new Date().toISOString().replace(/[:.]/g, '-');
const out = resolve(root, runId);
await mkdir(out, { recursive: true });
const source = 'https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair';
const target = 'https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai';
const userAgent = 'DIGI-TEC-Phase2-ReadOnly-HTTP-Verification/1.0';
const hash = s => createHash('sha256').update(s).digest('hex');
const dubai = s => new Date(new Date(s).getTime() + 4 * 3600000).toISOString().replace('Z', '+04:00');
const decode = s => String(s).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ');
const clean = s => decode(String(s).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const attr = (s, n) => decode(s.match(new RegExp(`(?:^|\\s)${n}=["']([^"']*)["']`, 'i'))?.[1] || '');
const tags = (s, n) => [...s.matchAll(new RegExp(`<${n}\\b[^>]*>`, 'gi'))].map(m => m[0]);
function parse(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  return {
    title: clean(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || ''),
    h1: [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => clean(m[1])),
    canonical: tags(html, 'link').filter(t => attr(t, 'rel').toLowerCase() === 'canonical').map(t => attr(t, 'href')),
    robots: tags(html, 'meta').filter(t => /^(robots|googlebot)$/i.test(attr(t, 'name'))).map(t => attr(t, 'content')),
    mainTextSha256: hash(clean(main.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ''))),
    htmlSha256: hash(html)
  };
}
const failureCapturePath = resolve(root, '../../mercedes-phase-2/deployment-2026-10-26/verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/capture.json');
const reviewedCapture = JSON.parse(await readFile(failureCapturePath, 'utf8'));
const historicalFailure = reviewedCapture.cases.find(c => c.url === source && c.method === 'GET').chain[0];
const expectedTargetBaseline = reviewedCapture.cases.find(c => c.url === target && c.method === 'GET').chain[0];
const report = {
  startedAtUtc: new Date().toISOString(), runId, readOnly: true,
  source, target, sourceRequestsPlanned: 12, gapMs: 10000,
  scope: 'Exactly twelve sequential source GET requests; follow only an exact expected 308 Location to one target GET. No query, cache-busting, cache headers, cookies, configuration/API mutation, browser or automation.',
  transportBehaviors: ['normal Node fetch default connection handling', 'Node fetch with Connection: close for an explicit fresh-connection request'],
  userAgent, requestCacheHeaders: [], historicalFailureCapture: failureCapturePath,
  historicalFailure: Object.fromEntries(Object.entries(historicalFailure).filter(([k]) => !['headers'].includes(k))),
  historicalFailureResponseHeaders: historicalFailure.headers,
  requests: []
};

async function request(url, label, close) {
  const startedAtUtc = new Date().toISOString();
  const requestHeaders = { 'User-Agent': userAgent, ...(close ? { Connection: 'close' } : {}) };
  try {
    const response = await fetch(url, { method: 'GET', redirect: 'manual', headers: requestHeaders, signal: AbortSignal.timeout(25000) });
    const html = await response.text();
    const finishedAtUtc = new Date().toISOString();
    const headers = Object.fromEntries([...response.headers]);
    const htmlFile = label + '.html';
    await writeFile(resolve(out, htmlFile), html, 'utf8');
    const metadata = parse(html);
    const excluded = metadata.robots.some(v => /(?:^|[,\s])(?:noindex|none)(?:$|[,\s])/i.test(v)) || /(?:noindex|none)/i.test(headers['x-robots-tag'] || '');
    return {
      url, method: 'GET', startedAtUtc, finishedAtUtc,
      startedAtDubai: dubai(startedAtUtc), finishedAtDubai: dubai(finishedAtUtc),
      status: response.status, requestHeaders, responseHeaders: headers,
      cfRay: headers['cf-ray'] || null, cloudflareColo: headers['cf-ray']?.split('-').at(-1) || null,
      location: headers.location || null, bodyUtf8Bytes: Buffer.byteLength(html), htmlFile, ...metadata,
      indexability: { noindexExcluded: excluded, declaredRobotsPresent: metadata.robots.length > 0, singleExpectedCanonical: metadata.canonical.length === 1 && metadata.canonical[0] === target },
      matchesHistoricalFailureMainText: metadata.mainTextSha256 === historicalFailure.mainTextSha256,
      matchesExpectedTargetMainText: metadata.mainTextSha256 === expectedTargetBaseline.mainTextSha256,
      bodyHashMeaning: 'SHA256 of fetch-decoded body saved as UTF-8 HTML; not compressed wire-byte hash.'
    };
  } catch (e) {
    const finishedAtUtc = new Date().toISOString();
    return { url, method: 'GET', startedAtUtc, finishedAtUtc, startedAtDubai: dubai(startedAtUtc), finishedAtDubai: dubai(finishedAtUtc), status: 0, requestHeaders, responseHeaders: {}, error: `${e.message}: ${e.cause?.code || ''}` };
  }
}

for (let i = 0; i < 12; i++) {
  if (i) await new Promise(resolve => setTimeout(resolve, 10000));
  const close = i % 2 === 1;
  const row = { sequence: i + 1, transport: close ? 'fetch-connection-close' : 'fetch-default', sourceResponse: await request(source, `request-${String(i + 1).padStart(2, '0')}-source`, close) };
  if (row.sourceResponse.status === 308 && row.sourceResponse.location === target) row.targetResponse = await request(target, `request-${String(i + 1).padStart(2, '0')}-target`, close);
  row.passed = row.sourceResponse.status === 308 && row.sourceResponse.location === target && row.targetResponse?.status === 200 && row.targetResponse.indexability.singleExpectedCanonical && !row.targetResponse.indexability.noindexExcluded && row.targetResponse.matchesExpectedTargetMainText;
  row.jsonFile = `request-${String(i + 1).padStart(2, '0')}.json`;
  await writeFile(resolve(out, row.jsonFile), JSON.stringify(row, null, 2));
  report.requests.push(row);
  await writeFile(resolve(out, 'capture-in-progress.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ sequence: row.sequence, transport: row.transport, sourceAtUtc: row.sourceResponse.startedAtUtc, status: row.sourceResponse.status, location: row.sourceResponse.location || null, cfRay: row.sourceResponse.cfRay || null, targetStatus: row.targetResponse?.status || null, passed: row.passed, evidenceDirectory: out }));
}
report.finishedAtUtc = new Date().toISOString();
report.startedAtDubai = dubai(report.startedAtUtc);
report.finishedAtDubai = dubai(report.finishedAtUtc);
report.summary = {
  sourceRequests: report.requests.length, targetRequests: report.requests.filter(r => r.targetResponse).length,
  passed: report.requests.filter(r => r.passed).length, failed: report.requests.filter(r => !r.passed).length,
  sourceStatuses: Object.fromEntries([...new Set(report.requests.map(r => r.sourceResponse.status))].map(s => [s, report.requests.filter(r => r.sourceResponse.status === s).length])),
  sourceColos: [...new Set(report.requests.map(r => r.sourceResponse.cloudflareColo).filter(Boolean))],
  byTransport: Object.fromEntries(['fetch-default','fetch-connection-close'].map(t => [t, { requests: report.requests.filter(r => r.transport === t).length, passed: report.requests.filter(r => r.transport === t && r.passed).length, failed: report.requests.filter(r => r.transport === t && !r.passed).length }]))
};
report.limits = ['One runtime/network, not independent UAE/mobile clients or a global propagation study.', 'Default fetch may reuse available connections; actual socket reuse is not measured. Connection:close requests explicitly prevent reuse.', 'Current repeated responses do not erase or explain the retained Phase 2A homepage failure.', 'No inference about failure cause, exact server activation time, Google indexing or ranking recovery.'];
await writeFile(resolve(out, 'capture.json'), JSON.stringify(report, null, 2));
const rows = [['sequence','transport','source request UTC','source request Dubai','status','Location','CF-Ray','colo','target status','source HTML SHA256','source main-text SHA256','target HTML SHA256','target canonical','passed'], ...report.requests.map(r => [r.sequence,r.transport,r.sourceResponse.startedAtUtc,r.sourceResponse.startedAtDubai,r.sourceResponse.status,r.sourceResponse.location,r.sourceResponse.cfRay,r.sourceResponse.cloudflareColo,r.targetResponse?.status,r.sourceResponse.htmlSha256,r.sourceResponse.mainTextSha256,r.targetResponse?.htmlSha256,(r.targetResponse?.canonical || []).join(' | '),r.passed])];
await writeFile(resolve(out,'observations.csv'), rows.map(row => row.map(v => '"' + String(v ?? '').replaceAll('"','""') + '"').join(',')).join('\r\n') + '\r\n');
const markdown = `# Phase 2B — twelve exact R4 request repeats\n\nCaptured ${report.startedAtUtc}–${report.finishedAtUtc} UTC (${report.startedAtDubai}–${report.finishedAtDubai} Dubai). Read-only, bounded investigation; no production change.\n\nThe twelve independent GET observations used the exact earlier failed URL without a trailing slash or query. Six used ordinary Node fetch and six explicitly requested Connection: close. The User-Agent matches Phase 2A. No cache-control request header, cache-busting query, cookie, purge or configuration change was used. Requests were sequential with ten-second gaps; an exact expected 308 was followed only to the intended target.\n\nResult: **${report.summary.passed}/12 passed**, **${report.summary.failed}/12 failed**; source statuses ${JSON.stringify(report.summary.sourceStatuses)}. Target GETs: ${report.summary.targetRequests}. Source CF-Ray colos: ${report.summary.sourceColos.join(', ')}.\n\nThe original 07:20:59.755 UTC Phase 2A failure remains retained: homepage 200, no Location, canonical https://digitecme.com/, CF-Ray a507b3b20a4fb88b-AMS. Repeated observations do not erase or explain that failure. The cause remains unresolved.\n\nEach request-NN.json independently records full response headers, request/response times in UTC/Dubai, CF-Ray/colo, status and Location, saved source/target HTML, body/main-text hashes, title, H1, canonical and indexability checks. observations.csv is the compact request ledger; capture.json contains the complete bounded run. Body hashes represent decoded UTF-8 HTML rather than compressed wire bytes.\n\nLimits: one runtime/network; default fetch socket reuse was not measured; no global or UAE/mobile consistency, indexing or ranking conclusion.\n`;
await writeFile(resolve(out,'README.md'),markdown);
console.log(JSON.stringify({ completed: true, evidenceDirectory: out, summary: report.summary },null,2));
process.exitCode = report.summary.failed ? 1 : 0;
