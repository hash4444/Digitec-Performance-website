# Fresh production baseline

Read-only public collection: 26 October 2026, 10:20:06–10:20:19 UTC (14:20 Dubai). No production, Cloudflare, cache or indexing changes were made.

The [raw production capture](http/2026-10-26T10-20-06-242Z/capture.json) contains 42 page/file GET/HEAD cases plus 14 observed-asset responses: **56 requests, zero transport errors**. Raw headers, response times, CF-Ray identifiers and bodies are retained beside it. Fetched JavaScript is inert text evidence and was not executed.

The eight English/Arabic Mercedes hub, body, diagnostics and mechanical pages return direct 200 with intended page content/canonicals; all 16 GET/HEAD cases pass the saved [baseline checks](baseline-summary.json). The public Vite manifest is valid JSON with 145 entries. The public sitemap contains 1,005 unique URLs. Fresh production, rather than the stale root `dist`, establishes the date and asset baseline.

| Observation | Result |
| --- | --- |
| Public application entry | `/assets/index-cGjtMRI1.js` |
| Public CSS | `/assets/index-CwEpzSrs.css` |
| Brand components | `/assets/BrandPage-CAb6TprA.js`, `/assets/BrandServicePage-SEA62kT0.js` |
| Public `.vite/manifest.json` SHA-256 | `ed88f099b805ad2e0cdb0753fdf41f668402ca515984f358dee9ee22b61930f4` |
| Missing English/Arabic page | 200 homepage fallback observed |
| Missing `.js` file | 404 plain text observed |
| `/404.html`, `/404-ar.html` | 200 error documents, `noindex, follow`, no canonical |
| `/_worker.js` | 200 downloadable JavaScript; execution not established |
| `/_headers` | 200 homepage HTML; no active configuration inferred |

The [initial local comparison](production-comparison-shared-deps-snapshot.json) preserves the earlier exploratory build state. Its fresh Phase 4B unpatched build exactly matches the public manifest and all four fetched application assets; historical root/Phase 4 artifacts differ. The [final comparison](production-comparison.json) also includes the selected isolated `production-matched.local` frozen pnpm baseline/candidate/B builds, marked `selectedCohort: true`, with lock hash `5764ae30d5b03c0bfbf425768df32c23646b88720d2062988c6b04b868dd085f` and actual build-log provenance. All three selected builds pass 19 build commands and two TypeScript configurations. The selected baseline manifest differs from public, while the eight relevant pages' main text and compared metadata match. No complete production source/dependency attestation or cause for hash differences is inferred from the cohort name.

All compared 1,005 sitemap URLs/order remain identical. A retains current public dates. B changes exactly two English page dates to 26 October. Every manifest file/import and checked HTML/error-document app-asset reference exists within each selected artifact. Read the [packaging review](../review/release-packaging-options.md) before choosing either complete application release; selective compiled-file publication is not recommended.

The complete [redirect protection run](redirects-http/post-2026-10-26T10-22-00-253Z/capture.json), started 10:22 UTC, passed **852/852 assertions, 326 cases, 612 GET/HEAD responses**. It includes 192 R1–R4 cases, 48 protected oil cases, 48 broad Mercedes cases, 16 destination cases and 22 controls. Its [verifier provenance](redirect-verifier-provenance.json) records the minimally copied reviewed script and output-path change. The verifier's `post` stage checks already active Phase 2A redirects; this run is a Phase 4B baseline check and does not imply a new content deployment. No rule inventory was refreshed through public HTTP.

Use the [packaging review](../review/release-packaging-options.md) for release boundaries. All evidence is observational and time bounded. No local directory is assumed to be a complete deployed artifact.
