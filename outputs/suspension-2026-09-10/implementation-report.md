# Suspension page improvement — 10 September 2026

Implemented and pushed to GitHub `main` as `84a5a4aeca76b91ab017e399a7983dcba1404688`. Lovable reports the same source commit. Public publication remains pending the explicit approval requested earlier. `release-status.json` records the fresh public-page checks; source sync alone is not treated as proof of deployment.

## What changed

The English `/services/suspension-repair-dubai` URL now has a dedicated page instead of the generic service template. It preserves DIGI-TEC’s dark/orange identity and existing suspension-detail image, without presenting that image as a documented workshop result.

The main conversion feature is a four-choice symptom selector: knocks/clunks, low or uneven height, harsh/bouncy ride, and suspension warnings. Selection updates both the inspection guidance and the WhatsApp enquiry draft. It helps customers describe a concern without presenting a symptom as a diagnosis.

Added sections cover six possible repair areas, air-suspension assessment, a four-stage inspection-to-repair process, alignment versus repair, quote factors, six brand-specific suspension pathways, twelve FAQs, and the Al Quoz booking/location block. Direct inspection, quote and phone actions replace the generic enquiry treatment. Clear qualifiers avoid blanket promises about repairs, parts, calibration, price or turnaround time.

The generic Overview, Why It Matters, Why Choose, long brand list and broad related-services template are no longer rendered on this English route. The existing Arabic page and its data remain available.

## Search metadata before → after

**Title:** Suspension Repair Dubai | AIRMATIC, Shocks, Air Struts → **Car Suspension Repair Dubai | Air Suspension | DIGI-TEC**.

**Meta before:** Air suspension sagging or harsh ride? Book AIRMATIC, shock and air-strut inspection and repair in Dubai with vehicle-specific parts options.

**Meta after:** Clunks, a harsh ride or sagging air suspension? Book a suspension inspection in Al Quoz, Dubai. Vehicle-specific diagnosis and a clear repair quote.

**H1:** Suspension Repair in Dubai → **Car Suspension Repair in Dubai**, retained as the only H1.

The page targets the generic suspension-repair cluster. AIRMATIC remains useful supporting context, while the Mercedes page keeps brand-specific ownership.

## Links and enquiries

Selected suspension destinations: Mercedes-Benz, BMW, Porsche, Audi, Range Rover and Bentley. Each receives a contextual return link to the generic page. Their primary headings and metadata are retained. Mercedes and Porsche paths were already linked in the earlier content; the new layout makes these part of a deliberate six-brand group.

Related service links cover steering/rack inspection, tyre/wheel concerns and vehicle diagnostics. They appear beside the relevant explanation rather than in a general service grid.

Booking and symptom-specific WhatsApp links use +971 4 340 2223 and the existing PII-safe analytics listener. The warning-specific draft was opened and verified on WhatsApp’s page for Digi-Tec Performance Center. No message was sent. Contact clicks are enquiry signals, not confirmed customers or jobs.

## Schema and technical work

- Shared `WebPage`, `Service`, `BreadcrumbList` and `FAQPage` builders reference the established business entity.
- All twelve FAQ questions and answers match the visible accordion content and are present in generated HTML. No FAQ rich-result entitlement is claimed.
- Self-canonical, index/follow and the existing Arabic alternate are retained. No new URL was created.
- Sitemap modification dates change only for this page and the six brand suspension pages with new return links.
- Initial CSS covers the dedicated layout, the hero image has explicit dimensions and high fetch priority, and brand logos load lazily.
- No price offers, ratings, reviews, availability promises or new backend behavior were introduced.

## Validation and release isolation

All **13 production stages passed**, including 1,438 real React routes, 1,155 sitemap URLs, existing oil-page checks, routing, metadata, links and analytics privacy. The query checker examined **51,865 internal links**, with zero missing/alias fallback links reported. The suspension checker verified unique metadata across all routes, one H1, nine content sections, four symptom choices, twelve matching FAQ entries, six brand destinations, six return links and eleven local asset references.

App and Node TypeScript checks passed. Browser QA covered 320, 390, 768 and 1440-pixel layouts; the narrow mobile booking action remained visible and no horizontal overflow was found. The selector, its enquiry text, FAQ expansion/collapse and WhatsApp handoff were exercised. Browser details are recorded in `browser-qa.json`.

Before/after rendered body text and titles remained identical for Arabic suspension, steering, oil change and car service. This comparison checks actual generated content, including generic pages that do not use a `<main>` wrapper.

Concurrent transmission edits appeared in the shared checkout. The suspension release was therefore assembled and rebuilt in `release-checkout` from the preceding oil-page commit, with only the intended suspension changes. Those transmission edits were preserved and excluded from this push. A generated local MCP shim with a checkout-specific path was also excluded.

Validated source fingerprint: `adf03b27d8fb42235ac0f3dd81853b1fae305da8fae54d1e751555df6d52a8d8`.

## Files

New: `src/pages/SuspensionRepairPage.tsx`, `src/data/suspensionContent.ts`, `src/styles/suspension.css`, `scripts/validate-suspension.mjs`, `docs/seo/suspension-validation.json`.

Updated: `src/App.tsx`, suspension metadata in `src/data/services.ts`, the scoped return-link condition in `src/pages/BrandServicePage.tsx`, modification dates in `src/lib/route-manifest.ts`, and the build script in `package.json`.

Generated: `public/sitemap.xml`, `docs/seo/protection-release-validation.json`, `docs/seo/query-release-validation.json`, `docs/seo/route-schema-matrix.csv`. Matrix differences also reflect changed inbound-link counts after removing the large generic brand grid.

## Preserved baseline and evidence limits

The supplied Search Console export covers **7 June–6 September 2026**. Its exact URL row reports **4 clicks, 2,344 impressions, 0.17% CTR and average position 28.62**. The assigned generic cluster has eleven property-level query rows, 852 impressions and zero clicks; its impression-weighted position is 29.51. The export contains no query/page pairs, so these cluster observations are not represented as URL-filtered metrics.

Baseline, original HTML and validation evidence are retained locally in this folder and were not pushed to Git. Ranking, qualified-lead and revenue improvements require post-publication measurements; none are claimed at implementation time.

No verified fixed price list, universal parts policy, completion-time guarantee or pickup/delivery policy was available. These were omitted rather than invented. The diagnostic approach was checked against [Monroe’s air-suspension guidance](https://www.monroe.com/technical-resources/tech-tips/diagnosing-common-air-suspension-problems.html); that source does not establish DIGI-TEC’s tooling or coverage, which remain vehicle-specific and subject to confirmation.
