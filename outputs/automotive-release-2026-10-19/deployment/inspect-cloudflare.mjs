import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'));
const authPath = 'C:/Users/ADMIN/AppData/Roaming/xdg.config/.wrangler/config/default.toml';
const authText = await readFile(authPath,'utf8');
const token = authText.match(/^oauth_token\s*=\s*"([^"]+)"/m)?.[1];
if (!token) throw new Error('No local Wrangler OAuth access token found');
await mkdir(root,{recursive:true});
const records=[];
async function get(endpoint,name,{raw=false}={}) {
 const response=await fetch('https://api.cloudflare.com/client/v4'+endpoint,{method:'GET',headers:{authorization:`Bearer ${token}`},signal:AbortSignal.timeout(25000)});
 const body=Buffer.from(await response.arrayBuffer());
 const record={endpoint,method:'GET',status:response.status,contentType:response.headers.get('content-type'),sha256:createHash('sha256').update(body).digest('hex'),bytes:body.length};
 records.push(record);
 if(raw){await writeFile(path.join(root,name),body); await writeFile(path.join(root,name+'.headers.json'),JSON.stringify(Object.fromEntries(response.headers),null,2)); return {response,body};}
 let data;try{data=JSON.parse(body.toString());}catch{data={error:'Non-JSON API response',status:response.status};}
 await writeFile(path.join(root,name),JSON.stringify(data,null,2));
 return data;
}
const accounts=await get('/accounts','accounts.json');
const zones=await get('/zones?name=digitecme.com','zones.json');
for(const account of accounts.result||[]) {
 const prefix=`account-${account.id}`;
 const scripts=await get(`/accounts/${account.id}/workers/scripts`,`${prefix}-scripts.json`);
 const pages=await get(`/accounts/${account.id}/pages/projects`,`${prefix}-pages.json`);
 const domains=await get(`/accounts/${account.id}/workers/domains`,`${prefix}-domains.json`);
 for(const script of scripts.result||[]) {
  if(!/digitec/i.test(script.id))continue;
  const base=`/accounts/${account.id}/workers/scripts/${script.id}`;
  const name=`${prefix}-${script.id}`;
  const deployments=await get(base+'/deployments',name+'-deployments.json');
  const versions=await get(base+'/versions',name+'-versions.json');
  const settings=await get(base+'/settings',name+'-settings.json');
  await get(base+'/script-settings',name+'-script-settings.json');
  await get(base+'/subdomain',name+'-subdomain.json');
  await get(base+'/content/v2',name+'-content.multipart',{raw:true});
  const active=deployments.result?.deployments?.[0]||deployments.result?.[0];
  for(const item of active?.versions||[]) await get(base+'/versions/'+item.version_id,name+'-version-'+item.version_id+'.json');
 }
}
for(const zone of zones.result||[]) {
 await get(`/zones/${zone.id}/workers/routes`,`zone-${zone.id}-routes.json`);
 await get(`/zones/${zone.id}/dns_records`,`zone-${zone.id}-dns.json`);
 await get(`/zones/${zone.id}/rulesets`,`zone-${zone.id}-rulesets.json`);
}
await writeFile(path.join(root,'cloudflare-readonly-index.json'),JSON.stringify({checkedAt:new Date().toISOString(),methods:['GET'],records},null,2));
console.log(JSON.stringify({requests:records.length,statuses:records.map(x=>({endpoint:x.endpoint,status:x.status})),accounts:(accounts.result||[]).map(x=>({id:x.id,name:x.name})),zones:(zones.result||[]).map(x=>({id:x.id,name:x.name}))},null,2));
