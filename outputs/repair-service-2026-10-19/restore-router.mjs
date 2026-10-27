import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root='outputs/repair-service-2026-10-19';
const file='cloudflare/routing-response-data.js';
const before=await readFile(`${root}/baseline/source/${file}`);
const after=await readFile(file);
if(!before.equals(after)){
  await mkdir(`${root}/qa/generated/cloudflare`,{recursive:true});
  await writeFile(`${root}/qa/generated/${file}`,after);
  await writeFile(file,before);
}
console.log('Restored pre-sprint generated router bytes; final dist worker retained');
