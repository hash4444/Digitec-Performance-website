# Option B — existing Lovable release and recovery runbook

**Status: blocked / not executed.** This is a preparation document, not publication or rollback authorization. The Phase4C decision is NO-GO until the host build and recovery evidence is complete. Do not use a deploy API, Git push/merge, Revert confirmation, Cloudflare operation or indexing action during the present phase.

## Verified targets and scope

- Lovable project: `b8255283-fdd9-4c2d-8b46-ccb596f695e1`; [existing editor](https://lovable.dev/projects/b8255283-fdd9-4c2d-8b46-ccb596f695e1).
- Existing published website: [digitecme.com](https://digitecme.com/). Retain existing domains, audience, DNS, origin and routing model.
- Repository/active branch: `hash4444/Digitec-Performance-website` / `main`, connected and in sync.
- Current Published source/recovery reference: `13d1c19e99e9696ab63e5721ada18ffcfce11519`, History title `Record activated Mercedes oil alias redirect`, edit `edt-c8e47408-b978-42a4-af1c-a3556a12986b`.
- Approved comparison patch: [Option B source patch](../../mercedes-phase-4b/options/B/source.patch), [four source hashes](../../mercedes-phase-4b/options/B/source-changes.json). Publish only those four source changes, with their normal reviewed build outputs. Do not synchronize the whole workspace.
- Reviewed local artifact: [1,634-file manifest](../../mercedes-phase-4b/options/B/publication-manifest.json), [verified ZIP](../../mercedes-phase-4b/options/B/application-static.zip). This is the validation reference; existing Lovable publishing has no verified arbitrary-ZIP-upload mechanism.

The runbook paths above point to existing evidence. No future commit SHA, deployment ID, install flags or rollback artifact ID is invented.

## Gate 1 — host build record

Before any production publication, obtain the actual current and proposed production build records. Required fields are source SHA; selected lockfile path/hash; Bun and runtime versions; install command and frozen/cache behavior; build command/mode/output directory; build status; complete artifact/manifest identity; and deployment/version identifier. Record only needed configuration/hashes, never secrets.

`package.json` defines 19 stages, but no observed provider log proves it invokes that chain. Lovable documents Bun installation; the selected local artifact uses a frozen pnpm dependency tree. Do not translate one into the other by assumption, edit a lock or guess a Bun version. A development preview, repository check status, up-to-date badge or local build is insufficient.

If the provider cannot expose this evidence, remain NO-GO and obtain it from the project owner/provider. Do not create a production deployment to discover the build recipe.

## Gate 2 — current recovery target

Confirm provider retention and restoration of the coherent current release identified above. Record the exact selectable version/artifact ID, supported restore steps, required permissions, expected duration and code/backend effects. Establish whether restoring source triggers a rebuild, whether exact old compiled bytes are retained, and whether associated functions would be redeployed. The current source is available in Git, but that alone is not an exact compiled-release backup.

The old-version dialog was inspected only; no restore was performed. It says the project reverts to the old appearance and newer edits remain in chat. It does not prove frontend-only rollback. Do not use Unpublish as rollback, revert the earlier Oct20 source instead of the current Oct21 target, or disable any Cloudflare rule.

If only a generic project/code revert is available, review its documented function-deployment effects and obtain explicit scope approval. If exact compiled restoration cannot be established, define and validate a source-rebuild recovery using the actual host recipe before release; do not present it as byte-identical restoration. A rollback exercise or cloud candidate creation needs separate authorization.

## Gate 3 — prepare the host candidate after separate authorization

1. Recheck the current Published history badge, target domain, connected repository/branch, GitHub HEAD and public manifest. Stop on drift from the recorded baseline until reconciled.
2. In an isolated source revision based on the verified current commit, apply only the reviewed B patch and verify the four before/after hashes. Exclude reports, dependencies, QA scripts, stale generated evidence and both pre-existing unrelated dirty files. Do not add package/lock, Cloudflare or deployment changes.
3. Use the established review/source synchronization flow. A push/merge to active `main` is a separate, explicitly authorized write; it is not performed here. Confirm Lovable synchronizes the exact resulting commit and shows only the intended four source changes. Do not ask the builder to redesign or rewrite the patch.
4. Build an **unpublished production-mode** candidate with the actual provider recipe. A normal development preview is not enough to verify static prerender output. Obtain the complete host artifact and compare it with its own immutable manifest and the reviewed source/SEO expectations. Review every derived difference from the local reference; a different entry hash is not automatically a failure or automatically safe.
5. Confirm all 1,005 sitemap URLs/order and exactly the two supported Oct26 dates, all 1,256 route metadata/JSON-LD/hreflang, Arabic/other-brand controls, only two changed English roots, valid asset graph, contact drafts and responsive/keyboard behavior. A changed file count or unexpected generated content must be explained and reviewed; never edit compiled files to force equality.
6. Repeat the same browser journeys with the host-built artifact. Capture route/action, exception text/stack and asset/build IDs. Clear the bounded console risk by attribution or informed explicit acceptance after a successful same-build smoke test.
7. Confirm generated `_worker.js`, `_redirects` and headers remain under the existing inert/static treatment. No Pages/Workers migration, route binding or new 404/410 handling is allowed. Unknown documents must retain the currently observed origin behavior for this release.

If these gates cannot be completed without a prohibited live/source/configuration write, stop and obtain separately scoped authorization. Current read-only work does not authorize their execution.

## Publication — only after a later explicit approval

1. Confirm the approved host candidate's exact source SHA, build identity and manifest, the previous coherent recovery target and approved rollback scope. Freeze further source edits.
2. In the existing project, open **Publish**. Keep the current URL, domains and audience. Review the pending change summary; abort on unrelated source, package, backend or configuration changes.
3. Select **Publish changes** only under the separate publication authorization. This action is not performed in Phase4C. Record actual source SHA, provider release/build ID, submission/completion times in UTC and Dubai, and the new Published badge.
4. Do not deploy the local ZIP by a different platform, invoke old Worker/Bulk Redirect instructions, modify DNS or submit sitemap/indexing requests.

## Immediate post-publication checklist

Save raw responses, headers/CF-Ray, timestamps and expected/observed values for the following. Reuse the prepared [public capture harnesses](../production/) after directing their outputs to a new release evidence directory; preserve all pre-release evidence.

- Exact published-source/build identity and all expected manifest files/references; verify no missing JS/CSS or stale entry/chunk pairing. Test direct load, client navigation and a pre-release-open-tab update scenario for the existing lazy-import recovery behavior.
- English hub/body: exact approved additions, successful contact anchors/drafts, page title/H1/description/canonical/robots, structured data, hreflang and successful repair relevance.
- Arabic hub/body and English/Arabic BMW plus other unaffected controls: expected content and metadata. Compare the complete available host artifact's protected route outputs, not only two public pages.
- Sitemap: direct200, XML parsing, exactly1,005 unique URLs/order, canonical conventions, only the supported English hub/body date changes. No automatic submission.
- Full 192-case R1–R4 matrix, protected48 oil cases, broad Mercedes aliases and other protected controls: exact status/Location/query preservation, final relevant200, no loops/homepage fallback/unintended chain. Protect all seven rules; HTTP behavior is not an authenticated definition/order inventory.
- Unknown-origin48case matrix: both schemes/hosts/methods, English/Arabic unknown documents and missing JS. Preserve existing path/query normalization, homepage200 document fallback and missing-asset404.
- Desktop and390/320CSSpixel frames plus an actual mobile-device check where available: wrapping, navigation, keyboard focus, FAQ/menu, all three body enquiry placements and new workshop phone. Do not send a customer enquiry during a verification test without separate instruction.
- Console and runtime: exact error/stack/build/action capture. Distinguish expected platform/analytics behavior from uncaught application errors; do not suppress errors to pass.

## Stop conditions and rollback

Stop on any unexpected source/lock change, failed/incomplete build, unavailable recovery target, mismatched candidate manifest, missing assets, metadata/canonical/hreflang/schema drift, extra/lost sitemap URLs or dates, Arabic/other-brand changes, broken enquiry/navigation/hydration, unexpected status/query loss/redirect chain, unknown-origin behavior change or new routing activation. Also stop if the publication mechanism would redeploy unrelated backend/configuration changes that were not reviewed.

Preserve evidence and report the failure. Do not improvise a live fix, change rules or roll back without explicit authority unless the later release approval separately preauthorizes that precise rollback.

After rollback approval, restore the confirmed **current pre-release coherent frontend version** via the verified existing mechanism, with matching HTML, manifest, chunks and sitemap. Record source/release IDs and actual restore times. If the chosen control also changes backend functions, its effects must already be reviewed and authorized. If using a source reversal instead, reverse only the approved B changes, rebuild with the verified host recipe and validate it; this is a rebuild, not assumed old-byte restoration. Repeat the complete post-publication checklist against the recovery baseline. Leave every Cloudflare rule, DNS, domain and routing policy intact.

**No step in this document has been executed as a release or rollback.**
