import csv, gzip, hashlib, html, json, re, difflib
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/b1'
def read(name): return json.loads((OUT/name).read_text(encoding='utf-8-sig'))
def norm(text): return re.sub(r'\s+', ' ', html.unescape(text)).strip()
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.text=[]; self.links=[]; self.ids=set(); self.h1=[]; self.h2=[]; self.images=[]
        self.hide=0; self.heading=None; self.bits=[]
        self.feed(source)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag in ('script','style'): self.hide+=1
        if a.get('id'): self.ids.add(a['id'])
        if tag=='a' and a.get('href'): self.links.append(a['href'])
        if tag=='img': self.images.append(a)
        if tag in ('h1','h2'): self.heading=tag; self.bits=[]
    def handle_endtag(self,tag):
        if tag in ('script','style'): self.hide=max(0,self.hide-1)
        if tag==self.heading:
            getattr(self,tag).append(norm(' '.join(self.bits))); self.heading=None
    def handle_data(self,data):
        if not self.hide:
            self.text.append(data)
            if self.heading: self.bits.append(data)
    @property
    def visible(self): return norm(' '.join(self.text))
def page(rec): return Page(gzip.decompress((OUT/rec['htmlFile']).read_bytes()).decode())
before={r['path']:r for r in read('before-pages.json')}
after={r['path']:r for r in read('after-pages.json')}
br={r['path']:r for r in read('before-routes.json')}
ar={r['path']:r for r in read('after-routes.json')}
bp={p:page(r) for p,r in before.items()}; ap={p:page(r) for p,r in after.items()}
guides=['mercedes-benz-maintenance-guide-dubai','mercedes-service-cost-dubai-guide','mercedes-service-intervals-dubai-heat','best-oil-change-dubai-mercedes','mercedes-repair-dubai-complete-guide']
models=[f'/blog/mercedes-{m}-service-dubai-guide' for m in ['c-class','e-class','s-class','g63']]+[f'/mercedes/models/{m}-service-repair-dubai' for m in ['g-class','c63','e63','s63','gle','gls']]
services=['mechanical-repair','suspension-repair','transmission-repair','oil-change','ac-repair','battery-replacement','brake-repair','diagnostics','electrical-repair','body-repair','steering-repair','exhaust-repair','fuel-system-repair','tire-repair']
bilingual=['/brands/mercedes-benz-service-dubai']+[f'/services/mercedes-{s}-dubai' for s in services]+[f'/blog/{g}' for g in guides]+models[:4]
primary=set(bilingual+[f'/ar{p}' for p in bilingual]+models+[p for p in after if p.startswith('/mercedes/problems')]+['/services/head-unit-repair-dubai','/services/mercedes-audio-upgrade-dubai'])
related={f'{lang}/blog/{slug}' for lang in ('','/ar') for slug in ('transmission-service-7g-9g-dubai','air-suspension-repair-dubai-guide')}
errors=[]; warnings=[]; metadata=[]; changed=[]; faq_count=0; link_count=0
if set(before)!=set(after) or set(br)!=set(ar): errors.append('Route inventory changed')
for p in before:
    if {k:v for k,v in br[p].items() if k!='lastmod'}!={k:v for k,v in ar[p].items() if k!='lastmod'}: errors.append(f'Route policy changed: {p}')
    for k in ['canonical','noindex','hasArabicVersion']:
        if before[p]['seo'].get(k)!=after[p]['seo'].get(k): errors.append(f'{k} changed: {p}')
    a=ap[p]; b=bp[p]
    fields=[k for k in ['title','description'] if before[p]['seo'].get(k)!=after[p]['seo'].get(k)]
    if a.visible!=b.visible or fields or after[p]['seo'].get('jsonLd')!=before[p]['seo'].get('jsonLd'):
        changed.append({'path':p,'group':'primary' if p in primary else 'related-guide' if p in related else 'shared-reference','visible_text_changed':a.visible!=b.visible,'metadata_fields':fields,'schema_changed':after[p]['seo'].get('jsonLd')!=before[p]['seo'].get('jsonLd')})
    if p not in primary|related: continue
    if len(a.h1)!=1: errors.append(f'{p}: {len(a.h1)} H1s')
    if after[p]['seo'].get('canonical')!='https://digitecme.com'+p: errors.append(f'{p}: self canonical')
    for key in ('title','description'):
        if not after[p]['seo'].get(key): errors.append(f'{p}: missing {key}')
    metadata.append({'path':p,'role':'primary' if p in primary else 'related-guide','before_title':before[p]['seo'].get('title'),'after_title':after[p]['seo'].get('title'),'before_description':before[p]['seo'].get('description'),'after_description':after[p]['seo'].get('description'),'before_h1':' | '.join(b.h1),'after_h1':' | '.join(a.h1),'noindex':bool(after[p]['seo'].get('noindex')),'lastmod_before':br[p]['lastmod'],'lastmod_after':ar[p]['lastmod']})
    graph=after[p]['seo'].get('jsonLd',{}).get('@graph',[])
    for node in graph:
        if node.get('@type')=='FAQPage':
            for q in node['mainEntity']:
                faq_count+=1
                for text in [q['name'],q['acceptedAnswer']['text']]:
                    if norm(text) not in a.visible: errors.append(f'{p}: FAQ not present in rendered HTML: {text[:65]}')
    for href in a.links:
        target=urlsplit(href)
        if target.netloc and target.netloc!='digitecme.com': continue
        if target.scheme and target.scheme not in ('http','https'): continue
        if not href.startswith(('/','#','https://digitecme.com')): continue
        dest=target.path or p
        if dest not in ar:
            if (ROOT/'public'/dest.lstrip('/')).exists(): continue
            if href not in b.links: errors.append(f'{p}: new noncanonical/absent internal target {href}')
            else: warnings.append(f'{p}: preexisting non-page link {href}')
        elif target.fragment and unquote(target.fragment) not in ap[dest].ids:
            if href not in b.links: errors.append(f'{p}: new broken fragment {href}')
            else: warnings.append(f'{p}: preexisting missing fragment {href}')
        else: link_count+=1
