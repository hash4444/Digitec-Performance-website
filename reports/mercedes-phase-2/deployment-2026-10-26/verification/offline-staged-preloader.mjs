// Synthetic verifier exercise. Replaces fetch with no real-network fallback.
import {readFile} from 'node:fs/promises';
import {resolve, dirname} from 'node:path';
const arg=name=>process.argv.find(v=>v.startsWith(`--${name}=`))?.slice(name.length+3);
const fixturePath=arg('synthetic-fixture');
if(!fixturePath) throw new Error('Offline fixture required');
const fixtureDir=dirname(resolve(fixturePath));
const fixture=JSON.parse(await readFile(resolve(fixturePath),'utf8'));
const requests=JSON.parse(await readFile(resolve(fixtureDir,'requests.json'),'utf8'));
const proposal=JSON.parse(await readFile(new URL('../../routing/redirect-proposals.json',import.meta.url),'utf8'));
const active=Number((arg('through')||'').replace(/^R/,''));
const scenario=arg('fixture-scenario')||'valid';
const bodies=new Map();
for(const c of fixture.cases) for(const row of c.chain) if(row.htmlFile) bodies.set(row.url,await readFile(resolve(fixtureDir,row.htmlFile),'utf8'));
for(const filename of ['robots.txt','sitemap.xml']) bodies.set('https://digitecme.com/'+filename,await readFile(resolve(fixtureDir,filename),'utf8'));
globalThis.__mercedesPhase2OfflineFixture=true;
globalThis.fetch=async(input,options={})=>{
 const url=String(input),method=options.method||'GET',u=new URL(url);
 const ruleIndex=proposal.rules.findIndex(r=>u.pathname===r.source||u.pathname===r.source+'/');
 if(ruleIndex>=0&&(ruleIndex<active||(scenario==='unexpected-pending-active'&&ruleIndex===active))) {
  const rule=proposal.rules[ruleIndex];
  const target=scenario==='loop'?url:rule.target+(scenario==='drop-query'?'':u.search);
  return new Response(method==='HEAD'?null:'<title>OFFLINE synthetic redirect</title>',{status:308,headers:{'content-type':'text/html',location:target}});
 }
 if(scenario==='protected-oil-changed'&&u.pathname.replace(/\/$/,'')==='/brands/mercedes-benz-service-dubai/oil-change') return new Response(method==='HEAD'?null:'Synthetic failure',{status:308,headers:{location:'https://digitecme.com/services/oil-change-dubai'}});
 const row=requests.find(r=>r.url===url&&r.method===method)||requests.find(r=>r.url===u.origin+u.pathname&&r.method===method);
 if(!row) throw new Error(`Offline fixture has no ${method} ${url}; no network fallback exists`);
 let body='';
 if(method==='GET') {
  if([301,302,303,307,308].includes(row.status)) body='<title>OFFLINE synthetic existing redirect</title>';
  else body=bodies.get(url)||bodies.get(u.origin+u.pathname)||bodies.get(row.canonical?.[0]);
  if(body===undefined) throw new Error(`Offline fixture lacks body ${url}`);
  if(scenario==='target-content-changed'&&u.pathname===new URL(proposal.rules[0].target).pathname) body=body.replace(/(<h1\b[^>]*>)/i,'$1Synthetic changed content ');
 }
 return new Response(method==='HEAD'?null:body,{status:row.status,headers:row.headers});
};
