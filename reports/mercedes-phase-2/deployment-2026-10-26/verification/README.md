# Incremental public HTTP verification

This directory contains read-only verification tooling for the authorized R1–R4 release. It has no Cloudflare credentials or write operations and issues only GET/HEAD requests. Website source, the reviewed proposal and the reviewed verifier remain unchanged.

`verify-staged.mjs` is derived from `../../tests/verify-http.mjs` by the retained `build-staged-verifier.mjs`. Run it only after the operator confirms the corresponding rule is enabled, using the exact fresh passing preflight capture:

```powershell
$phase2Node = 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
$phase2FreshBaseline = 'C:\Users\ADMIN\Documents\ChatGPT\DIGITEC\reports\mercedes-phase-2\evidence\http\pre-<fresh timestamp>\capture.json'
& $phase2Node 'reports/mercedes-phase-2/deployment-2026-10-26/verification/verify-staged.mjs' --through=R1 "--baseline=$phase2FreshBaseline"
```

Repeat with R2, R3 and R4 only as the operator enables each rule. A checkpoint's 106 cases cover:

- The newly enabled rule's 48 combinations: four scheme/host forms × two slash forms × GET/HEAD × three query strings.
- Two critical probes for each earlier and pending rule family, preserving prior deployment and before-state behavior respectively.
- Eight protected English oil probes, spanning four scheme/host forms × GET/HEAD with trailing slash and repeated/encoded/blank query values.
- All sixteen destination slash/method combinations, including canonical/indexability and unchanged protected content.
- Twenty-two protected page controls and six existing broad Mercedes redirect controls against fresh preflight.
- Direct robots.txt/sitemap.xml responses and unchanged robots text.

The newly enabled alias must return one direct 308 to the exact approved HTTPS apex destination with its query unchanged, followed by relevant 200 HTML. Failures are retained as failures; no retries, configuration changes or rollback occur. Stop further activations when a checkpoint fails and retain its timestamped evidence folder.

All four enabled rules additionally require the **unaltered reviewed full verifier** after R4:

```powershell
& $phase2Node 'reports/mercedes-phase-2/tests/verify-http.mjs' --stage=post "--baseline=$phase2FreshBaseline"
```

That full run covers all 326 cases, including all 192 new source combinations, all 48 protected oil combinations and all 48 broad Mercedes control combinations. Its evidence is written to the reviewed verifier's `evidence/http/post-*` directory.

`test-staged-offline.mjs` exercises four passing staged states plus rejection of lost query strings, loops, premature activation of a pending rule, a changed protected oil destination, changed target content and a mismatched baseline. Its fetch preloader has no network fallback. `SYNTHETIC-*` folders and `offline-test-results.json` are synthetic test evidence and never production deployment results.

Every real checkpoint retains capture.json, individual request records, assertions, cases, target/control HTML, robots and sitemap. Record activation IDs/times separately from request observation times; HTTP responses do not reveal exact Cloudflare activation timestamps.
