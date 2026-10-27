# Paired Search Console analysis — 108/108 cells validated

All 108 planned period/country/device cells have validated nonempty visible tables.

This report uses the independently validated snapshot of `paired-ui-records.json`, SHA256 `6b31b6908fa31f5dc6e7236188b9df7c1df607bd73bdab2dbbf80f4befde1f7c`. It contains 108 accepted attempts, 9 rejected attempts and 328 actual paired Pages rows. A later collection update requires rerunning validation and this report. Rejected raw captures are preserved and excluded from metrics.

## Scope and comparable periods

Property: `sc-domain:digitecme.com`. Search type: Web, Text-based selected, independently evidenced in the UI. Exact Query plus Country/Device filters and the selected Pages tab are retained for each dataset. The common complete end day, verified by the root collector, is **24 October 2026**, with GSC Pacific Time daily date boundaries. Capture timestamps are UTC; Dubai is UTC+4.

The inclusive windows are October 18–24 (7d), September 27–October 24 (28d), and July 27–October 24 (90d). All end before the October 26 redirects. The windows overlap; do not add them or interpret them as a post-deployment recovery series. Page/Query aggregation differs, and displayed averages/CTRs are rounded. No independent unfiltered Queries/Pages tables were joined.

## Actual UAE query-to-page ownership

