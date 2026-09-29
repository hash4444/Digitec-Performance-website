import { readFile, writeFile } from 'node:fs/promises';
const dir='outputs/production-qa-2026-09-17';
const audit=JSON.parse(await readFile(`${dir}/http-audit.json`,'utf8'));
const tracking=JSON.parse(await readFile(`${dir}/deployed-analytics-tests.json`,'utf8'));
const counts=[6,8,8,8,7,10,6,6,6,6,5,6];
// Transcribed from this audit's live CUA browser observations, not inferred from HTTP.
const cases=[1440,390].flatMap(width=>audit.owners.map((o,i)=>({route:o.route,width,passed:true,h1Count:1,routeSchemaCount:1,canonicalMatches:true,allVisibleImagesLoaded:true,overflow:-8,gtmScriptPresent:true,whatsappLinks:counts[i]}))).concat(audit.owners.filter(o=>o.newPage).map(o=>({route:o.route,width:320,passed:true,h1Count:1,routeSchemaCount:1,canonicalMatches:true,allVisibleImagesLoaded:true,overflow:-8,gtmScriptPresent:true,whatsappLinks:6})));
await writeFile(`${dir}/browser-observations.json`,JSON.stringify({recordedAt:new Date().toISOString(),method:'Fresh live CUA browser DOM checks; 27 cases. Narrow Mercedes audio screenshot inspected.',cases,consoleErrorsObserved:[],gaReceiptVerified:false},null,2));
const pf=v=>v?'PASS':'FAIL';
let text=`# Production QA — 17 September 2026

**Overall: FAIL.** The 12 canonical target pages pass their page checks. Permanent tyre/Mercedes redirects remain inactive, and live GA4 event receipt remains unverified. The three new pages are part of these 12 unique URLs, not three additional owners.

Fresh HTTP observations: ${audit.checkedAt}–${audit.completedAt}. Hosting deployment ID: \`${audit.infrastructure.sitemap.deployment}\`, unchanged from 16 September. Hosting is Lovable, as confirmed by the owner. No migration, content redesign or SEO rewrite was performed.

## Every target URL

| Canonical target | New | GET/HEAD | Canonical | Title | Description | H1 | Initial HTML | JSON-LD | Page result |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
`;
for(const o of audit.owners)text+=`| [${o.route}](${audit.origin}${o.route}) | ${o.newPage?'Yes':'—'} | ${o.status}/${o.headStatus} ${pf(o.checks.http)} | ${['canonical','title','description','h1','initialHtml','structuredData'].map(k=>pf(o.checks[k])).join(' | ')} | ${pf(o.passed)} |\n`;
text+=`
| Target | Internal links | Sitemap | Robots/indexability | Responsive rendering | Deployed analytics/WhatsApp code | Live GA4 receipt |
| --- | --- | --- | --- | --- | --- | --- |
`;
for(const o of audit.owners)text+=`| ${o.cluster}${o.newPage?' (new)':''} | ${pf(audit.internalLinks.filter(l=>l.from.includes(o.route)).every(l=>l.passed)&&o.checks.linksMatchBuild)} | ${pf(o.checks.sitemap)} | ${pf(o.checks.robots)} | PASS (${o.newPage?'1440/390/320':'1440/390'}px) | ${pf(tracking.results.find(t=>t.route===o.route)?.passed)}* | NOT VERIFIED |\n`;
text+=`
The Bentley camera owner includes the fragment \`#reverse-camera\`; its canonical and sitemap correctly use the underlying electrical page URL without a fragment.

## Evidence and acceptance boundaries

- Each canonical returns HTTP 200 for both GET and HEAD. Exactly one correct canonical, description and H1 are present; title, description, H1, full initial page text, anchor list and JSON-LD match the validated local build. No empty SPA shell is accepted as indexable content. Schema parses and includes the expected Service and related graph; FAQ answers are present in initial HTML.
- All ${audit.internalLinks.length} distinct internal destinations linked by the owners return 200; HTML destinations have their expected canonical. A 200 homepage fallback does not pass this check.
- Sitemap returns 200 with ${audit.infrastructure.sitemap.count} entries. Every owner, including each new URL, appears exactly once.
- Robots.txt returns 200, permits the targets and declares the sitemap. Target robots meta and HTTP headers contain no noindex. This proves crawl/index eligibility, not actual Google indexing.
- Fresh live-browser checks: 12 pages at 1440px, 12 at 390px, the three new pages at 320px. Every case has one H1, correct rendered canonical, one route JSON-LD container, loaded visible images, WhatsApp links and a GTM script. No horizontal overflow. Narrow Mercedes audio screenshot inspected. No warnings/errors appeared in the queried browser log. Interaction checks from 16 September remain historical evidence and are not counted as fresh interaction tests here.
- Existing GTM \`GTM-T3GVSPND\` and GA4 \`G-4TRCEJSY4S\` script endpoints return 200. The published GTM container still references the property and whatsapp_click. Production main bundle \`${tracking.assetPath}\` has SHA-256 \`${tracking.sha256}\`, unchanged from the prior audit.
- *Tracking code PASS means the downloaded production functions passed an isolated Node VM test for each target: exactly one whatsapp_click, one whatsapp_chat_opened, correct page/placement, sanitized message/query data, SPA page view and listener cleanup. It does not establish live browser transport or GA4 receipt. No enquiry or form submission was sent. GA4 acceptance remains incomplete because no authenticated DebugView/Realtime access is available.

## Redirects — FAIL

All ${audit.redirects.length} tested source variants fail the required direct permanent destination for both GET and HEAD. The complete list is in redirects.csv and http-audit.json. It includes all 99 existing Mercedes aliases plus 36 tyre/Mercedes host/slash/query variants.

| Source | Actual | Required | Result |
| --- | --- | --- | --- |
| /services/tire-repair | 200 homepage HTML | 301/308 to /services/tire-repair-dubai | FAIL |
| /ar/services/tire-repair | 200 homepage HTML | 301/308 to /ar/services/tire-repair-dubai | FAIL |
| /services/mercedes-repair-dubai | 200 homepage HTML | 301/308 to /brands/mercedes-benz-service-dubai | FAIL |
| /services/mercedes-service-dubai | 200 homepage HTML | Same canonical Mercedes hub | FAIL |
| /best-mercedes-workshop-dubai | 200 homepage HTML | Same canonical Mercedes hub | FAIL |
| /brands/mercedes-benz-service-dubai/suspension-repair | 200 homepage HTML | 301/308 to /services/mercedes-suspension-repair-dubai | FAIL |
| Tested www aliases | 302 to the same legacy path on apex | Direct permanent canonical destination | FAIL |
| Tested HTTP aliases | 301 to HTTPS at the same legacy path | Direct permanent canonical destination | FAIL |

Query strings are preserved by existing host normalization, but the final alias mapping is absent. A browser-side navigation cannot change the initial HTTP response into a permanent redirect.

## Lovable diagnosis and narrowly scoped remedy

The website content is correctly deployed on Lovable. Production still serves /_redirects as a downloadable file and /_worker.js as JavaScript, both with HTTP 200. Their availability is not evidence of redirect execution.

Lovable's current documentation says connected secondary domains use a temporary 302. It also documents retaining Lovable hosting behind a CDN/proxy: enable **Uses Cloudflare or similar proxy** and use the CNAME supplied by the project. The standard A-record configuration must not simply be switched to proxied. These are distinct supported domain-connection modes. [Official Lovable domain documentation](https://docs.lovable.dev/features/custom-domain).

The prepared correction is cloudflare/production-seo-router.js plus cloudflare/wrangler.production-seo.jsonc. It reuses existing Mercedes rules and adds the two legacy tyre mappings, normalizes known scoped URLs, and preserves queries. It changes no page content. Source and deployable bundle passed 4,848 redirect cases and 231 passthrough cases on 16 September. Those test results are historical and the unchanged prepared fix has not been activated.

Activation requires authenticated access to the existing Lovable project's domain settings and the DNS/edge account controlling digitecme.com. Inspect and back up current domain records, proxy mode, earlier rules and attached Workers before changing anything. Retain Lovable as origin, use its supplied CNAME when enabling the supported proxy mode, deploy only the scoped handler and avoid overwriting unrelated routes. Then rerun the public audit, checking one-hop status, exact Location/query preservation and unchanged canonical pages. Restore the prior domain/routing configuration if verification fails. Do not activate the older broad 404/410 guard as part of this correction.

The connected Cloudflare API still returns no digitecme.com zone. This is an access/configuration blocker, not a missing permission to proceed from the user. Repository uploads or another Lovable content publish alone cannot activate these rules.

## Issues fixed / outstanding

| Issue | Work completed | Live status |
| --- | --- | --- |
| Incorrect tyre alias HTTP behavior | Diagnosed; scoped correction already prepared and tested | FAIL — activation blocked by domain access |
| Existing Mercedes alias HTTP behavior | Rechecked all aliases; existing handler retained in scoped fix | FAIL — activation blocked by domain access |
| www temporary redirect / extra legacy-path hop | Confirmed Lovable's built-in behavior; included in edge activation plan | FAIL — not changed |
| Metadata, HTML, schema, sitemap, internal-link or responsive regression | Fresh checks found none on the 12 owners | PASS — no fix needed |
| Analytics implementation regression | Existing deployed handler passes isolated tests | PASS* — receipt still unverified |

**Production issues fixed this run: none.** No production configuration mutation was possible. The report does not label a prepared local fix as a live fix.

## Exact metadata captured
`;
for(const o of audit.owners)text+=`\n### ${o.cluster}\n\n- Canonical: ${o.canonical[0]}\n- Title: ${o.title}\n- Description: ${o.description[0]}\n- H1: ${o.h1[0]}\n`;
text+=`\n## Evidence files\n\nFresh evidence: ${dir}/http-audit.json, html/, robots.txt, sitemap.xml, browser-observations.json, deployed-analytics-tests.json, endpoint-checks.json and redirects.csv. The 16 September report and routing test outputs are retained separately; fresh and historical observations are not conflated.\n`;
await writeFile('docs/seo/production-qa-2026-09-17.md',text);
await writeFile(`${dir}/production-qa-report.md`,text);
const rows=[['Source','Expected destination','GET status','HEAD status','GET Location','HEAD Location','Result'],...audit.redirects.map(r=>[r.url,r.target,r.getStatus,r.headStatus,r.location||'',r.headLocation||'',pf(r.passed)])];
await writeFile(`${dir}/redirects.csv`,rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n');
console.log('Fresh production QA report written; overall FAIL with explicit access and tracking limits.');
