import sys,difflib,json
sys.path.insert(0,'outputs/b6')
import audit
d=json.load(open('outputs/b6/audit-summary.json',encoding='utf8'))
for b,v in d['prior_brand_regression'].items():
 for p in v['substantive_changes']:
  x=audit.sig(audit.doc(p,'before'));y=audit.sig(audit.doc(p))
  print(b,p,'text',x[0]==y[0],'links',x[1]==y[1],'images',x[2]==y[2])
  if x[1]!=y[1]:print('links diff',set(y[1])-set(x[1]),set(x[1])-set(y[1]))
  if x[0]!=y[0]:
   m=difflib.SequenceMatcher(None,x[0],y[0]);print('text diff',[(a,b,c,x[0][b:c],y[0][e:f]) for a,b,c,e,f in m.get_opcodes() if a!='equal'][:5])
