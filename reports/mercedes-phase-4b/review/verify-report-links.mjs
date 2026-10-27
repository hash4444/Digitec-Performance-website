// Read report Markdown only; exclude controlled build/dependency/cache copies.
// This checks local file targets, not external URLs or heading anchors.
import {readFile,writeFile,readdir,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve,relative,dirname,join} from 'node:path';
const project=resolve('.'),root=resolve('reports/mercedes-phase-4b');
const portable=p=>relative(project,p).replaceAll('\\','/');
const sha=b=>createHash('sha256').update(b).digest('hex');
const excluded=[],files=[];
async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){const path=join(dir,e.name);if(e.isDirectory()){if(e.name.endsWith('.local')||e.name==='node_modules'||e.name==='.git'){excluded.push(portable(path));continue;}await walk(path);}else if(e.isFile()&&e.name.endsWith('.md'))files.push(path);}}
await walk(root);const checks=[];const scanned=[];
for(const file of files.sort()){
 const bytes=await readFile(file);const source=bytes.toString('utf8').replace(/^\s*(```|~~~)[^\n]*\n[\s\S]*?^\s*\1\s*$/gm,'');scanned.push({file:portable(file),sha256:sha(bytes)});
 for(const m of source.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^)]+)\)/g)){
  let target=m[1].trim();if(target.startsWith('<')&&target.endsWith('>'))target=target.slice(1,-1);else target=target.replace(/\s+["'][\s\S]*$/,'');
  if(/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(target)&&!(/^[a-z]:[\\/]/i.test(target)))continue;
  const clean=decodeURIComponent(target.split('#')[0].split('?')[0]).replace(/:\d+(?::\d+)?$/,'');if(!clean)continue;
  const path=resolve(dirname(file),clean);let exists=true,error;try{await access(path);}catch(e){exists=false;error=e.code||e.message;}
  checks.push({file:portable(file),target,resolved:portable(path),exists,...(error?{error}:{})});
 }
}
let mainReadmeAvailable=true;try{await access(join(root,'README.md'));}catch{mainReadmeAvailable=false;}
const report={checkedAtUtc:new Date().toISOString(),offlineOnly:true,networkRequests:0,mainReadmeAvailable,scope:'All report Markdown under Phase4B, excluding .local copies, node_modules and .git; inline Markdown local file links only. External URLs and heading-anchor existence are not requested or fetched.',scannedFiles:scanned,excludedDirectories:excluded.sort(),localFileLinksChecked:checks.length,checks,broken:checks.filter(c=>!c.exists),allPassed:mainReadmeAvailable&&checks.every(c=>c.exists)};
await writeFile(join(root,'review/report-links.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({allPassed:report.allPassed,mainReadmeAvailable,markdownFiles:files.length,localFileLinks:checks.length,broken:report.broken},null,2));if(!report.allPassed)process.exitCode=1;
