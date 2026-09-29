# DIGI-TEC live crawl evidence — 28 September 2026

## Scope and interpretation

Read-only HTTP crawl of live `https://digitecme.com/`: robots.txt, sitemap.xml, all 996 sitemap URLs, complete discovered internal HTML-link closure, and targeted redirect/nonexistent-route probes. Maximum four concurrent GETs. No source, content, metadata, routing, deployment or website changes were made. No implementation scripts were saved. Compressed HTML, structured extraction and audit data are retained here.

The final inventory contains **1,312 requested URLs**, comprising **1,247 legitimate self-canonical documents**, **56 linked Arabic destinations returning an English-homepage fallback**, **two deliberate fallback probes**, **six redirects**, and **one trailing-slash variant**. The 1,247 documents comprise **996 index-permitted sitemap pages** and **251 noindex pages**. English/Arabic legitimate-document counts are 676/571; sitemap counts are 553/443; noindex counts are 123/128.

The complete inventory is HTTP/source-HTML evidence. Representative browser verification additionally tested the English PDK language switch, its Arabic destination, and a nonexistent route; the important server/client differences are recorded below. Google-selected canonicals, actual index inclusion, URL Inspection, server logs and Core Web Vitals remain untested. `index,follow` is permission, not proof of indexing. The full crawl followed final responses, so `status` is final status; `initial_status` and redirect chains distinguish genuine 301s from direct 200s. A default Python user agent received a 403; the standard browser user agent used for the crawl succeeded. That access difference is not evidence that Googlebot is blocked.

Evidence files:

- `url-inventory.csv`: every requested URL, sitemap membership, locale, initial/final status, title, description, H1/H2/H3, canonical, robots, hreflang, schema types, breadcrumb extraction, content length, inlinks, shortest home-link depth, image-alt checks and HTML evidence filename.
- `all-results.json`: the same URLs plus body/main text, all internal link anchors and complete JSON-LD.
- `crawl-summary.json`: compact crawl counts.
- `target-brand-coverage.csv`: all 16 requested brand hubs and their indexed/noindex descendants.
- `linked-home-fallbacks.json`: 56 broken Arabic locale destinations with their exact referring links.
- `near-template-pairs.json`: brand-normalized five-word-shingle similarity candidates; this is a triage heuristic, not a Google duplicate-content finding.
- `html/*.html.gz`: timestamped by the corresponding JSON row, compressed raw response evidence.

## Current architecture

The site is already extensively expanded. The English sitemap includes 38 brand hubs, 310 nested brand commercial/model pages, 40 `/services/` pages, 71 `/blog/` articles, six `/mercedes/models/` pages, ten Mercedes symptom pages plus their directory, six additional Porsche model/generation pages, 20 Porsche ownership guides, 24 Porsche symptom pages plus their directory, and nine Porsche system pages plus their directory. Core pages and the three main directories account for the remainder. These are URL-family counts, not claims that every nested brand page is a service.

All 16 target brand hubs already exist. Mercedes commercial service owners use `/services/mercedes-…-dubai`, rather than nested brand-service routes. Most other important brands already have the 14 main service descendants. Cadillac, Jetour, ROX and Volkswagen generally have four indexed generic service descendants and ten noindex descendants; ROX additionally has an indexed soft-close installation page. Jaguar has four indexed service descendants and two discovered noindex descendants. Do not describe these retained noindex pages as nonexistent, and do not automatically index or expand them without demand and content evidence.

The existing model architecture is mixed but should be retained unless a migration has a clear benefit. BMW has seven model descendants under its brand hub; Ferrari has eight. Mercedes and Porsche still use some established `/blog/…service-dubai-guide` URLs as model/service owners. A cleaner-looking new slug is not a sufficient reason to create a second owner.

## Healthy technical findings

- All 996 sitemap URLs returned direct HTTP 200, exactly one title, one meta description, one H1, one self-referencing canonical, and `index, follow, max-image-preview:large`.
- No exact duplicate titles, descriptions, H1s or main-content hashes among the 996 sitemap pages. This does not rule out semantic overlap, near-template content or cannibalization.
- All 996 contained parseable JSON-LD; no JSON syntax errors were found. BreadcrumbList was present on 994, with only the two language homepages exempt. Presence and syntax do not establish rich-result eligibility or the accuracy of every claim.
- All 996 had hreflang markup; no sitemap-source hreflang target was found to be noindex, redirected or a homepage fallback, and no nonreciprocal sitemap-to-sitemap relation was found.
- No missing `alt` attributes were found on extracted image elements; the audit did not judge the usefulness of every alt value.
- All 996 sitemap URLs are reachable in the static HTML link graph within three hops of the homepage: homepage 1, depth one 71, depth two 512, depth three 412. The HTML sitemap contributes to these short paths, so this does not prove strong contextual linking.
- Robots permits crawling and advertises `https://digitecme.com/sitemap.xml`.
- Sample HTTP and www home variants each use a single 301 to `https://digitecme.com/`.
- `/best-mercedes-workshop-dubai`, `/services/mercedes-repair-dubai` and `/services/mercedes-service-dubai` each use a 301 to `/brands/mercedes-benz-service-dubai`. These aliases are already consolidated; do not list them as live competing indexable pages.

