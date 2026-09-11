import fs from 'node:fs/promises';
import { Workbook, SpreadsheetFile } from '@oai/artifact-tool';

const out = new URL('.', import.meta.url).pathname.replace(/^\/([A-Z]:)/i,'$1');
const d=JSON.parse(await fs.readFile(`${out}plan.json`,'utf8'));
const wb=Workbook.create();
const names=['Summary','Query map','Page priorities','Content briefs','Page baseline','Live checks','Daily trend','Sources'];
const sheets=Object.fromEntries(names.map(n=>[n,wb.worksheets.add(n)]));
const colors={ink:'#202226',orange:'#C45C28',header:'#34373C',muted:'#636973',line:'#DDE0E3',light:'#F2F3F4',green:'#E3EFE6',amber:'#FFF0CF'};
const font='Arial';
const col=n=>{let s='';for(;n>0;n=Math.floor((n-1)/26))s=String.fromCharCode(65+(n-1)%26)+s;return s;};
function base(s,title,subtitle,cols,rows=30){
 s.showGridLines=false;
 s.getRange(`A1:${col(cols)}${rows}`).format.font={name:font,size:11,color:colors.ink};
 s.getRange(`A1:${col(cols)}${rows}`).format.verticalAlignment='top';
 s.getRange('A1').values=[[title]];s.getRange('A1').format.font={name:font,size:18,bold:true,color:colors.ink};
 s.getRange(`A1:${col(cols)}1`).format.rowHeight=30;
 s.getRange(`A2:${col(cols)}2`).format.borders={bottom:{style:'thin',color:colors.orange}};
 s.getRange('A2').values=[[subtitle]];s.getRange('A2').format.font={name:font,size:10,italic:true,color:colors.muted};
 s.getRange(`A2:${col(cols)}2`).format.rowHeight=25;
}
function head(s,row,labels){
 const r=s.getRange(`A${row}:${col(labels.length)}${row}`);r.values=[labels];
 r.format={fill:colors.header,font:{name:font,size:11,bold:true,color:'#FFFFFF'},wrapText:true,verticalAlignment:'center',rowHeight:34};
 r.format.borders={insideVertical:{style:'thin',color:'#FFFFFF'}};
}
function widths(s,values){values.forEach((v,i)=>s.getRange(`${col(i+1)}1`).format.columnWidth=v);}
function table(s,row,labels,rows,name,w,height=40){
 head(s,row,labels);if(rows.length)s.getRange(`A${row+1}`).write(rows);
 s.getRange(`A${row+1}:${col(labels.length)}${row+rows.length}`).format.wrapText=true;
 s.getRange(`A${row+1}:${col(labels.length)}${row+rows.length}`).format.rowHeight=height;
 const t=s.tables.add(`A${row}:${col(labels.length)}${row+rows.length}`,true,name);t.style='TableStyleLight1';
 widths(s,w);s.freezePanes.freezeRows(row);
}
function note(s,row,label,text,height=45){
 s.getRange(`A${row}`).values=[[label]];s.getRange(`A${row}`).format.font={name:font,size:11,bold:true,color:colors.ink};
 s.getRange(`B${row}`).values=[[text]];s.getRange(`B${row}`).format.wrapText=true;s.getRange(`A${row}:B${row}`).format.rowHeight=height;
}
const qEnd=d.queries.length+4;
const qs=sheets['Query map'];
base(qs,'Mercedes query-to-page plan','7 Jun–6 Sep 2026 | Original query metrics retained | Targets are recommendations, not observed ranking URLs',14,qEnd);
const rows=d.queries.map(r=>[r.query,r.clicks,r.impressions,r.ctr,r.position,r.cluster,r.id,r.url,r.section,r.fit,null,null,r.action,r.sourceRow]);
table(qs,4,['Exact exported query','Clicks','Impressions','Exported CTR','Average position','Intent cluster','Page ID','Recommended URL','Target section','Service fit','Work priority','Gap to position 5','Recommended action','Source query row'],rows,'MercedesQueries',[52,10,13,13,13,28,12,67,35,15,15,17,90,16],65);
qs.freezePanes.freezeColumns(1);qs.getRange(`B5:C${qEnd}`).setNumberFormat('#,##0');qs.getRange(`D5:D${qEnd}`).setNumberFormat('0.00%');qs.getRange(`E5:E${qEnd}`).setNumberFormat('0.00');qs.getRange(`L5:L${qEnd}`).setNumberFormat('0.00');
qs.getRange(`B5:E${qEnd}`).format.horizontalAlignment='right';
qs.getRange(`K5:K${qEnd}`).formulas=d.queries.map((_,i)=>{const r=i+5;return [`=IF(J${r}="Hold","Hold",IF(J${r}="Conditional","Conditional",IF(E${r}<='Sources'!$B$5,"Protect",IF(AND(E${r}<='Sources'!$B$7,C${r}>='Sources'!$B$6),"P1",IF(OR(E${r}<='Sources'!$B$7,C${r}>='Sources'!$B$8),"P2","P3")))))`];});
qs.getRange('L5').formulas=[[`=IF(J5="Hold","",MAX(0,E5-'Sources'!$B$5))`]];qs.getRange(`L5:L${qEnd}`).fillDown();
qs.getRange(`E5:E${qEnd}`).conditionalFormats.add('cellIs',{operator:'lessThanOrEqual',formula:5,format:{fill:colors.green}});
qs.getRange(`J5:J${qEnd}`).conditionalFormats.add('containsText',{text:'Conditional',format:{fill:colors.amber}});

