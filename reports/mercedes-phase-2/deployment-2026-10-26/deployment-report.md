# DIGI-TEC Phase 2A — stopped after R4 verification failure

**The controlled deployment did not pass final acceptance.** Cloudflare accepted and enabled the four approved additions in R1–R4 order immediately before the existing www rule. R1, R2 and R3 passed their activation checkpoints. **R4 failed one of its 48 source combinations, returning homepage 200 instead of the required redirect.** Deployment verification stopped; no retry, full final post-deployment test, rollback or further live change followed this failure.

**All four new rules remain enabled.** The actual authenticated after inventory shows seven enabled rules, including all three original rules with unchanged functional definitions and relative order. Any rollback requires separate user approval. The failure's cause remains unresolved.

All dates in this report are **26 October 2026**. Dubai is UTC+4. The [activation log](cloudflare/activations.json), [HTTP ledger](verification/activation-verification-ledger.json) and raw captures retain exact timestamps.

## Authorized scope and before/after results

The user authorized exactly four prepared Cloudflare Single Redirects. Each rule covers the reviewed apex/www hostname set, GET/HEAD methods and exact slashless/source-with-one-trailing-slash pair. Each uses 308, a static HTTPS apex slashless destination and query preservation. Website content, metadata, canonicals, indexing requests, other configuration and rollback were outside authorization.

| Rule | Exact source, also matching one trailing slash | Fixed destination | Fresh before state | Immediate activation checkpoint result |
| --- | --- | --- | --- | --- |
| R1 | `/ar/brands/mercedes-benz-service-dubai/oil-change` | `https://digitecme.com/ar/services/mercedes-oil-change-dubai` | All 48 combinations ended at homepage 200. | **48/48** direct 308 → intended relevant 200; query retained. |
| R2 | `/brands/mercedes-benz-service-dubai/body-repair` | `https://digitecme.com/services/mercedes-body-repair-dubai` | All 48 combinations ended at homepage 200. | **48/48** direct 308 → intended relevant 200; query retained. |
| R3 | `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | `https://digitecme.com/ar/services/mercedes-battery-replacement-dubai` | All 48 combinations ended at homepage 200. | **48/48** direct 308 → intended relevant 200; query retained. |
| R4 | `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | `https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai` | All 48 combinations ended at homepage 200. | **47/48** direct 308 → intended relevant 200; **one homepage 200 failure**. |

The [192-row before/after CSV](verification/new-rule-before-after-192-cases.csv) pairs each rule's full 48-case immediate activation checkpoint with the fresh before-state: 191 passed and one failed. These observations were taken sequentially after each rule's activation; they are **not a concurrent final-state test of all 192 combinations**. No loops or unintended intermediate hops occurred in passing combinations. The failed combination did not reach its intended relevant page.

The reviewed [proposal](../routing/redirect-proposals.json) SHA256 remains `336a3e207ab451d22f95efad88e334a3d5f8bb9958e495a8e9bcbe3f3d4956b9`. Historical local payloads remain disabled review artifacts; the actual enabled rule instances and IDs are recorded below.

## Exact failed response and stop condition

At **07:20:59.755 UTC / 11:20:59.755 Dubai**, the verifier requested the HTTPS apex slashless source without a query:

```http
GET https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair
```

Expected: one direct **308** with `Location: https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai`, followed by relevant 200 HTML and that page's declared canonical.

Observed: **200 homepage HTML directly**, with **no Location header**, title `Digi-Tec Performance Center | Independent Car Workshop Dubai`, canonical `https://digitecme.com/` and homepage main-text SHA256 `d07fff0f97bb2b18b3e85e16673c1e26fbb476689020cbb7f9aa8deab957c6dc`, matching the fresh before-state homepage.

```text
CF-Ray: a507b3b20a4fb88b-AMS
cf-cache-status: DYNAMIC
Date: Mon, 26 Oct 2026 07:21:03 GMT
```

This is request `source-ar-mechanical-repair-6` in the [R4 raw capture](verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/capture.json). The [exact homepage body](verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/html/source-ar-mechanical-repair-6.html), [assertions](verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/assertions.csv), [request records](verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/requests.json) and [failure note](verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/FAILURE.md) are preserved unchanged.

