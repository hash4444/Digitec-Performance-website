# B4 Ferrari and Lamborghini final report

28 September 2026. **PASS — READY FOR REVIEW** for the local implementation. Nothing was committed, pushed or deployed. Ferrari and Lamborghini evidence, ownership and change registers are separate: [Ferrari coverage](b4-ferrari-keyword-coverage.csv), [Lamborghini coverage](b4-lamborghini-keyword-coverage.csv), [Ferrari ownership](b4-ferrari-intent-ownership.csv), [Lamborghini ownership](b4-lamborghini-intent-ownership.csv), [Ferrari before/after](b4-ferrari-before-after.csv), [Lamborghini before/after](b4-lamborghini-before-after.csv), [gap decisions](b4-ferrari-lamborghini-gap-decisions.md), [technical sources](b4-ferrari-lamborghini-technical-sources.md) and [regression checks](b4-ferrari-lamborghini-regression-report.md).

## 1. Executive Summary

Forty-four Ferrari-path and 36 Lamborghini-path URLs were reviewed. Six rendered URLs in each brand changed; no URL was created. Ferrari has 401 normalized keyword tasks and Lamborghini 396; each has zero classified gaps and zero unresolved primary-owner conflicts. This is a local quality result, not a claim of increased rankings or leads.

## 2. Scope Completed

The work preserved the pre-B4 snapshot, extracted both brands' workbook and original GSC rows, normalized and assigned owners, reviewed 80 rendered URLs, corrected FAQ visibility, qualified a Ferrari diagnostic-tool claim, improved the Lamborghini electrical/camera service path and removed shared guide boilerplate from both brand guides. Three shared blog/sitemap directories reflect the revised B4 article dates/listing copy; no unrelated brand page was changed. Build, rendered, desktop/mobile, no-JS and previous-batch checks passed. The [B4 change manifest](outputs/b4/change-manifest.json) records changed files and unchanged HEAD.

## 3. Ferrari Existing Architecture

The Ferrari inventory has a broad service hub, best-workshop selection page, 14 English commercial service routes, eight dedicated model routes, a 488 guide, maintenance guide and existing Arabic counterparts where present. These remain separate editorial tasks. No new system or symptom URL was warranted.

## 4. Lamborghini Existing Architecture

The Lamborghini inventory has a broad hub, best-workshop page, 14 English commercial service routes, an Urus guide, a maintenance guide and existing Arabic counterparts. There is no dedicated Lamborghini model-page directory. The Urus guide and hub model sections remain the model information owners; missing symmetry with Ferrari is not itself a gap.

## 5. Ferrari Keyword Evidence

The evidence register contains 623 provenance-preserving observations: 392 Master Keywords rows, 26 GSC Opportunities copies, six Brand Specific Systems rows, 175 original GSC query observations and 24 brief examples. Across workbook sheets, 54 rows are labeled measured, 354 generated and 16 research. The latest six-month original GSC subset has 28 explicit Ferrari query rows, 3,457 impressions and one click. The 175 observations span overlapping exports and were not summed as a traffic total.

## 6. Lamborghini Keyword Evidence

The evidence register contains 551 observations: 390 Master Keywords rows, 20 GSC Opportunities copies, five Brand Specific Systems rows, 113 original GSC query observations and 23 brief examples. Across workbook sheets, 41 rows are labeled measured, 361 generated and 13 research. The latest six-month original GSC subset has 21 explicit Lamborghini query rows, 2,086 impressions and zero clicks. The source provides queries, not query × landing-page joins.

## 7. Keyword Normalization

Ferrari's 427 raw strings yielded 401 normalized terms; Lamborghini's 421 yielded 396. Case, spacing, centre/center, servicing/service, repair/repairs and gearbox/transmission variants were normalized where the search task stayed the same. Source rows and measured/generated/research labels remain in the underlying [Ferrari](outputs/b4/ferrari-keyword-owner-records.csv) and [Lamborghini](outputs/b4/lamborghini-keyword-owner-records.csv) records. Generated terms have no invented GSC metrics.

## 8. Ferrari Keyword → Owner Map

