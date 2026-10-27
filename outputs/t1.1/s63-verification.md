# T1.1 S63 factual and provenance verification

Checked 2026-10-05 (Asia/Dubai). Audit scope: the existing `s63` record in `src/data/tuningCars.ts:281`, its Git provenance and current primary sources. No application file was edited by this audit. No S63 model page was created. No commit, push or deployment was performed.

## Result

The inherited package data cannot be verified as W223 S63 AMG E PERFORMANCE tuning. Suppress the ambiguous outputs and gains in every public rendering. A general reference-output disclaimer does not establish their meaning or model applicability.

The stock numbers can be independently identified as **VERIFIED — ENGINE OUTPUT**, with a unit qualification: the manufacturer's nominal combustion-engine rating is 450 kW / 612 metric PS (French source: ch) and 900 Nm. The repository labels the power simply `HP`; it has no declared PS-versus-mechanical-horsepower convention. These values must not be called combined-system output. This independent verification is not evidence that the historical author used that manufacturer source.

All five tuned power values, all five tuned torque values and all ten computed gains are **AMBIGUOUS / UNVERIFIED** for the current W223-labelled record. None is verified as system output or another clearly defined output. There are 32 populated observations across the six configurations: 12 repeated stock-reference observations and 20 ambiguous tuned/gain observations. The stock row has four absent tuned/gain fields; blanks are not invented zeroes.

## Exact provenance

1. Commit `af5398688bf0e3567076eadb39608c67270db266`, author/committer `gpt-engineer-app[bot]`, 2026-04-14 12:08:07 UTC, message `Add tuning content for cars`, added this numeric/package block under **W222 S63 M177**, `name: 'S63 AMG'`, `engine: 'M177'`.
2. Commit `17c08a7dbeabba612ec253c7cf3a175d56315684`, same bot author/committer, 2026-04-14 12:34:22 UTC, message `Update s63 2024 image`, changed the comment to **W223 S63 AMG E Performance**, the name to **S63 AMG E Performance**, and engine to **M177 + Electric**. Its diff changed no power, torque, acceleration, stages, prices, times or modification descriptions.
3. Current `git blame -L 281,318 -- src/data/tuningCars.ts` attributes every numeric/package row to the first commit and only the W223/name/engine labels to the second. There is no source URL, source document, dyno basis, output definition or unit convention in the data or these commit messages.
4. Therefore W222 data were retained during a later W223 relabel. Matching public GAD numbers establish independent agreement for the older model, not the author's source attribution or their applicability to the hybrid.

Reproduce with `git show --format=fuller af539868 -- src/data/tuningCars.ts`, `git show --format=fuller 17c08a7 -- src/data/tuningCars.ts` and the blame command above. Historical data are preserved in Git and the T1 baseline/extraction artifacts.

## Primary-source evidence

The [GAD stages index](https://www.gad-motors.de/stages-collection) identifies its S63 entry as **W222 S63 M177**. Its [exact package page](https://www.gad-motors.de/50aqawgh9aye/w222-s63-m177) lists Stage 1/2/3/4 ratings of 780/820/860/940 hp and VIP **1000+**, with VIN-dependent availability. It does not define a W223 hybrid output basis or provide stage-output torque. The 1150 Nm figure describes gearbox reinforcement capacity, not tuned torque. No audited GAD source establishes these packages for W223 E PERFORMANCE.

The [Mercedes-Benz S63 E PERFORMANCE launch technical data](https://media.mercedes-benz.fr/nouvelle-mercedes-amg-s-63-e-performance/) (6 December 2022) explicitly separates combustion engine, electric motor and combined system. Its combustion-engine nominal rating is 450 kW / 612 ch and 900 Nm; combined-system rating is 590 kW / 802 ch and 1430 Nm. This defines the stock reference's meaning independently. Neither the system figures nor the electric contribution can be added to the inherited tuned values to invent replacements.

## Every requested field, every configuration

`E` = **VERIFIED — ENGINE OUTPUT**, independently verified stock reference with metric-power unit qualification above. `A` = **AMBIGUOUS / UNVERIFIED** for W223. `—` = no tuned/gain figure exists for the stock row.

| Configuration | Stock power | Tuned power | Power gain | Stock torque | Tuned torque | Torque gain |
| --- | --- | --- | --- | --- | --- | --- |
| Stock | 612 E | — | — | 900 E | — | — |
| Stage 1 | 612 E | 780 A | 168 A | 900 E | 1000 A | 100 A |
| Stage 2 | 612 E | 820 A | 208 A | 900 E | 1050 A | 150 A |
| Stage 3 | 612 E | 860 A | 248 A | 900 E | 1100 A | 200 A |
| Stage 4 | 612 E | 940 A | 328 A | 900 E | 1200 A | 300 A |
| VIP | 612 E | 1000 A | 388 A | 900 E | 1300 A | 400 A |

The unabridged 36-field classification, raw values, units and rationale are in [s63-fields.csv](./s63-fields.csv). Power values above are raw configurator numbers; no unit conversion was made. Gains are calculated by the UI, not independently sourced facts. The subtraction is mathematically correct but cannot validate its operands' output basis.

## Safe public treatment

- Keep the internal historical record for traceability, but replace its public package/stat presentation with a W223 S63 E PERFORMANCE enquiry and a clear notice that model-specific packages and output basis await confirmation.
- Suppress all five tuned power values, all five tuned torque values, both gain columns, animated horsepower/gain stats, derived power/torque charts and the VIP modification's `1000+ hp` claim for this record. Do not publish the retained W222 packages as confirmed W223 packages; their associated applicability, prices and workshop times also remain unverified for W223.
- The simplest safe implementation is to withhold the entire S63 package block. Independently verified factory engine values could be shown separately only with explicit engine-output and metric-unit labels; this is optional and does not resolve package applicability.
- Cover both `/tuning` and `/ar/tuning`, their initial/no-JavaScript HTML, the interactive selector and any fallback rendering. Current public consumers are `src/components/TuningConfigurationDetails.tsx` and `src/components/TuningConfigurator.tsx`. A stock-versus-tuned table or a disclaimer alone is insufficient.
- Do not restore visibility until there is W223-specific GAD/business source evidence identifying each output's engine/system/wheel basis, power unit, torque basis and package applicability. Do not derive replacements from factory system output, electric-motor contribution or gearbox capacity.

The output-definition gap is now explained by documented label migration; the missing W223 tuning evidence remains a factual gap that must be contained by suppression. This report does not claim the final public suppression or full-site validation has already run; the coordinating agent must verify those after applying the correction.
