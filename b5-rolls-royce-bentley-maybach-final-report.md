# B5 Rolls-Royce, Bentley and Maybach final report

Local evidence captured 2026-09-29. This is an implementation review, not evidence of changed rankings.

## 1. Executive Summary

B5 local implementation is **PASS — ready for review**. The three 34-route clusters retain their architecture and route policy; B5 clarified Bentley camera fault ownership, strengthened Maybach hub navigation, differentiated English/Arabic selection guides, and exposed relevant FAQ answers in initial HTML. Production validators, rendered audits and browser checks against actual prerendered HTML pass. This is not evidence of improved rankings or leads.

## 2. Scope Completed

Reviewed 102 existing brand-path URLs: 34 Rolls-Royce, 34 Bentley and 34 Maybach. Eleven rendered URLs changed (3/4/4 respectively). No new route was created. Source changes are scoped to `BentleyCameraSection.tsx`, `BrandPage.tsx`, `BrandWorkshopArticlePage.tsx`, `B5SelectionGuideBody.tsx` and B5 article dates in `brandWorkshopArticles.ts`.

## 3. Rolls-Royce Existing Architecture

34 existing URLs: English and Arabic hubs; 14 service routes per language; English and Arabic best-workshop selection guides and Ghost owner guides. No dedicated model routes. The broad hub remains the commercial owner.

## 4. Bentley Existing Architecture

34 URLs with the same route types. The Continental GT owner guide is informational. The electrical-repair page already owns a Bentley reverse-camera section; B5 retained that URL.

## 5. Maybach Existing Architecture

34 URLs with an S580 owner guide and English/Arabic selection guides. The hub is the Maybach booking owner; Mercedes S-Class and GLS routes remain B1 owners for non-Maybach searches.

## 6. Rolls-Royce Keyword Evidence

Workbook/GSC map: 501 source observations, 406 raw strings, 382 normalized terms, 17 measured original-GSC normalized terms. Latest overlapping six-month export contributes 13 query rows; those rows are not assigned to historical landing pages.

## 7. Bentley Keyword Evidence

Workbook/GSC map: 538 source observations, 408 raw strings, 384 normalized terms, 25 measured original-GSC normalized terms. Latest overlapping six-month export contributes 17 query rows; those rows are not assigned to historical landing pages.

## 8. Maybach Keyword Evidence

Workbook/GSC map: 428 source observations, 400 raw strings, 379 normalized terms, 5 measured original-GSC normalized terms. Latest overlapping six-month export contributes 4 query rows; those rows are not assigned to historical landing pages.

## 9. Keyword Normalization

Brand spelling, hyphens, case, local modifiers and close variants were normalized while original source rows remained traceable. Overlapping GSC exports were not summed. Generated/research terms have blank GSC metrics unless separately measured in an original export. Query-only observations are not attributed to a ranking page.

## 10. Rolls-Royce Keyword → Owner Map

The primary-owner map is in `b5-rolls-royce-intent-ownership.csv`, with every source observation preserved in `outputs/b5/rolls-royce-keyword-owner-records.csv`. Broad intent maps to the hub; service tasks to existing commercial pages; selection/cost planning to existing guides; unverified services are explicitly excluded. No unresolved editorial primary-owner conflict was found.

## 11. Bentley Keyword → Owner Map

The primary-owner map is in `b5-bentley-intent-ownership.csv`, with every source observation preserved in `outputs/b5/bentley-keyword-owner-records.csv`. Broad intent maps to the hub; service tasks to existing commercial pages; selection/cost planning to existing guides; unverified services are explicitly excluded. No unresolved editorial primary-owner conflict was found.

## 12. Maybach Keyword → Owner Map

The primary-owner map is in `b5-maybach-intent-ownership.csv`, with every source observation preserved in `outputs/b5/maybach-keyword-owner-records.csv`. Broad intent maps to the hub; service tasks to existing commercial pages; selection/cost planning to existing guides; unverified services are explicitly excluded. No unresolved editorial primary-owner conflict was found.

