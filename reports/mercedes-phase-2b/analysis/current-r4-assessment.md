# R4 current behavior and cause assessment

**R4 now passes the sampled current checks without any configuration change.** The full Phase 2B matrix passed **852/852 assertions across 326 cases and 612 HTTP requests**, including **48/48 R4 source variants** and **192/192 source variants across R1–R4**. Twelve additional exact-condition R4 GET repeats all returned the expected direct 308 and relevant indexable 200 destination. The original Phase 2A homepage failure remains valid; its cause is unresolved.

## Exact failed condition rechecked

All dates below are 26 October 2026; Dubai is UTC+4.

| Observation | UTC / Dubai | Result |
| --- | --- | --- |
| Historical Phase 2A exact GET | 07:20:59.755 / 11:20:59.755 | Homepage 200, no Location; `a507b3b20a4fb88b-AMS`. |
| Phase 2B matrix exact GET | 07:35:34.522 / 11:35:34.522 | Direct 308 to intended service, then relevant 200 with expected canonical; `a507c90d4dcfd593-AMS`. |
| Twelve additional exact GET repeats | 07:35:52.840–07:37:53.755 / 11:35:52.840–11:37:53.755 | 12/12 direct 308 → relevant 200; no historical homepage fallback recurred. |

The exact URL remained `https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair`, without query or trailing slash. The exact matrix GET passed **14 minutes 34.767 seconds after the historical failed request**. It also carried an AMS suffix, so the exact condition was successfully rechecked with that same colo label. This does not identify the same edge instance or configuration version.

The matrix ran **07:35:12.033–07:36:01.733 UTC / 11:35:12.033–11:36:01.733 Dubai**. All sixteen R4 source responses bearing AMS suffixes in that matrix passed. The full matrix also included the protected English oil redirect's 48 combinations, 48 broad Mercedes redirect/control cases, sixteen destination cases and 22 page controls. Existing broad-route exceptions remain baseline behavior; this is not a claim that every broad-route variant redirects.

The separate repeat run used the Phase 2A User-Agent, six default-fetch requests and six requests containing `Connection: close`. Each source redirect was followed only to its exact intended target, for **24 GETs** including destinations. No query was added; no cache-control request header, cache-busting query, purge or configuration change was used. Source CF-Ray suffixes included HKG, AMS, FRA and CDG. No socket/TLS lifecycle, independent route or independent client location was measured.

## Current configuration

The authenticated detail/readback window was **07:35:29.939–07:35:51.673 UTC / 11:35:29.939–11:35:51.673 Dubai**. Offline comparison confirms that all seven rule IDs, enabled states, functional definitions and order match the Phase 2A after-state. R4 remains `2873f5b6de04417d8a486b22cc878835`, sixth and immediately before the original www rule. The original October 21 English oil rule remains first and unchanged.

The failed historical tuple literally matches R4's recorded apex/GET/slashless-path conditions. Query string contents are outside its expression. The www condition is false for the failed apex URL, and the earlier original Mercedes path sets exclude it. The approved static target remains `https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai`. Cloudflare applies the first matching redirect; Single Redirects precede later rewrite/origin/bulk/cache products. [Cloudflare redirect evaluation](https://developers.cloudflare.com/rules/url-forwarding/).

Readback validates the displayed control-plane configuration; it does not reveal which historical configuration an individual edge evaluated. Other layer checks and their timestamps are recorded by the root investigation in the Cloudflare evidence folder.

## Cause assessment

**A transient routing or configuration-consistency event is consistent with the observations. Propagation is not confirmed.** The only miss occurred 25.013 seconds after enabled state was first observed; a later unchanged rule passes all current variants and thirteen exact-condition GET observations (one in the matrix plus twelve repeats). No request trace or per-edge configuration version identifies the historical decision.

A persistent expression, target or placement defect is not supported by the current functional readback and passing exact-condition tests. The historical failure's apex host does not support a www-rule conflict. Its ordinary ASCII path does not reveal an obvious URI-normalization mismatch. Successful tests cannot reconstruct the internal historical path evaluation.

A Cloudflare cached homepage HIT is not supported by the failed response: it reported `CF-Cache-Status: DYNAMIC`, no `Age`, and `Cache-Control: no-cache, must-revalidate, max-age=0`. Cloudflare describes DYNAMIC as cache-ineligible treatment proceeding to origin without cache lookup. That weakens a simple stale Cloudflare page-object explanation; it does not identify every upstream intermediary or explain why R4 did not apply. [Cloudflare cache responses](https://developers.cloudflare.com/cache/concepts/cache-responses/).

The homepage body, title, canonical and main-text hash confirm the known legacy fallback was returned during the miss. They do not prove the layer that produced or routed it. The suffixes identify processing colos, not controlled geographic clients or exact machines, and one client can reach different colos. Consequently, suffix diversity is not a global, UAE or mobile propagation study. [Cloudflare response headers](https://developers.cloudflare.com/fundamentals/reference/http-headers/), [geographic traffic routing](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/).

## Recommendation and limits

**Retain the current enabled R4 configuration.** The evidence does not support an expression edit, purge, reorder or rollback: the current approved definition and observed behavior pass, while disabling R4 would restore the known legacy homepage fallback. This is a recommendation, with no production action performed by the analysis.

The historical failure remains unexplained and recurrence is not ruled out. Definitive attribution would require Cloudflare request-specific trace/log/support evidence for `a507b3b20a4fb88b-AMS`, including evaluated host/path/method, rule IDs and configuration version. Those fields, exact server activation time and direct origin logs are unavailable. If another miss is observed, preserve the exact method/URL/time/CF-Ray, headers and body and seek that evidence before proposing an approved, narrowly scoped change.

No Google crawl, indexing, canonical-selection, ranking or traffic recovery conclusion follows from these HTTP observations. No new indexing action was performed by this analysis.

## Evidence

- [Machine-readable current assessment](current-r4-assessment.json), with source hashes, complete inventory comparisons and repeat ledger.
- [Historical failure analysis](phase2a-failure-analysis.md) and [48 normalized historical rows](phase2a-failure-analysis.json).
- [Fresh full matrix capture](../http/post-2026-10-26T07-35-12-026Z/capture.json).
- [Twelve exact-repeat capture](../repeats/repeat-2026-10-26T07-35-52-836Z/capture.json).
- [Authenticated current inventory](../cloudflare/current-inventory.json).
- [Offline current synthesis script](assess-current-r4.mjs), containing no network or UI actions.
