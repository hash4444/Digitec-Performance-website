# B5 regression report

## Git baseline
HEAD at B5 start: `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`; branch `main`. The working tree already contained local B0–B4 changes. B5 preserved a source hash and rendered-page baseline before editing.

## Previous batches
B0-A: route, canonical, robots and hreflang policy unchanged. B1 Mercedes, B2 Porsche, B3 BMW, B4 Ferrari and B4 Lamborghini each have zero SEO and zero substantive rendered body/link/image differences against the B5 baseline. Maybach-vs-Mercedes ownership is documented separately.

## Route, canonical, robots, hreflang and sitemap comparison
All 1247 routes match the baseline. Route-policy changes: 0; SEO-policy changes: 0. Sitemap: 996 canonical URLs in the final build. No new URL or redirect was introduced.

## Build and validators
TypeScript (`npx tsc --noEmit`) passed. `npm run build` passed existing SEO, routing, hosting, PPF, paint correction, protection, query, contact, oil, suspension, transmission and social-metadata validators. Build output is in `outputs/b5/build.log`. No test was weakened.

## Brand rendered QA
| Brand | URLs | Changed | Links | Broken | Redirecting | Missing fragments | Orphans | Max depth | FAQ pairs | FAQ visibility issues | Schema issues | Image issues | No-JS issues |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Rolls-Royce | 34 | 3 | 625 | 0 | 0 | 0 | 0 | 4 | 146 | 0 | 0 | 0 | 0 |
| Bentley | 34 | 4 | 590 | 0 | 0 | 0 | 0 | 4 | 159 | 0 | 0 | 0 | 0 |
| Maybach | 34 | 4 | 584 | 0 | 0 | 0 | 0 | 4 | 159 | 0 | 0 | 0 | 0 |

## Responsive/browser status
Playwright loaded 39 representative prerendered routes at desktop and mobile widths (78 checks). Metadata, H1, schema presence, visible images, internal links, horizontal overflow and hydration assertions passed. The first Vite-preview run served generic root HTML for extensionless routes and produced false hydration errors; the final run uses `outputs/b5/serve-prerender.mjs` and passes. Screenshots and `outputs/b5/browser/verification.json` preserve the final evidence.

## No-JavaScript status
The same 39 representative URLs loaded with JavaScript disabled and exposed an H1, secondary headings and route schema. Rendered static audit confirms metadata, substantive copy and important links.

## Maybach vs Mercedes
Maybach hub/service/guide ownership remains distinct in the editorial map; B1 Mercedes rendered content was unchanged. See `b5-maybach-mercedes-boundary.md`.

## Final assessment
PASS — B5 READY FOR REVIEW. The six B5 selection guides have zero exact long-paragraph overlap after the scoped rewrite. No commit, push or deployment was performed.

## Final version-control register
Current HEAD remains `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b` on `main`, unchanged from the B5 baseline. The final full dirty-tree status is saved in `outputs/b5/git-status-final.txt`; the full tracked diff summary is saved in `outputs/b5/git-diff-stat-final.txt`. Those files include B0–B4 work that was already present before B5. Against the B5 source-hash baseline, B5 modified four implementation files (`src/components/BentleyCameraSection.tsx`, `src/data/brandWorkshopArticles.ts`, `src/pages/BrandPage.tsx`, `src/pages/BrandWorkshopArticlePage.tsx`) and added `src/components/B5SelectionGuideBody.tsx`. Four generated SEO/routing files changed as expected during the build. B5 also created the 15 requested root deliverables and 1,296 evidence files in `outputs/b5` (including 1,247 compressed rendered-route snapshots): 1,320 B5-touched files in total at this register. No B5 route was created. No commit, push or deployment occurred.
