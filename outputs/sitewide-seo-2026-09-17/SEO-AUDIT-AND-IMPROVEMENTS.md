# Digi-Tec SEO audit and improvements

Prepared 17 September 2026. Private implementation and verification report for digitecme.com.

The complete website inventory was audited and its shared SEO, Arabic content, internal navigation and image delivery improved. The final build preserves **1,247 public routes** and **996 canonical sitemap URLs**: **553 English and 443 Arabic**. All identified duplicate title/description/H1 pairs and broken internal content links are resolved in the final local build. The work supports competing for positions 1–8 on relevant queries; it does not establish that future ranking outcome.

## Publication status

**DEPLOYMENT STATUS: BLOCKED — final changes are validated locally but have not been published. Update after access is resolved and publication is verified.**

- Final local build: passed at 2026-09-17T09:40:13.414Z.
- Source fingerprint: `2cd4ef57011a6fd0ec6ab8784946c1872b9507181dcae909a145ad8531b8d9ec`.
- Publication attempt: GitHub create-blob returned **403, Resource not accessible by integration**, despite repository-level user push permission. The available browser session was signed out. No blob, remote commit or live change was made by the attempted publication.
- Remote/Lovable source remains `6aa0db7b3148a52c647be806f0642e57c52f8cb3`. Publication needs connector write access or an authenticated browser session; the release coordinator has requested this access.
- Production deployment ID after publication: **NOT CREATED — BLOCKED**.
- Final live sitemap/content verification: **NOT RUN — DEPLOYMENT BLOCKED**.
- Domain-level permanent redirects and true 404 handling: **PENDING ACCESS TO THE CLOUDFLARE ZONE CONTROLLING digitecme.com**.

The production observations below are the saved **before-change** crawl. They must not be presented as verification that this final build is live.

## What was audited

The fresh baseline production crawl ran from 2026-09-17T09:05:27.326Z to 2026-09-17T09:07:04.965Z. Robots.txt and sitemap.xml returned 200 and advertised 996 canonical URLs. All 996 canonical pages were reachable: 995 returned 200 on the first crawl, and one Dodge AC timeout returned 200 on a separate retry. The initial 995 successful production page bodies matched the saved local baseline exactly after excluding navigation/footer infrastructure.

The local audit checked every one of the 1,247 built routes, including **251 intentionally excluded routes**. The canonical inventory contains 573 brand/service pages, 197 articles, 115 service/model pages, 76 brand pages, 14 workshop selectors and 21 business/navigation/core pages. Existing route and indexing policy was preserved; no new thin URLs were added and no established canonical URLs were removed.

The separate Search Console evidence is historical. Although its export filename says September 16, the actual date range is **September 7–13, 2026**, Web, all countries. No post-change ranking data are implied by that export.

## Before and after

| Audit check | Before | Final build |
| --- | ---: | ---: |
| Canonical, metadata-presence, H1 count, noindex and JSON-LD syntax errors | 0 | 0 |
| Duplicate title pairs | 32 | 0 |
| Duplicate description pairs | 31 | 0 |
| Duplicate H1 pairs | 32 | 0 |
| Exact duplicate extracted page bodies | 0 | 0 |
| Broken internal content links | 6 | 0 |
| Broken content-link fragments | 0 | 0 |

Four useful Porsche pages previously had no contextual inlinks apart from sitemap sources. They now have direct relevant links from the established Porsche hub:

- /porsche/problems/brake-warning-light
- /porsche/problems/cayenne-air-suspension
- /porsche/systems/rear-axle-steering
- /porsche/systems/sport-chrono

The remaining six zero-content-inlink entries are utility pages linked through navigation or footer, which this contextual-link check intentionally excludes. They are not unresolved versions of the four Porsche findings.

Across the whole public inventory, the comparison records changes to **38 titles**, **476 descriptions**, **39 H1 values**, **801 extracted content bodies** and **126 content-link lists**. These overlapping counts must not be added together. Shared footer changes are excluded from the primary-content comparison.

## Improvements implemented

### Arabic content and language accuracy

All **51 original BlogPost records** now select explicit, topic-specific Arabic adaptations instead of generic repeated maintenance paragraphs. Independent verification exercised the actual source resolver and checked **every intended paragraph and list item against final built HTML**: 51/51 passed, 0 failed.

