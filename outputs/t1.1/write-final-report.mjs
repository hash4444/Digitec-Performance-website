import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
const out=path.resolve('outputs/t1.1'), root=process.cwd().replaceAll('\\','/');
const json=async file=>JSON.parse(await fs.readFile(path.join(out,file),'utf8'));
const link=(label,file)=>`[${label}](${root}/${file})`;
const evidence=(label,file)=>link(label,'outputs/t1.1/'+file);
const [counts,architecture,models,brands,tuning,git,changed,build,browser]=await Promise.all([
 json('verification/sitewide-counts.json'),json('verification/architecture-preservation.json'),json('nine-model-rendered-factual-qa.json'),json('bmw-audi-broad-semantic-verification.json'),json('verification/tuning-validation.json'),json('git-state.json'),json('changed-workspace-files.json'),json('verification/build-results.json'),json('verification/browser-qa.json')]);
assert.ok(architecture.passed&&models.summary.passed&&brands.passed&&tuning.passed&&build.passed);
assert.ok(Object.values(counts.counts).every(n=>Number.isInteger(n)&&n===0));
assert.equal(git.stagedFiles.length,0);assert.equal(brands.unknownSentences,0);
assert.equal(browser.tests.length,12);
assert.ok(browser.tests.every(t=>t.documentOverflow!==true&&t.hasNumericPackageClaim!==true&&t.unverifiedTerm!==true));
assert.ok(browser.tests.filter(t=>t.test.includes('no-js')&&t.test.includes('s63')).every(t=>t.detailsOpen&&t.s63Rows===0));
const reasons={
 'cloudflare/routing-response-data.js':'Generated 404 HTML/asset references refreshed by production rebuild; route sets and routing behavior retained.',
 'outputs/t1/README.md':'Corrected the blank QA counts from actual original audit arrays and linked this superseding readiness report.',
 'outputs/t1/finalize-t1-evidence.mjs':'Fixed seven issue-array interpolations to print integer lengths.',
 'public/sitemap.xml':'Accurate modification dates on six existing pages whose content changed; URL set unchanged since T1.',
 'scripts/validate-tuning.mjs':'Strict unchanged-source checks, exact EN/AR public rows/work, explicit S63 suppression, exactly three DB11 omissions and GLC notes; existing canonical/FAQ/routing checks retained.',
 'src/components/TuningConfigurationDetails.tsx':'No-JavaScript S63 enquiry notice; DB11 exact-term filtering; per-stage GLC endpoint explanations.',
 'src/components/TuningConfigurator.tsx':'Interactive S63 enquiry presentation, DB11 exact-term filtering, GLC endpoint scope in both languages.',
 'src/data/bmwModelPages.ts':'M5 baseline-health bullet now concerns maintenance/repair.',
 'src/data/brandServices.ts':'Only BMW/Audi exhaust FAQ answers clarify repair scope without offering performance modifications.',
 'src/data/brands.ts':'Only BMW/Audi specialization badges omit performance; prior T1 changes preserved.',
 'src/data/t1UpdatedPaths.ts':'Six newly corrected existing paths receive the actual 2026-10-05 modification date.',
 'src/data/tuningModelPages.ts':'DB11 prose/FAQ withholds unverified reinforcement; GLC prose/FAQ explains verified price alternatives.',
 'src/data/tuningPublication.ts':'New shared publication policy; original raw configurator data remain unchanged.',
 'src/i18n/ar-brands.ts':'Only BMW/Audi Arabic specialization badges omit performance.',
 'src/pages/BrandWorkshopArticlePage.tsx':'Only BMW/Audi Arabic maintenance-guide paragraph now describes condition assessment and repair.',
 'src/pages/Brands.tsx':'Only BMW/Audi Arabic directory card labels omit performance.',
};
const status=await fs.readFile(path.join(out,'final-git-status.txt'),'utf8');
const report=`# T1.1 final factual and deployment verification

Completed locally on 2026-10-05. Readiness applies to the final production build, with the factual publication restrictions below. No commit, push, deployment or external message was performed. T1.1 added no routes or model pages.

## A. S63 verification result

**The source mismatch is established; W223 tuned outputs remain AMBIGUOUS / UNVERIFIED and are fully withheld publicly.** Git commit af539868 originally added the package as W222 S63 M177. Commit 17c08a7 relabelled it W223 S63 AMG E PERFORMANCE / M177 + Electric without changing any figures or packages. GAD's matching package is explicitly [W222 S63 M177](https://www.gad-motors.de/50aqawgh9aye/w222-s63-m177).

The manufacturer's [technical data](https://media.mercedes-benz.fr/nouvelle-mercedes-amg-s-63-e-performance/) independently identifies 612 metric PS/ch and 900 Nm as stock combustion-engine output. The repository's generic HP label does not declare a mechanical-horsepower conversion. Across six configurations, the ${evidence('36-field classification','s63-fields.csv')} records 12 repeated stock observations as VERIFIED — ENGINE OUTPUT, 20 tuned/gain observations as AMBIGUOUS / UNVERIFIED and four absent stock-row tuned/gain fields. No figure was classified as verified system output or another defined output. Historical external attribution is undocumented.

All five S63 packages, stock/tuned figures, gains, numeric VIP claim, prices, estimates, work lists and possible charts are withheld in the public EN/AR configurator and initial HTML. Identity, image and enquiry wording remain. No replacements or S63 model page were created. ${evidence('Full provenance and classification report','s63-verification.md')}

## B. DB11 MCT verification result

**UNVERIFIED — applicability of the inherited reinforcement package.** MCT would be INCORRECT as the DB11's factory transmission identity. [GAD's DB11 source](https://www.gad-motors.de/50aqawgh9aye/aston-martin-db11) repeats the label but does not establish compatibility; the [manufacturer V8 press kit](https://media.astonmartin.com/db11-volante-pearl-blonde-press-kit/?lang=eng) describes an eight-speed automatic.

Exactly three Stage 3–5 reinforcement descriptions, their ratings and wet-clutch claim are withheld in EN/AR public work lists. DB11 prose and FAQ no longer offer that reinforcement. TCU software and every source numerical output, gain, price and estimate remain unchanged. No alternative reinforcement product was invented. ${evidence('Detailed DB11 verification','db11-mct-verification.md')}

## C. GLC63 price verification result

**VERIFIED — quoted EUR totals, stages and supplier-labelled package alternatives.** The [exact GAD page](https://www.gad-motors.de/50aqawgh9aye/w253-glc63-m177) labels the lower total as seven-speed/NAG2 reinforcement and the upper as nine-speed/NAG3 reinforcement:

| Stage | Seven-speed endpoint, EUR total | Nine-speed endpoint, EUR total | Engine package |
| --- | ---: | ---: | --- |
| 3 | €17,876 | €19,346 | GAD 177 50/63 |
| 4 | €33,335 | €34,805 | GAD 177 55/63 |
| 5 | €51,335 | €52,805 | GAD 177 55/68 |

All original range strings remain unchanged. Stage 1 (€3,146 total) and Stage 2 (€7,471 total) were also checked. Public notes identify the nine-speed work list and supplier seven-speed alternative, distinguishing gearbox capacity from tuned torque. No averaging, conversion or invented price was used. Actual gearbox/VIN/year applicability requires a confirmed written proposal; GAD supplies no year/variant mapping. ${evidence('Endpoint component and total evidence','glc63-price-endpoints.csv')} · ${evidence('Verification report','glc63-price-verification.md')}

## D. Nine-model factual QA result

**PASS: ${models.summary.assertions} assertions, ${models.summary.errors.length} errors.** Nine pages cover ten original configurator records and 52 packages. All 468 stage/output/gain/price/time cells match the original source exactly; engine identity, stage membership, currency, arithmetic, editorial claims and visible/schema FAQs were audited. Of 381 original included-work items, 378 remain public; the only differences are the three documented DB11 removals. Every other item matches in order. Raw tuningCars.ts is byte-identical to the original T1 baseline (SHA-256 ${models.summary.currentSourceSha256}).

Required/optional hardware fields are absent from the source schema. No separate category, extra component, price, estimate, year range or unsupported engine code was invented. ${evidence('Complete page/package factual evidence','nine-model-rendered-factual-qa.json')} · ${evidence('Numerical and work CSV','nine-model-rendered-package-evidence.csv')} · ${evidence('Narrative review','nine-model-narrative-review.md')}

${architecture.addedRoutes.map(p=>'- '+p).join('\n')}

## E. /tuning generic ownership status

**RETAINED.** /tuning owns generic tuning, performance tuning, ECU tuning/remap, chip tuning, generic Stage 1/2/3, GAD Motors, general price and near-me/local tuning. Each model page leads with its named model in title, H1 and description, publishes only that model's configurations and links to the generic master. ${evidence('Primary ownership evidence','model-primary-ownership.json')}

## F. BMW/Audi exclusion status

**Positive BMW tuning claims: ${brands.positiveBMWTuningClaims}. Positive Audi tuning claims: ${brands.positiveAudiTuningClaims}.** Final rendered scan covered ${brands.renderedRoutesScanned} routes and ${brands.brandOwnedRoutes} BMW/Audi-owned routes, visible blocks, metadata and all schema strings. ${brands.matchedContexts} broad matching contexts yielded ${brands.uniqueSentences} distinct sentences; all were reviewed, with ${brands.unknownSentences} unknown and ${brands.stalePositiveOrAmbiguousSentencesRemaining} stale positive/ambiguous sentences.

The final pass corrected BMW/Audi specialization labels, two Arabic maintenance-guide paragraphs, one M5 bullet and two exhaust FAQ answers. Existing repair/service architecture, routes and canonical owners remain intact. Remaining diagnostics/programming and corporate/footer matches are explicitly classified by their actual context. ${evidence('Final rendered review','bmw-audi-final-rendered-verification.md')} · ${evidence('Complete broad match ledger','bmw-audi-broad-semantic-verification.json')}

## G. Porsche scope status

**SUPPORTED by the user's business confirmation.** The separate current model list will be supplied later. /tuning retains enquiry wording; the dataset and nine model owners contain zero Porsche records/pages. No Porsche model, engine, stage, price or power gain was created. ${evidence('Porsche scope evidence','porsche-audio-owner-verification.json')}

## H. Wrong-owner audio-query status

The three audio queries retain the Mercedes audio/head-unit owner, /services/mercedes-audio-upgrade-dubai. Their visible impressions are 50 +47 +3 =100. /tuning has zero exact-query targets and zero audio-upgrade headings; the audio owner's canonical/title/H1 are retained. Those impressions did not drive tuning expansion. ${evidence('Exact query rows and owner evidence','porsche-audio-owner-verification.json')}

## I. Explicit sitewide QA counts

Measured from the fresh final audit's issue arrays, completed ${counts.completedAt}. No zero was inferred.

| Metric | Actual integer |
| --- | ---: |
${Object.entries(counts.counts).map(([label,n])=>'| '+label+' | '+n+' |').join('\n')}

${evidence('Count extraction and method','verification/sitewide-counts.json')} · ${evidence('Full sitewide audit','verification/sitewide-summary.json')}. The inherited 58 short pages, six pages without contextual inlinks and 53 repeated-paragraph groups remain separate advisory findings; they are not hidden inside these counts.

## J. Route/sitemap delta

Routes: **1,247 →1,256; net +9**. Sitemap canonicals: **996 →1,005; net +9**. New stage-specific URLs: **0**. New filter-state URLs: **0**. The exact nine added sitemap URLs match the nine approved model paths listed in D. T1.1 adds **0** routes and **0** sitemap URLs; no existing route, canonical URL or indexability state was removed or changed. Only six newly corrected existing pages receive accurate modification dates. ${evidence('Set comparisons and exact URL list','verification/architecture-preservation.json')}

## K. TypeScript/build/validator status

**PASS.** Final typecheck and the complete declared production pipeline (${build.steps.length} steps) passed after the last source correction. All existing SEO validators passed: general SEO, PPF, paint correction, protection release, query release, oil change, suspension, transmission, social metadata, BMW hub, paint-care cluster and master SEO. Contact attribution, hosting/redirect rules, tuning validation, standalone production-router tests and routing-response tests passed.

Canonical, robots/indexability, hreflang, sitemap, internal links/fragments, schema/FAQ and duplicate metadata checks passed for the appropriate full-site and tuning scopes. Tuning validation preserves strict raw-source equality and all prior checks while asserting the exact authorized suppressions; no existing validator was weakened.

Standalone router checks: 4,848 redirects, 254 passthroughs, 13 guarded requests, four not-found checks and five origin-response checks. Routing-response tests: 1,256 valid pages, 37 negative GET/HEAD cases, 94 localized redirects, 99 Mercedes aliases, 253 preserved legacy paths and six origin passthrough cases.

Browser QA: 12 representative desktop/mobile tests, including live S63 EN/AR selectors, DB11 Stage 3–5, GLC Stage 3–5, a 390×844 DB11 landing page and EN/AR native S63 details plus the GLC model under script-src 'none'. All inspected document widths fit their viewports. Initial HTML contains all 62 permitted packages and zero S63 package rows; native disclosure works with scripts blocked. ${evidence('Browser observations','verification/browser-qa.json')} · ${evidence('Build step results','verification/build-results.json')} · ${evidence('Tuning validation','verification/tuning-validation.json')}

Existing build-size/React warnings remain. One routing-test report write encountered a transient Windows file-open error; rerunning the unchanged test passed, and the failed log is retained. The build's incidental machine-local MCP rewrite and unrelated generated validator artifacts were restored to their exact prior/clean state after copying fresh evidence. Build fingerprint: ${build.sourceSha256}. Live deployment is unperformed.

## L. Remaining factual gaps

No uncontained public factual or technical blocker remains. W223-specific S63 tuning evidence is still absent, so the entire package stays withheld. DB11 reinforcement compatibility remains unverified and its three descriptions stay withheld. GLC gearbox/year/VIN fit still requires a vehicle-specific proposal. Porsche expansion waits for the promised model list. The original workbook's dimensional-total reconciliation gap remains recorded: chart/pages 11 clicks /991 impressions versus queries/countries/devices 1 click /627 impressions. No replacement figures or totals were invented.

## M. Exact files changed by T1.1

This comparison uses the saved pre-T1.1 hashes, so earlier approved T1 changes are not misreported as new T1.1 edits. Exactly ${changed.length} workspace files outside the new evidence directory changed:

| File | T1.1 change |
| --- | --- |
${changed.map(r=>'| '+link(r.file,r.file)+' | '+(reasons[r.file]||r.status)+' |').join('\n')}

${evidence('Exact workspace file hashes','changed-workspace-files.json')}. All new audit scripts, reports, CSVs, snapshots, logs, JSON results and screenshots are contained in outputs/t1.1; their exact filenames and SHA-256 values are listed in ${evidence('artifact inventory','artifact-inventory.csv')}. Historical routing-test files were restored after fresh outputs were copied into verification. No tuningCars.ts or backend source change is included.

## N. Final Git status

Branch **${git.branch}**, unchanged HEAD **${git.HEAD}**, **0 staged files**. The working tree contains the approved T1 changes plus the T1.1 corrections above. ${evidence('Saved Git state','git-state.json')} · ${evidence('Full final git status','final-git-status.txt')}

\`\`\`text
${status.trimEnd()}
\`\`\`

No commit, push or deployment performed. Wait for the user's explicit authorization.

PASS — T1 READY TO COMMIT / PUSH / DEPLOY
`;
await fs.writeFile(path.join(out,'README.md'),report);
async function walk(dir) { const files=[];for(const item of await fs.readdir(dir,{withFileTypes:true})) {const file=path.join(dir,item.name);if(item.isDirectory()) files.push(...await walk(file));else if(item.isFile()) files.push(file);}return files; }
const records=[];
for(const file of (await walk(out)).sort()) {
 const name=path.relative(out,file).replaceAll('\\','/');if(name==='artifact-inventory.csv')continue;
 const bytes=await fs.readFile(file);records.push([name,bytes.length,createHash('sha256').update(bytes).digest('hex')]);
}
const csv=rows=>rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\n')+'\n';
await fs.writeFile(path.join(out,'artifact-inventory.csv'),csv([['file_under_outputs_t1.1','bytes','sha256'],...records,['artifact-inventory.csv','SELF','Self-referential inventory; own hash excluded']]));
console.log(JSON.stringify({report:'outputs/t1.1/README.md',changedWorkspaceFiles:changed.length,evidenceFiles:records.length,verdict:'PASS — T1 READY TO COMMIT / PUSH / DEPLOY'}));
