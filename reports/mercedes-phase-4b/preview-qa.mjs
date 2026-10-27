// Loopback-only QA shell. Product source and built files remain unchanged.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
const report=path.dirname(fileURLToPath(import.meta.url));
const option=process.argv[3]||'release-b'; if(!['baseline','candidate','release-b'].includes(option))throw new Error('Unknown option'); const dist=path.join(report,'production-matched.local',option+'.local/dist');
const {handleRequest}=await import(pathToFileURL(path.join(dist,'_worker.js')).href);
const port=Number(process.argv[2]||5194);
const origin=`http://127.0.0.1:${port}`;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.json':'application/json','.xml':'application/xml','.ico':'image/x-icon','.pdf':'application/pdf','.txt':'text/plain'};
const csp="default-src 'self' data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-src 'self'; form-action 'none'; base-uri 'self'";
const intercept=`<script data-phase4-qa-only>document.addEventListener('click',function(event){var anchor=event.target.closest&&event.target.closest('a[href]');if(!anchor)return;var href=anchor.getAttribute('href');if(/^(tel:|mailto:|https:\\/\\/(wa\\.me|api\\.whatsapp\\.com))/.test(href)){event.preventDefault();var detail={href:href,label:anchor.textContent.trim(),placement:anchor.getAttribute('data-cta-placement')};var output=document.getElementById('phase4-contact-output');if(!output){output=document.createElement('output');output.id='phase4-contact-output';output.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:2147483647;background:#fff;color:#111;font:12px monospace;max-height:100px;overflow:auto;padding:8px;border:2px solid #e85011';document.body.append(output);}output.textContent='QA CONTACT INTERCEPTED: '+JSON.stringify(detail);parent.postMessage({phase4Contact:detail},location.origin);}},true);</script>`;
const metrics=`<script data-phase4-qa-only>function phase4Measure(){var a=document.activeElement,s=a&&getComputedStyle(a);parent.postMessage({phase4Ui:{title:document.title,path:location.pathname,width:innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight,focus:a?{tag:a.tagName,text:a.textContent.trim().slice(0,180),href:a.getAttribute('href'),focusVisible:a.matches(':focus-visible'),outline:s.outline,boxShadow:s.boxShadow,rect:a.getBoundingClientRect().toJSON()}:null}},location.origin);}addEventListener('load',phase4Measure);addEventListener('resize',phase4Measure);document.addEventListener('focusin',phase4Measure);document.addEventListener('focusout',phase4Measure);</script>`;
const assets={async fetch(request){const pathname=decodeURIComponent(new URL(request.url).pathname);const file=path.resolve(dist,'.'+pathname,path.extname(pathname)?'':'index.html');if(!file.startsWith(dist+path.sep))return new Response('Not found',{status:404});const body=await fs.readFile(file).catch(()=>null);return new Response(request.method==='HEAD'?null:body,{status:body?200:404,headers:{'Content-Type':mime[path.extname(file)]||'application/octet-stream'}});}};
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,origin);
  if(url.pathname==='/__phase4_frame'){
   const width=Number(url.searchParams.get('width')||390),height=Number(url.searchParams.get('height')||844);
   const route=url.searchParams.get('path')||'/brands/mercedes-benz-service-dubai';
   if(![320,390,768,1200].includes(width)||height<500||height>1000||!route.startsWith('/')||route.startsWith('//'))throw new Error('Invalid QA frame');
   const safe=route.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
   const html=`<!doctype html><html><head><title>Phase 4 local responsive QA ${width}px</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#ddd;color:#111;font:14px Arial}header{position:absolute;left:430px;top:0;padding:8px;max-width:700px}iframe{display:block;border:0;margin:0;background:#111}output{display:block;white-space:pre-wrap;overflow-wrap:anywhere;padding:8px}</style></head><body><header>LOCAL QA — ${width} × ${height} CSS pixels, desktop browser engine. Contact actions are intercepted; external analytics/connections blocked.</header><iframe title="Mercedes candidate ${width} pixel responsive viewport" width="${width}" height="${height}" src="${safe}"></iframe><output id="qa-action-log">No contact actions yet.</output><output id="qa-viewport-metrics">Waiting for frame load.</output><script>addEventListener('message',function(event){if(event.origin!==location.origin)return;if(event.data.phase4Contact)document.getElementById('qa-action-log').textContent=JSON.stringify(event.data.phase4Contact,null,2);if(event.data.phase4Ui)document.getElementById('qa-viewport-metrics').textContent=JSON.stringify(event.data.phase4Ui,null,2);});</script></body></html>`;
   res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':csp,'Cache-Control':'no-store'});return res.end(html);
  }
  const response=await handleRequest(new Request('https://digitecme.com'+req.url,{method:req.method}),{ASSETS:assets});
  const headers=Object.fromEntries(response.headers);
  if(headers.location?.startsWith('https://digitecme.com'))headers.location=headers.location.replace('https://digitecme.com',origin);
  headers['Content-Security-Policy']=csp;headers['Cache-Control']='no-store';
  let body=Buffer.from(await response.arrayBuffer());
  if(req.method!=='HEAD'&&(headers['content-type']||'').includes('text/html'))body=Buffer.from(body.toString('utf8').replace('</head>',intercept+metrics+'</head>'));
  delete headers['content-length'];res.writeHead(response.status,headers);res.end(body);
 }catch(error){res.writeHead(500);res.end('Local QA error: '+error.message);}
}).listen(port,'127.0.0.1',()=>console.log('Phase4 candidate QA at '+origin+'; responsive frame /__phase4_frame?width=390&height=844&path=/brands/mercedes-benz-service-dubai'));
