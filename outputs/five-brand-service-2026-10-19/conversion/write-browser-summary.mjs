import { readFile, writeFile } from 'node:fs/promises';

const directory = 'outputs/five-brand-service-2026-10-19/conversion';
const focused = JSON.parse(await readFile(`${directory}/browser/browser-results.json`, 'utf8'));
const master = JSON.parse(await readFile(`${directory}/existing-master-browser/browser-results.json`, 'utf8'));
const beforeMaster = JSON.parse(await readFile(`${directory}/existing-master-browser/regression-drift-before.json`, 'utf8'));
const baseline = await readFile('outputs/five-brand-service-2026-10-19/baseline/server/entry-server.js', 'utf8');
const actualH1 = 'Mercedes Electrical Repair & Fault Tracing in Dubai';
const summary = {
  checkedAt: new Date().toISOString(),
  finalBuildSourceFingerprint: process.argv[2] || 'ccfc2c87b0504e67e5d86d680ab1252a1dbcaa3d55307de15ccb22ba7d8553ee',
  focusedAppBuildSourceFingerprint: 'ccfc2c87b0504e67e5d86d680ab1252a1dbcaa3d55307de15ccb22ba7d8553ee',
  focused: {
    passed: focused.passed, responsiveChecks: focused.pageChecks.length,
    checksByWidth: Object.fromEntries([1440, 390, 320].map(width => [width, focused.pageChecks.filter(check => check.width === width).length])),
    interactionCases: focused.interactions.length, noJavaScriptChecks: focused.noJavaScript.length,
    screenshots: focused.screenshots.length, runtimeOrHydrationErrors: focused.runtimeOrHydrationErrors.length,
    failedLocalResponses: focused.failedLocalResponses.length, realPopups: focused.unexpectedPopups.length,
    attemptedLocalWrites: focused.blockedLocalWrites.length, failures: focused.failures,
    report: `${directory}/browser/browser-results.json`,
    reportingNote: 'This run stores numeric width in pageChecks.viewport because a layout field overwrote the text label. Width and case counts remain correct. The reporter key is corrected in the reusable script; assertions and results are unchanged.',
  },
  existingMaster: {
    passed: master.passed, responsiveChecks: master.pageChecks.length,
    interactions: master.interactions.length, screenshots: master.screenshots.length,
    spaNavigationChecks: master.spaNavigation.length,
    contactAnalyticsCheckPassed: Boolean(master.analytics?.passed),
    runtimeOrHydrationErrors: master.runtimeOrHydrationErrors.length,
    failedLocalResponses: master.failedLocalResponses.length,
    failure: master.failure,
    baselineAlreadyContainsActualH1: baseline.includes(`h1: "${actualH1}"`),
    baselineEvidence: 'outputs/five-brand-service-2026-10-19/baseline/server/entry-server.js:13070',
    report: `${directory}/existing-master-browser/browser-results.json`,
    interpretation: master.passed
      ? 'Existing master suite completed after correcting only its stale expected Mercedes electrical H1 to the already-verified baseline wording. Application source did not change for that correction.'
      : 'Existing master suite stopped at the failure recorded above; later checks are not claimed as passed.',
    previousDrift: { failure: beforeMaster.failure, report: `${directory}/existing-master-browser/regression-drift-before.json`, baselineAlreadyContainsActualH1: baseline.includes(`h1: "${actualH1}"`) },
  },
  operationalSafety: 'Final preview and browser suites ran in one local execution context on 127.0.0.1:5195. External requests and local writes were blocked. WhatsApp window.open was stubbed, no message was sent, and the temporary preview server was stopped.',
  visualQa: 'Reviewed Arabic Rolls-Royce mobile hero and Volkswagen 320px hero. Confirmed Arabic telephone left-to-right isolation after scoped fix. The orange dot in screenshots is the site custom cursor following the automation mouse; it is not a second CTA.',
};
await writeFile(`${directory}/browser-summary.json`, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ focused: summary.focused, existingMaster: { passed: summary.existingMaster.passed, baselineAlreadyContainsActualH1: summary.existingMaster.baselineAlreadyContainsActualH1 } }, null, 2));
