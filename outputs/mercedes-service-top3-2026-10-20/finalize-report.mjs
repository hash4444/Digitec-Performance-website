import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve('outputs/mercedes-service-top3-2026-10-20');
const read=async file=>JSON.parse((await fs.readFile(path.join(out,file),'utf8')).replace(/^\uFEFF/,''));
const qa=await read('qa/COMBINED-QA-SUMMARY.json');
const integrity=await read('preservation-and-integrity.json');
const manifest=await read('modified-files.json');
const metadata=await read('qa/metadata-before-after.json');
const live=await read('research/live-gsc-evidence.json');
const research=await read('research/research-verification.json');
const packages=await read('source-package-manifest.json');
if(qa.passed!==true||integrity.passed!==true)throw Error('Final QA and preservation must pass before completion');
if(manifest.files.length!==6)throw Error('Unexpected source scope');
const metadataText=metadata.map(r=>`${r.route}\n  Title before: ${r.before.title}\n  Title after:  ${r.after.title}\n  H1 before: ${r.before.h1.join(' | ')}\n  H1 after:  ${r.after.h1.join(' | ')}\n  Description before: ${r.before.description}\n  Description after:  ${r.after.description}\n  Visible text word count, same QA method: ${r.before.visibleWordCount} -> ${r.after.visibleWordCount}\n`).join('\n');
const enMetadata=metadata.find(r=>r.route==='/brands/mercedes-benz-service-dubai');
const arMetadata=metadata.find(r=>r.route==='/ar/brands/mercedes-benz-service-dubai');
const lengthChange=r=>`${r.before.visibleWordCount}->${r.after.visibleWordCount}words(${((r.after.visibleWordCount/r.before.visibleWordCount-1)*100).toFixed(1)}%)`;
const report=`DIGI-TEC — MERCEDES SERVICE DUBAI CAMPAIGN — COMPLETED LOCAL REPORT
Prepared 20 October 2026, Asia/Dubai. Primary query: mercedes service dubai.
Target: https://digitecme.com/brands/mercedes-benz-service-dubai

DECISION
Local implementation and QA: GO for review. Production publication: NO-GO until the active production origin/edge and rollback state are verified, drift is reconciled and an explicit release is authorized. This task did not commit, push, deploy, publish, request indexing, contact customers, edit GBP or change any external account. No top-three ranking, ranking lift or booking increase is claimed.

The existing English/Arabic hub is now service-first, with scheduled maintenance ahead of repair content, a specific bilingual servicing intake and six factual customer answers. Two contextual incoming link placements were added to existing service directories. Six source files changed; zero new routes. English copy was consolidated; Arabic received equivalent service/intake detail. Published PPF, tuning, prior automotive sprints, backend work and Cloudflare configuration are preserved.

1. EXACT-QUERY RANKING DIAGNOSIS
Historical 92-day baseline, 10 July–9 October 2026: 613 impressions, 2 clicks, exported CTR 0.33%, average position 13.88. This is an aggregate historical query metric, not a current Dubai rank. The newly supplied 20 October workbook actually covers 20 September–17 October: 182 impressions, 2 clicks, CTR 1.1%, average position 12.62 on its exact visible query row. Its stored filter is CONTAINS, so the file's Pages/country/device tables were not simply assumed to be jointly exact.

Authenticated read-only GSC independently verified an Exact query filter for the same 28 days. All-country aggregate: 182 impressions, 2 clicks, average position 12.6 at UI precision. Hub: 164 impressions, 2 clicks, position 11.7; oil-service owner: 10 impressions, 0 clicks, position 9.8; brake owner: 8 impressions, 0 clicks, position 34.6. UAE exact-query total: 179 impressions, 2 clicks, position 12.2. Joint exact query + UAE + exact hub: 161 impressions, 2 clicks, CTR 1.2%, average position 11.2. Desktop: 100 impressions, 2 clicks, CTR 2%, position 11.2. Mobile: 61 impressions, 0 clicks, CTR 0%, position 11.3. These joint observations were read from the filtered report, not reconstructed by joining separate workbook tabs.

The zero mobile clicks are an investigation opportunity in a small sample, not proof of a mobile defect or a statistically established CTR deficit. Latest provisional 24-hour view, 19–20 October: 4 impressions, 0 clicks, average position 15.8, all attributed to the hub; exact hour boundaries were not exposed. Do not infer a trend or release effect from four impressions.

Indexed URL Inspection: URL is on Google; page is indexed; crawl/indexing allowed; successful fetch; Googlebot smartphone. User-declared canonical is the exact target; Google-selected canonical is Inspected URL, resolving to the target. Last crawl displayed16October2026 21:18:38, timezone not exposed. No Request indexing or Test live URL action performed. Both the finalized28day window and indexed crawl precede19October sprints; they cannot establish their impact or today's unpublished candidate. Overlapping unequal windows were not pooled or described as a controlled improvement.

Evidence: research/EXACT-QUERY-RANKING-DIAGNOSIS.txt, exact-query-diagnosis.json, live-gsc-evidence.json, redacted-identity AX captures, source-manifest.json and research-verification.json. Eighteen original workbooks independently reopened;104 research assertions passed; source hashes unchanged. Spreadsheet contents treated as data, not instructions.

2. CURRENT COMPETITOR COMPARISON
Actual Google browser context used query=mercedes service dubai,gl=ae,hl=en,pws=0,desktop1280x720. Footer: Results are not personalised; United Arab Emirates; Al Barsha Second,Dubai from IP. Signed-in owned-site cards excluded. Top ads, additional ads, AI Overview and a Gargash local knowledge panel were separated from ordinary Web results. The local panel was not a three-business Maps pack. No Maps rank was inferred.

Genuine organic competitors observed: official Gargash Al Quoz and Deira location URLs plus official Mercedes services portal; SilberArrows organic Mercedes site; Al Maraghi Mercedes repair page; Partinn Mercedes specialization page; BenzDubai directory-style result. The last shares a published contact with Al Maraghi; it was not counted as an independently verified workshop or editorial authority. Additional second-page competitors include Munich Motor Works and DAScenter. DIGI-TEC target appeared on page two in this snapshot; lower first-page results changed on return. No stable numerical rank or causal claim is made.

Comparison: official Mercedes/Gargash has genuine manufacturer/distributor identity, location details and a clear service booking path. SilberArrows publishes focused servicing/A-B navigation, named team, imagery, review/contact paths. Al Maraghi publishes broad Mercedes system navigation, packages, branches and gallery. Partinn combines maintenance/oil/filter explanation with relevant contact/location paths. These are descriptions of first-party presentations; their commercial/certification/capability claims are not independently proven and must not be copied. No paid backlink index was available, so numerical authority/domain ratings/referring domains are not invented.

Full verified URLs, sources and contextual limitations: external/EXTERNAL-RESEARCH-REPORT.txt and external-evidence.json. Content-order, quote-intake and genuine-experience gaps are hypotheses supported by this comparison, not proven ranking causes.

3. SEARCH INTENT AND CANNIBALIZATION
The hub is the dominant directly measured broad servicing owner:164 of182 all-country visible page impressions and161 of179UAE. Oil and brake owners serve distinct useful tasks. A few broad-query impressions on them do not prove harmful cannibalization; no destructive redirects, removals or new keyword pages were introduced. Monitor sustained switching and qualified performance with equivalent report filters. Broad legacy service/repair/best-workshop aliases already301 directly to the hub in public observations.

Maintenance guide, A/B cost/ASSYST articles and model guides retain informational ownership and contextual booking links. Oil, diagnostic, mechanical, suspension, transmission and electrical owners retain specific service intent. Maybach, PPF and tuning remain separate. Initial code-audit unknowns for GSC ownership/canonical are superseded by the later authenticated evidence.

4. BEFORE-AND-AFTER SEO COMPARISON
${metadataText}
The English hub is shorter under the same visible-text QA comparison,${lengthChange(enMetadata)}. Arabic${lengthChange(arMetadata)} adds equivalent six-question and intake detail; do not claim both languages shortened. Word counts are a consistent text-length diagnostic, not an SEO target or linguistic quality measure.

5. IMPLEMENTED LOCAL IMPROVEMENTS
- Preserve the existing canonical owner and apply the requested English title/H1 after actual ownership/indexing verification. Arabic metadata/H1 mirrors the servicing emphasis. Keep the existing above-fold English Book Mercedes Service CTA; add the equivalent Arabic label.
- Move the existing maintenance section directly after hero/navigation and ahead of repair/model content. Consolidate the duplicate broad location/story/A-B/parts paragraphs instead of adding more generic copy. Retain repair, diagnostic, model, problem and approved review navigation as secondary content.
- Explain conditional ServiceA/ServiceB/minor/major scope, oil/filter work, scheduled inspections, ASSYST, mileage/history, time-based and market-specific requirements, exact fluid approval/quantities, AMG variation and Dubai operating conditions. No universal interval, new tool capability, fixed package, price, free diagnosis, warranty, turnaround or authorization promise.
- Provide six factual questions/answers in both languages, addressing location, A/B contents, service due, independent-workshop selection, quotation factors and specific-model acceptance. Hybrid/electric and supported procedures remain conditional.
- Update sitemap lastmod to20October only for the four substantively changed locale pages; all routes/indexability decisions and unrelated dates preserved.

6. INTERNAL LINKS, SCHEMA AND GENUINE AUTHORITY
One localized body paragraph/link from each service directory now points to the existing maintenance anchor. Existing homepage logo/service links, maintenance/cost/interval/oil/model/diagnostic links were audited and preserved; no repetitive sitewide exact-match anchors added. New bilingual maintenance-to-booking anchors work in both locales. No new route, redirect or sitemap URL.

Both hub graphs preserve every existing entityID, global business/Organization/WebSite/Brand relationships and Service provider @id=https://digitecme.com/#business. Service/WebPage name/description follow visible servicing copy. Existing FAQPage now uses the same six visible answers per locale. No new schema type, invented review/rating/price/certification, or AI-specific schema. See content/CONSOLIDATION-LINK-AND-SCHEMA-REPORT.json and QA for graph/markup checks.

Original maintenance case studies are not yet supported by supplied job records/permissions; the Mercedes case collection is empty. Existing workshop/engine/tuning/conversion imagery must not be relabelled as ServiceA/B evidence. Collect actual model/year/job/date/mileage, approved scope, original matching photos, parts/fluid evidence, technician factual review and consent before publication. Case outcomes and qualifications must remain evidenced.

External authority plan: reconcile genuine existing business citations first, then seek relevant editorial/supplier/member mentions only where the relationship and audience are real. Use accurate business identity and naturally relevant destination URLs. No purchased followed links, reciprocal-anchor schemes, automated directory submissions, false memberships, fabricated reviews or outreach performed.

7. GOOGLE MAPS / GEO RECOMMENDATIONS
Read-only live GBP matched business website/telephone/entity. Current profile name: Digitec Performance Center L.L.C.; primary repair-shop identity; Warehouse No.11–15, Al Qouz Ind.third, Dubai; phone +97143402223. Published listing hours differ from some site/directory records; actual premises/entrance/hours require workshop verification before any changes. This sprint did not add or update review ratings/counts or claim them as Mercedes-specific proof. The existing shared GoogleReviews component still displays 4.4/155 while the observed live profile shows 4.4/156; this pre-existing volatile-count drift is an accuracy backlog item. A later shared-widget change should use a verified dated count or neutral wording and include all affected pages in regression checks. The shared component and existing review text were preserved here.

P1 factual issue: additional Mercedes-Benz dealer category conflicts with the site's independent-workshop description. Confirm actual status and correct an inaccurate category only through a separately approved account action; do not claim dealer authorization. Existing Mercedes Periodic Maintenance Service(A&BServices) already exists, so focus any later approved description update there. Suggested service updates were left untouched; a listing label does not verify workshop function capability.

Conditional EN/AR GBP service-description drafts, original-photo shot list, consent/provenance checklist and citation plan are in external/EXTERNAL-RESEARCH-REPORT.txt. EasyUAE has AreaFirst vs GBP Area3;2GIS address/weekday hours differ;Citysearch is incomplete/older. Reconcile actual records rather than blindly copying any one source. Preserve existing PPF information. No GBP/citation/review/photo/account edit, upload, acceptance or outreach occurred.

8. CONVERSION IMPROVEMENTS
Static Mercedes WhatsApp drafts and the dedicated EN/AR form request model, model year, mileage/unit, ServiceA/B or other service message, available history and preferred appointment. Model/message required; unknown allowed and other details optional. Optional name/callback fields remain. Validated drafts preserve phone+97143402223/WhatsApp97143402223 and existing contact tracking. Tracking removes prefilled text, excludes PII and uses whatsapp_click/whatsapp_draft_opened; no successful-booking or received-enquiry event introduced. Review/send in WhatsApp and subsequent team confirmation remain explicit. No backend integration or customer message sent.

9. FULL QA EVIDENCE
qa/COMBINED-QA-SUMMARY.txt/.json is authoritative. Full19stage production pipeline, TypeScript app+Node, ESLint, SEO/metadata/social/schema/routing/canonical/hreflang/internal-link checks, prior automotive static/browser suites, PPF and tuning regressions, plus dedicated bilingual Mercedes form/contact/responsive/no-JavaScript/SPA tests passed. ESLint has0errors and11existingwarnings. Dedicated static10155assertions include exactfour changed pages and strict preservation of metadata/JSON-LD/normalized visible markup on all1252unaffected pages. Generated whitespace/RadixIDs are normalized; changed global asset hashes are expected, not a claim of byte-identical HTML.

All browser traffic restricted to loopback GET/HEAD with external/write requests blocked and contact navigation intercepted. No sent WhatsApp, connected call, real enquiry, backend write or GA4/CRM ingestion is established. Local tests do not establish field Core Web Vitals, search lift, rich-result eligibility or completed bookings. Indexed canonical evidence is genuinely obtained separately from GSC, while no index request/live test was made. Final source stability and preview cleanup are recorded by QA. A real 320px mobile contact-bar overlap was corrected by shortening only the English hero introduction, then rebuilding and rerunning the affected suites and all static/CLI checks. Seven other passed browser suites were retained with unchanged source/render evidence; they were not represented as newly rerun after that copy fix. The initial SPA canonical test needed an explicit wait for the existing metadata effect to settle; the expected canonical/H1 assertion was retained. Two later local networkidle navigation timeouts in a sequenced320px case were investigated with fresh-page and SPA/back controls, which passed. The complete instrumented suite then passed with the identical12second timeout and product assertions; request logging was the only further harness change, and no product defect was established. These local timing failures are retained as test-environment limitations, not hidden or called product fixes. Initial pre-final-source/harness attempts remain in evidence and are not represented as the final passing run.

10. EXACT MODIFIED-FILE MANIFEST AND PRESERVATION
${manifest.files.map(r=>`${r.status}: ${r.file}\n  SHA256 after: ${r.afterSha256}`).join('\n')}

Base main:${manifest.base}. Remote main checked equal before work. Lovable editor read-only latest_commit_sha also2971301; publication status does not attest an immutable active source snapshot. Git branch/HEAD/index unchanged. ${integrity.byteIdenticalUnrelatedFiles} unrelated pre-existing files remain byte-identical; four expected existing files changed and two were added. Original unrelated Supabase function/master-validation changes, prior sprints, published PPF, tuning, dependencies and Cloudflare configuration preserved. See modified-files.json and preservation-and-integrity.json.

The local source-review ZIP contains only these six paths, with exact reviewed hashes; no environment file, credentials, raw private evidence, backend code, dependencies or build artifacts. It is a review artifact, not a deployed site. See source-package-manifest.json.

11. PRODUCTION RELEASE READINESS
GO for local review. NO-GO for production now. This campaign explicitly stops before Git or external publication. A future release requires exact six-file scope, current remote drift check, explicit action approval, active production origin+Cloudflare state snapshot and verified rollback target. Earlier19October Cloudflare read-only preflight failed authentication; no new complete authenticated origin/edge rollback snapshot is available. Do not redeploy the checked-in edge-only router as a content release, infer a live deployment from Git/editor SHA, or invent a Cloudflare Pages assets command.

Before promotion: capture actual immutable published content/edge IDs and a recoverable pre-release state; compare to reviewed baseline and preserve newer PPF/tuning/backend/config changes; reconcile any drift and repeat affected QA; confirm exact reviewed source in existing host; publish only after authorization. After an authorized release verify both hubs/directories, repair/diagnostic/oil owners, Arabic, renderedmetadata/content, redirects, canonical/hreflang, sitemap, safe mobile contact/form paths, PPF/tuning markers and indexed URLInspection. A rollback must restore the saved actual origin/edge state through its verified host mechanism, not reset this shared workspace. Prior architecture/rollback runbook:../automotive-release-2026-10-19/deployment/PRODUCTION-COMPATIBILITY.txt.

12. SEVEN-,28-AND90-DAY MONITORING PLAN
Planning checkpoints27October2026,17November2026,18January2027 do not schedule jobs or presume today's publication. Reset all analysis windows from the actual authorized production release and finalized GSC reporting days. At7days verify serving/indexing/canonical/contact behavior and inspect equal non-overlapping exact-query/hub/UAE/device windows cautiously. At28days compare matching complete periods with all-page and hub-only views, actual counts beside CTR/position, owner switching, staff-qualified enquiries and confirmed appointments. At90days use true90day windows, annotate seasonality/releases, evaluate original evidence/citation work and choose the next measurable action.

Keep Searchtype/query equality/country/page/device/date basis identical; do not pool overlapping windows or relabel GSC daily dates as Dubai dates. Exclude partial release day; disclose low volume. Track WhatsApp opens, call launches, received qualified enquiries and confirmed appointments separately; deduplicate spam/duplicates through the real operational process. Topthree remains unachieved unless date-specific exact-query/target-URL/UAE GSC evidence supports it, with device/window disclosed; an average<=3 would still not guarantee every searcher's position. No automated monitoring created.

PRIMARY SOURCE LINKS
GSC interpretation/canonical attribution:https://support.google.com/webmasters/answer/7042828?hl=en
GSC combined dimensions/filters and API date basis:https://developers.google.com/webmaster-tools/v1/searchanalytics/query
Official Mercedes service-maintenance categories (USmarket timing not reused):https://www.mbusa.com/en/owners/service-maintenance
Official local servicing context (Gargash terms not DIGI-TEC promises):https://www.mercedes-benz-mena.com/dubai/en/services/
Official MENA model-specific ASSYST/difficult-use example:https://www.mercedes-benz-mena.com/iraq/en/services/manuals/gle-suv-2025-03-v167-mbux/assyst-plus-service-interval-display/notes-on-special-service-requirements/
Official fluid resource (no universal fluid claim):https://operatingfluids.mercedes-benz.com/
GBP category accuracy:https://support.google.com/business/answer/7249669?hl=en
Local visibility guidance:https://support.google.com/business/answer/7091?hl=en
Google link-spam policy:https://developers.google.com/search/docs/essentials/spam-policies#link-spam
Further competitor/citation/source URLs and original data locators are kept beside their findings in the research/external/audit reports.
`;
const readableReport=report
  .replace(/(\d+)(January|February|March|April|May|June|July|August|September|October|November|December)/g,'$1 $2')
  .replace(/(January|February|March|April|May|June|July|August|September|October|November|December)(\d{4})/g,'$1 $2')
  .replace(/\b(\d+)(days?|hours?|stages?)\b/g,'$1-$2')
  .replace(/\b(\d+)(clicks|impressions|words|assertions|files|UAE|CLI|pixels|px)\b/g,'$1 $2')
  .replace(/([\d%])(CTR)\b/g,'$1 $2')
  .replace(/,([A-Za-z0-9])/g,', $1')
  .replaceAll('ServiceA','Service A').replaceAll('ServiceB','Service B')
  .replaceAll('0errors','0 errors').replaceAll('11existingwarnings','11 existing warnings')
  .replaceAll('same28days','same 28 days').replaceAll('overlapping unequal','overlapping, unequal')
  .replaceAll('existing entityID','existing entity ID').replaceAll('zero newroute','zero new route')
  .replaceAll('sourceID','source ID').replaceAll('PageNo','Page No');
await fs.writeFile(path.join(out,'COMPLETED-REPORT.txt'),readableReport);
await fs.writeFile(path.join(out,'release-readiness.json'),JSON.stringify({completedAt:new Date().toISOString(),campaignDateDubai:'2026-10-20',base:manifest.base,localImplementationComplete:true,localQaPassed:true,localReview:'GO',productionGo:false,productionRecommendation:'NO-GO until authenticated active origin/edge, recoverable rollback, drift reconciliation and explicit release authorization',sourceFiles:manifest.files.map(x=>x.file),newRoutes:0,affectedLocalePages:4,googleIndexedCanonicalVerified:true,exactQueryOwnershipVerified:true,topThreeVerified:false,committed:false,pushed:false,deployed:false,published:false,externalAccountsChanged:false,customerEnquirySent:false,report:'COMPLETED-REPORT.txt'},null,2));
console.log(JSON.stringify({report:path.join(out,'COMPLETED-REPORT.txt'),localQaPassed:true,productionGo:false,sourceFiles:manifest.files.length,sourceArchive:packages.archive}));
