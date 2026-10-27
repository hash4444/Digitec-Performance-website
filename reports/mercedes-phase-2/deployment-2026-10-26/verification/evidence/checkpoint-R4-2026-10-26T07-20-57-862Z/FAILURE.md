# R4 checkpoint FAIL — deployment verification stopped

At **2026-10-26T07:20:59.755Z** (11:20:59.755 Asia/Dubai), the verifier requested:

```text
GET https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair
```

Expected: a direct 308 Location `https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai`, followed by relevant 200 HTML with that declared canonical.

Observed: **200 homepage HTML directly**, with title `Digi-Tec Performance Center | Independent Car Workshop Dubai`, canonical `https://digitecme.com/` and no Location header. Cloudflare Ray `a507b3b20a4fb88b-AMS`; response Date `Mon, 26 Oct 2026 07:21:03 GMT`; `cf-cache-status: DYNAMIC`. The main-text SHA256 matches the fresh homepage baseline.

The R4 checkpoint returned exit code 1: **337/339 assertions passed, 2 failed**, across 106 cases and 175 actual HTTP responses. Both failed assertions belong to this single request: expected direct redirect, and expected target canonical/indexability. The other 47 R4 source combinations passed. Earlier-rule critical probes, protected English oil probes, all target variants and all page/redirect controls passed.

R4 was supplied as rule ID `2873f5b6de04417d8a486b22cc878835`, submitted at 07:20:32.137Z and observed enabled in the dashboard at 07:20:34.742Z. Those configuration observations were supplied by the root operator; the failed HTTP response was independently captured by this verifier.

The reason this request missed the enabled rule is **unresolved**. Propagation, edge consistency and configuration explanations have not been established. No success may be inferred from the other 47 passing combinations.

The root operator was informed immediately and instructed to stop. The full reviewed 326-case post-deployment test was **not run**, as the instruction required it only after a passing R4 checkpoint. No retries, Cloudflare changes, cache purge or rollback were performed by the verifier. Rollback requires explicit user authorization.

Raw request/response evidence, captured homepage HTML and all assertions remain in the adjacent JSON/CSV/HTML files without modification.
