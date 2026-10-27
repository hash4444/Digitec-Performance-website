# DIGI-TEC Phase 2A — controlled Mercedes redirect deployment

**HISTORICAL PARTIAL DRAFT — R1-only checkpoint, superseded by the [final stopped-deployment report](deployment-report.md).** The remainder is preserved as the earlier draft and must not be used as the current deployment status. Prepared from evidence available after R1 was enabled on 26 October 2026.

The user authorized exactly four prepared Cloudflare Single Redirects, in R1–R4 order immediately before the existing www rule. Approval does not include the Mercedes hub content patch, website metadata/canonicals, indexing requests, other configuration changes or rollback.

## Approved change and intended result

All four rules use the reviewed literal apex/www hostname set, GET/HEAD method set, and exact source path with and without one trailing slash. Each must return one direct **308** to the fixed HTTPS apex slashless destination, preserving the complete query string, followed by a relevant 200 page. The rules do not accept a query-selected destination.

| Rule | Source, also matching one trailing slash | Intended destination |
| --- | --- | --- |
| R1 | `/ar/brands/mercedes-benz-service-dubai/oil-change` | `https://digitecme.com/ar/services/mercedes-oil-change-dubai` |
| R2 | `/brands/mercedes-benz-service-dubai/body-repair` | `https://digitecme.com/services/mercedes-body-repair-dubai` |
| R3 | `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | `https://digitecme.com/ar/services/mercedes-battery-replacement-dubai` |
| R4 | `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | `https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai` |

The reviewed [proposal JSON](../routing/redirect-proposals.json) SHA256 is `336a3e207ab451d22f95efad88e334a3d5f8bb9958e495a8e9bcbe3f3d4956b9`. Its local rule payloads remain disabled review artifacts; actual activation is recorded separately. Enabling the approved rule instances does not require rewriting these historical proposal files.

Required final order: existing English oil rule → existing broad Mercedes rule → R1 → R2 → R3 → R4 → existing www rule. Insertions must preserve the three existing rules' definitions, enabled states, IDs and relative order. No whole-ruleset replacement is authorized.

## Before-state evidence and release gates

The fresh [public preflight](preflight/http-pre-2026-10-26T07-06-59-812Z/capture.json) ran from **07:06:59.815 to 07:07:45.367 UTC**, or **11:06:59.815 to 11:07:45.367 Dubai**. It passed **733/733 assertions across 326 cases and 564 network requests**. The retained capture SHA256 is `50acb9e9b9abfdba35fad704cec0c1a2f25aef2e2ea94cd7fc4f1d3e620a3d97`.

| Before-state group | Cases | Observed result |
| --- | ---: | --- |
| Four legacy source families | 192 | 48 combinations per rule: four scheme/host forms × two slash forms × GET/HEAD × three query strings. Every family still ended at homepage 200 after existing host/scheme handling. GET bodies matched the homepage main-text hash and homepage canonical; HEAD established status/headers only. |
| Protected October 21 English oil alias | 48 | Existing direct 308 to the slashless English oil service, exact query retention and final 200; no loop or additional redirect hop. |
| Existing broad Mercedes aliases | 48 | Reviewed redirect behavior and known existing slash homepage fallbacks reproduced. |
| Four intended destination families | 16 | Both slash forms × GET/HEAD: direct 200. GET pages had relevant title and one H1, one expected slashless canonical, indexable robots policy, no noindex response header, non-homepage content and canonical sitemap inclusion. |
| Protected page controls | 22 | Eleven pages × GET/HEAD, including homepage, English/Arabic hub, English oil forms, general oil, oil article, diagnostics, actual PPF owner, tuning and English mechanical repair. Correct page/metadata/indexability recorded. |

Robots and sitemap were also fetched directly. All 326 stable response chains, titles, H1s, canonicals, robots directives and main-text hashes matched the reviewed passing preflight. Robots text was unchanged. The [preflight summary](preflight/read-only-preflight-summary.json), [stable drift comparison](preflight/stable-http-drift.json) and [hash manifest](preflight/approved-and-evidence-hashes.json) retain the results. The original fresh baseline is also retained at `../evidence/http/pre-2026-10-26T07-06-59-812Z/capture.json` for the verifier CLI.

Local repeat checks passed: 738 proposal assertions; five synthetic conflict-checker scenarios; three offline post-mode CLI scenarios; package validation; hub patch applicability without application; four existing hub-link GET/HEAD checks; and all 283 protected source-file hashes. Existing unrelated tracked edits were preserved. Historical overwritten test outputs were first copied into [reviewed-output snapshots](preflight/reviewed-output-snapshots/). The synthetic tests establish checker behavior and do not constitute a production after-state.

The refreshed [authenticated Cloudflare before inventory](cloudflare/before-inventory.json), observed at **07:12:46.742 UTC / 11:12:46.742 Dubai**, records the same three original enabled rules and **3/10** Single Redirect slots used. Four additions would use seven. The [fresh conflict check](preflight/fresh-conflict-check-output.json) passed **781 checks**. It identified the four expected overlaps with the existing www catch-all; inserting the new rules before that anchor resolves the planned www chain without moving or editing existing rules.

| Protected existing rule | ID | Required preservation |
| --- | --- | --- |
| October 21 English oil redirect | `5addb0c068414fb5b985a869ded26c68` | Exact expression, 308 target, query preservation, enabled state and first position. |
| Broad Mercedes legacy redirect | `dbe42693423442afbc3bab9b993242a7` | Exact path set, hub target, 301, query preservation, enabled state and relative order. |
| www canonicalization | `9781b1ef743f4ffbaadbe5cb3250eeca` | Exact hostname expression, dynamic HTTPS apex target, 301, query preservation, enabled state and relative order. It remains after all four additions. |

The operator refreshed supporting layers: zero Page Rules, zero Bulk Redirect Lists, no configured zone Worker routes, and no URL Rewrite, Configuration or Origin Rules displayed. Apex and www remained proxied CNAMEs to `dubai-performance-art.lovable.app`, TTL Auto. Existing Always Use HTTPS and Automatic HTTPS Rewrites were enabled. URL normalization remained Cloudflare type, incoming enabled and normalization to origin disabled. These settings were read; changes are outside this release.

The inventory is an authenticated dashboard readback/transcription of functional values, enabled states and order. It is **not** a raw API ruleset/version export and does not expose every hidden provider field, ref or server-side update timestamp. The separate subagent browser was unavailable; the root operator completed the actual authenticated checks in its working browser. That tooling limitation is not evidence of a configuration failure.

## Activation checkpoint — update before finalizing

The [activation log](cloudflare/activations.json) is the authority for recorded rule IDs and operator observation times. At this draft snapshot it contains one enabled-observed rule:

| Rule | New Cloudflare ID | Submission UTC | Enabled first observed UTC | Submission-to-enabled interval | Dubai interval | Verification status at draft snapshot |
| --- | --- | --- | --- | --- | --- | --- |
| R1 | `b835ca6b88b448d6809f01271dba491b` | 07:15:45.190 | 07:15:52.800 | 7.610 seconds | 11:15:45.190–11:15:52.800 | Staged verification running; result must be added by operator. |
| R2 | Pending | Pending | Pending | Pending | Pending | No activation or successful verification claimed by this draft. |
| R3 | Pending | Pending | Pending | Pending | Pending | No activation or successful verification claimed by this draft. |
| R4 | Pending | Pending | Pending | Pending | Pending | No activation or successful verification claimed by this draft. |

R1's UI response was observed at 07:15:45.630 UTC. Its enabled list row and active detail form were read back. These timestamps bound the operator's submission and observation of enabled state; they are **not exact Cloudflare server activation timestamps**. The operator must record the same distinctions for R2–R4 and link their saved readbacks and list evidence.

No full-release completion, all-rules after-state, final unchanged-existing-rule comparison or final HTTP success is asserted here. A rule checkpoint failure requires stopping further deployment and retaining the failure. Approval must be obtained before rollback; unrelated rules must remain untouched.

## Required final verification and evidence

The [incremental verifier](verification/README.md) checks each newly enabled rule across its complete 48-case host/scheme/slash/method/query matrix, earlier and pending families, protected English oil probes, all destination variants, protected page controls, broad Mercedes controls, robots and sitemap. Each real checkpoint has 106 cases. Record each checkpoint's exact capture path, request interval, assertion totals and failures in this report. Synthetic fixtures must remain clearly separate.

After R4, run the unchanged reviewed full post verifier against the exact passing baseline. It must verify all 192 new source combinations, all 48 protected English oil combinations, all 48 broad Mercedes cases, all sixteen destination cases and all 22 page controls: one direct 308 to the intended target with exact query retention, final relevant 200, correct canonical/indexability, and unchanged protected responses. Record observed status/Location/chain evidence, including empty, campaign-like and repeated/encoded/blank query cases. Retain failed captures without relabeling them as passes.

The operator must also save an actual authenticated after inventory and run the before/after conflict checker. Acceptance requires exactly four new IDs with the approved enabled definitions in R1–R4 order before www, while the original three IDs remain an unchanged ordered subsequence with unchanged functional values. Recheck any final source/proposal hashes. Report all deviations, including any platform validation errors, checkpoint failure, later retry or network limitation. An HTTP pass alone does not replace authenticated configuration comparison.

## Search Console evidence and remaining uncertainty

The [authenticated indexed-inspection refresh](gsc/README.md) captured eleven reviewed URLs between **07:07:18.888 and 07:09:13.062 UTC / 11:07:18.888 and 11:09:13.062 Dubai**. No indexed status, canonical, crawl field or stored last-crawl timestamp changed from the reviewed snapshot. Seven observations changed only in the sitemap-discovery reporting display; the [field comparison](gsc/indexed-inspection-comparison.json) records those differences. They do not establish a sitemap configuration change.

The English body-repair destination remains **Crawled — currently not indexed**, with stored declared/selected canonicals shown as N/A. Its fresh public page is technically eligible and relevant; this release does not establish Google inclusion. The Arabic oil, battery and mechanical destination reports remain indexed. Three corresponding legacy source reports still select the inspected source URL; the battery source remains Page with redirect with the service destination selected.

The protected slashless English oil service also remains Crawled — currently not indexed, while the slash variant remains indexed with Google selecting that slash URL despite its slashless declared canonical. This existing canonical convergence uncertainty is preserved outside the four-rule scope. The hub remains indexed with the expected canonical. These are historical Google Index reports, not fresh Google crawls or live tests; the displayed crawl timezone was not verified.

No ranking recovery, selected-canonical convergence or immediate indexing effect is claimed. Query × page, UAE, mobile/desktop and 28/90-day performance exports remain measurement work in the [reviewed Search Console request](../search-console/README.md). No Test Live URL, indexing request or sitemap submission was performed for this refresh.

## Scope protection, failure handling and approval

Only the four exact prepared redirect additions are authorized. The hub patch remains unapplied by this work; title/H1/canonical/content changes, new pages, indexing actions, DNS, Workers, TLS, normalization, unrelated routing changes and website/backend releases are outside scope. Final source hashes and protected page comparisons must support the final preservation statement.

The known `/services/mercedes-service-dubai/` and `/best-mercedes-workshop-dubai/` homepage fallbacks remain outside these four approved mappings. Their baseline behavior is compared for preservation; no broader slash normalization is authorized.

If a deployed rule fails verification, stop further additions and retain the new ID, configuration, timestamps and failing responses. The user has **not authorized rollback**. Obtain separate approval before disabling any new rule. An approved rollback may disable only the newly created affected IDs; it must preserve the original three rules, DNS, Workers and website. Do not restore an entire ruleset or introduce a reverse redirect. Existing permanent redirect caches may survive server-side rollback.

**Operator finalization required:** replace checkpoint placeholders from the final activation log, add all real checkpoint/full-post results, add the actual before/after configuration comparison, state any deviation and remaining uncertainty, and then state the final deployment status. Do not mark this draft as complete solely because a rule is enabled in the dashboard.
