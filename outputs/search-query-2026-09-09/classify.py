from pathlib import Path
from urllib.parse import quote, urlparse
import json,re,collections,math
from html.parser import HTMLParser

class PageParser(HTMLParser):
    def __init__(self):
        super().__init__();self.headings=[];self.h1=[];self.links=[];self.main=[];self.all=[];self.inmain=0;self.capture=None;self.anchor=None;self.hidden=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='main':self.inmain+=1
        if tag in ['script','style']:self.hidden+=1
        if tag in ['h1','h2','h3']:self.capture=[tag,[]]
        if tag=='a':self.anchor=[a.get('href',''),[]]
    def handle_endtag(self,tag):
        if tag=='main':self.inmain=max(self.inmain-1,0)
        if tag in ['script','style']:self.hidden=max(self.hidden-1,0)
        if self.capture and tag==self.capture[0]:
            text=' '.join(' '.join(self.capture[1]).split())
            (self.h1 if tag=='h1' else self.headings).append(text);self.capture=None
        if tag=='a' and self.anchor:
            self.links.append({'href':self.anchor[0],'label':' '.join(' '.join(self.anchor[1]).split())});self.anchor=None
    def handle_data(self,text):
        if self.hidden:return
        self.all.append(text)
        if self.inmain:self.main.append(text)
        if self.capture:self.capture[1].append(text)
        if self.anchor:self.anchor[1].append(text)

OUT=Path(__file__).resolve().parent
ROOT=OUT.parents[1]
BASE='https://digitecme.com'
data=json.loads((OUT/'source.json').read_text('utf-8'))
routes=json.loads((OUT/'route-seo.json').read_text('utf-8'))
route_map={r['path']:r for r in routes}
inventory=[]
for r in routes:
    p=r['path']; seo=r.get('seo') or {}
    parser=PageParser();parser.feed((OUT/'snapshot'/f'{quote(p,safe="")}.html').read_text('utf-8'))
    text=' '.join(' '.join(parser.main or parser.all).split())
    item={'path':p,'url':BASE+p,'family':r['family'],'indexable':r['indexable'],'noindex':seo.get('noindex',False),'title':seo.get('title',''),'description':seo.get('description',''),'canonical':seo.get('canonical',''),'h1':parser.h1,'headings':parser.headings,'intro':' '.join(text.split()[:150]),'links':parser.links,'word_count':len(text.split()),'jsonld':seo.get('jsonLd'), 'text':text}
    inventory.append(item)
inv={r['path']:r for r in inventory}
incoming=collections.Counter()
for r in inventory:
    for link in set(x['href'].split('#')[0].split('?')[0] for x in r['links']):
        if link.startswith(BASE):link=link[len(BASE):]
        if link.startswith('/'): incoming[link]+=1
