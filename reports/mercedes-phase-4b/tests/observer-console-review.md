# Limited MutationObserver diagnostic review

Reviewed 2026-10-26T10:41:42.924Z. No code changes, browser replay or network requests.

- The earlier Phase 4 console capture is `[]`; its documented coverage limitation means it cannot prove the later error was absent from every earlier runtime state.
- The captured Phase 4B A entry reports `MutationObserver.observe` receiving a non-Node argument. The first B capture contains no entry. Neither a source URL nor a stack was recorded, so the event cannot be attributed to a particular script.
- `src/App.tsx` and its ScrollToTop observer are byte-identical across the shared source, both Phase 4 copies and all three selected frozen-pnpm copies. Its last relevant source commit is dated 17 October. This proves the code predates these changes, not that the exception is pre-existing.
- The ScrollToTop observer branch requires a fragment in the URL. The approved service links contain no fragment. No causal conclusion follows from that fact alone.

**Do not describe the browser as clean or the error as proven pre-existing.** Preserve it and review the fresh baseline/A/B observations with exact URL, action and any source/stack available. Successful contact/navigation checks do not establish that an unattributed exception is harmless.

[Source hashes, source excerpt and captured console snapshot](observer-console-review.json).
