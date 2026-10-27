# DIGI-TEC Phase 2B — read-only R4 investigation

**Current public verification passes: all 192 new-redirect combinations, including all 48 R4 combinations, passed; twelve additional exact R4 repeats also passed.** The earlier Phase 2A homepage response remains preserved as a real historical failure. It was not reproduced in these current observations, and its cause is **unproven**. No live change, rollback, cache purge or indexing action was performed during this investigation.

All observations below are **26 October 2026**. Dubai is UTC+4. Findings describe the sampled requests and authenticated displayed configuration; they do not establish worldwide consistency or Google indexing.

## 1. Current R4 status

The exact request is GET `https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair`, without a trailing slash or query.

| Observation | UTC request time | Dubai request time | Response and CF-Ray |
| --- | --- | --- | --- |
| Preserved Phase 2A failure | 07:20:59.755 | 11:20:59.755 | Homepage **200**, no Location, homepage canonical; `a507b3b20a4fb88b-AMS`. |
| Current full matrix | 07:35:34.522 | 11:35:34.522 | Direct **308** to the intended Arabic mechanical service, then relevant **200** with its expected canonical; `a507c90d4dcfd593-AMS`. |

## 2. Full 192-case results

The [full current matrix](matrix-summary.md) ran **07:35:12.033–07:36:01.733 UTC / 11:35:12.033–11:36:01.733 Dubai**: **852/852 assertions passed, 326 cases, 612 actual HTTP responses**, with no transport error, unsafe follow or loop.

| Rule | Full source combinations | Direct 308 → intended 200 | Exact Location/query retained | GET target canonical/indexability |
| --- | ---: | ---: | ---: | ---: |
| R1 Arabic oil | 48 | 48/48 | 48/48 | 24/24 |
| R2 English body | 48 | 48/48 | 48/48 | 24/24 |
| R3 Arabic battery | 48 | 48/48 | 48/48 | 24/24 |
| R4 Arabic mechanical | 48 | 48/48 | 48/48 | 24/24 |

Each 48-case set is **apex/www × HTTP/HTTPS × slash/slashless × GET/HEAD × empty/campaign/repeated-encoded-blank query**. Across all four rules, each query group contains 64 cases. Every source used one direct redirect followed by relevant 200 HTML, without a homepage or host-normalization intermediate hop.

The protected October 21 English oil redirect passed all 48 combinations. All 48 broad Mercedes controls matched the fresh preflight, including 16 known out-of-scope slash homepage fallbacks. All sixteen destination slash/method cases returned direct 200; their eight GET cases retained expected content, metadata, canonical and indexability. All 22 protected page controls matched preflight. Robots and sitemap returned 200; robots text was unchanged. Technical indexability does not establish Google-selected canonical or index inclusion.

## 3. Previously failing request repeats

The [twelve additional repeats](repeats/README.md) ran **07:35:52.840–07:37:53.755 UTC / 11:35:52.840–11:37:53.755 Dubai**. All twelve returned the required 308 and all twelve target GETs returned the intended 200 page with unchanged expected text, correct canonical and no index exclusion. Six used default Node fetch; six submitted `Connection: close`; ten-second gaps separated observations. No cache-busting query or cache-control request header was used. Actual socket reuse was not instrumented.

The repeats add **24 GET requests** separately from the full matrix. Source CF-Ray suffixes included HKG, AMS, FRA and CDG. The common AMS label on the historical failure and a current success does not establish the same edge instance, configuration version or client network path.

## 4. Cloudflare configuration comparison

The [fresh authenticated inventory](cloudflare/current-inventory.json) and [seven readbacks](cloudflare/readbacks.json), captured **07:35:29.939–07:35:51.673 UTC / 11:35:29.939–11:35:51.673 Dubai**, show all seven rules enabled, with functional definitions and order unchanged from Phase 2A. Capacity remains **7/10**.

| Order | Rule | ID |
| --- | --- | --- |
| 1 | Protected October 21 English oil | `5addb0c068414fb5b985a869ded26c68` |
| 2 | Existing broad Mercedes | `dbe42693423442afbc3bab9b993242a7` |
| 3 | R1 Arabic oil | `b835ca6b88b448d6809f01271dba491b` |
| 4 | R2 English body | `5fafd20389964771885d8d1194f01d77` |
| 5 | R3 Arabic battery | `239ab46545704096bec2628d8eedf9b9` |
| 6 | R4 Arabic mechanical | `2873f5b6de04417d8a486b22cc878835` |
| 7 | Existing www | `9781b1ef743f4ffbaadbe5cb3250eeca` |

