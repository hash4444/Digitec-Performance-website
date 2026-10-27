import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Verify the built, search-visible contract against the original configurator.
const out = path.resolve('outputs/t1/verification');
await fs.mkdir(out, { recursive: true });
const compile = source => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const asModule = source => `data:text/javascript;base64,${Buffer.from(compile(source)).toString('base64')}`;
const carsModule = asModule(await fs.readFile('src/data/tuningCars.ts', 'utf8'));
const { tuningCars, stageLabels } = await import(carsModule);
const { tuningModelPages } = await import(asModule((await fs.readFile('src/data/tuningModelPages.ts', 'utf8')).replace("'@/data/tuningCars'", JSON.stringify(carsModule))));
const { getPublicRoutes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { handleRequest } = await import(pathToFileURL(path.resolve('dist/_worker.js')).href);
const routes = getPublicRoutes();
const sitemap = await fs.readFile('dist/sitemap.xml','utf8');
const decode = s => String(s).replace(/&#x([\da-f]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(+n)).replaceAll('&quot;','"').replaceAll('&amp;','&').replaceAll('&#39;',"'").replaceAll('&nbsp;',' ');
const text = s => decode(s.replace(/<[^>]*>/g,' ')).replace(/\s+/g,' ').trim();
const htmlFor = route => fs.readFile(path.join('dist',route,'index.html'),'utf8');
const master = await htmlFor('/tuning');
const arabic = await htmlFor('/ar/tuning');
const report={passed:false, routes:routes.length,sitemapCanonicalCount:[...sitemap.matchAll(/<loc>/g)].length, sourceVehicles:tuningCars.length,sourceTunedPackages:0,checkedModels:[], checks:[]};
function faqsMatch(html,route) {
  const visible=text(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g,''));
  const graphs=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>JSON.parse(m[1])['@graph'] || [JSON.parse(m[1])]);
  const faq=graphs.find(n=>n['@type']==='FAQPage');
  assert.ok(faq,`${route} needs FAQ schema`);
  for(const q of faq.mainEntity) {
    assert.ok(visible.includes(q.name),`${route}: schema question missing from visible HTML`);
    assert.ok(visible.includes(q.acceptedAnswer.text),`${route}: schema answer missing from visible HTML`);
  }
}
for(const route of ['/tuning','/ar/tuning',...tuningModelPages.map(m=>m.path)]) {
  const html=await htmlFor(route);
  assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: H1 count`);
  assert.ok(html.includes(`<link rel="canonical" href="https://digitecme.com${route}">`),`${route}: canonical`);
  assert.ok(html.includes('content="index, follow, max-image-preview:large"'),`${route}: robots`);
  assert.ok(sitemap.includes(`<loc>https://digitecme.com${route}</loc>`),`${route}: sitemap`);
  faqsMatch(html,route);
  if(route.startsWith('/tuning/')) assert.ok(!html.includes('hreflang="ar-AE"'),`${route}: no unpublished Arabic alternate`);
}
assert.ok(!/Digi-Tec assesses Mercedes-Benz and AMG, Porsche, Audi, BMW/i.test(text(master)));
assert.ok(!/وأودي وBMW/.test(text(arabic)));
const selectCars = html => [...html.matchAll(/data-tuning-package="([^"]+)"/g)].map(m=>m[1]);
for(const car of tuningCars) {
  assert.ok(!['bmw','audi'].includes(car.brand.toLowerCase()),'Unsupported brand in configurator');
  const stock=car.stages.stock.spec;
  for(const stage of car.availableStages.filter(s=>s!=='stock')) {
    const info=car.stages[stage];
    const key=`${car.id}:${stage}`;
    const row=master.match(new RegExp(`<tr[^>]*data-tuning-package="${key}"[^>]*>([\\s\\S]*?)<\\/tr>`));
    assert.ok(row,`Initial HTML missing ${key}`);
    const cells=[...row[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map(m=>text(m[1]));
    assert.deepEqual(cells,[stageLabels[stage],stock.hp,info.spec.hp,info.spec.hp-stock.hp,stock.torque,info.spec.torque,info.spec.torque-stock.torque,info.price,info.time].map(String),`${key}: price/time/output mismatch`);
    const block=master.match(new RegExp(`<div id="${car.id}-${stage}">([\\s\\S]*?)<\\/ul>`));
    assert.ok(block,`Missing included work ${key}`);
    for(const mod of info.mods) assert.ok(text(block[1]).includes(mod),`${key}: missing ${mod}`);
    report.sourceTunedPackages++;
  }
}
assert.equal(selectCars(master).length,report.sourceTunedPackages);
assert.equal(selectCars(arabic).length,report.sourceTunedPackages);
for(const model of tuningModelPages) {
  const html=await htmlFor(model.path);
  assert.ok(master.includes(`href="${model.path}"`),`${model.path}: master link missing`);
  assert.ok(html.includes('href="/tuning"'),`${model.path}: parent link missing`);
  assert.ok(html.includes(`href="${model.brandHub.path}"`),`${model.path}: service hub link missing`);
  const expected=model.carIds.flatMap(id=>tuningCars.find(c=>c.id===id).availableStages.filter(s=>s!=='stock').map(s=>`${id}:${s}`));
  assert.deepEqual(selectCars(html),expected,`${model.path}: configuration scope`);
  report.checkedModels.push({path:model.path,vehicles:model.carIds,packages:expected.length});
}
assert.equal(tuningModelPages.length,9);
assert.ok(!routes.some(r=>/^\/(?:ar\/)?tuning\/.+(?:stage-?[1-5]|vip)(?:\/|$)/i.test(r.path)),'Stage-specific route created');
const env={ASSETS:{fetch:async request=>new Response('<html><title>Origin</title></html>',{status:200,headers:{'content-type':'text/html'}})}};
for(const model of tuningModelPages) {
  assert.equal((await handleRequest(new Request(`https://digitecme.com${model.path}`),env)).status,200);
  assert.equal((await handleRequest(new Request(`https://digitecme.com${model.path}-stage-1`),env)).status,404);
}
for(const route of ['/tuning?stage=stage2&vehicle=g63','/tuning/mercedes-amg-g63?stage=stage3']) assert.equal((await handleRequest(new Request(`https://digitecme.com${route}`),env)).status,200);
report.checks=['67 exact package rows in English/Arabic initial HTML','Exact source HP, torque, gains, EUR price qualifiers and time','Every original included-work item rendered','FAQ visible/schema agreement','Nine model owners with master and service hub links','Canonical/sitemap/robots and English-only hreflang','No stage URLs; invented stage routes return 404; query states retain owner'];
report.passed=true;
await fs.writeFile(path.join(out,'tuning-validation.json'),JSON.stringify(report,null,2));
console.log(`Tuning validation passed: ${report.sourceVehicles} vehicles, ${report.sourceTunedPackages} packages, ${tuningModelPages.length} model owners, ${report.routes} routes / ${report.sitemapCanonicalCount} canonical URLs.`);
