import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Validate the published HTML against independently preserved package sources.
// This script reads the local build only; it never contacts production.
const output = path.resolve(process.env.TUNING_MODEL_QA_DIR || 'outputs/t3/qa');
await mkdir(output, { recursive: true });
const moduleUrl = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText).toString('base64')}`;
const carsUrl = moduleUrl(await readFile('src/data/tuningCars.ts', 'utf8'));
const { tuningCars, stageLabels } = await import(carsUrl);
const { publishedTuningMods } = await import(moduleUrl(await readFile('src/data/tuningPublication.ts', 'utf8')));
const { tuningModelPages } = await import(moduleUrl((await readFile('src/data/tuningModelPages.ts', 'utf8')).replace("'@/data/tuningCars'", JSON.stringify(carsUrl))));
const { tuningModelEditorial } = await import(moduleUrl(await readFile('src/data/tuningModelEditorial.ts', 'utf8')));
const { getPublicRoutes } = await import(pathToFileURL(path.resolve('dist-server/entry-server.js')).href);
const { handleRequest } = await import(pathToFileURL(path.resolve('dist/_worker.js')).href);
const baseline = JSON.parse(await readFile('outputs/t3/baseline.json', 'utf8'));
const routes = getPublicRoutes();
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const origin = 'https://digitecme.com';
const htmlFor = route => readFile(path.join('dist', route, 'index.html'), 'utf8');
const decode = input => String(input).replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replaceAll('&quot;', '"').replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&apos;', "'").replaceAll('&nbsp;', ' ');
const text = input => decode(String(input).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const visibleText = html => text(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, ''));
const attrs = tag => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(match => [match[1], decode(match[2])]));
const sort = values => [...values].sort();
const report = { passed: false, checkedAt: new Date().toISOString(), routeCount: routes.length, sitemapCanonicalCount: [...sitemap.matchAll(/<loc>/g)].length, models: [], preservedFiles: [], internalLinks: [], checks: [], failures: [] };
const environment = { ASSETS: { fetch: async () => new Response('<html><title>Local asset</title></html>', { status: 200, headers: { 'content-type': 'text/html' } }) } };

try {
  assert.equal(routes.length, baseline.routeCount, 'Route count preserved');
  assert.equal(report.sitemapCanonicalCount, baseline.sitemapCanonicalCount, 'Sitemap canonical count preserved');
  assert.deepEqual(sort(routes.map(route => route.path)), sort(baseline.routes.map(route => route.path)), 'Exact route paths preserved');
  assert.deepEqual(sort([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1])), sort(baseline.routes.filter(route => route.indexable).map(route => origin + route.path)), 'Exact indexable sitemap URLs preserved');
  const preserved = ['src/pages/Tuning.tsx', 'src/data/tuningCars.ts', 'src/data/tuningPublication.ts', 'src/i18n/ar-tuning.ts', 'src/i18n/locale.ts', 'src/lib/whatsapp-tracking.ts', 'src/components/Analytics.tsx'];
  for (const file of preserved) {
    const expected = baseline.files.find(record => record.file === file);
    assert.ok(expected, `Baseline fingerprint exists: ${file}`);
    // Git checkouts may use CRLF while the original audit used LF for some files.
    // Normalize only line endings; the fixture is derived from the immutable base.
    assert.ok(expected.normalizedSha256, `Normalized baseline fingerprint exists: ${file}`);
    const normalized = (await readFile(file, 'utf8')).replace(/\r\n/g, '\n');
    assert.equal(createHash('sha256').update(normalized).digest('hex'), expected.normalizedSha256, `Preserve ${file}`);
    report.preservedFiles.push(file);
  }
  assert.equal(tuningModelPages.length, 9);
  assert.equal(new Set(tuningModelPages.map(model => model.metaTitle)).size, 9, 'Unique SEO titles');
  assert.equal(new Set(tuningModelPages.map(model => model.metaDescription)).size, 9, 'Unique descriptions');
  const master = await htmlFor('/tuning');
  const arabic = await htmlFor('/ar/tuning');
  assert.ok(arabic.includes('dir="rtl"'), 'Arabic hub RTL preserved');
  assert.ok(arabic.includes('hreflang="ar-AE"'), 'Arabic hub hreflang preserved');
  const conceptOrders = new Set();
  const checkedLinks = new Set();
  for (const model of tuningModelPages) {
    const html = await htmlFor(model.path);
    const visible = visibleText(html);
    const editorial = tuningModelEditorial[model.slug];
    assert.ok(editorial, `${model.path}: editorial definition exists`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${model.path}: one H1`);
    assert.equal(text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]), model.h1, `${model.path}: H1`);
    assert.equal(text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]), model.metaTitle, `${model.path}: title`);
    const description = [...html.matchAll(/<meta\b[^>]*>/g)].map(match => attrs(match[0])).find(meta => meta.name === 'description');
    assert.equal(description?.content, model.metaDescription, `${model.path}: description`);
    assert.ok(html.includes(`<link rel="canonical" href="${origin}${model.path}">`), `${model.path}: self canonical`);
    assert.ok(html.includes('content="index, follow, max-image-preview:large"'), `${model.path}: indexable`);
    const alternates = [...html.matchAll(/<link\b[^>]*hreflang[^>]*>/g)].map(match => attrs(match[0]));
    assert.deepEqual(alternates.map(link => [link.hreflang, link.href]).sort(), [['en-AE', origin + model.path], ['x-default', origin + model.path]], `${model.path}: truthful English-only alternates`);
    assert.ok(html.includes(`data-tuning-concept="${model.slug}"`), `${model.path}: model identity`);
    const actualOrder = [...html.matchAll(/data-model-section="([^"]+)"/g)].map(match => match[1]);
    assert.deepEqual(actualOrder, editorial.sectionOrder, `${model.path}: editorial section order`);
    conceptOrders.add(actualOrder.join(','));
    assert.ok(visible.includes(editorial.concept), `${model.path}: visible concept`);
    assert.ok(visible.includes(editorial.focusTitle), `${model.path}: engineering section`);
    assert.ok(visible.includes(editorial.guideTitle), `${model.path}: advice section`);
    assert.ok(visible.includes('ECU'), `${model.path}: ECU search intent visible`);
    assert.match(visible, /remap|remapping/i, `${model.path}: remapping search intent visible`);
    const schemas = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(match => {
      const schema = JSON.parse(match[1]);
      return schema['@graph'] || [schema];
    });
    for (const type of ['WebPage', 'Service', 'BreadcrumbList', 'FAQPage']) assert.ok(schemas.some(node => node['@type'] === type), `${model.path}: ${type}`);
    const faq = schemas.find(node => node['@type'] === 'FAQPage');
    assert.equal(faq.mainEntity.length, model.faqs.length, `${model.path}: FAQ count`);
    for (const question of faq.mainEntity) {
      assert.ok(visible.includes(question.name), `${model.path}: visible schema question`);
      assert.ok(visible.includes(question.acceptedAnswer.text), `${model.path}: visible schema answer`);
    }
    const service = schemas.find(node => node['@type'] === 'Service' && node['@id'] === `${origin}${model.path}#service`);
    assert.ok(service, `${model.path}: model service`);
    assert.ok(!service.aggregateRating && !service.review, `${model.path}: no invented service reviews`);
    assert.ok(master.includes(`href="${model.path}"`), `${model.path}: linked from hub`);
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main, `${model.path}: semantic main`);
    const expectedKeys = model.carIds.flatMap(id => tuningCars.find(car => car.id === id).availableStages.filter(stage => stage !== 'stock').map(stage => `${id}:${stage}`));
    assert.deepEqual([...html.matchAll(/data-tuning-package="([^"]+)"/g)].map(match => match[1]), expectedKeys, `${model.path}: all exact static package keys`);
    for (const carId of model.carIds) {
      const car = tuningCars.find(record => record.id === carId);
      const stock = car.stages.stock.spec;
      for (const stage of car.availableStages.filter(item => item !== 'stock')) {
        const info = car.stages[stage];
        const row = html.match(new RegExp(`<tr[^>]*data-tuning-package="${car.id}:${stage}"[^>]*>([\\s\\S]*?)<\\/tr>`));
        assert.ok(row, `${model.path}: source package ${car.id}:${stage}`);
        assert.deepEqual([...row[1].matchAll(/<(?:td|th)\b[^>]*>([\s\S]*?)<\/(?:td|th)>/g)].map(match => text(match[1])), [stageLabels[stage], stock.hp, info.spec.hp, info.spec.hp - stock.hp, stock.torque, info.spec.torque, info.spec.torque - stock.torque, info.price, info.time].map(String), `${model.path}: exact source outputs, price, estimate ${stage}`);
        const work = html.match(new RegExp(`<div id="${car.id}-${stage}">([\\s\\S]*?)<\\/ul>`));
        assert.ok(work, `${model.path}: static included work ${stage}`);
        assert.deepEqual([...work[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map(match => text(match[1])), publishedTuningMods(car.id, stage, info.mods), `${model.path}: permitted published included work ${stage}`);
      }
    }
    for (const tag of main.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
      const anchor = attrs(tag[0]);
      const target = new URL(anchor.href, origin + model.path);
      if (target.hostname === 'wa.me') {
        assert.equal(target.pathname, '/97143402223', `${model.path}: configured WhatsApp destination`);
        assert.ok(target.searchParams.get('text')?.includes(model.name), `${model.path}: model-specific enquiry message`);
        assert.ok(anchor['data-cta-placement'], `${model.path}: WhatsApp placement`);
      }
      if (target.origin !== origin) continue;
      const key = target.pathname + target.hash;
      if (checkedLinks.has(key)) continue;
      checkedLinks.add(key);
      const response = await handleRequest(new Request(target.href), environment);
      assert.ok(response.status >= 200 && response.status < 400, `${model.path}: internal link ${anchor.href} returned ${response.status}`);
      if (target.hash && response.status === 200) {
        const targetHtml = target.pathname === model.path ? html : await htmlFor(target.pathname);
        assert.ok(targetHtml.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `${model.path}: target anchor ${anchor.href}`);
      }
      report.internalLinks.push({ target: key, status: response.status });
    }
    const response = await handleRequest(new Request(origin + model.path), environment);
    assert.equal(response.status, 200, `${model.path}: actual generated router`);
    report.models.push({ path: model.path, title: model.metaTitle, description: model.metaDescription, concept: editorial.concept, sectionOrder: actualOrder, packages: expectedKeys.length, faqs: model.faqs.length, passed: true });
  }
  assert.ok(conceptOrders.size >= 5, 'Recognizably different editorial structures');
  assert.equal(report.models.reduce((total, model) => total + model.packages, 0), 52, 'All 52 scoped package records preserved');
  report.checks = ['Nine unique model intent owners', 'Exact 1,256 route paths and 1,005 sitemap URLs preserved', 'Unique metadata, one H1 and self-canonicals', 'English-only alternates; Arabic hub untouched', 'Distinct editorial ordering', 'All 52 model package rows, outputs, prices, durations and permitted work preserved', 'Visible/schema FAQ agreement', 'Configured WhatsApp model drafts and placement attributes', 'Internal routes and fragment targets', 'Original data, publication safeguards and shared conversion attribution unchanged'];
  report.passed = true;
} catch (error) {
  report.failures.push({ message: error.message, stack: error.stack });
}
await writeFile(path.join(output, 'model-validation.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify({ passed: report.passed, models: report.models.length, routes: report.routeCount, sitemap: report.sitemapCanonicalCount, internalLinks: report.internalLinks.length, failures: report.failures.map(failure => failure.message) }, null, 2));
if (!report.passed) process.exitCode = 1;
