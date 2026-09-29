import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
const {chromium}=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json')('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
const results=[];
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:5190')&&['GET','HEAD'].includes(r.request().method())?r.continue():r.abort());
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for(const route of ['/mercedes/models/g-class-service-repair-dubai','/mercedes/problems/wont-start']) {
   assert.equal((await page.goto('http://127.0.0.1:5190'+route,{waitUntil:'networkidle'})).status(),200);
   const text=await page.locator('body').innerText();
   assert.ok(!text.includes('AMG owner'));assert.ok(!text.includes('diagnostic intent'));
   assert.equal(await page.locator('h1').count(),1);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
   await page.screenshot({path:`outputs/b1/browser/${route.replaceAll('/','_')}-${width}.png`});
   results.push({route,width,passed:true});
  }
  assert.deepEqual(errors,[]);await context.close();
 }
}finally{await browser.close();}
await fs.writeFile('outputs/b1/browser/final-copy-verification.json',JSON.stringify({passed:true,results},null,2));
console.log('Final copy smoke checks passed at both widths.');
