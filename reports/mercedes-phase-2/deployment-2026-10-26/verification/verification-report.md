# Phase 2A public HTTP verification — stopped on R4 failure

**Outcome: R1–R3 passed their activation checkpoints. R4 failed one of its 48 source combinations. All four rules remain enabled according to the deployment operator. No rollback or further HTTP checks were performed after reporting the R4 failure. The final 326-case post-deployment matrix was not run.**

All times below are October 26, 2026, Asia/Dubai (UTC+4). The JSON ledger and raw captures retain exact UTC timestamps. Activation submission/enabled times were supplied by the root operator from authenticated Cloudflare UI observations. Cloudflare's exact internal activation time is not exposed.

| Rule | ID | Submitted / enabled observed | Public checkpoint window | Assertions | Newly enabled source combinations |
|---|---|---|---|---|---|
| R1 Arabic oil | `b835ca6b88b448d6809f01271dba491b` | 11:15:45.190 / 11:15:52.800 | 11:16:45.148–11:16:59.672 | 342/342 PASS | 48/48 direct 308 → intended 200 |
| R2 English body | `5fafd20389964771885d8d1194f01d77` | 11:17:42.913 / 11:17:45.750 | 11:18:04.884–11:18:20.349 | 341/341 PASS | 48/48 direct 308 → intended 200 |
| R3 Arabic battery | `239ab46545704096bec2628d8eedf9b9` | 11:19:04.747 / 11:19:07.456 | 11:19:27.316–11:19:43.295 | 340/340 PASS | 48/48 direct 308 → intended 200 |
| R4 Arabic mechanical | `2873f5b6de04417d8a486b22cc878835` | 11:20:32.137 / 11:20:34.742 | 11:20:57.868–11:21:13.586 | **337/339 FAIL** | **47/48** direct 308 → intended 200; one homepage 200 |

Each checkpoint contained 106 cases, including the newly active rule's full 48 combinations of apex/www × HTTP/HTTPS × slash/slashless × GET/HEAD × three query strings. Earlier and pending rules received two critical probes each. Each checkpoint also included eight protected English oil cases, all sixteen destination slash/method cases, twenty-two protected page controls, six broad Mercedes redirect controls, robots and sitemap. Across four real checkpoints there were 424 cases, 697 HTTP requests and 1,362 assertions; 1,360 passed and two failed on the same R4 request. These sequential checkpoints are not a substitute for the withheld full final matrix.

## Exact failure

At **11:20:59.755**, `GET https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair` returned **200 homepage HTML**, with homepage canonical `https://digitecme.com/`, rather than the expected 308 Location `https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai`.

The failed response carried `CF-Ray: a507b3b20a4fb88b-AMS`, `cf-cache-status: DYNAMIC` and server Date `Mon, 26 Oct 2026 07:21:03 GMT`. Its title was `Digi-Tec Performance Center | Independent Car Workshop Dubai`. Its main-text SHA256, `d07fff0f97bb2b18b3e85e16673c1e26fbb476689020cbb7f9aa8deab957c6dc`, matches the fresh preflight homepage. The exact request was `source-ar-mechanical-repair-6` in the R4 capture.

The other forty-seven R4 combinations passed. All R4 checkpoint destination content/canonical/indexability checks, earlier-rule critical probes, protected oil probes and protected page/redirect controls passed. The cause of the missed redirect is **unresolved**; propagation or edge consistency cannot be asserted from this evidence. No retries were performed to obscure or replace the failure.

## Before evidence and scope limits

The fresh preflight, `../../evidence/http/pre-2026-10-26T07-06-59-812Z/capture.json`, ran 11:06:59.815–11:07:45.367 and passed 733 assertions across 326 cases/564 HTTP requests. All 192 proposed source combinations still ended at homepage 200. The same failing R4 URL was homepage 200 in that baseline, observed at 11:07:20.431.

For each passing new source request, the captured result was exactly one direct 308 to the reviewed HTTPS apex destination, retaining the original query string, followed by relevant direct 200 HTML. GET destination canonical and indexability checks passed, with unchanged destination text/metadata against preflight. No loops or unintended intermediate hops were observed in passing combinations.

The protected October 21 English oil redirect retained its direct 308/query behavior in the eight critical cases at each checkpoint, and its service-page content controls remained unchanged. The fresh preflight had all forty-eight protected oil cases. Because the final full test was withheld after R4 failed, **a forty-eight-case protected oil post-deployment result is not claimed**.

Four Cloudflare edge suffixes were observed in the staged responses: AMS, CDG, HKG and FRA. They came from one verifier runtime; this does not represent independent UAE/mobile clients or guarantee global propagation.

The earlier R1 default-sandbox attempt is retained in `evidence/checkpoint-R1-2026-10-26T07-16-10-753Z/`. All 108 attempts there returned transport status 0/ENOTFOUND; no actual HTTP response existed. It is explicitly inconclusive and excluded from the real checkpoint totals. The subsequent R1 run used approved public network access, as did R2–R4. Synthetic fixtures are separately marked and excluded from production findings.

## Evidence files

- `activation-verification-ledger.json`: IDs, submission/enabled observation boundaries, exact HTTP windows, counts and result.
- `new-rule-before-after-192-cases.csv`: each new rule's 48 activation-checkpoint combinations paired with the fresh before-state, including the one failure. Observations occurred sequentially at each activation.
- `real-capture-sha256.json`: SHA256 of the four real checkpoint captures.
- `evidence/checkpoint-R1-2026-10-26T07-16-45-143Z/`: R1 real PASS.
- `evidence/checkpoint-R2-2026-10-26T07-18-04-882Z/`: R2 real PASS.
- `evidence/checkpoint-R3-2026-10-26T07-19-27-311Z/`: R3 real PASS.
- `evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/`: R4 real FAIL; `FAILURE.md` details the failed request.

Each real evidence directory contains `capture.json` with all chained responses/headers/metadata, `requests.json`, `cases.csv`, `assertions.csv`, HTML captures under `html/`, `robots.txt` and `sitemap.xml`. The exact failing homepage body is `evidence/checkpoint-R4-2026-10-26T07-20-57-862Z/html/source-ar-mechanical-repair-6.html`.

No verifier operation changed Cloudflare configuration, website content, metadata, canonicals, indexing or cache. All original raw captures remain preserved. The deployment operator is preparing the separate configuration comparison. Any rollback requires explicit user approval under the authorized release instructions.
