# B4 Ferrari and Lamborghini regression report

28 September 2026. Comparison basis: preserved pre-B4 [route](outputs/b4/route-baseline.json) and [rendered-page](outputs/b4/pages-baseline.json) snapshots against current [route](outputs/b4/after-routes.json) and [rendered-page](outputs/b4/after-pages.json) snapshots. Detailed machine-readable findings: [audit summary](outputs/b4/audit-summary.json) and [browser verification](outputs/b4/browser/verification.json).

Version-control evidence: [B4-only change manifest](outputs/b4/change-manifest.json), [final git status](outputs/b4/git-status-final.txt) and [working-tree diff summary](outputs/b4/git-diff-stat-final.txt). The shared working tree was already dirty with B0–B3 work, so the git diff summary is not presented as a B4-only diff. HEAD and branch remain `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b` on `main`; no commit, push or deployment was performed.

| Check | Result |
| --- | --- |
| B0-A routing / response | **PASS.** `node outputs/b1/test-routing-response.mjs`: 1,247 valid routes, 37 negative GET/HEAD cases, 94 localized redirects, 99 Mercedes aliases, 253 legacy paths and six origin passthrough cases. `node outputs/b1/verify-generated.mjs`: routing collections and 404 content unchanged; generated asset references updated. |
| B1 Mercedes | **PASS.** Mercedes-path SEO objects and substantive rendered main content, links and image attributes: zero changes. |
| B2 Porsche | **PASS.** Porsche-path SEO objects and substantive rendered content: zero changes. |
| B3 BMW | **PASS.** BMW-path SEO objects and substantive rendered content: zero changes. |
| Other non-B4 routes | **PASS.** Three shared directories (`/blog`, `/ar/blog`, `/ar/sitemap`) reflect B4 article dates/listing copy. All other non-B4 routes retain their SEO objects and substantive main content, links and image attributes. |
| Route comparison | **PASS.** 1,247 before and after; no added/deleted path and zero route-policy changes. |
| Canonical comparison | **PASS.** Zero canonical changes across all routes. Best-workshop routes are retained with their previous behavior. |
| Robots / indexability comparison | **PASS.** Zero `noindex` or route indexability changes. |
| Hreflang comparison | **PASS.** No policy change; all rendered Ferrari/Lamborghini alternate targets checked against existing indexable routes; zero invalid targets. No Arabic route symmetry was fabricated. |
| Redirect comparison | **PASS.** Generated 263 permanent redirects; existing hosting-rule tests pass. No B4 best-workshop redirect or merge. |
| Sitemap comparison | **PASS.** Same route set and indexability; 996 canonical URLs in the generated sitemap. No B4 membership change. Modification dates were updated only for rendered B4-changed URLs. |
| TypeScript | **PASS.** `npx.cmd tsc --noEmit`. |
| Production build and SEO validators | **PASS.** `npm.cmd run build` prerendered 1,247 React routes and passed hosting, Mercedes routing, general SEO, PPF, paint correction, protection, query, contact attribution, oil, suspension, transmission and social metadata validators. |
| Ferrari internal links | **PASS.** 837 rendered in-content links checked; zero broken, redirecting or missing-fragment links; zero orphan Ferrari-path URLs; maximum same-language depth four. |
| Lamborghini internal links | **PASS.** 652 rendered in-content links checked; zero broken, redirecting or missing-fragment links; zero orphan Lamborghini-path URLs; maximum same-language depth four. |
| Schema and FAQ visibility | **PASS.** Zero invalid schema URLs/types detected. All 175 Ferrari and 164 Lamborghini emitted FAQ answers match visible initial-HTML content. |
| No-JavaScript HTML | **PASS.** Every B4-path URL has an initial title, description, canonical, robots, one H1, body copy and links in the rendered audit. Twelve representative routes also passed browser testing with JavaScript disabled. |
| Desktop/mobile | **PASS.** 34 representative routes at 1,440 px and 390 px (68 page checks), 16 FAQ open/close interactions, no tested overflow, visible broken images, runtime errors or hydration errors. The screenshots and raw results are in `outputs/b4/browser/`. |

The production build reported its existing `fetchPriority` React warning for the home hero, outside B4 scope. It did not fail the build or the B4 checks. The GSC exports are query-only, so these local checks cannot establish ranking or lead improvement.
