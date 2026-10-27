// Local copy preparation only. The reviewed verifier remains unchanged.
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=new URL('./',import.meta.url);
const sourcePath=new URL('../../mercedes-phase-2/tests/verify-http.mjs',here);
const original=await readFile(sourcePath,'utf8');
const sha=s=>createHash('sha256').update(s).digest('hex');
const expectedSourceSha='6670b2a4227d6810efe9528096aceebf72f58820b8f88bb33bfc51060611d45a';
if(sha(original)!==expectedSourceSha) throw new Error('Reviewed verifier source changed; stop before requests.');
const changes=[
 ["const root = fileURLToPath(new URL('../', import.meta.url));","const root = fileURLToPath(new URL('../../mercedes-phase-2/', import.meta.url));"],
 ["const out = resolve(root, 'evidence/http', runId);","const out = resolve(fileURLToPath(new URL('../http/', import.meta.url)), runId);"],
 ["if (test.saveHtml && hop === 0 && test.method === 'GET') {\n      const name = `${test.key}.html`;","if (test.method === 'GET') {\n      const name = `${test.key}-hop${hop}.html`;"]
];
let copy=original;
for(const [before,after] of changes){
 if(copy.split(before).length!==2) throw new Error('Expected exactly one reviewed source fragment: '+before);
 copy=copy.replace(before,after);
}
await writeFile(new URL('verify-http-phase2b.mjs',here),copy);
await writeFile(new URL('verifier-copy-provenance.json',here),JSON.stringify({preparedAt:new Date().toISOString(),reviewedSourcePath:fileURLToPath(sourcePath),reviewedSourceSha256:sha(original),copySha256:sha(copy),changes:changes.map(([before,after])=>({before,after})),assertionsAndCaseGenerationUnchanged:true,requestSemanticsUnchanged:true,readOnly:true,notes:['Root points to reviewed proposal; evidence writes exclusively under phase2b/http.','Every GET hop HTML body retained; HEAD has no body.','No Cloudflare credentials or configuration writes; no retry behavior added.']},null,2));
console.log('Created read-only Phase2B copy with paths and HTML storage changed only.');
