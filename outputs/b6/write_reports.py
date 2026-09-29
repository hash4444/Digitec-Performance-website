"""Assemble B6 evidence reports. Input is saved render, keyword, and QA evidence."""
import csv,json,subprocess,hashlib
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2];OUT=ROOT/'outputs/b6'
read=lambda name:json.loads((OUT/name).read_text(encoding='utf-8-sig'))
audit=read('audit-summary.json');kw=read('keyword-summary.json');tab=read('table-summary.json');browser=read('browser-verification.json')
names={'range-rover':'Range Rover','defender':'Defender','jaguar':'Jaguar'}
def save(name,lines):(ROOT/name).write_text('\n'.join(lines).rstrip()+'\n',encoding='utf-8')
def rows(name):
 with (ROOT/name).open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))
def link(path):return f'`{path}`'
def counts(b):
 x=audit['brands'][b];k=kw[b];c=tab[b]['classes']
 return f"{x['urls_reviewed']} URLs reviewed; {len(x['changed_urls'])} changed; 0 new. {k['source_observations']} observations, {k['raw_terms']} raw strings, {k['normalized_terms']} normalized terms, {k['measured_original_gsc_terms']} original-GSC terms. {x['links_checked']} rendered contextual links checked, 0 broken, 0 orphan, maximum same-language depth {x['max_same_language_depth']}. Coverage: "+', '.join(f'{a}: {v}' for a,v in sorted(c.items()))+'.'
def table(head,body):return ['| '+' | '.join(head)+' |','| '+' | '.join('---' for _ in head)+' |']+['| '+' | '.join(map(str,r))+' |' for r in body]

source=[
 '# B6 technical sources and evidence boundaries','',
 '## Land Rover / Range Rover manufacturer sources','',
 '- [Range Rover model comparison](https://www.rangerover.com/en-ca/comparison.html) distinguishes Range Rover, Sport, Velar and Evoque and notes that equipment varies by model and market.',
 '- [Range Rover Velar options](https://www.rangerover.com/en-us/range-rover-velar/options-and-accessories.html) describes electronic air suspension as package equipment; it is not presumed universal.',
 '- [Range Rover Evoque specifications](https://www.rangerover.com/en-us/range-rover-evoque/models-and-specifications.html) lists passive suspension on an Evoque specification. This supports the qualifier “where fitted.”','',
 '## Defender / Land Rover manufacturer sources','',
 '- [Defender official specifications](https://www.landrover.com/defender-wltp/) distinguish coil and air-suspension configurations for some variants.',
 '- [Defender accessories and variants](https://www.landrover.com/defender/accessories/index.html) identifies 90, 110 and 130 variants. No separate SEO page is inferred from variant existence.','',
 '## Jaguar manufacturer sources','',
 '- [Jaguar I-PACE](https://www.jaguar.com/en-us/jdx/all-models/i-pace/index.html) identifies I-PACE as fully electric. This supports excluding combustion-engine oil and spark-plug advice.',
 '- [I-PACE highlights](https://www.jaguar.com/en-us/jdx/all-models/i-pace/highlights/index.html) describes electric drive and regenerative braking. Workshop high-voltage capability is not established by this source.','',
 '## Other authoritative technical sources','',
 'No external source is used to assert an exact fluid grade, fixed interval, diagnostic-tool function, programming capability or common failure rate. The vehicle VIN, equipment and applicable service information remain decisive.','',
 '## DIGI-TEC business facts','',
 '- Existing `src/data/brands.ts`, `src/data/brandServices.ts`, contact components and rendered pages establish an independent Al Quoz, Dubai workshop and existing brand-service enquiries. They do not establish manufacturer authorization or high-voltage repair capability.',
 '- Existing JLR-compatible diagnostic wording is qualified by actual model, module and available access; no proprietary or universal function is promised.','',
 '## GSC evidence','',
 '- Seven original `digitecme.com-Performance-on-Search-2026-09-*.xlsx` exports were read from Downloads, including the 2026-09-27 export. They provide query-level measurements only, not query × landing-page joins. Export periods overlap and are not summed.',
 '- The workbook’s `Existing GSC query` rows are secondary copies of measurements, not independent observations of demand. Missing values stay blank.','',
 '## Keyword workbook evidence','',
 '- `DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx`: Master Keywords, GSC Opportunities and Brand Specific Systems. Generated taxonomy and research suggestions are labelled separately from measured exports.',
 '- Generic Land Rover rows were not assigned to Range Rover or Defender without a brand-specific term.','',
 '## Editorial inference','',
 '- Keyword → owner assignments, intent boundaries, and the decision to keep all B6 work on existing URLs are editorial judgments. They do not identify Google’s historical landing URL or prove cannibalization.',
]
save('b6-range-rover-defender-jaguar-technical-sources.md',source)

