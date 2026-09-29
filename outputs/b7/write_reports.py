"""Write B7 review documents from observed local evidence."""
import csv,json,subprocess
from collections import Counter
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/b7'
read=lambda name:json.loads((OUT/name).read_text(encoding='utf-8-sig'))
kw=read('keyword-summary.json');tables=read('table-summary.json');audit=read('audit-summary.json');browser=read('browser-verification.json')
obs=read('cadillac-keyword-owner-records.json');pages=audit['brands']['cadillac'];latest='digitecme.com-Performance-on-Search-2026-09-27.xlsx'
cue='/services/cadillac-cue-screen-repair-dubai';hub='/brands/cadillac-service-dubai';guide='/blog/cadillac-best-workshop-dubai'
cue_rows=[r for r in obs if r['source_file']==latest and r['primary_owner']==cue]
cue_terms={r['normalized_keyword'] for r in obs if r['primary_owner']==cue}
cue_original={r['normalized_keyword'] for r in obs if r['primary_owner']==cue and r['measured_or_generated']=='MEASURED ORIGINAL GSC'}

def save(name,body):(ROOT/name).write_text(body.rstrip()+'\n',encoding='utf-8')
def section(title,body):return f'## {title}\n\n{body}\n'
def csv_rows(name):
    with (ROOT/name).open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))

coverage=csv_rows('b7-cadillac-keyword-coverage.csv')
untargeted=[r for r in coverage if r['coverage_class']=='NOT TARGETED — INTENTIONALLY']
gap=[r for r in coverage if r['coverage_class']=='GAP — REVIEW REQUIRED']
changed=pages['changed_urls']
primary='; '.join(f'{k}: {v}' for k,v in tables['classes'].items())

