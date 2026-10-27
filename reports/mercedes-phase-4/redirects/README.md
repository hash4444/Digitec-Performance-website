# Phase 4 existing redirect protection

**PASS: 852/852 assertions across 326 cases and 612 actual GET/HEAD responses.** Observed 26/10/2026, 12:56:52–26/10/2026, 12:57:40 Asia/Dubai. This is a read-only pre-implementation check of existing live behavior, not a Phase 4 deployment result.

| Group | Cases | Assertions passed | Failed |
|---|---:|---:|---:|
| source | 192 | 480/480 | 0 |
| protected-oil | 48 | 120/120 | 0 |
| protected-repair | 48 | 96/96 | 0 |
| destination | 16 | 64/64 | 0 |
| control | 22 | 88/88 | 0 |

Four additional infrastructure assertions passed for robots/sitemap responses, robots policy and unchanged robots text. Each R1–R4 family passed all 48 combinations of apex/www, HTTP/HTTPS, slash/no slash, GET/HEAD and three query strings. All 192 source cases returned exactly one direct 308 to the approved relevant 200 destination with the raw query preserved, correct GET canonical and indexability; no loop or unintended chain was observed.

The protected October 21 English oil redirect passed all 48 combinations. All 48 broad Mercedes controls retained preflight behavior, including the 16 documented pre-existing slash fallbacks outside the release. All 16 destination and 22 protected content cases passed. No existing rule was edited or account action performed.

Raw evidence is under [http/post-2026-10-26T08-56-52-592Z](./http/post-2026-10-26T08-56-52-592Z), including capture.json, requests.json, cases.csv, assertions.csv, robots.txt, sitemap.xml and 305 GET-hop HTML bodies. [Structured summary](protection-summary.json) retains exact UTC times, groups and capture hash. The [verifier provenance](verifier-provenance.json) identifies the exercised full 326 verifier; only its evidence output path changed.

The verifier uses the passing Phase 2A preflight baseline captured before R1–R4 activation. The current test applies its post-redirect expectations because those four redirects are already live; no Phase 4 content was published. Root owns the controlled-copy build/preview and later approval boundaries. HTTP behavior cannot identify Cloudflare executing IDs or replace an authenticated account inventory. No contact, GSC, analytics or indexing actions were taken.

