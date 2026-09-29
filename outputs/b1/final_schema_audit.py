import json,re
from pathlib import Path
from lxml import html
base=Path(__file__).resolve().parents[2]
out=base/'outputs/b1'
pages={x['path']:x for x in json.loads((out/'after-pages.json').read_text(encoding='utf-8'))}
routes={x['path']:x for x in json.loads((out/'after-routes.json').read_text(encoding='utf-8'))}
primary=json.loads((out/'primary-pages.json').read_text(encoding='utf-8'))
issues=[]; alternates=0; articles=0; services=0; faq=0; dated=0; rating=0
for path in primary:
    rec=pages[path]; canonical=rec['seo']['canonical']; doc=html.fromstring((base/'dist'/path.lstrip('/')/'index.html').read_text(encoding='utf-8'))
    graph=rec['seo']['jsonLd'].get('@graph',[])
    crumbs=[n for n in graph if n.get('@type')=='BreadcrumbList']
    if len(crumbs)!=1 or crumbs[0]['itemListElement'][-1]['item']!=canonical:issues.append(f'{path}: breadcrumb URL mismatch')
    ids=[n.get('@id') for n in graph if n.get('@id')]
    if len(ids)!=len(set(ids)):issues.append(f'{path}: duplicate route schema IDs')
    if sum(n.get('@type')=='FAQPage' for n in graph)>1:issues.append(f'{path}: duplicate FAQPage')
    if any(n.get('@type') in ('Review','AggregateRating') for n in graph):rating+=1;issues.append(f'{path}: review/rating schema')
    for n in graph:
        kind=n.get('@type')
        if kind=='Service':
            services+=1
            if n.get('url')!=canonical:issues.append(f'{path}: Service URL mismatch')
        if kind=='BlogPosting':
            articles+=1
            if n.get('url')!=canonical:issues.append(f'{path}: Article URL mismatch')
            published=n.get('datePublished');modified=n.get('dateModified')
            if published and modified:
                dated+=1
                if published>modified:issues.append(f'{path}: article modification before publication')
                if modified!=routes[path]['lastmod']:issues.append(f'{path}: article/sitemap modification date differs')
        if kind=='FAQPage':
            faq+=1
            questions=[x['name'].casefold() for x in n.get('mainEntity',[])]
            if len(questions)!=len(set(questions)):issues.append(f'{path}: repeated FAQ question')
    alt=[n for n in doc.xpath('//head/link') if n.get('rel')=='alternate']
    alternates+=len(alt)
    for n in alt:
        url=n.get('href') or ''
        target=url.removeprefix('https://digitecme.com')
        if target not in routes:issues.append(f'{path}: hreflang target absent {url}')
        elif not routes[target]['indexable']:issues.append(f'{path}: hreflang target noindex {url}')
    if not routes[path]['indexable'] and alt:issues.append(f'{path}: noindex page emits alternates')
    scripts=[n for n in doc.xpath('//head/script') if n.get('type')=='application/ld+json']
    route_scripts=[n for n in scripts if n.get('data-route-jsonld')=='true']
    if len(route_scripts)!=1:issues.append(f'{path}: route JSON-LD count {len(route_scripts)}')
summary={'passed':not issues,'pages':len(primary),'service_nodes':services,'article_nodes':articles,'article_dates_checked':dated,'faq_page_nodes':faq,'hreflang_links_checked':alternates,'review_or_rating_nodes':rating,'issues':issues}
(out/'final-schema-verification.json').write_text(json.dumps(summary,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(json.dumps(summary,indent=2,ensure_ascii=False))
raise SystemExit(0 if not issues else 1)
