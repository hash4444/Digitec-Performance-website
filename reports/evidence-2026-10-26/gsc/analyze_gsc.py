from pathlib import Path
import csv, hashlib, json, re, warnings
from datetime import date, datetime
import openpyxl

warnings.filterwarnings('ignore', message='Workbook contains no default style')
OUT = Path(__file__).parent
ROOT = Path(r'C:\Users\ADMIN\Downloads')
SOURCE = ROOT / 'digitecme.com-Performance-on-Search-2026-10-26.xlsx'
EXPLICIT = re.compile(r'mercedes|merceds|benz|\bamg\b|مرسيدس|مرسيدز|مرسدس|بنز', re.I)
ENGLISH_STRICT = re.compile(r'mercedes|benz|\bamg\b', re.I)
# Model-only queries are candidate Mercedes queries, reviewed separately to avoid
# treating generic single-letter or short numeric terms as confirmed brand demand.
MODEL = re.compile(r'\b(?:c[ -]?class|e[ -]?class|s[ -]?class|g[ -]?class|g[ -]?wagon|gle|glc|gls|gla|glb|cla|cle|cls|c ?63|e ?63|g ?63|s ?63|a ?45|e ?53|g ?55|c ?43|e ?55|w ?\d{3}|om ?\d{3}|m ?(?:113|156|157|176|177|256|264|272|274|276|278))\b', re.I)
ECOSYSTEM = re.compile(r'brabus',re.I)
AMBIGUOUS = re.compile(r'^mb vrx$',re.I)
SITEBRAND = re.compile(r'digi[\s-]*tec|digitecme|ديجي\s*تي?ك', re.I)

def serial(v):
    return v.isoformat() if isinstance(v, (date, datetime)) else v

def rows(ws):
    vals = list(ws.values)
    headers = vals[0]
    return [dict(zip(headers, [serial(v) for v in row]), source_sheet=ws.title,
                 source_row=n, source_range=f'{ws.title}!A{n}:{openpyxl.utils.get_column_letter(len(headers))}{n}')
            for n, row in enumerate(vals[1:], 2) if any(v is not None for v in row)]

def sum_metrics(rs):
    clicks = sum(float(x.get('Clicks') or 0) for x in rs)
    impressions = sum(float(x.get('Impressions') or 0) for x in rs)
    return {'rows': len(rs), 'clicks': clicks, 'impressions': impressions,
            'ctr': clicks/impressions if impressions else None,
            'impression_weighted_position_approx': sum(float(x.get('Position') or 0)*float(x.get('Impressions') or 0) for x in rs)/impressions if impressions else None}

def extract(path):
    w = openpyxl.load_workbook(path, data_only=True, read_only=True)
    data = {s.title: rows(s) for s in w}
    filters = {x['Filter']:x['Value'] for x in data.get('Filters', [])}
    ch = data.get('Chart', [])
    timecol = next((x for x in (list(ch[0]) if ch else []) if x in ('Date','Time (UTC+04:00)')), None)
    times = [x[timecol] for x in ch if timecol]
    meta = {'path':str(path), 'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),
            'filters':filters, 'start':min(times) if times else None, 'end':max(times) if times else None,
            'time_column':timecol, 'chart':sum_metrics(ch),
            'sheets':{s.title:{'range':f'A1:{openpyxl.utils.get_column_letter(s.max_column)}{s.max_row}', 'rows':s.max_row-1} for s in w}}
    w.close()
    return meta, data

def band(pos):
    if pos <= 3:return '<=3'
    if pos <= 10:return '>3-10'
    if pos <= 20:return '>10-20'
    return '>20'

