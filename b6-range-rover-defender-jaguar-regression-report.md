# B6 regression and QA report

Git baseline: branch `main`; HEAD `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. B6 started from a dirty local worktree preserved in `outputs/b6/diff-before.patch` and hash register; no commit was made.

## B0-A and prior batches
B0-A: route, locale, canonical, robots, hreflang and sitemap invariants preserved. The full build routing validators passed.
- B1 Mercedes: 72 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B2 Porsche: 101 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B3 BMW: 45 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B4 Ferrari: 44 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B4 Lamborghini: 36 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B5 Rolls-Royce: 34 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B5 Bentley: 34 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
- B5 Maybach: 34 representative brand-path routes; 0 SEO changes; 0 substantive content/link/image changes — intact.
## Route, canonical, robots, hreflang and sitemap
Route set 1247 → 1247; 0 route-definition changes and 0 canonical/noindex changes. Sitemap validation passed for 996 canonical URLs. Existing Arabic route relationships remain; no fake counterparts were created.
## Schema and FAQ visibility
Range Rover 170, Defender 147, Jaguar 73 FAQ pairs reviewed; zero invisible schema answers and zero schema URL/unsupported-type issues. B6 guide schema uses Article, Breadcrumb and visible FAQ rather than a generic Service claim.
## Internal links and images
Rendered link audit: Range Rover 676 links, 0 broken, 0 redirects, 0 missing fragments, 0 orphans, Defender 576 links, 0 broken, 0 redirects, 0 missing fragments, 0 orphans, Jaguar 180 links, 0 broken, 0 redirects, 0 missing fragments, 0 orphans. All B6 image existence/alt checks passed.
## Responsive and no-JavaScript
Playwright checked 22 representative routes at desktop 1440px and mobile 390px: 44 loaded views, no overflow, visible broken image or hydration/page error. The same 22 routes passed JavaScript-disabled H1, body-heading and schema checks. Initial HTML audit found one H1, metadata, canonical, robots, body copy and links on all B6 routes.
## Build and TypeScript
Production build and its SEO, routing, PPF, protection, query, attribution, oil, suspension, transmission and social metadata validators passed. `npm run typecheck` fails at `src/pages/BrandServicePage.tsx:517` (TS2367, an unreachable Lamborghini `electrical-repair` comparison). Its SHA-256 matches the pre-B6 source-hash register exactly, proving B6 did not introduce it. Previous-brand content was not modified to clear this failure.
## B6 brand QA
Range Rover, Defender and Jaguar audits have zero broken links, orphan pages, missing fragments, FAQ visibility errors, schema errors, hreflang errors, no-JS errors, image errors or prohibited free-diagnostic claims. Maximum same-language depth is four for each. No new routes.
## Limitations
Query-only GSC exports cannot prove historical landing-page ownership or ranking cannibalization; overlapping export periods are not summed. Browser QA is local, not live performance evidence. Some older shared JLR template copy remains and should be reviewed in a later scoped editorial batch.
## Status
PARTIAL — B6 implementation is locally complete, but the pre-existing TypeScript failure prevents a clean required-check result.

## Final local version-control register
Branch main; HEAD 9cf7fec5b9ecaef836408245b03ab2e9f2bd718b. Eight authored B6 source files, 14 requested deliverables, three generated validation/routing files and 1,287 QA evidence files including 1,247 compressed rendered snapshots. The worktree remains dirty by design; full status and diff are saved in outputs/b6/git-status-final.txt and outputs/b6/diff-summary-final.txt. No commit, push or deployment was performed.
