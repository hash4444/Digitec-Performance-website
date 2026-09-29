# Rolls-Royce SEO and lead-generation upgrade

Implementation date: 2026-09-05  
Scope: local repository only; not deployed to production.

## 1. Search Console baseline

Source: `digitecme.com-Performance-on-Search-2026-09-05.xlsx`, Web search, last 28 days, chart dates 2026-08-06 to 2026-09-02.

- English hub: 667 impressions, 1 click, 0.15% CTR, average position 18.25 (`Pages!A24:E24`).
- Twelve explicit Rolls-Royce query rows: 573 impressions, zero clicks. These are query-sheet aggregates and are not attributed to individual URLs.
- Supporting samples: engine diagnostics 8 impressions / position 2.25; transmission 4 / 12.75; oil change 7 / 9.86; Ghost guide 7 / 4.00; workshop guide 9 / 8.11. The samples are too small to treat as stable rankings.
- `ppf spectre`: 36 impressions, zero clicks, position 46.39. Kept outside the 573-impression total because the intent is ambiguous and may belong to detailing/PPF content.

The full ownership map is in `docs/seo/rolls-royce-keyword-map.csv`. Impressions are not keyword search volumes and no ranking or traffic forecast is made.

## 2. Before and after

Before:

- Hub title: `Rolls-Royce Service Dubai | Independent Workshop`.
- Hub H1: `Rolls-Royce Repair & Service Dubai`.
- Broad generic sections mixed model generations and service intent.
- The shared service template produced headings such as `Rolls-Royce Models We Suspension Repair`.
- AC, suspension, transmission and Ghost-guide copy contained claims that were too universal or insufficiently evidenced.
- Contact clicks were treated as generated leads even when they only opened a channel.

After:

- The existing hub URL owns broad service, repair, workshop, garage and independent-specialist intent.
- The hub now has a Rolls-Royce-specific introduction, eight priority service summaries, all 14 existing service links, model groups, assessment/quotation steps, genuine workshop context, cost guidance, ten visible FAQs and multiple contact actions.
- Priority child pages have distinct service-specific titles, H1s, descriptions, symptom explanations, assessment steps and FAQs.
- The Ghost and workshop-selection guides link back to the commercial hub and relevant child services.
- Contact analytics distinguish telephone clicks, WhatsApp chat openings, form-created WhatsApp drafts, email and directions. They do not claim a sent message, accepted booking or qualified lead.

## 3. Final metadata and headings

| URL | Title | Meta description | H1 |
|---|---|---|---|
| `/brands/rolls-royce-service-dubai` | Rolls-Royce Service & Repair Dubai \| DIGI-TEC | Independent Rolls-Royce service and repair in Al Quoz, Dubai. Contact DIGI-TEC for maintenance, diagnostics and a vehicle-specific service estimate. | Rolls-Royce Service & Repair Dubai |
| `/engine-diagnostics` | Rolls-Royce Engine Diagnostics Dubai \| DIGI-TEC | Rolls-Royce warning-light and drivability diagnostics in Al Quoz, Dubai. Compatible scan coverage and physical testing are confirmed for the vehicle. | Rolls-Royce Engine Diagnostics Dubai |
| `/mechanical-repair` | Rolls-Royce Engine Repair Dubai \| DIGI-TEC | Rolls-Royce engine, cooling and mechanical assessment in Al Quoz, Dubai. Repair scope follows vehicle identification and inspection findings. | Rolls-Royce Engine & Mechanical Repair Dubai |
| `/transmission-repair` | Rolls-Royce Transmission Repair Dubai \| DIGI-TEC | Rolls-Royce transmission and gearbox assessment in Al Quoz, Dubai for warnings, leaks, engagement and shift-quality concerns. | Rolls-Royce Transmission Repair Dubai |
| `/suspension-repair` | Rolls-Royce Suspension Repair Dubai \| DIGI-TEC | Rolls-Royce ride-height, air-suspension and ride-quality assessment in Al Quoz, Dubai. Fitted systems and repair scope are confirmed first. | Rolls-Royce Air Suspension Repair Dubai |
| `/oil-change` | Rolls-Royce Oil Change & Maintenance Dubai \| DIGI-TEC | Rolls-Royce oil service and maintenance assessment in Al Quoz, Dubai. Oil, filters and due items are matched to the exact combustion model. | Rolls-Royce Oil Change & Maintenance Dubai |
| `/ac-repair` | Rolls-Royce AC Repair Dubai \| DIGI-TEC | Rolls-Royce air-conditioning assessment in Al Quoz, Dubai for weak cooling, airflow, leaks, compressor and cabin-zone concerns. | Rolls-Royce AC Repair Dubai |
| `/battery-replacement` | Rolls-Royce Battery Replacement Dubai \| DIGI-TEC | Rolls-Royce low-voltage battery, charging and battery-drain assessment in Al Quoz, Dubai. Specification and supported functions are confirmed. | Rolls-Royce Battery Replacement & Diagnosis Dubai |
| `/electrical-repair` | Rolls-Royce Electrical Repair Dubai \| DIGI-TEC | Rolls-Royce electrical fault and low-voltage assessment in Al Quoz, Dubai. Wiring, charging and module concerns are tested before repair. | Rolls-Royce Electrical Repair Dubai |

