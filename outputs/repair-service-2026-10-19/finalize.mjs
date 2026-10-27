import {readFile,writeFile} from 'node:fs/promises';
const root='outputs/repair-service-2026-10-19';
const read=async file=>JSON.parse(await readFile(`${root}/${file}`,'utf8'));
const build=await read('qa/production-build-results.json');
const checks=await read('qa/checks.json');
const audit=await read('qa/repair-static-validation.json');
const browser=await read('qa/browser/browser-results.json');
const master=await read('qa/existing-master-browser/browser-results.json');
const gsc=await read('gsc/analysis-validation.json');
const top=await read('gsc/top10-commercial-repair-opportunities.json');
const http=await read('live/http-audit.json');
const gates={productionPipeline:build.passed,lintTypesAndRegression:checks.passed,repairStatic:audit.passed,repairBrowser:browser.passed,existingMasterBrowser:master.passed,preservedGsc:gsc.source_sha256_pre_post_and_prior_sprint_match};
const passed=Object.values(gates).every(Boolean);
const summary={checkedAt:new Date().toISOString(),recommendation:passed?'GO':'NO-GO',scope:'Local repair-service changes only; deployment requires explicit approval.',gates,committed:false,pushed:false,deployed:false,published:false,sourceFingerprint:build.sourceSha256,modifiedSourceFiles:[...audit.sourcePreservation.changed.map(r=>r.file),...audit.sourcePreservation.added],preservation:{baselineSourceFiles:audit.sourcePreservation.baselineFiles,byteIdentical:audit.sourcePreservation.preservedBaselineFiles,protectedSsrPages:audit.protectedRenderedChecks.length,forbiddenDifferences:audit.sourcePreservation.forbidden},browser:{responsive:browser.pageChecks.length,interactions:browser.interactions.length,noJavaScript:browser.noJavaScript.length,hubLinks:browser.hubLinks.length,masterResponsive:master.pageChecks.length,masterSpa:master.spaNavigation.length},notes:['11 existing lint warnings, zero errors','28-day query baseline is historical, not current October','No measured enquiry uplift, local keyword difficulty score or Google-selected canonical claim']};
await writeFile(`${root}/release-summary.json`,JSON.stringify(summary,null,2));
await writeFile(`${root}/modified-files.json`,JSON.stringify({changed:audit.sourcePreservation.changed,added:audit.sourcePreservation.added,evidenceDirectory:root,existingUncommittedChangesPreserved:true},null,2));
const table=top.map(r=>`${String(r.commercial_rank??r.provisional_rank).padEnd(4)}${r.query.padEnd(39)}${String(r['92d_clicks']).padStart(5)}${String(r['92d_impressions']).padStart(8)}${Number(r['92d_position']).toFixed(2).padStart(9)}`).join('\n');
const owners=top.map(r=>`${r.query}\n  ${r.editorial_owner}`).join('\n');
const changed=audit.metadata.filter(r=>r.titleChanged||r.descriptionChanged).map(r=>`${r.route}\n  Title: ${r.titleBefore}\n      -> ${r.titleAfter}\n  Description: ${r.descriptionBefore}\n            -> ${r.descriptionAfter}`).join('\n\n');
const report=`DIGI-TEC repair service SEO growth sprint
19 October 2026 | Completed local review report

Recommendation: ${summary.recommendation} for the reviewed local change set. Production deployment
requires explicit approval. No commit, push, deployment, publication or production
write was performed.

Ten existing repair owners were improved in English and Arabic. No routes were
created. The completed five-brand hub content, PPF, tuning and backend work remain
preserved. All requested repair queries were investigated; implementation follows
measured commercial demand and current page suitability.

1. Repair keyword opportunity matrix and top ten

The final 88-row matrix is gsc/repair-keyword-opportunity-matrix-final.csv, with
JSON equivalent. It separates original measured queries from proposed variants,
records period-specific metrics and cell references, identifies editorial owners
and verifies the top-ten routes. Final rankings include observed competitor pages
and qualitative implications, not a fabricated keyword-difficulty score.

Rank prioritizes commercial repair/diagnostic intent, repeated measured demand,
average position, a suitable current owner and the competitive content already
available. Positions near 6-20 and meaningful demand receive earlier priority;
Rolls-Royce/Lamborghini engine queries remain commercially relevant with a larger
ranking gap around 25-26. No enquiry or ranking gain is forecast.

Recent measured exact-query metrics, Web, 10 July-9 October 2026:
Rank Query                                  Clicks     Impr  Avg pos
${table}

Two requested phrases have no exact row in any of the 17 reviewed exports:
"Mercedes diagnostics Dubai" and "Lamborghini engine diagnostics Dubai".
The measured singular "mercedes diagnostic dubai" supports the existing Mercedes
diagnostics owner; its numbers are not assigned to the unobserved plural wording.
Lamborghini diagnostics remains a useful existing destination, with its page
content preserved. The measured Lamborghini engine-repair query belongs to the
mechanical owner. Related wording stays on the same owner, without duplicate URLs.

Next repair backlog includes BMW diagnostics Dubai (49 impressions, position
13.06), BMW brake repair Dubai (44, 13.23), Mercedes brake repair Dubai (40, 7.40),
Mercedes AC repair Dubai (42, 19.86, one click), and Volkswagen AC repair
(65, 15.91; its Dubai variant is recorded separately). These were analyzed and
retained as existing-owner opportunities rather than expanding this implementation.

2. Source periods and competition

Primary sources, all read-only:
  24 hours: C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-19.xlsx
  Historical 28 days: C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-09-05.xlsx
  Recent 92 days: C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-12 (1).xlsx

The 24-hour export has hourly bucket starts from 18 October 06:00 through
19 October 05:00, UTC+04:00. The actual unfiltered 28-day query baseline spans
6 August-2 September. No current unfiltered October 28-day query export is
available. Later tuning-page or individual-Mercedes-query filtered exports are
not substituted for it. The 92-day source spans 10 July-9 October.

These periods overlap and have different lengths. They are kept separate, never
summed or treated as an improvement experiment. Missing query rows remain unknown,
not zero. Longer exports reach the 1000-row visible table cap. Queries and Pages
are independent marginal tables, so editorial ownership is not proof of which
URL ranked for a query. Dubai wording also does not establish searcher location.
All 17 source workbook hashes are unchanged; 452 primary-period metric cells were
reconciled. Exact row references and filters are in gsc/source-manifest.json,
gsc/requested-query-baselines.csv and gsc/repair-query-evidence-all-periods.csv.

Competition was reviewed through primary business service pages on 19 October.
Dedicated engine, suspension, gearbox and diagnostic destinations already compete
for these tasks, often with symptom descriptions, repair processes and contact
paths. The implementation therefore strengthens existing task pages and quote
clarity. It does not compete by adding unsupported certifications, rebuild scope,
equipment compatibility, price comparisons, guarantees or turnaround claims.
Two sources per top opportunity and specific implications are listed in
gsc/competition-assessment.txt. This is a qualitative competition review, not a
localized Google rank capture, backlink audit or numeric difficulty estimate.

3. Existing page ownership and scope decisions

${owners}

Each has an existing /ar counterpart. All twenty selected locale pages were
indexable in the route manifest, in the sitemap, self-canonical and linked from
their corresponding language hub before changes. The requested Lamborghini engine
diagnostics owner and its Arabic counterpart were also audited and preserved.
All 22 production pages returned HTTP 200 in the read-only live snapshot.

No new route or hub edit is justified: the existing pages own distinct engine,
gearbox, suspension and diagnosis tasks. English hub inlinks range from one to
five for these owners; every Arabic owner already has at least one hub inlink.
Exact baseline content/metadata and links are in audit/baseline-repair-owner-audit
.json/.csv and audit/owner-audit-and-scope.txt.

Technical eligibility does not establish Google's current indexed state or chosen
canonical. Performance-export URL rows and local routing evidence are insufficient
for that; dated URL Inspection evidence remains the appropriate follow-up.

4. Local improvements implemented

All ten owners now provide a service-specific assessment and quotation panel in
both languages. It explains what symptom details help arrange the right inspection,
how initial diagnosis differs from a repair quotation, when additional testing or
dismantling needs agreement, and what parts/fluids/labour and completion checks
the quote should identify. Timing remains conditional on scope and parts.

The panels cover engine-running versus shifting concerns, fitted gearbox
identification, ride-height symptoms versus an assumed strut/compressor failure,
and diagnostic findings versus a confirmed failed part. These explanations use
existing documented scope rather than expanding advertised capabilities.

WhatsApp drafts now request the model, year, mileage, history/recent work, warning,
symptoms, when they occur and preferred appointment time. The customer must review
and Send in WhatsApp; opening a draft does not establish receipt or an appointment.
Telephone labels in the selected Arabic pages use left-to-right isolation.
No enquiry form, message sending, backend endpoint or analytics event was added.

Six non-Mercedes Arabic pages now carry repair-specific headings, descriptions,
symptoms, process, parts guidance and FAQs rather than generic service translations.
Existing detailed Mercedes Arabic content is retained. Safeguards include the
Spectre combustion-engine exclusion, Lamborghini LDF/ISR/automatic distinctions,
vehicle-specific BMW gearbox procedures, and explicit confirmation of internal,
coding/calibration and high-voltage scope. Brand entity names remain unchanged.

5. Before and after SEO comparison

Complete comparison: qa/before-after-seo.csv (22 rows). Canonical URLs, indexability
and reciprocal hreflang are preserved. Six Arabic H1s are refined; English H1s
remain unchanged. Titles/descriptions change on two English and six Arabic pages.
Other metadata was already aligned with its repair task and is retained.

${changed}

6. Internal links, schema and conversion interpretation

Each selected panel adds two relevant assessment paths, localized to the existing
canonical owners: 40 cross-link placements across twenty pages. Some destinations
were already linked elsewhere on the page. These connect diagnosis to the relevant
repair owner and help separate engine, gearbox, suspension and electrical concerns.
All introduced internal targets are direct, indexable canonical destinations.
Existing hub links are verified and preserved; no completed hub source is edited.
Full link additions and schema comparisons: qa/internal-link-and-schema.json.

Each repair page retains one route Service node, canonical WebPage/Breadcrumb
relationships and the same '#business' provider. Updated visible descriptions and
Arabic FAQ answers feed the existing schema builders. FAQ questions/answers remain
in initial HTML and match published FAQ schema. Shared business graph bytes are
unchanged on all 22 audited repair pages; no duplicate business, invented rating,
price, warranty or special capability node is introduced. Structured data does not
guarantee a rich result or AI citation.

whatsapp_click, whatsapp_chat_opened and telephone_link_clicked remain contact
interest signals. None is counted as a confirmed enquiry. Qualified enquiries need
received messages, answered/qualified calls and accepted business records, then
appointment/service outcomes. Browser checks block external navigation and writes;
no actual message or telephone call was sent.

7. Test evidence and safeguards

Production pipeline: ${build.steps.length} steps, ${build.passed?'PASS':'FAIL'}, source fingerprint
${build.sourceSha256}
It includes SSR/client builds, routing sync, prerendering, hosting rules and
production-router tests, SEO/schema, PPF/paint/protection/query regression,
attribution/PPF draft safety, oil/suspension/transmission and social metadata.
The route count remains 1256, with 1005 canonical sitemap URLs.

Lint, app/Node type checks, master SEO, BMW hub, paint-care, tuning and source form
regression: ${checks.passed?'PASS':'FAIL'}. Lint retains eleven existing warnings and zero errors.
Static repair audit: ${audit.passed?'PASS':'FAIL'}, including twenty selected locales, 22 owner comparisons,
and twelve protected SSR pages. Browser: ${browser.passed?'PASS':'FAIL'}, ${browser.pageChecks.length} responsive cases at
1440/390/320px, ${browser.interactions.length} interaction cases, ${browser.noJavaScript.length} no-JavaScript cases and
${browser.hubLinks.length} hub-to-owner link checks. Existing master browser: ${master.passed?'PASS':'FAIL'},
${master.pageChecks.length} responsive checks and ${master.spaNavigation.length} SPA navigation checks.

Authoritative results: qa/production-build-results.json and qa/build-logs/;
qa/checks.json; qa/repair-static-validation.json; qa/browser/browser-results.json;
qa/existing-master-browser/browser-results.json; release-summary.json.
An initial browser run overlapped a rebuild and is excluded as invalid evidence;
the final suites use a stable build. The static harness normalizes undefined
runtime keys before comparison with JSON snapshots; exact SSR hashes also match.

Baseline source files: ${audit.sourcePreservation.baselineFiles}; byte-identical existing files:
${audit.sourcePreservation.preservedBaselineFiles}. Only BrandServicePage.tsx changes and three scoped modules are added.
Ten completed hub locales and two Lamborghini diagnostic locales are SSR/SEO
identical to the starting snapshot. PPF, tuning, backend, shared schema, routing
policy and all prior uncommitted source changes are preserved. Generated test
outputs are archived inside this sprint and their starting bytes restored.

8. Exact modified source files

  src/pages/BrandServicePage.tsx
    Target-only content adapter, quotation panel and Arabic phone formatting.
  src/data/repairServiceContent.ts (new)
    Ten-owner scope, two English metadata refinements, symptom context, canonical
    related paths and contextual WhatsApp drafts.
  src/data/repairServiceArabic.ts (new)
    Six repair-specific Arabic overrides; existing Mercedes content preserved.
  src/components/RepairEnquiryPanel.tsx (new)
    Localized inspection/quotation guidance, contact actions and related paths.

Evidence, baseline snapshots, analysis and reusable QA helpers are contained in
outputs/repair-service-2026-10-19/. Full source hashes: modified-files.json and
qa/repair-static-validation.json. Existing HEAD stays 6180f45 on main.

9. Deployment readiness and measurement

${summary.recommendation}: the final local gates ${passed?'pass':'must pass before release'}. An explicit approval is still required
before commit, push, deployment or publication. There are no new routes or
business capability claims requiring an expanded service offering.

After an authorized release, capture URL Inspection status for the selected owners
and request a current unfiltered 28-day query/page export. Compare matched complete
28-day periods, retain a 92-day context, and segment UAE/mobile consistently.
Obtain query-by-page data or per-query Pages reports before diagnosing competing
owners. Track received/qualified enquiries and appointments separately from clicks.
This sprint establishes local readiness, not measured traffic or lead uplift.
`;
await writeFile(`${root}/COMPLETED-REPORT.txt`,report);
console.log(JSON.stringify(summary,null,2));
if(!passed)process.exitCode=1;
