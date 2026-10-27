# Four legacy Mercedes aliases — controlled proposal

Prepared on 26 October 2026. **Review only. No live rule, draft, deployment, DNS, Worker, site content or index request was created or changed.** The definitions in [redirect-proposals.json](redirect-proposals.json) are deliberately disabled. Enabling or creating a rule in Cloudflare requires later explicit approval.

## Fresh public evidence

The final preflight ran **26 October 2026, 10:53:48–10:54:33 UAE** (06:53:48–06:54:33 UTC). It captured 326 cases / 564 read-only network requests; 733 of 733 assertions passed. The complete record is [capture.json](../evidence/http/pre-2026-10-26T06-53-48-482Z/capture.json), with [raw request records](../evidence/http/pre-2026-10-26T06-53-48-482Z/requests.json), [case CSV](../evidence/http/pre-2026-10-26T06-53-48-482Z/cases.csv), [assertion CSV](../evidence/http/pre-2026-10-26T06-53-48-482Z/assertions.csv), primary HTML, robots and sitemap copies. [HTTP summary](http-summary.json) and [four-row evidence CSV](redirect-evidence.csv) make the central findings easy to inspect.

| Exact source, also matching one trailing slash | Static destination | Current source | Current destination |
| --- | --- | --- | --- |
| `/ar/brands/mercedes-benz-service-dubai/oil-change` | `https://digitecme.com/ar/services/mercedes-oil-change-dubai` | Homepage HTML, 200 | 200, one self-canonical, indexable |
| `/brands/mercedes-benz-service-dubai/body-repair` | `https://digitecme.com/services/mercedes-body-repair-dubai` | Homepage HTML, 200 | 200, one self-canonical, indexable |
| `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | `https://digitecme.com/ar/services/mercedes-battery-replacement-dubai` | Homepage HTML, 200 | 200, one self-canonical, indexable |
| `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | `https://digitecme.com/ar/services/mercedes-mechanical-repair-dubai` | Homepage HTML, 200 | 200, one self-canonical, indexable |

All 96 source GET combinations ended at homepage HTML, with the same normalized main-content SHA-256 as `/` and canonical `https://digitecme.com/`. The 96 corresponding HEAD combinations ended at 200; HEAD cannot prove body content. Coverage is four aliases × slash/no slash × HTTP/HTTPS × apex/www × GET/HEAD × three query conditions = **192 cases**. Noncanonical hosts/schemes currently add their normal host/HTTPS redirect before the fallback.

The four destination URLs and their slash forms return direct 200 for GET/HEAD. All eight destination GET responses have one canonical to the appropriate slashless URL, one H1, page-specific content, `index, follow, max-image-preview:large`, and no `X-Robots-Tag` exclusion. All four canonical destinations appear in the sitemap. The saved robots file permits these routes for general/Google crawling; its current disallow entries concern WordPress administrative URLs. These establish technical eligibility; they do not establish Google indexing or Google-selected canonicals.

Separately, the authenticated [Search Console observations](../search-console/indexed-inspection-observations.json) record the English body-repair destination as **Crawled — currently not indexed**, with Google-selected canonical unavailable in that indexed report. The three Arabic destinations are recorded as indexed with themselves selected. These dated Google Index results must not be conflated with this fresh HTTP capture; their last-crawl dates differ. Keep the English body destination's indexing status explicit in approval review and later monitoring.

The protected English oil alias passed **48 cases** covering both hosts, schemes, slash forms, methods and all three query conditions. Each returns one direct 308 to `https://digitecme.com/services/mercedes-oil-change-dubai` with the original query, followed by 200. Rule `5addb0c068414fb5b985a869ded26c68` must remain unchanged.

Supplemental [hub link-target capture](../evidence/http/hub-link-targets/capture.json) confirms the existing diagnostics and English mechanical-repair destinations return 200 with self-canonicals/indexable HTML (four GET/HEAD checks). No new pages are proposed.

## Smallest proposed edge change

Use **four static Single Redirects**, one per destination, in `http_request_dynamic_redirect`. Each expression contains only the two exact source paths, the two exact hosts `digitecme.com` / `www.digitecme.com`, and GET/HEAD. There is no prefix match, regex, wildcard, bulk migration or Worker. Source language stays aligned with destination language.

The four concrete future create payloads are [Arabic oil](rules/1-ar-oil-change.json), [English body repair](rules/2-en-body-repair.json), [Arabic battery](rules/3-ar-battery-replacement.json) and [Arabic mechanical repair](rules/4-ar-mechanical-repair.json). Each is a single disabled rule with `position: {"before": "9781b1ef743f4ffbaadbe5cb3250eeca"}`. These are local review files, not Cloudflare drafts. Creation and any later `enabled: true` activation require approval and a fresh account check. No command in this package submits these payloads.

