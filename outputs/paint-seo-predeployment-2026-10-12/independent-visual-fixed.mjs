import { createRequire } from 'node:module';
import { mkdir,writeFile,readFile } from 'node:fs/promises';
import path from 'node:path';
const require=createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const sharp=require('sharp');
const base='http://127.0.0.1:5292',sourceSha256='c5f55b95b6830a7371cd48d2782860a8884a213c5c838d97eff1618a74fa329d';
const output=path.resolve('outputs/paint-seo-predeployment-2026-10-12/independent-visual-fixed');
await mkdir(output,{recursive:true});
const routes=['/services/paint-protection-dubai','/ar/services/paint-protection-dubai','/services/paint-protection-film','/ar/services/paint-protection-film','/services/ceramic-coating','/ar/services/ceramic-coating'];
const checks=[],cases=[],screenshots=[],errors=[],unexpectedConsole=[],blocked=new Set(),failedAssets=[];
const check=(pass,name,details)=>{checks.push({pass,name,details});if(!pass)console.log('FAIL '+name+' '+JSON.stringify(details));};
const channel=color=>Number(color.match(/[\d.]+/)[0]);
const browser=await chromium.launch({headless:true,channel:'msedge'});
async function settle(page,theme){await page.waitForFunction(()=>sessionStorage.getItem('digitec_first_touch'));await page.waitForFunction(wanted=>document.documentElement.classList.contains('theme-light')===(wanted==='light'),theme);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(100);}
async function screenshot(page,id,stage){const file=path.join(output,id+'-'+stage+'.png');await page.screenshot({path:file});screenshots.push({id,stage,file});}
try{
  for(const route of routes)for(const width of route.startsWith('/ar/')&&!route.includes('paint-protection-dubai')?[320,390,768,1440]:[390,1440])for(const theme of [320,768].includes(width)?['light']:['dark','light']){
    console.log(`Fixed-build QA: ${route} ${width} ${theme}`);
    const context=await browser.newContext({viewport:{width,height:950},reducedMotion:'reduce'});
    await context.route('**/*',req=>{const url=new URL(req.request().url());if(url.origin===base||['data:','blob:'].includes(url.protocol))return req.continue();blocked.add(url.origin+url.pathname);return req.abort('blockedbyclient');});
    const page=await context.newPage();page.on('pageerror',e=>errors.push({route,width,theme,message:e.message}));page.on('console',m=>{if(['error','warning'].includes(m.type())&&!m.text().includes('ERR_BLOCKED_BY_CLIENT'))unexpectedConsole.push({route,width,theme,type:m.type(),message:m.text()});});page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failedAssets.push({url:r.url(),status:r.status()});});
    await page.addInitScript(wanted=>{if(!sessionStorage.getItem('__independentFixedSeed')){localStorage.setItem('digitec-color-theme',wanted);sessionStorage.setItem('__independentFixedSeed','1');}},theme);
    await page.goto(base+route,{waitUntil:'networkidle'});await settle(page,theme);
    const id=(route.startsWith('/ar')?'ar':'en')+'-'+route.split('/').at(-1)+'-'+width+'-'+theme;
    const restored=await page.evaluate(()=>({saved:localStorage.getItem('digitec-color-theme'),colorScheme:document.documentElement.style.colorScheme,light:document.documentElement.classList.contains('theme-light'),dir:document.documentElement.dir,lang:document.documentElement.lang,overflow:document.documentElement.scrollWidth-innerWidth}));
    check(restored.saved===theme&&restored.colorScheme===theme&&restored.light===(theme==='light'),id+' saved theme restores after actual hydration',restored);
    check(restored.dir===(route.startsWith('/ar')?'rtl':'ltr')&&restored.lang===(route.startsWith('/ar')?'ar':'en'),id+' locale correct',restored);
    check(restored.overflow<=1,id+' no horizontal overflow',restored.overflow);
    const toggle=page.locator('header button').filter({has:page.locator('svg.lucide-sun,svg.lucide-moon')});
    const expected=route.startsWith('/ar')?(theme==='dark'?'تفعيل المظهر الفاتح':'تفعيل المظهر الداكن'):(theme==='dark'?'Use light theme':'Use dark theme');
    check(await toggle.getAttribute('aria-label')===expected,id+' initial theme icon and accessible label agree',await toggle.getAttribute('aria-label'));
    const scoped=route.startsWith('/ar/')&&!route.includes('paint-protection-dubai');
    if(scoped){
      const hero=await page.locator('main > section').first().evaluate(el=>{const secondary=el.querySelector('.btn-secondary'),bc=el.querySelector('nav');return{callColor:getComputedStyle(secondary).color,callBorder:getComputedStyle(secondary).borderColor,callBackground:getComputedStyle(secondary).backgroundColor,breadcrumbColor:getComputedStyle(bc).color,headerBottom:document.querySelector('header').getBoundingClientRect().bottom,breadcrumbTop:bc.getBoundingClientRect().top};});
      check(channel(hero.callColor)>=200,id+' hero Call label remains light on dark photo',hero);
      check(channel(hero.callBorder)>=200,id+' hero Call border remains light on dark photo',hero.callBorder);
      check(channel(hero.breadcrumbColor)>=200,id+' breadcrumb remains light on dark photo',hero.breadcrumbColor);
      check(hero.breadcrumbTop>=hero.headerBottom-1,id+' fixed header clears breadcrumb',hero);
      if(theme==='light')await screenshot(page,id,'hero');
      await page.locator('main > section:last-child').evaluate(el=>window.scrollTo({top:window.scrollY+el.getBoundingClientRect().top-110,behavior:'instant'}));await page.waitForTimeout(100);
      const final=await page.locator('main > section:last-child .home-button-secondary').evaluate(el=>({color:getComputedStyle(el).color,border:getComputedStyle(el).borderColor,href:el.getAttribute('href'),text:el.textContent?.trim(),sectionBackground:getComputedStyle(el.closest('section')).backgroundColor}));
      check((theme==='light'?channel(final.color)<80:channel(final.color)>200),id+' final Call label contrasts with section theme',final);
      check(final.href==='tel:+97143402223',id+' final phone href preserved',final.href);
      if(theme==='light')await screenshot(page,id,'final-cta');
    }
    const other=theme==='dark'?'light':'dark';await toggle.click();await page.waitForFunction(wanted=>localStorage.getItem('digitec-color-theme')===wanted,other);await page.reload({waitUntil:'networkidle'});await settle(page,other);
    const after=await page.evaluate(()=>({saved:localStorage.getItem('digitec-color-theme'),light:document.documentElement.classList.contains('theme-light'),colorScheme:document.documentElement.style.colorScheme}));
    check(after.saved===other&&after.colorScheme===other&&after.light===(other==='light'),id+' UI toggle survives reload',after);
    cases.push({route,width,theme,restored,after});await context.close();
  }
  // Repeat locale SPA navigation on the repaired build with fresh saved-light tabs.
  for(const route of routes.filter(route=>!route.startsWith('/ar'))){const context=await browser.newContext({viewport:{width:390,height:950}});await context.route('**/*',r=>new URL(r.request().url()).origin===base?r.continue():r.abort());const page=await context.newPage();page.on('pageerror',e=>errors.push({route,message:e.message}));await page.addInitScript(()=>localStorage.setItem('digitec-color-theme','light'));await page.goto(base+route,{waitUntil:'networkidle'});await settle(page,'light');await page.evaluate(()=>window.__independentFixedSpa=1);await page.locator('header button').filter({hasText:/^EN$/}).click();await page.locator('header a').filter({hasText:'العربية'}).click();await page.waitForURL(base+'/ar'+route);await page.waitForFunction(()=>document.documentElement.dir==='rtl');check(await page.evaluate(()=>window.__independentFixedSpa===1&&document.documentElement.classList.contains('theme-light')),route+' repaired-build SPA locale retains light theme',page.url());await context.close();}
  check(errors.length===0,'No runtime errors on repaired build',errors);check(unexpectedConsole.length===0,'No unexpected console warnings/errors or hydration messages',unexpectedConsole);check(failedAssets.length===0,'No local HTTP asset failures on repaired build',failedAssets);
  const sheets=[];for(const service of ['paint-protection-film','ceramic-coating'])for(const stage of ['hero','final-cta']){const selected=screenshots.filter(s=>s.id.startsWith('ar-'+service+'-')&&s.stage===stage);let x=0;const composites=[];for(const s of selected){const meta=await sharp(s.file).metadata();const w=Math.round(meta.width*600/meta.height);composites.push({input:await sharp(s.file).resize(w,600).toBuffer(),left:x,top:34});x+=w+12;}const file=path.join(output,'ar-'+service+'-light-'+stage+'-sheet.png');const label=Buffer.from(`<svg width="${x}" height="34"><rect width="100%" height="100%" fill="#333"/><text x="8" y="24" font-family="Arial" font-size="16" fill="white">Fixed build: Arabic ${service} light ${stage} | 320 / 390 / 768 / 1440</text></svg>`);await sharp({create:{width:x,height:634,channels:3,background:'#777'}}).composite([{input:label,left:0,top:0},...composites]).png().toFile(file);sheets.push(file);}
  const report={sourceSha256,base,executedAt:new Date().toISOString(),passed:checks.every(c=>c.pass),caseCount:cases.length,totalChecks:checks.length,cases,checks,errors,unexpectedConsole,failedAssets,blockedExternalRequests:[...blocked],screenshots,contactSheets:sheets};await writeFile(path.join(output,'fixed-build-results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify({passed:report.passed,cases:cases.length,totalChecks:checks.length,failed:checks.filter(c=>!c.pass),errors,unexpectedConsole,contactSheets:sheets},null,2));
}finally{await browser.close();}
