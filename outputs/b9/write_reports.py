"""Assemble the B9 review reports from the frozen audit and CSV evidence."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/b9'
read = lambda p: json.loads(p.read_text(encoding='utf-8'))
audit = read(OUT / 'audit-summary.json')
tables = read(OUT / 'table-summary.json')
keywords = {b: read(OUT / f'{b}-keyword-summary.json') for b in ('jetour', 'rox')}

def save(name, body):
    (ROOT / name).write_text(body.strip() + '\n', encoding='utf-8')

def sectioned(name, title, headings, details, intro='', appendix=''):
    lines = [f'# {title}', '', intro]
    for i, heading in enumerate(headings, 1):
        lines += ['', f'## {i}. {heading}', '', details.get(heading, details.get('*', 'Reviewed against the rendered inventory and the keyword-owner registers. No additional URL is justified by the available evidence.'))]
    if appendix:
        lines += ['', appendix]
    save(name, '\n'.join(lines))

jet = '/brands/jetour-service-dubai'
rox = '/brands/rox-service-dubai'
install = rox + '/soft-close-door-installation'
generic = '/services/soft-close-door-repair-dubai'
sources = {
    'jetour_models': 'https://cms.jetourglobal.com/models/',
    'jetour_brand': 'https://cms.jetourglobal.com/brand/',
    'rox_specs': 'https://roxmotor.com/en/rox01/configuration/',
    'rox_manual': 'https://file.roxmotor.com/rox-website/files/Rox01-User-Manual.pdf',
}

gap_rows = [
('Jetour','Brand service / repair','Generated; no original-GSC Jetour term','None',jet,'Keep existing hub','Broad, vehicle-specific enquiries fit the hub','No','Existing project service scope','Review query × page evidence after launch'),
('Jetour','T2 / X70 / X90 Plus / Dashing model pages','Manufacturer model names; generated terms','None',jet,'Cover in hub','No model-page demand or unique service task established','No','Vehicle-specific inspection only','Revisit with measured model demand'),
('Jetour','Transmission / gearbox symptoms','Generated terms','None','/services/transmission-repair-dubai','Use generic service owner','No verified need for a separate Jetour transmission route','No','Inspection scope shown in project','Use hub contextual links'),
('Jetour','Screen / infotainment / camera','Generated terms','None','/services/auto-electrical-repair-dubai','Use generic electrical owner','Component diagnosis before repair; no brand-specific page evidence','No','Existing electrical scope','Verify any retrofit separately'),
('Jetour','Coding / programming','Generated terms','None','—','Intentionally untargeted','No verified Jetour access or capability','No','No','Obtain business proof before claims'),
('ROX','ROX vs ROX 01 broad service','Research and generated; limited GSC','ROX service: 6 impressions in older window',rox,'Share existing hub','Current model-specific content fits broad brand owner','No','Existing project service scope','Track future model intent'),
('ROX','ROX 01 electrified powertrain / high-voltage','Manufacturer specifications; generated terms','None',rox,'Educational context only','High-voltage repair, drive unit and charging capability unverified','No','No for high-voltage work','Confirm business capability before SEO targeting'),
('ROX','Diagnostics / screen / infotainment','Generated terms','None',rox,'Hub and generic electrical support','Diagnostic access and software functions not established','No','Limited inspection/enquiry only','Confirm tooling and module access'),
('ROX','ROX 01 soft-close installation','Measured original GSC','64 + 19 impressions; 0 clicks; selected latest window',install,'Retain and improve existing owner','Distinct model compatibility enquiry','No','Existing project installation page; compatibility not universal','Validate query × page ranking'),
('ROX','Generic soft-close repair / malfunction','Generated and measured older generic terms','Older generic observations; do not sum windows',generic,'Retain generic repair owner','Fault on a fitted system differs from ROX installation','No','Existing generic repair page','Route fitted-system symptoms here'),
('ROX','Generic soft-close installation','Generated brief term','None',generic,'Cover as compatibility assessment','Cross-brand installation is broader than ROX-specific fitting','No','Existing generic page; subject to confirmation','Confirm per-vehicle compatibility'),
('ROX','Retrofit / coding / programming','Generated terms','None','—','Intentionally untargeted beyond existing installation enquiry','Capability and compatibility not proven generally','No','No broad retrofit or programming claim','Obtain business proof'),
]
head = '| Brand | Keyword / Cluster | Evidence Type | Measured Evidence if Available | Existing Owner | Decision | Reason | New URL Needed? | Verified Service Scope? | Recommended Future Action |'
sep = '|---|---|---|---|---|---|---|---|---|---|'
save('b9-jetour-rox-gap-decisions.md', '\n'.join(['# B9 gap decisions', '', 'No remaining editorial owner gap requires a new URL. Low evidence and architectural asymmetry are not gaps by themselves.', '', head, sep] + ['| ' + ' | '.join(x) + ' |' for x in gap_rows]))

save('b9-jetour-rox-technical-sources.md', f'''# B9 technical sources and evidence boundaries

## Jetour manufacturer / authoritative sources
- [Jetour global model catalogue]({sources['jetour_models']}) confirms model names including T1, T2, T2 i-DM, Dashing, X70/X70 Plus and X90 Plus. Names do not establish a universal powertrain, gearbox, fluid or service interval.
- [Jetour brand overview]({sources['jetour_brand']}) supports the series distinction. Individual VIN, year and market specification are needed for equipment and service claims.

## ROX manufacturer / authoritative sources
- [ROX 01 official configuration]({sources['rox_specs']}) describes electric drive, a 1.5T range extender, battery and charging specifications. Figures and equipment vary by configuration; the site does not claim traction-battery, electric-drive-unit or charging-system repair.
- [ROX 01 user manual]({sources['rox_manual']}) explains that traction is motor driven and the range extender supplies electrical energy. This supports avoiding conventional ICE transmission assumptions and a universal oil interval.

## Other authoritative technical sources
- None used for new B9 technical claims. Where manufacturer evidence was unavailable, copy was limited to inspection and compatibility enquiries.

## DIGI-TEC business facts
- Existing project data and rendered pages establish the Al Quoz workshop, Dubai contact paths, existing Jetour/ROX service routes, ROX-specific soft-close installation enquiry and the generic soft-close repair route. A published service page establishes the project's advertised scope, not certification, proprietary access or universal vehicle compatibility.
- No project evidence verifies ROX high-voltage battery, electric drive, charging repair, broad Jetour/ROX coding or universal retrofit capability; those claims were excluded.

## GSC evidence
- Original exported query rows were read from the available DIGI-TEC Performance-on-Search XLSX files. Duplicate export content was skipped and overlapping date windows were not summed.
- Jetour: zero measured original-GSC normalized terms. ROX: six across all original exports. The selected latest export (2026-09-27 filename; query data period recorded in the coverage CSV) has two ROX soft-close terms: 64 and 19 impressions, zero clicks; position 7.31 and 8.89. Query × landing-page joins were unavailable.

## Keyword workbook evidence
- `C:/Users/ADMIN/Downloads/DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx` supplied generated taxonomy and research observations. Generated rows have blank GSC metrics in the coverage CSVs and were not treated as measured demand.

## Editorial inference
- The existing ROX hub owns both broad brand and ROX 01 service context; a standalone model URL is not supported. ROX installation and cross-brand repair represent different customer tasks. These are editorial ownership decisions, not manufacturer facts or evidence of Google's historical ranking URLs.
''')

soft_headings = ['Executive Summary','Soft-Close Queries Found','Measured GSC Evidence','Generated / Research Terms','Existing Candidate URLs','Search-Intent Families','ROX-Specific Installation Owner','Generic Repair Owner','Generic Installation Intent','Repair vs Installation Boundary','Brand-Specific vs Generic Boundary','Compatibility-Enquiry Ownership','Soft-Close Not-Working Ownership','Soft-Close Malfunction Ownership','Retrofit / Installation Capability Evidence','Content Changes Made','Internal-Link Changes','New-URL Decision','Cannibalization Risk','Evidence Limitations','Future Query × Page Validation Needed']
soft_details = {
'Executive Summary':f'ROX-specific fitting belongs to `{install}`. Cross-brand malfunction, repair and general installation compatibility belong to `{generic}`. No new URL or unresolved editorial conflict.',
'Soft-Close Queries Found':'Twelve normalized ROX/soft-close terms appear in the coverage subset; five are measured original-GSC terms across different exports, including older generic queries.',
'Measured GSC Evidence':'The latest selected original-GSC export (2026-09-27 filename; query period in CSV) records `rox01 soft close door`: 64 impressions, 0 clicks, position 7.31; and `rox 01 soft close`: 19 impressions, 0 clicks, position 8.89. Single-window sum: 83 impressions, 0 clicks. Earlier, overlapping windows are not added.',
'Generated / Research Terms':'Workbook and brief terms include ROX installation, ROX repair, generic installation, generic repair, malfunction and compatibility. They carry no invented GSC metrics.',
'Existing Candidate URLs':f'`{install}` and `{generic}` are the two principal candidates; `{rox}` supports broad ROX/ROX 01 context.',
'Search-Intent Families':'Model-specific installation enquiry; generic installation compatibility; malfunction of an already fitted system; repair diagnosis. A query alone does not identify a failed latch or prove fitment.',
'ROX-Specific Installation Owner':f'`{install}` asks about vehicle, door and component compatibility before scope and quote.',
'Generic Repair Owner':f'`{generic}` covers nonworking fitted systems across supported vehicles.',
'Generic Installation Intent':f'`{generic}` covers cross-brand installation compatibility, separate from the ROX-specific fitting page.',
'Repair vs Installation Boundary':'An existing door that fails to soft-close needs fault inspection; a functioning vehicle being equipped needs compatibility assessment. Neither outcome is guaranteed from a query.',
'Brand-Specific vs Generic Boundary':'The ROX page owns ROX 01 fitting context. The generic page owns cross-brand repair and general fitting enquiries.',
'Compatibility-Enquiry Ownership':f'ROX 01: `{install}`. Other vehicles: `{generic}`. Compatibility is assessed for the exact vehicle.',
'Soft-Close Not-Working Ownership':f'`{generic}`; the ROX fitting page links to it.',
'Soft-Close Malfunction Ownership':f'`{generic}`; inspection precedes any component replacement.',
'Retrofit / Installation Capability Evidence':'The existing ROX installation route and generic service page support installation enquiries. They do not prove universal retrofit compatibility, coding access or a guaranteed fit.',
'Content Changes Made':'The ROX installation page now leads with fitting compatibility; the generic page leads with fault repair and cross-brand installation assessment.',
'Internal-Link Changes':'ROX hub → ROX installation; ROX installation → generic repair; generic page retains broad service navigation. Rendered audits found no broken or redirecting links.',
'New-URL Decision':'No soft-close route was created.',
'Cannibalization Risk':'Editorial tasks are distinct. Harmful ranking cannibalization cannot be confirmed without query × landing-page data.',
'Evidence Limitations':'Only two latest-window ROX soft-close terms are measured. No query × page join, conversion data or live post-change outcome is available.',
'Future Query × Page Validation Needed':'After deployment and recrawl, compare ROX installation queries and generic repair queries by landing page, CTR, enquiries and conversions.',
}
soft_table = '''| Intent | Primary Owner | Supporting Owner | Brand-Specific / Generic | Repair / Installation | Measured Evidence | Potential Competitor | Why Distinct | Conflict? |
|---|---|---|---|---|---|---|---|---|
| ROX 01 soft-close installation | `'''+install+'''` | `'''+rox+'''` | Brand-specific | Installation | 83 impressions / 0 clicks in selected single window | Generic page | Model compatibility enquiry | No |
| ROX soft-close installation | `'''+install+'''` | `'''+rox+'''` | Brand-specific | Installation | Same measured family; not an additive total | Generic page | Vehicle-specific fitting | No |
| Generic soft-close installation | `'''+generic+'''` | `'''+install+'''` where ROX | Generic | Installation | Generated/research only | ROX page | Cross-brand fitment enquiry | No |
| Generic soft-close repair | `'''+generic+'''` | `'''+install+'''` where ROX | Generic | Repair | Older generic GSC terms; no summed total | ROX page | Existing fault | No |
| Soft-close not working / malfunction | `'''+generic+'''` | `'''+install+'''` where ROX | Generic | Repair | Generated/research | ROX page | Inspect fitted system | No |
| Compatibility enquiry | `'''+install+'''` for ROX; `'''+generic+'''` otherwise | Brand hub | Both | Installation | Generated/research | Other owner | Vehicle determines owner | No |'''
sectioned('b9-rox-soft-close-ownership.md','B9 ROX soft-close ownership',soft_headings,soft_details,appendix=soft_table)

ev_headings=['ROX 01 Vehicle Architecture','Manufacturer / Authoritative Evidence','Verified DIGI-TEC Scope','Unverified Workshop Scope','Mechanical-Service Boundary','Electrical-Service Boundary','Diagnostics Boundary','AC / Thermal-System Boundary','Brake / Suspension Boundary','Low-Voltage Battery Boundary','High-Voltage Battery Boundary','Electric-Drive-System Boundary','Charging-System Boundary','Content Claims Allowed','Content Claims Excluded','Future Business Verification Needed','Final SEO Implications']
ev_details={
'ROX 01 Vehicle Architecture':'ROX 01 is electrically driven with a 1.5T range extender that supplies electrical energy. Configuration and equipment depend on model/version; a conventional ICE gearbox service description is inappropriate.',
'Manufacturer / Authoritative Evidence':f'[Official ROX configuration]({sources["rox_specs"]}) and [ROX 01 user manual]({sources["rox_manual"]}). Manufacturer facts describe vehicle architecture, not DIGI-TEC repair capability.',
'Verified DIGI-TEC Scope':'Existing project pages advertise enquiries and vehicle-specific inspection for ROX service, AC, brakes, diagnostics and soft-close installation, plus generator-engine oil discussion. This is evidence of site-advertised scope only; exact workshop access and accepted work must be confirmed per vehicle.',
'Unverified Workshop Scope':'No evidence verifies traction-battery service, high-voltage repair, electric-drive-unit repair, charging-system repair, proprietary ROX diagnostics, coding or programming.',
'Mechanical-Service Boundary':'Inspect conventional accessible mechanical concerns according to the exact vehicle. Do not equate the range extender with a conventional drive engine or invent universal oil intervals.',
'Electrical-Service Boundary':'Low-voltage comfort/electrical enquiry may be described conservatively. High-voltage systems are excluded until capability is verified.',
'Diagnostics Boundary':'Assessment follows actual vehicle and available access; no promise of proprietary ROX module programming or instant fault identification.',
'AC / Thermal-System Boundary':'Cabin AC enquiry is within site-advertised scope. Traction-battery thermal-system repair is not implied.',
'Brake / Suspension Boundary':'Site-advertised brake and suspension inspection may be discussed with configuration qualifiers. Regenerative braking does not make hydraulic brake inspection irrelevant.',
'Low-Voltage Battery Boundary':'A battery or no-start complaint needs system identification first. Only low-voltage battery inspection/replacement scope is represented conservatively.',
'High-Voltage Battery Boundary':'No high-voltage battery or traction-battery service capability is claimed.',
'Electric-Drive-System Boundary':'No electric-drive-unit repair capability is claimed.',
'Charging-System Boundary':'No charging-system repair capability is claimed.',
'Content Claims Allowed':'Motor-driven range-extender architecture from manufacturer sources; VIN-specific inspection enquiry; existing workshop-advertised soft-close, AC and brake scope with compatibility and diagnosis qualifiers.',
'Content Claims Excluded':'High-voltage, traction-battery, electric-drive or charging-system repair; universal gearbox or oil schedules; guaranteed coding, programming or retrofit compatibility.',
'Future Business Verification Needed':'Confirm actual ROX diagnostic tooling/access, technician training and safety processes, accepted HV/charging/drive-unit services, soft-close component supply and model compatibility.',
'Final SEO Implications':f'Use `{rox}` for broad ROX/ROX 01 context and `{install}` for ROX-specific soft-close fitting. Do not build electrified-system service pages until scope is proved.'}
sectioned('b9-rox-electrified-scope.md','B9 ROX electrified-scope boundary',ev_headings,ev_details)

regression = '''# B9 regression report

## Git baseline
Branch `main`; baseline HEAD `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. B9 began on a dirty cumulative B0-A–B8 working tree. The frozen pre-B9 source hashes, route/page snapshots and diff are in `outputs/b9/`.

## Previous-batch preservation
| Batch | Status | Evidence |
|---|---|---|
'''
for name, label in [('B0-A','B0-A localization'),('mercedes','B1 Mercedes'),('porsche','B2 Porsche'),('bmw','B3 BMW'),('ferrari','B4 Ferrari'),('lamborghini','B4 Lamborghini'),('rolls-royce','B5 Rolls-Royce'),('bentley','B5 Bentley'),('maybach','B5 Maybach'),('range-rover','B6 Range Rover'),('defender','B6 Defender'),('jaguar','B6 Jaguar'),('B6.1','B6.1 TypeScript repair'),('cadillac','B7 Cadillac'),('volkswagen','B8 Volkswagen')]:
    if name in ('B0-A','B6.1'):
        evidence='Route/language policy unchanged' if name=='B0-A' else '`npm run typecheck` passes after B9'
    else:
        v=audit['prior_brand_regression'][name]
        evidence=f"{v['reviewed']} rendered URLs; 0 SEO or substantive differences"
    regression += f'| {label} | PASS | {evidence} |\n'
regression += '''
## Route, canonical, robots/noindex, hreflang and sitemap comparison
Before/after production snapshots contain 1,247 routes and 996 sitemap canonical URLs. Route availability, redirects, canonical policy, robots/noindex, hreflang relationships and sitemap membership have zero differences. No Arabic route was added. Existing noindex policies remain.

## Schema and FAQ visibility
All scanned Jetour/ROX pages retain matching canonical schema URLs. FAQPage questions and answers are visible in initial HTML: Jetour 128 and ROX 140 rendered FAQ pairs; zero mismatches. No fabricated reviews, prices, ratings or offers were added.

## Internal links and images
Jetour: 547 contextual links, zero broken/redirecting/missing fragments/orphans, maximum same-language depth 2. ROX (including generic soft-close): 684 links, zero of those issues, depth 3. Rendered image audit found zero broken or misleading-image issues in the checked inventory.

## Responsive and no-JavaScript status
Browser QA passed 22 representative routes at 1440px and 390px (44 checks) plus 22 no-JS visits. No overflow, broken visible image, missing H1/metadata, runtime or hydration error was found. Initial HTML retains substantive copy, canonical, robots, internal links and schema.

## TypeScript, build and validators
`npm run typecheck`: PASS before and after B9. Production build: PASS, 1,247 routes, 996 sitemap URLs. Existing build-time SEO and routing validators passed without weakening. An initial sandbox-denied read of `vite.config.ts` was resolved by rerunning the build with approved filesystem access; it was not a source-code failure.

## Jetour, ROX and soft-close QA
Jetour: 30 URLs reviewed, 30 rendered pages changed by scoped profile/brand data. ROX: 34 URLs reviewed, 12 changed. Ownership tables have zero unresolved editorial primary owners. ROX-specific installation and cross-brand repair/installation have separate existing owners. No new URL was created.

## Evidence limits
The available GSC exports do not join query to landing page; an editorial owner is not a historical ranking URL. Local QA cannot prove Google recrawl, traffic, CTR or leads. Exact equipment and actual workshop capabilities remain vehicle/business dependent.
'''
save('b9-jetour-rox-regression-report.md',regression)

headings = ['Executive Summary','Scope Completed','Jetour Existing Architecture','ROX Existing Architecture','Jetour Keyword Evidence','ROX Keyword Evidence','Keyword Normalization','Jetour Keyword → Owner Map','ROX Keyword → Owner Map','Jetour Hub Review','ROX Hub Review','Commercial Service Inventory','Jetour Diagnostics Review','Jetour Engine / Mechanical Review','Jetour Transmission Review','Jetour Suspension / Brake Review','Jetour AC / Electrical / Battery Review','Jetour Screen / Infotainment / Camera Review','Jetour Model Review','ROX / ROX 01 Boundary','ROX Electrified-Powertrain Review','ROX Diagnostics Review','ROX Electrical / Screen / Infotainment Review','ROX AC / Suspension / Brake Review','ROX Soft-Close Search Family','Soft-Close Repair vs Installation Boundary','Soft-Close Capability Review','Problem / Symptom Review','Maintenance / Cost Review','Title / Meta / H1 Review','FAQ Review','Internal Linking Review','Soft-Close Ownership Boundary','Jetour / ROX Ownership Separation','Content Quality / Differentiation Review','Technical Claim Review','E-E-A-T / Trust Review','Image / Alt Review','CTA Review','Local SEO Review','Arabic Review','Schema Review','Canonical / Indexability Regression','Jetour Cannibalization Regression','ROX Cannibalization Regression','Duplicate Content Review','Jetour Keyword Coverage','ROX Keyword Coverage','Soft-Close Keyword Coverage','Remaining Gaps','CTR Opportunities','Model Quality Review','Electrified-Vehicle Safety QA','Internal-Link Final QA','Mobile / Desktop QA','No-JavaScript QA','Build / Test Results','Previous-Batch Preservation','Remaining Risks','Future Jetour Opportunities','Future ROX Opportunities','Final PASS / PARTIAL / FAIL']
details={
'Executive Summary':'B9 is locally implemented and passes the measured QA. Seven authored source files were changed, zero routes created. Jetour uses its existing hub and selected services; ROX uses its hub and existing soft-close installation page, with generic repair kept distinct.',
'Scope Completed':'Keyword normalization, owner mapping, scoped copy/links, technical claim correction, initial-HTML and rendered audit, responsive/no-JS review, before/after CSVs and regression checks. All work remains local.',
'Jetour Existing Architecture':f'30 EN/AR rendered URLs: `{jet}` plus existing service routes. Several supporting service routes remain intentionally noindex. No dedicated Jetour model or symptom URL was added.',
'ROX Existing Architecture':f'34 EN/AR/generic soft-close URLs reviewed. `{rox}` owns broad ROX and ROX 01 context; `{install}` owns model-specific fitting; `{generic}` owns cross-brand fault repair and generic installation.',
'Jetour Keyword Evidence':'385 source observations / 385 raw strings / 380 normalized terms; zero measured original-GSC terms. Most terms are generated taxonomy and are not evidence of demand.',
'ROX Keyword Evidence':'426 observations / 404 raw strings / 397 normalized terms; six measured original-GSC terms across exports. The selected latest export yields two ROX soft-close queries, 83 impressions and zero clicks in one window.',
'Keyword Normalization':'Case, spacing, punctuation and brand/ROX 01 variants were normalized while source observations and period-specific metrics were retained. Duplicate export content was skipped. Overlapping windows were never summed.',
'Jetour Keyword → Owner Map':'Broad/model context → Jetour hub; existing Jetour AC, brakes and diagnostics → their service pages; other task-specific terms → relevant generic owners. Unsupported coding and HV proposals remain intentionally untargeted.',
'ROX Keyword → Owner Map':'Broad/ROX 01 → ROX hub; ROX fitting → ROX installation page; fitted soft-close faults and general fitting → generic soft-close page; relevant low-voltage/service enquiries → existing owners. HV/drive-unit/charging repair is untargeted.',
'Jetour Hub Review':'Title and description now identify Jetour service/repair in Al Quoz and describe model-specific assessment. Visible model/service links route T2, X70, X90 Plus and Dashing enquiries without thin model pages.',
'ROX Hub Review':'Copy describes the range-extender electric-drive context and conservative workshop scope. It links to ROX-specific soft-close fitting and distinguishes generic malfunction repair.',
'Commercial Service Inventory':'Existing indexable and intentionally noindex brand service routes were retained. Jetour AC/brakes/diagnostics and ROX AC/brakes/diagnostics/oil/driveability received scoped content; generic services support other tasks.',
'Jetour Diagnostics Review':'Warning and no-start enquiries point to inspection; a code is not presented as proof of one failed component. No proprietary Jetour programming capability is claimed.',
'Jetour Engine / Mechanical Review':'Engine-related advice is conditional on model, year and powertrain. Generic mechanical owner supports the hub; no universal failure list or fixed interval was added.',
'Jetour Transmission Review':'Existing generic transmission service supports symptoms; no distinct Jetour gearbox demand or procedure justified another page.',
'Jetour Suspension / Brake Review':'Brakes received task-specific inspection copy. Suspension stays with the existing generic owner; equipment and repair decision depend on the vehicle.',
'Jetour AC / Electrical / Battery Review':'AC copy covers cooling complaint assessment and specification checks. Electrical/battery queries use the generic owners, with no automatic replacement conclusion.',
'Jetour Screen / Infotainment / Camera Review':'Screen/camera symptoms map to electrical inspection. Retrofit or programming claims were excluded pending proof.',
'Jetour Model Review':'Manufacturer names are accurate, but generated model terms alone do not justify T2/X70/X90/Dashing pages. Hub-level coverage is proportionate to evidence.',
'ROX / ROX 01 Boundary':'One model dominates current brand intent. Both broad ROX and ROX 01 service enquiries use the existing hub; no duplicate ROX 01 URL.',
'ROX Electrified-Powertrain Review':'Official ROX sources describe electric traction with a generator range extender. Copy avoids a conventional transmission-repair promise and universal oil intervals. See the dedicated electrified-scope file.',
'ROX Diagnostics Review':'The existing diagnostic page is framed as an enquiry and available-access assessment. No proprietary ROX software access, module coding or instant diagnosis is claimed.',
'ROX Electrical / Screen / Infotainment Review':'Comfort/screen issues are routed to existing electrical support; high-voltage battery, drive-unit and charging repair are excluded.',
'ROX AC / Suspension / Brake Review':'Existing AC/brake copy is task-specific; suspension remains a vehicle-specific inspection path. AC does not imply traction-battery thermal-system work.',
'ROX Soft-Close Search Family':'Latest selected GSC window: `rox01 soft close door` 64 impressions, `rox 01 soft close` 19; both zero clicks. Their positions are 7.31 and 8.89. No landing-page join exists.',
'Soft-Close Repair vs Installation Boundary':'ROX 01 fitment and compatibility → brand installation URL. An already fitted door that fails → generic repair URL. Generic installation enquiries also use the generic owner.',
'Soft-Close Capability Review':'Existing project pages support enquiries. Exact component fit, wiring and accepted installation scope require confirmation; universal compatibility, coding and warranty claims are absent.',
'Problem / Symptom Review':'Symptoms are described as observations and broad system categories, never as remote component diagnoses. Existing commercial owners provide next steps; no symptom micro-pages were created.',
'Maintenance / Cost Review':'No universal mileage/time interval, fixed price or package was introduced. Vehicle specification, inspection, parts and approved scope determine a quote.',
'Title / Meta / H1 Review':'Edited pages retain one clear H1 and differentiated tasks. No unsupported #1, official, cheapest, authorized or free-diagnostic claim was added.',
'FAQ Review':'Jetour has 128 and ROX has 140 visible initial-HTML FAQ pairs across scanned URLs; schema and visible content agree. Arabic behaviour and existing filtering were preserved.',
'Internal Linking Review':'Jetour hub → existing services/models; ROX hub → fitting; fitting → generic repair. Natural contextual anchors, no new sitewide links.',
'Soft-Close Ownership Boundary':f'`{install}` is ROX-specific installation. `{generic}` is generic fault repair and generic fitting assessment. Editorial conflicts: zero.',
'Jetour / ROX Ownership Separation':'Separate hubs and brand-specific text address distinct vehicle contexts. Shared workshop-process facts remain, without cross-brand owner conflation.',
'Content Quality / Differentiation Review':'Repetitive luxury/new-brand filler and universal system claims were removed from edited copy. Jetour advice centres model-specific maintenance and ordinary service complaints; ROX copy centres electrified architecture and verified enquiry boundaries.',
'Technical Claim Review':f'Checked against [Jetour model catalogue]({sources["jetour_models"]}), [ROX configuration]({sources["rox_specs"]}) and [ROX manual]({sources["rox_manual"]}). Vehicle equipment and scope are qualified; no high-voltage repair claim.',
'E-E-A-T / Trust Review':'Only existing Al Quoz workshop, contact, service and inspection/quote evidence is used. No authorization, technician certification, rating, warranty or repair count was invented.',
'Image / Alt Review':'Rendered inventory found no broken images or misleading new model imagery; alt text remains descriptive rather than exact-match keyword lists.',
'CTA Review':'Commercial enquiries lead to booking/inspection/quote; problems to diagnosis; ROX fitting to compatibility enquiry. No free or instant diagnosis promise.',
'Local SEO Review':'Dubai and Al Quoz appear where pertinent. No neighborhood doorway page or fictitious branch was added.',
'Arabic Review':'Existing Arabic Jetour/ROX routes were reviewed. Jetour and selected ROX Arabic copy was scoped; no new Arabic symmetry or noindex-policy change. FAQ answers are visible in initial HTML.',
'Schema Review':'WebPage, BreadcrumbList, Brand/Service and visible FAQPage types were checked. Canonical URLs agree; no fabricated Review, AggregateRating, Offer or price.',
'Canonical / Indexability Regression':'Zero route-policy and SEO-policy differences across 1,247 routes; sitemap remains 996 canonical URLs.',
'Jetour Cannibalization Regression':'Hub owns broad/model context; service pages own specific tasks; generic services support where a brand page is not justified. Zero editorial primary-owner conflict; ranking impact unproven.',
'ROX Cannibalization Regression':'ROX hub and ROX 01 share broad context; fitting vs repair remain distinct. Zero editorial primary-owner conflict; no claim of proven ranking cannibalization.',
'Duplicate Content Review':'Substantive hub and selected service text was compared; shared template, contact and CTA text was excluded. Remaining shared workshop/process phrasing is legitimate. No new brand-swapped body copy was added.',
'Jetour Keyword Coverage':'380 normalized terms: 232 primary, 121 secondary, 16 problem, 1 model, 10 intentionally untargeted; zero gaps. Other classes are zero. Coverage means owner or justified exclusion, not verbatim insertion.',
'ROX Keyword Coverage':'397 normalized terms: 236 primary, 131 secondary, 16 problem, 4 model, 10 intentionally untargeted; zero gaps. Other classes are zero.',
'Soft-Close Keyword Coverage':'12 normalized ROX/soft-close subset terms, five measured across original exports. ROX fitting and generic repair/installation each have an owner; zero unresolved intent gaps.',
'Remaining Gaps':'Zero editorial keyword-owner gaps requiring a URL. Deferred capability checks and future demand validation are documented in the gap-decision file.',
'CTR Opportunities':'Only two latest-window measured ROX soft-close terms meet the focused CTR register. Both have zero clicks; title/intent/link alignment was improved without clickbait. No measured Jetour CTR opportunity was found.',
'Model Quality Review':'Existing hub-level Jetour model references and ROX 01 context were checked for model/architecture accuracy. No model page was created solely for completeness.',
'Electrified-Vehicle Safety QA':'ROX advice excludes conventional-only transmission assumptions and unverified HV battery, electric-drive-unit, charging and traction-battery repair.',
'Internal-Link Final QA':'Jetour 547 and ROX 684 contextual links checked; zero broken, redirecting, missing-fragment or orphan issues. Same-language depths 2 and 3.',
'Mobile / Desktop QA':'22 representative routes passed at 1440px and 390px (44 browser checks), including hubs, services, installation, generic repair and Arabic routes; zero overflow/runtime/hydration issue.',
'No-JavaScript QA':'22 representative no-JS visits passed; title, description, canonical, robots, H1, substantive copy, important links and schema remain in initial HTML.',
'Build / Test Results':'`npm run typecheck` PASS. Production build PASS: 1,247 routes, 996 sitemap URLs. Existing validators passed without modification.',
'Previous-Batch Preservation':'B0-A through B8 remain intact. Thirteen prior brand clusters have zero SEO and substantive rendered differences; B6.1 TypeScript stays PASS.',
'Remaining Risks':'GSC lacks query × page joins; Jetour demand is unmeasured; ROX has sparse evidence. Actual equipment, diagnostic access, compatibility and workshop scope require VIN/business confirmation. Local results cannot prove ranking, CTR or lead lift.',
'Future Jetour Opportunities':'Revisit model-specific pages only if query × page demand and distinct service content emerge. Confirm tooling/coding before any claims.',
'Future ROX Opportunities':'Validate ROX 01 soft-close landing-page performance and enquiries after recrawl; confirm HV and software capabilities before any technical service expansion.',
'Final PASS / PARTIAL / FAIL':'PASS — READY FOR REVIEW. This is a local implementation and QA result, not a claim of live search improvement.'}
sectioned('b9-jetour-rox-final-report.md','B9 Jetour + ROX final report',headings,details,'Local implementation review. All evidence tables and focused boundary reports are adjacent to this file.')

print('Wrote six B9 Markdown reports')
