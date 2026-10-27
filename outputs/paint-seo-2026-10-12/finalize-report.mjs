import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
const root = process.cwd().replaceAll('\\', '/');
const output = `${root}/outputs/paint-seo-2026-10-12`;
const read = async file => JSON.parse(await readFile(file, 'utf8'));
const build = await read('release-qa.local/build-results.json');
const qa = await read(`${output}/paint-route-qa.json`);
const browser = await read(`${output}/browser/hub-browser-results.json`);
const serviceBrowser = await read('release-qa.local/integration/browser-results.json');
const journeys = await read('paint-care-integration-qa.local/journey-results.json');
const checks = await read(`${output}/verification/results.json`);
if (![build, qa, browser, serviceBrowser, journeys].every(result => result.passed) || checks.some(check => check.exitCode !== 0)) throw new Error('Do not finalize while required QA is incomplete');
if ([browser, serviceBrowser, journeys].some(result => result.sourceSha256 !== build.sourceSha256)) throw new Error('Browser evidence does not match final source');
await mkdir(`${output}/verification`, { recursive: true });
for (const [source, destination] of [
  ['release-qa.local/build-results.json', 'build-results.json'],
  ['release-qa.local/source-manifest.json', 'source-manifest.json'],
  ['release-qa.local/integration/browser-results.json', 'service-browser-results.json'],
  ['paint-care-integration-qa.local/journey-results.json', 'service-journey-results.json'],
  ['docs/seo/paint-care-cluster-audit.json', 'paint-care-cluster-audit.json'],
  ['outputs/seo-2026-09-16/master-validation.json', 'master-validation.json'],
]) await copyFile(source, `${output}/verification/${destination}`);
for (let step = 1; step <= build.steps.length; step++) await copyFile(`release-qa.local/build-${step}.log`, `${output}/verification/build-${step}.log`);
// Keep the prior September report intact after the legacy validator writes to it.
const historical = spawnSync('git', ['show', 'HEAD:outputs/seo-2026-09-16/master-validation.json'], { windowsHide: true });
if (historical.status === 0) await writeFile('outputs/seo-2026-09-16/master-validation.json', historical.stdout);
const before = await read(`${output}/before/metadata.json`);
const escape = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const link = (file, label = file) => `[${label}](${root}/${file})`;
const metadataTable = ['| URL | Field | Before | After |', '|---|---|---|---|'];
const strip = value => value?.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&quot;', '"').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
for (const record of before) {
  const html = await readFile(path.join('dist', record.route, 'index.html'), 'utf8');
  const after = { title: strip(html.match(/<title>(.*?)<\/title>/s)?.[1]), description: strip(html.match(/<meta name="description" content="([^"]*)"/)?.[1]), canonical: html.match(/<link rel="canonical" href="([^"]*)"/)?.[1], h1: strip(html.match(/<h1[^>]*>(.*?)<\/h1>/s)?.[1]) };
  for (const field of ['title', 'description', 'canonical', 'h1']) metadataTable.push(`| ${record.route} | ${field} | ${escape(record[field])} | ${escape(after[field])} |`);
}
const explanations = {
  'src/App.tsx': 'Routes the existing English and Arabic protection-hub URLs to the bilingual hub; includes its stylesheet in initial HTML. No new public URLs.',
  'src/components/Header.tsx': 'Restores the saved theme after hydration, keeping server and first client header markup consistent. Prevents React hydration errors when light theme is saved.',
  'src/data/services.ts': 'Synchronizes hub/service directory content and metadata, removes unverified stage/layer/film-feature claims, and reuses optimized PPF/ceramic photos with descriptive alt text.',
  'src/data/ppfContent.ts': 'Installation-focused title/description and 14 retained FAQs; removes unsupported self-healing/finish implications.',
  'src/data/ceramicCoatingContent.ts': 'Service-led description and clearer correction-versus-coating FAQ; preserves 16 questions.',
  'src/data/paintCorrectionContent.ts': 'Commercial polishing metadata and clearer distinction from long-term protection; preserves 16 questions.',
  'src/data/aiGuidePostsExtra.ts': 'Keeps the comparison article educational, improves its metadata/preparation/aftercare and links to appropriate service owners.',
  'src/data/blogPosts.ts': 'Improves the existing UAE ceramic guide with preparation, realistic care and comparison/service links.',
  'src/i18n/ar-protection-services.ts': 'Adds Arabic PPF coverage/preparation/aftercare and ceramic preparation/curing/care sections, specific quote labels and translated photo alt text; removes unverified film feature.',
  'src/i18n/ar-general-blog-content.ts': 'Refines Arabic comparison guidance and adds localized service-owner links.',
  'src/i18n/ar-service-blog-content.ts': 'Adds Arabic coating preparation/aftercare and localized service-owner links.',
  'src/i18n/ar-blog.ts': 'Synchronizes targeted Arabic article metadata and actual content modification dates.',
  'src/lib/route-manifest.ts': 'Sets 12 October modification dates only for the changed paint-care pages/articles and affected directories.',
  'src/pages/BlogPost.tsx': 'Enables the reviewed contextual links for exactly the two Arabic paint-care article slugs.',
  'src/pages/PpfPage.tsx': 'Clarifies installation, full versus partial coverage and preparation; adds an early hub link while preserving form, CTA and FAQ behavior.',
  'src/pages/CeramicCoatingPage.tsx': 'Clarifies polishing versus coating and adds visible curing/aftercare guidance and hub comparison link.',
  'src/pages/PaintCorrectionPage.tsx': 'Adds focused machine-polishing/preparation and aftercare sections and contextual hub/guide links; preserves assessment form and photos.',
  'src/pages/ServicePage.tsx': 'Limits protection-specific schema descriptions, hero image loading, quote labels and sidebar copy to protection pages. Replaces inappropriate parts/fluids/diagnostics copy on existing Arabic protection pages.',
  'scripts/validate-ppf.mjs': 'Checks the revised installation title without weakening indexability, schema, image, linking or claim checks.',
  'scripts/validate-paint-correction.mjs': 'Checks revised polishing metadata and truthful current sitemap lastmod; retains its content/schema safeguards.',
  'scripts/validate-protection-release.mjs': 'Updates expected commercial titles in combined client/SSR release verification.',
  'scripts/validate-master-seo.mjs': 'Updates the expected PPF title in the existing broad SEO regression check.',
  'scripts/test-ppf-browser.mjs': 'Updates expected PPF title for the retained browser suite.',
  'scripts/test-paint-correction-browser.mjs': 'Updates expected polishing title for the retained browser suite.',
  'scripts/test-protection-release-browser.mjs': 'Validates normalized initial H1 text, allowing the existing nested span markup while preserving exact H1 wording.',
  'public/sitemap.xml': 'Regenerated by the existing production build with the same 1,005 canonical URLs and scoped updated modification dates.',
  'cloudflare/routing-response-data.js': 'Regenerated local response-content data for updated headings/metadata; canonical path inventory and redirect rules remain unchanged. No infrastructure deployment.',
  'docs/seo/paint-care-cluster-audit.json': 'Refreshed existing cluster QA evidence for this build.',
  'docs/seo/protection-release-validation.json': 'Refreshed combined release validator results and client hash.',
  'docs/seo/query-release-validation.json': 'Refreshed cross-site query/link/routing validation evidence.',
  'docs/seo/route-schema-matrix.csv': 'Regenerated per-route schema inventory for the updated hub and articles.',
};
const diff = spawnSync('git', ['-c', 'core.quotePath=false', 'diff', '--name-only'], { encoding: 'utf8', windowsHide: true });
if (diff.status !== 0) throw new Error('Cannot enumerate changed files');
const modified = diff.stdout.trim().split(/\r?\n/).filter(Boolean);
for (const file of modified) if (!explanations[file]) throw new Error(`Unexplained changed file: ${file}`);
const added = [
  ['src/data/paintProtectionContent.ts', 'Bilingual hub metadata, ten content sections, eight comparison rows and six original FAQs per language.'],
  ['src/pages/PaintProtectionPage.tsx', 'Focused bilingual comparison hub at the existing URLs with shared SEO/schema/header/footer, contextual links, native FAQs and tracked quote/call CTAs.'],
  ['src/styles/paint-protection.css', 'Scoped responsive dark/light and RTL styles, contained comparison-table scrolling, focus states and mobile contact bar.'],
];
await writeFile(`${output}/implementation-file-manifest.json`, JSON.stringify({ modified, added: added.map(([file]) => file), preservedBackend: 'supabase/functions/mcp/index.ts', preservedHistoricalEvidence: 'outputs/seo-2026-09-16/master-validation.json', finalSourceSha256: build.sourceSha256 }, null, 2));
const report = `# DIGI-TEC paint protection SEO implementation

Implemented locally on 12 October 2026 (Asia/Dubai). Four English commercial pages, the three existing Arabic service equivalents and two educational articles in both languages were improved. Existing URLs, business identity, enquiry forms, phone/WhatsApp endpoints and conversion events are retained. No commit, push, deployment, live enquiry or production infrastructure change was performed.

## A. Audit findings and evidence

The project uses React 18, TypeScript, Vite and React Router. English and Arabic routes are declared in App.tsx. The production pipeline renders the real React route tree into static HTML with an SSR metadata collector, then builds local hosting guards and validates the outputs. Content and metadata are available without JavaScript. PPF, ceramic and polishing already had dedicated English pages; the paint-protection hub and Arabic PPF/ceramic used the generic service template. The polishing page has no Arabic equivalent.

| Finding | Evidence | Implemented response / implication |
|---|---|---|
| Hub under-emphasized the requested paint-protection intent | Before title: “Car Paint Care Dubai”; H1: “Car Paint Care & Protection Options in Dubai” | Commercial protection title/H1, clear PPF/coating/correction hierarchy and comparison table |
| Generic workshop boilerplate on paint pages | Generic sidebar offered “Proposed parts and fluids” and “inspection and diagnostics” | Focused bilingual hub; existing Arabic PPF/ceramic sidebar now discusses product, preparation, covered surfaces and paint condition |
| Hub data implied unverified stages/layers and peripheral services | Hub includes listed single/multi-stage correction, multi-layer coating, touch-up, headlights and interior protection | Removed unsupported package implications from the relevant hub/directory data; no prices or specs invented |
| PPF-specific claims lacked installed-product evidence | PPF copy discussed self-healing and finish choices; no verified product/SKU record found | Removed those implications from the priority pages, Arabic PPF copy and comparison guide; product suitability stays quote-specific |
| Service pages already had useful architecture | Existing dedicated pages included preparation, limits, FAQ content, dimensions, responsive images and enquiry controls | Focused refinements preserve working components and premium layout |
| Arabic guide links existed in data but renderer excluded them | BlogPost render gate allowed reviewed Mercedes articles only | Added exactly the two reviewed Arabic paint-care articles to that gate; verified links inside each article |
| Saved light theme caused hydration errors | Browser checks captured React #418/#422 with persisted light preference | Shared Header now starts with matching SSR markup, then restores preference after hydration |
| Existing canonicals, indexability and hreflang were sound | Initial/final HTML and repository-wide validators | Reused shared helpers and preserved self canonicals and real English/Arabic pairs |

These observations establish content and implementation gaps. They do not establish a causal ranking loss or keyword cannibalization. No pages were deleted, merged, redirected or cross-canonicalized.

### Search Console baseline

The (1) export is the sitewide Web / Last 3 months baseline: **515 clicks, 108,445 impressions, calculated CTR 0.4749%**. The other export adds the **Product snippets** filter: **0 clicks, 122 impressions**. Both Chart sheets cover **10 July–9 October 2026**, with 92 daily rows. They are different scopes and must not be added together.

All seven sheets were inspected: Chart (the date dimension), Queries, Pages, Countries, Devices, Search appearance and Filters. There is no separate Dates sheet. Chart/Countries/Devices reconcile to the sitewide total. Queries and Pages each export 1,000 rows and have incomplete/differently aggregated totals. Query and page tables are independent, so no query-to-page ranking assignment can be inferred from them. Exact polishing queries/URL were absent from the exported top rows, which does not establish zero activity.

| Page | Clicks | Impressions | Calculated CTR | Average position | Source range |
|---|---:|---:|---:|---:|---|
| /services/paint-protection-dubai | 1 | 3,957 | 0.0253% | 38.15 | Pages!A67:E67 |
| /services/paint-protection-film | 3 | 1,016 | 0.2953% | 39.14 | Pages!A30:E30 |
| /services/ceramic-coating | 0 | 512 | 0% | 32.40 | Pages!A167:E167 |
| /blog/ceramic-coating-vs-ppf-dubai | 0 | 168 | 0% | 21.81 | Pages!A192:E192 |

UAE search accounts for 436 clicks / 100,289 impressions. Mobile records 308 clicks / 37,621 impressions versus desktop 204 / 70,141, making mobile enquiry usability a useful priority. See ${link('outputs/paint-seo-2026-10-12/gsc-baseline-report.txt', 'complete baseline and exact source ranges')} and ${link('outputs/paint-seo-2026-10-12/gsc-baseline-analysis.json', 'extracted baseline evidence')}. Original workbook hashes were verified unchanged.

Sources: [sitewide workbook](<C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-12 (1).xlsx>) and [Product snippets workbook](C:/Users/ADMIN/Downloads/digitecme.com-Performance-on-Search-2026-10-12.xlsx). Google's [Search Console aggregation documentation](https://support.google.com/webmasters/answer/17011364?hl=en) and [query/table limits](https://support.google.com/webmasters/answer/17010575?hl=en) explain why independent dimension sums differ.

## B. Keyword ownership map

This is an editorial ownership map. It is not a claim that these URLs currently rank for each query.

| Primary keyword | Canonical owner | Secondary targets | Supporting pages / intent |
|---|---|---|---|
| car paint protection Dubai | /services/paint-protection-dubai | paint protection Dubai; car paint protection; vehicle paint protection Dubai; paint protection coating as a broad comparison | PPF/coating/correction owners and both guides. Compare options, then request a suitable quote. |
| PPF Dubai | /services/paint-protection-film | paint protection film Dubai; car PPF Dubai; PPF installation Dubai; clear paint protection film; paint protection film near me | Hub and comparison guide. Film coverage, preparation, installation and aftercare. |
| ceramic coating Dubai | /services/ceramic-coating | car ceramic coating Dubai; ceramic paint protection Dubai; ceramic coating for cars; ceramic paint protection | Hub, UAE coating guide and comparison guide. Surface coating and preparation; polishing queries explained without treating it as coating. |
| car polishing Dubai | /services/car-polishing-dubai | paint correction Dubai; car paint polishing Dubai; machine polishing Dubai; car polishing service Dubai | Hub, coating page, comparison guide and body-repair owner for deeper damage. Assess suitable correction rather than promise complete scratch removal. |

The unqualified “ceramic paint protection” term belongs primarily to ceramic coating. The hub explains it as an option and routes users to that owner. “Ceramic coating car polish” is clarified on coating/preparation content as two different processes. Blogs retain informational comparison, preparation and care intent. The existing brand and body-repair pages provide context without changing commercial ownership. No separate detailing URL was created because a verified independent detailing owner was not identified for this scope.

Arabic owners remain /ar/services/paint-protection-dubai, /ar/services/paint-protection-film and /ar/services/ceramic-coating. The Arabic hub explicitly labels its link to the existing English polishing page; there is no fabricated Arabic polishing route or hreflang alternate.

## C. Implementation and every changed file

The hub now has the requested ten-part hierarchy: protection in Dubai, local exposure, available options, eight-factor comparison, selection guidance, preparation/application process, vehicle-specific considerations, aftercare, FAQs and quote request. It distinguishes physical film from coating and corrective polishing. Relative-cost discussion is qualified by coverage/preparation rather than invented packages or prices.

PPF content emphasizes installation, full versus partial coverage, preparation, film limits and care. Ceramic content separates correction from coating and makes application/curing/aftercare visible. Polishing content explains machine polishing and safe correction limits, followed by careful care and optional protection. All preserve their existing forms, photos, CTA endpoints and service routes.

| Modified file | Change |
|---|---|
${modified.map(file => `| ${link(file)} | ${explanations[file]} |`).join('\n')}

| New source file | Purpose |
|---|---|
${added.map(([file, explanation]) => `| ${link(file)} | ${explanation} |`).join('\n')}

This report is new repository documentation. Task-specific analysis, before snapshots, QA scripts, CSVs, logs and screenshots are under ${link('outputs/paint-seo-2026-10-12/implementation-file-manifest.json', 'the implementation/evidence directory')}. They are review evidence, not new public service pages. Pre-existing untracked outputs from earlier work were left intact.

The frontend build plugin rewrote an unrelated generated Supabase MCP function into an invalid Windows-path npm import and changed an SDK version. Its original pre-task contents were restored byte-for-byte, with ${link('outputs/paint-seo-2026-10-12/build-side-effects/preservation.json', 'preservation evidence')}. No database or backend behavior was changed. The legacy validator's September report was preserved after copying the current results to this task's verification folder.

## D. Before-and-after metadata

The table is extracted from saved pre-task HTML and final built HTML. Canonical URLs remain unchanged. Arabic PPF/ceramic titles, descriptions and H1s were already suitable and are retained; their content and CTA improvements still apply. Complete CSV: ${link('outputs/paint-seo-2026-10-12/metadata-before-after.csv', 'metadata comparison')}.

${metadataTable.join('\n')}

Both existing Arabic articles also have distinct final metadata and localized contextual owner links. See ${link('outputs/paint-seo-2026-10-12/arabic-article-final-metadata.csv', 'Arabic article metadata')} and ${link('outputs/paint-seo-2026-10-12/polishing-blog-notes.txt', 'their before/after editorial notes')}.

## E. Internal linking report

| Source | Destination / purpose |
|---|---|
| EN/AR protection hub | Respective PPF and ceramic owners; English polishing with an explicit language label on Arabic hub |
| EN/AR protection hub | Existing Mercedes-Benz, BMW, Porsche, Ferrari, Lamborghini, Rolls-Royce and Range Rover brand hubs |
| EN/AR protection hub | Respective ceramic-vs-PPF and UAE ceramic guides; body repair for deeper damage |
| PPF service | Early contextual protection-hub comparison link |
| Ceramic service | Hub comparison, polishing/preparation and PPF owner links |
| Polishing service | Contextual hub comparison and both educational guides |
| Both EN/AR guides | Correct language-specific hub, PPF and ceramic owners; educational guide cross-links |

The exact source, destination, anchor and CTA placement changes are in ${link('outputs/paint-seo-2026-10-12/main-link-diff.csv', 'the rendered-main link diff')}. It records 65 added and 106 removed link placements across captured before/after pages. These counts include changed anchor wording, section links and contact URLs, rather than 65 newly linked destination pages. The generic hub's broad brand/service boilerplate was replaced with a curated relevant set. Existing routes remain available.

The independent checker resolved 269 main internal link instances, including fragments and article owner links, and 49 unique local image assets. Existing home/service/brand discovery paths remain valid; the cluster regression scanned all 1,256 routes. No unnecessary redirect or canonical consolidation was introduced.

## F. Technical SEO and QA results

| Check actually executed | Result |
|---|---|
| Repository lint | Passed, 0 errors, 11 existing warnings (Fast Refresh export and hook dependency warnings) |
| App and Node TypeScript checks | Both passed |
| Full declared local production build | All 17 stages passed; real React prerender, client and server build, hosting/routing tests and SEO validators |
| Route inventory | Unchanged: 1,256 public routes; 1,005 indexable sitemap URLs |
| Broad master SEO and paint-care cluster validators | Passed |
| Initial HTML metadata/indexability | Seven service pages and four articles passed; one H1 and unique title/description/canonical per service |
| JSON-LD syntax and entity relationships | Passed; shared business identity reused, localized breadcrumb URLs valid; no invented ratings or product price offers added |
| Canonical/hreflang/sitemap | Passed; reciprocal real English/Arabic equivalents, self canonicals, scoped modification dates, no Arabic polishing alternate |
| Links/fragments/local images | Passed: 269 main internal links and 49 local image assets |
| Existing service browser routing | Passed: clean/tagged URLs, slash redirects, reloads, SPA navigation, back/forward, metadata/schema replacement and real 404 |
| Existing paint-care journeys | Passed: desktop/mobile, dark/light, all three dedicated pages, FAQs, PPF and assessment forms, keyboard interactions, phone and sanitized WhatsApp events |
| New hub and Arabic browser QA | Passed: 24 route/viewport/theme cases at 320/390/1440px, no document overflow, header clearance, native FAQs, saved-theme restoration, navigation and conversion events |
| No-JavaScript behavior | Both hub pages show their full table/FAQ content; retained service pages show content and keep client-only forms disabled |
| Unrelated-service regression | Build validators for oil change, suspension, transmission, social metadata and existing routing all passed |
| Visual review | Reviewed mobile hub dark/light, Arabic RTL comparison and desktop light-theme screenshots; readable text, contained horizontal table scrolling and visible contact controls |

The final source fingerprint is **${build.sourceSha256}**. ${link('outputs/paint-seo-2026-10-12/verification/build-results.json', 'Build evidence')}, ${link('outputs/paint-seo-2026-10-12/paint-route-qa.json', 'independent route QA')}, ${link('outputs/paint-seo-2026-10-12/verification/service-browser-results.json', 'routing browser results')}, ${link('outputs/paint-seo-2026-10-12/verification/service-journey-results.json', 'form/enquiry journey results')} and ${link('outputs/paint-seo-2026-10-12/browser/hub-browser-results.json', 'hub/Arabic browser results')} preserve actual execution records. Screenshots remain in the browser evidence directory.

Visible FAQ counts are EN hub 6, PPF 14, ceramic 16, polishing 16; AR hub 6, PPF 4, ceramic 4. The existing conservative schema helper publishes 3 of the 4 Arabic ceramic questions because it filters a durability answer containing a warranty term; every published answer matches visible initial HTML. FAQs remain useful customer content; no FAQ rich-result display is promised.

Arabic related-card/logo images still omit explicit intrinsic attributes in some instances, but their verified wrappers reserve layout space. These are recorded as advisories, not evidence of a layout-shift failure. New hub and priority hero images use dimensions and responsive local assets. No real-user Core Web Vitals or production field-performance improvement is claimed: CrUX/GSC field data requires production measurement. Browser tests blocked external requests and did not send real enquiries or production analytics events.

## G. Remaining opportunities requiring evidence or business work

1. Confirm actual installed film/coating products, available finishes, specifications, durability/curing guidance and written warranties before publishing product-specific claims. The current implementation makes no invented promises.
2. Supply real, consented installation/correction photography and documented projects. Existing photographs are not presented as proof of a correction result.
3. Export query-by-page GSC evidence using page/query filters to investigate ownership, rather than infer cannibalization from independent tables. URL Inspection is needed to check Google's selected canonical and current indexing.
4. Consider an Arabic polishing equivalent only with approved natural Arabic content and an intentionally supported route; none was created in this task.
5. Review Google Business Profile services, consistent workshop details and real customer feedback separately. Off-site changes were not performed.
6. Track qualified leads/booked work in the business's enquiry process. A WhatsApp click or opened draft is not a completed customer message or qualified lead.
7. Recheck mobile Core Web Vitals in field data after an approved release. Current local layout checks do not establish real-user LCP/INP/CLS.
8. The frontend build's MCP plugin side effect requires a separate tooling fix before any future automated backend publication. The backend file is preserved for this local deliverable.

## H. Measurement plan

Begin the post-change clock at the actual approved production release date, not the local implementation date. Record that date, source fingerprint and any other concurrent releases. Export a comparable 28-day pre-release baseline with Web search and consistent property/page/country/device filters. Keep the Product snippets segment separate.

| Checkpoint | What to measure | Decision |
|---|---|---|
| 28 days after release | Per-owner clicks, impressions, calculated CTR; priority query positions using page-filtered evidence; UAE mobile/desktop segments; indexation and canonical selection; organic contact events | Check crawl/index adoption, link discovery and obvious relevance or conversion issues. Compare with the same 28-day pre-release scope. |
| 56 days | Repeat matched-window metrics and query-page exports; review service versus guide ownership; count qualified enquiries and booked work alongside event volume | Refine titles/copy only when actual evidence indicates a gap. Confirm intent without assuming every ranking fluctuation is caused by this change. |
| 90 days | Review 28-day and cumulative trends, position distribution, branded versus non-branded queries, device CTR, enquiry quality and field performance | Prioritize verified product content, genuine case studies, useful Arabic work or off-site actions based on observed gaps. |

CTR is clicks / impressions, not an average of displayed daily percentages. Keep each page and keyword cluster separate, and track impressions alongside CTR/position. Existing events include whatsapp_chat_opened and telephone_link_clicked; retain sanitized attribution and page path. Match contact events to separately confirmed enquiries/bookings. Use seasonality and concurrent-site changes as context. No first-page position, traffic increase or enquiry growth is guaranteed.

### Primary technical references

- [Google localized-page guidance](https://developers.google.com/search/docs/specialty/international/localized-versions): real, reciprocal, fully qualified alternate URLs.
- [Schema.org Service](https://schema.org/Service): appropriate service entity vocabulary; existing shared AutoRepair/AutomotiveBusiness is retained.
- [Gtechniq coating limitations](https://gtechniq.com/faqs/about-gtechniq/) and [care guidance](https://gtechniq.com/how-to-wash-a-ceramic-coated-car/): general coating/maintenance distinctions only, not evidence that DIGI-TEC installs this brand.
- [3M machine-polishing information](https://www.3m.com/3M/en_US/p/d/b40065595/): general polishing/refinement context only, not an installed-product claim.

All changes are local and reviewable. Production publication remains subject to the user's explicit approval.
`;
await writeFile('docs/seo/paint-protection-2026-10-12.md', report);
console.log(`Saved report with ${modified.length} modified tracked files, ${added.length} new source files and final QA evidence.`);
