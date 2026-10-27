# Verification and rollback plan

**Prepared only. No deployment, rule creation, source patch application or rollback is authorized by this document.** The tests in this folder use public GET/HEAD and local files; they do not contain Cloudflare write operations or submit contact forms.

## Release boundaries

Use two independently approved stages:

- **R: four exact legacy redirects only.** Keep website content, the October 21 English oil rule and every existing Cloudflare rule definition/relative order unchanged. The HTTP post-check compares protected content hashes against the immediate preflight.
- **H: the two-paragraph English hub patch only.** Apply in an isolated working copy after approval and current-address confirmation, then build/render/test through the normal approved release workflow. Take a separate content baseline. Do not mix this content release with R: an intentional hub-text change would invalidate R's unchanged-content checks.

Neither stage includes the other 91 prepared aliases, broad slash normalization, unknown-URL handling, DNS, Workers, backend/database, titles/H1/canonicals, schema, reviews, pricing, hours, tracking, indexing submissions or new pages.

## Before any approved deployment

1. Confirm the approved scope and exact file hashes. Recheck the current working tree and protected-source hashes; keep existing unrelated edits. Do not overwrite `supabase/functions/mcp/index.ts` or the pre-existing audit output change.
2. Refresh the authenticated Cloudflare inventory: existing IDs, enabled states, functional definitions and relative order, capacity, Page/Bulk/Worker/rewrite interference and proxied host routing. Obtain a full read-only API ruleset/version export if available; do not create credentials or broaden access simply for this package.
3. Compare current inventory to `evidence/cloudflare/current-inventory.json`. If anything material changed, stop and re-review. No ruleset replacement or rule reordering is allowed. Additions may only be placed before the verified www anchor while keeping existing IDs in the same relative order.
4. Run the local proposal and conflict checks, then a fresh public `--stage=pre` capture immediately before the approved operation. Sources must still resolve to homepage 200; four target owners must be direct relevant 200 pages with exactly one expected canonical, indexable robots/header policy and no loop. If a source has already been corrected, stop rather than creating duplicate rules.
5. Check fresh URL Inspection for indexed status/selected canonical and retain the dated report. Eligibility is separate from Google indexing: the English body target is currently recorded as crawled but not indexed. Do not misreport it as indexed or automatically switch the destination to an unrelated indexed page.
6. For H, rerun `git apply --check`, review only the two changed paragraphs and two links, confirm the warehouse address with the operator and validate proposed TSX. After applying in an approved isolated copy, run the repository's relevant build/type/SSR checks and inspect desktop/mobile sections. Source application, build and publication remain later approval items.

## Read-only commands

Run from `C:\Users\ADMIN\Documents\ChatGPT\DIGITEC` in PowerShell. The bundled Node path was available during preparation. No API tokens are needed for these commands.

```powershell
$phase2Node = 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $phase2Node 'reports/mercedes-phase-2/tests/test-proposals.mjs'
& $phase2Node 'reports/mercedes-phase-2/tests/check-redirect-conflicts.mjs'
& $phase2Node 'reports/mercedes-phase-2/tests/test-conflict-checker.mjs'
git apply --check -- reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch
& $phase2Node 'reports/mercedes-phase-2/tests/verify-http.mjs' --stage=pre
```

The preflight prints a new `reports/mercedes-phase-2/evidence/http/pre-<timestamp>/` directory. Retain its `capture.json`, assertions, cases, response chain evidence and target HTML. Inspect failures and out-of-scope observations. A passing preflight means the expected **before state** is observed; it does not mean the four new redirects already work.

Only after separate approval and actual R activation, use that exact fresh baseline:

```powershell
$phase2Baseline = 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-2\evidence\http\pre-<timestamp>\capture.json'
& $phase2Node 'reports/mercedes-phase-2/tests/verify-http.mjs' --stage=post "--baseline=$phase2Baseline"
```

Replace `<timestamp>` with the actual directory printed by the immediate preflight. The script rejects failed or mismatched-proposal baselines. The post command has **not** been run against proposed redirects because none is deployed. It issues read-only HTTP requests and writes a new local evidence directory; it does not perform deployment.

Compare the actual configuration after the later approved activation using saved files, without making API calls:

```powershell
$phase2RulesBefore = 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-2\evidence\cloudflare\FRESH-before-inventory.json'
$phase2RulesAfter = 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-2\evidence\cloudflare\ACTUAL-after-inventory.json'
& $phase2Node 'reports/mercedes-phase-2/tests/check-redirect-conflicts.mjs' "--before=$phase2RulesBefore" "--after=$phase2RulesAfter"
```