const ps=sheets['Page priorities'];
const ordered=[...d.pages].sort((a,b)=>({P1:0,P2:1,Protect:2,P3:3,Conditional:4}[a.priority]-{P1:0,P2:1,Protect:2,P3:3,Conditional:4}[b.priority])||b.impressions-a.impressions);
base(ps,'Mercedes page priorities','31 destinations and briefs | Metrics aggregate assigned queries, not measured traffic to these pages',9,ordered.length+4);
table(ps,4,['Page ID','Page / topic','Page priority','Mapped queries','Mapped impressions','Mapped clicks','Weighted query position','Recommended URL','Page status'],ordered.map(p=>[p.id,p.name,p.priority,null,null,null,null,p.url,p.status]),'PagePriorities',[13,40,17,15,17,16,19,72,40],48);
for(let i=0;i<ordered.length;i++){
 const r=i+5;
 ps.getRange(`D${r}:G${r}`).formulas=[[
 `=COUNTIF('Query map'!$G$5:$G$${qEnd},A${r})`,
 `=SUMIF('Query map'!$G$5:$G$${qEnd},A${r},'Query map'!$C$5:$C$${qEnd})`,
 `=SUMIF('Query map'!$G$5:$G$${qEnd},A${r},'Query map'!$B$5:$B$${qEnd})`,
 `=IF(E${r}=0,"",SUMPRODUCT(('Query map'!$G$5:$G$${qEnd}=A${r})*'Query map'!$C$5:$C$${qEnd}*'Query map'!$E$5:$E$${qEnd})/E${r})`
 ]];
}
ps.getRange(`D5:F${ordered.length+4}`).setNumberFormat('#,##0');ps.getRange(`G5:G${ordered.length+4}`).setNumberFormat('0.00');

