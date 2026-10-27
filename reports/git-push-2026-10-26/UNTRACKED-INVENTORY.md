# Local file inventory before the requested Git push

This is a read-only inventory, captured from `git ls-files --others --exclude-standard -z` on October 26, 2026. It does not stage, commit, push, remove, or rewrite files. The count is a point-in-time snapshot before the inventory's own generated reports were written.

**Resolved publication scope:** The user subsequently selected “Reviewed Mercedes changes + public-safe summaries.” Only the four reviewed Option B application source files and a new standalone public-safe summary are proposed for staging. This local inventory, all raw reports/outputs, archives, private exports and the unrelated backend edit are excluded. The broader classification below records why blindly staging the original workspace would have been unsuitable; it is not the selected publication scope.

The snapshot contains **9,744 untracked files / 4,298,502,308 bytes**. Existing `.gitignore` rules already exclude `node_modules`, build `dist` directories, and directories ending in `.local`. They do not exclude `.local.tar`, ZIP archives, downloaded executable tools, or all historical analysis runtimes.

## Files that cannot be included in an ordinary GitHub push

Eleven files exceed 100 MiB: one 1.7 GB preservation TAR, seven ZIP archives (including both 140.5 MB Phase 4B application archives), and three downloaded FFmpeg executables. A fourth FFmpeg executable is 87.6 MB. The complete paths and byte counts are recorded in `untracked-inventory.json`.

The 26 archives total 2,633,263,802 bytes. These include source preservation copies, build artifacts, and compressed vendor documentation. Locally installed/runtime-tool candidates total 448,456,327 bytes across 66 paths. These classifications can overlap; their totals must not be added blindly.

## Safe versioning proposal

1. Version the approved application source, deliberate existing tracked edits after their own review, report prose, source patches, scripts, manifests, tabular evidence, and test results.
2. Keep preservation archives, application ZIP distributions, downloaded executable tools, wheels, and analysis/runtime installation trees local. Preserve their existing manifests and hashes. Do not delete these files. No LFS setup or large binary upload has been authorized or performed by this inventory.
3. Retain screenshots and media that are actual authored deliverables or audit evidence, provided individual files pass the repository's size constraints. Screenshots account for 552,375,010 bytes across 2,061 PNGs; Git-visible video/audio deliverables total 106,621,676 bytes across 16 paths. Their aggregate size merits an explicit root-agent scope decision rather than blind `git add .`.
4. Raw authenticated evidence should remain subject to the repository's existing access controls. Do not publish it to an unrelated or public destination. The current user request concerns the configured Git remote; this inventory makes no independent change to that remote or its visibility.

## Authenticated evidence and credential scan

Authenticated Search Console and Cloudflare evidence is present. Phase 3's `search-console/raw/` alone contains 584 files / 4,520,215 bytes; further paired/daily UI observations, exports and indexed observations exist. Cloudflare rule readbacks, accessibility-tree snapshots and screenshots occur in Phase 2/2B. Lovable host snapshots occur in historical outputs and Phase 4C. These records are business/account evidence rather than public page captures alone.

The local text scan found **no private-key-shaped text, GitHub-token-shaped text, or populated bearer/access-token-shaped credentials** in the inspected text extensions. One JWT-shaped value occurs in a historical copied browser client; that file is byte-identical to the already tracked browser client. Two auth-path candidate files contain account/configuration identifier keys. No actual credential, identifier, private query, user label, or email value is reproduced in this inventory.

This is a bounded pattern scan, not proof that all files are free of secrets. Images and archives were not inspected for embedded text. File paths and indicator classes only are saved in `content-classification.json`.

## Machine-readable evidence

- `untracked-inventory.json`: grouped counts/sizes, all files above 50/100 MiB, archive/runtime/media candidates and authenticated-path candidates.
- `untracked-file-sizes.json`: complete point-in-time Git-visible untracked path/size inventory.
- `content-classification.json`: extension totals and content indicator paths without values.
- `inventory.mjs` and `classify.mjs`: read-only collectors that regenerate these reports locally.

No Git mutation or remote transmission was performed by this inventory task.
