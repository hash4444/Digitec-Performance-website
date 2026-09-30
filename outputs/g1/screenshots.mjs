import {createRequire} from 'node:module';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const browser=await chromium.launch({channel:'msedge',headless:true});
for(const [slug,width] of [['car-diagnostics-dubai',1440],['auto-electrical-repair-dubai',390]]){
const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
await page.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:5197')?r.continue():r.abort());
await page.goto('http://127.0.0.1:5197/services/'+slug,{waitUntil:'networkidle'});
await page.screenshot({path:'outputs/g1/'+slug+'-'+width+'.png',fullPage:true});await page.close();
}
await browser.close();
