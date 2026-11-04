import assert from 'node:assert/strict';
import { mkdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// Synthetic fixtures exist only in this process. They are never inserted into
// source collections, routing, public files, sitemap entries or generated HTML.
const root = process.cwd();
const origin = 'https://digitecme.com';
const dist = path.join(root, 'dist');
const reportPath = path.join(root, 'outputs/ai-visibility-2026-11-04/mercedes-evidence.json');
const report = {
  passed: false,
  checkedAt: new Date().toISOString(),
  fixtureScope: 'Synthetic in-memory fixtures only; no case study is published by this validator.',
  checks: [],
  publishedStudies: [],
  checkedRouteOwners: [],
  checkedLocalImages: [],
  failures: [],
};

const decode = (value) => String(value).replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)]
  .map(([, key, double, single]) => [key.toLowerCase(), decode(double ?? single)]));
const canonicalUrls = (html) => [...html.matchAll(/<link\b[^>]*>/gi)]
  .map(([tag]) => attrs(tag)).filter((tag) => tag.rel?.split(/\s+/).includes('canonical')).map((tag) => tag.href);
const checkAnchor = (html, hash, label) => {
  if (!hash) return;
  const id = decodeURIComponent(hash.slice(1));
  assert.ok([...html.matchAll(/<[a-z][^>]*>/gi)].some(([tag]) => attrs(tag).id === id), `${label}: fragment must identify an existing element: ${hash}`);
};
const internalTarget = (href) => {
  assert.equal(typeof href, 'string', 'Related page path must be a string');
  assert.match(href, /^\/(?!\/)/, 'Related page must use a root-relative internal path');
  const target = new URL(href, origin);
  assert.equal(target.origin, origin, 'Related page must stay on the website');
  assert.equal(target.search, '', 'Related page must not include query parameters');
  assert.equal(target.pathname, decodeURIComponent(target.pathname), 'Related page must use its unencoded canonical route path');
  return target;
};
const outputFileFor = (route) => path.join(dist, route.replace(/^\//, ''), 'index.html');
const htmlCache = new Map();
const htmlFor = async (route) => {
  if (!htmlCache.has(route)) htmlCache.set(route, await readFile(outputFileFor(route), 'utf8'));
  return htmlCache.get(route);
};
const check = (label, run) => {
  run();
  report.checks.push(label);
};

try {
  const source = await readFile(path.join(root, 'src/data/mercedesCaseStudies.ts'), 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  }).outputText;
  const { validateMercedesCaseStudy, defineMercedesCaseStudies, mercedesCaseStudies } = await import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`
  );

  const fixture = {
    slug: 'synthetic-validation-fixture',
    title: 'Synthetic private validation fixture',
    metaTitle: 'Synthetic private validation fixture',
    metaDescription: 'Synthetic repair record used exclusively for validator assertions.',
    datePublished: '2026-10-02',
    vehicle: 'Synthetic Mercedes fixture',
    modelYear: '2018',
    enginePlatform: 'Synthetic platform',
    customerComplaint: 'Synthetic recorded complaint',
    symptoms: ['Synthetic symptom'],
    initialInspection: ['Synthetic inspection finding'],
    diagnosticProcess: ['Synthetic documented diagnostic check'],
    faultIdentified: 'Synthetic identified cause',
    repairPerformed: ['Synthetic recorded repair'],
    partsComponentsUsed: [],
    testingAfterRepair: ['Synthetic recorded verification'],
    result: 'Synthetic verification outcome',
    workshopImages: [{ src: '/images/synthetic-validation-fixture.jpg', alt: 'Synthetic image description', caption: 'Synthetic image caption' }],
    relatedService: { label: 'Synthetic service link', path: '/services/mercedes-suspension-repair-dubai' },
    relatedModel: { label: 'Synthetic model link', path: '/blog/mercedes-e-class-service-dubai-guide' },
    relatedProblemGuide: { label: 'Synthetic problem link', path: '/mercedes/problems/airmatic-malfunction' },
    evidence: { repairCompletedOn: '2026-10-01', workshopRecordsVerified: true, publicationApproved: true, originalMediaApproved: true },
  };
  check('Complete synthetic evidence passes the publication contract', () => assert.deepEqual(validateMercedesCaseStudy(fixture), []));
  check('An empty collection remains empty', () => assert.deepEqual(defineMercedesCaseStudies([]), []));
  check('A complete collection is accepted', () => assert.equal(defineMercedesCaseStudies([fixture]).length, 1));

  const rejections = [
    ['Missing evidence', { evidence: undefined }],
    ['Missing record verification', { evidence: { ...fixture.evidence, workshopRecordsVerified: false } }],
    ['Missing publication approval', { evidence: { ...fixture.evidence, publicationApproved: false } }],
    ['Missing media approval', { evidence: { ...fixture.evidence, originalMediaApproved: false } }],
    ['Empty diagnostic findings', { diagnosticProcess: [] }],
    ['Empty post-repair checks', { testingAfterRepair: [] }],
    ['Blank title', { title: ' ' }],
    ['Placeholder outcome', { result: 'TODO' }],
    ['Invalid calendar date', { datePublished: '2026-02-30' }],
    ['Modification preceding publication', { dateModified: '2026-09-30' }],
    ['Repair occurring after publication', { evidence: { ...fixture.evidence, repairCompletedOn: '2026-10-03' } }],
    ['Missing original image', { workshopImages: [] }],
    ['External image', { workshopImages: [{ ...fixture.workshopImages[0], src: 'https://example.com/synthetic.jpg' }] }],
    ['Image path traversal', { workshopImages: [{ ...fixture.workshopImages[0], src: '/images/../synthetic.jpg' }] }],
    ['Missing image caption', { workshopImages: [{ ...fixture.workshopImages[0], caption: '' }] }],
    ['Missing image description', { workshopImages: [{ ...fixture.workshopImages[0], alt: '' }] }],
    ['Null image entry', { workshopImages: [null] }],
    ['Invalid parts list', { partsComponentsUsed: null }],
    ['Invalid slug', { slug: '../synthetic' }],
    ['External related owner', { relatedService: { label: 'Synthetic external target', path: '//example.com' } }],
    ['Query-bearing related owner', { relatedService: { label: 'Synthetic query target', path: '/services?draft=1' } }],
    ['Missing reviewer name', { evidence: { ...fixture.evidence, reviewedBy: { name: '', role: 'Synthetic role', reviewedOn: '2026-10-02' } } }],
    ['Reviewer date preceding repair', { evidence: { ...fixture.evidence, reviewedBy: { name: 'Synthetic reviewer', role: 'Synthetic role', reviewedOn: '2026-09-30' } } }],
    ['Reviewer date following publication', { evidence: { ...fixture.evidence, reviewedBy: { name: 'Synthetic reviewer', role: 'Synthetic role', reviewedOn: '2026-10-03' } } }],
  ];
  for (const [label, change] of rejections) {
    check(`${label} is rejected`, () => {
      const record = { ...fixture, ...change };
      assert.ok(validateMercedesCaseStudy(record).length > 0, label);
      assert.throws(() => defineMercedesCaseStudies([record]), /Mercedes case study/, label);
    });
  }
  check('Duplicate slugs are rejected', () => assert.throws(() => defineMercedesCaseStudies([fixture, fixture]), /slug must be unique/));
  check('Supplied valid reviewer attribution is accepted', () => assert.deepEqual(validateMercedesCaseStudy({
    ...fixture,
    evidence: { ...fixture.evidence, reviewedBy: { name: 'Synthetic reviewer', role: 'Synthetic role', reviewedOn: '2026-10-02' } },
  }), []));
  check('Existing owner fragments are accepted', () => checkAnchor('<section id="synthetic-existing-anchor"></section>', '#synthetic-existing-anchor', 'Synthetic anchor'));
  check('Missing owner fragments are rejected', () => assert.throws(() => checkAnchor('<section id="synthetic-existing-anchor"></section>', '#synthetic-missing-anchor', 'Synthetic anchor'), /existing element/));
  check('External owner URLs are rejected', () => assert.throws(() => internalTarget('https://example.com/'), /root-relative/));
  check('Protocol-relative owner URLs are rejected', () => assert.throws(() => internalTarget('//example.com/'), /root-relative/));
  check('Owner query parameters are rejected', () => assert.throws(() => internalTarget('/services?draft=1'), /query parameters/));

  const { getPublicRoutes } = await import(pathToFileURL(path.join(root, 'dist-server/entry-server.js')).href);
  const routes = new Map(getPublicRoutes().map((route) => [route.path, route]));
  const checkedOwners = new Set();
  const checkedImages = new Set();
  const publishedPaths = new Set(mercedesCaseStudies.map((study) => `/mercedes/case-studies/${study.slug}`));
  assert.deepEqual(
    [...routes.keys()].filter((route) => route.startsWith('/mercedes/case-studies/')).sort(),
    [...publishedPaths].sort(),
    'The built route manifest must contain exactly the approved source case studies',
  );

  for (const study of mercedesCaseStudies) {
    assert.deepEqual(validateMercedesCaseStudy(study), [], `${study.slug}: publication contract`);
    const studyPath = `/mercedes/case-studies/${study.slug}`;
    assert.equal(routes.get(studyPath)?.indexable, true, `${study.slug}: published case must be indexable`);
    const caseHtml = await htmlFor(studyPath);
    assert.deepEqual(canonicalUrls(caseHtml), [`${origin}${studyPath}`], `${study.slug}: case has exactly one self canonical`);

    for (const field of ['relatedService', 'relatedModel', 'relatedProblemGuide']) {
      const target = internalTarget(study[field].path);
      const route = routes.get(target.pathname);
      assert.ok(route?.indexable, `${study.slug}: ${field} must identify an existing indexable owner: ${target.pathname}`);
      const targetHtml = await htmlFor(target.pathname);
      assert.deepEqual(canonicalUrls(targetHtml), [`${origin}${target.pathname}`], `${study.slug}: ${field} must use a self-canonical owner`);
      checkAnchor(targetHtml, target.hash, `${study.slug}: ${field}`);
      checkedOwners.add(target.pathname + target.hash);
    }
    for (const image of study.workshopImages) {
      const localPath = path.resolve(dist, decodeURIComponent(image.src).replace(/^\//, ''));
      assert.ok(localPath.startsWith(`${dist}${path.sep}`), `${study.slug}: image must stay inside dist`);
      assert.ok((await stat(localPath)).isFile(), `${study.slug}: image must exist in the shipped build: ${image.src}`);
      checkedImages.add(image.src);
    }
    report.publishedStudies.push({ slug: study.slug, path: studyPath, imageCount: study.workshopImages.length });
  }
  report.checks.push('Built case routes match the approved source collection');
  report.checkedRouteOwners = [...checkedOwners].sort();
  report.checkedLocalImages = [...checkedImages].sort();
  report.passed = true;
} catch (error) {
  report.failures.push(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
} finally {
  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
}

console.log(`${report.passed ? 'PASS' : 'FAIL'} Mercedes evidence: ${report.checks.length} checks, ${report.publishedStudies.length} published cases, ${report.checkedRouteOwners.length} linked owners, ${report.checkedLocalImages.length} local images.`);
for (const failure of report.failures) console.error(failure);
