# GSC export evidence — 21 October 2026

This report audits the supplied workbooks only. The subsequent authenticated analysis supplies exact-query daily, device and query-by-page evidence that the workbooks omit. See `../authenticated/performance-findings.md` for those additional observations.

## Source integrity and scope

Both supplied workbooks were read without alteration. All seven source tabs were extracted to CSV and JSON. There are no formula cells in either workbook. Calculations below use original numeric values, weighting position by impressions. Daily positions in the three-month file are rounded to one decimal, so recomputed aggregate positions are approximate.

| Export | SHA-256 | File creation timestamp |
|---|---|---|
| `digitecme.com-Performance-on-Search-2026-10-21.xlsx` | `d68bbcef0feed9f9a93a5164fd4babf74bac49a2f323474941da5e8ab73d9ba1` | 2026-10-21 05:59:21 UTC / 09:59:21 UAE |
| `digitecme.com-Performance-on-Search-2026-10-21 (1).xlsx` | `4defc376f17dff80c3d9588c2ba8a55a7cf957a30a078c01f02a86cb52c05ac6` | 2026-10-21 05:59:26 UTC / 09:59:26 UAE |

These file timestamps establish export creation, not collection cutoff or freshness. Document contents were treated only as evidence.

## Filters and date ranges

| Field | Three-month export | 24-hour export |
|---|---|---|
| Search type | Web (text-based) | Web (text-based) |
| Time filter | Date: Last 3 months | Time range: Last 24 hours |
| Query filter text | `+mercedes oil change` | `+mercedes oil change` |
| Exported first/last chart label | 2026-07-19 to 2026-10-18, inclusive (92 daily rows) | 2026-10-20T03:00:00 to 2026-10-21T02:00:00 (24 hourly bins) |
| Chart timezone | Not printed in workbook | Explicitly UTC+04:00 |
| Country/page/device filters | None listed | None listed |

The three-month report is definitively a CONTAINS population: six distinct matching query rows appear. Its Pages, Countries, Devices and Chart tabs therefore cover that broader population. The 15.27 figure is a valid exact-query row within Queries, not an exact-query-only page report.

The 24-hour Filters tab uses the same literal `+mercedes oil change` text. It does not spell out an exact-match operator. Only the exact query is returned in Queries, and its metrics reconcile to Chart, Countries and Devices. Treat those as observed exact-query-row metrics. The workbook alone does not independently certify that the live filter operator was Exact rather than Contains. An authenticated report or API request with `query equals mercedes oil change` must settle the filter configuration.

