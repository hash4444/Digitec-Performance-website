"""Read-only analysis of the page-filtered October 5 GSC export for T1.

Never saves or modifies the source workbook. Keeps the supplied period separate
from historical exports and derives supported-model aliases from the configurator.
"""
from pathlib import Path
import csv
import hashlib
import json
import re
import unicodedata
import warnings

import openpyxl

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
SOURCE = Path(r'C:\Users\ADMIN\Downloads\digitecme.com-Performance-on-Search-2026-10-05.xlsx')
warnings.filterwarnings('ignore', message='Workbook contains no default style')
before_sha256 = hashlib.sha256(SOURCE.read_bytes()).hexdigest()
workbook = openpyxl.load_workbook(SOURCE, read_only=True, data_only=True)
data, inventory = {}, []
for sheet in workbook:
    values = list(sheet.values)
    headers = list(values[0])
    records = [dict(zip(headers, row)) for row in values[1:]]
    data[sheet.title] = records
    inventory.append({'sheet': sheet.title, 'range': f'A1:{openpyxl.utils.get_column_letter(sheet.max_column)}{sheet.max_row}', 'data_rows': len(records), 'columns': headers})
workbook.close()
filters = {row['Filter']: row['Value'] for row in data['Filters']}
date_start = min(row['Date'] for row in data['Chart'])
date_end = max(row['Date'] for row in data['Chart'])
period = f'{date_start} to {date_end} (Last 28 days; Web; page=https://digitecme.com/tuning)'
assert filters['Page'] == 'https://digitecme.com/tuning'

source_text = (ROOT / 'src/data/tuningCars.ts').read_text(encoding='utf-8')
cars = []
car_pattern = re.compile(r"id: '([^']+)',\s+name: '([^']+)',\s+brand: '([^']+)',\s+engine: '([^']+)'", re.S)
for car_id, name, brand, engine in car_pattern.findall(source_text):
    cars.append({'id': car_id, 'model': name, 'brand': brand, 'engine': engine})
assert len(cars) == 16