The [seven-rule comparison](cloudflare/seven-rule-comparison.json) confirms matching IDs, enabled states, functional definitions and order against the Phase 2A after-state; the [conflict checker](cloudflare/conflict-check.json) passed 799 checks. The failed literal host/method/path tuple matches R4 in the saved definitions. The original Mercedes rules exclude it; the www condition is false for its apex host. No displayed expression, destination, status/query setting or ordering defect was found. This is functional dashboard readback, not a raw ruleset/version export or proof of what the historical edge request evaluated.

### Supporting routing and normalization layers

The [supporting-layer comparison](cloudflare/routing-layers-comparison.json), completed at **07:40:35.018 UTC / 11:40:35.018 Dubai**, records nine layers matching their recorded Phase 2A values:

- No URL Rewrite, Configuration or Origin Rules displayed; zero Page Rules, zero Bulk Redirect Lists and no zone Worker routes.
- Cloudflare URL normalization: incoming enabled, normalization to origin disabled.
- Apex/www: proxied CNAMEs to `dubai-performance-art.lovable.app`, TTL Auto.
- Always Use HTTPS and Automatic HTTPS Rewrites enabled; UI displays the last Always Use HTTPS change as six months ago.

These are matching snapshots. No audit log or historical per-edge version export was available, so an intermediate change between observations cannot be excluded. Supplementary current observations about cache/header/compression-rule absence do not establish historical values absent an earlier matching field. The [source-integrity check](source-integrity.json) confirms all 283 protected source files, ten reviewed artifact/baseline hashes and four Phase 2A checkpoint captures remain unchanged.

## 5. Remaining inconsistencies and cause limits

No R1–R4 homepage fallback was reproduced in the current 192-case matrix. The known broad-alias slash fallbacks `/services/mercedes-service-dubai/` and `/best-mercedes-workshop-dubai/` remain unchanged, outside the four redirects' scope. Their preservation checks passed; these aliases were not newly fixed. The historical R4 miss remains an unresolved inconsistency between observations.

No Search Console inspection was performed in Phase 2B. The current canonical/indexability checks concern public HTML/HTTP eligibility, not Google-selected canonical, index inclusion or ranking recovery; existing Phase 2A search-index uncertainties remain unresolved by these tests.

The [historical analysis](analysis/phase2a-failure-analysis.md) establishes one real homepage response, not a verifier-only assertion artifact. It began 25.013 seconds after R4's enabled state was first observed; that is **not a measured propagation duration**, because exact server activation time was unavailable. Forty-seven other R4 variants passed in the original checkpoint. An AMS-labeled request passed 341 milliseconds later, but used a different method/query tuple. The [current assessment](analysis/current-r4-assessment.md) combines that history with the new matrix, repeats and configuration readbacks.

The current evidence supports describing the failure as a **transient, currently non-reproducible observation**. Propagation or edge consistency remains a plausible but unconfirmed explanation. The historical response was `DYNAMIC`, without Age, and carried a no-cache policy; it does not support a simple Cloudflare cached-homepage HIT explanation. No specific internal routing layer or root cause has been established. Current successful responses neither erase the historical failure nor prove global convergence.

## 6. Recommendation and evidence

**Retain R4 enabled.** Current configuration and public responses provide no demonstrated defect requiring correction or rollback. Disabling R4 would restore the known homepage fallback for its source aliases. No correction, rollback or other live action was taken or newly authorized by this report.

Useful later validation is bounded read-only GET/HEAD sampling from actual UAE mobile and desktop connections on different ISPs, retaining the exact tuple, UTC time, status/Location, CF-Ray and body/canonical evidence. If the miss recurs, preserve the new Ray alongside historical `a507b3b20a4fb88b-AMS` for request-specific Cloudflare trace/log/support investigation. No monitoring automation or schedule was created.

The primary evidence is [matrix-summary.json](matrix-summary.json), the [full matrix capture](http/post-2026-10-26T07-35-12-026Z/capture.json), [twelve-repeat capture](repeats/repeat-2026-10-26T07-35-52-836Z/capture.json), [current rule inventory](cloudflare/current-inventory.json) and [historical analysis](analysis/phase2a-failure-analysis.json). Each retains raw timestamps, headers and body/metadata evidence or pointers to the preserved bodies. Original Phase 2A evidence was only read; it was not modified.
