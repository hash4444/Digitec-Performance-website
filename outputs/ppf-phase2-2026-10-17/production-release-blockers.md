# PPF Phase 2 — production routing blockers and release runbook

17 October 2026, Asia/Dubai. **CONDITIONAL GO for the reviewed local release candidate; NO-GO for claiming production routing or received-lead measurement is fixed.** No deployment, push, production configuration change, account mutation or production enquiry was performed.

## What the investigation established

The latest public audit ran at **13:24:44–13:24:55 Dubai time**. All six English aliases, their Arabic equivalents and trailing-slash variants still return **HTTP 200 homepage HTML**, with the homepage canonical and no `Location` header: 24 GET samples and 24 corresponding HEAD samples. Four PPF/paint-hub canonical slash variants also return 200 rather than a permanent redirect. All 40 HEAD samples (eight owners, 24 aliases and eight owner slash variants) return 200 without a redirect.

The eight canonical PPF/hub/comparison/ceramic pages do return substantive route-specific initial HTML, self-canonicals, one H1, expected `en-AE`/`ar-AE`/`x-default`, indexable directives and public sitemap coverage. The public main PPF metadata remains the old title/H1, and raw HTML still contains the old four-field EN form and no AR form. The Phase 1 implementation has therefore not been established as published.

Public `/mercedes-repair`, `/services/tire-repair` and `/about-us` also return homepage 200 responses. Unique nonexistent EN/AR paths return homepage 200. These observations contradict both the configured production entry point's existing Mercedes/tyre/404 handling and the generated full routing Worker's expected behavior.

Evidence:

- [Fresh public GET/HEAD audit, full headers and redirect chains](production/live-audit.json), [raw HTML](production/html/), [robots](production/robots.txt), [sitemap](production/sitemap.xml).
- [36-row local/production release matrix, JSON](production/release-verification-matrix.json) and [CSV](production/release-verification-matrix.csv).
- [Source architecture and before/after handler comparison](production/architecture-comparison.json).
- [Actual configured entry point tests](production/scoped-router-tests.json), [bundled entry point tests](production/scoped-router-bundle-tests.json), [bundle/source hashes](production/router-bundle-manifest.json).
- [Final Phase 2 production build](qa/build-results.json), [captured application source manifest](qa/source-manifest.json), [final local verification](local-verification.json).
- [Final Phase 2 EN/AR mobile/quotation/analytics browser results](browser/browser-results.json).
- [Final source-matched paint-care journeys](qa/journey-results.json), [master SEO regression](qa/master-validation.json).

## Two separate routing problems

**1. Static artifacts are present, but expected edge behavior is absent.** Public `/_worker.js` returns downloadable JavaScript, and `/_redirects` returns a downloadable file. The downloaded Worker has SHA-256 `47208557115070b192a66e867c27be7b847b00a6304c25519fdb84033b7d1e45`, exactly matching the locally generated `cloudflare/digitec-seo-router.js` and `dist/_worker.js` at investigation time. It already contains all 12 confirmed PPF/paint aliases. Its presence as an origin asset has not activated those redirects.

**2. The configured deployment entry point previously omitted PPF routing.** `cloudflare/wrangler.production-seo.jsonc` names Worker `digitec-production-seo-router`, `main: production-seo-router.js`, `workers_dev: false`, and routes `digitecme.com/*` and `www.digitecme.com/*`. That entry point imports the scoped Mercedes handler and the response guard; it does not import the generated full router. Before this Phase 2 change, PPF aliases were in the guard's legacy allowlist and passed through to the origin. An injected 200 homepage origin reproduced the PPF failure locally, even with the configured entry point executing.

The second problem is now fixed **locally**. The first requires verified account/deployment configuration and a separately authorized release.

### What can and cannot be inferred about the active Worker

| Evidence | Supported conclusion | Still unknown |
|---|---|---|
| Cloudflare `server`, `cf-ray`, cache headers and deployment identifier on public responses | Requests traverse a Cloudflare edge. | Which account, Worker version, route binding or ruleset handles them. The opaque origin deployment identifier is not a Worker version proof. |
| Downloadable Worker bytes match the local generated artifact; expected redirects/404 do not occur | Publishing routing source as a Lovable static asset has not supplied the tested HTTP behavior at these URLs. | Whether a Worker exists but is detached, bypassed by a more specific route, serving an old version, or otherwise misconfigured. |
| Existing Mercedes/tyre aliases and unknown paths also fail their expected behavior | The currently observed public path does not behave like either tested local production handler. | The exact remote cause and route/rule precedence. Public observation alone cannot prove that no Worker exists anywhere in the zone. |
| Local Wrangler config points at a different handler from `dist/_worker.js` | Local build tests of `_worker.js` alone did not validate the actual configured production entry point. | Whether the checked-in config has ever been deployed or matches current remote settings. |

