import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5191';
const out='outputs/b1/browser';
await fs.mkdir(out,{recursive:true});
const expected=new Map(JSON.parse(await fs.readFile('outputs/b1/after-pages.json','utf8')).map(p=>[p.path,p.seo]));
const routes=[
 '/brands/mercedes-benz-service-dubai','/ar/brands/mercedes-benz-service-dubai',
 '/services/mercedes-mechanical-repair-dubai','/services/mercedes-electrical-repair-dubai','/services/mercedes-oil-change-dubai','/services/mercedes-fuel-system-repair-dubai',
 '/services/mercedes-suspension-repair-dubai','/services/mercedes-transmission-repair-dubai','/services/mercedes-diagnostics-dubai','/services/mercedes-ac-repair-dubai','/services/mercedes-battery-replacement-dubai',
 '/ar/services/mercedes-mechanical-repair-dubai','/ar/services/mercedes-diagnostics-dubai',
 '/services/head-unit-repair-dubai','/services/mercedes-audio-upgrade-dubai',
 '/blog/mercedes-c-class-service-dubai-guide','/blog/mercedes-g63-service-dubai-guide','/blog/mercedes-s-class-service-dubai-guide','/mercedes/models/c63-service-repair-dubai','/ar/blog/mercedes-g63-service-dubai-guide',
 '/mercedes/problems','/mercedes/problems/wont-start','/mercedes/problems/airmatic-malfunction','/mercedes/problems/gearbox-jerking',
 '/blog/mercedes-benz-maintenance-guide-dubai','/ar/blog/mercedes-benz-maintenance-guide-dubai',
 '/blog/mercedes-repair-dubai-complete-guide','/ar/blog/mercedes-service-cost-dubai-guide',
 '/blog/best-oil-change-dubai-mercedes','/blog/mercedes-service-intervals-dubai-heat',
 '/brands/bmw-service-dubai','/ar/services/car-diagnostics-dubai',
];
const report={passed:false,pages:[],faqInteractions:[],navigation:[],noJavaScript:[],errors:[]};
const browser=await chromium.launch({channel:'msedge',headless:true});
const protect=async context=>context.route('**/*',route=>route.request().url().startsWith(base)&&['GET','HEAD'].includes(route.request().method())?route.continue():route.abort());
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  await protect(context);
  const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error'&&/hydration|did not match|Minified React error/i.test(m.text()))report.errors.push(m.text());});
  for (const route of routes) {
   const response=await page.goto(base+route,{waitUntil:'networkidle'});
   assert.equal(response.status(),200,route);
   const state=await page.evaluate(()=>({title:document.title,description:document.querySelector('meta[name=description]')?.content,canonical:document.querySelector('link[rel=canonical]')?.href,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent.trim()),graphCount:document.querySelectorAll('script[data-route-jsonld=true]').length,robots:document.querySelector('meta[name=robots]')?.content,overflow:document.documentElement.scrollWidth>innerWidth+1,brokenVisibleImages:[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight&&i.getBoundingClientRect().bottom>0&&i.complete&&i.naturalWidth===0).map(i=>i.src),whatsappLinks:document.querySelectorAll('main a[href^="https://wa.me/"]').length,telephoneLinks:document.querySelectorAll('main a[href^="tel:"]').length,internalLinks:[...document.querySelectorAll('main a[href^="/"]')].length}));
   assert.equal(state.canonical,expected.get(route).canonical,route);
   assert.equal(state.title,expected.get(route).title,route);
   assert.equal(state.description,expected.get(route).description,route);
   assert.equal(state.h1.length,1,route);
   assert.equal(state.graphCount,1,route);
   assert.equal(state.overflow,false,`${route}: ${width}px overflow`);
   assert.deepEqual(state.brokenVisibleImages,[],route);
   assert.ok(state.whatsappLinks+state.telephoneLinks+state.internalLinks>=3,`${route}: useful next steps`);
   assert.equal(state.robots?.includes('noindex')??false,!!expected.get(route).noindex,route);
   report.pages.push({route,width,...state});
   if (['/brands/mercedes-benz-service-dubai','/ar/services/mercedes-mechanical-repair-dubai','/blog/mercedes-benz-maintenance-guide-dubai','/mercedes/models/c63-service-repair-dubai','/mercedes/problems/wont-start'].includes(route)) {
    await page.screenshot({path:`${out}/${route.replaceAll('/','_')}-${width}.png`});
   }
   if (['/brands/mercedes-benz-service-dubai','/ar/brands/mercedes-benz-service-dubai','/mercedes/models/c63-service-repair-dubai','/mercedes/problems/wont-start','/blog/mercedes-benz-maintenance-guide-dubai','/ar/blog/mercedes-benz-maintenance-guide-dubai'].includes(route)) {
    const faq=expected.get(route).jsonLd['@graph'].find(n=>n['@type']==='FAQPage')?.mainEntity[0];
    assert.ok(faq,route);
    const trigger=page.getByRole('button',{name:faq.name,exact:true});
    await trigger.click();
    const region=page.locator('[id="'+await trigger.getAttribute('aria-controls')+'"]').first();
    await region.waitFor({state:'visible'});
    assert.ok((await region.innerText()).includes(faq.acceptedAnswer.text),route);
    await trigger.click(); await region.waitFor({state:'hidden'});
    report.faqInteractions.push({route,width,matchingAnswer:true,expandCollapse:true});
   }
  }
  await page.goto(base+'/brands/mercedes-benz-service-dubai',{waitUntil:'networkidle'});
  await page.locator('a[href="/services/mercedes-mechanical-repair-dubai"]').first().click();
  await page.waitForURL(base+'/services/mercedes-mechanical-repair-dubai');
  await page.waitForFunction(()=>document.querySelector('link[rel=canonical]')?.href.endsWith('/services/mercedes-mechanical-repair-dubai'));
  assert.equal(await page.locator('h1').count(),1);
  await page.locator('a[href="/mercedes/problems/engine-overheating"]').first().click();
  await page.waitForURL(base+'/mercedes/problems/engine-overheating');
  await page.waitForFunction(()=>document.querySelector('link[rel=canonical]')?.href.endsWith('/mercedes/problems/engine-overheating'));
  assert.equal(await page.locator('script[data-route-jsonld=true]').count(),1);
  await page.goBack({waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('link[rel=canonical]')?.href.endsWith('/services/mercedes-mechanical-repair-dubai'));
  assert.equal(await page.locator('meta[property="article:published_time"]').count(),0);
  report.navigation.push({width,hubToServiceToProblemAndBack:true});
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});
 await protect(context);const page=await context.newPage();
 for (const route of ['/brands/mercedes-benz-service-dubai','/services/mercedes-mechanical-repair-dubai','/mercedes/models/c63-service-repair-dubai','/mercedes/problems/wont-start','/blog/mercedes-benz-maintenance-guide-dubai','/ar/blog/mercedes-benz-maintenance-guide-dubai']) {
  await page.goto(base+route,{waitUntil:'networkidle'});
  assert.equal(await page.locator('h1').count(),1);
  assert.ok(await page.locator('h2').count()>3);
  const faq=expected.get(route).jsonLd['@graph'].find(n=>n['@type']==='FAQPage');
  assert.ok((await page.locator('body').textContent()).includes(faq.mainEntity[0].acceptedAnswer.text),route);
  report.noJavaScript.push({route,contentAndFaqInHtml:true});
 }
 await context.close();assert.deepEqual(report.errors,[]);report.passed=true;
} finally {await fs.writeFile(`${out}/verification.json`,JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({passed:true,pages:report.pages.length,faqInteractions:report.faqInteractions.length,navigationJourneys:report.navigation.length,noJavaScript:report.noJavaScript.length}));
