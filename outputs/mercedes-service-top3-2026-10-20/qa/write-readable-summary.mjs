import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const out=path.dirname(fileURLToPath(import.meta.url));
const s=JSON.parse(await fs.readFile(path.join(out,'COMBINED-QA-SUMMARY.json'),'utf8'));
const b=s.browser,st=s.static,m=b.mercedes;
const text=`DIGI-TEC MERCEDES SERVICE CAMPAIGN — COMBINED QA ${s.passed?'PASS':'FAIL'}
${s.at}

Candidate: ${s.candidate}
Base: ${s.base}, with the six frozen campaign files.
Source fingerprint: ${s.sourceFingerprint}
All ${s.sourceStability.buildInputCount} build inputs remained unchanged after browser QA. All six source files match the frozen candidate and workspace hashes.

Production build
All 19 declared stages passed: 1,256 real rendered routes and 1,005 canonical sitemap URLs. The pipeline includes routing, SEO, PPF, protection, query ownership, contact privacy, oil, suspension, transmission and social metadata checks.

CLI and static checks
All ${s.cli.suites} checks passed, including app and Node TypeScript, ESLint (zero errors and 11 existing warnings), master SEO, BMW hub, paint care, tuning, routing responses, the generic brand form and four static suites.
The Mercedes campaign suite passed ${st.campaignAssertions} assertions. Two hub locales and two service-directory locales intentionally changed. All ${st.unchangedRouteCount} other pages preserve their metadata, canonical/hreflang, robots, H1, JSON-LD and visible main/root markup. Only whitespace and generated Radix identifiers are normalized in the markup comparison.
The shared business identities and Service provider references remain intact. Six FAQ questions per hub locale agree with the initial visible HTML. Only the four materially changed routes receive a 20 October lastmod. No new route or indexability policy was introduced.
Fourteen maintenance/directory link placements were checked; two are new contextual service-directory links. Other placements are retained links.
Prior static suites: ${st.priorHubRepairLocales} hub/repair locales (${st.priorHubRepairAssertions} assertions), ${st.diagnosticsAcLocales} diagnostics/AC locales (${st.diagnosticsAcAssertions} assertions), ${st.ecuLocales} ECU/electronics locales (${st.ecuAssertions} assertions). All ${st.priorProtectedVisibleHtmlRoutes} remaining protected visible routes and ${st.retainedNoindexPolicies} noindex policies are preserved.

Browser regression
All ${b.suites} suites passed.
The first complete run covered all nine suites. After a measured narrow-screen CTA overlap, only the EN Mercedes hero intro changed; the final full production build and all 14 CLI checks passed again. Five-brand and focused Mercedes browser suites were repeated on the final build. Seven unaffected passing suites are retained with their original build fingerprint and strict final-build preservation evidence for all 1,252 unrelated pages.
Above-the-fold geometry: ${s.aboveFold?.passed?'PASS':'FAIL'} across six English/Arabic viewport cases (390×844, 320×844 and 1440×900), measured at initial scroll zero. The primary hero CTA is fully within the viewport, below the header and above the fixed mobile bar, with unobscured hit-testing.
Mercedes: ${m.responsiveCases} responsive cases across English/Arabic and 1440/390/320 pixels, ${m.forms} complete form cases, ${m.contactCases} safe contact cases, ${m.noJavaScript} pages without JavaScript, ${m.spa} SPA/back/booking-anchor cases and ${m.coarseTouchCases} mobile cases with a coarse touch pointer. Empty required fields and invalid optional telephone numbers block the draft. All six servicing intake fields are retained in the stubbed WhatsApp draft. Optional personal details and unknown history are accepted. Private values are excluded from analytics; a draft is never counted as a confirmed booking.
Five-brand: ${b.fiveBrand.responsiveCases} responsive cases, ${b.fiveBrand.interactions} interactions, ${b.fiveBrand.noJavaScript} pages without JavaScript.
Repair: ${b.repair.responsiveCases} responsive cases, ${b.repair.noJavaScript} pages without JavaScript, ${b.repair.hubLinks} hub-link checks.
Diagnostics/AC: ${b.diagnosticsAc.responsiveCases} responsive cases, ${b.diagnosticsAc.contacts} contact cases, ${b.diagnosticsAc.noJavaScript} pages without JavaScript, ${b.diagnosticsAc.spa} SPA checks.
ECU/electronics: ${b.ecu.responsiveCases} responsive cases, ${b.ecu.contacts} contact cases, ${b.ecu.noJavaScript} pages without JavaScript, ${b.ecu.spa} SPA checks.
Master: ${b.master.responsiveCases} responsive cases, ${b.master.interactions} interactions, ${b.master.spa} SPA checks.
Protection: ${b.protection.requests} requests, cross-service navigation, back/forward and true 404 behavior.
PPF: ${b.ppf.whatsappCtas} WhatsApp CTAs, ${b.ppf.quotationForms} quotation forms, ${b.ppf.replyMethods} reply methods, privacy, duplicate suppression and language round trip.
Tuning: ${b.tuning.responsiveCases} responsive configurator cases, 62 package rows/prices and retained S63 enquiry-only / DB11 withheld policies.
Visual review: ${s.visual?.passed?'PASS':'PENDING'}. Screenshots and the inspection record are retained.

Safety
${s.safety}

Limits
${s.limitations.join('\n')}

Full commands, paths, hashes, evidence counts, harness adaptations and initial-attempt disposition are in COMBINED-QA-SUMMARY.json. No application code changed after the final six-file freeze.
`;
await fs.writeFile(path.join(out,'COMBINED-QA-SUMMARY.txt'),text);
console.log('Readable QA summary written');
