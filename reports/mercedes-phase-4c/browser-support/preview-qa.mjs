// Run only against loopback. Does not write to the frozen build or use production APIs.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const report=path.dirname(fileURLToPath(import.meta.url));
const option=process.argv[3]||'release-b';
if(!['baseline','candidate','release-b'].includes(option))throw new Error('Unknown option');
const port=Number(process.argv[2]||5200);
if(!Number.isInteger(port)||port<1024||port>65535)throw new Error('Invalid port');
const mode=process.argv[4]||'passive';
if(!['passive','observe-probe'].includes(mode))throw new Error('Unknown mode');
const session=process.argv[5]||`${option}-${mode}`;
const dist=path.resolve(report,'../../mercedes-phase-4b/production-matched.local',option+'.local/dist');
const origin=`http://127.0.0.1:${port}`;
const digest=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const manifestBytes=await fs.readFile(path.join(dist,'.vite/manifest.json'));
const manifest=JSON.parse(manifestBytes);
const build={manifestSha256:digest(manifestBytes),entry:manifest['index.html'],brand:Object.values(manifest).find(x=>x.name==='BrandPage'),body:Object.values(manifest).find(x=>x.name==='BrandServicePage')};
const runtime=await fs.readFile(path.join(report,'capture-runtime.js'),'utf8');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.json':'application/json','.xml':'application/xml','.ico':'image/x-icon','.pdf':'application/pdf','.txt':'text/plain'};
const csp="default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-src 'self'; form-action 'none'; base-uri 'self'";
const log=[]; let logBytes=0;
await fs.mkdir(path.join(report,'runs'),{recursive:true});
const logFile=path.join(report,'runs',`${option}-${mode}-${new Date().toISOString().replaceAll(':','-')}.ndjson`);
async function record(entry){
 if(log.length>=20000||logBytes>40*1024*1024)return;
 const line=JSON.stringify({serverAt:new Date().toISOString(),serverOption:option,serverMode:mode,...entry});
 log.push(JSON.parse(line));logBytes+=Buffer.byteLength(line);await fs.appendFile(logFile,line+'\n');
}
// Serve built files without executing _worker.js, _redirects, or a deployment router.
// Extensionless unknown paths receive the homepage, matching the measured current origin.
async function staticResponse(request){
 const pathname=decodeURIComponent(new URL(request.url).pathname);
 const file=path.resolve(dist,'.'+pathname,path.extname(pathname)?'':'index.html');
 if(!file.startsWith(dist+path.sep))return new Response('Not found',{status:404});
 let body=await fs.readFile(file).catch(()=>null);
 let contentType=mime[path.extname(file)]||'application/octet-stream';
 if(!body&&!path.extname(pathname)){body=await fs.readFile(path.join(dist,'index.html'));contentType=mime['.html'];}
 return new Response(request.method==='HEAD'?null:body,{status:body?200:404,headers:{'Content-Type':contentType}});
}
function escapeAttr(s){return s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');}
const injection=`<script data-phase4c-qa data-config="${escapeAttr(JSON.stringify({option,mode,session,build}))}">${runtime.replaceAll('</script','<\\/script')}</script>`;
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,origin);
  if(url.pathname==='/__phase4c/event'){
   if(req.method!=='POST'){res.writeHead(405);return res.end();}
   if(req.headers.origin && req.headers.origin!==origin){res.writeHead(403);return res.end();}
   let text='';for await(const chunk of req){text+=chunk;if(Buffer.byteLength(text)>128*1024){res.writeHead(413);res.end();req.destroy();return;}}
   const entry=JSON.parse(text);await record({type:'browser-event',event:entry});res.writeHead(204,{'Cache-Control':'no-store'});return res.end();
  }
  if(url.pathname==='/__phase4c/events'){
   const summary={generatedAt:new Date().toISOString(),option,mode,session,origin,dist,build,logFile,logBytes,events:log};
   res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(JSON.stringify(summary,null,2));
  }
  if(url.pathname==='/__phase4c/info'){
   res.writeHead(200,{'Content-Type':'application/json','Cache-Control':'no-store'});return res.end(JSON.stringify({option,mode,session,origin,dist,build,logFile,serving:'Direct static generated HTML/assets; no generated worker or redirects executed.',limitations:['Response instrumentation changes runtime timing.','Unknown extensionless homepage200 mirrors the observed production origin; no general hosting equivalence is inferred.','External analytics blocked and contact actions intercepted.']}));
  }
  if(url.pathname==='/__phase4_frame'){
   const width=Number(url.searchParams.get('width')||390),height=Number(url.searchParams.get('height')||844);
   const route=url.searchParams.get('path')||'/brands/mercedes-benz-service-dubai';
   if(![320,390,768,1200].includes(width)||height<500||height>1000||!route.startsWith('/')||route.startsWith('//'))throw new Error('Invalid QA frame');
   const safe=escapeAttr(route);
   const html=`<!doctype html><html><head><title>Phase 4C ${option} local responsive QA ${width}px</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#ddd;color:#111;font:14px Arial}header{position:absolute;left:430px;top:0;padding:8px;max-width:700px}iframe{display:block;border:0;margin:0;background:#111}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere;padding:8px}</style></head><body><header>LOCAL QA ${option} ${mode} — ${width} × ${height} CSS pixels, desktop browser engine. Contact intercepted; analytics blocked.</header><iframe title="Mercedes ${option} ${width} pixel responsive viewport" width="${width}" height="${height}" src="${safe}"></iframe><output id="qa-action-log">No contact actions yet.</output><output id="qa-viewport-metrics">Waiting for frame load.</output><output id="phase4c-diagnostic-output">Waiting for diagnostic event.</output><script>addEventListener('message',function(event){if(event.origin!==location.origin)return;if(event.data.phase4Contact)document.getElementById('qa-action-log').textContent=JSON.stringify(event.data.phase4Contact,null,2);if(event.data.phase4Ui)document.getElementById('qa-viewport-metrics').textContent=JSON.stringify(event.data.phase4Ui,null,2);if(event.data.phase4cDiagnostic)document.getElementById('phase4c-diagnostic-output').textContent=JSON.stringify(event.data.phase4cDiagnostic,null,2);});</script></body></html>`;
   res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':csp,'Cache-Control':'no-store','X-Phase4C-Option':option,'X-Phase4C-Mode':mode});return res.end(html);
  }
  const response=await staticResponse(new Request(origin+req.url,{method:req.method}));
  const headers=Object.fromEntries(response.headers);
  if(headers.location?.startsWith('https://digitecme.com'))headers.location=headers.location.replace('https://digitecme.com',origin);
  headers['Content-Security-Policy']=csp;headers['Cache-Control']='no-store';headers['X-Phase4C-Option']=option;headers['X-Phase4C-Mode']=mode;headers['X-Phase4C-Manifest-SHA256']=build.manifestSha256;
  let body=Buffer.from(await response.arrayBuffer());
  if(req.method!=='HEAD'&&(headers['content-type']||'').includes('text/html'))body=Buffer.from(body.toString('utf8').replace(/<head\b[^>]*>/i,match=>match+injection));
  await record({type:'http-response',method:req.method,path:url.pathname+url.search,status:response.status,location:headers.location||null,contentType:headers['content-type'],userAgent:req.headers['user-agent']||null});
  delete headers['content-length'];delete headers.etag;res.writeHead(response.status,headers);res.end(body);
 }catch(error){await record({type:'qa-server-error',message:error.message,stack:error.stack});res.writeHead(500);res.end('Local QA error: '+error.message);}
}).listen(port,'127.0.0.1',()=>console.log(JSON.stringify({message:'Phase4C local QA ready',option,mode,session,origin,build,logFile})));
