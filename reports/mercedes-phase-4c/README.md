# Mercedes Phase 4C — final production readiness

**Decision: NO-GO for production publication.** Prepared 26 October 2026. Option B remains the recommended content change, but its actual Lovable production build and a reliable restoration of the current compiled release are not verified. Successful local builds and artifact checks do not resolve these blockers. No publication, push, merge, connected-project source edit, configuration change or indexing submission occurred.

## Decision and required evidence

| Gate | Result |
|---|---|
| Current published source | **Verified:** `13d1c19e99e9696ab63e5721ada18ffcfce11519` |
| Existing repository/workflow connection | **Verified:** `hash4444/Digitec-Performance-website`, `main`, connected and in sync; explicit snapshot publication |
| Reviewed B patch versus this source | **Pass:** exact four-file patch applies cleanly to authenticated immutable remote source |
| Local B integrity and SEO behavior | **Pass:** 1,634 files, 1,005 sitemap URLs, 2,530 route assertions; protected metadata unchanged |
| Actual host install/build recipe and B production output | **Blocked:** no production install/build log, selected lock hash, runtime/Bun version or host-built B artifact available |
| Current compiled release reliably restorable | **Blocked:** source/history version identified, but exact artifact retention and a verified frontend-only restoration procedure are unconfirmed |
| Previous console exception | **Unresolved cause:** no recurrence in matched tests; no confirmed association with the approved changes; retain bounded risk disclosure |

Remove the technical blockers by obtaining the provider's actual current production recipe/build identity and validating an unpublished B build produced by that same workflow, then confirming how the current coherent frontend release can be restored with understood effects. An explicit publication approval alone cannot supply this missing technical evidence. Do not modify locks, switch hosts or activate a routing layer to force parity.

## Lovable mechanism and published identity

Authenticated History marks the unique `Record activated Mercedes oil alias redirect` version **Published**. The matching authenticated edit record identifies commit `13d1c19…`; its displayed code diff matches the same three created documentation/redirect-record files in the GitHub commit. Publish says **Your website is up to date**, shows `digitecme.com`, and disables **Publish changes**. Git settings show the connected `main` branch and both sides on the same commit. This combined evidence identifies the published source; `latest_commit_sha` alone was not used as a deployment assertion. The Oct21 10:58 history label is the edit's time, not an independently verified publication activation time.

[Primary UI observations](host/ui-observations.json), [Published history screenshot](host/published-history.png), [Git sync screenshot](host/github-sync.png), [independent 12-check source reconciliation](host-repository/published-source-mapping.json).

