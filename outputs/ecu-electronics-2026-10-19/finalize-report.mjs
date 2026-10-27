import {readFile,writeFile} from 'node:fs/promises';
const out='outputs/ecu-electronics-2026-10-19';
const json=async name=>JSON.parse(await readFile(`${out}/${name}`,'utf8'));
const qa=await json('qa/COMBINED-QA-SUMMARY.json'),cli=await json('qa/combined-cli-results.json'),browsers=await json('qa/combined-browser-results.json');
const ecu=await json('qa/ecu-electronics-browser/browser-results.json'),integrity=await json('preservation-and-integrity.json'),proof=await json('research/independent-evidence-verification.json');
if(![qa,cli,browsers,ecu,integrity,proof].every(item=>item.passed===true))throw Error('Required final evidence is not all passed');
const scope=await json('modified-files.json'),pkg=await json('source-package-manifest.json'),analysis=await json('research/analysis-checks.json');
const top=await json('research/top15-commercial-opportunities.json'),capability=await json('content/capability-evidence-register.json'),meta=await json('qa/ecu-metadata-before-after.json');
const qaText=await readFile(`${out}/qa/COMBINED-QA-SUMMARY.txt`,'utf8');
const topLines=top.map((r,i)=>`${i+1}. ${r.query}: ${r['92d_clicks']} clicks / ${r['92d_impressions']} impressions / ${(r['92d_ctr_ratio']*100).toFixed(2)}% CTR / position ${r['92d_average_position'].toFixed(2)}.\n   ${r.structural_owner}\n   ${r.priority_reason}`).join('\n');
const register=capability.map(r=>`  ${r.domain}: ${r.status}.`).join('\n');
const files=scope.files.map(r=>`  ${r.change==='added'?'A':'M'} ${r.file}`).join('\n');
const cumulative=pkg.cumulativePendingWork.files.map(r=>'  '+r.file).join('\n');
const report=`DIGI-TEC — ECU PROGRAMMING & AUTOMOTIVE ELECTRONICS SEO SPRINT
Completed locally: 19 October 2026, Asia/Dubai
Git base: main / acef3427b57b48259bc5b39d6a0f75798603ae95
Content baseline: that commit plus the completed six-file diagnostics/AC work.

EXECUTIVE SUMMARY

Added accurate module-function and electronic-fault assessment guidance to eight
existing owners: six EN/AR pairs and two English-only electronics pages (14 locale
pages). Zero new routes. Existing titles, descriptions, H1s, FAQ arrays, structured
data, old contact URLs and completed service copy are preserved.

This sprint adds explanations and better-qualified enquiries, not new workshop
capability claims. Diagnostics, coding, programming, hardware repair, infotainment
repair and performance remapping remain distinct. No security, cloning or HV
service is added to public copy. Local QA passes; production remains NO-GO until
current origin/edge state, rollback and the concrete release are verified and
authorized. Nothing from this sprint was committed, pushed, deployed or published.

1. KEYWORD OPPORTUNITY MATRIX

research/keyword-opportunity-matrix.csv and .json contain 92 distinct opportunities:
69 measured exact queries and 23 proposed variants. All 16 requested exact
candidates are retained; only ECU repair Dubai has historical exact-query evidence.
The other 15 requested variants have unavailable metrics, never invented zeros.
Do not transfer BMW coding service metrics to BMW coding Dubai or auto electrical
diagnostics Dubai metrics to automotive electrical diagnostics Dubai.

Every row records exact query/intent, metrics, source period/filter/worksheet row,
structural owner, commercial priority, capability boundary and action. The newest
broad source contains 23 of the matrix's measured queries; other exact observations
remain explicitly dated historical or filtered evidence. No monthly volume or
numerical competition score is invented. Competitor pages inform qualitative
competition only and do not establish DIGI-TEC workshop capabilities.

Primary source periods:
  92 days: 10 July–9 October 2026, Web, Last 3 months, unfiltered.
  Historical 28 days: 6 August–2 September 2026, Web, Last 28 days.
  Last 24 hours: 18 October 06:00–19 October 05:00, UTC+04:00 (Dubai),
                Web (text-based), Last 24 hours.

Filtered Mercedes/tuning/PPF/appearance and older period exports are kept separate.
Overlapping periods are not summed or treated as independent before/after tests.
Capped/anonymized query omissions mean unavailable, not zero demand. Exported CTR
is retained rather than silently recomputed using rounded source figures.

All 17 raw workbooks were independently reopened read-only. Evidence verification
passed 3,067 assertions, 2,115 metric cells, 284 exact source observations and all
92 matrix rows. No source workbook was edited. See research/source-manifest.json,
independent-evidence-verification.json and GSC-RESEARCH-REPORT.txt.

Important ownership distinction: independent Queries and Pages tabs are not joined.
The 5 September–2 October /tuning-filtered export genuinely observes car programming,
mercedes ecu, ecm programmer near me and ecu reprogramming near me on /tuning in
that source period. These tiny filtered observations are retained separately as
intent/ownership risk, not proof that OEM programming belongs to tuning or that
multiple owners compete. Broad primary-period query ownership remains unverified.

2. TOP 15 COMMERCIAL OPPORTUNITIES

The following use exact 10 July–9 October 2026 query rows. All have zero measured
clicks/CTR in that source. Historical average positions are not a current Dubai
rank audit. Coding, electrical and screen/audio intents are separate clusters.

${topLines}

The highest measured screen/head-unit demand is specialist electronics demand,
not extra OEM-programming volume. Ambiguous ECU scan/diagnostic/car programming
queries are P3 intent-verification backlog. Porsche electrical and Mercedes audio
remain existing-owner monitoring priorities without expanding this implementation.

3. CAPABILITY EVIDENCE REGISTER

content/capability-evidence-register.csv and .json cover all ten requested domains:
${register}

No new independently verified current workshop function/vehicle matrix was supplied.
Historical repository records attribute certain tool capabilities to owner briefs;
these are separated from current licences, module coverage and job-level acceptance.
Existing conditional website language is evidence of an advertised claim, not
independent evidence that every function is available now.

Accordingly, new content explains terms and confirms exact support before work.
It adds no tool model/version, update entitlement, specific replacement-programming,
SAM/TCM bench repair, ECU board repair, cloning, immobilizer/security or hybrid/HV
promise. No manufacturer authorization, certification, price, warranty, fixed
turnaround or guaranteed result is introduced. Security functions stay out of
public expansion; no credentials or secrets are requested.

Obtain workshop-approved accepted functions, vehicle/model/module/software scope,
current platform/access evidence, exclusions and redacted job evidence before
expanding any capability. Official Mercedes/BMW technical documentation supports
the conceptual distinctions; it does not verify DIGI-TEC equipment or permissions.
The source-level register identifies what evidence is missing for each domain.

4. EXISTING PAGE OWNERSHIP MAP

Software-function enquiry owners (EN/AR):
  /services/car-diagnostics-dubai
  /services/mercedes-diagnostics-dubai
  /brands/bmw-service-dubai/engine-diagnostics

Electrical/communication fault owners (EN/AR):
  /services/auto-electrical-repair-dubai
  /services/mercedes-electrical-repair-dubai
  /brands/bmw-service-dubai/electrical-repair

Separate infotainment owners (English only, existing policy):
  /services/cadillac-cue-screen-repair-dubai
  /services/head-unit-repair-dubai

The broader audit inventories 135 relevant routes: 115 indexable and 20 noindex.
Every selected owner is already indexable, self-canonical, in the sitemap and
has an existing Service entity. Six paired owners retain en-AE/ar-AE/x-default;
the two English-only owners retain en-AE/x-default without invented Arabic pages.
No duplicate ECU/programming/coding page or indexing-policy change is justified.

audit/selected-owner-baseline.json and immutable HTML capture the completed local
baseline. The ownership/decision map and 28-case legacy synonym map are in audit/.
Twenty-one public read-only GETs returned 200; local-vs-live metadata differences
are documented as undeployed completed work, not a reason to overwrite production.
Crawl eligibility and route assignment do not establish Google-selected canonicals.

5. LOCAL IMPROVEMENTS IMPLEMENTED

Each selected owner receives a scoped, initially rendered assessment section:
three plain question/answer pairs, relevant intake, quotation process, a specialist
WhatsApp draft, telephone contact and related canonical links. Existing page copy
and all previous CTA URLs remain unchanged; the new panel owns the new draft.

Software sections explain diagnostics as fault investigation, coding as supported
configuration, programming as compatible software writing and adaptations/calibrations
as separate procedures when required. A replacement may need setup or software work;
not every replacement needs every procedure. Model, year, module, software, equipment
and permitted access determine acceptance. A software update is not an automatic cure.
Performance remapping links to the separate existing tuning owner.

Electrical sections explain that communication loss can involve supply, ground,
connectors, wiring or the network path. It does not prove ECU failure or promise
hardware repair. Subsequent configuration/software work is a separate confirmed scope.
Screen/unit sections distinguish touch, picture, sound and control complaints and
explain that appearance/connectors alone do not establish replacement compatibility.
They do not imply that every screen or unit requires programming.

The previous diagnostics/AC and repair guidance remains intact. Integration review
proves that removing the four additive lines from each existing template restores
its prior text, and the four other diagnostics/AC source files remain byte-identical.
All previous frontend behavior, PPF/tuning content, backend work and configuration
are preserved. No package or dependency change is needed.

6. BEFORE-AND-AFTER METADATA

qa/ecu-metadata-before-after.csv and .json contain all 14 locale comparisons.
Titles changed: ${meta.filter(r=>r.before.title!==r.after.title).length}; descriptions changed: ${meta.filter(r=>r.before.description!==r.after.description).length}; H1s changed: ${meta.filter(r=>r.before.h1!==r.after.h1).length}.

Metadata is intentionally retained because current owners are relevant and some
were just optimized in the previous sprint. Measured coding and electronics intents
are addressed by additive factual content and improved specialist intake, without
repeating hub/diagnostic metadata work or promising unverified functions in titles.
Canonical URLs, hreflang, robots, sitemap and structured-data graphs also remain
unchanged. The comparison is against the completed local baseline, not old live copy.

7. INTERNAL LINKS AND STRUCTURED DATA

30 new direct canonical link placements connect module-function assessment,
electrical investigation, distinct screen/unit repair and separate performance
tuning. These are placements, not 30 unique URLs. Arabic panels omit English-only
head-unit/CUE paths, and all emitted paths resolve directly to existing owners.

Existing Service/WebPage/Breadcrumb/FAQ and global entity data are preserved,
including #organization, #business and #website. No new schema or FAQ array is
created. Forty-two additional question/answer occurrences are crawlable HTML;
existing marked-up FAQ answers still match visible content. The established
English-only electronics FAQPage omission policy is retained.

See INTERNAL-LINK-AND-SCHEMA-REPORT.txt and qa/ecu-electronics-static-results.json.
No AI schema, invented rating/partnership or guaranteed rich result/citation is added.

8. CONVERSION AND GEO IMPROVEMENTS

New specialist drafts request make/model/year, symptoms/conditions, warning text,
an optional relevant report, recent module replacement and preferred appointment.
The customer can describe the requested function if known; a report or part number
is not required to enquire. CUE/head-unit messages identify the fitted system
without treating CUE as a vehicle model. Reports should exclude unnecessary personal
details. A separate visible privacy note rejects passwords/account credentials.

The panel explains that review and Send in WhatsApp are required, opening the draft
does not establish receipt or an appointment, and staff confirm availability/scope.
Initial assessment cost/scope precede further tests and a repair/function estimate.
Existing analytics conventions are retained; no new event or customer-data field
is introduced. Contact clicks/draft opens remain interaction signals, not leads.
Arabic phone digits in new panels use left-to-right isolation.

content/GBP-SERVICE-DRAFTS.txt provides four conditional service drafts without
editing the live profile. First-party name/address/contact consistency is recorded:
DIGI-TEC Performance Center L.L.C., Warehouses 11–15, Al Quoz Industrial Area 3,
Dubai, UAE; +971 4 340 2223; info@digitecme.com. Verify the actual listing, categories,
pin/entrance and current hours before any authorized GBP edit. Do not invent hours,
certifications or add keyword variants to the business name. Service drafts remain
subject to actual accepted functions and categories.

9. COMPLETE QA EVIDENCE

${qaText.trim()}

Stable build source fingerprint (${integrity.candidateBuildInputs} inputs):
${integrity.sourceSha256}

Local source/component review and research verification also pass. Generated
routing line endings were normalized before the stable build. Initial preservation
harness attempts left only the new empty integration wrappers after panel removal;
those exact wrappers were then removed for strict old-content comparison. The
browser runtime initially could not reach local preview in the sandbox; the same
loopback-only tests ran with permitted runtime access. Superseded attempts and
exact final reruns are retained. No application fix was made to mask a test failure.

No actual customer message, call, backend write or production publication occurred.
Local tests do not establish field Core Web Vitals, received CRM leads, GA4 ingestion,
live Google indexing, manufacturer access or improved search/enquiry performance.

10. EXACT MODIFIED FILES AND DEPENDENCIES

New sprint delta (four files; two modified templates, two additions):
${files}

The baseline already includes six completed uncommitted diagnostics/AC files.
Two templates are extended by this sprint; the other four files remain byte-identical.
Thus the cumulative pending SEO source over Git HEAD is EIGHT unique paths:
${cumulative}

Do not commit only the four-file delta against Git HEAD without those prior
dependencies. No staging/commit/push is authorized by this task. modified-files.json
records this sprint's before/after hashes. source-package-manifest.json records the
four-file review delta and cumulative eight-file source archive. No dependency or
environment files are packaged.

Four-file review ZIP SHA256:
${pkg.newSprint.archiveSha256}
Eight-file cumulative ZIP SHA256:
${pkg.cumulativePendingWork.archiveSha256}

preservation-and-integrity.json confirms ${integrity.byteIdenticalUnrelatedFiles} unrelated original files unchanged,
two intentional existing-template changes, two approved additions, no unexpected
outside additions, empty index and unchanged branch/HEAD. All original backend,
master-validation output and other work remains preserved. No Cloudflare, route,
package, tuning, PPF, existing diagnostic content module or shared schema file changed.

11. RELEASE READINESS

Local candidate: GO for review, full quality gates pass. Production: NO-GO until
authenticated active origin/edge state and a complete recoverable rollback pair
are established, the cumulative source/base is reconciled and release is explicitly
authorized. The prior release audit recorded invalid Cloudflare access; this sprint
obtained no replacement authenticated deployment snapshot. Public HTML and Git main
do not prove that newer production changes cannot be overwritten.

Current Git remains main at acef342; remote-main-check.json is read-only evidence.
The isolated candidate includes completed diagnostics/AC plus this sprint, while
some public metadata still predates those local improvements. Preserve PPF and any
newer production content when preparing a later cumulative release. Do not guess a
Pages/Worker assets command or deploy the edge-only local config to publish content.

Before a future release, verify the exact active host/version/source and rollback,
reconstruct on any newer approved base and rerun QA if it changes. After an approved
release, check all 14 owners plus protected workstreams, live HTML/redirects, schema,
canonicals/hreflang/sitemap, mobile contacts and GSC URL Inspection. Real message/call
receipt and qualified appointments must be measured separately from click events.

Nothing from this sprint was committed, pushed, deployed, published or changed in
production or GBP. No recurring monitoring or automation was created.

12. NEXT SPECIALIST ELECTRONICS BACKLOG

research/next-specialist-electronics-keyword-backlog.csv retains exact measured
and proposed tasks. Prioritize existing-owner measurement for Porsche electrical,
Mercedes audio and additional CUE/head-unit variants. Review actual query+page
evidence before changing ownership or diagnosing cannibalization. Do not create
one page per synonym or use tuning impressions as OEM-programming proof.

The exact ECU repair Dubai historical 28-day row has 0 clicks, 8 impressions and
46.38 average position; it does not verify board-level ECU repair. Proposed exact
SAM, TCM, replacement-programming and communication variants retain blank metrics.
Hardware repair, cloning, security and high-voltage capabilities stay withheld
until appropriate operational evidence and authorization are available.

Obtain a current unfiltered 28-day query export and joined query/page data for
coding, electrical and infotainment clusters, preserving country/device/appearance
filters. Compare equivalent nonoverlapping periods after an authorized release.
Record workshop-received qualified enquiries, quotations, appointments and jobs
with consent-aware deduplication; do not aggregate click/draft events as customers.
`;
await writeFile(`${out}/COMPLETED-REPORT.txt`,report);
await writeFile(`${out}/release-readiness.json`,JSON.stringify({completedAt:new Date().toISOString(),base:scope.base,baselineIncludesCompletedUncommittedDiagnosticsAc:true,localImplementationComplete:true,localQaPassed:true,productionGo:false,productionRecommendation:'NO-GO pending authenticated live origin/edge and rollback verification, cumulative source reconciliation, drift checks and explicit authorization',owners:8,localePages:14,newRoutes:0,measuredQueries:analysis.measured_distinct_queries,proposedQueries:analysis.proposed_distinct_queries,metadataChanges:0,newSprintFiles:scope.files.map(r=>r.file),cumulativePendingSourceFiles:pkg.cumulativePendingWork.files.map(r=>r.file),sourceSha256:integrity.sourceSha256,byteIdenticalUnrelatedFiles:integrity.byteIdenticalUnrelatedFiles,committed:false,pushed:false,deployed:false,published:false,googleBusinessProfileModified:false,customerEnquirySent:false,report:'COMPLETED-REPORT.txt'},null,2));
console.log(JSON.stringify({report:`${out}/COMPLETED-REPORT.txt`,localQaPassed:true,productionGo:false,newSprintFiles:scope.files.length,cumulativePendingSourceFiles:pkg.cumulativePendingWork.files.length}));