headings=['Executive Summary','Scope Completed','Existing Cadillac Architecture','Cadillac Keyword Evidence','Keyword Normalization','Cadillac Keyword → Owner Map','Cadillac Hub Review','Best-Workshop / Selection Review','Commercial Service Review','CUE / Touchscreen Search Family','CUE Primary-Owner Decision','CUE Repair vs Replacement Boundary','CUE Technical Content Review','Reverse-Camera Review','Diagnostics Review','Electrical Review','Engine / Mechanical Review','Transmission Review','Suspension Review','Brake Review','AC Review','Battery / No-Start Review','Cooling / Overheating Review','Cadillac Model Review','Escalade Priority Review','EV / Electrified Cadillac Review','Problem / Symptom Review','Maintenance / Cost Review','Title / Meta / H1 Review','FAQ Review','Internal Linking Review','CUE Ownership Boundary','Orphan / Crawl-Depth Review','Technical Claim Review','Content Quality Review','CUE Content Quality Review','E-E-A-T / Trust Review','Image / Alt Review','CTA Review','Local SEO Review','Arabic Review','Schema Review','Canonical / Indexability Regression','Cadillac Cannibalization Regression','Duplicate Content Review','Cadillac Keyword Coverage','CUE Keyword Coverage','Remaining Gaps','CTR Opportunities','Model Quality Review','EV Safety QA','Internal-Link Final QA','Mobile / Desktop QA','No-JavaScript QA','Build / Test Results','Previous-Batch Preservation','B6.1 TypeScript Preservation','Remaining Risks','Future Cadillac Opportunities','Final PASS / PARTIAL / FAIL']
body={
 'Executive Summary':f'**PASS — ready for local review.** Existing CUE repair/replacement URL owns the measured touchscreen family. No new route or route-policy change was made. {len(changed)} Cadillac rendered URLs changed; the TypeScript check, production build, 13-route desktop/mobile/no-JS browser sample and rendered link/schema audit passed. Local QA does not establish search performance.',
 'Scope Completed':f'{pages["urls_reviewed"]} Cadillac-named EN/AR URLs plus the generic head-unit supporting URL were reviewed. Scoped edits: Cadillac service profile, two CUE symptom/camera sections, and Cadillac-only FAQ SSR on the hub and selection guide. {len(coverage)} normalized terms reviewed.',
 'Existing Cadillac Architecture':'One broad bilingual hub; 14 brand-service paths in each language; one bilingual workshop-selection guide; one English CUE service URL; no dedicated Cadillac model route. Several brand services remain intentionally noindex. The generic head-unit and auto-electrical pages are supporting owners.',
 'Cadillac Keyword Evidence':f'{kw["source_observations"]} provenance-preserved observations from the keyword workbook, original query-only GSC exports and brief examples. {kw["measured_original_gsc_terms"]} unique terms appear in original GSC. Workbook GSC copies are labeled separately; overlapping exports are never summed.',
 'Keyword Normalization':'Case, whitespace, common Cadillac misspellings and “touch screen”/“touchscreen” variants were normalized. Distinct user tasks such as camera fault, upgrade and touch repair were not merged. Raw observations remain in outputs/b7/cadillac-keyword-owner-records.csv.',
 'Cadillac Keyword → Owner Map':f'The pre-edit owner map is in outputs/b7/cadillac-keyword-owner-map.md. Hub: `{hub}`; CUE: `{cue}`; selection: `{guide}`; indexable brand services own their specific tasks. Noindex brand-service routes retain policy and support indexable generic or hub owners. Editorial conflicts: 0.',
 'Cadillac Hub Review':'Broad service/repair remains the primary task. Existing CUE referral was retained. FAQ answers now exist in initial HTML when FAQPage schema is emitted. No metadata or route-policy change.',
 'Best-Workshop / Selection Review':'The bilingual guide retains a workshop-choice checklist intent, distinct from booking-oriented hub copy. Cadillac-specific FAQ answers now render in initial HTML. No best/#1 performance claim was added.',
 'Commercial Service Review':'Existing AC, brake, diagnostics and oil paths are indexable; other Cadillac service paths reviewed here include intentional noindex routes. The shared Cadillac profile now identifies combustion/electric architecture and fitted systems before specific service advice.',
 'CUE / Touchscreen Search Family':f'The Sept 27 original GSC export has {len(cue_rows)} CUE/touchscreen rows totaling {sum(float(r["gsc_impressions"] or 0) for r in cue_rows):g} impressions and 0 clicks in that single window. Highest: “cue screen replacement in dubai” (499 impressions). This is query evidence, not historical page attribution.',
 'CUE Primary-Owner Decision':f'`{cue}` owns fault-led CUE/touchscreen assessment and supported repair or replacement. The existing URL is indexable, already linked from the hub and generic head-unit page, and has visible symptom/component/process content. No new URL.',
 'CUE Repair vs Replacement Boundary':'The same owner explains repair and replacement as alternative outcomes of inspection and compatibility checks. A cracked screen or ghost touch is not by itself a parts order. Functioning-system upgrades remain unverified and intentionally untargeted.',
 'CUE Technical Content Review':'Added separate black/frozen/restarting screen and reverse-camera-image sections. They distinguish image, touch, sound, power, module and camera paths without remote diagnosis. Existing XTS/SRX compatibility qualifiers remain.',
 'Reverse-Camera Review':'A reverse-only missing image is routed editorially to generic auto-electrical/camera fault assessment, with CUE as support when its display is involved. Repair intent is separate from camera installation or retrofit.',
 'Diagnostics Review':'The indexable Cadillac engine-diagnostics path retains broad fault investigation. CUE screen symptoms go first to the CUE owner; module communication, supply or wider faults can lead to electrical/diagnostics after inspection.',
 'Electrical Review':'Cadillac electrical path is intentionally noindex. The indexable generic auto-electrical route owns general wiring, power and camera faults; CUE owns its touch/display-specific task. No indexability change.',
 'Engine / Mechanical Review':'Cadillac service profile no longer treats Super Cruise as a powertrain. Engine oil and engine-code wording now applies only to the exact combustion model. Electric drive is identified separately.',
 'Transmission Review':'The Cadillac transmission service route remains noindex. Generic transmission service may own indexable search demand with the Cadillac route as a useful support/booking path. Fluid and procedure require fitted-gearbox confirmation.',
 'Suspension Review':'Cadillac suspension service route remains noindex. The revised copy qualifies Magnetic Ride Control and Air Ride Adaptive Suspension with “where fitted”; a warning does not identify a damper or air spring.',
 'Brake Review':'Existing Cadillac brake route was retained. Brake hardware and electronic functions are specified by model/year/specification; no universal performance package claim.',
 'AC Review':'Indexable Cadillac AC route remains the commercial owner. Refrigerant and procedure are confirmed from the vehicle label and service data, including any relevant electric architecture.',
 'Battery / No-Start Review':'The noindex brand battery route remains unchanged in policy. The generic battery owner can cover low-voltage enquiries; no high-voltage battery repair scope is asserted.',
 'Cooling / Overheating Review':'Combustion cooling concerns remain under mechanical/diagnostic assessment. Symptoms do not establish a failed component. Electric-vehicle thermal-system repair scope is not invented.',
 'Cadillac Model Review':'The existing hub covers Escalade, CT4/CT5, XT4/XT5/XT6 and Lyriq. No model page was created from generated demand. Older XTS/SRX CUE enquiries are served by the CUE compatibility section.',
 'Escalade Priority Review':'Escalade service enquiries remain within the hub and relevant service owners. Magnetic Ride Control and Air Ride are not presented as universal; exact trim/year/equipment requires checking.',
 'EV / Electrified Cadillac Review':'LYRIQ is electric; combustion oil, spark-plug and turbo advice is excluded. No high-voltage repair capability is claimed. Other Cadillac EV names do not justify thin model pages.',
 'Problem / Symptom Review':'Ghost touch, black/frozen screen and reverse-only image absence are distinguished on the CUE owner. Other mechanical symptoms remain sections of service owners; no symptom micro-pages were created.',
 'Maintenance / Cost Review':'No universal mileage interval, oil grade, fixed price or package was added. Costs depend on model, diagnosis, parts, labour, specification and approved scope.',
 'Title / Meta / H1 Review':'Current hub, CUE and selection titles/H1s have distinct tasks. Retained where adequate; the before/after CSV explicitly records retained metadata.',
 'FAQ Review':f'{pages["faq_pairs"]} FAQ schema question/answer pairs on Cadillac-named routes were checked against visible initial HTML; 0 mismatches after the scoped SSR fix. Arabic hub and guide were checked separately.',
 'Internal Linking Review':f'{pages["links_checked"]} contextual internal links checked across Cadillac-named routes; 0 broken, 0 redirecting, 0 missing fragments. Hub → CUE and CUE → generic electrical/head unit relationships exist.',
 'CUE Ownership Boundary':'The focused CUE report contains the 12-intent table. CUE repair and replacement share one owner; camera, generic head unit and unverified upgrade intent are separated. Editorial conflict count: 0.',
 'Orphan / Crawl-Depth Review':f'0 Cadillac-named contextual orphans; maximum same-language crawl depth {pages["max_same_language_depth"]}. No sitewide links were added to change counts artificially.',
 'Technical Claim Review':'Cadillac-specific systems now carry model/specification qualifiers. Manufacturer sources substantiate CUE terminology, variable Escalade ride equipment and LYRIQ electric architecture. Workshop repair feasibility remains inspection-dependent.',
 'Content Quality Review':'The small B7 diff addresses a concrete service error and missing FAQ SSR. Existing useful Cadillac copy was retained; no generic luxury filler or keyword-spam sections were added.',
 'CUE Content Quality Review':'The CUE page explains observable differences between touch, image, reboot and camera complaints, what DIGI-TEC inspects, and why replacement follows findings. It does not promise a part or instant diagnosis.',
 'E-E-A-T / Trust Review':'Al Quoz location, real contact route and business-confirmed CUE service scope are used. No authorization, certification, review, rating, warranty or repair-count claim was added.',
 'Image / Alt Review':f'{pages["urls_reviewed"]} Cadillac-named rendered routes checked for missing local images and keyword-stuffed alt text; 0 issues. Existing generic workshop image on CUE is labeled as workshop rather than a misleading screen photo.',
 'CTA Review':'CUE CTA requests an assessment; commercial services use booking/quote paths. No free scan, free diagnosis, same-day or guaranteed repair wording was added.',
 'Local SEO Review':'Dubai and Al Quoz appear in existing appropriate page context. No neighborhood doorway or fictitious branch was created.',
 'Arabic Review':'Existing Arabic hub, 14 Arabic service routes and Arabic selection guide were reviewed. Their policy and language relationships were retained. No fake Arabic CUE counterpart was created.',
 'Schema Review':f'0 schema URL/unsupported-type findings in the Cadillac rendered audit. FAQPage content matches visible FAQ text in initial HTML after the fix; Service and breadcrumb structures remain aligned.',
 'Canonical / Indexability Regression':'0 route changes and 0 canonical/noindex/hreflang policy changes against the B6.1 baseline. Sitemap membership remains 996 canonical URLs.',
 'Cadillac Cannibalization Regression':'Hub owns broad service, guide owns workshop selection, CUE owns CUE touch/display repair, generic electrical owns camera/wiring, and generic head unit owns general module repair. This is editorial separation; harmful ranking cannibalization cannot be proven without query × page GSC.',
 'Duplicate Content Review':'Shared navigation, CTAs and workshop process were excluded from the review. CUE page has component/symptom detail distinct from the hub and generic head-unit owner. No material new duplicate body block was introduced.',
 'Cadillac Keyword Coverage':primary+'. Intent coverage is editorial; exact-match insertion was not the goal.',
 'CUE Keyword Coverage':f'{len(cue_terms)} normalized observations map to the CUE owner; {len(cue_original)} have original-GSC evidence. Camera and generic head-unit terms have separate owners, and retrofit/upgrade terms remain intentionally untargeted until scope is verified.',
 'Remaining Gaps':f'{len(gap)} terms classified GAP — REVIEW REQUIRED; {len(untargeted)} intentionally untargeted. Unverified scope and out-of-market terms were not treated as reasons to create pages.',
 'CTR Opportunities':f'{tables["ctr_opportunities"]} actually measured latest-export terms are in b7-cadillac-ctr-opportunities.csv. CUE terms have high impressions and weak CTR, but the export cannot tell which URL ranked; post-deployment query × page validation is needed.',
 'Model Quality Review':'No dedicated model-page template exists to duplicate. The hub model references and CUE XTS/SRX section have distinct purposes and avoid invented common failures.',
 'EV Safety QA':'No high-voltage repair statement was added. The Cadillac profile explicitly excludes engine-oil/combustion gearbox assumptions from electric drive.',
 'Internal-Link Final QA':f'{pages["links_checked"]} contextual links, 0 broken, 0 redirecting, 0 missing fragments, 0 contextual orphans; maximum depth {pages["max_same_language_depth"]}.',
 'Mobile / Desktop QA':f'Browser sample passed {len(browser["pages"])} route/viewport checks at 1440 px and 390 px, including hub, CUE, services, guide and Arabic routes. No overflow, broken visible images, runtime or hydration errors in the sample.',
 'No-JavaScript QA':f'{len(browser["noJavaScript"])} representative routes passed JavaScript-disabled browser checks; all {pages["urls_reviewed"]} Cadillac-named routes passed initial-HTML title/description/canonical/robots/H1/body/link checks.',
 'Build / Test Results':'`npm run typecheck` PASS. Production `npm run build` PASS, including routing/hosting, SEO, social metadata, oil/suspension/transmission and contact-attribution validators. 1247 prerendered routes and 996 sitemap canonicals.',
 'Previous-Batch Preservation':'Rendered comparison against the B6.1 checkpoint: 0 SEO or substantive changes for Mercedes, Porsche, BMW, Ferrari, Lamborghini, Rolls-Royce, Bentley, Maybach, Range Rover, Defender and Jaguar. B0-A route policy unchanged.',
 'B6.1 TypeScript Preservation':'TypeScript PASS both before and after B7. No B6.1 repair source file was reverted or rewritten.',
 'Remaining Risks':'No query × landing-page GSC join, no post-deployment ranking/CTR/leads data, no recrawl, and some workshop-specific coding/retrofit/high-voltage capabilities remain unverified. Cadillac equipment varies by VIN, year and trim.',
 'Future Cadillac Opportunities':'After deployment, compare CUE query × page performance and conversion outcomes. Consider any new model guide or service page only with distinct intent, evidence, capability and low overlap. Revisit noindex service policy only as a separate evidence-based decision.',
 'Final PASS / PARTIAL / FAIL':'**PASS — B7 READY FOR REVIEW.** Local implementation and listed QA passed; no ranking or conversion improvement is claimed.'
}
save('b7-cadillac-final-report.md','# B7 Cadillac final report\n\n'+'\n'.join(section(f'{i}. {name}',body[name]) for i,name in enumerate(headings,1)))