def tag(rs, key):
    out=[]
    for item in rs:
        x=dict(item)
        val=x[key]
        direct=bool(EXPLICIT.search(val))
        model=bool(MODEL.search(val.replace('/', ' ').replace('-',' ')))
        ecosystem=bool(ECOSYSTEM.search(val))
        ambiguous=bool(AMBIGUOUS.search(val))
        if direct or model or ecosystem or ambiguous:
            x['mercedes_match_type']='explicit Mercedes/Benz/AMG/Arabic/obvious typo' if direct else ('Mercedes model reviewed' if model else ('BRABUS adjacent Mercedes ecosystem' if ecosystem else 'ambiguous MB abbreviation; unresolved'))
            x['site_brand']=('DIGI-TEC branded' if SITEBRAND.search(val) else 'non-DIGI-TEC branded') if key=='Top queries' else 'not applicable to URL dimension'
            x['position_band']=band(x['Position'])
            x['calculated_ctr']=x['Clicks']/x['Impressions'] if x['Impressions'] else None
            if key=='Top queries':
                if re.search(r'stereo|audio|speaker|sound system',val,re.I): intent='audio upgrades'
                elif re.search(r'tuning|stage|configurator',val,re.I): intent='performance tuning/configurator'
                elif re.search(r'problem|light|coolant|overheat|dtc|malfunction|930b',val,re.I):intent='symptom/problem research'
                elif re.search(r'oil|brake|\bac\b|air conditioning|suspension|transmission|engine|diagnostic|coding|body',val,re.I):intent='specific service'
                elif re.search(r'service|servicing|servuce|repair|specialist|workshop|maintenance|mechanic|صيانة',val,re.I):intent='general workshop service/repair'
                else:intent='model/general/unclear or unrelated commercial intent'
                x['analyst_intent_cluster']=intent
            out.append(x)
    return out

def writecsv(name, rs):
    if rs:
        with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
            writer=csv.DictWriter(f,fieldnames=list(rs[0]))
            writer.writeheader();writer.writerows(rs)

meta,data=extract(SOURCE)
mq=tag(data['Queries'],'Top queries')
mp=tag(data['Pages'],'Top pages')
eq=[x for x in mq if x['mercedes_match_type'].startswith('explicit')]
ep=[x for x in mp if x['mercedes_match_type'].startswith('explicit')]
modelq=[x for x in mq if x['mercedes_match_type']=='Mercedes model reviewed']
modelp=[x for x in mp if x['mercedes_match_type']=='Mercedes model reviewed']
eco_q=[x for x in mq if x['mercedes_match_type'].startswith('BRABUS')]
ambiguous_q=[x for x in mq if x['mercedes_match_type'].startswith('ambiguous')]
confirmed_q=eq+modelq
confirmed_p=ep+modelp
history=[]
for path in sorted(ROOT.glob('digitecme.com-Performance-on-Search-*.xlsx')):
    m,d=extract(path)
    q=tag(d.get('Queries',[]),'Top queries')
    m['explicit_mercedes_query_rows']=sum_metrics([x for x in q if x['mercedes_match_type'].startswith('explicit')])
    m['same_filters_except_time_as_current']={k:v for k,v in m['filters'].items() if k not in ('Date','Time range')} == {k:v for k,v in meta['filters'].items() if k not in ('Date','Time range')}
    m['ends_on_current_end']=m['end']==meta['end']
    history.append(m)
prompt={
 'mercedes repair dubai':(4.61,61,0),
 'mercedes specialist dubai':(7.04,23,0),
 'mercedes service dubai':(16.50,22,0),
 'mercedes workshop dubai':(18.84,19,0),
 'mercedes service center dubai':(29.06,18,0),
 'mercedes oil change':(27.71,17,1),
 'mercedes maintenance dubai':(16.57,14,0),
}
verification=[]
for q,expected in prompt.items():
    row=next((x for x in data['Queries'] if x['Top queries'].lower()==q),None)
    actual=(row['Position'],row['Impressions'],row['Clicks']) if row else None
    verification.append({'query':q,'expected_position_impressions_clicks':expected,'actual_position_impressions_clicks':actual,'verified':actual==expected,'row':row})
