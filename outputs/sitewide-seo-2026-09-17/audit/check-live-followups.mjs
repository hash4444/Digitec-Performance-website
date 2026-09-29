import {readFile,writeFile} from 'node:fs/promises';
const base='outputs/sitewide-seo-2026-09-17/audit';
const summary=JSON.parse(await readFile(`${base}/baseline-live-summary.json`,'utf8'));
const targets=[...new Set([...summary.errors.map(e=>e.path),...summary.brokenLinks.map(e=>e.path)])];
const checks=[];
for(const path of targets) {
  const checkedAt=new Date().toISOString();
  try {
    const response=await fetch('https://digitecme.com'+path,{redirect:'manual',signal:AbortSignal.timeout(30000)});
    const html=await response.text();
    const result={path,checkedAt,status:response.status,headers:Object.fromEntries([...response.headers].filter(([k])=>k!=='set-cookie')),title:html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1],canonicals:[...html.matchAll(/<link\b(?=[^>]*rel="canonical")(?=[^>]*href="([^"]*)")[^>]*>/gi)].map(m=>m[1]),h1:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>m[1].replace(/<[^>]+>/g,' ')),robots:[...html.matchAll(/<meta\b(?=[^>]*name="robots")(?=[^>]*content="([^"]*)")[^>]*>/gi)].map(m=>m[1]),bodyBytes:Buffer.byteLength(html)};
    checks.push(result);
    await writeFile(`${base}/followup-${path.replaceAll('/','_')}.html`,html);
  } catch(e) {checks.push({path,checkedAt,error:e.message});}
}
await writeFile(`${base}/baseline-live-followups.json`,JSON.stringify(checks,null,2));
console.log(JSON.stringify(checks.map(({path,status,canonicals,robots,error})=>({path,status,canonicals,robots,error})),null,2));
