// Mirror only the accepted indexed observation. Collector files remain untouched.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url));
const sourcePath=resolve('reports/mercedes-phase-3/search-console/indexed-observations.json');
const sourceBytes=await readFile(sourcePath),source=JSON.parse(sourceBytes);
const url='https://digitecme.com/services/mercedes-body-repair-dubai';
const entries=source.observations.filter(o=>o.url===url&&o.accepted===true&&!o.pending&&o.validatedUrlEquality&&o.displayedInspectedUrl===url&&o.canonicalDetailsPresent);
if(entries.length!==1)throw new Error('Exactly one accepted strict-URL body observation required');
const entry=entries[0];
const evidence=[];
for(const key of ['axFile','textFile']){const path=resolve('reports/mercedes-phase-3/search-console',entry[key]);const bytes=await readFile(path);evidence.push({path,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length});}
const text=entry.indexedReportText;
if(!text.includes(url)||!text.includes('Page is not indexed: Crawled - currently not indexed')||!text.includes('11 Oct 2026, 09:31:46'))throw new Error('Expected accepted report state/crawl changed; read before rewriting interpretation');
const mirror={mirroredAt:new Date().toISOString(),sourcePath,sourceCollectorSnapshotSha256:createHash('sha256').update(sourceBytes).digest('hex'),collectorSnapshotNote:'The root collector may add other URLs later; evidence file hashes below identify this accepted body report independently.',property:source.property,method:source.method,url,displayedInspectedUrl:entry.displayedInspectedUrl,validatedUrlEquality:true,canonicalDetailsPresent:true,capturedAt:entry.capturedAt,capturedAtDubai:'2026-10-26 12:22:33.455 UTC+04:00',status:'URL is not on Google',indexingStatus:'Crawled - currently not indexed',lastCrawlDisplayed:'11 Oct 2026, 09:31:46',lastCrawlDisplayTimezone:'Unverified; preserve literal displayed time',crawledAs:'Googlebot smartphone',crawlAllowed:'Yes',pageFetch:'Successful',indexingAllowed:'N/A',userDeclaredCanonical:'N/A',googleSelectedCanonical:'N/A',sitemapField:'Temporary processing error',referringPages:['https://digitecme.com/ar/services/mercedes-body-repair-dubai','https://digitecme.com/services/mercedes-body-repair-dubai/'],evidence,readOnly:true,noLiveTestOrIndexingRequest:true,interpretation:['Fresh observation of stored October11 crawl, not a current Google fetch.','No evidence that Google has recrawled the October26 R2 redirect; status cannot be attributed to R2.','N/A canonical/indexing fields remain unavailable rather than replaced with current HTML values.','Current public HTML is direct200, self-canonical and index/follow; no present technical exclusion has been identified.']};
await writeFile(resolve(root,'body-indexed-observation.json'),JSON.stringify(mirror,null,2));
const backlogPath=resolve(root,'evidence-backlog.json'),backlog=JSON.parse(await readFile(backlogPath,'utf8'));
const item=backlog.items.find(i=>i.id==='BI-01');
item.status='Fresh strict-URL body readback and eight accepted controls completed; remaining planned controls unknown after root paused GSC on performance429';
item.latestBodyObservation={capturedAt:entry.capturedAt,exactUrlValidated:true,status:mirror.indexingStatus,lastCrawlDisplayed:mirror.lastCrawlDisplayed,userDeclaredCanonical:'N/A',googleSelectedCanonical:'N/A',evidence:'body-indexed-observation.json'};
item.verification='Body strict displayed URL equality and expanded fields accepted; preserve exact report/evidence hashes and literal crawl timezone uncertainty. Compare a later stored record with a newer crawl before attributing effects to R2.';
const render=backlog.items.find(i=>i.id==='BI-03');
render.status='Root desktop public render completed; first FAQ expansion observed; mobile/keyboard/Googlebot/analytics remain untested';
render.action='Retain root desktop render evidence and close remaining mobile/keyboard gaps only in separately scoped QA. Google rendered screenshot would require its excluded live-test workflow.';
render.evidence='Root screenshot1272x6069 and rendered/FAQ-expanded AX captured at2026-10-26T08:27:21.552Z under indexing/browser; relevant content and CTAs render, first FAQ works, no enquiry submitted.';
await writeFile(backlogPath,JSON.stringify(backlog,null,2));
console.log(JSON.stringify({url,capturedAt:mirror.capturedAt,indexingStatus:mirror.indexingStatus,lastCrawlDisplayed:mirror.lastCrawlDisplayed,declared:mirror.userDeclaredCanonical,selected:mirror.googleSelectedCanonical,evidenceFilesHashed:evidence.length,collectorFilesUnmodified:true},null,2));