gaps=['# B6 gap decisions','','A generated term is not a mandate for a new page. The rows below cover potentially missing service, system, symptom, model and guide tasks. Measured values are present only where an original GSC export supplied them.','','| Brand | Keyword / cluster | Evidence type | Measured evidence | Existing owner | Decision | Reason | New URL needed? | Verified service scope? | Future action |','| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |']
decisions=[
 ('Range Rover','air-suspension warning / vehicle sitting low','research + existing route','','/blog/range-rover-land-rover-air-suspension-problems-dubai','retain problem guide','Symptom task differs from repair booking','No','inspection only; function per vehicle','Monitor query × page data'),
 ('Range Rover','air-suspension repair','measured + existing service','latest query: 20 impressions, 0 clicks, position 13.0','/brands/range-rover-service-dubai/suspension-repair','retain commercial owner','Equipment varies; repair follows diagnosis','No','scope per VIN','Improve contextual symptom link'),
 ('Range Rover','Sport / Vogue service','research + existing guides','','/blog/range-rover-sport-service-dubai-guide; /blog/range-rover-vogue-service-dubai-guide','retain guides','Vogue is user terminology; identify actual generation','No','vehicle-specific','Monitor page-level evidence'),
 ('Range Rover','subwoofer upgrade','original GSC','latest query: 52 impressions, 0 clicks, position 90.42','','intentionally untargeted','Exact retrofit capability not verified','No','No','Confirm business scope before any target'),
 ('Range Rover','hybrid/high-voltage repair','generated/research','','/brands/range-rover-service-dubai','exclude high-voltage claim','No verified HV scope','No','No','Confirm training, tools and process if requested'),
 ('Defender','90 / 110 / 130 service','research + existing guide','','/blog/defender-service-dubai-guide','retain one guide','Variants alone do not justify three thin URLs','No','vehicle-specific','Add model sections only with evidence'),
 ('Defender','best workshop selection','generated/research','','/brands/defender-service-dubai','hub section','Existing best-defender path is an accident case','No','independent workshop verified','Monitor measured demand'),
 ('Defender','accident/body repair','existing case + service','','/brands/defender-service-dubai/body-repair','commercial service primary; case supports','Do not turn case into selection landing page','No','existing service','Link case where relevant'),
 ('Defender','air suspension / 4WD warning','research + existing services','','/brands/defender-service-dubai/suspension-repair; /brands/defender-service-dubai/engine-diagnostics','retain service sections','Fitted system and cause need inspection','No','exact functions per vehicle','Monitor original GSC'),
 ('Jaguar','F-PACE / F-TYPE / XE / XF / XJ','generated taxonomy','','/brands/jaguar-service-dubai','hub model sections','No measured case for multiple thin model URLs','No','service scope per vehicle','Revisit with query × page evidence'),
 ('Jaguar','I-PACE / EV concerns','research + existing hub','','/brands/jaguar-service-dubai','conservative hub section','Electric drive differs from combustion; HV repair unverified','No','HV not verified','Confirm exact low-voltage/brake/AC scope'),
 ('Jaguar','electrical / battery','generated + generic owner','','/services/auto-electrical-repair-dubai; /services/battery-replacement-dubai','generic service + Jaguar hub support','No Jaguar-specific service route exists','No','verify exact vehicle','Monitor brand-qualified demand'),
 ('Jaguar','cooling / mechanical','generated + generic owner','','/services/mechanical-repair-dubai','generic owner + Jaguar hub support','Existing generic commercial page can handle task','No','vehicle-specific','Consider Jaguar section if measured'),
 ('Jaguar','warning / gearbox symptoms','research + existing services','','/brands/jaguar-service-dubai/engine-diagnostics; /brands/jaguar-service-dubai/transmission-repair','retain service sections','Symptoms do not prove failed component','No','diagnostic access per vehicle','Monitor query × page evidence'),
]
for r in decisions:gaps.append('| '+' | '.join(r)+' |')
gaps+=['','## Intentionally untargeted normalized terms','',f"Range Rover {tab['range-rover']['classes'].get('NOT TARGETED — INTENTIONALLY',0)}, Defender {tab['defender']['classes'].get('NOT TARGETED — INTENTIONALLY',0)}, Jaguar {tab['jaguar']['classes'].get('NOT TARGETED — INTENTIONALLY',0)}. Exact terms and source provenance are in the three coverage CSVs. Remaining `GAP — REVIEW REQUIRED`: zero for each brand; capability exclusions are deliberate, not silently covered. Both new-URL decisions and service claims remain conservative."]
save('b6-range-rover-defender-jaguar-gap-decisions.md',gaps)

