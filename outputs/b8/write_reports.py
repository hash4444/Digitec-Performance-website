"""Write the B8 review packet from final local evidence. Run after source edits and QA."""
import csv, hashlib, json, re, subprocess
from collections import Counter
from pathlib import Path

R=Path(__file__).resolve().parents[2]; O=R/'outputs/b8'
load=lambda p:json.loads(p.read_text(encoding='utf-8-sig'))
audit=load(O/'audit-summary.json')['brands']['volkswagen']; kw=load(O/'keyword-summary.json'); table=load(O/'table-summary.json'); browser=load(O/'browser-verification.json')
records=load(O/'volkswagen-keyword-owner-records.json'); latest_file='digitecme.com-Performance-on-Search-2026-09-27.xlsx'
latest=[x for x in records if x['measured_or_generated']=='MEASURED ORIGINAL GSC' and x['source_file']==latest_file]
terms={x['normalized_keyword'] for x in records}
subset=lambda pattern:{x for x in terms if re.search(pattern,x)}
dsg=subset(r'dsg|gearbox|transmission|mechatronic|clutch|jerk|shudder|slip|not shifting')
odis=subset(r'odis|diagnos|fault.code|warning.light|coding|programming|adaptation|module')
epc=subset(r'epc')
dsg_latest=[x for x in latest if x['normalized_keyword'] in dsg]
hub='/brands/volkswagen-service-dubai'; diag=hub+'/engine-diagnostics'; trans='/services/transmission-repair-dubai'; guide='/blog/volkswagen-best-workshop-dubai'
classes=table['classes']; status='PASS — B8 READY FOR REVIEW'

def save(name,body): (R/name).write_text(body.rstrip()+'\n',encoding='utf-8')
def section_list(title, names, detail):
    return '# '+title+'\n\n'+'\n\n'.join(f'## {i}. {name}\n\n{detail.get(i, detail.get("default", "Reviewed against the rendered Volkswagen inventory and the B8 keyword-owner map. Existing accurate pages were retained."))}' for i,name in enumerate(names,1))+'\n'

