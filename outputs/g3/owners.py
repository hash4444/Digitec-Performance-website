import json,csv,re,unicodedata,gzip
from pathlib import Path
from lxml import html
O=Path('outputs/g3')
def norm(s):return re.sub(r'\s+',' ',re.sub(r'[-–—]',' ',unicodedata.normalize('NFKC',s).lower().replace('paint prtection','paint protection').replace('paint protection films','paint protection film').replace('ceramic coatings','ceramic coating'))).strip()
def write(name,rows,cols):
 with (O/name).open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=cols,extrasaction='ignore');w.writeheader();w.writerows(rows)
R=json.loads((O/'protection-source-observations.json').read_text(encoding='utf-8'))
with Path('g1-to-g3-deferred-keywords.csv').open(encoding='utf-8-sig') as f:H=list(csv.DictReader(f))
missing=sorted({norm(x['keyword']) for x in H}-{norm(x['keyword']) for x in R})
(O/'handoff-reconciliation.json').write_text(json.dumps({'handoff_observations':len(H),'handoff_normalized_terms':len({x['normalized_keyword'] for x in H}),'missing_from_independent_extraction':missing},indent=2))
print('HANDOFF MISSING',missing)
P='/services/paint-protection-film';C='/services/ceramic-coating';B='/services/paint-protection-dubai';L='/services/car-polishing-dubai';D='/services/car-body-repair-dubai';G='/blog/ceramic-coating-vs-ppf-dubai'
brief=['PPF installation','full body PPF','partial front PPF','PPF cost Dubai','PPF removal','PPF replacement','PPF repair','PPF maintenance','PPF damage','PPF bubbles','PPF peeling','PPF edges lifting','ceramic maintenance','ceramic coating cost Dubai','ceramic coating reapplication','machine polishing','swirl removal','light scratch correction','deep scratch repair','paint restoration','exterior detailing','interior detailing','PPF vs ceramic coating','ceramic coating over PPF','clear bra','clear film','supercar PPF','paint protection coating','ceramic coating','paint correction']
for q in brief:R.append(dict(keyword=q,normalized_keyword=norm(q),source='G3 user brief: family/task example',source_file='G3 supplied brief',source_period='',measured_or_generated='BRIEF EXAMPLE',gsc_clicks='',gsc_impressions='',gsc_ctr='',gsc_position='',original_gsc=False))
brands=['mercedes','porsche','bmw','ferrari','lamborghini','rolls royce','bentley','maybach','range rover','defender','jaguar','cadillac','volkswagen','jetour','rox','aston martin']
for r in R:
 q=norm(r['keyword']);r['normalized_keyword']=q;brand=next((b for b in brands if b in q),'');brand=brand or ('bentley' if 'mulsanne' in q else 'rolls royce' if 'spectre' in q else '')
 owner=B;family='Broad paint protection';cl='COVERED — PRIMARY';support=P+'; '+C;reason='Existing discovery page compares protection choices; specific product intent belongs to the service owner.'
 if any(x in q for x in ['ppf','film','clear bra','clear film']):owner=P;family='PPF installation';support=B;reason='Existing film installation owner covers the task without another route.'
 if any(x in q for x in ['ceramic','coating','paint coat','nano','سيراميك']) and not ('ppf coating' in q):owner=C;family='Ceramic coating';support=P;reason='Coating terminology belongs to the surface-treatment owner, distinct from physical film.'
 if ('ceramic' in q and ('ppf' in q or 'film' in q)):
  owner=G;family='PPF and ceramic comparison / combination';cl='COVERED — GUIDE';support=P+'; '+C;reason='Comparison and compatibility planning precede separate commercial scope; no universal product compatibility.'
 if any(x in q for x in ['polish','correct','swirl','restor','تلميع']):owner=L;family='Polishing and paint correction';support=D;cl='COVERED — SECTION';reason='One existing owner distinguishes gloss enhancement from assessed defect correction; damaged paint remains a repair task.'
 if 'scratch' in q:
  owner=L if 'light' in q else D;family='Light scratch correction' if owner==L else 'Scratch / body repair';support=D if owner==L else L;cl='COVERED — SECTION' if owner==L else 'COVERED — BODY-REPAIR OWNER';reason='Unknown or deep paint damage is assessed by the existing repair owner; suitable surface marks may be referred for correction.'
 if any(x in q for x in ['full body','partial','front ppf']):family='PPF coverage';cl='COVERED — SECTION'
 if any(x in q for x in ['cost','price']):cl='COVERED — FAQ';reason='Vehicle-specific quote factors; no fixed price or universal package.'
 if 'self healing' in q:cl='COVERED — FAQ';reason='Product-specific explanation only; no assertion of a stocked film or universal healing conditions.'
 if any(x in q for x in ['removal','replacement','ppf repair','ppf maintenance','ceramic maintenance','reapplication']):
  family='PPF aftercare / removal / replacement' if owner==P else 'Ceramic aftercare / reapplication';cl='DEFERRED — CAPABILITY VERIFICATION';reason='Existing page supports care and inspection enquiries; a dedicated removal/replacement/maintenance service is not independently verified.'
 if any(x in q for x in ['ppf damage','bubbles','peeling','lifting']):family='PPF damage assessment';cl='COVERED — FAQ';reason='Explain inspection and product-specific care without promising film repair.'
 if 'detail' in q or 'interior protection' in q:owner='';support=B;family='Detailing scope';cl='DEFERRED — CAPABILITY VERIFICATION';reason='Protection services do not establish a complete exterior/interior detailing service.'
 if any(x in q for x in ['graphene','stek','artarmon','global paint']):owner='';support='';cl='NOT TARGETED — INTENTIONALLY';reason='Unverified product-specific service or non-local/ambiguous business intent; no matching service claim.'
 if 'tint' in q or q == 'protect performance':owner='';support='';family='Outside protection scope';cl='NOT TARGETED — INTENTIONALLY';reason='Window tinting or ambiguous performance wording is not paint protection; retained in evidence reconciliation but not targeted by G3.'
 if brand and cl.startswith('COVERED') and owner!=D:cl='COVERED — BRAND RELATIONSHIP';reason+=' Brand/model is vehicle context; suitability must be confirmed, with no separate brand-protection URL.'
 if re.search('[\u0600-\u06ff]',q) and owner in [B,P,C]:owner='/ar'+owner
 r.update(search_intent='Service selection / enquiry' if owner!=G else 'Informational comparison',protection_family=family,primary_owner=owner,supporting_owner=support,brand_relationship=brand,body_repair_relationship=D if owner in [B,P,C,L,D,G] else '',coverage_class=cl,coverage_location=owner,reason=reason,g3_action='REVIEW / retain existing owner; scoped quality corrections',notes='Editorial owner is not a historical ranking URL. Overlapping source periods are not additive.')