## High-priority technical findings

### 1. Arabic navigation hrefs and HTTP fallback disagree with browser routing

**Confirmed HTTP/source behavior:** exactly 56 real Arabic navigation hrefs return HTTP 200 with the full English homepage HTML, homepage title/H1, index/follow and canonical `/`, while retaining the requested address. They comprise `/ar/mercedes/problems`, all 20 `/ar/porsche/guides/…` routes, 25 `/ar/porsche/problems…` routes and ten `/ar/porsche/systems…` routes. Every target is linked by the corresponding English page's Arabic language-switch anchor. They are not in the XML sitemap, and this issue is not caused by the actual hreflang tags.

**Representative browser check:** the visible PDK language menu exposes `/ar/porsche/systems/pdk`, but clicking it ultimately client-navigates to the working `/ar/brands/porsche-service-dubai` hub. A direct browser visit to the Arabic PDK path reaches the same hub after JavaScript runs. Thus the sampled browser journey recovers; the confirmed flaw is the inconsistent crawlable href, initial HTTP content and client route handling. Do not state that all 56 final browser journeys remain broken, or that the Arabic homepage is their rendered destination.

Examples:

| Referring English page | Broken Arabic target |
|---|---|
| `https://digitecme.com/porsche/systems/pdk` | `https://digitecme.com/ar/porsche/systems/pdk` |
| `https://digitecme.com/porsche/problems/pasm-fault` | `https://digitecme.com/ar/porsche/problems/pasm-fault` |
| `https://digitecme.com/porsche/guides/service-intervals-uae` | `https://digitecme.com/ar/porsche/guides/service-intervals-uae` |
| `https://digitecme.com/mercedes/problems` | `https://digitecme.com/ar/mercedes/problems` |

**Proposed:** in the first technical batch, make the crawlable language href agree with the real translated hub or equivalent page that browser users reach; align any intended redirects with server handling. Establish truthful not-found responses for genuinely unknown routes. Verify both server responses and browser rendering before release. Do not create 56 thin Arabic pages simply to repair navigation.

### 2. General unknown routes return an index-permitted homepage

**Confirmed:** `https://digitecme.com/seo-audit-nonexistent-20260928` returns HTTP 200, index/follow and full homepage source content with canonical `/`. The plausible but unimplemented `https://digitecme.com/porsche/911` behaves identically. The actual 911 model owner is `https://digitecme.com/blog/porsche-911-service-dubai-guide`.

**Rendered-browser refinement:** the nonexistent-route probe initially showed homepage content, then hydrated to a visible “404 — Page not found” screen. The settled DOM had title `Page Not Found | DIGI-TEC Performance Center`, H1 `404`, `noindex, follow`, and no canonical element. The document's HTTP response was still 200. This is a server/client discrepancy and soft-404 risk, not a claim that the settled page remains index-permitted. The plausible `/porsche/911` probe was checked by HTTP only.

**Risk/inference:** invalid addresses can present misleading crawler content and be treated as soft 404s. The HTTP behavior is proven; Google's classification is not. Plan truthful 404 handling for nonexistent paths, while retaining explicit redirects for real moved pages. Do not blanket-redirect all missing URLs to the homepage.

### 3. Valuable pages may be excluded by a broad noindex policy

`https://digitecme.com/brands/volkswagen-service-dubai/transmission-repair` exists, is self-canonical, has 740 main-text words, and returns `noindex, follow`. It is absent from the sitemap. This page should be evaluated as the existing candidate owner for Volkswagen DSG/mechatronic/transmission repair. A new DSG URL would risk adding a second owner before this one has been considered.

The same noindex pattern affects ten descendants each for Cadillac, Jetour and ROX, and Jaguar suspension/transmission. Noindex is not inherently an error: most generic expansion pages may appropriately remain excluded. Use the workbook's GSC evidence and the page's distinct service value to identify any selective exception. Do not remove all 251 noindex directives.

### 4. Trailing-slash variant has a correct canonical but remains a duplicate response

