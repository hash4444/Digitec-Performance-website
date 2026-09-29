# B1 Mercedes guides — scoped implementation handoff

28 September 2026. Local edits began only after the parent confirmed the completed keyword-owner-map checkpoint. No new page, URL, redirect, route, canonical policy, robots policy, noindex rule or B0-A file was changed by this subtask. No commit, push or deployment.

## Outcome

The five existing guides now have distinct purposes. Maintenance planning has an independent English/Arabic article body about records, due work, condition, storage and follow-up. It no longer inherits the generic workshop-selection and repair-sales template or Service schema. Its graph contains WebPage, BreadcrumbList, BlogPosting and the matching user-accessible FAQ. Oil-provider selection is distinct from oil booking. The warning overview uses possible symptom patterns and links to existing problem/service owners, without unsupported failure prevalence, workshop comparisons or guaranteed savings. ASSYST and cost pages keep their established roles, with focused clarifications and links.

Arabic content was inspected independently. Existing bespoke Arabic oil/interval/cost/problem bodies were retained and improved, while maintenance received a full planning adaptation. Only existing Arabic destinations are linked. No Arabic head-unit/audio service counterparts were found in the baseline route inventory; their Arabic overview enquiry goes to the existing Mercedes hub. No Arabic model/problem route is invented.

## Pages affected

| Existing path (English and existing `/ar` counterpart) | Change |
| --- | --- |
| `/blog/mercedes-benz-maintenance-guide-dubai` | Dedicated maintenance-planning body, metadata, four planning FAQs, Article graph, informational links and one service-hub next step; published date retained, real modification date 2026-09-28. |
| `/blog/mercedes-service-intervals-dubai-heat` | ASSYST/time-distance and difficult-use qualification, completion versus reset distinction, unique FAQs, links. Existing English title/description/URL retained; Arabic metadata sharpened to ASSYST task. |
| `/blog/mercedes-service-cost-dubai-guide` | A/B scope clarification and like-for-like quote guidance, links and focused Arabic FAQs. Existing English title/description/URL retained. No fixed prices. |
| `/blog/best-oil-change-dubai-mercedes` | Selection-led metadata and English checklist; Arabic scope distinction and links. No claims that a category of workshop is inherently worse. Booking link remains oil-service owner. |
| `/blog/mercedes-repair-dubai-complete-guide` | Warning-sign overview covering engine/cooling/oil, suspension, shifting, battery/no-start, AC and head-unit versus audio upgrade. Qualified claims; existing dedicated owners linked. |

Related supporting guides, explicitly authorized after audit:

* `/blog/transmission-service-7g-9g-dubai`: retains cross-brand 7G/9G/ZF scope. Removed blanket earlier-service/failure claims; confirmed exact-unit schedule/fluid/procedure, added Mercedes-specific onward links. Primary related CTA uses generic transmission owner. Existing title/meta title/meta description retained.
* `/blog/air-suspension-repair-dubai-guide`: retains cross-brand scope. Removed unsupported majority-failure/heat/UV claims and universal calibration promise; qualified assessment and added Mercedes links. Meta description corrected; title/meta title retained. Primary related CTA uses generic suspension owner.
* Existing Arabic counterparts of those two generic guides: their pre-existing bespoke bodies remain; the related CTA now goes to the actual generic service owner instead of a Mercedes-only owner.
* Four existing Arabic C/E/S-Class/G63 model articles: coordinated renderer support for their agent-authored `block.links` and scoped 2026-09-28 modification dates. Model content belongs to the technical agent; no model record or path was edited here.

## Source files edited

1. `src/data/blogPosts.ts` — only oil-selection, interval and common-problem records.
2. `src/data/aiGuidePosts.ts` — only Mercedes cost record.
3. `src/data/aiGuidePostsExtra.ts` — only the two authorized cross-brand supporting guides.
4. `src/data/brandWorkshopArticles.ts` — Mercedes metadata/profile/title; optional read-time field with unchanged fallback for other brands.
5. `src/data/mercedesMaintenanceGuide.ts` — new EN/AR planning-data helper for the existing page, not a route.
6. `src/pages/BrandWorkshopArticlePage.tsx` — separate Mercedes maintenance component chosen only by existing slug; other brand renderer unchanged.
7. `src/pages/BlogPost.tsx` — related CTA fixes and scoped Arabic content-link rendering for four Mercedes guides and four existing model records.
8. `src/i18n/ar-blog.ts` — Mercedes guide metadata, maintenance summaries and date stamp scoped to eight substantively edited guide/model adaptations.
9. `src/i18n/ar-service-blog-content.ts` — only Mercedes oil and interval bodies.
10. `src/i18n/ar-general-blog-content.ts` — only Mercedes cost body.
11. `src/i18n/ar-specialist-blog-content.ts` — only Mercedes problem overview.

## Verification

* App TypeScript check passed after content and Arabic edits: bundled Node + `node_modules/typescript/bin/tsc --noEmit -p tsconfig.app.json`.
* `verify-guide-scope.mjs` / `guides-source-qa.json`: AST-based comparison with the B1 source snapshot found exactly the allowed records changed in the six content collections, with zero unexpected records and zero missing internal-link targets. The first check caught two nonexistent Arabic service links; these were corrected before the passing result.
* The dedicated maintenance helper's internal paths were checked against the baseline route list. English problem paths are only used in its English branch; Arabic uses the existing Arabic overview.
* Integrated production build, prerender/route assertions and visual verification remain parent-owned. Do not describe them as complete from this report alone.

## Technical sources used

* [Mercedes-Benz Operating Fluids](https://operatingfluids.mercedes-benz.com/) and [engine applicability sheet 223.2](https://operatingfluids.mercedes-benz.com/sheet/223.2/en): exact application and approval matter; viscosity alone is insufficient. The oil-selection guide links the official portal.
* [Mercedes S-Class 2023 special service requirements](https://www.mercedes-benz-mena.com/iraq/en/services/manuals/s-class-saloon-2023-03-w223-mbux/assyst-plus-service-interval-display/notes-on-special-service-requirements/): demanding operating conditions may require more frequent maintenance. Used as a model-specific illustration, not a universal Dubai schedule.
* [Mercedes USA service and maintenance](https://www.mbusa.com/en/owners/service-maintenance): A/B have scheduled scopes beyond oil alone. US mileage/timing was not copied into Dubai content.
* [Mercedes Dubai service/warranty products](https://www.mercedes-benz-mena.com/dubai/en/services/service-warranty-products/): package coverage differs by model; package duration is not a maintenance interval. No dealer programme claims copied to DIGI-TEC.
* [Mercedes AIRMATIC and ABC components](https://b2bconnect.mercedes-benz.com/gb/products/remanufactured-parts/cars/suspension): different systems; qualify AIRMATIC fitment.
* [ZF lubricants and application lists](https://aftermarket.zf.com/en/aftermarket-portal/our-catalog/lubricants/) and [ZF matched oil-change kits](https://aftermarket.zf.com/en/aftermarket-portal/our-portfolio/passenger-cars/products/oil-oil-change-kits/): use the relevant transmission/application guidance; do not invent a shared Dubai interval or universal fluid.

XENTRY availability is user-confirmed. Vehicle/module/function support remains qualified. No fixed failure rate, diagnosis guarantee, fixed price, OEM authorization or unrestricted coding claim has been added. FAQ markup mirrors the article's questions; no search rich-result benefit is claimed.
