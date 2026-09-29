from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import gzip, json, re

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'outputs/b1'
def norm(s): return ' '.join(s.split())

class MainParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth=0; self.main=False; self.skip=0; self.text=[]; self.headings=[]; self.links=[]; self.buttons=[]; self.articles=[]
        self.heading=None; self.link=None; self.button=None; self.article=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='main': self.main=True
        if not self.main:return
        if tag in ('script','style'):self.skip+=1
        if tag in ('h1','h2','h3'):self.heading={'tag':tag,'text':''}
        if tag=='a':self.link={'href':attrs.get('href',''),'text':''}
        if tag=='button':self.button={'text':'','expanded':attrs.get('aria-expanded')}
        if tag=='article':self.article=[]
    def handle_data(self,data):
        if not self.main or self.skip:return
        self.text.append(data)
        if self.heading is not None:self.heading['text']+=data
        if self.link is not None:self.link['text']+=data
        if self.button is not None:self.button['text']+=data
        if self.article is not None:self.article.append(data)
    def handle_endtag(self,tag):
        if not self.main:return
        if tag in ('script','style'):self.skip=max(0,self.skip-1)
        if tag in ('h1','h2','h3') and self.heading is not None:
            self.heading['text']=norm(self.heading['text']);self.headings.append(self.heading);self.heading=None
        if tag=='a' and self.link is not None:
            self.link['text']=norm(self.link['text']);self.links.append(self.link);self.link=None
        if tag=='button' and self.button is not None:
            self.button['text']=norm(self.button['text']);self.buttons.append(self.button);self.button=None
        if tag=='article' and self.article is not None:self.articles.append(norm(' '.join(self.article)));self.article=None
        if tag=='main':self.main=False

before={r['path']:r for r in json.loads((OUT/'before-pages.json').read_text(encoding='utf-8'))}
after={r['path']:r for r in json.loads((OUT/'after-pages.json').read_text(encoding='utf-8'))}
routes={r['path']:r for r in json.loads((OUT/'after-routes.json').read_text(encoding='utf-8'))}
def extract(record):
    html=gzip.decompress((OUT/record['htmlFile']).read_bytes()).decode('utf-8')
    parser=MainParser();parser.feed(html)
    graph=record['seo'].get('jsonLd',{}).get('@graph',[])
    if not graph and isinstance(record['seo'].get('jsonLd'),list):graph=record['seo']['jsonLd']
    faqs=[qa for node in graph if node.get('@type')=='FAQPage' for qa in node.get('mainEntity',[])]
    text=norm(' '.join(parser.text));button_text={b['text'] for b in parser.buttons}
    return {
      'title':record['seo'].get('title'),'description':record['seo'].get('description'),'canonical':record['seo'].get('canonical'),
      'noindex':record['seo'].get('noindex',False),'h1':[h['text'] for h in parser.headings if h['tag']=='h1'],
      'headings':parser.headings,'schema_types':[node.get('@type') for node in graph],
      'dates':[{'type':node.get('@type'),'published':node.get('datePublished'),'modified':node.get('dateModified')} for node in graph if node.get('datePublished')],
      'faqs':[{'question':qa.get('name'), 'answer':qa.get('acceptedAnswer',{}).get('text'), 'question_in_main':norm(qa.get('name','')) in text, 'question_is_disclosure':norm(qa.get('name','')) in button_text, 'answer_in_initial_main':norm(qa.get('acceptedAnswer',{}).get('text','')) in text} for qa in faqs],
      'links':parser.links, 'main_text':text,'article_text':parser.articles,
    }