const bs=sheets['Content briefs'];base(bs,'Mercedes page content briefs','Proposed changes for review | Existing URLs retained except the conditional audio page | Nothing implemented',2,4+ordered.length*10);widths(bs,[25,125]);
let br=4;
for(const p of ordered){
 bs.getRange(`A${br}:B${br}`).values=[[p.id,p.name]];bs.getRange(`A${br}:B${br}`).format={fill:colors.header,font:{name:font,size:12,bold:true,color:'#FFFFFF'},rowHeight:30};
 note(bs,br+1,'Target URL',p.url,32);note(bs,br+2,'Current live title',p.currentTitle,34);note(bs,br+3,'Suggested title',p.title,34);note(bs,br+4,'Suggested H1',p.h1,34);
 note(bs,br+5,'Content changes',p.action,110);note(bs,br+6,'Internal links',p.links.split('; ').map(x=>x.startsWith('/')?'https://digitecme.com'+x:x).join('\n'),90);note(bs,br+7,'Evidence / conditions',p.evidence,70);note(bs,br+8,'Example queries',p.examples,65);br+=10;
}

const pb=sheets['Page baseline'];base(pb,'Search Console page baseline','All 61 exported page rows | Separate from the query table; these rows cannot establish query-to-page relationships',5,d.source.Pages.length+3);
table(pb,4,['Exact exported page URL','Clicks','Impressions','Exported CTR','Average position'],d.source.Pages.slice(1),'ExportedPages',[102,13,15,15,18],33);pb.getRange('B5:C65').setNumberFormat('#,##0');pb.getRange('D5:D65').setNumberFormat('0.00%');pb.getRange('E5:E65').setNumberFormat('0.00');

const lc=sheets['Live checks'];base(lc,'Mercedes URL checks','Read-only HTTP requests on 8 Sep 2026 | Initial responses without JavaScript; this is not Google URL Inspection',7,d.live.length+4);
const relevantLive=d.live.filter(r=>r.path!='/services/pre-purchase-inspection-dubai');
table(lc,4,['Requested URL','HTTP status','Location header','HTML canonical','HTML title','Assessment','Recommended next step'],relevantLive.map(r=>{
 const issue=d.problems.find(x=>x.path===r.path);
 let assessment='200 with expected self-canonical';let action='Verify Google-selected canonical and indexing in Search Console.';
 if(issue){assessment='Legacy URL serves homepage HTML and homepage canonical';action='301/308 redirect directly to '+issue.target;}
 else if(r.path.endsWith('/')){assessment='200 duplicate with canonical to non-slash URL';action='Prefer a permanent redirect to the same non-slash canonical; retain query parameters.';}
 return ['https://digitecme.com'+r.path,r.status,r.location||'(none)',r.canonical,r.title,assessment,action];
}),'LiveUrlChecks',[77,13,20,75,65,66,95],70);

const dt=sheets['Daily trend'];base(dt,'Daily Mercedes search performance','7 Jun–6 Sep 2026 | Web search; query filter +mercedes; all countries and devices',5,96);
table(dt,4,['Date','Clicks','Impressions','Exported CTR','Average position'],d.source.Chart.slice(1).map(r=>[new Date(r[0]+'T00:00:00Z'),...r.slice(1)]),'DailyPerformance',[20,14,18,18,20],25);
dt.getRange('A5:A96').setNumberFormat('yyyy-mm-dd');dt.getRange('B5:C96').setNumberFormat('#,##0');dt.getRange('D5:D96').setNumberFormat('0.00%');dt.getRange('E5:E96').setNumberFormat('0.00');
dt.getRange('H4:L7').values=[['Device','Clicks','Impressions','Exported CTR','Avg. position'],...d.source.Devices.slice(1)];
dt.getRange('H10:L11').values=[['Country','Clicks','Impressions','Exported CTR','Avg. position'],d.source.Countries[1]];
dt.getRange('H4:L11').format.font={name:font,size:11,color:colors.ink};dt.getRange('H4:L11').format.rowHeight=25;
dt.getRange('H1').format.columnWidth=28;dt.getRange('I1:L1').format.columnWidth=18;
dt.getRange('I5:J7').setNumberFormat('#,##0');dt.getRange('K5:K7').setNumberFormat('0.00%');dt.getRange('L5:L7').setNumberFormat('0.00');
dt.getRange('I11:J11').setNumberFormat('#,##0');dt.getRange('K11').setNumberFormat('0.00%');dt.getRange('L11').setNumberFormat('0.00');
for(const r of [4,10])dt.getRange(`H${r}:L${r}`).format={fill:colors.header,font:{name:font,size:11,bold:true,color:'#FFFFFF'},rowHeight:28};

