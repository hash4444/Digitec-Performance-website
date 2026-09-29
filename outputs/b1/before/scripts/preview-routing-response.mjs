import http from 'node:http';
import { handleRequest } from '../cloudflare/production-seo-router.js';
import { originFetch } from './test-routing-response.mjs';

// Local-only preview of the actual configured production Worker and built files.
http.createServer(async (req,res)=>{
  try {
    const response=await handleRequest(new Request(`https://digitecme.com${req.url}`,{method:req.method}),originFetch);
    const headers=Object.fromEntries(response.headers);
    if(headers.location)headers.location=headers.location.replace('https://digitecme.com','http://127.0.0.1:5191');
    res.writeHead(response.status,headers);res.end(Buffer.from(await response.arrayBuffer()));
  } catch(error){res.writeHead(500);res.end(String(error));}
}).listen(5191,'127.0.0.1',()=>console.log('B0-A preview http://127.0.0.1:5191'));
