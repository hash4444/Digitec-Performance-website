# T1.1 independent model narrative and ownership review

Reviewed 2026-10-05 (Asia/Dubai). The corresponding JSON/CSV compares the actual built HTML with the preserved original configurator. The factual comparison kept the configurator dataset unchanged. T1.1 separately corrected narrow BMW/Audi copy in four source files: BrandWorkshopArticlePage.tsx, brands.ts, ar-brands.ts and Brands.tsx; the final broad rendered audit verifies those corrections.

The nine approved URLs correspond to ten original car records because the AMG GT owner combines GT/GTS and GTC/GTR. Their 52 tuning-package rows are audited individually. Every stock HP, tuned HP, HP subtraction, stock torque, tuned torque, torque subtraction, exact price string, currency qualifier and time estimate is checked against the original record, rather than against another model with coincidentally matching numbers. The three DB11 reinforcement strings withheld by T1.1 are explicit exceptions recorded as source/public differences; no other included-work item is permitted to disappear or change.

## Narrative and FAQ checks

Each model introduction, platform note, package explanation and FAQ answer was reviewed with its named stage and vehicle, then checked for verbatim presence in the actual HTML and agreement with the visible FAQ schema. The JSON retains every audited paragraph and every original/public package item.

| Owner | Exact record and variant | Narrative/FAQ cross-checks |
| --- | --- | --- |
| `/tuning/mercedes-amg-gt` | `amg-gt-gts`, `amg-gtc-gtr`; M178; original C190/R190 comment | Keeps the two stock references and Stage 1 outputs separate. Stage 1 EUR 2,721 and 1–2 days match both records. TCU begins at Stage 2; double-clutch reinforcement appears at Stage 3–5. Stage 1–5 and VIP are the available choices. |
| `/tuning/mercedes-amg-e63` | `e63`; M177; original W213 comment | Stock 612 HP / 850 Nm; Stage 1 780 HP / 1,000 Nm, EUR 5,663, 1–2 days. Stage 1–2 CPC and Stage 3–4 TCU/NAG3 descriptions match their own item lists. Stages 1–4 and VIP, with no Stage 5. |
| `/tuning/mercedes-amg-g63` | `g63`; M177; original W463 comment | Stock 585 HP / 850 Nm; Stage 1 780 HP / 1,000 Nm at EUR 5,663, 1–2 days. Stage 2 820 HP / 1,050 Nm at EUR 14,063 total, 3–5 days, includes the distinct exhaust-system item. VIP 1,100 HP / 1,350 Nm, on request, 6–10 weeks. |
| `/tuning/mercedes-amg-gt63` | `gt63`; M177; original X290/AMG GT 4-Door comment | Distinguishes this car from the two-door M178 records. Stock 630 HP / 900 Nm, Stage 1 780 HP / 1,000 Nm and Stage 4 940 HP / 1,200 Nm are tied to the correct entry. Stage 2 EUR 12,563 total, 3–5 days and its CPC scope match. |
| `/tuning/mercedes-amg-s65` | `s65`; M279; original W222/W217 comment | Stock 630 HP / 1,000 Nm; Stage 1 680 HP / 1,050 Nm at EUR 3,350, 1–2 days. Stage 5 900 HP / 1,400 Nm at EUR 72,468 total, 3–6 weeks. PCM, TCU, cooling circuit, intercooler and different NAG2 capacity descriptions match their named stages. No VIP. |
| `/tuning/mercedes-amg-c63` | `c63-w205`; M177; W205 identified in name/comment | Does not extend figures to W204/W206 or every C63 S. Stock 476 HP / 650 Nm; Stage 1 590 HP / 780 Nm at EUR 3,146 total, 1–2 days. Stage 3 700 HP / 900 Nm and Stage 5 850 HP / 1,100 Nm are kept distinct from their approximate reinforcement capacities. TCU is Stage 3–5. |
| `/tuning/mercedes-amg-glc63` | `glc63`; M177; W253 explicitly qualified as configurator identifier | Stock 476 HP / 650 Nm; Stage 1 590 HP / 780 Nm at EUR 3,146 total, 1–2 days; Stage 2 615 HP / 810 Nm. All three original price ranges remain exact. T1.1's supplier-labelled seven/nine-speed endpoint explanation is separately grounded in `glc63-price-endpoints.csv`; actual vehicle/year/variant compatibility remains unverified and is explicitly qualified. No VIP. |
| `/tuning/aston-martin-db11` | `db11`; M177; no source year/generation | Stock 503 HP / 675 Nm; Stage 1 590 HP / 750 Nm at EUR 3,346 total, 1–2 days; Stage 5 850 HP / 1,100 Nm. All five numerical package rows and verified TCU items remain exact. The three inherited MCT reinforcement items and their ratings are withheld, with no replacement package/transmission claim. |
| `/tuning/lamborghini-urus` | `urus`; V8 Twin-Turbo; no source code/year/generation | Stock 650 HP / 850 Nm. Stage 1 750 HP / 950 Nm at EUR 5,418 total, 1–2 days includes engine software only. Stage 3 870 HP / 1,100 Nm at EUR 26,842 and Stage 4 904 HP / 1,150 Nm at EUR 35,992 differ by the listed intercooler. Stage 1–4 only; no TCU, Stage 5 or VIP is claimed. |

The original schema has `spec`, `mods`, `price`, `time` and derived `powerCurve` fields. It has no separate required-hardware or optional-hardware fields. The pages retain actual included-work lists and say additional required/optional hardware must be recorded in the vehicle proposal. Absence of those fields is recorded as **not provided**, without invented parts or zero values. Descriptions of reinforcement capacities are preserved as package descriptions and are not presented as tuned torque or torque gain.

## Primary ownership

Each model title, H1 and meta description leads with the named model, identifies its engine/variant, and limits its package comparison to its original car ID(s). Each page links to the parent tuning owner and the existing service hub. Those shared parent links and references to ECU/stages/GAD are supporting relationships; the model page primary intent remains its named model.

The rendered `/tuning` title is `Car Performance Tuning Dubai | ECU Remap & Prices | DIGI-TEC`; its H1 is `Car Performance Tuning Dubai`. Its actual ECU/remapping, chip terminology, generic Stage 1/2/3 and cost, GAD, price and local/near-me sections are retained in `model-primary-ownership.json`. Generic primary ownership remains `/tuning`. No new generic tuning owner is introduced by the nine pages.

## Scope carried forward

Porsche tuning is supported by the user's direct business confirmation. The user will supply the separate current model list later. The public master uses enquiry wording; the configurator contains zero Porsche records and the model owner set contains zero Porsche pages. No Porsche model, engine, stage, price or gain is inferred from query demand.

The three wrong-owner audio queries retain the established `/services/mercedes-audio-upgrade-dubai` owner: 50, 47 and 3 visible impressions sum to 100. The exact query text and audio-upgrade headings are absent from tuning's main content. The audio service's title, H1 and canonical remain audio-specific in `porsche-audio-owner-verification.json`.

Final audit totals and source/public differences are taken from the rebuilt HTML and recorded in `nine-model-rendered-factual-qa.json`; the earlier 833-assertion, 381-item, uncorrected T1 snapshot is retained under `before-precautions/`.
