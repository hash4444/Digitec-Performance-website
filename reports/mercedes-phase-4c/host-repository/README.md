# Phase 4C — repository and Lovable release mechanism

Read-only repository inspection and local preparation, 26 October 2026. No commit, push, merge, project edit, publication, dependency change, backend operation or routing operation was performed by this reviewer.

**Independent repository/host recommendation: NO-GO for production publication.** The exact published source is now identified, and the reviewed Option B patch is compatible with it. The actual host rebuild recipe and reliable restoration of the current compiled production release remain unverified. Source compatibility and successful local builds do not resolve those two blockers.

The parent performed the authenticated Lovable UI/tool reads; this reviewer independently reconciled their saved captures with GitHub evidence. No inference from `latest_commit_sha` alone is used.

## Repository evidence

Authenticated GitHub reads confirm `hash4444/Digitec-Performance-website` has default branch `main`, currently at `13d1c19e99e9696ab63e5721ada18ffcfce11519`, tree `96c307f5dd7194049a8dbcbd9beceae7030a07f2`. Local HEAD matches. The parent commit is `b793ad0acf3cd534217d862a44f2e1d915789ec2`. The branch is unprotected. No `.github` directory exists at this tree; combined commit statuses and check runs are empty. These observations do not prove a Lovable build passed. [GitHub summary](github-summary.json), [main branch read](api/p4cDeep0.json), [root tree](api/p4cLast0.json), [check runs](api/p4cLast1.json).

The currently published source commit is **`13d1c19e99e9696ab63e5721ada18ffcfce11519`**, identified from the following combined evidence:

- Lovable History marks the unique version `Record activated Mercedes oil alias redirect` as **Published**, with the version label `Oct 21, 10:58 AM`. [History capture](../host/history-loaded.ax.txt), [screenshot](../host/published-history.png).
- Authenticated Lovable edit history maps that exact unique title to commit `13d1c19…`, edit `edt-c8e47408-b978-42a4-af1c-a3556a12986b`, created `2026-10-21T06:58:03Z`. [Edit record](../host/edit-history.json).
- Its UI code-change view shows the same three created oil-redirect JSON/documentation files as the authenticated GitHub commit. [UI diff capture](../host/published-version-code-loaded.ax.txt), [source details screenshot](../host/published-source-details.png), [GitHub commit evidence](api/published-source-commit.json).
- The Publish panel says Published and Your website is up to date, with Publish changes disabled and `digitecme.com` as the website URL. [Publish capture](../host/publish-panel.ax.txt), [screenshot](../host/publish-panel.png).
- Current Git settings show `hash4444/Digitec-Performance-website`, branch `main`, Connected, In sync with GitHub and both sides on the same commit. This matches the independently fetched branch SHA. [Authenticated sync capture](../host/github-sync-loaded.ax.txt).

This identifies the source state of the live snapshot. The version's displayed creation time is **not an independently established deployment activation timestamp**. No provider deployment ID, full published build log or compiled-release restoration test was obtained. [Reconciled mapping and limits](published-source-mapping.json).

The four exact Option B files were fetched from the immutable GitHub commit and their evidence bytes independently checked against the API Git blob identifiers. `git apply --check` passed for the complete reviewed B patch against these remote-source copies, without applying it. All four controlled before/after SHA-256 values still match the Phase 4B review. Three source files differ between GitHub and the Windows working copy only by line endings; their normalized text is identical. This is not an unreviewed content drift. [Verification and dependency table](repository-verification.json), [reproducible verifier](verify-repository.mjs), [remote source evidence](remote-source/).

The source publication scope remains exactly:

1. `src/pages/BrandPage.tsx` — H3-01/H3-02 links and workshop telephone action.
2. `src/data/mercedesServiceContent.ts` — reviewed S1 bodywork assessment copy.
3. `src/pages/BrandServicePage.tsx` — reviewed S1 contact behavior.
4. `src/lib/route-manifest.ts` — supported October 26 dates for the two revised English pages.

Do not synchronize the entire dirty working tree. The unrelated modified paths, report directories, dependencies and generated review files are excluded. The date patch, source hashes and full 1,634-file application manifest are the existing reviewed [Option B package](../../mercedes-phase-4b/options/B/).

## Build and dependency evidence

Repository `package.json` defines the 19-step production chain: SSR prepass, routing-path synchronization, Vite client build, final SSR build, prerender, generation of hosting files and the routing/SEO/contact/service validation scripts. It defines TypeScript checks for both app and Node configurations. This is the **repository-defined** build, not proof of the exact host invocation. There is no `packageManager` or `engines` field, no committed pnpm lock, no root Bun configuration and no GitHub workflow establishing the production recipe. [Remote package.json](remote-source/package.json), [remote Vite config](remote-source/vite.config.ts).

