# G1 GENERIC COMMERCIAL REGRESSION REPORT

## 1. G1 Baseline

Current pushed B0–B9 baseline; no old checkpoints recreated.

## 2. G1_BASELINE_HEAD

1f4960a35d330ea56a1871cbd6efa06233828757

## 3. Git Baseline Status

Clean before G1; only G1 local changes now.

## 4. TypeScript Baseline

PASS

## 5. Production-Build Baseline

PASS

## 6. Route Baseline

1,247 routes

## 7. Sitemap Baseline

996 canonical URLs

## 8. Post-G1 TypeScript

PASS; outputs/g1/typecheck.log

## 9. Post-G1 Production Build

PASS; outputs/g1/build.log. Existing validators retained. Sandbox-only Vite dependency-read failure resolved by an authorized local build outside the restricted process.

## 10. Route Comparison

Route set unchanged; zero new/removed URLs.

## 11. Sitemap Comparison

996 unchanged canonical members; no policy change.

## 12. Canonical Comparison

No changes.

## 13. Robots / Noindex Comparison

No changes.

## 14. Hreflang Comparison

No issues in rendered generic route checks.

## 15. Schema Status

Service URLs agree with canonical; existing schema types retained.

## 16. FAQ Visibility / SSR Status

172 answers match initial HTML. Generic FAQ force-mount repaired a baseline visibility defect; filtering retained.

## 17. Internal-Link Status

| Check | Result |
| --- | --- |
| policy_changes | PASS |
| broken_links | PASS |
| redirecting_links | PASS |
| missing_fragments | PASS |
| orphans | PASS |
| schema_issues | PASS |
| faq_issues | PASS |
| image_issues | PASS |
| nojs_issues | PASS |
| hreflang_issues | PASS |

1741 links; maximum same-language depth 3; 172 FAQ answers. Browser: 94 viewport visits, 47 no-JavaScript pages; passed=True. External Unsplash images are baseline assets and could not be reliably checked with external networking; local assets passed. Third-party analytics/form submissions were blocked during QA.

Of the 1741 rendered content-region links checked, 335 are contextual links after excluding breadcrumb navigation and shared brand directories. Existing contextual English brand relationships: 66.

## 18. Image Status

Local assets pass; remote baseline Unsplash availability unverified in this environment.

## 19. Responsive Status

| Check | Result |
| --- | --- |
| policy_changes | PASS |
| broken_links | PASS |
| redirecting_links | PASS |
| missing_fragments | PASS |
| orphans | PASS |
| schema_issues | PASS |
| faq_issues | PASS |
| image_issues | PASS |
| nojs_issues | PASS |
| hreflang_issues | PASS |

1741 links; maximum same-language depth 3; 172 FAQ answers. Browser: 94 viewport visits, 47 no-JavaScript pages; passed=True. External Unsplash images are baseline assets and could not be reliably checked with external networking; local assets passed. Third-party analytics/form submissions were blocked during QA.

Of the 1741 rendered content-region links checked, 335 are contextual links after excluding breadcrumb navigation and shared brand directories. Existing contextual English brand relationships: 66.

## 20. No-JavaScript Status

All 47 generic routes expose required initial HTML; browser no-JS results recorded.

## 21. Mercedes Regression

72 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 22. Porsche Regression

101 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 23. Bmw Regression

45 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 24. Ferrari Regression

44 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 25. Lamborghini Regression

36 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 26. Rolls-Royce Regression

34 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 27. Bentley Regression

34 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 28. Maybach Regression

34 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 29. Range-Rover Regression

40 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 30. Defender Regression

34 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 31. Jaguar Regression

16 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 32. Cadillac Regression

33 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 33. Volkswagen Regression

32 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 34. Jetour Regression

30 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 35. Rox Regression

32 routes compared: PASS — unchanged metadata/schema/body/links/images.

## 36. Generic-Service QA Status

| Check | Result |
| --- | --- |
| policy_changes | PASS |
| broken_links | PASS |
| redirecting_links | PASS |
| missing_fragments | PASS |
| orphans | PASS |
| schema_issues | PASS |
| faq_issues | PASS |
| image_issues | PASS |
| nojs_issues | PASS |
| hreflang_issues | PASS |

1741 links; maximum same-language depth 3; 172 FAQ answers. Browser: 94 viewport visits, 47 no-JavaScript pages; passed=True. External Unsplash images are baseline assets and could not be reliably checked with external networking; local assets passed. Third-party analytics/form submissions were blocked during QA.

Of the 1741 rendered content-region links checked, 335 are contextual links after excluding breadcrumb navigation and shared brand directories. Existing contextual English brand relationships: 66.

## 37. G1 Diff Summary

Baseline `1f4960a35d330ea56a1871cbd6efa06233828757`; branch `main`; current HEAD `1f4960a35d330ea56a1871cbd6efa06233828757`. Nothing committed, pushed or deployed.

```text
cloudflare/routing-response-data.js    |  2 +-
 docs/seo/query-release-validation.json |  2 +-
 docs/seo/route-schema-matrix.csv       |  6 +++---
 src/components/FAQ.tsx                 |  7 ++++---
 src/data/services.ts                   | 33 +++++++++++++++++++++++++++++----
 src/pages/BestWorkshopPage.tsx         |  2 +-
 src/pages/LocalGaragePage.tsx          |  2 +-
 src/pages/ServicePage.tsx              |  4 +++-
 8 files changed, 43 insertions(+), 15 deletions(-)
```

```text
cloudflare/routing-response-data.js
docs/seo/query-release-validation.json
docs/seo/route-schema-matrix.csv
src/components/FAQ.tsx
src/data/services.ts
src/pages/BestWorkshopPage.tsx
src/pages/LocalGaragePage.tsx
src/pages/ServicePage.tsx
```

Untracked authored source: src/i18n/ar-generic-services.ts. Untracked audit scripts/data: outputs/g1. All 16 requested reports are newly created. git diff excludes untracked files; they are listed separately rather than omitted.

Final working status (captured while reports are produced):
```text
M cloudflare/routing-response-data.js
 M docs/seo/query-release-validation.json
 M docs/seo/route-schema-matrix.csv
 M src/components/FAQ.tsx
 M src/data/services.ts
 M src/pages/BestWorkshopPage.tsx
 M src/pages/LocalGaragePage.tsx
 M src/pages/ServicePage.tsx
?? g1-brand-generic-service-boundary.md
?? g1-broad-workshop-overlap.md
?? g1-generic-cannibalization-register.csv
?? g1-generic-commercial-before-after.csv
?? g1-generic-commercial-ctr-opportunities.csv
?? g1-generic-commercial-gap-decisions.md
?? g1-generic-commercial-intent-ownership.csv
?? g1-generic-commercial-keyword-coverage.csv
?? g1-generic-commercial-regression-report.md
?? g1-generic-commercial-services-final-report.md
?? g1-generic-commercial-technical-sources.md
?? g1-generic-service-inventory.csv
?? g1-new-url-decisions.md
?? g1-service-capability-matrix.csv
?? g1-to-g2-deferred-keywords.csv
?? g1-to-g3-deferred-keywords.csv
?? outputs/g1/
?? src/i18n/ar-generic-services.ts
```

Authored website source: 6 files, +72/−10 lines (including the untracked Arabic source). Generated tracked files: 3. Requested root reports: 16. Audit scripts and raw snapshots are separately contained in outputs/g1. No staged source changes.

## 38. Final Regression Status

PASS for local checks. External baseline image availability remains an evidence limitation, not a claimed successful remote check.
