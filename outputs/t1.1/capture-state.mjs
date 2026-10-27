import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const out=path.resolve('outputs/t1.1/before');
const files=execFileSync('git',['ls-files','-co','--exclude-standard','-z','--','src','scripts','public','cloudflare','docs','package.json','package-lock.json','vite.config.ts','outputs/t1'],{encoding:'utf8',maxBuffer:32*1024*1024}).split('\0').filter(Boolean);
const unique=[...new Set(files)].sort();
const records=[];
for(const file of unique) records.push({file,sha256:createHash('sha256').update(await fs.readFile(file)).digest('hex')});
await fs.writeFile(path.join(out,'file-manifest.json'),JSON.stringify(records,null,2));
for(const file of [...unique.filter(file=>file.startsWith('docs/')), 'src/data/tuningCars.ts','src/data/tuningModelPages.ts','src/components/TuningConfigurator.tsx','src/components/TuningConfigurationDetails.tsx','scripts/validate-tuning.mjs','outputs/t1/README.md','outputs/t1/finalize-t1-evidence.mjs','supabase/functions/mcp/index.ts','outputs/seo-2026-09-16/master-validation.json','public/sitemap.xml']) {
 const target=path.join(out,'files',file);await fs.mkdir(path.dirname(target),{recursive:true});await fs.copyFile(file,target);
}
console.log(`Saved ${records.length} pre-T1.1 file hashes and exact affected-file copies.`);