## 13. Rolls-Royce Hub Review

The existing Rolls-Royce hub already has a distinct service/repair title and vehicle-specific scope. It was retained. The rendered English hub did not change; the Arabic hub now has visible initial-HTML FAQ answers matching its schema.

## 14. Bentley Hub Review

The Bentley hub remains the broad brand owner. Its contextual camera link points to the existing electrical page section. The Arabic hub now exposes FAQ answers in initial HTML.

## 15. Maybach Hub Review

The Maybach hub now asks for S-Class/GLS VIN and fitted comfort/chassis details, links to the Maybach S580 guide, suspension and diagnostics owners, and identifies standard Mercedes S-Class/GLS as a separate family. The hub title and canonical were retained.

## 16. Best-Workshop / Selection Review

Each brand has English and Arabic `/blog/{brand}-best-workshop-dubai` selection guides. Their primary task is how to assess workshop fit, distinct from the hub booking task. B5 replaced the shared long-form body with brand-specific English/Arabic guidance and made FAQ answers available in initial HTML. Article modification dates reflect the substantive update.

## 17. Rolls-Royce Commercial Services

14 commercial-service routes per language were reviewed for Rolls-Royce. Existing diagnostics, transmission, suspension and oil-service copy uses fitted-system and model qualifiers; Spectre is excluded from combustion work. No thin new service route was created.

## 18. Bentley Commercial Services

14 service routes per language were reviewed for Bentley. The measured camera term now has a clearer fault-assessment section on electrical repair, with installation treated as a separate request. Other existing service routes were retained.

## 19. Maybach Commercial Services

14 service routes per language were reviewed for Maybach. Their primary task is badge-specific inspection or booking by service. Their inherited templates remain a differentiation opportunity; no Mercedes B1 page was rewritten.

## 20. Diagnostics Review

Rolls-Royce and Bentley diagnostic pages avoid treating a fault code as proof of a failed part. Maybach-compatible diagnostic functions must be checked against VIN and supported access; XENTRY is not a universal programming promise.

## 21. Engine / Mechanical Review

Rolls-Royce Spectre is not given oil, spark-plug or exhaust advice. Bentley current hybrid and older combustion generations are not collapsed into one architecture. Maybach engine work follows the fitted powertrain and diagnosis.

## 22. Transmission Review

Each brand has its own transmission owner. Shift symptoms are not equated with gearbox replacement; unit, history, fluid specification and supported procedures are confirmed first.

## 23. Suspension / Ride-System Review

Air/active suspension language remains conditional on model, year and equipment. Maybach AIRMATIC and E-ACTIVE BODY CONTROL are separated; one ride-height symptom does not prove a strut failure.

## 24. Brake Review

Existing brake owners were retained. No carbon-ceramic or model-wide equipment assertion was introduced. Warning, wear and hydraulic concerns require vehicle-specific inspection.

## 25. AC Review

Existing AC owners were retained; refrigerant and multi-zone configuration depend on the vehicle label and fitted climate system. Maybach rear-cabin climate intent stays on the Maybach service owner.

## 26. Electrical / Battery Review

Battery pages are low-voltage commercial owners. Electrical symptoms can involve supply, wiring, modules or fitted equipment. No high-voltage repair or universal registration claim was added.

## 27. Bentley Reverse-Camera Review

The latest original GSC export shows “bentley reverse camera in dubai”: 354 impressions, 0 clicks, 0% CTR, position 44.35. Selected owner: `/brands/bentley-service-dubai/electrical-repair#reverse-camera`. Fault assessment now leads; retrofit remains separate. See the focused camera report.

## 28. Infotainment / Screen / Audio Review

Fitted COMAND/MBUX, rear-cabin, screen and camera issues are handled through the relevant electrical/diagnostic owner. No unsupported proprietary-tool or module-programming claim was introduced.

## 29. Maybach / Mercedes System-Boundary Review

