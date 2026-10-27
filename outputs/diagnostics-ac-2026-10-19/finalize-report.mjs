import { readFile, writeFile } from 'node:fs/promises';
const out = 'outputs/diagnostics-ac-2026-10-19';
const json = async file => JSON.parse(await readFile(`${out}/${file}`, 'utf8'));
const qa = await json('qa/COMBINED-QA-SUMMARY.json');
const cli = await json('qa/combined-cli-results.json');
const browsers = await json('qa/combined-browser-results.json');
const focused = await json('qa/diagnostics-ac-browser/browser-results.json');
const integrity = await json('preservation-and-integrity.json');
const scope = await json('modified-files.json');
const research = await json('research/analysis-checks.json');
const researchProof = await json('research/independent-evidence-verification.json');
const top = await json('research/top20-commercial-opportunities.json');
const meta = await json('qa/metadata-before-after.json');
const pkg = await json('source-package-manifest.json');
if (![qa, cli, browsers, focused, integrity, researchProof].every(result => result.passed === true)) throw Error('Final evidence is not all passed');
const qaText = await readFile(`${out}/qa/COMBINED-QA-SUMMARY.txt`, 'utf8');
const topLines = top.map((row, i) => `${i+1}. ${row.query}: ${row['92d_clicks']} clicks, ${row['92d_impressions']} impressions, ${(row['92d_ctr']*100).toFixed(2)}% CTR, position ${row['92d_position'].toFixed(2)}.\n   ${row.structural_owner}\n   ${row.recommended_action}`).join('\n');
const examples = meta.filter(row => ['/services/car-diagnostics-dubai','/services/car-ac-repair-dubai','/brands/bmw-service-dubai/engine-diagnostics'].includes(row.route)).map(row => `${row.route}\n  Before: ${row.before.title}\n  After:  ${row.after.title}`).join('\n\n');
const files = scope.files.map(file => `  ${file.change === 'added' ? 'A' : 'M'} ${file.file}`).join('\n');
const report = `DIGI-TEC — DIAGNOSTICS & AC REPAIR SEO GROWTH SPRINT
Completed locally: 19 October 2026, Asia/Dubai
Baseline: main at acef3427b57b48259bc5b39d6a0f75798603ae95

1. EXECUTIVE SUMMARY

Improved eight existing commercial owners and their Arabic counterparts: 16
locale pages, zero new routes. The strongest practical opportunities are selected
brand diagnostics and AC enquiries plus general diagnostic/cooling assessment.
The work adds accurate symptom-to-test explanations and stronger contact paths,
with vehicle-specific scope rather than unsupported equipment or repair promises.

Local implementation and combined QA: PASS, ready for review. Production: NO-GO
until the existing live-state/rollback uncertainty is resolved and the concrete
release is authorized. Nothing from this sprint was committed, pushed, deployed,
published or written to production or Google Business Profile.

The previous five-brand/repair source commit is the baseline, not this sprint's
output. The request's new restriction on commit/push/publication is respected.
Existing PPF, tuning, completed hubs/repair content, backend and configuration
work is preserved. No ranking, traffic, AI-citation or qualified-enquiry uplift
can be measured from this undeployed candidate.

2. DIAGNOSTICS AND AC KEYWORD MATRIX

research/keyword-opportunity-matrix.csv and .json contain 50 distinct targets:
40 exact measured GSC queries and ten clearly proposed variants with null metrics.
36 measured queries occur in the broad 92-day export; four have evidence only
outside that primary period. No missing row is converted into zero demand.
All 20 commercial priorities below have exact 92-day query evidence.

Every matrix row retains clicks, impressions, exported CTR, average position,
exact source file/worksheet row, period/filter, intent, structural owner, commercial
priority, competition context and action. Structural/editorial ownership is
verified from routes/HTML/canonicals, not inferred GSC landing-page attribution.
No joined diagnostic/AC query-by-page export was available; independent Queries
and Pages tabs were not joined. The separate Pages evidence is labelled as such.

Primary periods:
  92 days: 10 July–9 October 2026; Web, no query/page/country/device filter.
  Historical 28 days: 6 August–2 September 2026; Web, no query/page filter.
  24-hour export: 18 October 06:00–19 October 05:00, Time (UTC+04:00),
                  Web (text-based), Last 24 hours.

The 28-day window overlaps the 92-day window. Neither is summed with another
period or used as an independent before/after comparison. Filtered Mercedes,
tuning, PPF and appearance exports remain separate. Some query tables are capped;
export omission/anonymization means the matrix is observed demand, not total volume.

Seventeen original workbooks were inspected without edits. Independent checks
reopened three primary books and reconciled 150 query-period rows and 372 observed
numeric values. All 17 source hashes are unchanged. See source-manifest.json,
independent-evidence-verification.json and GSC-RESEARCH-REPORT.txt in research/.

Priority is an analyst assessment of impressions, position, commercial intent,
existing owner, capability/location constraints and qualitative competitor pages.
No monthly-volume estimate, difficulty score, lead forecast or paid-tool metric
is invented. Competitor claims do not prove DIGI-TEC capabilities. A strong
completed owner may rank highly for measurement while requiring no new editing.

3. TOP 20 COMMERCIAL SEARCH OPPORTUNITIES

Metrics below are for 10 July–9 October 2026 only. These positions are historical
GSC averages, not a live localized ranking audit. Similar variants share owners.

${topLines}

4. EXISTING PAGE OWNERSHIP

Selected existing English owners (each has an unchanged /ar counterpart):
  /services/car-diagnostics-dubai
  /services/car-ac-repair-dubai
  /brands/bmw-service-dubai/engine-diagnostics
  /brands/porsche-service-dubai/engine-diagnostics
  /services/mercedes-ac-repair-dubai
  /brands/bmw-service-dubai/ac-repair
  /brands/volkswagen-service-dubai/ac-repair
  /brands/range-rover-service-dubai/ac-repair

The wider audit inventories 216 relevant routes, including general/brand service
owners and existing symptom guides: 196 indexable/sitemap routes and 20 preserved
secondary electrical noindex routes. All eight selected owners are already
indexable and linked from existing hubs. No duplicate symptom, refill, compressor,
condenser, evaporator or hose page is justified by the evidence.

Preserved priorities include completed Mercedes diagnostics, general electrical
repair, Volkswagen EPC diagnostics, Range Rover diagnostics, Lamborghini and
Rolls-Royce owners, and existing problem guides. Do not invent Arabic versions
of English-only guides. The complete map and immutable selected baseline HTML
are under audit/, especially existing-page-ownership-map.csv,
OWNERSHIP-CAPABILITY-AUDIT.txt and selected-owner-baseline.json.

The separate read-only public capture checked 32 owner locale pages plus sitemap
and robots (34 GETs), all HTTP 200. Eligibility is not Google index coverage.
Production Mercedes diagnostics still has its older title while local main has
the approved repair title, confirming that a main-branch push alone does not
prove production publication. No live URL Inspection evidence was available.

5. LOCAL IMPROVEMENTS IMPLEMENTED

General diagnostics now explains warning lights, misfire, no-crank versus cranking
without starting, intermittent faults, scan data, physical/circuit checks and why
codes alone do not identify a failed component. Coding/programming and high-voltage
work remain separately confirmed functions, not implied universal coverage.

BMW diagnostic copy distinguishes a drivetrain warning from a confirmed gearbox
failure. Porsche copy distinguishes engine, PDK and electrical investigation by
vehicle generation and fitted system. Tool-led titles are replaced with fault
assessment wording; no new ISTA+, PIWIS, XENTRY, ODIS or JLR coverage is claimed.

General AC now addresses warm air, weak airflow, intermittent or uneven cooling,
repeated refrigerant loss, compressor/control concerns, condenser/evaporator and
hose/pipe leak investigation. A refill is conditional on diagnosis and vehicle
requirements, and symptoms do not justify immediate component replacement.

Mercedes, BMW, Volkswagen and Range Rover AC pages add intake and assessment
context for cabin zones, idle/road behavior and previous work. Selected inherited
claims equating smell or footwell water with one cause, universal cluster messages,
compressor-clutch behavior and malformed refrigerant prose are removed from the
rendered owners. No refrigerant type, machine, replacement capability, price,
warranty, manufacturer authorization or turnaround promise is added.

Both languages provide equivalent assessment, quotation, FAQ and contact guidance.
The user explicitly selected cautious existing-service wording because no new
workshop capability inventory was supplied. Existing website claims and independent
operational verification are separated in content/CAPABILITY-EVIDENCE-REGISTER.json.

6. BEFORE-AND-AFTER SEO COMPARISON

qa/metadata-before-after.csv and .json contain all 16 locale comparisons:
${meta.filter(row=>row.before.title!==row.after.title).length} titles, ${meta.filter(row=>row.before.description!==row.after.description).length} descriptions and ${meta.filter(row=>row.before.h1!==row.after.h1).length} H1s change. Canonicals, reciprocal hreflang,
indexability, sitemap ownership and established entity IDs remain unchanged.

${examples}

General AC previously had no English FAQs or service-specific hero/quote guidance;
it now has five supported questions, a clear assessment CTA and quote panel in
both languages. All selected pages have five matching crawlable FAQs. This is
coverage and accuracy work, not a claim that more FAQs guarantee better rankings.

7. INTERNAL LINKS AND STRUCTURED DATA

38 new direct canonical link placements connect general-to-brand assessment and
diagnostics-to-repair decisions in both languages. Some destinations were already
linked elsewhere; 38 is a placement count, not a unique-URL count. Existing hub
inlinks are preserved and verified, without repeating hub optimization.

The existing Service/WebPage/Breadcrumb/FAQ builders and #business provider graph
are retained. Selected descriptions and Arabic service types reflect actual visible
diagnostic/AC copy; all 80 locale FAQ question/answer occurrences match HTML.
No duplicate business, rating, offer price, manufacturer affiliation or AI schema
is introduced. See INTERNAL-LINK-AND-SCHEMA-REPORT.txt and detailed static evidence.

8. GEO AND GOOGLE MAPS RECOMMENDATIONS

Retain the existing name, Al Quoz Industrial Area 3 / Warehouses 11–15, Dubai and
+971 4 340 2223 consistently. No DIP2 branch or mobile service is established by
the available evidence. Clear service descriptions, crawlable answers, direct
links and stable entity IDs support understanding without special AI markup.

content/GBP-SERVICE-DRAFTS.txt provides two service descriptions in English and
Arabic for diagnostics and AC assessment. They are drafts only. Before any future
GBP edit, verify the exact existing listing/Place ID, current categories/service
options, real workshop scope, pin/entrance, phone and opening hours. Preserve
existing services and business identity; do not add keywords to the business name.

No GBP/Maps account was changed. No guaranteed local position or AI citation is
claimed. Google official service/category and AI-feature guidance, plus primary
DENSO/Bosch technical references, are linked in the content and schema reports.
Those technical references do not verify DIGI-TEC tool ownership or compatibility.

9. CONVERSION IMPROVEMENTS

Every selected page has a bilingual assessment panel, direct WhatsApp draft and
telephone contact. General AC gains its missing service-specific hero CTA. Drafts
request vehicle details, symptoms/conditions, recent work and preferred appointment;
AC drafts specifically ask about previous AC/refrigerant work. Arabic phone digits
are isolated left-to-right where displayed in the new panel.

The panel states that the customer must review and press Send in WhatsApp and
that opening a draft confirms neither receipt nor an appointment. Initial scope
and cost are agreed before investigation; further work needs approval and a repair
estimate follows findings. No new backend form or customer-data collection system
is introduced. Existing hub form validation/privacy behavior is regression tested.

Selected service routes have no sticky contact widget; the existing MascotWidget
is mounted on the homepage only. Clear hero/panel/phone paths pass mobile checks;
no new sticky bar is introduced. Existing analytics conventions are unchanged:
contact clicks and draft opens are interest events, never confirmed enquiries.
Private message text and contact details are not added to analytics.

10. FULL QA EVIDENCE

${qaText.trim()}

The build source fingerprint matches ${integrity.candidateBuildInputs} unchanged candidate inputs:
${integrity.sourceSha256}

The first build completed all functional steps but regenerated the known routing
data file, so the wrapper correctly required a stable rerun. That rerun passed.
A protected snapshot harness needed generated Radix ID/insignificant whitespace normalization and canonical
content paths for paint-options aliases. Two legacy browser harnesses initially
rejected alternate local ports before opening browsers; reruns used their allowed
ports. All superseded attempts and exact rerun evidence are retained. No application
change was made to hide a failed assertion; two existing title expectations were
updated explicitly for the intentional BMW/Porsche metadata change.

Browser checks intercepted external/write requests. No customer message, telephone
call, backend write, production request or confirmed enquiry was sent by the local
browser suites. Live field Core Web Vitals, GA4 ingestion, CRM receipt, Google-selected
canonicals and ranking/enquiry improvement are not established by these tests.

11. EXACT MODIFIED FILES AND PRESERVATION

${files}

Five application files and one existing validator: three existing files modified,
three additions. The validator changes only two expected titles; all other
assertions remain. No package, lockfile, shared schema builder, route/noindex
policy, Cloudflare configuration, PPF/tuning data or unrelated backend edit changed.

modified-files.json records before/after source SHA256. Local review package:
diagnostics-ac-source-changes.zip (six files, no dependency or environment files).
SHA256: ${pkg.archiveSha256}

preservation-and-integrity.json confirms ${integrity.byteIdenticalUnrelatedFiles} unrelated original files byte-identical,
${integrity.intentionallyModifiedExistingFiles} intentional existing-file changes, the three approved additions, empty Git
index, unchanged main/HEAD and no unexpected additions outside this sprint output.
The baseline's unrelated backend/master-validation/output work is preserved.

12. PRODUCTION RELEASE READINESS

Local candidate: GO for review; full local gates pass. Production promotion:
NO-GO pending authenticated current origin/edge snapshot, supported rollback pair,
fresh drift/source verification and explicit authorization for a concrete release.

The preceding automotive release audit found Cloudflare 403 Invalid access token
and no verified immutable active content deployment or complete rollback pair.
No replacement authenticated snapshot has been obtained in this sprint. Public
HTML/headers and Git main do not prove there are no newer production edits.
Existing Cloudflare config is edge-router-only; blindly deploying it does not
publish these HTML/assets and could change unrelated production behavior.

Use the existing production architecture and the prior reviewed runbook after
reconciling live state, not a guessed Pages/Worker asset upload. Preserve all PPF,
tuning, configuration and newer production changes, rerun QA if the base changes,
and obtain authorization before commit, push, deploy, publish or live GBP edits.

After an approved release, verify all 16 canonical locale pages, real rendered
copy, redirects/canonicals/hreflang/schema, sitemap/robots, phone and intercepted
WhatsApp drafts, PPF/tuning/previous hubs/repairs, and GSC URL Inspection. Confirm
actual received/qualified enquiries separately from clicks and draft openings.

13. NEXT KEYWORD BACKLOG AND MEASUREMENT

research/next-keyword-backlog.csv separates measured secondary opportunities from
proposed variants. Evaluate existing Audi diagnostics, Porsche AC/Arabic, Range
Rover diagnostics and other brand AC owners after capability/ownership review.
Check-engine, BMW drivetrain and VW EPC variants can be answered on existing
owners; they are not measured exact queries unless a matching export row exists.
Keep replacement/tool-led and DIP2 claims on hold without supporting evidence.

Next obtain joined query+page GSC evidence for the measured clusters, an up-to-date
unfiltered 28-day export and equivalent non-overlapping comparison windows after
release. Retain the 92-day context and exact country/device/search filters. Track
workshop-received enquiries, qualified calls, appointments and approved jobs
separately from click events. No automatic monitoring or recurring task was created.
`;
await writeFile(`${out}/COMPLETED-REPORT.txt`, report);
await writeFile(`${out}/release-readiness.json`, JSON.stringify({ completedAt:new Date().toISOString(), base:scope.base, localImplementationComplete:true, localQaPassed:true, productionGo:false, productionRecommendation:'NO-GO pending authenticated current origin/edge and rollback verification, drift gates and explicit authorization', selectedOwners:8, localePages:16, newRoutes:0, measuredQueries:research.measured_distinct_queries, proposedQueries:research.proposed_distinct_queries, modifiedFiles:scope.files.map(file=>file.file), sourceSha256:integrity.sourceSha256, reviewSourceArchiveSha256:pkg.archiveSha256, originalUnrelatedFilesPreserved:integrity.byteIdenticalUnrelatedFiles, committed:false, pushed:false, deployed:false, published:false, googleBusinessProfileModified:false, realCustomerEnquirySent:false, report:'COMPLETED-REPORT.txt' }, null, 2));
console.log(JSON.stringify({ report:`${out}/COMPLETED-REPORT.txt`, localQaPassed:true, productionGo:false, modifiedFiles:scope.files.length }));
