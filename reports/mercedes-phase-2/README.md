# Mercedes Phase 2 — controlled implementation package

Prepared **26 October 2026, Dubai** from the existing audit and fresh public/authenticated read-only checks. **Ready for review, not deployed.** All new files are under `reports/mercedes-phase-2/`. Application source, built website, DNS, Workers, Cloudflare rules/order, backend and databases remain unchanged. No indexing request, sitemap submission, booking or WhatsApp message was sent. Even disabled Cloudflare drafts were not created in the account.

## Review these files

| Item | Reviewable artifact |
|---|---|
| Four precise redirects, evidence and tests | [Routing proposal](routing/README.md), [mapping/configuration JSON](routing/redirect-proposals.json), four individual disabled create payloads in `routing/rules/` |
| Existing Cloudflare rules and placement decision | [Authenticated configuration review](cloudflare-review.md), [current inventory](evidence/cloudflare/current-inventory.json) |
| Minimal hub change | [Hub rationale and claims register](hub/README.md), [two-paragraph unified diff](hub/mercedes-hub-minimal.patch), [proposed source copy](hub/proposed/src/pages/BrandPage.tsx) |
| Query/page, UAE, device and historical data | [Precise Search Console request and instructions](search-console/README.md), [read-only API request templates](search-console/api-readonly-request-templates.json) |
| Actual Google indexed-canonical observations | [Authenticated inspection evidence](search-console/indexed-inspection-observations.json), interpreted in the Search Console README |
| Release checks, commands and rollback | [Verification and rollback](verification-and-rollback.md) |
| Genuine Mercedes repair proof still needed | [Conditional evidence collection plan](hub/conditional-proof-plan.md) |

## 1. Four legacy routing corrections

Fresh public GET checks confirm all four source families still resolve to homepage HTML with HTTP 200. Corresponding HEAD requests confirm status/headers; HEAD cannot establish body content. All four intended destinations are relevant direct 200 pages with one correct slashless canonical, index/follow, no response-header noindex and sitemap inclusion. Both trailing-slash and slashless destination forms are technically accessible. HTTP eligibility and Google's stored index status are separate checks.

| Approval item | Exact source, plus one trailing slash | Fixed destination | Proposed behavior |
|---|---|---|---|
| R1 | `/ar/brands/mercedes-benz-service-dubai/oil-change` | `/ar/services/mercedes-oil-change-dubai` | 308, preserve query |
| R2 | `/brands/mercedes-benz-service-dubai/body-repair` | `/services/mercedes-body-repair-dubai` | 308, preserve query |
| R3 | `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | `/ar/services/mercedes-battery-replacement-dubai` | 308, preserve query |
| R4 | `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | `/ar/services/mercedes-mechanical-repair-dubai` | 308, preserve query |

Each rule matches only GET/HEAD, `digitecme.com` / `www.digitecme.com`, and its two exact source paths. Targets are absolute `https://digitecme.com` URLs, with no query/fragment embedded in the target. No prefix, regex, wildcard, Worker, bulk list, destination slash normalization or additional legacy alias is introduced. POST is outside the proposed scope. Query preservation covers repeated, encoded and blank values without reconstructing them; fragments are browser-side and not sent in HTTP requests.

The four disabled local rule definitions are the smallest straightforward static configuration without introducing dynamic path transformations or a new routing layer. Four different destinations need four static redirect actions. The candidate uses permanent 308 to match the protected English oil migration's convention; it does not change that migration.

### Current Cloudflare conflict outcome

Authenticated dashboard inspection confirms three active Single Redirects, in order: English oil → broad Mercedes → www canonicalization. The visible allowance is ten, so four additions fit the current allowance. The new path sets do not overlap either existing Mercedes rule, but their www requests overlap the existing www catch-all.

**Required proposed placement:** existing English oil → existing broad Mercedes → R1 → R2 → R3 → R4 → existing www. Insert only the new records before the verified www anchor ID. Do not edit or move the existing www rule. This preserves the existing rules' definitions and relative order and avoids an extra www → apex legacy → destination hop. Targets are not in any proposed or existing legacy source set, preventing the modeled loop/chain paths. Real behavior still needs post-activation verification.

The inspection also found no configured zone Worker routes, Page Rules, Bulk Redirect Lists, URL Rewrite Rules, Configuration Rules or Origin Rules in the reviewed screens. Relevant apex/www CNAME records remain proxied to the existing Lovable host. The inventory is a dated UI transcription; raw API version/ref metadata and TLS/URL-normalization settings are not fully captured. Refresh before any later approval is acted on.

The October 21 English oil rule remains protected, including its exact expression, destination, 308 status, query preservation and enabled state. The fresh HTTP matrix verifies its direct redirect across host, protocol, slash, method and query cases.

Two unrelated broad service/workshop trailing-slash aliases still fall back to the homepage because the existing broad rule covers only their slashless forms. They are documented in routing evidence and excluded from these four corrections. This package does not silently enlarge an existing rule.

## 2. Additional Search Console evidence

Authenticated read-only access to the correct `sc-domain:digitecme.com` property was available. Indexed URL Inspection was used; no Request indexing or Test live URL action was submitted. The stored crawls precede today's HTTP checks and must not be described as current live fetches.

Material findings already obtained:

- The three Arabic destination pages are indexed and self-selected in the inspected Google records.
- The Arabic oil, English body and Arabic mechanical **legacy sources** are indexed with Google selecting the inspected legacy URL, despite their stored user-declared canonical pointing to the intended service. Current public source responses instead serve homepage HTML; these observations refer to different times.
- The Arabic battery legacy source is stored as “Page with redirect,” with the intended service canonical, based on an older crawl. Its current public response is a homepage fallback; do not assume the stored redirect remains active.
- **R2 body destination is “Crawled – currently not indexed”** in the stored report, with canonical values unavailable. Its current HTTP/indexability checks pass. The routing proposal remains semantically appropriate, but it must not be sold as pointing to a currently confirmed Google-indexed destination. Review this indexing uncertainty explicitly when deciding R2.
- The protected English oil service's slash URL is indexed/Google-selected in the captured record, while the slashless form is crawled, currently not indexed. Both last-crawl dates precede October 21; no redirect-caused change can be inferred. Preserve the existing English oil rule and canonical preference. The [indexed findings](search-console/indexed-findings.md) explain this remaining canonical-convergence uncertainty.

Exact stored status, crawl dates and canonical values are retained in the inspection evidence. Selected-canonical and index decisions may change after recrawl; a redirect is a signal, not a guarantee of index inclusion or immediate canonical convergence.

The prepared request covers actual paired query × page data, UAE/all-country controls, Mercedes Mobile/Desktop slices and frozen exact windows ending October 24: **7 days October 18–24; 28 days September 27–October 24; 90 days July 27–October 24**. Detailed UI instructions show exact-query filter → Pages, and exact-query + exact-page filters → Dates. Separate unfiltered Queries/Pages tabs must not be joined as measured pairs. UAE country data is not a Dubai Maps rank.

The full performance export matrix is still a data request, not a fabricated result. API templates are unexecuted, use read-only scope and preserve the documented distinction between API `web` and the UI's `Web: text-based` label. If access expires, the same instructions allow the authorized analyst to supply the files without sharing credentials. No new access grants are requested.

## 3. Hub improvement diff

The proposed diff changes only **two existing English Mercedes hub paragraphs**:

1. Link the current workshop-engine caption contextually to existing Mercedes XENTRY diagnostics and mechanical-repair inspection pages. The photograph remains evidence of a workshop scene, not an invented completed repair or measured outcome.
2. Expand the existing Al Quoz proof card with the warehouse range and phone already published in the footer/business graph. **Confirm the current master address with the operator before publishing this paragraph.** Entrance/hours remain unverified and are not added.

The current title, description, H1, URL, canonical, repair targeting, Service A/B quotation/exclusion guidance, FAQs, schema and booking behavior are retained. Existing quotation clarity is already substantial; no repetitive quotation section or unsupported pricing/warranty claim is added. No new page, repair testimonial, certification, authorization or case study is proposed. A genuine mechanical repair case remains deferred until actual job evidence is supplied.

`git apply --check` passed without applying the patch, proposed TSX syntax parsed without diagnostics, and the captured application-source hashes remained unchanged. Full build, SSR/browser/mobile rendering of the unimplemented patch remains an implementation-stage check. Two new links' destinations were refreshed as relevant 200/self-canonical/indexable pages.

## 4. What requires approval

| Approval | Concrete scope | Conditions |
|---|---|---|
| R1–R4 individually or as the exact four-rule package | Create and enable the four reviewed Single Redirects, including two hosts, GET/HEAD, slash forms, 308, query preservation and insertion before www | Fresh preflight and current configuration comparison; unchanged protected oil and existing rules; platform validation; record every new ID. R2 additionally acknowledges its destination's unresolved Google index inclusion. No creation/activation is authorized yet. |
| H | Apply the exact two-paragraph hub patch in a controlled working copy and prepare its release | Operator confirms the published warehouse address; source/patch hashes still match; relevant build/SSR/desktop/mobile checks pass. Approval to prepare/apply a patch is not automatically approval to publish it. |
| H publication | Publish the reviewed hub release | Separate explicit publication approval and successful implementation-stage validation. Keep R and H releases distinct. |
| Rollback | Disable only these new rule IDs and/or reverse only the approved hub hunks | Must be explicitly authorized, either with the later activation approval for named failure triggers or separately. No current rollback mutation is authorized. |
| Any expansion | Other aliases, existing-rule changes, metadata/canonical work, new claims/pages, tracking, DNS/Workers or indexing submissions | Outside this package and needs a new reviewed scope. |

## 5. Ready versus uncertain

Preparation checks completed:

| Check | Result and limit |
|---|---|
| Fresh public HTTP preflight | 326 cases / 564 GET/HEAD requests / 733 passing assertions, October 26 10:53:48–10:54:33 UAE. This is before-state evidence, not an activated-redirect result. |
| Exact proposal scope tests | 738 passing assertions; literal predicates/query/target model, not Cloudflare's provider validation. |
| Saved rule conflict/order model | 781 passing checks against the authenticated functional inventory; no account mutation. |
| Offline post-verifier exercises | Three scenarios passed: expected response fixture, query-loss rejection and mismatched-baseline rejection. These were synthetic and made no external requests. No live post-deployment test is claimed. |
| Hub diff | Applicability and TSX syntax pass; application source remains unchanged. Build/render/mobile validation awaits approved application. |

**Ready:** four narrowly scoped disabled JSON proposals and concrete create payloads; current source/destination HTTP evidence; authenticated rule conflict/order review; local scope/loop/query tests; pre/post read-only HTTP commands; a two-paragraph hub diff with preserved SEO fields; precise GSC export/API requests; actual indexed-canonical observations; explicit rollback boundaries.

**Uncertain or pending:** full paired performance exports and like-for-like 28/90-day interpretation; future Google canonical/index convergence and ranking effect; body-target index inclusion; current real-world warehouse/arrival confirmation; genuine repair outcome records; future provider validation/propagation; full render/mobile checks after approved application; raw Cloudflare version metadata and any configuration drift since capture. These are not represented as passing results.

**Stop point reached:** no live changes are authorized or performed. Review this package before any source application, Cloudflare draft creation, activation or publication.