The repository contains `bun.lock`, `bun.lockb` and `package-lock.json`. Lovable's official package documentation identifies Bun as its installer and explains that its Bun lockfiles preserve package versions; it recommends Bun when working outside Lovable. That establishes the documented platform mechanism. It does **not** reveal this project's deployed Bun version, which existing lock was consumed, whether an install was frozen, dependency cache state, environment, or precise production build command. [Lovable package documentation](https://docs.lovable.dev/tips-tricks/npm-packages).

| Dependency | Committed bun.lock | Committed npm lock | Validated Phase 4B pnpm cohort |
|---|---:|---:|---:|
| Vite | 5.4.10 | 5.4.10 | 5.4.21 |
| TypeScript | 5.6.3 | 5.6.3 | 5.9.3 |
| React Router DOM | 6.27.0 | 6.27.0 | 6.30.6 |
| React | 18.3.1 | 18.3.1 | 18.3.1 |
| Vite React SWC plugin | 3.7.1 | 3.7.1 | 3.11.0 |
| @lovable.dev/mcp-js | 0.20.0 | 0.20.1 | 0.20.1 |
| @supabase/supabase-js | 2.103.0 | 2.103.0 | 2.113.0 |
| Zod | 4.4.3 | 4.4.3 | 4.5.4 |

All 69 direct dependency entries were parsed. Committed Bun versions differ from the reviewed pnpm cohort for 59, and npm versions differ for 58. These counts compare lockfiles with the local validated environment; they are **not a count of confirmed production regressions or packages that would change on the next publish**. Matching sampled public assets in an earlier build does not establish every host dependency or lockfile choice. No lockfile was rewritten to manufacture parity.

Bun's primary documentation describes text `bun.lock` as the default since Bun 1.2, frozen installation and the older binary format. Its documented reproducible-install command is `bun install --frozen-lockfile` (or `bun ci`). That is a reproduction technique, not a claim that Lovable invokes this flag or permission to change hosting settings. [Bun lockfile](https://bun.sh/docs/pm/lockfile), [Bun install](https://bun.sh/docs/pm/cli/install).

## What the existing mechanism supports

Lovable's official publishing instructions describe deploying the current project snapshot through Publish → Publish changes. Later source edits do not automatically replace that live snapshot. They do not document uploading an arbitrary prebuilt local ZIP as a substitute. The connected deployment tool likewise accepts project ID and optional name, not a local artifact or commit SHA; it was inspected but never invoked. [Publish documentation](https://docs.lovable.dev/features/publish), [hosting documentation](https://docs.lovable.dev/features/hosting).

Official Git sync instructions say changes pushed to the active repository branch sync into Lovable and that its settings show branch and same-commit status. This project's repository/branch connection is now confirmed as `hash4444/Digitec-Performance-website` / `main`. Future source synchronization is viable through that existing connection; the resulting host build still requires verification. Merely preparing a patch does not transfer it; a push or merge would require later authorization. [GitHub sync documentation](https://docs.lovable.dev/integrations/github).

The 1,634-file Option B bundle is a validated comparison artifact. It is not evidence that the existing Lovable publisher will consume those exact bytes. If the platform rebuilds from the committed Bun dependency tree, the resulting assets may differ from the saved pnpm artifact and must be reviewed as a new host-generated candidate. Do not silently substitute it, alter dependency locks, migrate hosts or activate generated routing files to obtain a comparison match.

## Future release steps — documented, not executed

1. Recheck the known live Published source `13d1c19e99e9696ab63e5721ada18ffcfce11519`, the existing `main` Git connection/sync status, current project/domain target, public manifest and unknown-URL behavior. Resolve any drift from the saved baseline before source synchronization.
2. Obtain the actual build recipe and dependency evidence: Bun/runtime versions, selected lock hash, installation flags/cache policy, build command and current published build identifier. Do not expose secrets; retain only required build settings and hashes.
3. After separate authorization, synchronize **only the four reviewed source files** through the confirmed existing Git/Lovable mechanism. Verify the resulting source diff and exact candidate commit in Lovable. Any automated edits, lock changes or unrelated files are a stop condition.
4. Validate the host-generated unpublished candidate using its actual production recipe. Compare its complete artifact/asset manifest, sitemap's 1,005 URLs and exactly two supported revision dates, SSR/metadata/structured data/hreflang, protected languages/brands, both contact flows and desktop/mobile journeys. Resolve the console finding using the parent investigation. A development preview alone is insufficient proof of production SSR output.
5. Confirm the exact previous Published version is still selectable and has an available restore mechanism with understood code/backend effects. Secure the coherent previous release and obtain rollback authorization. Do not rely on sampled HTTP responses as a complete backup.
6. Only after explicit publication approval, open the existing project's Publish dialog, retain the current URL/domain/audience and select Publish changes. Record the actual deployment ID, source SHA and activation time. No hosting migration, routing-layer activation or Cloudflare action belongs to this release.
7. Run the prepared post-publication matrix. Stop on any unexplained status, redirect, asset, canonical, sitemap, contact, layout or JavaScript regression. Do not patch unrelated systems or roll back without the separate authority required by the release plan.

## Rollback evidence and limits

GitHub retains the identified currently published source commit `13d1c19e99e9696ab63e5721ada18ffcfce11519`, so the **source state** is available. That does not alone restore the exact current compiled release or dependency environment.

Lovable's History documentation says the live version has a Published badge and can be inspected without changing it. It also states that Revert restores project code and redeploys associated edge functions, while leaving database data unchanged, and that sufficiently old versions may no longer be restorable. Therefore the actual version and enabled restore action must be checked; generic documentation is insufficient evidence of reliable rollback for this project. [Version history documentation](https://docs.lovable.dev/features/projects/history).

The parent inspected the current Published/latest version's Revert affordance. Its recorded DOM styling includes `cursor-not-allowed`; the HTML `disabled` property is false and `aria-disabled` is absent. Inspection produced no new dialog or accessibility-tree change. This is evidence of the current version's unavailable interaction, not proof that the version will be restorable after a future publication. [Current-version interaction](../host/current-published-revert-dialog.ax.txt), [actual DOM capture](../host/revert-affordance-dom.json).

The parent then opened the **older October 20 version's confirmation dialog only**. The dialog identifies the version date/time and describes returning the project to that state. The final **Revert** button was never clicked; the dialog was dismissed with Escape. This verifies that a historical restore confirmation is accessible, but its text does not establish static-only scope, exclude backend effects, or promise restoration of exact compiled bytes. No confirmation was accepted, and no restoration or deployment occurred. [Historical confirmation capture](../host/historical-restore-confirmation.ax.txt), [screenshot](../host/historical-restore-confirmation.png), [parent UI observations](../host/ui-observations.json).

The published-site action menu offered appearance/documentation/unpublish controls, with no observed independent compiled-release rollback control. [Site actions](../host/published-actions.ax.txt). The current coherent compiled release therefore remains an unverified rollback target even though its source and general history controls are available.

The authenticated UI settings and read tools inspected by the parent did not expose an actual production build command, runtime/install flags or build logs. A source-level configuration for a separate Sites mirror is not a Lovable production build recipe. These gaps remain blockers rather than authorization requests to alter hosting.

After any separately approved rollback, restore the confirmed previous coherent release through the existing mechanism, preserving all seven Cloudflare rules and origin handling. If the only available control also redeploys unrelated backend functions, that effect needs explicit review before use. Reversing four source changes and rebuilding is a fallback requiring verification of the dependency recipe; it is not a guaranteed byte-identical restore. Never mix older HTML with newer entry chunks or activate `_worker.js`/`_redirects` during restoration.

## Remaining technical gates

- Published source/SHA and current Git connection: **resolved** by the authenticated UI/history/diff mapping above. Recheck immediately before any later authorized release.
- Actual production install/build recipe and host-generated Option B output: unverified here; committed lockfiles and local validated dependencies differ materially.
- Reliable compiled-release restoration and understood effects of the available restore mechanism: unverified. The known source commit, current-version affordance and older-version confirmation dialog are insufficient proof.
- Complete host candidate validation and a current coherent rollback target: required before publication.
- Browser-console causality and risk acceptance: owned by the parent controlled journey investigation.

The independent decision is **NO-GO**. Source synchronization is technically prepared, and the current published source is identified. Production publication remains blocked until the host build and restoration gates are resolved or independently evidenced; additional publication authorization alone does not establish technical compatibility.

## Evidence inventory

`github-summary.json` and `repository-verification.json` are bounded machine-readable results. `api/` retains raw authenticated GitHub read responses, including explicitly retained failed unsupported-endpoint/oversized-tree attempts; successful bounded branch/tree/check reads replace those attempts. `remote-source/` contains exact fetched bytes at immutable commit, independently verified by Git blob hashes. `verify-repository.mjs` rechecks those bytes, reviewed hashes, patch applicability and all direct lock versions. No environment or secret file was read.
