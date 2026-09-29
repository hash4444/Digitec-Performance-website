import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5192';
const out='outputs/b2/browser';
await fs.mkdir(out,{recursive:true});
const expected=new Map(JSON.parse(await fs.readFile('outputs/b2/after-pages.json','utf8')).map(p=>[p.path,p.seo]));
const routes=[
 '/brands/porsche-service-dubai','/ar/brands/porsche-service-dubai',
 '/brands/porsche-service-dubai/transmission-repair','/brands/porsche-service-dubai/suspension-repair',
 '/brands/porsche-service-dubai/engine-diagnostics','/brands/porsche-service-dubai/oil-change',
 '/brands/porsche-service-dubai/ac-repair','/brands/porsche-service-dubai/battery-replacement',
 '/ar/brands/porsche-service-dubai/engine-diagnostics',
 '/porsche/systems/pdk','/porsche/systems/pasm','/porsche/problems/pasm-fault',
 '/porsche/guides/service-intervals-uae','/porsche/911/992','/blog/porsche-cayenne-service-dubai-guide',
 '/porsche/macan','/blog/porsche-panamera-service-dubai-guide','/porsche/taycan',
 '/best-porsche-workshop-dubai','/ar/best-porsche-workshop-dubai','/ar/blog/porsche-maintenance-guide-dubai',
 '/brands/mercedes-benz-service-dubai','/services/mercedes-diagnostics-dubai',
];
const report={passed:false,pages:[],faqInteractions:[],navigation:[],noJavaScript:[],errors:[]};
const browser=await chromium.launch({channel:'msedge',headless:true});
const protect=async context=>context.route('**/*',route=>route.request().url().startsWith(base)&&['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
try{
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
    telephoneLinks:document.querySelectorAll('a[href^="tel:"]').length,whatsappLinks:document.querySelectorAll('a[href^="https://wa.me/"]').length,
    internalLinks:[...document.querySelectorAll('a[href^="/"]')].length}));
   assert.equal(state.canonical,expected.get(route).canonical,route);
   assert.equal(state.title,expected.get(route).title,route);
   assert.equal(state.description,expected.get(route).description,route);
   assert.equal(state.h1.length,1,route);assert.equal(state.graphCount,1,route);
   assert.equal(state.overflow,false,`${route} ${width}px overflow`);
   assert.deepEqual(state.brokenVisibleImages,[],route);
   assert.ok(state.telephoneLinks+state.whatsappLinks+state.internalLinks>=3,route);
   assert.equal(state.robots?.includes('noindex')??false,!!expected.get(route).noindex,route);
   report.pages.push({route,width,...state});
   if(['/brands/porsche-service-dubai','/ar/brands/porsche-service-dubai','/porsche/taycan','/brands/porsche-service-dubai/transmission-repair','/ar/blog/porsche-maintenance-guide-dubai'].includes(route))
    await page.screenshot({path:`${out}/${route.replaceAll('/','_')}-${width}.png`});
   if(['/brands/porsche-service-dubai','/ar/brands/porsche-service-dubai','/best-porsche-workshop-dubai','/ar/blog/porsche-maintenance-guide-dubai'].includes(route)){
    const faq=expected.get(route).jsonLd['@graph'].find(n=>n['@type']==='FAQPage')?.mainEntity[0];
    if(faq){const trigger=page.getByRole('button',{name:faq.name,exact:true});await trigger.click();
     const region=page.locator('[id="'+await trigger.getAttribute('aria-controls')+'"]').first();await region.waitFor({state:'visible'});
     assert.ok((await region.innerText()).includes(faq.acceptedAnswer.text),route);
     await trigger.click();await region.waitFor({state:'hidden'});
     report.faqInteractions.push({route,width,matchingAnswer:true,expandCollapse:true});}
   }
  }
  await page.goto(base+'/brands/porsche-service-dubai',{waitUntil:'networkidle'});
  await page.locator('a[href="/brands/porsche-service-dubai/transmission-repair"]').first().click();
  await page.waitForURL(base+'/brands/porsche-service-dubai/transmission-repair');
  await page.locator('a[href="/porsche/systems/pdk"]').first().click();
  await page.waitForURL(base+'/porsche/systems/pdk');
  report.navigation.push({width,hubToTransmissionToPdk:true});
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});await protect(context);
 const page=await context.newPage();
 for(const route of ['/brands/porsche-service-dubai','/ar/brands/porsche-service-dubai','/brands/porsche-service-dubai/transmission-repair','/porsche/systems/pdk','/porsche/problems/pasm-fault','/porsche/911/992','/ar/blog/porsche-maintenance-guide-dubai']){
  await page.goto(base+route,{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);assert.ok(await page.locator('h2').count()>2,route);
  assert.equal(await page.locator('script[data-route-jsonld=true]').count(),1,route);
  report.noJavaScript.push({route,titleAndContentAndSchema:true});
 }
 await context.close();assert.deepEqual(report.errors,[]);report.passed=true;
}finally{await fs.writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({passed:true,pages:report.pages.length,faqInteractions:report.faqInteractions.length,navigationJourneys:report.navigation.length,noJavaScript:report.noJavaScript.length}));
