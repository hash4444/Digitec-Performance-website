import { createRequire } from 'node:module';
import { writeFile, mkdir } from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const origin='https://digitecme.com';
const out='outputs/ppf-phase1-2026-10-17/baseline';
await mkdir(`${out}/screenshots`,{recursive:true});
const browser=await chromium.launch({channel:'msedge',headless:true});
const context=await browser.newContext({viewport:{width:390,height:844}});
const blocked=[];const errors=[];
await context.route('**/*',async route=>{
 const request=route.request();const url=new URL(request.url());
 if(url.origin===origin&&['GET','HEAD'].includes(request.method())&&!/\/cdn-cgi\/rum/.test(url.pathname))return route.continue();
 blocked.push({url:request.url(),method:request.method()});return route.abort();
});
await context.addInitScript(()=>{
 window.__auditLcp=0;window.__auditCls=0;
 try{new PerformanceObserver(list=>list.getEntries().forEach(e=>window.__auditLcp=e.startTime)).observe({type:'largest-contentful-paint',buffered:true});}catch{}
 try{new PerformanceObserver(list=>list.getEntries().filter(e=>!e.hadRecentInput).forEach(e=>window.__auditCls+=e.value)).observe({type:'layout-shift',buffered:true});}catch{}
});
const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
const results=[];
for(const route of ['/services/paint-protection-film','/ar/services/paint-protection-film']){
 for(const width of [390,320,1440]){
  await page.setViewportSize({width,height:width===1440?1000:844});
  const response=await page.goto(origin+route,{waitUntil:'networkidle'});
  await page.locator('h1').waitFor();
  const capture=await page.evaluate(()=>({title:document.title,lang:document.documentElement.lang,dir:document.documentElement.dir,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent),canonical:document.querySelector('link[rel=canonical]')?.href,overflow:document.documentElement.scrollWidth>innerWidth,documentWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth,forms:[...document.forms].map(f=>({id:f.id,fields:[...f.elements].filter(e=>e.matches('input,select,textarea')).map(e=>({name:e.name,type:e.type,required:e.required,disabled:e.disabled})),submit:[...f.querySelectorAll('button[type=submit]')].map(e=>({text:e.textContent,disabled:e.disabled}))})),tel:[...document.querySelectorAll('a[href^="tel:"]')].map(a=>({href:a.href,text:a.textContent})),whatsapp:[...document.querySelectorAll('a[href*="wa.me"]')].map(a=>({href:a.href,text:a.textContent})),images:[...document.images].map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0,width:i.naturalWidth,height:i.naturalHeight})),labMetrics:{lcpMs:window.__auditLcp,cls:window.__auditCls,navigation:performance.getEntriesByType('navigation').map(e=>({ttfb:e.responseStart-e.requestStart,domContentLoaded:e.domContentLoadedEventEnd,load:e.loadEventEnd}))[0]}}));
  const screenshot=`screenshots/${route.startsWith('/ar')?'ar':'en'}-${width}.png`;
  await page.screenshot({path:`${out}/${screenshot}`,fullPage:width===390});
  results.push({route,width,status:response.status(),...capture,screenshot});
 }
}
await context.close();await browser.close();
const report={checkedAt:new Date().toISOString(),method:'Read-only production browser pages. Only GET/HEAD on digitecme.com permitted. Third-party and mutation requests blocked. No form submits, CTA clicks or test leads.',metricsLimitation:'Single uncontrolled-network headless lab samples; no CPU/network mobile emulation; not CrUX field data or a Core Web Vitals pass claim.',results,errors,blocked};
await writeFile(`${out}/browser-live.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify({results:results.map(r=>({route:r.route,width:r.width,status:r.status,overflow:r.overflow,forms:r.forms.length,labMetrics:r.labMetrics})),errors,blocked:blocked.length},null,2));
