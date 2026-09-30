# G3 protection regression report

## 1. G3 Baseline Type

LOCAL_G2_APPROVED_STATE. Git HEAD alone is not the G3 baseline.

## 2. Local G2 Approved State

Complete pre-G3 archive and SHA-256 manifest: `outputs/g3/baseline/local-g2-approved-files.zip`, `file-manifest.json`; 24,671 files. Fresh full render: `baseline-pages.json`, `baseline-routes.json`, `baseline-rendered/*.html.gz`. Approved G2 files were not changed.

## 3. Parent Git HEAD

`bbca5e0dbd49b0ff7ef9b7873aa09b2e2e600c9c`; branch main. G2 and G3 remain local.

## 4. Pre-G3 TypeScript

PASS. Logs under `outputs/g3/baseline/` for baseline and `outputs/g3/` for post-change checks. Final build includes all existing validators; none weakened. Initial added-FAQ count failed the PPF validator; guidance was folded into the established 14 questions and the unchanged validator passed.

## 5. Pre-G3 Production Build

PASS. Logs under `outputs/g3/baseline/` for baseline and `outputs/g3/` for post-change checks. Final build includes all existing validators; none weakened. Initial added-FAQ count failed the PPF validator; guidance was folded into the established 14 questions and the unchanged validator passed.

## 6. Pre-G3 Route Count

1,247 routes before and after; route sets identical; zero new G3 URLs.

## 7. Pre-G3 Sitemap Count

996 sitemap canonical URLs before and after; membership identical.

## 8. Post-G3 TypeScript

PASS. Logs under `outputs/g3/baseline/` for baseline and `outputs/g3/` for post-change checks. Final build includes all existing validators; none weakened. Initial added-FAQ count failed the PPF validator; guidance was folded into the established 14 questions and the unchanged validator passed.

## 9. Post-G3 Production Build

PASS. Logs under `outputs/g3/baseline/` for baseline and `outputs/g3/` for post-change checks. Final build includes all existing validators; none weakened. Initial added-FAQ count failed the PPF validator; guidance was folded into the established 14 questions and the unchanged validator passed.

## 10. Route Comparison

1,247 routes before and after; route sets identical; zero new G3 URLs.

## 11. Sitemap Comparison

996 sitemap canonical URLs before and after; membership identical.

## 12. Canonical Comparison

PASS. No canonical, robots/noindex or localization-policy change; route/head and existing SEO validators pass.

## 13. Robots / Noindex Comparison

PASS. No canonical, robots/noindex or localization-policy change; route/head and existing SEO validators pass.

## 14. Hreflang Comparison

PASS. No canonical, robots/noindex or localization-policy change; route/head and existing SEO validators pass.

## 15. Schema Status

PASS. 21 emitted FAQ pairs matched initial HTML; dedicated-page FAQ content also passed existing PPF/paint validators. No schema-only FAQ, fabricated offer, price or review introduced.

## 16. FAQ Visibility / SSR Status

PASS. 21 emitted FAQ pairs matched initial HTML; dedicated-page FAQ content also passed existing PPF/paint validators. No schema-only FAQ, fabricated offer, price or review introduced.

## 17. Internal-Link Status

PASS. 288 contextual / 611 main-content internal links; zero broken, redirecting, missing-fragment or orphan findings; maximum same-language depth 3.

## 18. Image Status

PASS. Local asset paths and alt attributes checked. PPF image visibly shows film application; ceramic image shows a reflective vehicle finish, not claimed installation proof. Polishing workshop image is not presented as a correction result. External images were blocked by the local browser harness; no unrelated external image was changed.

## 19. Responsive Status

PASS. 17 routes at each of 1440px and 390px. No horizontal overflow, runtime or hydration errors. Representative viewport screenshots reviewed.

## 20. No-JavaScript Status

PASS. 17 routes checked without JavaScript, with initial metadata, H1, substantive content, links and expected schema.

## 21. Local G2 Preservation

PASS. All 43 G2 review routes retained metadata, substantive body, links, schema/FAQ and policy. Zero G2 output/report file hash changes. Safety/urgency and G2 → G1 paths preserved.

## 22. G1 Regression

PASS. All 47 G1 review routes retained substantive output. Body repair remains the primary repair owner; no G1 ownership change.

## 23. Mercedes Regression

PASS. 72 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 24. Porsche Regression