The [Ferrari pre-edit map](outputs/b4/ferrari-keyword-owner-map.md) gives broad booking to the hub, workshop-selection criteria to the best-workshop page, model-specific service questions to existing model routes, service tasks to the relevant commercial route and maintenance/cost planning to the guide. Unverified exact services are intentionally untargeted. Zero conflicts remain.

## 9. Lamborghini Keyword → Owner Map

The [Lamborghini pre-edit map](outputs/b4/lamborghini-keyword-owner-map.md) follows the same one-owner discipline but reflects its different architecture: Urus planning goes to the existing Urus guide; Huracán/Aventador/Revuelto/Temerario enquiry remains with hub/service sections. The measured reversing-camera query maps to the electrical service's diagnostic section. Zero conflicts remain.

## 10. Ferrari Hub Review

`/brands/ferrari-service-dubai` retains broad commercial discovery, service/model navigation, workshop context and enquiry CTA. Its named SD3/DEIS wording was removed because B4 evidence did not verify those tools at DIGI-TEC; supported Ferrari-compatible access is now confirmed for the exact vehicle and requested scope. Existing FAQ answers are present in initial HTML.

## 11. Lamborghini Hub Review

`/brands/lamborghini-service-dubai` retains a distinct service directory and model-family navigation. Its service copy does not claim one transmission or suspension specification for every Lamborghini. The existing FAQ schema now has visible initial-HTML answers on the Arabic hub as well as English.

## 12. Best-Workshop Review

`/best-ferrari-workshop-dubai` and `/best-lamborghini-workshop-dubai` remain selection/criteria pages, separate from broad hub booking. Their existing Arabic title, H1, description and direct answer now express that same selection task, and both languages expose FAQ answers in initial HTML. Neither route was redirected, merged, deleted or canonicalized to the hub. Future consolidation requires query × page, link and conversion evidence.

## 13. Ferrari Commercial Services

Fourteen existing service owners were reviewed. Oil, brakes, transmission and suspension already contain model-/equipment-dependent scope; the others retain their inspection-first service roles. A new brand × service page was not needed. Ferrari brake and transmission queries stay with their relevant owners rather than the broad hub.

## 14. Lamborghini Commercial Services

Fourteen existing service owners were reviewed. The transmission, battery, diagnostics and major mechanical pages already contain distinct vehicle-system language. The electrical page now addresses a fitted reversing-camera fault and the measured “reverse camera in Dubai” enquiry, while clearly separating diagnosis from an unverified retrofit.

## 15. Ferrari Diagnostics

The Ferrari diagnostics route owns warning-light and fault-investigation enquiries. A code is a lead for further testing, not proof that a particular component failed. No Ferrari proprietary diagnostic-tool ownership or universal programming capability is asserted.

## 16. Lamborghini Diagnostics

The Lamborghini diagnostics route remains the general engine/warning owner. It distinguishes compatible data from physical/electrical tests and confirms module or software access before quotation. Specific camera, gearbox or suspension symptoms then lead to their more relevant service owner.

## 17. Engine / Mechanical Review

Engine, overheating, coolant, leak and turbo concerns route to each brand's mechanical service, with diagnostics where the symptom is not yet localized. Neither page promises a repair from a remote symptom description or generalizes one engine family across all models.

## 18. Transmission Review

Ferrari F1 single-clutch and later dual-clutch descriptions are generation-dependent. Lamborghini's existing page distinguishes Huracán EVO LDF, Urus S automatic and Aventador SVJ ISR using manufacturer evidence. A harsh shift or warning prompts assessment; it is not described as proof of gearbox failure. No separate acronym or symptom page was created.

## 19. Suspension Review

Ferrari adaptive-damping references are conditional on fitted equipment. Lamborghini suspension copy routes warnings, uneven height, noises and handling changes through identification of the exact fitted system. Neither brand uses a universal failed-damper/air-spring diagnosis.

## 20. Brake Review

Ferrari's brake owner separates steel and carbon-ceramic hardware where fitted. Lamborghini's brake owner keeps the vehicle-specific inspection and part-selection task. Brake warning, feel and wear concerns lead to an inspection rather than unsupported replacement promises.

## 21. AC Review

