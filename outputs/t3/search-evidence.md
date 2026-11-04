# Phase T3 Search Console evidence

Reviewed locally on 4 November 2026 (Asia/Dubai). This is a historical export review; no Search Console property, setting or production state was changed.

Source: `reports/evidence-2026-10-26/gsc/current-workbook-extraction.json`, the saved extraction of `digitecme.com-Performance-on-Search-2026-10-26.xlsx`. The source manifest and analysis identify Web search, Last 7 days, with actual dates **18–24 October 2026**. The existing source analysis is `reports/evidence-2026-10-26/gsc/gsc-analysis.md` and records workbook SHA-256 `05a2d6036fa9210f4c63e3ff9ff3b21ba78c50a2214a1aff90823d66b8fe7859`.

The Queries and Pages sheets are separate dimensions. They do **not** establish which URL ranked for an individual query. The model owners below are editorial targeting decisions supported by existing vehicle data. No query/page metrics are joined, summed across dimensions or treated as proof of cannibalization. The query export has 1,000 visible rows; absence is not proof of zero demand.

## Observed relevant queries

| Query | Clicks | Impressions | Average position | Source range |
| --- | ---: | ---: | ---: | --- |
| stage 4 e63 | 0 | 17 | 8.24 | Queries!A111:E111 |
| mercedes c63 tuning | 0 | 4 | 18.00 | Queries!A468:E468 |
| lamborghini urus stage 2 | 0 | 4 | 18.50 | Queries!A470:E470 |
| mercedes c63 s tuning | 0 | 4 | 23.75 | Queries!A482:E482 |
| lamborghini urus tuning | 0 | 4 | 24.50 | Queries!A484:E484 |
| lamborghini urus stage 3 | 0 | 3 | 7.33 | Queries!A540:E540 |
| lamborghini urus turbo upgrade | 0 | 3 | 24.00 | Queries!A588:E588 |
| g63 stage 3 | 0 | 2 | 1.00 | Queries!A640:E640 |
| mercedes e63 tuning | 0 | 2 | 13.00 | Queries!A719:E719 |
| lamborghini tuning | 0 | 2 | 30.00 | Queries!A787:E787 |
| stage 2 g63 | 0 | 1 | 5.00 | Queries!A962:E962 |

The exact requested phrases `lamborgini tune dubai`, `Lambo tune Dubai` and `G63 tune Dubai` were not observed in these reviewed query rows. They inform provisional synonym coverage rather than claimed search volume. Public copy uses correct brand spelling and one natural Lambo reference, while keeping the supported Urus scope explicit. The observed C63 S query does not validate the 476 HP package for a different original-output variant.

## Observed model landing pages

These are page-level metrics for the same period, independently reported from query metrics.

| Path | Clicks | Impressions | Average position | Source range |
| --- | ---: | ---: | ---: | --- |
| /tuning/lamborghini-urus | 1 | 60 | 11.75 | Pages!A15:E15 |
| /tuning/mercedes-amg-s65 | 1 | 58 | 6.36 | Pages!A16:E16 |
| /tuning/mercedes-amg-c63 | 1 | 41 | 9.15 | Pages!A18:E18 |
| /tuning/mercedes-amg-e63 | 0 | 47 | 9.34 | Pages!A62:E62 |
| /tuning/mercedes-amg-g63 | 0 | 37 | 4.16 | Pages!A66:E66 |
| /tuning/mercedes-amg-gt63 | 0 | 19 | 5.05 | Pages!A80:E80 |
| /tuning/mercedes-amg-glc63 | 0 | 9 | 13.00 | Pages!A108:E108 |
| /tuning/aston-martin-db11 | 0 | 6 | 4.17 | Pages!A117:E117 |
| /tuning/mercedes-amg-gt | 0 | 1 | 1.00 | Pages!A216:E216 |

The generic `/tuning` hub separately records 3 clicks, 277 impressions and average position 13.95 (`Pages!A5:E5`). Its generic service ownership remains unchanged. The legacy `/services/performance-tuning-dubai/` row records 1 click, 33 impressions and average position 40.55 (`Pages!A21:E21`); this historical row alone does not justify altering the existing redirect.

## Earlier tuning export and measurement limits

`outputs/t1/tuning-gsc-workbook-scope.md` documents a distinct exact-page-filtered `/tuning` export for **5 September–2 October 2026**. It contains no model-specific query rows, so the earlier T1 model matrix correctly treated standalone demand as unproven. That older export remains valid for its own period and scope; it is not added to this newer sitewide export. Its unexplained chart/pages versus queries/countries/devices total discrepancy remains recorded.

The T3 matrix in `keyword-matrix.csv` distinguishes observed query evidence from provisional aliases and engine/variant restrictions. Model-specific ECU, remap, stage and price terms belong to the corresponding model owner. Broad ECU tuning, chip tuning, performance tuning, stage and price discovery remains with `/tuning`.

After a separately approved release, compare equal 28-day periods and request a query-by-page export filtered to these nine URLs. Track model synonym groups, ECU/remap terms and stage intent separately; split English/Arabic, mobile/desktop and UAE context where useful. Record impressions, clicks, CTR, average position and existing WhatsApp conversion attribution. Verify indexability/canonicals first, then inspect whether the intended model URL appears for each query group. No ranking improvement is claimed for this local, undeployed implementation.
