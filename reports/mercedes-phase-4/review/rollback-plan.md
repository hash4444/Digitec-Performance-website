# Content-only rollback plan

This plan covers H3-01, H3-02 and S1 in the controlled local implementation copy. It is documentation, not an executed rollback. No production deployment or Cloudflare change is part of this work.

The exact source allowlist is:

1. `src/pages/BrandPage.tsx`: remove the two new contextual links while retaining the caption words, and remove the appended phone action/arrival sentence.
2. `src/data/mercedesServiceContent.ts`: remove only the English Mercedes body-repair WhatsApp draft property added by S1.
3. `src/pages/BrandServicePage.tsx`: remove only S1's English Mercedes body-repair final-CTA branch, restoring its existing generic fallback.

S2's `src/pages/ServicePage.tsx` is excluded. Preserve all unrelated checkout work, title/H1/description/canonical/robots/schema, URLs/routes, Arabic and other-brand content, existing CTA plumbing, routing/sitemap generation and deployed Cloudflare redirects. A content rollback does not reverse R1–R4 or the protected October 21 English oil redirect.

The prepared candidate passed the guarded reverse applicability check, with exit code 0 and no output, recorded in `controlled-copy-scope-review.json`. This was `--check` only. Re-run it against the current files before any later local reversal; its previous success is not permission to overwrite subsequent work.

Before a local reversal, identify the exact controlled-copy path from `controlled-copy-scope-review.json` and confirm it is the implementation copy. Recheck the three current source hashes against the report's approved after hashes. If any differ, stop and review the new diff rather than replacing whole files or running a repository reset. Preserve the current three files and current validation report in a new local snapshot before reversal.

The combined [approved patch](approved-content-only.patch) contains only the reviewed hub and S1 changes. From the verified controlled copy, the non-mutating applicability check is:

```powershell
git -C '<verified workspace absolute path>' apply --reverse --check --directory=reports/mercedes-phase-4/candidate.local -- '<absolute path to reports/mercedes-phase-4/review/approved-content-only.patch>'
```

The directory argument above must match the controlled copy recorded in the final review JSON; do not redirect it to the shared application source. Only when a local rollback is requested, and the hash guard and reverse check pass, reverse those same hunks in the controlled copy. Use a structured `git apply --reverse` call with the same exact paths. Do not use `git reset --hard`, `git checkout .`, whole-directory replacement, or deletion of generated/application directories. The baseline/after SHA256 values are recorded in the review JSON; reversing approved hunks should restore the reviewed baseline values for all three files while other source paths remain identical to the named baseline.

After reversal, rerun the relevant type/TSX checks, local build/SSR checks and protected-route/CTA controls from the implementation report. Compare hub caption plain text, phone action removal, body CTA fallback and WhatsApp draft restoration; preserve unchanged metadata, Arabic/other-brand controls and routing behavior. Record any pre-existing test failures separately and verify no new failures were introduced. Do not call the phone number, open/send WhatsApp messages, submit forms or indexing requests during rollback QA.

Any future production rollback needs the user-authorized release scope and the exact deployed artifact/version. Until then, retain the rollback patch and before/after evidence locally. No existing Cloudflare rule may be changed as part of this content rollback.
