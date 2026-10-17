# PPF Phase 1 baseline: ownership, content and business evidence

Audit date: 17 October 2026, Asia/Dubai. This is the audit-only agent's baseline assessment, before the parent agent's Phase 1 changes. No source files or live data were edited by this agent. Findings below separate repository evidence, public crawler-readable output and unverified production checks.

## Decision

Retain `/services/paint-protection-film` as the primary commercial PPF owner, retain `/services/paint-protection-dubai` as an indexable solution-selection hub, and retain `/blog/ceramic-coating-vs-ppf-dubai` as the informational comparison. Existing content already supports these distinct purposes. No supplied query-by-URL, backlink or conversion evidence justifies a redirect, cross-canonical or noindex consolidation.

The main remaining Phase 1 gap is the quotation funnel: baseline form collects only vehicle brand/model/year/coverage, defaults to Full Body, and hands off to WhatsApp. The existing page is already substantially developed; preserve its design and useful explanations while addressing explicit brief requirements.

## Evidence and limitations

- Read source: `src/pages/PpfPage.tsx`, `src/components/PpfQuoteForm.tsx`, `src/data/ppfContent.ts`, `src/data/services.ts`, `src/pages/PaintProtectionPage.tsx`, `src/data/paintProtectionContent.ts`, `src/data/aiGuidePostsExtra.ts`, `src/i18n/ar-general-blog-content.ts`, `src/i18n/ar-protection-services.ts`, `src/pages/ServicePage.tsx`, `src/components/ServiceGrid.tsx`, `src/pages/Services.tsx`, `src/lib/schema.ts`, `index.html`, `public/robots.txt`.
- Read prior decisions: `g3-broad-paint-protection-ownership.md`, `docs/seo/ppf-upgrade.md`, `docs/seo/paint-protection-2026-10-12.md`, `docs/seo/paint-protection-predeployment-qa-2026-10-12.md`, `docs/seo/owner-verification.md`.
- Public web-reader access succeeded for [PPF](https://digitecme.com/services/paint-protection-film), [broad protection](https://digitecme.com/services/paint-protection-dubai), and [comparison guide](https://digitecme.com/blog/ceramic-coating-vs-ppf-dubai). PPF and hub were reported crawled today; article was reported crawled last week. This confirms readable public content through that tool, not origin response headers, current Google indexing or real-time cache freshness.
- Direct PowerShell HTTP inspection failed DNS resolution under the restricted environment for every attempted public URL. The web reader returned an internal error for Arabic PPF/article and robots. These tool failures do **not** establish an outage, missing page, blocked crawler or non-200 response.
- No current GSC URL Inspection, selected-canonical report, backlink export, CRM confirmation, Google Business Profile record or CrUX field report was available to this audit agent. Sitemap inclusion and historical impressions are not evidence of current indexation.

## Findings

| Severity | Affected URL or scope | Baseline evidence | Recommendation |
|---|---|---|---|
| High | `/services/paint-protection-film#ppf-quote` | `PpfQuoteForm.tsx` state is `{ brand, model, year, coverage: 'Full Body' }`. There are no customer name, contact method, contact details or optional notes fields; coverage menu only maps the three coverage records. | Complete the required fields, add an explicit “Unsure — advise me” option and validate the chosen contact route. Use clear WhatsApp handoff wording and privacy notice. |
| High | PPF quotation conversion reporting | Form opens `wa.me/97143402223` through `window.location.assign`, calls `trackWhatsAppClick`, then emits `whatsapp_draft_opened`; no backend acceptance/booking evidence exists in this form. | Preserve the distinction between form started, handoff, CTA click, accepted submission and confirmed booking. Do not fire submission-success or booking-confirmed events for a WhatsApp open. Treat successful submission as unavailable until supported by an accepted backend response or verified lead confirmation. |
| Advisory | `/services/paint-protection-film` and broad hub | PPF graph includes WebPage, BreadcrumbList and Service; 14 visible PPF FAQs are rendered from `ppfFaqs`, but `buildFAQ` is not imported/called. Hub graph similarly omits FAQ markup despite visible FAQs. `validate-ppf.mjs:32` currently explicitly excludes FAQPage. | FAQPage is optional, and omission is not an indexability defect. If adding it, generate only from the exact visible questions/answers, consciously update the graph expectation and verify JSON-LD against rendered HTML. Do not promise FAQ rich results. Existing Service/Breadcrumb graph is already appropriate. |
| Medium | Shared entity graph consumed by PPF pages | `index.html` uses the public name “Digi-Tec Performance Center” on Organization and AutoRepair/AutomotiveBusiness and has no `legalName`. The user's current brief confirms “DIGI-TEC Performance Center L.L.C.”. | Add the confirmed registered legal name in the existing shared entity graph while retaining stable IDs and the established public brand name. Avoid duplicate LocalBusiness entities. |
| Medium | `/ar/services/paint-protection-film` | Arabic PPF continues through `ServicePage` and `refineArabicProtectionService`; English uses the dedicated `PpfPage`. Existing Arabic copy has localized owner links and fewer FAQs, but no dedicated PPF quotation form equivalent. | Preserve Arabic routing, canonical/hreflang and language switching; provide equivalent accessible quote access if adding new funnel UI. Do not point Arabic visitors to an unsupported translated route. |
| Medium | Installation evidence across PPF pages | `verifiedProtectionProjects` in `paintCareProjects.ts` is an empty array. Main page workshop photograph explicitly says the cars' PPF coverage is undocumented. Hero caption is a generic application detail, not a verified customer project. | Keep generic existing photography accurately described. Request real dated job records and image permission before publishing project claims, before/after proof, named customer stories or installation quantities. |
| Advisory | PPF landing-page wording | Baseline title is “PPF Dubai | Paint Protection Film Installation | DIGI-TEC”; H1 is “Paint Protection Film (PPF) Dubai”. Cost/process/coverage/general limits are already present. | A concise unique title and the requested H1 are reasonable refinements. Avoid wholesale rewrite or artificial keyword repetition. Keep explicit limits and quote-led prices. |
| Advisory | Public comparison article freshness | Web tool presented title “Ceramic Coating vs PPF Dubai | Which Protection Is Right?” and updated date 2026-09-30; local source has “Ceramic Coating vs PPF: Dubai Owner’s Guide | DIGI-TEC”, updated 2026-10-12 and expanded preparation/care sections. | Record repository versus crawler-mediated production difference. Verify an actual origin response after an approved release; do not assert current production has or lacks the newer change solely from a cached web-reader snapshot. |
| Advisory | Shared homepage service-card images | `ServiceGrid` images have descriptive titles as alt text and a CSS aspect-ratio wrapper, but no intrinsic `width`/`height`. Main PPF hero/workshop images already have dimensions, responsive WebP sources and correct eager/lazy priorities. | Keep PPF image behavior. Intrinsic attributes on shared cards can be separate scoped maintenance if justified; do not claim an observed CLS failure without measurement. |
| Evidence limitation | Production routes, Arabic pages, canonicals, robots and HTTP headers | Public text was readable for three English pages; shell origin fetches failed DNS, Arabic and robots reader access failed. Source supplies self-canonical construction and real Arabic route logic. | Verify built initial HTML and local routing now. Production status codes, header directives, slash redirects and exact live hreflang need a reachable production fetch or later approved QA; mark unverified instead of inferring success/failure. |
| Evidence limitation | All PPF owners | No query × URL matrix or backlinks available. Historical GSC pages overlap in PPF impressions, but separate page/query tables cannot identify query-level URL competition. | Keep owners distinct and request page-filtered query exports plus backlinks and enquiry quality before considering consolidation. |

## Keyword ownership map

Arabic equivalents retain the same intent ownership through their existing `/ar` routes. These assignments are editorial targets, not claims that Google currently ranks the intended URL.

| Intent or query family | Primary owner | Supporting pages | Decision |
|---|---|---|---|
| PPF Dubai; paint protection film Dubai; car PPF Dubai; PPF installation Dubai; full body PPF Dubai; film coverage | `/services/paint-protection-film` | Broad hub, comparison guide, related paint-care services and existing relevant brand hubs | Primary commercial owner; keep quote and film-specific content here. |
| Paint protection Dubai; car paint protection; what protection suits my paint/use | `/services/paint-protection-dubai` | PPF, ceramic, polishing/correction, comparison guide | Retain broad decision hub with self-canonical and useful separate purpose. |
| PPF vs ceramic coating Dubai; ceramic coating vs paint protection film; is PPF better than ceramic; what protects paint | `/blog/ceramic-coating-vs-ppf-dubai` | PPF and ceramic owners plus broad hub | Informational comparison; explain tradeoffs, preparation and care, then link to commercial owners. |
| Ceramic coating Dubai; ceramic paint protection; coating for cleaning/water behaviour | `/services/ceramic-coating` | Broad hub and comparison guide | Preserve coating distinction; do not imply coating equals a stone-chip barrier. |
| Existing swirls, dull finish, safely correctable shallow marks | `/services/car-polishing-dubai` | Broad hub and relevant film/coating preparation links | Preserve correction owner; protection does not repair defects. Arabic hub already labels English polishing route explicitly because an Arabic owner is not supported. |
| Self healing PPF | General educational question on PPF owner, only with careful product distinction | Comparison guide if useful | Explain only as general technology; DIGI-TEC product capability remains unconfirmed. Do not advertise a specific self-healing installed film. |
| PPF Spectre | No DIGI-TEC target assigned | None | Ambiguous product/brand/installer/vehicle intent; exclude from brand/service claims until exact meaning and supported offering are verified. |

### “PPF Spectre” intent research

Search research on 17 October 2026 found multiple plausible primary-source entities: [Spectre Films](https://spectre-usa.com/) markets paint protection films, and [Tekton's SPECTRE product](https://www.tektonpf.com/products/spectre) is another film product. [Spectre PPF](https://spectre-ppf.fr/) is also a separate installer brand. This is evidence of ambiguity, not proof of the user's specific GSC query intent or a DIGI-TEC supplier relationship. Do not import their properties, warranties or installer claims into DIGI-TEC copy.

## Existing internal-link coverage to preserve

| Source | Existing discovery path |
|---|---|
| Homepage | `Index` renders `ServiceGrid`, which enumerates service data and links PPF, broad protection and ceramic cards to the existing owners. |
| `/services` directory | Category lists enumerate the same service owners with crawlable localized links. |
| Broad hub | Dedicated PPF, ceramic and correction cards; comparison guide, ceramic education and body-repair links. |
| PPF owner | Early broad-hub link; ceramic service and comparison guide; polishing and body-repair references; relevant brand hubs. |
| Comparison guide, EN/AR | Introductory contextual PPF and ceramic links; broad hub and related preparation/care resources. |
| Polishing and ceramic owners | Contextual PPF, hub and comparison links appropriate to preparation and protection. |
| Relevant brand pages | `BrandPaintCareLinks` connects vehicle discussion to the commercial PPF owner and relevant education. |

The old `PPFCeramicSection.tsx` contains product-qualified self-healing/hydrophobic bullet wording but is not imported by the current homepage or another active consumer found in the inspected source. Treat this as dormant component wording, not evidence that the current PPF page makes those claims. Do not expand scope into unrelated homepage redesign.

## Baseline metadata from repository

| Page | Title | Description |
|---|---|---|
| PPF EN | PPF Dubai \| Paint Protection Film Installation \| DIGI-TEC | PPF installation in Al Quoz, Dubai. Compare full-body and selected-panel paint protection film, preparation and aftercare. Request a DIGI-TEC quote for your car. |
| Broad hub EN | Car Paint Protection Dubai \| PPF & Ceramic Coating \| DIGI-TEC | Compare PPF, ceramic coating and paint correction in Dubai. Choose protection for your car’s paint and driving needs. Get a DIGI-TEC quote in Al Quoz. |
| Comparison EN | Ceramic Coating vs PPF: Dubai Owner’s Guide \| DIGI-TEC | Compare PPF and ceramic coating for Dubai driving: chip protection, cleaning, paint preparation and aftercare. Learn what to ask before choosing. |
| PPF AR | أفلام حماية الطلاء PPF دبي \| التغطية والتركيب \| ديجي-تك | تركيب أفلام PPF في القوز، دبي. ناقش تغطية كاملة أو جزئية وتحضير الطلاء والحواف والعناية حسب الفيلم والسيارة. اطلب عرضاً للتغطية المطلوبة. |

Canonical and localized alternates are constructed by `useSeo`; both original owners remain independent in the route manifest. Current source robots allows crawling generally and already contains explicit OpenAI crawler groups. The task does not require adding AI crawler directives or weakening protected endpoints.

## Business facts requiring confirmation before new claims

Confirmed by current user: registered business name, Dubai market, automotive PPF installation, quote-led pricing and brand color subject to tokens. Prior owner-verification document records 2002 as confirmed founding year.

Existing business records consistently publish +971 4 340 2223 and the general Al Quoz Industrial Area 3 / Warehouses 11–15 workshop address. Reusing the established phone/contact workflow preserves repository behavior; this audit did not independently authenticate number ownership, WhatsApp delivery, precise customer entrance or a separate PPF facility.

Before adding more specific claims, obtain:

1. Installed film manufacturer/series, currently offered finishes and product documentation.
2. Authorized installer, manufacturer relationship or certification records if such wording is desired.
3. Applicable product-specific self-healing, hydrophobic, UV, thickness, material, durability and removal guidance.
4. Written warranty scope, duration, exclusions and responsible warrantor.
5. Confirmed current coverage options and exact included/excluded panels; full-front availability remains an enquiry, not a guaranteed package.
6. Vehicle-specific pricing, any approved published prices/discounts, and supported turnaround information.
7. Actual PPF facility address if different from the existing workshop, precise directions/map pin and current hours.
8. Dated installation records, genuine photographs and permission to publish customer/vehicle cases.
9. Independently supported review totals, customer quotes, awards or quantities before publishing any.
10. Backend acceptance and CRM/booking evidence before reporting confirmed quotation submissions, qualified leads or bookings.

No external content, pricing, supplier data, live configuration or production records were modified. All recommendations remain subject to parent implementation and fresh local rendered-output QA.
