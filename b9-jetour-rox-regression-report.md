# B9 regression report

## Git baseline
Branch `main`; baseline HEAD `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. B9 began on a dirty cumulative B0-A–B8 working tree. The frozen pre-B9 source hashes, route/page snapshots and diff are in `outputs/b9/`.

## Previous-batch preservation
| Batch | Status | Evidence |
|---|---|---|
| B0-A localization | PASS | Route/language policy unchanged |
| B1 Mercedes | PASS | 72 rendered URLs; 0 SEO or substantive differences |
| B2 Porsche | PASS | 101 rendered URLs; 0 SEO or substantive differences |
| B3 BMW | PASS | 45 rendered URLs; 0 SEO or substantive differences |
| B4 Ferrari | PASS | 44 rendered URLs; 0 SEO or substantive differences |
| B4 Lamborghini | PASS | 36 rendered URLs; 0 SEO or substantive differences |
| B5 Rolls-Royce | PASS | 34 rendered URLs; 0 SEO or substantive differences |
| B5 Bentley | PASS | 34 rendered URLs; 0 SEO or substantive differences |
| B5 Maybach | PASS | 34 rendered URLs; 0 SEO or substantive differences |
| B6 Range Rover | PASS | 40 rendered URLs; 0 SEO or substantive differences |
| B6 Defender | PASS | 34 rendered URLs; 0 SEO or substantive differences |
| B6 Jaguar | PASS | 16 rendered URLs; 0 SEO or substantive differences |
| B6.1 TypeScript repair | PASS | `npm run typecheck` passes after B9 |
| B7 Cadillac | PASS | 33 rendered URLs; 0 SEO or substantive differences |
| B8 Volkswagen | PASS | 32 rendered URLs; 0 SEO or substantive differences |

## Route, canonical, robots/noindex, hreflang and sitemap comparison
Before/after production snapshots contain 1,247 routes and 996 sitemap canonical URLs. Route availability, redirects, canonical policy, robots/noindex, hreflang relationships and sitemap membership have zero differences. No Arabic route was added. Existing noindex policies remain.

## Schema and FAQ visibility
All scanned Jetour/ROX pages retain matching canonical schema URLs. FAQPage questions and answers are visible in initial HTML: Jetour 128 and ROX 140 rendered FAQ pairs; zero mismatches. No fabricated reviews, prices, ratings or offers were added.

## Internal links and images
Jetour: 547 contextual links, zero broken/redirecting/missing fragments/orphans, maximum same-language depth 2. ROX (including generic soft-close): 684 links, zero of those issues, depth 3. Rendered image audit found zero broken or misleading-image issues in the checked inventory.

## Responsive and no-JavaScript status
Browser QA passed 22 representative routes at 1440px and 390px (44 checks) plus 22 no-JS visits. No overflow, broken visible image, missing H1/metadata, runtime or hydration error was found. Initial HTML retains substantive copy, canonical, robots, internal links and schema.

## TypeScript, build and validators
`npm run typecheck`: PASS before and after B9. Production build: PASS, 1,247 routes, 996 sitemap URLs. Existing build-time SEO and routing validators passed without weakening. An initial sandbox-denied read of `vite.config.ts` was resolved by rerunning the build with approved filesystem access; it was not a source-code failure.

## Jetour, ROX and soft-close QA
Jetour: 30 URLs reviewed, 30 rendered pages changed by scoped profile/brand data. ROX: 34 URLs reviewed, 12 changed. Ownership tables have zero unresolved editorial primary owners. ROX-specific installation and cross-brand repair/installation have separate existing owners. No new URL was created.

## Evidence limits
The available GSC exports do not join query to landing page; an editorial owner is not a historical ranking URL. Local QA cannot prove Google recrawl, traffic, CTR or leads. Exact equipment and actual workshop capabilities remain vehicle/business dependent.
