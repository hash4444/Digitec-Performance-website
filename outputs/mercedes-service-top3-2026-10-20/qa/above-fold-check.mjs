import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {spawn} from 'node:child_process';
const root=process.cwd();
assert.ok(root.endsWith('mercedes-service-top3-2026-10-20'+path.sep+'candidate.local'));
const out=path.resolve(root,'../qa/above-fold');await fs.mkdir(out,{recursive:true});
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/package.json');
const {chromium}=require('playwright');
const base='http://127.0.0.1:5214';
const server=spawn(process.execPath,['scripts/preview-production-local.mjs','5214'],{cwd:root,windowsHide:true,stdio:'ignore'});
let exited=false;server.once('exit',()=>exited=true);let browser;
const report={createdAt:new Date().toISOString(),passed:false,cases:[],externalBlocked:0,writesBlocked:0,contactInteractions:0,runtimeErrors:[],failures:[],safety:'Isolated production dist on loopback5214. GET/HEAD only, every external request blocked, no contact clicks or form actions. Initial scroll0 viewport screenshot and rectangle measurement only.'};
try{
  let ready=false;for(let i=0;i<50;i++){if(exited)throw Error('Local preview exited');try{if((await fetch(base+'/brands/mercedes-benz-service-dubai')).status===200){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,200));}assert.ok(ready,'Preview ready');
  browser=await chromium.launch({channel:'msedge',headless:true});
  for(const locale of ['en','ar'])for(const viewport of [{width:390,height:844},{width:320,height:844},{width:1440,height:900}]){
    const context=await browser.newContext({viewport,reducedMotion:'reduce',deviceScaleFactor:1,isMobile:viewport.width<768,hasTouch:viewport.width<768});
    await context.route('**/*',route=>{const request=route.request(),url=new URL(request.url());if(url.origin!==base){report.externalBlocked++;return route.abort();}if(!['GET','HEAD'].includes(request.method())){report.writesBlocked++;return route.abort();}return route.continue();});
    await context.addInitScript(()=>{window.open=()=>null;document.addEventListener('click',event=>{const anchor=event.target instanceof Element?event.target.closest('a[href]'):null;if(anchor&&/^(https:\/\/wa\.me\/|tel:)/.test(anchor.href))event.preventDefault();},true);});
    const page=await context.newPage();page.on('pageerror',error=>report.runtimeErrors.push(error.message));
    const route=(locale==='ar'?'/ar':'')+'/brands/mercedes-benz-service-dubai';
    try{
      assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);await page.locator('h1').waitFor();await page.evaluate(()=>window.scrollTo(0,0));
      const measurements=await page.evaluate(()=>{
        const rect=e=>{if(!e)return null;const r=e.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,top:r.top,right:r.right,bottom:r.bottom,left:r.left};};
        const cta=document.querySelector('a[data-cta-placement="hero"][href^="https://wa.me/"]');
        const header=document.querySelector('header');const bar=document.querySelector('aside.fixed');
        const visible=e=>!!e&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().height>0;
        const ctaRect=rect(cta),headerRect=visible(header)?rect(header):null,barRect=visible(bar)?rect(bar):null;
        const viewportVisible=!!ctaRect&&ctaRect.left>=0&&ctaRect.top>=0&&ctaRect.right<=innerWidth&&ctaRect.bottom<=innerHeight;
        const belowHeader=!!ctaRect&&(!headerRect||ctaRect.top>=headerRect.bottom);
        const aboveFixedBar=!!ctaRect&&(!barRect||ctaRect.bottom<=barRect.top);
        const points=ctaRect?[0.25,0.5,0.75].map(fraction=>[ctaRect.left+ctaRect.width*fraction,ctaRect.top+ctaRect.height/2]):[];
        const unobscured=viewportVisible&&points.every(([x,y])=>{const top=document.elementFromPoint(x,y);return top===cta||!!cta?.contains(top);});
        return{scrollX,scrollY,viewport:{width:innerWidth,height:innerHeight},label:cta?.textContent?.trim(),cta:ctaRect,header:headerRect,fixedMobileBar:barRect,viewportVisible,belowHeader,aboveFixedBar,unobscured,fullyVisible:viewportVisible&&belowHeader&&aboveFixedBar&&unobscured};
      });
      const screenshot=path.join(out,`${locale}-${viewport.width}x${viewport.height}-initial.png`);await page.screenshot({path:screenshot,animations:'disabled',fullPage:false});
      report.cases.push({locale,route,...measurements,screenshot});
    }catch(error){report.failures.push({locale,viewport,error:error.message});}finally{await context.close();}
  }
  report.passed=report.cases.length===6&&report.cases.every(c=>c.fullyVisible)&&report.failures.length===0&&report.runtimeErrors.length===0&&report.writesBlocked===0;
}catch(error){report.failures.push({stage:'orchestration',error:error.message});}finally{await browser?.close();server.kill();if(!exited)await new Promise(resolve=>server.once('exit',resolve));}
await fs.writeFile(path.join(out,'above-fold-results.json'),JSON.stringify(report,null,2));
console.log(JSON.stringify({passed:report.passed,cases:report.cases.map(c=>({locale:c.locale,viewport:c.viewport,ctaTop:c.cta?.top,ctaBottom:c.cta?.bottom,fixedBarTop:c.fixedMobileBar?.top??null,fullyVisible:c.fullyVisible})),failures:report.failures,runtimeErrors:report.runtimeErrors,writesBlocked:report.writesBlocked,contactInteractions:report.contactInteractions},null,2));
if(!report.passed)process.exitCode=1;