Authenticated inspection must establish the owning Cloudflare account/zone, apex and www DNS proxy state, current Worker versions/deployments, Worker Routes including more specific or no-script exclusions, Custom Domains, Redirect Rules/Bulk Redirect order and cache behavior. Do not copy credentials into reports. Cloudflare documents that a proxied DNS record is required and that the most specific matching route wins, including possible no-script bypasses. [Cloudflare route documentation](https://developers.cloudflare.com/workers/configuration/routing/routes/).

## Local change completed and tested

Original files were copied before editing into `outputs/ppf-phase2-2026-10-17/baseline/source/` with their repository paths preserved.

Changed only these routing source/test files:

- `cloudflare/production-seo-router.js`: added a narrow, exact PPF/paint-options alias map ahead of existing handlers. Normalizes only those alias targets and the EN/AR PPF and hub canonical paths. Existing Mercedes/tyre handling and response guard remain.
- `scripts/test-production-seo-router.mjs`: added independent expected target cases, canonical normalization checks and safety regressions. Existing alias, 404, asset and origin response tests remain.

| Source aliases (each also below `/ar`) | Confirmed destination |
|---|---|
| `/ppf`, `/services/ppf` | `/services/paint-protection-film` |
| `/paint-protection`, `/car-paint-protection`, `/services/paint-protection`, `/services/car-paint-protection` | `/services/paint-protection-dubai` |

Arabic requests stay Arabic. GET/HEAD requests on the two production hostnames normalize HTTP/www, casing, repeated slashes and trailing slash directly to the final HTTPS apex destination with **308**, retaining the original query string including repeated/encoded parameters. Canonical requests already in the correct form reach the origin unchanged. Mutations, application endpoints, unrelated hostnames and unrelated valid routes preserve their existing handling and Request identity. Alias matching is exact after normalization, not a wildcard redirect for arbitrary PPF paths.

The actual configured source and its offline bundle both passed:

- 5,424 alias combinations across PPF/paint, existing Mercedes and tyre scope.
- 192 PPF/hub canonical normalization combinations.
- 90 PPF safety cases covering mutation bodies, OPTIONS, endpoints, other hosts and an unrelated route with a PPF-looking query.
- 266 existing canonical/passthrough checks, 13 guarded-request checks, four 404/HEAD checks and five origin-response checks.
- Focused ESLint passed without warnings.

The source/test changes do not deploy themselves. The final Phase 2 production build passed **19/19 stages**, including both the generated Worker tests and the actual configured production-entry tests. Its application source fingerprint is `b66850d24222e5193cf8bc98e9631e61a0e6efbe650bb965ec88cd08e5efbc4e`. The fresh local verification passed 1,248/1,248 checks across 13 selected routes, 767 link instances and 290 local image references. The actual-entry bundle was regenerated after this build and its source/bundle tests passed again. Its separate routing manifest records every imported routing source/config hash and bundle SHA-256 `d4cede4051b2be66ea945903ecd2c4bcabc2091d87e1d2c0f05665a2ed3cb354`.

The package build now includes `node scripts/test-production-seo-router.mjs`, so subsequent builds continue testing the configured entry point. That script's default output is `release-qa.local/production-router`; the explicit Phase 2 environment override preserves the evidence linked here without overwriting historical production reports. Inherited Phase 1 mobile results remain labeled separately. The final Phase 2 browser suite passed at 320/390/1440 px with zero runtime errors: EN/AR forms, all contact methods, Unsure, invalid/empty blocking, duplicate suppression, PII exclusion, no confirmed-lead event, draft-only reference, restricted attribution, bidirectional text, language switch and SPA page-view context. It also verifies disabled JavaScript form safeguards and blocks external requests. These local results do not verify live GA ingestion or real enquiry receipt.

Fresh paint-care journeys also pass against the same final source hash, including mobile/keyboard/light-theme/phone checks for the English PPF, ceramic and polishing pages, comparison-to-PPF/quote navigation, invalid-form/no-JavaScript handling, analytics privacy and single WhatsApp events. Master SEO regression passes for 12 owners and 776 links. These generated-Worker/browser checks complement, rather than replace, the separate actual configured entrypoint tests above. Whole-repository lint has zero errors and 11 existing warnings; focused changed routing lint passed without warnings.

An independent source review found no new unsupported film brand, material/performance specification, warranty duration, price, matte/satin availability or customer-project claim. The new EN/AR care text asks customers to retain the actual film/scope/care records and any written terms. Enquiry reference and acquisition labels stay in the WhatsApp draft; explicit analytics contain no entered personal information and no receipt/booking event. The Wrangler configuration remains unchanged, and no deployment/configuration command was executed.

## Release verification matrix and acceptance gates

The linked CSV/JSON contains eight owner rows, 24 alias/slash rows and four PPF/hub canonical-slash rows. Each records actual local/public status, location, canonical, initial HTML/title, sitemap relationship, language alternatives and form-field inventory. Redirect response rows defer canonical/content checks to their destination owner; a redirect itself is not expected to contain landing-page schema or a sitemap entry.

| Check | Local evidence now | Current production | Acceptance after an authorized release |
|---|---|---|---|
| Alias HTTP status/destination | PASS actual entry source and bundle, GET/HEAD | FAIL: 200 homepage, no Location | All 24 aliases return 308 directly to correct locale owner; retain query and no loops. |
| PPF/hub slash/host/case normalization | PASS actual entry source | FAIL slash: 200; sampled HTTP/www already 301 apex | Canonical and aliases normalize directly as the chosen routing policy specifies; no new chains. |
| Canonical and rendered HTML | Final Phase 2 build and 1,248 local checks PASS | Existing route HTML is substantive; old PPF implementation remains | Correct intended title/H1/body/form in initial HTML; one self-canonical and no homepage fallback. |
| Sitemap and robots | Final Phase 2 static verification PASS | Eight owners included, robots 200/allow | Owners included once, aliases excluded, no accidental noindex/disallow. Sitemap presence is not indexing proof. |
| EN/AR alternatives | Final Phase 2 static and browser language-switch verification PASS | Expected reciprocal alternates exist | EN/AR and x-default remain correct; language switching preserves the intended owner. |
| Mobile | Final Phase 2 EN/AR 320/390/1440 dark/light suite PASS | Earlier read-only live baseline had no overflow; no fresh production release test yet | Recheck published pages at 320/390/1440, both languages/themes, focus/error states and contact controls. |
| Quote workflow | Final Phase 2 EN/AR validation/deduplication/PII/reference tests PASS | EN old form; AR form absent; receipt unverified | Structured fields in both languages, valid draft handoff, clear privacy, no duplicate events or PII in analytics. Receipt remains unverified until authorized business confirmation. |
| Unknown pages and unrelated services | Existing production-entry 404/asset/origin regressions pass | Sample unique missing pages return homepage 200 | Correct 404/noindex; preserve existing assets, APIs, functions, tuning and established service routes. |
| Indexing and CWV | Local technical eligibility only | GSC/CrUX unverified | Account owner checks selected canonical/indexing and real-user CWV; no promise of ranking change. |
| Received lead conversion | No acknowledged backend event; draft/click events only | GA/GTM configuration and receipt unverified | Keep clicks/drafts out of received-lead conversion totals; use verified receipt plus opaque deduplication ID before any `quote_submitted`. |

## Concrete release options

**Preferred: retain Lovable origin and deploy the repaired, existing production entry point.** This preserves the current configured architecture and adds the narrow PPF/paint decisions. Origin frontend publication and Worker activation are distinct operations. The operator must inspect current remote settings before applying the checked-in config, because activating the existing wrapper also activates its already present Mercedes/tyre and unknown-page response guard.

**Alternative: exact scoped Redirect/Bulk Redirect rules.** An operator can implement the 12 aliases, slash variants and four canonical normalization decisions at the zone. Use exact source paths, preserve queries, preserve locale, and inspect host/scheme rule order to avoid chains. This option fixes redirects but does not by itself fix unknown-page 200 responses or publish frontend content. The broad existing `docs/seo/permanent-redirects.csv` must not be imported wholesale as a PPF-only operation.

**Broader alternative: deploy the generated `digitec-seo-router.js` as the zone handler.** This covers the full site and additional removed-route/status policies. It is a larger release than the narrow repair and requires an explicit sitewide routing review. Do not silently switch the existing Wrangler entry point or stack competing handlers on the same route. No config switch was made in Phase 2.

## Runbook for the preferred option — prepared, not executed

1. Freeze the exact reviewed frontend and routing source fingerprint. Review the Phase 1 and Phase 2 file lists and exclude unrelated dirty backend/tuning/marketing work. Retain the last published frontend artifact and the actual previous remote Worker version, route mappings and settings for rollback. Do not assume local HEAD is the deployed revision.
2. Complete the local final production build, TypeScript, lint, SEO/structured-data, EN/AR/mobile/forms/analytics/internal-link and unrelated-service tests against that fingerprint. Run the actual-entry tests in addition to the generated-Worker tests:

   ```powershell
   $env:SEO_ROUTER_TEST_OUTPUT_DIR = 'outputs/ppf-phase2-2026-10-17/production'
   node scripts/test-production-seo-router.mjs
   node outputs/ppf-phase2-2026-10-17/production/bundle-router.mjs
   node scripts/test-production-seo-router.mjs ../outputs/ppf-phase2-2026-10-17/production/production-seo-router.bundle.js
   node outputs/ppf-phase2-2026-10-17/production/make-release-matrix.mjs
   ```

3. The account operator verifies the existing Lovable project/custom domain and Cloudflare zone/Worker/route precedence described above. Compare remote bindings/settings with the reviewed config without revealing secrets. Confirm the recorded business WhatsApp/telephone is currently received and the enquiry privacy/handling process is approved.
4. **Only after explicit production authorization**, publish the reviewed frontend through the existing Lovable project, preserving the current origin/domain. Verify canonical route HTML and assets directly. Uploading `_worker.js` as static content is not the routing step.
5. In the operator's approved installed Wrangler environment, review the bundle without upload, then deploy the existing named Worker/config only after any remote-config differences are resolved. These commands are supplied for that future authorized operator; neither was run here:

   ```powershell
   wrangler deploy --config cloudflare/wrangler.production-seo.jsonc --dry-run --outdir outputs/ppf-phase2-2026-10-17/production/wrangler-review
   wrangler deploy --config cloudflare/wrangler.production-seo.jsonc --strict
   ```

   The existing config targets `digitec-production-seo-router` at `digitecme.com/*` and `www.digitecme.com/*`. Do not rename it, replace DNS ownership, install a plan or alter unrelated routes. No Wrangler dependency was installed during this work. The documented dry-run compiles without deploying; `--strict` provides additional protection against overriding remote settings. [Cloudflare Wrangler commands](https://developers.cloudflare.com/workers/wrangler/commands/workers/).
6. Run the public read-only audit again into a **new postrelease directory**, retaining this baseline:

   ```powershell
   $ppfReleaseStamp = [DateTime]::UtcNow.ToString('yyyyMMdd-HHmmss')
   node outputs/ppf-phase2-2026-10-17/production/audit-live.mjs "outputs/ppf-phase2-2026-10-17/postrelease-$ppfReleaseStamp"
   ```

   Check GET and HEAD, exact Location values, repeated query values, canonical destination status/content, both languages, sitemap/robots and representative unrelated service/tuning/asset/API behavior. Do not use a live form submission as a silent test. Verify receipt separately through an explicitly authorized business test or owner confirmation.
7. Complete published mobile/language/form/analytics QA with external event expectations reviewed. In GA4/GTM, confirm drafts/clicks are not imported as confirmed leads. GSC URL Inspection and field performance follow only after public technical checks pass. Record the actual deployed version and outcomes; no ranking/revenue claim follows from deployment alone.

## Blockers and ownership

| Blocker | Status | Required owner/action |
|---|---|---|
| PPF aliases missing from configured source entry point | **Resolved locally** | Review/test the two-file narrow patch and offline bundle. |
| Frontend changes not established on public EN/AR pages | **Pending production authorization** | Publish the reviewed origin release, excluding unrelated dirty work. |
| Worker routing behavior absent on public aliases/missing pages | **Pending authenticated diagnosis and production authorization** | Account operator verifies actual routes/version/settings, then activates the reviewed handler and rechecks public HTTP. |
| Final Phase 2 source/build/mobile validation | **PASS** | Build source fingerprint, 1,248/1,248 checks and final Phase 2 browser results attached. These validate the local candidate; production checks remain separate. |
| Business contact reception and expanded enquiry handling | **Pending business verification** | Confirm receipt capability, recipient workflow and privacy coverage without inventing a successful lead. |
| Account-level GA4/GTM conversions, consent and ingestion | **Pending external account inspection** | Verify tags, deduplication, acquisition settings and which events count as conversions. |
| GSC selected canonical/indexing and field CWV | **Pending external account/data access** | Account owner verifies; sitemap/meta/fast local tests are insufficient proof. |

## Rollback

No live rollback is needed now because no release occurred. For a future release, restore the actual captured previous Worker version/settings or detach only newly added routes if no prior Worker existed; preserve every pre-existing route/rule. Detaching a previously active Worker indiscriminately could remove unrelated protections. Revert the frontend using the preserved previous published artifact through the same existing origin workflow. Recheck canonical pages, aliases, unknown-page behavior and unrelated services after rollback.

For local routing rollback, first check for subsequent edits. Restore only `cloudflare/production-seo-router.js` and `scripts/test-production-seo-router.mjs` from their Phase 2 saved originals, or reverse the reviewed scoped patch if clean. Preserve Phase 1 changes, reports and unrelated uncommitted work. Rebuild/rebundle and rerun tests; do not use a blanket reset, clean or checkout.
