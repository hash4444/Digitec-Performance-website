# T1 unsupported tuning brand audit

Audited 2026-10-05 (Asia/Dubai), baseline HEAD `546e02fb214212e187c159c303fda2354d480ff3`.

## Source of truth and scope

The actual `src/data/tuningCars.ts` dataset contains 16 configurable vehicles: 14 Mercedes entries, Aston Martin DB11 and Lamborghini Urus. BMW and Audi are explicitly excluded by the T1 brief. No BMW, Audi or Porsche configuration appears in this baseline dataset. No source data is added or fabricated to satisfy older blanket copy.

Porsche is not an excluded brand: its GSC tuning searches remain in the opportunity review. During implementation the user confirmed separate Porsche support and said the configuration list would follow. That authoritative business confirmation is retained; exact model, price, stage and package data remain pending. No Porsche values or model pages are invented. Existing B2 Porsche repair/service architecture remains intact. The stale `/tuning` brand list alone was not independent evidence of supported packages.

This audit searches actual source in `src`, `scripts` and `public`, not historical report files alone. It also checks the deployed [English tuning page](https://digitecme.com/tuning), which currently renders the same unsupported BMW/Audi FAQ as the source.

## Positive or implied unsupported tuning claims

| Baseline source | Signal | Required correction |
| --- | --- | --- |
| `src/pages/Tuning.tsx:27,32` | English and Arabic FAQs list BMW and Audi among vehicles assessed for tuning. | Replace with actual configurator-supported vehicle eligibility; root-owned master page correction. |
| `src/pages/Tuning.tsx:147` | Blanket Porsche and “other platforms” tuning-project intro extends beyond current configurations. | Explain current configurator scope and separately reviewed enquiries; do not invent Porsche data. |
| `src/i18n/ar-tuning.ts:18` | Arabic intro repeats Porsche and “other” blanket support. | Match current scope and English qualifications. |
| `scripts/prerender-seo.mjs:476-481,529-533` | Stale fallback metadata/body targets BMW M, Audi RS and blanket Porsche support. | Remove unsupported make claims and align final master initial HTML; root-owned prerender correction. |
| `src/data/brands.ts:100-112` | Audi performance-project scope, RS3/RS4/RS6/RS7 tuning-consultation card and “Can you tune…” FAQ imply availability. | Keep Audi inspection, maintenance, diagnostics and repair; change tuning-specific enquiry to factual workshop health inspection. |
| `src/data/brands.ts:120-129` | BMW performance-project consultation, engine performance-project request and gearbox performance request imply tuning availability. | Preserve engine/gearbox diagnostic and service coverage; remove the tuning-project implication. |
| `src/data/bmwModelPages.ts:107,124,128` | M3 tuning-request wording and M4 “before tuning” FAQ/available performance work. | Retain mechanical/diagnostic health assessment and existing model ownership. |
| `src/data/audiModelPages.ts:77` | RS6 before-tuning FAQ implies a route into performance work. | Preserve baseline vehicle condition inspection without offering tuning. |
| `src/data/bestWorkshopPages.ts:109` | Audi RS performance-project FAQ invites availability enquiry. | Replace with Audi RS inspection/repair scope. |
| `src/data/brandWorkshopArticles.ts:46,50` | BMW M-car upgrades and Audi RS performance-upgrade planning. | Change only these power-upgrade implications to supported health checks and mechanical service. |
| `src/data/brandWorkshopArticles.ts:106` | Volkswagen GTI/Golf R tuning and upgrades. Neither appears in configurator. | Keep VW service/diagnostics; replace tuning recommendation with fitted engine/DSG health assessment. |
| `src/pages/BrandWorkshopArticlePage.tsx:119,140` | Generated tuning FAQ appears across numerous brands, suggesting conditional support where absent. | Restrict positive tuning FAQ to configurator-supported brands, with repair-focused FAQ for absent brands. Do not create a new tuning owner. |
| `src/components/BrandBookingForm.tsx:117` | Generic form placeholder lists tuning for every brand. | Remove tuning from a generic service/repair form placeholder unless brand-supported context is explicitly supplied. |

## Signals retained as legitimate workshop/service content

- BMW/Audi repair, maintenance, diagnostics, engine-code facts, coding and retrofit capability review are not tuning claims and remain.
- Model “performance” means actual operation in many texts: reduced performance, cooling performance, high-performance brake hardware and performance variants are retained.
- Brand article notes explicitly denying tuning support (Rolls-Royce/McLaren) are not positive claims.
- Existing documented Mercedes build case studies are factual project evidence, not universal current package availability.
- Global Header/Footer/Sitemap links to the generic `/tuning` service owner are normal navigation. A link alone does not imply tuning of the page's brand.
- Generic power/upgrade planning language that concerns tyres, brakes, cooling, track readiness or off-road hardware is not removed without a positive tuning-service implication.

## Ownership and internal-link audit

The master owner is `/tuning`; `/ar/tuning` is its language counterpart. Existing `/performance-tuning`, `/performance-tuning-dubai`, `/services/performance-tuning` and `/services/performance-tuning-dubai` aliases redirect there in `src/App.tsx`. They must remain redirects and must not become competing generic owners.

Incoming links exist in Header, Footer (quick and popular links), SitemapPage, WhatWeDo, the generic BrandWorkshopArticlePage service-links list, generic exhaust repair `src/data/services.ts:664`, Mercedes exhaust repair `src/pages/BrandServicePage.tsx:131`, and the documented AMG GT Black Series blog CTA in `src/pages/BlogPost.tsx:101`.

The master content links outward to `/vrx`, `/services/mercedes-diagnostics-dubai`, `/blog/gad-tuning-explained`, `/blog/mercedes-amg-gt-tuning-dubai`, `/blog/mercedes-amg-gt-black-series-1300hp-build-dubai` and `/blog/g63-to-brabus-g800-conversion-dubai`. Its external authority link goes to [GAD Motors](https://www.gad-motors.de/). Consultation links use the existing business WhatsApp number. These relationships support tuning versus diagnostic/service separation and should be retained.

## Implemented corrections

The root agent confirmed the clean baseline production build and TypeScript checks passed (1,247 routes / 996 sitemap canonical URLs) before source implementation.

The tuning-only corrections were applied in:

- `src/data/brands.ts`: Audi tuning consultation and BMW power-project implications become inspection/repair scope. Normal service categories and brand routing remain.
- `src/data/bmwModelPages.ts`: M3 tuning-request clause and M4 before-tuning FAQ become health inspection; engine/generation facts remain.
- `src/data/audiModelPages.ts`: RS6 before-tuning FAQ becomes mechanical condition assessment.
- `src/data/bestWorkshopPages.ts`: Audi RS performance-project FAQ becomes RS inspection.
- `src/data/brandWorkshopArticles.ts`: BMW/Audi upgrade planning and explicit Volkswagen GTI/Golf R tuning become mechanical/diagnostic condition checks.
- `src/pages/BrandWorkshopArticlePage.tsx`: tuning FAQ and tuning-related body heading are gated by brands actually present in `tuningCars`; explicitly excludes BMW/Audi. Absent-brand articles receive a mechanical-condition FAQ. Other article structures, service owners and links remain.
- `src/components/BrandBookingForm.tsx`: generic English/Arabic repair booking placeholders no longer imply tuning for every brand.
- `src/pages/Services.tsx`: English/Arabic overview distinguishes workshop service/repair brands from the separately reviewed tuning configurations.
- `src/i18n/ar-tuning.ts`: current configurator brand scope and user-confirmed Porsche enquiry qualification; no invented generic VIP scope; Stage 4/5 Arabic labels; exact translations of every one of the 58 actual package item strings. Unknown items retain the original source text, regardless of display index.
- `src/data/aiGuidePosts.ts`: AMG GT article becomes an informational package-reading guide that sends commercial enquiries to `/tuning/mercedes-amg-gt`. Stage 1 airfilter and package-specific Stage 2 TCU scope replace universal stage descriptions. Displayed Stage 1/2 EUR prices and times read the actual configurator data.
- `src/i18n/ar-general-blog-content.ts`, `src/pages/BlogPost.tsx`, `src/i18n/ar-blog.ts`: corresponding Arabic informational adaptation links to the existing `/ar/tuning` owner and records the actual modification date. No invented Arabic model URL.
- `scripts/prerender-seo.mjs`: legacy tuning/GAD metadata removes BMW/Audi and unsupported “official partner” wording. Active `npm run build` uses `scripts/prerender.mjs`; the legacy changes are defensive source cleanup and do not alter route ownership.
- `src/data/t1UpdatedPaths.ts`: exact affected-path set for lastmod. The supporting `tuning-ecosystem-affected-route-evidence.json` records edited-text matches in actual baseline HTML, including changed form placeholders and AMG GT related-card labels. The helper includes the root-owned master, sitemap and nine new model owners; it does not date all existing routes.

The root agent owns the main `/tuning` page, configurator rendering and model-page/routing implementation. This subtask did not change `src/pages/Tuning.tsx`, `src/components/TuningConfigurator.tsx` or `src/data/tuningCars.ts`.

## Verification

- `npm run typecheck`: PASS after all corrections.
- Exact Arabic source-item verification: 58/58 existing package items translated; unknown item preserved; translations do not vary by item index; Stage 4/5 labels present.
- Post-edit searches across actual `src`/`scripts` find no positive BMW/Audi tuning/remap/chip claim in the corrected ecosystem. Remaining BMW/Audi “performance” occurrences describe operating condition, service variants or repair; unrelated workshop SEO remains.
- Production build and full routing/SEO release validation are integrated by the root agent after all subtasks complete.