The existing mechanism synchronizes source through this Git connection and publishes the current project snapshot through **Publish → Publish changes**. The source patch is compatible with that connection. The available publish tool accepts a project, not the local B ZIP or an arbitrary immutable artifact, so it cannot establish that Lovable would consume our exact 1,634 files. [Host/repository findings](host-repository/README.md), [Lovable publication documentation](https://docs.lovable.dev/features/publish).

The repository defines a 19-step build in `package.json`, including final prerender and validation. That definition is known; the exact production host invocation is not. Lovable documents Bun as its package installer. The repository contains `bun.lock`, `bun.lockb` and `package-lock.json`, with no committed pnpm lock or package-manager/runtime declaration. The committed Bun lock differs from the validated pnpm cohort on **59/69 direct versions**. Examples are Vite 5.4.10 versus 5.4.21, TypeScript 5.6.3 versus 5.9.3, and React Router DOM 6.27.0 versus 6.30.6. These are differences between recorded dependency environments, not confirmed counts of future production changes. [Exact dependency table and source hashes](host-repository/repository-verification.json), [Lovable package guidance](https://docs.lovable.dev/tips-tricks/npm-packages).

No inspected authenticated read interface or settings panel exposed the actual production Bun version, selected lock, frozen-install/cache flags, build command or build output identity. The currently published manifest remains `ed88f099b805ad2e0cdb0753fdf41f668402ca515984f358dee9ee22b61930f4`; the selected local unpatched manifest is different. A future host rebuild may introduce unreviewed derived differences. Neither its exact output nor their safety can be established from the local B artifact. A separate Sites mirror configuration is not the Lovable production recipe.

## Browser exception investigation

The exact previously reported text is:

```text
Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
```

The two Phase4B events have no source URL, line/column or exception stack. New first-head capture records full window errors, unhandled rejections, console calls, contemporaneous route/action, root/body state and build/asset identifiers. No matching new exception occurred, so there is no new exception stack to supply. None was fabricated from static call sites.

| Reproduction design | Baseline | A | B |
|---|---:|---:|---:|
| Alternating runs, fresh tab per build | 10 sequences / 50 steps / 0 exceptions | 10 / 50 / 0 | 10 / 50 / 0 |
| Previous same-tab order, separate replay | 3 sequences / 15 steps / 0 native entries | 3 / 15 / 0 | 3 / 15 / 0 |

Every sequence performs direct hub load → existing XENTRY diagnostics card → browser back → direct body page → 390px body frame. The second design reproduces Phase4B's one-tab baseline×3, A×3, B×3 ordering. All use the same IAB engine and desktop dimensions, no-store static serving, identical passive first-head diagnostics, blocked external analytics and intercepted contact anchors. Four inspected application/dependency observer contexts have identical surrounding logic across baseline/A/B. The app's existing hash-scroll code also predates the approved patches. This does not exclude indirect timing effects.

The new shell serves generated HTML/assets directly and **does not import or execute `_worker.js` or `_redirects`**. Earlier Phase4B used a local worker shell and later-head diagnostics. This controlled environment is consistent across the new inputs but differs from the older environment and production third-party execution, so non-recurrence does not identify the cause or prove global absence. Expected blocked analytics resources and caught Zod feature-detection CSP reports are recorded separately from uncaught exceptions.

[Full exception findings, frequency and build identifiers](browser-support/browser-exception-findings.md), [150 common steps](browser/passive-journeys.json), [45 same-tab steps](browser/prior-pattern-same-tab-replay.json), [source/observer context evidence](browser-support/observer-assessment.md), [time-scoped raw diagnostics](browser-support/runs/).

**Console risk:** low observed impact in completed journeys, with unknown cause and residual frequency. The exception is neither confirmed pre-existing nor demonstrated to be caused by the approved changes. It does not justify an unrelated fix. Before a later GO, obtain attributable evidence or explicit acceptance of this bounded risk and pass the same host-built candidate's production-preview smoke test. Any recurrence affecting hydration, navigation or contact actions is an immediate stop. The host/build and rollback blockers independently keep deployment at NO-GO.

## Final Option B verification

- All **1,634 disk files and 1,634 unique ZIP entries** retain their reviewed paths, lengths and SHA-256 hashes, with no missing/extra files. ZIP SHA-256: `a2faa6a33475be10c600bbfdad3303a3408bbabafe87d9dd708ca872278806b3`. [Artifact verification](artifact/README.md), [exact reviewed publication manifest](../mercedes-phase-4b/options/B/publication-manifest.json).
- Four source hashes and contexts match. The scope remains H3-01/H3-02 in `src/pages/BrandPage.tsx`, S1 in `src/data/mercedesServiceContent.ts` and `src/pages/BrandServicePage.tsx`, plus the two date overrides in `src/lib/route-manifest.ts`. The patch applies to the exact published-source commit. No dependency, generator, routing definition or unrelated source change is included. [Remote patch verification](host-repository/repository-verification.json).
- Fresh all-route check: **2,530/2,530** assertions. All **1,256** routes preserve titles, H1s, descriptions, canonicals, robots, hreflang, social metadata and structured data. **1,254 unaffected roots** are byte-identical, including Arabic and other brands. Only the two approved English roots differ. The original strict verifier still records 73/75 solely because its two tests require sitemap byte equality; separate exact-date assertions pass. [Full results](artifact/frozen-pnpm-B-all-routes/README.md).
- Sitemap preserves all **1,005 URLs and order**. Only English hub Oct20→Oct26 and English body repair Sep28→Oct26 differ from the current public sitemap. The four historical Oct20 values are already live; no generator or unrelated date changes.
- Desktop and 390/320 CSS-pixel B checks show no measured horizontal overflow. New service links navigate to the intended pages. Call anchors retain `tel:+97143402223`; three body assessment placements preserve recipient, full draft and attribution. Keyboard focus, FAQ and menu dismissal work. Contacts were intercepted, with no message/call sent. These are desktop-engine responsive frames, not physical devices. [Interaction results](browser/interaction-results.json), [desktop screenshot](browser/B-desktop-approved-links.png), [320px focus screenshot](browser/B-body-320-final-keyboard.png).
- Fresh public matrix: **852/852 assertions**, 326 cases / 612 responses, including all 192 R1–R4 combinations, 48 protected October21 oil cases, broad Mercedes aliases and controls. The separate **48/48 unknown-origin matrix** also checks www/scheme normalization. Unknown EN/AR documents retain homepage200; missing JS retains404. All seven rules are protected behaviorally; no authenticated rule-definition/order audit was performed in this phase and no configuration operations occurred. [Fresh production evidence](production/README.md).
- The downloadable public worker matches B's bytes, while observed unknown URLs retain homepage200. A static download does not prove worker execution. No generated routing/header file was activated locally in the new QA server or in production. Preserve that serving boundary.

The [preservation guard](browser-support/preservation.json) passes for all 665 original inputs, 1,309 Phase4B evidence files, 1,869 Phase4 artifacts, 793 Phase3 artifacts, 303 protected historical files, dependency locks and all 69 direct installed versions. The two existing dirty files match their saved Phase4B checkpoint hashes; no unrelated source was edited. [Machine-readable final decision](decision.json) and [complete Phase4C evidence hashes](evidence-manifest.json) accompany this report.

## Release and rollback preparation

The [release runbook](release/RELEASE-RUNBOOK.md) gives the exact verified synchronization/publish path, prerequisites, post-deployment checks and stop conditions. Steps depending on missing host evidence are explicitly blocked rather than presented as proven commands.

The current recovery target is the **published source version `13d1c19…`**, retained in authenticated GitHub/Lovable history. The current/latest version's Revert affordance does not execute. An older version's **Revert to this version?** confirmation was inspected and dismissed; its final Revert button was never selected. That demonstrates the confirmation UI, not successful restoration of the current compiled release. [Read-only restore inspection](host/ui-observations.json), [dialog capture](host/historical-restore-confirmation.ax.txt).

Lovable documents code restoration and associated edge-function redeployment rather than a guaranteed frontend-only compiled snapshot rollback. The inspected dialog did not clarify backend exclusion or exact artifact retention. Source recoverability is established; reliable restoration of the current frontend bytes and understood side effects are not. Do not claim rollback has been tested or use a generic Revert action as a static-only rollback. [Provider history documentation](https://docs.lovable.dev/features/projects/history).

## Required next steps and authorization boundary

1. Obtain the actual production build/lock/runtime record and a way to review an unpublished production-mode B build through the existing host. Confirm complete output/SSR and serving behavior before it substitutes for the reviewed artifact.
2. Confirm the provider-supported restore target and procedure, artifact retention and effects, including whether a frontend-only restoration exists. Secure the current coherent version and approve a rollback scope before release.
3. Resolve or explicitly accept the bounded console uncertainty after the same host-built candidate passes its smoke test.
4. Only then seek explicit authorization for the exact source synchronization/push/merge, production publication and any permitted rollback. None is authorized or performed by this phase. New routing layers, DNS/domains, Cloudflare changes, unrelated fixes and indexing/sitemap submissions remain excluded.

These technical checks require evidence, not merely confirmation to proceed. Work that would create/synchronize a host candidate or exercise restoration is outside this read-only phase and needs separately scoped authorization. **Stopped at NO-GO before any release action.**
