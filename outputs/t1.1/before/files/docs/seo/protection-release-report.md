# Coordinated protection-services release

8 September 2026 · DIGI-TEC Performance Center

**Release verdict: READY for a separately authorized production release. `/services/car-polishing-dubai` is ready in the combined build, together with PPF and ceramic coating.** This report covers one production build from the combined source in this checkout. Deployment is not authorized and has not been performed.

## P0 diagnosis

The public `/services/car-polishing-dubai` failure comes from the **older application currently delivered by production**, rather than a missing route in the completed local implementation.

The new read-only investigation established:

1. The public URL returns **HTTP 200** with the homepage title and initial homepage HTML. It references `/assets/index-BhoXC97G.js`.
2. That deployed entry contains `/services/:slug`, but neither `car-polishing-dubai` nor the dedicated `PaintCorrectionPage`, `PpfPage` or `CeramicCoatingPage` module names. It includes the existing PPF and ceramic service slugs.
3. Its generic `ServicePage-BnsEBB1H.js` contains the `Service Not Found` fallback and no polishing slug. The older service registry does not know the new polishing service.
4. A fresh rendered browser visit shows H1 **Service Not Found**, title **Service Not Found | DIGI-TEC**, no canonical, and `noindex, follow` after JavaScript loads. Thus the initial 200 is not evidence that the service page works.
5. A separate request with a unique audit query and `Cache-Control: no-cache` still returns the homepage and the same old entry filename. This is not just an old tab’s browser cache.

The public bundle also explains why PPF and ceramic show their older generic pages: their dedicated upgrades are absent from that delivered application. No deploy history or origin/CDN administration was accessed, so this investigation does not distinguish an unpublished release from stale upstream deployment/cache state. The observable failure is an outdated delivered build and SPA fallback, followed by the generic missing-service state.

