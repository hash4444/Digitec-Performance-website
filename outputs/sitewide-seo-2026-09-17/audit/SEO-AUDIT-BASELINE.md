# Digi-Tec sitewide SEO audit — baseline, 17 September 2026

The site has broad technical SEO coverage but needs more distinctive content, corrected Arabic localization and stronger internal routes to its specialist information. This audit covers all **996 canonical sitemap URLs** and all **1,247 built public routes**, including **251 intentionally excluded routes**. It does not claim that every page can or will rank in positions 1–8. Rankings depend on the query, searcher, location, competition and Google's systems; metadata and schema alone do not establish a ranking outcome.

## Evidence boundaries

- **Fresh production crawl:** 2026-09-17T09:05:27.326Z to 2026-09-17T09:07:04.965Z, HTTPS GET requests at concurrency 6. Robots.txt and sitemap returned 200. All 996 sitemap URLs returned 200: 995 on the first crawl, one Dodge AC timeout returned 200 on a separate retry. Baseline production deployment ID: `160d16a7-7e6d-45ef-8cb2-032dc527d542`.
- **Fresh supplemental checks:** six nonexistent Arabic link destinations all returned 200, homepage canonical and index/follow. These are a production fallback defect, despite the healthy canonical inventory.
- **Local built HTML:** frozen baseline inventory, titles, headings, metadata, schema syntax, body/link/image extraction and content similarity. No new build was run for this audit. Source changed concurrently after baseline capture; this report is intentionally a before-change record.
- **Historical Search Console evidence:** the export filename is September 16, but the actual reporting dates are **September 7–13, 2026**, Web, all countries. It reports **44 clicks, 9,396 impressions and 0.47% CTR**. UAE accounts for 8,780 impressions and 40 clicks. No fresh authenticated Search Console or Business Profile data were available to this audit.
- The export contains separate query and page tables, not a query-by-page join. The 1,000 exported queries are a capped subset with 11 clicks / 6,448 impressions; the 447 page rows have their own aggregation. Do not sum these into site totals, infer cannibalization, treat absence as non-indexing, or attribute any September 17 change to this earlier period.

## Measured baseline

| Check | Baseline result | Interpretation |
| --- | ---: | --- |
| Canonical sitemap URLs | 996 | All reached with HTTP 200, including one retry |
| Built public routes | 1,247 | Includes 251 intentional exclusions from sitemap/indexing |
| Canonical title/description presence, H1 count, canonical and noindex conflicts, JSON-LD syntax | 0 errors | Metadata uniqueness is a separate issue below |
| Duplicate title pairs | 32 | 32 English articles and their Arabic versions share English titles |
| Duplicate description pairs | 31 | Same cross-language fallback issue |
| Duplicate H1 pairs | 32 | 31 English/Arabic article pairs plus the existing VRX heading |
| Exact duplicate extracted body content | 0 | Does not rule out substantive similarity |
| Broken content-link targets | 6 | All originate in Arabic articles; live targets return homepage fallback |
| Missing in-content links to useful detail pages, excluding sitemap sources | 4 | Porsche problem/system pages identified below |
| Pages below 300 extracted body words | 76 | A review signal only; Google has no preferred word count |
| Article pages below 300 extracted body words | 54 | Includes 20 Porsche ownership guides at 125–158 words |
| Near-duplicate content review | 319 pages / 1,043 pairs | At least 75% Jaccard overlap of 5-word shingles; requires editorial review |
| Missing image alt attributes | 0 | Descriptive accuracy still requires image-level review |

The canonical inventory includes 573 brand/service combinations, 197 articles, 115 service/model pages, 76 brand pages, 14 workshop selector pages and 21 navigation/business/core pages. The 10 raw zero-content-inlink entries also include home, FAQ and sitemap utility routes whose links are in excluded navigation/footer; only the four substantive Porsche detail pages are the prioritized finding.

## Priority findings and improvements

### 1. Repair the Arabic metadata and link fallbacks

**Evidence:** 32 article title pairs, 31 article H1 pairs and 31 description pairs are duplicated across language versions. A further H1 pair is the existing English heading on the Arabic VRX page. Examples include air suspension, battery life, Audi Q7, BMW X5, Ferrari 488 and Rolls-Royce Ghost articles. The Arabic body is present, but the snippet and heading often remain English. Use explicit Arabic metadata/H1 appropriate to the article; do not concatenate keywords or merely append a locale suffix.

The six invalid links are:

| Arabic article | Invalid destination |
| --- | --- |
| /ar/blog/air-suspension-repair-dubai-guide | /ar/mercedes/problems/airmatic-malfunction |
| /ar/blog/check-engine-light-dubai-guide | /ar/mercedes/problems/check-engine-light |
| /ar/blog/engine-overheating-dubai-what-to-do | /ar/mercedes/problems/engine-overheating |
| /ar/blog/ferrari-488-service-dubai-guide | /ar/brands/ferrari-service-dubai/488 |
| /ar/blog/mercedes-repair-dubai-complete-guide | /ar/mercedes/problems |
| /ar/blog/transmission-service-7g-9g-dubai | /ar/mercedes/problems/gearbox-jerking |

