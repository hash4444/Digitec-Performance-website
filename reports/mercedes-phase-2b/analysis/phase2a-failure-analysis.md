# Historical R4 failure: what the Phase 2A evidence establishes

The Phase 2A failure was a real homepage response to one request that should have redirected. The saved functional rule definition does not explain the miss. A transient edge inconsistency is plausible, but the historical evidence cannot establish propagation, cache or a specific routing layer as the cause. This analysis is offline and does not claim any fresh test result; the Phase 2B assessment records later observations separately.

## Exact failed condition and timing

`GET https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair`, without a query or trailing slash, began at **07:20:59.755 UTC / 11:20:59.755 Dubai on 26 October 2026**. This was **25.013 seconds after R4's enabled state was first observed**. Cloudflare's exact server activation time was unavailable, so this interval is not propagation duration.

The response was **200**, with no `Location`. Its canonical was `https://digitecme.com/`, and its homepage title/main-text hash matched the fresh pre-deployment fallback for the same URL and the homepage control. The response carried `CF-Ray: a507b3b20a4fb88b-AMS`, `CF-Cache-Status: DYNAMIC`, no `Age`, and `Cache-Control: no-cache, must-revalidate, max-age=0`. These observations establish delivery of the known fallback content; they do not establish the internal layer that bypassed the redirect.

The exact method+URL was requested **once** in the Phase 2A R4 checkpoint. There was no follow-up after the failure. The failed direct-redirect and final-canonical assertions refer to this one request, rather than two independent failures.

## Variant and colo pattern

R4's 48 source cases ran from **07:20:59.755 to 07:21:06.664 UTC**. Forty-seven had the required direct 308 followed by relevant 200; the single failure was the first R4 source case. HEAD passed 24/24; GET passed 23/24. HTTP, www, trailing-slash and nonempty-query groups all passed in their sampled combinations. These correlated dimensions cannot independently identify a trigger because only one case failed.

| Response CF-Ray suffix | Source cases | Correct direct redirects | Failures |
| --- | ---: | ---: | ---: |
| AMS | 7 | 6 | 1 |
| CDG | 15 | 15 | 0 |
| HKG | 16 | 16 | 0 |
| FRA | 10 | 10 | 0 |

An AMS response returned the correct 308 only **341 milliseconds later**, for HTTPS apex slashless **HEAD with a campaign query**. This is not a repeat of the failed GET+empty-query condition, but it rules out an interpretation that every observed AMS response missed R4. A response CF-Ray suffix denotes a processing colo; it does not establish the same edge machine, rule version, client geography or network route. One client can reach different colos. These captures came from one verifier runtime, not independent geographic clients. [Cloudflare response headers](https://developers.cloudflare.com/fundamentals/reference/http-headers/), [geographic traffic routing](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/).

## Rule matching and conflicts

Offline evaluation of the saved request tuple against the inventoried literal host/method/path sets matches **only R4**, rule `2873f5b6de04417d8a486b22cc878835`. The source is an ordinary ASCII path with single slashes and no encoded characters; it exactly equals one permitted R4 path. The rule permits GET, matches the apex hostname and has no query condition. Its static slashless HTTPS destination is correct.

The two original Mercedes rules exclude this path. The www rule's condition is false for the failed apex request; it also follows R4. The saved after-state places R4 sixth, immediately before www, with all seven rules enabled. The three original rules' functional fields and relative order are unchanged. This checks the recorded definition and tuple; it is not a Cloudflare per-request execution trace. Cloudflare applies the first matching redirect and evaluates Single Redirects ahead of later rewrite, origin, bulk and cache products. [Cloudflare redirect evaluation](https://developers.cloudflare.com/rules/url-forwarding/).

## Cause assessment

| Candidate | Assessment | Evidence and limit |
| --- | --- | --- |
| Transient propagation or edge consistency | Plausible; unproven | One early miss amid 47 passes fits a transient event. No edge configuration version, trace or exact-tuple repeat was captured. Same-colo suffix success does not establish every edge was consistent. |
| Cloudflare cached homepage HIT | Not supported by this response | `DYNAMIC` is not a cache HIT, and no `Age` was present. The response's no-cache policy further weakens a simple stale edge-object explanation. No data identifies all possible upstream intermediaries. |
| Wrong displayed expression, target or order | No defect found | Literal tuple matches enabled R4; target and position match the proposal. UI readback cannot prove what an earlier edge request evaluated. |
| www canonicalization conflict | Not supported for this request | Failed host is apex, so www's condition does not match. All 24 www variants had direct redirects. |
| URI normalization mismatch | No mismatch evident | Saved path is an exact ordinary literal. No internal normalized-field trace was recorded. |
| Homepage fallback downstream of a missed redirect | Content confirmed; causal layer unresolved | Canonical/title/main-text match the pre-deployment homepage fallback. No direct origin log or request confirms where bypass occurred. |

Cloudflare documents `DYNAMIC` as cache-ineligible treatment that reaches origin without a cache lookup. That makes the saved response inconsistent with a Cloudflare cached-page HIT; it does not explain why R4 did not apply or conclusively localize every upstream action. [Cloudflare cache responses](https://developers.cloudflare.com/cache/concepts/cache-responses/).

## Evidence still needed for attribution

Fresh exact-condition repeats, a full current matrix, and authenticated configuration readback can establish current behavior and detect recurrence. Alternating default fetch with `Connection: close` preserves the exact URL and checks an additional request-connection mode. Neither mode establishes a new independent network vantage or proves a particular socket/TLS lifecycle.

A definitive explanation of the historical miss would require request-specific Cloudflare trace/log/support evidence for `a507b3b20a4fb88b-AMS`, including evaluated host/path/method, rule/configuration version and redirect decision. Those fields were not exposed in the saved UI or HTTP capture. No such trace is claimed here, and no configuration fix is justified by the historical evidence alone.

## Local evidence

- [Structured analysis and 48 normalized source rows](phase2a-failure-analysis.json).
- [Offline reproduction script](analyze-phase2a-r4.mjs), containing no network or UI action.
- Historical source hashes are recorded in the JSON. Original Phase 2A evidence was only read.
- No repository or ancestor `AGENTS.md` was found during this analysis.
