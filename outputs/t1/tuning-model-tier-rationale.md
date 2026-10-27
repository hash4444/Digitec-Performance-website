# T1 configurator support and model-page decisions

The baseline configurator has 16 selectable vehicle records and 83 configurations: 16 stock references and 67 tuning configurations. Fourteen records are Mercedes, one is Aston Martin DB11 and one is Lamborghini Urus. All of their available stages were extracted, including Stage 4, Stage 5 and VIP where present.

The source is `outputs/t1/baseline/tuningCars.ts`, captured at baseline HEAD `546e02fb214212e187c159c303fda2354d480ff3`. Each inventory row points to the corresponding original `src/data/tuningCars.ts` stage line. The extraction evaluates the actual array with the actual `mkStage` arguments, then checks that every `availableStages` entry has corresponding package data.

## Field and evidence handling

- `model` preserves the complete selectable vehicle name. The data has no independent variant field, so `variant` is blank rather than splitting a label into an invented field.
- Generation identifiers are taken from the source comments. Year ranges are absent and remain blank. The GLC63 comment says W253; no replacement chassis identifier has been inferred.
- Stock references have stock horsepower and torque, with tuned values and gains blank. Tuned horsepower and torque are the stage figures; gains are exact differences against the corresponding stock reference. Torque is shown as Nm in the configurator source labels.
- The source's `—` placeholder for stock price/time becomes a blank field. Euro prices preserve their complete original strings, including `total` and GLC63 ranges. Currency is `EUR` only when the source price contains `€`. `On Request` remains the literal price for VIP, with currency blank because no currency is stated there.
- `included_work` retains every original package-list item in order, encompassing software, hardware, procedures and any listed restrictions. The source does not independently classify required or optional hardware. Both fields remain blank. These blanks do not mean no hardware is included; the complete lists are in `included_work`.
- `notes` records the source's 0–100 km/h value, because the required CSV schema has no dedicated acceleration column. No fuel requirements, warranties, years or additional modification requirements were invented.
- The generated power curves use fixed percentage multipliers in `generatePowerCurve`; they are not independent measured dyno evidence. The new pages use the actual listed numerical configuration data and do not claim that those synthetic curves are dyno results.

## GSC scope

The October 5 workbook is filtered to `https://digitecme.com/tuning`, Web search and Last 28 days. Its chart covers September 5–October 2, 2026. None of the 113 visible query rows establishes a model-specific tuning query for any of the 16 selectable records. The decision register therefore records zero matched visible query impressions/clicks and a blank best position for every model. Brand-level Mercedes queries are not counted as E63, G63 or other model demand. Zero matched rows in this filtered export do not prove zero sitewide model demand.

There is only one period in this analysis. No overlapping periods are summed. Source evidence is also recorded in `tuning-model-gsc-evidence.csv` and `tuning-gsc-query-register.csv`.

## Tier 1 decisions

Nine commercial model/platform pages are justified by the brief's allowance for exceptionally strong commercial/configurator depth. These decisions are not justified by measured model demand, and no arbitrary numerical score is used. Each chosen record has four or five priced stages, a materially changing hardware/software package progression, stock/tuned horsepower and torque, exact euro pricing and installation estimates. Several also have a distinct custom VIP scope. That supplies substantive commercial comparisons beyond name replacement.