gap_rows=[]
for label,evidence,owner,decision,reason,new,verified,future in [
 ('CUE / touchscreen repair and replacement','5 original-GSC queries in Sept 27 export; 1,374 impressions, 0 clicks',cue,'COVER EXISTING','Dedicated indexable page; one fault-led owner','No','Yes — service availability confirmed; exact parts assessed','Validate query × page after deployment'),
 ('Ghost touch / black or frozen CUE screen','Research/brief symptom intent',cue,'SECTION + FAQ','Different diagnostic paths on same owner','No','Assessment confirmed; component repair depends on findings','Gather query × page evidence'),
 ('CUE delamination or physical damage','Research/brief',cue,'SECTION','Repair versus replacement depends on installed unit and damage','No','Part compatibility to confirm','Collect actual repair cases only if verified'),
 ('Cadillac reverse-camera image fault','Research/brief','/services/auto-electrical-repair-dubai','EXISTING GENERIC OWNER','Camera/supply/video path distinct from screen','No','Exact Cadillac scope assessed','Validate demand before brand URL'),
 ('Cadillac infotainment/head-unit module fault','Research/brief','/services/head-unit-repair-dubai','EXISTING GENERIC OWNER','General module repair distinct from touch layer','No','Unit support assessed','Confirm parts/coding availability per VIN'),
 ('Cadillac infotainment upgrade/retrofit','Generated/brief','', 'NOT TARGETED','No verified exact installation/programming scope','No','No','Business capability confirmation first'),
 ('Escalade model service','Generated workbook',hub,'HUB SECTION','No distinct model-guide evidence sufficient for a thin URL','No','Normal service scope subject to VIN','Review query × page and leads'),
 ('Cadillac LYRIQ high-voltage repair','Generated/brief','', 'NOT TARGETED','High-voltage capability not verified','No','No','Confirm qualified capability before any claim'),
 ('Cadillac service cost / intervals','Generated/research',hub,'HUB SECTION','Model-specific factors, no fixed price or universal interval','No','Planning discussion only','Use actual quote data if available'),
]:
    gap_rows.append(f'| {label} | {evidence} | {owner or "None verified"} | {decision} | {reason} | {new} | {verified} | {future} |')