Both failed assertions concern this **one request**: the missing direct redirect and the missing intended target canonical/indexability. The other 47 R4 source combinations passed. R4 checkpoint destination variants, earlier-rule critical probes, protected oil probes and page/redirect controls passed. Those passes do not negate the failure. The reason the request missed the enabled rule is unresolved; no propagation, caching, edge-consistency or configuration cause has been established.

The failure triggered the required stop. No additional HTTP retry or full 326-case post-deployment matrix was run. Only read-only configuration readback, offline comparisons and evidence reporting continued. No rollback, cache purge, expression adjustment, rule movement or unrelated change was performed.

## Rule IDs and activation observation intervals

Cloudflare's exact internal activation timestamps were not exposed. The following are operator UI submission-to-enabled-observation intervals, **not server activation times**. R1 additionally has a UI response-observation timestamp of 07:15:45.630 UTC.

| Rule | New Cloudflare ID | Submitted → enabled first observed, UTC | Same interval, Dubai | Elapsed |
| --- | --- | --- | --- | ---: |
| R1 | `b835ca6b88b448d6809f01271dba491b` | 07:15:45.190 → 07:15:52.800 | 11:15:45.190 → 11:15:52.800 | 7.610 s |
| R2 | `5fafd20389964771885d8d1194f01d77` | 07:17:42.913 → 07:17:45.750 | 11:17:42.913 → 11:17:45.750 | 2.837 s |
| R3 | `239ab46545704096bec2628d8eedf9b9` | 07:19:04.747 → 07:19:07.456 | 11:19:04.747 → 11:19:07.456 | 2.709 s |
| R4 | `2873f5b6de04417d8a486b22cc878835` | 07:20:32.137 → 07:20:34.742 | 11:20:32.137 → 11:20:34.742 | 2.605 s |

The [authenticated after inventory](cloudflare/after-inventory.json), observed at **07:21:54.063 UTC / 11:21:54.063 Dubai**, shows **7/10** slots used and every rule enabled. The [seven-rule field comparison](cloudflare/after-readback-validation.json) and [final enabled-list screenshot](cloudflare/screenshots/final-seven-enabled-rules-bottom.png) support the observed configuration. The screenshot includes the bottom of the ordered rule list; the complete normalized inventory records every rule.

The final order is:

1. Original October 21 English oil: `5addb0c068414fb5b985a869ded26c68`.
2. Original broad Mercedes aliases: `dbe42693423442afbc3bab9b993242a7`.
3. New R1: `b835ca6b88b448d6809f01271dba491b`.
4. New R2: `5fafd20389964771885d8d1194f01d77`.
5. New R3: `239ab46545704096bec2628d8eedf9b9`.
6. New R4: `2873f5b6de04417d8a486b22cc878835`.
7. Original www: `9781b1ef743f4ffbaadbe5cb3250eeca`.

The [offline before/after conflict checker](cloudflare/after-conflict-check-output.json) passed **799 checks**: exactly four additions, approved enabled definitions and placement, and unchanged original IDs, functional fields, enabled states and relative order. The original rules were not replaced, edited, deleted or reordered. Functional UI readback is not a raw API ruleset/version export; hidden provider fields, refs and exact server update metadata remain outside this evidence. A correct displayed configuration does not override the observed HTTP failure.

## Public verification results and limits

| Checkpoint | UTC HTTP window | Dubai HTTP window | Cases / HTTP requests | Assertions | Result and evidence |
| --- | --- | --- | --- | --- | --- |
| R1 | 07:16:45.148–07:16:59.672 | 11:16:45.148–11:16:59.672 | 106 / 173 | 342/342 | [PASS capture](verification/evidence/checkpoint-R1-2026-10-26T07-16-45-143Z/capture.json) |
| R2 | 07:18:04.884–07:18:20.349 | 11:18:04.884–11:18:20.349 | 106 / 174 | 341/341 | [PASS capture](verification/evidence/checkpoint-R2-2026-10-26T07-18-04-882Z/capture.json) |
| R3 | 07:19:27.316–07:19:43.295 | 11:19:27.316–11:19:43.295 | 106 / 175 | 340/340 | [PASS capture](verification/evidence/checkpoint-R3-2026-10-26T07-19-27-311Z/capture.json) |
| R4 | 07:20:57.868–07:21:13.586 | 11:20:57.868–11:21:13.586 | 106 / 175 | **337/339; 2 failed** | [FAIL capture](verification/evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/capture.json) |