Evidence is retained in `release-qa.local/production-polishing.html`, `production-response.json`, `production-index.js`, `production-ServicePage.js` and `production-cache-check.json`. Public sources: [polishing URL](https://digitecme.com/services/car-polishing-dubai), [deployed entry inspected](https://digitecme.com/assets/index-BhoXC97G.js), [deployed service module inspected](https://digitecme.com/assets/ServicePage-BnsEBB1H.js). Asset URLs identify this audit’s observed release and may cease to exist later.

## Combined source and build

The final build uses the current shared checkout, **not any previous PPF, ceramic or correction build directory**. The production pipeline creates `dist/` for delivery and `dist-server/` for prerendering. The installed Node runtime executes every command in the declared `package.json` build sequence; no dependency installation or upgrade was needed.

| Page | Dedicated component | Canonical / application path |
|---|---|---|
| PPF | `src/pages/PpfPage.tsx` | `/services/paint-protection-film` |
| Ceramic coating | `src/pages/CeramicCoatingPage.tsx` | `/services/ceramic-coating` |
| Car polishing and paint correction | `src/pages/PaintCorrectionPage.tsx` | `/services/car-polishing-dubai` |

All three exact routes in `App.tsx` resolve to their own lazy-loaded component. The generic service route remains for other services. The existing page designs, forms, content and optimized images are retained.

Integration changes:

- Added one English-only polishing service-directory record in `services.ts`, reused by the English service directory, its ItemList schema, HTML sitemap and route manifest. This avoids inventing an untranslated Arabic page.
- Connected polishing from the paint-care overview and PPF page; ceramic’s existing polishing link is included and checked. Polishing links back to PPF and ceramic. The combined tree also includes the incoming homepage, brand and article links.
- Added `validate-protection-release.mjs` to the standard production pipeline, alongside the existing PPF and polishing validators. It checks all three dedicated pages together, including ceramic.
- Added `build-production-local.mjs` to execute the complete production pipeline in the shared checkout and compare a source fingerprint before and after compilation.
- Added `preview-production-local.mjs` to serve the final files through their generated routing worker and `test-protection-release-browser.mjs` to test direct and client-side navigation together.
- Allowed the three existing browser suites to write into the common release evidence directory. The ceramic suite now accepts the build directory explicitly, avoiding an accidental read of its previous isolated output.
- Fixed a ceramic no-JavaScript fallback found in combined QA: closed-accordion animations could briefly collapse otherwise visible answers. The no-JavaScript style now disables that animation and restores automatic height; the browser suite checks it.

The integration did not rename the polishing canonical, redirect it to another service, create supporting SEO pages, or replace the other completed page implementations.

## Required polishing checks

| Requirement | Combined-release verification |
|---|---|
| PaintCorrectionPage component | Present in source and compiled into its own client chunk |
| Exact route | `/services/car-polishing-dubai` uses PaintCorrectionPage; checked in application source and built entry |
| Route manifest | Exactly one indexable English service entry; generated from the dedicated directory record |
| Service-directory entry/link | English `/services` card and ItemList URL; HTML sitemap link; no broken Arabic equivalent |
| Canonical | Exactly one `https://digitecme.com/services/car-polishing-dubai`, both before and after hydration and with UTMs |
| Sitemap | Exactly one canonical URL in the generated `dist/sitemap.xml` and synchronized public sitemap |
| Prerendered output | `dist/services/car-polishing-dubai/index.html` contains the actual page, title, H1, copy, FAQs and styles |
| Service schema | One page Service whose provider is `https://digitecme.com/#business` |
| BreadcrumbList | One page breadcrumb graph with the polishing canonical as its final item |
| Internal links | Outbound pages/fragments resolve; directory, overview, PPF and ceramic inbound paths tested |
| HTTP behavior in release preview | Clean/tagged requests return 200 with intended HTML; trailing slash redirects 308 while preserving the query |
| Browser behavior | Dedicated page remains correct after hydration, refresh, service-to-service navigation, back and forward |

The same canonical, sitemap, entity, initial-HTML and browser checks apply to PPF and ceramic. All three reference the same business, Organization and WebSite identities. No duplicate service-business entities or self-serving ratings were introduced.

## Validation evidence

The production pipeline runs client build, SSR build, prerendering, routing generation, hosting-rule tests, site-wide SEO validation, PPF validation, polishing validation and combined protection validation. It produces **1,438 prerendered routes, 1,158 canonical sitemap URLs and 263 permanent redirects**.

Browser suites test the files in the **same final `dist/`**:

| Suite | Coverage |
|---|---|
| Combined routing | Initial HTTP and HTML; three clean URLs, three tagged URLs and three slash redirects; reloads; directory → PPF → ceramic → polishing → PPF; back/forward; canonical and schema replacement; unknown service returns real 404 |
| PPF | 1440/390/320 px layouts, light/dark themes, loaded images, FAQs, five WhatsApp anchors, phone, quote validation, event counts, privacy and initial rendering without JavaScript |
| Ceramic | 1440/390/320 px layouts, light/dark themes, 200% text, 13 contact links, 26 page links/anchors, FAQs, metadata, no-JavaScript rendering and legacy URL behavior |
| Polishing | 1440/390/320 px layouts, light/dark themes, five WhatsApp anchors, phone, invalid/valid form paths, event counts, privacy, keyboard FAQs, no-JavaScript content/styles and mobile emulation |

External requests are blocked in local QA: no enquiries or analytics are sent. Clicks and WhatsApp draft opens are verified as interface events, not actual received leads. Desktop/mobile screenshots were inspected, including the polishing assessment form in light theme.

Evidence files:

- [Combined static validation](./protection-release-validation.json)
- `release-qa.local/build-results.json` and `build-1.log` through `build-9.log`
- `release-qa.local/source-manifest.json` and `final-consistency.json`
- `release-qa.local/integration/browser-results.json`
- `release-qa.local/ppf/browser-results.json`
- `release-qa.local/ceramic/ceramic-browser-results.json`
- `release-qa.local/paint/browser-results.json`
- Screenshots under those three page-specific evidence folders

Application TypeScript checking passed. Focused ESLint checking passed with zero errors; `BrandPage.tsx` retains its existing `react-hooks/exhaustive-deps` warning. Build notices about dependency annotations and the large shared entry chunk remain non-blocking. Local timing measurements are not field Core Web Vitals or a production analytics audit.

The build fingerprint is checked against source again after browser QA, and the final HTML/client hashes are compared to the validated artifacts. Incoming edits during earlier attempts were detected; those attempts are not the release candidate.

## Release instructions — not executed

When deployment is separately authorized, release the **complete validated build as one unit**: all route HTML, the matching hashed JS/CSS/assets, sitemap, redirects and generated worker. Do not upload the polishing HTML alone, publish just one completed workstream, or let a client build from another source state accompany these files. The three pages must share the client entry recorded in the validation JSON.

The source checkout includes untracked new components, data, styles, images and scripts. A later Git-based release must include those files; a tracked-only patch is insufficient. The source manifest records the build inputs without publishing environment values.

Before declaring the public incident resolved after that authorized release:

1. Verify all three canonical URLs and tagged variants return the intended HTML with HTTP 200.
2. Verify the delivered client entry and page chunks match the release manifest, then inspect the hydrated pages in a fresh browser.
3. Confirm polishing no longer shows the fallback, canonical and robots stay correct, and service-directory/cross-links work.
4. Confirm the host serves prerendered route files rather than homepage fallback. Apply the matching generated route guard where the actual hosting platform requires it; the local preview proves artifact behavior, not that a particular production Worker route is already attached.
5. Check sitemap/redirects and actual GA4/GTM receipt, then inspect the polishing URL in Search Console if account access is available.

Production remains unchanged by this task. The public P0 is resolved only after a separately authorized deployment and successful public checks.

## Final candidate identity

Source SHA-256: `544cf6819269e25122073c47cf17d95b58885d45e38d9e0e3c5327a2bea9b52b`. Client entry: `assets/index-BfST5ja7.js`. Final consistency check: 2026-09-08T11:57:41.4813475Z.

[Final build/browser consistency evidence](./protection-release-qa.json). All four browser reports were produced after this build completed; source, client and page HTML still matched at the final check.
