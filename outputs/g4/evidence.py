exec((__import__('pathlib').Path(__file__).parent/'reconcile.py').read_text(encoding='utf-8'))
opps={}; files=list(R.glob('*ctr-opportunities.csv'))+list((R/'outputs').glob('b[2-6]/*ctr-opportunities.csv'))
for f in files:
 for v in read(f):
  keyword=v.get('keyword') or v.get('query','');period=v.get('source_period') or v.get('date_window') or v.get('period','')
  def metric(k):return v.get('gsc_'+k,v.get(k,''))
  if not keyword or metric('impressions')=='':continue
  owner=v.get('editorial_owner') or v.get('editorial_owner_not_ranking_url') or v.get('primary_owner','')
  key=(keyword.lower().strip(),period)
  pos=float(metric('position') or 0);imp=float(metric('impressions') or 0);click=float(metric('clicks') or 0)
  if key in opps:
   opps[key]['source_batch']+=' | '+f.name;continue
  opportunity='ZERO-CLICK HIGH-IMPRESSION' if click==0 and imp>=100 else 'POSITION 4–10' if 4<=pos<=10 else 'POSITION 11–20' if 10<pos<=20 else 'POSITION 21–40' if 20<pos<=40 else 'MEASURED CTR REVIEW'
  opps[key]=dict(keyword=keyword,normalized_keyword=v.get('normalized_keyword',keyword.lower().strip()),source_period=period,clicks=metric('clicks'),impressions=metric('impressions'),ctr=metric('ctr'),position=metric('position'),intent_family=v.get('service_family') or v.get('problem_family') or v.get('protection_family') or v.get('intent','Brand query'),primary_owner=owner,source_batch=f.name,opportunity_type=opportunity,g4_action='QUERY × PAGE DATA NEEDED; retain approved editorial owner pending post-release measurement',evidence_limitation='Metrics retained per source window; never added across overlapping windows. Editorial owner is not a historical landing URL. Exact-query-filtered Mercedes exports are a separate limited exception.')
write('high-opportunity-gsc-register.csv','keyword,normalized_keyword,source_period,clicks,impressions,ctr,position,intent_family,primary_owner,source_batch,opportunity_type,g4_action,evidence_limitation',sorted(opps.values(),key=lambda r:-float(r['impressions'])))
cap=[]
for f in [R/'g1-service-capability-matrix.csv',R/'g3-protection-capability-matrix.csv']:
 for v in read(f):cap.append(dict(capability=v.get('capability') or v.get('service_or_capability'),category=v['service_family'],verification_status=v['verification_status'],evidence_source=f.name+'; '+v['evidence_source'],targeting_allowed=v['commercial_targeting_allowed'],qualification_required=v['qualification_required'],prohibited_claims=v.get('excluded_claims',''),current_owners=v['current_owner'],conflict='NO — preserve qualified capability boundary',g4_action='RETAINED',notes=v['notes']))
write('sitewide-capability-register.csv','capability,category,verification_status,evidence_source,targeting_allowed,qualification_required,prohibited_claims,current_owners,conflict,g4_action,notes',cap)
coverage=[];normowners=defaultdict(set);observations=0
for f in sorted(R.glob('*keyword-coverage.csv')):
 if f.name.startswith('g4-'):continue
 rows=read(f);observations+=len(rows)
 for v in rows:
  k=v.get('normalized_keyword') or v.get('keyword','');owner=v.get('primary_owner','');cl=v.get('coverage_class','')
  if not k:continue
  coverage.append(dict(keyword=k,source_file=f.name,owner=owner,disposition=cl))
  if 'PRIMARY' in cl and owner.startswith('/'):normowners[k].add(owner)
collision=[dict(keyword=k,owners=sorted(v),action='REVIEW language/brand/generic boundary; no automatic consolidation') for k,v in normowners.items() if len(v)>1]
(O/'keyword-reconciliation.json').write_text(json.dumps(dict(source_observations=observations,normalized_terms=len({r['keyword'] for r in coverage}),dispositions=dict(Counter(r['disposition'] for r in coverage)),primary_owner_candidates=collision,observations=coverage),ensure_ascii=False),encoding='utf-8')
print('Opportunity rows',len(opps),'capability rows',len(cap),'keyword observations',observations,'collision candidates',len(collision))
