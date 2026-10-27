import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';
const out=path.resolve(process.argv[2]),root=process.cwd();
assert.ok(root.includes('ecu-electronics-2026-10-19')&&root.endsWith('candidate.local'),'Isolated ECU candidate required');
await fs.mkdir(out,{recursive:true});
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const before=JSON.parse(await fs.readFile(path.join(out,'../../audit/selected-owner-baseline.json'),'utf8'));
const base='http://127.0.0.1:5211';
const server=spawn(process.execPath,['scripts/preview-production-local.mjs','5211'],{cwd:root,windowsHide:true,stdio:'ignore'});
let serverExited=false;server.once('exit',()=>{serverExited=true;});
const report={checkedAt:new Date().toISOString(),passed:false,layouts:[],interactions:[],noJavaScript:[],spaLinks:[],screenshots:[],failures:[],runtimeErrors:[],failedLocalResponses:[],blockedExternalRequests:0,blockedWriteRequests:0,safety:'Only loopback GET/HEAD. WhatsApp/tel navigation prevented, window.open stubbed; no sent message, phone call, customer enquiry, appointment or backend write.'};
let browser;
const selectedScreenshots=new Set(['/services/car-diagnostics-dubai','/ar/services/mercedes-diagnostics-dubai','/ar/brands/bmw-service-dubai/electrical-repair','/services/head-unit-repair-dubai','/services/cadillac-cue-screen-repair-dubai']);
async function protect(context){
 await context.route('**/*',route=>{const r=route.request(),u=new URL(r.url());if(u.origin!==base){report.blockedExternalRequests++;return route.abort();}if(!['GET','HEAD'].includes(r.method())){report.blockedWriteRequests++;return route.abort();}return route.continue();});
 await context.addInitScript(()=>{
  window.__ecuContacts=[];window.__ecuAnalytics=[];
  document.addEventListener('click',event=>{const a=event.target instanceof Element?event.target.closest('a[href]'):null;if(a&&/^(?:https:\/\/wa\.me\/|tel:)/.test(a.href)){event.preventDefault();window.__ecuContacts.push(a.href);}},true);
  window.open=url=>{window.__ecuContacts.push(String(url));return null;};
 });
}
try{
 let ready=false;
 for(let i=0;i<50;i++){if(serverExited)throw Error('Preview exited');try{if((await fetch(base+'/services/car-diagnostics-dubai',{signal:AbortSignal.timeout(1000)})).status===200){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}
 assert.ok(ready,'Preview ready');
 browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext();await protect(context);const page=await context.newPage();
 page.on('pageerror',e=>report.runtimeErrors.push(String(e)));
 page.on('console',m=>{if(/hydrat|did not match|Minified React error|error while hydrating/i.test(m.text()))report.runtimeErrors.push(m.text());});
 page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)report.failedLocalResponses.push({url:r.url(),status:r.status()});});
 for(const record of before.records)for(const width of[1440,390,320]){try{
  const route=record.route,arabic=route.startsWith('/ar/'),mode=/head-unit|cadillac-cue/.test(route)?'infotainment':/diagnostics/.test(route)?'software':'electrical';
  await page.setViewportSize({width,height:1000});assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
  const panel=page.locator(`[data-ecu-electronics-enquiry="${mode}"]`);await panel.waitFor({state:'attached'});assert.equal(await panel.count(),1);
  assert.equal(await page.title(),record.title);assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://digitecme.com'+route);
  assert.ok(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth<=1),'No horizontal overflow');
  assert.equal(await panel.locator('[data-ecu-function-question]').count(),3);assert.equal(await panel.locator('h3').count(),4);
  for(const q of await panel.locator('[data-ecu-function-question]').all()){assert.ok(await q.isVisible(),'Answers remain visible without disclosure interaction');assert.ok((await q.innerText()).length>40);}
  const quote=panel.locator('a[data-cta-placement="ecu_electronics_quote"][href^="https://wa.me/"]'),phone=panel.locator('a[href="tel:+97143402223"]');assert.equal(await quote.count(),1);assert.equal(await phone.count(),1);
  const draft=new URL(await quote.getAttribute('href')),msg=draft.searchParams.get('text');assert.equal(draft.origin+draft.pathname,'https://wa.me/97143402223');assert.ok(msg.length>300);
  assert.match(msg,arabic?/الموعد المفضل/:/Preferred appointment time/);assert.match(msg,arabic?/استُبدلت.*وحدة/:/control module recently replaced/);assert.match(msg,arabic?/تقرير/:/diagnostic report/);
  assert.match(await panel.innerText(),arabic?/لا يؤكد/:/does not confirm receipt or an appointment/);
  for(const a of[quote,phone]){await a.scrollIntoViewIfNeeded();assert.ok(await a.isVisible());const box=await a.boundingBox();assert.ok(box.height>=44&&box.width>=44,'Mobile contact touch target');}
  const nav=await panel.locator('nav a').evaluateAll(as=>as.map(a=>a.getAttribute('href')));assert.ok(nav.length>=1);if(arabic){assert.ok(nav.every(h=>h.startsWith('/ar/')),'No invented English-only Arabic destination');assert.equal(await page.locator('html').getAttribute('dir'),'rtl');assert.equal(await phone.locator('bdi').getAttribute('dir'),'ltr');assert.equal(await phone.locator('bdi').evaluate(e=>getComputedStyle(e).direction),'ltr');}
  if(width===390){
   await page.evaluate(()=>{window.__ecuContacts=[];window.__ecuAnalytics=[];window.gtag=(...args)=>window.__ecuAnalytics.push(args);});await quote.click();await phone.click();
   const state=await page.evaluate(()=>({contacts:window.__ecuContacts,events:window.__ecuAnalytics,pathname:location.pathname}));assert.equal(state.contacts.length,2);assert.equal(state.pathname,route);assert.equal(state.events.filter(a=>a[0]==='event'&&a[1]==='whatsapp_chat_opened').length,1);assert.equal(state.events.filter(a=>a[0]==='event'&&a[1]==='telephone_link_clicked').length,1);assert.doesNotMatch(JSON.stringify(state.events),/generate_lead|Make\/model\/year|diagnostic report available|immobilizer secrets|\?text=/i);
   report.interactions.push({route,preventedContacts:2,whatsappIntentEvents:1,phoneIntentEvents:1,confirmedEnquiries:0,sanitizedAnalytics:true,passed:true});
   if(selectedScreenshots.has(route)){await panel.scrollIntoViewIfNeeded();const file=path.join(out,route.slice(1).replaceAll('/','__')+'-390.png');await page.screenshot({path:file,fullPage:false,animations:'disabled'});report.screenshots.push(file);}
   const href=nav[0];await panel.locator('nav a').first().click();await page.waitForURL(base+href);await page.locator('h1').waitFor();assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://digitecme.com'+href);await page.goBack({waitUntil:'networkidle'});await page.locator('[data-ecu-electronics-enquiry]').waitFor({state:'attached'});report.spaLinks.push({from:route,to:href,back:true,passed:true});
  }
  report.layouts.push({route,width,mode,passed:true});
 }catch(error){report.failures.push({route:record.route,width,error:error.message,stack:error.stack});}}
 await context.close();
 const nojs=await browser.newContext({javaScriptEnabled:false});await protect(nojs);const pageNoJs=await nojs.newPage();
 for(const record of before.records){try{assert.equal((await pageNoJs.goto(base+record.route,{waitUntil:'domcontentloaded'})).status(),200);const panel=pageNoJs.locator('[data-ecu-electronics-enquiry]');assert.equal(await panel.count(),1);assert.equal(await panel.locator('[data-ecu-function-question]').count(),3);assert.ok((await panel.innerText()).length>500);assert.equal(await panel.locator('a[data-cta-placement=ecu_electronics_quote][href^="https://wa.me/"]').count(),1);report.noJavaScript.push({route:record.route,passed:true});}catch(error){report.failures.push({route:record.route,noJavaScript:true,error:error.message});}}
 await nojs.close();assert.deepEqual(report.runtimeErrors,[]);assert.deepEqual(report.failedLocalResponses,[]);assert.equal(report.blockedWriteRequests,0);
 report.passed=report.layouts.length===42&&report.interactions.length===14&&report.spaLinks.length===14&&report.noJavaScript.length===14&&report.failures.length===0;
}catch(error){report.failures.push({at:'orchestration',error:error.message,stack:error.stack});}
finally{await browser?.close();server.kill();if(!serverExited)await new Promise(r=>server.once('exit',r));}
await fs.writeFile(path.join(out,'browser-results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:report.passed,layouts:report.layouts.length,interactions:report.interactions.length,noJavaScript:report.noJavaScript.length,spaLinks:report.spaLinks.length,runtimeErrors:report.runtimeErrors,failures:report.failures.map(({stack,...r})=>r)},null,2));
if(!report.passed)process.exitCode=1;
