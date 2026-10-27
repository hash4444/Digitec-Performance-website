# Phase 2B — twelve exact R4 request repeats

Captured 2026-10-26T07:35:52.840Z–2026-10-26T07:37:53.755Z UTC (2026-10-26T11:35:52.840+04:00–2026-10-26T11:37:53.755+04:00 Dubai). Read-only, bounded investigation; no production change.

The twelve independent GET observations used the exact earlier failed URL without a trailing slash or query. Six used ordinary Node fetch and six explicitly requested Connection: close. The User-Agent matches Phase 2A. No cache-control request header, cache-busting query, cookie, purge or configuration change was used. Requests were sequential with ten-second gaps; an exact expected 308 was followed only to the intended target.

Result: **12/12 passed**, **0/12 failed**; source statuses {"308":12}. Target GETs: 12. Source CF-Ray colos: HKG, AMS, FRA, CDG.

The original 07:20:59.755 UTC Phase 2A failure remains retained: homepage 200, no Location, canonical https://digitecme.com/, CF-Ray a507b3b20a4fb88b-AMS. Repeated observations do not erase or explain that failure. The cause remains unresolved.

Each request-NN.json independently records full response headers, request/response times in UTC/Dubai, CF-Ray/colo, status and Location, saved source/target HTML, body/main-text hashes, title, H1, canonical and indexability checks. observations.csv is the compact request ledger; capture.json contains the complete bounded run. Body hashes represent decoded UTF-8 HTML rather than compressed wire bytes.

Limits: one runtime/network; default fetch socket reuse was not measured; no global or UAE/mobile consistency, indexing or ranking conclusion.
