# Five-brand service sprint: independent source audit

Audit date: 19 October 2026. Read-only application-source inspection. This file records the source before the parent's sprint edits; rendered/live observations and GSC analysis belong to the parent evidence set. Existing source is evidence of the published content and established editorial scope, not independent proof of a workshop certification or manufacturer access.

## Existing commercial owners

| Brand | Broad service AND repair owner | Source H1 before sprint | Supporting ownership |
|---|---|---|---|
| Rolls-Royce | `/brands/rolls-royce-service-dubai` | Rolls-Royce Service & Repair Dubai | Existing 14 service children; Ghost guide supports the hub. No new broad repair URL needed. |
| Lamborghini | `/brands/lamborghini-service-dubai` | Lamborghini Service & Repair Dubai | Existing 14 service children; Urus guide and model groups support the hub. No new broad repair URL needed. |
| Volkswagen | `/brands/volkswagen-service-dubai` | Volkswagen Repair & Service Dubai | Four indexable children: oil-change, brake-repair, ac-repair, engine-diagnostics. DSG/transmission intent belongs to `/services/transmission-repair-dubai`; other VW children are intentionally noindex. |
| Mercedes-Benz | `/brands/mercedes-benz-service-dubai` | Mercedes-Benz Repair & Service Dubai | Legacy `/services/mercedes-…-dubai` routes own specific repairs. Brand/service duplicates redirect to those routes; legacy broad service/repair URLs redirect to the hub. Models/problems/guides have separate supporting roles. |
| BMW | `/brands/bmw-service-dubai` | BMW Service & Repair Dubai | Existing 14 service children and seven model owners: x5, x6, 3-series, 5-series, m3, m4, m5. Workshop-selection page is supporting advice. |

Source: `src/pages/BrandPage.tsx:666`, `src/App.tsx:102–138,158–225,269–290`, `src/lib/route-policy.ts:8–47`, `src/data/bmwModelPages.ts:33–131`, `b8-volkswagen-dsg-ownership.md`, `b8-volkswagen-gap-decisions.md`.

## Before metadata

| Brand | English title | English description |
|---|---|---|
| Rolls-Royce | Rolls-Royce Service & Repair Dubai \| DIGI-TEC | Rolls-Royce service and repair in Al Quoz, Dubai for Ghost, Cullinan, Phantom, Wraith and Dawn. Independent maintenance, suspension and electrical diagnosis. |
| Lamborghini | Lamborghini Service & Repair Dubai \| DIGI-TEC | Lamborghini service and repair in Al Quoz, Dubai. Discuss maintenance, diagnostics and repairs for your model with DIGI-TEC. Request a service assessment. |
| Volkswagen | Volkswagen Service & Repair Dubai \| DIGI-TEC Al Quoz | Volkswagen service and repair in Dubai, with DSG assessment, ODIS-supported diagnostics, engine, AC and brake inspections at DIGI-TEC in Al Quoz. |
| Mercedes-Benz | Mercedes Repair & Service Dubai \| Al Quoz \| Digi-Tec | Independent Mercedes repair and service in Al Quoz, Dubai since 2002. XENTRY diagnostics, maintenance, gearbox, AIRMATIC, AC and electrical work. |
| BMW | BMW Service & Repair Dubai \| DIGI-TEC | BMW service and repair in Al Quoz, Dubai. Independent workshop for scheduled maintenance, engine diagnostics, transmission, brakes, AC and electrical faults. |

Source: `src/data/priorityBrandSeo.ts:39–47,67–70,124–127`; Mercedes fallback `src/pages/BrandPage.tsx:74–75,521–530`. Both head terms already belong to one hub per brand. There is no evidence justifying five additional repair pages or forced repetition of the unhyphenated Rolls Royce spelling.

All five have real `/ar/brands/{same-slug}` counterparts. Arabic Mercedes has bespoke title, description and content. The other four use generic Arabic title/description templates with the Latin brand name. Source: `src/pages/BrandPage.tsx:525–530`; `src/i18n/ar-brands.ts`.

## Content strengths and justified gaps

**Rolls-Royce:** Eight bespoke service summaries cover maintenance, diagnostics, mechanical, transmission, suspension, brakes, electrical/battery and AC; six further services have links. Five model groups distinguish combustion models from electric Spectre and exclude unconfirmed high-voltage work. Ten FAQs cover location, independence, cost, findings, parts and booking. Preserve these distinctions. Add only practical quotation/approval detail that improves the next step; do not inflate the page with redundant service copy. Sources: `src/data/rollsRoyceHubContent.ts:3–47`; `src/components/RollsRoyceHubSections.tsx:6–15`.

