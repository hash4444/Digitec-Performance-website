import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {PROJECT} from './runtime.mjs';
const types={'.html':'text/html','.mp4':'video/mp4','.png':'image/png','.jpg':'image/jpeg','.json':'application/json','.md':'text/plain','.zip':'application/zip'};
const port=Number(process.env.PORT||8789);
http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(PROJECT,'.'+(pathname==='/'?'/review.html':pathname));
  if(!file.startsWith(PROJECT+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404);res.end();return;}
  const size=fs.statSync(file).size,range=req.headers.range;
  const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','Accept-Ranges':'bytes','Cache-Control':'no-cache'};
  if(range){const match=/bytes=(\d+)-(\d*)/.exec(range);if(!match){res.writeHead(416);res.end();return;}const start=Number(match[1]),end=Math.min(match[2]?Number(match[2]):size-1,size-1);if(start>end){res.writeHead(416);res.end();return;}res.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});fs.createReadStream(file,{start,end}).pipe(res);}
  else{res.writeHead(200,{...headers,'Content-Length':size});fs.createReadStream(file).pipe(res);}
}).listen(port,'127.0.0.1',()=>console.log(`Review player: http://127.0.0.1:${port}/review.html`));