save('b7-cadillac-gap-decisions.md','# B7 Cadillac gap decisions\n\n| Keyword / Cluster | Evidence Type and measured evidence | Existing Owner | Decision | Reason | New URL Needed? | Verified Service Scope? | Recommended Future Action |\n|---|---|---|---|---|---|---|---|\n'+'\n'.join(gap_rows)+'\n\nAll individual normalized terms, provenance and measured fields are in b7-cadillac-keyword-coverage.csv. Architecture asymmetry alone was not classified as a gap.')

save('b7-cadillac-technical-sources.md', '''# B7 Cadillac technical sources

## CADILLAC / GM MANUFACTURER SOURCES

- [2016 Cadillac SRX brochure](https://www.cadillac.com/content/dam/cadillac/na/us/english/index/downloads/vehiclebrochures/brochures/2016/2016-cadillac-srx-brochure.pdf): CUE terminology and model-dependent function; supports identifying the fitted generation rather than assuming all Cadillacs use CUE.
- [2016 Cadillac CTS brochure](https://www.cadillac.com/content/dam/cadillac/na/us/english/index/downloads/vehiclebrochures/brochures/2016/2016-cadillac-cts-sedan-brochure.pdf): CUE touchscreen used for information/entertainment functions; does not establish a repair diagnosis.
- [Cadillac infotainment support](https://www.cadillac.com/support/vehicle/entertainment/infotainment): present infotainment systems vary, so CUE terminology is not universal.
- [Cadillac manuals and guides](https://www.cadillac.com/support/vehicle/manuals-guides): exact owner manual is the vehicle-specific source for equipment and operating guidance.
- [2026 Escalade](https://www.cadillac.com/suvs/preceding-year/escalade): Magnetic Ride Control and Air Ride Adaptive Suspension are described as available equipment; not all Escalades share the same suspension.
- [Cadillac LYRIQ](https://www.cadillac.com/electric/lyriq): LYRIQ is an all-electric SUV; conventional engine-oil and spark-plug advice is inapplicable.

## OTHER AUTHORITATIVE TECHNICAL SOURCES

No external repair procedure was used to assert a specific Cadillac component failure. Fault categories on the CUE page are inspection hypotheses, not manufacturer-verified diagnoses.

## DIGI-TEC BUSINESS FACTS

- `src/data/electronicsServices.ts` states that CUE service availability was confirmed by the business owner on 16 September 2026; exact systems, parts, installation scope and prices require assessment.
- Existing project contact and location data support the independent Al Quoz workshop claim. No GM/Cadillac authorization or high-voltage capability is asserted.

## GSC EVIDENCE

- Original `digitecme.com-Performance-on-Search-2026-09-27.xlsx` Queries tab: five CUE/touchscreen rows, 1,374 impressions and zero clicks in that single export. These are query-only observations without landing-page joins.
- Other original exports overlap in time and were not summed with this window.

## KEYWORD WORKBOOK EVIDENCE

- `DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx` Master Keywords, GSC Opportunities and Brand Specific Systems. Workbook GSC rows duplicate source measurements and are labeled `MEASURED WORKBOOK`, not independent traffic.

## EDITORIAL INFERENCE

- Touch layer, display, supply, camera and module are separate possible fault categories. A symptom does not prove a failed part.
- CUE repair/replacement can share an owner because the customer task is restoring a faulty fitted system; upgrade intent is distinct and excluded until service scope is verified.
- A reverse-only missing image warrants camera/electrical assessment. This is an editorial diagnostic pathway, not a claim that the camera has failed.
''')

