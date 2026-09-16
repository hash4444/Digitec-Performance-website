# Search Console implementation — 16 September 2026

## Pre-change audit and implementation plan

Audit completed before source edits. Evidence: `outputs/seo-2026-09-16/search-console-audit.md`, raw workbook extraction and query/page CSVs. The workbook covers 7–13 September 2026 (Web, Last 7 days), with 44 clicks and 9,396 impressions. Query and page tables are separate aggregates, not query/page pairs; ownership below is inferred from intent and repository architecture, not proven ranking attribution.

Architecture: Vite / React 18 / TypeScript / React Router 6 / Tailwind. `App.tsx` routes dedicated protection pages, data-backed generic services and brand/service templates. `route-manifest.ts` supplies SSR prerendering, indexability, sitemap and hosting rules. `use-seo.ts` collects route metadata for initial HTML and updates it during navigation. `schema.ts` references one global business/organization graph in `index.html`. Header, services index, HTML sitemap, hub sections and related-service links provide navigation. Global Analytics tracks existing telephone and WhatsApp events. Preserve it.

Existing four brand hubs are substantial, with specialist child pages and model coverage. PPF, ceramic and polishing are substantial separate owners; `/services/paint-protection-dubai` is a selection guide. Generic electrical content is short and lacks specialist links. Tyres already owns both spellings on `/services/tire-repair-dubai`, but visible copy uses American spelling. `/services/tire-repair` is an existing redirect, not a second intended owner. No current dedicated CUE, head-unit or audio-upgrade landing pages exist. Bentley electrical is an established suitable camera owner. The user explicitly confirmed on 16 September that Cadillac CUE replacement, Mercedes audio upgrades and Bentley reverse-camera installation are provided; that confirms service availability, not particular parts, models, warranty, prices or equipment.

| Intent | Primary URL | Implementation |
| --- | --- | --- |
| BMW service, repair, maintenance | /brands/bmw-service-dubai | Preserve hub, refine description and useful inspection links |
| Rolls-Royce service, repair, maintenance | /brands/rolls-royce-service-dubai | Preserve hub, remove visitor-facing SEO jargon, improve links |
| Aston Martin service, repair, maintenance | /brands/aston-martin-service-dubai | Preserve hub, refine description and service navigation |
| Bentley service, repair, maintenance | /brands/bentley-service-dubai | Preserve hub, link camera enquiry to electrical child |
| PPF / paint protection film variants | /services/paint-protection-film | Add installer-selection and removal/replacement guidance |
| Ceramic paint protection / coating | /services/ceramic-coating | Clarify coating terminology, retain film comparison, improve social image |
| Cadillac CUE screen repair / replacement, XTS / SRX | /services/cadillac-cue-screen-repair-dubai | New single English page for distinct touchscreen repair intent |
| Car electrical services / wiring repair | /services/auto-electrical-repair-dubai | Expand diagnosis, symptoms, FAQs, enquiry and specialist links |
| Head unit / command / Mercedes COMAND repair | /services/head-unit-repair-dubai | New single English page; system identification before repair |
| Mercedes stereo / E-Class audio / sound-system upgrade | /services/mercedes-audio-upgrade-dubai | New single English page; distinct upgrade intent, compatibility-led scope |
| Bentley reverse camera | /brands/bentley-service-dubai/electrical-repair#reverse-camera | Substantial section on existing electrical page; no duplicate route |
| Tyre / tire repair | /services/tire-repair-dubai | British copy, retain route, safe-repair FAQs and existing links |

