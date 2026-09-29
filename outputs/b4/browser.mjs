import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5194';const out='outputs/b4/browser';await fs.mkdir(out,{recursive:true});
const seo=new Map(JSON.parse(await fs.readFile('outputs/b4/after-pages.json','utf8')).map(p=>[p.path,p.seo]));
const routes=[
 '/brands/ferrari-service-dubai','/ar/brands/ferrari-service-dubai','/best-ferrari-workshop-dubai','/ar/best-ferrari-workshop-dubai',
 '/brands/ferrari-service-dubai/engine-diagnostics','/brands/ferrari-service-dubai/mechanical-repair',
 '/brands/ferrari-service-dubai/transmission-repair','/brands/ferrari-service-dubai/suspension-repair',
 '/brands/ferrari-service-dubai/brake-repair','/brands/ferrari-service-dubai/ac-repair',
 '/brands/ferrari-service-dubai/electrical-repair','/brands/ferrari-service-dubai/296',
 '/brands/ferrari-service-dubai/812','/brands/ferrari-service-dubai/sf90',
 '/blog/ferrari-maintenance-guide-dubai','/ar/blog/ferrari-maintenance-guide-dubai',
 '/brands/lamborghini-service-dubai','/ar/brands/lamborghini-service-dubai','/best-lamborghini-workshop-dubai','/ar/best-lamborghini-workshop-dubai',
 '/brands/lamborghini-service-dubai/engine-diagnostics','/brands/lamborghini-service-dubai/mechanical-repair',
 '/brands/lamborghini-service-dubai/transmission-repair','/brands/lamborghini-service-dubai/suspension-repair',
 '/brands/lamborghini-service-dubai/brake-repair','/brands/lamborghini-service-dubai/ac-repair',
 '/brands/lamborghini-service-dubai/electrical-repair','/brands/lamborghini-service-dubai/battery-replacement',
 '/blog/lamborghini-urus-service-dubai-guide','/blog/lamborghini-maintenance-guide-dubai',
 '/ar/blog/lamborghini-maintenance-guide-dubai',
 '/brands/mercedes-benz-service-dubai','/brands/porsche-service-dubai','/brands/bmw-service-dubai'];
const report={passed:false,pages:[],faqInteractions:[],noJavaScript:[],errors:[]};
const browser=await chromium.launch({channel:'msedge',headless:true});
const protect=async context=>context.route('**/*',route=>route.request().url().startsWith(base)&&['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
try{
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});await protect(context);const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&/hydration|did not match|Minified React error/i.test(m.text()))report.errors.push(m.text());});
  for(const route of routes){
   const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200,route);
   const x=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,
    canonical:document.querySelector('link[rel=canonical]')?.href,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),
    schema:document.querySelectorAll('script[data-route-jsonld=true]').length,robots:document.querySelector('meta[name=robots]')?.content,
    overflow:document.documentElement.scrollWidth>innerWidth+1,
    brokenVisibleImages:[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight&&i.getBoundingClientRect().bottom>0&&i.complete&&i.naturalWidth===0).map(i=>i.src),
    links:document.querySelectorAll('a[href^="/"]').length}));
   assert.equal(x.canonical,seo.get(route).canonical,route);assert.equal(x.title,seo.get(route).title,route);
   assert.equal(x.description,seo.get(route).description,route);assert.equal(x.h1.length,1,route);
   assert.equal(x.schema,1,route);assert.equal(x.overflow,false,`${route} ${width}px overflow`);
   assert.deepEqual(x.brokenVisibleImages,[],route);assert.ok(x.links>=3,route);
   assert.equal(x.robots?.includes('noindex')??false,!!seo.get(route).noindex,route);
   report.pages.push({route,width,...x});
   if(['/brands/ferrari-service-dubai','/brands/lamborghini-service-dubai','/brands/lamborghini-service-dubai/electrical-repair','/ar/brands/ferrari-service-dubai'].includes(route))
    await page.screenshot({path:`${out}/${route.replaceAll('/','_')}-${width}.png`});
   if(['/brands/ferrari-service-dubai','/ar/brands/ferrari-service-dubai','/brands/lamborghini-service-dubai','/ar/brands/lamborghini-service-dubai','/best-ferrari-workshop-dubai','/ar/best-ferrari-workshop-dubai','/best-lamborghini-workshop-dubai','/ar/best-lamborghini-workshop-dubai'].includes(route)){
    const faq=seo.get(route).jsonLd['@graph'].find(n=>n['@type']==='FAQPage')?.mainEntity[0];
    if(faq){const trigger=page.getByRole('button',{name:faq.name,exact:true});await trigger.click();const region=page.locator('[id="'+await trigger.getAttribute('aria-controls')+'"]');await region.waitFor({state:'visible'});
     assert.ok((await region.innerText()).includes(faq.acceptedAnswer.text),route);await trigger.click();await region.waitFor({state:'hidden'});report.faqInteractions.push({route,width});}
   }
  }
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});await protect(context);const page=await context.newPage();
 for(const route of ['/brands/ferrari-service-dubai','/ar/brands/ferrari-service-dubai','/brands/ferrari-service-dubai/296','/blog/ferrari-maintenance-guide-dubai','/best-ferrari-workshop-dubai','/ar/best-ferrari-workshop-dubai','/brands/lamborghini-service-dubai','/ar/brands/lamborghini-service-dubai','/brands/lamborghini-service-dubai/electrical-repair','/blog/lamborghini-maintenance-guide-dubai','/best-lamborghini-workshop-dubai','/ar/best-lamborghini-workshop-dubai']){
  await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').count(),1,route);
  assert.ok(await page.locator('h2').count()>0,route);assert.equal(await page.locator('script[data-route-jsonld=true]').count(),1,route);
  report.noJavaScript.push(route);
 }
 await context.close();assert.deepEqual(report.errors,[]);report.passed=true;
}finally{await fs.writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({passed:true,pages:report.pages.length,faqInteractions:report.faqInteractions.length,noJavaScript:report.noJavaScript.length}));