Both existing AC pages retain commercial inspection intent. Refrigerant type and quantity are verified from the actual vehicle, and a regas is not represented as a cure for every cooling complaint. Shared testing principles are legitimate; vehicle scope differs.

## 22. Electrical / Battery Review

The Lamborghini electrical owner now covers blank/intermittent reversing-camera images where fitted, along with display, wiring, power and connector checks. It does not advertise universal camera installation. Battery pages for both brands concern low-voltage systems; no hybrid traction-battery service is claimed.

## 23. Cooling / Overheating Review

Cooling and overheating stay within each mechanical service, with appropriate urgency language and diagnostic referral. No generated keyword triggered a thin overheating route.

## 24. Performance / Exhaust Review

Existing exhaust owners cover repair and inspection; `/tuning` remains the cross-brand performance enquiry owner. No Ferrari/Lamborghini power-gain promise, aftermarket compatibility claim or model × tuning URL was added.

## 25. Infotainment / Camera Review

The only notable measured camera opportunity is Lamborghini “reverse camera in Dubai” (213 impressions, zero clicks, position 22.77 in the latest query-only export). The existing electrical page now explains the fault-assessment path. Query-only evidence cannot identify which URL ranked. Ferrari screen concerns remain an electrical service section.

## 26. Body / Paint / Protection Review

Existing brand body-repair routes own accident/panel concerns. Cross-brand paint protection, ceramic coating and polishing have their own existing owners; B4 did not create duplicate brand × protection pages or change those shared services.

## 27. Ferrari Model Review

The 296, 488, 812, F8 Tributo, Portofino, Purosangue, Roma and SF90 pages were reviewed as distinct model routes, not rewritten solely for batch membership. They retain model-specific powertrain/gearbox/maintenance considerations and contextual service paths. The 296 and SF90 content is kept distinct from conventional-only advice.

## 28. Lamborghini Model Review

Urus has an existing guide; Huracán, Aventador and electrified model enquiries are supported by hub and service sections. No dedicated model route was created for a generated phrase. Manufacturer examples in the transmission page are explicitly variant-specific.

## 29. Hybrid / Electrified Vehicle Review

Ferrari 296/SF90 and Lamborghini Revuelto references were checked against manufacturer model sources. B4 does not apply a conventional-only service package to an electrified model or claim DIGI-TEC high-voltage repair. Supported low-voltage and mechanical/diagnostic scope is confirmed case by case.

## 30. Problem / Symptom Review

Gearbox, suspension, warning-light, overheating and electrical symptoms map to existing commercial assessment sections. The Lamborghini camera section specifically explains possible system categories and what is checked. A symptom is not treated as a parts diagnosis, and no thin problem URL was added.

## 31. Maintenance / Interval Review

The Ferrari guide explains the named Ferrari seven-year programme while directing owners to the exact vehicle handbook/history; it is not a universal independent-workshop interval. The Lamborghini guide now focuses on fitted gearbox, brake, suspension, fluids, storage and low-voltage condition. Both retain informational planning intent.

## 32. Cost Intent Review

Maintenance-cost queries go to the relevant guide, where the estimate depends on model, due work, findings, parts and accepted scope. No fixed price, “cheapest” claim or fabricated offer was introduced.

## 33. FAQ Review

Rendered checks found 175 Ferrari and 164 Lamborghini FAQ schema pairs after B4. Every answer in those emitted pairs appears in the initial HTML. The fix uses existing accordion content and preserves FAQ filtering rather than creating schema-only questions.

## 34. Internal Linking Review

The two brand graphs remain separate: hub → services/models/guides; model/guide → relevant commercial owner; specific symptom → relevant service. Contextual audit checked 837 Ferrari and 652 Lamborghini links, with zero broken, redirecting or missing-fragment destinations. No artificial sitewide links were added.

## 35. Orphan / Crawl Depth Review

No Ferrari- or Lamborghini-path URL was orphaned in the rendered contextual graph. Maximum same-language crawl depth from the home route is four for each brand. Breadcrumb and directory relationships were retained.

## 36. Technical Claim Review

