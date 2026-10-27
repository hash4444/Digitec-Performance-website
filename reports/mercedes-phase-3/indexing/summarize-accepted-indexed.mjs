// Offline interpretation of eight accepted strict-URL stored GSC observations.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const root=fileURLToPath(new URL('./',import.meta.url));
const sourcePath=resolve('reports/mercedes-phase-3/search-console/indexed-observations.json');
const raw=await readFile(sourcePath),source=JSON.parse(raw);
const accepted=source.observations.filter(o=>o.accepted&&!o.pending&&o.validatedUrlEquality&&o.displayedInspectedUrl===o.url&&o.canonicalDetailsPresent);
if(accepted.length!==8)throw new Error('Re-review expected eight final accepted URL observations');
const rows=[];
for(const o of accepted){
 const lines=o.indexedReportText.split('\n');
 const after=label=>{let i=lines.indexOf(label)+1;while(lines[i]==='')i++;return lines[i]||null;};
 const literal=after('Google-selected canonical');
 const files=[];
 for(const name of ['axFile','textFile']){const path=resolve('reports/mercedes-phase-3/search-console',o[name]);const bytes=await readFile(path);files.push({path,sha256:createHash('sha256').update(bytes).digest('hex')});}
 rows.push({url:o.url,capturedAt:o.capturedAt,validatedUrlEquality:true,canonicalDetailsPresent:true,indexingState:after('Page indexing'),lastCrawlDisplayed:after('Last crawl'),crawlDisplayTimezone:'Unverified',crawledAs:after('Crawled as'),crawlAllowed:after('Crawl allowed?'),pageFetch:after('Page fetch'),indexingAllowed:after('Indexing allowed?'),userDeclaredCanonical:after('User-declared canonical'),googleSelectedCanonicalLiteral:literal,googleSelectedCanonicalResolved:literal==='Inspected URL'?o.url:literal==='N/A'?null:literal,sitemaps:after('Sitemaps'),evidence:files});
}
const report={preparedAt:new Date().toISOString(),offlineOnly:true,property:source.property,sourcePath,collectorSnapshotSha256:createHash('sha256').update(raw).digest('hex'),acceptedCount:rows.length,observations:rows,importantFinding:'English body slash URL is indexed and selected in its old stored report, while body slashless owner remains crawled currently not indexed. This is an unresolved variant-convergence finding, not evidence that every English body URL is absent from Google.',limits:['No additional GSC call: collection paused after performance429 per root operator.','Other planned canonical inspections remain unknown; do not extrapolate these eight records.','All selected canonical values are stored evidence with displayed old crawl times, not current Google live fetches.','Inspected URL is resolved to the exact strictly validated URL; N/A remains null/unavailable rather than inferred.']};
await writeFile(resolve(root,'indexed-comparator-summary.json'),JSON.stringify(report,null,2));
const table=rows.map(r=>`| ${new URL(r.url).pathname} | ${r.indexingState==='Page is indexed'?'Indexed':'Crawled; not indexed'} | ${r.lastCrawlDisplayed} | ${r.userDeclaredCanonical==='N/A'?'N/A':new URL(r.userDeclaredCanonical).pathname} | ${r.googleSelectedCanonicalResolved?new URL(r.googleSelectedCanonicalResolved).pathname:'N/A'} |`).join('\n');
await writeFile(resolve(root,'indexed-comparator-summary.md'),`# Accepted stored canonical controls\n\nEight strictly validated authenticated URL observations, October 26, 2026. Displayed last-crawl timezone is unverified. This is an offline summary of root evidence, not additional Google requests.\n\n| Exact inspected path | Stored index state | Last crawl displayed | Declared canonical path | Google-selected canonical path |\n|---|---|---|---|---|\n${table}\n\nGoogle's literal “Inspected URL” is resolved to the exact inspected URL; unavailable fields remain N/A. The English body and oil slash/slashless pairs show unresolved stored variant selection. Current public responses and declared canonicals do not replace those selected values. Root paused all GSC after a performance429 response; other planned inspections remain unknown.\n`);
console.log(JSON.stringify({accepted:rows.length,rows:rows.map(r=>({path:new URL(r.url).pathname,state:r.indexingState,selected:r.googleSelectedCanonicalResolved,lastCrawl:r.lastCrawlDisplayed}))},null,2));