Proposed status is **308**, consistent with the protected English oil rule and explicitly permanent with method preservation. GET/HEAD are the only matched methods, so no POST or form replay is introduced. A 301 would also express a permanent page move; using 308 keeps this narrow migration consistent with the existing oil treatment. Cloudflare supports both, and query preservation must be enabled explicitly. [Cloudflare Single Redirect settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/).

`preserve_query_string: true` carries attribution and arbitrary repeated/encoded query values without parsing or rebuilding them. Each target is a fixed HTTPS apex slashless URL without its own query or fragment. The verifier checks the raw `Location` value for a normal attribution query and `?tag=a&tag=b&encoded=%2F%2B%26%3D&space=a%20b&plus=a+b&blank=`. This rejects lost repeated keys, encoding changes or an extra normalization hop after activation. URL fragments are client-side and are not sent in HTTP requests.

The new sources are mutually disjoint and no target is one of their source paths. The targets also avoid the existing oil/repair source sets and use apex HTTPS. Those conditions remove the modeled chain/loop paths; the live postflight must confirm actual edge behavior.

## Existing-rule conflicts and required position

The parent package's [authenticated inventory](../evidence/cloudflare/current-inventory.json) is the source for current account findings. The read-only review found three active Single Redirects out of a ten-rule allowance:

1. English oil rule `5addb0c068414fb5b985a869ded26c68`, 308, both oil legacy forms, GET/HEAD, apex/www, query preservation.
2. Legacy Mercedes rule `dbe42693423442afbc3bab9b993242a7`, 301 to the Mercedes hub, query preservation. Exact source set: `/services/mercedes-repair-dubai`, `/services/mercedes-repair-dubai/`, `/services/mercedes-service-dubai`, `/best-mercedes-workshop-dubai`.
3. www canonicalization rule `9781b1ef743f4ffbaadbe5cb3250eeca`, all www requests, dynamic HTTPS apex destination retaining path, 301 with query preservation.

No proposed source intersects rules 1 or 2. All proposed www requests intersect rule 3. **Appending the four rules after www would produce an avoidable redirect chain.** The proposal inserts them immediately before `9781b1ef743f4ffbaadbe5cb3250eeca`, after the existing legacy Mercedes rule. The three existing rules retain their IDs, complete definitions and relative order. New total: seven of ten rules. The intended sequence is existing oil → existing legacy Mercedes → four new rules → existing www.

