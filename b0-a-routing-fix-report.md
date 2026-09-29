# B0-A Routing Fix Report

Date: 28 September 2026. Scope: local response integrity and localized navigation only.

## 1. Executive Summary

**PARTIAL — code fix completed but external configuration remains.** The local implementation and focused tests pass. Production was not changed. The connected Cloudflare account returned no accessible `digitecme.com` zone, so the active Worker/route attachment cannot be verified or corrected here. Publishing static files alone will not activate this Worker. This is a hosting verification/release dependency, not a failed local code test.

The fix corrects exactly 56 rendered Arabic language links, returns genuine bilingual 404 responses for unknown page requests, and prevents client routing from replacing a missing page with a hub. All 1,247 existing pages retain their titles, H1s, canonical, robots, language, hreflang and JSON-LD. All 996 sitemap URLs and 251 intentional noindex pages remain. No content optimization, B0-B, Mercedes B1, commit, push or deployment was performed.

## 2. Root Cause

The site is Vite/React with build-time prerendering, not request-time SSR. `src/entry-server.tsx` renders the manifest routes during build; `scripts/prerender.mjs` writes their static HTML. `.openai/hosting.json` points the static host at `dist`. Unknown paths have no corresponding prerendered page. Fresh public GETs show that the remote serving layer falls back to the already-prerendered English homepage with HTTP 200, its canonical and homepage metadata. React subsequently evaluates the requested pathname and renders an error or redirects it. The catch-all React route cannot change an HTTP status already sent.

The configured repository entry `cloudflare/production-seo-router.js` previously handled only Mercedes and tyre paths, then passed other requests to the origin. A separate generic router exists, but it is not the entry in `cloudflare/wrangler.production-seo.jsonc`. It also contains pre-existing 410 policies unrelated to B0-A; this implementation neither activates nor changes them.

`arabicPathForEnglishPath` constructed `/ar` + English path for 55 untranslated Porsche system/problem/guide pages and the Mercedes problems index. App routes then redirected those Arabic requests to existing hubs after JavaScript loaded. Separately, dynamic model/blog/brand components could redirect arbitrary unknown slugs to a hub. RouteBoundary now checks the synchronized public/history/localization registry before those components render.

The precise remote fallback rule and deployed Worker version remain unverified. In particular, `/ar/mercedes/problems` already has an explicit redirect in the pre-edit local Mercedes Worker but returns homepage HTML on the live site. That is evidence of a local/live deployment or routing-attachment difference; it is not evidence that this task should rewrite Mercedes aliases. The Mercedes Worker file is byte-for-byte preserved.

