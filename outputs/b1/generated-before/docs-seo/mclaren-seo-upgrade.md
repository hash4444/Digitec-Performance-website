# McLaren SEO, content and conversion upgrade

Implementation date: 2026-09-05. Target: `/brands/mclaren-service-dubai`. Production deployment was not performed.

## Search Console baseline

The supplied workbook records the hub at 0 clicks, 832 impressions, 0% CTR and average position 13.58. The 23 McLaren-related query rows total 745 impressions and 0 clicks. Their individual ownership and disposition are in `mclaren-keyword-map.csv`; all four Abu Dhabi rows (80 impressions total) are excluded from location targeting.

## Before and after

- Before: a generic templated hub and child pages exposed broad, overlapping copy; metadata did not lead with the strongest observed commercial intent; several technical phrases were overly universal or inaccurate.
- After: the existing hub owns broad service, repair, workshop, garage and independent-service intent. Existing child URLs own service-specific intent. The guide owns comparison and “best” research intent without claiming DIGI-TEC is best.
- The hub now has a direct H1, concise independent-workshop positioning, Al Quoz directions, assessment-led CTAs, a “what to send” block, eight priority service cards, links to all 14 existing child service URLs, five model-family summaries, ten visible FAQs, cost/quotation guidance and genuine workshop imagery clearly labelled as general facility proof rather than a McLaren case study.

## Metadata

- Hub title: `McLaren Service & Repair Dubai | DIGI-TEC`
- Hub description: `McLaren service and repair enquiries in Al Quoz, Dubai. Discuss maintenance, diagnostics and vehicle-specific repairs with DIGI-TEC. Request an assessment.`
- Priority child titles/H1s and descriptions are overridden for transmission repair, engine diagnostics, oil service and mechanical repair.
- Canonicals, breadcrumbs, indexability and reciprocal links remain on the existing route architecture.

## Keyword ownership

- Hub: broad McLaren service, repair, workshop, garage, service-centre and local intent.
- `/transmission-repair`: transmission, gearbox, shifting and warning intent.
- `/engine-diagnostics`: warning lights, fault diagnosis, drivability and reduced-performance intent.
- `/oil-change`: maintenance, oil service, annual/scheduled-service planning intent.
- `/mechanical-repair`: engine, cooling, overheating, leaks and mechanical repair intent.
- Other existing service URLs retain their own narrow brake, suspension, AC, electrical, battery, steering, exhaust, fuel, body and tyre intent.
- `/blog/mclaren-best-workshop-dubai`: workshop-selection, comparison and estimate research intent.

## Inaccuracies corrected

- Removed generic torque-converter and lock-up language from McLaren transmission content.
- Removed irrelevant NOL technical-test-refusal language from McLaren diagnostics content.
- Replaced awkward generated model headings with `McLaren models for …`.
- Removed universal McLaren oil brand, grade and kilometre-interval recommendations; the exact vehicle and service information now determine specification and schedule.
- Replaced blanket suspension, refrigerant and brake-system descriptions with model-specific confirmation language.
- Avoided unverified promises for high-voltage Artura work, carbon-tub repair, programming, active-aero work, performance tuning and gearbox rebuilding.
- Checked the model distinctions used in the copy against current official McLaren material: Artura is identified separately as a V6 hybrid with an eight-speed SSG, while the 750S official specification lists a V8, seven-speed SSG and Proactive Chassis Control III. The page still avoids turning manufacturer specifications into workshop-capability claims.

Official technical references reviewed:

- https://cars.mclaren.com/de-de/artura
- https://cars.mclaren.com/us_en/750s

## Conversion and analytics

- Hub CTA: `Request a McLaren Assessment`; supporting CTA: `Call the workshop`.
- WhatsApp drafts request model, year, mileage, warning/symptoms and preferred appointment time.
- Link events are separated as `whatsapp_chat_opened`, `telephone_link_clicked`, `directions_clicked` and `email_link_clicked` with CTA placement.
- A validated booking form emits `whatsapp_draft_opened` before opening the pre-filled chat. Generic form submission and link clicks are no longer mislabeled as completed `generate_lead` events. No names, phone numbers, VINs or free-text symptoms are sent to analytics.

## Content gaps and future opportunities

- Replace the general workshop photo or add a separate gallery only when approved, real McLaren workshop photographs are available; do not invent a vehicle case study.
- Confirm tooling, technician training, parts access and accepted repair scope before adding any coding/programming, hybrid high-voltage, hydraulic suspension, carbon-structure, aero or internal gearbox claims.
- Keep 570S, 720S and Artura on the hub until Search Console shows distinct demand and the workshop can provide genuinely model-specific content and proof.
- Arabic URLs and the existing 14-service architecture were preserved. The English McLaren rewrite should be professionally translated later rather than machine-copied into Arabic.
- The workshop-selection guide now links to McLaren-specific hub and service destinations. Its English and Arabic McLaren FAQs avoid unsupported authorization, pre-purchase, same-day, tuning and universal-capability promises.
- Re-check hub and child-page impressions, CTR, average position, non-brand queries and enquiries after recrawl. Use that evidence before expanding model pages.

## Verification completed

- TypeScript type-check passed.
- ESLint passed with zero errors.
- Client and SSR production builds passed.
- Prerender completed for 1,437 React routes; the generated sitemap contains 1,157 canonical URLs.
- Hosting-rule routing tests passed and the route-level SEO validator passed.
- Local browser accessibility-tree review confirmed one H1, visible service/model/cost/FAQ content, ten visible FAQ questions, labelled form fields and the requested CTA placements.
- The final production release date is intentionally not recorded because this work was not deployed. Record it when the approved changes are published, then use that date as the measurement baseline.

Remaining build warnings are existing project-wide items rather than McLaren route failures: a large client bundle, an unused toast import, a React `fetchPriority` casing warning during prerender and third-party pure-comment placement warnings. Live Core Web Vitals require production field data and were not claimed from the local build.
