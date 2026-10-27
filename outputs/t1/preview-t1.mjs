import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const dist=path.resolve('dist');
const {handleRequest}=await import(pathToFileURL(path.join(dist,'_worker.js')).href);
const port=5191;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.ico':'image/x-icon','.woff2':'font/woff2','.xml':'application/xml','.json':'application/json','.txt':'text/plain'};
const assets={async fetch(request){
  const pathname=decodeURIComponent(new URL(request.url).pathname);
  const file=path.resolve(dist,`.${pathname}`,path.extname(pathname)?'':'index.html');
  if(!file.startsWith(dist+path.sep))return new Response('Not found',{status:404});
  const body=await fs.readFile(file).catch(()=>null);
  return new Response(request.method==='HEAD'?null:body,{status:body?200:404,headers:{'content-type':mime[path.extname(file)]||'application/octet-stream'}});
}};
http.createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,`http://127.0.0.1:${port}`);
    const response=await handleRequest(new Request(`https://digitecme.com${req.url}`,{method:req.method}),{ASSETS:assets});
    const headers=Object.fromEntries(response.headers);
    if(headers.location?.startsWith('https://digitecme.com'))headers.location=headers.location.replace('https://digitecme.com',`http://127.0.0.1:${port}`);
    if(url.searchParams.has('t1-no-js'))headers['content-security-policy']="script-src 'none'; object-src 'none'";
    res.writeHead(response.status,headers);res.end(Buffer.from(await response.arrayBuffer()));
  }catch{res.writeHead(500);res.end('Local preview failed');}
}).listen(port,'127.0.0.1',()=>console.log(`T1 preview http://127.0.0.1:${port}/tuning (append ?t1-no-js=1 for browser no-JavaScript inspection)`));
