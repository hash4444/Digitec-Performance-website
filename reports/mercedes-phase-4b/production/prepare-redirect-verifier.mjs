// Output-path-only copy of the exercised full326 public GET/HEAD verifier.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=new URL('./',import.meta.url),source=new URL('../../mercedes-phase-2b/tests/verify-http-phase2b.mjs',here);
const original=await readFile(source,'utf8'),sha=s=>createHash('sha256').update(s).digest('hex');
if(sha(original)!=='13c1d4b766bdc3dec9fff1b777fc1d090c56def0b47e4be4c2880b6a4250e789')throw new Error('Exercised full verifier changed');
const before="const out = resolve(fileURLToPath(new URL('../http/', import.meta.url)), runId);",after="const out = resolve(fileURLToPath(new URL('./redirects-http/', import.meta.url)), runId);";
if(original.split(before).length!==2)throw new Error('Expected original output path absent');
const copy=original.replace(before,after);await writeFile(new URL('verify-redirect-protection.mjs',here),copy);
await writeFile(new URL('redirect-verifier-provenance.json',here),JSON.stringify({at:new Date().toISOString(),source:fileURLToPath(source),sourceSha256:sha(original),copySha256:sha(copy),onlyChange:{before,after},caseGenerationAndAssertionsUnchanged:true,readOnly:true},null,2));
console.log('Prepared output-path-only copy; no network or production changes.');
