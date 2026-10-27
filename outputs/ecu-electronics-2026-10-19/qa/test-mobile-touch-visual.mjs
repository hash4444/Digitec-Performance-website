import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
const root=process.cwd(),out=path.resolve(process.argv[2]);
assert.ok(root.endsWith('candidate.local')&&root.includes('ecu-electronics-2026-10-19'));
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5212',server=spawn(process.execPath,['scripts/preview-production-local.mjs','5212'],{cwd:root,windowsHide:true,stdio:'ignore'});
let serverExited=false;server.once('exit',()=>{serverExited=true;});
const routes=['/services/car-diagnostics-dubai','/ar/services/mercedes-diagnostics-dubai','/ar/brands/bmw-service-dubai/electrical-repair','/services/head-unit-repair-dubai','/services/cadillac-cue-screen-repair-dubai'];
const report={checkedAt:new Date().toISOString(),passed:false,cases:[],failures:[],runtimeErrors:[],screenshots:[],safety:'Touch-emulated local GET/HEAD only; all contact taps prevented, external requests/writes blocked. No actual message, call or enquiry.'};let browser;
try{
 let ready=false;for(let i=0;i<50;i++){if(serverExited)throw Error('Preview exited');try{if((await fetch(base+'/services/car-diagnostics-dubai')).status===200){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}assert.ok(ready);
 browser=await chromium.launch({channel:'msedge',headless:true});const context=await browser.newContext({viewport:{width:390,height:1000},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 await context.route('**/*',route=>{const r=route.request();return new URL(r.url()).origin===base&&['GET','HEAD'].includes(r.method())?route.continue():route.abort();});
 await context.addInitScript(()=>{window.__touchContacts=[];document.addEventListener('click',event=>{const a=event.target instanceof Element?event.target.closest('a[href]'):null;if(a&&/^(https:\/\/wa\.me\/|tel:)/.test(a.href)){event.preventDefault();window.__touchContacts.push(a.href);}},true);window.open=()=>null;});
 const page=await context.newPage();page.on('pageerror',e=>report.runtimeErrors.push(e.message));
 await fs.mkdir(path.join(out,'desktop-pointer-snapshots'),{recursive:true});
 for(const route of routes){try{
  assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);assert.equal(await page.evaluate(()=>matchMedia('(pointer:coarse)').matches),true,'Coarse touch pointer');
  const panel=page.locator('[data-ecu-electronics-enquiry]'),quote=panel.locator('a[data-cta-placement=ecu_electronics_quote][href^="https://wa.me/"]'),phone=panel.locator('a[href="tel:+97143402223"]');
  await quote.tap();await phone.tap();assert.equal(await page.evaluate(()=>window.__touchContacts.length),2);assert.equal(new URL(page.url()).pathname,route);assert.ok(await page.evaluate(()=>Math.max(document.documentElement.scrollWidth,document.body.scrollWidth)-innerWidth<=1));
  await phone.scrollIntoViewIfNeeded();await page.evaluate(()=>scrollBy(0,-80));
  const name=route.slice(1).replaceAll('/','__')+'-390.png',file=path.join(out,name);await fs.copyFile(file,path.join(out,'desktop-pointer-snapshots',name));await page.screenshot({path:file,fullPage:false,animations:'disabled'});report.screenshots.push(file);report.cases.push({route,width:390,pointer:'coarse',touchContactsPrevented:2,passed:true});
 }catch(e){report.failures.push({route,error:e.message});}}
 await context.close();report.passed=report.cases.length===5&&report.failures.length===0&&report.runtimeErrors.length===0;
}finally{await browser?.close();server.kill();if(!serverExited)await new Promise(r=>server.once('exit',r));}
await fs.writeFile(path.join(out,'mobile-touch-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,cases:report.cases.length,failures:report.failures,runtimeErrors:report.runtimeErrors}));if(!report.passed)process.exitCode=1;
