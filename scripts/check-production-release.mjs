import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = 'outputs/customer-acquisition-2026-09-09';
const origin = 'https://digitecme.com';
const paths = [
  '/brands/mercedes-benz-service-dubai',
  '/services/mercedes-mechanical-repair-dubai',
  '/services/mercedes-transmission-repair-dubai',
  '/services/mercedes-diagnostics-dubai',
  '/brands/bmw-service-dubai',
  '/brands/bmw-service-dubai/transmission-repair',
  '/brands/bmw-service-dubai/engine-diagnostics',
  '/brands/porsche-service-dubai',
  '/brands/porsche-service-dubai/steering-repair',
  '/brands/porsche-service-dubai/engine-diagnostics',
  '/services/oil-change-dubai',
  '/services/steering-repair-dubai',
  '/services/exhaust-repair-dubai',
  '/services/tire-repair-dubai',
  '/services/paint-protection-film',
  '/services/ceramic-coating',
  '/services/car-polishing-dubai',
  '/brands/rox-service-dubai/soft-close-door-installation',
];
const capture = (html, re) => html.match(re)?.[1] ?? '';
const text = value => value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
function pageFields(html) {
  return {
    title: capture(html, /<title>([\s\S]*?)<\/title>/i),
    h1: [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m=>text(m[1])),
    canonical: capture(html, /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i),
    robots: capture(html, /<meta\b[^>]*name="robots"[^>]*content="([^"]*)"/i),
    description: capture(html, /<meta\b[^>]*name="description"[^>]*content="([^"]*)"/i),
    phone: html.includes('tel:+97143402223'),
    whatsapp: html.includes('https://wa.me/97143402223'),
    optionalBookingDetails: html.includes('Name (optional)') || html.includes('الاسم (اختياري)'),
    ctaPlacements: [...new Set([...html.matchAll(/data-cta-placement="([^"]+)"/g)].map(match => match[1]))].sort(),
    script: capture(html, /<script\b[^>]*type="module"[^>]*src="([^"]+)"/i),
  };
}
async function request(url, method='GET') {
  const started = Date.now();
  const response = await fetch(url, {method,redirect:'manual',headers:{'user-agent':'DIGI-TEC release verification','cache-control':'no-cache'},signal:AbortSignal.timeout(25000)});
  const body = await response.text();
  return {url,status:response.status,location:response.headers.get('location'),seconds:(Date.now()-started)/1000,body};
}
await mkdir(output,{recursive:true});
const pages=[];
let next=0;
async function worker() {
  while(next<paths.length){
    const pathname=paths[next++];
    try {
      const expected=pageFields(await readFile(path.join('dist',pathname,'index.html'),'utf8'));
      const response=await request(origin+pathname);
      const actual=pageFields(response.body);
      // Bundler asset hashes can vary between local and hosted environments.
      // Record both for diagnosis, but judge release content by rendered fields.
      const mismatches=Object.keys(expected).filter(key=>key!=='script' && JSON.stringify(expected[key])!==JSON.stringify(actual[key]));
      const record={path:pathname,status:response.status,seconds:response.seconds,mismatches,actual,expected};
      pages.push(record);
      console.log(JSON.stringify({path:pathname,status:response.status,mismatches}));
    } catch(error) {pages.push({path:pathname,error:String(error)});}
  }
}
await Promise.all(Array.from({length:4},worker));
const redirects=[];
for(const alias of ['/services/mercedes-repair-dubai','/services/mercedes-service-dubai']){
  for(const method of ['GET','HEAD']){
    try{
      const result=await request(origin+alias+'?utm_source=release-check&utm_medium=verification',method);
      redirects.push({path:alias,method,status:result.status,location:result.location,bodyLength:result.body.length,title:pageFields(result.body).title,canonical:pageFields(result.body).canonical});
    }catch(error){redirects.push({path:alias,method,error:String(error)});}
  }
}
const ancillary=[];
for(const pathname of ['/robots.txt','/sitemap.xml']){
  try{const r=await request(origin+pathname);ancillary.push({path:pathname,status:r.status,bytes:Buffer.byteLength(r.body),content:pathname==='/robots.txt'?r.body:undefined,urls:pathname==='/sitemap.xml'?[...r.body.matchAll(/<loc>(.*?)<\/loc>/g)].length:undefined});}catch(error){ancillary.push({path:pathname,error:String(error)});}
}
const report={checkedAt:new Date().toISOString(),origin,pages:pages.sort((a,b)=>a.path.localeCompare(b.path)),redirects,ancillary};
report.contentPassed = pages.every(page => !page.error && page.status === 200 && page.mismatches.length === 0);
report.redirectsPassed = redirects.every(redirect => [301,308].includes(redirect.status) && redirect.location === origin+'/brands/mercedes-benz-service-dubai?utm_source=release-check&utm_medium=verification');
await writeFile(path.join(output,'production-check.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({pages:pages.length,pageMismatches:pages.filter(r=>r.error||r.status!==200||r.mismatches.length).length,redirects,ancillary},null,2));
if (!report.contentPassed || !report.redirectsPassed || ancillary.some(item => item.error || item.status !== 200)) process.exitCode = 1;