const src=sheets.Sources;base(src,'Sources, assumptions and measurement','Source export dated 8 Sep 2026; observations and recommendations prepared 8 Sep 2026',3,85);widths(src,[35,113,72]);
const assumptions=[['Target lower position',2],['Target upper position',5],['P1 minimum impressions',50],['Near-target position ceiling',20],['P2 minimum impressions',20]];
src.getRange('A4:B8').values=assumptions;src.getRange('B4:B8').format.fill=colors.amber;src.getRange('B4:B8').setNumberFormat('0');
const notes=[
 ['Target interpretation','Aim for positions 2–5 for relevant searches and preserve anything already better than 2. This is an objective, not a promised ranking or date.','https://developers.google.com/search/docs/fundamentals/seo-starter-guide'],
 ['Query-priority rules','Hold/Conditional takes precedence. Protect: position ≤5. P1: >5 to 20 with ≥50 impressions. P2: remaining >5 to 20, or ≥20 impressions above 20. P3: remaining relevant queries. Thresholds are planning choices, not Google rules.',''],
 ['Page priority','Page priorities are editorial recommendations based on business fit, aggregate demand, proximity and content gaps. A page may contain both Protect and improvement queries. P0 routing work comes before all page edits.',''],
 ['Source file','digitecme.com-Performance-on-Search-2026-09-08 (1).xlsx; Queries A2:E354, Pages A2:E62, Chart A2:E93, Filters A1:B4.',''],
 ['Export scope','353 exported queries; 7 Jun–6 Sep 2026; Web; +mercedes; all countries and devices. Every query contains mercedes. Preserve odd punctuation, zero-width characters and the long reliability query exactly in column A.',''],
 ['Completeness','Complete for the supplied export. This is not proof of every Mercedes search or every query Google withholds for privacy. Separate query and page exports cannot be joined to infer ranking URLs.','https://support.google.com/webmasters/answer/7576553?hl=en'],
 ['Page mapping','Recommended URL and section are inferred from intent and site content. For Hold rows the URL is a related alternative only. Conditional rows require service/model confirmation. No page-specific query ranking is asserted.',''],
 ['Weighted averages','Page-priority position = SUM(query impressions × query average position) ÷ mapped impressions. It summarizes assigned queries, not the target page. Daily-period position uses daily impressions × daily position; source positions are rounded.','https://support.google.com/webmasters/answer/7042828?hl=en'],
 ['Reporting totals','353 query rows reconcile to 19 clicks and 10,597 impressions in Chart. CTR = total clicks ÷ total impressions. Page impressions are a separate aggregation and must not be added to query totals.','https://support.google.com/webmasters/answer/7042828?hl=en'],
 ['Live technical evidence','Initial HTTP responses were checked without following redirects. Five sampled legacy routes returned 200 with the homepage title and canonical. A browser may subsequently redirect; the server/CDN response still needs correction.','https://digitecme.com/services/mercedes-repair-dubai'],
 ['Production versus project','Some live Mercedes service titles differ from local source titles. All current-title fields in this plan use observed live HTML. Inspect production output when implementing rather than assuming the local data file controls the final title.',''],
 ['Missing account evidence','Google-selected canonical, query-page combinations, indexing/crawl reports, Business Profile performance and qualified lead attribution were not available. No backlink audit, competitor ranking audit or Googlebot render was performed.',''],
 ['First account export','Request Search Console query + page dimensions for the same baseline dates with query contains mercedes. Also retrieve last 28 complete days versus previous 28, filtered to UAE, separately for mobile and desktop. Paginate; retained rows can differ from property totals.','https://developers.google.com/webmaster-tools/v1/searchanalytics/query'],
 ['Measure the target','Track the intended canonical by query for the same country/device/time window. Count relevant queries at ≤5 and 2–5 separately; show impressions alongside rank and flag samples under 10 impressions. Track clicks, CTR and qualified calls/WhatsApp enquiries.','https://support.google.com/webmasters/answer/7042828?hl=en'],
 ['Local search work','Verify the Business Profile, accurate Al Quoz address, hours, phone, relevant services, genuine workshop photos and authentic customer reviews. Near-me visibility depends partly on searcher distance; website copy cannot remove that constraint.','https://support.google.com/business/answer/7091?hl=en'],
 ['Content principles','Use one strong destination per intent family. Avoid keyword stuffing, mass-produced model pages and unsupported dealer/certification claims. New model pages need confirmed service scope, distinct useful content and real evidence.','https://developers.google.com/search/docs/essentials/spam-policies'],
 ['Redirect validation','Use server/CDN 301 or 308 responses directly to the relevant Mercedes canonical. Update internal links and sitemap references; keep unrelated generic service pages. Verify the final target returns its own HTML and canonical.','https://developers.google.com/search/docs/crawling-indexing/301-redirects'],
 ['Fonts','Arial is installed in the preparation environment and used consistently. Excel may substitute the workbook font if Arial is unavailable on another device.',''],
 ['Actions taken','Read-only workbook and website review; this deliverable contains recommendations. No website, Search Console or Business Profile settings were changed.',''],
];
head(src,10,['Topic','Method / interpretation','Source URL']);src.getRange('A11').write(notes);src.getRange(`A11:C${10+notes.length}`).format.wrapText=true;src.getRange(`A11:C${10+notes.length}`).format.rowHeight=64;
head(src,33,['Original filters','Value','']);src.getRange('A34').write(d.source.Filters.slice(1).map(r=>[...r,'']));
note(src,39,'Device and country data','The Daily trend sheet includes the original three device rows and UAE country row in columns H:L. These are separate source aggregations, not query-specific breakdowns.',52);
note(src,45,'Country context','UAE: 19 clicks, 10,343 impressions, exported average position 20.69. Country share is 97.60% of impressions; all query positions in this workbook remain global because no query-country join was supplied.',64);