The four real checkpoints total **424 cases, 697 HTTP requests and 1,362 assertions: 1,360 passed, two failed**. Repeated controls and sequential rule tests are included; these totals do not constitute the withheld full final matrix. The [verification report](verification/verification-report.md) and [capture hashes](verification/real-capture-sha256.json) document coverage and integrity.

Each checkpoint tested the newly enabled rule's full 48 combinations: apex/www × HTTP/HTTPS × slash/slashless × GET/HEAD × three query strings. Queries included empty, campaign-like and repeated/encoded/blank values. Earlier and pending rules received two critical probes each. Every checkpoint also included eight protected English oil probes, all sixteen destination slash/method variants, 22 protected page controls, six broad Mercedes redirect controls, robots and sitemap. Passing GET targets retained relevant content, metadata, expected canonical and indexability against the fresh baseline.

The protected October 21 English oil rule retained its direct 308 and query behavior in the eight checkpoint probes, and its content controls remained unchanged. Its full 48-case matrix passed before deployment. **A full 48-case English oil post-deployment result is not claimed**, because the final full test was withheld after R4 failed. All existing SEO behavior globally is likewise not claimed to have been revalidated.

Four Cloudflare edge suffixes appeared in staged responses: AMS, CDG, HKG and FRA. They came from one verifier runtime and do not represent independent UAE/mobile clients or establish global propagation.

An earlier R1 attempt in the default network sandbox produced **zero actual HTTP responses**: 108 transport attempts returned status 0/ENOTFOUND across 106 cases, including homepage, oil controls, robots and sitemap. The resulting 17/342 positive assertions were empty-response negative-header checks and are not production passes. That [inconclusive attempt and diagnosis](verification/evidence/checkpoint-R1-2026-10-26T07-16-10-753Z/execution-diagnosis.md) remain preserved and are excluded from the real checkpoint totals. The operator paused further activation until R1 was validly verified using approved public network access; R2–R4 used that network access. No retry followed the actual R4 HTTP failure. Synthetic fixture tests are separately labeled and excluded from live results.

## Pre-deployment gates and preserved scope

The fresh [preflight capture](preflight/http-pre-2026-10-26T07-06-59-812Z/capture.json) ran **07:06:59.815–07:07:45.367 UTC / 11:06:59.815–11:07:45.367 Dubai** and passed **733/733 assertions across 326 cases and 564 requests**. SHA256: `50acb9e9b9abfdba35fad704cec0c1a2f25aef2e2ea94cd7fc4f1d3e620a3d97`.

The 326 cases comprised 192 new-source cases, 48 protected English oil cases, 48 broad Mercedes cases, sixteen destination cases and 22 page controls. All four source families still ended at homepage 200; GET bodies matched the homepage while HEAD established status/headers only. All intended destinations were direct relevant 200 pages, with one correct canonical, indexable robots/header policy and sitemap inclusion. All 326 stable case chains, metadata and main-text hashes matched the reviewed passing capture, and robots text was unchanged. See the [preflight summary](preflight/read-only-preflight-summary.json) and [stable response comparison](preflight/stable-http-drift.json).

Repeated local gates passed: 738 proposal assertions, five synthetic conflict-checker scenarios, three offline post-mode scenarios, package validation, hub patch applicability without application, four existing hub-link GET/HEAD checks, and 283 protected source hashes. Historical outputs were first retained in [reviewed-output snapshots](preflight/reviewed-output-snapshots/).