Choose an existing translated owner, or a clearly indicated existing English page, according to the actual article intent. Do not manufacture Arabic paths. Separately, correct production hosting to return a real 404 for unknown paths; the 200 homepage fallback is not fixed solely by removing these links. Google recommends descriptive links to relevant pages and properly connected language variants. [Link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).

### 2. Improve language-specific content usefulness, especially Arabic templates

The strongest similarity flags are **261 Arabic brand/service pages**, **45 Arabic articles** and **13 English workshop-selection articles**. There are 575 Arabic brand/service pairs, 420 Arabic article pairs and 48 English article pairs at the review threshold. No English brand/service pairs crossed that threshold. This is local baseline measurement; the production body's exact hashes match the local baseline for all 995 first-pass pages.

Examples: Arabic Audi Q7 and McLaren 720S guides have 88.1% shingle overlap; Arabic Maybach S580 and Range Rover Vogue guides have 88.3%. Arabic Land Rover AC and suspension pages have 84.7% overlap. Thirty-four Arabic articles repeat generic maintenance paragraphs where topic-specific explanations are needed. Similarity comes from shared diagnosis/booking language and generic maintenance advice, even for different systems.

Rewrite shared translations around the real question: relevant symptoms, inspection evidence, service scope, repair decisions, model/system limits and what to send the workshop. Retain genuinely useful shared business/process information. For English workshop-selection articles, use verified brand/model distinctions and useful comparison criteria; do not add unsupported expertise, certifications, fault frequencies or fixed savings. Exact duplication or a similarity score alone does not prove a spam violation or penalty. Google's guidance emphasizes original value and identifies large volumes of low-value pages created for rankings as a risk. [Helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [spam policies](https://developers.google.com/search/docs/essentials/spam-policies).

### 3. Connect the four specialist Porsche pages and improve short answer coverage where it matters

The following details have no crawlable content inlinks apart from sitemap pages in the baseline: `/porsche/problems/brake-warning-light`, `/porsche/problems/cayenne-air-suspension`, `/porsche/systems/rear-axle-steering`, `/porsche/systems/sport-chrono`. Add concise descriptive links from the Porsche hub and relevant problem/model/service explanations.

All 20 ownership guides are short, between 125 and 158 extracted words, including the hero. Examples include 718/Macan/Taycan maintenance, service intervals, costs, pre-purchase checks and brake wear. This is not a reason to pad them. Review whether each page actually resolves a distinct question and offers a useful next step; enrich practical diagnostic/decision guidance or consolidate overlap only after reviewing traffic/backlinks. For example, “service intervals,” “how often service,” and “oil-change intervals” need clearly different scopes and cross-links to avoid fragmenting the same answer.

### 4. Keep technical eligibility separate from ranking work

The canonical routes already have initial HTML, one canonical, indexability, H1 and valid JSON-LD syntax; adding more schema is not the leading opportunity. The live unknown-path fallback remains unresolved until production routing is corrected. Review real mobile page experience after image/animation fixes are deployed; this HTTP crawl does not measure field LCP, INP or CLS. There are 2,192 image instances without explicit HTML width/height, but CSS may reserve space, so this count alone is not proof of layout shift.

### 5. Build first-party evidence for the existing commercial owners