Maybach owners retain Maybach booking pages; generic Mercedes system education and service pages retain B1 ownership. The detailed eleven-intent boundary table is in `b5-maybach-mercedes-boundary.md`.

## 30. Rolls-Royce Model Review

Ghost guide supplies existing model-specific owner planning. Cullinan, Phantom, Wraith, Dawn and Spectre remain hub/section topics pending measured demand and verified unique workshop scope; no model × service pages were added.

## 31. Bentley Model Review

Continental GT guide is the existing model information owner. Bentayga and Flying Spur remain hub/service topics; powertrain and fitted camera/suspension equipment are not universalized.

## 32. Maybach Model Review

S580 guide is informational and Maybach-specific. S680 and GLS 600 are addressed in hub/service context; the wider Mercedes S-Class/GLS guides retain separate ownership.

## 33. Spectre / EV Review

Rolls-Royce manufacturer evidence establishes Spectre as fully electric. B5 does not target Spectre with combustion service or claim high-voltage repair. A dedicated Spectre page is deferred until capability and demand are verified.

## 34. Hybrid / Electrified Vehicle Review

Current Bentley Continental GT hybrid information cannot be applied to every earlier GT. Maybach electrified variants likewise need VIN-specific scope. High-voltage workshop capability remains unverified.

## 35. Problem / Symptom Review

Suspension drop, shift warnings, low voltage and camera loss are not remote diagnoses. The commercial service pages provide possible-system categories and an inspection next step; no thin symptom routes were added.

## 36. Maintenance / Interval Review

No fixed universal mileage/time interval, oil grade, fluid cycle or package was introduced. Planning intent stays with existing owner/selection guides and relevant services, subject to exact model and history.

## 37. Cost Intent Review

Cost terms are mapped to existing guide/hub/service owners. Estimates depend on scope, diagnosis, parts, labour, fluids, access and approved work; no fixed prices were invented.

## 38. FAQ Review

The rendered audit checked 146 Rolls-Royce, 159 Bentley and 159 Maybach FAQ pairs. All emitted FAQ questions and answers are visible in initial HTML after the scoped Arabic hub and guide fixes. Existing FAQ filtering was preserved.

## 39. Internal Linking Review

Rendered contextual links checked: 625 Rolls-Royce, 590 Bentley, 584 Maybach. The B5 audit found zero broken links, zero redirecting internal links and zero missing fragments. Maybach hub links distinguish its own services from Mercedes references.

## 40. Orphan / Crawl-Depth Review

No brand-path page was contextually orphaned in the rendered graph. Maximum same-language depth was 4 for each brand. The graph is based on rendered links and excludes navigation/footer as contextual inbound evidence.

## 41. Technical Claim Review

Technical claims were checked against manufacturer sources listed in the source register and existing DIGI-TEC facts. Vehicle-specific qualifiers are retained; no manufacturer authorization, universal equipment or high-voltage workshop scope was invented.

## 42. Content Quality Review

The camera, Maybach hub and six selection-guide updates describe actual driver tasks and inspection paths rather than generic luxury adjectives. The guide rewrite removed all exact long-paragraph overlap among the six B5 selection guides.

## 43. Three-Brand Differentiation Review

The three hubs and commercial owners have separate brand paths and primary tasks. Exact-paragraph analysis now finds 23 long paragraphs shared across different B5/Mercedes clusters, down from 51 before the guide rewrite. Residual examples are common workshop-process, booking and service-check wording; zero long substantive paragraphs are shared among the six B5 selection guides.

## 44. Maybach vs Mercedes Duplication Review

Maybach and Mercedes rendered content and SEO were compared. B1 Mercedes has zero changed SEO records and zero changed substantive body/link/image signatures in this B5 build. Maybach has its own hub and selection-guide context; shared Mercedes technical facts and common process wording remain appropriate where accurate.

## 45. E-E-A-T / Trust Review