`https://digitecme.com/services/car-ac-repair-dubai/` returns direct 200 with the slashless URL as canonical. This is a lower-priority normalization opportunity, not a missing canonical or confirmed indexing conflict. Keep links consistently slashless; review redirects only in a controlled routing batch.

## Content depth and overlap findings

Word counts are whitespace-token estimates of HTML main content, including some headings, links and CTAs; collapsed FAQ answers are not always present in initial HTML. There is no recommended universal word minimum. For 26 sitemap pages without `<main>`, `main_word_count` contains the body estimate; `content_word_count` additionally removes header/footer/nav. The low counts below identify inspection candidates, not automatic ranking penalties.

- All 20 Porsche ownership guides have only **136–169 main words** each. For example `/porsche/guides/service-intervals-uae` (169) and `/porsche/guides/how-often-service-dubai` (165) both answer essentially the same model-specific service-schedule question with little differentiating detail. Recommend one richer schedule owner and incorporate the second wording as a section/FAQ, subject to page-query/backlink checks.
- All 24 Porsche symptom guides and nine Porsche system guides are under 300 main words. Some are useful distinct explanations, but proliferation should stop until the existing articles have unique evidence, model applicability, diagnostic paths and links to a commercial owner. A PASM explanation, PASM fault page and suspension-repair page can coexist only with deliberate informational/commercial roles.
- `/services/car-garage-dubai` (198 main words), `/services/garage-near-me-dubai` (217), `/best-car-workshop-dubai` (271 content words excluding navigation/footer) and the homepage substantially overlap in local workshop acquisition intent. The homepage is the initial owner recommendation; use page-query and backlink data before confirming redirects.
- `/services/roadside-assistance-dubai` (231 main words) describes safe next steps, recovery coordination and later workshop inspection. Confirm the actual service before targeting emergency/24-hour/on-site repair intent. This is not automatically a towing operation.
- Brand-normalized five-word-shingle Jaccard comparison within the same indexed English service family found **2,146 pairs at or above 0.70**, spanning **226 URLs**. This removes brand labels, retains other page wording, and is designed to expose template dependence. Different brands can legitimately have distinct demand; the statistic alone does not justify merging cross-brand pages.
- Land Rover and Range Rover body-repair, battery, electrical, exhaust, fuel, mechanical, steering and tyre pages show especially high normalized similarity (**0.978–0.980**). Here adjacent brand/entity intent makes duplication more material. Preserve clear Range Rover and Defender owners; assess whether generic Land Rover descendants add a distinct Discovery/other-model service purpose. Do not keep three generic copies of the same JLR service proposition without differentiating them.

## Cannibalization candidates and initial ownership

These are **content/intent overlap candidates**, not verified instances of multiple URLs ranking for the same query. The latter requires query × page GSC data.

| Intent | Existing competing candidates | Initial owner recommendation | Proposed disposition |
|---|---|---|---|
| General Dubai/Al Quoz workshop, garage, near me | `/`, `/best-car-workshop-dubai`, `/services/car-garage-dubai`, `/services/garage-near-me-dubai` | `/` | Consolidate equivalent local acquisition copy; preserve genuinely distinct selection advice in `/blog/best-car-workshop-dubai` |
| Porsche workshop/service/repair | `/brands/porsche-service-dubai`, `/best-porsche-workshop-dubai` | `/brands/porsche-service-dubai` | MERGE candidate; best-page title/H1 are commercial rather than distinct comparison intent |
| BMW workshop/service/repair | `/brands/bmw-service-dubai`, `/best-bmw-workshop-dubai` | `/brands/bmw-service-dubai` | MERGE candidate; confirm page-query and backlink evidence |
| Range Rover workshop/service/repair | `/brands/range-rover-service-dubai`, `/best-range-rover-workshop-dubai` | `/brands/range-rover-service-dubai` | MERGE candidate |
| Audi workshop/service/repair | `/brands/audi-service-dubai`, `/best-audi-workshop-dubai` | `/brands/audi-service-dubai` | Same pattern, although Audi is outside the user's 16 primary brands |
| Ferrari/Lamborghini workshop selection | Brand hubs versus `/best-ferrari-workshop-dubai` and `/best-lamborghini-workshop-dubai` | Brand hubs own commercial searches | These two best pages explicitly say “How to Choose”/“Owner Checklist”; assess informational value before merging, unlike the commercial best pages above |
| Porsche service intervals/how often | `/porsche/guides/service-intervals-uae`, `/porsche/guides/how-often-service-dubai` | `/porsche/guides/service-intervals-uae` | Merge same schedule intent; keep oil/PDK-specific sections only when they add distinct applicability |
| Porsche PDK service/repair | `/brands/porsche-service-dubai/transmission-repair`, `/porsche/systems/pdk`, PDK symptom guides, `/porsche/guides/pdk-service-intervals` | Transmission page for commercial repair | Preserve the system explanation only as informational; symptoms and routine service must point into commercial owner rather than duplicate offers |
| ROX soft-close installation | `/services/soft-close-door-repair-dubai`, `/brands/rox-service-dubai/soft-close-door-installation` | Brand route for ROX-specific intent; generic service for other confirmed vehicles | Generic title currently includes “ROX 01 Retrofit”; reduce ROX-specific targeting overlap and strengthen the owner link, with consolidation if no distinct generic service value exists |
| Mercedes infotainment repair versus audio upgrade | `/services/head-unit-repair-dubai`, `/services/mercedes-audio-upgrade-dubai`, Mercedes electrical page | Head-unit page for repair; audio-upgrade page for upgrades | KEEP distinct repair/upgrade intent, clarify black/frozen screen/audio failure versus enhancement and link accordingly |

