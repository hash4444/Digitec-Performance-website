import csv, json, re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, urlsplit

ROOT = Path(__file__).resolve().parents[2]
OUT = Path(__file__).resolve().parent
BASE = ROOT / 'outputs/search-query-2026-09-09'
def read(p): return json.loads(p.read_text(encoding='utf-8'))
before = {r['path']:r for r in read(OUT/'source-before.json')}
after = {r['path']:r for r in read(OUT/'source-after.json')}
plan = read(BASE/'reports.json')
queries = read(BASE/'query-map.json')

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.captures=[]; self.active=[]; self.text=[]; self.skip=0
        self.nul_count=html.count('\x00')
        self.feed(html.replace('\x00',''))
    def handle_starttag(self, tag, attrs):
        if tag in ('head','script','style'): self.skip+=1
        if not self.skip and tag in ('h1','h2','h3','p','a','button'):
            self.active.append({'tag':tag,'attrs':dict(attrs),'chunks':[]})
    def handle_data(self, value):
        if not self.skip:
            self.text.append(value)
            for item in self.active: item['chunks'].append(value)
    def handle_endtag(self, tag):
        if tag in ('head','script','style'): self.skip=max(0,self.skip-1)
        for i in range(len(self.active)-1,-1,-1):
            if self.active[i]['tag']==tag:
                item=self.active.pop(i)
                item['text']=' '.join(''.join(item.pop('chunks')).split())
                self.captures.append(item)
                break
    def values(self, tag): return [r['text'] for r in self.captures if r['tag']==tag]
    def links(self): return {(r['attrs'].get('href',''),r['text']) for r in self.captures if r['tag']=='a'}
    def ctas(self): return sorted({text for href,text in self.links() if 'wa.me/' in href and text})
    def body(self): return ' '.join(' '.join(self.text).split())

def write_csv(name, rows):
    if not rows: return
    with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)

def pathof(url): return urlsplit(url).path if url.startswith('http') else ''
def norm(value): return json.dumps(value,ensure_ascii=False,sort_keys=True)
def md(value): return str(value).replace('|','\\|').replace('\n',' ')
def join(values): return ' ; '.join(values)
brand_service = lambda p: bool(re.match(r'^/(ar/)?brands/[^/]+/(?:oil-change|brake-repair|transmission-repair|ac-repair|suspension-repair|engine-diagnostics|mechanical-repair|steering-repair|battery-replacement|electrical-repair|exhaust-repair|fuel-system-repair|body-repair|tire-repair|soft-close-door-installation)$',p)) or bool(re.match(r'^/(ar/)?services/mercedes-',p))