def norm(text):
    text = unicodedata.normalize('NFKC', text).lower()
    text = re.sub(r'[-–—]', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()

model_aliases = {
    'amg-gt-gts': [r'\bamg\s+gt\b(?!\s*63)', r'\bgts\b', r'\bc190\b', r'\br190\b'],
    'amg-gtc-gtr': [r'\bgtc\b', r'\bgtr\b', r'\bgt\s+[cr]\b'],
    'e63': [r'\be\s*63\b'], 'g63': [r'\bg\s*63\b'],
    'gt63': [r'\bgt\s*63\b'], 's63': [r'\bs\s*63\b'],
    's65': [r'\bs\s*65\b'], 'c63-w205': [r'\bc\s*63\b'],
    'glc63': [r'\bglc\s*63\b'], 'c43': [r'\bc\s*43\b'],
    'c450': [r'\bc\s*450\b'], 'c400': [r'\bc\s*400\b'],
    'cla45': [r'\bcla\s*45\b'], 'a45': [r'\ba\s*45\b'],
    'db11': [r'\bdb\s*11\b'], 'urus': [r'\burus\b'],
}
# Shared engines are matched for extraction, but never assigned to one model.
engine_aliases = [r'\bm\s*178\b', r'\bm\s*177\b', r'\bm\s*279\b', r'\bm\s*276\b', r'\bm\s*133\b']
supported_brand_pattern = r'\b(?:mercedes(?: benz)?|amg|aston martin|lamborghini)\b'
semantic_pattern = r'\btun(?:ing|ning|e|ers?)\b|\bremap(?:ping)?\b|\bstage\s*[1-5]\b|\b(?:ecu|tcu|dme)\b|\bgad\b|\bhorsepower\b|\b(?:performance|power)\b|\bcalibrat\w*\b|\bchip\b|\bupgrade\w*\b|\bprogramming\b'

FIELDS = ['query', 'normalized_query', 'clicks', 'impressions', 'ctr', 'position', 'source_period', 'query_family', 'brand', 'model', 'stage', 'commercial_intent', 'supported_vehicle', 'current_owner', 'recommended_owner', 'action', 'reason']
WRONG_FIELDS = ['query', 'clicks', 'impressions', 'ctr', 'position', 'source_period', 'current_tuning_relevance', 'correct_owner', 'why_tuning_should_not_own', 'potential_mixed_signal_source', 'recommended_correction', 'evidence_status']

def classify(raw):
    query = raw['Top queries']
    q = norm(query)
    brand = ''
    for brand_name, regex in [('Mercedes', r'\bmercedes\b|\bamg\b'), ('BMW', r'\bbmw\b'), ('Audi', r'\baudi\b'), ('Porsche', r'\bporsche\b'), ('Aston Martin', r'\baston martin\b'), ('Lamborghini', r'\blamborghini\b'), ('Ford', r'\bford\b'), ('Mopar', r'\bmopar\b')]:
        if re.search(regex, q):
            brand = brand_name
            break
    matches = [car for car in cars if any(re.search(pattern, q) for pattern in model_aliases[car['id']])]
    model = '; '.join(car['model'] for car in matches)
    if not brand and matches:
        brand = matches[0]['brand']
    stage_match = re.search(r'\bstage\s*([1-5])\b', q)
    stage = f'Stage {stage_match.group(1)}' if stage_match else ''
    families = []
    owner, action = '/tuning', 'STRENGTHEN MASTER OWNER'
    commercial = 'YES'
    supported = 'YES' if brand in {'Mercedes', 'Aston Martin', 'Lamborghini'} or matches else 'NOT SPECIFIED'
    reason = 'Generic performance-calibration service intent belongs to /tuning; exact vehicle support and package scope require configurator/assessment.'
    relevance, why, mixed, evidence = '', '', '', ''

    if re.search(r'\b(?:audio|stereo|sound system|speaker|head unit)\b', q):
        families += ['WRONG OWNER']
        owner, action = '/services/mercedes-audio-upgrade-dubai', 'PRESERVE B1 AUDIO OWNER; REMOVE MIXED TUNING SIGNALS'
        supported, relevance, evidence = 'NOT APPLICABLE', 'None: audio upgrade', 'CONFIRMED WRONG OWNER'
        commercial = 'YES'
        reason = 'The query requests an audio/listening-system upgrade; B1 explicitly assigns it to the existing Mercedes audio-upgrade service owner.'
        why = 'Audio upgrades do not request engine performance calibration.'
        mixed = 'No causal proof in workbook. Baseline /tuning has broad project/upgrade language and shared service navigation; no exact audio-query text found in its source.'
    elif q in {'mercedes ecu', 'ecu reprogramming near me', 'car programming'}:
        families += ['OTHER']
        owner = '/services/mercedes-diagnostics-dubai' if brand == 'Mercedes' else '/services/car-diagnostics-dubai'
        action, commercial = 'REVIEW AMBIGUOUS INTENT; PRESERVE DIAGNOSTICS/CODING OWNER', 'UNCERTAIN'
        supported, relevance, evidence = 'NOT SPECIFIED', 'Ambiguous: ECU/coding request without performance modifier', 'OWNER REVIEW; NOT CONFIRMED WRONG OWNER'
        reason = 'A generic ECU/programming request can mean diagnosis, factory reprogramming or coding. B1/G1 diagnostics owners handle those tasks; this export does not prove a tuning intent.'
        why = 'No performance gain, remap or tuning modifier establishes a calibration request; do not optimize tuning for general coding.'
        mixed = 'The baseline tuning page explicitly separates diagnostics/coding and links its diagnostics owner. A link is a supporting relationship, not proof of cannibalization.'
    elif brand in {'BMW', 'Audi'}:
        families += [f'UNSUPPORTED {brand.upper()}']
        owner, action, supported = '', 'DO NOT TARGET; CORRECT POSITIVE TUNING CLAIMS', 'NO'
        relevance, evidence = f'Unsupported {brand} tuning', 'EXPLICIT BUSINESS EXCLUSION'
        reason = f'{brand} tuning is explicitly excluded by T1 regardless of historical/GSC demand. Retain unrelated {brand} workshop/service owners.'
        why = f'DIGI-TEC must not target {brand} performance tuning under T1.'
        mixed = 'Baseline /tuning FAQ positively named BMW and Audi as tuning platforms. This is verified copy evidence, although ranking causation is not proved.'
    elif brand in {'Porsche', 'Ford', 'Mopar'}:
        families += ['BRAND TUNING']
        supported = 'UNVERIFIED'
        owner, action = '/tuning (after verified vehicle/package support)', 'VERIFY SUPPORT; DO NOT INVENT CONFIGURATIONS'
        relevance, evidence = f'Tuning intent; {brand} configuration absent from source dataset', 'UNVERIFIED CONFIGURATOR COVERAGE'
        if brand == 'Porsche':
            supported = 'YES — business support confirmed by user; configurations pending'
            owner, action = '/tuning', 'RETAIN MASTER TUNING OWNER; AWAIT CURRENT PORSCHE CONFIGURATION LIST'
            evidence = 'USER-CONFIRMED BUSINESS SUPPORT; CONFIGURATOR DATA PENDING'
            relevance = ''
            reason = 'The user confirmed a separate current Porsche tuning list exists and will provide it later. Retain Porsche brand tuning demand on /tuning; no Porsche model, engine, stage, price or output may be invented before that list is supplied.'
        else:
            reason = f'{brand} is absent from the configurator. No separate verified tuning support is supplied; do not target this brand from a GSC query alone.'
        why = 'Porsche belongs to tuning after user confirmation; only its configuration-specific targeting is pending supplied data.' if brand == 'Porsche' else 'The query has tuning intent, but a query impression does not verify the business tunes this vehicle.'
        mixed = 'Baseline copy used broad other-platform wording. Porsche is named positively, but no Porsche configurator package could be extracted; Ford/Mopar are not in that dataset.'
    elif re.search(r'\b(?:course|courses|training|device)\b', q) or 'ahmad rajabli' in q:
        families += ['WRONG OWNER', 'INFORMATIONAL']
        owner, action, commercial, supported = '', 'DO NOT TARGET AS WORKSHOP TUNING SERVICE', 'NO', 'NOT APPLICABLE'
        relevance, evidence = 'Tuning vocabulary with a different task', 'CONFIRMED NON-SERVICE INTENT'
        reason = 'The query requests training, a retail device or a named foreign-location business; no matching DIGI-TEC service owner/capability is verified.'
        why = 'Commercial vehicle-calibration content cannot satisfy a course/device purchase or another business/location request.'
        mixed = 'Keyword overlap only. No causal source or course/device/foreign-shop claim is verified on /tuning.'
    elif q in {'ok', 'in dubai', 'نعم', 'both'}:
        families += ['OTHER']
        owner, action, commercial, supported = '', 'RETAIN SOURCE RECORD; NO SEO TARGET', 'UNCERTAIN', 'NOT APPLICABLE'
        reason = 'The visible page-filtered query has too little context to establish a meaningful service intent; do not infer a tuning keyword from its page association.'
    elif q in {'digi tec', 'digi tec', 'digitec performance center'}:
        families += ['OTHER']
        owner, action, commercial, supported = '/', 'PRESERVE COMPANY NAVIGATION OWNER', 'NAVIGATIONAL', 'NOT APPLICABLE'
        reason = 'General company navigation belongs to the homepage. A tuning landing impression does not turn the company name into a generic tuning target.'
    elif q in {'y eso cuanto cuesta', 'how much would it cost?'}:
        families += ['PRICE / COST']
        commercial, supported, action = 'UNCERTAIN', 'NOT SPECIFIED', 'REVIEW CONTEXT; USE CONFIGURATION-SPECIFIC PRICES ONLY'
        reason = 'The page filter supplies tuning context but the query itself does not name a service/model. Retain as an ambiguous cost observation; never infer a universal price.'
    elif q == 'what about stage 2':
        families += ['STAGE 2', 'INFORMATIONAL']
        commercial = 'UNCERTAIN'
        action = 'EXPLAIN VEHICLE-SPECIFIC STAGE SCOPE ON MASTER OWNER'
        reason = 'This short informational stage fragment is associated with /tuning, but its vehicle and commercial context are not specified. Stage definitions must remain configuration-specific.'
    elif q == 'dyno tuning near me':
        families += ['GENERIC TUNING']
        supported, action = 'UNVERIFIED', 'VERIFY DYNO SERVICE BEFORE TARGETING'
        reason = 'Measured tuning demand is real, but the configurator proves packages, not a dyno facility/service. Do not infer dyno availability.'
    elif q in {'car code performance', 'auto upgrades', 'local performance shop', 'performance engine solutions', 'tuning tech', 'year one tuning'}:
        families += ['OTHER']
        commercial, action = 'UNCERTAIN', 'REVIEW AMBIGUOUS SEMANTIC OR BUSINESS INTENT'
        reason = 'The wording can refer to a business name, general modifications or engine services. Keep the observed tuning association but do not assume a specific supported calibration task.'

    if 'WRONG OWNER' not in families and not any(f.startswith('UNSUPPORTED ') for f in families) and q not in {'mercedes ecu', 'ecu reprogramming near me', 'car programming'}:
        if 'gad' in q:
            families += ['GAD MOTORS']
            reason = 'GAD/Mercedes performance intent supports the verified relationship on /tuning. Relationship wording must stay within existing business evidence.'
        if model:
            families += ['MODEL TUNING']
        elif brand in {'Mercedes', 'Aston Martin', 'Lamborghini'} and re.search(semantic_pattern, q) and q != 'mercedes ecu':
            families += ['BRAND TUNING']
        if stage:
            families += [stage.upper()]
        if re.search(r'\b(?:gearbox|tcu|transmission)\b', q):
            families += ['GEARBOX / TCU TUNING']
            reason = 'TCU/transmission software work is verified only in named configurator packages; /tuning can explain those limits without implying every ECU package includes TCU work.'
        elif 'remap' in q:
            families += ['ECU REMAP']
        elif 'chip' in q:
            families += ['CHIP TUNING']
            reason = 'Use chip-tuning wording naturally for supported software calibration; do not imply physical chip replacement.'
        elif 'ecu' in q or 'calibration' in q or 'dme' in q:
            families += ['ECU TUNING']
        elif 'engine' in q and re.search(r'\btun', q):
            families += ['ENGINE TUNING']
        elif re.search(r'\btun(?:ing|ning|e|ers?)\b', q) and not families:
            families += ['GENERIC TUNING']
        if re.search(r'\b(?:price|cost|cuanto cuesta)\b', q):
            families += ['PRICE / COST']
        if re.search(r'\bnear me\b|\blocal\b|\bdubai\b|\buae\b', q):
            families += ['NEAR ME / LOCAL']
        if re.search(r'\b(?:horsepower|hp|power upgrade)\b', q):
            families += ['HORSEPOWER / POWER']
        if re.search(r'\b(?:hardware|package|downpipe|turbocharger|exhaust|airfilter)\b', q):
            families += ['PACKAGE / HARDWARE']
        if q.startswith(('what ', 'how ', 'why ')):
            families += ['INFORMATIONAL']
    families = list(dict.fromkeys(families)) or ['OTHER']
    row = {'query': query, 'normalized_query': q, 'clicks': raw['Clicks'], 'impressions': raw['Impressions'], 'ctr': raw['CTR'], 'position': raw['Position'], 'source_period': period, 'query_family': '; '.join(families), 'brand': brand, 'model': model, 'stage': stage, 'commercial_intent': commercial, 'supported_vehicle': supported, 'current_owner': '/tuning', 'recommended_owner': owner, 'action': action, 'reason': reason}
    wrong = None
    if relevance:
        wrong = {'query': query, 'clicks': raw['Clicks'], 'impressions': raw['Impressions'], 'ctr': raw['CTR'], 'position': raw['Position'], 'source_period': period, 'current_tuning_relevance': relevance, 'correct_owner': owner, 'why_tuning_should_not_own': why, 'potential_mixed_signal_source': mixed, 'recommended_correction': action + '. ' + reason, 'evidence_status': evidence}
    return row, wrong

rows, wrong_rows = [], []
for raw in data['Queries']:
    row, wrong = classify(raw)
    rows.append(row)
    if wrong:
        wrong_rows.append(wrong)

def csv_write(path, fields, rows):
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)

