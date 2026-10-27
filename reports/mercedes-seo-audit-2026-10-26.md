# DIGI-TEC Mercedes SEO audit — 26 October 2026

**Read-only investigation and recommendations for review.** No website source, build output, published content, Cloudflare settings/rules/order, redirects, backend or database was changed. New deliverables and evidence are confined to `reports/`. Existing unrelated workspace changes were preserved. No deployment, indexing submission, listing edit, outreach or booking submission was performed.

## 1. Decision summary

The main [Mercedes service hub](https://digitecme.com/brands/mercedes-benz-service-dubai) exists, is the appropriate preferred broad commercial owner, returns 200 and supplies substantive initial HTML, a self-canonical, one H1, service/model/problem navigation, XENTRY information and booking controls. The site already has an extensive Mercedes architecture. A wholesale rewrite or a new page for every service synonym/model would be poorly supported.

The highest-priority confirmed technical problem is **legacy routing**: 95 of 99 alias paths prepared in the repository return homepage HTML with HTTP 200. Four of those paths appear in the current GSC page export. They deserve priority over speculative aliases. This is not a finding of 95 broken current internal links: all 164 sampled internal HTML destinations passed relevant-content/canonical checks.

The **English oil-change redirect activated October 21 is healthy in the fresh sample**. Preserve it. The Arabic legacy oil route is a separate, failing path. Oil slash/slashless forms remain accessible with a consistent slashless canonical; current Google-selected canonical needs URL Inspection before proposing normalization.

All seven supplied keyword figures match the workbook. The expanded, reviewed Mercedes query set has **117 visible queries, 905 impressions and 4 clicks (0.442% CTR)**. Broad workshop/service/repair accounts for 458 impressions and zero clicks in the classified visible query set. Repair Dubai (4.61) and specialist Dubai (7.04) are near-term commercial opportunities; service Dubai (16.50), workshop Dubai (18.84) and maintenance Dubai (16.57) need stronger evidence-led improvement of the existing hub. These are priorities, not predicted ranking lifts.

**No ranking decline, harmful cannibalization or redirect-caused loss is established.** The latest matching 28/90-day windows, query-page joins, authenticated index/analytics data and controlled Dubai Google/Maps positions are unavailable. Those limits materially constrain causal conclusions.

## 2. Evidence, dates and coverage

| Evidence | Coverage and interpretation |
|---|---|
| Original Search Console workbook | `C:\Users\ADMIN\Downloads\digitecme.com-Performance-on-Search-2026-10-26.xlsx`; SHA-256 `05a2d6036fa9210f4c63e3ff9ff3b21ba78c50a2214a1aff90823d66b8fe7859`. Read directly; source unchanged. `Filters!A1:B3`: Web (text-based), Last 7 days. `Chart!A2:E8`: October 18–24 inclusive. No country, device, query or page filter. |
| GSC detail | 1,000 visible query rows and separate Pages/Devices/Countries tabs. 117 confirmed Mercedes-related query rows; 49 Mercedes-related URL rows including the reviewed G63 conversion case. 178 extracted CSV rows were independently rechecked against original cells, zero mismatches. |
| Historical files | 22 raw exports inspected. None supplies matching latest 28/90-day windows ending October 24. Older search-type labels and query/page/appearance filters differ; some three-month exports cover 92 days. |
| Production HTTP | October 26, 10:06:37–10:06:57 Dubai time, plus supplemental requests. Sitemap has 1,005 URLs; all 75 containing `mercedes` fetched, plus four intentionally noindex Arabic model pages and five controls: 84 primary responses, 79 Mercedes URLs. |
| Routing/links | 99 prepared slashless apex aliases; 35 further variant/control GET cases and four targeted HEAD cases. 166 same-origin link destinations: 164 HTML pages, one PDF and one email-protection utility. Each HTML target checked for relevant title and self-canonical, not status alone. |
| Repository | React/Vite server rendering, prerender/SEO collector, route policy, Mercedes content/model/service sources, Cloudflare alias inventory and analytics code inspected without running a build. Existing September/October reports used only as dated context. |
| Rendered observation | One desktop viewport, 1280×720, correct visible hero/contact controls and no horizontal overflow. No mobile/device usability pass inferred. |
| Competitors/local | Six current primary competitor pages inspected; public citations reviewed. Actual Google result ordering was blocked by Google JavaScript/retry shells; current GBP management fields and Maps grid data unavailable. |

Detailed provenance and limitations: [GSC analysis](evidence-2026-10-26/gsc/gsc-analysis.md), [row verification](evidence-2026-10-26/gsc/verification.json), [technical findings](evidence-2026-10-26/technical/findings.md), [raw HTTP evidence](evidence-2026-10-26/technical/http-audit.json), [rendered observation](evidence-2026-10-26/rendered-hub-observation.md), [competitor report](mercedes-competitor-gap-2026-10-26.md). Production checks establish public behavior at capture time, not continuous monitoring or Google indexing.

## 3. Search Console performance and opportunities

### Verified headline keywords

| Exact query | Average position | Impressions | Clicks | Recalculated CTR | Workbook range |
|---|---:|---:|---:|---:|---|
| mercedes repair dubai | 4.61 | 61 | 0 | 0.00% | Queries!A13:E13 |
| mercedes specialist dubai | 7.04 | 23 | 0 | 0.00% | Queries!A75:E75 |
| mercedes service dubai | 16.50 | 22 | 0 | 0.00% | Queries!A83:E83 |
| mercedes workshop dubai | 18.84 | 19 | 0 | 0.00% | Queries!A100:E100 |
| mercedes service center dubai | 29.06 | 18 | 0 | 0.00% | Queries!A107:E107 |
| mercedes oil change | 27.71 | 17 | 1 | 5.88% | Queries!A4:E4 |
| mercedes maintenance dubai | 16.57 | 14 | 0 | 0.00% | Queries!A144:E144 |

Average position is an impression-based GSC metric, not a fixed local rank. A page's average position includes its other queries. Thus the hub's page position 21.36 does not contradict repair Dubai at 4.61, nor does the oil page's 7.55 prove it ranks 7.55 for the nonlocal oil query. GSC result context also varies by location/device/time. [Google performance-report definitions](https://support.google.com/webmasters/answer/7576553).

### Full-query scope and reconciliation

Every visible Mercedes query was examined and retained with exact cells, intent and position band in [all 117 confirmed query rows](evidence-2026-10-26/gsc/mercedes-queries.csv). The set includes Mercedes/Benz/AMG, obvious `merceds` typos, three Arabic references and ten manually reviewed model/chassis references. The explicit subset is 107 rows / 875 impressions / 4 clicks; the additional model subset is ten rows / 30 impressions / zero clicks. Two BRABUS-only ecosystem queries (five impressions) remain separate; ambiguous `mb vrx` (one impression) is excluded. Maybach-only demand remains a separate brand task. See the [candidate register](evidence-2026-10-26/gsc/all-mercedes-related-query-candidates.csv).

| Scope | Clicks | Impressions | CTR | Approx. impression-weighted position |
|---|---:|---:|---:|---:|
| Property daily chart, sitewide | 49 | 10,790 | 0.454% | 19.03 |
| All visible exported queries | 9 | 7,152 | 0.126% | 22.83 |
| Confirmed visible Mercedes query set | 4 | 905 | 0.442% | 15.67 |
| Confirmed Mercedes URL rows, all queries | 13 | 2,940 | 0.442% | 12.42 |

The query export has 1,000 rows, consistent with the export cap. Hidden/anonymized/omitted queries explain why its totals do not reconcile to the chart. Mercedes query totals are a **lower-bound visible-export baseline**, not complete Mercedes traffic. URL rows capture other queries too, and some Mercedes queries can land on URLs without Mercedes in the path. Do not add query and page totals. CTR is summed clicks divided by summed impressions; positions above are weighted from rounded row values, not averages of percentages or exact property metrics.

### Position bands and commercial priority

Continuous positions use ≤3, >3–10, >10–20 and >20; the latter bands correspond to the requested 4–10 and 11–20 groupings without rounding away positions such as 10.52.

| Band, all 117 confirmed queries | Query rows | Impressions | Clicks | CTR | Main treatment |
|---|---:|---:|---:|---:|---|
| ≤3 | 16 | 181 | 1 | 0.552% | Preserve relevant strong visibility; inspect actual snippets and intent. |
| >3–10 | 39 | 275 | 0 | 0.000% | Prioritize repair/specialist and local oil/AC opportunities after verifying the ranking URL. |
| >10–20 | 23 | 203 | 1 | 0.493% | Improve existing hub/service relevance, useful proof and customer paths. |
| >20 | 39 | 246 | 2 | 0.813% | Check intent, indexed owner and routing before editorial expansion. |

| Opportunity | Evidence | Preferred treatment |
|---|---|---|
| Repair and specialist Dubai | 61 impressions / 4.61 and 23 / 7.04, zero clicks | Highest commercial proximity to top-three goal. Preserve hub; inspect actual snippet, UAE/device/query-page data and inquiry path. Also `mercedes repair in dubai`: 17 impressions / 4.18 (`Queries!A110:E110`). |
| Service/workshop/maintenance Dubai | 22 / 16.50; 19 / 18.84; 14 / 16.57 | Existing hub already explains service scope. Observe the recent service campaign, improve verified proof/local facts/journeys selectively, and keep repair signals. |
| Service-center Dubai | 18 / 29.06 | Same hub; no new synonym page. Check owner/indexing and competitor proposition before experimenting. |
| Oil | Nonlocal 17 / 27.71 / 1 click; Dubai 8 / 8.25 / zero clicks (`Queries!A232:E232`) | Existing oil owner and canonical investigation. Distinguish local booking from generic product/information demand. |
| AC | `mercedes benz ac repair`: 13 / 8.62; `mercedes air conditioning repair`: 10 / 8.80; Dubai AC: 7 / 11.86 | Existing Mercedes AC page; vehicle-specific diagnostics, leakage/airflow scope and genuine job evidence. |
| Suspension | Dubai: 13 / 17.08 (`Queries!A157:E157`) | Existing suspension owner; preserve fitted-system distinctions and link relevant AIRMATIC guides. |
| Transmission/brakes | Transmission Dubai: 6 / 28.83; nonlocal transmission: 8 / 17.50. Brake repair: 8 / 30.62 / 1 click | Improve existing specific owners after query-page checks; do not promise a fluid change solves a gearbox fault. |
| General repair | `mercedes repair`: 66 / 14.33, zero clicks | High within this small export, but less local intent. Validate country/device and actual ranking URL before treating it as equal lead value to Dubai. |
| Audio upgrades | Six related queries: 204 impressions / zero clicks / weighted position 1.95; page has 893 impressions / zero clicks / 13.69 across all queries | Protect strong query visibility and distinct upgrade intent. Investigate snippet/intent and broader page queries; do not rewrite this page into maintenance copy. |
| Arabic service | `صيانة مرسيدس`: 7 / 69.00 (`Queries!A298:E298`) | Preserve native-language owner and inspect actual Arabic query-page performance; routing and translation evidence precede expansion. |

No generic CTR benchmark or lead/revenue forecast is applied to these small samples. Zero clicks at 18–61 impressions may reflect volatility, result features, geography, intent or snippet appeal; the data does not isolate a cause.

### Every Mercedes landing page

All **49 confirmed URL rows** are in [Mercedes page performance CSV](evidence-2026-10-26/gsc/mercedes-pages.csv), with exact workbook ranges; the [GSC evidence report](evidence-2026-10-26/gsc/gsc-analysis.md#mercedes-page-rows) also lists every page. This covers repair/service, symptoms, models, guides, Arabic, tuning and the reviewed G63 case rather than counting only the hub.

Highest-priority page observations:

- Hub: **0 clicks / 554 impressions / position 21.36**, `Pages!A31:E31`; principal commercial investigation.
- Audio upgrades: 0 / 893 / 13.69, `Pages!A29:E29`; strong subset queries require protection.
- Engine overheating: **3 / 655 / 5.26**, `Pages!A4:E4`; preserve useful safety guidance and assess relevant service referrals, without assuming informational clicks become jobs.
- Oil leak: **2 / 113 / 5.88**, `Pages!A8:E8`; preserve intent and contextual mechanical-service link.
- Battery warning: 0 / 88 / 8.17; AC service: 0 / 50 / 10.52; check-engine guide: 0 / 49 / 11.73. These offer existing-page opportunities.
- Oil slash URL: **1 / 38 / 7.55**, `Pages!A19:E19`; suspension appears in both slash forms (19 and 1 impressions). This warrants canonical investigation, not an automatic harmful-cannibalization finding.
- Several service/model URLs absent from this visible page export still exist and pass current HTTP checks. Absence is not proof of no demand, no indexing or zero business value.

### Mobile, desktop and site-brand segments

| Device, sitewide only | Clicks | Impressions | CTR | Position | Range |
|---|---:|---:|---:|---:|---|
| Mobile | 34 | 4,136 | 0.822% | 11.21 | Devices!A2:E2 |
| Desktop | 14 | 6,610 | 0.212% | 23.98 | Devices!A3:E3 |
| Tablet | 1 | 44 | 2.273% | 13.18 | Devices!A4:E4 |

Mobile has more clicks despite fewer sitewide impressions; query mix can explain that difference. These are **not Mercedes device metrics**. The workbook lacks query × device/page × device joins, so no Mercedes mobile-ranking disadvantage or advantage can be established.

“Branded” means DIGI-TEC/digitecme and documented close spelling/Arabic variants, not the vehicle marque Mercedes. All 117 confirmed Mercedes queries are non-DIGI-TEC branded under this lexical rule. Across all visible site queries, site-brand terms have 2 clicks / 93 impressions / 2.151% CTR (12 rows); other terms have 7 / 7,059 / 0.099% (988 rows). This classification does not establish navigational intent or replace missing queries.

### History and cannibalization

There is **no defensible current 7/28/90-day trend comparison**. The September 20–October 17 export is filtered to Mercedes service; oil exports end October 18 or cover a different 24-hour window; older broad exports have different periods/search labels. They are useful context, not matched controls. See [historical manifest](evidence-2026-10-26/gsc/historical-source-manifest.json). Historical ranking changes and the effect of the October 21 redirect cannot be established from these files.

Potential overlap exists between broad hub/maintenance guides, oil service/comparison article, model/service/problem templates, generic/brand services, and slash variants. Current architecture generally gives them distinct tasks. Separate Queries and Pages tabs do not prove simultaneous competition, switching or suppression. Obtain query × page × day with country/device context, selected canonicals, leads and relevant links before consolidating. No page deletion, broad redirect, new broad Mercedes page or commercial-model URL migration is recommended from this snapshot.

## 4. Technical audit: confirmed issues and strengths

| Finding / severity | Evidence and affected URLs | Expected SEO/user impact | Proposed treatment / implementation risk |
|---|---|---|---|
| Legacy alias homepage fallback — **P1 for exposed/linked paths**, confirmed | 95/99 prepared aliases return 200, homepage canonical/title and identical main-text hash. [Alias register](evidence-2026-10-26/technical/aliases.csv). | Misleading landing experience and unclear migration signals. Magnitude of ranking impact unknown. | Prioritize observed aliases; propose narrow direct permanent migrations to existing owners after routing-layer review. High implementation risk; preserve all existing rules/order and require separate approval. |
| Genuine missing URL — **P2**, confirmed single sample | `/seo-audit-nonexistent-mercedes-20261026` returns homepage 200. | Soft-404-like response; Google classification not checked. | Specify true 404 handling for genuinely missing paths after valid-route/alias inventory. Medium/high risk for global routing changes. |
| Slash duplicates — **P2**, confirmed behavior | Hub and oil slash forms return 200 and canonicalize to slashless; sitemap/inlinks agree slashless. | Canonical hints already align; possible reporting/crawl fragmentation. No missing-canonical emergency. | URL Inspection first; no automatic redirect or preferred-URL change. Medium/high migration risk. |
| Conversion receipts unknown — **P1 evidence dependency** | GA4/GTM present in 79/79 Mercedes HTML responses; deployed bundles contain contact and draft events. | Visibility cannot yet be related to qualified leads or revenue. | Audit reports/mappings/deduplication with access; code existence is not receipt. Low risk for read-only collection, medium for tracking changes. |
| CWV/mobile unverified — **P2 evidence gap** | Public PSI returned 429; one desktop observation only. | No current performance failure or pass can be claimed. | Obtain field/mobile data and diagnose measured bottlenecks before coding. |

Four GSC-exposed failing aliases have direct, validated existing owners. These are proposed destinations from the current architecture, not implemented changes:

| Observed legacy path | Impressions / GSC source | Current response | Existing intended owner |
|---|---|---|---|
| `/ar/brands/mercedes-benz-service-dubai/oil-change` | 9; Pages!A107:E107 | 200 homepage | `/ar/services/mercedes-oil-change-dubai` |
| `/brands/mercedes-benz-service-dubai/body-repair` | 4; Pages!A142:E142 | 200 homepage | `/services/mercedes-body-repair-dubai` |
| `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | 1; Pages!A226:E226 | 200 homepage | `/ar/services/mercedes-battery-replacement-dubai` |
| `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | 1; Pages!A246:E246 | 200 homepage | `/ar/services/mercedes-mechanical-repair-dubai` |

The [joined alias evidence](evidence-2026-10-26/gsc-exposed-aliases.csv) relates historical page exposure to today's HTTP behavior; it does not establish what each URL served on every October 18–24 date. The 15 impressions above are URL-row exposure, not distinct searches or lost leads.

Confirmed strengths and limits:

- **Robots/sitemap/indexability:** live robots and XML sitemap return 200; Mercedes paths are allowed. Sitemap has no duplicate exact locations. All 75 Mercedes sitemap pages declare index/follow and have no noindex response header. Four Arabic C/E/S/G63 model counterparts deliberately return noindex/follow and are excluded. Preserve those decisions pending content review. Technical eligibility does not prove Google indexing.
- **Metadata/headings:** all 84 primary pages have one nonempty title/description/self-canonical/H1. No exact duplicate titles, descriptions or normalized main-content hashes; no H1–H6 level skips, duplicate IDs or broken same-page fragments in this sample. Near-duplicate purpose and boilerplate can still exist; word-count or template similarity alone is not a defect.
- **Rendering:** `src/entry-server.tsx:19` (renderRoute), `src/entry-server.tsx:50` (stream renderer), `scripts/prerender.mjs:37` and `src/main.tsx:43` implement server rendering, metadata collection and hydration. The production hub's substantial initial HTML confirms discoverability without waiting for JS; one desktop render agrees. Full hydration, JavaScript-disabled interaction and mobile coverage were not tested.
- **Links/orphans:** 164/164 HTML destinations returned page-specific 200/self-canonical/title, and the PDF returned 200. All 79 Mercedes URLs have an incoming audited HTML link after checking the `/tuning` hub, excluding the HTML sitemap as a source. No contextual orphan established in this sample. Whole-site, external backlink and external-link health are not comprehensively established. The Cloudflare email-protection utility returned 404 after stripping its hash; that is not evidence the rendered email link is broken.
- **Architecture:** broad brand hub → specific services/models/problem guides is coherent. Commercial model pages under `/blog/` already serve model intent; a tidier slug alone does not justify migration. Do not create thin Dubai neighbourhood/model permutations.
- **Schema:** Organization, WebSite, AutoRepair/AutomotiveBusiness, WebPage, BreadcrumbList, Brand, Service, OfferCatalog and FAQPage are present on the hub. All sampled JSON-LD parses; visible answers agree with the FAQ graph. Syntax/content agreement is not a Google rich-results validation. Missing optional geo/hours/map fields are not a proven penalty.
- **Cloudflare/hosting:** public headers show Cloudflare. Repository alias code expresses intended behavior, while published `/_redirects` and `/_worker.js` are accessible as assets and most intended aliases do not redirect. Merely publishing those files has not activated those mappings on this host. Current authenticated DNS/rule/Worker inventory was not accessed; do not infer the complete configuration from files or headers.

### Protected October 21 oil migration

English legacy `/brands/mercedes-benz-service-dubai/oil-change` redirects **308 directly to** `https://digitecme.com/services/mercedes-oil-change-dubai`, then 200. All eight GET host/protocol/slash combinations passed; an additional query test preserved repeated parameters, and both apex HTTPS slash/no-slash HEAD tests passed. Repair aliases also retained their direct 301 behavior; no loops appeared in the variant sample.

The historical [October 21 activation record](../docs/seo/mercedes-oil-alias-redirect-2026-10-21.md) documents the protected rule and prior Google selection of the oil slash URL. Treat account state and selected canonical in that note as historical. Fresh evidence supports a healthy English redirect, not its ranking effect. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) treats redirects and canonical annotations as preference signals; use coherent sitemap/inlinks as well. No deletion, replacement, reordering or modification of Cloudflare rules is authorized.

## 5. Keyword architecture and model decisions

The [71-row keyword map](mercedes-keyword-map-2026-10-26.csv) assigns one preferred primary URL per cluster across broad commercial synonyms, all requested services/models, symptoms, guides, Arabic and adjacent tuning/valuation intent. It retains 51 distinct current owners; every preferred URL was verified as a relevant 200 in the fresh primary sample. Metrics are explicitly labeled either exact-query or page-all-query context. They are not measured query-to-URL attribution or search volumes. Related clusters sometimes reuse the same query/page context: **do not sum repeated metrics across map rows**. Major/minor/scheduled rows reuse the broad maintenance query, not independently measured demand for those specific packages.

Broad service/repair/specialist/workshop/maintenance/center/garage/mechanic terms share the existing hub. Oil keeps its existing service URL; gearbox/transmission share the transmission owner; engine/cooling/leaks/timing-chain/turbo share mechanical repair unless differentiated demand and actual repair capability justify a later split. Diagnostic/programming functions belong to diagnostics, tested hardware/wiring faults to electrical, and battery fitting to battery replacement. XENTRY access does not imply blanket online coding or manufacturer authorization.

No reliable keyword-volume dataset was supplied. Public commercial pages confirm that GLC and AMG GT service intent is served in Dubai, for example [Haus of Benz service pricing](https://hausofbenz.ae/service-pricing/) and [Gargash Auto AMG GT service](https://gargashauto.ae/brand/mercedes-amg-gt-service-dubai). This demonstrates intent, not volume, Google rank or a case for DIGI-TEC to copy their page counts. Specific timing-chain/turbo scope is also visible on [SilberArrows engine repair](https://mercedes-benz.silberarrows.com/services/engine-repair); actual DIGI-TEC capability must be verified independently.

| Requested model | Existing preferred service owner | Current export context, not service-demand volume | Decision |
|---|---|---|---|
| C-Class | `/blog/mercedes-c-class-service-dubai-guide` | Page: 2 impressions, zero clicks | Retain; generation-specific maintenance/diagnosis and service links. Audio-upgrade demand does not justify a competing C-Class service page. |
| E-Class | `/blog/mercedes-e-class-service-dubai-guide` | Not in visible page export; exists and passes current checks | Retain; absence is not zero demand. Protect separate E-Class audio intent. |
| S-Class | `/blog/mercedes-s-class-service-dubai-guide` | Page: 1 impression, zero clicks | Retain; model/options determine air/active suspension and diagnostics. |
| G-Class | `/mercedes/models/g-class-service-repair-dubai` | Page: 15 impressions, 1 click | Retain non-AMG scope, distinct from G63. |
| GLE | `/mercedes/models/gle-service-repair-dubai` | Page: 6 impressions, zero clicks | Retain; improve only with useful differentiated evidence. |
| GLC | Hub `#mercedes-models` | No demonstrated distinct GLC maintenance demand in this export; GLC63 tuning is different | Defer dedicated page; require recurring repair inquiries/query evidence, confirmed scope and original content. |
| GLS | `/mercedes/models/gls-service-repair-dubai` | Page: 5 impressions, zero clicks | Retain existing differentiated page. |
| AMG C63 | `/mercedes/models/c63-service-repair-dubai` | Page: 3 impressions, zero clicks; bare/chassis/tuning queries have mixed intent | Retain; differentiate generations/powertrains, do not funnel tuning traffic into generic service. |
| AMG E63 | `/mercedes/models/e63-service-repair-dubai` | Page: 20 impressions, zero clicks | Retain; specific service/repair scope and job evidence. |
| AMG G63 | `/blog/mercedes-g63-service-dubai-guide` | Page: 1 impression, zero clicks; conversion case separately 17 impressions / 1 click | Retain; conversion project is supporting experience, not proof of every mechanical capability. |
| AMG GT | Hub `#mercedes-models` | Current AMG GT tuning page: 1 impression; repair/service demand not established | Defer new service page. Keep performance/case pages distinct; validate service demand and original evidence first. |

The existing S63 owner is also retained in the map. No broad/model consolidation is justified today. If future paired data demonstrates harmful overlap, compare useful content, links, leads and canonical history before selecting an owner and reviewing a migration.

## 6. Main commercial page evaluation and review-ready recommendations

| Customer need | Current evidence | Recommendation |
|---|---|---|
| Mercedes expertise / independent status | Explicit Mercedes service/repair focus and independent workshop wording | Preserve; never describe DIGI-TEC as an authorized dealer without verified evidence. |
| Mechanical services | Extensive oil, engine, brakes, gearbox, suspension, cooling, AC, electrical and other service links | Improve gaps within existing owners; do not duplicate the entire catalogue in new synonym pages. |
| Diagnostics | XENTRY, live data and guided testing with vehicle/access qualifications | User confirms XENTRY capability. Preserve specific limitations for coding/programming and access. |
| Models | Ten model links plus compact/executive/SUV/AMG/EQ group coverage | Retain distinctions and confirm exact fitted systems; defer new GLC/AMG GT pages. |
| Location | Al Quoz Industrial Area 3, phone, directions and full address in business graph | Verify hours/entrance and visible visit details; reconcile conflicting citations. |
| Trust | Workshop photos, G63 conversion project, Google-linked review section | Verify static review claims; add genuine maintenance/diagnostic/repair evidence when available. No invented awards, certificates, warranties or testimonials. |
| Booking/WhatsApp/call | Visible hero CTAs, four telephone and five WhatsApp links, detailed draft form | Preserve. Measure contact actions correctly and clarify that draft opening is not a booking. Full form/mobile task testing remains outstanding. |

Current title, description and H1 match source and live HTML:

- **Title:** `Mercedes Service Dubai | Maintenance & Repair | DIGI-TEC`
- **Description:** `Mercedes servicing in Al Quoz, Dubai. Discuss Service A/B, oil and filters, due inspections and repairs with DIGI-TEC. Request a vehicle-specific quote.`
- **H1:** `Mercedes-Benz Service in Dubai`

**Recommended default: retain these while establishing the post-campaign baseline.** They accurately communicate the main intent. If paired query/snippet and conversion evidence supports a later experiment, a concrete alternative for review is:

- **Title candidate:** `Mercedes Service & Repair Dubai | XENTRY | DIGI-TEC`
- **Description candidate:** `Independent Mercedes servicing and repairs in Al Quoz, Dubai. Discuss Service A/B or XENTRY diagnostics and request a vehicle-specific quote.`
- **H1 candidate:** `Mercedes-Benz Service & Repair in Dubai`

These are unimplemented options, not a finding that today's metadata is defective. Change one bounded package after approval and sufficient observation; monitor repair/specialist as guardrails. Google can generate different title links/snippets, and metadata changes do not guarantee CTR or position gains. [Title guidance](https://developers.google.com/search/docs/appearance/title-link), [snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

Recommended outline largely preserves what already exists:

1. Service-led hero, independent status, Al Quoz and direct booking/call/directions.
2. Vehicle-specific Service A/B, minor/major scope, exclusions and quote inputs.
3. Relevant repair/diagnostic routes with distinct scope and confirmed XENTRY functions.
4. How inspection, quotation, approval and post-work checks operate, supported by genuine service/repair evidence.
5. Model navigation and symptom guidance linked to the relevant commercial owner.
6. Verified reviews and visit information, useful FAQs and the clear WhatsApp-draft booking route.

Current repeated service/XENTRY sections can be reviewed for mobile navigation and redundancy after user evidence; content length is not a ranking objective. Internal-link priorities are maintenance/cost/interval guide → hub, oil comparison → oil service, warning guide → correct diagnosis/repair owner, and model → exact service. Preserve useful contextual links already present.

Useful FAQs already cover where to service, A/B scope, due maintenance, choosing an independent specialist, quotation factors and model coverage. Retain them. Consider an additional hours/arrival question only after verifying hours; do not add invented warranty, free diagnosis, price or turnaround answers. Keep visible answers and any markup aligned.

Structured data: retain connected stable business/provider IDs, the existing Service entity and BreadcrumbList. Add accurate optional hours/geo/map details only once independently verified. `Service` does not itself guarantee a Google commercial rich result. Do not add self-serving LocalBusiness aggregateRating to obtain stars. FAQ rich results were discontinued May 7, 2026; useful visible FAQs remain valuable for customers. [Current Search updates](https://developers.google.com/search/updates), [review policy](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), [LocalBusiness guidance](https://developers.google.com/search/docs/appearance/structured-data/local-business).

## 7. Competitors and separate local/Maps plan

The [competitor report](mercedes-competitor-gap-2026-10-26.md) compares six observed public search candidates: SilberArrows, DAScenter, BavarLand, JAD Garage, Hallmark and ProLab. They are not asserted to be a verified current Google Dubai top-six list. Exact titles/H1s, heading/service architecture, links, trust/local details and source schema are recorded, with limitations. No backlink counts, DA, traffic or search volumes are invented.

DIGI-TEC already competes on architecture, brand/system specificity, independent positioning and booking clarity. The achievable gaps are stronger genuine repair evidence, verified visit facts, optional maintainable price/scope transparency and consistent citations. Competitor claims about certification, parts, warranties or collection are not facts about DIGI-TEC and should not be copied.

The **separate [Google Maps/local SEO improvement plan](evidence-2026-10-26/competitor/local-plan.md)** covers GBP completeness, categories, services, name/address/phone, review practices, citations, visit-page quality and a location-controlled measurement protocol. Current primary phone is consistent in sampled citations. EasyUAE's conflicting address was confirmed in fresh HTML; LocalEmirates' conflicting address comes from an older indexed/web-reader extract, while fresh retrieval hit a verification page. Confirm the correct master address before requesting corrections. Current profile category, owner-entered services, hours and live review count remain unverified.

Organic GSC positions and Maps positions must stay separate. No specific Maps rank is available. Local rank depends on searcher location and context; the plan calls for documented Dubai coordinates/query/device/language and repeatable observations rather than a citywide rank claim. Do not stuff the business name, create misleading locations, incentivize reviews or solicit only positive reviews.

## 8. Measurement framework and baseline

Keep visibility, contact intent, inquiry quality, bookings and revenue as separate stages. Metrics below are not interchangeable.

| Metric | Verified baseline / source | Required reporting method and limitation |
|---|---|---|
| Mercedes query clicks/impressions/CTR | Visible confirmed set: 4 / 905 / 0.442%; original workbook Queries | Reuse documented multilingual/model classification and exact filters; report export completeness. Not full Mercedes traffic. |
| Query average positions | Seven verified headline rows above; full 117-row CSV | Track exact queries and comparable UAE/device cohorts. Rank tracking in Dubai is a separate series. |
| Mercedes landing-page performance | 49 URL rows: 13 clicks / 2,940 impressions; hub 0 / 554 | Maintain fixed URL cohorts and inspect canonical reassignment; separate service, informational, tuning and Arabic. Not query-only Mercedes totals. |
| Mobile/desktop Mercedes performance | **Unavailable**; sitewide context only above | Export Mercedes-specific device/country joins. Do not apply sitewide ratios to Mercedes. |
| Organic landing engagement | **Unavailable**, no GA4 report access | GA4 Organic Search sessions/engaged sessions on retained commercial cohort, with attribution model and consent limits. |
| Organic WhatsApp clicks/drafts | **Unavailable numeric baseline**; deployed event code confirmed | Existing `whatsapp_click` dataLayer, `whatsapp_chat_opened` anchor gtag and `whatsapp_draft_opened` form gtag have different trigger paths. Verify mappings/receipts; choose one deduplicated contact-action measure. |
| Organic call clicks | **Unavailable numeric baseline**; `telephone_link_clicked` code present | Validate one event per action and organic session context. Clicks are not connected calls; answered-call tracking requires separate evidence. |
| Qualified Mercedes inquiries | **Unavailable** | Existing CRM or manual log: received inquiry, unique internal ID, Mercedes model, relevant service, source evidence, date and qualification. A draft/form click does not qualify. |
| Booked Mercedes services | **Unavailable** | Reconcile qualified inquiry to accepted appointment/job; retain cancellation status and matched cohort. Bookings ÷ matched qualified inquiries only where data is complete. |
| Attributable revenue | **Unavailable** | Match actual completed/invoiced jobs to documented lead IDs and attribution model. Separate quoted, booked and realized revenue; no SEO revenue projection from impressions. |
| CWV / mobile | **Unavailable**; public API 429 | Field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 where sufficient data exists; lab results separately labeled. [Web Vitals definitions](https://web.dev/articles/vitals). |

The source attribution code retains sanitized landing path/referrer and known source/medium labels in sessionStorage; it is session-scoped, not a complete cross-device or lifetime customer history. GA4/GTM setup, consent effects, event deduplication and channel attribution were not inspected. Do not send WhatsApp message bodies, names, phones or VINs into analytics; existing sanitization removes prefilled message text from event URLs. Any controlled event test should be separately documented so it does not become a genuine lead.

Weekly reporting should show clicks/impressions/CTR/position and qualified inquiries with release annotations. Use full 28-day cohorts for decisions and exact 90-day context when collected, keeping the search type/property/country/device/query and URL cohort stable. Trend assessment needs adequate matched data; no numerical lead target or conversion rate can be responsibly set from the supplied workbook alone.

## 9. Implementation sequence and unresolved evidence

The [90-day roadmap](mercedes-90-day-roadmap-2026-10-26.md) covers days 1–14 foundations, 15–30 existing services, 31–60 evidence/local authority, and 61–90 refinement. The [17-item implementation backlog](mercedes-implementation-backlog-2026-10-26.md) includes priority, affected URLs, evidence, fix, benefit, risk, dependencies and verification. Goals are top-three service/repair/specialist and top-five workshop/oil; outcomes are not guaranteed within 90 days.

Unresolved audit steps are explicit:

- Latest comparable GSC 28/90-day windows, query/page/day/device/country joins, URL Inspection and indexing/selected-canonical history.
- Authenticated current Cloudflare/DNS/rule-order inventory and hosting logs; no configuration changes attempted.
- GA4/GTM receipts/settings, organic engagement, calls/WhatsApp outcomes, qualified inquiries, jobs and revenue.
- Field CWV, narrow mobile viewport and real-device interaction tests; public PSI quota blocked metrics.
- Controlled Google Dubai organic ordering and Maps grid ranks; direct Google attempts yielded an unusable JavaScript shell.
- GBP managed categories/services/hours, independent live review verification, legal/address/hours/capability documentation, reliable link/authority datasets.

These gaps do not prevent the confirmed public routing findings or the keyword map. They do prevent attributing the current rankings to a specific cause, promising recovery, or approving speculative consolidation. **Implementation remains pending the user's review and explicit approval.**
