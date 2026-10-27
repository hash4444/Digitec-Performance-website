# Search Console daily baseline: six exact queries

Generated 2026-10-26T08:34:46.882Z. Validated 69/132 planned daily series: 36/36 query-only and 33/96 query-by-exact-page. 6,210 actual daily rows accepted; 3 rejected capture attempts, 60 unattempted. Collection stopped on an explicit Google 429 response; see [final availability and follow-up exports](remaining-export-instructions.md). See [daily validation](daily-ui-validation.json) and [normalized daily rows](daily-query-page-rows.csv). This is collection status at generation, not an inference about uncollected data.

The UAE/all-device six-query cohort recorded 0 clicks and 146 impressions on October 18–24 versus 4 clicks and 247 impressions on October 11–17. Its current 28-day period recorded 5 clicks and 849 impressions versus 3 clicks and 945 impressions in the preceding 28 days. This establishes a descriptive baseline for these six queries only.

The search type is Web with Text-based selected, property sc-domain:digitecme.com. Dates end on the same complete day, October 24, using Search Console's daily date basis (Pacific Time, verified by the parent collector). All figures precede October 26 redirects. No post-deployment ranking/recovery claim follows.

## Matched UAE query-only periods

Each cell is clicks / impressions / approximate average position. Positions are impression-weighted from rounded daily displays. These are query-only totals, not page ownership. Seven-day windows are October 18–24 and October 11–17. Twenty-eight-day windows are September 27–October 24 and August 30–September 26.

| Exact query after Mercedes | Current 7d | Previous 7d | Current 28d | Previous 28d |
|---|---:|---:|---:|---:|
| service dubai | 0 / 21 / 16.7 | 1 / 41 / 12.6 | 2 / 156 / 13.0 | 0 / 190 / 11.0 |
| repair dubai | 0 / 61 / 4.6 | 3 / 100 / 4.6 | 3 / 331 / 3.9 | 3 / 353 / 2.9 |
| specialist dubai | 0 / 23 / 7.0 | 0 / 45 / 2.6 | 0 / 140 / 3.4 | 0 / 114 / 2.9 |
| workshop dubai | 0 / 19 / 18.9 | 0 / 32 / 8.5 | 0 / 121 / 9.9 | 0 / 157 / 9.6 |
| maintenance dubai | 0 / 14 / 16.6 | 0 / 21 / 8.2 | 0 / 76 / 10.7 | 0 / 90 / 6.6 |
| oil change dubai | 0 / 8 / 8.3 | 0 / 8 / 21.8 | 0 / 25 / 11.8 | 0 / 41 / 14.8 |

Use the exact-query Pages evidence in [ownership analysis](analysis.md) to assess landing pages. For example, a query-only total can include several page results and is not interchangeable with its hub-only row. Lower average position is numerically better, but these small descriptive samples do not identify a cause or establish a stable Dubai rank.

## Six-query cohort by observed segment

The cohort is exactly: service, repair, specialist, workshop, maintenance, and oil change, each as the full exact string “mercedes … dubai.” The strings are mutually exclusive, so counts can be added at the same country/device/date grain. This is not all Mercedes search traffic. Do not sum overlapping country/device segments. All-device includes tablet. Each cell is clicks / impressions / approximate average position.

| Country | Device | Current 7d | Previous 7d | Current 28d | Previous 28d | 90d |
|---|---|---:|---:|---:|---:|---:|
| UAE | ALL | 0 / 146 / 9.9 | 4 / 247 / 6.9 | 5 / 849 / 7.2 | 3 / 945 / 6.5 | 14 / 2769 / 8.6 |
| UAE | MOBILE | 0 / 55 / 8.6 | 0 / 82 / 5.4 | 0 / 285 / 6.0 | 2 / 239 / 5.6 | 4 / 803 / 7.9 |
| UAE | DESKTOP | 0 / 91 / 10.7 | 4 / 165 / 7.7 | 5 / 560 / 7.8 | 1 / 706 / 6.8 | 10 / 1948 / 8.9 |
| All countries | ALL | 0 / 147 / 9.9 | 4 / 254 / 7.2 | 5 / 871 / 7.2 | 3 / 1013 / 6.4 | 14 / 2899 / 8.5 |
| All countries | MOBILE | 0 / 56 / 8.7 | 0 / 83 / 5.5 | 0 / 287 / 6.1 | 2 / 243 / 5.6 | 4 / 817 / 7.9 |
| All countries | DESKTOP | 0 / 91 / 10.7 | 4 / 171 / 8.1 | 5 / 580 / 7.8 | 1 / 770 / 6.6 | 10 / 2064 / 8.7 |