csv_write(OUT / 'tuning-gsc-query-register.csv', FIELDS, rows)
csv_write(OUT / 'tuning-wrong-owner-queries.csv', WRONG_FIELDS, wrong_rows)

generic_terms = ['car tuning Dubai', 'performance tuning Dubai', 'car tuning near me', 'performance tuning near me', 'ECU tuning Dubai', 'ECU tuning near me', 'ECU remap Dubai', 'ECU remap near me', 'chip tuning Dubai', 'chip tuning near me', 'engine performance tuning', 'performance car tuning', 'luxury car tuning', 'supercar tuning', 'GAD Motors', 'GAD tuning', 'Stage 1 tuning', 'Stage 2 tuning', 'general tuning price/cost']
generic_records = []
for term in generic_terms:
    if term == 'general tuning price/cost':
        hits = [row for row in rows if 'PRICE / COST' in row['query_family']]
        scope = 'Ambiguous generic cost fragments only; no explicit tuning price/cost query'
    elif term in {'Stage 1 tuning', 'Stage 2 tuning'}:
        number = term.split()[1]
        hits = [row for row in rows if row['stage'] == f'Stage {number}']
        scope = 'Observed stage family; query wording retained'
    else:
        hits = [row for row in rows if row['normalized_query'] == norm(term)]
        scope = 'Exact observed query' if hits else 'No exact query row; coverage opportunity, not measured zero demand'
    generic_records.append({'term': term, 'owner': '/tuning', 'observed_queries': '; '.join(row['query'] for row in hits), 'clicks': sum(row['clicks'] for row in hits) if hits else '', 'impressions': sum(row['impressions'] for row in hits) if hits else '', 'best_position': min((row['position'] for row in hits), default=''), 'source_period': period, 'evidence_scope': scope, 'content_direction': 'Use exact supported vehicle/stage/package prices in original currency; no universal cost.' if term == 'general tuning price/cost' else 'Explain verified GAD Motors relationship without extra partnership/certification claims.' if 'GAD' in term else 'Define stage as vehicle/engine/hardware-specific; do not create stage URL.' if term.startswith('Stage ') else 'Retain substantive generic calibration coverage on master /tuning; no competing generic URL.'})
