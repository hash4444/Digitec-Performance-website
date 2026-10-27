MERCEDES OIL CHANGE — EXACT SINGLE REDIRECT PROPOSAL
21 October 2026. LOCAL REVIEW PACKAGE ONLY. Nothing has been applied.

Use this package for the proposed rollout. It supersedes the older investigation's proposed-hosting-only Worker package for this rollout only. The historical package remains unchanged as evidence; do not deploy it, the broad generated Worker, or its service trailing-slash normalization as part of this correction.

PROPOSED CHANGE

Add ONE Cloudflare Single Redirect in the existing digitecme.com zone, first in the current Single Redirect order (phase http_request_dynamic_redirect). It must precede existing rule dbe42693423442afbc3bab9b993242a7, which currently precedes the www rule9781b1ef743f4ffbaadbe5cb3250eeca. Keep both existing rules and their definitions intact.

Match all three jointly:
  http.host in {"digitecme.com" "www.digitecme.com"}
  http.request.method in {"GET" "HEAD"}
  http.request.uri.path in {"/brands/mercedes-benz-service-dubai/oil-change" "/brands/mercedes-benz-service-dubai/oil-change/"}

Static target:https://digitecme.com/services/mercedes-oil-change-dubai
Status:308 permanent; preserve query string:true.

single-redirect-rule.json is the proposed single-rule definition, including its position before the observed first rule. Its enabled:true means intended state after separate authorization, not current activation. There is no invented new rule ID, zone ID or ruleset ID. observed-single-redirect-baseline.json is a transcription of dashboard evidence, NOT an API backup, full replacement payload or claim to know ruleset version. Unknown fields are null.

Both serviceURL forms remain unchanged by this new rule. In particular, /services/mercedes-oil-change-dubai/ is NOT a redirect source. Google currently indexes/selects that slashURL; keep the GSC baseline and inspect both forms during monitoring. The destination retains the existing site's declared slashless canonical/sitemap/internal-link preference. No content, HTML canonical, sitemap, internal link or SEO copy is modified. This phase does not claim Google's canonical selection is already consolidated.

CURRENT VERIFIED ARCHITECTURE CONTEXT

Authenticated parent inspection found apex/www proxied CNAMEs to dubai-performance-art.lovable.app. No zone Worker routes or account Workers/Pages. The active Single Redirects are the four repair/workshop aliases to the Mercedes hub and www-to-apex; neither matches the legacy oil path on apex. The local build contains an alias mapping and generated redirect asset, but no executable Worker owns those production routes. The alias consequently reaches the published host fallback instead of a permanent HTTP redirect.

Parent also verified Always Use HTTPS ON, Bulk Redirect Lists0/5 and Page Rules0/3. Preserve those settings. No DNS, SSL, proxy, token-permission or Lovable content-publish change is part of this proposal. Actual host deployment/rollback evidence is retained by parent under ../hosting.

ORDER / CHAINS / METHODS

Placing the new rule first lets a www legacy GET/HEAD go directly to the HTTPS apex service target in this observed Single Redirect model. If placed after the current www rule, the same request needs two modeled redirects, demonstrated by a negative test. Destination and indexed slashURL do not match the new rule; neither causes a loop in the model.

The new rule excludes mutations, API/asset paths and unrelated routes. Those requests retain baseline behavior, which includes the PRE-EXISTING www301 redirect on any method. Do not claim the new package makes all www mutation requests pass to origin unchanged; it simply preserves existing handling.

Always Use HTTPS executes as a separate feature. Offline tests do NOT prove cross-feature ordering for incoming HTTP. Authenticated Cloudflare simulator attempt returned an authentication error; no permission expansion or setting change was attempted. Cloudflare expression compilation, normalization and actual protocol/host chains remain live validation requirements after separate authorization. Do not promise every HTTP variant is one hop until tested.

INSTALLATION AND ROLLBACK — FOR AN AUTHORIZED FUTURE ACTION

Dashboard method:add the one Single Redirect with the exact definition, preserve query enabled and order First. Verify displayed expression/target/status before final submission. Do not edit either existing rule or create a Worker.

If an API path is separately chosen, first read the actual zone's current Single Redirect entrypoint/ruleset and retain its version/rules. Use the add-one-rule operation with the verified current ruleset ID, not a full-ruleset PUT. The JSON's before field references an observed existing rule ID; re-check it is still first before applying. Do not substitute the account ID for a zone/ruleset ID or invent missing identifiers.

After an authorized addition, record the new rule ID and resulting ruleset version. Rollback disables/removes ONLY that new rule and re-checks the two existing rules/order. No DNS/SSL/content rollback is needed because this proposal changes none of them. A308 can be cached by clients; disabling the rule restores server behavior but cannot immediately invalidate every previously cached redirect.

REQUIRED POST-AUTHORIZATION LIVE ACCEPTANCE

GET and HEAD each alias form on HTTPS apex and www, with empty query, repeated parameters, percent-encoded text and click IDs. Require308 to the exact target with query preserved; require target200, unchanged full service content, index/follow and existing declared canonical. Repeat HTTP variants while retaining Always Use HTTPS and record every hop; do not conceal an extra protocol redirect. Neither target form may be redirected by this new rule. Verify generic oil, article, hub, diagnostics, PPF/tuning, static assets and representative mutations retain baseline behavior. Keep before/after headers and body hashes and confirm old hub/www redirects still behave as recorded.

LOCAL TEST RESULTS

test-single-redirect.mjs:80 redirect cases,1288 unchanged-baseline cases,36 excluded alias-method/host cases;1658 assertions PASS. Covers GET/HEAD, HTTP/HTTPS, apex/www, two alias forms, encoded/repeated/empty parameters, gclid/gbraid/wbraid; destination passthrough, indexed slash passthrough, unrelated-route and mutation preservation; negative order control exposes the existing www-first chain. The simulator is a deliberately limited semantic model of the displayed rules, not Cloudflare's compiler.

run-local-qa.mjs:12 checks PASS. Reused the preceding full isolated build only after verifying all copied src hashes match current src. Fresh relevant regressions:hosting/production routing/response guard, SEO/canonical/sitemap, oil service, master/query release, protection/PPF,tuning,paint-care. SEO1256routes/1005sitemapURLs;44,666links. Oil SSR/canonical/FAQ/8reciprocallinks pass. Full rebuild was unnecessary because the only new artifact is this local rules proposal; no production source changed.

601 files in shared src/public/scripts/cloudflare remained hash-identical. Service initial HTML SHA256 remained42ca268d2bfd2c92d83b12543da10ecfceaecab01619b2cb657dc5e4a3ede949. See qa-results.json and qa-logs; raw cases/results and source-hash manifests are included.

RECOMMENDATION

GO for review and separately authorized activation of this single exact alias rule, subject to root's final hosting/rollback verification. NO-GO for reusing the older Worker package, altering the indexed slashURL, changing canonical ownership, republishing content or claiming automatic ranking restoration. The user has not authorized activation yet.

Primary configuration references, checked21October2026:
https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/
https://developers.cloudflare.com/ruleset-engine/rulesets-api/add-rule/
https://developers.cloudflare.com/ruleset-engine/basic-operations/add-rule-phase-rulesets/

These document static redirect/query/status fields, position-before insertion and why a single-rule addition avoids replacing existing rules. No API mutation was performed by this package.
