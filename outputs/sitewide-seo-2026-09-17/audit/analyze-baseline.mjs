import {readFile,writeFile} from 'node:fs/promises';
const base = 'outputs/sitewide-seo-2026-09-17/audit';
const evidence=JSON.parse(await readFile('outputs/seo-2026-09-16/gsc-evidence.json','utf8'));
const queries=evidence.sheets.Queries, pages=evidence.sheets.Pages;
const band=p=>p<=8?'1–8':p<=20?'above 8–20':p<=30?'above 20–30':'above 30';
const bands=rows=>rows.reduce((o,r)=>{const b=band(r.Position);o[b]??={rows:0,clicks:0,impressions:0};o[b].rows++;o[b].clicks+=r.Clicks;o[b].impressions+=r.Impressions;return o;},{});
const report={source:'outputs/seo-2026-09-16/gsc-evidence.json',actualPeriod:'2026-09-07 through 2026-09-13',chart:evidence.aggregates.Chart,
  queryBands:bands(queries),pageBands:bands(pages),
  quickOpportunities:queries.filter(q=>q.Position>8&&q.Position<=20).sort((a,b)=>b.Impressions-a.Impressions).slice(0,40),
  mediumOpportunities:queries.filter(q=>q.Position>20&&q.Position<=30).sort((a,b)=>b.Impressions-a.Impressions).slice(0,25),
  priorityPageOpportunities:pages.filter(q=>q.Position>8&&q.Position<=30).sort((a,b)=>b.Impressions-a.Impressions).slice(0,35),
  caveats:evidence.limitations,
};
await writeFile(`${base}/historical-ranking-opportunities.json`,JSON.stringify(report,null,2));
const records=JSON.parse(await readFile(`${base}/baseline-local-records.json`,'utf8'));
const clean=s=>s.replace(/<(script|style|svg|footer|nav)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi,h=>/<h1\b/i.test(h)?h:' ').replace(/<[^>]*>/g,' ').replace(/&(?:[a-z]+|#\d+);/g,' ').replace(/\s+/g,' ').toLowerCase().trim();
const all=[];
for(const record of records.filter(r=>r.indexable&&['brand-service','article','workshop-guide'].includes(r.family))) {
  const html=await readFile(`dist${record.path}/index.html`,'utf8');
  const content=clean(html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1]||html);
  const words=content.match(/[\p{L}\p{N}]+/gu)||[];
  const shingles=new Set();for(let i=0;i<words.length-4;i++)shingles.add(words.slice(i,i+5).join(' '));
  all.push({path:record.path,family:record.family,language:record.language,shingles});
}
const near=[];
for(let i=0;i<all.length;i++) for(let j=i+1;j<all.length;j++) {
  const a=all[i],b=all[j];if(a.family!==b.family||a.language!==b.language)continue;
  if(Math.min(a.shingles.size,b.shingles.size)/Math.max(a.shingles.size,b.shingles.size)<.7)continue;
  let intersection=0;const small=a.shingles.size<b.shingles.size?a.shingles:b.shingles,big=small===a.shingles?b.shingles:a.shingles;
  for(const item of small)if(big.has(item))intersection++;
  const similarity=intersection/(a.shingles.size+b.shingles.size-intersection);
  if(similarity>=.75)near.push({first:a.path,second:b.path,family:a.family,language:a.language,sharedFiveWordShinglesPercent:Math.round(similarity*1000)/10});
}
near.sort((a,b)=>b.sharedFiveWordShinglesPercent-a.sharedFiveWordShinglesPercent);
const review={method:'Jaccard similarity of lower-case 5-word shingles in body text, excluding shared site header, navigation, footer, SVG, script and style. Article H1 headers retained. No brand-name substitutions.',threshold:'75% chosen only to prioritize human review; not a Google spam or ranking threshold.',nearDuplicatePairs:near.length,affectedPages:new Set(near.flatMap(p=>[p.first,p.second])).size,byFamily:near.reduce((o,r)=>{o[r.family]=(o[r.family]||0)+1;return o},{}),pairs:near};
await writeFile(`${base}/baseline-near-duplicate-review.json`,JSON.stringify(review,null,2));
console.log(JSON.stringify({queryBands:report.queryBands,pageBands:report.pageBands,nearDuplicatePairs:review.nearDuplicatePairs,affectedPages:review.affectedPages,byFamily:review.byFamily,topExamples:near.slice(0,12)},null,2));