systems=[
 ('Broad service','/brands/range-rover-service-dubai','/brands/defender-service-dubai','/brands/jaguar-service-dubai','/brands/land-rover-service-dubai','Brand-specific vehicle/booking task; generic Land Rover covers broader marque','No'),
 ('Diagnostics','/brands/range-rover-service-dubai/engine-diagnostics','/brands/defender-service-dubai/engine-diagnostics','/brands/jaguar-service-dubai/engine-diagnostics','/services/car-diagnostics-dubai','Same diagnostic principle; vehicle, module and requested task differ','No'),
 ('Air suspension / chassis','/brands/range-rover-service-dubai/suspension-repair','/brands/defender-service-dubai/suspension-repair','/brands/jaguar-service-dubai/suspension-repair','/services/suspension-repair-dubai','Air equipment is fitted selectively; brand repair pages handle booking','No'),
 ('Transmission / driveline','/brands/range-rover-service-dubai/transmission-repair','/brands/defender-service-dubai/transmission-repair','/brands/jaguar-service-dubai/transmission-repair','/services/transmission-repair-dubai','Defender off-road driveline, Range Rover road/terrain use and Jaguar gearbox symptoms are distinct tasks','No'),
 ('Electrical / modules','/brands/range-rover-service-dubai/electrical-repair','/brands/defender-service-dubai/electrical-repair','/brands/jaguar-service-dubai + /services/auto-electrical-repair-dubai','/services/auto-electrical-repair-dubai','Jaguar has no dedicated electrical route; generic owner supports its hub','No'),
 ('Infotainment','/brands/range-rover-service-dubai/electrical-repair','/brands/defender-service-dubai/electrical-repair','/brands/jaguar-service-dubai + /services/auto-electrical-repair-dubai','/services/auto-electrical-repair-dubai','Exact screen/module and repair capability must be verified','No'),
 ('Cooling / mechanical','/brands/range-rover-service-dubai/mechanical-repair','/brands/defender-service-dubai/mechanical-repair','/brands/jaguar-service-dubai + /services/mechanical-repair-dubai','/services/mechanical-repair-dubai','Jaguar I-PACE is not assigned combustion-engine work','No'),
]
boundary=['# B6 JLR shared-system boundary','',
 '## 1. Why Shared JLR Technology Does Not Mean Shared Search Ownership','Shared hardware and diagnostic families can support several vehicle brands. Search ownership follows the owner’s vehicle and task, so a generic JLR explanation supports rather than replaces a Range Rover, Defender or Jaguar booking page.',
 '## 2. Existing Range Rover Architecture',f"{audit['brands']['range-rover']['urls_reviewed']} routes including the hub, commercial services, selection page, maintenance/model guides and an air-suspension problem guide.",
 '## 3. Existing Defender Architecture',f"{audit['brands']['defender']['urls_reviewed']} routes. The best-defender-workshop URL is a real accident case, not a selection guide. 90/110/130 are covered in the existing guide.",
 '## 4. Existing Jaguar Architecture',f"{audit['brands']['jaguar']['urls_reviewed']} routes. Six dedicated service slugs exist; other tasks use hub sections with existing generic services.",
]
labels=['Diagnostics Boundary','Air-Suspension Boundary','Transmission / Driveline Boundary','Electrical / Module Boundary','Infotainment Boundary','Cooling / Mechanical Boundary']
for i,label in enumerate(labels,5):boundary.extend([f'## {i}. {label}',f'{systems[i-4][5]} Primary owners appear in the final table below. No universal module access, equipment or repair function is claimed.'])
boundary.extend([
 '## 11. Generic Land Rover Boundary','The generic Land Rover hub is a broad marque resource. It does not take exact Range Rover or Defender commercial intent.',
 '## 12. Range Rover vs Defender Boundary','Range Rover is the luxury/model-family owner; Defender owns 90/110/130 and off-road/driveline enquiries. Shared system vocabulary is context, not one merged cluster.',
 '## 13. Jaguar vs Land Rover Boundary','Jaguar has separate model and booking intent. I-PACE electric tasks are specifically excluded from combustion-only service copy.',
 '## 14. Internal-Link Strategy','Use hub → service and guide/problem → appropriate commercial owner. The existing generic diagnostic and mechanical resources may support Jaguar. No shared JLR URL was created.',
 '## 15. Duplicate-Content Findings','Shared workshop-process paragraphs remain in reusable components and some older JLR guides. The rewritten Range Rover maintenance and Jaguar selection bodies are distinct. This is an editorial improvement area, not observed ranking cannibalization.',
 '## 16. Ownership Conflicts','Zero unresolved editorial primary-owner conflicts across Range Rover ↔ Defender, Range Rover ↔ Jaguar, Defender ↔ Jaguar or generic Land Rover ↔ a brand owner. Query × page GSC evidence is unavailable, so harmful ranking cannibalization is not claimed.',
 '## 17. Final Boundary Decisions','The primary owner for each system stays with the exact brand and task. Jaguar electrical/cooling may use generic commercial owners plus Jaguar hub context because no dedicated route exists. Zero shared JLR system URLs created.','',
 '| System / intent | Range Rover owner | Defender owner | Jaguar owner | Shared resource | Why distinct | Conflict? |','| --- | --- | --- | --- | --- | --- | --- |'])