Trust content relies on the existing Al Quoz workshop, contact channels and inspection/quote process. No authorization, dealer status, certification, warranty, reviews, counts or proprietary tool capability was invented.

## 46. Image / Alt Review

Rendered image audit found zero missing image sources, obvious alt stuffing or broken local image references on the 102 B5 URLs. Existing descriptive alt text and decorative behavior were retained.

## 47. CTA Review

Commercial pages use booking/inspection/quote paths; problem sections point to assessment. No free diagnostics, instant diagnosis, guaranteed repair or unverified same-day claim was added.

## 48. Local SEO Review

Dubai and Al Quoz occur where service location matters. No neighborhood doorway route or fictitious branch was created.

## 49. Arabic Review

All existing 51 Arabic B5 routes were included in the 102-route review. Arabic canonicals, robots, hreflang and language destinations were retained. No synthetic Arabic model or symptom routes were created.

## 50. Schema Review

Schema URLs, breadcrumbs and FAQ visibility were checked against rendered HTML. The B5 audit found zero schema/FAQ alignment issues after the fix; no Review, AggregateRating, Offer or price schema was added.

## 51. Canonical / Indexability Regression

Baseline-versus-final comparison shows zero route, canonical, noindex or hreflang policy changes. The sitemap still has 996 canonical URLs. No best-workshop consolidation or redirect was made.

## 52. Rolls-Royce Cannibalization Regression

Rolls-Royce hub owns broad booking; the selection guide owns choosing a workshop; the Ghost guide is model planning; services own specific repair. This is editorial intent separation, not proof about live SERP behavior.

## 53. Bentley Cannibalization Regression

Bentley hub, camera section, service pages, Continental GT guide and selection guide have distinct tasks. Query × landing-page data are required before any claim of observed cannibalization.

## 54. Maybach Cannibalization Regression

Maybach hub and services serve Maybach enquiries; Mercedes B1 remains the generic family owner. The S580 guide and Mercedes S-Class guide have different scopes. No query × page evidence proves or disproves live overlap.

## 55. Duplicate Content Review

Exact long-paragraph comparison fell from 51 to 23 cross-brand matches after the guide rewrite. The six B5 selection guides now share zero long substantive paragraphs with each other. Remaining matches are common contact/booking, inspection and service-procedure wording; no brand-specific selection narrative is duplicated.

## 56. Rolls-Royce Keyword Coverage

382 normalized terms. COVERED — GUIDE: 6; COVERED — MODEL: 1; COVERED — PRIMARY: 317; COVERED — SECONDARY: 26; COVERED — SECTION: 20; NOT TARGETED — INTENTIONALLY: 12. Measured original-GSC normalized terms: 17. The CSV records exact source and chosen owner; semantic coverage is not verbatim insertion.

## 57. Bentley Keyword Coverage

384 normalized terms. COVERED — GUIDE: 6; COVERED — MODEL: 1; COVERED — PRIMARY: 313; COVERED — SECONDARY: 26; COVERED — SECTION: 28; NOT TARGETED — INTENTIONALLY: 10. Measured original-GSC normalized terms: 25. The CSV records exact source and chosen owner; semantic coverage is not verbatim insertion.

## 58. Maybach Keyword Coverage

379 normalized terms. COVERED — GUIDE: 5; COVERED — MODEL: 3; COVERED — PRIMARY: 315; COVERED — SECONDARY: 26; COVERED — SECTION: 20; NOT TARGETED — INTENTIONALLY: 10. Measured original-GSC normalized terms: 5. The CSV records exact source and chosen owner; semantic coverage is not verbatim insertion.

## 59. Remaining Gaps

The gap-decision register documents 46 strategic or intentionally untargeted decisions. No unresolved normalized keyword is classified GAP — REVIEW REQUIRED; this means an editorial owner or explicit exclusion was assigned, not that every phrase was inserted on-page.

## 60. CTR Opportunities

