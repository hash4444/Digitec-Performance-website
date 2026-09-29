import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5196';
const seo=new Map(JSON.parse(await fs.readFile('outputs/b7/after-pages.json','utf8')).map(x=>[x.path,x.seo]));
const routes=['/brands/cadillac-service-dubai','/brands/cadillac-service-dubai/engine-diagnostics','/brands/cadillac-service-dubai/electrical-repair','/brands/cadillac-service-dubai/transmission-repair','/brands/cadillac-service-dubai/suspension-repair','/brands/cadillac-service-dubai/ac-repair','/brands/cadillac-service-dubai/battery-replacement','/brands/cadillac-service-dubai/mechanical-repair','/brands/cadillac-service-dubai/oil-change','/services/cadillac-cue-screen-repair-dubai','/blog/cadillac-best-workshop-dubai','/ar/brands/cadillac-service-dubai','/ar/brands/cadillac-service-dubai/ac-repair'];
const report={passed:false,pages:[],noJavaScript:[],errors:[]};
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
    overflow:document.documentElement.scrollWidth>innerWidth+1,brokenVisibleImages:[...document.images].filter(i=>i.getBoundingClientRect().top<innerHeight&&i.getBoundingClientRect().bottom>0&&i.complete&&i.naturalWidth===0).map(i=>i.src),links:document.querySelectorAll('a[href^="/"]').length}));
   assert.equal(x.canonical,seo.get(route).canonical,route);assert.equal(x.title,seo.get(route).title,route);assert.equal(x.description,seo.get(route).description,route);
   assert.equal(x.h1.length,1,route);assert.equal(x.schema,1,route);assert.equal(x.overflow,false,`${route} ${width}px overflow`);
   assert.deepEqual(x.brokenVisibleImages,[],route);assert.ok(x.links>=3,route);assert.equal(x.robots?.includes('noindex')??false,!!seo.get(route).noindex,route);
   report.pages.push({route,width,...x});
  }
  await context.close();
 }
 const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});await protect(context);const page=await context.newPage();
 for(const route of routes){await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(await page.locator('h1').count(),1,route);assert.ok(await page.locator('h2').count()>0,route);assert.equal(await page.locator('script[data-route-jsonld=true]').count(),1,route);report.noJavaScript.push(route);}
 await context.close();assert.deepEqual(report.errors,[]);report.passed=true;
}finally{await fs.writeFile('outputs/b7/browser-verification.json',JSON.stringify(report,null,2));await browser.close();}
console.log(JSON.stringify({passed:true,pages:report.pages.length,noJavaScript:report.noJavaScript.length}));

