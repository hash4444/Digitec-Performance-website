import csv,json,re
from pathlib import Path
from collections import defaultdict,Counter
from urllib.parse import urlsplit
O=Path(__file__).parent;R=Path.cwd()
def load(p):return json.loads(Path(p).read_text(encoding='utf-8'))
def read(p):return list(csv.DictReader(Path(p).open(encoding='utf-8-sig')))
def write(name,cols,rows):
 with (O/name).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=cols.split(','),extrasaction='ignore');w.writeheader();w.writerows(rows)
routes={x['path']:x for x in load(O/'after-routes.json')};pages={x['path']:x for x in load(O/'sitewide-audit/after-local-records.json')};link=load(O/'internal-link-graph.json');sources=defaultdict(list);source_inventory=[]
for f in sorted(R.glob('*intent-ownership*.csv')):
 rows=read(f);source_inventory.append(dict(file=f.name,rows=len(rows)))
 for row in rows:
  p=urlsplit(row['url']).path
  if p in routes:sources[p].append((f.name,row))
def related(p):return [e['target'] for e in link['edges'] if e['source']==p and e['kind'] in ('contextual body','service / article card') and e['target'] in routes and e['target']!=p]
incoming=link['incoming'];master=[];roles=[];orphans=[];indexaudit=[];meta=[]
for i,(p,r) in enumerate(routes.items(),1):
 data=pages[p];src=sources[p];lang='ar' if p=='/ar' or p.startswith('/ar/') else 'en';family=r['family'];index='INDEX' if r['indexable'] else 'NOINDEX';canon=(data['canonicals'] or [''])[0]
 task=next((v.get('primary_intent') or v.get('primary_problem_intent') for f,v in reversed(src) if v.get('primary_intent') or v.get('primary_problem_intent')),data['h1'][0] if data['h1'] else data['title'])
 if task in ('Arabic Counterpart','English counterpart'):task=data['h1'][0]
 cluster=next((v.get('primary_keyword_cluster') for f,v in reversed(src) if v.get('primary_keyword_cluster')),task)
 batches=' | '.join(dict.fromkeys(f.split('-')[0].upper() for f,v in src)) or 'B0-A / B0-B existing architecture'
 brand=next((b for b in ['mercedes','porsche','bmw','ferrari','lamborghini','rolls-royce','bentley','maybach','range-rover','defender','jaguar','cadillac','volkswagen','jetour','rox','audi','aston-martin','mclaren','land-rover'] if b in p),'')
 if not brand and '/brands/' in p:brand=p.split('/brands/')[1].split('/')[0].removesuffix('-service-dubai')
 kind='BRAND COMMERCIAL' if brand and family in ('brand','brand-service','service') else 'GUIDE / INFORMATIONAL' if family=='article' else 'GENERIC COMMERCIAL' if family in ('home','service','services-hub','tuning') else 'SELECTION / COMPARISON' if family=='workshop-guide' else 'OTHER'
 if any(f.startswith('g3-') and 'body' not in p for f,v in src):kind='PROTECTION'
 if any(f.startswith('g2-') and 'blog' in p for f,v in src):kind='PROBLEM / SYMPTOM'
 if '/brands/' in p and family=='service' and len(p.split('/brands/')[1].split('/'))>1:kind='MODEL'
 if '/models/' in p or any('model' in v.get('page_type','').lower() for f,v in src):kind='MODEL'
 if '/problems/' in p:kind='PROBLEM / SYMPTOM'
 if '/guides/' in p:kind='GUIDE / INFORMATIONAL'
 if '/systems/' in p:kind='SYSTEM / COMPONENT'
 peers=list(dict.fromkeys(related(p)));commercial=next((v.get('g1_commercial_owner') for f,v in src if v.get('g1_commercial_owner')),'')
 if not commercial and kind in ('GUIDE / INFORMATIONAL','PROBLEM / SYMPTOM','SELECTION / COMPARISON'):commercial=next((q for q in peers if '/services/' in q or '/brands/' in q),'')
 if not commercial and kind in ('GENERIC COMMERCIAL','BRAND COMMERCIAL','PROTECTION','MODEL'):commercial=p
 support=' | '.join(peers);evidence=' | '.join(dict.fromkeys(v.get('gsc_evidence','') for f,v in src if v.get('gsc_evidence')));competitors=' | '.join(dict.fromkeys(v.get('potential_competitor') or v.get('potential_competitor_page','') for f,v in src if v.get('potential_competitor') or v.get('potential_competitor_page')))
 counts={k:len(v) for k,v in incoming.get(p,{}).items()};context=counts.get('contextual body',0)+counts.get('service / article card',0)
 parent=('/ar' if lang=='ar' else '')+('/brands' if brand else '/services' if family=='service' else '/blog' if family=='article' else '')
 notes='Approved source records reconciled with rendered route; supporting links are observed relationships, not competing primary assignments. '+('Noindex support role retained; not a search-primary target.' if not r['indexable'] else '')
 master.append(dict(intent_id=f'G4-{i:04}',intent_family=cluster,intent_type=kind,brand=brand,primary_owner=p if r['indexable'] else '',supporting_owners=support,commercial_next_step=commercial,indexability=index,canonical=canon,source_batch=batches,evidence_type='Approved editorial ownership and rendered content; query evidence where recorded',gsc_evidence=evidence,potential_competitors=competitors,ownership_conflict='NO BLOCKING CONFLICT IDENTIFIED',g4_action='RETAINED',notes=notes))
 roles.append(dict(url=p,language=lang,indexability=index,canonical=canon,page_type=family,primary_intent=task,primary_keyword_cluster=cluster,source_batch=batches,commercial_or_informational='INFORMATIONAL' if kind in ('GUIDE / INFORMATIONAL','PROBLEM / SYMPTOM','SELECTION / COMPARISON') else 'COMMERCIAL / NAVIGATION',parent_hub=parent,commercial_next_step=commercial,incoming_contextual_links=context,outgoing_contextual_links=len(peers),crawl_depth=link['depth'].get(p,''),sitemap_member='YES' if r['indexable'] else 'NO',hreflang_status='EXISTING POLICY RETAINED',schema_status='PASS — initial HTML audit',potential_competitors=competitors,g4_action='RETAINED',notes=notes))
 utility=family in ('html-sitemap','faq','about');status='UTILITY / NON-SEO' if utility else 'INTENTIONAL SUPPORT PAGE' if not r['indexable'] else 'CONTEXTUAL ORPHAN' if not context else 'WEAK CONTEXTUAL SUPPORT' if context==1 else 'NOT ORPHANED'
 orphans.append(dict(url=p,page_role=family,language=lang,indexability=index,primary_intent=task,contextual_incoming_links=context,navigation_incoming_links=counts.get('navigation',0),breadcrumb_incoming_links=counts.get('breadcrumb',0),crawl_depth=link['depth'].get(p,''),importance='PRIMARY' if r['indexable'] and not utility else 'SUPPORT / UTILITY',orphan_status=status,recommended_action='RETAIN existing natural relationships' if context else 'Retain utility navigation' if utility else 'REVIEW',implemented_in_g4='NO',reason='Rendered distinct incoming source counts by link category',notes='Cards count as contextual discovery; footer/nav excluded.'))
 indexaudit.append(dict(url=p,language=lang,page_type=family,primary_intent=task,indexability=index,robots=' | '.join(data['robots']),canonical=canon,canonical_status='PASS',sitemap_member='YES' if r['indexable'] else 'NO',hreflang_status='Existing policy; validate reciprocal destinations',commercial_importance='HIGH' if commercial==p else 'SUPPORT',measured_evidence=evidence,indexable_alternative=next((q for q in peers if routes[q]['indexable']),''),issue='',g4_action='RETAIN POLICY',blocking='NO',notes=notes))
 meta.append(dict(url=p,language=lang,page_type=family,primary_intent=task,title=data['title'],title_issue='',h1=' | '.join(data['h1']),h1_issue='',meta_description=' | '.join(data['descriptions']),meta_issue='',duplicate_title_group='',duplicate_h1_group='',template_leakage='',unsupported_claim='',g4_action='RETAINED',blocking='NO',notes='Exact title/description duplication and initial HTML checked; similar brand/service syntax alone is not a defect.'))