for r in inventory:r['incoming_rendered_pages']=incoming[r['path']]
(OUT/'inventory.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2),encoding='utf-8')

brand_rules=[
 ('range-rover',r'range rover|رينج'),('land-rover',r'land rover|لاند روفر'),('mercedes-benz',r'mercede|merceds|\bbenz\b|\bamg\b|brabus|مرسيدس'),
 ('rolls-royce',r'rolls.?royce'),('aston-martin',r'aston martin'),('porsche',r'porsche|porche|بورش'),('bmw',r'\bbmw\b|بي ام'),('audi',r'\baudi\b|اودي|اودى'),
 ('volkswagen',r'volkswagen|\bvw\b|فولكس'),('ferrari',r'ferrari'),('lamborghini',r'lamborghini'),('mclaren',r'mclaren'),('bentley',r'bentley|بنتل'),
 ('maybach',r'maybach'),('maserati',r'maserati'),('cadillac',r'cadillac'),('bugatti',r'bugatti'),('chevrolet',r'chevrolet'),('chrysler',r'chrysler'),
 ('ford',r'\bford\b|فورد'),('gmc',r'\bgmc\b'),('hummer',r'hummer'),('infiniti',r'infiniti'),('jaguar',r'jaguar'),('jeep',r'\bjeep\b|جيب'),
 ('lexus',r'lexus'),('lincoln',r'lincoln|لينكون|لينكولن'),('lotus',r'lotus'),('mazda',r'mazda|مازدا'),('mini',r'\bmini\b|مينى'),
 ('nissan',r'nissan'),('pagani',r'pagani'),('tesla',r'tesla'),('toyota',r'toyota'),('volvo',r'volvo'),('dodge',r'dodge|دودج'),('byd',r'بي واي دي'),('rox',r'rox ?01')]
premium={'mercedes-benz','bmw','porsche','ferrari','lamborghini','mclaren','aston-martin','rolls-royce','bentley','range-rover','land-rover','maybach','maserati','audi','bugatti','pagani','lotus'}
service_rules=[
 ('soft-close-door-installation',r'soft close'),('ppf',r'\bppf\b|paint protection film|paint protection films|film protection'),
 ('ceramic',r'ceramic|paint protection coating|car coating'),('paint-care',r'paint protect|exterior protection'),
 ('polishing',r'polish|paint correction'),('detailing',r'detailing'),
 ('tuning',r'tun(e|ing)|\bgad\b|performance|modification|suspension upgrades|fabrication|fuel system design'),
 ('audio-retrofit',r'stereo|sound system|subwoofer|audio upgrade|reverse camera|touch screen|screen replacement|cue screen|head unit|command unit|instrument cluster|steering wheel restoration'),
 ('transmission-repair',r'transmission|gear.?box|gear box|dsg|clutch|gear repair'),
 ('oil-change',r'oil|lubricant|lubrication|تغيير زيت'),('brake-repair',r'brake|frenos|فرامل|بريك'),
 ('suspension-repair',r'suspension|ride height|تعليق'),('ac-repair',r'\bac\b|air con|air.con|refrigerant|مكيف'),
 ('battery-replacement',r'battery|بطارية'),('steering-repair',r'steering|rack and pinion'),('exhaust-repair',r'exhaust|muffler|silencer'),
 ('tire-repair',r'\btyre|\btire|puncture|puncher|vulcaniz'),('body-repair',r'body|collision|accident|car door repair|صبغ'),
 ('engine-diagnostics',r'diagnostic|fault code|scann|coding|program|\becu\b|inspection'),
 ('electrical-repair',r'electric|wiring'),('fuel-system-repair',r'fuel|injector'),('mechanical-repair',r'engine|mechanical|timing chain|turbo repair'),
 ('roadside',r'roadside|road assistance|delivery'),('service-repair',r'.')]
service_labels={'soft-close-door-installation':'Soft close doors','ppf':'Paint protection film','ceramic':'Ceramic coating','paint-care':'Paint care and protection comparison','polishing':'Polishing and paint correction','detailing':'Detailing','tuning':'Performance tuning','audio-retrofit':'Audio, screen or retrofit enquiry','transmission-repair':'Transmission and gearbox repair','oil-change':'Oil change','brake-repair':'Brake repair','suspension-repair':'Suspension repair','ac-repair':'AC repair','battery-replacement':'Battery service','steering-repair':'Steering repair','exhaust-repair':'Exhaust repair','tire-repair':'Tyre repair','body-repair':'Body repair','engine-diagnostics':'Diagnostics and supported coding','electrical-repair':'Electrical repair','fuel-system-repair':'Fuel system repair','mechanical-repair':'Engine and mechanical repair','roadside':'Roadside or delivery','service-repair':'Service and repair'}
generic={'ppf':'paint-protection-film','ceramic':'ceramic-coating','paint-care':'paint-protection-dubai','polishing':'car-polishing-dubai','detailing':'paint-protection-dubai','soft-close-door-installation':'soft-close-door-repair-dubai','oil-change':'oil-change-dubai','brake-repair':'brake-repair-dubai','suspension-repair':'suspension-repair-dubai','ac-repair':'car-ac-repair-dubai','battery-replacement':'battery-replacement-dubai','steering-repair':'steering-repair-dubai','exhaust-repair':'exhaust-repair-dubai','tire-repair':'tire-repair-dubai','body-repair':'car-body-repair-dubai','engine-diagnostics':'car-diagnostics-dubai','electrical-repair':'auto-electrical-repair-dubai','fuel-system-repair':'fuel-system-repair-dubai','mechanical-repair':'mechanical-repair-dubai','roadside':'roadside-assistance-dubai','service-repair':'car-service-dubai'}
queries=[]
unresolved=[]
for i,r in enumerate(data['Queries'][1:],2):
    original,c,im,ctr,pos=r; q=re.sub(r'\s+',' ',original.lower().replace('\u200b','')).strip()
    brand=next((b for b,p in brand_rules if re.search(p,q)),None)
    service=next(s for s,p in service_rules if re.search(p,q))
    note=[]; disposition=None; intent='Commercial service enquiry'; relevance='High'; value=5 if brand in premium or service in ['ppf','ceramic','paint-care','polishing','tuning'] else 3
    quality='High-value commercial'
    geo='Dubai explicit' if re.search(r'dubai|دبي|al quoz',q) else 'Near me; location unknown' if 'near me' in q else 'Location unspecified'
    foreign=bool(re.search(r'abu dhabi|ابو ?ظبي|ابوظبي|مصفح|artarmon',q))
    other_dubai=bool(re.search(r'dip2?|investment park|motor city|jumeirah|deira|naif|al murar',q))
    if other_dubai:geo='Other Dubai district';note.append('Use the actual Al Quoz location; no district landing page or implied branch.')
    if foreign:geo='Outside Dubai';relevance='Low';value=1;quality='Low-value';disposition='DEPRIORITIZE';note.append('Explicit destination differs from the Al Quoz workshop; do not claim a local branch or service coverage.')
    company=bool(re.search(r'^digi[ -]?(tec|tech)|^digitec|^tec performance',q)) and not re.search(r'tun(e|ing)',q)
    if company:
        brand='DIGI-TEC';service='brand-navigation';owner='/'
        intent='Navigational';quality='Relevant supporting';value=3
        if re.search(r'performance center|performance centre|^digi-tec$',q):note.append('Clear business-name intent; preserve identity, address and direct booking paths.')
        else:relevance='Medium';note.append('Ambiguous business-name variant; automotive intent cannot be established from this export.')
    elif service=='tuning':owner='/tuning';note.append('Use the existing tuning page; model scope and any GAD relationship require verified facts.')
    elif service=='audio-retrofit':
        owner='';relevance='Unverified';value=1;disposition='DEPRIORITIZE';quality='Low-value';intent='Commercial capability enquiry'
        note.append('Specific retrofit or component repair capability is unconfirmed; do not publish a dedicated sales page before confirmation.')
    elif brand and service not in ['ppf','ceramic','paint-care','polishing','detailing']:
        hub=f'/brands/{brand}-service-dubai'
        candidate=f'{hub}/{service}'
        if brand=='mercedes-benz':candidate='/services/mercedes-'+('diagnostics' if service=='engine-diagnostics' else service)+'-dubai'
        if service=='service-repair':owner=hub
        elif candidate in route_map:
            owner=candidate
            if not route_map[candidate]['indexable']:note.append('Existing specific page is noindex; assess service evidence and distinct content before changing indexation.');relevance='Medium'
        else:
            owner=hub if hub in route_map else '/services/'+generic[service]
            note.append('No existing specific indexable owner established; use a relevant hub section and confirm demand before a new page.')
    else:owner='/services/'+generic.get(service,'car-service-dubai')
    if not brand and service=='service-repair' and not company:
        owner='/services/garage-near-me-dubai' if 'near me' in q else '/services/car-garage-dubai' if re.search(r'garage|workshop|repair|specialist|كراج',q) else '/services/car-service-dubai'
    if brand=='porsche' and service=='service-repair':
        if re.search(r'911|targa|carrera|gt3|turbo service',q):owner='/blog/porsche-911-service-dubai-guide';note.append('Support the existing 911 page with model-specific sections; no separate Targa/Carrera/GT3 page justified by this export.')
        elif 'panamera' in q:owner='/blog/porsche-panamera-service-dubai-guide'
    if service=='ppf':owner='/services/paint-protection-film';note.append('Film intent belongs to the PPF page; vehicle and district terms are secondary context.')
    if service=='ceramic':owner='/services/ceramic-coating';note.append('Coating intent belongs to the ceramic page; distinguish its limitations from film.')
    if service=='paint-care':note.append('Broad protection intent is mixed; the comparison hub should direct film and coating enquiries to their specialist pages.')
    if q=='car battery life in uae':
        intent='Informational';quality='Informational';value=2;relevance='Medium'
        choices=[p for p in route_map if p.startswith('/blog/') and 'battery' in p]
        owner=choices[0] if choices else '/services/battery-replacement-dubai'
        note.append('Answer battery-life factors without a universal replacement interval; link to battery testing.')
    if 'repair cost' in q:intent='Commercial cost research';note.append('Explain diagnosis, parts and labour cost factors without inventing prices.')
    if q=='car body repair history dubai':intent='Informational';quality='Informational';value=1;note.append('History-check intent differs from booking body repair; avoid claiming an accident-history lookup service.')
    unverified=bool(re.search(r'graphene|stek dynoprism|battery.*delivery|roadside|road assistance|tesla battery|suspension upgrades|fuel system design|car fabrication',q))
    if unverified:
        relevance='Unverified';value=1;disposition='DEPRIORITIZE';quality='Low-value';note.append('Product, high-voltage, delivery or specialist capability requires business confirmation; existing copy alone is not sufficient evidence.')
    if re.search(r'authori[sz]ed|showroom|industrial gearbox|brake motors|digital solutions for automotive|@',q) or q in ['yes','any ithers','dubai','digi','tec','ditec dubai','chrysler satin al dubai']:
        disposition='IGNORE';relevance='None';quality='Irrelevant';value=0;owner='';intent='Other or mismatched intent';note.append('Dealer, product, industrial, unrelated entity or non-service intent does not match the independent workshop offer.')
    if 'artarmon' in q:disposition='IGNORE';relevance='None';quality='Irrelevant';value=0;owner=''
    if q=='frenos near me':relevance='Medium';value=2;quality='Relevant supporting';note.append('Spanish brake-repair wording is relevant in meaning, but location and language fit are unknown; no standalone Spanish page justified.')
    if service=='tire-repair':value=2;note.append('Relevant workshop tyre enquiry with lower assumed value than specialist repair; no mobile or roadside claim.')
    if 'offers' in q or 'cheap' in q:relevance='Medium';value=2;disposition='DEPRIORITIZE';quality='Low-value';note.append('Price-led demand does not justify invented discounts or a low-price positioning.')
    if q in ['toyota lubricants dubai','transmission repair parts','rack and pinion gear dubai','gear box dubai']:
        relevance='Medium';value=2;disposition='DEPRIORITIZE';quality='Low-value';note.append('Possible product or parts-retail intent; confirm repair-enquiry intent before active targeting.')
    arabic=bool(re.search('[\u0600-\u06ff]',q))
    if arabic and owner and '/ar'+owner in route_map:owner='/ar'+owner;note.append('Use the existing Arabic counterpart and verify its translation quality.')
    if owner and owner not in route_map:unresolved.append([original,owner])
    if pos<=3:band='1–3';opportunity='Defend relevance and measured CTR'
    elif pos<=10:band='4–10';opportunity='Page-one CTR review and top-three relevance'
    elif pos<=20:band='11–20';opportunity='Ranking and owner relevance'
    elif pos<=40:band='21–40';opportunity='Content, internal authority and owner alignment'
    else:band='40+';opportunity='Relevance, capability, indexing and authority review'
    if disposition in ['IGNORE','DEPRIORITIZE']:priority=disposition
    elif pos<=3 or (company and pos<=5):priority='DEFEND'
    elif 3<pos<=15 and im>=20 and value>=3:priority='CRITICAL'
    elif pos<=30 and value>=3:priority='HIGH'
    else:priority='GROWTH'
    if foreign or relevance in ['None','Unverified']:priority=disposition or 'DEPRIORITIZE'
    if company and relevance=='Medium':priority='DEFEND' if c else 'DEPRIORITIZE';disposition='DEPRIORITIZE' if not c else disposition
    cluster_brand='All vehicles' if service in ['ppf','ceramic','paint-care','polishing','detailing','tuning'] else (brand or 'All vehicles')
    cluster=f'{cluster_brand}: {service_labels.get(service,"Business navigation")}'
    if not brand and service=='service-repair':cluster='All vehicles: '+('Nearby workshop access' if 'garage-near-me' in owner else 'General garage and repair' if 'car-garage' in owner else 'Scheduled car service')
    if service=='audio-retrofit':cluster=f'{brand or "Unspecified brand"}: '+ ('Camera retrofit' if 'camera' in q else 'Screen or head-unit repair' if re.search(r'screen|head unit|command unit|instrument',q) else 'Audio or interior retrofit')
    if disposition=='IGNORE':cluster='Excluded: '+ ('Industrial or non-automotive' if re.search(r'industrial|brake motors|digital solutions',q) else 'Dealer or showroom' if re.search(r'authori|showroom',q) else 'Unrelated or wrong location')
    elif intent=='Informational':cluster='Information: '+ ('Battery life' if 'battery' in q else 'Body repair history')
    elif brand=='porsche' and '/blog/porsche-' in owner:cluster='porsche: '+ ('911 service and model variants' if '911' in owner else 'Panamera service')
    elif foreign:cluster+=' (outside Dubai)'
    if disposition is None:disposition='SPLIT' if brand and service not in ['brand-navigation','service-repair','tuning','ppf','paint-care','ceramic'] else 'SUPPORT'
    # An explicit, editable editorial score. It is a work-order aid, not a traffic forecast.
    intent_factor=0 if value==0 else 1 if relevance in ['Low','Unverified'] else .5 if intent=='Informational' else .6 if company else .8 if geo=='Location unspecified' else 1
    relevance_factor={'High':1,'Medium':.65,'Low':.2,'Unverified':.1,'None':0}[relevance]
    rank_factor= .3 if pos<=3 else 1 if pos<=15 else .7 if pos<=30 else .4 if pos<=40 else .15
    volume_factor=min(math.log10(1+im)/3,1)
    ctr_factor=1 if pos<=10 and im>=20 and ctr<.01 else 0
    strength_factor=1 if owner and owner in inv and inv[owner]['indexable'] and len(inv[owner]['h1'])==1 and inv[owner]['canonical']==BASE+owner else .25 if owner else 0
    score=round((intent_factor*25+value/5*20+rank_factor*25+volume_factor*10+ctr_factor*10+strength_factor*10)*relevance_factor,1)
    if disposition=='IGNORE':score=0
    if pos>20:note.append(f'Average position {pos:.2f} makes ranking the main issue; avoid a CTR-only rewrite.')
    elif pos<=10 and c==0:note.append(f'Zero clicks from {int(im)} impressions at average position {pos:.2f}; inspect query/page, country/device and SERP before attributing this to the snippet.')
    else:note.append(f'{int(im)} impressions at average position {pos:.2f}; strengthen the appropriate intent owner and measure with a fresh comparable period.')
    action='Do not target' if disposition=='IGNORE' else 'Confirm scope or deprioritize' if disposition=='DEPRIORITIZE' else 'Use dedicated service owner' if disposition=='SPLIT' else 'Retain primary intent and support variants'
    queries.append(dict(source_row=i,query=original,clicks=c,impressions=im,ctr=ctr,position=pos,intent=intent,relevance=relevance,priority=priority,cluster=cluster,role='Secondary',current_url='Unknown — export has no query/page pairing',owner=BASE+owner if owner else '',classification=disposition,action=action,reason=' '.join(note),brand=brand or 'All vehicles',service=service,geo=geo,quality=quality,value=value,band=band,opportunity=opportunity,score=score,intent_factor=intent_factor,relevance_factor=relevance_factor,rank_factor=rank_factor,volume_factor=volume_factor,ctr_factor=ctr_factor,strength_factor=strength_factor,weighted_position=im*pos))

groups=collections.defaultdict(list)
for q in queries:groups[q['cluster']].append(q)
clusters=[]
for name,qs in groups.items():
    owners={q['owner'] for q in qs if q['owner']}
    # A cluster gets one owner. Language and unsupported service branches are separated.
    if len(owners)>1:
        for q in qs:q['cluster']+=' (Arabic)' if '/ar/' in q['owner'] else ' (English)'
groups=collections.defaultdict(list)
for q in queries:groups[q['cluster']].append(q)
for name,qs in groups.items():
    assert len({q['owner'] for q in qs if q['owner']})<=1,(name,{q['owner'] for q in qs})
    primary=max(qs,key=lambda q:(q['priority'] not in ['IGNORE','DEPRIORITIZE'],q['geo']=='Dubai explicit',q['impressions']))
    primary['role']='Primary'
    if primary['classification']=='SUPPORT':primary['classification']='PRIORITIZE';primary['action']='Strengthen this primary intent owner'
    for q in qs:
        if q is not primary and q['classification']=='SUPPORT' and q['quality']=='High-value commercial':q['quality']='Relevant supporting'
    im=sum(q['impressions'] for q in qs); c=sum(q['clicks'] for q in qs)
    best=max(qs,key=lambda q:q['score'])
    cluster_priority=next((v for v in ['CRITICAL','HIGH','GROWTH','DEFEND','DEPRIORITIZE','IGNORE'] if any(q['priority']==v for q in qs)))
    clusters.append(dict(cluster=name,primary=primary['query'],owner=primary['owner'],queries=len(qs),impressions=im,clicks=c,ctr=c/im,position=sum(q['weighted_position'] for q in qs)/im,score=best['score'],priority=cluster_priority,action=primary['action'],intent=primary['intent'],best_opportunity=best['query'],secondary='; '.join(q['query'].replace('\n',' ') for q in qs if q is not primary),query_rows=[q['source_row'] for q in qs]))
clusters.sort(key=lambda x:-x['score'])
(OUT/'query-map.json').write_text(json.dumps(queries,ensure_ascii=False,indent=2),encoding='utf-8')
(OUT/'clusters.json').write_text(json.dumps(clusters,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'queries':len(queries),'clusters':len(clusters),'unresolved':unresolved,'priorities':dict(collections.Counter(q['priority'] for q in queries)),'top_clusters':[{k:v for k,v in c.items() if k not in ['secondary','query_rows']} for c in clusters[:25]],'paint_totals':{s:sum(q['impressions'] for q in queries if q['service']==s) for s in ['ppf','ceramic','paint-care','polishing','detailing']}},ensure_ascii=False,indent=2))