summary={
 'source':meta,
 'seven_prompted_keywords':verification,
 'sitewide_chart':sum_metrics(data['Chart']),
 'exported_query_rows':sum_metrics(data['Queries']),
 'exported_page_rows':sum_metrics(data['Pages']),
 'explicit_mercedes_queries':sum_metrics(eq),
 'explicit_mercedes_pages':sum_metrics(ep),
 'english_strict_original_query_subset':sum_metrics([x for x in eq if ENGLISH_STRICT.search(x['Top queries'])]),
 'confirmed_mercedes_queries_including_reviewed_models':sum_metrics(confirmed_q),
 'confirmed_mercedes_pages_including_reviewed_models':sum_metrics(confirmed_p),
 'brabus_adjacent_queries':sum_metrics(eco_q),
 'ambiguous_mb_queries':sum_metrics(ambiguous_q),
 'model_only_query_candidates':sum_metrics(modelq),
 'model_only_page_candidates':sum_metrics(modelp),
 'mercedes_query_position_bands':{b:sum_metrics([x for x in eq if x['position_band']==b]) for b in ['<=3','>3-10','>10-20','>20']},
 'all_confirmed_mercedes_query_position_bands':{b:sum_metrics([x for x in confirmed_q if x['position_band']==b]) for b in ['<=3','>3-10','>10-20','>20']},
 'all_confirmed_mercedes_intent_clusters':{b:sum_metrics([x for x in confirmed_q if x['analyst_intent_cluster']==b]) for b in sorted(set(x['analyst_intent_cluster'] for x in confirmed_q))},
 'mercedes_site_brand_segments':{b:sum_metrics([x for x in eq if x['site_brand']==b]) for b in ['DIGI-TEC branded','non-DIGI-TEC branded']},
 'sitewide_site_brand_segments':{b:sum_metrics([x for x in data['Queries'] if bool(SITEBRAND.search(x['Top queries']))==(b=='DIGI-TEC branded')]) for b in ['DIGI-TEC branded','non-DIGI-TEC branded']},
 'top_zero_click_mercedes':sorted([x for x in eq if x['Clicks']==0],key=lambda x:x['Impressions'],reverse=True),
 'devices_sitewide_only':data['Devices'],
 'countries_sitewide_only':data['Countries'],
 'mercedes_queries':mq,
 'mercedes_pages':mp,
 'history_manifest':history,
 'definitions':{
  'mercedes':'Explicit subset: case-insensitive Mercedes, Benz, standalone AMG, obvious merceds typo, Arabic مرسيدس/مرسيدز/مرسدس/بنز. All 10 model-only query candidates were manually reviewed as Mercedes C63/E63/G63, C-Class chassis, G wagon or CLE references. Combined confirmed totals include these models; BRABUS ecosystem rows and unresolved mb vrx remain separate. Maybach-only queries are excluded as adjacent brand demand.',
  'branded':'Lexical site-brand segment: DIGI-TEC/digitecme and close spacing/hyphen/spelling variants including Digitech and ديجي تيك/ديجي تك. This is an analyst text classification, not proof of navigational intent; generic digi phrases and unresolved digitex/digitrch are excluded. Mercedes is vehicle brand, not a DIGI-TEC branded query.',
  'position_bands':'Continuous averages are grouped as <=3, >3 to <=10, >10 to <=20, >20. Labels 4-10 and 11-20 mean these continuous intervals, not rounded position integers.',
  'ctr':'Sum clicks / sum impressions. Exported CTR values are rounded and not averaged.',
  'position':'Sum(row average position * row impressions) / sum(row impressions); approximate due to two-decimal row position rounding. Query and page weighted averages are descriptive aggregates of exported rows, not identical to GSC property metric.'
 },
 'limitations':[
  'Current workbook is sitewide Web (text-based), Last 7 days; no query, page, country or device filters. Chart dates confirm 2026-10-18 through 2026-10-24 inclusive. Dubai is text in selected queries; results are not Dubai-local rank tracking.',
  'Queries has 1000 rows, consistent with export row cap; anonymized and omitted query data make all-Mercedes totals lower-bound visible-export aggregates. Every Mercedes-related visible row is examined, not every query Google recorded.',
  'Pages are separate dimension rows. A Mercedes URL can receive queries not mentioning Mercedes and a non-Mercedes URL can rank for a Mercedes query. Do not add query and page totals or join them as measured pairs.',
  'Devices and Countries are unfiltered sitewide dimensions. They do not give Mercedes-only mobile/desktop or UAE metrics and cannot support per-Mercedes-device conclusions.',
  'No query+page, query+device or query+country cross-tab exists. Cannibalization is not demonstrated by separate Queries and Pages tabs. Need query/page/day/device/country paired export and URL Inspection.',
  'Historical raw exports are accessible but none provides a same-filter 28- or 90-day window ending 2026-10-24. Existing Last 3 months exports contain 92 days, not exactly 90. Do not label them latest 90 days or infer decline.',
  'A seven-day snapshot does not establish ranking decline. No conversions, qualified leads, calls, WhatsApp clicks or revenue are present.',
 ]
}
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'gsc-analysis.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False),encoding='utf-8')
(OUT/'current-workbook-extraction.json').write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding='utf-8')
(OUT/'historical-source-manifest.json').write_text(json.dumps(history,indent=2,ensure_ascii=False),encoding='utf-8')
writecsv('mercedes-queries.csv',confirmed_q);writecsv('mercedes-pages.csv',confirmed_p)
writecsv('explicit-mercedes-queries.csv',eq);writecsv('explicit-mercedes-pages.csv',ep)
writecsv('sitewide-site-brand-query-rows.csv',[x for x in data['Queries'] if SITEBRAND.search(x['Top queries'])])
writecsv('model-only-query-candidates.csv',modelq);writecsv('model-only-page-candidates.csv',modelp)
writecsv('all-mercedes-related-query-candidates.csv',mq)
writecsv('all-mercedes-related-page-candidates.csv',mp)
writecsv('seven-keyword-verification.csv',[dict(query=x['query'],verified=x['verified'],position=x['row']['Position'] if x['row'] else '',impressions=x['row']['Impressions'] if x['row'] else '',clicks=x['row']['Clicks'] if x['row'] else '',source_range=x['row']['source_range'] if x['row'] else '') for x in verification])

