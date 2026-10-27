// Local evidence-path-only copy of the previously exercised full326 verifier.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=new URL('./',import.meta.url);
const previous=new URL('../../mercedes-phase-2b/tests/verify-http-phase2b.mjs',here);
const original=await readFile(previous,'utf8');
const hash=s=>createHash('sha256').update(s).digest('hex');
if(hash(original)!=='13c1d4b766bdc3dec9fff1b777fc1d090c56def0b47e4be4c2880b6a4250e789')throw new Error('Reviewed Phase2B full verifier changed');
const before="const out = resolve(fileURLToPath(new URL('../http/', import.meta.url)), runId);";
const after="const out = resolve(fileURLToPath(new URL('./http/', import.meta.url)), runId);";
if(original.split(before).length!==2)throw new Error('Expected evidence output line changed');
const copy=original.replace(before,after);
await writeFile(new URL('verify-http-phase4.mjs',here),copy);
await writeFile(new URL('verifier-provenance.json',here),JSON.stringify({preparedAt:new Date().toISOString(),sourcePath:fileURLToPath(previous),sourceSha256:hash(original),copySha256:hash(copy),onlyAdditionalChange:{before,after},preservesReviewedRootAndAllCaseGenerationAssertionsAndRequests:true,readOnly:true,notes:['Full326cases includes192R1-R4,48protectedEnglishoil,48broadMercedes,16destinations,22contentcontrols; GET/HEAD only.','All GET-hop HTML saved under Phase4/redirects/http; no earlier evidence overwritten.','No Cloudflare configuration, cache, source, contact or indexing operations.']},null,2));
console.log('Prepared Phase4 full read-only verifier; only evidence output path changed from the exercised Phase2B copy.');
