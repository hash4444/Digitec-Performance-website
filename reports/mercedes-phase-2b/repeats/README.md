# Phase 2B — bounded repeats of the exact failed R4 request

**12/12 repeated source GETs passed** between **07:35:52.840 and 07:37:53.755 UTC**, or **11:35:52.840–11:37:53.755 Dubai**, on 26 October 2026. Every source response was one direct 308 to the intended target; each independently followed target returned relevant 200 HTML with the expected canonical, no index exclusion and the unchanged expected target main-text hash.

The exact source was `https://digitecme.com/ar/brands/mercedes-benz-service-dubai/mechanical-repair`, without a trailing slash or query. Twelve sequential observations used ten-second gaps: six ordinary Node fetch requests and six Node fetch requests with `Connection: close`. The User-Agent matched Phase 2A. No cache-busting query, cache-control request header, cookie, purge, browser or configuration mutation was used. Source CF-Ray suffixes included HKG, AMS, FRA and CDG.

The connection groups describe the submitted transport headers. Actual socket/TLS-session reuse was not instrumented: `Connection: close` requests closure after the response and does not independently prove that the initiating request used a fresh socket. This is one runtime/network, not twelve independent clients or a global/UAE/mobile consistency study.

The earlier Phase 2A failure remains retained and unexplained: the exact GET at 07:20:59.755 UTC returned homepage 200, no Location, homepage canonical and CF-Ray `a507b3b20a4fb88b-AMS`. These later passes do not erase that response or establish its cause.

- [Run summary](repeat-2026-10-26T07-35-52-836Z/README.md)
- [Complete capture and response headers](repeat-2026-10-26T07-35-52-836Z/capture.json)
- [Twelve-row request ledger](repeat-2026-10-26T07-35-52-836Z/observations.csv)
- [Bounded read-only script](repeat-exact-r4.mjs)

The run directory also contains twelve separate request JSON records and 24 saved source/target HTML bodies. All 24 saved body SHA256 values were checked against their records with no mismatch. Capture SHA256: `d36b201132e6ac055e9b86bd4ffbc6da6b7fedbea4d1d715b07806e29ea69965`. HTML hashes represent decoded UTF-8 bodies, not compressed wire bytes.

No Phase 2A file was edited and no production change was made by this investigation. No Google indexing, canonical-convergence, ranking-recovery or full-release completion conclusion is drawn from these repeats.
