import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Validate the release output and user-intent contract, independently of the
// content data used to generate it. Run after the complete production build.
const root = process.cwd();
const origin = 'https://digitecme.com';
const output = path.join(root, 'outputs/seo-2026-09-16/master-validation.json');
const owners = [
  ['BMW', '/brands/bmw-service-dubai'],
  ['Rolls-Royce', '/brands/rolls-royce-service-dubai'],
  ['Aston Martin', '/brands/aston-martin-service-dubai'],
  ['Bentley', '/brands/bentley-service-dubai'],
  ['PPF', '/services/paint-protection-film'],
  ['Ceramic', '/services/ceramic-coating'],
  ['Cadillac CUE', '/services/cadillac-cue-screen-repair-dubai'],
  ['Electrical', '/services/auto-electrical-repair-dubai'],
  ['Head unit', '/services/head-unit-repair-dubai'],
  ['Mercedes audio', '/services/mercedes-audio-upgrade-dubai'],
  ['Bentley camera', '/brands/bentley-service-dubai/electrical-repair#reverse-camera'],
  ['Tyres', '/services/tire-repair-dubai'],
];
const specialists = [
  '/services/cadillac-cue-screen-repair-dubai',
  '/services/head-unit-repair-dubai',
  '/services/mercedes-audio-upgrade-dubai',
];
const electrical = '/services/auto-electrical-repair-dubai';
const bentley = '/brands/bentley-service-dubai';
const camera = `${bentley}/electrical-repair#reverse-camera`;
const tyres = '/services/tire-repair-dubai';
const faqBodyRequired = new Set([electrical, tyres]);
const report = { checkedAt: new Date().toISOString(), passed: false, outputDirectory: 'dist', owners: [], checks: {}, errors: [] };

const decode = value => String(value)
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&nbsp;', ' ')
  .replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