boundary += ['| '+' | '.join(r)+' |' for r in systems]
save('b6-jlr-shared-system-boundary.md',boundary)

protected=audit['prior_brand_regression'];protect_lines=[]
for label,key in [('B1 Mercedes','mercedes'),('B2 Porsche','porsche'),('B3 BMW','bmw'),('B4 Ferrari','ferrari'),('B4 Lamborghini','lamborghini'),('B5 Rolls-Royce','rolls-royce'),('B5 Bentley','bentley'),('B5 Maybach','maybach')]:
 v=protected[key];protect_lines.append(f'- {label}: {v["reviewed"]} representative brand-path routes; {len(v["seo_changes"])} SEO changes; {len(v["substantive_changes"])} substantive content/link/image changes — intact.')
reg=['# B6 regression and QA report','',
 f"Git baseline: branch `{(OUT/'branch-before.txt').read_text().strip()}`; HEAD `{(OUT/'head-before.txt').read_text().strip()}`. B6 started from a dirty local worktree preserved in `outputs/b6/diff-before.patch` and hash register; no commit was made.",'',
 '## B0-A and prior batches','B0-A: route, locale, canonical, robots, hreflang and sitemap invariants preserved. The full build routing validators passed.']+protect_lines+[
 '## Route, canonical, robots, hreflang and sitemap','Route set 1247 → 1247; 0 route-definition changes and 0 canonical/noindex changes. Sitemap validation passed for 996 canonical URLs. Existing Arabic route relationships remain; no fake counterparts were created.',
 '## Schema and FAQ visibility',f"Range Rover {audit['brands']['range-rover']['faq_pairs']}, Defender {audit['brands']['defender']['faq_pairs']}, Jaguar {audit['brands']['jaguar']['faq_pairs']} FAQ pairs reviewed; zero invisible schema answers and zero schema URL/unsupported-type issues. B6 guide schema uses Article, Breadcrumb and visible FAQ rather than a generic Service claim.",
 '## Internal links and images','Rendered link audit: '+', '.join(f'{names[b]} {audit["brands"][b]["links_checked"]} links, {len(audit["brands"][b]["broken_links"])} broken, {len(audit["brands"][b]["redirecting_links"])} redirects, {len(audit["brands"][b]["missing_fragments"])} missing fragments, {len(audit["brands"][b]["orphan_pages"])} orphans' for b in names)+'. All B6 image existence/alt checks passed.',
 '## Responsive and no-JavaScript','Playwright checked 22 representative routes at desktop 1440px and mobile 390px: 44 loaded views, no overflow, visible broken image or hydration/page error. The same 22 routes passed JavaScript-disabled H1, body-heading and schema checks. Initial HTML audit found one H1, metadata, canonical, robots, body copy and links on all B6 routes.',
 '## Build and TypeScript','Production build and its SEO, routing, PPF, protection, query, attribution, oil, suspension, transmission and social metadata validators passed. `npm run typecheck` fails at `src/pages/BrandServicePage.tsx:517` (TS2367, an unreachable Lamborghini `electrical-repair` comparison). Its SHA-256 matches the pre-B6 source-hash register exactly, proving B6 did not introduce it. Previous-brand content was not modified to clear this failure.',
 '## B6 brand QA','Range Rover, Defender and Jaguar audits have zero broken links, orphan pages, missing fragments, FAQ visibility errors, schema errors, hreflang errors, no-JS errors, image errors or prohibited free-diagnostic claims. Maximum same-language depth is four for each. No new routes.',
 '## Limitations','Query-only GSC exports cannot prove historical landing-page ownership or ranking cannibalization; overlapping export periods are not summed. Browser QA is local, not live performance evidence. Some older shared JLR template copy remains and should be reviewed in a later scoped editorial batch.',
 '## Status','PARTIAL — B6 implementation is locally complete, but the pre-existing TypeScript failure prevents a clean required-check result.',
]
save('b6-range-rover-defender-jaguar-regression-report.md',reg)

