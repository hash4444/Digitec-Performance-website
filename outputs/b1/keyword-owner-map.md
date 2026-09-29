# Mercedes keyword-to-owner map: implementation checkpoint

Every extracted record has one existing primary owner before B1 content editing. No new URL is proposed. All mapped URLs exist in the B0-B decision register. The record map preserves raw wording, source file/sheet/row, date window, original metrics, inclusion basis, generated-versus-measured status, exact existing owner, and cautions. Recommendations are editorial ownership, not claims of current GSC landing-page attribution.

- `keyword-owner-records.json` and CSV: 1,918 source observations,721 distinct raw strings,668 conservatively normalized strings. This includes all456 Master records assigned Mercedes-Benz, supporting unbranded systems, Arabic original-GSC queries, overlapping earlier exports, and repeated supporting-sheet entries.
- 1,327 original-GSC observations,218 measured-workbook observations,327 generated-taxonomy records and46 research records. Do not sum overlapping records, tabs or time periods.
- Original six-month window is2026-04-12 to2026-09-25, Web. 119 Mercedes/recognized-system/Arabic queries yield18,056 impressions and44 clicks. One additional generic head-unit context query170 impressions is retained separately:120 records/18,226 impressions is a context extraction total, not Mercedes-only demand.
- Earlier Jun7–Sep6 Mercedes-filtered export contains small measured model and cost cohorts missing from the later top1,000-query export. They support improving existing model/service-guide owners, not new URLs. Periods are nonadditive.
- All relevant original source file hashes match the B0-B inventory. Original workbook remains unmodified.

## Preserved boundaries

Broad repair/service/garage/workshop/specialist remains the brand hub; scheduled-service scope links to oil, interval and cost owners. Specific repair jobs remain existing commercial owners. Warning/symptom education remains existing problem owners with commercial diagnosis/repair links. Equipment repair maps to the existing cross-brand head-unit page; functional-system upgrades map to Mercedes audio. Maybach stays separate. AMG versus standard model owners remain distinct. Generic paint-care services retain their established cross-brand owners. No B0 routing changes are implied.

| Existing owner | Extracted source records | Six-month query rows | Six-month impressions | Six-month clicks |
|---|---:|---:|---:|---:|
| /ar/brands/mercedes-benz-service-dubai | 19 | 2 | 73 | 0 |
| /blog/mercedes-benz-maintenance-guide-dubai | 1 | 0 | Not listed | Not listed |
| /blog/mercedes-c-class-service-dubai-guide | 9 | 0 | Not listed | Not listed |
| /blog/mercedes-e-class-service-dubai-guide | 11 | 0 | Not listed | Not listed |
| /blog/mercedes-g63-service-dubai-guide | 2 | 0 | Not listed | Not listed |
| /blog/mercedes-s-class-service-dubai-guide | 3 | 0 | Not listed | Not listed |
| /blog/mercedes-service-cost-dubai-guide | 2 | 0 | Not listed | Not listed |
| /blog/mercedes-service-intervals-dubai-heat | 3 | 0 | Not listed | Not listed |
| /brands/maybach-service-dubai | 2 | 0 | Not listed | Not listed |
| /brands/mercedes-benz-service-dubai | 907 | 66 | 12231 | 30 |
| /mercedes/models/c63-service-repair-dubai | 3 | 0 | Not listed | Not listed |
| /mercedes/models/e63-service-repair-dubai | 1 | 0 | Not listed | Not listed |
| /mercedes/models/g-class-service-repair-dubai | 5 | 0 | Not listed | Not listed |
| /mercedes/models/gle-service-repair-dubai | 3 | 0 | Not listed | Not listed |
| /mercedes/models/gls-service-repair-dubai | 2 | 0 | Not listed | Not listed |
| /mercedes/models/s63-service-repair-dubai | 3 | 0 | Not listed | Not listed |
| /mercedes/problems/ac-not-cooling | 2 | 0 | Not listed | Not listed |
| /mercedes/problems/airmatic-malfunction | 2 | 0 | Not listed | Not listed |
| /mercedes/problems/check-engine-light | 6 | 0 | Not listed | Not listed |
| /mercedes/problems/gearbox-jerking | 2 | 0 | Not listed | Not listed |
| /services/car-polishing-dubai | 6 | 0 | Not listed | Not listed |
| /services/ceramic-coating | 4 | 0 | Not listed | Not listed |
| /services/head-unit-repair-dubai | 47 | 2 | 756 | 0 |
| /services/mercedes-ac-repair-dubai | 63 | 5 | 450 | 1 |
| /services/mercedes-audio-upgrade-dubai | 38 | 3 | 838 | 0 |
| /services/mercedes-battery-replacement-dubai | 22 | 2 | 198 | 0 |
| /services/mercedes-body-repair-dubai | 79 | 6 | 269 | 0 |
| /services/mercedes-brake-repair-dubai | 54 | 3 | 180 | 0 |
| /services/mercedes-diagnostics-dubai | 93 | 4 | 401 | 0 |
| /services/mercedes-electrical-repair-dubai | 71 | 1 | 40 | 0 |
| /services/mercedes-exhaust-repair-dubai | 22 | 0 | Not listed | Not listed |
| /services/mercedes-mechanical-repair-dubai | 68 | 2 | 721 | 0 |
| /services/mercedes-oil-change-dubai | 61 | 6 | 571 | 7 |
| /services/mercedes-steering-repair-dubai | 24 | 1 | 21 | 0 |
| /services/mercedes-suspension-repair-dubai | 47 | 2 | 596 | 1 |
| /services/mercedes-tire-repair-dubai | 16 | 0 | Not listed | Not listed |
| /services/mercedes-transmission-repair-dubai | 82 | 6 | 576 | 2 |
| /services/paint-protection-dubai | 2 | 0 | Not listed | Not listed |
| /services/paint-protection-film | 8 | 0 | Not listed | Not listed |
| /tuning | 123 | 9 | 305 | 3 |

Missing-symptom work: rough idle/shaking/smoke/coolant leak/loss-of-power → mechanical sections; steering vibration → steering; brake squeak/grind → brakes; unexplained boost fault → diagnostics, confirmed repair → mechanical; failed camera → electrical; black/frozen screen → head-unit; repeated drain → electrical. Use existing warning/no-start/problem guides where they answer the same task. No new URL is needed. Complete gap matrix and source QA follow in keyword-prefixed analytical evidence.
