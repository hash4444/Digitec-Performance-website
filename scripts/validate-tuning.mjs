import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Verify the built, search-visible contract against the original configurator.
const out = path.resolve(process.env.TUNING_VALIDATION_OUTPUT_DIR || 'outputs/t1/verification');
await fs.mkdir(out, { recursive: true });
const compile = source => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const asModule = source => `data:text/javascript;base64,${Buffer.from(compile(source)).toString('base64')}`;
const carsModule = asModule(await fs.readFile('src/data/tuningCars.ts', 'utf8'));
const { tuningCars, stageLabels } = await import(carsModule);
const publication = await import(asModule(await fs.readFile('src/data/tuningPublication.ts', 'utf8')));
const { hasPublishedTuningPackage, publishedTuningMods, getTuningPublicationNote, getTuningPriceNote } = publication;
const { arabicStageLabels, localizeDuration, localizeTuningMod } = await import(asModule(await fs.readFile('src/i18n/ar-tuning.ts', 'utf8')));
const baselineCars = (await import(asModule(await fs.readFile('outputs/t1/baseline/tuningCars.ts', 'utf8')))).tuningCars;
assert.deepEqual(tuningCars, baselineCars, 'Original configurator data must remain unchanged');
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
const report={passed:false, routes:routes.length,sitemapCanonicalCount:[...sitemap.matchAll(/<loc>/g)].length, sourceVehicles:tuningCars.length,sourceTunedPackages:0,publishedTunedPackages:0,withheldS63Packages:0,withheldDB11Items:0,checkedModels:[], checks:[]};
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
const withheldDB11 = ['Stage 1 GAD transmission reinforcement MCT (~1100 Nm)', 'Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)'];
const expectedMods = (car, stage) => car.stages[stage].mods.filter(mod => !(car.id === 'db11' && ['stage3','stage4','stage5'].includes(stage) && withheldDB11.includes(mod)));
for(const car of tuningCars) {
  assert.ok(!['bmw','audi'].includes(car.brand.toLowerCase()),'Unsupported brand in configurator');
  assert.equal(hasPublishedTuningPackage(car.id),car.id !== 's63',`${car.id}: publication policy`);
  const stock=car.stages.stock.spec;
  if(car.id === 's63') {
    for(const [html,isArabic] of [[master,false],[arabic,true]]) {
      const block=html.match(/<details[^>]*id="s63-packages"[^>]*>([\s\S]*?)<\/details>/);
      assert.ok(block, 'S63 enquiry record must remain visible without JavaScript');
      assert.equal(text(block[1]),`${car.name} · ${car.engine} ${getTuningPublicationNote(car.id,isArabic)}`, 'S63 public detail must contain only its identity and verification notice');
      assert.ok(!selectCars(html).some(key=>key.startsWith('s63:')), 'Unverified S63 packages must be withheld');
      assert.ok(!html.includes('id="s63-stage') && !html.includes('id="s63-vip"'),'S63 included-work numbers must be withheld');
    }
  }
  for(const stage of car.availableStages.filter(s=>s!=='stock')) {
    const info=car.stages[stage];
    report.sourceTunedPackages++;
    if(car.id === 's63') { report.withheldS63Packages++; continue; }
    const key=`${car.id}:${stage}`;
    assert.deepEqual(publishedTuningMods(car.id,stage,info.mods),expectedMods(car,stage),`${key}: exact permitted publication difference`);
    report.withheldDB11Items += info.mods.length - expectedMods(car,stage).length;
    const row=master.match(new RegExp(`<tr[^>]*data-tuning-package="${key}"[^>]*>([\\s\\S]*?)<\\/tr>`));
    assert.ok(row,`Initial HTML missing ${key}`);
    const cells=[...row[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map(m=>text(m[1]));
    assert.deepEqual(cells,[stageLabels[stage],stock.hp,info.spec.hp,info.spec.hp-stock.hp,stock.torque,info.spec.torque,info.spec.torque-stock.torque,info.price,info.time].map(String),`${key}: price/time/output mismatch`);
    const block=master.match(new RegExp(`<div id="${car.id}-${stage}">([\\s\\S]*?)<\\/ul>`));
    assert.ok(block,`Missing included work ${key}`);
    const publicMods=[...block[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(m=>text(m[1]));
    assert.deepEqual(publicMods,expectedMods(car,stage),`${key}: included work must match source except precisely withheld DB11 terms`);
    const arRow=arabic.match(new RegExp(`<tr[^>]*data-tuning-package="${key}"[^>]*>([\\s\\S]*?)<\\/tr>`));
    assert.ok(arRow,`Arabic initial HTML missing ${key}`);
    const arCells=[...arRow[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map(m=>text(m[1]));
    assert.deepEqual(arCells,[arabicStageLabels[stage],stock.hp,info.spec.hp,info.spec.hp-stock.hp,stock.torque,info.spec.torque,info.spec.torque-stock.torque,info.price,localizeDuration(info.time)].map(String),`${key}: Arabic exact source output/price/time`);
    const arBlock=arabic.match(new RegExp(`<div id="${car.id}-${stage}">([\\s\\S]*?)<\\/ul>`));
    assert.ok(arBlock,`Arabic included work missing ${key}`);
    assert.deepEqual([...arBlock[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(m=>text(m[1])),expectedMods(car,stage).map(localizeTuningMod),`${key}: Arabic exact published work`);
    if(car.id==='glc63' && ['stage3','stage4','stage5'].includes(stage)) {
      assert.ok(text(block[1]).includes(getTuningPriceNote(car.id,stage,false)),`${key}: endpoint scope missing`);
      assert.ok(text(arBlock[1]).includes(getTuningPriceNote(car.id,stage,true)),`${key}: Arabic endpoint scope missing`);
    }
    report.publishedTunedPackages++;
  }
}
assert.equal(report.sourceTunedPackages,67);
assert.equal(report.withheldS63Packages,5);
assert.equal(report.withheldDB11Items,3);
assert.equal(report.publishedTunedPackages,62);
assert.equal(selectCars(master).length,report.publishedTunedPackages);
assert.equal(selectCars(arabic).length,report.publishedTunedPackages);
for(const html of [master,arabic,await htmlFor('/tuning/aston-martin-db11')]) {
  const block=html.match(/<details[^>]*id="db11-packages"[^>]*>([\s\S]*?)<\/details>/);
  assert.ok(block,'DB11 detail must remain available');
  assert.ok(!/\bMCT\b|wet clutch|قابض رطب|1350|1100 نيوتن/.test(text(block[1])), 'Unverified DB11 reinforcement terminology must be absent');
}
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
report.checks=['Original 67-package source unchanged; 62 exact public rows in English/Arabic initial HTML','Five S63 packages withheld; enquiry identity/notice only','Exactly three DB11 reinforcement items withheld; all other work exact','GLC63 endpoint notes present in English and Arabic','Exact source HP, torque, gains, EUR price qualifiers and time','FAQ visible/schema agreement','Nine model owners with master and service hub links','Canonical/sitemap/robots and English-only hreflang','No stage URLs; invented stage routes return 404; query states retain owner'];
report.passed=true;
await fs.writeFile(path.join(out,'tuning-validation.json'),JSON.stringify(report,null,2));
console.log(`Tuning validation passed: ${report.sourceVehicles} source vehicles, ${report.sourceTunedPackages} source / ${report.publishedTunedPackages} public packages, ${tuningModelPages.length} model owners, ${report.routes} routes / ${report.sitemapCanonicalCount} canonical URLs.`);
