exec(open('outputs/b5/duplication.py',encoding='utf-8-sig').read().split("print('cross-brand")[0]);
for p in sorted([x['path'] for x in b if '/blog/' in x['path'] and 'best-workshop' in x['path']]):
 d=html.fromstring(gzip.decompress((Path('outputs/b5')/next(x for x in b if x['path']==p)['htmlFile']).read_bytes()).decode('utf8'))
 texts=[re.sub(r'\s+',' ',e.text_content()).strip() for e in d.xpath('//main//p')];long=[t for t in texts if len(t)>120];both=[t for t in long if any(t==u for u,_ in shared)];print(p,len(both),len(long),round(sum(map(len,both))/sum(map(len,long)),2))
