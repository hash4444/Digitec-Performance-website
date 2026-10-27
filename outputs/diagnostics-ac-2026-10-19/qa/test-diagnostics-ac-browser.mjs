import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve(process.argv[2]),root=process.cwd();
assert.ok(root.includes('diagnostics-ac-2026-10-19')&&root.endsWith('candidate.local'),'Use isolated candidate only');
await fs.mkdir(out,{recursive:true});
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const old=JSON.parse(await fs.readFile(path.join(out,'../../audit/selected-owner-baseline.json'),'utf8'));
const server=spawn(process.execPath,['scripts/preview-production-local.mjs','5207'],{cwd:root,windowsHide:true,stdio:'ignore'});
let exited=false;server.once('exit',()=>{exited=true;});
const base='http://127.0.0.1:5207';
const report={checkedAt:new Date().toISOString(),passed:false,layouts:[],interactions:[],noJavaScript:[],spaLinks:[],screenshots:[],failures:[],runtimeErrors:[],failedLocalResponses:[],blockedExternalRequests:0,blockedWriteRequests:0,safety:'Only loopback GET/HEAD are allowed. WhatsApp/tel navigation is prevented, window.open is stubbed and no customer message, call or form submission is sent.'};
let browser;
async function configure(context){
 await context.route('**/*',route=>{
  const request=route.request(),url=new URL(request.url());
  if(!['127.0.0.1','localhost','[::1]'].includes(url.hostname)){report.blockedExternalRequests++;return route.abort();}
  if(!['GET','HEAD'].includes(request.method())){report.blockedWriteRequests++;return route.abort();}
  return route.continue();
 });
 await context.addInitScript(()=>{
  window.__qaContacts=[];window.__qaAnalytics=[];
  document.addEventListener('click',event=>{
   const anchor=event.target instanceof Element?event.target.closest('a[href]'):null;
   if(anchor&&/^(?:https:\/\/wa\.me\/|tel:)/.test(anchor.href)){event.preventDefault();window.__qaContacts.push({href:anchor.href,placement:anchor.dataset.ctaPlacement??'',text:anchor.textContent});}
  },true);
  window.open=(url)=>{window.__qaContacts.push({href:String(url),placement:'window.open'});return null;};
 });
}
try{
 let ready=false;
 for(let i=0;i<50;i++){
  if(exited)throw Error('Preview server exited');
  try{if((await fetch(base+'/services/car-ac-repair-dubai',{signal:AbortSignal.timeout(1000)})).status===200){ready=true;break;}}catch{}
  await new Promise(resolve=>setTimeout(resolve,200));
 }
 assert.ok(ready,'Preview ready');
 browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext();await configure(context);
 const page=await context.newPage();
 page.on('pageerror',error=>report.runtimeErrors.push(String(error)));
 page.on('response',response=>{if(response.url().startsWith(base)&&response.status()>=400)report.failedLocalResponses.push({url:response.url(),status:response.status()});});
 for(const before of old.records)for(const width of[1440,390,320]){
  const route=before.route,arabic=route.startsWith('/ar/'),mode=route.includes('ac-repair')?'ac':'diagnostics';
  try{
   await page.setViewportSize({width,height:1000});
   const response=await page.goto(base+route,{waitUntil:'networkidle'});assert.equal(response.status(),200,'Page HTTP200');
   const panel=page.locator(`[data-diagnostic-ac-enquiry="${mode}"]`);await panel.waitFor({state:'attached'});
   assert.equal(await page.locator('h1').count(),1);assert.match(await page.locator('h1').innerText(),arabic?/[\u0600-\u06ff]/:/Dubai/);
   assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://digitecme.com'+route);
   assert.ok(!(await page.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));
   assert.ok(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth<=1),'No horizontal overflow');
   const hero=page.locator('a[data-cta-placement=hero][href^="https://wa.me/"]');
   const quote=panel.locator('a[data-cta-placement=diagnostic_ac_quote][href^="https://wa.me/"]');
   assert.equal(await hero.count(),1);assert.equal(await quote.count(),1);
   const heroHref=await hero.getAttribute('href'),quoteHref=await quote.getAttribute('href');assert.equal(quoteHref,heroHref,'Same service draft');
   const msg=new URL(quoteHref).searchParams.get('text');assert.equal(new URL(quoteHref).pathname,'/97143402223');assert.ok(msg.length>80);
   assert.match(msg,arabic?/المسافة/:/Mileage/);assert.match(msg,arabic?mode==='ac'?/التبريد|التكييف/:/التحذير|تشخيص/:mode==='ac'?/AC assessment/:/diagnostic assessment/);
   for(const button of[hero,quote,panel.locator('a[href="tel:+97143402223"]')]){
    await button.scrollIntoViewIfNeeded();assert.ok(await button.isVisible(),'Contact visible');
    const box=await button.boundingBox();assert.ok(box.height>=44&&box.width>=44,'Usable touch target');
   }
   assert.match(await panel.locator('[data-diagnostic-ac-draft-note]').innerText(),arabic?/لا يؤكد/:/does not confirm receipt/);
   if(arabic){assert.equal(await page.locator('html').getAttribute('dir'),'rtl');assert.equal(await panel.locator('bdi').getAttribute('dir'),'ltr');assert.equal(await panel.locator('bdi').evaluate(el=>getComputedStyle(el).direction),'ltr');}
   const linked=await panel.locator('nav a').evaluateAll(anchors=>anchors.map(a=>a.getAttribute('href')));assert.ok(linked.length>=2);if(arabic)assert.ok(linked.every(h=>h.startsWith('/ar/')));
   if(width===390){
    await page.evaluate(()=>{window.__qaContacts=[];window.__qaAnalytics=[];window.gtag=(...args)=>window.__qaAnalytics.push(args);});
    await hero.click();await quote.click();await panel.locator('a[href="tel:+97143402223"]').click();
    const observations=await page.evaluate(()=>({contacts:window.__qaContacts,events:window.__qaAnalytics}));
    assert.equal(observations.contacts.length,3,'All contact clicks prevented and recorded');assert.equal(new URL(page.url()).pathname,route,'Contact does not navigate');
    const chat=observations.events.filter(args=>args[0]==='event'&&args[1]==='whatsapp_chat_opened');assert.equal(chat.length,2,'Intent events retained');
    const phone=observations.events.filter(args=>args[0]==='event'&&args[1]==='telephone_link_clicked');assert.equal(phone.length,1);
    for(const args of chat){assert.ok(!String(args[2].link_url).includes('?'),'Analytics excludes message query');assert.ok(!JSON.stringify(args[2]).includes(msg),'Draft body not sent to analytics');}
    report.interactions.push({route,heroPanelAndPhone:true,serviceDraftContext:true,events:observations.events.map(args=>args[1]),noConfirmedEnquiry:true,passed:true});
    await panel.scrollIntoViewIfNeeded();const screenshot=path.join(out,route.slice(1).replaceAll('/','__')+'-390.png');await page.screenshot({path:screenshot,fullPage:false});report.screenshots.push(screenshot);
    const href=linked[0];await panel.locator('nav a').first().click();await page.waitForURL(base+href);await page.waitForTimeout(50);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://digitecme.com'+href);report.spaLinks.push({from:route,to:href,passed:true});
   }
   report.layouts.push({route,width,language:arabic?'ar':'en',mode,passed:true});
  }catch(error){report.failures.push({route,width,error:error.message,stack:error.stack});}
 }
 await context.close();
 const noJs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:844}});await configure(noJs);const noJsPage=await noJs.newPage();
 for(const before of old.records){try{const route=before.route;const response=await noJsPage.goto(base+route,{waitUntil:'load'});assert.equal(response.status(),200);assert.equal(await noJsPage.locator('h1').count(),1);assert.equal(await noJsPage.locator('[data-diagnostic-ac-enquiry]').count(),1);assert.equal(await noJsPage.locator('[data-diagnostic-ac-enquiry] nav a').count()>=2,true);assert.ok(await noJsPage.locator('[data-diagnostic-ac-draft-note]').textContent());assert.ok(!(await noJsPage.locator('meta[name=robots]').getAttribute('content')).includes('noindex'));report.noJavaScript.push({route,passed:true});}catch(error){report.failures.push({route:before.route,at:'no JavaScript',error:error.message});}}
 await noJs.close();
 assert.deepEqual(report.runtimeErrors,[],'No runtime/hydration errors');assert.deepEqual(report.failedLocalResponses,[],'No failed local assets');
 report.passed=report.layouts.length===48&&report.interactions.length===16&&report.noJavaScript.length===16&&report.spaLinks.length===16&&report.failures.length===0;
}catch(error){report.failures.push({at:'orchestration',error:error.message,stack:error.stack});}
finally{await browser?.close();server.kill();if(!exited)await new Promise(resolve=>server.once('exit',resolve));}
await fs.writeFile(path.join(out,'browser-results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:report.passed,layouts:report.layouts.length,interactions:report.interactions.length,noJavaScript:report.noJavaScript.length,spaLinks:report.spaLinks.length,runtimeErrors:report.runtimeErrors,failedLocalResponses:report.failedLocalResponses,failures:report.failures.map(({stack,...r})=>r)},null,2));
if(!report.passed)process.exitCode=1;
