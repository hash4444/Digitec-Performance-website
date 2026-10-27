# Cloudflare routing review — 26 October 2026

**Authenticated, read-only inspection; no rule or DNS changes.** The user explicitly authorized continuing the saved login solely to inspect configuration. No Create, Save, Deploy, enable/disable toggle, ordering drag, DNS edit or API mutation was performed. No new disabled draft exists in the account.

The [normalized current inventory](evidence/cloudflare/current-inventory.json) records functional fields transcribed from the loaded dashboard and the three existing detail forms. Account emails, login tokens and unrelated DNS verification values were deliberately excluded. This is a dated UI record, not a complete API ruleset/version export. Refresh configuration before any later approved change.

## Current state

| Existing order | Existing rule ID | Effective scope / action | Preservation requirement |
|---|---|---|---|
| 1 | `5addb0c068414fb5b985a869ded26c68` | Exact English oil legacy path and slash form, apex/www, GET/HEAD → existing slashless English oil service, 308, preserve query | October 21 rule: no edits, replacement, deletion, disabling or movement. |
| 2 | `dbe42693423442afbc3bab9b993242a7` | Exact four-path set: repair alias and its slash form, service alias slashless, best-workshop alias slashless → Mercedes hub, 301, preserve query | Preserve expression, action, enabled state and position relative to other existing rules. Two other slash aliases are outside this expression; their existing homepage fallback is outside this package. |
| 3 | `9781b1ef743f4ffbaadbe5cb3250eeca` | All www requests → `concat("https://digitecme.com", http.request.uri.path)`, 301, preserve query | Preserve definition and relative order. Its overlap with the new www aliases determines insertion placement. |

The UI reports **3 of 10 Single Redirect slots used**. Four additional exact rules would use seven at this snapshot. This is capacity evidence, not a guarantee of future availability or platform validation of the proposed payloads.

Other inspected layers: no URL Rewrite, Configuration or Origin Rules shown in the zone overview; zero Bulk Redirect Lists; zero Page Rules; no configured zone Worker routes. Apex and www are both proxied CNAMEs to `dubai-performance-art.lovable.app`, TTL Auto. No DNS change is needed. TLS settings, origin-side configuration and a full raw API ruleset export were not inspected; public HTTP/HTTPS responses are recorded separately.

## Conflict decision

The eight new exact paths (four sources × slash/no slash) do not intersect the current English oil or broad Mercedes path sets. They intentionally match www as well as apex. The existing www catch-all overlaps them on www; appending new rules after it would give `www legacy → apex legacy → service`, an avoidable two-hop migration.

Proposed placement, only after explicit activation approval:

1. Existing English oil rule, unchanged.
2. Existing broad Mercedes rule, unchanged.
3. New Arabic oil exact rule.
4. New English body exact rule.
5. New Arabic battery exact rule.
6. New Arabic mechanical exact rule.
7. Existing www rule, unchanged.

Create each new rule **immediately before existing www rule ID `9781b1ef743f4ffbaadbe5cb3250eeca`**, in the reviewed sequence. This inserts new rules without editing or reordering the three existing rules relative to one another. It does not authorize moving the www rule itself. Compare the ordered existing-ID subsequence and their functional definitions before/after every later change. If the rule inventory changes, stop and re-review placement rather than assuming this diagram is current.

The prepared configuration uses four static rules rather than regex, a Worker, a bulk list or a whole-ruleset replacement: one target per rule, eight exact source paths total, only two hosts and GET/HEAD, fixed HTTPS apex slashless destinations, query preservation enabled. Targets are not members of the source sets and are relevant direct 200 pages. Existing query strings cannot choose a different destination host. URL fragments are not sent in HTTP requests and are not part of the query-preservation assertion.

The shipped JSON is **disabled local proposal data**. No upload was performed. Activation requires separate approval, platform validation and an immediate fresh baseline. Do not PUT a replacement rules array or deploy the repository's broad Worker/hosting artifacts as a shortcut.

Cloudflare documents [adding one rule without replacing the ruleset](https://developers.cloudflare.com/ruleset-engine/rulesets-api/add-rule/), [Single Redirect API configuration](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/create-api/) and [redirect status/query settings](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/settings/). These references were checked on the preparation date. The offline tests check the exact proposed predicates and order model; they do not substitute for Cloudflare's own validation.
