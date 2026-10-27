# Phase 2B full HTTP matrix

**PASS: 852/852 assertions across 326 cases and 612 actual HTTP responses.** The run observed 26/10/2026, 11:35:12–26/10/2026, 11:36:01 Asia/Dubai (exact UTC times in JSON). No configuration, cache, content or indexing changes were performed.

| Group | Cases | Assertions passed | Failed |
|---|---:|---:|---:|
| source | 192 | 480/480 | 0 |
| protected-oil | 48 | 120/120 | 0 |
| protected-repair | 48 | 96/96 | 0 |
| destination | 16 | 64/64 | 0 |
| control | 22 | 88/88 | 0 |

Infrastructure adds four assertions outside the per-case groups.

| New rule | Direct 308 → intended 200 | Exact Location/query preserved | GET target self-canonical/indexable |
|---|---:|---:|---:|
| ar-oil-change | 48/48 | 48/48 | 24/24 |
| en-body-repair | 48/48 | 48/48 | 24/24 |
| ar-battery-replacement | 48/48 | 48/48 | 24/24 |
| ar-mechanical-repair | 48/48 | 48/48 | 24/24 |

Each rule received all 48 combinations: apex/www × HTTP/HTTPS × trailing slash/no slash × GET/HEAD × empty/campaign/repeated-encoded-blank query. Across the four rules, the empty, campaign and complex query groups each contained 64 cases. Every passing source chain has exactly two responses, with no homepage or host-normalization intermediate hop.

The October 21 English oil route passed all 48 combinations. All 48 broad Mercedes redirect controls matched the fresh preflight, including the 16 documented pre-existing slash variants that end at the homepage. All 16 destination slash/method combinations were direct 200; all eight destination GET cases retained their preflight content/metadata and declared self-canonical/indexable HTML. All 22 protected page controls matched preflight. robots.txt/sitemap.xml returned 200 and robots text matched baseline.

## Prior R4 failure compared with the current response

The exact formerly failing request was GET `https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair`.

| Observation | Request time UTC | Response | Canonical | CF-Ray |
|---|---|---|---|---|
| Original Phase 2A checkpoint | 2026-10-26T07:20:59.755Z | 200 homepage; no Location | https://digitecme.com/ | a507b3b20a4fb88b-AMS |
| Current Phase 2B full matrix | 2026-10-26T07:35:34.522Z | 308 Location https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai, followed by 200 | https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai | a507c90d4dcfd593-AMS |

The exact request now passes, and all other R4 combinations passed in this full matrix. The earlier 200 homepage remains valid historical evidence and has not been overwritten or reclassified. This observation alone does **not** establish why that response occurred or prove worldwide convergence.

## Evidence and reproducibility

- Capture and raw headers/timestamps: `http\post-2026-10-26T07-35-12-026Z/capture.json` and `requests.json`.
- Per-case assertions and chains: `assertions.csv`, `cases.csv` and locally derived `matrix-detail.csv` in that directory.
- All 305 GET case-response HTML bodies are saved under its `html/` directory; HEAD responses have no body. Infrastructure bodies are `robots.txt` and `sitemap.xml`.
- Exact current R4 source HTML: `html/source-ar-mechanical-repair-144-hop0.html`; followed target HTML: `html/source-ar-mechanical-repair-144-hop1.html`.
- Structured group/rule/query/canonical/content comparison and original/current response headers: `matrix-summary.json`.
- Copy provenance: `tests/verifier-copy-provenance.json`. The reviewed verifier SHA256 remains `6670b2a4227d6810efe9528096aceebf72f58820b8f88bb33bfc51060611d45a`. Only reviewed-root/output paths and expanded GET HTML storage differ; case generation, request semantics and assertions are unchanged. Two separate offline fixture checks passed before the real run; SYNTHETIC evidence is not a live result.

Capture SHA256: `9fc2b79a2b1d953f0ce1ac1ca7c413a6088a50712810a6f91bbb119908f70d8a`. Baseline: `reports/mercedes-phase-2/evidence/http/pre-2026-10-26T07-06-59-812Z/capture.json`.

Observed Cloudflare edge suffixes were CDG, FRA, AMS, HKG. They came from one runtime and do not establish independent UAE/mobile or global coverage. The current declared canonical/indexability findings do not establish Google-selected canonicals or index inclusion. Configuration consistency is being reviewed separately by the deployment operator.