slugs=['mercedes-benz-maintenance-guide-dubai','mercedes-service-intervals-dubai-heat','mercedes-service-cost-dubai-guide','best-oil-change-dubai-mercedes','mercedes-repair-dubai-complete-guide','transmission-service-7g-9g-dubai','air-suspension-repair-dubai-guide']
expected_next_steps={
 'mercedes-benz-maintenance-guide-dubai':['/blog/mercedes-service-intervals-dubai-heat','/blog/mercedes-service-cost-dubai-guide','/brands/mercedes-benz-service-dubai'],
 'mercedes-service-intervals-dubai-heat':['/blog/mercedes-benz-maintenance-guide-dubai','/blog/mercedes-service-cost-dubai-guide','/services/mercedes-oil-change-dubai'],
 'mercedes-service-cost-dubai-guide':['/blog/mercedes-service-intervals-dubai-heat','/blog/mercedes-benz-maintenance-guide-dubai','/services/mercedes-diagnostics-dubai'],
 'best-oil-change-dubai-mercedes':['/services/mercedes-oil-change-dubai','/blog/mercedes-service-intervals-dubai-heat','/blog/mercedes-service-cost-dubai-guide'],
 'mercedes-repair-dubai-complete-guide':['/services/mercedes-diagnostics-dubai','/services/mercedes-mechanical-repair-dubai','/services/mercedes-suspension-repair-dubai','/services/mercedes-transmission-repair-dubai','/services/mercedes-electrical-repair-dubai'],
 'transmission-service-7g-9g-dubai':['/services/transmission-repair-dubai'],
 'air-suspension-repair-dubai-guide':['/services/suspension-repair-dubai'],
}
findings=[];records=[]
for slug in slugs:
  for prefix in ('','/ar'):
    path=prefix+'/blog/'+slug
    old=extract(before[path]);new=extract(after[path]);errors=[];notes=[]
    if new['canonical']!=old['canonical']:errors.append('Canonical changed')
    if new['noindex']!=old['noindex']:errors.append('Noindex changed')
    if len(new['h1'])!=1:errors.append('Expected one H1')
    if len(set(new['schema_types']))!=len(new['schema_types']):notes.append('Duplicate schema type: inspect separately')
    for required in ('BlogPosting','BreadcrumbList'):
      if required not in new['schema_types']:errors.append('Missing '+required)
    if 'Service' in new['schema_types']:errors.append('Supporting article unexpectedly has Service schema')
    for faq in new['faqs']:
      if not faq['question_in_main']:errors.append('FAQ question absent from main: '+faq['question'])
      if not faq['answer_in_initial_main'] and not faq['question_is_disclosure']:errors.append('FAQ answer absent without disclosure: '+faq['question'])
      if not faq['answer_in_initial_main'] and faq['question_is_disclosure']:notes.append('Collapsed FAQ answer requires browser expansion: '+faq['question'])
    broken=[]
    for link in new['links']:
      url=urlsplit(link['href'])
      if (link['href'].startswith('/') or url.netloc=='digitecme.com') and url.path and url.path not in routes:broken.append(link)
    if broken:errors.append('Internal main links absent from public route inventory')
    hrefs={urlsplit(link['href']).path for link in new['links']}
    for expected in expected_next_steps[slug]:
      if prefix+expected not in hrefs:errors.append('Expected next-step owner absent: '+prefix+expected)
    if prefix and any(link['href'].startswith('/') and not (link['href']=='/ar' or link['href'].startswith('/ar/')) for link in new['links']):errors.append('Unexpected English internal link in Arabic main content')
    if prefix and any('/ar/mercedes/problems' in l['href'] or '/ar/mercedes/models' in l['href'] for l in new['links']):errors.append('Invented Arabic model/problem link')
    if not prefix:
      for old_claim in ['Generic workshops often lack','tend to fail earlier in UAE summers','specialist repair ensures long term savings','most air suspension complaints in Dubai start','after any component replacement']:
        if old_claim in new['main_text']:errors.append('Unqualified old claim remains: '+old_claim)
    old_summary={k:v for k,v in old.items() if k not in ('main_text','article_text','links')}
    new_summary={k:v for k,v in new.items() if k not in ('main_text','article_text')}
    records.append({'path':path,'errors':errors,'notes':notes,'broken_links':broken,'before':old_summary,'after':new_summary,'main_word_count_before':len(old['main_text'].split()),'main_word_count_after':len(new['main_text'].split())})
    findings.extend({'path':path,'error':e} for e in errors)

controls=[]
control_slugs=['bmw-maintenance-guide-dubai','ferrari-maintenance-guide-dubai','lamborghini-maintenance-guide-dubai','rolls-royce-best-workshop-dubai','car-ac-repair-dubai','brake-repair-dubai','dealer-vs-independent-workshop-dubai']
for slug in control_slugs:
  for prefix in ('','/ar'):
    path=prefix+'/blog/'+slug
    if path not in before or path not in after:continue
    old=extract(before[path]);new=extract(after[path])
    fields=['title','description','canonical','noindex','h1','schema_types','faqs','article_text']
    changed=[field for field in fields if old[field]!=new[field]]
    controls.append({'path':path,'changed_fields':changed,'html_identical':before[path]['htmlHash']==after[path]['htmlHash']})
    if changed:findings.append({'path':path,'error':'Unrelated control changed: '+', '.join(changed)})

result={'passed':not findings,'scope':'14 existing EN/AR guide routes plus 14 unrelated control articles; read-only saved rendered HTML/SEO comparison; no build','findings':findings,'routes':records,'unrelated_controls':controls}
(OUT/'guides-rendered-qa.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'passed':result['passed'],'target_routes':len(records),'controls':len(controls),'findings':findings,'faq_counts':{r['path']:len(r['after']['faqs']) for r in records}},ensure_ascii=False,indent=2))
