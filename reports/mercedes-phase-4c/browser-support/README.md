# Consistent Phase 4C browser reproduction support

Completed reproduction results are in [browser-exception-findings.md](browser-exception-findings.md) and [passive-journey-analysis.json](passive-journey-analysis.json). The common 30-sequence window is frozen separately from subsequent contact checks.

The separate prior-order one-tab replay is [prior-pattern-analysis.json](prior-pattern-analysis.json). Recorded B interaction validation is [interaction-evidence-validation.json](interaction-evidence-validation.json). The final offline source/evidence guard is [preservation.json](preservation.json).

This directory contains local QA response instrumentation only. It does not alter source, compiled assets, Phase 4B evidence, production configuration or browser automation internals. The three inputs are the frozen Phase 4B production-matched baseline, A (`candidate.local`) and B (`release-b.local`) distributions.

Run, with the same Node runtime used in Phase 4B:

```powershell
node reports/mercedes-phase-4c/browser-support/preview-qa.mjs 5200 baseline passive baseline-repeats
node reports/mercedes-phase-4c/browser-support/preview-qa.mjs 5201 candidate passive a-repeats
node reports/mercedes-phase-4c/browser-support/preview-qa.mjs 5202 release-b passive b-repeats
```

The root agent starts these processes; this support task does not start them. Each server binds `127.0.0.1` only. A separate process per option applies identical headers, CSP and capture code. `Cache-Control: no-store` is applied to all responses. External analytics/connections and form submissions are blocked. Native call, email and WhatsApp anchors are intercepted. App HTML/assets stay unchanged on disk. Generated route HTML and assets are served directly. `_worker.js` and `_redirects` are not imported, executed or activated. Unknown extensionless paths receive the homepage with HTTP 200, matching the measured current origin; missing assets return 404. No general hosting equivalence is inferred. This consistent direct-static serving shell is a documented difference from Phase 4B's local generated-worker shell; both use the same frozen app artifacts for the intended journeys.

`/__phase4c/info` exposes the exact manifest hash and entry/page assets. `GET /__phase4c/events` returns the bounded event/request log. JSON lines are also written immediately to `runs/`, up to 20,000 events/40 MiB per process. The error handler is injected as the first head child, before both the app module and the inline analytics bootstrap. It records window errors, unhandled promise rejections, console warnings/errors, CSP blocks, navigation lifecycle, clicked links, local intercepted contacts, loaded script/resource identifiers and contemporaneous route/root/body state. A caller stack for a console wrapper is distinct from the original exception stack; preserve both labels.

Use a fresh browser tab for each option. Keep the same desktop dimensions, browser surface, cold/warm pattern and pause/check policy. Perform at least ten sequences per option, in alternating baseline/A/B order to reduce timing confounding:

1. Direct hub load `/brands/mercedes-benz-service-dubai`; record time, AX state and native browser console delta.
2. Activate the existing XENTRY diagnostics service card common to all three builds. Record the destination and complete console delta.
3. Browser back to hub. Record route and console delta.
4. Direct `/services/mercedes-body-repair-dubai`; record route and console delta.
5. Open `/__phase4_frame?width=390&height=844&path=/services/mercedes-body-repair-dubai`; record frame metrics, diagnostics and native console delta.
6. On bounded explicit interaction runs, test the new A/B hub links and workshop phone, body assessment placements, keyboard menu/FAQ and 320 px state. Baseline lacks the approved new link/phone copy, so do not label those controls identical across baseline and candidates.

Capture each completed sequence independently with exact start/end times and observed exception count. Associate errors with the last completed interaction and their event timestamps, rather than assigning every tab-level console entry to the last route. Browser logs can retain earlier entries: use timestamps/cursors and write both full and incremental views.

If the same unattributed native-browser error recurs without a matching in-page event, preserve that discrepancy. It may indicate another execution world or an uncaught event outside the document's listeners; it does not by itself prove either the browser tool or the application caused the exception. In-page diagnostics cannot observe arbitrary browser/extension/automation execution worlds.

A second optional diagnostic pass uses `observe-probe` instead of `passive`. It wraps `MutationObserver.prototype.observe` only in served HTML, records invalid arguments and caller stacks, invokes the original with `Reflect.apply`, and rethrows any native exception. Keep its frequencies separate: prototype wrapping and all diagnostics can change timing. Default passive mode leaves `MutationObserver` and browser history methods untouched. An injected observation wrapper is never a source fix or release artifact.

The previous exact exception was `Uncaught TypeError: Failed to execute 'observe' on 'MutationObserver': parameter 1 is not of type 'Node'.` Phase 4B logged it once in an initial A journey and once in the third B sequence; three baseline sequences and ten further instrumented B sequences were clear. Neither original occurrence included source or stack. Those finite successful retries cannot establish global absence or attribution.

Run `node .../collect-source-evidence.mjs` to refresh the adjacent source/build evidence. `src/App.tsx` contains one application `MutationObserver`, in the existing hash-scroll branch. Dependencies may contain additional observers. The source is byte-identical across all three inputs; this is evidence the code predates the content changes, not proof that the observed exception predates them. Compiled assets have no sourcemaps in these outputs, so offset/line/excerpt evidence is retained without claiming original source mapping.