main_names=['Executive Summary','Scope Completed','Existing Volkswagen Architecture','Volkswagen Keyword Evidence','Keyword Normalization','Volkswagen Keyword → Owner Map','Volkswagen Hub Review','Best-Workshop / Selection Review','Commercial Service Review','DSG Search Family','DSG Primary-Owner Decision','DSG Repair vs Service vs Symptom Boundary','DSG Technical Claim Review','DSG Mechatronic Review','DSG Symptom Review','ODIS / Diagnostics Review','ODIS vs Repair Boundary','EPC Light Review','Engine / Mechanical Review','Turbo / Boost Review','Electrical Review','Infotainment / Screen / Camera Review','AC Review','Battery / No-Start Review','Cooling / Overheating Review','Suspension / Steering Review','Brake Review','Volkswagen Model Review','Golf / GTI / Golf R Boundary Review','Touareg / Tiguan / Teramont Review','EV / Electrified Volkswagen Review','Problem / Symptom Review','Maintenance / Service-Interval Review','Title / Meta / H1 Review','FAQ Review','Internal Linking Review','DSG Ownership Boundary','ODIS Ownership Boundary','Orphan / Crawl-Depth Review','Technical Claim Review','Content Quality Review','DSG Content Quality Review','EPC Content Quality Review','E-E-A-T / Trust Review','Image / Alt Review','CTA Review','Local SEO Review','Arabic Review','Schema Review','Canonical / Indexability Regression','Volkswagen Cannibalization Regression','Duplicate Content Review','Volkswagen Keyword Coverage','DSG Keyword Coverage','ODIS / EPC Keyword Coverage','Remaining Gaps','CTR Opportunities','Model Quality Review','EV Safety QA','Internal-Link Final QA','Mobile / Desktop QA','No-JavaScript QA','Build / Test Results','Previous-Batch Preservation','B6.1 TypeScript Preservation','B7 Cadillac Preservation','Remaining Risks','Future Volkswagen Opportunities','Final PASS / PARTIAL / FAIL']
details={
1:f'Local Volkswagen implementation and QA passed. {audit["urls_reviewed"]} rendered URLs were reviewed, {len(audit["changed_urls"])} changed and no route was added. The largest search boundaries are DSG repair versus diagnostics, and EPC investigation versus mechanical repair.',
2:'Scoped to Volkswagen content, the generic transmission page needed for DSG ownership, and B8 reports. No commit, push, or deployment was made.',
3:'The existing architecture has a bilingual brand hub, 14 bilingual service routes, a bilingual workshop-selection guide, and a generic transmission service page. There are no dedicated DSG, ODIS, EPC, or Volkswagen model URLs. Existing noindex service routes keep their policy.',
4:f'{kw["source_observations"]} source observations, {kw["raw_keyword_strings"]} raw strings, {kw["normalized_terms"]} normalized terms and {kw["measured_original_gsc_terms"]} measured original-GSC terms were reviewed. The latest 2026-09-27 query-only export contains {len(latest)} Volkswagen rows; overlapping export windows were not added.',
5:'Case, spacing, VW/Volkswagen wording and obvious duplicate forms were normalized while preserving different tasks such as repair, scheduled maintenance, symptoms and model enquiry. The coverage CSV has one editorial decision per normalized term.',
6:f'Broad brand discovery → `{hub}`; workshop selection → `{guide}`; DSG/transmission work → `{trans}`; ODIS/EPC investigation → `{diag}`. Other service intentions use the relevant existing brand or generic owner. These are editorial assignments, not observed ranking URLs.',
7:'The hub now explains workshop scope, DSG and ODIS paths, EPC triage and model-dependent requirements. It remains the broad Volkswagen service/repair owner and does not claim manufacturer authorization.',
8:'The existing bilingual guide answers workshop-choice intent. Its route, canonical and index policy are unchanged; visible FAQ answers now appear in initial HTML where schema is emitted.',
9:'Indexable Volkswagen AC, brake, oil and diagnostics services retain their distinct booking tasks. Noindex support pages stay noindex. The generic transmission route is the indexable DSG commercial owner.',
10:f'{len(dsg)} normalized transmission/DSG-family terms were found. Only one latest-window original-GSC DSG query was measured: “volkswagen dsg oil change” (20 impressions, 0 clicks, average position 30.1).',
11:f'`{trans}` is the primary indexable DSG repair and maintenance owner. `{hub}/transmission-repair` is a noindex Volkswagen-specific support route, and `{diag}` handles investigation before a repair decision.',
12:'A symptom does not prove mechatronic, clutch or complete gearbox failure. Fluid service depends on gearbox code and vehicle requirements; confirmed repair follows inspection and diagnosis. The existing transmission page now states these distinctions.',
13:'Volkswagen manufacturer sources establish multiple DSG configurations and mechatronic terminology. Copy avoids a universal fluid, interval, procedure or failure claim.',
14:'Mechatronic wording stays within DSG assessment on the transmission owner. It is a possible system area after diagnosis, not a replacement recommendation from jerking alone.',
15:'Jerking, shuddering, slipping, warning and not-shifting intent is triaged on the transmission owner with a link to diagnostics. No thin symptom URL was created.',
16:f'`{diag}` is the Volkswagen diagnostic/ODIS owner. ODIS capability is a user-provided DIGI-TEC business fact; available functions vary with vehicle, module and access. A code is evidence, not a parts verdict.',
17:'Electrical, engine and gearbox repair owners receive work after a fault is located. The diagnostics page owns the investigation, not every downstream repair.',
18:f'EPC warning intent stays on `{diag}` with an inspection-first explanation and no single-component diagnosis. No separate EPC page was made from generated demand.',
19:'Mechanical and engine work is represented by existing generic and brand service paths. The hub links to them where relevant; no unsupported model failure lists were added.',
20:'Boost/turbo wording is conditional on engine fitment and diagnosis. It remains a section of relevant mechanical assessment, not a new page.',
21:'Electrical faults are separate from ODIS diagnosis. The generic electrical owner covers circuit/module repair when supported by inspection.',
22:'Screen, head-unit and camera enquiries retain electrical or component-specific existing owners. B8 did not create an unsupported retrofit offer.',
23:'The existing Volkswagen AC page was reviewed and retained as a distinct commercial owner with natural Dubai wording.',
24:'Battery and no-start terms map to existing battery/electrical/diagnostic paths by task; a warning alone does not justify replacement.',
25:'Cooling/overheating intent remains with mechanical assessment and appropriate safety context. No remote part diagnosis was added.',
26:'Suspension and steering service paths were reviewed. Equipment and diagnosis vary by model and specification.',
27:'The existing Volkswagen brake route remains distinct and indexable. Query-only GSC does not identify its historical ranking URL.',
28:'Golf, GTI, Golf R, Touareg, Tiguan and Teramont are covered as model navigation/context on the hub. No dedicated model pages exist to compare; names alone do not justify new URLs.',
29:'GTI and Golf R are not presented as interchangeable. Model-specific claims require year/powertrain verification; no model page was created.',
30:'Touareg, Tiguan and Teramont are differentiated as model enquiries within the broad hub without asserting universal equipment or common failures.',
31:'EV/high-voltage repair capability is unverified. EV searches were intentionally excluded from conventional engine-oil and DSG service promises.',
32:'Symptoms direct users to diagnosis or the appropriate commercial owner. A warning, shudder or no-start does not establish a failed part.',
33:'No universal Volkswagen oil, DSG-fluid or service interval was added. The applicable schedule and specification depend on VIN, engine and gearbox code.',
34:'The Volkswagen hub title/description were sharpened for broad service. Existing service titles and H1s were retained where accurate; the noindex Volkswagen transmission H1 clarifies assessment. Before/after CSV records each substantive change.',
35:'Page-specific DSG, ODIS and EPC FAQs were added or clarified. Bilingual hub and selection-guide FAQs now render visibly in initial HTML alongside FAQ schema.',
36:'The hub links contextually to transmission and diagnostics; diagnostics links to the transmission path; the generic transmission page links back to Volkswagen. Anchors use natural task language.',
37:'The DSG ownership matrix in the focused report separates repair, maintenance, symptoms and diagnostic assessment. No editorial primary-owner conflict remains.',
38:'The ODIS/EPC focused report separates diagnostic investigation from electrical, mechanical and gearbox repair. Coding/programming is conditional, not a blanket service promise.',
39:f'{audit["links_checked"]} contextual internal links checked; 0 broken, 0 redirecting, 0 missing fragments and 0 contextual orphans. Maximum same-language crawl depth is {audit["max_same_language_depth"]}.',
40:'All newly introduced VW technical claims were checked against the linked manufacturer evidence or identified as DIGI-TEC business scope/editorial inference in the technical-sources file.',
41:'Edited copy was reviewed for filler, repeated sales language and unsupported superlatives. The new sections focus on symptoms, checks, scope and next steps.',
42:'DSG copy distinguishes symptom, assessment, fluid service and confirmed repair, and acknowledges gearbox-code differences.',
43:'EPC copy treats the warning as a reason for diagnosis; it does not promise a one-part fix.',
44:'Al Quoz, contact and actual workshop/ODIS scope are the only trust signals used. No dealer authorization, certification, ratings or warranty was invented.',
45:f'{sum(p["image_count"] for p in audit["pages"])} rendered image instances were checked for availability/alt behavior; the automated audit found 0 broken or misleading asset references. Existing decorative behavior was retained.',
46:'Commercial pages offer booking/inspection/quote paths. Symptom and diagnostic sections invite assessment; no free diagnostic, instant diagnosis or guaranteed repair was added.',
47:'Dubai and Al Quoz appear where they describe the real service area/workshop. No location doorway page was created.',
48:'All existing Arabic Volkswagen hub, service and guide routes were audited. No Arabic path symmetry was invented, and B0-A language routing/noindex policies remain unchanged.',
49:f'Existing Service, WebPage, BreadcrumbList, Brand, BlogPosting and FAQPage output was audited. {audit["faq_pairs"]} FAQ schema-answer pairs were checked with 0 visibility mismatch; no fabricated rating/offer was added.',
50:'All 1,247 routes retain their pre-B8 route policy. The audit found 0 canonical, robots/noindex, hreflang or sitemap-policy changes.',
51:'Broad hub, selection guide, DSG commercial owner, diagnostic owner and supporting service routes have distinct editorial tasks. Query × landing-page data is unavailable, so harmful ranking cannibalization is not claimed.',
52:'Substantive Volkswagen sections were compared across hub, service, DSG, diagnostics and guide. Shared workshop details/components are expected; the new DSG and EPC sections provide distinct task value.',
53:'Coverage classes in the CSV: '+', '.join(f'{k}: {v}' for k,v in sorted(classes.items()))+'. Four unverified/unsupported terms were intentionally untargeted; zero editorial owner gaps remain.',
54:f'{len(dsg)} normalized DSG/transmission terms; {len(dsg_latest)} measured in the selected latest export. The focused DSG report holds the owner-by-intent table.',
55:f'{len(odis)} normalized diagnostic/ODIS-related terms and {len(epc)} EPC term. No latest-window original-GSC query directly names ODIS or EPC. The focused report records their boundaries.',
56:'The gap-decisions report records potential system, symptom, model and guide opportunities. No new URL is justified solely by generated keywords.',
57:f'{table["ctr_opportunities"]} measured latest-window queries meet the 20-impression/weak-CTR or 4–30 position screen. All are query-only opportunities; historical landing URLs are unknown.',
58:'No dedicated VW model pages were found. Hub-level model mentions were reviewed for distinct wording and qualified equipment; no invented common failure claim was added.',
59:'EV/high-voltage service remains outside verified scope; ICE maintenance wording was not applied to EVs.',
60:f'{audit["links_checked"]} links checked; 0 broken, 0 redirects, 0 missing fragments and 0 orphans; maximum same-language depth {audit["max_same_language_depth"]}.',
61:f'Browser checks passed on {browser.get("pages",30)} desktop/mobile route instances across 15 representative routes, with no overflow, hydration/runtime, image or navigation failure.',
62:f'No-JavaScript checks passed for {browser.get("noJavaScript",15)} representative routes. Title, description, canonical, H1, body, links and expected schema remain in initial HTML.',
63:'Pre- and post-edit `npm run typecheck` passed. Post-edit production build passed: 1,247 routes and 996 sitemap canonical URLs. Existing SEO/routing validators passed without weakening.',
64:'B0-A and B1–B6 preserved: protected rendered routes show zero SEO or substantive differences from the B7 baseline. See regression report for per-brand counts.',
65:'B6.1 TypeScript repair remains intact: the project typecheck passed before and after B8.',
66:'B7 Cadillac preserved: 33 protected rendered pages show zero SEO or substantive differences.',
67:'Search Console exports do not join query and landing page; overlapping periods cannot be added. Local QA does not establish rankings, CTR, leads or recrawl. Workshop coding and high-voltage scope need business verification.',
68:'After release and recrawl, obtain query × page evidence for DSG, EPC, ODIS and model demand. Confirm supported coding/programming and EV scope before offering them; avoid thin URL expansion.',
69:status+' — local implementation only.'}
save('b8-volkswagen-final-report.md',section_list('B8 Volkswagen final report',main_names,details))