csv_write(OUT / 'tuning-master-generic-ownership-assessment.csv', list(generic_records[0]), generic_records)

totals = {name: {'rows': len(records), 'clicks': sum(row.get('Clicks', 0) or 0 for row in records), 'impressions': sum(row.get('Impressions', 0) or 0 for row in records)} for name, records in data.items() if name != 'Filters'}
evidence = []
for car in cars:
    hits = [row for row in rows if any(re.search(pattern, row['normalized_query']) for pattern in model_aliases[car['id']])]
    evidence.append({**car, 'source_period': period, 'query_scope': 'page-filtered /tuning queries; no sitewide model-demand export supplied', 'gsc_queries': '; '.join(row['query'] for row in hits), 'gsc_impressions': sum(row['impressions'] for row in hits), 'gsc_clicks': sum(row['clicks'] for row in hits), 'best_position': min((row['position'] for row in hits), default=''), 'measurement_note': 'No model-specific query row in this export is not proof of zero sitewide demand.' if not hits else 'Same-period model-specific visible query rows only.'})
(OUT / 'tuning-model-gsc-evidence.json').write_text(json.dumps(evidence, indent=2, ensure_ascii=False), encoding='utf-8')
csv_write(OUT / 'tuning-model-gsc-evidence.csv', list(evidence[0]), evidence)
coverage = {
    'source_file': SOURCE.name, 'source_sha256': before_sha256,
    'filters': filters, 'chart_period': {'start': date_start, 'end': date_end},
    'sheets': inventory, 'sheet_totals': totals,
    'query_rows_preserved': len(rows),
    'strict_semantic_or_configurator_matches': sum(bool(re.search(semantic_pattern, row['normalized_query']) or re.search(supported_brand_pattern, row['normalized_query']) or any(re.search(p, row['normalized_query']) for p in engine_aliases) or row['model']) for row in rows),
    'wrong_owner_review_rows': len(wrong_rows),
    'configuration_models': cars,
    'query_register_families_are_multi_label': True,
    'historical_periods_combined': False,
    'no_source_workbook_write': True,
    'data': data,
}
(OUT / 'tuning-gsc-workbook-data.json').write_text(json.dumps(coverage, indent=2, ensure_ascii=False), encoding='utf-8')
assert before_sha256 == hashlib.sha256(SOURCE.read_bytes()).hexdigest()
assert len(rows) == len(data['Queries']) == 113
assert not any(row['model'] for row in rows)
with (OUT / 'tuning-gsc-query-register.csv').open(encoding='utf-8-sig', newline='') as stream:
    saved = csv.DictReader(stream)
    assert saved.fieldnames == FIELDS
    saved_rows = list(saved)