The adaptations cover model maintenance, symptoms, repair planning, oil and fluids, cooling, batteries, workshop selection, costs, protection, tuning and existing project narratives. They preserve the original publication dates, cover images, videos and gallery image sources. Actual adaptation changes carry September 17 update dates. All have Arabic metadata and article social type. Within this group, 47 Arabic routes remain canonical and four retain the pre-existing exclusion policy.

The six broken Arabic article links previously invented Arabic versions of English-only Mercedes/Ferrari detail pages. These links now point to available destinations. Arabic brand/service pages also have service-specific summaries, symptoms and FAQ decisions instead of one generic explanation across unrelated systems. The VRX Arabic H1 is translated and the VRX pages have a main landmark.

### Better service decisions and contextual navigation

Shared extended repair pages now explain useful diagnosis-versus-repair choices, the evidence to request in an estimate, intermittent symptoms and the distinction between low-voltage battery service and separately confirmed high-voltage work. Existing specialist brand overrides remain authoritative.

Porsche navigation now distinguishes PASM from PDCC and connects the four overlooked system/symptom pages. Stale statements describing already published guides as future work were removed. Related-article links were made more relevant, and the missing Range Rover logo reference was corrected.

### Shared metadata and business consistency

The shared SEO resolver reuses each page's existing graph to choose an appropriate social image, article type and publication/update dates. Image URLs are absolute, explicit image choices remain supported, and small brand logos are not enlarged as automatic previews. Social dates are removed when navigation leaves an article so a service page does not inherit stale article metadata.

The visible footer now includes the warehouse address already present in business schema. Modification dates were registered from actual content/metadata or meaningful presentation changes; the footer addition alone does not refresh every URL's date. Independent verification confirms all **802 changed public routes** have the September 17 date in the compiled route manifest, including all **596 changed canonical URLs** in the sitemap. Public and built sitemaps match, with no missing or extraneous entries in the change register. Canonicals, real language boundaries and the existing intentional noindex policy remain intact.

### Image delivery and initial visibility

Existing approved artwork was compressed without creating substitute workshop evidence. The homepage hero uses responsive WebP sources and high loading priority; contact-widget images have low priority and explicit dimensions. The Mercedes engine image also has a compressed replacement.

| Existing image | Original bytes | New bytes | Reduction |
| --- | ---: | ---: | ---: |
| hero-768.webp | 1,831,384 | 48,874 | 97.3% |
| hero-1536.webp | 1,831,384 | 113,948 | 93.8% |
| mascot-256.webp | 1,092,135 | 12,158 | 98.9% |
| mascot-wave-256.webp | 1,111,190 | 13,570 | 98.8% |
| mercedes-engine-repair-1086.webp | 2,318,353 | 234,886 | 89.9% |

Homepage sections are readable in initial HTML when JavaScript is disabled. Scroll animation is now an enhancement for sections below the viewport, rather than a prerequisite for seeing their content. Both homepage languages have a main landmark. These byte reductions and rendering checks are measured implementation changes, not a field Core Web Vitals score or a quantified ranking gain.

## Validation completed

| Validation | Result |
| --- | --- |
| Production pipeline | 15/15 stages passed; source unchanged during build |
| All-route independent audit | 1,247 built routes / 996 canonical URLs checked; zero listed metadata/link/duplicate errors |
| Arabic body verification | 51/51 source adaptations and built HTML passed; publication dates and media preserved |
| Social metadata validator | 1,247 routes, 201 article graphs and 51 existing local image files passed |
| Truthful modification dates | 802 changed public routes / 596 changed canonical sitemap URLs dated September 17; zero mismatches |
| TypeScript | Application and Node checks passed, as reported by the release coordinator |
| ESLint | Zero errors; 10 pre-existing warnings, as reported by the release coordinator |
| Responsive browser checks | 28 page/viewport checks passed at desktop and mobile sizes |
| Without JavaScript | Both homepages: 13 visible headings and one main landmark |
| SPA navigation | Article → services → back passed at both viewport sizes; stale dates removed/restored |
| Browser runtime/hydration errors | 0 |