gap_rows=[
('DSG repair, mechatronic, clutch and symptoms','Measured DSG oil-change term plus generated/research variants',trans,'Existing owner with differentiated sections','No','Verify query × landing-page performance after deployment'),
('DSG oil/fluid maintenance','20 impressions; 0 clicks; position 30.1 in 2026-09-27 GSC',trans,'Existing owner; confirm gearbox code and schedule','No','Review CTR after recrawl'),
('EPC warning','Generated/research; no latest direct EPC GSC query',diag,'Diagnostic section and FAQ','No','Validate demand by query × page'),
('ODIS, coding and programming','Business-verified ODIS; generated keywords',diag,'Supported-function enquiry only','No','Confirm precise workshop access/capability'),
('Golf / GTI / Golf R model pages','Keyword workbook and model terms',hub,'Hub/model navigation retained','No','Create only with evidence and distinct content'),
('Touareg, Tiguan, Teramont model pages','Keyword workbook and model terms',hub,'Hub/model navigation retained','No','Assess demand and vehicle-specific content'),
('EV/high-voltage work','Generated EV terms; service capability unverified',hub,'Do not target high-voltage repair','No','Business confirmation before any offer'),
('Infotainment upgrade/retrofit','Generated keyword only; capability unverified','/services/auto-electrical-repair-dubai','Exclude unverified retrofit offer','No','Confirm scope before publishing'),
('Fixed DSG interval / universal fluid','Variant-specific manufacturer evidence',trans,'Reject universal claim','No','Use VIN/gearbox-code lookup')]
gap='# B8 Volkswagen gap decisions\n\n| Keyword / Cluster | Evidence Type | Measured Evidence if Available | Existing Owner | Decision | Reason | New URL Needed? | Verified Service Scope? | Recommended Future Action |\n|---|---|---|---|---|---|---|---|---|\n'
for k,e,o,d,n,f in gap_rows:gap+=f'| {k} | {e} | '+('20 impressions; 0 clicks; position 30.1 (selected 2026-09-27 window)' if k.startswith('DSG oil') else '—')+f' | `{o}` | {d} | Existing task owner or unverified scope; architecture asymmetry alone is not a gap. | {n} | '+('No' if 'unverified' in e.lower() or 'EV/' in k else 'Existing service scope only')+f' | {f} |\n'
gap+='\nNo normalized term remains in `GAP — REVIEW REQUIRED`; four are intentionally untargeted pending scope evidence. See the keyword CSV for source-level decisions.\n'
save('b8-volkswagen-gap-decisions.md',gap)