The Ferrari named-tool claim was qualified; Lamborghini transmission examples were verified against official manufacturer pages. Equipment language remains model-/variant-dependent. Camera diagnosis does not imply retrofit support; hybrid mentions do not imply traction-battery work. [Source register](b4-ferrari-lamborghini-technical-sources.md) separates evidence from inference.

## 37. E-E-A-T / Trust Review

The pages use existing Al Quoz location/contact information, independent-workshop scope, vehicle identification, inspection and quotation process. No manufacturer authorization, proprietary tool, certification, award, rating, warranty, case study or repair count was invented.

## 38. Content Quality Review

The largest obvious cross-brand maintenance-guide boilerplate was removed. The remaining Ferrari guide addresses its named maintenance programme and existing model routes; the Lamborghini guide addresses its variant-dependent systems and storage decisions. Useful shared workshop/safety advice remains where it serves users.

## 39. Ferrari vs Lamborghini Differentiation Review

Before B4, the two maintenance guides shared ten long substantive paragraphs verbatim. After the revision, no long-paragraph pair between those guides met that exact-duplicate threshold. Three cross-brand pairs with three or four repeated paragraphs remain in shared AC/body service and Arabic hub information; those are common workshop process, not copied brand-specific technical claims. No text was changed solely to manipulate a score.

## 40. Arabic Review

Existing Arabic hubs, services, best-workshop and guides were reviewed in their actual route set. Ferrari/Lamborghini Arabic hub FAQ answers are now in initial HTML; the Ferrari maintenance-guide revision includes Arabic copy and points to verified Arabic service and related-guide routes. No missing counterpart was fabricated and no Arabic route/noindex policy changed.

## 41. Image / Alt Review

Rendered image paths and alt attributes were checked for all 80 brand-path URLs: zero missing local assets or missing/keyword-stuffed alt attributes in the audit. Representative desktop/mobile pages showed no broken visible image. Existing decorative behavior and model assets were retained.

## 42. CTA Review

Commercial pages request a service enquiry or inspection; guides provide contextual service links; problem language directs an inspection rather than an instant diagnosis. No free diagnostic, free scan, guaranteed diagnosis or same-day promise was introduced.

## 43. Local SEO Review

Dubai and Al Quoz appear as business context where relevant, without location-doorway routes or fictitious branches. Heat and storage appear as condition prompts, not universal failure claims.

## 44. Schema Review

The rendered schema audit found zero unsupported Review/AggregateRating/Offer types, mismatched service/article URLs or FAQ visibility failures on B4 paths. FAQPage data reflects visible answers. Existing breadcrumb and local business structures were retained.

## 45. Canonical / Indexability Regression

The entire 1,247-route before/after comparison found zero route, canonical, robots/noindex or language-policy changes. Both best-workshop URLs retain their prior behavior. Sitemap membership remains 996 canonical URLs, with modification dates updated only for changed B4 content.

## 46. Ferrari Cannibalization Regression

Hub = broad service discovery; best-workshop = selection criteria; model = vehicle-specific considerations; maintenance guide = planning/cost; diagnostics = investigation; transmission = gearbox service. The map assigns one editorial owner per normalized task. Query × page evidence is unavailable, so ranking cannibalization is **not confirmed**.

## 47. Lamborghini Cannibalization Regression

The Lamborghini hub, best-workshop, services, Urus guide and maintenance guide retain distinct tasks. The camera section belongs to electrical fault assessment, not the broad hub. Query-only evidence does not prove a ranking-page conflict.

## 48. Duplicate Content Review

Substantive rendered `<p>`/`<li>` text of at least 130 characters was compared within each brand and across brands, excluding navigation, footer and contact chrome. No same-brand pair had three or more exact long-paragraph overlaps. The cross-brand guide overlap was removed; remaining shared AC/body/workshop process copy was retained where factually useful.

## 49. Ferrari Keyword Coverage

All 401 normalized tasks have an existing editorial owner or a documented intentional non-target reason: 331 primary, 26 secondary, 20 section, seven guide, six model and 11 intentionally untargeted. These are intent placements, not a claim of verbatim keyword presence. Zero classified gaps remain.

## 50. Lamborghini Keyword Coverage

All 396 normalized tasks have an owner or intentional non-target reason: 329 primary, 26 secondary, 24 section, six guide, one model and ten intentionally untargeted. The measured camera term is covered by the improved electrical owner. Zero classified gaps remain.

