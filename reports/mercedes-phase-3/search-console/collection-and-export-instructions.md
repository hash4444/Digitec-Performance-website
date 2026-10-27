# Phase 3 Search Console collection protocol

Collection is complete for this session and stopped on an explicit Google Search Console **429 / Too many requests** response at 08:26:29 UTC on October 26. The parent collected authenticated UI evidence using the existing account: all **108** exact-query Pages cells (six queries × two country segments × three devices × three windows), all **36** query-only daily series, **33 of 96** planned exact-page daily series, and **eight** strict stored URL inspections. There are 328 actual paired Pages rows and 6,210 accepted daily rows. Three incomplete daily attempts are rejected and 60 were unattempted; the 63 missing series remain unavailable. No additional sign-in, scope change, cookie access, hidden API, live URL test or indexing action was used.

Use [paired analysis](analysis.md), [daily baseline](daily-analysis.md), [stored canonical summary](indexed-summary.md) and [final collection availability](collection-final-availability.json) for measured results. The authoritative daily plan is [daily-capture-specs.json](daily-capture-specs.json). The initial `collection-plan.json` contains a historical UAE-only subset of 54 Pages cells, 18 query-daily cells and 28 inspection candidates; it is a plan, not the final coverage manifest. Headers-only CSV templates contain no measured rows. The delegated agent's IAB browser was unavailable; authenticated data was collected by the parent in its working UI session.

Exact [missing-series filters](missing-daily-series.csv) and [follow-up export instructions](remaining-export-instructions.md) record the five remaining UAE all-device pairs, 23 mobile pairs and 35 desktop pairs. A separately exported matched prior 90-day comparator would cover **April 28–July 26, 2026 inclusive**. Additional planned URL inspections remain uncollected; do not infer their statuses from the eight accepted reports. No navigation continued after the rate-limit stop.

## Exact queries and common windows

Use the verified property `sc-domain:digitecme.com` and these six exact query strings:

1. `mercedes service dubai`
2. `mercedes repair dubai`
3. `mercedes specialist dubai`
4. `mercedes workshop dubai`
5. `mercedes maintenance dubai`
6. `mercedes oil change dubai`

The parent verified **24 October 2026** as the common latest complete day and used that end date for all current performance windows. Search Console daily dates use Pacific Time; UTC capture timestamps are separate.

| Window | Inclusive start | Inclusive end | Days |
| --- | --- | --- | ---: |
| 7-day baseline | 2026-10-18 | 2026-10-24 | 7 |
| 28-day | 2026-09-27 | 2026-10-24 | 28 |
| 90-day | 2026-07-27 | 2026-10-24 | 90 |

Inspect the report's latest available date and any preliminary/partial labels. If a later common complete day is chosen, recalculate all three windows together and retain the original October 24 baseline separately. Capture date ranges explicitly; a “3 months” preset is not a 90-day definition. Keep GSC daily reporting dates distinct from Dubai capture timestamps. Record the actual search-type label, targeting the baseline's **Web (text-based)**; do not silently combine Web variants.

## Pages attribution: 108 collected cells; original UAE subset 54

For each exact query × 7/28/90-day window × ALL/Mobile/Desktop device, collect both ALL-country and UAE segments. The original 54-cell UAE procedure follows; for ALL-country, leave Country unfiltered:

1. Open Performance / Search results; record property and search-type label. Clear Page, Query, Country, Device and search-appearance filters left by earlier captures.
2. Set the exact custom date range. Enable Clicks, Impressions, Average CTR and Average position.
3. Add Country = **United Arab Emirates**. This is UAE country segmentation, not a Dubai-local rank.
4. Add Query = **Exact query**, using the full query string. Preserve operator evidence, since “contains” would select a different cohort.
5. For ALL, leave Device unfiltered. For Mobile or Desktop, apply that exact device filter. ALL includes tablet and cannot be reconstructed by assuming Mobile + Desktop exhausts the cohort.
6. Select the **Pages** tab. Keep Page unfiltered so every returned URL is visible. Retain unexpected, slash, Arabic, homepage and non-Mercedes URLs when actually returned.
7. Capture the active filters, all metric cards, complete visible Pages rows, displayed row count, table pagination and preliminary/limited-data notices. Export CSV/Excel through the normal UI when available. Preserve original export packages and Filters sheets.
8. Save the observation/export and complete a manifest row. Example name: `pages_28d_ARE_MOBILE_mercedes-service-dubai.xlsx`. The manifest must retain the exact query; the filename slug is insufficient.
9. If no rows appear, record `NO_VISIBLE_ROWS` with the filters and UI evidence. Keep numerical fields absent. Do not turn absence into zero impressions, a rank or proof that a page never ranks.

