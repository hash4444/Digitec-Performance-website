import {mkdir,readFile,writeFile} from 'node:fs/promises';
const root='outputs/repair-service-2026-10-19';
await mkdir(`${root}/live/html`,{recursive:true});
const before=JSON.parse(await readFile(`${root}/baseline/rendered.json`,'utf8'));
const routes=before.filter(r=>r.selected||r.route.endsWith('/engine-diagnostics')).map(r=>r.route);
const decode=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#x27;|&#39;/g,"'");
const records=[];
for(let index=0;index<routes.length;index+=6){
  const batch=await Promise.all(routes.slice(index,index+6).map(async route=>{
    try{
      const response=await fetch(`https://digitecme.com${route}`,{signal:AbortSignal.timeout(30000)});
      const html=await response.text();
      await writeFile(`${root}/live/html/${route.slice(1).replaceAll('/','__')}.html`,html);
      return {route,status:response.status,url:response.url,headers:Object.fromEntries([...response.headers].filter(([key])=>key!=='set-cookie')),title:decode(html.match(/<title>(.*?)<\/title>/s)?.[1]||''),canonical:html.match(/<link rel="canonical" href="([^"]*)"/)?.[1],robots:html.match(/<meta name="robots" content="([^"]*)"/)?.[1],h1Count:[...html.matchAll(/<h1\b/g)].length};
    }catch(error){return{route,error:String(error)}}
  }));records.push(...batch);
}
await writeFile(`${root}/live/http-audit.json`,JSON.stringify({capturedAt:new Date().toISOString(),records},null,2));
console.log(JSON.stringify({routes:records.length,status200:records.filter(r=>r.status===200).length,errors:records.filter(r=>r.error)}));