PASS. 101 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 25. BMW Regression

PASS. 45 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 26. Ferrari Regression

PASS. 44 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 27. Lamborghini Regression

PASS. 36 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 28. Rolls-Royce Regression

PASS. 34 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 29. Bentley Regression

PASS. 34 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 30. Maybach Regression

PASS. 34 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 31. Range Rover Regression

PASS. 40 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 32. Defender Regression

PASS. 34 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 33. Jaguar Regression

PASS. 16 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 34. Cadillac Regression

PASS. 33 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 35. Volkswagen Regression

PASS. 32 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 36. Jetour Regression

PASS. 30 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 37. ROX Regression

PASS. 32 brand-matching rendered routes compared; 0 substantive changes. Primary ownership retained.

## 38. Protection QA Status

| Check | Result |
| --- | --- |
| TypeScript | PASS |
| Production build and integrated routing/SEO/protection validators | PASS |
| Routes / sitemap canonicals | 1247 / 996; unchanged |
| Canonical / robots / indexability / hreflang | PASS; no policy changes |
| Schema / visible initial-HTML FAQ | PASS; 21 emitted FAQ pairs checked |
| Links | 288 contextual; 611 total main-content links |
| Broken / redirecting / missing fragments / orphans | 0 / 0 / 0 / 0 |
| Maximum same-language depth | 3 |
| Desktop / mobile / no-JavaScript | 17 / 17 / 17 |
| Images | PASS local assets and descriptive alt; representative image review |
| Runtime / hydration errors | 0 |
| G2 / G1 / protected brands | PASS; no substantive changed routes |


## 39. G3-Only Change Isolation

G3-only comparison against `outputs/g3/baseline/local-g2-approved-files.zip`: **5 authored source files, +87 / −13 lines; 3 generated files; 0 routes; 15 required reports**. See `outputs/g3/g3-only.diff` and `g3-only-diff-summary.json`. The ordinary Git diff includes G2 and G3 and is separately recorded in `outputs/g3/combined-git-diff-stat.txt`, `combined-git-diff-names.txt`, and `final-git-status.txt`.

| File | Type | Added | Removed |
| --- | --- | --- | --- |
| cloudflare/routing-response-data.js | generated | 1 | 1 |
| docs/seo/query-release-validation.json | generated | 1 | 1 |
| docs/seo/route-schema-matrix.csv | generated | 4 | 4 |
| src/data/aiGuidePostsExtra.ts | source | 8 | 7 |
| src/data/ppfContent.ts | source | 2 | 2 |
| src/pages/PpfPage.tsx | source | 1 | 1 |
| src/pages/ServicePage.tsx | source | 14 | 3 |
| src/i18n/ar-protection-services.ts | source | 62 | 0 |


## 40. Combined G2 + G3 Git Diff

Combined tracked Git diff (includes G2):

```text
cloudflare/routing-response-data.js    |   2 +-
 docs/seo/query-release-validation.json |   2 +-
 docs/seo/route-schema-matrix.csv       |  34 +--
 src/data/aiGuidePostsExtra.ts          | 375 ++++++++++++++++++++++-----------
 src/data/ppfContent.ts                 |   4 +-
 src/i18n/ar-blog.ts                    |   4 +-
 src/i18n/ar-general-blog-content.ts    |  28 +++
 src/pages/BlogPost.tsx                 |  27 ++-
 src/pages/PpfPage.tsx                  |   2 +-
 src/pages/ServicePage.tsx              |  17 +-
 10 files changed, 341 insertions(+), 154 deletions(-)
```

Full modified/untracked list: `outputs/g3/final-git-status.txt`. Reports and source snapshots are intentionally untracked. No commit, push or deployment.

## 41. Final Regression Status

PASS — G3 READY FOR REVIEW. GSC exports contain separate query and page tables, not query × landing-page joins. Editorial owners do not establish historical ranking URLs. Overlapping exports and workbook-derived metrics are never added together. Generated terms and brief examples are not measured demand. Local QA cannot demonstrate ranking, CTR, traffic or conversion gains; Google has not recrawled these local changes. No backlink or conversion evidence was supplied. Product properties, compatibility, care, pricing, warranty and durability require the actual selected product and approved scope. No universal film, coating, correction result or warranty is promised. G2 remains approved local work beneath G3; neither has been committed, pushed or deployed.

