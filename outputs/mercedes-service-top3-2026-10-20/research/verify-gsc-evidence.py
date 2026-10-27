from pathlib import Path
import hashlib,json,re,warnings
import openpyxl
warnings.filterwarnings('ignore',message='Workbook contains no default style')
OUT=Path(__file__).resolve().parent
manifest=json.loads((OUT/'source-manifest.json').read_text(encoding='utf-8'))
exact=json.loads((OUT/'exact-query-observations.json').read_text(encoding='utf-8'))
live=json.loads((OUT/'live-gsc-evidence.json').read_text(encoding='utf-8'))
assertions=0;metrics=0
for src in manifest:
    assert hashlib.sha256(Path(src['path']).read_bytes()).hexdigest()==src['sha256'];assertions+=1
for obs in exact:
    wb=openpyxl.load_workbook(obs['source_path'],read_only=True,data_only=True)
    row=int(re.search(r'A(\d+):',obs['range'])[1]); values=list(wb['Queries'].iter_rows(min_row=row,max_row=row,values_only=True))[0]
    assert values[0]==obs['Top queries'];assertions+=1
    for j,k in enumerate(['Clicks','Impressions','CTR','Position'],1):
        assert values[j]==obs[k];assertions+=1;metrics+=1
    wb.close()
joint=(OUT/'live-exact-query-uae-hub-devices-ax.txt').read_text(encoding='utf-8')
assert 'Country: United Arab Emirates' in joint;assertions+=1
assert 'Page: https://digitecme.com/brands/mercedes-benz-service-dubai' in joint;assertions+=1
assert 'query=!mercedes%20service%20dubai' in joint;assertions+=1
visible_text=[re.sub(r'^.*?\btext\s+','',l.strip()) for l in joint.splitlines() if re.search(r'\btext\s+',l)]
for d in live['query_uae_exact_hub_devices']:
    start=visible_text.index(d['device']); tokens=visible_text[start+1:start+5]
    assert tokens==[str(d['clicks']),str(d['impressions']),d['ctr_display'],str(d['average_position_display'])];assertions+=1
assert sum(x['impressions'] for x in live['query_uae_exact_hub_devices'])==live['query_uae_exact_hub_totals']['impressions'];assertions+=1
assert sum(x['clicks'] for x in live['query_uae_exact_hub_devices'])==live['query_uae_exact_hub_totals']['clicks'];assertions+=1
indexed=(OUT/'live-indexed-url-inspection-ax.txt').read_text(encoding='utf-8')
for expected in ['URL is on Google','Page is indexed','Google-selected canonical','Inspected URL','16 Oct 2026, 21:18:38','Googlebot smartphone','https://digitecme.com/brands/mercedes-benz-service-dubai']:
    assert expected in indexed;assertions+=1
assert 'Value: Exact query' in (OUT/'live-exact-query-filter-ax.txt').read_text(encoding='utf-8');assertions+=1
for p in OUT.glob('live-*-ax.txt'):
    assert '@gmail.com' not in p.read_text(encoding='utf-8');assertions+=1
result={'status':'PASS','assertions':assertions,'original_workbooks_hash_verified':len(manifest),'exact_rows_independently_reopened':len(exact),'exact_metric_cells_verified':metrics,'joint_uae_hub_device_transcription_verified':True,'indexed_canonical_capture_verified':True,'saved_ax_account_identity_redacted':True,'product_or_external_mutations':False}
(OUT/'research-verification.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print(json.dumps(result))