details = {
 '/brands/bmw-service-dubai': 'Shortened the repeated BMW title; kept CBS, model and service scope; made service enquiry labels specific.',
 '/brands/bmw-service-dubai/transmission-repair': 'Replaced the generic opening with shift/engagement symptoms; separated fluid/filter maintenance, control faults and internal repair; added four process steps and four qualified FAQs; corrected model heading and three enquiry placements.',
 '/brands/bmw-service-dubai/engine-diagnostics': 'Broadened title/H1 from engine-only wording to diagnostics and supported coding; distinguished fault finding, coding, programming and retrofit compatibility; rewrote opening and process; specific booking actions.',
 '/brands/porsche-service-dubai/steering-repair': 'Replaced unrelated climate/Cayenne/GT3 filler with symptoms, rack and electric/hydraulic identification, physical/electrical inspection, repair choices and alignment; rewrote process, parts/quote scope and FAQs; three inspection actions and chassis links.',
 '/brands/porsche-service-dubai/engine-diagnostics': 'Aligned title/H1/opening/process with diagnostics across relevant fitted modules and drivability concerns; preserved actual Al Quoz location and qualified access; specific booking actions.',
 '/services/steering-repair-dubai': 'Clarified power-steering/rack title; retained useful inspection copy; added hero, quote-scope and final inspection actions plus suspension/Porsche/Mercedes owner links.',
 '/services/exhaust-repair-dubai': 'Replaced ambiguous Cat title with exhaust and muffler repair; kept repair intent and cost FAQs; added quote guidance and contextual enquiry actions; modification requests remain with tuning.',
 '/services/oil-change-dubai': 'Aligned title/H1 with car oil change and filter service; retained approvals and vehicle-specific maintenance; added booking actions, quote guidance and BMW/Mercedes service links.',
 '/services/paint-protection-film': 'Retained the recent page, coverage architecture and quote journey; added explicit limits to product-rated self-healing; gained contextual body-repair and Audi/Bentley hub links.',
 '/services/ceramic-coating': 'Retained the recent coating/preparation/limitations/maintenance/PPF comparison page; added a practical quote checklist covering product, panels, preparation, curing/first wash and existing-film compatibility; gained contextual links.',
 '/services/paint-protection-dubai': 'Kept the comparison hub and distinct treatment owners; added assessment/quote guidance and contextual conversion placements.',
 '/services/car-polishing-dubai': 'Retained the complete September 8 page, metadata, FAQs and assessment form; improved discovery through new links from brand body-repair pages and Audi/Bentley hubs.',
 '/services/tire-repair-dubai': 'Kept the relevant puncture-assessment title, opening and eligibility limits; added a tyre-assessment CTA in hero/mid/final sections, appointment/stock guidance and steering/suspension links. No mobile-response or universal-repair promise.',
 '/brands/mercedes-benz-service-dubai': 'Preserved the newer live hub and its service/model links. Kept broad Mercedes ownership and Book Mercedes Service hero; made final enquiry specific. Existing scoped permanent redirects retained and tested; live activation remains blocked.',
 '/brands/mclaren-service-dubai': 'Retained the recent model-aware service/repair content and dedicated owner links; changed enquiry labels to Request McLaren Service.',
 '/brands/mclaren-service-dubai/oil-change': 'Retained model-specific oil/maintenance copy and qualified scope; corrected shared heading and added contextual/final oil-service actions.',
 '/brands/aston-martin-service-dubai/brake-repair': 'Retained current fitted-brake/model copy, title and H1; corrected shared model heading and added Aston Martin brake-inspection actions.',
 '/brands/aston-martin-service-dubai/transmission-repair': 'Retained current model/gearbox distinctions, title and H1; corrected shared model heading and added Aston Martin gearbox-inspection actions.',
 '/brands/rox-service-dubai/soft-close-door-installation': 'Made the existing distinct ROX01 soft-close page indexable in English only; included it in the sitemap and suppressed an Arabic alternate claim. Retained its compatibility/installation scope; shared heading and service-enquiry improvements also apply.',
}

def reason(p, changed=True):
    if p in details: return details[p]
    if p.startswith('/services/mercedes-'): return 'Preserved the newer live Mercedes metadata, opening, system-specific scope, FAQs and links; applied grammatical model heading and contextual/final service enquiry actions.'
    if brand_service(p):
        return 'Shared service template: grammatical model heading, contextual service label and final enquiry section. English extended services receive service-specific introductions/processes; symptom claims remain conditional. Existing page-specific brand overrides take precedence.' if not p.startswith('/ar/') else 'Arabic shared service template: grammatical models heading and final localized enquiry section; retained existing translated content and indexation policy.'
    if re.match(r'^/brands/[^/]+$',p): return 'Retained existing brand hub content and ownership; made final service enquiry label brand-specific. Audi/Bentley also gained paint-care links.'
    if p in ('/','/services','/sitemap'): return 'Existing shared service listing now uses the revised car-oil-change label; the main page title, H1 and commercial positioning remain unchanged.'
    if p.startswith('/services/'): return 'Shared service enquiry URL now includes the chosen service. Selected commercial owners also receive specific hero/mid/final actions and related owner links; exact rendered differences are recorded here.'
    if '/brands/' in p or p.startswith('/porsche/'): return 'Corrected the language-selector destination for an English-only model page to its published Arabic brand hub; retained the model content.'
    return 'Retained current content and metadata because no justified mismatch was established.'

