# Browser exception: fresh matched journeys

The previously captured `MutationObserver.observe` error did **not recur** in 30 fresh common journeys, ten each for baseline, A and B. All 150 recorded steps completed. Both the browser-native console capture and the first-head in-page diagnostics recorded zero uncaught exceptions. This is a bounded reproduction result, not a determination that the original error has disappeared globally.

| Artifact | Repeated sequences | Steps | Native console entries | Window errors / unhandled rejections / console errors | Unexpected resource errors |
| --- | ---: | ---: | ---: | ---: | ---: |
| Baseline | 10 | 50 | 0 | 0 | 0 |
| A | 10 | 50 | 0 | 0 | 0 |
| B | 10 | 50 | 0 | 0 | 0 |

Each sequence used a direct hub load, the existing XENTRY diagnostics card, browser back, direct body-page load and a 390 CSS-pixel body frame. Three fresh IAB tabs used the same 1,280 px desktop viewport and direct static serving shell, in alternating baseline/A/B order. The default passive capture did not wrap `MutationObserver` or history methods. Screenshots/contact journeys after this repeat window are excluded from the table. [Exact root-recorded timestamps, actions, metrics and full native logs](../browser/passive-journeys.json), [independent time-scoped analysis and build IDs](passive-journey-analysis.json), [raw loopback diagnostic snapshots](runs/).

The serving shell used direct generated HTML/assets without executing `_worker.js` or `_redirects`. This differs from Phase 4B's local worker shell. First-head diagnostics also differ from the earlier late-head/temporary probes. Both changes are identical across all three Phase 4C inputs, but they can affect timing. These data cannot isolate whether instrumentation, serving shell, browser state or chance explains the non-recurrence.

All three options had the same expected local QA noise: 60 blocked external analytics script resource errors and 70 CSP events per option. Sixty CSP events correspond to the intentionally blocked Google Tag Manager/Google tag scripts. The remaining ten are caught `new Function` feature-detection probes from Zod 4.5.4 under the QA shell's strict CSP. The compiled location is the hub chunk, line 2, column 2552; `zod/v4/core/util.js` lines 148–165 contain the matching try/catch and an explicit comment about CSP reporting even when the probe exception is swallowed. This is neither the `MutationObserver` event nor an uncaught runtime exception. No product/CSP configuration was changed to suppress it. [Exact source excerpt and hashes](passive-journey-analysis.json).

| Artifact | Manifest SHA-256 | Entry | Hub | Body |
| --- | --- | --- | --- | --- |
| Baseline | `eb2c17bc541cb99c6b4e6e93aba745cccf3e1050f9de1c313c8837ede1a23db7` | `index-CvWuKuLH.js` | `BrandPage-CqCGvxL4.js` | `BrandServicePage-mV81kvfw.js` |
| A and B | `ee7d1f30093b0e84dd1a54f7d009dc39ee6644b683eda16251064a2a21f42655` | `index-DxoEjBa9.js` | `BrandPage-BnKA0VjP.js` | `BrandServicePage-CdNEbwkY.js` |

All filenames above are under `assets/`. A and B have identical application manifests; the reviewed date differences are in their sitemap. These IDs identify the tested local builds. They do not prove host rebuild compatibility or equality with the current production assets.

The exact previous exception remains:

```text
Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.
```

Phase 4B recorded one initial A event and one event during the third B repeat. No filename, line, column or exception stack was captured for either. No new event occurred in Phase 4C, so there is no new full exception stack to report. Do not fabricate one from the four statically observed observer call sites. The earlier baseline's three clear sequences did not prove absence from baseline; the ten additional Phase 4C baseline sequences also cannot prove that historical attribution.

The approved patches have no confirmed causal association with the event. Application hash-scroll source and the corresponding compiled observer contexts are unchanged across baseline/A/B. This limits the evidence for an observer-logic regression caused by the patches; it does not exclude indirect timing effects. No unrelated code fix or optional observe-probe pass was performed to force a clean result. [Bounded source assessment](observer-assessment.md).

**Risk assessment:** observed impact is low in the completed tested journeys; cause and global frequency remain unknown. Navigation, responsive rendering and later contact checks have separate concrete evidence, while production analytics/third-party execution and physical-device behavior were not exercised by this isolated CSP shell. Retain the original events as an unresolved console-risk disclosure. This result supports advancing the release investigation, but does not independently grant unconditional production approval. If host workflow gates are later resolved, require either an attributable explanation or explicit acceptance of this bounded residual console risk, plus a same-build production-preview smoke test before publication. A recurrence that breaks hydration, navigation or contact actions is an immediate stop condition; preserve its stack and build identifiers and seek a narrowly scoped correction review.

The overall release decision remains subject to the separate source/host/dependency and rollback gates. A successful local browser replay cannot clear those gates.

## Separate replay of the prior one-tab order

A further fresh IAB tab followed the previous nine-sequence order: baseline three times, A three times, then B three times. The same five actions produced 45 completed steps. Each artifact had **zero native console entries and zero in-page exceptions across its three sequences / 15 steps**. Each also had the expected 18 external analytics resource errors and 21 CSP notifications; there were no unexpected resource errors. [Exact recorded replay](../browser/prior-pattern-same-tab-replay.json), [separate time-scoped analysis](prior-pattern-analysis.json), [frozen diagnostic snapshots](runs/).

The earlier 30-sequence analysis JSON and its snapshots remain unchanged. The two runs share one browser engine and desktop environment; the first used three tabs, and this additional run used one fresh tab. Their counts must not be described as independent browser/device samples or used to claim a global error rate. Both ran the Phase 4C static/CSP/capture shell, so the serving and diagnostic differences from Phase 4B still apply.

## Bounded B interaction evidence

The separately recorded 16 observations cover the two approved hub service links, workshop phone, all three body assessment placements, final phone, FAQ, Menu and 390/320 responsive states. Offline verification of the captured values passes **33/33 assertions**: intended service destinations, `tel:+97143402223`, assessment recipient `97143402223`, the complete approved draft and placement attribution, visible keyboard focus, no measured horizontal overflow, CTA bounds and Menu/FAQ behavior. The native B console capture is empty. These assertions validate recorded browser evidence; they are not an additional UI replay or a live contact send. [Root observations](../browser/interaction-results.json), [independent recorded-value checks](interaction-evidence-validation.json).

An offline preservation guard also passes: 665 root inputs, 1,309 Phase 4B evidence entries, 1,869 Phase 4 entries, 793 Phase 3 entries and 303 historical/protected entries remain byte-identical to their reviewed manifests. Both pnpm lock copies, all 69 direct dependency versions, the declared dependency set and tracked Git status are unchanged. The two pre-existing dirty files match their recorded Phase 4B guard hashes. This does not fingerprint every transitive installed dependency byte or attest the host's dependency identity. [Guard and limitations](preservation.json).