For UAE/all-device, current 28-day cohort CTR is 0.59% and preceding 28-day CTR is 0.32%. Query mix influences a cohort position average; assess the six query rows and their exact owner pages before changing targeting. All-country/all-device native query-only CSV consistency checks passed for 6/6 exact queries. This is a comparison at the same query-only grain and is not a Queries-to-Pages join.

## Observed historical page ownership over time

All actual UAE/all-device daily pairs for the five broad queries are captured (5 service, 7 repair, 4 specialist, 8 workshop and 8 maintenance); only the oil-service slash pair is captured for the oil query. The existing legacy /services/mercedes-repair-dubai had its last observed positive-impression date on August 4 for both exact service and repair queries. The hub continued through October 24. Both legacy series explicitly display zero impressions for all 81 reporting days August 5–October 24; no missing dates were filled.

| Exact query | Hub latest positive impression | Legacy latest positive impression | Reporting days with both positive |
|---|---|---|---:|
| mercedes service dubai | 2026-10-24 (87 positive days) | 2026-08-04 (9 positive days) | 8 |
| mercedes repair dubai | 2026-10-24 (88 positive days) | 2026-08-04 (9 positive days) | 7 |

Same-day overlap occurs only within July 27–August 4 in these two captured comparisons. It does not establish simultaneous display to one searcher, harmful cannibalization, redirect causality or a current redirect defect. The ninety-day legacy aggregate therefore must not be presented as recent competition during the latest seven or twenty-eight days. Exact selected source IDs (raw ninety-date tables retained in daily validation):

- mercedes service dubai: hub source `pair-daily__90d__ARE__ALL__mercedes-service-dubai__brands_mercedes-benz-service-dubai`; legacy source `pair-daily__90d__ARE__ALL__mercedes-service-dubai__services_mercedes-repair-dubai`.
- mercedes repair dubai: hub source `pair-daily__90d__ARE__ALL__mercedes-repair-dubai__brands_mercedes-benz-service-dubai`; legacy source `pair-daily__90d__ARE__ALL__mercedes-repair-dubai__services_mercedes-repair-dubai`.

The oil query's other five planned UAE/all-device page series remain unavailable after the rate-limit stop. A complete daily oil overlap/ownership comparison cannot be made; the period Pages overlap and the accepted oil-owner series are retained without filling those missing daily series. The device exact-page daily matrix is also uncollected, although device period Pages and query-only daily comparisons are available.

## Paired daily coverage and limits

The authoritative plan retains all 96 observed UAE 90-day query/page/device combinations (38 all-device, 23 mobile, 35 desktop), rather than retaining only desired owners. Each accepted pair has both exact query and exact URL filters. Where the same page exists in the corresponding 7/28/90-day Pages table, additive counts are checked at the identical grain. Current captured count mismatches: 0; details remain in [derived summary](daily-six-query-cohort-summary.json). An absent period row is unavailable, not a source zero.

A preceding 90-day window is unavailable from this 90-day capture. Daily zero counts are retained only when explicitly displayed; em-dash CTR/position remain null. Rounded source positions are approximate when aggregated. Low click counts do not establish significance, technical cause, a Google update, or customer bookings. Fresh indexed-canonical observations are a separate dataset and are accepted only after the parent collector verifies their fully expanded UI evidence.

Reproduce offline with analyze-paired-ui.mjs, analyze-daily-ui.mjs, then write-daily-analysis.mjs. The JSON summary records raw collector and validation hashes and selected source IDs.
