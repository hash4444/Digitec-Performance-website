# DIGI-TEC oil-change landing page — implementation record

Date: 10 September 2026. Scope: the English `/services/oil-change-dubai` landing page, plus contextual return links on eight existing English brand oil-change pages. No new service URLs or unrelated service rewrites.

The page now uses a dedicated React component and scoped design instead of `ServicePage`. The production build and checks passed. Commit `92e88505e7199959a97c25bc074bd1e04da814c1` was pushed to GitHub `main` and synced into Lovable. Production publication is awaiting explicit approval: automatic approval review rejected the publish action because the earlier authorization covered Git main, not the public production update. A fresh check at 07:27 UTC confirmed the public URL still has the preceding layout. Exact release status is recorded in `release-status.json`.

## Title, description and H1

The before values were confirmed both in the preceding local production build and by a fresh HTTP 200 response from the live URL on 10 September.

| Field | Before | After |
|---|---|---|
| Title | Car Oil Change Dubai \| Oil & Filter Service \| DIGI-TEC | Car Oil Change Dubai \| Engine Oil & Filter Service \| DIGI-TEC |
| Meta description | Car oil change in Dubai with oil approval, viscosity, capacity and filter selected for the exact vehicle. Book Digi-Tec for a confirmed estimate. | Book a car oil change in Al Quoz, Dubai. Vehicle-specific engine oil, filter and supported service reset. Send your car details for an exact DIGI-TEC quote. |
| H1 | Car Oil Change in Dubai | Car Oil Change in Dubai — retained as the single H1 |

The title and description are unique across all 1,438 prerendered routes. The opening immediately establishes engine oil and filter service, Al Quoz, vehicle-specific specifications, supported reset and booking.

## Structure before → after

Before: generic service hero → Overview → Why It Matters → BMW/Audi/Porsche block → Why Choose Digi-Tec → general vehicle-specific copy → What's Included → generic enquiry form → four FAQs → related services → extensive brand-specialist grid → repeated service CTA.

After: custom hero and workshop visual → six-part scope strip → vehicle specification sheet → five numbered service steps → eight selected brand oil-service pathways → service-due and warning guidance → Dubai driving conditions → oil change versus full service comparison → filter fitment → quote factors → ten FAQ accordions → Al Quoz booking and directions.

The layout varies between an editorial hero, scope grid, technical specification sheet, light process band, brand links, diagnostic note, comparison columns and a final booking block. Mobile sections stack and booking controls remain usable at 320 pixels.

## Added and replaced content

- Added an explicit six-part scope: correct engine oil, applicable filter, sealing requirements, fill quantity, oil-level verification and supported reminder reset. Additional work is subject to agreement.
- Added viscosity versus required oil approval/specification, model year, engine variant, market specification, filter, quantity and reset requirements.
- Added a five-step process from vehicle identification to supported reset and handover.
- Added service reminders, unknown history, recurring oil-level concerns, leaks and warnings. The copy distinguishes routine servicing from diagnostic work and does not diagnose from one symptom or oil colour.
- Added Dubai heat, traffic, short trips, idling and dust context without imposing a universal shorter interval.
- Added the comparison with full scheduled servicing, filter-fitment guidance and four quote-factor groups. No invented price packages.
- Replaced four generic FAQs with ten commercial questions covering cost, intervals, oil selection, filter, reset, scheduled service, location, vehicle coverage, warnings and diagnosis.
- Replaced the generic enquiry-form section with direct booking, quote and service-advice WhatsApp drafts, plus phone and directions.
- Removed the English page's generic Overview/Why It Matters/Why Choose blocks, the narrow BMW/Audi/Porsche paragraph, generic related-service grid and extensive brand-hub grid from this route's rendered layout. Their old data remains available to the existing Arabic template; it is no longer rendered by the dedicated English page.

## Internal links and intent ownership

The generic page owns general car oil-change intent. The eight brand pathways point to real, existing, indexable oil-service pages:

| Brand | Existing destination |
|---|---|
| Mercedes-Benz | `/services/mercedes-oil-change-dubai` |
| BMW | `/brands/bmw-service-dubai/oil-change` |
| Porsche | `/brands/porsche-service-dubai/oil-change` |
| Lamborghini | `/brands/lamborghini-service-dubai/oil-change` |
| Ferrari | `/brands/ferrari-service-dubai/oil-change` |
| McLaren | `/brands/mclaren-service-dubai/oil-change` |
| Rolls-Royce | `/brands/rolls-royce-service-dubai/oil-change` |
| Bentley | `/brands/bentley-service-dubai/oil-change` |

Each gains one contextual return paragraph linking to the generic page for scope, quote factors and service comparison. Their brand-specific headings and metadata remain unchanged. The preceding page already linked to Mercedes and BMW oil pages; these are retained in the new curated layout, with six additional oil-page pathways.

Contextual service links point to `/services/car-service-dubai`, `/services/car-diagnostics-dubai` and `/services/mechanical-repair-dubai`. Car Service is retained and repositioned in the comparison; diagnostics and mechanical repair are tied to symptoms rather than placed in an unrelated service grid.

## CTA and analytics changes

| Placement | Action |
|---|---|
| Hero | **Book an Oil Change** jumps to the final booking section; **WhatsApp DIGI-TEC** opens an oil-service draft; **Call DIGI-TEC** uses the established phone number. |
| After process | **Request an Oil Change Quote** opens a quote-specific draft. |
| Service comparison | **Ask Which Service Is Due** opens a service-advice draft. |
| Quote factors | **Get an Exact Oil Change Quote** requests vehicle details and an itemized scope. |
| Bottom | **Book Your Oil Change**, directions and phone, with Al Quoz Industrial Area 3 context. |

Drafts request useful vehicle details instead of forcing users through another form. Opening WhatsApp is an enquiry action, not a confirmed booking or sale. No customer message was sent during testing.

CTA placement attributes use the existing document-level analytics listener. Existing `whatsapp_click` behavior is retained, with message/query/hash data stripped from tracked WhatsApp URLs. PII-safe contact attribution tests passed; analytics infrastructure was not rewritten.

## Schema and technical SEO

- Retained the established site-wide business entity and its reference from the oil-change `Service` entity.
- Added the dedicated page's `WebPage`, `BreadcrumbList`, accurate `Service` description and ten-question `FAQPage` through existing shared schema builders. FAQ answers are generated from the same content source as the visible accordion and are present in server-rendered HTML.
- No new service prices, offers, ratings, reviews, availability or turnaround promises were introduced. FAQ markup does not imply that Google will display FAQ rich results.
- Retained the URL, self-canonical, index/follow directives and existing Arabic alternate. The dedicated route is English-only; the Arabic page remains as it was.
- Kept the existing sitemap entry. Updated last-modified dates only for the generic oil page and the eight brand oil pages changed by this release.
- Kept the scoped CSS in initial HTML, with the page component loaded through the existing route architecture.
- Reused the actual workshop-floor photograph already used elsewhere on the site, with accurate alt text. Existing WebP variants are 48,596 bytes at 540 pixels and 133,194 bytes at 960 pixels, with responsive selection, explicit dimensions and high fetch priority. Brand logos load lazily. No new fabricated workshop or oil-service imagery.

## Validation

All 12 production build stages passed against an unchanged source fingerprint:

`be991274284a2c7660c4fc5f0c9f5199e1a886e289457c404ba7b9bde74e2ea2`

- Client and server builds; 1,438 real React routes prerendered; 1,155 canonical sitemap URLs.
- Existing routing, SEO, paint-care and query-release regression checks passed. The query checker examined 51,904 internal links and reported zero missing/alias fallback links.
- Dedicated oil-page checks passed: one H1, exact title/meta, canonical, indexability, sitemap, eleven content sections, ten matching FAQ entries, eight real brand destinations, eight return links, fifteen local asset references and initial CSS.
- TypeScript app and Node configuration checks passed.
- The target title and meta are unique across all 1,438 routes.
- Before/after main-content and title comparisons remained identical for the Arabic oil page, Car Service Dubai, Mechanical Repair Dubai and the unmodified Audi oil page.
- Browser review covered desktop, mobile hero, process, booking anchor and FAQ interaction. The final production browser checks and widths are recorded in `browser-qa.json`.