Browser verification completed at 2026-09-17T09:35:35.620Z. The subsequent rebuild changed only the modification-date register and its generator; the same UI/content browser result remains applicable. Browser checks blocked external requests and form submissions; they establish local behavior, not real analytics ingestion or receipt of an enquiry. The production routing unit checks validate generated logic but do not prove that the logic is active on the public hostname.

## Search Console baseline and priorities

The seven-day site chart reports **44 clicks**, **9,396 impressions** and **0.47% CTR**. UAE accounts for 8,780 impressions and 40 clicks. The exported 1,000-query subset contains 11 clicks / 6,448 impressions. Separate page aggregates contain 447 rows. These aggregations do not reconcile directly and must not be added together.

In the visible query subset, 244 queries average positions 1–8; 335 are above 8 through 20; 152 are above 20 through 30; 269 are above 30. These are period averages, not fixed current rankings, and the query table may be capped. The export does not join queries to pages, so the owner mappings below are **architectural intent assignments**, not proven query-to-page attribution or evidence of cannibalization.

### English priorities

| Query | Impressions | Clicks | Average position | Existing owner — inferred |
| --- | ---: | ---: | ---: | --- |
| ferrari service dubai | 69 | 0 | 12.29 | /brands/ferrari-service-dubai |
| bmw service dubai | 60 | 0 | 16.88 | /brands/bmw-service-dubai |
| mercedes service center dubai | 57 | 0 | 10.00 | /brands/mercedes-benz-service-dubai |
| mercedes workshop dubai | 50 | 0 | 9.70 | /brands/mercedes-benz-service-dubai |
| rolls royce service dubai | 50 | 0 | 18.32 | /brands/rolls-royce-service-dubai |
| mercedes service dubai | 44 | 0 | 10.80 | /brands/mercedes-benz-service-dubai |
| car oil change dubai | 43 | 1 | 17.26 | /services/oil-change-dubai |
| paint protection film near me | 43 | 0 | 14.12 | /services/paint-protection-film |
| mclaren service dubai | 34 | 0 | 11.88 | /brands/mclaren-service-dubai |
| lamborghini service dubai | 30 | 0 | 19.70 | /brands/lamborghini-service-dubai |
| aston martin service dubai | 31 | 1 | 21.97 | /brands/aston-martin-service-dubai |
| ceramic paint protection dubai | 36 | 0 | 20.28 | /services/ceramic-coating |
| tire repair dubai | 32 | 0 | 23.81 | /services/tire-repair-dubai |

Start performance evaluation with the existing Mercedes, Ferrari, McLaren, BMW, Rolls-Royce, oil-change and PPF owners, where relevant exported queries are above position 8 through 20. Aston Martin, ceramic and tyre terms in the low twenties are additional opportunities. Do not create a separate page for every synonymous wording. Bentley service, electrical and screen/head-unit intents farther down the results need stronger relevance and genuine service evidence; their metrics are not an immediate page-one forecast.

### Arabic priorities

| Query | Impressions | Clicks | Average position | Existing owner — inferred |
| --- | ---: | ---: | ---: | --- |
| حماية طلاء السيارات | 9 | 0 | 14.11 | /ar/services/paint-protection-dubai |
| صيانة رولز رويس | 9 | 0 | 23.56 | /ar/brands/rolls-royce-service-dubai |
| ورشة تصليح مينى | 7 | 0 | 18.71 | /ar/brands/mini-service-dubai |
| صيانة اودي | 6 | 0 | 12.33 | /ar/brands/audi-service-dubai |
| ورشة صيانة اودي | 5 | 0 | 15.60 | /ar/brands/audi-service-dubai |
| خدمة maserati | 4 | 0 | 9.25 | /ar/brands/maserati-service-dubai |
| خدمة تبديل بطارية السيارة دبي | 4 | 0 | 10.00 | /ar/services/battery-replacement-dubai |

Arabic volumes are small in this seven-day sample. Fixing language quality across existing pages is justified by the audit, but single-digit query impressions should not drive a large new-page rollout. The broad paint-protection query maps provisionally to the selector; film-specific and coating-specific terms have their own owners. A query's language does not establish which language URL received the impression.

