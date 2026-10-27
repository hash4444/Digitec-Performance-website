# Mercedes Phase 4 — controlled local implementation

**H3-01, H3-02 and S1 are implemented in the isolated candidate and pass application validation. Full-artifact release is on hold because the unchanged build also regenerates four sitemap dates outside the approved content diff. Production has not been deployed.** Prepared 26 October 2026.

Candidate: [candidate.local](candidate.local/). Unpatched application comparison copy: [baseline.local](baseline.local/). Both were created from the current shared checkout, with 665 fingerprinted build inputs each; build-generated changes are recorded separately below. The original checkout, existing generated build and pre-existing work were preserved. Installed dependencies were resolved from the ancestor checkout; no package installation/update, environment-file copy, remote repository operation or production configuration change was performed.

## Exact implementation scope

| Approved ID | File | Implemented change |
| --- | --- | --- |
| H3-01 | `src/pages/BrandPage.tsx` | Links the existing caption words “Diagnostics” and “repair planning” to the existing Mercedes diagnostics and mechanical pages. Caption wording retained. |
| H3-02 | Same file | Appends the already published phone action and arrival-confirmation wording to the existing Al Quoz visit card, with existing collector placement `workshop_proof`. |
| S1 | `src/data/mercedesServiceContent.ts` | Adds the exact reviewed English Mercedes bodywork WhatsApp draft. |
| S1 | `src/pages/BrandServicePage.tsx` | Adds the reviewed English Mercedes body-only final enquiry sentence. |

Exactly **three application source files** differ from baseline. Each candidate file is byte-identical to its reviewed proposed copy. **S2 was not applied**; `src/pages/ServicePage.tsx` remains identical. No new routes/pages, testimonials, repair outcomes, prices, warranties, certifications, service capabilities or unsupported business claims were added.

- [Combined exact source diff](review/approved-content-only.patch).
- [Reviewed hub patch](diffs/mercedes-hub-minimal.patch) and [reviewed S1 patch](diffs/mercedes-body-enquiry-minimal.patch).
- [Original fingerprints](original-input-manifest.json), [candidate fingerprints/application record](controlled-copy.json) and [independent scope verification](review/controlled-copy-scope-review.json).

The candidate preserves the hub URL/canonical `https://digitecme.com/brands/mercedes-benz-service-dubai`, title `Mercedes Service Dubai | Maintenance & Repair | DIGI-TEC`, description, H1 `Mercedes-Benz Service in Dubai`, structured data and existing service/repair copy. Arabic and other-brand source branches were retained and tested through representative rendered controls.

## Preflight and tests

Before application, all reviewed source/patch contexts and hashes matched: 283 protected sources, the original 303 protected/frozen-evidence hash checks, all 793 Phase 3 manifest entries and both patch applicability checks. See [source/proposal preflight](preflight/README.md). Original tracked status retained the same two pre-existing modifications; this report does not claim the shared workspace was clean.