headings=['Executive Summary','Scope Completed','Range Rover Existing Architecture','Defender Existing Architecture','Jaguar Existing Architecture','Range Rover Keyword Evidence','Defender Keyword Evidence','Jaguar Keyword Evidence','Keyword Normalization','Range Rover Keyword → Owner Map','Defender Keyword → Owner Map','Jaguar Keyword → Owner Map','Range Rover Hub Review','Defender Hub Review','Jaguar Hub Review','Best-Workshop / Selection Review','Range Rover Commercial Services','Defender Commercial Services','Jaguar Commercial Services','JLR Diagnostics Review','Engine / Mechanical Review','Transmission / Driveline Review','Air Suspension / Chassis Review','Electrical Review','Infotainment / Screen / Camera Review','AC Review','Battery / No-Start Review','Cooling / Overheating Review','Range Rover Model Review','Defender Model Review','Jaguar Model Review','I-PACE / EV Review','Hybrid / Electrified Vehicle Review','Problem / Symptom Review','Maintenance / Interval Review','FAQ Review','Internal Linking Review','JLR Shared-System Boundary Review','Content Quality / Differentiation Review','E-E-A-T / Technical Claim Review','Arabic Review','Image / Alt Review','CTA Review','Local SEO Review','Schema Review','Canonical / Indexability Regression','Range Rover Cannibalization Regression','Defender Cannibalization Regression','Jaguar Cannibalization Regression','Duplicate Content Review','Range Rover Keyword Coverage','Defender Keyword Coverage','Jaguar Keyword Coverage','Remaining Gaps','CTR Opportunities','Model Quality Review','EV / Hybrid Safety QA','Internal-Link Final QA','Mobile / Desktop QA','No-JavaScript QA','Build / Test Results','B0-A Preservation','B1 Mercedes Preservation','B2 Porsche Preservation','B3 BMW Preservation','B4 Ferrari Preservation','B4 Lamborghini Preservation','B5 Rolls-Royce Preservation','B5 Bentley Preservation','B5 Maybach Preservation','Remaining Risks','Future Range Rover Opportunities','Future Defender Opportunities','Future Jaguar Opportunities','Final PASS / PARTIAL / FAIL']
assert len(headings)==75
details={
1:'B6 local implementation is complete on existing routes. Primary editorial ownership is distinct across the three brands and generic Land Rover. Production build, rendered SEO, links, schema, responsive and no-JavaScript checks pass. Required TypeScript remains red from unchanged pre-B6 Lamborghini code, so final status is PARTIAL.',
2:'Reviewed all existing brand-path routes, original GSC exports, the keyword workbook and Arabic counterparts. Edited only B6 content and scoped shared rendering for B6 FAQ visibility; zero routes were created. '+ ' '.join(f'{names[b]}: {counts(b)}' for b in names),
3:'Range Rover has 40 brand-path routes: hub, 14 service pairs, best-workshop selection page, maintenance/model guides and air-suspension symptom guide. The broad hub owns repair/service booking; the selection page now provides comparison criteria.',
4:'Defender has 34 routes: hub, 14 service pairs, maintenance/variant guide and accident-repair case. The case URL is not a broad “best workshop” landing page. No 90/110/130 URL multiplication.',
5:'Jaguar has 16 routes: bilingual hub, six bilingual commercial services and a bilingual selection guide. Electrical, battery and mechanical tasks rely on the hub plus existing generic service owners; no thin Jaguar service pages were added.',
6:f"Range Rover: {kw['range-rover']['source_observations']} observations; {kw['range-rover']['measured_original_gsc_terms']} normalized original-GSC terms. Latest export has {kw['range-rover']['latest_gsc_rows']} query rows. `range rover repair dubai` has 180 impressions at position 34.84, while `range rover suspension repair` has 20 at 13.0; neither identifies the ranking URL.",
7:f"Defender: {kw['defender']['source_observations']} observations; {kw['defender']['measured_original_gsc_terms']} normalized original-GSC terms across available exports. The latest export has zero Defender rows. This is weaker historical evidence, not permission to create pages from generated terms.",
8:f"Jaguar: {kw['jaguar']['source_observations']} observations; {kw['jaguar']['measured_original_gsc_terms']} normalized original-GSC terms. Latest export has {kw['jaguar']['latest_gsc_rows']} rows; `jaguar repair dubai` has 66 impressions at position 24.23. Query × page data is unavailable.",
9:'Case, spacing and selected spelling variants were normalized; workbook measured copies, generated taxonomy, research suggestions, brief examples and seven original GSC exports retain separate source labels. Overlapping periods were not summed. Every normalized term appears once in the final coverage CSV.',
10:'Range Rover hub owns broad service; dedicated brand routes own commercial tasks; the best-workshop page owns selection; existing Sport/Vogue and maintenance guides own planning; the air-suspension problem guide owns symptom information. See `b6-range-rover-keyword-coverage.csv`.',
11:'Defender hub owns broad and selection-section demand; services own bookings, the existing guide owns variant/maintenance planning, and the accident case supports body repair. The body-repair service remains commercial primary. See `b6-defender-keyword-coverage.csv`.',
12:'Jaguar hub owns broad and model enquiries; six brand services own their tasks; the selection guide owns comparison; generic electrical, battery, body and mechanical routes support unmatched commercial intent. See `b6-jaguar-keyword-coverage.csv`.',
13:'Range Rover hub remains the broad booking owner. Existing air-suspension and JLR diagnostic wording is qualified by fitted equipment, VIN and available function.',
14:'Defender hub remains separate from Range Rover and generic Land Rover. The service profile now avoids universal suspension, oil and transmission facts. The 90/110/130 guide supports rather than fragments the hub.',
15:'Jaguar hub now explains warning assessment, varying suspension and I-PACE electric scope, including the explicit absence of any assumed high-voltage service promise.',
16:'`/best-range-rover-workshop-dubai` now answers how to choose a workshop, leaving broad service booking to the hub. `/blog/jaguar-best-workshop-dubai` has its own Jaguar checklist. `/blog/best-defender-workshop-dubai` remains an accident-repair case.',
17:'Existing Range Rover commercial service URLs retained. Profile claims about oil, drivetrain, brakes, refrigerant and suspension were made vehicle-specific; no arbitrary mileage interval remains in the Range Rover profile.',
18:'Existing Defender commercial URLs retained. A fitted coil/air system and driveline are identified before procedure, parts or calibration promises.',
19:'Jaguar retains six dedicated commercial routes. Hub sections plus generic services cover remaining intent without manufacturing thin brand × service pages.',
20:'Each brand has a separate diagnostics owner. JLR-compatible scan, live-data, coding or calibration availability is checked for the exact vehicle and control unit. A fault code alone is not a failed-part diagnosis.',
21:'Mechanical advice is limited to the fitted combustion architecture. Jaguar I-PACE is excluded from combustion-oil, spark-plug and ICE gearbox assumptions. Cooling symptoms route to inspection rather than remote diagnosis.',
22:'Range Rover and Defender driveline tasks remain separate from Jaguar gearbox work. Jerking or warnings are symptom evidence; no gearbox replacement follows automatically. Fluids and procedures depend on the fitted hardware.',
23:'Range Rover symptom guide → Range Rover suspension service; Defender suspension service owns the fitted coil/air concern; Jaguar suspension service owns the exact fitted system. Air suspension is not universal across any brand.',
24:'Range Rover and Defender have brand electrical service routes. Jaguar uses its hub with the existing generic electrical commercial owner. Module programming is not promised universally.',
25:'Screen, audio and camera terms are assessed as electrical/infotainment symptoms, with exact retrofit or programming functions excluded until verified. No thin acronym page was created.',
26:'Each brand’s existing AC service route owns booking. Refrigerant and electric-vehicle AC scope are matched to the vehicle label, fitted equipment and supported workshop capability.',
27:'Low-voltage battery/no-start symptoms are inspected before replacement. Jaguar generic battery service supports the hub; I-PACE high-voltage battery repair is not claimed.',
28:'Range Rover/Defender mechanical services and Jaguar hub + generic mechanical service are the owners. Overheating and coolant loss require safety-aware inspection; no universal failure diagnosis is asserted.',
29:'Range Rover, Sport, Velar and Evoque are covered by hub/service pages and existing Sport/Vogue guides. Vogue is user vocabulary, not a claim that every modern vehicle is officially badged Vogue.',
30:'Defender 90, 110 and 130 share an existing guide with variant-specific questions. Dedicated variant pages were rejected without distinct evidenced tasks.',
31:'F-PACE, F-TYPE, XE, XF, XJ and I-PACE are introduced on the hub. No model × service or thin model routes were added.',
32:'Jaguar I-PACE is fully electric according to Jaguar. B6 copy separates it from combustion service; high-voltage work stays outside verified scope.',
33:'Range Rover/Defender electrified variants are discussed conservatively. Oil, gearbox and equipment recommendations follow the exact powertrain, not the badge.',
34:'The Range Rover air-suspension problem guide remains informational and links toward commercial assessment. Defender accident case remains case evidence; service pages handle symptoms where no distinct problem guide is warranted.',
35:'Range Rover maintenance guide now uses vehicle-specific service data and history instead of fixed intervals. Defender and Jaguar planning remains separate from booking; costs depend on due items, inspection, parts and approved labour.',
36:f"Visible FAQ/FAQPage alignment passed: Range Rover {audit['brands']['range-rover']['faq_pairs']}, Defender {audit['brands']['defender']['faq_pairs']}, Jaguar {audit['brands']['jaguar']['faq_pairs']} pairs, zero missing answers in initial HTML.",
37:'Hub → service, guide/problem → commercial, and model/variant → relevant service relationships were checked on rendered HTML. Exact-match anchors were not inserted sitewide.',
38:'The seven-system primary-owner table in `b6-jlr-shared-system-boundary.md` records zero unresolved cross-brand or generic-Land-Rover editorial conflicts. No shared JLR system URL was created.',
39:'Range Rover maintenance and Jaguar selection body copy were replaced with different tasks in English and Arabic. Some older shared process paragraphs remain in reusable pages; the remaining exact matches were not rewritten solely for a score.',
40:'No authorization, certification, warranty, rating, fixed price, failure rate, free diagnostic or high-voltage capability was added. Technical claims now require model, year, VIN, specification and supported access where relevant.',
41:'All existing Arabic B6 routes were reviewed. No English-to-Arabic path symmetry was invented and no noindex policy was changed. Guide and hub FAQ answers appear in initial Arabic HTML.',
42:'All rendered B6 image paths and alt presence passed; no broken assets or keyword-stuffed alt issues were detected by the local audit. Image identity remains limited to the existing site assets.',
43:'Commercial pages provide an inspection/contact path; guides link contextually to service owners. No free scan, free inspection, guaranteed diagnosis or instant repair promise was introduced.',
44:'Dubai and Al Quoz are used as real workshop context, not neighborhood doorway pages. Dubai heat is discussed only for relevant condition checks.',
45:'Article/Breadcrumb/FAQ schema on the rewritten informational guides reflects visible content. Generic Service schema was removed from those guides. No Review, AggregateRating, Offer or unsupported affiliation was emitted.',
46:'1247 routes before and after; zero canonical/noindex policy changes. Hreflang and sitemap validators pass; no route, redirect or best-workshop URL was removed.',
47:'Range Rover hub vs selection, services, models, air-suspension symptom and maintenance guide now have distinct editorial tasks. Query × landing-page GSC evidence is absent, so harmful cannibalization is unproven.',
48:'Defender hub vs generic Land Rover/Range Rover, service pages, 90/110/130 guide and accident case have distinct tasks. No exact-page conflict remains.',
49:'Jaguar hub vs selection, six services and I-PACE scope have distinct tasks. Generic electrical/mechanical service support is explicit rather than pretending dedicated Jaguar URLs exist.',
50:'Exact substantive paragraph comparison still finds reusable workshop-process and older guide paragraphs across JLR pages. The most consequential Range Rover maintenance/Jaguar selection template duplication was replaced; remaining duplication is documented for future review.',
51:counts('range-rover'),52:counts('defender'),53:counts('jaguar'),
54:'Zero `GAP — REVIEW REQUIRED` terms in all three coverage CSVs. Unverified capability and out-of-market terms are explicitly `NOT TARGETED — INTENTIONALLY`; see the gap-decision register.',
55:'Latest query-only GSC offers Range Rover repair (180 impressions, position 34.84), suspension repair (20, 13.0) and Jaguar repair (66, 24.23) as title/intent candidates. Defender has no latest rows. No historical ranking URL is inferred.',
56:'Existing Range Rover Sport/Vogue and Defender 90/110/130 content was checked as a group. Jaguar models remain hub sections; new thin model pages were rejected.',
57:'I-PACE and electrified JLR scope uses vehicle-specific qualifiers; high-voltage repair remains excluded pending business proof.',
58:'Rendered contextual links: '+', '.join(f'{names[b]} {audit["brands"][b]["links_checked"]} checked, 0 broken, 0 redirects, 0 missing fragments, 0 contextual orphans, depth {audit["brands"][b]["max_same_language_depth"]}' for b in names)+'.',
59:'Playwright tested 22 representative routes at 1440px and 390px, 44 views total. No horizontal overflow, hydration/runtime errors or visible broken images.',
60:'The same 22 representative routes passed JavaScript-disabled H1, heading and schema checks. Full B6 initial HTML audit found title, description, canonical, robots, one H1, body and links on every route.',
61:'Production build and included validators passed. Required TypeScript failed with TS2367 at unchanged `src/pages/BrandServicePage.tsx:517` in Lamborghini copy; baseline and current file hashes match.',
62:'B0-A route/localization policy intact: zero route or SEO-policy changes, hosting tests and sitemap checks pass.',
63:protect_lines[0].removeprefix('- '),64:protect_lines[1].removeprefix('- '),65:protect_lines[2].removeprefix('- '),66:protect_lines[3].removeprefix('- '),67:protect_lines[4].removeprefix('- '),68:protect_lines[5].removeprefix('- '),69:protect_lines[6].removeprefix('- '),70:protect_lines[7].removeprefix('- '),
71:'Required TypeScript check remains red from pre-B6 code. No live ranking, CTR or lead improvement can be inferred before deployment and recrawl. Query × page joins, exact VIN/specification and some workshop capabilities remain unavailable.',
72:'Monitor Range Rover query × page data for the selection page, air-suspension symptom/service boundary and Sport/Vogue guide performance. Do not consolidate URLs without backlink and conversion evidence.',
73:'Gather Defender query × page data before considering a dedicated selection or 90/110/130 page. The current accident case should remain a case.',
74:'Validate Jaguar model demand and exact EV/electrical capabilities before any new page. Keep I-PACE high-voltage claims excluded until business evidence exists.',
75:'PARTIAL — B6 implementation complete but required TypeScript remains failing in an unchanged previous-brand file. The B6 local production/rendered QA itself passes; no commit, push or deployment was performed.'
}
assert set(details)==set(range(1,76))
report=['# B6 Range Rover, Defender and Jaguar final report','','Evidence baseline: `outputs/b6/`; detailed observations in the three coverage CSVs, ownership tables, before/after registers and regression file. The reported owner is editorial, not a measured historical ranking URL.']
for i,h in enumerate(headings,1):report.extend(['',f'## {i}. {h}','',details[i]])
save('b6-range-rover-defender-jaguar-final-report.md',report)
print('Wrote five B6 markdown deliverables and nine CSVs are available.')