The five broad service/repair queries are evaluated against the existing slashless [Mercedes hub](https://digitecme.com/brands/mercedes-benz-service-dubai); the oil query against the observed [oil-service slash URL](https://digitecme.com/services/mercedes-oil-change-dubai/). **C / I / position** means clicks / impressions / GSC average position for that exact paired row. It is not a fixed UAE/Dubai rank. “Unavailable” is missing validated evidence; “Owner row not visible” is a validated table without that row, not a numerical zero.

| Exact query | Owner row examined | 7d C / I / position | 28d C / I / position | 90d C / I / position |
| --- | --- | ---: | ---: | ---: |
| mercedes service dubai | Mercedes hub | 0 / 21 / 16.7 | 2 / 142 / 12.3 | 2 / 532 / 11.6 |
| mercedes repair dubai | Mercedes hub | 0 / 61 / 4.6 | 3 / 322 / 3.7 | 11 / 928 / 3.6 |
| mercedes specialist dubai | Mercedes hub | 0 / 23 / 7 | 0 / 140 / 3.4 | 0 / 337 / 3.7 |
| mercedes workshop dubai | Mercedes hub | 0 / 19 / 18.8 | 0 / 116 / 10.2 | 0 / 349 / 10.7 |
| mercedes maintenance dubai | Mercedes hub | 0 / 14 / 16.6 | 0 / 70 / 10.3 | 0 / 239 / 8.6 |
| mercedes oil change dubai | Oil service, slash URL | 0 / 7 / 8 | 0 / 16 / 10.6 | 0 / 54 / 21.8 |

The hub is the visible owner of all five broad queries in the validated 7-day UAE ALL-device tables. This establishes historical attribution within those filters, while the current single desktop SERP snapshot is a separate measurement context. Absence from a captured current first page cannot negate these historical impressions.

## Mobile versus desktop, same exact owner and 28-day period

| Exact query | UAE Mobile, 28d C / I / position | UAE Desktop, 28d C / I / position |
| --- | ---: | ---: |
| mercedes service dubai | 0 / 54 / 12 | 2 / 88 / 12.4 |
| mercedes repair dubai | 0 / 118 / 3.2 | 3 / 200 / 4 |
| mercedes specialist dubai | 0 / 73 / 3.5 | 0 / 67 / 3.4 |
| mercedes workshop dubai | 0 / 25 / 11.4 | 0 / 91 / 9.9 |
| mercedes maintenance dubai | 0 / 13 / 10.5 | 0 / 57 / 10.2 |
| mercedes oil change dubai | Owner row not visible | 0 / 16 / 10.6 |

These are separately filtered paired owner rows. Device mixes and low impression counts can affect position/CTR; no mobile UX defect, stable live rank or statistically established CTR penalty follows automatically. ALL-device totals include any tablet traffic and must not be reconstructed by assuming Mobile+Desktop exhaust the cohort.

## Other observed URLs and overlap

The complete normalized CSV preserves every returned page, including legacy, slash, generic-service, homepage, blog and unrelated-brand paths. Selection of a leading visible row by impressions is descriptive; it is not a harmful-cannibalization finding.

- For the 90-day UAE service query, the hub has 2 clicks, 532 impressions and average position 11.6; the existing legacy `/services/mercedes-repair-dubai` row has 1 clicks, 48 impressions and average position 23.6. That legacy URL's historical attribution does not prove its current 301 is failing.
- For the 28-day UAE repair query, the hub has 3 clicks, 322 impressions and average position 3.7. Additional rows include an S-Class guide and a body-service slash URL with much smaller cohorts. They do not establish interchangeable intent or justify deleting service pages.
- The 90-day UAE oil query shows the Mercedes oil-service slash page with 0 clicks, 54 impressions and average position 21.8 and generic oil-service page with 0 clicks, 54 impressions and average position 26.4. The Mercedes blog has 0 clicks, 24 impressions and average position 15 and the hub has 0 clicks, 16 impressions and average position 4.8. This is paired overlap worth checking in a daily, intent-aware series, not proof that any URL caused the other's performance.
- The 7-day UAE oil table shows 0 clicks, 7 impressions and average position 8 for the oil-service slash page and 0 clicks, 1 impressions and average position 10 for the blog; Mobile shows 0 clicks, 1 impressions and average position 10 for the blog. This is a small observed device/period mix. A missing mobile oil row must not be converted into a zero or an all-time ranking claim.

All exact values above must retain their original source IDs in `paired-ui-validation.json`; they describe validated records available when this report was generated. If later captures revise a source cohort, regenerate the report before delivery.

## Practical priorities supported by the paired data

1. Preserve the hub's established repair ownership and existing title/H1/canonical/URL while reviewing minimal clarity/internal-link proposals. The repair row is stronger than the service/workshop/maintenance rows in these historical samples; a broad retargeting would put an observed owner at risk without evidence that a replacement is needed.
2. Review the actual specialist snippet and query/device context before rewriting metadata: the hub already has impressions at an average position around the first results group, yet displayed clicks are zero. This is an investigation opportunity, not a predicted CTR uplift.
3. Examine service, workshop and maintenance intent and daily data alongside the current quote/process presentation. Their weaker recent averages do not establish a technical fault, and the hub already contains relevant service scope.
4. Evaluate oil query overlap with the exact-page daily series and fresh stored Google-selected canonicals. Preserve slash/legacy attribution in evidence; do not merge routes or declare harmful cannibalization from aggregate overlap.
5. Keep sparse historical legacy-source and body-service rows in the measurement register. They do not authorize additional redirects, indexing submissions, page removal or unsupported business claims.

These are analysis priorities, not production instructions. Proposed website/configuration changes require the user's separate approval.

## Daily series, selected canonicals and remaining gaps

The daily pair plan identifies actual 90-day observed query-page pairs and requests exact Query+Exact Page+UAE+ALL-device Dates captures. It contains no daily measurements. All six ALL-device source tables are validated; the retained plan is not itself a measurement file.

The authoritative `daily-capture-specs.json` requests 36 query-only daily series and 96 exact-page daily series across actual observed UAE ALL/Mobile/Desktop pairs. **69/132 series** and **6,210 explicit date rows** are accepted in [daily validation](daily-ui-validation.json): all 36 query-only and 33 UAE all-device exact-page series. Collection stopped on an explicit Google 429 / Too many requests page at 08:26:29 UTC. Three incomplete daily attempts are rejected and 60 were unattempted; these 63 remain unavailable. Every normalized zero is an actual displayed source zero; em-dash CTR/position remain null. The original 38-pair ALL-device plan is a retained subset of the full authoritative daily matrix. See [daily baseline](daily-analysis.md), [exact missing-series list](missing-daily-series.csv) and [follow-up export protocol](remaining-export-instructions.md).

Eight accepted, fully expanded [stored indexed reports](indexed-summary.md) show the hub, mechanical, diagnostics and Arabic body URLs indexed and selected as inspected. Both English oil and body slash variants are indexed and Google-selected as slash URLs despite slashless declared canonicals; their slashless variants are crawled-currently-not-indexed with canonical fields N/A. Variant convergence remains unresolved; neither whole service is absent from Google. All displayed crawls predate the redirects. Additional planning-list inspections remain uncollected after 429. This report does not substitute current HTTP self-canonicals or older indexed observations for missing fresh Google-selected canonicals. It does not claim Google has processed the redirects, resolved the body/oil canonical uncertainties or recovered rankings.

## Separate native-export controls

The native unfiltered 90-day export has 90 unique dates and preserves separate Chart, Queries, Pages, Countries, Devices, Search appearance and Filters tables. Its last 7 daily clicks/impressions/positions exactly match the existing October 26 baseline. Both Queries and Pages have 1,000 visible rows at the UI export limit; completeness is not established. Those global sitewide/query-only controls cannot create UAE or device-specific Mercedes pairs by joining dimensions. See [export control summary](exports/README.md).

## Files and reproducibility

- [Validated records, rejected attempts and source hashes](paired-ui-validation.json).
- [All actual normalized query-page rows](paired-query-page-rows.csv).
- [Exact raw collection records](paired-ui-records.json).
- [Daily pair plan](daily-pair-capture-plan.json) and [plan provenance](daily-pair-capture-plan-evidence.json).
- [Collection/export protocol](collection-and-export-instructions.md).
- [Historical local comparability controls](local-export-comparability.json).
- Offline scripts: `analyze-paired-ui.mjs`, `prepare-daily-pairs.mjs`, `write-search-analysis.mjs`. No script performs network, account, indexing or website actions.