Cloudflare references consulted: [static page serving and SPA fallback](https://developers.cloudflare.com/pages/configuration/serving-pages/), [Worker Response API](https://developers.cloudflare.com/workers/runtime-apis/response/), and [Workers best practices](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/).

## 3. Files Changed

| Path | Change | Reason / modification |
| --- | --- | --- |
| src/App.tsx | Modified | Wrap Routes in RouteBoundary; leave all existing page definitions and redirect targets intact. |
| src/components/RouteBoundary.tsx | New | Reject unrecognized paths before dynamic components can redirect missing slugs to hubs. |
| src/lib/routing-paths.json | New | Generated client registry: 1,247 public paths (including noindex) and 253 historical paths. |
| src/lib/historical-paths.js | New | Share exact existing WordPress/feed exceptions between the client boundary and edge guard. |
| src/i18n/locale.ts | Modified | Resolve explicit Arabic navigation fallbacks before constructing a symmetric language path; no hreflang changes. |
| src/i18n/arabic-route-fallbacks.json | New | Explicit allowlist of 94 existing Arabic hub fallbacks; no invented translations or wildcard fallback destinations. |
| cloudflare/production-seo-router.js | Modified | Run the new guard on origin-bound requests after the unchanged Mercedes/tyre routing decisions. |
| cloudflare/routing-response-guard.js | New | Return direct localized redirects and real English/Arabic 404 responses; preserve valid routes, history, API requests, real assets and origin errors. |
| cloudflare/routing-response-data.js | New | Generated server registry and real prerendered bilingual 404 HTML, including matching build assets. |
| scripts/generate-routing-response-data.mjs | New | Derive routing data from the current route manifest and existing literal/service aliases; validate destinations and client/server registry consistency. |
| scripts/sync-routing-paths.mjs | New | Synchronize client recognition after the SSR manifest prepass and before the final client/SSR build. |
| scripts/prerender.mjs | Modified | Generate Arabic and English 404 HTML from the existing NotFound UI; remove schema/home social images only from error pages; generate edge data. |
| package.json | Modified | Add an SSR manifest prepass and routing-path synchronization before the existing build sequence. |
| scripts/test-routing-response.mjs | New | Focused production-entry regression suite with SPA-fallback origin fixture, React 404 checks, alias preservation and compressed evidence. |
| scripts/preview-routing-response.mjs | New | Local-only HTTP preview of the configured production Worker, listening on 127.0.0.1:5191. |


The report itself is `b0-a-routing-fix-report.md`. Evidence and report-generation helpers are under `outputs/b0-a/`; their individual paths and purposes are listed below. Built `dist/` and `dist-server/` outputs are ignored build artifacts. Temporary Python dependencies are isolated in the ignored `outputs/b0-a/python-deps.local/` directory; project dependencies and the lockfile were not changed.

## 4. Before vs After

**Before** means fresh public HTTP requests to `https://digitecme.com`. **After** means actual localhost HTTP requests through the edited production Worker with the freshly built static site and a reproduced origin SPA fallback. These are local results, not a claim that production is fixed. Canonical After is the final page after any listed redirect. Complete title/H1/robots/language/redirect-chain records: `outputs/b0-a/before-http.json` and `after-http.json`.

| Test URL | Before HTTP | Before behavior | After HTTP | After behavior | Canonical before | Canonical after | Result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| / | 200 | Correct existing page | 200 | Correct existing page | https://digitecme.com/ | https://digitecme.com/ | PASS locally |
| /ar/ | 200 | Correct existing page | 200 | Correct existing page | https://digitecme.com/ar | https://digitecme.com/ar | PASS locally |
| /brands/porsche-service-dubai | 200 | Correct existing page | 200 | Correct existing page | https://digitecme.com/brands/porsche-service-dubai | https://digitecme.com/brands/porsche-service-dubai | PASS locally |
| /ar/brands/porsche-service-dubai | 200 | Correct existing page | 200 | Correct existing page | https://digitecme.com/ar/brands/porsche-service-dubai | https://digitecme.com/ar/brands/porsche-service-dubai | PASS locally |
| /ar/porsche/systems/pdk | 200 | Homepage fallback; JS recovery needed | 308 → 200 | Direct redirect to existing Arabic hub | https://digitecme.com/ | https://digitecme.com/ar/brands/porsche-service-dubai | PASS locally |
| /ar/porsche/problems/pasm-fault | 200 | Homepage fallback; JS recovery needed | 308 → 200 | Direct redirect to existing Arabic hub | https://digitecme.com/ | https://digitecme.com/ar/brands/porsche-service-dubai | PASS locally |
| /ar/porsche/guides/service-intervals-uae | 200 | Homepage fallback; JS recovery needed | 308 → 200 | Direct redirect to existing Arabic hub | https://digitecme.com/ | https://digitecme.com/ar/brands/porsche-service-dubai | PASS locally |
| /ar/mercedes/problems | 200 | Homepage fallback; JS recovery needed | 308 → 200 | Direct redirect to existing Arabic hub | https://digitecme.com/ | https://digitecme.com/ar/brands/mercedes-benz-service-dubai | PASS locally |
| /seo-audit-nonexistent-20260928 | 200 | Homepage fallback; JS recovery needed | 404 | Real 404, no homepage content | https://digitecme.com/ | None | PASS locally |
| /services/this-page-does-not-exist-20260928 | 200 | Homepage fallback; JS recovery needed | 404 | Real 404, no homepage content | https://digitecme.com/ | None | PASS locally |
| /ar/this-page-does-not-exist-20260928 | 200 | Homepage fallback; JS recovery needed | 404 | Real 404, no homepage content | https://digitecme.com/ | None | PASS locally |
| /porsche/911 | 200 | Homepage fallback; JS recovery needed | 404 | Real 404, no homepage content | https://digitecme.com/ | None | PASS locally |


Browser reproduction confirmed: the four problematic Arabic examples initially received homepage responses and then navigated to the relevant Arabic brand hub. The root fake URL became a 404 with no canonical; the fake service URL became “Service Not Found” with no canonical; the fake Arabic root displayed Arabic error text but retained `html lang=en`. `/porsche/911` eventually redirected to the English Porsche hub because the old component treated a failed model lookup as a hub redirect. It is not a published model route in the manifest. After the fix, it and all genuinely unknown paths remain on a real 404, and Arabic errors have `lang=ar` / RTL.

The four valid reproduction pages remained correct in the browser. `/ar/` still undergoes the existing client trailing-slash normalization to `/ar`; this task does not introduce a new normalization policy. The local browser language-menu click on `/porsche/systems/pdk` exposed `/ar/brands/porsche-service-dubai` directly and reached that Arabic hub.

## 5. Arabic Language-Link Corrections

Every row below has no published direct Arabic equivalent. Existing App fallback behavior established the intentional hub destination. The hub is navigation, not a translation or hreflang equivalent. All 1,234 Arabic-language anchors found across the 1,247 rendered pages point directly to a published route. Exactly these 56 anchors changed.

| Source URL | Old Arabic destination | New Arabic destination | True translation? | Hreflang changed? | Reason |
| --- | --- | --- | --- | --- | --- |
| /mercedes/problems | /ar/mercedes/problems | /ar/brands/mercedes-benz-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/718-maintenance | /ar/porsche/guides/718-maintenance | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/ac-maintenance-dubai | /ar/porsche/guides/ac-maintenance-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/battery-life-dubai | /ar/porsche/guides/battery-life-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/brake-wear-dubai | /ar/porsche/guides/brake-wear-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/buying-used-porsche-dubai | /ar/porsche/guides/buying-used-porsche-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/common-problems-dubai | /ar/porsche/guides/common-problems-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/cooling-maintenance | /ar/porsche/guides/cooling-maintenance | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/dealer-vs-independent-specialist | /ar/porsche/guides/dealer-vs-independent-specialist | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/dubai-heat | /ar/porsche/guides/dubai-heat | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/how-often-service-dubai | /ar/porsche/guides/how-often-service-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/macan-maintenance | /ar/porsche/guides/macan-maintenance | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/maintenance-cost-dubai | /ar/porsche/guides/maintenance-cost-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/major-vs-minor-service | /ar/porsche/guides/major-vs-minor-service | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/oil-change-intervals | /ar/porsche/guides/oil-change-intervals | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/pdk-service-intervals | /ar/porsche/guides/pdk-service-intervals | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/pre-purchase-inspection-checklist | /ar/porsche/guides/pre-purchase-inspection-checklist | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/service-intervals-uae | /ar/porsche/guides/service-intervals-uae | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/taycan-maintenance | /ar/porsche/guides/taycan-maintenance | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/tyre-wear-dubai | /ar/porsche/guides/tyre-wear-dubai | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/guides/warning-lights | /ar/porsche/guides/warning-lights | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems | /ar/porsche/problems | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/911-cooling | /ar/porsche/problems/911-cooling | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/ac-not-cooling | /ar/porsche/problems/ac-not-cooling | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/air-suspension-warning | /ar/porsche/problems/air-suspension-warning | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/battery-warning | /ar/porsche/problems/battery-warning | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/brake-warning-light | /ar/porsche/problems/brake-warning-light | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/cayenne-air-suspension | /ar/porsche/problems/cayenne-air-suspension | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/check-engine-light | /ar/porsche/problems/check-engine-light | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/coolant-leak | /ar/porsche/problems/coolant-leak | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/delayed-gear-engagement | /ar/porsche/problems/delayed-gear-engagement | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/engine-misfire | /ar/porsche/problems/engine-misfire | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/engine-overheating | /ar/porsche/problems/engine-overheating | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/excessive-oil-consumption | /ar/porsche/problems/excessive-oil-consumption | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/macan-transfer-case | /ar/porsche/problems/macan-transfer-case | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/oil-leak | /ar/porsche/problems/oil-leak | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/pasm-fault | /ar/porsche/problems/pasm-fault | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/pdcc-fault | /ar/porsche/problems/pdcc-fault | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/pdk-jerking | /ar/porsche/problems/pdk-jerking | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/pdk-slipping | /ar/porsche/problems/pdk-slipping | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/pdk-warning-message | /ar/porsche/problems/pdk-warning-message | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/steering-vibration | /ar/porsche/problems/steering-vibration | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/suspension-dropping-overnight | /ar/porsche/problems/suspension-dropping-overnight | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/taycan-12v-battery | /ar/porsche/problems/taycan-12v-battery | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/taycan-charging | /ar/porsche/problems/taycan-charging | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/problems/wont-start | /ar/porsche/problems/wont-start | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems | /ar/porsche/systems | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/air-suspension | /ar/porsche/systems/air-suspension | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/pasm | /ar/porsche/systems/pasm | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/pccb | /ar/porsche/systems/pccb | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/pdcc | /ar/porsche/systems/pdcc | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/pdk | /ar/porsche/systems/pdk | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/ptm-awd | /ar/porsche/systems/ptm-awd | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/rear-axle-steering | /ar/porsche/systems/rear-axle-steering | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/sport-chrono | /ar/porsche/systems/sport-chrono | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |
| /porsche/systems/tiptronic | /ar/porsche/systems/tiptronic | /ar/brands/porsche-service-dubai | No | No | Use the existing Arabic brand hub already intended by client fallback |


### Individual localized redirect register

There are 94 exact allowlisted localized fallback paths: **77 new server redirects** and **17 unchanged local Mercedes redirects** handled by the existing Mercedes router first. The 77 new rules comprise 55 affected Porsche knowledge paths plus 22 already-intended Arabic Porsche/Audi/Ferrari model fallbacks. The Mercedes index is one of the 56 corrected links, but its local server redirect already existed and is preserved. Each new rule is individually listed; no wildcard redirect is added. Every rule returns 308 directly to its final existing hub, preserves the query string and finishes with 200 in one hop. Actual language links avoid these aliases entirely.

| Localized source | Final target | Server behavior | Change |
| --- | --- | --- | --- |
| /ar/brands/audi-service-dubai/a4 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/a6 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/q5 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/q7 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/q8 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/r8 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/rs3 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/audi-service-dubai/rs6 | /ar/brands/audi-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/296 | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/488 | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/812 | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/f8-tributo | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/portofino | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/purosangue | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/roma | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/brands/ferrari-service-dubai/sf90 | /ar/brands/ferrari-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/mercedes/models/c63-service-repair-dubai | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/models/e63-service-repair-dubai | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/models/g-class-service-repair-dubai | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/models/gle-service-repair-dubai | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/models/gls-service-repair-dubai | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/models/s63-service-repair-dubai | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/ac-not-cooling | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/airmatic-malfunction | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/battery-warning | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/check-engine-light | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/engine-overheating | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/gearbox-jerking | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/oil-leak | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/suspension-dropping-overnight | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/transmission-slipping | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/mercedes/problems/wont-start | /ar/brands/mercedes-benz-service-dubai | 308 → 200; one hop | Preserved existing Mercedes rule |
| /ar/porsche/718 | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/911/991 | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/911/992 | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/911/997 | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/718-maintenance | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/ac-maintenance-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/battery-life-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/brake-wear-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/buying-used-porsche-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/common-problems-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/cooling-maintenance | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/dealer-vs-independent-specialist | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/dubai-heat | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/how-often-service-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/macan-maintenance | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/maintenance-cost-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/major-vs-minor-service | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/oil-change-intervals | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/pdk-service-intervals | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/pre-purchase-inspection-checklist | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/service-intervals-uae | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/taycan-maintenance | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/tyre-wear-dubai | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/guides/warning-lights | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/macan | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/911-cooling | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/ac-not-cooling | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/air-suspension-warning | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/battery-warning | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/brake-warning-light | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/cayenne-air-suspension | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/check-engine-light | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/coolant-leak | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/delayed-gear-engagement | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/engine-misfire | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/engine-overheating | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/excessive-oil-consumption | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/macan-transfer-case | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/oil-leak | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/pasm-fault | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/pdcc-fault | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/pdk-jerking | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/pdk-slipping | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/pdk-warning-message | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/steering-vibration | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/suspension-dropping-overnight | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/taycan-12v-battery | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/taycan-charging | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/problems/wont-start | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/air-suspension | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/pasm | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/pccb | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/pdcc | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/pdk | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/ptm-awd | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/rear-axle-steering | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/sport-chrono | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/systems/tiptronic | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |
| /ar/porsche/taycan | /ar/brands/porsche-service-dubai | 308 → 200; one hop | New exact localized fallback |


## 6. Unknown Route Tests

37 distinct negative paths passed GET and HEAD tests against the production entry. The React renderer also returned the 404 UI, noindex and no canonical/schema for all 37. GET bodies contain the existing 404 UI; HEAD bodies are empty. Error responses carry `X-Robots-Tag: noindex, follow`, correct Content-Language and `Cache-Control: no-store`. No generic homepage redirect is introduced.

| URL | HTTP GET / HEAD | Canonical | Robots | Title | H1 | Homepage content |
| --- | --- | --- | --- | --- | --- | --- |
| /b0a-missing-0-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /b0a-never-published-0-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /services/b0a-missing-1-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /services/b0a-never-published-1-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /brands/b0a-missing-2-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /brands/b0a-never-published-2-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /blog/b0a-missing-3-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /blog/b0a-never-published-3-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /mercedes/b0a-missing-4-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /mercedes/b0a-never-published-4-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /porsche/b0a-missing-5-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /porsche/b0a-never-published-5-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /ar/b0a-missing-6-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/b0a-never-published-6-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/services/b0a-missing-7-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/services/b0a-never-published-7-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/brands/b0a-missing-8-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/brands/b0a-never-published-8-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/porsche/systems/b0a-missing-9-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/porsche/systems/b0a-never-published-9-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/porsche/problems/b0a-missing-10-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/porsche/problems/b0a-never-published-10-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/porsche/guides/b0a-missing-11-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/porsche/guides/b0a-never-published-11-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/mercedes/problems/b0a-missing-12-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/mercedes/problems/b0a-never-published-12-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/mercedes/models/b0a-missing-13-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/mercedes/models/b0a-never-published-13-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/ferrari/case-studies/b0a-missing-14-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /ar/ferrari/case-studies/b0a-never-published-14-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /porsche/911 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /seo-audit-nonexistent-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /services/this-page-does-not-exist-20260928 | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /ar/this-page-does-not-exist-20260928 | 404 / 404 | None | noindex, follow | الصفحة غير موجودة \| مركز ديجي-تك بيرفورمانس | 404 | No |
| /missing-b0a.html | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /assets/missing-b0a.js | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |
| /feed/this-is-not-a-feed | 404 / 404 | None | noindex, follow | Page Not Found \| DIGI-TEC Performance Center | 404 | No |


## 7. Regression Tests

All 1,247 public paths returned 200 without a redirect under the edited production entry. The origin fixture intentionally retains the pre-existing SPA fallback, so the negative cases exercise the actual response guard rather than a conveniently correct local file server. The fixture reuses the existing historical redirect map but does not execute the generic router’s 410 policy. Public cloud origin configuration is outside this local result.

| Target brand | English hub | Arabic hub | Result |
| --- | --- | --- | --- |
| mercedes-benz | /brands/mercedes-benz-service-dubai | /ar/brands/mercedes-benz-service-dubai | 200; metadata unchanged |
| porsche | /brands/porsche-service-dubai | /ar/brands/porsche-service-dubai | 200; metadata unchanged |
| ferrari | /brands/ferrari-service-dubai | /ar/brands/ferrari-service-dubai | 200; metadata unchanged |
| lamborghini | /brands/lamborghini-service-dubai | /ar/brands/lamborghini-service-dubai | 200; metadata unchanged |
| rolls-royce | /brands/rolls-royce-service-dubai | /ar/brands/rolls-royce-service-dubai | 200; metadata unchanged |
| bentley | /brands/bentley-service-dubai | /ar/brands/bentley-service-dubai | 200; metadata unchanged |
| maybach | /brands/maybach-service-dubai | /ar/brands/maybach-service-dubai | 200; metadata unchanged |
| range-rover | /brands/range-rover-service-dubai | /ar/brands/range-rover-service-dubai | 200; metadata unchanged |
| defender | /brands/defender-service-dubai | /ar/brands/defender-service-dubai | 200; metadata unchanged |
| bmw | /brands/bmw-service-dubai | /ar/brands/bmw-service-dubai | 200; metadata unchanged |
| cadillac | /brands/cadillac-service-dubai | /ar/brands/cadillac-service-dubai | 200; metadata unchanged |
| aston-martin | /brands/aston-martin-service-dubai | /ar/brands/aston-martin-service-dubai | 200; metadata unchanged |
| jetour | /brands/jetour-service-dubai | /ar/brands/jetour-service-dubai | 200; metadata unchanged |
| rox | /brands/rox-service-dubai | /ar/brands/rox-service-dubai | 200; metadata unchanged |
| jaguar | /brands/jaguar-service-dubai | /ar/brands/jaguar-service-dubai | 200; metadata unchanged |
| volkswagen | /brands/volkswagen-service-dubai | /ar/brands/volkswagen-service-dubai | 200; metadata unchanged |


Representative page families, also included in the full 1,247-page comparison:

| Path | HTTP | Robots | Result |
| --- | --- | --- | --- |
| / | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /ar | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /services/oil-change-dubai | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /ar/services/oil-change-dubai | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /brands/porsche-service-dubai/oil-change | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /brands/volkswagen-service-dubai/transmission-repair | 200 | noindex, follow | Metadata/schema unchanged |
| /mercedes/problems | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /porsche/systems/pdk | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /porsche/problems/pasm-fault | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /porsche/guides/service-intervals-uae | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /porsche/911/992 | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /blog/air-suspension-repair-dubai-guide | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /mercedes/problems/ac-not-cooling | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |
| /mercedes/models/c63-service-repair-dubai | 200 | index, follow, max-image-preview:large | Metadata/schema unchanged |


All 99 existing Mercedes aliases returned their existing target; all 253 generated historical paths retained baseline response status and Location in comparison with the pre-edit production entry (localized replacements excluded from that comparison where applicable). Six focused passthrough cases covered origin redirects, 503 errors, actual assets, APIs, functions and POST requests. Query-string preservation was checked across all 94 localized fallback paths. No Mercedes alias source/target/status definition was edited.

## 8. Sitemap Check

`/sitemap.xml` returned HTTP 200 locally and is byte-for-byte equal to the saved pre-edit sitemap. All 996 entries are present, reachable, indexable and self-canonical; none were added or removed. The public route set is unchanged at 1,247. Sitemap generation logic, membership policy and lastmod values were not changed.

## 9. Robots Check

`/robots.txt` returned HTTP 200 and matched the saved pre-edit file byte-for-byte. All 251 intentional noindex pages retain their exact robots values. New genuine 404 responses use noindex; no existing service page was made indexable.

## 10. Canonical Check

Canonical values match the pre-edit local build across all 1,247 published routes. All 996 sitemap entries retain self-canonicals. Every tested unknown URL has no canonical in either the HTTP error document or the React-rendered missing-page state. Arabic hub destinations retain their own Arabic canonical. No commercial canonical or ownership decision changed.

## 11. Hreflang Check

Hreflang maps are exactly unchanged across all 1,247 pages. All sitemap hreflang targets are reachable and reciprocal. None of the 56 corrected navigation relationships was declared a new hreflang translation. Error pages have no hreflang alternates.

## 12. Structured Data Check

All JSON-LD blocks parsed successfully on all 1,247 existing pages and are structurally identical to their baseline. This includes the homepage, Porsche and Mercedes hubs, oil-change service and Arabic homepage/service examples. Error responses contain no JSON-LD; the inherited shared entity graph is removed only from generated 404 HTML. There was no schema redesign.

## 13. Remaining Risks

- The live site is unchanged and still requires the approved Worker/static build to be released together. The local Worker data embeds 404 HTML referring to that build’s asset names; mixing releases can break error-page hydration/styles.

- The connected Cloudflare account cannot see this zone. Its GET `/zones?name=digitecme.com` returned success with an empty result, so no remote Worker attachment/version was inspected or altered. The local/live Mercedes index discrepancy must be checked by the hosting owner.

- The legacy generic `dist/_worker.js` / `cloudflare/digitec-seo-router.js` policy remains outside this task. Do not substitute it for the reviewed production entry: it contains unrelated pre-existing 410 rules. Existing commercial history is preserved, not reassessed.

- The explicit client path registry increases the main bundle from approximately 446.39 kB / 134.73 kB gzip to approximately 528.4 kB / 147.7 kB gzip (about 13 kB gzip). Vite reports its size advisory. This is the cost of checking missing routes before lazy page components; no performance or UI redesign was attempted.

- New published routes must go through the synchronized build pipeline. New intentionally untranslated Arabic fallback routes require an explicit entry; invented slugs remain 404. Tests fail if the public registry and client registry diverge.

- Existing WordPress/feed cleanup and explicit historical aliases remain exceptions. B0-A does not reconsider their destinations. The local tests preserve repository behavior; they cannot certify every unexposed remote redirect rule.

## 14. Anything Requiring Cloudflare/Hosting Changes

No infrastructure changes were made. After review and separate deployment approval, the hosting owner must inspect the actual zone’s Worker route list and current script/version, then release the reviewed bundle using the existing repository entry `cloudflare/production-seo-router.js` and configuration `cloudflare/wrangler.production-seo.jsonc` (`digitecme.com/*` and `www.digitecme.com/*`). The freshly built `dist` assets and the generated Worker response data must be from the same build. Static publication alone does not execute the JavaScript Worker file.

The account connection supplied here has no visible matching zone, so this report does not invent a zone ID, claim that routes are absent, or prescribe a DNS/rewrite/cache change. Confirm the route attachment and deployed artifact in the account that owns the zone. Then repeat the listed live probes and historical redirect checks. If an additional unknown dashboard rewrite is found, inspect it before changing it. No DNS, SSL, domain, security, global cache, or unrelated CDN changes are needed by the local code.

## 15. Git Diff Summary

Branch: `main`. Starting and ending HEAD: `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. The checkout was already dirty. The report’s B0-A diff is against saved pre-edit working files, not against HEAD, so existing content changes are not attributed to this task. `cloudflare/production-seo-router.js` was already untracked and is treated as a modified pre-existing file.

| B0-A file | Added lines | Removed lines |
| --- | --- | --- |
| src/App.tsx | 3 | 2 |
| src/components/RouteBoundary.tsx | 15 | 0 |
| src/lib/routing-paths.json | 1506 | 0 |
| src/lib/historical-paths.js | 9 | 0 |
| src/i18n/locale.ts | 4 | 0 |
| src/i18n/arabic-route-fallbacks.json | 96 | 0 |
| cloudflare/production-seo-router.js | 4 | 2 |
| cloudflare/routing-response-guard.js | 33 | 0 |
| cloudflare/routing-response-data.js | 5 | 0 |
| scripts/generate-routing-response-data.mjs | 37 | 0 |
| scripts/sync-routing-paths.mjs | 8 | 0 |
| scripts/prerender.mjs | 13 | 5 |
| package.json | 1 | 1 |
| scripts/test-routing-response.mjs | 73 | 0 |
| scripts/preview-routing-response.mjs | 13 | 0 |


Review `outputs/b0-a/b0-a-only.patch` for the isolated implementation diff. Snapshot records are `baseline/git-status.txt`, `baseline/branch.txt`, `baseline/commit.txt`, `baseline/hashes.json`, `git-status-after.txt`, `commit-after.txt` and `preserved-files.json`. Content/SEO files and the existing Mercedes router checked against saved hashes remain unchanged. Nothing was staged, committed or pushed.

## 16. Exact Commands / Tests Used

Commands were run from `C:\Users\ADMIN\Documents\ChatGPT\DIGITEC`. The initial compiler invocation hit sandbox directory access restrictions; the same local compilation was rerun with reviewed filesystem access. Test Python dependencies were installed only in the local evidence folder, later renamed to an ignored `.local` directory.

```powershell
git status --porcelain=v1
git branch --show-current
git rev-parse HEAD
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js build --ssr src/entry-server.tsx --outDir dist-server
node scripts/prerender.mjs
```

The first three build commands above produced the pre-edit baseline. The final synchronized sequence was:

```powershell
node node_modules/vite/bin/vite.js build --ssr src/entry-server.tsx --outDir dist-server
node scripts/sync-routing-paths.mjs
node node_modules/vite/bin/vite.js build
node node_modules/vite/bin/vite.js build --ssr src/entry-server.tsx --outDir dist-server
node scripts/prerender.mjs
node scripts/test-routing-response.mjs
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json
node node_modules/typescript/bin/tsc --noEmit -p tsconfig.node.json
git diff --check -- src/App.tsx src/i18n/locale.ts scripts/prerender.mjs package.json
node scripts/preview-routing-response.mjs
```

HTML and HTTP checks used the bundled Python interpreter:

```powershell
$env:PYTHONPATH = (Join-Path (Get-Location) 'outputs/b0-a/python-deps.local')
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' outputs/b0-a/capture.py before
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' outputs/b0-a/capture.py snapshot
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' outputs/b0-a/verify.py
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe' outputs/b0-a/capture.py after
```

The `before` and `snapshot` commands ran before source edits using the original folder name `python-deps`; do not rerun them over the saved baseline. Browser checks used the in-app browser for the 12 reproduction URLs, bilingual missing-page state and a real language-menu click. Read-only Cloudflare API inspection used GET `/zones?name=digitecme.com` (200, empty results).

The complete legacy `npm run build` chain was not executed: its unrelated hosting-rule/SEO report generators were intentionally not run during this narrow implementation. The changed compilation, synchronization and prerender stages, both TypeScript projects, focused routing suite and complete page metadata/sitemap regressions were executed successfully. Existing downstream validators are preserved in package.json. The tests use native Request/Response and the actual configured entry point, not an edge-network deployment.


### Evidence inventory

| File / group | Purpose |
| --- | --- |
| outputs/b0-a/capture.py | Capture raw before/after HTTP metadata and the pre-edit page baseline. |
| outputs/b0-a/verify.py | Compare every public page, language link, sitemap entry, brand hub and schema. |
| outputs/b0-a/make_report.py | Generate this report and isolated B0-A patch from saved evidence. |
| outputs/b0-a/before-http.json; after-http.json | Actual public-before and localhost-after HTTP responses and full metadata. |
| outputs/b0-a/baseline/pages.json | All pre-edit published-page metadata/schema. |
| outputs/b0-a/after-valid.json.gz; after-negative.json.gz; after-localized.json.gz; after-aliases.json.gz | Compressed response bodies, headers and redirect chains from the focused suite. |
| outputs/b0-a/summary-negative.json; summary-localized.json; summary-aliases.json | Parsed response evidence for review. |
| outputs/b0-a/page-metadata.json; brand-regressions.json | Current published-page metadata and all 32 target hubs. |
| outputs/b0-a/language-corrections.json; language-link-crawl.json | All 56 changes and all 1,234 checked language-link destinations. |
| outputs/b0-a/redirect-register.json | Every exact localized redirect, identifying new versus preserved rules. |
| outputs/b0-a/browser-checks.md; cloudflare-readonly.json | Transcribed browser observations and the read-only hosting lookup result. |
| outputs/b0-a/routing-tests.json; metadata-tests.json | Machine-readable pass counts. |
| outputs/b0-a/changed-files.json; b0-a-only.patch; preserved-files.json | Narrow change inventory, patch and unchanged protected-file evidence. |
| outputs/b0-a/baseline/ + git-status-after.txt + commit-after.txt | Pre-edit source copies and version-control snapshots. |
| outputs/b0-a/*build.log; manifest-prepass.log; prerender.log; typecheck-*.log | Build and type-check output; baseline logs are in baseline/. |


## 17. Final Status

**PARTIAL — code fix completed but external configuration remains.** Local implementation, HTTP/React/browser checks and metadata regressions pass. The unresolved portion is verification and approved release of the correct Worker/static build in the actual hosting account. No commit, push or deployment occurred. B0-A work stops here for review; B0-B and all other SEO changes remain out of scope.
