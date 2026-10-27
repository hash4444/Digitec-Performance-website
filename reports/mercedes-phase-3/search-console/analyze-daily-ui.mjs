// Offline validation/aggregation of actual visible GSC Day tables. No network/UI.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url));
const inputRaw=await readFile(resolve(root,'paired-ui-records.json'),'utf8');
const records=JSON.parse(inputRaw);
const hash=s=>createHash('sha256').update(s).digest('hex');
const q=['mercedes service dubai','mercedes repair dubai','mercedes specialist dubai','mercedes workshop dubai','mercedes maintenance dubai','mercedes oil change dubai'];
const specsRaw=await readFile(resolve(root,'daily-capture-specs.json'),'utf8');
const dailySpecs=JSON.parse(specsRaw);
const pairPlan=dailySpecs.pairDaily;
const period=JSON.parse(await readFile(resolve(root,'paired-ui-validation.json'),'utf8'));
const control=JSON.parse(await readFile(resolve(root,'exports/unfiltered-90d-control-summary.json'),'utf8'));
const queryKey=e=>[e.kind,e.query,e.page||'',e.country||'ALL',e.device||'ALL'].join('|');
const planned=[...dailySpecs.queryDaily,...dailySpecs.pairDaily];
if(new Set(planned.map(queryKey)).size!==planned.length)throw new Error('Duplicate authoritative daily specification');
const months={Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Sept:9,Oct:10,Nov:11,Dec:12};
const day=s=>{const m=s.match(/^(\d{1,2}) ([A-Za-z]+) (\d{4})$/);if(!m||!months[m[2]])throw new Error('Unrecognized UI date: '+s);return`${m[3]}-${String(months[m[2]]).padStart(2,'0')}-${m[1].padStart(2,'0')}`;};
const number=(s,kind)=>{if(typeof s!=='string'||!s.trim()||/^(?:-|–|—|N\/A)$/i.test(s.trim()))return null;const n=Number(s.replaceAll(',','').replace(/%$/,''));if(!Number.isFinite(n)||n<0)throw new Error('Invalid '+kind+': '+s);return kind==='ctr'?n/100:n;};
const expectedDates=Array.from({length:90},(_,i)=>new Date(Date.UTC(2026,6,27+i)).toISOString().slice(0,10));
const proof=await readFile(resolve(root,'raw/exact-query-operator-proof.txt'),'utf8');
const type=await readFile(resolve(root,'raw/search-type-verified-ax.txt'),'utf8');
const pageProof=await readFile(resolve(root,'raw/exact-page-operator-proof.txt'),'utf8');
const proofValid=/Value: Exact query/.test(proof)&&/Description: Web, Value: 1/.test(type)&&/Description: Text-based, Value: 1/.test(type);
const attempts=[];
for(const record of records.filter(r=>['query-daily','pair-daily'].includes(r.expected?.kind))){
 const e=record.expected,reasons=[];let ax='',text='';
 try{ax=await readFile(resolve(root,record.axFile),'utf8');text=await readFile(resolve(root,record.textFile),'utf8');}catch{reasons.push('missing_saved_raw_evidence');}
 const u=new URL(record.navigationUrl),p=u.searchParams,country=e.country||'ALL',device=e.device||'ALL';
 if(!q.includes(e.query)||!['ARE','ALL'].includes(country)||!['ALL','MOBILE','DESKTOP'].includes(device))reasons.push('unexpected_query_country_device');
 if(record.property!=='sc-domain:digitecme.com'||p.get('resource_id')!=='sc-domain:digitecme.com')reasons.push('property_mismatch');
 if(!proofValid)reasons.push('separate_query_search_type_proof_missing');
 if(p.get('query')!=='!'+e.query||p.get('start_date')!=='20260727'||p.get('end_date')!=='20261024'||p.get('breakdown')!=='date'||e.window.start!=='20260727'||e.window.end!=='20261024')reasons.push('navigation_filter_mismatch');
 if(country==='ARE'?(p.get('country')?.toLowerCase()!=='are'||!text.includes('Country: United Arab Emirates')):(p.has('country')||/Country: /.test(text)))reasons.push('country_filter_unproven');
 const deviceLabel={MOBILE:'Mobile',DESKTOP:'Desktop'}[device];
 if(device==='ALL'?(p.has('device')||/Device: /.test(text)):(p.get('device')?.toUpperCase()!==device||!text.includes('Device: '+deviceLabel)))reasons.push('device_filter_unproven');
 if(e.kind==='pair-daily'){
  if(!/Value: Exact URL/.test(pageProof))reasons.push('separate_exact_page_operator_proof_missing');
  if(!e.page||p.get('page')!=='!'+e.page||!(text.includes('Page: '+e.page)||ax.includes('Page: '+e.page)))reasons.push('exact_page_filter_unproven');
 }else if(p.has('page')||/\nPage: /.test(text))reasons.push('unexpected_page_filter');
 if(!text.includes('Query: '+e.query))reasons.push('displayed_query_missing');
 if(!text.includes(`from ${e.window.startLabel} to ${e.window.endLabel}`))reasons.push('displayed_chart_date_span_missing');
 if(!/tab \(selected[^)]*\) DAYS, Value: 1/.test(ax))reasons.push('days_tab_not_proven_selected');
 if(record.loading||/Retrieving data|Loading(?:\.{3}|…)|Loading report|progress indicator/i.test(text+'\n'+ax))reasons.push('capture_loading');
 if(!Object.values(record.displayedFilterChecks||{}).every(v=>v===true)||Object.keys(record.displayedFilterChecks||{}).length<6||record.availability!=='visible_rows_complete'||!record.completeVisibleTable)reasons.push('collector_capture_not_validated');
 if(JSON.stringify(record.header)!==JSON.stringify(['Day','Clicks','Impressions','CTR','Position']))reasons.push('table_header_unproven');
 // A hovered UI row can render its five cells on separate lines. Read the same
 // date+four-metric sequence from saved visible text without relying on tabs.
 const actualRows=[...text.matchAll(/(\d{1,2} [A-Za-z]+ \d{4})\s+([\d,]+)\s+([\d,]+)\s+([\d.]+%|—|–|-)\s+([\d.]+|—|–|-)/g)].map(m=>m.slice(1,6));
 if(JSON.stringify(actualRows)!==JSON.stringify(record.rows))reasons.push('raw_visible_rows_differ_from_record');
 if(record.pagination!=='1-90 of 90'||!text.includes(record.pagination)||!/button \(disabled\) Next page/.test(ax))reasons.push('complete_90day_pagination_unproven');
 const rows=[];
 try{for(const [i,r]of(record.rows||[]).entries()){
  if(r.length!==5)throw new Error('Wrong column count');
  const date=day(r[0]),clicks=number(r[1],'clicks'),impressions=number(r[2],'impressions'),ctr=number(r[3],'ctr'),position=number(r[4],'position');
  if(clicks===null||impressions===null||!Number.isInteger(clicks)||!Number.isInteger(impressions)||ctr!==null&&ctr>1)throw new Error('Invalid source counts/rate');
  if(impressions>0&&(ctr===null||position===null))throw new Error('Missing metric despite positive impressions');
  if(impressions===0&&clicks!==0)throw new Error('Clicks with no impressions');
  rows.push({date,sourceDateDisplay:r[0],clicks,impressions,ctrFractionDisplayed:ctr,averagePositionDisplayed:position,explicitZeroImpressionRow:impressions===0,sourceTableRow:i+1});
 }if(JSON.stringify(rows.map(r=>r.date).sort())!==JSON.stringify(expectedDates))throw new Error('Not90uniqueexpected dates');
 }catch(error){reasons.push('invalid_daily_row: '+error.message);}
 const uniqueReasons=[...new Set(reasons)];
 attempts.push({id:record.id,capturedAt:record.capturedAt,seriesKey:queryKey(e),expected:e,accepted:uniqueReasons.length===0,rejectionReasons:uniqueReasons,availability:record.availability,cards:uniqueReasons.length?null:record.cards,rawEvidence:{axFile:record.axFile,axSha256:hash(ax),textFile:record.textFile,textSha256:hash(text)},rows:uniqueReasons.length?[]:rows});
}
const aggregate=rows=>{const clicks=rows.reduce((n,r)=>n+r.clicks,0),impressions=rows.reduce((n,r)=>n+r.impressions,0);return{days:rows.length,clicks,impressions,ctrFractionCalculated:impressions?clicks/impressions:null,averagePositionWeightedFromRoundedDailyApprox:impressions?rows.reduce((n,r)=>n+r.impressions*(r.averagePositionDisplayed||0),0)/impressions:null,zeroImpressionDaysExplicit:rows.filter(r=>r.explicitZeroImpressionRow).length};};
const ranges=[{id:'7d',start:'2026-10-18',end:'2026-10-24'},{id:'previous-7d',start:'2026-10-11',end:'2026-10-17'},{id:'28d',start:'2026-09-27',end:'2026-10-24'},{id:'previous-28d',start:'2026-08-30',end:'2026-09-26'},{id:'90d',start:'2026-07-27',end:'2026-10-24'}];
const series=planned.map(e=>{
 const candidates=attempts.filter(a=>a.seriesKey===queryKey(e));
 const selected=candidates.filter(a=>a.accepted).sort((a,b)=>a.capturedAt.localeCompare(b.capturedAt)).at(-1);
 if(!selected)return{...e,seriesKey:queryKey(e),status:candidates.length?'NO_VALID_CAPTURE':'NOT_COLLECTED',attemptIds:candidates.map(a=>a.id),rows:[]};
 const periods=ranges.map(w=>({...w,...aggregate(selected.rows.filter(r=>r.date>=w.start&&r.date<=w.end))}));
 const comparisons=[];
 if(e.kind==='pair-daily')for(const w of ['7d','28d','90d']){
  const target=period.cells.find(c=>c.query===e.query&&c.country===e.country&&c.device===e.device&&c.window.id===w&&c.status==='VALIDATED_VISIBLE_ROWS')?.rows.find(r=>r.page===e.page);
  const daily=periods.find(p=>p.id===w);
  comparisons.push({window:w,pagesPeriodRowPresent:!!target,clicksMatch:target?daily.clicks===target.clicks:null,impressionsMatch:target?daily.impressions===target.impressions:null,sourcePeriodRow:target||null,note:target?'Same exact query/page/country/device/date consistency check; no unfiltered dimension join.':'No visible period row; no zero is inferred.'});
 }
 const native=e.kind==='query-daily'&&e.country==='ALL'&&e.device==='ALL'?control.query_only_90d_controls.find(c=>c.query===e.query):null;
 const sum90=periods.find(p=>p.id==='90d');
 return{...e,seriesKey:queryKey(e),status:'VALIDATED_90_EXPLICIT_DAILY_ROWS',selectedAttemptId:selected.id,capturedAt:selected.capturedAt,attemptIds:candidates.map(a=>a.id),cards:selected.cards,periods,rows:selected.rows,periodPageConsistency:comparisons,nativeQueryOnlyControlComparison:native?{clicksMatch:native.clicks===sum90.clicks,impressionsMatch:native.impressions===sum90.impressions,scope:'Query-only all-country all-device90d; native CSV and daily UI compare at the same grain.'}:null};
});
const extraSeries=attempts.filter(a=>!planned.some(p=>queryKey(p)===a.seriesKey));
const normalized=series.filter(s=>s.status==='VALIDATED_90_EXPLICIT_DAILY_ROWS').flatMap(s=>s.rows.map(r=>({datasetId:s.selectedAttemptId,kind:s.kind,query:s.query,page:s.page||'',country:s.country,device:s.device,...r})));
const result={generatedAtUtc:new Date().toISOString(),inputFile:'paired-ui-records.json',inputSha256:hash(inputRaw),authoritativeSpecsFile:'daily-capture-specs.json',authoritativeSpecsSha256:hash(specsRaw),exactPageOperatorProofSha256:hash(pageProof),summary:{plannedSeries:planned.length,plannedQueryDaily:dailySpecs.queryDaily.length,plannedPairDaily:pairPlan.length,validatedSeries:series.filter(s=>s.status==='VALIDATED_90_EXPLICIT_DAILY_ROWS').length,unavailableSeries:series.filter(s=>s.status==='NO_VALID_CAPTURE').length,notCollectedSeries:series.filter(s=>s.status==='NOT_COLLECTED').length,acceptedAttempts:attempts.filter(a=>a.accepted).length,rejectedAttempts:attempts.filter(a=>!a.accepted).length,normalizedDailyRows:normalized.length,extraUnplannedAttemptCount:extraSeries.length},limits:['Every normalized zero is an explicit source-table zero, not a filled gap. Em-dash CTR/position remain null.','Complete ninety-date coverage and correct filter/tab/raw-row/pagination evidence are required for acceptance.','Query-only daily series and exact-page daily series retain different aggregation; they are not summed together.','Weighted positions from rounded daily displays are approximate; CTR is recalculated from additive counts.','Prior7/prior28 derived periods are available within90days at identical source grain; prior90days unavailable.','All data ends beforeOctober26deployments and cannot measure their recovery effect.'],attempts,series,extraSeries};
await writeFile(resolve(root,'daily-ui-validation.json'),JSON.stringify(result,null,2)+'\n');
const csv=rows=>rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
await writeFile(resolve(root,'daily-query-page-rows.csv'),csv([['dataset_id','kind','exact_query','exact_page','country','device','date','clicks','impressions','ctr_fraction_displayed','average_position_displayed','explicit_zero_impression_row','source_table_row'],...normalized.map(r=>[r.datasetId,r.kind,r.query,r.page,r.country,r.device,r.date,r.clicks,r.impressions,r.ctrFractionDisplayed,r.averagePositionDisplayed,r.explicitZeroImpressionRow,r.sourceTableRow])]));
console.log(JSON.stringify({summary:result.summary,rejected:attempts.filter(a=>!a.accepted).map(a=>({id:a.id,reasons:a.rejectionReasons})),inputSha256:result.inputSha256}));