CTR opportunities are based on the latest original six-month query export; no query is attributed to a ranking URL. Bentley reverse camera is the largest B5-specific opportunity at 354 impressions and position 44.35. Low CTR alone does not establish title quality or the historical landing page.

## 61. Bentley Reverse-Camera Final Ownership

Brand-specific electrical repair is selected for Bentley reverse-camera fault assessment. The same page separates installation. No new camera URL was created. See `b5-bentley-reverse-camera-ownership.md`.

## 62. Maybach / Mercedes Final Ownership

The boundary table covers broad service, S-Class, GLS, suspension, diagnostics, transmission, electrical, AC, battery, COMAND/MBUX and maintenance. Zero unresolved editorial primary-owner conflicts; no B1 Mercedes changes.

## 63. Model Quality Review

Model owners were reviewed as groups. Ghost, Continental GT and S580 already have guides; other model names are covered only where the hub/service task is useful. Model names were not used to manufacture thin pages or universal failure claims.

## 64. EV / Hybrid Safety QA

Spectre and current Bentley hybrid contexts were checked against manufacturer evidence. Existing ICE guidance is not presented as EV work, and the B5 additions do not claim high-voltage repair capability.

## 65. Internal-Link Final QA

Final rendered graph: 1799 B5 contextual links checked, zero broken, zero redirecting, zero missing fragments, zero contextual orphans; maximum same-language depth 4 for each brand.

## 66. Mobile / Desktop QA

The browser exercised 39 representative routes at 1440px and 390px (78 checks) against actual prerendered route HTML. Titles, descriptions, canonical, one H1, schema count, visible images, links, overflow and hydration checks passed. An initial Vite-preview run served generic root HTML for extensionless URLs and produced false hydration errors; the correct static-route server resolved that test-fixture error.

## 67. No-JavaScript QA

The same 39 representative routes loaded with JavaScript disabled and exposed one H1, secondary headings and route schema. Rendered audit separately checked substantive initial HTML, metadata and links. No-JavaScript SEO checks passed.

## 68. Build / Test Results

`npx tsc --noEmit` passed. `npm run build` passed all existing production validators, prerendered 1247 routes and generated a 996-URL sitemap. Correct prerendered-route browser QA passed; no validator was weakened.

## 69. B0-A Preservation

B0-A route, locale, canonical, robots and hreflang policy comparison: zero changes.

## 70. B1 Mercedes Preservation

B1 Mercedes: zero SEO and substantive rendered content/link/image differences; dedicated Maybach-vs-Mercedes boundary review is attached.

## 71. B2 Porsche Preservation

B2 Porsche: zero SEO and substantive rendered differences.

## 72. B3 BMW Preservation

B3 BMW: zero SEO and substantive rendered differences.

## 73. B4 Ferrari Preservation

B4 Ferrari: zero SEO and substantive rendered differences.

## 74. B4 Lamborghini Preservation

B4 Lamborghini: zero SEO and substantive rendered differences.

## 75. Remaining Risks

No blocking local QA issue remains. Evidence limits: original GSC exports lack query × page joins; live ranking, CTR and lead effects cannot be measured locally; exact Bentley installation compatibility and EV/high-voltage service scope require vehicle/business confirmation.

## 76. Future Rolls-Royce Opportunities

If Rolls-Royce model query demand and real workshop evidence justify it, add unique Cullinan or Spectre content; confirm EV scope first. Improve selection-guide specificity before a new URL.

## 77. Future Bentley Opportunities

Validate camera query × page data and enquiries after release. Consider a dedicated camera page only if distinct repair or installation demand and conversion evidence justify it; improve inherited selection copy.

## 78. Future Maybach Opportunities

Collect Maybach S-Class/GLS query × page data and workshop evidence. Improve inherited service differentiation within Maybach without changing B1 Mercedes or creating model × service combinations.

## 79. Final PASS / PARTIAL / FAIL

**PASS — B5 READY FOR REVIEW.** No commit, push or deployment was performed. Rankings, CTR and leads cannot be assessed before release and recrawl.