Use real workshop photographs, repair findings, approved estimates, parts decisions, final checks and attributable expert review. The Mercedes, Porsche and Ferrari case-study data collections are deliberately empty pending verified jobs; do not fill them with invented work. Existing verified projects elsewhere on the site can be connected where relevant. Complete and maintain the real Business Profile, opening hours, address, category, services and authentic customer reviews. Google describes local relevance, distance and prominence as local-ranking factors; these cannot all be controlled through page text. [Local ranking guidance](https://support.google.com/business/answer/7091?hl=en).

## Historical ranking opportunities — English

These are selected local commercial queries with meaningful exported impressions. URL ownership is an architectural inference based on current page intent, **not** measured query-to-page attribution. Different English variants should share their established owner when they describe the same service.

| Query | Impressions | Clicks | Average position | Inferred existing owner | Workbook evidence |
| --- | ---: | ---: | ---: | --- | --- |
| ferrari service dubai | 69 | 0 | 12.29 | /brands/ferrari-service-dubai | Queries!A11:E11 |
| bmw service dubai | 60 | 0 | 16.88 | /brands/bmw-service-dubai | Queries!A13:E13 |
| mercedes service center dubai | 57 | 0 | 10.00 | /brands/mercedes-benz-service-dubai | Queries!A14:E14 |
| mercedes workshop dubai | 50 | 0 | 9.70 | /brands/mercedes-benz-service-dubai | Queries!A15:E15 |
| rolls royce service dubai | 50 | 0 | 18.32 | /brands/rolls-royce-service-dubai | Queries!A16:E16 |
| mercedes service dubai | 44 | 0 | 10.80 | /brands/mercedes-benz-service-dubai | Queries!A18:E18 |
| car oil change dubai | 43 | 1 | 17.26 | /services/oil-change-dubai | Queries!A4:E4 |
| paint protection film near me | 43 | 0 | 14.12 | /services/paint-protection-film | Queries!A19:E19 |
| mclaren service dubai | 34 | 0 | 11.88 | /brands/mclaren-service-dubai | Queries!A29:E29 |
| lamborghini service dubai | 30 | 0 | 19.70 | /brands/lamborghini-service-dubai | Queries!A38:E38 |
| aston martin service dubai | 31 | 1 | 21.97 | /brands/aston-martin-service-dubai | Queries!A5:E5 |
| ceramic paint protection dubai | 36 | 0 | 20.28 | /services/ceramic-coating | Queries!A23:E23 |
| tire repair dubai | 32 | 0 | 23.81 | /services/tire-repair-dubai | Queries!A34:E34 |

For immediate prioritization, start with Mercedes, Ferrari, McLaren, BMW, Rolls-Royce, oil change and PPF queries above position 8 through 20. Aston Martin, ceramic and tyre queries in the low twenties are supporting opportunities. Bentley service at 32.40, electrical/head-unit and Cadillac screen terms farther down the results need stronger relevance and proof, not a page-one prediction. The complete historical query and page opportunity lists are in `historical-ranking-opportunities.json`.

## Historical ranking opportunities — Arabic

Arabic volumes in this seven-day export are small, so avoid treating single-digit impressions as a forecast. Repair the localization defects across the existing corpus, then evaluate relevant UAE Arabic demand over a longer window.

| Query | Impressions | Clicks | Average position | Inferred existing owner | Workbook evidence |
| --- | ---: | ---: | ---: | --- | --- |
| حماية طلاء السيارات | 9 | 0 | 14.11 | /ar/services/paint-protection-dubai | Queries!A192:E192 |
| صيانة رولز رويس | 9 | 0 | 23.56 | /ar/brands/rolls-royce-service-dubai | Queries!A196:E196 |
| ورشة تصليح مينى | 7 | 0 | 18.71 | /ar/brands/mini-service-dubai | Queries!A266:E266 |
| صيانة اودي | 6 | 0 | 12.33 | /ar/brands/audi-service-dubai | Queries!A311:E311 |
| ورشة صيانة اودي | 5 | 0 | 15.60 | /ar/brands/audi-service-dubai | Queries!A363:E363 |
| خدمة maserati | 4 | 0 | 9.25 | /ar/brands/maserati-service-dubai | Queries!A411:E411 |
| خدمة تبديل بطارية السيارة دبي | 4 | 0 | 10.00 | /ar/services/battery-replacement-dubai | Queries!A416:E416 |

The broad Arabic paint-protection query maps provisionally to the selector; film-specific or coating-specific terms belong to their distinct specialist pages. Mixed-language Maserati queries are included because their phrasing contains an Arabic service term. A query's script is not proof that the Arabic URL received its impressions.

## Measurement and validation after release

- Rebuild once after the authorized edits and re-run the full local audit as `node scripts/audit-sitewide-seo.mjs --phase=final`. Retain the baseline evidence for comparison.
- After deployment, crawl the same sitemap and the six previously invalid targets. Check URL Inspection for representative existing owners, new specialists and Arabic articles; review Google-selected canonical and crawled HTML.
- Track relevant UAE query groups, canonical landing pages, mobile/desktop, clicks, impressions, CTR and qualified enquiries. Compare matched periods after recrawl; use a longer 28-day window when sufficient data accumulates, and account for demand/seasonality.
- Record a real post-change export rather than claiming ranking gains from this pre-change week. In the current exported subset, **244 queries** average positions 1–8; **335** are above 8–20; **152** above 20–30; **269** above 30. These are averages over the sampled reporting period, not today's fixed rankings.

Google says changes may take hours to months to be reflected and that best practices do not automatically rank a site first. The objective is stronger relevant visibility and qualified leads; positions 1–8 are a target to evaluate, not a result this audit can promise. [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

## Evidence files

- `baseline-local-summary.json` and `baseline-local-records.json`: full local inventory and checks.
- `baseline-live-summary.json` and `baseline-live-records.json`: fresh HTTP crawl; one transient timeout retained transparently.
- `baseline-live-followups.json` and `followup-*.html`: successful Dodge retry and six homepage-fallback responses.
- `baseline-live-sitemap.xml`, `baseline-live-robots.txt`: production discovery evidence.
- `baseline-near-duplicate-review.json`, `baseline-local-repeated-paragraphs.json`: editorial review signals and full path lists.
- `historical-ranking-opportunities.json`: reproducible position bands and opportunity rows.
- `priority-query-url-map.csv` / `.json`: verified existing EN/AR owners, query metrics, exact workbook ranges, and attribution caveat.
