# Bounded source assessment of the observer exception

The previous event text is consistent with a native `MutationObserver.observe` call receiving a value outside the DOM `Node` type. It is not enough to identify the call site. Phase 4B did not retain a source URL, line, column or stack for either occurrence. The fresh Phase 4C browser observations must supply frequency and attribution if an event recurs.

The selected baseline, A and B compiled outputs each contain four literal `MutationObserver` occurrences:

| Context | Built location | Target expression / relevant guard |
| --- | --- | --- |
| Vite module-preload fallback | Entry bundle, line 2 | Observes `document`; branch returns when native module-preload support is present. |
| Radix collection helper | Entry bundle, line 68 | Creates an observer; its collection call is guarded by `if (!collectionElement) return`. |
| Application hash-scroll fallback | Entry bundle, line 94 | Runs only for a URL fragment whose target has not yet mounted; observes `document.getElementById('root') ?? document.body`. |
| Radix focus-scope | Lazy PaintCorrectionPage chunk, line 6 | Observes the scope container only when it is truthy. Loading that chunk in the affected journeys has not been established. |

Exact hashes, zero-based offsets, one-based line/columns and surrounding code are saved in [source-and-build-evidence.json](source-and-build-evidence.json). The observer expressions and surrounding excerpts are identical in all three builds. Source maps are absent. The lazy-chunk filenames and entry bundle hash changes must not be mistaken for changed observer logic.

`src/App.tsx` is SHA-256 `02a02dc0ddc586316873d45f9d2db96d8cbee2f09251d47d21738c17dd08bd4e` across all three controlled source copies. Its relevant code is from commit `6180f453feaaf21b8c786f23bb3867a09666ed64`, dated 17 October 2026. The approved service links use no hash fragment. These facts reduce direct evidence for a new hash-scroll defect introduced by the approved copy/link patches; they do not prove that the exception was pre-existing, harmless or impossible in the app.

The selected dependency tree's unminified Radix package source contains the corresponding guards: `@radix-ui/react-collection` 1.1.15, `dist/index.mjs` lines 427–436; `@radix-ui/react-focus-scope` 1.1.16, `dist/index.mjs` line 68. Static guards do not establish runtime types, and they do not cover other execution worlds, scripts injected by tools/extensions, or third-party scripts blocked in local QA.

The passive server captures events in the document's execution world before the app starts. An exception in native browser logs with no matching page capture remains unattributed. If a matching stack points to the app's entry bundle, use its exact asset hash and line/column to compare the four known contexts. A second `observe-probe` pass can provide a caller stack for invalid values; record that prototype instrumentation changes timing and keep its results distinct. Do not introduce a product fix without a confirmed relevant defect and separate scope review.

Until the observed event has an attributable cause or the remaining bounded risk is explicitly accepted, successful retries alone are insufficient for an unconditional release decision. An unresolved event that breaks navigation, hydration or contacts is a release blocker. An intermittent console-only event with completed journeys is lower observed impact, with uncertain cause; classify that uncertainty rather than declare the browser universally clean.