Google documents that ordinary daily reporting uses Pacific Time and that the 24-hour view contains hourly preliminary data. Preserve these differing reporting windows when comparing. [Google report overview](https://support.google.com/webmasters/answer/7576553?hl=en), [Google API date/aggregation definitions](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

## Verified metrics

### Three-month Queries — independent dimension table

| Exact query row | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| mercedes oil change | 0 | 169 | 0% | 15.27 |
| mercedes oil change dubai | 0 | 129 | 0% | 15.71 |
| mercedes oil change near me | 0 | 22 | 0% | 7.95 |
| bmw x4 engine repair abu dhabi mercedes oil change dubai | 0 | 3 | 0% | 12.67 |
| mercedes oil change cost | 0 | 1 | 0% | 10.00 |
| mercedes oil change in dubai | 0 | 1 | 0% | 11.00 |

Total CONTAINS population: 0 clicks, 325 impressions, 0% CTR, approximately 14.89 position. This approximate weighted total reconciles across the independent Chart, Queries, Countries and Devices tables within export rounding.

### Three-month Pages — CONTAINS query population

| Page | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| /services/mercedes-oil-change-dubai/ | 0 | 185 | 0% | 14.35 |
| /services/oil-change-dubai | 0 | 79 | 0% | 34.18 |
| /blog/best-oil-change-dubai-mercedes | 0 | 68 | 0% | 11.46 |
| /brands/mercedes-benz-service-dubai | 0 | 17 | 0% | 5.71 |
| /services/mercedes-repair-dubai/ | 0 | 5 | 0% | 7.20 |
| /services/mercedes-repair-dubai | 0 | 3 | 0% | 8.33 |
| /brands/bmw-service-dubai | 0 | 3 | 0% | 12.67 |
| /brands/maybach-service-dubai/oil-change | 0 | 3 | 0% | 74.67 |

Page rows sum to 363 impressions. Do not compare that sum as though it were the same counting unit as 325 property impressions. These rows do not identify which of the six queries generated a particular page's impressions. In particular, neither the blog's 68 impressions nor the generic service's 79 can be assigned to `mercedes oil change`.

### Three-month country and device context — CONTAINS population

| Dimension row | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| United Arab Emirates | 0 | 323 | 0% | 14.92 |
| Qatar | 0 | 1 | 0% | 10.00 |
| United Kingdom | 0 | 1 | 0% | 11.00 |
| Desktop | 0 | 198 | 0% | 16.85 |
| Mobile | 0 | 127 | 0% | 11.85 |

The exact-query row's historical UAE-only and device-specific values are unavailable. These tables cannot be joined to the exact query's 169 impressions.

### 24-hour export

| Independent dimension row | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| Query: mercedes oil change | 1 | 4 | 25% | 45.50 |
| Country: United Arab Emirates | 1 | 4 | 25% | 45.50 |
| Device: Desktop | 1 | 4 | 25% | 45.50 |
| Page: https://digitecme.com/services/mercedes-oil-change-dubai/ | 1 | 2 | 50% | 6.00 |

No mobile row or alternative page row is returned. All four property impressions returned in this export are UAE desktop. This is observed segmentation, not proof of country/device filter configuration.

## Exact numerical explanation of 45.5

Only two hourly chart bins contain impressions:

| Hour, UTC+04:00 | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| 20 October 2026, 16:00 | 1 | 1 | 100% | 5.00 |
| 20 October 2026, 20:00 | 0 | 3 | 0% | 59.00 |

`(1 × 5 + 3 × 59) / 4 = 45.5`. Three impressions in the poorer-position hourly bin supply 75% of this four-impression average. The 59 is itself a bin average, not evidence that each impression was at exactly position 59. The dedicated page's separate two-impression average remains 6.0.

This arithmetic explains the reported statistic with high confidence. It does not establish why the three poorer-position impressions occurred, which URLs received them, or a persistent ranking change. No penalty or algorithmic decline follows from four preliminary impressions.

## Pages discrepancy and attribution limits

The 24-hour export contains four property impressions and only two impressions in its sole page row. Google uses property aggregation for Queries/Countries/Devices and page aggregation for Pages, with fresh data and reporting limitations also relevant. The supplied workbook does not identify a definitive reason for this particular two-impression discrepancy. Mark it unresolved pending authenticated re-query and finalized data.

Do not subtract the page's weighted position from the query's weighted position to infer another URL at position 85. Such a calculation would assume identical complete impression populations across different aggregation types. Do not claim the missing impressions belong to the generic oil page, blog or brand hub. [Google aggregation and discrepancy guidance](https://support.google.com/webmasters/answer/7576553?hl=en).

## Available daily trend

There is no exact-query daily series in either export. The available 92-day chart is the CONTAINS population. The most recent 28 available daily rows are 21 September–18 October, not a complete 28-day window ending 20 October.

| CONTAINS period | Clicks | Impressions | CTR | Approx. weighted position |
|---|---:|---:|---:|---:|
| 24 August–20 September, previous 28 available days | 0 | 134 | 0% | 16.56 |
| 21 September–18 October, last 28 available days | 0 | 99 | 0% | 10.13 |
| 21–27 September | 0 | 30 | 0% | 8.86 |
| 28 September–4 October | 0 | 31 | 0% | 10.06 |
| 5–11 October | 0 | 16 | 0% | 9.31 |
| 12–18 October | 0 | 22 | 0% | 12.54 |

The complete daily rows are in `contains-query-last28-available-daily.csv`. Two dates have zero impressions and blank source position/CTR (3 and 11 October). They must not be treated as zero position. The recent chart does not show a sustained average of 45.5. Its mixed-query population cannot demonstrate recovery or rule out an exact-query decline.

## Missing authenticated evidence

The workbooks do not supply: last-28-day exact-query daily trend; exact-query AND page AND UAE AND device intersections; query-by-page rows; Google-selected canonical; URL Inspection indexing status, crawl time or manual-action evidence. Those require authenticated Search Console access. A query-by-page-by-date API export with explicit `query equals`, `country equals are`, `dimensions: [date, query, page, device]`, page aggregation and disclosed data freshness would resolve attribution. A separate property-aggregated daily/device request provides an aligned exact-query trend. Both views must retain their own aggregation labels.

## Verified source cell ranges

| Evidence | Three-month file | 24-hour file |
|---|---|---|
| Filters | Filters!A1:B4 | Filters!A1:B4 |
| Queries | Queries!A1:E7 | Queries!A1:E2 |
| Pages | Pages!A1:E9 | Pages!A1:E2 |
| Countries | Countries!A1:E4 | Countries!A1:E2 |
| Devices | Devices!A1:E3 | Devices!A1:E2 |
| Chart | Chart!A1:E93 | Chart!A1:E25 |
| Active hourly bins | n/a | Chart!A15:E15 and Chart!A19:E19 |

No source or production changes were made during this analysis.
