# Narrow hosting correction — review copy only

This package is local and has not been installed, activated or deployed. It proposes two logical HTTP rules, represented by three exact source paths:

| Logical rule | Exact source path(s) | Destination | Status |
|---|---|---|---:|
| Known obsolete Mercedes oil alias | `/brands/mercedes-benz-service-dubai/oil-change` and the same path ending `/` | `https://digitecme.com/services/mercedes-oil-change-dubai` | 308 |
| Dedicated service slash normalization | `/services/mercedes-oil-change-dubai/` | `https://digitecme.com/services/mercedes-oil-change-dubai` | 308 |

Only GET and HEAD on `digitecme.com` or `www.digitecme.com` match. Exact source-path matching avoids broad interception. Query strings, repeated parameters and click IDs are preserved. Canonical destinations and all unrelated pages/methods are passed through without modification. The alias currently returns homepage HTML with a homepage canonical and HTTP 200; the target slash currently returns the correct service HTML and HTTP 200.

The destination retains the established HTML canonical, sitemap and internal-link preference. Authenticated URL Inspection currently shows Google selecting the *slash* URL as indexed, while the declared slashless URL is crawled but not indexed. This proposal consolidates the existing declared preference; it does not change the content owner or silently switch canonical ownership to a different page. Google's selection may take time to change after any authorized activation. No ranking improvement or recovery is promised.

The repository already prepares these exact behaviors in its wider production routing code. No source edit was needed. This small review copy isolates the oil-service correction so that an operator can consider only these rules instead of activating unrelated prepared redirects. Do not stack a new Worker on top of an existing Worker without reviewing the actual host/route setup; if production uses another redirect mechanism, translate the same exact mappings there. Installation requires explicit authorization and verification of the active production configuration.

Before authorized activation, confirm the slashless destination still returns 200 with the complete service content, the declared slashless canonical, index/follow and working booking links. Retain the existing sitemap/internal-link ownership; do not redirect the blog, generic oil page or Mercedes hub. After activation, verify each source GET/HEAD returns one permanent hop to that destination, preserves query strings, and the destination remains 200. Recheck representative Mercedes diagnostics, PPF and tuning URLs and mutation requests. Rollback removes only these exact mappings, not other existing routing.

The offline test script and `local-qa.json` verify the packaged review copy; they do not alter or establish production behavior. Monitor both target URL forms together in exact-query/page GSC data to follow consolidation, and separately inspect each URL's canonical/indexing status. Do not use this technical finding as a causal explanation for 45.5: the 24-hour ranking sample and query mix must be assessed independently.