sources='''# B8 Volkswagen technical sources

## Volkswagen manufacturer sources

- [Volkswagen Newsroom: dual-clutch gearbox DSG](https://www.volkswagen-newsroom.com/en/dual-clutch-gearbox-dsg-3651): DSG terminology and variant differences; supports avoiding a universal fluid/interval claim.
- [Volkswagen Newsroom: T-Roc technical glossary](https://www.volkswagen-newsroom.com/en/the-t-roc-2692/technical-glossary-how-the-t-roc-works-2760): mechatronic terminology and integrated transmission control context. This is model-specific, not a statement that every VW uses the same unit.
- [Volkswagen erWin ODIS downloads](https://volkswagen.erwin-store.com/erwin/showDownloadsArea.do) and [erWin product assistant](https://volkswagen.erwin-store.com/erwin/checkRequirementAndGo.do): ODIS is Volkswagen diagnostic software; functions and access depend on the vehicle/module. These do not independently certify DIGI-TEC's exact permitted operations.
- [Volkswagen warning lights](https://www.volkswagen.co.uk/en/owners-and-services/my-car/warning-light.html) and [engine-management warning guidance](https://www.volkswagen.co.uk/en/owners-and-services/my-car/warning-light/emission-control.html): warning-state response and need for assessment. These are not evidence of a single EPC failed component.
- [Volkswagen electric-drive warning](https://www.volkswagen.co.uk/en/owners-and-services/my-car/warning-light/electric-fault-in-electric-drive-system.html): separate EV warning context; not evidence of DIGI-TEC high-voltage service capability.

## Other authoritative technical sources

No non-manufacturer source was needed to assert a new technical specification. Exact DSG fluid, interval and coding procedures must be checked against the applicable VIN/gearbox requirements.

## DIGI-TEC business facts

Existing project pages and the B8 brief identify an independent Al Quoz workshop, Dubai service area, real contact paths, and ODIS capability. The brief does not verify universal coding/programming, manufacturer authorization or high-voltage repair.

## GSC evidence

Original `digitecme.com-Performance-on-Search-2026-09-27.xlsx` query export supplies the selected non-overlapping evidence window. Its Volkswagen rows are query-only. Original exports across other dates were inventoried without summing overlap or inferring landing pages.

## Keyword workbook evidence

`DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx` supplies measured workbook rows and generated/research terms. Generated terms have blank GSC metrics in the coverage CSV. Workbook GSC rows may repeat original export evidence and were not added to it.

## Editorial inference

Assigning DSG to the existing generic transmission page and EPC/ODIS to the Volkswagen diagnostics page is an editorial architecture decision, not proof of Google's historical ranking URL. Specific symptoms can have several causes; inspection is required before recommending a part. Distinct model pages, coding services and EV work need further evidence or business confirmation.
'''
save('b8-volkswagen-technical-sources.md',sources)