| Model / distinct platform | New owner | Source depth and scope |
| --- | --- | --- |
| AMG GT/GTS and GTC/GTR | `/tuning/mercedes-amg-gt` | One C190/R190 M178 family page holds two distinct stock/output records, five priced stages and VIP for each. Preserve the existing AMG GT educational article and distinguish its informational ownership. |
| E63 | `/tuning/mercedes-amg-e63` | W213 M177; four priced stages and VIP. CPC, turbo, fuel-system and NAG 3/TCU package progression. |
| G63 | `/tuning/mercedes-amg-g63` | W463 M177; four priced stages and VIP. G63-specific exhaust optimization and corresponding prices distinguish its packages. |
| AMG GT63 4-Door | `/tuning/mercedes-amg-gt63` | X290 M177; four priced stages and VIP. Keep separate from the two-door M178 GT family. |
| S65 | `/tuning/mercedes-amg-s65` | W222/W217 M279; five priced stages. PCM, TCU, NAG2 reinforcement, low-temperature circuit and intercooler distinctions. No VIP package. |
| C63 W205 | `/tuning/mercedes-amg-c63` | W205 M177; five priced stages and VIP. Explicit generation scope, turbo/engine work and differing MCT reinforcement packages. |
| GLC63 | `/tuning/mercedes-amg-glc63` | M177; five priced stages. Preserve the original higher-stage price ranges and ask the workshop to explain their endpoints. |
| Aston Martin DB11 | `/tuning/aston-martin-db11` | M177 entry only; five priced stages. Source uses MCT reinforcement terminology, which must be checked against the individual DB11's actual gearbox and proposed components. |
| Lamborghini Urus | `/tuning/lamborghini-urus` | V8 Twin-Turbo entry; four priced stages. Software-only Stage 1 list, turbo installation kit at Stage 3, intercooler at Stage 4. No TCU, Stage 5 or VIP item inferred. |

The CSV has ten Tier 1 rows because the two AMG GT configurator records share one model-family URL. Each page contains all its actual stage sections; no stage-specific URL or generation-specific URL is created.

## Tier 2 decisions

C43, C450, C400, CLA45 and A45 remain within the master configurator. They each have two priced stages and no visible model-specific tuning demand in the supplied export. Their data supports useful comparison sections but does not establish the exceptional standalone depth used for Tier 1. Monitor broader and later GSC exports before splitting them out.

S63 AMG E Performance remains eligible and stays in the configurator. Its record says W223 and `M177 + Electric`, but does not explain whether 612 HP / 900 Nm represents combustion output or combined-system output. A dedicated hybrid tuning page should await clarification of that scope. The existing data is preserved; no substitute hybrid figures are invented.

All 16 actual configurator records are eligible for analysis, so no actual supported record receives Tier 3. BMW and Audi are absent and explicitly excluded from tuning by the user. Their unrelated workshop/service ownership remains outside T1 changes.

## Porsche evidence gap

Porsche is absent from the repository configurator array. The user separately confirmed Porsche tuning support and said a Porsche configuration list will be supplied later. Brand-level Porsche tuning demand remains eligible for the `/tuning` master page. No Porsche model, engine, stage, output, price or package is added to the configurator inventory or model-page register before that list is supplied. This is a missing model/configuration-data dependency, not a denial of Porsche business support.

## Ownership and implementation boundaries

`/tuning` retains generic car/performance/ECU/remap/chip/stage/price/local and brand tuning ownership. The nine child pages own their exact supported model/platform tuning comparisons. Mercedes B1 and Porsche B2 repair, service, diagnostics, maintenance and problem architecture remain distinct.

The existing `/blog/mercedes-amg-gt-tuning-dubai` is the only identified direct same-platform tuning guide. G4 already assigns it informational ownership. Its guide/snippet should emphasize assessment and hardware planning and link to the model commercial page for actual packages/prices. Model pages link back to the master and the existing brand service hub, and the master supplies links to the children. This makes the intended parent/model/guide roles visible through the linking and content.

Every model page reuses the actual `tuningCars` records through the shared semantic configuration component, so stage tables and included-work lists do not require interaction to read. Nine English pages publish no fabricated Arabic alternate. FAQs and WebPage/Service/Breadcrumb graphs describe the same visible model-specific scope.

Baseline production build and TypeScript checks passed at 1,247 rendered routes and 996 canonical sitemap URLs. The separate historical production-router test reported a pre-existing request-reference assertion failure. T1 does not infer or fix unrelated router behavior from that result.