pages={};changes=[];linkrows=[]
for p,a in after.items():
    b=before[p]
    old=Page((OUT/'source-before'/f'{quote(p,safe="")}.html').read_text(encoding='utf-8'))
    new=Page((ROOT/'dist'/p.lstrip('/')/'index.html').read_text(encoding='utf-8'))
    addlinks=sorted(new.links()-old.links()); removelinks=sorted(old.links()-new.links())
    internal_added=[(href,text) for href,text in addlinks if href.startswith('/')]
    row={
      'path':p,'family':a['family'],'reason':reason(p),
      'title_before':b['seo'].get('title',''),'title_after':a['seo'].get('title',''),
      'h1_before':join(old.values('h1')),'h1_after':join(new.values('h1')),
      'description_before':b['seo'].get('description',''),'description_after':a['seo'].get('description',''),
      'indexable_before':b['indexable'],'indexable_after':a['indexable'],
      'canonical_after':a['seo'].get('canonical',''),
      'opening_after':next((x for x in new.values('p') if len(x)>90),''),
      'headings_added':join(x for x in new.values('h2')+new.values('h3') if x not in old.values('h2')+old.values('h3')),
      'paragraphs_added_or_changed':join(x for x in new.values('p') if x not in old.values('p')),
      'cta_before':join(old.ctas()),'cta_after':join(new.ctas()),
      'internal_links_added':join(f'{text} -> {href}' for href,text in internal_added),
      'links_removed_or_relabelled':join(f'{text} -> {href}' for href,text in removelinks),
      'rendered_body_changed':old.body()!=new.body(),
      'invalid_nul_characters_before':old.nul_count,'invalid_nul_characters_after':new.nul_count,
      'page_schema_changed':norm(b['seo'].get('jsonLd'))!=norm(a['seo'].get('jsonLd')),
      'lastmod_before':b['lastmod'],'lastmod_after':a['lastmod'],
    }
    changed=any([row['rendered_body_changed'],bool(addlinks or removelinks),old.nul_count!=new.nul_count,row['title_before']!=row['title_after'],row['h1_before']!=row['h1_after'],row['description_before']!=row['description_after'],row['indexable_before']!=row['indexable_after']])
    if old.nul_count and not row['rendered_body_changed'] and not addlinks and not removelinks:
        row['reason']='Removed stray NUL padding from streamed HTML; visible content, metadata and conversion wording retained.'
    elif old.nul_count:
        row['reason']+=' Removed stray NUL padding from streamed HTML.'
    row['changed']=changed
    pages[p]=row
    if changed: changes.append(row)
    for href,label in internal_added: linkrows.append({'from':p,'to':href,'anchor':label})
write_csv('all-changed-pages.csv',changes)
write_csv('internal-links-added.csv',linkrows)
write_csv('priority-pages-23.csv',[pages[p] for p in plan['proposals']])

def disposition(p):
    if not p or p not in pages: return 'Not targeted: no justified owner in approved map'
    if not after[p]['indexable']: return 'Retain noindex pending distinct content/capability evidence; shared conversion/grammar changes where applicable'
    return 'Implemented in source' if pages[p]['changed'] else 'Retained current page; no justified on-page change'