The complete 20-row map, including exact workbook ranges and inference notes, is preserved in `audit/priority-query-url-map.csv` and `audit/priority-query-url-map.json`. Expanded query and page opportunity lists are in `audit/historical-ranking-opportunities.json`.

## What still needs access or real-world evidence

### Production routing access

All six invalid Arabic destinations tested live returned **HTTP 200 with the homepage canonical and index/follow**, rather than a true missing-page response. The content links are fixed in the build, but arbitrary unknown paths still require the host/edge correction. Lovable remains the production host, and activation of the prepared domain-level redirect/404 rules requires access to the Cloudflare zone controlling digitecme.com. The connected account did not expose that zone during this task. Placing worker or routing source files in a static deployment does not execute them.

After access is available, activate the existing reviewed routing logic and verify permanent legacy redirects, query preservation, canonical host behavior and real missing-page statuses with fresh GET/HEAD requests. Keep the saved negative-response evidence; do not mark this fixed solely because canonical URLs work.

### Performance measurement unavailable

The PageSpeed Insights request returned **429 RESOURCE_EXHAUSTED / daily quota exceeded**. No fresh mobile Lighthouse or field Core Web Vitals score was obtained. The image byte savings and local browser results remain valid; the quota failure is not evidence of slow or fast performance. Obtain an available PageSpeed/CrUX or Search Console Core Web Vitals report after publication to evaluate real-user LCP, INP and CLS.

### First-party authority and useful depth

The baseline similarity analysis identified repetitive Arabic and workshop-selector content, and some concise Porsche guides warrant further editorial review. This release addresses the demonstrable shared-template and localization defects. No word-count threshold or similarity score is treated as a ranking rule or release failure. Future revisions should answer a distinct owner question with useful symptoms, checks, service decisions and next steps, supported by actual workshop knowledge.

Add genuine repair records, original workshop photographs, parts/diagnosis decisions, final checks and attributable expert review where the business can substantiate them. Maintain accurate Business Profile details, hours, service scope and authentic customer reviews. The empty verified-case collections should remain empty until real qualifying evidence exists; fabricated jobs, certificates or reviews would not help the site.

## Measurement after publication

1. Confirm the published source/deployment, then repeat the canonical sitemap crawl and critical Arabic/Porsche/metadata checks. Record a new live evidence timestamp and deployment ID.
2. Use Search Console URL Inspection on representative owners and Arabic articles. Review Google-selected canonical, crawled HTML and indexing reports; absence from the seven-day page export is not proof of non-indexing.
3. Compare relevant UAE query groups and canonical landing pages across matched periods after recrawl, separating mobile/desktop and branded/nonbranded intent. Use a longer 28-day window as data accumulates and account for seasonal demand.
4. Track clicks, impressions, CTR and qualified enquiries alongside position. Preserve one coherent owner for each service intent; review apparent overlap with actual query-by-page evidence before consolidation.

Google's guidance emphasizes useful original content, descriptive crawlable links and correct localized versions. Local ranking also depends on relevance, distance and prominence. Changes may take time to be reflected, and technical improvements do not guarantee positions 1–8. [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable), [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [local ranking](https://support.google.com/business/answer/7091?hl=en).

## Evidence index

- `audit/SEO-AUDIT-BASELINE.md` — detailed fresh baseline and historical data interpretation.
- `audit/final-local-summary.json`, `audit/final-local-records.json` — complete final local inventory.
- `audit/final-comparison.json` — reproducible before/after measurements.
- `audit/final-arabic-adaptation-verification.json` — all 51 Arabic resolver/HTML checks.
- `audit/final-lastmod-verification.json` — all changed route/sitemap dates and the three corrected omissions.
- `audit/baseline-live-summary.json`, `audit/baseline-live-followups.json` — baseline production and negative-path evidence; includes successful timeout retry.
- `audit/priority-query-url-map.csv`, `audit/historical-ranking-opportunities.json` — query priorities and source ranges.
- `image-savings.json`, `pagespeed-mobile.json` — measured asset savings and external API limitation.
- `browser/verification.json` — local responsive/no-JavaScript/navigation results and screenshots.
- `release-qa.local/build-results.json`, `release-qa.local/source-manifest.json` — final pipeline/fingerprint evidence in the workspace.