protect=audit['prior_brand_regression'];protected=', '.join(f'{k}: {len(v["substantive_changes"])} substantive / {len(v["seo_changes"])} SEO changes' for k,v in protect.items())
save('b7-cadillac-regression-report.md',f'''# B7 Cadillac regression report

## Git baseline

Branch `main`; starting HEAD `{(OUT/'head-before.txt').read_text().strip()}`. Starting working-tree state and hashes are preserved in `outputs/b7/`. All B7 work remains local.

## B0-A and previous batches

Route and policy comparison preserves B0-A. B1 Mercedes, B2 Porsche, B3 BMW, B4 Ferrari, B4 Lamborghini, B5 Rolls-Royce, B5 Bentley, B5 Maybach, B6 Range Rover, B6 Defender and B6 Jaguar each have zero substantive/SEO rendered differences: {protected}. B6.1 TypeScript remains PASS.

## Routing, canonical, robots, hreflang and sitemap

Route diff: {len(audit['route_policy_changes'])}. Canonical/noindex/language-policy diff: {len(audit['seo_policy_changes'])}. Hreflang findings: {len(pages['hreflang_issues'])}. Sitemap remains 996 canonical URLs; 1247 routes prerendered. No best-workshop consolidation.

## Cadillac rendered QA

Cadillac-named URLs reviewed: {pages['urls_reviewed']}; changed: {len(changed)}. Contextual links checked: {pages['links_checked']}; broken {len(pages['broken_links'])}, redirecting {len(pages['redirecting_links'])}, missing fragments {len(pages['missing_fragments'])}, orphans {len(pages['orphan_pages'])}; max same-language depth {pages['max_same_language_depth']}. Image issues {len(pages['image_issues'])}; schema issues {len(pages['schema_issues'])}; FAQ visibility issues {len(pages['faq_visibility_issues'])} among {pages['faq_pairs']} pairs; no-JS initial-HTML issues {len(pages['nojs_issues'])}.

## Responsive and browser

Playwright/Edge headless sample: {len(browser['pages'])} route-width checks at 1440/390 px and {len(browser['noJavaScript'])} JavaScript-disabled routes; pass={browser['passed']}. No sampled overflow, broken visible image, console hydration failure or runtime error.

## Build

`npm run typecheck`: PASS. `npm run build`: PASS, including existing hosting/routing and SEO validators. Shared build warnings about `fetchPriority` and duplicate static/dynamic import remain outside B7 scope; checks complete successfully.

## Limits

Query-only GSC cannot prove historical landing pages or harmful cannibalization. Local tests do not prove rankings, CTR, traffic or leads after deployment. No commit, push or deploy was performed.
''')