cols='keyword normalized_keyword source source_file source_period measured_or_generated gsc_clicks gsc_impressions gsc_ctr gsc_position search_intent protection_family primary_owner supporting_owner brand_relationship coverage_class reason'.split()
write('protection-owner-records.csv',R,cols)
(O/'owner-observations.json').write_text(json.dumps(R,ensure_ascii=False,indent=2),encoding='utf-8')
(O/'protection-owner-map.md').write_text('''# G3 pre-implementation owner decisions

Baseline: saved LOCAL_G2_APPROVED_STATE; no new URLs proposed.

| Task | Primary owner | Boundary |
|---|---|---|
| Broad paint protection / car paint protection | /services/paint-protection-dubai | Existing choice/assessment page; specific services remain below |
| Film installation, full/partial coverage, film cost | /services/paint-protection-film | Physical film; quote factors and coverage sections |
| Paint protection coating / ceramic | /services/ceramic-coating | Product-specific surface treatment |
| PPF versus ceramic and compatible combination planning | /blog/ceramic-coating-vs-ppf-dubai | Informational decision support links to both service owners |
| Polishing, machine polishing, correction, swirls, suitable light scratches | /services/car-polishing-dubai | Distinguish gloss refinement from defect correction within one existing page |
| Deep scratches, lost paint, dents, refinishing | /services/car-body-repair-dubai | Protected G1 owner retained |
| Removal/replacement/film repair, paid maintenance, full detailing | NOT TARGETED / UNVERIFIED | Existing care guidance does not verify these separate service capabilities |

Brand protection queries use the relevant generic service with vehicle-specific suitability; brand hub ownership is preserved. No ranking cannibalization is inferred from aggregate query exports.

Implementation priorities: replace mechanical-template Arabic copy only on the three existing protection service routes; qualify the English comparison guide; retain useful dedicated English service content. Review film-damage FAQ coverage without promising repair. Final coverage is subject to rendered QA.
''',encoding='utf-8')
print('OWNER observations',len(R),'normalized',len({x['normalized_keyword'] for x in R}))
