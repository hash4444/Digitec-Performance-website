import fs from 'node:fs';
import path from 'node:path';
const base='dist/brands/aston-martin-service-dubai';
const files=[`${base}/index.html`,...fs.readdirSync(base,{withFileTypes:true}).filter(x=>x.isDirectory()).map(x=>`${base}/${x.name}/index.html`),'dist/blog/aston-martin-best-workshop-dubai/index.html','dist/blog/aston-martin-db11-service-dubai-guide/index.html'];
const rows=files.map(file=>{const html=fs.readFileSync(file,'utf8');const h1s=[...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)];if(h1s.length!==1||/a Aston Martin|Models We|Useful image plan/.test(html))throw new Error(file);return [file,html.match(/<title>(.*?)<\/title>/s)?.[1],html.match(/<meta name="description" content="([^"]*)/s)?.[1],h1s[0][1].replace(/<[^>]*>/g,'')];});
console.log(JSON.stringify(rows));