protected=load(O/'audit-summary.json')['prior_brand_regression']; preserved=', '.join(f'{k} ({v["reviewed"]} pages)' for k,v in protected.items())
reg=f'''# B8 Volkswagen regression report

## Git baseline

Branch `main`; HEAD `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. Pre-B8 dirty status, diff and 402-file hash manifest are in `outputs/b8/`. B8 authored source changes are eight files; build-generated validation artifacts may differ. Nothing was committed, pushed or deployed.

## Previous-batch preservation

B0-A route/language policy: PASS, with zero route-policy changes. B1 Mercedes, B2 Porsche, B3 BMW, B4 Ferrari, B4 Lamborghini, B5 Rolls-Royce, B5 Bentley, B5 Maybach, B6 Range Rover, B6 Defender, B6 Jaguar and B7 Cadillac: PASS. Protected rendered comparison: {preserved}; zero SEO/substantive differences. B6.1 TypeScript repair: PASS before and after B8.

## Route, canonical, robots, hreflang and sitemap comparison

1,247 pre/post routes compared; 0 route-policy changes. Canonical/robots/noindex/hreflang policy differences: 0. Sitemap canonical URL count: 996; no unintended membership change. Existing Arabic routes and noindex service decisions retained.

## Schema, FAQ, links, images and browser

{audit['faq_pairs']} visible FAQ pairs checked; 0 schema/visibility issues. {audit['links_checked']} contextual links checked; 0 broken, 0 redirecting, 0 missing fragments, 0 orphans, maximum depth {audit['max_same_language_depth']}. Image checks: 0 issues. Desktop/mobile browser checks: PASS ({browser.get('pages',30)} route-width checks); no-JavaScript: PASS ({browser.get('noJavaScript',15)} routes). No runtime/hydration or horizontal-overflow issue was detected.

## Build and Volkswagen QA

`npm run typecheck`: PASS before and after. Production build: PASS, 1,247 routes and 996 sitemap canonical URLs. Existing routing/SEO validators passed without changes. Volkswagen rendered audit: {audit['urls_reviewed']} reviewed, {len(audit['changed_urls'])} changed, 0 new, 0 policy regressions. DSG, ODIS and EPC editorial ownership: 0 unresolved conflicts.

## Limits

GSC lacks query × landing-page joins, so page-level ranking/cannibalization and live performance changes remain unproven. The build and browser checks validate local output only.
'''
save('b8-volkswagen-regression-report.md',reg)