**Lamborghini:** Nine bespoke service summaries and five supplementary service links already cover the requested categories. Model guidance differentiates Urus S air suspension, Huracán EVO LDF, Aventador SVJ ISR and low-voltage work from hybrid traction-battery work. Ten FAQs and a booking checklist are already present. A concise approval/quotation process can support conversion; do not add unverified LDAS access, hybrid work or universally applicable service schedules. Sources: `src/data/lamborghiniHubContent.ts:3–37`; `src/components/LamborghiniHubSections.tsx:6–15`.

**Volkswagen:** Existing intro and four reasons cover ODIS-supported fault investigation, DSG, engine/cooling/electrical concerns and scope approval. Only four FAQs are present, largely about warnings. Its generic directory links to noindex children, and its generic booking paragraph promises a quote and earliest slot without explaining that repair pricing may need inspection. Highest-value additions: maintenance plan inputs, diagnostics versus parts replacement, mechanical/electrical inspection scope, exact gearbox/model identification, itemized quotation and approval, and direct links to the four indexable child owners plus the shared transmission/electrical owners. Sources: `src/data/brands.ts:392–414`; `src/pages/BrandPage.tsx:1207–1232,1445–1456,1470,1499`; `src/lib/route-policy.ts:26–47`.

**Mercedes-Benz:** Existing bespoke content is broad: Service A/B scope, diagnostic paths, symptoms, models, repair directory and booking. This is mature architecture; preserve legacy service owners and model boundaries. A compact service-assessment/estimate explanation can clarify the handoff without creating a competing page. XENTRY is an existing asserted capability with functions explicitly conditional on vehicle/module/access; do not expand it into authorization or universal programming access. Sources: `src/data/brands.ts:24–51`; `src/pages/BrandPage.tsx:234–408,1238–1240`; `src/components/MercedesMaintenanceScope.tsx`; `b1-mercedes-ownership-map.md`.

**BMW:** Existing bespoke core services and FAQs cover CBS, maintenance, diagnostics, transmission, mechanical, brakes, suspension, electrical/iDrive and battery registration. Model pages already exist and should remain the owners of those model intents. ISTA+ is an existing asserted capability with function/access limitations. A consistent quote/approval handoff is a reasonable targeted improvement; do not advertise universal coding or retrofit support. Sources: `src/data/bmwHubContent.ts:6–43`; `src/components/BmwHubSections.tsx`; `src/data/bmwModelPages.ts`.

## Arabic claim mismatch requiring a scoped correction

The four non-Mercedes Arabic hubs replace cautious English content with a shared Arabic template. That template says platform-suitable equipment is used, OEM or matched parts are supplied, six-month checks are usually preferable, and basic service is often completed the same day. These go beyond the conditional English text and the user's verified-content requirement. Sources: `src/i18n/ar-brands.ts:6–20`.

The Arabic generic service cards also promise ECU programming, and the generic Arabic expertise paragraph says calibration/testing after repair. Sources: `src/i18n/ar-brands.ts:51–56`; `src/pages/BrandPage.tsx:567` (pre-sprint line). Use target-only overrides for the five brands so unrelated brand, tuning and PPF routes are unchanged. State that exact diagnostic functions, parts, duration and accepted work are confirmed after model/history/condition review. Keep manufacturer schedule/model guidance rather than a universal interval.

## Canonicals, indexing and headings

The source sets a self canonical for each English/Arabic hub and `noindex: !brand`; the target hubs are valid brands. `useSeo` adds en-AE, ar-AE and x-default alternates for indexable routes, with separate English/Arabic canonicals. `src/lib/route-policy.ts` intentionally noindexes secondary brand/service combinations; only VW is secondary among these five. No indexing-policy expansion is justified by this sprint. Sources: `src/pages/BrandPage.tsx:532–541`; `src/hooks/use-seo.ts:69–82,155–169`.

The hub has one source H1, semantic H2 sections and H3 cards. Do not infer a production response status or crawlable delivery from React source alone. The build prerenders via streaming SSR (`src/entry-server.tsx:19–71`); the parent's fresh rendered and live probes must establish delivered titles/content/headers and release eligibility. FAQ source is visible through accordion components, but rendered crawlability requires checking actual HTML.

## Schema and business entity consistency

