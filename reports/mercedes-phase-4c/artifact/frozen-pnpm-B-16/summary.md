# Offline SSR/scope verification

Result: **FAIL** — 73/75 assertions; 16/16 route documents compared.

Started 2026-10-26T10:57:24.223Z; finished 2026-10-26T10:57:24.290Z (UTC). No network requests or source/configuration writes.

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

- routing and public URL preservation: dist/sitemap.xml
- routing and public URL preservation: public/sitemap.xml

Evidence: [complete assertions and observed metadata](results.json), original HTML in `html/baseline/` and `html/candidate/`.

- Prerendered local SSR output only; not Google-selected canonical/indexing or production HTTP.
- Exact protected React-root checks do not cover interactive hydration or responsive visual layout.
- These comparisons do not waive any failing required release-pipeline checks.
- Generated files are read only; no app source, configuration or contact action is modified or invoked.
