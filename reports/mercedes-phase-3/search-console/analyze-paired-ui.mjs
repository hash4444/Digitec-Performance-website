// Offline, conservative validation of root-captured exact-query Pages records.
// No network, browser, hidden application state, account or production mutations.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url));
const inputPath=resolve(root,'paired-ui-records.json');
const inputRaw=await readFile(inputPath,'utf8');
const records=JSON.parse(inputRaw);
const hash=s=>createHash('sha256').update(s).digest('hex');
const q=['mercedes service dubai','mercedes repair dubai','mercedes specialist dubai','mercedes workshop dubai','mercedes maintenance dubai','mercedes oil change dubai'];
const windows=[{id:'7d',start:'20261018',end:'20261024'},{id:'28d',start:'20260927',end:'20261024'},{id:'90d',start:'20260727',end:'20261024'}];
const ymd=s=>s.slice(0,4)+'-'+s.slice(4,6)+'-'+s.slice(6,8);
const key=e=>[e.query,e.country||'ALL',e.device||'ALL',e.window.start,e.window.end].join('|');
const matrix=q.flatMap(query=>['ARE','ALL'].flatMap(country=>['ALL','MOBILE','DESKTOP'].flatMap(device=>windows.map(window=>({query,country,device,window,cellKey:key({query,country,device,window})})))));
const operatorProof=await readFile(resolve(root,'raw/exact-query-operator-proof.txt'),'utf8');
const typeProof=await readFile(resolve(root,'raw/search-type-verified-ax.txt'),'utf8');
const proofValid=/Value: Exact query/.test(operatorProof)&&/Description: Web, Value: 1/.test(typeProof)&&/Description: Text-based, Value: 1/.test(typeProof)&&/Description: Multimodal, Value: 0/.test(typeProof);
const number=(s,kind)=>{if(typeof s!=='string'||!s.trim()||/^(?:-|–|—|N\/A)$/i.test(s.trim()))return null;const value=Number(s.replaceAll(',','').replace(/%$/,''));if(!Number.isFinite(value)||value<0)throw new Error('Invalid '+kind+': '+s);return kind==='ctr'?value/100:value;};
const attempts=[];
for(const record of records.filter(r=>r.expected?.kind==='query-pages')){
 const e=record.expected,reasons=[];
 let ax='',text='';
 try{ax=await readFile(resolve(root,record.axFile),'utf8');text=await readFile(resolve(root,record.textFile),'utf8');}catch{reasons.push('missing_saved_raw_evidence');}
 const u=new URL(record.navigationUrl),p=u.searchParams;
 const country=e.country||'ALL',device=e.device||'ALL';
 if(!q.includes(e.query)||!matrix.some(m=>m.cellKey===key(e)))reasons.push('unexpected_matrix_cell');
 if(record.property!=='sc-domain:digitecme.com'||p.get('resource_id')!=='sc-domain:digitecme.com')reasons.push('property_mismatch');
 if(!proofValid)reasons.push('separate_exact_query_or_search_type_proof_missing');
 if(p.get('query')!=='!'+e.query||p.get('start_date')!==e.window.start||p.get('end_date')!==e.window.end||p.get('breakdown')!=='page')reasons.push('navigation_filter_mismatch');
 if(country==='ARE'?(p.get('country')?.toLowerCase()!=='are'||!text.includes('Country: United Arab Emirates')):(p.has('country')||/Country: /.test(text)))reasons.push('country_filter_unproven');
 const deviceLabel={MOBILE:'Mobile',DESKTOP:'Desktop'}[device];
 if(device==='ALL'?(p.has('device')||/Device: /.test(text)):(p.get('device')?.toUpperCase()!==device||!text.includes('Device: '+deviceLabel)))reasons.push('device_filter_unproven');
 if(p.has('page')||/\nPage: /.test(text))reasons.push('unexpected_page_filter');
 if(!text.includes('Query: '+e.query))reasons.push('displayed_query_missing');
 if(!text.includes(`from ${e.window.startLabel} to ${e.window.endLabel}`))reasons.push('displayed_chart_date_span_missing');
 if(!/tab \(selected[^)]*\) PAGES, Value: 1/.test(ax))reasons.push('pages_tab_not_proven_selected');
 if(record.loading||/Retrieving data|Loading(?:\.{3}|…)|Loading report|progress indicator/i.test(text+'\n'+ax))reasons.push('capture_loading');
 if(!Object.values(record.displayedFilterChecks||{}).every(v=>v===true)||Object.keys(record.displayedFilterChecks||{}).length<6)reasons.push('collector_filter_checks_incomplete');
 if(record.availability!=='visible_rows_complete'||!record.completeVisibleTable)reasons.push('collector_capture_not_validated');
 if(JSON.stringify(record.header)!==JSON.stringify(['Top pages','Clicks','Impressions','CTR','Position']))reasons.push('table_header_unproven');
 const actualRows=text.split(/\r?\n/).map(s=>s.trim()).filter(s=>/^https?:\/\/[^\s]+\t/.test(s)).map(s=>s.split('\t').map(v=>v.trim()));
 if(JSON.stringify(actualRows)!==JSON.stringify(record.rows))reasons.push('raw_visible_rows_differ_from_record');
 const pagination=record.pagination?.match(/^(\d+)[–-](\d+) of ([\d,]+)$/);
 if(!pagination||Number(pagination[1])!==1||Number(pagination[2])!==Number(pagination[3].replaceAll(',',''))||Number(pagination[3].replaceAll(',',''))!==record.rows.length||!text.includes(record.pagination))reasons.push('complete_pagination_unproven');
 if(record.rows?.length&&!/button \(disabled\) Next page/.test(ax))reasons.push('next_page_not_proven_disabled');
 const parsed=[];
 try{for(const [i,row] of (record.rows||[]).entries()){
  if(row.length!==5||!/^https?:\/\//.test(row[0]))throw new Error('Invalid page row');
  const clicks=number(row[1],'clicks'),impressions=number(row[2],'impressions'),ctr=number(row[3],'ctr'),position=number(row[4],'position');
  if(clicks===null||impressions===null||!Number.isInteger(clicks)||!Number.isInteger(impressions)||ctr===null||ctr>1||position===null)throw new Error('Required row metric unavailable');
  parsed.push({page:row[0],clicks,impressions,ctrFractionDisplayed:ctr,averagePositionDisplayed:position,sourceTableRow:i+1});
 }}catch(error){reasons.push('invalid_metric_row: '+error.message);}
 const uniqueReasons=[...new Set(reasons)];
 attempts.push({id:record.id,capturedAt:record.capturedAt,cellKey:key(e),expected:e,accepted:uniqueReasons.length===0,rejectionReasons:uniqueReasons,availability:record.availability,rawEvidence:{axFile:record.axFile,axSha256:hash(ax),textFile:record.textFile,textSha256:hash(text)},rows:uniqueReasons.length?[]:parsed,cards:uniqueReasons.length?null:record.cards,pagination:record.pagination});
}
const cells=matrix.map(m=>{
 const candidates=attempts.filter(a=>a.cellKey===m.cellKey);
 const accepted=candidates.filter(a=>a.accepted).sort((a,b)=>a.capturedAt.localeCompare(b.capturedAt));
 const selected=accepted.at(-1);
 if(!selected)return{...m,status:candidates.length?'NO_VALID_CAPTURE':'NOT_COLLECTED',attemptIds:candidates.map(a=>a.id),rows:[],ownerConclusion:'UNAVAILABLE_NOT_ZERO'};
 const rows=[...selected.rows].sort((a,b)=>b.impressions-a.impressions||b.clicks-a.clicks||a.page.localeCompare(b.page));
 const max=rows[0]?.impressions;
 return{...m,status:'VALIDATED_VISIBLE_ROWS',selectedAttemptId:selected.id,capturedAt:selected.capturedAt,attemptIds:candidates.map(a=>a.id),rows,leadingObservedPages:rows.filter(r=>r.impressions===max).map(r=>r.page),multipleObservedUrls:rows.length>1,ownerConclusion:rows.length>1?'PAIRED_OVERLAP_OBSERVED_NOT_HARMFUL_CANNIBALIZATION_PROOF':'SINGLE_VISIBLE_ATTRIBUTED_PAGE',cards:selected.cards};
});
const normalized=cells.filter(c=>c.status==='VALIDATED_VISIBLE_ROWS').flatMap(c=>c.rows.map(r=>({datasetId:c.selectedAttemptId,query:c.query,country:c.country,device:c.device,windowId:c.window.id,windowStart:ymd(c.window.start),windowEnd:ymd(c.window.end),...r})));
const result={generatedAtUtc:new Date().toISOString(),inputFile:'paired-ui-records.json',inputSha256:hash(inputRaw),recordCount:records.length,processedPagesAttempts:attempts.length,otherRecordKinds:[...new Set(records.filter(r=>r.expected?.kind!=='query-pages').map(r=>r.expected?.kind||'UNKNOWN'))],proofFiles:{operator:'raw/exact-query-operator-proof.txt',operatorSha256:hash(operatorProof),searchType:'raw/search-type-verified-ax.txt',searchTypeSha256:hash(typeProof)},summary:{plannedCells:108,validatedCells:cells.filter(c=>c.status==='VALIDATED_VISIBLE_ROWS').length,unavailableCells:cells.filter(c=>c.status==='NO_VALID_CAPTURE').length,notCollectedCells:cells.filter(c=>c.status==='NOT_COLLECTED').length,acceptedAttempts:attempts.filter(a=>a.accepted).length,rejectedAttempts:attempts.filter(a=>!a.accepted).length,normalizedPairedRows:normalized.length},limits:['This is an as-of-file-snapshot analysis; root collection may continue after inputSha256.','Rejected, blank or uncollected cells remain unavailable rather than zero.','No-row captures require explicit no-data evidence and separate handling; this strict first version accepts only complete nonempty Pages tables.','Selected rows are actual exact-query-filtered Pages observations; no separate Queries/Pages joins.','UI average positions and CTRs are rounded displays; do not infer fine precision or exact changes beyond the recorded source precision.','Period/Page metrics remain at source grain; no Page-row sums recreate Query/property aggregates.','Leading observed Pages use visible row impressions only and are not formal ranks or harmful cannibalization conclusions.','All windows end before the October26 redirects and cannot measure their recovery effect.'],attempts,cells,normalizedPairedRows:normalized};
await writeFile(resolve(root,'paired-ui-validation.json'),JSON.stringify(result,null,2)+'\n');
const csv=rows=>rows.map(row=>row.map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')).join('\r\n')+'\r\n';
await writeFile(resolve(root,'paired-query-page-rows.csv'),csv([['dataset_id','query','country','device','window_id','window_start','window_end','page','clicks','impressions','ctr_fraction_displayed','average_position_displayed','source_table_row'],...normalized.map(r=>[r.datasetId,r.query,r.country,r.device,r.windowId,r.windowStart,r.windowEnd,r.page,r.clicks,r.impressions,r.ctrFractionDisplayed,r.averagePositionDisplayed,r.sourceTableRow])]));
console.log(JSON.stringify({summary:result.summary,rejectedAttemptIds:attempts.filter(a=>!a.accepted).map(a=>a.id),inputSha256:result.inputSha256}));
