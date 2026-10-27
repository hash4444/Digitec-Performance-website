import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const root = process.cwd(), task = path.join(root, 'outputs/porsche-ranking-2026-10-27');
const files = ['src/pages/BestWorkshopPage.tsx','src/data/bestWorkshopPages.ts','src/pages/PorscheModelPage.tsx','src/data/porscheModelPages.ts','src/data/queryServiceContent.ts'];
const baseline = new Map(await Promise.all(files.map(async f => [path.join(root,f).replaceAll('\\','/'), await fs.readFile(path.join(task,'baseline',path.basename(f)),'utf8')])));
await build({ logLevel:'error', plugins:[{ name:'porsche-ranking-baseline', enforce:'pre', load(id) { return baseline.get(id.split('?')[0].replaceAll('\\','/')) ?? null; } }], build:{ ssr:'src/entry-server.tsx',outDir:path.join(task,'ssr-before'),copyPublicDir:false,emptyOutDir:false } });
const oldRender = (await import(pathToFileURL(path.join(task,'ssr-before/entry-server.js')))).renderRoute;
const render = (await import(pathToFileURL(path.join(task,'ssr/entry-server.js')))).renderRoute;
const visibleText = h => h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
const reports=[];
for(const route of ['/brands/mercedes-benz-service-dubai','/ar/brands/mercedes-benz-service-dubai','/best-mercedes-workshop-dubai','/ar/best-mercedes-workshop-dubai','/best-bmw-workshop-dubai','/ar/best-porsche-workshop-dubai']) {
 const a=await oldRender(route), b=await render(route);
 assert.equal(visibleText(b.html),visibleText(a.html),`Outside-scope page content changed: ${route}`);
 assert.deepEqual(b.seo,a.seo,`Outside-scope SEO changed: ${route}`);
 reports.push({route,unchangedContentAndSeo:true});
}
const guide=await render('/best-porsche-workshop-dubai');
assert(guide.seo.title.includes('Choosing'));
assert.equal(guide.seo.canonical,'https://digitecme.com/best-porsche-workshop-dubai');
assert(guide.html.includes('href="/brands/porsche-service-dubai"'));
assert(guide.html.includes('href="/brands/porsche-service-dubai/engine-diagnostics"'));
reports.push({route:'/best-porsche-workshop-dubai',distinctSelectionIntent:true,linksToCommercialOwner:true});
for(const route of ['/porsche/macan','/porsche/911/997','/porsche/911/991','/blog/porsche-911-service-dubai-guide']) {
 const page=await render(route);
 assert.equal((page.html.match(/<h1\b/g)??[]).length,1);
 assert(!page.seo.noindex);
 assert.equal((page.html.match(/id="brand-booking-form"/g)??[]).length,1);
 assert(page.html.includes('data-cta-placement="porsche_model_hero"'));
 assert(page.html.includes('data-cta-placement="porsche_model_booking"'));
 assert(page.html.includes('press Send in WhatsApp'));
 if(route==='/porsche/macan') {assert(page.html.includes('95B'));assert(page.html.includes('electric'));assert(page.html.includes('Does this service page cover the Macan Turbo?'))}
 if(route==='/porsche/911/997') {assert(page.html.includes('997.1'));assert(page.html.includes('997.2'));assert(page.html.includes('service'))}
 reports.push({route,indexable:true,oneHeading:true,modelBooking:true,initialHtmlFaqs:page.html.includes('data-state="closed"')});
 await fs.writeFile(path.join(task,route.replaceAll('/','_')+'.html'),page.html);
}
const gearbox=await render('/brands/porsche-service-dubai/transmission-repair');
assert(/Service.*Repair|Repair.*Service/.test(gearbox.seo.title));
assert(/scheduled|maintenance schedule/i.test(visibleText(gearbox.html)));
assert(!gearbox.seo.noindex);
reports.push({route:'/brands/porsche-service-dubai/transmission-repair',serviceAndRepairIntent:true});
await fs.writeFile(path.join(task,'render-checks.json'),JSON.stringify(reports,null,2));
console.log(JSON.stringify(reports,null,2));
