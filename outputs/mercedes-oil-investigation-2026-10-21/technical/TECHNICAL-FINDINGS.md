# Mercedes oil-change technical evidence — 21 October 2026

Read-only public HTTP capture, supplemented by authenticated Google Search Console URL Inspection collected in this investigation. No source edits, commits, pushes, publication or production configuration changes were made by this audit. Initial HTML means the response body before client JavaScript. The authenticated indexed snapshot and live availability test are distinguished below; a canonical tag alone does not establish Google's selection.

## Findings

| URL path | GET status | Initial HTML canonical | Initial HTML H1 | Assessment |
|---|---:|---|---|---|
| `/services/mercedes-oil-change-dubai` | 200 | Same slashless service URL | Mercedes Oil Change in Dubai | Relevant SSR content, index/follow |
| `/services/mercedes-oil-change-dubai/` | 200 | Slashless service URL | Mercedes Oil Change in Dubai | Identical HTML to slashless; canonical signal present, HTTP consolidation absent |
| `/services/oil-change-dubai` and `/` variant | 200 each | Slashless generic oil URL | Car Oil Change in Dubai | Relevant SSR content, index/follow |
| `/blog/best-oil-change-dubai-mercedes` and `/` variant | 200 each | Slashless blog URL | How to Choose a Mercedes Oil Change in Dubai | Informational comparison guide, index/follow |
| `/brands/mercedes-benz-service-dubai` and `/` variant | 200 each | Slashless Mercedes hub | Mercedes-Benz Service in Dubai | Broader commercial maintenance/service intent, index/follow |
| `/brands/mercedes-benz-service-dubai/oil-change` and `/` variant | 200 each | `https://digitecme.com/` | D IGI-TEC Performance Center | Verified legacy routing defect: homepage fallback, no permanent HTTP redirect |

All five checked slash/no-slash pairs had identical response HTML within each pair. No conflicting HTML canonical appeared on the target service pair. No robots meta blocking was found on these pages; `robots.txt` permits crawling and declares the sitemap. No `X-Robots-Tag` exclusion was returned in saved response headers. An index/follow declaration alone does not establish Google indexation. Authenticated inspection establishes that Google currently selects the target slash URL despite the slashless declaration.

The service page title is `Mercedes Oil Change Dubai | MB-Approved Oil | Digi-Tec`. Its initial HTML contains model/engine-specific approval, quantity, filter, leak inspection, ASSYST compatibility and quote guidance. There is no evidence of an empty SPA shell or homepage fallback on the actual commercial target.

GET and HEAD repeated checks of the service trailing slash and both legacy oil aliases returned 200, including requests with repeated marketing parameters. HTTP apex and HTTPS www each returned 301 to HTTPS apex preserving the path slash and query; the destination then returned 200. See `supplement-evidence.json` for every hop/header.

## Authenticated Google URL Inspection

GSC UI capture dates/times below are transcribed as displayed. Indexed snapshots describe Google's stored state, not the current response to the separate live test.

| Inspected URL | GSC indexed state | User-declared canonical | Google-selected canonical | Last crawl / live test |
|---|---|---|---|---|
| Target service ending `/` | URL on Google; page indexed | Slashless target | Inspected URL, i.e. target ending `/` | 25 Sept 2026, 14:53:48; Googlebot smartphone |
| Slashless target service | URL not on Google; Crawled — currently not indexed | N/A in stored snapshot | N/A in stored snapshot | 11 Oct 2026, 09:31:48; Googlebot smartphone |
| Slashless target live test | URL available to Google; page can be indexed; crawl/indexing allowed and fetch successful | Slashless target | Only determined after indexing | 21 Oct 2026, 10:07:14; Inspection Tool smartphone |
| Slashless generic oil page | URL on Google; page indexed | Self | Inspected URL/self | 20 Oct 2026, 05:07:36 |
| Slashless oil article | URL on Google; page indexed | Self | Inspected URL/self | 11 Oct 2026, 09:31:50 |
| Slashless Mercedes hub | URL on Google; page indexed | Self | Inspected URL/self | 16 Oct 2026, 21:18:38 |
| Slashless legacy brand oil alias | URL not on Google; URL unknown to Google | N/A | N/A | N/A |

The target slash snapshot reports successful fetch, crawl allowed Yes and indexing allowed Yes. No referring sitemaps were detected for that slash URL; referring pages listed are generic oil and `/page-sitemap.xml`. The slashless target's stored snapshot shows a temporary sitemap processing error and references the slash URL and the Arabic legacy oil alias. The live test of the slashless target is successful and indexable; it does not prove indexing or a changed Google canonical.

These results verify a canonical-selection mismatch between the site's slashless preference and Google's indexed slash variant. They support a precise consolidation correction, retaining existing declared ownership. They do not justify changing the HTML canonical to the slash variant or moving ownership to the hub/blog/generic page. The slashless URL's stored N/A fields must not be interpreted as proof that today's canonical/robots tags are missing; today's public response and Google's live test both show the intended canonical and indexability.

