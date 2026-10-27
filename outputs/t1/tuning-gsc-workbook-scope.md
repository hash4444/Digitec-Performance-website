# T1 Search Console workbook scope

Source: `digitecme.com-Performance-on-Search-2026-10-05.xlsx`. Read-only source SHA-256: `71aa08d40c50ca7ab0128b38abedee67e2a111c7da42440824067b5250f76b89`. Analysis date: 2026-10-05 (Asia/Dubai). The source was not modified; the hash was verified after extraction.

The Filters tab states Search type **Web**, Date **Last 28 days**, and Page **https://digitecme.com/tuning** (`Filters!A2:B4`). The 28 Chart dates span **2026-09-05 to 2026-10-02**, inclusive (`Chart!A2:A29`). The filename export date is not the measurement period. No country or device filter is recorded. No earlier workbook period is combined with this one.

All seven tabs were inspected, including the empty Search appearance table. The Pages tab contains only /tuning (`Pages!A2:E2`). The explicit exact-page filter supports recording `/tuning` as the observed landing page for these query rows. This is page-associated query evidence, not proof that /tuning is the correct editorial owner, nor evidence of other URLs' rankings. This workbook cannot support a sitewide query × multi-page cannibalization comparison.

| Sheet | Inspected range | Data rows | Visible clicks | Visible impressions |
| --- | --- | ---: | ---: | ---: |
| Chart | A1:E29 | 28 | 11 | 991 |
| Queries | A1:E114 | 113 | 1 | 627 |
| Pages | A1:E2 | 1 | 11 | 991 |
| Countries | A1:E19 | 18 | 1 | 627 |
| Devices | A1:E3 | 2 | 1 | 627 |
| Search appearance | A1:E1 | 0 | 0 | 0 |
| Filters | A1:B4 | 3 | — | — |

Chart and Pages agree at **11 clicks and 991 impressions**. Queries, Countries and Devices each total **1 click and 627 impressions**. The **10-click/364-impression** gap is unreconciled in the supplied workbook. Query privacy/aggregation can affect visible query totals, but that alone does not explain the lower Devices and Countries totals. No export-state, additional-filter or omission cause is established. Preserve each tab's metrics independently and do not invent missing rows or treat visible-query totals as page totals. Chart's 2026-10-01 row has 1 click/326 impressions, but the workbook does not allocate that day's impressions to particular query, device or country rows.

The UAE row records **1 click, 604 impressions, CTR 0.0017, position 27.15** (`Countries!A2:E2`). Mobile records **1 click/234 impressions/position 21.25** and Desktop **0 clicks/393 impressions/position 30.13** (`Devices!A2:E3`). No Tablet row exists. Search appearance has headers only; this is absence of visible rows, not proof that no rich-result impressions occurred.

The query register deliberately preserves **all 113 observed /tuning query rows**. Broad matching covers tuning/tunning/tune/tuners, ECU/DME/calibration/programming, remap, stages, GAD, performance/power, upgrades, supported brands/models/engines and variants. Remaining rows are retained as navigation, cost fragments or uninformative observations so the wrong-owner review is complete. No query is silently discarded. Original query text and the workbook's clicks, impressions, CTR and position are preserved. CTR is a decimal ratio (0.0385 means 3.85%). Query families are semicolon-separated multi-label classifications; family totals must not be added together.

The three Mercedes audio-upgrade queries total **100 impressions and 0 clicks**: E-Class audio upgrade 50/position 49.82, stereo upgrade 47/50.26, and sound-system upgrade 3/54. Their verified B1 editorial owner is `/services/mercedes-audio-upgrade-dubai` (`b1-mercedes-ownership-map.md`, Audio upgrades). Their current /tuning association is measured; the reason for that association is unproved. General ECU/programming fragments are flagged for intent review against the established diagnostics/coding owners, not asserted as proven repair searches. Unsupported BMW, unverified Ford/Mopar coverage and training/device requests remain clearly distinguished in the wrong-owner CSV's `evidence_status` column. Porsche is kept with `/tuning` after the user's business-support confirmation and is not labelled a wrong-owner query.

The two BMW tuning queries total **5 impressions and 0 clicks**: near me 4/position 13, Dubai 1/66. T1 explicitly excludes BMW tuning. No Audi query appears in this export; that does not prove zero demand. Neither brand is eligible for T1 tuning SEO.

Porsche tuning queries total **12 impressions and 0 clicks**: performance tuning Dubai 7/position 4.57 and tuning Dubai 5/17. The user confirmed that a separate current Porsche tuning list exists and will provide it later. Porsche support is therefore **YES — business support confirmed by user; configurations pending**, and its brand tuning owner remains `/tuning`. The repository configurator contains 16 entries (14 Mercedes, Aston Martin DB11, Lamborghini Urus) and **no Porsche entry**. The source dataset and user confirmation have different scopes: business support is confirmed, but specific Porsche models/engines/stages/prices/outputs remain unextracted pending that list. Do not fabricate them. Preserve B2 repair/service architecture.

**No model-specific query row** matches any of the 16 current configurator entries. No supported engine code (M178, M177, M279, M276, M133) is present. Broad Mercedes/AMG demand is brand evidence and must not be assigned to individual models. `tuning-model-gsc-evidence.csv` and `.json` record the zero visible matched rows for every configurator entry, with the same page-filtered scope. These zeros do not establish zero sitewide model demand. Model-page decisions may use exceptional factual configurator depth, but must not claim model-specific GSC demand from this workbook.

Existing owners used in this review: G1 `/tuning` for commercial performance tuning; B1 `/services/mercedes-audio-upgrade-dubai` for audio upgrades and `/services/mercedes-diagnostics-dubai` for supported diagnostic/coding tasks; G1 `/services/car-diagnostics-dubai` for generic coding/programming. Company navigation remains `/`. No unrelated B1–B9, G1–G4 service ownership changes are proposed by these exports.

The Step 10 minimum generic terms are all assessed in `tuning-master-generic-ownership-assessment.csv`. Missing exact terms are retained as coverage opportunities without invented metrics. Stage 1/2 records use observed same-period family queries and cost uses two ambiguous fragments; these are explicitly labelled. Each term remains with the master `/tuning`, including generic ECU/remap/chip/local/GAD/stage/cost intent. No independent generic competing pages are justified by this export.

Outputs: `tuning-gsc-query-register.csv` (exact requested 17 columns), `tuning-wrong-owner-queries.csv` (metrics, relevance, correct owner, mixed-signal evidence, correction, evidence status), `tuning-model-gsc-evidence.csv/.json` (one row per current configurator entry), `tuning-master-generic-ownership-assessment.csv` (all Step 10 terms), and `tuning-gsc-workbook-data.json` (all-tab evidence with source ranges/totals). Re-run `analyze-tuning-gsc.py` with the bundled Python runtime to reproduce the extraction. No source workbook changes or overlapping-period sums are performed.
