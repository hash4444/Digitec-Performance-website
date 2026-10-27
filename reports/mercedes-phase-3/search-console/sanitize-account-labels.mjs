// Local reporting hygiene only. Remove account menu labels, preserve SEO data.
import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,relative} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const dir=fileURLToPath(new URL('./',import.meta.url));
const phase=resolve(dir,'..');
const hash=s=>createHash('sha256').update(s).digest('hex');
const roots=[resolve(dir,'raw'),resolve(dir,'indexed'),resolve(phase,'competitors/serp')];
const files=[];
async function walk(path){for(const ent of await readdir(path,{withFileTypes:true})){const p=resolve(path,ent.name);if(ent.isDirectory())await walk(p);else if(/\.(?:txt|json)$/i.test(p))files.push(p);}}
for(const root of roots)await walk(root);
for(const name of ['paired-ui-records.json','indexed-observations.json','indexed-initial-attempts-unvalidated.json'])files.push(resolve(dir,name));
let replacementCount=0;
const replacement='Google Account: [account label redacted]';
const replace=s=>s.replace(/Google Account:\s*.*?(?=, Secondary Actions:|\r?\n|$)/g,m=>{if(m===replacement)return m;replacementCount++;return replacement;});
const map=v=>typeof v==='string'?replace(v):Array.isArray(v)?v.map(map):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).map(([k,x])=>[k,map(x)])):v;
const changes=[];
for(const path of files){const before=await readFile(path,'utf8'),initial=replacementCount;let after;
 if(path.endsWith('.json')){const parsed=JSON.parse(before);const cleaned=map(parsed);after=replacementCount>initial?JSON.stringify(cleaned,null,2)+'\n':before;}else after=replace(before);
 if(before!==after){await writeFile(path,after);changes.push({path:relative(phase,path).replaceAll('\\','/'),accountLabelsReplaced:replacementCount-initial,beforeSha256:hash(before),afterSha256:hash(after)});}
}
const result={performedAtUtc:new Date().toISOString(),scope:'Local Phase3 GSC raw text/AX/UI JSON and Google SERP text/AX/UI JSON only',method:'Replace personal name/email-bearing Google Account menu labels with Google Account: [account label redacted]. Preserve all report filters, query/page rows, metrics, canonical fields, dates, source URLs and collection timestamps. Textual account-menu labels only; no remote changes.',replacement:replacement,filesInspected:files.length,filesChanged:changes.length,labelsReplaced:replacementCount,changes,screenshotReview:{file:'search-console/indexed/body-slashless.png',result:'Visually reviewed: closed account menu shows avatar initial only; no personal name/email visible. Preserved unchanged. No other GSC/SERP screenshots found.'},nativeZip:'Preserved byte-for-byte; separate ZIP content audit records account label/email presence without printing identities.',notes:['Original personal labels are not copied into this manifest. Before hashes document redacted source bytes without retaining their contents.','Regenerate dependent evidence hashes after redaction. Redaction does not change metric/canonical fields.']};
if(changes.length)await writeFile(resolve(dir,'account-label-redaction.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({filesInspected:files.length,filesChanged:changes.length,labelsReplaced:replacementCount}));
