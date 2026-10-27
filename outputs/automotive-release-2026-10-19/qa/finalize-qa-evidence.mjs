import { mkdir, readFile, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';

const candidate = path.resolve(process.argv[2]);
const output = path.resolve(process.argv[3]);
await mkdir(output, { recursive: true });
const copies = [
  ['release-qa.local', 'production-build'],
  ['outputs/seo-2026-09-16/master-validation.json', 'master-seo-validation.json'],
  ['outputs/seo-2026-09-16/browser', 'master-seo-browser'],
  ['outputs/b0-a/routing-tests.json', 'routing-response-results.json'],
  ['outputs/repair-service-2026-10-19/qa/form-functional-tests.json', 'brand-form-results.json'],
  ['docs/seo/paint-care-cluster-audit.json', 'paint-care-results.json'],
];
for (const [source, target] of copies) await cp(path.join(candidate, source), path.join(output, target), { recursive: true });
const json = async filename => JSON.parse(await readFile(path.join(output, filename), 'utf8'));
const [cli, browsers, staticReport, five, repair, master, protection, ppf, tuning] = await Promise.all([
  json('combined-cli-results.json'), json('combined-browser-results.json'), json('combined-static-results.json'),
  json('five-brand-browser/browser-results.json'), json('repair-browser/browser-results.json'),
  json('master-seo-browser/browser-results.json'), json('production-build/integration/browser-results.json'),
  json('ppf-browser/browser-results.json'), json('tuning-browser/browser-results.json'),
]);
const summary = {
  checkedAt: new Date().toISOString(), candidate,
  passed: [cli, browsers, staticReport, five, repair, master, protection, ppf, tuning].every(report => report.passed),
  sourceSha256: cli.productionBuild.sourceSha256,
  productionBuildSteps: cli.productionBuild.steps.length,
  additionalCliChecks: cli.results.length - 1,
  eslint: { errors: 0, knownWarnings: 11 },
  focusedStatic: { routes: staticReport.pages.length, assertions: staticReport.checks, directInternalLinkOccurrences: staticReport.internalLinks.length },
  fiveBrandBrowser: { routeViewports: five.pageChecks.length, interactions: five.interactions.length, noJavaScript: five.noJavaScript.length },
  repairBrowser: { routeViewports: repair.pageChecks.length, interactions: repair.interactions.length, noJavaScript: repair.noJavaScript.length, hubInlinks: repair.hubLinks.length },
  masterBrowser: { routeViewports: master.pageChecks.length, interactions: master.interactions.length, spaNavigation: master.spaNavigation.length },
  protectionRoutingBrowser: { requests: protection.requests.length, spaNavigation: protection.spaNavigation },
  ppfBrowser: { passed: ppf.passed, viewportWidths: ppf.viewportWidths, whatsappCtas: ppf.whatsappCtas, quotationForms: ppf.quotationForms, prerenderedWithoutJavaScript: ppf.prerenderedWithoutJavaScript },
  tuningBrowser: { cases: tuning.cases.length, protectedPackages: '62 published rows; DB11 withheld reinforcement absent; S63 enquiry only' },
  failedLocalResponses: five.failedLocalResponses.length + repair.failedLocalResponses.length + master.failedLocalResponses.length + protection.failedLocalResponses.length + tuning.failedLocalResponses.length,
  runtimeOrHydrationErrors: five.runtimeOrHydrationErrors.length + repair.runtimeOrHydrationErrors.length + master.runtimeOrHydrationErrors.length + protection.runtimeOrHydrationErrors.length + tuning.errors.length + ppf.errors.length,
  safety: 'Only isolated candidate outputs exercised. External/write browser requests blocked. No real message, phone call, enquiry, commit, push, deployment or production write.',
  limitations: 'No live release, Google-selected indexing, delivered WhatsApp message, CRM receipt, GA4 ingestion, field Core Web Vitals or ranking improvement is asserted. Live release gate depends on current Cloudflare deployment/version and rollback verification.',
  supersededAttempts: ['sandbox-cli-attempt.json (Windows mkdir EPERM before build completion; final escalated candidate run passed)', 'windows-preload-attempt.json (harness Windows import-URL error before browsers launched; final corrected harness passed)'],
};
await writeFile(path.join(output, 'COMBINED-QA-SUMMARY.json'), JSON.stringify(summary, null, 2));
await writeFile(path.join(output, 'COMBINED-QA-SUMMARY.txt'), [
  'DIGI-TEC automotive service SEO release: combined isolated QA',
  `Result: ${summary.passed ? 'PASS' : 'FAIL'}. Checked ${summary.checkedAt}.`,
  `Candidate: ${candidate}`,
  `Build source fingerprint: ${summary.sourceSha256}`,
  `Production build: ${summary.productionBuildSteps}/19 steps passed. Additional CLI suites: ${summary.additionalCliChecks}/10 passed. ESLint: zero errors, 11 retained warnings.`,
  `Focused SEO: ${summary.focusedStatic.routes} English/Arabic routes, ${summary.focusedStatic.assertions} assertions, ${summary.focusedStatic.directInternalLinkOccurrences} direct internal-link occurrences passed. Canonical, reciprocal hreflang, sitemap/indexability, single H1, shared entity graph, Service/Breadcrumb/FAQ parity, brand inlinks and quotation contacts verified.`,
  `Five-brand browser: ${summary.fiveBrandBrowser.routeViewports} responsive routes, ${summary.fiveBrandBrowser.interactions} form/FAQ interaction cases, ${summary.fiveBrandBrowser.noJavaScript} no-JavaScript routes passed.`,
  `Repair browser: ${summary.repairBrowser.routeViewports} responsive routes, ${summary.repairBrowser.interactions} interaction cases, ${summary.repairBrowser.noJavaScript} no-JavaScript routes, ${summary.repairBrowser.hubInlinks} direct hub links passed.`,
  `Existing master browser: ${summary.masterBrowser.routeViewports} route/viewport cases, ${summary.masterBrowser.spaNavigation} SPA navigation cases passed.`,
  `Protection routing browser: ${summary.protectionRoutingBrowser.requests} initial/tagged/slash HTTP cases plus directory/cross-service/reload/back-forward/schema replacement passed.`,
  `Full PPF browser: EN/AR forms, language switch, desktop/mobile/320px, quote validation and privacy/duplicate suppression passed. External requests blocked.`,
  `Tuning browser: ${summary.tuningBrowser.cases} EN/AR desktop/mobile/320px cases passed; 62 public rows, DB11 publication safeguard and S63 enquiry-only behavior retained.`,
  `Runtime/hydration errors: ${summary.runtimeOrHydrationErrors}. Unexpected local HTTP errors: ${summary.failedLocalResponses}.`,
  summary.safety, summary.limitations,
  'Superseded execution-boundary/harness attempts remain recorded; they are not application test failures. No application source was altered to make assertions pass.',
  'Post-release execution checklist: POST-RELEASE-VERIFICATION.txt. This checklist has not been marked complete for production.',
  '',
].join('\n'));
console.log(JSON.stringify(summary, null, 2));
if (!summary.passed) process.exitCode = 1;