Each hub builds WebPage, BreadcrumbList, Brand, Service/OfferCatalog and filtered FAQPage. Service points to the shared `https://digitecme.com/#business`; WebPage points to `#website` and `#organization`. Permanent business IDs are defined in `src/lib/schema.ts:11–17` and the authoritative global graph is in `index.html:40–113`. Preserve these IDs and the global graph. Confirmed contact presentation is +971 4 340 2223 and Warehouses 11–15, Al Quoz Industrial Area 3, Dubai; footer and graph agree (`src/components/Footer.tsx:83–84`).

For English VW, schema falls through to a generic `BRAND_OFFER_CATALOG` with unconditional ECU Programming and Paint Protection Film and Ceramic Coating (`src/pages/BrandPage.tsx:485–505`; `src/lib/schema.ts:361–372`). This should use target-only service labels matching visible service/assessment content. Do not modify global PPF offers or graph data. All Arabic hubs currently use `arBrandServices` labels, including body/detailing; target service planning can provide a more relevant, cautious list.

Potential existing identity defect to assess in fresh render: Arabic Mercedes localizes `brand.name` to non-Latin text, then BrandPage passes that name into `buildBrand` and `buildService`. `brandId` strips non-Latin characters, producing `#brand-` rather than established `#brand-mercedes-benz`. Sources: `src/i18n/ar-brands.ts:23`; `src/pages/BrandPage.tsx:481–504`; `src/lib/schema.ts:76–89`. Prefer a targeted use of sourceBrand's identity for that hub if confirmed; retain the shared business graph unchanged.

## Conversion and mobile

All hubs already have hero WhatsApp and telephone CTAs, a booking section, and a BrandBookingForm. The form validates an issue, treats name/phone as optional, creates a WhatsApp draft and requires the customer to send it in WhatsApp. It fires `whatsapp_draft_opened`; this is not a received enquiry or a confirmed booking. Preserve this distinction in reporting. Source: `src/components/BrandBookingForm.tsx:7–18,25–54,127–130`.

Improve the targeted booking promise and placeholders with model, year, mileage, service history, symptoms and preferred appointment. Explain itemized inspection/parts/fluid/labour estimates, approval of additional findings and availability confirmation. Calls/WhatsApp openings are intent signals. Confirmed qualified leads require call records or the business's received-message/CRM evidence, outside this local sprint.

The source uses responsive stacked hero CTAs, responsive card grids, labelled fields, max lengths, accessible field errors and mobile bottom actions for priority brands. Volkswagen is omitted from `isPriorityLeadBrand`, therefore lacks that shared mobile action/footer behavior while four target hubs receive it (`src/pages/BrandPage.tsx:518,611,1590`). A target-specific mobile CTA is justified only after checking viewport overflow and bottom padding. Static source alone does not establish touch-target spacing, visibility, hydration or contrast. Parent browser QA is required.

## Recommended local implementation boundary

1. Add a five-brand-only bilingual service planning/quote block using existing service and model owners, with verified maintenance/diagnostics/mechanical/electrical topics.
2. Make scoped Arabic corrections; retain unrelated Arabic brand and PPF content.
3. Improve VW booking, indexable-owner links and cautious service/FAQ coverage.
4. Match target service schema to visible content, preserving business IDs.
5. Retain good existing English metadata where it already communicates service+repair; only change where there is a concrete benefit and show before/after.
6. Verify fresh delivered HTML, reciprocal hreflang, mobile layout and safe CTA behavior without sending customer messages or touching production.

The initial audit was read-only. A subsequent parent assignment authorized scoped Arabic safety improvements in `src/i18n/ar-brands.ts` for BMW, Rolls-Royce, Lamborghini and Volkswagen only. Those overrides add conditional maintenance/inspection/quotation/booking content, remove the generic interval/same-day/OEM-supply promises for these hubs, preserve the source brand identity, and distinguish electric/hybrid scope where relevant. Mercedes and other brands retain their prior behavior. Global `arBrandServices` and `arBrandServiceNames` are unchanged; the parent handles target-only visible service cards and schema. No route policy, backend, PPF or tuning source was edited by this agent.

Narrow verification: ESLint passed for the edited source. A runtime comparison against `HEAD:src/i18n/ar-brands.ts` confirmed the four target identities are unchanged, Mercedes/Audi/Ferrari/unrelated behavior is unchanged, and both global Arabic service exports are unchanged. Evidence: `arabic-override-verification.json`. Full build and rendered/browser checks remain with the parent.
