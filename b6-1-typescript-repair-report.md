# B6.1 TypeScript baseline repair

## 1. Executive Summary

One unreachable Lamborghini condition in `src/pages/BrandServicePage.tsx` was removed. The project TypeScript check and production build now pass. All 1,247 prerendered pages have identical HTML hashes and SEO objects before and after B6.1. No route or SEO policy changed. This is a local code-quality repair, not an SEO batch.

## 2. Original TypeScript Error

The pre-edit `npm run typecheck` reported `src/pages/BrandServicePage.tsx(517,44): error TS2367: This comparison appears to be unintentional because the types '"soft-close-door-installation" | "steering-repair" | "tire-repair" | "exhaust-repair" | "fuel-system-repair" | "body-repair"' and '"electrical-repair"' have no overlap.` The expression was the second term of `combo.serviceSlug === 'ac-repair' || combo.serviceSlug === 'electrical-repair'` in `lamborghiniServiceOverride`.

Plain `npx tsc --noEmit` already exited zero before repair: the root `tsconfig.json` contains `files: []` and project references. The meaningful failing check was the existing `npm run typecheck`, which explicitly compiles `tsconfig.app.json` and `tsconfig.node.json`. Both commands were checked after repair.

## 3. Root Cause

The function returns from its earlier `electrical-repair` branch with dedicated camera/electrical copy. TypeScript's control-flow narrowing therefore excludes that literal at the later AC branch. The second comparison was unreachable. The AC side of the condition was reachable, so the conditional expression inside its hero copy always selected the AC wording.

## 4. Exact Code Fix

Changed only `src/pages/BrandServicePage.tsx` in two source lines: removed the unreachable `|| combo.serviceSlug === 'electrical-repair'` test and replaced the always-AC template-string ternary with its exact AC literal. The electrical branch and its copy remain untouched. No type assertion, suppression, config relaxation or refactor was used.

## 5. Why the Fix Is Type-Safe

After the earlier return, the later branch can execute for `ac-repair` but never for `electrical-repair`. The new condition states that reachable case directly. TypeScript's app and node project checks now compile with zero errors.

## 6. Why Runtime Behavior Is Preserved

Electrical requests still return through the preceding dedicated branch. AC requests still receive the same sentence, including spacing and punctuation. Other service slugs still reach the final fallback. A full prerender comparison found zero HTML-hash changes across all 1,247 routes; this independently checks the runtime result.

## 7. Files Changed

One authored source file: `src/pages/BrandServicePage.tsx`. Two lines were replaced by two lines. Build-generated routing and validation artifacts, the requested report and QA evidence are separate from the authored source change.

## 8. Lamborghini Before/After Comparison

All 36 Lamborghini-path URLs have identical rendered HTML hashes and SEO objects. DOM comparison found zero differences in H1, substantive main content, internal links, images, FAQ content, hreflang or robots. Titles, descriptions, canonical URLs and structured data are identical. Evidence: `outputs/b6-1/comparison.json` and saved before/after render manifests.

## 9. TypeScript Result

`npx tsc --noEmit`: **PASS**, exit 0. `npm run typecheck` (`tsconfig.app.json` and `tsconfig.node.json`): **PASS**, exit 0, zero errors. Output: `outputs/b6-1/tsc-after.txt` and `outputs/b6-1/project-typecheck-after.txt`.

## 10. Production Build Result

`npm run build`: **PASS**. It prerendered 1,247 routes, validated 996 canonical sitemap URLs, and passed the existing hosting/routing, SEO, protection, query, attribution, oil, suspension, transmission and social-metadata validators. No validator was changed or bypassed. Output: `outputs/b6-1/build.log`.

## 11. B4 Lamborghini Regression

The rendered audit reviewed 36 URLs and 652 contextual internal links: zero broken or redirecting links, zero missing fragments or orphans, 164 FAQ pairs with zero missing visible answers, and zero schema, hreflang, no-JavaScript or image issues. The pre/post comparison found zero substantive, SEO or HTML changes. No title, description, H1, canonical, robots, FAQ, schema, image or route regression was found.

## 12. B6 Regression

Range Rover (40 URLs), Defender (34) and Jaguar (16) have zero SEO or HTML-hash changes after B6.1. Their rendered audits report zero broken links, FAQ visibility issues, schema issues, hreflang issues, image issues or no-JavaScript issues. The representative browser check passed 22 B6 routes at desktop and mobile widths (44 views) plus 22 JavaScript-disabled checks, with no overflow, broken visible image, runtime or hydration error.

## 13. Route / Canonical / Robots / Hreflang Regression

Before and after: 1,247 routes; zero added, zero removed, zero changed route definitions. No redirect, canonical, robots, noindex, hreflang, sitemap-membership or SEO-object change was introduced. All 1,247 pages have identical prerendered HTML hashes.

## 14. Previous-Batch Preservation

B0-A routing validators passed. Representative brand-path render comparisons found zero SEO and HTML changes for B1 Mercedes (72 URLs), B2 Porsche (101), B3 BMW (45), B4 Ferrari (44), B4 Lamborghini (36), B5 Rolls-Royce (34), B5 Bentley (34), B5 Maybach (34), B6 Range Rover (40), B6 Defender (34) and B6 Jaguar (16).

## 15. Remaining Risks

The fix has no observed local runtime or SEO risk. The root `npx tsc --noEmit` command alone is not sufficient to check the referenced app project; the explicit project typecheck is the stronger verification and passes. Local checks do not measure live rankings or leads.

## 16. Git Diff Summary

Authored B6.1 source diff: one file, two lines added and two lines removed, solely to state the reachable AC case. Branch `main`; HEAD `9cf7fec5b9ecaef836408245b03ab2e9f2bd718b`. The worktree remains dirty from the preserved prior batches and this local repair. Final status is in `outputs/b6-1/git-status-final.txt`. Nothing was committed, pushed or deployed.

## 17. Final Status

PASS — TYPESCRIPT BASELINE RESTORED; B6 BLOCKER RESOLVED