The fresh [Cloudflare before inventory](cloudflare/before-inventory.json), observed at **07:12:46.742 UTC / 11:12:46.742 Dubai**, matched the reviewed three enabled rules and **3/10** capacity. The [fresh conflict check](preflight/fresh-conflict-check-output.json) passed **781 checks**. It identified four expected www overlaps; the approved insertion before www avoided a host-canonicalization chain without changing the original rule.

The operator refreshed Page Rules (zero), Bulk Redirect Lists (zero), zone Worker routes (none), and URL Rewrite, Configuration and Origin Rules (none displayed). Apex/www remained proxied CNAMEs to `dubai-performance-art.lovable.app`, TTL Auto. Always Use HTTPS and Automatic HTTPS Rewrites were enabled. URL normalization remained Cloudflare type, incoming enabled and normalization to origin disabled. Those layers were read only. The separate subagent browser was unavailable; the root operator completed authenticated checks in its working browser.

The [final offline guard](final-offline-guard.json), captured at **07:23:24.661 UTC / 11:23:24.661 Dubai**, rechecked all 283 protected source files, ten approved-file/baseline hashes and tracked status. All passed with no source or reviewed proposal/payload/verifier drift. The pre-existing tracked changes remained listed only at `outputs/seo-2026-09-16/master-validation.json` and `supabase/functions/mcp/index.ts`; the status comparison is not a byte-level comparison of those unrelated dirty files.

The hub patch was not applied or deployed. No title, H1, canonical, website content, indexing request, sitemap submission, DNS, Worker, TLS, normalization, backend or unrelated rule change was performed. The known `/services/mercedes-service-dubai/` and `/best-mercedes-workshop-dubai/` homepage fallbacks remain outside this four-rule scope; relevant checkpoint controls preserved their sampled baseline behavior.

## Search Console uncertainty

The [authenticated refresh](gsc/README.md) inspected eleven reviewed URLs between **07:07:18.888–07:09:13.062 UTC / 11:07:18.888–11:09:13.062 Dubai**. Stored indexed statuses, canonicals, crawl fields and last-crawl timestamps were unchanged. Seven observations changed only in the sitemap-discovery reporting display, as shown in the [field comparison](gsc/indexed-inspection-comparison.json); this does not establish a sitemap configuration change.

The English body-repair destination remains **Crawled — currently not indexed**, with stored declared/selected canonical fields N/A. Its public page remains technically eligible and relevant; Google inclusion is not established. Arabic oil, battery and mechanical destinations remain indexed in the stored reports. Three legacy source reports still select the inspected source; the battery source remains Page with redirect with the intended service selected.

The protected slashless English oil service remains Crawled — currently not indexed, while the slash variant remains indexed with Google selecting the slash URL despite its slashless declared canonical. This existing canonical convergence uncertainty remains outside scope. The hub remains indexed with the expected canonical. These are historical Google Index records, not fresh Google crawls or live tests; Search Console's displayed crawl timezone was not verified.

Query × page, UAE, device and 28/90-day performance exports remain separate measurement work in the [reviewed request](../search-console/README.md). No ranking recovery, immediate indexing change or selected-canonical convergence is claimed. No Test Live URL, indexing request or sitemap submission was performed.

## Approval required and current holding state

**Current state: all four new rules enabled; R1–R3 activation checkpoints passed; R4 verification failed; no rollback performed.** No further live change is authorized by this report. The original three rules and successful new rules must remain unchanged while the user decides the next step.

A concrete [R4-only rollback proposal](cloudflare/R4-rollback-proposal.json) is prepared for review: disable **only** new rule `2873f5b6de04417d8a486b22cc878835`, leaving its record/definition in place and leaving R1–R3 plus all original rules enabled and unchanged. **This proposal is not authorization and has not been executed.** Disabling R4 would restore its before-state routing, including homepage fallback; it would not fix the mechanical alias. Previously cached permanent redirects may persist at clients.

If the user approves that specific rollback, verify R4's disabled state, preserve all definitions and relative order, and perform the scoped read-only checks described in the proposal. Further troubleshooting, re-verification or modification after this stop must follow the user's next instruction; no cause is assumed and no additional successful-deployment claim is made.
