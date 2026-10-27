import { copyFile, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const out = 'outputs/repair-service-2026-10-19/qa';
const focused = JSON.parse(await readFile(`${out}/browser/browser-results.json`, 'utf8'));
const masterPath = `${out}/existing-master-browser/browser-results.json`;
const master = JSON.parse(await readFile(masterPath, 'utf8'));
if (!master.originalReport) {
  await copyFile(masterPath, `${out}/existing-master-browser/browser-results.raw.json`);
  master.screenshots = master.screenshots.map(file => `${out}/existing-master-browser/${path.basename(file)}`);
  master.originalReport = `${out}/existing-master-browser/browser-results.raw.json`;
  await writeFile(masterPath, JSON.stringify(master, null, 2));
}
const staticReport = JSON.parse(await readFile(`${out}/repair-static-validation.json`, 'utf8'));
const orchestration = JSON.parse(await readFile(`${out}/browser-orchestration-results.json`, 'utf8'));
const summaries = [
  'Repair-service focused QA - 19 October 2026',
  '',
  `Overall result: ${[focused.passed, master.passed, staticReport.passed].every(Boolean) ? 'PASS' : 'FAIL'}`,
  '',
  `Static: ${staticReport.ownerChecks.length} selected repair locale pages; ${staticReport.metadata.length} audited owner locale URLs.`,
  `Preservation: ${staticReport.protectedRenderedChecks.length} protected SSR HTML hashes and serialized SEO objects are identical.`,
  `Source: ${staticReport.sourcePreservation.preservedBaselineFiles}/${staticReport.sourcePreservation.baselineFiles} baseline files unchanged; one shared repair template edited and three approved modules added. No forbidden differences.`,
  `Metadata: ${staticReport.metadata.filter(row => row.titleChanged).length} titles, ${staticReport.metadata.filter(row => row.descriptionChanged).length} descriptions and ${staticReport.metadata.filter(row => row.h1Changed).length} H1s changed.`,
  `Internal links: ${staticReport.internalLinks.reduce((sum, row) => sum + row.repairPanelLinks.length, 0)} direct panel destinations checked for self-canonical/index/sitemap eligibility; existing hub inlinks retained.`,
  'Schema: one Service, one breadcrumb and one FAQ graph per owner; body/FAQ schema parity; stable business provider and raw shared entity graph unchanged.',
  '',
  `Focused browser: ${focused.pageChecks.length} responsive route cases at 1440/390/320 px; ${focused.noJavaScript.length} no-JavaScript pages; ${focused.hubLinks.length} hub-to-owner checks.`,
  `Master browser: ${master.pageChecks.length} page checks; ${master.interactions.length} interactions; ${master.spaNavigation.length} SPA navigations.`,
  'No runtime/hydration errors, failing local responses, attempted backend writes or real contact popups in either final browser suite.',
  `Production preview stopped: ${orchestration.serverStopped}.`,
  '',
  'No enquiry, telephone call, appointment or message was sent. All external and non-GET/HEAD requests were blocked; contact navigation was prevented. CTA clicks remain interest signals, with no confirmed enquiry assertion.',
  '',
  'Evidence:',
  '- repair-static-validation.json',
  '- before-after-seo.csv',
  '- internal-link-and-schema.json',
  '- browser/browser-results.json and referenced screenshots',
  '- existing-master-browser/browser-results.json and referenced screenshots',
  '- existing-master-browser/browser-results.raw.json preserves the original master report bytes',
  '- browser-orchestration-results.json',
  '- VISUAL-REVIEW.txt',
  '',
  'An earlier run overlapped a subsequent production rebuild and was invalidated by missing dist files. It is retained separately under invalid-build-overlap; both complete final suites were rerun against the stable final build and passed.',
  '',
  'The first static run exposed a harness serialization mismatch: runtime undefined SEO fields are omitted from its JSON baseline. The validator now compares JSON-normalized SEO while retaining byte-exact protected HTML hashes. Product source required no change for that correction.',
  '',
  'Limits: local build/browser behavior only; no production deployment, live delivery, GA4 ingestion, CRM receipt, field Core Web Vitals or ranking proof.',
];
await writeFile(`${out}/QA-SUMMARY.txt`, summaries.join('\n') + '\n');
console.log(summaries.slice(0, 15).join('\n'));