for original, saved_row in zip(data['Queries'], saved_rows):
    assert original['Top queries'] == saved_row['query']
    for input_name, output_name in [('Clicks', 'clicks'), ('Impressions', 'impressions'), ('CTR', 'ctr'), ('Position', 'position')]:
        assert float(original[input_name]) == float(saved_row[output_name])
audio = [row for row in rows if row['recommended_owner'] == '/services/mercedes-audio-upgrade-dubai']
bmw = [row for row in rows if row['brand'] == 'BMW']
porsche = [row for row in rows if row['brand'] == 'Porsche']
mercedes = [row for row in rows if row['brand'] == 'Mercedes' and 'BRAND TUNING' in row['query_family']]
gad = [row for row in rows if 'GAD MOTORS' in row['query_family']]
summary = {'rows':len(rows), 'totals':totals, 'audio':{'rows':len(audio), 'impressions':sum(r['impressions'] for r in audio)}, 'bmw':{'rows':len(bmw),'impressions':sum(r['impressions'] for r in bmw)}, 'porsche':{'rows':len(porsche),'impressions':sum(r['impressions'] for r in porsche)}, 'mercedes_brand_tuning':{'rows':len(mercedes),'impressions':sum(r['impressions'] for r in mercedes)}, 'gad':{'rows':len(gad),'impressions':sum(r['impressions'] for r in gad)}, 'wrong_owner_rows':len(wrong_rows), 'supported_model_queries':0}

