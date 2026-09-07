# Aston Martin implementation — 7 September 2026

## Scope and baseline

Existing hub and 14 service URLs retained, together with the workshop-selection and DB11 guides. No new public routes, redirects, noindex decisions or deployment. Shared Audi, Bentley and ROX work was present and retained.

Independently reopened the September 5 GSC export. Pages!A11:E11: hub 819 impressions, 2 clicks, exported CTR 0.24%, average position 16.72. All 21 observed query rows are recorded with exact cells in aston-martin-keyword-map.csv: 698 impressions and zero clicks. These are historical aggregates, not volumes or current ranks. The brake and transmission query averages do not establish the ranking of their dedicated pages. Ownership is proposed pending page-filtered query data.

## Before and after

The existing hub title was Aston Martin Service Dubai | Repair & Diagnostics; it now reads Aston Martin Service & Repair Dubai | DIGI-TEC. Its H1 uses Aston Martin Service & Repair Dubai. Meta description: Independent Aston Martin service and repair in Al Quoz, Dubai. Contact DIGI-TEC for maintenance, diagnostics and a vehicle-specific service estimate.

The shared profile formerly applied a ZF eight-speed transaxle, one suspension layout, and F1 Edition carbon-ceramic wording to the brand. These have been replaced by vehicle-specific descriptions. All 14 English service routes receive distinct concerns, inspection steps, metadata, quotation factors and service-specific FAQ answers. Transmission and brake copy no longer diagnoses components from judder, noise or pad-wear patterns alone. Mechanical repair is distinct from diagnostics. Low-voltage battery scope is explicit.

The DB11 guide retains its publication date. Removed unsupported weekend-car prevalence, universal annual schedule, blanket parts policy and blanket diagnostic-function promises. The workshop guide now uses “an Aston Martin,” removes its public image-production note and has relevant hub/DB11/brake/transmission links. Its substantive modification date is September 7. Sitemap modification dates record changed English routes; existing Arabic routes and language relationships remain available. Arabic translations require a separate editorial review.

## Files

- src/data/astonMartinHubContent.ts: service content, FAQs, overview and WhatsApp draft.
- src/components/AstonMartinHubSections.tsx: customer-facing service/model/estimate/proof sections.
- src/pages/BrandPage.tsx: Aston Martin integration, schema offers, FAQ rendering and CTAs.
- src/pages/BrandServicePage.tsx: Aston Martin service overrides and corrected model heading.
- src/data/brandServices.ts: corrected vehicle profile.
- src/data/priorityBrandSeo.ts: hub metadata.
- src/data/aiGuidePostsExtra.ts: DB11 corrections.
- src/data/brandWorkshopArticles.ts and src/pages/BrandWorkshopArticlePage.tsx: workshop guide corrections.
- src/pages/BlogPost.tsx: DB11 return link.
- src/lib/route-manifest.ts, public/sitemap.xml and docs/seo/route-schema-matrix.csv: generated SEO records.

## Exact link architecture

Base: /brands/aston-martin-service-dubai. Children: oil-change, engine-diagnostics, mechanical-repair, brake-repair, transmission-repair, suspension-repair, battery-replacement, ac-repair, electrical-repair, body-repair, steering-repair, exhaust-repair, fuel-system-repair, tire-repair. The hub links to all 14. Service breadcrumbs return to the hub. Guides: /blog/aston-martin-best-workshop-dubai and /blog/aston-martin-db11-service-dubai-guide. Both have a relevant return link to the hub. No speculative model pages added.

## Evidence and capability gaps

Manufacturer facts were checked at https://www.astonmartin.com/en-au/models/dbx707 and https://v12vantages.astonmartin.com/. DBX707 and historic V12 Vantage S have different transmission architectures. These facts establish vehicle specifications, not DIGI-TEC capability.

Confirm AMDS functions, coding/programming, calibration, structural/body procedures, PPI scope, internal engine/gearbox work and rare-model coverage before promoting them. The existing workshop photo is reused; no invented jobs, reviews, credentials or years of brand specialization added. Future proof needs permissioned job records, technician/tool documentation and photographs tied to actual work.

## Conversion and schema

Existing phone and WhatsApp destinations reused. Direct enquiry does not require a VIN. Existing form validation and WhatsApp draft behaviour inspected: it opens a chat rather than sending a message or confirming an appointment. Existing analytics records draft openings without names, phone numbers, VINs or free text in event payloads. No new tracker or booking-success event. Existing business graph, breadcrumbs, service entities and visible FAQs reused. No ratings or prices added; no FAQ-rich-result promise.

## Validation and limitations

TypeScript application check passed. Client and SSR builds passed. Prerender and SEO validation covered 1,437 routes and 1,157 sitemap URLs. Routing checks passed. Targeted lint had zero errors and two hook-dependency warnings. Existing build warnings include large chunks and fetchPriority casing. Rendered inspection found one H1 per Aston Martin route, correct service titles and no old Models We headings or universal ZF-transaxle phrase. Mobile hero and FAQ expansion checked locally; desktop layout sampled. No production verification or Lighthouse/Core Web Vitals score claimed. No enquiry was sent during testing.

## Next measurement and backlog

After publication and crawling, compare equal 28-day windows with matching GSC filters; split hub, service pages and guides. Obtain page-filtered queries before claiming cannibalisation. Track qualified enquiries and actual bookings separately from clicks and chat openings.

1. Confirm capabilities and add documented Aston Martin repair proof.
2. Review page-filtered engine/brake/transmission queries after recrawl.
3. Consider DBX or Vantage content only when distinct demand and useful evidence justify it.
4. Review Arabic translations against corrected technical scope.

Abu Dhabi queries are excluded from local targeting; near-me demand is supported through location/directions. “Service C” is deferred. Proposed PPI and structural-repair promotion is deferred pending evidence.
