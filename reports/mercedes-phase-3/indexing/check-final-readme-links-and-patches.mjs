// Offline final README link/applicability checks only; no source application.
import {readFile,writeFile,readdir,stat} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolve,relative,dirname} from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url)),out=fileURLToPath(new URL('./',import.meta.url));
async function walk(dir){const result=[];for(const e of await readdir(dir,{withFileTypes:true})){if(e.isDirectory())result.push(...await walk(resolve(dir,e.name)));else if(e.name==='README.md')result.push(resolve(dir,e.name));}return result;}
const files=await walk(root),checks=[];
for(const file of files){const text=await readFile(file,'utf8');for(const match of text.matchAll(/!?\[[^\]]*\]\((<[^>]+>|[^)\s]+)(?:\s+["'][^"']*["'])?\)/g)){let target=match[1].replace(/^<|>$/g,'');if(/^[a-z][a-z\d+.-]*:/i.test(target)||target.startsWith('#')||target.startsWith('/'))continue;target=target.split('#')[0].split('?')[0];if(!target)continue;const resolved=resolve(dirname(file),decodeURIComponent(target));let exists=false;try{exists=!!(await stat(resolved));}catch{}checks.push({readme:relative(root,file),target,resolved,passed:exists});}}
const report={checkedAt:new Date().toISOString(),offlineOnly:true,readmes:files.map(f=>relative(root,f)),readmeCount:files.length,relativeFileLinksChecked:checks.length,passed:checks.filter(c=>c.passed).length,failed:checks.filter(c=>!c.passed).length,checks,limits:['Checks relative file existence only, not every external URL or Markdown section anchor.','Collector evidence content/hashes are managed separately during account-label sanitization.']};
await writeFile(resolve(out,'readme-link-check.json'),JSON.stringify(report,null,2));
const patches=['proposals/hub/mercedes-hub-minimal.patch','proposals/services/mercedes-body-enquiry-minimal.patch','proposals/services/general-body-to-mercedes-context-link.patch'];
const patchChecks=patches.map(path=>{const r=spawnSync('git',['apply','--check','--',resolve(root,path)],{encoding:'utf8',windowsHide:true});return {path,exitCode:r.status,passed:r.status===0,stdout:r.stdout,stderr:r.stderr};});
await writeFile(resolve(out,'patch-check-final.json'),JSON.stringify({checkedAt:new Date().toISOString(),offlineOnly:true,sourceApplication:false,build:false,checks:patchChecks,allPassed:patchChecks.every(c=>c.passed)},null,2));
console.log(JSON.stringify({readmes:files.length,relativeFileLinksChecked:checks.length,brokenLinks:checks.filter(c=>!c.passed),patches:patchChecks.map(({path,passed,exitCode})=>({path,passed,exitCode})),noNetworkRequests:true},null,2));
if(report.failed||patchChecks.some(c=>!c.passed))process.exitCode=1;
