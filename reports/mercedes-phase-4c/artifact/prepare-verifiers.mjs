// Phase 4C read-only verification harness preparation. Only this report is written.
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url)), phase=path.dirname(out), root=path.resolve(phase,'../..'), prior=path.join(root,'reports/mercedes-phase-4b');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const records=[];
async function make(file,target,replacements){const bytes=await fs.readFile(path.join(prior,file));let body=bytes.toString();for(const [a,b,count=1] of replacements){if(body.split(a).length!==count+1)throw Error('Unexpected adaptation occurrence count: '+a);body=body.replaceAll(a,b);}await fs.writeFile(path.join(phase,target),body);records.push({source:'reports/mercedes-phase-4b/'+file,sourceSha256:sha(bytes),target,copySha256:sha(body),replacements});}
await fs.mkdir(path.join(phase,'production'),{recursive:true});
await make('tests/verify-ssr-scope.mjs','artifact/verify-ssr-scope.mjs',[["const phaseRoot = path.dirname(testsRoot);",`const phaseRoot = ${JSON.stringify(prior)};`]]);
await make('tests/verify-all-routes.mjs','artifact/verify-all-routes.mjs',[["const phase=path.dirname(tests);",`const phase=${JSON.stringify(prior)};`]]);
await make('production/verify-redirect-protection.mjs','production/verify-redirect-protection.mjs',[]);
await make('production/capture-current-production.mjs','production/capture-current-production.mjs',[["DIGI-TEC-Phase4B-ReadOnly-Release-Baseline/1.0","DIGI-TEC-Phase4C-ReadOnly-Release-Baseline/1.0"],["['home','/'],['services','/services']","['home','/'],['services','/services'],['bmw-en','/brands/bmw-service-dubai'],['bmw-ar','/ar/brands/bmw-service-dubai']"],["__phase4b_readonly_missing_20261026__","__phase4c_readonly_missing_20261026__",3]]);
await fs.writeFile(path.join(out,'verifier-provenance.json'),JSON.stringify({at:new Date().toISOString(),readOnly:true,records,note:'Assertions and matrix unchanged. Selected source roots still read Phase 4B; outputs stay below Phase 4C. Capture adds two BMW controls and an identifying User-Agent; missing URL token changed.'},null,2));
console.log('Prepared Phase 4C verifier copies.');