const text = value => decode(String(value).replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const attribute = (tag, name) => {
  const match = tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return match ? decode(match[1] ?? match[2]) : undefined;
};
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(match => match[0]);
const metadata = (html, key) => tags(html, 'meta')
  .filter(tag => attribute(tag, 'name') === key || attribute(tag, 'property') === key)
  .map(tag => attribute(tag, 'content'));
const canonicals = html => tags(html, 'link').filter(tag => attribute(tag, 'rel') === 'canonical').map(tag => attribute(tag, 'href'));
const anchors = html => tags(html, 'a').map(tag => attribute(tag, 'href')).filter(Boolean);
const visibleMarkup = html => html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
const schemaNodes = html => [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
  .filter(match => attribute(match[1], 'type') === 'application/ld+json')
  .flatMap(match => {
    const parsed = JSON.parse(match[2]);
    return Array.isArray(parsed) ? parsed : parsed['@graph'] ?? [parsed];
  });
const hasType = (node, type) => [].concat(node['@type'] ?? []).includes(type);
const htmlCache = new Map();
async function htmlFor(route) {
  if (!htmlCache.has(route)) htmlCache.set(route, await readFile(path.join(root, 'dist', route.replace(/^\//, ''), 'index.html'), 'utf8'));
  return htmlCache.get(route);
}
function requireLink(html, from, to) {
  assert.ok(anchors(html).some(href => {
    const candidate = new URL(href, `${origin}${from}`);
    const required = new URL(to, origin);
    return candidate.origin === required.origin && candidate.pathname === required.pathname && (!required.hash || candidate.hash === required.hash);
  }), `Missing contextual relationship ${from} -> ${to}`);
}

try {
  const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
  const routes = getPublicRoutes();
  const routesByPath = new Map(routes.map(route => [route.path, route]));
  const sitemap = await readFile(path.join(root, 'dist/sitemap.xml'), 'utf8');
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => decode(match[1]));
  const redirects = new Map((await readFile(path.join(root, 'dist/_redirects'), 'utf8'))
    .split(/\r?\n/).filter(line => line.startsWith('/')).map(line => line.split(/\s+/).slice(0, 2)));
  const titleOwners = new Map();
  const descriptionOwners = new Map();
  let internalLinksChecked = 0;
  let faqQuestionsChecked = 0;
  let faqAnswersInInitialHtml = 0;
  const interactiveOnlyFaqAnswers = [];

  for (const [cluster, owner] of owners) {
    const ownerUrl = new URL(owner, origin);
    const route = ownerUrl.pathname;
    const url = `${origin}${route}`;
    const html = await htmlFor(route);
    const bodyMarkup = visibleMarkup(html);
    const bodyText = text(bodyMarkup);
    assert.equal(routes.filter(item => item.path === route).length, 1, `One manifest entry required: ${route}`);
    assert.equal(routesByPath.get(route)?.indexable, true, `Owner must remain indexable: ${route}`);
    assert.equal(sitemapUrls.filter(item => item === url).length, 1, `One XML sitemap entry required: ${route}`);
    assert.deepEqual(canonicals(html), [url], `Canonical must retain owner URL: ${route}`);
    assert.equal(metadata(html, 'robots').length, 1, `One robots tag required: ${route}`);
    assert.match(metadata(html, 'robots')[0], /(?:^|,\s*)index(?:,|$)/, route);
    assert.doesNotMatch(metadata(html, 'robots')[0], /noindex|nofollow/, route);
    assert.deepEqual(metadata(html, 'og:url'), [url], `OG URL: ${route}`);
    assert.ok(!html.includes(String.fromCharCode(0)), `Invalid NUL: ${route}`);
    assert.doesNotMatch(bodyText, /Service Not Found|Page Not Found/, `SSR fallback content: ${route}`);

    const headings = [...bodyMarkup.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(match => text(match[1]));
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map(match => text(match[1]));
    const descriptions = metadata(html, 'description');
    assert.equal(headings.length, 1, `One H1: ${route}`);
    assert.equal(titles.length, 1, `One title: ${route}`);
    assert.equal(descriptions.length, 1, `One description: ${route}`);
    assert.ok(headings[0].length > 5 && titles[0].length > 5 && descriptions[0]?.length > 20, `Empty metadata or heading: ${route}`);
    assert.ok(!titleOwners.has(titles[0]), `Duplicate target title: ${route} and ${titleOwners.get(titles[0])}`);
    assert.ok(!descriptionOwners.has(descriptions[0]), `Duplicate target description: ${route} and ${descriptionOwners.get(descriptions[0])}`);
    titleOwners.set(titles[0], route);
    descriptionOwners.set(descriptions[0], route);
    assert.equal(metadata(html, 'og:title').length, 1, `OG title: ${route}`);
    assert.equal(metadata(html, 'og:description').length, 1, `OG description: ${route}`);
    assert.ok(anchors(html).some(href => href.startsWith('https://wa.me/')), `WhatsApp enquiry missing: ${route}`);
    assert.ok(anchors(html).some(href => href.startsWith('tel:')), `Telephone enquiry missing: ${route}`);

    const nodes = schemaNodes(html);
    assert.ok(nodes.length > 0, `No structured data: ${route}`);
    const definedIds = nodes.map(node => node['@id']).filter(Boolean);
    assert.equal(new Set(definedIds).size, definedIds.length, `Duplicate JSON-LD entity definitions: ${route}`);
    for (const suffix of ['#business', '#organization', '#website']) {
      assert.equal(nodes.filter(node => node['@id'] === `${origin}/${suffix}`).length, 1, `Global entity ${suffix}: ${route}`);
    }
    const services = nodes.filter(node => hasType(node, 'Service') && node['@id'] === `${url}#service`);
    assert.equal(services.length, 1, `One page-scoped Service entity: ${route}`);
    assert.equal(services[0].provider?.['@id'], `${origin}/#business`, `Service business reference: ${route}`);
    const breadcrumbs = nodes.filter(node => hasType(node, 'BreadcrumbList'));
    assert.equal(breadcrumbs.length, 1, `One breadcrumb: ${route}`);
    const crumbs = breadcrumbs[0].itemListElement;
    assert.equal(crumbs.at(-1).item, url, `Final breadcrumb URL: ${route}`);
    assert.deepEqual(crumbs.map(item => item.position), crumbs.map((_, index) => index + 1), `Breadcrumb positions: ${route}`);

    const faqNodes = nodes.filter(node => hasType(node, 'FAQPage'));
    assert.ok(faqNodes.length <= 1, `Duplicated FAQ entity: ${route}`);
    let pageFaqs = 0;
    for (const faq of faqNodes) {
      for (const question of faq.mainEntity ?? []) {
        assert.ok(hasType(question, 'Question') && text(question.name), `FAQ question structure: ${route}`);
        assert.ok(question.acceptedAnswer && hasType(question.acceptedAnswer, 'Answer'), `FAQ answer structure: ${route}`);
        assert.ok(bodyText.includes(text(question.name)), `Schema FAQ question absent from body: ${route}: ${question.name}`);
        const hasAnswer = bodyText.includes(text(question.acceptedAnswer.text));
        if (hasAnswer) faqAnswersInInitialHtml++;
        else interactiveOnlyFaqAnswers.push({ route, question: question.name });
        if (faqBodyRequired.has(route) || /<details\b/i.test(bodyMarkup)) {
          assert.ok(hasAnswer, `Schema FAQ answer absent from initial HTML: ${route}: ${question.name}`);
        }
        pageFaqs++;
        faqQuestionsChecked++;
      }
    }
    if (faqBodyRequired.has(route)) {
      assert.ok(pageFaqs > 0, `Relevant service FAQs required: ${route}`);
    }

    if (ownerUrl.hash) assert.ok(tags(bodyMarkup, '[a-z][a-z0-9]*').some(tag => attribute(tag, 'id') === ownerUrl.hash.slice(1)), `Missing owner fragment: ${owner}`);
    for (const href of anchors(html)) {
      const target = new URL(href, url);
      if (target.origin !== origin || path.extname(target.pathname)) continue;
      assert.ok(routesByPath.has(target.pathname) || redirects.has(target.pathname), `Broken internal route: ${route} -> ${href}`);
      if (target.hash && routesByPath.has(target.pathname)) {
        const targetHtml = target.pathname === route ? html : await htmlFor(target.pathname);
        const fragment = decodeURIComponent(target.hash.slice(1));
        assert.ok(tags(targetHtml, '[a-z][a-z0-9]*').some(tag => attribute(tag, 'id') === fragment), `Broken internal fragment: ${route} -> ${href}`);
      }
      internalLinksChecked++;
    }
    report.owners.push({ cluster, owner, canonical: url, title: titles[0], h1: headings[0], description: descriptions[0], faqQuestions: pageFaqs, schemaEntities: nodes.length, htmlSha256: createHash('sha256').update(html).digest('hex') });
  }
  report.checks.initialHtml = { ownerCount: owners.length, uniqueTitles: titleOwners.size, uniqueDescriptions: descriptionOwners.size, internalLinksChecked, faqQuestionsChecked, faqAnswersInInitialHtml, interactiveOnlyFaqAnswers };

  const servicesHtml = await htmlFor('/services');
  const htmlSitemap = await htmlFor('/sitemap');
  const serviceList = schemaNodes(servicesHtml).find(node => hasType(node, 'ItemList'));
  assert.ok(serviceList, 'Service directory ItemList is required');
  const englishBoundaries = [];
  for (const route of specialists) {
    requireLink(servicesHtml, '/services', route);
    requireLink(htmlSitemap, '/sitemap', route);
    assert.equal(serviceList.itemListElement.filter(item => item.url === `${origin}${route}`).length, 1, `Directory schema specialist item: ${route}`);
    assert.ok(!routesByPath.has(`/ar${route}`), `Untranslated route published: /ar${route}`);
    assert.ok(!sitemapUrls.includes(`${origin}/ar${route}`), `Untranslated XML sitemap route: ${route}`);
    const html = await htmlFor(route);
    assert.ok(!tags(html, 'link').some(tag => /^ar(?:-|$)/i.test(attribute(tag, 'hreflang') ?? '')), `Untranslated hreflang alternate: ${route}`);
    assert.ok(!anchors(html).some(href => new URL(href, origin).pathname === `/ar${route}`), `Untranslated language-switch link: ${route}`);
    for (const arabicDirectory of ['/ar/services', '/ar/sitemap']) {
      assert.ok(!anchors(await htmlFor(arabicDirectory)).some(href => new URL(href, origin).pathname === `/ar${route}`), `${arabicDirectory} links untranslated route: ${route}`);
    }
    englishBoundaries.push(route);
  }
  report.checks.specialistDirectoriesAndEnglishOnly = englishBoundaries;

  // The new pages intentionally omit FAQPage schema. Their real FAQ answers
  // must still exist in prerendered HTML and be associated with the disclosure
  // button, rather than be client-only or removed when the accordion is shut.
  const electronicsSource = ts.transpileModule(await readFile(path.join(root, 'src/data/electronicsServices.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  const { electronicsServices } = await import(`data:text/javascript;base64,${Buffer.from(electronicsSource).toString('base64')}`);
  let specialistFaqAnswers = 0;
  for (const service of electronicsServices) {
    const route = `/services/${service.slug}`;
    assert.ok(specialists.includes(route), `Unexpected specialist owner: ${route}`);
    const html = await htmlFor(route);
    assert.equal(schemaNodes(html).filter(node => hasType(node, 'FAQPage')).length, 0, `Do not introduce new FAQ schema on ${route}`);
    const body = visibleMarkup(html);
    const buttons = [...body.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)];
    const regionStarts = [...body.matchAll(/<div\b[^>]*>/gi)].filter(match => attribute(match[0], 'role') === 'region');
    assert.ok(service.faqs?.length, `Specialist FAQs missing: ${route}`);
    for (const faq of service.faqs) {
      const trigger = buttons.find(match => text(match[2]) === text(faq.question));
      assert.ok(trigger, `Missing rendered FAQ trigger: ${route}: ${faq.question}`);
      assert.ok(attribute(trigger[1], 'aria-expanded') !== undefined, `FAQ trigger lacks expansion state: ${route}`);
      const triggerId = attribute(trigger[1], 'id')?.trim();
      assert.ok(triggerId, `FAQ trigger requires an ID for its answer relationship: ${route}: ${faq.question}`);
      const controlledId = attribute(trigger[1], 'aria-controls')?.trim();
      // Radix SSR labels its region with the trigger ID; aria-controls is added
      // after hydration. Accept that valid reverse relationship while requiring
      // real IDs on both sides, never treating two absent attributes as a match.
      const matchingRegions = regionStarts.filter(match => {
        const regionId = attribute(match[0], 'id')?.trim();
        const labelledBy = (attribute(match[0], 'aria-labelledby') ?? '').split(/\s+/);
        return Boolean(regionId && labelledBy.includes(triggerId) && (!controlledId || regionId === controlledId));
      });
      assert.equal(matchingRegions.length, 1, `FAQ trigger needs exactly one labelled prerendered answer: ${route}: ${faq.question}`);
      const [region] = matchingRegions;
      const regionContent = body.slice(region.index + region[0].length).split('</div>')[0];
      assert.ok(text(regionContent).includes(text(faq.answer)), `FAQ answer omitted or mismatched in initial HTML: ${route}: ${faq.question}`);
      specialistFaqAnswers++;
    }
  }
  report.checks.specialistFaqContent = { answersInInitialHtmlWithAccessibleControls: specialistFaqAnswers, noNewFaqSchema: true };

  const relationships = [
    ...specialists.map(route => [electrical, route]),
    ...specialists.map(route => [route, electrical]),
    [electrical, camera], [bentley, camera], [camera.split('#')[0], bentley],
    [specialists[0], '/brands/cadillac-service-dubai'],
    [specialists[1], '/brands/mercedes-benz-service-dubai'],
    [specialists[2], '/brands/mercedes-benz-service-dubai'],
    [specialists[2], specialists[1]],
    ['/services/paint-protection-film', '/services/ceramic-coating'],
    ['/services/ceramic-coating', '/services/paint-protection-film'],
  ];
  for (const [from, to] of relationships) requireLink(await htmlFor(from), from, to);
  report.checks.contextualRelationships = relationships.map(([from, to]) => ({ from, to }));

  for (const [route, expectedTitle, expectedH1] of [
    ['/services/paint-protection-film', 'PPF Dubai | Paint Protection Film for Cars | DIGI-TEC', 'Paint Protection Film (PPF) Dubai'],
    ['/services/ceramic-coating', 'Ceramic Coating Dubai | Car Paint Protection | DIGI-TEC', 'Ceramic Coating Dubai'],
  ]) {
    const checked = report.owners.find(item => item.canonical === `${origin}${route}`);
    assert.equal(checked.title, expectedTitle, `Protection title must stay stable: ${route}`);
    assert.equal(checked.h1, expectedH1, `Protection H1 must stay stable: ${route}`);
  }
  const tyreOwner = report.owners.find(item => item.cluster === 'Tyres');
  assert.match(tyreOwner.h1, /\bTyre\b/);
  assert.match(text(visibleMarkup(await htmlFor(tyres))), /\btire repair\b/i, 'American search variant should be explained naturally');
  assert.equal(tyreOwner.canonical, `${origin}${tyres}`);
  report.checks.protectionIdentityAndTyreOwner = true;

  // Use the actual generated edge handler with actual prerendered HTML as its
  // origin. A mock origin that always says 200 would hide missing-page faults.
  const { handleRequest } = await import(`${pathToFileURL(path.join(root, 'dist/_worker.js')).href}?master=${Date.now()}`);
  const assetFetch = async request => {
    const pathname = new URL(request.url).pathname;
    try {
      const html = pathname === '/404.html'
        ? await readFile(path.join(root, 'dist/404.html'), 'utf8')
        : await htmlFor(pathname);
      return new Response(request.method === 'HEAD' ? null : html, { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } });
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      return new Response(null, { status: 404 });
    }
  };
  const env = { ASSETS: { fetch: assetFetch } };
  let directResponses = 0;
  for (const [, owner] of owners) {
    const route = owner.split('#')[0];
    for (const method of ['GET', 'HEAD']) {
      const response = await handleRequest(new Request(`${origin}${route}`, { method }), env);
      assert.equal(response.status, 200, `Owner edge response ${method}: ${route}`);
      assert.doesNotMatch(response.headers.get('x-robots-tag') ?? '', /noindex/i, `Owner edge indexability: ${route}`);
      if (method === 'HEAD') assert.equal(await response.text(), '', `HEAD response body: ${route}`);
      else assert.deepEqual(canonicals(await response.text()), [`${origin}${route}`], `Edge served wrong owner HTML: ${route}`);
      directResponses++;
    }
  }
  let tyreRedirectCases = 0;
  for (const alias of ['/tire-repair', '/services/tire-repair']) {
    for (const host of [origin, 'http://www.digitecme.com']) {
      for (const suffix of ['', '/']) {
        for (const method of ['GET', 'HEAD']) {
          const query = '?utm_source=seo%20test&gclid=abc&utm_source=second';
          const response = await handleRequest(new Request(`${host}${alias}${suffix}${query}`, { method }), env);
          assert.equal(response.status, 308, `Legacy tyre URL permanent redirect: ${alias}`);
          assert.equal(response.headers.get('location'), `${origin}${tyres}${query}`, `Tyre redirect must preserve attribution: ${alias}`);
          const final = await handleRequest(new Request(response.headers.get('location'), { method }), env);
          assert.equal(final.status, 200, `Tyre redirect must end in one hop: ${alias}`);
          if (method === 'GET') assert.deepEqual(canonicals(await final.text()), [`${origin}${tyres}`]);
          else assert.equal(await final.text(), '');
          tyreRedirectCases++;
        }
      }
    }
  }
  for (const route of specialists) {
    const response = await handleRequest(new Request(`${origin}/ar${route}`), env);
    assert.notEqual(response.status, 200, `Do not expose English content at an Arabic URL: ${route}`);
  }
  report.checks.generatedWorker = { directResponses, tyreRedirectCases, untranslatedSpecialistsNotServedAs200: true };

  // Preserve the established conversion contract tested by validate-query-release.
  const tracker = ts.transpileModule(await readFile(path.join(root, 'src/lib/whatsapp-tracking.ts'), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
  const previousWindow = globalThis.window;
  try {
    globalThis.window = { location: { origin, pathname: specialists[0] }, dataLayer: [] };
    const { trackWhatsAppClick } = await import(`data:text/javascript;base64,${Buffer.from(tracker).toString('base64')}`);
    trackWhatsAppClick('https://wa.me/97143402223?text=TEST_NAME%20TEST_VIN%20TEST_PHONE#private');
    trackWhatsAppClick('https://example.com/not-whatsapp');
    assert.deepEqual(globalThis.window.dataLayer, [{ event: 'whatsapp_click', link_url: 'https://wa.me/97143402223', page_path: specialists[0] }]);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
  }
  report.checks.whatsappSingleEventAndMessagePrivacy = true;
  report.passed = true;
} catch (error) {
  report.errors.push({ message: error.message, stack: error.stack });
  process.exitCode = 1;
} finally {
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
}

if (report.passed) console.log(`Master SEO validation passed: ${report.owners.length} owners, ${report.checks.initialHtml.internalLinksChecked} internal links, ${report.checks.generatedWorker.tyreRedirectCases} tyre redirect cases and specialist language/schema/analytics checks.`);
else console.error(`Master SEO validation failed: ${report.errors.map(error => error.message).join('; ')}. See ${output}`);
