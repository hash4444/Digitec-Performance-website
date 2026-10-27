import {mkdir,readdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const root='outputs/repair-service-2026-10-19';
const phase=process.argv[2]||'baseline';
const basePaths=[...['mechanical-repair','suspension-repair','diagnostics','transmission-repair'].map(s=>`/services/mercedes-${s}-dubai`),...['bmw','rolls-royce','lamborghini'].flatMap(b=>(b==='rolls-royce'?['mechanical-repair','suspension-repair']:['mechanical-repair','transmission-repair']).map(s=>`/brands/${b}-service-dubai/${s}`))];
const protectedPaths=['/brands/lamborghini-service-dubai/engine-diagnostics',...['rolls-royce','lamborghini','volkswagen','mercedes-benz','bmw'].map(b=>`/brands/${b}-service-dubai`)];
const routes=[...basePaths,...protectedPaths].flatMap(p=>[p,`/ar${p}`]);
await mkdir(`${root}/${phase}/html`,{recursive:true});
const {renderRoute}=await import(pathToFileURL(path.resolve(process.argv[3]||'dist-server/entry-server.js')));
const records=[];
for(const route of routes){const result=await renderRoute(route);await writeFile(`${root}/${phase}/html/${route.slice(1).replaceAll('/','__')}.html`,result.html);records.push({route,selected:basePaths.includes(route.replace(/^\/ar/,'')),seo:result.seo,htmlSha256:createHash('sha256').update(result.html).digest('hex')});}
await writeFile(`${root}/${phase}/rendered.json`,JSON.stringify(records,null,2));
const manifest=[];
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const file=`${dir}/${e.name}`;if(e.isDirectory())await walk(file);else manifest.push({file,sha256:createHash('sha256').update(await readFile(file)).digest('hex')});}}
for(const dir of ['src','scripts','public','cloudflare','supabase'])await walk(dir);
await writeFile(`${root}/${phase}/source-manifest.json`,JSON.stringify(manifest,null,2));
if(phase==='baseline'){
  for(const file of ['src/pages/BrandServicePage.tsx','cloudflare/routing-response-data.js','index.html','package.json']){await mkdir(path.dirname(`${root}/baseline/source/${file}`),{recursive:true});await writeFile(`${root}/baseline/source/${file}`,await readFile(file));}
}
console.log(`Captured ${records.length} routes and ${manifest.length} source hashes`);