The before file must use the reviewed `current-inventory.json` shape with ordered `rules`, capacity and capture metadata, refreshed from actual configuration. Preserve any raw export separately. The after checker accepts ordered `rules` or a raw API `result.rules` envelope. Replace the filenames with genuine captures; do not manufacture an after-state file from the proposal. The checker verifies four additions, exact approved enabled definitions, placement and unchanged originals. It cannot prove configuration freshness, hidden fields or actual provider behavior; retain the original exports and live HTTP checks.

## Required R post-deployment outcomes

| Check | Acceptance |
|---|---|
| Four source families | Exact slashless/slash forms, apex/www, HTTP/HTTPS, GET/HEAD: one direct **308** to the reviewed HTTPS apex slashless service, then 200. No intermediate homepage or canonical-host hop. |
| Query behavior | Empty query, campaign-like query and repeated/encoded/blank query cases preserved exactly. No arbitrary query parameter can change target host/path. Fragments are browser-side and outside HTTP query tests. |
| Destination eligibility | Expected title/H1, one declared canonical, index/follow and no noindex header; relevant HTML rather than a homepage fallback. Current Google-selected canonical/indexing is recorded separately. |
| October 21 English oil | Every protected case retains its existing direct 308 destination/query behavior. No content/canonical/indexability changes to either English oil service form. |
| Existing rule behavior | Existing broad Mercedes and www behavior remains identical, including known existing out-of-scope slash failures. No extra rule scope is silently added to cure them. |
| Protected content | Hub, Arabic hub, general oil, oil article, diagnostics, actual PPF owner, tuning and other controls retain expected metadata/content/indexability and status. |
| Account inventory | Exactly four new recorded rule IDs; pre-existing ID subsequence, functional definitions and enabled states unchanged. Never accept a whole-ruleset replacement as an equivalent operation. |

Repeat critical checks from a clean client and, where practical, another network after propagation. Permanent redirects can be cached; direct server observations do not erase client caches. Retain all evidence with release time and exact approved scope.

For H, compare the approved proposed text and links in initial HTML and rendered desktop/mobile views. Confirm title/H1/description/canonical/robots/schema/URLs and other brands/Arabic pages remain unchanged. Test keyboard access and the two link destinations. No live booking or WhatsApp message is required. If H is later deployed, R's old unchanged hub-content hash is no longer an appropriate content baseline; use the approved H baseline instead.

## Rollback: prepared procedure, separate authorization

No rollback is needed now. After a future activation, stop further changes if any target is wrong, a loop/chain appears, queries are lost, a target becomes nonindexable, a protected route regresses, or an existing rule unexpectedly changes. Save the failing request, configuration comparison, time and new rule ID. Ordinary short-term ranking movement alone does not identify a technical rollback trigger.

### Redirect stage R

1. Record each newly created rule ID against its approved mapping before enabling it. If activation is partial, do not enable remaining rules after a failure.
2. Obtain explicit rollback authorization, unless the later activation approval already authorizes this narrowly defined rollback on the listed failures.
3. Disable **only the newly created affected rule IDs**. Do not disable the protected English oil rule, edit existing rules, reorder the list, delete destinations, restore an entire old ruleset or change DNS/Workers.
4. Re-run a fresh before-state capture and the protected oil/control matrix. Disabled new rules should restore their prior source behavior, which currently includes homepage fallback; that is a rollback outcome, not the desired SEO end state.
5. Verify all original existing rule IDs/definitions/enabled states/relative order against the immediate preflight. Retain disabled records for diagnosis unless deletion is separately approved.
6. Document that cached 308s may persist in browsers/search engines. Do not promise instantaneous Google canonical reversal or try to counteract caching with an unreviewed reverse redirect.

### Hub stage H

The patch is isolated to two paragraphs. A read-only reverse applicability check, only after the patch has actually been applied, is:

```powershell
git apply --reverse --check -- reports/mercedes-phase-2/hub/mercedes-hub-minimal.patch
```

The real reverse application/release requires authorization. Revert only the approved hub change through the same release workflow, preserving unrelated edits. If the file changed later, review and reverse the exact hunks rather than copying the entire baseline file. Verify prior text and the unchanged SEO fields, links, Arabic/other-brand behavior and public responses. A hub rollback must not touch Cloudflare; an R rollback must not alter hub content.

## Monitoring after a later approved release

Reinspect the eight core source/destination URLs and protected oil canonical variants after Google has recrawled. Record `lastCrawl` and compare declared/selected canonicals without treating old indexed evidence as a current fetch. Use the requested paired query/page/country/device cohorts and frozen 7/28/90-day windows to assess visibility. Keep qualified inquiries/booked jobs separate from clicks/drafts. No ranking gain, index inclusion or rollback of cached Google data is guaranteed by a successful HTTP test.
