# B7 Cadillac regression report

## Git baseline

Branch `main`; starting HEAD `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. Starting working-tree state and hashes are preserved in `outputs/b7/`. All B7 work remains local.

## B0-A and previous batches

Route and policy comparison preserves B0-A. B1 Mercedes, B2 Porsche, B3 BMW, B4 Ferrari, B4 Lamborghini, B5 Rolls-Royce, B5 Bentley, B5 Maybach, B6 Range Rover, B6 Defender and B6 Jaguar each have zero substantive/SEO rendered differences: mercedes: 0 substantive / 0 SEO changes, porsche: 0 substantive / 0 SEO changes, bmw: 0 substantive / 0 SEO changes, ferrari: 0 substantive / 0 SEO changes, lamborghini: 0 substantive / 0 SEO changes, rolls-royce: 0 substantive / 0 SEO changes, bentley: 0 substantive / 0 SEO changes, maybach: 0 substantive / 0 SEO changes, range-rover: 0 substantive / 0 SEO changes, defender: 0 substantive / 0 SEO changes, jaguar: 0 substantive / 0 SEO changes. B6.1 TypeScript remains PASS.

## Routing, canonical, robots, hreflang and sitemap

Route diff: 0. Canonical/noindex/language-policy diff: 0. Hreflang findings: 0. Sitemap remains 996 canonical URLs; 1247 routes prerendered. No best-workshop consolidation.

## Cadillac rendered QA

Cadillac-named URLs reviewed: 33; changed: 11. Contextual links checked: 618; broken 0, redirecting 0, missing fragments 0, orphans 0; max same-language depth 4. Image issues 0; schema issues 0; FAQ visibility issues 0 among 156 pairs; no-JS initial-HTML issues 0.

## Responsive and browser

Playwright/Edge headless sample: 26 route-width checks at 1440/390 px and 13 JavaScript-disabled routes; pass=True. No sampled overflow, broken visible image, console hydration failure or runtime error.

## Build

`npm run typecheck`: PASS. `npm run build`: PASS, including existing hosting/routing and SEO validators. Shared build warnings about `fetchPriority` and duplicate static/dynamic import remain outside B7 scope; checks complete successfully.

## Limits

Query-only GSC cannot prove historical landing pages or harmful cannibalization. Local tests do not prove rankings, CTR, traffic or leads after deployment. No commit, push or deploy was performed.