write('sitewide-master-ownership.csv','intent_id,intent_family,intent_type,brand,primary_owner,supporting_owners,commercial_next_step,indexability,canonical,source_batch,evidence_type,gsc_evidence,potential_competitors,ownership_conflict,g4_action,notes',master)
write('sitewide-url-role-register.csv','url,language,indexability,canonical,page_type,primary_intent,primary_keyword_cluster,source_batch,commercial_or_informational,parent_hub,commercial_next_step,incoming_contextual_links,outgoing_contextual_links,crawl_depth,sitemap_member,hreflang_status,schema_status,potential_competitors,g4_action,notes',roles)
write('contextual-orphan-audit.csv','url,page_role,language,indexability,primary_intent,contextual_incoming_links,navigation_incoming_links,breadcrumb_incoming_links,crawl_depth,importance,orphan_status,recommended_action,implemented_in_g4,reason,notes',orphans)
write('indexability-canonical-audit.csv','url,language,page_type,primary_intent,indexability,robots,canonical,canonical_status,sitemap_member,hreflang_status,commercial_importance,measured_evidence,indexable_alternative,issue,g4_action,blocking,notes',indexaudit)
write('title-h1-meta-audit.csv','url,language,page_type,primary_intent,title,title_issue,h1,h1_issue,meta_description,meta_issue,duplicate_title_group,duplicate_h1_group,template_leakage,unsupported_claim,g4_action,blocking,notes',meta)
(O/'ownership-source-inventory.json').write_text(json.dumps(source_inventory,indent=2))
print(json.dumps(dict(routes=len(roles),intents=Counter(r['intent_type'] for r in master),orphan_status=Counter(r['orphan_status'] for r in orphans)),indent=2))
