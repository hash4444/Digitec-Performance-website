// Future read-only recovery snapshot/preflight. Never uploads or deploys anything.
// Every remote request is GET to api.cloudflare.com/client/v4.
// Private raw configuration is written only into a new ignored *.local directory.
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import path from 'node:path';
const here=path.dirname(fileURLToPath(import.meta.url));
const stamp=new Date().toISOString().replace(/[:.]/g,'-');
const output=path.join(here,'snapshots',stamp+'.local');
const args=Object.fromEntries(process.argv.slice(2).map(a=>{const i=a.indexOf('=');if(i<0||!a.startsWith('--'))throw new Error('Arguments must be --name=value');return[a.slice(2,i),a.slice(i+1)];}));
for(const name of Object.keys(args))if(!['compare','origin-state'].includes(name))throw new Error('Unknown argument '+name);
const stable=value=>Array.isArray(value)?value.map(stable):value&&typeof value==='object'?Object.fromEntries(Object.keys(value).sort().map(k=>[k,stable(value[k])])):value;
const digest=value=>createHash('sha256').update(typeof value==='string'?value:JSON.stringify(stable(value))).digest('hex');
await mkdir(output,{recursive:true});
const records=[],failures=[],state={zone:null,account:null,dns:null,routes:null,domains:null,rulesets:[],pageRules:null,zoneSettings:{},workers:[]};
let token=process.env.CLOUDFLARE_API_TOKEN;
if(!token){try{const t=await readFile('C:/Users/ADMIN/AppData/Roaming/xdg.config/.wrangler/config/default.toml','utf8');token=t.match(/^oauth_token\s*=\s*"([^"]+)"/m)?.[1];}catch{}}
const save=(name,value)=>writeFile(path.join(output,name),typeof value==='string'||Buffer.isBuffer(value)?value:JSON.stringify(value,null,2),{flag:'wx'});
async function get(endpoint,name,{raw=false,required=true,paginationManaged=false}={}){
 if(!token)throw new Error('No existing access token. Establish normal Cloudflare access before rerunning; never paste tokens into reports.');
 if(!endpoint.startsWith('/')||endpoint.includes('://')||!/^\/(?:zones|accounts)(?:\/|\?)/.test(endpoint))throw new Error('Disallowed endpoint');
 const r=await fetch('https://api.cloudflare.com/client/v4'+endpoint,{method:'GET',redirect:'error',headers:{authorization:'Bearer '+token},signal:AbortSignal.timeout(30000)});
 const bytes=Buffer.from(await r.arrayBuffer());
 const rec={method:'GET',endpoint,status:r.status,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex'),file:name,contentType:r.headers.get('content-type')};records.push(rec);
 await save(name,bytes);
 let json;try{json=JSON.parse(bytes.toString());}catch{}
 if(!r.ok||json?.success===false){if(required)failures.push({endpoint,status:r.status,codes:json?.errors?.map(e=>e.code)||[]});return null;}
 if(raw){const boundary=rec.contentType?.match(/boundary="?([^";]+)/i)?.[1];return{sha256:boundary?digest(bytes.toString().split(boundary).join('NORMALIZED_BOUNDARY')):rec.sha256,contentType:rec.contentType};}
 if(!paginationManaged&&((json?.result_info?.total_pages||1)>1||json?.result_info?.cursors?.after))failures.push({endpoint,error:'Additional API pages/cursor remain; complete capture before GO'});
 return json;
}
async function list(endpoint,name){
 const all=[];let page=1;
 while(page<=100){const sep=endpoint.includes('?')?'&':'?';const j=await get(endpoint+sep+'page='+page+'&per_page=100',name+'-page-'+page+'.json',{paginationManaged:true});if(!j)return null;const values=Array.isArray(j.result)?j.result:[];all.push(...values);if(j.result_info?.cursors?.after){failures.push({endpoint,error:'Unmanaged cursor pagination remains'});return all;}if(page>=(j.result_info?.total_pages||1))return all;page++;}
 failures.push({endpoint,error:'Pagination exceeded bounded 100 pages'});return null;
}
function deployed(j){const d=j?.result?.deployments||j?.result;return Array.isArray(d)?[...d].sort((a,b)=>String(b.created_on).localeCompare(String(a.created_on)))[0]:null;}
try{
 const zones=await list('/zones?name=digitecme.com','zones');
 const matches=(zones||[]).filter(z=>z.name==='digitecme.com');
 if(matches.length!==1)throw new Error('Exactly one accessible digitecme.com zone is required.');
 const z=matches[0],accountId=z.account?.id;if(!accountId)throw new Error('Zone response did not identify its owning account.');
 state.zone=(await get('/zones/'+z.id,'zone-details.json'))?.result;
 state.account=(await get('/accounts/'+accountId,'account-details.json'))?.result;
 state.routes=(await get('/zones/'+z.id+'/workers/routes','worker-routes.json'))?.result;
 state.dns=await list('/zones/'+z.id+'/dns_records','dns');
 state.domains=(await get('/accounts/'+accountId+'/workers/domains','worker-custom-domains.json'))?.result;
 state.pageRules=await list('/zones/'+z.id+'/pagerules','page-rules');
 for(const setting of ['ssl','always_use_https','automatic_https_rewrites'])state.zoneSettings[setting]=(await get('/zones/'+z.id+'/settings/'+setting,'zone-setting-'+setting+'.json'))?.result;
 for(const [scope,id] of [['zones',z.id],['accounts',accountId]]){
  const j=await get('/'+scope+'/'+id+'/rulesets',scope+'-rulesets.json');
  for(const rule of j?.result||[]){
   if(scope==='accounts'&&!/redirect|url_forward|transform/i.test(rule.phase+' '+rule.name))continue;
   const full=await get('/'+scope+'/'+id+'/rulesets/'+rule.id,scope+'-ruleset-'+rule.id+'.json');
   state.rulesets.push({scope,id:rule.id,result:full?.result});
  }
 }
 const lists=await get('/accounts/'+accountId+'/rules/lists','account-rules-lists.json');
 for(const ruleList of lists?.result||[]){if(ruleList.kind!=='redirect')continue;const items=await get('/accounts/'+accountId+'/rules/lists/'+ruleList.id+'/items','redirect-list-'+ruleList.id+'-items.json');state.rulesets.push({scope:'redirect-list',id:ruleList.id,name:ruleList.name,result:items?.result});if(items?.result_info?.cursors?.after)failures.push({endpoint:'redirect-list/'+ruleList.id,error:'Cursor pagination remains; complete it before GO'});}
 const scripts=new Set((state.routes||[]).map(r=>r.script).filter(Boolean));
 for(const domain of state.domains||[])if(domain.zone_id===z.id||['digitecme.com','www.digitecme.com'].includes(domain.hostname))scripts.add(domain.service);
 for(const script of scripts){
  if(!script)continue;const scriptKey=encodeURIComponent(script),base='/accounts/'+accountId+'/workers/scripts/'+scriptKey,prefix='worker-'+scriptKey;
  const first=deployed(await get(base+'/deployments',prefix+'-deployments-before.json'));
  if(!first||!first.versions?.length)failures.push({endpoint:base+'/deployments',error:'No identified active deployment'});
  await get(base+'/versions',prefix+'-version-history.json');
  const settings=(await get(base+'/settings',prefix+'-settings.json'))?.result;
  const scriptSettings=(await get(base+'/script-settings',prefix+'-script-settings.json'))?.result;
  const subdomain=(await get(base+'/subdomain',prefix+'-subdomain.json'))?.result;
  const schedules=(await get(base+'/schedules',prefix+'-schedules.json'))?.result;
  const content=await get(base+'/content/v2',prefix+'-content.multipart',{raw:true});
  await get(base,prefix+'-download.multipart',{raw:true});
  const versions=[];
  for(const v of first?.versions||[]){const detail=await get(base+'/versions/'+encodeURIComponent(v.version_id),prefix+'-version-'+v.version_id+'.json');versions.push({version_id:v.version_id,percentage:v.percentage,detail:detail?.result});}
  const last=deployed(await get(base+'/deployments',prefix+'-deployments-after.json'));
  if(digest(first)!==digest(last))failures.push({endpoint:base+'/deployments',error:'Deployment changed during snapshot'});
  state.workers.push({name:script,deployment:first,versions,settings,scriptSettings,subdomain,schedules,contentSha256:content?.sha256});
 }
 const routesAfter=(await get('/zones/'+z.id+'/workers/routes','worker-routes-after.json'))?.result;
 if(digest(state.routes)!==digest(routesAfter))failures.push({endpoint:'worker-routes',error:'Routes changed during snapshot'});
}catch(error){failures.push({error:String(error)});}
const fingerprint=digest(state);
await save('state-private.json',state);
let comparison=null;
if(args.compare){try{const prior=JSON.parse(await readFile(path.join(path.resolve(args.compare),'summary.json'),'utf8'));comparison={baseline:path.resolve(args.compare),priorFingerprint:prior.baseFingerprint,currentFingerprint:fingerprint,unchanged:prior.cloudflareSnapshotComplete===true&&prior.baseFingerprint===fingerprint};if(!comparison.unchanged)failures.push({error:'Remote state differs from prior complete capture, or prior capture was incomplete'});}catch(error){failures.push({error:'Cannot verify comparison: '+String(error)});}}
let origin=null;
if(args['origin-state']){try{origin=JSON.parse(await readFile(path.resolve(args['origin-state']),'utf8'));await save('origin-state-private.json',origin);}catch(error){failures.push({error:'Origin-state evidence unreadable: '+String(error)});}}
const originComplete=Boolean(origin?.host&&origin?.publishedDeploymentId&&origin?.publishedSourceSha&&origin?.rollbackTarget&&origin?.verifiedAt);
const summary={checkedAt:new Date().toISOString(),output,methods:['GET'],remoteMutations:0,requests:records.length,cloudflareSnapshotComplete:failures.length===0,originSnapshotComplete:originComplete,completeOfflineBackup:false,assetBytesDownloaded:false,rollbackRequiresRemoteVersionRetention:true,releaseAllowed:false,reason:'Read-only snapshot/preflight cannot grant release authorization. Origin/edge recovery pair, reviewed candidate/base comparison and explicit approval remain required.',baseFingerprint:fingerprint,comparison,activeWorkers:state.workers.map(w=>({name:w.name,deploymentId:w.deployment?.id,versions:w.versions.map(v=>({id:v.version_id,percentage:v.percentage})),contentSha256:w.contentSha256})),failures};
await save('requests.json',records);await save('summary.json',summary);
console.log(JSON.stringify(summary,null,2));
if(!summary.cloudflareSnapshotComplete||!summary.originSnapshotComplete||(args.compare&&!comparison?.unchanged))process.exitCode=1;
