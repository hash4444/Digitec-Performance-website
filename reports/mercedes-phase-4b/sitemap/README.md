# Sitemap date provenance and proposed policy

**The four 20 October dates are supported by actual content changes.** They are explicit per-page editorial dates, not values derived from today’s build, file modification time or Git timestamp. The saved public sitemap captured on 26 October already reports all four as `2026-10-20`; the original checkout’s generated sitemap is older than that observation. This finding does not authorize a sitemap edit or deployment.

| Existing canonical path | Original checkout sitemap | Current catalog / both Phase 4 builds | Saved public sitemap, 26 October | Substantive 20 October evidence |
|---|---|---|---|---|
| `/brands/mercedes-benz-service-dubai` | 2026-10-05 | 2026-10-20 | 2026-10-20 | Revised main servicing copy, A/B scope, FAQ content/schema and booking intake |
| `/ar/brands/mercedes-benz-service-dubai` | 2026-10-05 | 2026-10-20 | 2026-10-20 | Equivalent Arabic servicing, FAQ/schema and intake changes |
| `/services` | 2026-10-12 | 2026-10-20 | 2026-10-20 | New visible scheduled-Mercedes section and contextual maintenance link |
| `/ar/services` | 2026-10-12 | 2026-10-20 | 2026-10-20 | Equivalent Arabic section and localized maintenance link |

All five compared sitemaps—the original checkout, historical 20 October candidate, both Phase 4 builds and saved public capture—contain the same **1,005 URL entries in the same order**. The selected dates and complete hashes are in [provenance.json](provenance.json).

## Evidence chain

1. [The route catalog](../../../src/lib/route-manifest.ts:249) explicitly lists only these four paths in `mercedesServiceCampaignPaths` and assigns `2026-10-20` after the older date layers. The older T1 layer explains the hub’s stored `2026-10-05`; the paint-protection layer explains the indexes’ stored `2026-10-12`. Neither wins after the campaign override.
2. [The prerenderer](../../../scripts/prerender.mjs:149) serializes `route.lastmod` directly for indexable routes. Its sitemap output does not choose a date from the clock, file timestamps or Git. No generator change is needed to explain the four-row regeneration.
3. Commit `b793ad0acf3cd534217d862a44f2e1d915789ec2`, recorded at 20 October 10:34:48 Dubai, contains both the date override and the substantive bilingual changes. The [actual historical diff](historical-content-and-date.patch) is retained; the commit timestamp alone is not the evidence of significance.
4. Independent inspection of the saved before/after HTML confirms that the hub maintenance sections changed in both languages and that the services-index sections were absent before and present after. [before-after-content.json](before-after-content.json) contains exact rendered excerpts, metadata and FAQ comparisons. The original 20 October static QA recorded 10,155 passing assertions and these four changed pages. All six relevant current source files match that historical candidate byte for byte; no subsequent Git changes to those paths were found between the campaign commit and current HEAD.
5. The [saved public sitemap capture](../../mercedes-phase-3/indexing/http/2026-10-26T07-45-54-376Z/sitemap.xml) already contains all four `2026-10-20` dates. Its [capture record](../../mercedes-phase-3/indexing/http/2026-10-26T07-45-54-376Z/capture.json) spans **07:45:54.378–07:46:03.591 UTC / 11:45:54.378–11:46:03.591 Dubai on 26 October**. This is existing evidence, not a new production request in Phase 4B.

The historical campaign release record explicitly says `deployed: false`, `published: false` and production NO-GO at that checkpoint. The source revision and local rendered change are evidenced on 20 October; the exact later first-publication time is not identified. Observing the dates in the later public sitemap does not prove when the deployment happened or that every intermediate state was unchanged.

## Assessment of the proposed Option B dates

Google expects an accurate significant-content revision date and generally regards changes to main content, structured data or links as significant. It does not prescribe a minimum word count or require a date bump for every trivial edit. [Google sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) (checked 26 October 2026).

Google also distinguishes meaningful primary-content/link updates from insignificant template changes, permits omission where dates cannot be established confidently, and describes `lastmod` as a crawl-scheduling signal. A date is not proof of recrawling, indexing or ranking improvement. [Google’s lastmod guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping).

The following is a reasonable, separately disclosed **local content-date proposal**, while keeping the normal generator unchanged:

| Path | Current generated date | Proposed local revision date | Reason |
|---|---|---|---|
| `/brands/mercedes-benz-service-dubai` | 2026-10-20 | 2026-10-26 | H3-01 adds two useful service links within the primary workshop caption; H3-02 adds verified arrival/contact guidance in the existing visit card. The meaningful link change supports the judgment; a telephone/tracking adjustment alone would not justify a blanket date refresh. |
| `/services/mercedes-body-repair-dubai` | **2026-09-28** | 2026-10-26 | S1 changes visible service-specific assessment/quotation instructions and the three enquiry drafts to request panels, photos and sensor context. This changes the guidance given to the visitor, rather than merely a bundle hash or tracking label. |

The [Phase 4 controlled-copy record](../../mercedes-phase-4/controlled-copy.json) dates the exact three approved source changes to **08:58:35.555 UTC / 12:58:35.555 Dubai on 26 October**. Its hashes and the [75/75 SSR verification](../../mercedes-phase-4/tests/results/results.json), including exact rendered additions and contact drafts, are incorporated into `provenance.json`. These support a 26 October preparation/revision date; they do not mean the candidate has been published.

If approved for a later implementation package, add a separate override for **only those two English paths** after the existing campaign loop ends at [route-manifest.ts:256](../../../src/lib/route-manifest.ts:256), before the `indexableRoutes` export at line 258. This adds one explicitly identified source metadata change beyond the three Phase 4 source files; it must not be silently included. No override patch was created or applied by this subtask.

Keep the Arabic hub and both services indexes at their supported `2026-10-20` revision date. Keep Arabic body repair at `2026-09-28`. Preserve all other dates, URL membership, canonicals, indexability and routing behavior. An English edit does not establish a revision to its Arabic counterpart or the services directories.

## Recommended date record

Keep a per-path editorial record with the meaningful content diff, frozen source/render hashes and actual revision date. Store preparation and publication timestamps separately. Reassess only paths that receive a later significant edit; a rebuild, fingerprint, validation report or copyright refresh is insufficient. If a date cannot be substantiated, retain a verified older date or propose omission for that URL through explicit review instead of inventing one.

This review used local source, Git and saved HTTP/QA evidence, plus the two primary Google documentation pages. It modified only this report directory. No website, generator, sitemap, Cloudflare, indexing or account changes were made.