for field in ['after_title','after_description','after_h1']:
    counts=Counter(r[field] for r in metadata if r['role']=='primary')
    for value,count in counts.items():
        if count>1: errors.append(f'Duplicate {field}: {value}')
protected=[]
for r in read('b0a-baseline.json'):
    actual=hashlib.sha256((ROOT/r['path']).read_bytes()).hexdigest()
    protected.append({'path':r['path'],'unchanged':actual==r['actual'],'before':r['actual'],'after':actual})
    if actual!=r['actual']:
        if r['path']=='cloudflare/routing-response-data.js' and (OUT/'generated-routing-verification.json').exists() and read('generated-routing-verification.json')['passed']:
            protected[-1]['generated_assets_only']=True
        else: errors.append(f'B0-A source changed: {r["path"]}')
for p in ['b0-a-routing-fix-report.md','b0-b-intent-ownership-report.md','b0-b-url-decision-register.csv','b1-mercedes-ownership-map.md']:
    if hashlib.sha256((ROOT/p).read_bytes()).hexdigest()!=read('source-hashes-before.json')[p]: errors.append(f'Protected baseline report changed: {p}')
source_changes=[]
baseline=read('source-hashes-before.json')
for p,digest in baseline.items():
    if hashlib.sha256((ROOT/p).read_bytes()).hexdigest()!=digest: source_changes.append(p)
for directory in ['src']:
    for f in (ROOT/directory).rglob('*'):
        if f.is_file() and f.suffix in ['.ts','.tsx','.js','.json','.css'] and f.relative_to(ROOT).as_posix() not in baseline: source_changes.append(f.relative_to(ROOT).as_posix())
summary={'passed':not errors,'routes':len(after),'sitemap_urls':sum(r['indexable'] for r in ar.values()),'primary_pages':len(primary),'related_guide_pages':len(related),'faq_pairs_present_in_html':faq_count,'verified_internal_links':link_count,'protected_b0a_files':len(protected),'route_policy_changes':0 if not any('changed' in e for e in errors) else 'see errors','changed_pages':len(changed),'groups':dict(Counter(r['group'] for r in changed)),'errors':errors,'warnings':sorted(set(warnings)),'b0a_files':protected,'source_changes':source_changes}
for name,data in [('verification.json',summary),('changed-pages.json',changed),('metadata-review.json',metadata)]: (OUT/name).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
with (OUT/'metadata-review.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(metadata[0])); w.writeheader();w.writerows(metadata)
ancillary=[]
for p,rec in after.items():
    if p in primary or re.search(r'mercedes|مرسيدس|G63|G800|S63|C63|E63',rec['seo'].get('title',''),re.I):
        ancillary.append({'path':p,'scope':'B1 primary' if p in primary else 'Separate Maybach owner — retained' if 'maybach' in p else 'Separate valuation, tuning, conversion or V-Class intent — retained','title':rec['seo'].get('title'),'description':rec['seo'].get('description'),'h1':' | '.join(ap[p].h1),'noindex':bool(rec['seo'].get('noindex')),'title_changed':before[p]['seo'].get('title')!=rec['seo'].get('title'),'description_changed':before[p]['seo'].get('description')!=rec['seo'].get('description')})
with (OUT/'all-mercedes-title-audit.csv').open('w',encoding='utf-8-sig',newline='') as f:
    w=csv.DictWriter(f,fieldnames=list(ancillary[0])); w.writeheader();w.writerows(ancillary)
propagation=[]
for row in changed:
    if row['group']!='shared-reference': continue
    p=row['path']; old=bp[p].visible.split(); new=ap[p].visible.split()
    edits=[]
    for tag,i,j,k,l in difflib.SequenceMatcher(None,old,new,autojunk=False).get_opcodes():
        if tag!='equal': edits.append({'before':' '.join(old[i:j]),'after':' '.join(new[k:l])})
    propagation.append({'path':p,'changes':edits})
(OUT/'shared-reference-diff.json').write_text(json.dumps(propagation,ensure_ascii=False,indent=2),encoding='utf-8')
patch=[]
for p in source_changes:
    if not p.startswith('src/'): continue
    old=(OUT/'before'/p).read_text(encoding='utf-8-sig').splitlines(keepends=True) if (OUT/'before'/p).exists() else []
    new=(ROOT/p).read_text(encoding='utf-8-sig').splitlines(keepends=True)
    patch.extend(difflib.unified_diff(old,new,fromfile=f'a/{p}' if old else '/dev/null',tofile=f'b/{p}'))
(OUT/'b1-only-source.patch').write_text(''.join(patch),encoding='utf-8')
(OUT/'primary-pages.json').write_text(json.dumps(sorted(primary),indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in summary.items() if k not in ['b0a_files','source_changes','warnings']},ensure_ascii=False,indent=2))
print('Warnings:',len(set(warnings)))
raise SystemExit(0 if not errors else 1)