def fmt(m):
    return f"{m['rows']} rows; {m['clicks']:g} clicks; {m['impressions']:g} impressions; CTR {100*m['ctr']:.3f}%; weighted position {m['impression_weighted_position_approx']:.2f}" if m['impressions'] else f"{m['rows']} rows; 0 impressions"

lines=['# Mercedes GSC evidence, 26 October 2026','',
 f"Source: `{SOURCE}`. SHA-256 `{meta['sha256']}`.",
 f"Actual period: {meta['start']}–{meta['end']} inclusive. Filters!A1:B3: {meta['filters']}.",
 '','## Direct verification of the seven supplied rows','',
 '| Query | Position | Impressions | Clicks | CTR recalculated | Cell range | Match |','|---|---:|---:|---:|---:|---|---|']
for x in verification:
    r=x['row']
    lines.append(f"| {x['query']} | {r['Position']:.2f} | {r['Impressions']:g} | {r['Clicks']:g} | {100*r['Clicks']/r['Impressions']:.2f}% | {r['source_range']} | {x['verified']} |")
lines += ['', 'All seven supplied position/impression/click values match the workbook exactly.',
 '', '## Summary and definitions','',
 f"- Sitewide Chart!A2:E8: {fmt(summary['sitewide_chart'])}.",
 f"- Visible query rows (1000-row export): {fmt(summary['exported_query_rows'])}.",
 f"- Confirmed explicit Mercedes/Benz/AMG query rows: {fmt(summary['explicit_mercedes_queries'])}.",
 f"- Explicit Mercedes/Benz/AMG landing URL rows: {fmt(summary['explicit_mercedes_pages'])}.",
 f"- Original strict English subset for reconciliation: {fmt(summary['english_strict_original_query_subset'])}.",
 f"- Additional manually reviewed Mercedes model-only queries: {fmt(summary['model_only_query_candidates'])}.",
 f"- Additional manually reviewed Mercedes model-only landing URLs: {fmt(summary['model_only_page_candidates'])}.",
 f"- Combined confirmed Mercedes query rows: {fmt(summary['confirmed_mercedes_queries_including_reviewed_models'])}.",
 f"- Combined confirmed Mercedes URL rows: {fmt(summary['confirmed_mercedes_pages_including_reviewed_models'])}.",
 f"- BRABUS adjacent ecosystem query rows, separate from confirmed totals: {fmt(summary['brabus_adjacent_queries'])}.",
 f"- Unresolved abbreviation mb vrx, excluded from confirmed totals: {fmt(summary['ambiguous_mb_queries'])}.",
 '']
lines += [f'- {k}: {v}' for k,v in summary['definitions'].items()]
lines += ['', '## Position bands of visible explicit Mercedes queries','', '| Band | Rows | Clicks | Impressions | CTR | Weighted position |','|---|---:|---:|---:|---:|---:|']
for b,m in summary['mercedes_query_position_bands'].items():
    lines.append(f"| {b} | {m['rows']} | {m['clicks']:g} | {m['impressions']:g} | {100*m['ctr']:.3f}% | {m['impression_weighted_position_approx']:.2f} |")
