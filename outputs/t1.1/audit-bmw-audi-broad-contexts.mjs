import fs from 'node:fs/promises';
import path from 'node:path';
const decode=s=>String(s).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&nbsp;',' ');
const text=s=>decode(s.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi,'').replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
async function walk(dir) { const result=[]; for(const item of await fs.readdir(dir,{withFileTypes:true})) { const file=path.join(dir,item.name); if(item.isDirectory()) result.push(...await walk(file)); else if(item.name==='index.html') result.push(file); } return result; }
const brand=/\b(?:BMW|Audi)\b|أودي|بي\s?إم\s?دبليو/i;
const broad=/\btun(?:e|ed|ing)\b|remap|chip|\bECU\b|performance|power|torque|calibrat|stage\s*[1-5]|boost|upgrad|optimi[sz]|برمجة|ضبط|قوة|عزم|تعديل|تحسين|معايرة|ترقي|أداء/i;
const contexts=[], files=await walk('dist');
let brandRoutes=0;
for(const file of files) {
  const route='/' + path.relative('dist',path.dirname(file)).replaceAll(path.sep,'/');
  const html=await fs.readFile(file,'utf8');
  const h1=text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]||'');
  const owned=/(?:^|\/|-)(?:bmw|audi)(?=[-/]|$)/i.test(route)||brand.test(h1);
  if(owned) brandRoutes++;
  function add(field,value) { if(broad.test(value)&&(owned||brand.test(value))) contexts.push({route,brandOwnedRoute:owned,field,text:value}); }
  for(const m of html.matchAll(/<(p|h[1-6]|li|summary|td|th|a|span)\b[^>]*>([\s\S]*?)<\/\1>/g)) add(m[1],text(m[2]));
  add('metadata.title',text(html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1]||''));
  add('metadata.description',decode(html.match(/<meta\b[^>]*name="description"[^>]*content="([^"]*)"/i)?.[1]||''));
  for(const m of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const schema=JSON.parse(m[1]);
    function visit(value,key='schema') { if(typeof value==='string') add(key,value); else if(value&&typeof value==='object') for(const [k,v] of Object.entries(value)) visit(v,`${key}.${k}`); }
    visit(schema);
  }
}
const unique=[...new Map(contexts.map(r=>[`${r.route}\0${r.field}\0${r.text}`,r])).values()];
const grouped=Object.values(Object.groupBy(unique,r=>r.text)).map(rows=>({text:rows[0].text,occurrences:rows.length,routes:[...new Set(rows.map(r=>r.route))],fields:[...new Set(rows.map(r=>r.field))]}));
const result={auditedAt:new Date().toISOString(),renderedRoutesScanned:files.length,brandOwnedRoutes:brandRoutes,broadKeywords:String(broad),matchedContexts:unique.length,uniqueSentences:grouped.length,grouped,contexts:unique};
await fs.writeFile('outputs/t1.1/bmw-audi-broad-rendered-contexts.json',JSON.stringify(result,null,2));
console.log(JSON.stringify({...result,contexts:undefined,grouped:grouped.map(({text,occurrences,routes,fields})=>({text,occurrences,routes:routes.slice(0,4),fields:fields.slice(0,3)}))},null,2));
