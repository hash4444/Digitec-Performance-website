# Offline SSR/scope verification

Result: **FAIL** — 72/75 assertions; 16/16 route documents compared.

Started 2026-10-26T08:59:47.589Z; finished 2026-10-26T08:59:47.656Z (UTC). No network requests or source/configuration writes.

| Route | Scope | Result |
|---|---|---|
| `/brands/mercedes-benz-service-dubai` | Approved content changes only | PASS |
| `/services/mercedes-body-repair-dubai` | Approved content changes only | PASS |
| `/ar/brands/mercedes-benz-service-dubai` | Unchanged control | PASS |
| `/ar/services/mercedes-body-repair-dubai` | Unchanged control | PASS |
| `/brands/bmw-service-dubai` | Unchanged control | PASS |
| `/ar/brands/bmw-service-dubai` | Unchanged control | PASS |
| `/brands/bmw-service-dubai/body-repair` | Unchanged control | PASS |
| `/ar/brands/bmw-service-dubai/body-repair` | Unchanged control | PASS |
| `/services/mercedes-oil-change-dubai` | Unchanged control | PASS |
| `/ar/services/mercedes-oil-change-dubai` | Unchanged control | PASS |
| `/services/mercedes-diagnostics-dubai` | Unchanged control | PASS |
| `/ar/services/mercedes-diagnostics-dubai` | Unchanged control | PASS |
| `/services/mercedes-mechanical-repair-dubai` | Unchanged control | PASS |
| `/ar/services/mercedes-mechanical-repair-dubai` | Unchanged control | PASS |
| `/services/car-body-repair-dubai` | Unchanged control | PASS |
| `/ar/services/car-body-repair-dubai` | Unchanged control | PASS |

The body drafts target `97143402223` and must contain the exact approved message with six encoded line breaks. The hub links and workshop telephone are checked in their existing content locations. All metadata/JSON-LD and routing-definition comparisons require equality.

## Failures

- routing and public URL preservation: docs/permanent-redirects.csv — ENOENT: no such file or directory, open 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-4\baseline.local\docs\permanent-redirects.csv'
- routing and public URL preservation: docs/mercedes-permanent-redirects.csv — ENOENT: no such file or directory, open 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-4\baseline.local\docs\mercedes-permanent-redirects.csv'
- routing and public URL preservation: docs/removed-brand-urls.csv — ENOENT: no such file or directory, open 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-4\baseline.local\docs\removed-brand-urls.csv'

Evidence: [complete assertions and observed metadata](results.json), original HTML in `html/baseline/` and `html/candidate/`.

- Prerendered local SSR output only; not Google-selected canonical/indexing or production HTTP.
- Exact protected React-root checks do not cover interactive hydration or responsive visual layout.
- These comparisons do not waive any failing required release-pipeline checks.
- Generated files are read only; no app source, configuration or contact action is modified or invoked.
