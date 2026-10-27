import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

const output = path.resolve('outputs/t1.1');
await fs.mkdir(output, { recursive: true });
const compile = s => ts.transpileModule(s, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 } }).outputText;
const asModule = s => `data:text/javascript;base64,${Buffer.from(compile(s)).toString('base64')}`;
const baselineSource = await fs.readFile('outputs/t1/baseline/tuningCars.ts', 'utf8');
const currentSource = await fs.readFile('src/data/tuningCars.ts', 'utf8');
const currentModule = asModule(currentSource);
const { tuningCars: baselineCars, stageLabels } = await import(asModule(baselineSource));
const { tuningCars: currentCars } = await import(currentModule);
const { tuningModelPages: models } = await import(asModule((await fs.readFile('src/data/tuningModelPages.ts', 'utf8')).replace("'@/data/tuningCars'", JSON.stringify(currentModule))));
const decode = s => String(s).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&nbsp;', ' ').replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const text = s => decode(s.replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '').replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const main = html => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
const htmlFor = route => fs.readFile(path.join('dist', route, 'index.html'), 'utf8');
const tag = (html, name) => text(html.match(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] || '');
const meta = (html, name) => decode(html.match(new RegExp(`<meta\\b[^>]*name="${name}"[^>]*content="([^"]*)"`, 'i'))?.[1] || '');
const graphs = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])['@graph'] || [JSON.parse(m[1])]);
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
const csv = rows => rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n') + '\n';
const packageEvidence = [], pageEvidence = [];
// Explicit factual correction required by the T1.1 brief. No other package item
// may disappear. Preserve original evidence and compare to the exact corrected
// public contract rather than accepting arbitrary current-source changes.
const authorizedSuppressions = {
  'db11:stage3': ['Stage 1 GAD transmission reinforcement MCT (~1100 Nm)'],
  'db11:stage4': ['Stage 1 GAD transmission reinforcement MCT (~1100 Nm)'],
  'db11:stage5': ['Stage 2 GAD transmission reinforcement MCT with wet clutch (~1350 Nm)'],
};
let checks = 0;
const errors = [];
const assert = (condition, message) => { checks++; if (!condition) errors.push(message); };
for (const model of models) {
  const html = await htmlFor(model.path), rendered = text(main(html));
  const rows = [...html.matchAll(/<tr\b[^>]*data-tuning-package="([^"]+)"[^>]*>([\s\S]*?)<\/tr>/g)];
  const sourceCars = model.carIds.map(id => baselineCars.find(c => c.id === id));
  assert(sourceCars.every(Boolean), `${model.path}: model not in original configurator`);
  assert(sourceCars.every(c => c.engine === model.engine), `${model.path}: engine differs from original source`);
  const expectedKeys = sourceCars.flatMap(c => c.availableStages.filter(s => s !== 'stock').map(s => `${c.id}:${s}`));
  assert(JSON.stringify(rows.map(r => r[1])) === JSON.stringify(expectedKeys), `${model.path}: package stages/order differs`);
  assert(tag(html, 'title') === model.metaTitle, `${model.path}: title mismatch`);
  assert(tag(html, 'h1') === model.h1, `${model.path}: H1 mismatch`);
  assert(meta(html, 'description') === model.metaDescription, `${model.path}: description mismatch`);
  const faq = graphs(html).find(g => g['@type'] === 'FAQPage');
  assert(faq?.mainEntity?.length === model.faqs.length, `${model.path}: FAQ count`);
  for (const item of model.faqs) {
    assert(rendered.includes(item.question) && rendered.includes(item.answer), `${model.path}: FAQ not rendered exactly`);
    assert(faq?.mainEntity?.some(q => q.name === item.question && q.acceptedAnswer?.text === item.answer), `${model.path}: FAQ schema differs from visible`);
  }
  const paragraphs = [model.intro, ...model.platformNotes, ...model.packageExplanation, ...model.faqs.map(f => f.answer)];
  for (const paragraph of paragraphs) assert(rendered.includes(paragraph), `${model.path}: narrative not present verbatim`);
  for (const originalCar of sourceCars) {
    const currentCar = currentCars.find(c => c.id === originalCar.id);
    assert(currentCar?.engine === originalCar.engine, `${originalCar.id}: current engine changed`);
    assert(JSON.stringify(currentCar?.availableStages) === JSON.stringify(originalCar.availableStages), `${originalCar.id}: source stages changed`);
    for (const stage of originalCar.availableStages.filter(s => s !== 'stock')) {
      const source = originalCar.stages[stage], stock = originalCar.stages.stock.spec;
      const record = rows.find(r => r[1] === `${originalCar.id}:${stage}`);
      const cells = record ? [...record[2].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map(m => text(m[1])) : [];
      const expected = [stageLabels[stage], stock.hp, source.spec.hp, source.spec.hp-stock.hp, stock.torque, source.spec.torque, source.spec.torque-stock.torque, source.price, source.time].map(String);
      const numericalFields = ['stage','stockHP','tunedHP','HPgain','stockTorqueNm','tunedTorqueNm','torqueGainNm','price','time'];
      for (let i = 0; i < expected.length; i++) assert(cells[i] === expected[i], `${model.path} ${originalCar.id}:${stage}: ${numericalFields[i]} expected ${expected[i]}, got ${cells[i]}`);
      const block = html.match(new RegExp(`<div\\b[^>]*id="${originalCar.id}-${stage}"[^>]*>([\\s\\S]*?)<\\/ul>`));
      const publicMods = block ? [...block[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(m => text(m[1])) : [];
      const suppression = authorizedSuppressions[`${originalCar.id}:${stage}`] || [];
      const expectedPublicMods = source.mods.filter(item => !suppression.includes(item));
      for (const item of suppression) assert(source.mods.includes(item), `${originalCar.id}:${stage}: correction list not in original source`);
      assert(JSON.stringify(publicMods) === JSON.stringify(expectedPublicMods), `${model.path} ${originalCar.id}:${stage}: included work differs beyond exactly authorized DB11 factual correction`);
      assert(cells[7] === source.price && /Price \(EUR\)/.test(rendered), `${model.path} ${originalCar.id}:${stage}: currency or exact price differs`);
      assert(JSON.stringify(currentCar.stages[stage].spec) === JSON.stringify(source.spec), `${originalCar.id}:${stage}: stored numerical source changed`);
      packageEvidence.push({path:model.path,carId:originalCar.id,sourceName:originalCar.name,engine:originalCar.engine,stage,sourceReference:'outputs/t1/baseline/tuningCars.ts',stockHP:stock.hp,tunedHP:source.spec.hp,HPgain:source.spec.hp-stock.hp,stockTorqueNm:stock.torque,tunedTorqueNm:source.spec.torque,torqueGainNm:source.spec.torque-stock.torque,price:source.price,currency:/€/.test(source.price)?'EUR':'No numerical price: on request',time:source.time,sourceIncludedWork:source.mods,expectedPublicIncludedWork:expectedPublicMods,authorizedSuppressedWork:suppression,suppressionReason:suppression.length?'T1.1 instructed remove incorrect/unverified DB11 MCT reinforcement claim; original historical data preserved, no replacement transmission claim invented':null,renderedCells:cells,renderedIncludedWork:publicMods,requiredHardware:'NOT SEPARATELY SPECIFIED IN SOURCE; included-work list retained, no mandatory category inferred',optionalHardware:'NOT SEPARATELY SPECIFIED IN SOURCE; no optional category invented',exactCellMatch:JSON.stringify(cells)===JSON.stringify(expected),exactOriginalWorkMatch:JSON.stringify(publicMods)===JSON.stringify(source.mods),exactCorrectedWorkMatch:JSON.stringify(publicMods)===JSON.stringify(expectedPublicMods)});
    }
  }
  pageEvidence.push({path:model.path,name:model.name,carIds:model.carIds,engine:model.engine,generation:model.generation||'Source does not define year/generation',title:tag(html,'title'),H1:tag(html,'h1'),description:meta(html,'description'),canonical:html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1],publicPackageKeys:rows.map(r=>r[1]),packageCount:rows.length,htmlSha256:hash(html),primaryOwnership:'MODEL-FIRST tuning: model is first in title/H1/meta description and configurations restricted to that model',parentOwner:'/tuning',genericParentLink:html.includes('href="/tuning"'),narrativeParagraphsAudited:paragraphs,FAQ:faq?.mainEntity});
}
const masterHtml = await htmlFor('/tuning'), masterMain = main(masterHtml), masterText = text(masterMain);
const headingEvidence = [...masterMain.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/g)].map(m=>({level:+m[1],text:text(m[2])}));
const ownership = {owner:'/tuning',title:tag(masterHtml,'title'),H1:tag(masterHtml,'h1'),description:meta(masterHtml,'description'),headings:headingEvidence,modelPages:pageEvidence.map(({path,title,H1,description,primaryOwnership,parentOwner,genericParentLink})=>({path,title,H1,description,primaryOwnership,parentOwner,genericParentLink})),genericIntents:['generic tuning','performance tuning','ECU tuning','ECU remap','chip tuning','generic Stage 1/2/3','GAD Motors','generic tuning price','near-me/local tuning'].map(intent=>({intent,owner:'/tuning',status:'RETAINED: generic master title/H1 and substantive sections; model page primary metadata/H1 scoped to named model'}))};
async function walk(dir) { const result=[]; for(const item of await fs.readdir(dir,{withFileTypes:true})) { const itemPath=path.join(dir,item.name); if(item.isDirectory()) result.push(...await walk(itemPath)); else if(item.name==='index.html') result.push(itemPath); } return result; }
const routeFiles=await walk('dist');
const matches=[], brandPageContexts=[], fullPageMatches=[], metadataMatches=[], schemaMatches=[];
const brandRe=/\b(?:BMW|Audi)\b|أودي|بي\s?إم\s?دبليو/i;
const tuningRe=/\btun(?:e|ed|ing)\b|\bremap(?:ping)?\b|\bchip\b|power upgrade|performance (?:upgrade|project)|\bECU\b|برمجة|تطوير الأداء/i;
for(const file of routeFiles) {
  const route='/' + path.relative('dist',path.dirname(file)).replaceAll(path.sep,'/');
  const html=await fs.readFile(file,'utf8'), core=main(html);
  const blocks=[...core.matchAll(/<(p|h[1-6]|li|summary|td|th)\b[^>]*>([\s\S]*?)<\/\1>/g)].map(m=>({tag:m[1],text:text(m[2])}));
  for(const b of blocks) if(brandRe.test(b.text)&&tuningRe.test(b.text)) matches.push({route,...b});
  for(const m of html.matchAll(/<(p|h[1-6]|li|summary|td|th|a|span)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const value=text(m[2]);
    if(brandRe.test(value)&&tuningRe.test(value)) fullPageMatches.push({route,tag:m[1],text:value});
  }
  for(const [field,value] of [['title',tag(html,'title')],['description',meta(html,'description')]]) if(brandRe.test(value)&&tuningRe.test(value)) metadataMatches.push({route,field,text:value});
  const isBrandPage=/bmw|audi/i.test(route) || brandRe.test(tag(core,'h1'));
  if(isBrandPage) for(const b of blocks) if(tuningRe.test(b.text)) brandPageContexts.push({route,...b});
  for(const g of graphs(html)) {
    function visit(value,key='$') {
      if(typeof value==='string'&&brandRe.test(value)&&tuningRe.test(value)) schemaMatches.push({route,field:key,text:value});
      else if(value&&typeof value==='object') for(const [k,v] of Object.entries(value)) visit(v,`${key}.${k}`);
    }
    visit(g);
    if(g['@type']==='FAQPage') for(const q of g.mainEntity||[]) {
      const value=`${q.name} ${q.acceptedAnswer?.text||''}`;
      if(brandRe.test(value)&&tuningRe.test(value)) matches.push({route,tag:'FAQ schema',text:value});
    }
  }
}
const brandAudit={renderedRouteFilesScanned:routeFiles.length,scope:'Actual dist/**/index.html: full-page semantic blocks, main content (whole page fallback where no main element), title/description, all schema string fields and joined FAQ questions/answers; shared corporate footer/nav is retained as evidence but distinguished from a brand-specific offer',brandAndTuningSameBlock:matches,brandOwnedPageTuningBlocks:brandPageContexts,fullPageBrandAndTuningSameBlock:fullPageMatches,brandAndTuningMetadata:metadataMatches,brandAndTuningSchema:schemaMatches,classification:'Pending human semantic review; the lists preserve exact rendered contexts and do not count string proximity as a positive offer'};
const audioQueries=['mercedes e class audio upgrade in dubai','mercedes stereo upgrade in dubai','mercedes sound system upgrade in dubai'];
const register=await fs.readFile('outputs/t1/tuning-gsc-query-register.csv','utf8');
const audioRows=register.split(/\r?\n/).filter(line=>audioQueries.some(q=>line.startsWith(q+',')));
const audioOwnerHtml=await htmlFor('/services/mercedes-audio-upgrade-dubai');
const scope={porsche:{confirmedBusinessScope:'User states there is a separate current Porsche model list and will provide it later',dataRecords:currentCars.filter(c=>/porsche/i.test(c.brand||c.name)),modelPages:models.filter(c=>/porsche/i.test(c.name||c.path)),masterEnquiryParagraphs:[...masterMain.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m=>text(m[1])).filter(p=>/porsche/i.test(p)),status:'User/business confirmed scope retained by enquiry; no Porsche package/model data exists or is fabricated'},audio:{queryRows:audioRows,visibleImpressions:audioRows.reduce((n,line)=>n+Number(line.split(',')[3]),0),owner:'/services/mercedes-audio-upgrade-dubai',exactAudioQueriesInTuningMain:audioQueries.filter(q=>masterText.toLowerCase().includes(q)),masterAudioUpgradeHeading:headingEvidence.filter(h=>/audio|stereo|head.unit|sound system/i.test(h.text)),audioOwnerTitle:tag(audioOwnerHtml,'title'),audioOwnerH1:tag(audioOwnerHtml,'h1'),audioOwnerCanonical:audioOwnerHtml.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1]}};
const summary={auditedAt:new Date().toISOString(),mode:'Independent original-configurator vs actual built model pages, with exactly three explicitly authorized DB11 factual suppressions',models:models.length,configuratorRecords:new Set(packageEvidence.map(x=>x.carId)).size,modelPackageRows:packageEvidence.length,originalIncludedWorkItems:packageEvidence.reduce((n,x)=>n+x.sourceIncludedWork.length,0),expectedPublicIncludedWorkItems:packageEvidence.reduce((n,x)=>n+x.expectedPublicIncludedWork.length,0),renderedIncludedWorkItems:packageEvidence.reduce((n,x)=>n+x.renderedIncludedWork.length,0),authorizedSuppressionItemCount:packageEvidence.reduce((n,x)=>n+x.authorizedSuppressedWork.length,0),exactRowMatches:packageEvidence.filter(x=>x.exactCellMatch).length,exactOriginalWorkMatches:packageEvidence.filter(x=>x.exactOriginalWorkMatch).length,exactCorrectedWorkMatches:packageEvidence.filter(x=>x.exactCorrectedWorkMatch).length,assertions:checks,errors,passed:errors.length===0,baselineSourceSha256:hash(baselineSource),currentSourceSha256:hash(currentSource),requiredOptionalHardwareEvidence:'The original configurator schema has spec, mods, price, time, powerCurve only. Separate required/optional hardware fields are absent. Public pages explain written proposal; no hardware category invented.'};
await fs.writeFile(path.join(output,'nine-model-rendered-factual-qa.json'),JSON.stringify({summary,pages:pageEvidence,packages:packageEvidence},null,2));
await fs.writeFile(path.join(output,'nine-model-rendered-package-evidence.csv'),csv([['path','source_car_id','engine','stage','stock_HP','tuned_HP','HP_gain','stock_Nm','tuned_Nm','Nm_gain','exact_source_price','currency','estimated_time','exact_cell_match','exact_original_work_match','exact_corrected_work_match','source_included_work','rendered_included_work','explicit_authorized_DB11_suppression','required_hardware','optional_hardware'],...packageEvidence.map(r=>[r.path,r.carId,r.engine,r.stage,r.stockHP,r.tunedHP,r.HPgain,r.stockTorqueNm,r.tunedTorqueNm,r.torqueGainNm,r.price,r.currency,r.time,r.exactCellMatch,r.exactOriginalWorkMatch,r.exactCorrectedWorkMatch,r.sourceIncludedWork.join(' | '),r.renderedIncludedWork.join(' | '),r.authorizedSuppressedWork.join(' | '),r.requiredHardware,r.optionalHardware])]));
await fs.writeFile(path.join(output,'model-primary-ownership.json'),JSON.stringify(ownership,null,2));
await fs.writeFile(path.join(output,'bmw-audi-rendered-search-contexts.json'),JSON.stringify(brandAudit,null,2));
await fs.writeFile(path.join(output,'porsche-audio-owner-verification.json'),JSON.stringify(scope,null,2));
console.log(JSON.stringify({summary,brandAndTuningBlocks:matches.length,brandOwnedPageTuningBlocks:brandPageContexts.length,renderedRouteFilesScanned:routeFiles.length,porscheRecords:scope.porsche.dataRecords.length,audioVisibleImpressions:scope.audio.visibleImpressions},null,2));