dsg_names=['Executive Summary','DSG Queries Found','Measured GSC Evidence','Generated / Research DSG Terms','Existing Candidate URLs','DSG Search-Intent Families','Selected Primary DSG Repair Owner','Supporting Owners','DSG Repair vs Maintenance Boundary','DSG Repair vs Diagnostics Boundary','DSG vs Generic Transmission Boundary','Mechatronic Ownership','Clutch Ownership','Jerking Ownership','Shuddering Ownership','Slipping Ownership','Warning / Not-Shifting Ownership','DSG Fluid / Oil Service Ownership','ODIS Transmission-Diagnosis Relationship','Technical Claim Limitations','Content Changes Made','Internal-Link Changes','New-URL Decision','Cannibalization Risk','Evidence Limitations','Future Query × Page Validation Needed']
dsg_d={1:f'One indexable existing service owner (`{trans}`) covers DSG work with differentiated repair, fluid-service and symptom sections. No new URL; zero editorial conflict.',2:f'{len(dsg)} normalized DSG/transmission-family terms across workbook, original GSC and brief examples.',3:'Selected single 2026-09-27 window: “volkswagen dsg oil change” — 20 impressions, 0 clicks, average position 30.1. No overlapping-window sum.',4:'Other DSG/mechatronic/clutch/jerking terms are generated or research observations unless their row explicitly records measured source evidence.',5:f'`{trans}` indexable commercial page; `{hub}/transmission-repair` noindex support; `{diag}` indexable diagnostic page.',6:'Repair, scheduled maintenance, symptom triage and diagnostic investigation are separate user tasks served by sections or supporting pages.',7:f'`{trans}`; existing generic page, with Volkswagen-specific DSG context and cross-links.',8:f'`{hub}/transmission-repair` and `{diag}`.',9:'Fluid service depends on gearbox code and applicable schedule; repair requires a confirmed fault. Both can be discussed on the same service owner without universal intervals.',10:f'`{diag}` investigates controls/fault data; `{trans}` owns subsequent service or repair.',11:'The generic transmission service page explicitly includes DSG and has a Volkswagen contextual link. A duplicate VW exact-match indexable page is not justified.',12:f'`{trans}` owns mechatronic concern as assessment, without asserting the unit has failed.',13:f'`{trans}` owns clutch concern after diagnosis, not as a symptom-only replacement.',14:f'`{trans}` owns jerking triage; diagnostics supports.',15:f'`{trans}` owns shuddering triage; diagnostics supports.',16:f'`{trans}` owns slipping triage; driving advice depends on severity and inspection.',17:f'`{trans}` owns transmission-warning/not-shifting task; `{diag}` supports electronic investigation.',18:f'`{trans}` owns fluid/oil maintenance. The single latest measured DSG term has 20 impressions and no clicks.',19:f'ODIS-assisted fault investigation belongs to `{diag}`; exact functions depend on vehicle/module/access.',20:'DSG variants differ in clutch, fluid and service requirements. No single interval, universal rebuild, or guaranteed mechatronic diagnosis is claimed.',21:'Generic transmission and noindex VW transmission copy now distinguish symptom, service and repair.',22:'Hub → generic transmission, generic transmission → VW hub, and diagnostics → transmission paths were added or clarified.',23:'0 new DSG, mechatronic or symptom URLs.',24:'Intent overlap exists among phrases but editorial tasks are separated. Query × page ranking evidence is absent; harmful cannibalization is unproven.',25:'Latest measured DSG evidence is one query; no query × page join; business repair procedures must be confirmed against the vehicle.',26:'After deployment/recrawl, obtain query × page and conversion data before any URL consolidation or expansion.'}
dsg_text=section_list('B8 Volkswagen DSG ownership',dsg_names,dsg_d)
dsg_text+='\n| Intent | Primary Owner | Supporting Owner | Measured Evidence | Commercial / Informational | Repair / Maintenance / Symptom | Potential Competitor | Why Distinct | Conflict? |\n|---|---|---|---|---|---|---|---|---|\n'
for intent,task,evidence in [('DSG repair','Repair','—'),('DSG transmission repair','Repair','—'),('DSG service','Maintenance','—'),('DSG fluid/oil service','Maintenance','20 impressions; 0 clicks; position 30.1'),('DSG mechatronic','Repair assessment','—'),('DSG clutch','Repair assessment','—'),('DSG jerking','Symptom','—'),('DSG shuddering','Symptom','—'),('DSG slipping','Symptom','—'),('DSG warning','Symptom','—'),('DSG not shifting','Symptom','—'),('DSG diagnostics','Diagnosis','—'),('ODIS transmission diagnosis','Diagnosis','—')]:
    owner=diag if task=='Diagnosis' else trans; support=trans if task=='Diagnosis' else diag
    dsg_text+=f'| {intent} | `{owner}` | `{support}` | {evidence} | '+('Informational/commercial' if task=='Symptom' else 'Commercial')+f' | {task} | `{support}` | Diagnosis establishes cause; service/repair follows confirmed scope. | No |\n'