## 51. Remaining Gaps

No unresolved **intent** gap remains. Generated key-programming, seat, soft-close, sunroof and tailgate phrases were intentionally not targeted because exact capability is unverified. [Gap decisions](b4-ferrari-lamborghini-gap-decisions.md) record missing-service/system/symptom/model/guide choices and future evidence requirements separately.

## 52. CTR Opportunities

Latest query-only GSC rows show Ferrari “service dubai” (434 impressions, position 15.85, zero clicks) and “repair dubai” (356, position 20.6, zero clicks); Lamborghini “service dubai” (293, position 18.68, zero clicks) and “repair dubai” (276, position 25.93, zero clicks). Lamborghini reversing-camera wording has 213 impressions at position 22.77 and now has a more explicit existing owner. [Ferrari](outputs/b4/ferrari-ctr-opportunities.csv) and [Lamborghini](outputs/b4/lamborghini-ctr-opportunities.csv) files list all latest measured terms; no ranking URL is inferred. No clickbait title change was made without page-level evidence.

## 53. Mobile / Desktop QA

Browser testing covered 34 representative routes at 1,440 px and 390 px, including both hubs, major services, Ferrari model pages, the Urus guide, both maintenance guides, English/Arabic best-workshop pages, Arabic hubs and representative previous-brand hubs. Sixty-eight page checks and 16 FAQ interactions passed with no tested overflow, visible broken image, console hydration error or runtime error. [Results](outputs/b4/browser/verification.json) include screenshots.

## 54. No-JavaScript QA

The rendered audit checked initial metadata, canonical, robots, H1, body and links for every B4-path route; zero failures. Twelve representative routes also passed in a JavaScript-disabled browser. SEO-critical FAQs and content do not require hydration to exist in HTML.

## 55. Build / Test Results

TypeScript and the production build passed. The build prerendered 1,247 routes, generated 996 sitemap canonicals and 263 redirects, and passed all existing routing/SEO validators. Rendered schema, links, FAQ, image, no-JS and mobile/desktop checks passed. The [regression report](b4-ferrari-lamborghini-regression-report.md) records details.

## 56. B0-A Preservation

The B0-A routing response test passed and the generated verifier reported unchanged routing collections and 404 behavior. The before/after route set and policy fields are identical; generated asset references changed as expected after a build.

## 57. B1 Mercedes Preservation

Mercedes SEO objects and substantive rendered main content, links and image attributes have zero changes against the preserved B3 snapshot. Representative Mercedes browser checks passed.

## 58. B2 Porsche Preservation

Porsche SEO objects and substantive rendered output have zero changes. Representative Porsche browser checks passed.

## 59. B3 BMW Preservation

BMW SEO objects and substantive rendered output have zero changes. Representative BMW browser checks passed.

## 60. Remaining Risks

The GSC files are query-only and their periods overlap; none proves a ranking URL, cannibalization or post-launch improvement. The current implementation verifies local HTML and browser behavior only. Some shared AC/body/workshop-process copy remains across brands; it is limited and factual, but future page-level performance evidence may justify further differentiation. The supplied B4 continuation stops during Deliverable 4; the remaining register filenames and columns were inferred from the approved B2/B3 format and may need adjustment if the omitted brief specifies otherwise.

## 61. Future Ferrari Opportunities

Review Ferrari query × page data, CTR and conversion paths after deployment by the site owner. Consider deeper model/problem material only if demand, actual workshop evidence and a distinct task justify it. Verify exact proprietary-tool or high-voltage capabilities before any corresponding marketing claim.

## 62. Future Lamborghini Opportunities

Review query × page evidence for broad hub, Urus and reversing-camera terms. A dedicated Huracán/Aventador/Revuelto page or camera-installation page requires distinct measured intent and confirmed workshop scope; no speculative route is proposed now.

## 63. Final PASS / PARTIAL / FAIL

**PASS — READY FOR REVIEW.** Local B4 implementation passed route, content, schema, FAQ, link, build, browser and prior-batch regression checks. It makes no claim that rankings or leads have improved. All work remains local and uncommitted.