## Existing specialty pages that must not be proposed as new

- Cadillac CUE: `https://digitecme.com/services/cadillac-cue-screen-repair-dubai` — 1,019 main words, index permitted, self-canonical.
- Head unit/Mercedes COMAND repair: `https://digitecme.com/services/head-unit-repair-dubai` — 941 main words, index permitted.
- Mercedes stereo/audio upgrade: `https://digitecme.com/services/mercedes-audio-upgrade-dubai` — 953 main words, index permitted.
- Generic soft close/ROX retrofit: `https://digitecme.com/services/soft-close-door-repair-dubai` — 807 main words, index permitted.
- ROX-specific soft-close installation: `https://digitecme.com/brands/rox-service-dubai/soft-close-door-installation` — 632 main words, index permitted.
- Volkswagen DSG/transmission candidate: `https://digitecme.com/brands/volkswagen-service-dubai/transmission-repair` — exists but noindex.
- Mercedes AIRMATIC/suspension: `https://digitecme.com/services/mercedes-suspension-repair-dubai`, plus existing `/mercedes/problems/airmatic-malfunction` and `/mercedes/problems/suspension-dropping-overnight`.
- Porsche PDK/PASM/PDCC: commercial transmission/suspension descendants, existing `/porsche/systems/` explanations and `/porsche/problems/` guides. Architecture/content refinement takes priority over more URLs.

## Internal-link findings

The site has strong crawl access and many useful hub-to-service links. The transmission and suspension generic service pages already link to selected brand-service descendants. Porsche informational system/problem pages link to their corresponding commercial service owner. These relationships should be preserved and improved, not recreated.

Three material gaps remain:

1. **Locale switch:** the 56 English-only pages expose Arabic hrefs whose initial HTTP HTML falls back to the English homepage; the representative browser sample client-navigates to the Arabic brand hub instead. Align the href and server handling with that actual destination.
2. **Commercial best-workshop pages:** Porsche, BMW and other `/best-…` pages link sideways to other best-workshop pages but omit a contextual link to their own brand hub in the initial HTML. Consolidation is preferable when the intent is the same; a retained genuine selection guide should link directly to its commercial owner.
3. **Service-to-brand-service precision:** generic car diagnostics and AC pages link broadly to all 38 brand hubs instead of prioritizing relevant diagnostic/AC descendants. Use selected contextual links to the exact brand-service owner, with the full brands directory remaining available. Some generic pages already demonstrate this correctly: transmission links to BMW/Porsche/Audi/Range Rover/Rolls-Royce/Bentley/Lamborghini transmission descendants; suspension links to BMW/Porsche/Audi/Range Rover/Bentley suspension descendants.

The HTML sitemap's short link distances should not be mistaken for strong editorial endorsement. Report navigational reachability and contextual links separately.

## Conservative first technical/content batch

1. Align the 56 locale hrefs and HTTP handling with intended browser destinations, and return truthful unknown-route HTTP responses; retain the existing useful rendered 404/noindex behavior.
2. Validate Google-selected canonicals/indexing for representative high-value existing pages through URL Inspection when access is available.
3. Confirm ownership for general garage/near-me and BMW/Porsche/Range Rover workshop overlaps using page-query GSC and backlinks, then prepare a concrete consolidation proposal.
4. Decide whether the existing Volkswagen transmission page deserves a targeted content/indexability exception; do not create a parallel DSG page first.
5. Consolidate overlapping Porsche schedule advice and set a quality bar before expanding the existing 53 compact Porsche guide/system/problem articles.
6. Preserve functioning Mercedes redirects, self-canonicals, hreflang, robots rules and indexable sitemap hygiene.

No implementation is authorized by this evidence document.