The legacy alias being unknown to Google limits its explanatory value for current ranking performance. A result surfaced by a separate public search service is not evidence that this alias is indexed by Google.

## Sitemap and links

Live sitemap includes exactly the slashless commercial service (`lastmod` 2026-09-14), generic oil page (2026-09-10), informational oil blog (2026-09-28), and hub (2026-10-20). It excludes the legacy brand oil alias and the checked trailing-slash forms. Sitemap and canonical ownership therefore agree on slashless URLs.

Local pre-build `dist` link inventory found 27 links from 24 distinct generated pages to the slashless dedicated service; 13 links from 13 pages to the oil guide; 709 links from 686 pages to generic oil; and 816 links from 686 pages to the Mercedes hub. Broad counts include repeated navigation/footer links and are not measures of contextual link strength. No trailing-slash link to those four routes was found in that generated inventory. Raw anchor text and source paths are in `local-inlinks.json`. Relevant live pages also link to the dedicated service: the generic oil page, oil guide and Mercedes hub. The guide's commercial CTA points to the existing dedicated service owner.

## Local routing and recent release

The repository already prepares exact permanent 308 redirects from `/brands/mercedes-benz-service-dubai/oil-change` (including trailing slash) to `/services/mercedes-oil-change-dubai`; its scoped Mercedes router also normalizes the target service trailing slash to slashless. The production router passed 24 focused status/destination assertions across GET/HEAD, the target slash and legacy aliases, with and without repeated query parameters. This proves local behavior only. Current public HTTP behavior does not match it.

The appropriate narrow correction is activation of the existing exact HTTP rule on the actual production host, after authorized review of that host's routing. Adding another React redirect or changing canonical ownership does not solve the observed initial-response defect. No duplicate source rule was added because the required mapping already exists. The broad pre-existing router should not be enabled incidentally; a scoped activation is preferable. `docs/seo/mercedes-release-deployment.md` already records this hosting distinction.

A local hosting-only review copy is prepared in `../proposed-hosting-only/`: two logical rules, three exact source paths (both legacy oil alias forms and service trailing slash), all directed to the existing slashless service. It passes 48 redirect cases and 75 pass-through cases, 246 assertions total. Only GET/HEAD on the site's apex/www hosts match, with queries preserved. Unrelated Mercedes, diagnostics, tuning, PPF, generic oil and blog routes pass unchanged. It has not been attached to any route, installed or deployed. See `REVIEW-NOTES.md` and `local-qa.json`. Because Google currently selects the slash variant, monitor both target forms together during consolidation; do not claim instant canonical acceptance or ranking recovery.

Current HEAD is `b793ad0acf3cd534217d862a44f2e1d915789ec2` (20 October): Mercedes service hub campaign plus About videos. The six Mercedes source files changed were hub/directory/shared hub-scope files; it did not directly rewrite the dedicated oil service title, content, canonical or redirect ownership. The live hub title/H1 and live sitemap lastmod reflect the new campaign. The starting local `dist` hub title/H1 and `public/sitemap.xml` lastmod were older generated values; they are stale local artifacts, not evidence of a live rollback. A fresh controlled build is needed for current local QA. Git release evidence expressly says the prior Git task did not verify an explicit publisher action, so an exact live deployment time/commit cannot be inferred solely from the Git push.

## Causal interpretation

High confidence: the actual dedicated service currently returns relevant indexable initial HTML and a consistent slashless canonical; Google indexes/selects the slash variant and stores the slashless target as crawled but not indexed; a separate legacy alias has a demonstrable routing fault but is unknown to Google; the current live server does not perform target trailing-slash normalization.

Unestablished from technical evidence alone: whether the canonical mismatch or legacy fault affected the 24-hour impressions, or whether competing DIGI-TEC pages meaningfully alternate for the exact query over time. Evaluate the separately collected exact-query/page daily evidence. The duplicate 200 slash pair now has a verified Google canonical-selection mismatch despite aligned HTML/sitemap/internal-link preferences, so precise HTTP consolidation is justified. It is not evidence of a penalty or a verified causal explanation for an average position of 45.5.

## Evidence files

- `live-evidence.json`: timestamp, 12 direct GET paths, headers, initial HTML metadata/content, relevant links.
- `live-0.html`–`live-11.html`: raw initial HTTP bodies in path order listed in `audit.mjs`.
- `supplement-evidence.json`: GET/HEAD HTTP/www/query chains, sitemap rows, pair equality and local focused redirect assertions.
- `local-html-evidence.json`, `local-inlinks.json`: starting local generated HTML and all relevant anchors.
- `latest-mercedes-deployment-diff.txt`, `recent-git-history.txt`: observed release scope and commit dates.
- `audit.mjs`, `supplement.mjs`: reproducible evidence collectors; scripts do not publish or modify source.
- `../authenticated/inspection-*.txt` and target slash screenshot: authenticated GSC index snapshots/live test underlying the table above.
- `../proposed-hosting-only/`: reviewable exact hosting redirect proposal and passing offline QA; no production activation.
