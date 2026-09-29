"""B7 Cadillac keyword observations and pre-edit editorial owners."""
import csv, hashlib, json, re
from collections import Counter, defaultdict
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/b7'
DOWNLOADS = Path('C:/Users/ADMIN/Downloads')
WORKBOOK = DOWNLOADS / 'DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx'
PAGES = {p['path']: p for p in json.loads((OUT/'pages-baseline.json').read_text(encoding='utf-8'))}
HUB = '/brands/cadillac-service-dubai'
CUE = '/services/cadillac-cue-screen-repair-dubai'
GUIDE = '/blog/cadillac-best-workshop-dubai'

def norm(value):
    s = str(value or '').casefold().strip()
    s = re.sub(r'\btouch[ -]?screen\b', 'touchscreen', s)
    s = re.sub(r'\b(caddilac|cadilac)\b', 'cadillac', s)
    s = re.sub(r'\bservicing\b', 'service', s)
    s = re.sub(r'\brepairs\b', 'repair', s)
    s = re.sub(r'\s+', ' ', s)
    return s

def owner(keyword):
    k = norm(keyword)
    if re.search(r'\b(abu dhabi|sharjah|ajman|al ain)\b', k):
        return '', '', 'Out-of-market', 'Outside Dubai; no location doorway'
    if re.search(r'\b(high.voltage|hv battery|battery pack repair|inverter repair|coding|programming|retrofit|upgrade|remap)\b', k):
        return '', '', 'Unverified service', 'Exact Cadillac capability has not been verified'
    if re.search(r'\b(cue|touchscreen|ghost touch|screen|display|infotainment|head unit|headunit|delaminat)\b', k):
        if re.search(r'\b(reverse camera|rear camera|backup camera)\b', k):
            return '/services/auto-electrical-repair-dubai', CUE, 'Camera fault', 'Camera and signal diagnosis is distinct from CUE display repair'
        if re.search(r'\b(head unit|headunit|module)\b', k) and not re.search(r'\b(cue|touchscreen)\b', k):
            return '/services/head-unit-repair-dubai', CUE, 'Head-unit fault', 'Generic head-unit owner; CUE page supports Cadillac screen triage'
        return CUE, '/services/auto-electrical-repair-dubai', 'CUE/touchscreen assessment', 'Existing dedicated CUE owner covers fault-led repair and supported replacement after diagnosis'
    if re.search(r'\b(reverse camera|rear camera|backup camera)\b', k):
        return '/services/auto-electrical-repair-dubai', CUE, 'Camera fault', 'Assess camera, wiring and display path before parts choice'
    if re.search(r'\b(best|top|choose|choosing)\b', k) and re.search(r'\b(workshop|garage|specialist|mechanic)\b', k):
        return GUIDE, HUB, 'Workshop selection', 'Existing selection guide has a distinct comparison task'
    if re.search(r'\b(lyriq|optiq|celestiq|escalade iq)\b', k) and re.search(r'\b(oil|spark plug|turbo|engine repair)\b', k):
        return '', '', 'Inapplicable EV task', 'Combustion service does not apply to electric propulsion'
    if re.search(r'\b(escalade|esv|ct4|ct5|ct6|xt4|xt5|xt6|ats|cts|xts|srx|lyriq|optiq|celestiq)\b', k) and not re.search(r'\b(ac|brake|suspension|transmission|gearbox|diagnos|oil|battery|engine|electrical|screen|cue|service cost|interval|maintenance schedule)\b', k):
        return HUB, '', 'Model enquiry', 'Existing Cadillac hub model section; no thin model route justified'
    if re.search(r'\b(maintenance schedule|service interval|service cost|repair cost|how often)\b', k):
        return HUB, GUIDE, 'Maintenance/cost planning', 'Hub section can explain variable scope without fixed interval or price'
    services = [
        (r'\b(diagnos\w*|fault code|warning light|scan)\b','engine-diagnostics','Diagnostics'),
        (r'\b(air conditioning|ac repair|a/c|climate control|condenser)\b','ac-repair','AC'),
        (r'\b(oil change|oil service|engine oil)\b','oil-change','Oil service'),
        (r'\b(brake|abs)\b','brake-repair','Brakes'),
        (r'\b(gearbox|transmission|shifting|jerking)\b','transmission-repair','Transmission'),
        (r'\b(suspension|air spring|ride height|magnetic ride|damper|shock absorber)\b','suspension-repair','Suspension'),
        (r'\b(battery|charging|no.start|won.t start)\b','battery-replacement','Battery/no-start'),
        (r'\b(electrical|wiring|module|sensor)\b','electrical-repair','Electrical'),
        (r'\b(engine|mechanical|cooling|coolant|overheat|radiator)\b','mechanical-repair','Mechanical/cooling'),
        (r'\b(body|bumper|paint repair|dent)\b','body-repair','Body repair'),
    ]
    for pattern, slug, label in services:
        if re.search(pattern, k):
            brand = f'{HUB}/{slug}'
            if brand in PAGES and not PAGES[brand]['seo'].get('noindex'):
                return brand, HUB, label, 'Indexable brand service owner'
            generic = {'transmission-repair':'/services/transmission-repair-dubai','suspension-repair':'/services/suspension-repair-dubai','battery-replacement':'/services/battery-replacement-dubai','electrical-repair':'/services/auto-electrical-repair-dubai','mechanical-repair':'/services/mechanical-repair-dubai','body-repair':'/services/car-body-repair-dubai'}.get(slug, HUB)
            if generic not in PAGES: generic = HUB
            return generic, brand if brand in PAGES else HUB, label, 'Existing Cadillac route is intentionally noindex; indexable generic or hub owner'
    return HUB, '', 'Broad Cadillac service', 'Existing Cadillac hub owns broad service and repair enquiry'