| Required check | Result | Evidence / scope |
| --- | --- | --- |
| Full production build | **PASS**, 19/19 declared steps in both baseline and candidate | [Candidate build](build/candidate/production-build.json), [baseline build](build/baseline/production-build.json), numbered logs alongside. The sequence includes client/SSR compilation, prerender, hosting/router tests and all declared SEO/contact/service release validators. |
| TypeScript | **PASS**, app and Node configurations in both copies | [Candidate typecheck](build/candidate/typecheck.json), [baseline typecheck](build/baseline/typecheck.json). |
| SSR HTML and allowed content scope | **PASS**, 75/75 assertions across 16 routes | [SSR summary](tests/results/summary.md), [complete results and metadata](tests/results/results.json), saved before/after HTML. Reversing only the approved rendered changes exactly reconstructs baseline React roots on the two changed English pages. |
| Metadata/canonical/structured data | **PASS** | Title, description, H1, canonical, robots, language/direction, hreflang and JSON-LD equal baseline on all 16 routes. Fourteen protected rendered controls are byte-identical. |
| Arabic / other-brand / other-service controls | **PASS** | EN/AR Mercedes oil, diagnostics and mechanical; Arabic hub/body; EN/AR BMW hub/body; EN/AR general bodywork. No S2 or unrelated service modification. |
| Routing/sitemap comparison between fresh builds | **PASS within comparison scope** | Nine generated/source routing, sitemap and redirect-definition files match baseline; the production pipeline’s existing hosting/router validators pass. Equality between fresh builds does not establish equality to the checkout’s older generated files. See the artifact hold below. |
| Desktop/responsive browser checks | **PASS in tested contexts** | Desktop 1272 × 720; 390 × 844 and 320 × 844 CSS iframe viewports. Changed text/links/actions were visually inspected; no document-wide horizontal overflow observed. [Browser evidence](browser/README.md). |
| Keyboard checks | **PASS in tested interactions** | Tab reaches the two new links in order, visible focus, Enter opens the relevant pages; visit phone action is reachable/activatable; body final WhatsApp → phone Tab order; FAQ Enter toggling; mobile Menu Enter/Escape restores focus. |
| Contact-action behavior | **PASS to intended navigation** | Three body actions produce the exact reviewed encoded draft and `97143402223`, with hero/service_scope/final_cta placements. The new phone action produces `tel:+97143402223`, placement `workshop_proof`. Local interception prevents external contact. |
| Internal-link destinations | **PASS** | Both new links were activated by keyboard in the browser and opened their relevant pages. Six loopback GET/HEAD checks for diagnostics, mechanical and body return direct 200 with relevant H1/canonical. [HTTP records](browser/local-http.json). |
| Existing live redirect protection | **PASS**, 852/852 assertions | [Protection summary](redirects/README.md): 326 cases / 612 actual responses, including all 192 R1–R4 combinations, 48 October 21 oil, 48 broad Mercedes, 16 target and 22 protected-content cases. This is a read-only production preflight. |
| Independent review / rollback applicability | **PASS** | [Independent review](review/final-review.md), exact three-file source scope and guarded reverse-patch `--check` only. No rollback executed. |
| Strict equality of all copied inputs after building | **FAIL / release hold** | [665-input comparison](built-input-comparison.json) finds five generated files changed in both copies, with three approved source changes additionally in the candidate. The generated outputs require classification/release review; they are not silently added to the approved source diff. |

Build steps execute the declared package pipeline in the isolated copies, using the existing installed Vite/TypeScript binaries. They do not call the shared-checkout build wrapper. [Runner](run-build.mjs) records commands, exit status, timing and complete logs. Builds generate `dist`, `dist-server` and local reports; generated files are confined to the isolated copies and are not extra approved source changes.

## Browser evidence and limits

The loopback-only [QA preview server](preview-qa.mjs) serves the candidate’s built assets and actual generated local worker. Its local response harness adds contact interception and visible viewport/focus measurements, and a local CSP blocks external analytics/connectivity. It does not edit application source or built files. Calls/WhatsApp navigation are intercepted before external navigation; no message, call, booking or indexing submission is made.

Mobile-width checks use actual 390/320 CSS layout viewports in same-origin iframes with the desktop browser engine. They establish responsive layout in those contexts, not a physical iPhone/Android, touch, native dialler, WhatsApp delivery, full WCAG audit or analytics-delivery certification. Focus rectangles are emitted during focus events and can precede browser auto-scroll; saved screenshots provide the visual visibility evidence. No browser warning/error entries were returned by the captured console API; its coverage is limited to that capture.

Representative screenshots:

- [Desktop caption and keyboard focus](browser/screenshots/hub-desktop-diagnostics-focus.png).
- [Desktop workshop phone](browser/screenshots/hub-desktop-workshop-phone-focus.png).
- [Desktop body guidance and keyboard focus](browser/screenshots/body-desktop-final-guidance-focus.png).
- [390px hub caption](browser/screenshots/hub-mobile-390-caption-frame.png), [390px visit card](browser/screenshots/hub-mobile-390-visit-frame.png).
- [390px body guidance](browser/screenshots/body-mobile-390-final-guidance.png), [320px body guidance](browser/screenshots/body-mobile-320-final-guidance.png), [320px phone focus](browser/screenshots/body-mobile-320-final-phone.png).

Full raw accessibility snapshots, screenshots, recorded focus/layout/contact data and console capture are under [browser](browser/). The [independent visual review](browser/independent-review.md) assesses representative captures and their limits.

## Regression findings and resolved validation issues

