import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5193';
const out='outputs/b3/browser';
await fs.mkdir(out,{recursive:true});
const expected=new Map(JSON.parse(await fs.readFile('outputs/b3/after-pages.json','utf8')).map(p=>[p.path,p.seo]));
const routes=[
 '/brands/bmw-service-dubai','/ar/brands/bmw-service-dubai',
 '/brands/bmw-service-dubai/engine-diagnostics','/brands/bmw-service-dubai/mechanical-repair',
 '/brands/bmw-service-dubai/transmission-repair','/brands/bmw-service-dubai/suspension-repair',
 '/brands/bmw-service-dubai/ac-repair','/brands/bmw-service-dubai/electrical-repair',
 '/brands/bmw-service-dubai/battery-replacement','/brands/bmw-service-dubai/oil-change',
 '/brands/bmw-service-dubai/brake-repair','/brands/bmw-service-dubai/x5',
 '/brands/bmw-service-dubai/m3','/brands/bmw-service-dubai/3-series',
 '/blog/bmw-maintenance-guide-dubai','/ar/blog/bmw-maintenance-guide-dubai',
 '/best-bmw-workshop-dubai','/ar/best-bmw-workshop-dubai',
 '/brands/mercedes-benz-service-dubai','/brands/porsche-service-dubai',
];
const report={passed:false,pages:[],faqInteractions:[],navigation:[],noJavaScript:[],errors:[]};
const browser=await chromium.launch({channel:'msedge',headless:true});
const protect=async context=>context.route('**/*',route=>route.request().url().startsWith(base)&&['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
try {
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});await protect(context);
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&/hydration|did not match|Minified React error/i.test(m.text()))report.errors.push(m.text());});
  for(const route of routes){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200,route);
   const state=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,
    canonical:document.querySelector('link[rel=canonical]')?.href,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
    graphCount:document.querySelectorAll('script[data-route-jsonld=true]').length,robots:document.querySelector('meta[name=robots]')?.content,
    overflow:document.documentElement.scrollWidth>innerWidth+1,
    brokenVisibleImages:[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight&&i.getBoundingClientRect().bottom>0&&i.complete&&i.naturalWidth===0).map(i=>i.src),
    internalLinks:[...document.querySelectorAll('a[href^="/"]')].length}));
   assert.equal(state.canonical,expected.get(route).canonical,route);
   assert.equal(state.title,expected.get(route).title,route);
   assert.equal(state.description,expected.get(route).description,route);
   assert.equal(state.h1.length,1,route);assert.equal(state.graphCount,1,route);
   assert.equal(state.overflow,false,`${route} ${width}px overflow`);
   assert.deepEqual(state.brokenVisibleImages,[],route);
   assert.ok(state.internalLinks>=3,route);
   assert.equal(state.robots?.includes('noindex')??false,!!expected.get(route).noindex,route);
   report.pages.push({route,width,...state});
   if(['/brands/bmw-service-dubai','/ar/brands/bmw-service-dubai','/brands/bmw-service-dubai/x5','/best-bmw-workshop-dubai'].includes(route))
    await page.screenshot({path:`${out}/${route.replaceAll('/','_')}-${width}.png`});
   if(['/brands/bmw-service-dubai','/ar/brands/bmw-service-dubai','/best-bmw-workshop-dubai','/ar/blog/bmw-maintenance-guide-dubai'].includes(route)){
    const faq=expected.get(route).jsonLd['@graph'].find(n=>n['@type']==='FAQPage')?.mainEntity[0];
    if(faq){const trigger=page.getByRole('button',{name:faq.name,exact:true});await trigger.click();
     const region=page.locator('[id="'+await trigger.getAttribute('aria-controls')+'"]');await region.waitFor({state:'visible'});
     assert.ok((await region.innerText()).includes(faq.acceptedAnswer.text),route);
     await trigger.click();await region.waitFor({state:'hidden'});
     report.faqInteractions.push({route,width,matchingAnswer:true,expandCollapse:true});}
   }
  }
  await page.goto(base+'/brands/bmw-service-dubai',{waitUntil:'networkidle'});
  await page.locator('a[href="/brands/bmw-service-dubai/engine-diagnostics"]').first().click();
  await page.waitForURL(base+'/brands/bmw-service-dubai/engine-diagnostics');
  report.navigation.push({width,hubToDiagnostics:true});
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});await protect(context);
 const page=await context.newPage();
 for(const route of ['/brands/bmw-service-dubai','/ar/brands/bmw-service-dubai','/brands/bmw-service-dubai/engine-diagnostics','/brands/bmw-service-dubai/x5','/blog/bmw-maintenance-guide-dubai','/best-bmw-workshop-dubai']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);assert.ok(await page.locator('h2').count()>1,route);
  assert.equal(await page.locator('script[data-route-jsonld=true]').count(),1,route);
  report.noJavaScript.push({route,titleAndContentAndSchema:true});
 }
 await context.close();assert.deepEqual(report.errors,[]);report.passed=true;
}finally{await fs.writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({passed:true,pages:report.pages.length,faqInteractions:report.faqInteractions.length,navigationJourneys:report.navigation.length,noJavaScript:report.noJavaScript.length}));
