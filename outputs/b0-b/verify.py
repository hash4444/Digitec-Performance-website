import json,pathlib,csv,re,hashlib,subprocess,collections
O=pathlib.Path(__file__).parent;R=O.parents[1]
def load(n):return json.loads((O/n).read_text(encoding='utf-8-sig'))
before=load('protected-hashes-before.json');changed=[];missing=[]
for p,h in before.items():
 f=R/p
 if not f.exists():missing.append(p)
 elif hashlib.sha256(f.read_bytes()).hexdigest()!=h:changed.append(p)
head=subprocess.check_output(['git','rev-parse','HEAD'],cwd=R,text=True).strip();branch=subprocess.check_output(['git','branch','--show-current'],cwd=R,text=True).strip();status=subprocess.check_output(['git','status','--porcelain=v1'],cwd=R,text=True)
(O/'git-status-after.txt').write_text(status,encoding='utf8')
before_status=set((O/'git-status-before.txt').read_text(encoding='utf-8-sig').splitlines());after_status=set(status.splitlines())
allowed_new={'?? b0-b-intent-ownership-report.md','?? b0-b-url-decision-register.csv','?? b1-mercedes-ownership-map.md','?? outputs/b0-b/'}
preserve={'protected_files':len(before),'changed':changed,'missing':missing,'head_before':(O/'head-before.txt').read_text(encoding='utf-8-sig').strip(),'head_after':head,'branch_before':(O/'branch-before.txt').read_text(encoding='utf-8-sig').strip(),'branch_after':branch,'pass':not changed and not missing and head==(O/'head-before.txt').read_text(encoding='utf-8-sig').strip() and branch==(O/'branch-before.txt').read_text(encoding='utf-8-sig').strip()}
(O/'preservation-verification.json').write_text(json.dumps(preserve,indent=2),encoding='utf8')
rows=list(csv.DictReader((R/'b0-b-url-decision-register.csv').open(encoding='utf-8-sig',newline='')));urls={x['url'] for x in rows};D=load('page-evidence.json');screen=load('sitewide-screening.json');counts=load('report-counts.json');own=load('ownership-rows.json');clusters=load('clusters.json');report=(R/'b0-b-intent-ownership-report.md').read_text(encoding='utf8');handoff=(R/'b1-mercedes-ownership-map.md').read_text(encoding='utf8')
checks={
 'all_32_sections':len(re.findall(r'^## \d+\.',report,re.M))==32,
 'section_numbers':re.findall(r'^## (\d+)\.',report,re.M)==list(map(str,range(1,33))),
 'unique_urls':len(urls)==len(rows),
 'register_count':len(rows)==counts['register_urls'],
 'deep_coverage':all('https://digitecme.com'+p in urls for p in D),
 'screen_coverage':all(x['url'] in urls for x in screen),
 'preferred_owners_exist_in_register':all(r['preferred_owner'] in urls for r in rows),
 'ownership_map_owners_exist':all('https://digitecme.com'+x['owner'] in urls for x in own),
 'allowed_actions':all(r['recommended_action'] in ['KEEP','KEEP + OPTIMIZE LATER','DIFFERENTIATE','CONSOLIDATION CANDIDATE','SUPPORTING CONTENT','MONITOR'] for r in rows),
 'allowed_classifications':all(r['classification'] in ['CONFIRMED CANNIBALIZATION','PROBABLE CANNIBALIZATION','INTENT OVERLAP','DISTINCT INTENT','INSUFFICIENT EVIDENCE'] for r in rows),
 'nine_candidates':sum(r['recommended_action']=='CONSOLIDATION CANDIDATE' for r in rows)==9,
 'candidate_validation':all(r['validation_required']=='REQUIRES PRE-REDIRECT VALIDATION' and 'Source ' in r['notes'] and 'Risk:' in r['notes'] for r in rows if r['recommended_action']=='CONSOLIDATION CANDIDATE'),
 'no_arabic_redirects':not any('/ar/' in r['url'] and r['redirect_candidate'].startswith('Yes') for r in rows),
 'expected_columns':list(rows[0])==['url','brand','intent_family','primary_intent','preferred_owner','relationship','classification','recommended_action','redirect_candidate','validation_required','arabic_counterpart','future_batch','notes'],
 'cluster_totals':len(clusters)==sum(counts[x] for x in ['confirmed','probable','intent_overlap','distinct_intent','insufficient_evidence']),
 'all_eleven_mercedes':all(p in handoff for p in ['/brands/mercedes-benz-service-dubai','/services/mercedes-oil-change-dubai','/services/mercedes-mechanical-repair-dubai','/services/mercedes-suspension-repair-dubai','/services/mercedes-transmission-repair-dubai','/services/mercedes-diagnostics-dubai','/services/mercedes-ac-repair-dubai','/services/head-unit-repair-dubai','/services/mercedes-audio-upgrade-dubai','/services/mercedes-body-repair-dubai','/services/mercedes-battery-replacement-dubai']),
 'b0a_preserved':preserve['pass'],
 'git_status_only_expected_report_additions':not (before_status-after_status) and after_status-before_status==allowed_new,
 'all_live_fetches_succeeded':all(x.get('status')==200 for x in D.values()),
 'existing_aliases_four':sum(bool(x.get('chain')) for x in D.values())==4,
}
dups=[load('xlsx-digitecme.com-Performance-on-Search-'+n+'.json') for n in ['2026-09-08','2026-09-08 (2)','2026-09-08 (2) (1)']]
checks['duplicate_exports_identical']=dups[0]==dups[1]==dups[2]
missing_local=[]
for f in [R/'b0-b-intent-ownership-report.md',R/'b1-mercedes-ownership-map.md']:
 for target in re.findall(r'\]\(([^)]+)\)',f.read_text(encoding='utf8')):
  if target.startswith('C:/') and not pathlib.Path(target).exists():missing_local.append(target)
checks['local_links_exist']=not missing_local
result={'checks':checks,'failed':[k for k,v in checks.items() if not v],'missing_local_links':missing_local,'counts':counts,'output_sizes':{n:(R/n).stat().st_size for n in ['b0-b-intent-ownership-report.md','b0-b-url-decision-register.csv','b1-mercedes-ownership-map.md']}}
(O/'validation-results.json').write_text(json.dumps(result,indent=2),encoding='utf8');print(json.dumps(result,indent=2));print('Preservation',json.dumps(preserve,indent=2))
if result['failed']:raise SystemExit(1)