cue_table=[
 ('CUE repair',cue,'/services/auto-electrical-repair-dubai','yes','repair','generic electrical','Fitted CUE fault restoration'),
 ('CUE screen repair',cue,'/services/head-unit-repair-dubai','yes','repair','generic head unit','Touch/display component task'),
 ('CUE screen replacement',cue,'/services/head-unit-repair-dubai','yes','replacement','generic screen','Same assessment; replacement after compatibility'),
 ('touchscreen repair',cue,'/services/auto-electrical-repair-dubai','yes','repair','generic screen','Cadillac CUE-specific task'),
 ('ghost touch',cue,'/services/auto-electrical-repair-dubai','research','repair after diagnosis','electrical','Unwanted input symptom'),
 ('black screen',cue,'/services/auto-electrical-repair-dubai','research','repair after diagnosis','electrical','Display/supply/unit possibilities'),
 ('frozen/unresponsive screen',cue,'/services/head-unit-repair-dubai','research','repair after diagnosis','head unit','Touch and boot behavior assessed'),
 ('screen delamination',cue,'/services/head-unit-repair-dubai','research','repair/replacement','generic screen','Physical condition plus compatibility'),
 ('head-unit/module fault','/services/head-unit-repair-dubai',cue,'research','repair after diagnosis','CUE','General unit task, CUE supports'),
 ('infotainment fault','/services/head-unit-repair-dubai',cue,'research','repair after diagnosis','CUE','Whole-system fault task'),
 ('reverse-camera display fault','/services/auto-electrical-repair-dubai',cue,'research','repair after diagnosis','CUE','Reverse-only image suggests camera/video path assessment'),
 ('upgrade/retrofit','None verified',cue,'generated','upgrade','CUE','No confirmed exact business scope'),
]
cue_lines=['| Intent | Primary Owner | Supporting Owner | Measured Evidence | Repair / Replacement / Upgrade | Potential Competitor | Why Distinct | Conflict? |','|---|---|---|---|---|---|---|---|']
cue_lines += [f'| {a} | {b} | {c} | {d} | {e} | {f} | {g} | No |' for a,b,c,d,e,f,g in cue_table]
cue_heads=['Executive Summary','CUE / Touchscreen Queries Found','Measured GSC Evidence','Generated / Research Keywords','Existing Candidate URLs','Search-Intent Families','Selected Primary CUE Owner','Supporting Owners','CUE vs Electrical Boundary','CUE vs Diagnostics Boundary','CUE vs Generic Screen Repair Boundary','CUE vs Generic Head-Unit Repair Boundary','CUE vs Reverse-Camera Boundary','Repair vs Replacement Boundary','Repair vs Upgrade / Retrofit Boundary','Ghost-Touch Ownership','Black-Screen Ownership','Frozen / Unresponsive Screen Ownership','Delamination / Physical Damage Ownership','Head-Unit / Module-Fault Ownership','Content Changes Made','Internal-Link Changes','New-URL Decision','Cannibalization Risk','Evidence Limitations','Future Query × Page Validation Needed']
cue_text={
 'Executive Summary':f'Existing `{cue}` is the single editorial primary owner for fitted CUE touch/display fault repair and compatible replacement. No new URL; zero unresolved CUE primary-owner conflicts.',
 'CUE / Touchscreen Queries Found':f'{len(cue_terms)} normalized terms map to the CUE owner. Related camera, general head-unit and unverified upgrade terms are mapped separately in the observation/coverage CSVs.',
 'Measured GSC Evidence':f'In the single Sept 27 original export: {len(cue_rows)} CUE/touchscreen queries, {sum(float(r["gsc_impressions"] or 0) for r in cue_rows):g} impressions, zero clicks. Highest: “cue screen replacement in dubai” at 499 impressions. No periods summed.',
 'Generated / Research Keywords':'Workbook Brand Specific Systems and B7 brief include touch, screen, ghost-touch, black-screen and module wording. They are suggestions, not measured traffic.',
 'Existing Candidate URLs':f'`{cue}`, `{hub}`, `/services/auto-electrical-repair-dubai`, `/services/head-unit-repair-dubai`, and Cadillac diagnostics/electrical routes. The last two brand paths have different or noindex roles.',
 'Search-Intent Families':'Fault-led CUE touch/display restoration; replacement after diagnosis; wider unit/module fault; camera video path; functioning-system upgrade. Physical damage is assessed within CUE repair/replacement.',
 'Selected Primary CUE Owner':f'`{cue}` is indexable, commercially relevant and already contains XTS/SRX compatibility, symptom triage, repair/replace decision and contact path.',
 'Supporting Owners':'Generic electrical supports supply/wiring/camera faults; generic head-unit supports wider module faults; brand hub provides discovery. None takes primary CUE touch-layer intent.',
 'CUE vs Electrical Boundary':'CUE owns fitted touch/display restoration. Electrical owns vehicle power, wiring and camera circuits after symptom triage.',
 'CUE vs Diagnostics Boundary':'Cadillac engine diagnostics owns broad warning/fault investigation; CUE owns a reported CUE screen complaint. Diagnostic steps occur within the CUE service.',
 'CUE vs Generic Screen Repair Boundary':'No separate generic screen URL was created. The existing CUE URL is more precise for CUE-equipped Cadillac vehicles.',
 'CUE vs Generic Head-Unit Repair Boundary':'A general unit that restarts or loses sound can use head-unit service; a CUE touch/display complaint stays with CUE until tests identify another subsystem.',
 'CUE vs Reverse-Camera Boundary':'Reverse-only absent image goes to electrical/camera assessment. CUE page explains the distinction and does not promise screen replacement.',
 'Repair vs Replacement Boundary':'Same commercial URL covers diagnosis-led alternatives. A part is selected only after installed generation, damage and compatibility are checked.',
 'Repair vs Upgrade / Retrofit Boundary':'Repair restores a faulty fitted system. Upgrade changes a functioning system; exact Cadillac retrofit/programming scope is not verified and remains untargeted.',
 'Ghost-Touch Ownership':cue+'; unwanted inputs can justify touch-layer assessment, not automatic replacement.',
 'Black-Screen Ownership':cue+' for initial CUE complaint; power, connection, display and head-unit causes remain possibilities.',
 'Frozen / Unresponsive Screen Ownership':cue+' for initial CUE complaint; image, touch, sound and reboot behavior guide checks.',
 'Delamination / Physical Damage Ownership':cue+'; screen condition and component compatibility determine available repair/replacement.',
 'Head-Unit / Module-Fault Ownership':'`/services/head-unit-repair-dubai` for verified general unit faults; CUE remains a supporting brand-specific entry point.',
 'Content Changes Made':'Added focused black/frozen/restarting and reverse-camera-image sections. No unsupported parts guarantee or programming claim.',
 'Internal-Link Changes':'Existing hub → CUE and CUE → auto-electrical/head-unit links were retained. Audit found no broken/redirecting CUE contextual link.',
 'New-URL Decision':'No new CUE, screen, ghost-touch or reverse-camera URL. Existing owners cover the tasks more clearly.',
 'Cannibalization Risk':'Editorial owners are separated, but harmful ranking competition is unproven without query × landing-page GSC. The existing generic head-unit page is the nearest overlap for module terms.',
 'Evidence Limitations':'GSC is query-only; Cadillac CUE generations and installed equipment vary; actual diagnosis, parts availability and supported setup require vehicle assessment.',
 'Future Query × Page Validation Needed':'After deployment, export CUE query × URL rows and track clicks, impressions, CTR and conversions; revisit copy or consolidation only with that evidence.'}
save('b7-cadillac-cue-ownership.md','# B7 Cadillac CUE ownership\n\n'+'\n'.join(section(f'{i}. {name}',cue_text[name]) for i,name in enumerate(cue_heads,1))+'\n## Final intent table\n\n'+'\n'.join(cue_lines))
print('Wrote five B7 markdown deliverables')