A React development warning about the image-priority prop was corrected using the project's existing React 18 pattern before the final successful build.

## Files changed

Implementation: `src/pages/OilChangePage.tsx` (new), `src/data/oilChangeContent.ts` (new), `src/styles/oil-change.css` (new), `src/App.tsx`, `src/data/services.ts`, `src/pages/BrandServicePage.tsx`, `src/lib/route-manifest.ts`.

Validation/build: `scripts/validate-oil-change.mjs` (new), `scripts/validate-query-release.mjs`, `package.json`.

Generated release evidence: `public/sitemap.xml`, `docs/seo/oil-change-validation.json` (new), `docs/seo/query-release-validation.json`, `docs/seo/protection-release-validation.json`, `docs/seo/route-schema-matrix.csv`. The broader matrix changes reflect inbound-link counts after replacing the generic brand grid; the protection report changes are build hashes and timestamps.

Private baseline, before/live HTML, this report and release evidence are saved locally under `outputs/oil-change-2026-09-10/` and are not included in the Git push.

## Search Console baseline and measurement

The supplied workbook covers **7 June–6 September 2026**, not a fresh post-release period. Its Pages row for this exact URL reports **3 clicks, 4,642 impressions, 0.06% exported CTR (0.0646% calculated), average position 28.18**.

The existing intent map assigns 30 property-level query rows to the generic oil-change owner: 1 click, 3,206 impressions, 0.0312% calculated CTR and 27.91 impression-weighted position. The export has no query/page pairing, so these cannot be presented as URL-filtered query metrics. Selected observations: “car oil change near me” had 139 impressions at 13.50; “oil change near me” 428 at 12.46; “car oil change dubai” 686 at 29.63; “oil change dubai” 521 at 25.65.

The user's approximate position 15 is retained as separate context. No page-one, traffic or customer gain is claimed. After Google recrawls the release, compare equivalent 28-day periods for this exact URL and its query breakdown, then inspect booking/contact events by page and CTA. Contact clicks indicate enquiries; actual qualified leads and jobs require workshop follow-through data.

## Retained decisions and missing evidence

Retained: DIGI-TEC branding, header/footer, real Al Quoz location and phone, existing route, brand intent ownership, shared business schema, analytics safeguards, supported-reset qualifiers and the Arabic page.

No verified oil-product list, blanket filter sourcing policy, fixed price schedule, guaranteed completion time or pickup/delivery policy was supplied. Those claims remain absent; they did not block the qualified service-scope implementation. No case-study results, certifications, reviews or ratings were invented. Current Search Console access and post-release conversion outcomes were not available to prove ranking or revenue movement.

Technical wording was checked against primary guidance: [Mobil's product information](https://www.mobil.com/en-US/Passenger-Vehicle-Lube/pdsdownload/NA-XX-Mobil-Full-Synthetic-Series?p=1) distinguishes viscosity and manufacturer requirements, while [Ford's owner guidance](https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G2489838&Uid=G2489836&buildtype=web&countryCode=USA&div=f&languageCode=en&moidRef=G2022704&userMarket=PHL&vFilteringEnabled=False&variantid=10881) supports treating oil-pressure warnings as a reason to stop and follow the vehicle handbook. These references do not establish which oil DIGI-TEC supplies or a universal procedure for every vehicle.

The SERP intent review included current first-party oil-service pages from [iTyreCare](https://www.ityrecare.com/car-oil-change-service-dubai), [MySyara](https://www.mysyara.com/ae/oil-change/) and [EBC Express](https://www.ebcexpress.ae/service-oil-and-filter-changes/). The resulting differentiation is an editorial decision around vehicle-specific scope and clear booking, not a claim of better rankings or service outcomes.
