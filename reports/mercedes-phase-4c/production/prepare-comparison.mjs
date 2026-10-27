import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url)), prior=path.resolve(here,'../../mercedes-phase-4b/production'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const source=path.join(prior,'analyze-production-baseline.mjs'),bytes=await fs.readFile(source);let text=bytes.toString();
const dirs=(await fs.readdir(path.join(here,'http'))).sort();const captureDir=path.join(here,'http',dirs.at(-1));
const begin=text.indexOf('const localDefs='),end=text.indexOf('\nconst localComparisons=',begin);if(begin<0||end<0)throw Error('Local definition block missing');
const replacements=[["out=resolve('reports/mercedes-phase-4b/production')",`out=${JSON.stringify(here)}`],["const captureDir=resolve(out,'http/2026-10-26T10-20-06-242Z');",`const captureDir=${JSON.stringify(captureDir)};`],["'services','404-en-file'","'services','bmw-en','bmw-ar','404-en-file'"]];
for(const[a,b]of replacements){if(text.split(a).length!==2)throw Error('Unexpected replacement count '+a);text=text.replace(a,b);}
const nbegin=text.indexOf('const localDefs='),nend=text.indexOf('\nconst localComparisons=',nbegin);
const locals="const localDefs=[['production-matched-baseline','reports/mercedes-phase-4b/production-matched.local/baseline.local/dist','baseline','production-matched.local'],['production-matched-candidate','reports/mercedes-phase-4b/production-matched.local/candidate.local/dist','candidate','production-matched.local'],['production-matched-release-b','reports/mercedes-phase-4b/production-matched.local/release-b.local/dist','release-b','production-matched.local']];";
text=text.slice(0,nbegin)+locals+text.slice(nend);await fs.writeFile(path.join(here,'analyze-production-baseline.mjs'),text);
await fs.writeFile(path.join(here,'comparison-verifier-provenance.json'),JSON.stringify({at:new Date().toISOString(),source,sourceSha256:sha(bytes),copySha256:sha(text),replacements,localDefsNarrowedToSelectedCohort:true,captureDir,readOnly:true},null,2));
console.log('Prepared offline comparison against fresh public capture.');