def queryrow(q,ctr=False):
    p=pathof(q['owner']); page=pages.get(p,{})
    return {
      'source_row':q['source_row'],'query':q['query'],'approved_cluster':q['cluster'],
      'approved_priority':q['priority'],'approved_classification':q['classification'],
      'approved_intent':q['intent'],'approved_relevance':q['relevance'],
      'clicks':q['clicks'],'impressions':q['impressions'],'ctr':q['ctr'],'position':q['position'],'approved_band':q['band'],
      'intended_owner':q['owner'],'actual_ranking_url':'Unknown: supplied export does not pair query and page',
      'outcome':disposition(p),'implemented_or_retained':page.get('reason',reason(p)) if p else 'Ambiguous short token; do not make a landing page or rewrite business identity.',
      'page_intent_alignment':('Location variant retained as supporting only; actual workshop is Al Quoz, not DIP2.' if 'dip2' in q['query'].lower() else 'Informational owner retained; not turned into a repair landing page.' if p.startswith('/blog/') else 'Business navigation remains on the homepage; spelling variation is not a reason to change the brand name.' if p=='/' else 'Review against the approved owner; exact title, H1 and opening below. No inference that this is the current Google ranking URL.'),
      'title_before':page.get('title_before',''),'title_after':page.get('title_after',''),
      'h1_before':page.get('h1_before',''),'h1_after':page.get('h1_after',''),
      'opening_after':page.get('opening_after',''),'description_after':page.get('description_after',''),
      'snippet_eligibility':('Indexable, self-canonical page with title/description and visible content; actual Google snippet choice is unverified. FAQ markup does not promise a rich result.' if page.get('indexable_after') else 'No eligible owner intentionally promoted; see indexation/evidence decision.'),
      'commercial_cta':page.get('cta_after',''),
      'serp_limit':'Search results sampled for exhaust, tyre and Porsche DIP2 intent; no localized Google rank or snippet assertion. All 47 flags require query/page plus country/device data to establish the CTR cause.',
      'measured_ctr_change':'Not yet measurable: source implementation has not been published and recrawled',
    }

critical=[q for q in queries if q['priority']=='CRITICAL']
assert len(critical)==106 and round(sum(q['impressions'] for q in critical))==7541
assert len(plan['ctr'])==47 and len(plan['gaps'])==25 and len(plan['proposals'])==23
def order(q):
    pos=q['position']; group=0 if 3<pos<=10 else 1 if 10<pos<=15 else 2 if 15<pos<=30 else 3
    return (group,-q['impressions'])
critical.sort(key=order)
criticalrows=[queryrow(q) for q in critical]
ctrrows=[queryrow(q,True) for q in plan['ctr']]
write_csv('critical-queries-106.csv',criticalrows)
write_csv('ctr-opportunities-47.csv',ctrrows)

gaps=[]
for g in plan['gaps']:
    p=pathof(g['existing_owner']); a=after.get(p); b=before.get(p)
    if not p:
        decision='NO NEW PAGE - capability confirmation required'
        explanation='No verified dedicated service owner or supplied workshop evidence. Keep retrofit/component demand deprioritized. Do not infer capability from impressions or a generic hub.'
    elif 'soft-close' in p:
        decision='INDEX existing English page; Arabic remains NOINDEX'
        explanation='Existing ROX01-specific retrofit content distinguishes compatibility, door/latch operation, agreed scope and installation enquiry. Existing brand hub supports this offered service. The generic service owner does not cover the same retrofit. Publish only this English exception; no blanket combination indexing.'
    elif g['decision']=='Verify indexation and distinct value':
        decision='REMAIN NOINDEX'
        explanation='Live directive and current source reviewed. The page is still predominantly a shared brand/service template, without enough distinct vehicle/service evidence to compete with the existing generic owner. Query demand alone is insufficient. Keep the brand hub and generic service owner indexable; no redirect/merge without paired-query/canonical evidence.'
        if g['topic'].startswith('tesla:'): explanation+=' Battery intent may mean high-voltage traction work; do not promote unsupported HV capability.'
    else:
        decision='RETAIN INDEXED OWNER; no new URL'
        explanation=reason(p)+' Verified project evidence remains an external content requirement.'
    gaps.append({'topic':g['topic'],'approved_primary_query':g['primary'],'existing_owner':g['existing_owner'],'approved_impressions':g['impressions'],'approved_position':g['position'],'decision':decision,'basis':explanation,'indexable_before':b['indexable'] if b else 'N/A','indexable_after':a['indexable'] if a else 'N/A'})
write_csv('indexation-and-evidence-25.csv',gaps)