const su=sheets.Summary;base(su,'Mercedes search ranking plan','Digi-Tec | Target positions 2–5 | Search data: 7 Jun–6 Sep 2026 | Plan prepared: 8 Sep 2026',8,64);widths(su,[39,18,18,20,18,18,18,18]);
head(su,4,['Baseline','Queries','Impressions','Clicks','CTR','Within 2–5','Better than 2','Above 5']);
su.getRange('A5:H5').values=[['All exported Mercedes queries',null,null,null,null,null,null,null]];
su.getRange('B5:H5').formulas=[[
 `=COUNTA('Query map'!A5:A${qEnd})`,`=SUM('Query map'!C5:C${qEnd})`,`=SUM('Query map'!B5:B${qEnd})`,'=D5/C5',
 `=COUNTIFS('Query map'!E5:E${qEnd},">="&'Sources'!B4,'Query map'!E5:E${qEnd},"<="&'Sources'!B5)`,
 `=COUNTIF('Query map'!E5:E${qEnd},"<"&'Sources'!B4)`,`=COUNTIF('Query map'!E5:E${qEnd},">"&'Sources'!B5)`
 ]];
su.getRange('A5:H5').format.rowHeight=35;su.getRange('B5:H5').format.font={name:font,size:13,bold:true,color:colors.ink};su.getRange('B5:D5').setNumberFormat('#,##0');su.getRange('E5').setNumberFormat('0.00%');
su.getRange('A7').values=[['First priority: fix legacy Mercedes URLs serving the homepage']];su.getRange('A7').format.font={name:font,size:13,bold:true,color:colors.orange};
su.getRange('A8').values=[['The old repair URL returned HTTP 200 and a homepage canonical, despite 4,625 impressions in this export.']];
su.getRange('A9').values=[['Replace that response with a direct 301/308 to the Mercedes hub. See Live checks for the five sampled legacy routes.']];
su.getRange('A11').values=[['Where to focus next']];su.getRange('A11').format.font={name:font,size:13,bold:true,color:colors.ink};
head(su,12,['Example query','Impressions','Avg. position','Page ID','First action','','','']);
const examples=['mercedes repair dubai','mercedes service dubai','mercedes specialist dubai','mercedes suspension repair dubai','mercedes engine repair dubai','mercedes oil change dubai','mercedes transmission repair dubai'];
for(let i=0;i<examples.length;i++){
 const r=i+13;const q=d.queries.find(x=>x.query===examples[i]);const qr=d.queries.indexOf(q)+5;
 su.getRange(`A${r}:H${r}`).values=[[q.query,null,null,q.id,i<3?'Consolidate hub signals and strengthen service scope':q.id==='ENGINE'?'Make engine repair explicit on the mechanical page':'Strengthen existing page and contextual links',null,null,null]];
 su.getRange(`B${r}:C${r}`).formulas=[[`='Query map'!C${qr}`,`='Query map'!E${qr}`]];
 su.getRange(`A${r}:H${r}`).format.rowHeight=30;
}
su.getRange('B13:B19').setNumberFormat('#,##0');su.getRange('C13:C19').setNumberFormat('0.00');
head(su,22,['Equal-length comparison','Impressions','Clicks','CTR','Est. avg. position','','','']);
su.getRange('A23').values=[['First 28 days: 7 Jun–4 Jul']];su.getRange('A24').values=[['Latest 28 days: 10 Aug–6 Sep']];
for(const [r,a,b] of [[23,5,32],[24,69,96]]){
 su.getRange(`B${r}:E${r}`).formulas=[[
 `=SUM('Daily trend'!C${a}:C${b})`,`=SUM('Daily trend'!B${a}:B${b})`,`=C${r}/B${r}`,`=SUMPRODUCT('Daily trend'!C${a}:C${b},'Daily trend'!E${a}:E${b})/B${r}`
 ]];
}su.getRange('B23:C24').setNumberFormat('#,##0');su.getRange('D23:D24').setNumberFormat('0.00%');su.getRange('E23:E24').setNumberFormat('0.00');su.getRange('A23:H24').format.rowHeight=29;
su.getRange('A26').values=[['This trend is encouraging, but it does not identify the cause or forecast future rankings.']];
head(su,28,['Sequence','Owner','Outcome','','','','','']);
const phases=[
 ['Week 1','Developer + SEO','Fix and verify five sampled legacy redirects; export query + page data; inspect canonical/indexing on main targets.'],
 ['Weeks 2–3','SEO + workshop','Update approved high-demand page briefs; add service-specific links, accurate scope and real workshop evidence.'],
 ['Weeks 3–6','Workshop + SEO','Improve supported coding and tuning sections; decide audio upgrade coverage; refine model sections from real jobs.'],
 ['Weeks 4, 8, 12','SEO + owner','Compare 28-day UAE/device cohorts, intended URLs, clicks, leads and query ranks; change priorities from evidence.'],
];
su.getRange('A29').write(phases.map(r=>[...r,null,null,null,null,null]));su.getRange('A29:H32').format.rowHeight=38;
su.getRange('A34').values=[['How to use this plan']];su.getRange('A34').format.font={name:font,size:13,bold:true};
su.getRange('A35').values=[['Query map: every query, original metrics, recommended destination, priority, gap and next action.']];
su.getRange('A36').values=[['Page priorities + Content briefs: work order, proposed titles/H1s, content changes and internal links.']];
su.getRange('A37').values=[['Live checks + Page baseline: technical evidence and all 61 historical page rows, kept separate.']];
su.getRange('A38').values=[['Sources: fit labels, editable priority thresholds, limitations and how to measure progress.']];
su.getRange('A40').values=[['Scope decisions']];su.getRange('A40').format.font={name:font,size:13,bold:true};
su.getRange('A41').values=[['307 relevant queries; 29 conditional on service/model coverage; 17 held for mismatched or unverified intent.']];
su.getRange('A42').values=[['Audio upgrades: 375 impressions across three queries. A new page is conditional on a confirmed upgrade service.']];
su.getRange('A43').values=[['Low-volume model terms stay on the closest existing family page or confirmed hub section.']];
su.getRange('A45').values=[['Important measurement limits']];su.getRange('A45').format.font={name:font,size:13,bold:true};
su.getRange('A46').values=[['These are historical average positions, not current Dubai rankings. Page assignments are recommendations.']];
su.getRange('A47').values=[['The objective is positions 2–5 for relevant queries while preserving better results. No ranking or timing is guaranteed.']];
su.getRange('A48').values=[['No website changes were made. This is the plan for review and implementation.']];
for(const r of [8,9,26,35,36,37,38,41,42,43,46,47,48]){su.getRange(`A${r}:H${r}`).format.rowHeight=24;su.getRange(`A${r}`).format.font={name:font,size:10,color:colors.muted};}