records = []
def add(keyword, source, source_file, source_period, evidence, metrics=('',)*4, context=''):
    if not keyword: return
    primary, support, cluster, reason = owner(keyword)
    if primary and primary not in PAGES: raise ValueError(f'Absent primary owner {primary} for {keyword}')
    values = [v if v is not None else '' for v in metrics]
    records.append(dict(raw_keyword=str(keyword), normalized_keyword=norm(keyword), brand='Cadillac', source=source, source_file=source_file, source_period=source_period, measured_or_generated=evidence, gsc_clicks=values[0], gsc_impressions=values[1], gsc_ctr=values[2], gsc_position=values[3], search_intent=cluster, cluster=cluster, primary_owner=primary, supporting_owner=support, reason=reason, context=context))

book = openpyxl.load_workbook(WORKBOOK, read_only=True, data_only=True)
for n, row in enumerate(book['Master Keywords'].values, 1):
    if n == 1 or row[1] != 'Cadillac': continue
    evidence = 'MEASURED WORKBOOK' if row[7] == 'Existing GSC query' else 'GENERATED TAXONOMY' if row[7] == 'Generated taxonomy' else 'RESEARCH KEYWORD'
    add(row[0], f'Master Keywords!A{n}', WORKBOOK.name, '2026-04-12 to 2026-09-25' if evidence == 'MEASURED WORKBOOK' else '', evidence, row[8:12], str(row[2]))
for n, row in enumerate(book['GSC Opportunities'].values, 1):
    if n > 1 and row[1] == 'Cadillac': add(row[0], f'GSC Opportunities!A{n}', WORKBOOK.name, '2026-04-12 to 2026-09-25', 'MEASURED WORKBOOK', row[2:6], 'Workbook opportunity copy')
for n, row in enumerate(book['Brand Specific Systems'].values, 1):
    if n > 1 and row[0] == 'Cadillac': add(f'Cadillac {row[1]}', f'Brand Specific Systems!B{n}', WORKBOOK.name, '', 'RESEARCH KEYWORD', context='System suggestion')
for n, term in enumerate(['Cadillac CUE ghost touch Dubai','Cadillac CUE black screen Dubai','Cadillac infotainment upgrade Dubai','Cadillac reverse camera fault Dubai','Escalade service Dubai','Cadillac Lyriq service Dubai'], 1):
    add(term, f'B7 brief example #{n}', 'B7 user brief', '', 'OTHER SOURCE — USER BRIEF EXAMPLE')