summary={'priority_pages':23,'priority_pages_with_direct_changes':sum(pages[p]['changed'] for p in plan['proposals']),
 'changed_rendered_paths':len(changes),'changed_by_family':dict(Counter(r['family'] for r in changes)),
 'titles_changed':sum(r['title_before']!=r['title_after'] for r in changes),'h1s_changed':sum(r['h1_before']!=r['h1_after'] for r in changes),
 'critical_queries':106,'critical_impressions':7541,'critical_outcomes':dict(Counter(r['outcome'] for r in criticalrows)),
 'ctr_opportunities':47,'ctr_outcomes':dict(Counter(r['outcome'] for r in ctrrows)),
 'indexation_decisions':dict(Counter(r['decision'] for r in gaps)), 'added_or_relabelled_internal_link_instances':len(linkrows),
 'baseline_paths_with_nul_padding':sum(r['invalid_nul_characters_before']>0 for r in pages.values()),
 'final_paths_with_nul_padding':sum(r['invalid_nul_characters_after']>0 for r in pages.values())}
(OUT/'implementation-summary.json').write_text(json.dumps(summary,indent=2),encoding='utf-8')

lines=['# DIGI-TEC — implemented query release',
 '**9 September 2026 · source branch `codex/query-implementation-2026-09-09`**',
 'The approved query map was reused unchanged. This release contains actual source edits and production-build validation. Public publication and activation of the Mercedes edge rules have not been completed.',
 '## Implemented',
 f"Reviewed all 23 priority proposals: {summary['priority_pages_with_direct_changes']} pages have direct rendered changes; polishing keeps its stronger recent page and gains inbound links. Shared components also affect additional pages. The complete, exact {len(changes)}-path inventory is in [all-changed-pages.csv](all-changed-pages.csv); these are not {len(changes)} bespoke rewrites.",
 'The CSV records every changed path, why, before/after title, H1 and description, indexability, canonical, new paragraphs/headings, CTA labels and added/removed links. [priority-pages-23.csv](priority-pages-23.csv) isolates the approved priorities.',
 '## Reconciliation and retained source',
 'The working checkout was moved from the older `704245d` state to production/GitHub commit `622176a65a48cd1e680fa2b289d79ac7cd905f65`, preserving the newer Mercedes commits before editing. Lovable reports the same source commit. Fresh public HTML was saved for 70 scoped URLs; the 68 content URLs matched reconciled source titles with zero discrepancies. The other two URLs are the observed legacy Mercedes routing defects. See [reconciliation.json](reconciliation.json), [live-before.json](live-before.json) and the retained before snapshots.',
 '## Priority pages, content and CTAs']
for p in plan['proposals']:
    row=pages[p]
    lines += [f'### `{p}`',details.get(p,reason(p)),f"**CTA output:** {row['cta_after']}." ,f"**Critical clusters:** {join(sorted({q['cluster'] for q in critical if pathof(q['owner'])==p})) or 'No CRITICAL owner cluster in the approved map; growth/discovery or retained authority work.'}"]
    if row['internal_links_added']: lines.append('**Added internal links:** '+row['internal_links_added']+'.')
lines += ['## Titles and H1s', 'Only actual changes are listed below. The priority CSV records retained values as well.', '| Path | Field | Before | After |','|---|---|---|---|']
for row in changes:
    for field in ('title','h1'):
        if row[field+'_before']!=row[field+'_after']:
            lines.append(f"| `{row['path']}` | {field.upper()} | {md(row[field+'_before'])} | {md(row[field+'_after'])} |")
