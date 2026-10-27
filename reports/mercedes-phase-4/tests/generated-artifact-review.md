# Generated artifact review

**Complete build-artifact release remains on hold.** Both builds regenerate five existing input artifacts. The three approved source edits remain a separate scope; this review adds no release authorization. No generated/source/build output was modified.

Reviewed 2026-10-26T09:16:59.280Z / 2026-10-26T13:16:59.280+04:00. Offline only.

- Routing response data: all 1,256 valid paths, 253 legacy paths and 94 localized fallback pairs match the original and each other exactly. EN/AR 404 HTML matches after normalizing only Vite asset filename hash suffixes. Original → baseline updates JS and CSS hashes; baseline → candidate updates the JS hash.
- Sitemap: all 1005 URL entries and ordering remain unchanged. Baseline and candidate are identical. Four lastmod values differ from the original even on the unchanged baseline:
  - `https://digitecme.com/ar/brands/mercedes-benz-service-dubai`: `2026-10-05` → `2026-10-20`.
  - `https://digitecme.com/ar/services`: `2026-10-12` → `2026-10-20`.
  - `https://digitecme.com/brands/mercedes-benz-service-dubai`: `2026-10-05` → `2026-10-20`.
  - `https://digitecme.com/services`: `2026-10-12` → `2026-10-20`.
- Route/schema CSV: 1256 rows; path/canonical sequence unchanged; candidate byte-identical to baseline. 90 cells differ from the old original, in column(s): `Inbound internal links`, `Title`, `After schema`. Exact cells are retained in JSON.
- Validation JSON: all three versions retain `passed: true`. Protection-report changes include timestamps and current client/chunk/HTML fingerprints; exact JSON pointers are retained. Query-report changes are `/internalLinksChecked`: 44537 → 44666 (original → baseline), with `/internalLinksChecked`: 44666 → 44668 (baseline → candidate). These are generated observations, not timing-only diffs.

The earlier nine-file equality result compared baseline with candidate, excluded `cloudflare/routing-response-data.js`, and did not establish equality to the original generated artifacts. SSR metadata and JSON-LD preservation on the 16 scoped pages remain covered by [the 75/75 comparison](results/summary.md).

Required next decision: review the four sitemap date changes and the complete artifact packaging policy before any later release. Do not silently copy these generated deltas into the original checkout or alter routing/sitemap logic in this phase.

[Full hashes, export/HTML checks, sitemap rows, CSV cells and validation-report pointers](generated-artifact-review.json).