table = '\n'.join(f"| {item['sheet']} | {item['range']} | {item['data_rows']} | {totals.get(item['sheet'], {}).get('clicks', '—'):g} | {totals.get(item['sheet'], {}).get('impressions', '—'):g} |" if item['sheet'] != 'Filters' else f"| Filters | {item['range']} | {item['data_rows']} | — | — |" for item in inventory)
report = f'''# T1 Search Console workbook scope

Source: `{SOURCE.name}`. Read-only source SHA-256: `{before_sha256}`. Analysis date: 2026-10-05 (Asia/Dubai). The source was not modified; the hash was verified after extraction.

The Filters tab states Search type **Web**, Date **Last 28 days**, and Page **https://digitecme.com/tuning** (`Filters!A2:B4`). The 28 Chart dates span **{date_start} to {date_end}**, inclusive (`Chart!A2:A29`). The filename export date is not the measurement period. No country or device filter is recorded. No earlier workbook period is combined with this one.

All seven tabs were inspected, including the empty Search appearance table. The Pages tab contains only /tuning (`Pages!A2:E2`). The explicit exact-page filter supports recording `/tuning` as the observed landing page for these query rows. This is page-associated query evidence, not proof that /tuning is the correct editorial owner, nor evidence of other URLs' rankings. This workbook cannot support a sitewide query × multi-page cannibalization comparison.

| Sheet | Inspected range | Data rows | Visible clicks | Visible impressions |
| --- | --- | ---: | ---: | ---: |
{table}

Chart and Pages agree at **11 clicks and 991 impressions**. Queries, Countries and Devices each total **1 click and 627 impressions**. The **10-click/364-impression** gap is unreconciled in the supplied workbook. Query privacy/aggregation can affect visible query totals, but that alone does not explain the lower Devices and Countries totals. No export-state, additional-filter or omission cause is established. Preserve each tab's metrics independently and do not invent missing rows or treat visible-query totals as page totals. Chart's 2026-10-01 row has 1 click/326 impressions, but the workbook does not allocate that day's impressions to particular query, device or country rows.

The UAE row records **1 click, 604 impressions, CTR 0.0017, position 27.15** (`Countries!A2:E2`). Mobile records **1 click/234 impressions/position 21.25** and Desktop **0 clicks/393 impressions/position 30.13** (`Devices!A2:E3`). No Tablet row exists. Search appearance has headers only; this is absence of visible rows, not proof that no rich-result impressions occurred.

The query register deliberately preserves **all 113 observed /tuning query rows**. Broad matching covers tuning/tunning/tune/tuners, ECU/DME/calibration/programming, remap, stages, GAD, performance/power, upgrades, supported brands/models/engines and variants. Remaining rows are retained as navigation, cost fragments or uninformative observations so the wrong-owner review is complete. No query is silently discarded. Original query text and the workbook's clicks, impressions, CTR and position are preserved. CTR is a decimal ratio (0.0385 means 3.85%). Query families are semicolon-separated multi-label classifications; family totals must not be added together.

The three Mercedes audio-upgrade queries total **{summary['audio']['impressions']:g} impressions and 0 clicks**: E-Class audio upgrade 50/position 49.82, stereo upgrade 47/50.26, and sound-system upgrade 3/54. Their verified B1 editorial owner is `/services/mercedes-audio-upgrade-dubai` (`b1-mercedes-ownership-map.md`, Audio upgrades). Their current /tuning association is measured; the reason for that association is unproved. General ECU/programming fragments are flagged for intent review against the established diagnostics/coding owners, not asserted as proven repair searches. Unsupported BMW, unverified Ford/Mopar coverage and training/device requests remain clearly distinguished in the wrong-owner CSV's `evidence_status` column. Porsche is kept with `/tuning` after the user's business-support confirmation and is not labelled a wrong-owner query.

The two BMW tuning queries total **5 impressions and 0 clicks**: near me 4/position 13, Dubai 1/66. T1 explicitly excludes BMW tuning. No Audi query appears in this export; that does not prove zero demand. Neither brand is eligible for T1 tuning SEO.

Porsche tuning queries total **12 impressions and 0 clicks**: performance tuning Dubai 7/position 4.57 and tuning Dubai 5/17. The user confirmed that a separate current Porsche tuning list exists and will provide it later. Porsche support is therefore **YES — business support confirmed by user; configurations pending**, and its brand tuning owner remains `/tuning`. The repository configurator contains 16 entries (14 Mercedes, Aston Martin DB11, Lamborghini Urus) and **no Porsche entry**. The source dataset and user confirmation have different scopes: business support is confirmed, but specific Porsche models/engines/stages/prices/outputs remain unextracted pending that list. Do not fabricate them. Preserve B2 repair/service architecture.

**No model-specific query row** matches any of the 16 current configurator entries. No supported engine code (M178, M177, M279, M276, M133) is present. Broad Mercedes/AMG demand is brand evidence and must not be assigned to individual models. `tuning-model-gsc-evidence.csv` and `.json` record the zero visible matched rows for every configurator entry, with the same page-filtered scope. These zeros do not establish zero sitewide model demand. Model-page decisions may use exceptional factual configurator depth, but must not claim model-specific GSC demand from this workbook.

Existing owners used in this review: G1 `/tuning` for commercial performance tuning; B1 `/services/mercedes-audio-upgrade-dubai` for audio upgrades and `/services/mercedes-diagnostics-dubai` for supported diagnostic/coding tasks; G1 `/services/car-diagnostics-dubai` for generic coding/programming. Company navigation remains `/`. No unrelated B1–B9, G1–G4 service ownership changes are proposed by these exports.

The Step 10 minimum generic terms are all assessed in `tuning-master-generic-ownership-assessment.csv`. Missing exact terms are retained as coverage opportunities without invented metrics. Stage 1/2 records use observed same-period family queries and cost uses two ambiguous fragments; these are explicitly labelled. Each term remains with the master `/tuning`, including generic ECU/remap/chip/local/GAD/stage/cost intent. No independent generic competing pages are justified by this export.

Outputs: `tuning-gsc-query-register.csv` (exact requested 17 columns), `tuning-wrong-owner-queries.csv` (metrics, relevance, correct owner, mixed-signal evidence, correction, evidence status), `tuning-model-gsc-evidence.csv/.json` (one row per current configurator entry), `tuning-master-generic-ownership-assessment.csv` (all Step 10 terms), and `tuning-gsc-workbook-data.json` (all-tab evidence with source ranges/totals). Re-run `analyze-tuning-gsc.py` with the bundled Python runtime to reproduce the extraction. No source workbook changes or overlapping-period sums are performed.
'''
(OUT / 'tuning-gsc-workbook-scope.md').write_text(report, encoding='utf-8')
print(json.dumps(summary, indent=2))