New pages will reuse the generic service layout and data contract, with English-only navigation and metadata until real translations exist. Add no near-duplicate variant routes. Use existing images only, without labelling them as evidence of a specific new service. Connect electrical ↔ specialist electronics ↔ brand hubs. Update sitemap lastmod only for changed content; retain existing canonicals, redirects and indexation decisions. Do not add FAQ rich-result promises: Google retired that result feature in May 2026 (https://developers.google.com/search/updates).

Validation plan: production build and all existing pipeline validators; both TypeScript configurations; lint; a targeted master-release check for 12 owners, new routes, metadata, schema/content, links, language alternates, legacy tyre routing and analytics; production-preview desktop/mobile visual and interaction checks. Re-audit before report.

Baseline: TypeScript emitted no errors. Full lint has a pre-existing NUL-regex error in `src/entry-server.tsx` and scans duplicate historical QA/output checkouts. Fix the narrow source expression without changing NUL removal and exclude generated QA/output artifacts from lint. Preserve the existing uncommitted maintenance-guide, route and validation changes, plus untracked orange images.

## Implemented content and architecture

- BMW: preserved the comprehensive hub, 14 service links, model pages and FAQs; clarified maintenance versus fault diagnosis, added useful battery/electrical paths and a distinct search description.
- Rolls-Royce: preserved Cullinan/Ghost/Phantom/Wraith/Dawn coverage and service links; improved suspension and electrical enquiry guidance, metadata and visitor-facing labels.
- Aston Martin: preserved the established hub and child pages; added useful engine/brake/electrical guidance and a distinct service description.
- Bentley: preserved the hub and electrical child; replaced SEO-planning language with customer guidance and linked the new reverse-camera section. That section separates installation from diagnosis and explains integration, quotation and function checks. No new camera URL was created.
- PPF: retained title/H1/URL, coverage and coating comparison; added installer selection, care, lifespan factors, professional removal and paint-repair links. Ceramic: retained its separate intent and URL; strengthened coating terminology and used its existing hero for social previews. The broad paint-care selector and polishing owner remain intact.
- Tyres: retained `/services/tire-repair-dubai` and the existing legacy redirects; changed visible copy to British English, added four practical FAQs and kept one natural American spelling variant. Unsafe damage is not promoted as repairable.
- Electrical: expanded fault symptoms, circuit testing, wiring, charging and communication diagnosis, repair decisions and FAQs. Added contextual enquiry CTAs and links to CUE, head-unit repair, Mercedes audio, Bentley camera, battery and diagnostics.
- Three new English pages reuse `ServicePage` and the service data contract. CUE owns all screen and XTS/SRX variants; head-unit repair owns COMAND/command-unit variants without calling every generation COMAND; Mercedes audio owns stereo/E-Class/sound-system upgrade variants. Diagnosis and upgrades remain separate. Each page contains unique metadata, useful symptoms or planning guidance, compatibility limits, repair/installation process, FAQs and quote pathways.

The three new pages are discovered through the electrical parent, relevant brand hubs, service directory, HTML sitemap and XML sitemap. English-only pages do not advertise unavailable Arabic equivalents. The existing Arabic content and its indexing policy are retained.

## Technical and conversion changes

The current prerendering pipeline emits real route content, self-canonicals, metadata and Service/WebPage/Breadcrumb graphs for the new pages. Business entities continue to use shared global IDs. No duplicate organization, rating, warranty or FAQ rich-result claim was added. Existing FAQ schema stays aligned with its real content; new specialist FAQs do not introduce FAQPage schema. Forced-mounted answers are kept in initial HTML while the actual disclosure region hides when closed, preserving accessibility and user control.

Generic service pages gain a main landmark, labelled wrapping breadcrumbs, hero spacing, and eager hero priority. New pages use real existing responsive 540/960-pixel workshop WebP assets and literal workshop alt text, including directory cards. Ceramic OG/Twitter metadata now uses its actual page image. Hash navigation waits for a lazy page to mount, allowing Bentley reverse-camera links to scroll to their target.

Existing analytics code, event names and contact numbers are unchanged. New links use existing delegated tracking and placement attributes. New generic enquiry CTAs expose model/year/symptom details in the WhatsApp draft without adding that message text to the `whatsapp_click` payload.

Sitemap entries and lastmod dates come from the route manifest, with only actual content changes marked 16 September. No existing URL was renamed and no new redirect was needed. The legacy tyre redirects remain part of the generated routing contract. Runtime routing still requires the generated handler to be active on the deployed host; local output checks are not proof of live-domain activation.

## Research and evidence boundaries

Business and capability evidence is the existing repository plus the owner's explicit service confirmation. General technical wording was checked against [Mercedes-Benz's infotainment information](https://group.mercedes-benz.com/technology/digitalisation/connectivity/mbux-interior-assist.html), [Michelin's repair guidance](https://www.michelinman.com/auto/auto-tips-and-advice/tire-maintenance/can-my-tire-be-repaired) and [XPEL's care guidance](https://www.xpel.com/product-care). These references do not establish a supplier, certification or manufacturer relationship with DIGI-TEC. [Google's documentation update](https://developers.google.com/search/updates) confirms retirement of FAQ rich results; on-page FAQs still serve visitors.

## External follow-up

Publish the tested build through the established hosting workflow and verify public HTTP responses, particularly `/services/tire-repair` and existing Mercedes aliases. Prior deployment notes record that uploaded redirect files alone did not activate custom-domain redirects. Submit/check the generated sitemap in Search Console, inspect the three new URLs and compare results over a longer period using query-by-page exports. The seven-day workbook cannot establish cannibalization or predict ranking gains. Confirm actual selected products, component fitment, prices and warranty terms per enquiry; none were invented here. Real CUE/audio/camera job photography can later replace the general workshop images.

## Final validation and second audit

Implementation is complete in the local production checkout and built output. No publication or live indexing change is claimed.

| Check | Result |
| --- | --- |
| Production build | Passed all 14 declared stages; 1,247 prerendered React routes |
| Sitemap regression | All 993 original canonical entries retained; exactly three intended additions; 996 total |
| Type checking | Both application and Node TypeScript configurations passed |
| Lint | Passed, zero errors; 10 existing React refresh/hooks warnings remain |
| Full SEO/routing pipeline | Passed schema, canonical, indexability, true 404, PPF, polishing, protection integration, query release, attribution, oil, suspension and transmission checks |
| Existing query-release checks | Passed 44,433 internal links, metadata, preserved maintenance guides and 16 real-HTML Mercedes redirect cases |
| Master intent audit | Passed all 12 owners, 761 internal links, unique target titles/descriptions, 50 existing schema FAQ answers and 12 new specialist FAQ answers |
| Generated HTTP handler | Passed 24 owner GET/HEAD responses, 16 legacy tyre redirect cases and English-only specialist boundaries |
| BMW hub regression | Passed 14 service links, seven model links, 11 FAQ answers/schema, metadata, canonicals and reciprocal links |
| Responsive browser QA | Passed 27 owner checks: 12 desktop at 1440px, 12 mobile at 390px and three new pages at 320px |
| Interaction QA | FAQs expand and collapse by keyboard, Bentley native disclosures work, hub camera links reach their section, electronics SPA/back/forward navigation replaces metadata and schema correctly |
| Conversion QA | Exactly one simulated `whatsapp_click` and one `whatsapp_chat_opened`; draft text/query excluded; navigation prevented and no enquiry sent |
| Protection browser regression | Passed initial HTML, query/slash handling, reloads, directory and cross-service navigation, back/forward, schema replacement and unknown-service 404 |
| Browser errors | Zero runtime/hydration errors and zero failed local asset/page requests |
| Visual inspection | Desktop, mobile and narrow heroes, FAQ content, PPF care and Bentley camera sections reviewed; no clipping or horizontal overflow found |

Build source fingerprint: `7cf75aad8fafea31a8964138a81be9ca7ddce881f86c4073762db190d941c7c4`.

Browser tests blocked third-party requests, so these checks validate local rendering and tracking payloads, not live Google Analytics ingestion or field Core Web Vitals. The production pipeline was run with the existing Windows build-access permission after the sandbox prevented Vite from resolving its configuration. No build workaround or dependency change was introduced.

Evidence is in `outputs/seo-2026-09-16/validation-results.json`, `master-validation.json`, `browser/browser-results.json`, screenshot files and the copied production/protection-browser reports. `keyword-url-map.csv` maps every one of the 32 requested queries to its implemented owner and preserves workbook metric ranges. `search-console-audit.md` includes the full findings and additional Ferrari, Mercedes, McLaren, oil-change and other opportunities. Their established pages and recent work were retained rather than broadly rewritten based on a one-week sample.

## Significant files changed or created

New source:

- `src/data/electronicsServices.ts` — three specialist pages and shared electronics link definitions.
- `src/components/BentleyCameraSection.tsx` — camera installation/diagnosis section on the established Bentley electrical URL.

Content and page integration:

- `src/data/services.ts` — electrical and tyre content, optional accurate image alt text, specialist lookup and English-only navigation entries.
- `src/data/priorityBrandSeo.ts` — four hub descriptions and Bentley title.
- `src/data/mercedesServiceContent.ts` — owner-confirmed audio-upgrade scope distinction.
- `src/data/ppfContent.ts`, `src/data/ceramicCoatingContent.ts` — protection metadata.
- `src/components/BmwHubSections.tsx`, `RollsRoyceHubSections.tsx`, `AstonMartinHubSections.tsx`, `BentleyHubSections.tsx` — focused guidance, links and visitor-facing copy.
- `src/pages/PpfPage.tsx`, `src/pages/CeramicCoatingPage.tsx` — practical protection content and image/schema metadata.
- `src/pages/ServicePage.tsx` — specialist rendering, English-only safeguards, initial FAQ answers, image metadata, breadcrumbs, main landmark and CTA spacing.
- `src/pages/Services.tsx` — accurate directory image alternative text.
- `src/pages/BrandPage.tsx` — Cadillac and Mercedes electronics navigation.
- `src/pages/BrandServicePage.tsx` — Bentley camera section, Mercedes specialist/parent links, main landmark and crawlable FAQ answers.

Technical support and validation:

- `src/App.tsx` — correct fragment scrolling after lazy route navigation.
- `src/components/ui/accordion.tsx` — collapsed-state visibility on the actual forced-mounted region.
- `src/lib/route-manifest.ts`, `public/sitemap.xml` — three new canonical entries and truthful modification dates, preserving prior work.
- `src/entry-server.tsx` — identical NUL removal without the pre-existing lint error.
- `eslint.config.js` — exclude generated QA/output checkouts from source lint.
- `package.json` — explicit typecheck and master-SEO validation commands; no dependencies added.
- `scripts/validate-bmw-hub.mjs` — stale metadata expectations corrected.
- `scripts/validate-master-seo.mjs`, `scripts/test-master-seo-browser.mjs` — reusable release and responsive/interaction checks.

The existing build regenerated route inventories and reports in `docs/seo/route-schema-matrix.csv`, `schema-inventory.md`, `protection-release-validation.json`, `query-release-validation.json`, `oil-change-validation.json`, `suspension-validation.json` and `transmission-validation.json`. This implementation report and the evidence folder were added. Earlier uncommitted maintenance-guide/Porsche changes, the existing `validate-query-release.mjs` edits and the two untracked orange images were preserved. A baseline patch and sitemap snapshot are stored in the evidence folder.