This is insertion of new rules; no existing rule is replaced or reordered. Cloudflare runs the first matching redirect, so the insertion point is part of the required change. [Cloudflare execution order](https://developers.cloudflare.com/rules/url-forwarding/).

A future approved operator must refresh the authenticated inventory immediately before any activation and stop on changed rule IDs, definitions, order, quotas, DNS proxy status, conflicting route configuration or unexpected public behavior. Check Single Redirects, Bulk Redirect rules/lists, Page Rules, Worker routes/custom domains, HTTPS settings, URL normalization/rewrites and hosting redirects. Public HTTP observations alone cannot prove the absence of account-level conflicts. Use the parent inventory's explicitly verified and unverified sections; do not treat an uninspected feature as empty.

If later approved, use the Cloudflare create-one-rule form or the individual add-rule operation, specifying `position.before` as the refreshed www rule ID. Add rules one at a time and retain each returned new rule ID. Do not PUT a ruleset or phase entrypoint. The add-rule operation preserves existing rules; a whole-ruleset PUT replaces the list and could delete omitted rules. [Add one rule](https://developers.cloudflare.com/ruleset-engine/rulesets-api/add-rule/), [whole-ruleset replacement warning](https://developers.cloudflare.com/ruleset-engine/rulesets-api/update/). No API mutation command is included or executed by this package.

## Tests and future verification commands

Run these from `C:\Users\ADMIN\Documents\ChatGPT\DIGITEC`. They write only local evidence under this package and perform no configuration changes:

```powershell
node reports/mercedes-phase-2/tests/test-proposals.mjs
node reports/mercedes-phase-2/tests/check-redirect-conflicts.mjs
node reports/mercedes-phase-2/tests/test-conflict-checker.mjs
node reports/mercedes-phase-2/tests/verify-http.mjs --stage=pre
node reports/mercedes-phase-2/tests/capture-hub-link-targets.mjs
```

The local contract test passed **738 assertions**: literal host/method/path scope from the actual JSON expressions, both source forms, opaque query preservation, unique matches, disjoint targets, English oil/protected route exclusions, negative hosts/methods/near paths, and four concrete disabled create payloads. It models literal expression sets, not Cloudflare URL normalization or the full Rules engine. [Result](local-test-results.json).

The offline conflict checker passed **781 checks** against the saved authenticated functional inventory; it identifies all four www overlaps and models their resolution by insertion before www. [Result](conflict-check.json). Five synthetic checker tests prove the after-state comparison accepts the intended insertion and rejects changed protected oil settings, placement after www, lost query preservation and duplicated new sources. [Synthetic checker results](conflict-checker-test-results.json). These tests do not claim an actual production after-state.

The preflight command prints its new capture directory. Use that fresh passing `capture.json`, not a historical capture, for an approved future activation. Save the actual authenticated rule definitions/order at the same time. Configuration drift is a stop condition. Keep routing and any separately approved hub content deployment in distinct steps so unchanged-content checks retain meaning.

**Only after a separately approved activation**, run:

```powershell
node reports/mercedes-phase-2/tests/verify-http.mjs --stage=post --baseline=reports/mercedes-phase-2/evidence/http/REPLACE_WITH_FRESH_PRE_DIRECTORY/capture.json
```

The script requires a passing preflight for the exact proposal file. It demands one direct 308 from every source variant to the correct destination with exact query retention, final 200, correct declared canonical and no index exclusion. It also checks destinations, the protected English oil redirect, existing repair alias behavior, protected pages/metadata/main content and robots against the preflight. Afterward export authenticated configuration again and compare: exactly four new IDs, expected placement, all three original rule definitions and relative order unchanged. Inspect representative apex/www HTTP/HTTPS requests with Cloudflare Trace if an expected redirect is not selected. A passing HTTP matrix does not replace the authenticated comparison.

The offline after-inventory comparison accepts a normalized saved inventory (`rules`) or an API-style object (`result.rules`):

```powershell
node reports/mercedes-phase-2/tests/check-redirect-conflicts.mjs --before=reports/mercedes-phase-2/evidence/cloudflare/REPLACE_WITH_FRESH_BEFORE.json --after=reports/mercedes-phase-2/evidence/cloudflare/REPLACE_WITH_ACTUAL_AFTER.json
```

The real post-mode CLI was also exercised with an offline fetch replacement: a positive fixture passed 852 assertions; a query-loss fixture failed the intended 128 assertions; a mismatched-proposal baseline was rejected before requests. All three test scenarios passed. [Offline post-mode test results](http-post-mode-test-results.json). Synthetic captures are explicitly named `SYNTHETIC-post-*`, marked `syntheticOnly`, and record zero network requests; they are not deployment evidence. Reproduce this test without accessing production:

```powershell
node reports/mercedes-phase-2/tests/test-http-post-mode.mjs --baseline=reports/mercedes-phase-2/evidence/http/pre-2026-10-26T06-53-48-482Z/capture.json
```

No post-deployment result is claimed; the proposed redirects have not been activated.

## Verification correction and unrelated existing defects

The initial [capture](../evidence/http/pre-2026-10-26T06-44-50-517Z/capture.json) retains 24 failed assertions. The verifier had incorrectly assumed all three protected broad repair aliases also covered trailing slashes. Current rule 2 actually includes the slash form only for `/services/mercedes-repair-dubai/`. The observed `/services/mercedes-service-dubai/` and `/best-mercedes-workshop-dubai/` instead serve homepage HTML after normal host/scheme handling. This is an existing issue outside the four authorized aliases.

The verifier was corrected to document these variants and compare their actual baseline behavior after a later deployment. An intermediate capture passed 707/707 assertions but used an incorrect PPF control (`/services/paint-protection-film-dubai`) and checked only its status. That URL was a homepage fallback, so that intermediate capture did not establish PPF protection. The final capture uses the actual `/services/paint-protection-film` owner, adds English mechanical repair, and requires every GET control to have the correct canonical, one H1, indexability and non-homepage content. It passes 733/733 assertions. The post-mode hash helper was hoisted and exercised offline to verify the CLI path works. These corrections do not repair or conceal existing URL defects and do not broaden the implementation scope. No production rule was edited.

## Rollback plan and approval boundary

Before any later activation, retain the fresh before-state export, the four approved definitions, operator/time, Cloudflare validation results, each created rule ID and the after-state export. Agree in that deployment approval whether emergency rollback is authorized; this preparation request authorizes no live rollback.

If a new rule selects a wrong destination, loses query values, creates a loop/chain or affects a protected route, stop further activation and retain the failing responses. With explicit rollback authorization, disable only the newly created rule IDs responsible for this package; disabling all four returns this package's routes to their observed baseline. Preserve the original oil, legacy Mercedes and www definitions/order. Do not restore the entire old ruleset, delete any existing rule or change DNS, Workers, site content or sitemap. Re-run the read-only preflight and authenticated comparison after disabling. Browser/search caches may retain permanent redirects after server-side rollback; immediate disappearance cannot be promised.

Approval is required for creating any Cloudflare draft, creating/enabling these four rules with the stated placement/status/query behavior, any later hub content publication, any rollback mutation, and any scope expansion. No such action has occurred. Google-selected canonical evidence, ranking effects and search recovery remain separate measurement work.