The machine-readable `collection-plan.json` enumerates the original 54 UAE cells. `paired-ui-validation.json` enumerates all 108 validated UAE/global cells and retains accepted/rejected attempts and source hashes. Actual raw captures and their filter evidence are the authority on measured values.

## Daily series without invented query-page joins

For each query × device, retain the exact query and country segment, set the 90-day custom range and select **Dates**, daily granularity. All **36 exact-query daily series** (18 UAE plus 18 ALL-country) are accepted and can support compatible 7/28/90-day query-level summaries. Their dimension is query+date across all attributed pages, so they cannot establish page-level daily ownership. The authoritative plan separately lists 96 actual observed UAE query/page/device daily series, of which 33 were accepted before the rate-limit stop.

For a daily query-page series, start from an actual returned Pages row. Keep exact Query + UAE + Device, add **Page = Exact URL** with its precise scheme/host/trailing slash, then select Dates and export. Repeat for the leading owner and any observed competing pages. Do not normalize away slash differences before attribution analysis. The dataset manifest must record both exact filters.

To summarize a compatible daily series, add clicks and impressions; compute CTR as clicks/impressions when impressions are positive. An impression-weighted position derived from rounded daily positions is approximate and must be labeled accordingly. Do not average daily CTR percentages. Do not add overlapping 7/28/90-day totals or sum Page aggregates to recreate a Query/property average.

## Stored Google-selected canonicals

`collection-plan.json` contains a 28-URL candidate set covering both slash forms of the hubs, oil, body, mechanical and diagnostics services, the four legacy aliases and the protected English oil alias. Eight strict accepted reports cover the hub, oil and body slash/slashless variants, mechanical, diagnostics and Arabic body repair. Other candidates remain uncollected after the 429 stop. Prioritize URLs that actually appear in paired Pages data and inspect any different selected canonical separately when ordinary access is available.

Paste each exact URL into **Inspect any URL**, load the ordinary Google Index report, and expand Page indexing where necessary. Save rendered report text and record overall status, indexing reason, last crawl as displayed, crawled-as, crawl allowed, fetch status, indexing allowed, declared canonical and selected canonical. Resolve the label “Inspected URL” to the exact inspected URL; resolve “Same as user-declared canonical” only to the displayed declared value. Preserve N/A/unavailable fields. Record a crawl timezone only if the UI exposes it.

Do not use Test live URL to replace stored selected-canonical evidence. Do not click Request indexing, Validate fix, sitemap submission or settings controls. A stored result may predate the redirects; it cannot demonstrate immediate canonical convergence.

## Evidence and interpretation limits

- A Pages table under an exact Query filter provides paired attribution within its recorded period/country/device filters. Separate unfiltered Queries and Pages tables do not.
- Record table/export limits and suppressed or unavailable data. Visible rows can be incomplete, and page/query aggregation can differ.
- Multiple observed URLs are overlap evidence. Harmful cannibalization needs intent, time-series and ownership evidence; overlap alone is insufficient.
- GSC average position is an aggregate across impressions, not a fixed Dubai rank, Maps position or current live SERP check.
- Compare country, device, exact query, page, period and search-type definitions before making trend claims. A same-day pre/post comparison is not available from these retrospective windows.
- No ranking recovery, indexing response or redirect impact is inferred from an older stored crawl or a pre-deployment reporting period.

## Existing local controls

`local-export-comparability.json` records the existing October 18–24 query-only baseline, 22 historical export manifests and one properly paired historical exact-query control. It preserves source hashes and filters.

The October 26 workbook is unfiltered by country/device and has separate Queries and Pages tabs, with a 1,000-row Queries table. It supports query-only baseline context, not UAE/device/query-page ownership. All six requested exact strings are present in its visible query rows, including `mercedes oil change dubai` at 8 impressions and average position 8.25; this remains ALL-country/ALL-device historical context.

The October 20 authenticated control explicitly used Exact query `mercedes service dubai` for September 20–October 17 and contains paired UAE Pages plus exact-UAE-hub Devices. It is a valid historical paired observation, but its end date and displayed Web label differ from the October 24 baseline. It is not a current or matched-period trend measurement. The October 21 oil exports use the contains-family filter `+mercedes oil change` and different periods; they cannot substitute for exact `mercedes oil change dubai` UAE data.

## Files

- `collection-plan.json`: planned 54 period Pages cells, 18 query-daily cells and 28 inspection candidates.
- `export-manifest-empty.csv`: headers only, for actual filter/source/availability evidence.
- `performance-rows-empty.csv`: headers only, for normalized measured rows.
- `indexed-inspection-empty.csv`: headers only, for actual stored URL inspections.
- `ownership-assessment-empty.csv`: headers only, for conclusions supported by paired measured rows.
- `local-export-comparability.json`: historical local controls with their actual limitations.
- `prepare-collection-plan.mjs`: offline preparation script; no network or UI actions.
