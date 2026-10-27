import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const require = createRequire('C:/Users/ADMIN/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const { chromium } = require('playwright');
const sharp = require('sharp');
const base = 'http://127.0.0.1:5292';
const output = path.resolve('outputs/paint-seo-predeployment-2026-10-12/independent-visual');
await mkdir(output, { recursive: true });
const routes = ['/services/paint-protection-dubai','/ar/services/paint-protection-dubai','/services/paint-protection-film','/ar/services/paint-protection-film','/services/ceramic-coating','/ar/services/ceramic-coating'];
const results = [], screenshots = [], errors = [], consoleMessages = [], localFailedRequests = [], blockedExternalRequests = new Set(), checks = [], imageFailures = [], httpFailures = [];
const browser = await chromium.launch({ headless: true, channel: 'msedge' });
const check = (pass, name, details) => { const item = { pass, name, details }; checks.push(item); if (!pass) console.log('FAIL '+name+' '+JSON.stringify(details)); return pass; };
async function isolatedContext(options = {}) {
  const context = await browser.newContext({ reducedMotion: 'reduce', ...options });
  await context.route('**/*', route => {
    let url;
    try { url = new URL(route.request().url()); } catch { return route.continue(); }
    if (url.origin === base || ['data:','blob:','about:'].includes(url.protocol)) return route.continue();
    blockedExternalRequests.add(url.origin + url.pathname);
    return route.abort('blockedbyclient');
  });
  context.on('page', page => {
    page.on('pageerror', error => errors.push({ url: page.url(), message: error.message }));
    page.on('console', msg => { if (['warning','error'].includes(msg.type())) consoleMessages.push({ url:page.url(),type:msg.type(),message:msg.text() }); });
    page.on('requestfailed', req => { if (req.url().startsWith(base)) localFailedRequests.push({ url:req.url(),failure:req.failure() }); });
    page.on('response', resp => { if (resp.url().startsWith(base) && resp.status() >= 400) httpFailures.push({ url:resp.url(),status:resp.status() }); });
  });
  return context;
}
async function settle(page, theme) {
  await page.waitForFunction(() => sessionStorage.getItem('digitec_first_touch'), { timeout: 12000 });
  await page.waitForFunction(wanted => document.documentElement.classList.contains('theme-light') === (wanted === 'light'), theme);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
}
async function shot(page, name, label) {
  const file = path.join(output,name+'.png');
  await page.screenshot({ path:file }); screenshots.push({ file,label }); return file;
}
async function scrollTarget(page, selector) {
  const target = page.locator(selector).first();
  if (!await target.count()) return false;
  await target.evaluate(el => el.scrollIntoView({block:'start',behavior:'instant'}));
  await page.waitForTimeout(100);
  return true;
}
try {
  for (const route of routes) for (const width of [320,390,768,1440]) for (const theme of ['dark','light']) {
    console.log(`Visual QA: ${route} ${width} ${theme}`);
    const context = await isolatedContext({ viewport:{width,height:950} });
    const page = await context.newPage();
    await page.addInitScript(wanted => {if(!sessionStorage.getItem('__independentThemeSeeded')){localStorage.setItem('digitec-color-theme',wanted);sessionStorage.setItem('__independentThemeSeeded','1');}},theme);
    await page.goto(base+route,{waitUntil:'networkidle'});
    await settle(page,theme);
    const id = `${route.startsWith('/ar')?'ar':'en'}-${route.split('/').at(-1)}-${width}-${theme}`;
    const current = { route,width,theme,checks:[],screenshots:[] };
    const geometry = await page.evaluate(() => {
      const rect = el => el ? { x:el.getBoundingClientRect().x,y:el.getBoundingClientRect().y,width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height,bottom:el.getBoundingClientRect().bottom } : null;
      const h = document.querySelector('header');
      const bc = document.querySelector('main nav[aria-label="Breadcrumb"],main nav.ph-breadcrumb,main nav[aria-label="مسار الصفحة"]');
      const secondary=document.querySelector('main > .theme-dark-section .btn-secondary');
      return { overflow:document.documentElement.scrollWidth-innerWidth,header:rect(h),breadcrumb:rect(bc),h1:rect(document.querySelector('h1')),direction:document.documentElement.dir,lang:document.documentElement.lang,className:document.documentElement.className,colorScheme:document.documentElement.style.colorScheme,saved:localStorage.getItem('digitec-color-theme'),bodyBackground:getComputedStyle(document.body).backgroundColor,heroCall:secondary?{color:getComputedStyle(secondary).color,border:getComputedStyle(secondary).borderColor}:null,breadcrumbColor:bc?getComputedStyle(bc).color:null };
    });
    current.geometry = geometry;
    current.checks.push(check(geometry.overflow <= 1, id+' no horizontal page overflow',geometry.overflow));
    current.checks.push(check(geometry.breadcrumb && geometry.breadcrumb.y >= geometry.header.bottom-1,id+' breadcrumb clears fixed header',geometry));
    current.checks.push(check(await page.locator('h1').count()===1,id+' one h1',await page.locator('h1').allTextContents()));
    current.checks.push(check(geometry.direction===(route.startsWith('/ar')?'rtl':'ltr') && geometry.lang===(route.startsWith('/ar')?'ar':'en'),id+' document locale',geometry));
    current.checks.push(check(geometry.saved===theme && geometry.colorScheme===theme,id+' stored theme restored after hydration',geometry));
    if(geometry.heroCall){const channel=Number(geometry.heroCall.color.match(/[\d.]+/)[0]);current.checks.push(check(channel>=180,id+' dark photographic hero Call label remains light',geometry.heroCall));}
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    current.checks.push(check(canonical==='https://digitecme.com'+route,id+' canonical after hydration',canonical));
    current.screenshots.push(await shot(page,id+'-hero',id+' hero'));
    const comparison = route.includes('paint-protection-dubai') ? '#protection-comparison' : route === '/services/paint-protection-film' ? '#ppf-comparison' : route === '/services/ceramic-coating' ? '#ceramic-comparison' : 'main > section:nth-child(2)';
    if (await scrollTarget(page,comparison)) current.screenshots.push(await shot(page,id+'-content',id+' content'));
    const tables = await page.locator('main table').evaluateAll(all => all.map(table => { const wrap=table.parentElement;const old=wrap.scrollLeft;wrap.scrollLeft=-200;const negative=wrap.scrollLeft;wrap.scrollLeft=200;const positive=wrap.scrollLeft;wrap.scrollLeft=old;const s=getComputedStyle(wrap);return {client:wrap.clientWidth,scroll:wrap.scrollWidth,overflowX:s.overflowX,direction:s.direction,scrollable:negative!==0||positive!==0}; }));
    current.tables=tables;
    for (const table of tables) current.checks.push(check(table.scroll<=table.client+1 || (['auto','scroll'].includes(table.overflowX)&&table.scrollable),id+' comparison table scrolls inside container',table));
    const quote = route.includes('paint-protection-dubai')?'#protection-quote':route==='/services/paint-protection-film'?'#ppf-quote':route==='/services/ceramic-coating'?'#ceramic-cost':'main > section:last-child';
    if (await scrollTarget(page,quote)) current.screenshots.push(await shot(page,id+'-quote',id+' quote'));
    const nativeFaqs=page.locator('main details');
    const accordionFaqs=page.locator('main button[aria-controls][data-state="closed"]').filter({has:page.locator('svg')});
    if (await nativeFaqs.count()) {
      const first=nativeFaqs.first();const summary=first.locator('summary');await summary.click();
      current.checks.push(check(await first.getAttribute('open')!==null,id+' native FAQ opens',await nativeFaqs.count()));
      await summary.click();current.checks.push(check(await first.getAttribute('open')===null,id+' native FAQ closes',null));
    } else if(await accordionFaqs.count()) {
      const first=accordionFaqs.first();await first.click();current.checks.push(check(await first.getAttribute('data-state')==='open',id+' accordion FAQ opens',null));await first.click();
    }
    // Sweep the page so lazy logos/project photographs are requested before checking images.
    await page.evaluate(async () => {for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,15));}scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});});
    await page.waitForTimeout(250);
    const broken = await page.locator('img').evaluateAll(imgs => imgs.filter(img=>!img.complete||img.naturalWidth===0).map(img=>({src:img.currentSrc||img.src,alt:img.alt,loading:img.loading})));
    current.images = {count:await page.locator('img').count(),broken};if(broken.length)imageFailures.push({id,broken});
    current.checks.push(check(broken.length===0,id+' all rendered image assets load',broken));
    const bottom = await page.evaluate(() => {
      const sticky=[...document.querySelectorAll('nav')].find(el=>getComputedStyle(el).position==='fixed'&&el.getBoundingClientRect().top>innerHeight/2&&getComputedStyle(el).display!=='none');
      const footer=document.querySelector('footer'); const links=footer?[...footer.querySelectorAll('a')].filter(el=>el.getBoundingClientRect().width>0):[];
      const last=links.at(-1)||footer;
      return {sticky:sticky?{top:sticky.getBoundingClientRect().top,height:sticky.getBoundingClientRect().height}:null,lastContent:last?{text:last.textContent?.trim(),bottom:last.getBoundingClientRect().bottom}:null,footerBottom:footer?.getBoundingClientRect().bottom,scrollY,maxScroll:document.documentElement.scrollHeight-innerHeight};
    });
    current.bottom=bottom;
    current.checks.push(check(!bottom.sticky||!bottom.lastContent||bottom.lastContent.bottom<=bottom.sticky.top+1,id+' last footer content clears sticky CTA at maximum scroll',bottom));
    if(width===390||width===1440) current.screenshots.push(await shot(page,id+'-bottom',id+' bottom'));
    // Toggle and reload each fresh tab, checking persisted preference and icon accessibility label.
    const toggle=page.locator('header button[aria-label]').filter({has:page.locator('svg.lucide-sun, svg.lucide-moon')});
    const other=theme==='dark'?'light':'dark';
    await toggle.click();await page.waitForFunction(wanted=>localStorage.getItem('digitec-color-theme')===wanted,other);
    await page.reload({waitUntil:'networkidle'});await settle(page,other);
    current.checks.push(check(await page.evaluate(wanted=>document.documentElement.classList.contains('theme-light')===(wanted==='light'),other),id+' UI toggle survives reload',other));
    const themeLabel=await page.locator('header button[aria-label]').filter({has:page.locator('svg.lucide-sun, svg.lucide-moon')}).getAttribute('aria-label');
    current.checks.push(check(themeLabel=== (route.startsWith('/ar')?(other==='dark'?'تفعيل المظهر الفاتح':'تفعيل المظهر الداكن'):(other==='dark'?'Use light theme':'Use dark theme')),id+' theme icon/accessibility label agrees',themeLabel));
    results.push(current);await writeFile(path.join(output,'independent-visual-results.partial.json'),JSON.stringify({base,executedAt:new Date().toISOString(),cases:results,totalChecks:checks.length,checks,errors,consoleMessages,localFailedRequests,httpFailures,imageFailures,blockedExternalRequests:[...blockedExternalRequests],screenshots},null,2));await context.close();
  }
  // Localized routes must transition in the same app while preserving the header preference.
  for(const route of routes.filter(route=>!route.startsWith('/ar'))) {
    const context=await isolatedContext({viewport:{width:390,height:950}});const page=await context.newPage();
    await page.addInitScript(()=>localStorage.setItem('digitec-color-theme','light'));await page.goto(base+route,{waitUntil:'networkidle'});await settle(page,'light');
    await page.evaluate(()=>window.__independentQaNavMarker='same-document');
    const lang=page.locator('header button').filter({hasText:/^EN$/}).first();
    await lang.click();await page.locator('header a').filter({hasText:'العربية'}).click();
    await page.waitForURL(base+'/ar'+route);await page.waitForFunction(()=>document.documentElement.dir==='rtl');
    check(await page.evaluate(()=>window.__independentQaNavMarker==='same-document'&&document.documentElement.classList.contains('theme-light')),route+' SPA English to Arabic retains theme',page.url());
    const headerTheme=await page.locator('header button[aria-label="تفعيل المظهر الداكن"]').count();check(headerTheme===1,route+' localized light-header remains usable',headerTheme);
    await page.locator('header button').filter({hasText:/^AR$/}).click();await page.locator('header a').filter({hasText:'English'}).click();await page.waitForURL(base+route);await page.waitForFunction(()=>document.documentElement.dir==='ltr');
    check(await page.evaluate(()=>window.__independentQaNavMarker==='same-document'&&document.documentElement.classList.contains('theme-light')),route+' SPA Arabic to English retains theme',page.url());
    await context.close();
  }
  const noJs=await isolatedContext({viewport:{width:390,height:950},javaScriptEnabled:false});
  const page=await noJs.newPage();
  for(const route of routes) {
    await page.goto(base+route,{waitUntil:'networkidle'});
    check(await page.locator('h1').count()===1,route+' no-JS prerender has service h1',await page.locator('h1').allTextContents());
    const native=page.locator('main details');
    if(await native.count()){await native.first().locator('summary').click();check(await native.first().getAttribute('open')!==null,route+' no-JS native FAQ opens',await native.count());}
    const regions=page.locator('main [role="region"][data-state="closed"]');
    if(await regions.count()){const visible=await regions.evaluateAll(els=>els.filter(el=>getComputedStyle(el).display!=='none').length);check(visible===await regions.count(),route+' no-JS accordion answers readable',visible);}
  }
  await noJs.close();
  const hydration = consoleMessages.filter(item=>/hydrat|server html|did not match|minified react error|react error/i.test(item.message));
  check(errors.length===0,'No page runtime errors across matrix',errors);
  check(hydration.length===0,'No hydration mismatches/warnings across saved theme and reload matrix',hydration);
  check(httpFailures.length===0,'No local HTTP asset failures',httpFailures);
  check(localFailedRequests.length===0,'No local failed requests',localFailedRequests);
  // Make contact sheets so every screenshot can be read in a compact visual pass.
  const sheets=[];
  for(const route of routes)for(const theme of ['dark','light'])for(const stage of ['hero','content','quote']) {
    const selected=screenshots.filter(item=>item.label.startsWith(`${route.startsWith('/ar')?'ar':'en'}-${route.split('/').at(-1)}-`)&&item.label.includes('-'+theme+' '+stage));
    const thumbs=[];let x=0;
    for(const item of selected){const meta=await sharp(item.file).metadata();const w=Math.round(meta.width*600/meta.height);const thumb=await sharp(item.file).resize(w,600).toBuffer();thumbs.push({input:thumb,left:x,top:34});x+=w+12;}
    const heading=`${route} ${theme} ${stage} | 320 / 390 / 768 / 1440 pixels`;
    const label=Buffer.from(`<svg width="${x}" height="34"><rect width="100%" height="100%" fill="#333"/><text x="8" y="24" font-family="Arial" font-size="16" fill="white">${heading}</text></svg>`);
    const file=path.join(output,`${route.startsWith('/ar')?'ar':'en'}-${route.split('/').at(-1)}-${theme}-${stage}-sheet.png`);
    await sharp({create:{width:x,height:634,channels:3,background:'#777'}}).composite([{input:label,left:0,top:0},...thumbs]).png().toFile(file);sheets.push(file);
  }
  const report={base,executedAt:new Date().toISOString(),passed:checks.every(item=>item.pass),cases:results,totalChecks:checks.length,checks,errors,consoleMessages,localFailedRequests,httpFailures,imageFailures,blockedExternalRequests:[...blockedExternalRequests],screenshots,contactSheets:sheets};
  await writeFile(path.join(output,'independent-visual-results.json'),JSON.stringify(report,null,2));
  console.log(JSON.stringify({passed:report.passed,cases:results.length,totalChecks:checks.length,failed:checks.filter(c=>!c.pass),errors,consoleMessages,contactSheets:sheets},null,2));
} finally {await browser.close();}