**Application build/type/SSR/browser/HTTP checks pass. The stricter whole-input equality gate fails on build-generated output drift, so the complete artifact remains held.** Two nonblocking build warnings occur in both baseline and candidate: Vite’s >500 kB chunk warning and React’s SSR `fetchPriority`-prop warning. They were not changed within this approved scope. See steps 03/05 in both build log folders.

The [post-build input comparison](built-input-comparison.json) records five regenerated inputs in each copy: `cloudflare/routing-response-data.js`, two validation JSON reports, `docs/seo/route-schema-matrix.csv` and `public/sitemap.xml`. This comparison covers the original 665 files, beyond the three-file application-source allowlist. The candidate additionally differs only in the three approved source files. [Generated-artifact review](tests/generated-artifact-review.md) classifies the differences.

Both fresh sitemaps contain four existing `<lastmod>` updates inherited from the existing generator/source: English and Arabic Mercedes hubs, October 5 → October 20; English and Arabic services indexes, October 12 → October 20. This is not caused by the three content patches. All **1,005 sitemap URLs, in order**, remain unchanged. No generator or sitemap was edited to remove or approve the drift. The full artifact must not be released until these extra generated changes are reconciled or separately approved. The exact approved source-only patch remains available for review.

All **1,256 valid paths, 253 legacy paths and 94 localized fallback pairs** match the original, baseline and candidate. English/Arabic 404 documents differ only in compiled JS/CSS asset-hash references; remaining normalized HTML matches. The regenerated route/schema CSV is identical between fresh builds but differs from the older original in 90 cells (inbound counts, Title and After schema fields). Validation report changes include recalculated link counts as well as run metadata; the query report records 44,537 original → 44,666 baseline → 44,668 candidate internal links checked. These diagnostic reports do not establish a live metadata/canonical change. The generated review preserves exact differences and does not authorize their publication.

The first SSR harness run looked for generated CSV files in `docs/` instead of `docs/seo/`. Its failed harness diagnostic is preserved; only verifier paths were corrected, after which 75/75 assertions passed. [Run history](tests/harness-run-history.json) documents both attempts.

Local preparation also encountered a sandbox-denied dependency junction and Git’s CRLF conversion. No junction was created; dependency resolution uses the existing ancestor installation. Candidate text was verified equivalent to the reviewed proposals before exact reviewed bytes were retained; the hashes and line-ending alignment are recorded in [controlled-copy.json](controlled-copy.json). Initial sandboxed loopback access failed; the authorized loopback server was restarted with network access and a fresh browser tab. These setup events did not change the shared source, production or reviewed package.

## Release readiness and approval boundary

**Local implementation and validation are complete. The approved source changes are reviewable; the complete generated artifact is not release-ready while its extra sitemap/generated-output drift remains unresolved. Deployment is stopped.** Only H3-01/H3-02/S1 are candidates for a later authorized content release. Do not publish the QA harness, report folders, baseline copy, Cloudflare configuration, optional S2 patch, environment files or unrelated changes. [Candidate artifact hashes](candidate-dist-manifest.json) identify the held 1,634-file local build, with no QA instrumentation included.

Before a separately approved release, recheck the exact three source hashes/diff against the intended release checkout and review any intervening changes. Use the normal release process for an artifact built from that exact approved source, repeat freshness-sensitive HTTP/protected redirect checks, and retain the previous deployed artifact for rollback. A new or changed check failure must stop release for review. No permission to deploy, merge, push, alter rules/metadata/canonicals or submit indexing follows from this report.

All seven existing Cloudflare rules and the protected October 21 English oil redirect remain untouched. The public HTTP matrix verifies observed behavior; the dated Phase 2B authenticated inventory remains the configuration reference. No fresh Cloudflare configuration readback is claimed by this content-only implementation.

## Rollback

See [guarded rollback instructions](review/rollback-plan.md). Retain the baseline and exact diff. Check current candidate hashes and reverse applicability before reversing only the approved hunks; preserve subsequent/unrelated work and rerun build/type/SSR/CTA/redirect checks. Do not reset the repository or alter Cloudflare redirects. A future production rollback requires the authorized release scope and exact deployed artifact/version; no rollback is executed here.

Final [shared-source/frozen-evidence preservation](preflight/final-preservation.json) and [package validation](package-validation.json) document the final handoff. The [evidence manifest](evidence-manifest.json) fingerprints report evidence and controlled source inputs; built binaries are kept locally in the isolated copies and excluded from the portable report manifest.