seen_hashes = set()
duplicate_exports = []
for file in sorted(DOWNLOADS.glob('digitecme.com-Performance-on-Search-2026-09-*.xlsx')):
    digest = hashlib.sha256(file.read_bytes()).hexdigest()
    if digest in seen_hashes:
        duplicate_exports.append(file.name)
        continue
    seen_hashes.add(digest)
    export = openpyxl.load_workbook(file, read_only=True, data_only=True)
    if 'Queries' not in export: continue
    dates = [str(r[0])[:10] for r in list(export['Chart'].values)[1:] if r and r[0]] if 'Chart' in export else []
    period = f'{dates[0]} to {dates[-1]}' if dates else ''
    for n, row in enumerate(export['Queries'].values, 1):
        if n > 1 and row and re.search(r'\b(cadillac|caddilac|cadilac|cue)\b', str(row[0]), re.I):
            add(row[0], f'Queries!A{n}', file.name, period, 'MEASURED ORIGINAL GSC', row[1:5], 'Query-only GSC; no landing-page join')

with (OUT/'cadillac-keyword-owner-records.csv').open('w', encoding='utf-8-sig', newline='') as f:
    writer = csv.DictWriter(f, fieldnames=list(records[0])); writer.writeheader(); writer.writerows(records)
(OUT/'cadillac-keyword-owner-records.json').write_text(json.dumps(records, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
groups = defaultdict(list)
for item in records: groups[item['normalized_keyword']].append(item)
conflicts = {term: sorted({v['primary_owner'] for v in rows}) for term, rows in groups.items() if len({v['primary_owner'] for v in rows}) > 1}
summary = {'source_observations':len(records), 'raw_keyword_strings':len({r['raw_keyword'] for r in records}), 'normalized_terms':len(groups), 'measured_original_gsc_terms':len({r['normalized_keyword'] for r in records if r['measured_or_generated']=='MEASURED ORIGINAL GSC'}), 'duplicate_export_files_skipped':duplicate_exports, 'owner_conflicts':conflicts, 'owner_observations':dict(Counter(r['primary_owner'] or 'NOT TARGETED' for r in records))}
(OUT/'keyword-summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
owner_counts = Counter(r['primary_owner'] or 'NOT TARGETED' for r in records)
lines = ['# B7 Cadillac pre-edit keyword → owner map', '', 'Editorial ownership only: GSC exports contain queries without landing-page joins. Workbook copies and overlapping GSC exports are observations, not additive demand.', '', '| Owner | Observations | Primary intent |', '|---|---:|---|']
for url, count in owner_counts.most_common():
    lines.append(f'| {url} | {count} | '+('Unverified/out-of-market/inapplicable' if not url else 'See observation CSV for term-level intent')+' |')
lines += ['', '## CUE boundary', '', f'- CUE screen, ghost touch, black/frozen screen, and compatible repair/replacement: `{CUE}`.', '- Electrical and camera supply faults: `/services/auto-electrical-repair-dubai`; CUE is supporting context when its display is involved.', '- General head-unit/module faults: `/services/head-unit-repair-dubai`; CUE is supporting context for Cadillac-specific triage.', '- Functioning-system upgrades/retrofits: no editorial owner until business capability is verified.', '- Screen repair and replacement share one CUE URL; the component choice follows diagnosis.', '', '## Evidence and policy', '', f'- {summary["source_observations"]} source observations, {summary["normalized_terms"]} normalized terms, {summary["measured_original_gsc_terms"]} original-GSC terms.', f'- Duplicate export copies skipped: {len(duplicate_exports)}. No GSC periods are summed.', f'- Primary-owner conflicts: {len(conflicts)}.', '- Existing Cadillac brand-service noindex decisions remain unchanged; an indexable generic owner or the hub covers relevant search intent.', '- No new URL is justified before implementation.']
(OUT/'cadillac-keyword-owner-map.md').write_text('\n'.join(lines)+'\n', encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k not in ('owner_observations','duplicate_export_files_skipped')}, indent=2))
