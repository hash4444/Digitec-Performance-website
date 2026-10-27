import { readFile, writeFile } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const captureName = 'pre-2026-10-26T06-53-48-482Z';
const r = JSON.parse(await readFile(new URL(`evidence/http/${captureName}/capture.json`, root), 'utf8'));
const proposal = JSON.parse(await readFile(new URL('routing/redirect-proposals.json', root), 'utf8'));
const get = url => r.cases.find(c => c.url === url && c.method === 'GET').chain[0];
const home = get('https://digitecme.com/');
const rows = proposal.rules.map(rule => {
  const source = get('https://digitecme.com' + rule.source);
  const target = get(rule.target);
  return { key: rule.key, source: source.url, sourceStatus: source.status, sourceTitle: source.title, sourceCanonical: source.canonical, sourceMainTextSha256: source.mainTextSha256, matchesHomepageMainText: source.mainTextSha256 === home.mainTextSha256, target: target.url, targetStatus: target.status, targetTitle: target.title, targetH1: target.h1, targetCanonical: target.canonical, targetRobots: target.robots, targetXRobotsTag: target.headers['x-robots-tag'] || null, targetMainTextSha256: target.mainTextSha256, technicalIndexability: 'Eligible in sampled HTTP/HTML/robots/sitemap evidence; Google indexing and Google-selected canonical not established.' };
});
const summary = { capture: `evidence/http/${captureName}/capture.json`, startedAt: r.startedAt, finishedAt: r.finishedAt, summary: r.summary, homepage: { title: home.title, canonical: home.canonical, mainTextSha256: home.mainTextSha256 }, rules: rows, protectedEnglishOil: { cases: r.cases.filter(c => c.group === 'protected-oil').length, observed: 'All return a single 308 directly to slashless English oil destination, preserving raw query string; final 200. No observed loops.' }, knownOutOfScopeObservations: r.knownOutOfScopeObservations, notes: ['The first capture (pre-2026-10-26T06-44-50-517Z) had 24 assertion failures because its verifier incorrectly expected two unrelated existing slash variants to redirect. Raw observations are retained. The verifier was corrected to record and preserve their existing behavior; no production fix was attempted.', 'The final passing preflight does not mean every existing URL is healthy: the two existing slash homepage fallbacks remain documented outside this four-alias scope.', 'The verifier later gained an input guard requiring a passing matching-proposal preflight before post mode; this guard does not change captured HTTP observations.'] };
await writeFile(new URL('routing/http-summary.json', root), JSON.stringify(summary, null, 2));
const csv = arr => arr.map(row => row.map(v => '"' + String(v ?? '').replaceAll('"', '""') + '"').join(',')).join('\r\n') + '\r\n';
await writeFile(new URL('routing/redirect-evidence.csv', root), csv([['source', 'source status', 'homepage main content match', 'source canonical', 'destination', 'destination status', 'destination canonical', 'robots', 'x-robots-tag'], ...rows.map(row => [row.source, row.sourceStatus, row.matchesHomepageMainText, row.sourceCanonical.join(' | '), row.target, row.targetStatus, row.targetCanonical.join(' | '), row.targetRobots.join(' | '), row.targetXRobotsTag])]));
console.log(JSON.stringify({ startedAt: r.startedAt, finishedAt: r.finishedAt, summary: r.summary, rows: rows.length }));
