# T1.1 GLC63 price endpoint verification

Checked 2026-10-05 (Asia/Dubai). Application data remains unchanged in this subtask.

## Exact configurator records

`src/data/tuningCars.ts` identifies `glc63` / `GLC63 AMG` / `M177`; preceding source comment identifies W253. Its available configurations are Stock and Stage 1–5. The price strings below are preserved verbatim from that source.

| Stage | Source line | Raw price string | Currency | Time | Package source |
| --- | --- | --- | --- | --- | --- |
| Stage 1 | 418 | `€3,146 total` | EUR | `1–2 days` | `stages.stage1.mods` |
| Stage 2 | 421 | `€7,471 total` | EUR | `3–5 days` | `stages.stage2.mods` |
| Stage 3 | 425 | `€17,876–€19,346 total` | EUR | `7–14 days` | `stages.stage3.mods` |
| Stage 4 | 431 | `€33,335–€34,805 total` | EUR | `14–21 days` | `stages.stage4.mods` |
| Stage 5 | 438 | `€51,335–€52,805 total` | EUR | `3–6 weeks` | `stages.stage5.mods` |

These records originated in `af5398688bf0e3567076eadb39608c67270db266` (`Add tuning content for cars`, 2026-04-14) and are preserved in the T1 baseline. The local record collapses supplier gearbox alternatives into a range and has no endpoint-to-gearbox field.

## Primary-source endpoint association

The [GAD W253 GLC63 M177 page](https://www.gad-motors.de/50aqawgh9aye/w253-glc63-m177) explicitly ties every lower endpoint to its 7Gang/NAG2 reinforcement alternative and every upper endpoint to its 9Gang/NAG3 alternative. These are supplier package labels. Its itemised sums independently reproduce all six totals. [Exact endpoint CSV](./glc63-price-endpoints.csv) records kit, installation, TCU and gearbox components, local source pointers and verification status.

| Stage | Lower endpoint, EUR / 7Gang-NAG2 | Upper endpoint, EUR / 9Gang-NAG3 | Engine-package identifier |
| --- | ---: | ---: | --- |
| 3 | 17,876 | 19,346 | GAD 177 50/63 |
| 4 | 33,335 | 34,805 | GAD 177 55/63 |
| 5 | 51,335 | 52,805 | GAD 177 55/68 |

**VERIFIED — quoted endpoints, currency, stage and supplier-labelled package association.** No conversion, averaging or invented price was used.

## Limit and public correction

Actual vehicle-year/variant/VIN applicability of either gearbox alternative is **UNVERIFIED**: neither the local record nor supplier page gives that mapping. Do not turn supplier endpoint labels into claims that a particular GLC63 generation/variant has a particular gearbox. The local package list's sole `~1250 Nm` reinforcement description is incomplete for the lower-priced supplier alternative. Qualify the public transmission item as compatibility pending and explain the supplier's two labelled totals without assigning either to a car. Preserve all three original raw ranges and all local output/time values. The prior FAQ saying the source gives no reason for endpoints is now stale: the supplier page does identify the gearbox upgrade alternatives.

The [GAD stages catalogue](https://www.gad-motors.de/stages-collection?lang=de) says supplier prices exclude VAT. This verifies the supplier pricing context; it does not establish a DIGI-TEC AED quotation or Dubai tax treatment. Confirm final scope and quotation with the workshop.

No app-source edit, SEO expansion, commit, push or deployment was performed in this subtask.
