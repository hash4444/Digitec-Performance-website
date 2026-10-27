# Option A: full SSR and date-scope comparison

**PASS** — 2530/2530 assertions; 1256/1,256 routes read. Finished 2026-10-26T10:38:41.107Z / 2026-10-26T14:38:41.107+04:00.

Frozen pnpm reproduction cohort; no assertion of identical public/build-environment bytes.

- Protected title, description, H1, canonical, robots, language, all metadata, hreflang and parsed JSON-LD unchanged on **1256/1,256** routes.
- **1254/1,254** unaffected React roots match byte for byte; no body normalization is used.
- Only the English Mercedes hub and body page differ, and exact reversal of approved links/phone/intake changes reproduces their baseline roots.
- Both sitemap files preserve all **1,005 URL entries/order** and every date; no exceptions.
- Prerender generator, route-path manifest, redirect definitions and routing-data arrays remain unchanged.

The [unmodified targeted verifier](../frozen-pnpm-A-16/results.json) passes **75/75** with no date or content exceptions beyond the exact approved page changes.

[All assertions and protected values](results.json); [1,256 route fingerprint rows](route-results.csv).

- Local prerendered SSR and generated files only. No live routing, Cloudflare or Google indexing checks.
- No protected body bytes are normalized: 1254 unaffected roots must be exactly equal.
- Two changed roots are accepted only after exact approved-change reversal in the independent targeted verifier and matching root hashes.
- Client bundle filenames outside the React root are outside metadata equality, with deployment/package matching assessed separately.
- This comparison does not grant implementation or deployment approval for the additional route-lastmod metadata proposal.
