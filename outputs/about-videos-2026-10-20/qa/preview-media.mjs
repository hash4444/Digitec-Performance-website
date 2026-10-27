import http from 'node:http';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const dist=path.resolve('dist'),port=Number(process.argv[2]||5214),origin=`http://127.0.0.1:${port}`;
const {handleRequest}=await import(pathToFileURL(path.join(dist,'_worker.js')).href);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.json':'application/json','.xml':'application/xml','.ico':'image/x-icon','.pdf':'application/pdf','.txt':'text/plain','.mp4':'video/mp4'};
const assets={async fetch(request){
 const pathname=decodeURIComponent(new URL(request.url).pathname),file=path.resolve(dist,`.${pathname}`,path.extname(pathname)?'':'index.html');
 if(!file.startsWith(dist+path.sep))return new Response('Not found',{status:404});const body=await readFile(file).catch(()=>null);
 if(!body)return new Response('Not found',{status:404});
 const headers={'Content-Type':mime[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','Content-Length':String(body.length)};
 const range=request.headers.get('range');
 if(range&&request.method==='GET'){
  const match=/^bytes=(\d*)-(\d*)$/.exec(range);
  if(!match)return new Response(null,{status:416,headers:{...headers,'Content-Range':`bytes */${body.length}`,'Content-Length':'0'}});
  let start=match[1]?Number(match[1]):Math.max(0,body.length-Number(match[2])),end=match[1]?(match[2]?Number(match[2]):body.length-1):body.length-1;
  end=Math.min(end,body.length-1);if(start>end||start>=body.length)return new Response(null,{status:416,headers:{...headers,'Content-Range':`bytes */${body.length}`,'Content-Length':'0'}});
  return new Response(body.subarray(start,end+1),{status:206,headers:{...headers,'Content-Range':`bytes ${start}-${end}/${body.length}`,'Content-Length':String(end-start+1)}});
 }
 return new Response(request.method==='HEAD'?null:body,{status:200,headers});
}};
http.createServer(async(req,res)=>{try{const headers=new Headers();for(const[k,v]of Object.entries(req.headers))if(v)headers.set(k,Array.isArray(v)?v.join(', '):v);const result=await handleRequest(new Request(`https://digitecme.com${req.url}`,{method:req.method,headers}),{ASSETS:assets}),out=Object.fromEntries(result.headers);if(out.location?.startsWith('https://digitecme.com'))out.location=out.location.replace('https://digitecme.com',origin);out['content-security-policy']="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self' data:; frame-src 'none'; object-src 'none'";res.writeHead(result.status,out);res.end(Buffer.from(await result.arrayBuffer()));}catch(e){res.writeHead(500);res.end('Local media preview failed');console.error(e.message);}}).listen(port,'127.0.0.1',()=>console.log(`About video production preview ${origin}/about`));