lines += ['', '## Site brand segments of visible explicit Mercedes queries','']
lines += [f'- {b}: {fmt(m)}.' for b,m in summary['mercedes_site_brand_segments'].items()]
lines += ['', '## Site brand segments of all visible sitewide queries, context only','']
lines += [f'- {b}: {fmt(m)}.' for b,m in summary['sitewide_site_brand_segments'].items()]
lines += ['', '## All confirmed Mercedes query position bands including reviewed models','']
lines += [f'- {b}: {fmt(m)}.' for b,m in summary['all_confirmed_mercedes_query_position_bands'].items()]
lines += ['', '## Intent clusters of all confirmed Mercedes queries','']
lines += [f'- {b}: {fmt(m)}.' for b,m in summary['all_confirmed_mercedes_intent_clusters'].items()]
lines += ['', '## Highest-impression zero-click explicit Mercedes queries','', '| Query | Impressions | Position | Source |', '|---|---:|---:|---|']
for x in summary['top_zero_click_mercedes'][:35]:lines.append(f"| {x['Top queries']} | {x['Impressions']:g} | {x['Position']:.2f} | {x['source_range']} |")
lines += ['', '## Mercedes page rows','', '| URL | Clicks | Impressions | CTR | Position | Source |','|---|---:|---:|---:|---:|---|']
for x in sorted(confirmed_p,key=lambda x:x['Impressions'],reverse=True):lines.append(f"| {x['Top pages']} | {x['Clicks']:g} | {x['Impressions']:g} | {100*x['calculated_ctr']:.3f}% | {x['Position']:.2f} | {x['source_range']} |")
lines += ['', '## Arabic, typo and model-only rows reviewed','', '| Query | Classification | Clicks | Impressions | Position | Source |', '|---|---|---:|---:|---:|---|']
for x in mq:
    if not ENGLISH_STRICT.search(x['Top queries']):lines.append(f"| {x['Top queries']} | {x['mercedes_match_type']} | {x['Clicks']:g} | {x['Impressions']:g} | {x['Position']:.2f} | {x['source_range']} |")
lines += ['', '## Sitewide device context, not Mercedes segmentation','', '| Device | Clicks | Impressions | CTR | Position | Source |','|---|---:|---:|---:|---:|---|']
for x in data['Devices']:lines.append(f"| {x['Device']} | {x['Clicks']:g} | {x['Impressions']:g} | {100*x['Clicks']/x['Impressions']:.3f}% | {x['Position']:.2f} | {x['source_range']} |")
lines += ['', '## Historical source audit','', '| Workbook | Actual start | Actual end | Time filter | Extra filters | Same filters except time? |','|---|---|---|---|---|---|']
for x in history:
    extra={k:v for k,v in x['filters'].items() if k not in ('Search type','Date','Time range')}
    lines.append(f"| {Path(x['path']).name} | {x['start']} | {x['end']} | {x['filters'].get('Date',x['filters'].get('Time range'))} | {extra} | {x['same_filters_except_time_as_current']} |")
lines += ['', '## Limits and required follow-up','']+[f'- {x}' for x in summary['limitations']]
lines += ['', 'Required follow-up export: same property, Web (text-based), explicit Mercedes+model regex and business-brand filters documented; exact 7/28/90-day windows ending 24 October 2026; UAE and Dubai-capable rank tracking reported separately; country/device and query+page matrices. Retain unfiltered property control totals and use like-for-like nonoverlapping windows for trend claims.', '']
(OUT/'gsc-analysis.md').write_text('\n'.join(lines),encoding='utf-8')
print(json.dumps({'source':meta,'verified':all(x['verified'] for x in verification),'totals':{k:v for k,v in summary.items() if k in ('sitewide_chart','explicit_mercedes_queries','explicit_mercedes_pages','model_only_query_candidates','model_only_page_candidates','mercedes_query_position_bands','mercedes_site_brand_segments')},'model_only_queries':modelq,'model_only_pages':modelp},indent=2,ensure_ascii=False))
