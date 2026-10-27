# Isolated local QA — 21 October 2026

Result: **PASS for the complete declared production pipeline and all additional available regression checks.** This is a baseline investigation build, with no source correction applied and no deployment.

The build ran from a copied source tree at `qa/build`, using the repository's installed dependencies through Node's ancestor resolution. No dependency installation or mutation was required. A Windows junction attempt failed; it was unnecessary and was not retried with elevated permissions. An isolated copy of the environment file was removed after compilation. Shared source/public/scripts/cloudflare/docs hashes were identical before and after the run (`sourcePreserved: true`).

## Verified

- Both application and tooling TypeScript checks.
- Every command in `package.json`'s production build: fresh SSR prepass, routing path synchronization, client build, final SSR, prerender, hosting generation, hosting/router tests, SEO/schema/sitemap, PPF, paint correction/protection, query release, contact attribution, PPF enquiries, oil change, suspension, transmission and social metadata.
- Fresh prerender: **1,256 real React routes; 1,005 canonical sitemap URLs**.
- Global query release: **44,666 internal links** checked.
- Additional master SEO, routing response, tuning and paint-care cluster regressions.
- Oil validation: SSR/canonical/indexability/sitemap, 10 visible/schema FAQs, 8 reciprocal brand links and 15 local assets.
- Tuning preservation: 16 source vehicles, 67 source packages / 62 public packages, nine model owners.
- Fresh targeted pages: one H1, index/follow, one sitemap entry and slashless self-canonical for Mercedes oil, generic oil, Mercedes oil article and Mercedes brand hub. See `targeted-fresh-build.json`.
- Generic oil, article and brand hub link directly to the dedicated Mercedes oil service route. The fresh hub build contains its 20 October metadata, unlike the stale shared `dist` noted elsewhere.

Two optional regressions initially lacked isolation fixtures: the historical router files and the production-build summary expected by the paint-care script. After copying the historical fixtures and deriving that summary from the successful actual build steps, both scripts passed unchanged. These were QA setup omissions, not product failures. Initial and rerun logs are retained.

Build warnings include React's existing `fetchPriority` property warning, a large client chunk and the existing NotFound static/dynamic import notice; they did not fail the build. No browser visual regression was performed by this QA subtask; root handles live/browser evidence. Passing local QA does not establish Google's selected canonical, rankings or recovery.

## Evidence

- `qa-results.json`: all commands, exit codes and log locations; final failures empty.
- `logs/`: full build/test stdout and stderr, plus fixture-complete reruns.
- `shared-source-before.json` and `shared-source-after.json`: matching hashes.
- `targeted-fresh-build.json`: initial rendered metadata, sitemap and service-link records.

No commit, push, production mutation or deployment occurred.