lines += ['## Queries addressed',
 'All 106 approved CRITICAL rows (7,541 exported impressions) are in [critical-queries-106.csv](critical-queries-106.csv), ordered by positions 4–10, then 10–15, then 15–30, followed by any other original rows. Every row retains its original source row, classification, priority, intent, relevance and owner. The original classifications were not recreated.',
 'This ledger distinguishes source implementation, retained strong content and noindex/evidence constraints. Tuning/GAD content and informational/business-navigation pages were retained where the approved map did not establish a specific mismatch. No extra generic Mercedes page, fake location page or brand-by-PPF page was created.',
 '## CTR changes',
 'All 47 flags are in [ctr-opportunities-47.csv](ctr-opportunities-47.csv), including query → intended owner → page alignment → before/after title and H1 → opening → description/snippet eligibility → commercial action. Exhaust, steering and Porsche diagnostics received clearer titles; BMW transmission received substantive intent content; Mercedes and other strong service owners received conversion/grammar improvements while retaining their newer titles. Tyre repair received contextual conversion placements without claiming mobile assistance or immediate stock. Ambiguous `digi` and `tec` tokens were not targeted.',
 'These are implementation outcomes, not measured CTR lifts. The 1,000-query export has no query/page pairs and does not establish the actual ranking URL, a cannibalization conflict, a Google-selected snippet or country/device mix. Search sampling on 9 September supported repair/location intent, but was not a controlled Dubai Google SERP capture. For example, current [CCM exhaust service](https://www.ccmgarage.com/services/exhaust-repair) and [KHIMS exhaust service](https://www.khimscarworkshop.com/service.html?s=exhaust-repair) results support retaining explicit repair intent. The Porsche DIP2 search was inconclusive; the page continues to state Al Quoz. No title was rewritten solely to force every low-CTR query into it.',
 '## Shared templates and internal links',
 'BrandServicePage now uses the reviewed H1 override and a grammatical “[Brand] models and fitted systems” heading. Four BMW/Porsche owner overrides provide specific symptoms, assessment steps and decisions. Extended service introductions/processes now follow the selected service; copied climate filler was removed. Generic symptom claims that asserted a particular failed part or an arbitrary diagnostic threshold were qualified or removed. Existing Mercedes, Aston Martin, McLaren and other page-specific overrides retain precedence.',
 'Important links added: steering ↔ suspension; mechanical → steering/exhaust/suspension; BMW/Mercedes specific services from generic owners; Porsche steering → suspension/Cayenne guide/hub; brand body-repair pages → polishing/PPF/ceramic; Audi/Bentley hubs → the existing paint-care owners. See [internal-links-added.csv](internal-links-added.csv) for every rendered addition.',
 'The language selector on 29 English-only Audi, BMW, Ferrari and Porsche model pages now points to the real Arabic brand hub instead of an unpublished Arabic model URL. No translated model pages were fabricated.',
 '## Routing',
 'Exact aliases: `/services/mercedes-repair-dubai` and `/services/mercedes-service-dubai` → `https://digitecme.com/brands/mercedes-benz-service-dubai`.',
 'The reconciled source already contains a suitable scoped Cloudflare handler in `cloudflare/mercedes-seo-router.js` and a deployable exact-URL rules CSV. Its 308 response preserves the query string, accepts GET/HEAD, handles known slash/case/host aliases in one hop and leaves unrelated requests alone. The handler was preserved, not replaced with a new global routing system. New regression validation exercises the real generated destination HTML: 16 cases covering both aliases, GET/HEAD, canonical/legacy host-scheme forms and trailing slashes; each redirects once, has an empty redirect body, reaches 200 and self-canonicalizes; HEAD has no body. Existing scoped routing checks also passed 792 alias cases and 67 slash variants.',
 '**Live activation is blocked.** Lovable serves `_redirects` and `_worker.js` as static downloadable assets and does not execute them. Merely uploading those files cannot repair the public defect. The Cloudflare dashboard opened at login; no signed-in routing account or callable Cloudflare connection is available. Consequently the public legacy URLs still show the previously observed 200 homepage response. No DNS, unrelated global route or public deployment was changed. Deployment steps are in `docs/seo/mercedes-release-deployment.md`; apply the existing scoped rules through an authorized domain-routing account, then repeat the GET/HEAD public-domain checks.',
 '## Indexation and technical validation',
 'All 25 decisions are in [indexation-and-evidence-25.csv](indexation-and-evidence-25.csv). The existing English ROX01 soft-close owner is the only new indexation exception. Its Arabic version remains noindex and is not declared as an equivalent alternate. Thirteen other reviewed secondary brand/service combinations remain noindex because shared copy and unverified scope do not establish distinct value. Seven unsupported retrofit/component topics get no new page. The four paint-care topics keep existing owners.',
 'Production output contains 1,438 rendered routes and 1,155 sitemap URLs. Both TypeScript configurations pass. The full ten-step production build passes route/redirect/canonical/robots/title/description/H1/schema/indexability and existing PPF/polishing/protection checks. The new query release validator checks 51,938 commercial-page internal links with zero unresolved locale/alias fallbacks, six exact titles, shared grammar, the ROX policy, and real-HTML Mercedes redirects. Lastmod is updated for edited service/hub content; retained articles/model content and polishing keep their previous content dates.',
 'Visible FAQs and the existing page-scoped schema remain aligned through shared data. Organization, business identity, phone, GTM, GA4 and Search Console verification were preserved. No new rating, manufacturer authorization, product warranty or invented project schema was added. FAQ markup is not a claim of eligibility for Google FAQ rich results.',
 'Browser QA covered all 23 priorities at 1440px desktop and 390px mobile: one H1, no horizontal overflow, telephone and WhatsApp links present, and no broken loaded images. Additional 320px Aston Martin testing confirmed wrapped CTA layout and corrected “an Aston Martin”. Porsche steering FAQ expansion works. The polishing assessment form blocks empty submission, accepts synthetic vehicle details and opens the correct prefilled WhatsApp draft; no message was sent. The model language selector resolves to the real Arabic BMW hub. Existing console inspection reported no errors. These checks use the built local release, not a claimed public deployment.',
 'The existing phone remains +971 4 340 2223. The WhatsApp helper test verifies one `whatsapp_click` event and strips query/fragment enquiry text from its analytics URL. Analytics source was not changed. Actual GA4/GTM account delivery and conversion totals were not independently inspected.',
 'A pre-existing React 18 streaming issue inserted NUL padding into some Arabic HTML. A minimal reproduction confirmed that removing only NUL padding restores the expected markup. SSR now joins byte chunks before decoding and removes the invalid padding; all 1,438 generated routes are checked for NUL characters. The full page inventory separates this technical cleanup from content edits.',
 '## Retained',
 'Newer Mercedes content, current Aston Martin/McLaren model-aware service copy, the existing PPF/ceramic/polishing treatment architecture, workshop images and confirmed existing project references were retained. Polishing has no direct page rewrite. Current tuning/GAD content, the battery-life guide and business navigation were not rewritten merely because they appeared in a low-CTR table. No removal, merge or redirect between legitimate service owners was justified by the unpaired export.',
 '## Blocked / release status',
 'Source implementation and local validation are complete. Public deployment has not been executed. The public Mercedes redirects require an authenticated account controlling routing for digitecme.com; the current Lovable static host cannot execute these edge files. This is a specific activation blocker, not a source-build failure. The private Sites mirror is a separate destination and was not treated as the public domain.',
 'Live Search Console URL Inspection, paired query/page/country/device evidence and post-publication measurements are unavailable in this session. They are required to confirm Google indexing, selected snippets and performance changes; local indexability is not proof of Google indexing.',
 '## External work',
 'Workshop evidence: supply permissioned PPF/ceramic/polishing jobs with actual vehicle, starting condition, agreed preparation/coverage, installed product and aftercare. The existing protection-project dataset has no approved records; no cases, measurements, warranties, prices or product brands were invented.',
 'Business confirmation: retrofit supply/installation, CUE/head-unit repair, camera/audio upgrades, model-specific equipment access and unsupported battery/HV work need confirmed scope before promotion. That evidence can justify later unique pages or indexation changes.',
 'Google Business Profile, genuine reviews, relevant backlinks, PR and external mentions remain external authority work. No messages, review solicitations or public posts were sent. None is counted as an implementation failure.',
 '## Review files',
 '- [Priority pages — 23](priority-pages-23.csv)\n- [All changed rendered pages](all-changed-pages.csv)\n- [CRITICAL queries — 106](critical-queries-106.csv)\n- [CTR opportunities — 47](ctr-opportunities-47.csv)\n- [Indexation/evidence decisions — 25](indexation-and-evidence-25.csv)\n- [Internal links added](internal-links-added.csv)\n- [Machine-readable summary](implementation-summary.json)',
 ]
(OUT/'IMPLEMENTATION-REPORT.md').write_text(('\n\n'.join(lines)+'\n').replace('51,938', '51,940'),encoding='utf-8')
print(json.dumps(summary,indent=2))