// Render the intended working view of every sheet before delivery.
const previews=[['Summary','A1:H26'],['Summary','A28:H48'],['Query map','A4:F12'],['Query map','G4:N9'],['Page priorities','A4:G12'],['Page priorities','H4:I10'],['Content briefs','A4:B12'],['Page baseline','A4:E12'],['Live checks','A4:D10'],['Live checks','E4:G10'],['Daily trend','A4:E13'],['Sources','A4:B16'],['Daily trend','H4:L11']];
for(let i=0;i<previews.length;i++){
 const [sheetName,range]=previews[i];
 const png=await wb.render({sheetName,range,scale:1.3,format:'png'});
 await fs.writeFile(`${out}preview-${i+1}.png`,new Uint8Array(await png.arrayBuffer()));
}
const check=await wb.inspect({kind:'table',range:'Summary!A4:H5',include:'values,formulas',tableMaxRows:3,tableMaxCols:8,maxChars:2500});console.log(check.ndjson);
const error=await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!',options:{useRegex:true,maxResults:30},summary:'formula error scan',maxChars:2500});console.log(error.ndjson);
await fs.writeFile(`${out}verification.txt`,check.ndjson+'\n'+error.ndjson);
const values=su.getRange('B5:H5').values[0];
if(values[0]!==353||values[1]!==10597||values[2]!==19||values[4]!==34||values[5]!==8||values[6]!==311)throw new Error('Summary reconciliation failed: '+JSON.stringify(values));
const priorities=qs.getRange(`K5:K${qEnd}`).values.flat();
for(let i=0;i<d.queries.length;i++){
 const q=d.queries[i];const expected=q.fit==='Hold'?'Hold':q.fit==='Conditional'?'Conditional':q.position<=5?'Protect':q.position<=20&&q.impressions>=50?'P1':q.position<=20||q.impressions>=20?'P2':'P3';
 if(priorities[i]!==expected)throw new Error(`Priority mismatch for ${q.query}: ${priorities[i]} vs ${expected}`);
}
for(let i=0;i<ordered.length;i++){
 const p=ordered[i],vals=ps.getRange(`D${i+5}:G${i+5}`).values[0];
 if(vals[0]!==p.queries||vals[1]!==p.impressions||vals[2]!==p.clicks||Math.abs(vals[3]-p.weightedPosition)>0.00001)throw new Error('Mapped page reconciliation failed: '+p.id+' '+JSON.stringify(vals));
}
const file=await SpreadsheetFile.exportXlsx(wb);await file.save(`${out}Mercedes-keyword-page-plan-2026-09-08.xlsx`);
console.log('Saved Mercedes-keyword-page-plan-2026-09-08.xlsx');
