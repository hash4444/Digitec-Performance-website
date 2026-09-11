import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';
const dir=path.dirname(fileURLToPath(import.meta.url));
const read=async n=>JSON.parse(await fs.readFile(path.join(dir,n),'utf8'));
const queries=await read('query-map.json'), clusters=await read('clusters.json'), report=await read('reports.json'), source=await read('source.json'), live=await read('live.json');
const wb=Workbook.create();
const names=['Summary','Queries','Clusters','Page map','Priority changes','CTR opportunities','Impression quality','Ownership conflicts','Content gaps','Live checks','Scoring','Rules','Source metrics'];
const sheets=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const col=n=>{let s='';for(;n;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s;};
const ranges={};
function table(name,title,context,headers,rows,widths){
 const s=sheets[name], last=rows.length+5, end=col(headers.length);ranges[name]={last,end};
 s.showGridLines=false;
 s.getRange(`A1:${end}${last}`).format.font={name:'Arial',size:11,color:'#22272B'};
 s.getRange('A1').values=[[title]];s.getRange('A1').format.font={name:'Arial',size:17,bold:true,color:'#22272B'};
 s.getRange(`A1:${end}1`).format.rowHeight=30;
 s.getRange('A2').values=[[context]];s.getRange('A2').format.font={name:'Arial',size:10,color:'#5D6266'};
 s.getRange(`A3:${end}3`).format.borders={bottom:{style:'thin',color:'#B8491D'}};
 s.getRange(`A5:${end}5`).values=[headers];
 if(rows.length)s.getRange(`A6:${end}${last}`).values=rows;
 s.getRange(`A5:${end}${last}`).format.wrapText=true;
 s.getRange(`A5:${end}${last}`).format.verticalAlignment='top';
 headers.forEach((h,i)=>s.getRange(`${col(i+1)}5:${col(i+1)}${last}`).format.columnWidth=widths[i]||30);
 s.getRange(`A5:${end}5`).format={fill:'#252B30',font:{name:'Arial',size:11,color:'#FFFFFF',bold:true},wrapText:true,rowHeight:42,verticalAlignment:'center'};
 s.getRange(`A5:${end}5`).format.borders={insideVertical:{style:'thin',color:'#FFFFFF'}};
 if(rows.length){const t=s.tables.add(`A5:${end}${last}`,true,name.replace(/[^a-zA-Z]/g,'')+'Table');t.showFilterButton=true;t.style='TableStyleLight1';}
 rows.forEach((row,j)=>{
  const lines=Math.max(...row.map((v,i)=>String(v??'').split('\n').reduce((n,line)=>n+Math.max(1,Math.ceil(line.length/((widths[i]||30)*.88))),0)));
  s.getRange(`A${j+6}:${end}${j+6}`).format.rowHeight=Math.max(32,Math.min(300,lines*15+12));
 });
 if(rows.length>10){s.freezePanes.freezeRows(5);s.freezePanes.freezeColumns(1);}
 return s;
}
const ruleRows=[
 ['Intent weight',25,'Editorial work-order score; not a probability or traffic forecast.',''],
 ['Business value weight',20,'Assumed relative business value, not observed revenue or margin.',''],
 ['Ranking opportunity weight',25,'Near-page-one visibility gets greatest weighting.',''],
 ['Impression weight',10,'Logarithmic and capped to prevent raw volume dominating.',''],
 ['CTR triage weight',10,'Only page-one queries with sufficient impressions and low CTR qualify.',''],
 ['Existing page readiness weight',10,'1 = local indexable canonical owner with one H1; 0.25 = constrained owner; 0 = no owner. This is not an external authority score.',''],
 ['Maximum business value',5,'5 = luxury / business-priority service, 3 = standard service, 2 = tyre / informational or price-led, 1 = uncertain or outside scope, 0 = irrelevant.',''],
 ['Volume logarithm divisor',3,'MIN(LOG10(1 + impressions) / 3, 1).',''],
 ['CTR triage minimum impressions',20,'A review threshold, not a statistical benchmark.',''],
 ['CTR triage upper position',10,'Aggregate average position can conceal SERP, country and device variation.',''],
 ['CTR triage threshold',.01,'Below 1%; flag for investigation, not proof that the meta description is wrong.',''],
 ['Defend position ceiling',3,'Current ranking band, based on exported average position.',''],
 ['Near-win position ceiling',15,'CRITICAL needs >3 to 15, at least 20 impressions, value >=3 and adequate relevance.',''],
 ['High opportunity ceiling',30,'HIGH is an editorial action group. Lower-volume near-wins may be HIGH.',''],
 ['Middle position ceiling',40,'Above 40 requires stronger relevance/capability/indexation investigation.',''],
 ['Ranking factor at <=3',.3,'Defend rankings; avoid unnecessary change.',''],
 ['Ranking factor at >3–15',1,'Highest ranking opportunity factor.',''],
 ['Ranking factor at >15–30',.7,'Ranking/content/internal relevance work.',''],
 ['Ranking factor at >30–40',.4,'Substantial ranking improvement needed.',''],
 ['Ranking factor above 40',.15,'No CTR-only optimization.',''],
 ['Source period','7 Jun–6 Sep 2026','Filename says 8 Sep; analysis and live checks were on 9 Sep. The data contains 92 daily rows.','digitecme.com-Performance-on-Search-2026-09-08 (2).xlsx'],
 ['Observed query scope','1,000 exported rows','Rows cover 50,945 impressions / 106 clicks. Do not apply quality percentages to the 81,284 property impressions.','https://support.google.com/webmasters/answer/17010575?hl=en'],
 ['Query/page ownership','Not observed','The workbook has separate Queries and Pages tabs; recommended owners are editorial mappings, not ranking evidence.','https://support.google.com/webmasters/answer/17010961'],
 ['Page aggregation','Separate from property totals','Pages sum to 87,382 impressions / 390 clicks. Keep separate; multiple page results and aggregation can produce different totals.','https://support.google.com/webmasters/answer/17011364?hl=en'],
 ['Weighted average position','Approximate aggregate','SUM(impressions × exported average position) / SUM(impressions); source values are rounded and grouping differs.',''],
 ['Cluster score','Best member query score','Cluster priority follows the highest action priority among its member queries; aggregate position is descriptive, not the priority trigger.',''],
 ['Impression quality','Editorial, within exported queries','Primary commercial queries and dedicated service variants are high-value; close variations are supporting. Ambiguous entity, foreign-city and unverified capability demands are reduced.',''],
 ['Relevance multiplier','High 1; Medium 0.65; Low 0.2; Unverified 0.1; None 0','Near-me queries have no query-level geography in this export. Country totals cannot establish their individual locations.',''],
 ['Classification','PRIORITIZE / SUPPORT / SPLIT / DEPRIORITIZE / IGNORE','SPLIT means an existing distinct service owner, not a new page. No REASSIGN ranking claim is made without query/page evidence.',''],
 ['Local inventory','Current main source rendered separately','1,438 rendered routes, 1,158 locally indexable. Live sample overrides local title/H1 where checked. Not a proof of Google indexing.',''],
 ['Live/source mismatch','Six checked Mercedes pages','The live version has newer metadata than the local checkout; reconcile source before editing or deployment. Earlier publication notes are stale.','https://digitecme.com/services/mercedes-mechanical-repair-dubai'],
 ['Internal link counts','Rendered local referring pages','Includes shared navigation/footer and localized pages. Counts measure references, not authority, and are not a complete public crawl.',''],
 ['Technical limitations','Scoped read-only verification','33 public HTML responses; title/H1/canonical/robots and phone/WhatsApp targets checked. No browser interaction, form submission, URL Inspection, full public broken-link crawl or live analytics verification.',''],
 ['GEO approach','Useful original evidence and crawlable pages','Use reliable workshop-specific answers, clear service scope and visible facts. Google does not require special AI schema or llms.txt. Check Search Console AI inclusion settings.','https://developers.google.com/search/docs/fundamentals/ai-optimization-guide'],
 ['AI and lead measurement','Not supplied','This Web search export contains no AI citations, WhatsApp enquiries, calls, bookings, qualified leads or revenue. Clicks are not leads.',''],
 ['Workflow status','Analysis and proposed changes only','No website source, publishing, redirect, GTM/GA4 or business-profile change was made in this task.',''],
 ['Refresh behaviour','Reclassification requires review','Scores and aggregations recalculate from cells. Owner, intent, priority, reasons and proposal text describe this fixed export and need editorial review after replacement data.',''],
];
table('Rules','Method and source notes','Read these definitions before interpreting the opportunity score.',['Rule','Value','Explanation','Source'],ruleRows,[34,35,110,65]);
sheets.Rules.getRange('B16').setNumberFormat('0.0%');
const qheaders=['Query','Clicks','Impressions','CTR (export)','Average position','Priority','Editorial score','Classification','Query cluster','Primary / secondary','Intent','Business relevance','Recommended owner URL','Current ranking URL','Required action','Reason','Brand','Service / topic','Geography','Business value','Position band','Ranking opportunity','Impression quality','Source query row','Cannibalization evidence'];
const qs=table('Queries','Query master map','All 1,000 exported queries. Current ranking URLs are unknown; owner URLs are recommendations.',qheaders,queries.map(q=>[q.query,q.clicks,q.impressions,q.ctr,q.position,q.priority,null,q.classification,q.cluster,q.role,q.intent,q.relevance,q.owner,q.current_url,q.action,q.reason,q.brand,q.service,q.geo,q.value,q.band,q.opportunity,q.quality,q.source_row,'Unconfirmed — joint query/page data required']),[48,12,14,14,15,18,16,19,46,18,29,22,72,54,43,105,23,32,28,16,16,52,28,16,54]);
qs.getRange('B6:C1005').setNumberFormat('#,##0');qs.getRange('D6:D1005').setNumberFormat('0.00%');qs.getRange('E6:E1005').setNumberFormat('0.00');qs.getRange('G6:G1005').setNumberFormat('0.0');
for(const [value,fill] of [['CRITICAL','#FCE4D6'],['HIGH','#FFF2CC'],['DEFEND','#E2EFDA']])qs.getRange('F6:F1005').conditionalFormats.add('containsText',{text:value,format:{fill}});
const ss=table('Scoring','Opportunity score inputs','Editorial inputs plus formula-driven ranking, volume, CTR and weighted position factors.',['Query','Intent factor','Business value','Ranking factor','Volume factor','CTR triage factor','Page readiness','Relevance multiplier','Opportunity score','Impressions × position'],queries.map(q=>[q.query,q.intent_factor,q.value,null,null,null,q.strength_factor,q.relevance_factor,null,null]),[48,16,16,18,18,18,19,20,20,24]);
for(let i=0;i<queries.length;i++){
 const r=i+6;
 ss.getRange(`D${r}:F${r}`).formulas=[[
  `=IF('Queries'!E${r}<='Rules'!$B$17,'Rules'!$B$21,IF('Queries'!E${r}<='Rules'!$B$18,'Rules'!$B$22,IF('Queries'!E${r}<='Rules'!$B$19,'Rules'!$B$23,IF('Queries'!E${r}<='Rules'!$B$20,'Rules'!$B$24,'Rules'!$B$25))))`,
  `=MIN(LOG10(1+'Queries'!C${r})/'Rules'!$B$13,1)`,
  `=IF(AND('Queries'!E${r}<='Rules'!$B$15,'Queries'!C${r}>='Rules'!$B$14,'Queries'!D${r}<'Rules'!$B$16),1,0)`]];
 ss.getRange(`I${r}:J${r}`).formulas=[[
  `=ROUND((B${r}*'Rules'!$B$6+C${r}/'Rules'!$B$12*'Rules'!$B$7+D${r}*'Rules'!$B$8+E${r}*'Rules'!$B$9+F${r}*'Rules'!$B$10+G${r}*'Rules'!$B$11)*H${r},1)`,
  `='Queries'!C${r}*'Queries'!E${r}`]];
 qs.getRange(`G${r}`).formulas=[[`='Scoring'!I${r}`]];
}
ss.getRange('B6:I1005').setNumberFormat('0.00');ss.getRange('J6:J1005').setNumberFormat('#,##0.00');
const cs=table('Clusters','Search intent clusters','One recommended owner per cluster. Score and priority reflect member opportunities, not just the average position.',['Query cluster','Primary query','Owner URL','Query count','Clicks','Impressions','CTR','Weighted position','Best query score','Priority','Best opportunity query','Action','Secondary examples'],clusters.map(c=>[c.cluster,c.primary,c.owner,null,null,null,null,null,null,c.priority,c.best_opportunity,c.action,c.secondary.split('; ').slice(0,8).join('; ')]),[48,44,74,14,12,15,14,18,18,19,45,50,100]);
clusters.forEach((c,i)=>{const r=i+6;
 cs.getRange(`D${r}:I${r}`).formulas=[[
  `=COUNTIF('Queries'!$I$6:$I$1005,A${r})`,
  `=SUMIF('Queries'!$I$6:$I$1005,A${r},'Queries'!$B$6:$B$1005)`,
  `=SUMIF('Queries'!$I$6:$I$1005,A${r},'Queries'!$C$6:$C$1005)`,
  `=E${r}/F${r}`,
  `=SUMIF('Queries'!$I$6:$I$1005,A${r},'Scoring'!$J$6:$J$1005)/F${r}`,
  `=MAX(${c.query_rows.map(n=>`'Queries'!G${n+4}`).join(',')})`]];
});
cs.getRange(`D6:F${clusters.length+5}`).setNumberFormat('#,##0');cs.getRange(`G6:G${clusters.length+5}`).setNumberFormat('0.00%');cs.getRange(`H6:I${clusters.length+5}`).setNumberFormat('0.00');
table('Page map','Page master map','All 841 exported URLs plus current source routes. Before/after means current versus proposed; no change applied.',['URL','Primary query','Assigned clusters','Current role','Recommended role','Evidence basis','Title before','Title proposed','H1 before','H1 proposed','Current description','Content proposal','Internal link proposal','Cannibalization evidence','CTA proposal','Technical proposal','Status','GSC clicks','GSC impressions','GSC CTR','GSC position','Current canonical','Indexable evidence','Local referring pages','Local title','Live title','Local/live title differs'],report.pages.map(p=>[p.url,p.primary,p.clusters,p.role,p.recommended_role,p.basis,p.title_before,p.title_after,p.h1_before,p.h1_after,p.description,p.content,p.internal_links,p.cannibalization,p.cta,p.technical,p.status,p.clicks,p.impressions,p.ctr,p.position,p.canonical,p.indexable===null?'Not verified':p.indexable?'Indexable directive':'Noindex directive',p.incoming,p.local_title,p.live_title,p.drift?'Yes':'No / not compared']),[74,43,64,25,32,43,70,70,60,60,80,105,85,50,65,105,38,13,16,14,16,74,24,19,70,70,24]);
sheets['Page map'].getRange(`R6:S${report.pages.length+5}`).setNumberFormat('#,##0');sheets['Page map'].getRange(`T6:T${report.pages.length+5}`).setNumberFormat('0.00%');sheets['Page map'].getRange(`U6:U${report.pages.length+5}`).setNumberFormat('0.00');
const priorityPages=report.pages.filter(p=>report.proposals[new URL(p.url).pathname]&&p.url===`https://digitecme.com${new URL(p.url).pathname}`);
table('Priority changes','Proposed priority changes','Concrete recommendations for 23 pages; retain stronger live work before adding changes.',['Page','Priority','Reason','Current title','Proposed title','Current H1','Proposed H1','Content change or retain decision','CTA','Internal links','Technical action'],priorityPages.map(p=>[p.url,p.priority,report.proposals[new URL(p.url).pathname].reason,p.title_before,p.title_after,p.h1_before,p.h1_after,p.content,p.cta,p.internal_links,p.technical]),[74,18,95,68,68,60,60,110,64,90,105]);
table('CTR opportunities','Page-one CTR opportunities','Triage rule: average position ≤10, ≥20 impressions, CTR <1%. These are investigation flags, not proven snippet failures.',['Query','Impressions','Clicks','CTR','Position','Priority','Recommended owner','Likely issue to investigate','Proposed action','Change made'],report.ctr.map(q=>[q.query,q.impressions,q.clicks,q.ctr,q.position,q.priority,q.owner,q.issue,q.proposed_change,q.change_made]),[48,15,12,14,14,20,74,100,110,40]);
sheets['CTR opportunities'].getRange(`D6:D${report.ctr.length+5}`).setNumberFormat('0.00%');sheets['CTR opportunities'].getRange(`E6:E${report.ctr.length+5}`).setNumberFormat('0.00');
const quality=['High-value commercial','Relevant supporting','Informational','Low-value','Irrelevant'];
const qualityNotes=['Primary buying queries and specific workshop service demand. Value is assumed, not demonstrated by revenue.','Closely related variations, brand navigation and supporting local-service wording.','Research intent that may support later enquiries.','Foreign-city, uncertain capability, price-led or product-like demand.','Dealer/showroom, industrial, unrelated entity and unusable queries.'];
const qualitySheet=table('Impression quality','Impression quality','Applies only to the 50,945 impressions represented by the exported query rows.',['Quality group','Queries','Clicks','Impressions','Share of query impressions','CTR','Interpretation'],quality.map((x,i)=>[x,null,null,null,null,null,qualityNotes[i]]),[30,14,14,17,24,16,105]);
quality.forEach((x,i)=>{const r=i+6;qualitySheet.getRange(`B${r}:F${r}`).formulas=[[
 `=COUNTIF('Queries'!$W$6:$W$1005,A${r})`,`=SUMIF('Queries'!$W$6:$W$1005,A${r},'Queries'!$B$6:$B$1005)`,`=SUMIF('Queries'!$W$6:$W$1005,A${r},'Queries'!$C$6:$C$1005)`,`=D${r}/SUM('Queries'!$C$6:$C$1005)`,`=C${r}/D${r}`]];});
qualitySheet.getRange('E6:F10').setNumberFormat('0.00%');qualitySheet.getRange('B6:D10').setNumberFormat('#,##0');
table('Ownership conflicts','Ownership and routing conflicts','Observed routing defects are separate from hypotheses about competing search intent.',['Query cluster','Page A','Page B','Desired owner','Evidence','Finding type','Proposed action'],report.conflicts.map(r=>[r.cluster,r.a,r.b,r.owner,r.evidence,r.type,r.action]),[42,75,75,75,105,55,110]);
table('Content gaps','Content and capability gaps','Use existing owners first. No new landing page is approved solely because a query appears.',['Topic','Existing owner','Primary query','Impressions','Weighted position','Proposed URL','Decision','Reason','Internal link plan'],report.gaps.map(r=>[r.topic,r.existing_owner,r.primary,r.impressions,r.position,r.proposed_url,r.decision,r.reason,r.link_plan]),[45,74,48,16,19,58,48,110,100]);
sheets['Content gaps'].getRange(`E6:E${report.gaps.length+5}`).setNumberFormat('0.00');
table('Live checks','Live page checks','Public HTML checked 9 September 2026; this does not verify indexing, mobile interaction or successful enquiries.',['URL','HTTP status','Final URL','Title','H1','Description','Canonical','Robots','Phone target','WhatsApp target','JSON-LD blocks','JSON parse errors','Matches local title','Checked at UTC'],live.map(r=>[r.url,r.status??'Error',r.final_url??'',r.title??r.error,r.h1?.join(' / ')??'',r.description??'',r.canonical??'',r.robots??'',r.phone?.join('; ')??'',r.whatsapp?.join('; ')??'',r.schema_blocks??null,r.schema_json_parse_errors??null,r.matches_local_title?'Yes':'No / no local route',r.checked_at??'']),[75,15,75,70,65,90,75,55,33,46,18,18,24,36]);
const metricRows=[];
for(const name of ['Chart','Countries','Devices'])for(const r of source[name].slice(1))metricRows.push([name,name==='Chart'?new Date(`${r[0]}T00:00:00Z`):r[0],...r.slice(1)]);
table('Source metrics','Source metrics','Original Chart, Countries and Devices values. Queries and Pages are preserved in their respective maps.',['Dimension','Date / label','Clicks','Impressions','CTR (export)','Position (export)'],metricRows,[25,48,16,20,20,22]);
sheets['Source metrics'].getRange('B6:B97').setNumberFormat('yyyy-mm-dd');sheets['Source metrics'].getRange(`E6:E${metricRows.length+5}`).setNumberFormat('0.00%');sheets['Source metrics'].getRange(`F6:F${metricRows.length+5}`).setNumberFormat('0.00');
const summary=table('Summary','DIGI-TEC search opportunities','Search Console: 7 Jun–6 Sep 2026. Live checks: 9 Sep 2026. Analysis and proposals only.',['Measure','Value','Meaning'],[
 ['Property clicks',null,'Use Chart totals for overall performance.'],['Property impressions',null,'The baseline includes all property impressions, including queries absent from the table.'],['Property CTR',null,'Clicks / impressions. This is not a lead conversion rate.'],['Exported queries',1000,'All 1,000 rows classified and preserved.'],['Query-row impressions',null,'Query quality shares use this denominator.'],['Query-row clicks',null,'The query table does not contain all site clicks.'],['CRITICAL queries',null,'Meaningful near-page-one commercial opportunities under the stated rules.'],['CTR investigation flags',report.ctr.length,'Page-one, >=20 impressions and <1% CTR; inspect actual owner and SERP.'],['Live pages checked',live.length,'33 successful public HTML checks; no enquiry was submitted.'],['Source routes rendered',1438,'1,158 locally indexable routes; this is not a Google index count.'],['Page map rows',report.pages.length,'Union of the exported page URLs and source routes.'],['Intent clusters',clusters.length,'One recommended owner per cluster, with excluded groups explicitly labeled.'],['Website edits in this task',0,'No source changes, redirects, publishing or analytics changes.'],
 ],[38,22,116]);
summary.getRange('B6:B8').formulas=[['=SUM(\'Source metrics\'!C6:C97)'],['=SUM(\'Source metrics\'!D6:D97)'],['=B6/B7']];
summary.getRange('B10:B12').formulas=[['=SUM(\'Queries\'!C6:C1005)'],['=SUM(\'Queries\'!B6:B1005)'],['=COUNTIF(\'Queries\'!F6:F1005,"CRITICAL")']];
summary.getRange('B6:B18').setNumberFormat('#,##0');summary.getRange('B8').setNumberFormat('0.00%');
summary.getRange('A21:C21').values=[['Order','Focus','Next action']];summary.getRange('A21:C21').format={fill:'#252B30',font:{name:'Arial',bold:true,color:'#FFFFFF',size:11},rowHeight:30};
summary.getRange('A22:C28').values=[
 [1,'Protect live Mercedes work','Six checked live service pages are ahead of local source. Reconcile source before release.'],
 [2,'Repair old Mercedes routing','Two old URLs return HTTP 200 with homepage metadata. Prepare permanent redirects to the Mercedes hub.'],
 [3,'Near-page-one commercial queries','Prioritize Mercedes, BMW gearbox/diagnostics, Porsche steering, McLaren service and Aston Martin repair services.'],
 [4,'Targeted CTA and copy improvements','Use contextual enquiry labels; correct malformed shared service headings. Preserve existing WhatsApp tracking.'],
 [5,'PPF / ceramic / polishing','Retain the detailed live pages. Obtain post-release data and documented workshop evidence. Do not add thin brand variants.'],
 [6,'Verify scope and owner conflicts','Review unconfirmed retrofits and noindex service owners. Joint query/page data is needed to establish cannibalization.'],
 [7,'Measure qualified leads','Compare equal post-release periods by query cluster and canonical landing page. Pair GSC with qualified WhatsApp/call/enquiry outcomes.'],
 ];
summary.getRange('A22:C28').format={font:{name:'Arial',size:11,color:'#22272B'},wrapText:true,rowHeight:52,verticalAlignment:'top'};
summary.freezePanes.unfreeze();

await fs.mkdir(path.join(dir,'previews'),{recursive:true});
await fs.writeFile(path.join(dir,'verification.txt'),(await wb.inspect({kind:'table',range:'Summary!A5:C18',include:'values,formulas',tableMaxRows:14,tableMaxCols:3,maxChars:6000})).ndjson);
const errors=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:20},summary:'Formula error scan'});
await fs.appendFile(path.join(dir,'verification.txt'),'\n'+errors.ndjson);
const computed=ss.getRange('I6:I1005').values.flat();
const differences=computed.map((v,i)=>({query:queries[i].query,expected:queries[i].score,actual:v})).filter(x=>Math.abs(x.actual-x.expected)>.11||typeof x.actual!=='number');
await fs.writeFile(path.join(dir,'score-verification.json'),JSON.stringify({rows:computed.length,differences},null,2));
if(differences.length)throw new Error(`Score mismatch: ${JSON.stringify(differences.slice(0,4))}`);
for(const name of names){
 const range=name==='Summary'?'A1:C28':name==='Impression quality'?'A1:G10':`A1:${col(Math.min(name==='Scoring'?10:6,ranges[name].end.length===1?ranges[name].end.charCodeAt(0)-64:6))}${Math.min(ranges[name].last,9)}`;
 const blob=await wb.render({sheetName:name,range,scale:1,format:'png'});
 await fs.writeFile(path.join(dir,'previews',name.replaceAll(' ','-')+'.png'),new Uint8Array(await blob.arrayBuffer()));
}
for(const [name,range,file] of [['Queries','M5:P9','Query-reason-detail'],['Priority changes','H5:K9','Proposed-copy-detail'],['Rules','A34:D42','Rules-limitations']]){
 const blob=await wb.render({sheetName:name,range,scale:1,format:'png'});
 await fs.writeFile(path.join(dir,'previews',file+'.png'),new Uint8Array(await blob.arrayBuffer()));
}
const file=await SpreadsheetFile.exportXlsx(wb);await file.save(path.join(dir,'DIGI-TEC-Query-Master-Map.xlsx'));
console.log(JSON.stringify({output:'DIGI-TEC-Query-Master-Map.xlsx',sheets:names.length,queryRows:queries.length,pageRows:report.pages.length,scoreDifferences:differences.length,errorScan:errors.ndjson}));