All child paths above are relative to the existing hub. Canonicals remain self-referencing through the shared SEO component.

## 4. Keyword ownership and content decisions

- Hub: all broad observed variants plus proposed workshop, garage, repair-shop, independent-specialist, Al Quoz, quote and booking language.
- Engine diagnostics: warnings, fault finding, misfire and check-engine concerns.
- Mechanical repair: oil/coolant leaks, overheating, cooling and supported combustion-engine repair.
- Transmission: gearbox warnings, engagement, shift quality, fluid/service assessment and confirmed repair scope.
- Suspension: ride height, air suspension, compressor/strut assessment, steering and ride-quality concerns.
- Oil, AC, brakes, battery and electrical: assigned to their existing specialist pages.
- Guides: Ghost ownership education and workshop-selection intent.
- Deferred: pre-purchase inspection/PPI, tyre replacement/alignment as firm services, Dawn roof work, proprietary coding/programming, Spectre high-voltage work, and PPF/Spectre intent until capability or intent is confirmed.
- No synonym pages or model-by-service doorway pages were created.

## 5. Existing URLs and linking

The implementation preserves the hub, all 14 child-service URLs, the Ghost guide and the workshop-selection guide. Hub cards use descriptive links to priority services; secondary chips expose the remaining service routes. Priority service pages link back to the hub and both guides. The Ghost guide links to the hub. The workshop article links to the hub and selected commercial services.

No public URL was deleted, redirected, merged, noindexed or replaced. Existing Arabic relationships are preserved; the new English changes require professional Arabic review before equivalent translation is published.

## 6. Technical and editorial corrections

- Repaired malformed shared-template model headings for Rolls-Royce service pages.
- Removed the unsupported `starlight-headliner ventilation` connection from service copy.
- Stopped universalising refrigerant type, climate-zone count, V12 engines, gearbox type, suspension equipment and diagnostic functions.
- Restricted Planar, Flagbearer and satellite-aided transmission references to the relevant newer Ghost context.
- Separated Spectre from engine oil, spark plugs, exhaust and combustion diagnosis; no high-voltage capability is advertised.
- Replaced `manufacturer-level diagnostics` and universal annual-minimum language with model/year-specific scope and compatible-access wording.
- Reframed symptoms as reasons for assessment rather than proof of a failed component.
- Clarified that a WhatsApp form submission opens a draft chat; it is not a sent message or confirmed booking.

Vehicle-fact references:

- Rolls-Royce Motor Cars, new Ghost engineering: https://www.press.rolls-roycemotorcars.com/rolls-royce-motor-cars-pressclub/article/detail/T0313406EN/rolls-royce-reveals-significant-engineering-advances-developed-for-new-ghost?language=en
- Rolls-Royce Motor Cars, Spectre: https://www.rolls-roycemotorcars.com/en_GB/showroom/spectre.html
- Google Search documentation updates (FAQ rich-result change): https://developers.google.com/search/updates

## 7. Capability or proof gaps

Confirm before publishing claims for:

- Rolls-Royce proprietary software access, programming, coding or security functions.
- Spectre high-voltage battery, charging or isolation training, tools and accepted scope.
- Internal engine or gearbox rebuild capability for every fitted unit.
- Pre-purchase inspections, collection/transport, chauffeur coordination or special discretion arrangements.
- Dawn roof repair, wheel alignment, tyre supply/replacement and model-specific Black Badge procedures.
- Approved diagnostic fees, service packages, parts warranty, completion times or courtesy/collection service.
- Documented Rolls-Royce jobs, customer-approved images, technician credentials and brand-specific case studies.

The page uses an actual DIGI-TEC facility image and labels it as facility context, not a Rolls-Royce case study.

## 8. Conversion, analytics and structured data

- Contact paths request only useful initial details: model, year, mileage, history, warning/symptoms and preferred time. VIN is not required.
- CTAs distinguish quote, repair discussion, diagnostic assessment, WhatsApp and telephone actions.
- Click analytics use channel-specific events; the booking form records only that it opened a WhatsApp draft. Names, phone numbers, VINs and message content are not sent in event parameters.
- Existing consent handling is retained.
- The hub continues to use the existing AutoRepair/LocalBusiness identity, BreadcrumbList and page-specific Service offers. FAQ schema uses the same ten questions and answers visible on the page. FAQ content is retained for users, not promised as a rich result.

## 9. Validation record

- TypeScript: `node .\node_modules\typescript\bin\tsc --noEmit -p tsconfig.app.json` passed.
- ESLint: `node .\node_modules\eslint\bin\eslint.js . --quiet` passed.
- Production client and SSR builds passed.
- Prerender completed for 1,437 React routes; the sitemap contains 1,157 canonical URLs.
- Hosting-rule tests passed for canonical host, permanent redirects, valid routes, assets, functions and true 404 responses.
- SEO validation passed for all 1,437 routes and 1,157 sitemap URLs.
- Built hub HTML: correct title and meta description, one H1, visible FAQ answer content and all eight priority service links. All eight priority child paths produced HTML files.
- Local browser: hydrated desktop review passed. At a 390 × 844 viewport, the page retained one H1 and the correct canonical/title, CTA controls remained usable and document width did not exceed the viewport (382 px client and scroll widths).
- Non-blocking existing build warnings: Rollup removed two third-party Zod comment annotations; the main client chunk is over 500 kB; SSR reports an unused `toast` import; React warns that the existing `fetchPriority` prop should be lowercase during prerender.
- Live production response, indexing, hreflang and analytics-network verification: not performed; deployment was not authorised.

## 10. Prioritised future backlog

1. Publish customer-approved Rolls-Royce workshop photography and a documented job/case study with exact model, concern, evidence, approved repair and outcome.
2. Obtain page-filtered Search Console query data after recrawl; compare equivalent windows for hub, service pages and guides, then review CTR and qualified enquiries.
3. Improve Cullinan and Ghost editorial coverage inside existing URLs; create a new model page only if distinct demand and useful model-specific evidence justify it.
4. Confirm capabilities listed above, then expand only the relevant existing service page.
5. Validate `ppf spectre` intent; if it is Rolls-Royce PPF demand, assign it to verified detailing content rather than the repair hub.
6. Have a native Arabic automotive editor adapt the approved English changes while preserving genuine Arabic canonicals and alternates.
7. Record the production release date when authorised, request recrawl through the normal workflow, and measure WhatsApp openings, calls, confirmed qualified enquiries and actual bookings as separate stages.