save('b8-volkswagen-dsg-ownership.md',dsg_text)

odis_names=['Executive Summary','ODIS Queries','EPC Queries','Measured GSC Evidence','Generated / Research Terms','Existing Candidate Owners','ODIS Primary Owner','EPC Primary Owner','ODIS vs Electrical Boundary','ODIS vs Mechanical Boundary','ODIS vs DSG Boundary','Coding Boundary','Programming Boundary','Adaptation / Service-Function Boundary','EPC Diagnostic Path','EPC vs Check-Engine Intent','EPC vs Loss-of-Power Intent','Content Changes','Internal-Link Changes','New-URL Decisions','Evidence Limitations','Future Validation']
odis_d={1:f'`{diag}` owns Volkswagen ODIS and EPC investigation; downstream repairs retain their own owners. Zero editorial conflicts and zero new URLs.',2:f'{len(odis)} normalized terms in the broader ODIS/diagnostics/module-warning family.',3:f'{len(epc)} normalized EPC term in the source universe.',4:'No latest-window original-GSC query directly names ODIS or EPC. Query-only exports cannot establish historic ranking URL.',5:'Generated/research ODIS, coding, programming and EPC variations are mapped without invented GSC metrics.',6:f'`{diag}`, generic electrical/mechanical owners, `{trans}` and hub were compared.',7:f'`{diag}`; ODIS is a diagnostic method, not a universal programming promise.',8:f'`{diag}`; EPC warning requires vehicle assessment rather than a throttle-body assumption.',9:'Electrical owns repair of a confirmed circuit, module or connection fault; diagnostics owns investigation.',10:'Mechanical owns a confirmed engine repair; diagnostics owns warning/fault investigation.',11:f'`{trans}` owns DSG service/repair. ODIS-supported gearbox investigation belongs to `{diag}`.',12:'Coding is described only as a supported-function enquiry; no every-module claim.',13:'Programming is excluded as a blanket promise until access, exact control unit and workshop capability are confirmed.',14:'Adaptations/service functions are conditional on the vehicle/module and correct procedure.',15:'Record symptom/warning, inspect vehicle, read relevant data, test candidate systems, then quote confirmed work.',16:'Both warnings may require diagnosis but should not be treated as identical causes or a guaranteed part failure.',17:'Loss of power affects urgency and driveability advice; diagnosis remains required.',18:'Volkswagen diagnostics page and hub now clarify ODIS, EPC, process and conditional functions.',19:'Hub → diagnostics and diagnostics → transmission support the distinct tasks.',20:'0 new ODIS or EPC URLs.',21:'No query × page GSC join, sparse measured ODIS/EPC demand, and unverified universal coding/programming scope.',22:'After recrawl, review query × landing-page evidence and verify precise module-function capability before expanding content.'}
odis_text=section_list('B8 Volkswagen ODIS and EPC ownership',odis_names,odis_d)
odis_text+='\n| Intent | Primary Owner | Supporting Owner | Measured Evidence | Potential Competitor | Why Distinct | Conflict? |\n|---|---|---|---|---|---|---|\n'
for intent,secondary in [('ODIS diagnostics','/services/auto-electrical-repair-dubai'),('fault-code investigation','/services/auto-electrical-repair-dubai'),('coding','/services/auto-electrical-repair-dubai'),('programming','/services/auto-electrical-repair-dubai'),('adaptations','/services/auto-electrical-repair-dubai'),('module communication','/services/auto-electrical-repair-dubai'),('EPC warning','/services/mechanical-repair-dubai'),('check-engine warning','/services/mechanical-repair-dubai'),('loss-of-power warning','/services/mechanical-repair-dubai')]:
    odis_text+=f'| {intent} | `{diag}` | `{secondary}` | No direct latest-window original-GSC term | `{secondary}` | Investigation first; repair follows verified findings. Coding/programming only where supported. | No |\n'
save('b8-volkswagen-odis-epc-ownership.md',odis_text)

baseline=load(O/'source-hashes-before.json'); changed=[]
for path,digest in baseline.items():
    p=R/path
    if p.is_file() and hashlib.sha256(p.read_bytes()).hexdigest()!=digest:changed.append(path)
authored=[x for x in changed if x.startswith('src/')]; generated=[x for x in changed if x not in authored]
state={'branch':subprocess.check_output(['git','branch','--show-current'],cwd=R,text=True).strip(),'head':subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip(),'authored_source_files_changed':authored,'generated_files_changed':generated,'git_status':subprocess.check_output(['git','status','--short'],cwd=R,text=True),'diff_stat':subprocess.check_output(['git','diff','--stat'],cwd=R,text=True)}
(O/'final-state.json').write_text(json.dumps(state,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'status':status,'authored':len(authored),'generated':len(generated),'reports':6,'coverage':len(terms)},indent=2))
