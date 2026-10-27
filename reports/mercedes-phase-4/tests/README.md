# Phase 4 offline SSR and scope verification

This check reads the independently built `baseline.local` and `candidate.local` copies. It writes evidence only below this directory and makes no HTTP requests. H3-01, H3-02 and S1 are the only allowed rendered changes. It does not publish, apply a patch, modify source, open WhatsApp or initiate a call.

Completed result: **75/75 assertions passed across 16 routes**. See [final summary](results/summary.md) and [complete evidence](results/results.json). Fourteen protected React roots match byte for byte; the two changed English roots match after reversing only the approved additions. The route-path manifest, sitemaps and six redirect/configuration definition artifacts also match.

That equality is between the two controlled builds. The [generated-artifact review](generated-artifact-review.md) separately compares both with the original input snapshot: five generated inputs change on each build, including four existing sitemap date values. **Complete build-artifact release remains on hold.** The strict original-input guard failure is retained in [the parent comparison](../built-input-comparison.json); the passing SSR check does not override it.

Run after both copies have completed prerendering and hosting-rule generation:

```powershell
& 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' reports/mercedes-phase-4/tests/verify-ssr-scope.mjs --baseline=reports/mercedes-phase-4/baseline.local --candidate=reports/mercedes-phase-4/candidate.local --out=reports/mercedes-phase-4/tests/results
```

The verifier captures complete prerendered HTML for the changed English hub/body pages and protected Arabic, BMW, Mercedes oil/diagnostics/mechanical and general-body controls. It checks the requested URL against its self-canonical, one H1, title/description/robots, all metadata, hreflang and every parsed JSON-LD block. Baseline and candidate metadata must match exactly. These are local HTML indexability checks, not Google indexing or live HTTP checks.

For the hub, it requires the unchanged workshop caption text with exactly two new contextual anchors and the correctly placed workshop telephone anchor. For body repair, it requires exactly the three hero/service-scope/final WhatsApp anchors to contain the approved recipient and exact encoded message, including six line breaks, plus the approved inspection/quotation paragraph. Reversing only those exact changes must reproduce the baseline root HTML byte for byte. Every control root must already match byte for byte. Client asset hashes outside the React root are not treated as content changes.

The local route-path manifest, sitemap and generated redirect definitions must also remain identical. This does not refresh the authenticated Cloudflare inventory or establish current production routing behavior.

## Build boundaries

The declared pipeline runs SSR compilation, route-path synchronization, client compilation, SSR recompilation, prerendering, hosting-rule generation and release checks. It writes `dist/`, `dist-server/`, `src/lib/routing-paths.json`, `public/sitemap.xml`, `cloudflare/routing-response-data.js`, `cloudflare/digitec-seo-router.js`, `cloudflare/mercedes-seo-router.js` and generated CSV files under `docs/`. The release wrapper additionally writes `release-qa.local/`. Run it only inside the controlled copies. Do not copy environment files or install/update dependencies for this check.

The broad production-router test validates generated local handlers, not the deployed Cloudflare Single Redirects. Any failure must be retained with the exact baseline/candidate command and output. A failure reproduced on the untouched baseline is an existing release blocker, not authorization to change routing in this phase. An SSR comparison pass does not override a failed required build/release check.

## Output and limits

`results.json` contains each assertion, hashes, observed metadata and CTA details; `summary.md` is the concise result. `html/baseline/` and `html/candidate/` retain the actual input documents. Comparison failures include the first differing byte and bounded surrounding context. This is a scoped static regression check. Responsive layout, hydration and click handling require the separate local preview review; production behavior, analytics delivery and Google indexing require independently authorized verification.

The [first harness run](initial-harness-path-diagnostic/results.json) passed all route comparisons but looked for three generated CSVs under `docs/` instead of their actual `docs/seo/` location. Only the verifier paths were corrected. The final rerun passed all checks; [run history](harness-run-history.json) retains that distinction. No application changes were made to resolve the harness error.
