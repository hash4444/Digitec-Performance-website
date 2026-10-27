# Final offline source and evidence guard

Prepared for the root operator to run **after** Phase 3 report/proposal work is complete. It is not an implementation or deployment step.

```powershell
$phase3Node = 'C:\Users\ADMIN\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
& $phase3Node 'reports/mercedes-phase-3/indexing/final-source-integrity.mjs' --run-final
```

The guard reads local files only and saves `reports/mercedes-phase-3/indexing/source-integrity-final.json`. It compares:

- 283 protected application-source hashes against the immediate Phase 2A preflight.
- All ten reviewed/approved artifact and evidence hashes, including the original proposal, four rule payloads, hub patch, original HTTP verifier/conflict checker and original passing preflight.
- All four immutable Phase 2A activation captures and the exact original R4 homepage body against its recorded body hash.
- The protected October 21 English oil rule definition and Phase 2B full HTTP capture against anchored hashes.
- Three source files represented by the new service proposals against their original hashes, proving those proposals remain unapplied.
- Current tracked Git status against the preflight's two pre-existing modifications, preserving their existence rather than claiming a clean workspace.

PASS requires all expected protected sources, exact hash matches and the same tracked-status list. New Phase 3 report/proposal files may exist, and root collectors may continue appending observations; they are not application-source changes or immutable historical captures.

If any check fails, retain the report and inspect the exact differing path. Do not repair, reset or overwrite a source/evidence file automatically. No additional HTTP, account actions, builds or source application are part of the guard. Live configuration consistency, if needed, is established by the root's separately authorized authenticated readback.
