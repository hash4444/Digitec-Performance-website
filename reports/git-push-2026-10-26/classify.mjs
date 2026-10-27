import fs from 'node:fs/promises';
import path from 'node:path';
const base = path.resolve('reports/git-push-2026-10-26');
const all = JSON.parse(await fs.readFile(path.join(base,'untracked-file-sizes.json'),'utf8'));
const authPath = /(?:gsc|search-console|cloudflare|authenticated|host\/|hosting|api-response|network|har)(?:[-_/\.]|$)/i;
const byExt = new Map();
const indicators=[];
for(const row of all){
 const ext=path.extname(row.path).toLowerCase()||'(no extension)';
 const g=byExt.get(ext)||{extension:ext,count:0,bytes:0};g.count++;g.bytes+=row.bytes;byExt.set(ext,g);
 if(!/\.(?:json|txt|csv|md|html|har|yaml|yml|js|mjs|ts|tsx|env)$/i.test(row.path)||row.bytes>20*1024*1024)continue;
 const text=await fs.readFile(row.path,'utf8');
 const flags=[];
 if(/(?:authorization["']?\s*[:=]\s*["']?(?:bearer|basic)\s+[A-Za-z0-9+/_.=-]{12,}|["']?(?:access_token|refresh_token|id_token)["']?\s*[:=]\s*["'][A-Za-z0-9+/_.=-]{16,})/i.test(text))flags.push('credential-value-shaped text');
 if(/\beyJ[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\.[A-Za-z0-9_-]{16,}\b/.test(text))flags.push('JWT-shaped text');
 if(/(?:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9_]{30,}\b|\bgithub_pat_[A-Za-z0-9_]{30,}\b)/.test(text))flags.push('private key or GitHub-token-shaped text');
 if(/(?:set-cookie|["']cookie["']\s*:)/i.test(text)&&authPath.test(row.path))flags.push('cookie/header-shaped text in auth-path candidate');
 if(/(?:account_id|accountId|zone_id|zoneId|gaia_id|workspace_id|owner_id)/.test(text)&&authPath.test(row.path))flags.push('account/config identifiers in auth-path candidate');
 if(flags.length)indicators.push({path:row.path,bytes:row.bytes,flags});
}
const result={capturedAt:new Date().toISOString(),method:'Local text pattern scan; values deliberately omitted. Indicators require review; not proof of active credentials. Public JWT/anon keys can match JWT pattern.',extensions:[...byExt.values()].sort((a,b)=>b.bytes-a.bytes),indicators};
await fs.writeFile(path.join(base,'content-classification.json'),JSON.stringify(result,null,2)+'\n');
const counts={};for(const row of indicators)for(const flag of row.flags)counts[flag]=(counts[flag]||0)+1;
console.log(JSON.stringify({extensions:result.extensions,indicatorCounts:counts,strongIndicatorPaths:indicators.filter(r=>r.flags.some(f=>/credential|JWT|private key/.test(f))).map(r=>({path:r.path,flags:r.flags}))},null,2));
