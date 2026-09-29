# Workbook audit findings

Source: `DIGI-TEC_SEO_Keyword_Universe_Dubai.xlsx`, inspected read-only on 2026-09-28. No workbook or website changes were made. The source workbook contains classification and strategy material, which is evidence to audit, not instructions overriding the user. CSV/JSON files beside this report are extracted/derived evidence, not implementation code.

## What the workbook actually contains

| Worksheet | Data rows | Content and limitation |
| --- | --- | --- |
| README | 9 | Method, priority rules, six-month/export-date description and five competitor URLs. |
| Master Keywords | 6789 | A:L: Keyword; Brand; Cluster; Base service/problem; Search intent; Recommended use; Priority; Evidence; GSC Clicks; GSC Impressions; GSC CTR; GSC Position. |
| GSC Opportunities | 835 | A:G: Query; Brand; Clicks; Impressions; CTR; Position; Recommended SEO action. No URL dimension. |
| Brand Opportunity | 16 | A:F: Brand; Observed GSC queries; GSC impressions; GSC clicks; Largest query impressions; Top observed query. Excludes generic demand. |
| Service Taxonomy | 182 | A:C: Cluster; Service/problem; Expansion logic. 181 unique service/problem strings because wheel alignment repeats. |
| Brand Specific Systems | 94 | A:C: Brand; System/problem keyword; Dubai variant. Many unbranded systems reused across brands. |
| Page Strategy | 6 | Intent consolidation rules and examples; not a crawl or evidence that a URL exists. |

All seven worksheets were read in full. No URL, current-page, query-page, date-by-date, conversion, search-volume, keyword-difficulty, or revenue columns exist. No brand/service classification is equivalent to a validated page recommendation.

`README!B9` says: “Last 6 months; uploaded export dated 2026-09-27.” `README!B3` describes GSC plus research and systematic expansion. The workbook file metadata records creation/modification on 2026-09-28. The six-month start/end dates, Search Console property, export settings, search type, country, device, search appearance, date comparison and completeness are absent. Do not relabel the data as a precisely dated April–September series. The original GSC export is not embedded as a separate source sheet.

## Reconciled GSC evidence

| Source set | Distinct exact query strings | Impressions | Clicks |
| --- | --- | --- | --- |
| Master Keywords rows2:880 | 879 | 74936 | 95 |
| GSC Opportunities rows2:836 | 835 | 72945 | 73 |
| Intersection: metrics identical for every common exact query | 801 | 71191 | 72 |
| Only in Master Keywords | 78 | 3745 | 23 |
| Only in GSC Opportunities | 34 | 1754 | 1 |
| Deduplicated exact-query union | 913 | 76690 | 96 |

The 913-query union is the audit's consistent analytic input. It is a **visible-query subtotal**, not a certified full-site GSC total. Do not add the tabs. The GSC Opportunities sheet contains no query below 20 impressions; Master includes lower-impression clicked queries and additional larger queries. Neither sheet is a subset of the other. The workbook does not explain the selection. Original GSC export/API reconciliation is a Batch 0 measurement task.

Union CTR is 96 / 76,690 = **0.12518%**. The impression-weighted mean of provided average positions is **27.26675**; it is a descriptive aggregate, not a fresh official Search Console metric. 846/913 query rows have zero clicks. CTR in individual source rows is rounded; summed-cluster CTR must be computed from summed clicks/impressions, not mean row CTR. A zero observed click count is not zero leads or proof a page cannot convert.

| Opportunity band (inclusive boundaries) | Query rows | Impressions | Clicks |
| --- | --- | --- | --- |
| position 4 to 20 | 338 | 28030 | 73 |
| position 11 to 30 | 459 | 42796 | 60 |
| position 11 to 20 | 240 | 22759 | 45 |
| impressions 100plus position 4 to 20 | 69 | 17305 | 43 |
| position above 30 | 351 | 28503 | 5 |

The 4–20 and 11–30 bands overlap and must not be summed. Average position mixes geographies/devices/dates and is not a fixed SERP rank. Low CTR at positions30–60 mainly reflects limited visibility; metadata alone is not a credible solution.

The workbook cannot establish which page ranked for any query, whether an unintended page ranked, whether multiple URLs competed on the same query, or whether a suggested new page is actually absent. Architecture/crawl evidence can identify potential overlap. Confirmed ranking cannibalization needs query × page data over time, with the same filters and actual landing-page inspection.

## Top observed opportunities with exact rows

| Query | Impressions | Clicks | CTR recalculated | Avg position | Source |
| --- | --- | --- | --- | --- | --- |
| mercedes repair dubai | 1782 | 9 | 0.505% | 11.76 | Master Keywords!A2:L2; GSC Opportunities!A2:G2 |
| mercedes repair | 1198 | 0 | 0.000% | 15.67 | Master Keywords!A3:L3; GSC Opportunities!A3:G3 |
| mercedes service dubai | 972 | 1 | 0.103% | 17.2 | Master Keywords!A5:L5; GSC Opportunities!A5:G5 |
| mercedes specialist dubai | 541 | 0 | 0.000% | 11.56 | Master Keywords!A12:L12; GSC Opportunities!A12:G12 |
| mercedes service center dubai | 492 | 0 | 0.000% | 16.56 | Master Keywords!A16:L16; GSC Opportunities!A16:G16 |
| mercedes repair specialist | 451 | 0 | 0.000% | 16.76 | Master Keywords!A17:L17; GSC Opportunities!A17:G17 |
| ferrari service dubai | 434 | 0 | 0.000% | 15.85 | Master Keywords!A19:L19; GSC Opportunities!A19:G19 |
| oil change near me | 431 | 0 | 0.000% | 12.57 | Master Keywords!A20:L20; GSC Opportunities!A20:G20 |
| mercedes repair in dubai | 408 | 4 | 0.980% | 12.06 | Master Keywords!A23:L23; GSC Opportunities!A23:G23 |
| mercedes maintenance dubai | 383 | 0 | 0.000% | 15.8 | Master Keywords!A29:L29; GSC Opportunities!A29:G29 |
| mercedes engine repair dubai | 365 | 0 | 0.000% | 17.76 | Master Keywords!A32:L32; GSC Opportunities!A31:G31 |
| mercedes suspension repair dubai | 333 | 1 | 0.300% | 14.76 | Master Keywords!A40:L40; GSC Opportunities!A38:G38 |
| mercedes benz repair dubai | 314 | 0 | 0.000% | 14.04 | Master Keywords!A44:L44; GSC Opportunities!A42:G42 |
| mclaren repair dubai | 309 | 1 | 0.324% | 16.28 | Master Keywords!A45:L45; GSC Opportunities!A43:G43 |
| lamborghini service dubai | 293 | 0 | 0.000% | 18.68 | Master Keywords!A49:L49; GSC Opportunities!A47:G47 |
| mercedes oil change dubai | 272 | 2 | 0.735% | 16.71 | Master Keywords!A54:L54; GSC Opportunities!A51:G51 |
| mercedes service in dubai | 270 | 3 | 1.111% | 8.83 | Master Keywords!A56:L56; GSC Opportunities!A52:G52 |
| tire repair near me | 268 | 1 | 0.373% | 10.68 | Master Keywords!A58:L58; GSC Opportunities!A54:G54 |
| ferrari service | 262 | 0 | 0.000% | 14.73 | Master Keywords!A61:L61; GSC Opportunities!A58:G58 |
| aston martin service dubai | 261 | 1 | 0.383% | 18.86 | Master Keywords!A62:L62; GSC Opportunities!A59:G59 |

## Evidence mix, coverage and classification defects

The master has 6,789 exact distinct keyword strings: **879 observed GSC queries (12.95%)**, **5,779 generated-taxonomy keywords (85.12%)** and **131 brand-specific-research keywords (1.93%)**. All 5,910 non-GSC rows have blank GSC metrics. Blank metrics mean not measured in this workbook; do not convert them into assumed search volume, zero search demand, or forecast traffic.

The broad taxonomy has 19 service families. `Master Keywords` contains 20 cluster labels because “Observed GSC long-tail” is an extra catch-all. **651 of 879 GSC rows (74.06%)** receive that catch-all instead of a meaningful service classification. Examples include oil change (`A7`), COMAND repair (`A10`), CUE screen (`A15`) and audio upgrades (`A94`). The workbook's existing row classifications should not be used to generate pages.

**Priority is not an opportunity model.** `README!B5:B7` bases P1/P2/P3 largely on impression thresholds and generated local language. Master contains 186 P1, 1,759 P2, and 4,844 P3 rows. 72 of186 P1 rows have positions worse than30. 1,344 generated keywords are P2 with no observed metrics. The audit priority score needs commercial fit, existing-page authority, ranking proximity, service value, gap, technical dependence and confidence, rather than importing these labels.

**Intent labels are incomplete.** Every master row is either “Local transactional” (3,580) or “Commercial investigation” (3,209). Informational, navigational, competitor/dealer and irrelevant intents are not represented. `Master Keywords!A609` (“car battery life in uae”,29 impressions,0 clicks,position8.07) belongs to informational FAQ/support. `A744` (“car body repair history dubai”,23,0,18.83) needs vehicle-history/informational interpretation. `A97` (“gad tuning”,179,4,9.8) and `A282/A541/A580` (GAD Mercedes variants) are entity/partner-navigation candidates; validate the business relationship before making them acquisition content. `A755/A778` and Nissan-authorised variants carry dealer/authorization intent; an independent workshop must not imply authorization it does not hold.

**Seven observed brand assignments are incorrect in the Master.** The same queries are correctly generic in GSC Opportunities:

| Query | Wrong Master brand | Impressions | Master row | GSC row |
| --- | --- | --- | --- | --- |
| brake repair dubai | Aston Martin | 395 | 26 | 26 |
| suspension repair dubai | Aston Martin | 331 | 41 | 40 |
| transmission repair dubai | Aston Martin | 270 | 55 | 53 |
| air suspension repair | Rolls-Royce | 106 | 176 | 170 |
| transmission repair | Aston Martin | 85 | 220 | 218 |
| brake repair | Aston Martin | 40 | 465 | 459 |
| suspension repair | Aston Martin | 23 | 735 | 728 |

Those six Aston Martin errors total1,144 impressions; generic air suspension adds106 falsely to Rolls-Royce. Consequently Master raw-brand aggregation gives Aston Martin2,651 vs the correctly labeled Brand Opportunity1,507, and Rolls-Royce1,596 vs1,490. Do not overwrite observed generic demand with brand assumptions merely because an unbranded service appears under a brand in the systems sheet.

The opposite issue hides real brand demand: “cue screen replacement in dubai” (499) reasonably maps to Cadillac CUE; “command unit repairing dubai” (586) is a probable COMAND spelling variant; “merceds”/“benz”/“AMG” aliases and “porche” need normalization. These are analyst inferences, not changed source labels. COMAND interpretation should be checked against the current page and SERP before publication. Generic Land Rover demand is kept in a separate family bucket rather than automatically assigned to Defender or Range Rover.

## Duplicate and variant audit

There are no exact duplicate `Keyword` strings in Master and no exact duplicate `Query` strings in GSC Opportunities. However, two pairs become duplicates after removing U+200B zero-width spaces: Master rows138/472 (“mercedes auto repair in dubai”) and190/503 (“mercedes benz auto repair in dubai”). Metrics differ, so retain their original performance records until the raw export establishes whether they represent actual separate query rows; consolidate their content intent. After punctuation normalization, rows44/395 (“mercedes benz” vs“mercedes-benz repair dubai”) form a third near-duplicate pair.

Location/inclusion-word normalization (`Dubai`, `near me`, `UAE`, `in`, `Al Quoz`) groups6,392 rows into3,053 repeated families, removing3,339 textual distinctions. This is an illustrative string test, **not** a defensible exact page count or an assertion all location intent is identical. City intent and actual service area still matter. Repair/repairs, service/servicing/services, center/centre, tire/tyre, workshop/garage/specialist, transmission/gearbox, COMAND/command, and model formatting variants should resolve to one commercial intent owner wherever appropriate.

`Service Taxonomy!B82` and `B168` both contain wheel alignment, under Steering and Tyres & wheels. Choose a primary owner and use links from both contexts. `Brand Specific Systems` repeats air suspension across Rolls-Royce, Bentley, Range Rover, Defender and Jaguar (rows31/37/46/51/87); soft-close doors across three marques (35/40/44); MBUX across Mercedes/Maybach (3/42); Terrain Response across Range Rover/Defender (47/52); deployable steps across those same two (49/55). Shared taxonomy membership is legitimate. It is not evidence for duplicating an unbranded URL five times or assigning all generic GSC demand to the first brand.

## Corrected brand evidence

Totals below cover reconciled observed queries after clear brand aliases and the two identified system inferences, not only the broad hub cluster. They include the flagged GAD and non-Dubai queries; use exclusive cluster membership to filter those before setting campaign scope. Zero observed rows means evidence absent in this extract. It is not a zero-volume estimate.

| Brand | Observed queries | Impressions | Clicks | CTR | Weighted position | Generated taxonomy | Brand research |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mercedes-Benz | 117 | 17983 | 44 | 0.245% | 20.21 | 327 | 20 |
| Porsche | 61 | 2959 | 2 | 0.068% | 27.20 | 345 | 16 |
| Ferrari | 28 | 3457 | 1 | 0.029% | 22.42 | 354 | 10 |
| Lamborghini | 21 | 2086 | 0 | 0.000% | 22.72 | 361 | 8 |
| Rolls-Royce | 13 | 1490 | 2 | 0.134% | 21.39 | 364 | 7 |
| Bentley | 17 | 1193 | 0 | 0.000% | 40.20 | 364 | 4 |
| Mercedes-Maybach | 4 | 134 | 1 | 0.746% | 15.46 | 371 | 4 |
| Range Rover | 15 | 725 | 1 | 0.138% | 35.80 | 363 | 6 |
| Defender | 0 | 0 | 0 | Not supplied | Not supplied | 375 | 2 |
| BMW | 45 | 2660 | 5 | 0.188% | 23.33 | 348 | 16 |
| Cadillac | 24 | 2207 | 1 | 0.045% | 42.39 | 364 | 12 |
| Aston Martin | 18 | 1507 | 2 | 0.133% | 20.96 | 359 | 0 |
| Jetour | 0 | 0 | 0 | Not supplied | Not supplied | 375 | 0 |
| ROX | 2 | 83 | 0 | 0.000% | 7.67 | 375 | 10 |
| Jaguar | 9 | 297 | 0 | 0.000% | 28.45 | 369 | 4 |
| Volkswagen | 20 | 766 | 0 | 0.000% | 29.86 | 365 | 12 |
| Land Rover family | 10 | 334 | 2 | 0.599% | 20.10 | 0 | 0 |
| Generic | 346 | 31166 | 33 | 0.106% | 32.04 | 0 | 0 |

## Exclusive commercial clusters

Each of913 raw observed query strings is assigned once in `exclusive_cluster_membership.csv`. Clusters are analytical ownership candidates, **not page recommendations**: many are sections/FAQs on one existing hub. The derived148 buckets include out-of-scope brands, ambiguous intent and low-evidence subservices. Classifications are conservative lexical plus manual rules, not validated SERP clustering. All source row references and top-five variants are in `exclusive_cluster_summary.csv`. Figures must not be added again across parent brand totals and their child service buckets.

Oil-change and scheduled-service/package buckets are separated; Volkswagen DSG oil20 belongs to transmission, not engine-oil service. Cadillac SRX/XTS screen queries stay within CUE; E-Class audio stays within Mercedes audio; Porsche model/trim service queries remain in the Porsche hub rather than inflating model-page opportunities. Broad paint-protection2,312 must be resolved by SERP and current-site context: it is an umbrella/mixed-intent pool, not an automatic third landing page competing with PPF1,718 and coatings2,844.

| Exclusive cluster | Query rows | Impressions | Clicks | CTR | Weighted position | Top query |
| --- | --- | --- | --- | --- | --- | --- |
| Mercedes-Benz / Workshop / service hub | 64 | 12059 | 29 | 0.240% | 16.12 | mercedes repair dubai |
| Generic / Oil change | 25 | 4168 | 2 | 0.048% | 29.74 | car oil change dubai |
| Generic / Battery / starting | 30 | 2914 | 2 | 0.069% | 28.76 | car battery replacement dubai |
| Generic / Ceramic coating / coatings | 19 | 2844 | 0 | 0.000% | 35.64 | ceramic paint protection dubai |
| Ferrari / Workshop / service hub | 19 | 2708 | 1 | 0.037% | 20.97 | ferrari service dubai |
| Generic / Tyres / puncture repair | 33 | 2371 | 2 | 0.084% | 31.94 | tire repair dubai |
| Generic / Paint protection comparison / overview | 13 | 2312 | 0 | 0.000% | 35.89 | car paint protection |
| Generic / Workshop / service hub | 34 | 1977 | 1 | 0.051% | 39.61 | luxury car repair dubai |
| Generic / Brakes | 16 | 1950 | 0 | 0.000% | 39.07 | brake repair dubai |
| Generic / Paint protection film | 23 | 1718 | 2 | 0.116% | 39.83 | paint protection film near me |
| BMW / Workshop / service hub | 21 | 1654 | 4 | 0.242% | 22.64 | bmw service dubai |
| Lamborghini / Workshop / service hub | 16 | 1634 | 0 | 0.000% | 21.87 | lamborghini service dubai |
| Generic / Suspension | 14 | 1542 | 2 | 0.130% | 25.19 | car suspension repair dubai |
| Cadillac / CUE / touchscreen repair | 5 | 1374 | 0 | 0.000% | 47.71 | cue screen replacement in dubai |
| Generic / Steering | 20 | 1348 | 4 | 0.297% | 13.21 | car steering repair |
| Generic / Diagnostics | 15 | 1309 | 0 | 0.000% | 34.67 | car diagnostic dubai |
| Rolls-Royce / Workshop / service hub | 9 | 1306 | 2 | 0.153% | 20.42 | rolls royce service dubai |
| Aston Martin / Workshop / service hub | 12 | 1086 | 2 | 0.184% | 20.86 | aston martin repair dubai |
| Generic / Electrical / ECU repair | 12 | 1046 | 0 | 0.000% | 46.63 | car electrical repair dubai |
| Generic / Exhaust | 20 | 1044 | 6 | 0.575% | 14.89 | exhaust repair near me |
| Generic / Transmission / gearbox | 15 | 1025 | 0 | 0.000% | 27.23 | transmission repair dubai |
| Generic / Air conditioning | 10 | 998 | 1 | 0.100% | 28.82 | car ac gas refill dubai |
| Porsche / Workshop / service hub | 26 | 955 | 2 | 0.209% | 35.35 | porsche repair dubai |
| Mercedes-Benz / Audio upgrades | 3 | 838 | 0 | 0.000% | 44.23 | mercedes stereo upgrade in dubai |
| Generic / Body repair | 13 | 762 | 1 | 0.131% | 37.64 | car body repair dubai |
| Mercedes-Benz / Engine / fuel system | 2 | 721 | 0 | 0.000% | 36.46 | mercedes engine repair dubai |
| Bentley / Workshop / service hub | 12 | 721 | 0 | 0.000% | 41.79 | bentley service dubai |
| Generic / Performance tuning | 16 | 653 | 4 | 0.613% | 21.35 | car tuning dubai |
| Cadillac / Workshop / service hub | 15 | 619 | 1 | 0.162% | 34.12 | cadillac repair dubai |
| Mercedes-Benz / Suspension | 2 | 596 | 1 | 0.168% | 18.84 | mercedes suspension repair dubai |
| Volkswagen / Workshop / service hub | 15 | 596 | 0 | 0.000% | 30.39 | volkswagen service dubai |
| Mercedes-Benz / COMAND infotainment repair | 1 | 586 | 0 | 0.000% | 36.97 | command unit repairing dubai |
| Mercedes-Benz / Transmission / gearbox | 6 | 576 | 2 | 0.347% | 25.78 | mercedes transmission repair dubai |
| Mercedes-Benz / Oil change | 6 | 571 | 7 | 1.226% | 18.33 | mercedes oil change dubai |
| Mercedes-Benz / Air conditioning | 5 | 450 | 1 | 0.222% | 16.93 | mercedes ac repair |
| Porsche / Suspension | 5 | 425 | 0 | 0.000% | 27.39 | porsche suspension repair dubai |
| Range Rover / Workshop / service hub | 7 | 412 | 1 | 0.243% | 36.05 | range rover repair dubai |
| Porsche / Transmission / gearbox | 6 | 391 | 0 | 0.000% | 20.17 | porsche transmission repair dubai |
| Bentley / Reverse camera | 1 | 354 | 0 | 0.000% | 44.35 | bentley reverse camera in dubai |
| Jaguar / Workshop / service hub | 9 | 297 | 0 | 0.000% | 28.45 | jaguar repair dubai |
| Mercedes-Benz / Coding / programming | 1 | 279 | 0 | 0.000% | 51.71 | mercedes coding service |
| Generic / Scheduled service / packages | 2 | 271 | 0 | 0.000% | 62.57 | car service package dubai |
| Mercedes-Benz / Body repair | 6 | 269 | 0 | 0.000% | 26.13 | mercedes body repair dubai |
| BMW / Transmission / gearbox | 4 | 224 | 0 | 0.000% | 14.81 | bmw transmission repair dubai |
| Ferrari / Suspension | 1 | 221 | 0 | 0.000% | 23.21 | ferrari suspension repair dubai |
| Lamborghini / Reverse camera | 1 | 213 | 0 | 0.000% | 22.77 | lamborghini reverse camera in dubai |
| Ferrari / Brakes | 2 | 205 | 0 | 0.000% | 33.55 | ferrari brake repair dubai |
| Porsche / Oil change | 2 | 199 | 0 | 0.000% | 16.64 | porsche oil change dubai |
| Mercedes-Benz / Battery / starting | 2 | 198 | 0 | 0.000% | 19.38 | mercedes battery replacement dubai |
| Land Rover family / Workshop / service hub | 6 | 194 | 2 | 1.031% | 23.91 | land rover repair dubai |
| Mercedes-Benz / Brakes | 3 | 180 | 0 | 0.000% | 28.39 | mercedes brake repair |
| Generic / Other business / partner navigation | 1 | 179 | 4 | 2.235% | 9.80 | gad tuning |
| Porsche / Brakes | 2 | 175 | 0 | 0.000% | 38.42 | porsche brake repair dubai |
| Mercedes-Benz / Scheduled service / packages | 2 | 172 | 1 | 0.581% | 16.48 | mercedes major service dubai |
| Generic / Infotainment repair | 1 | 170 | 0 | 0.000% | 47.81 | head unit repairing dubai |
| Mercedes-Benz / Performance tuning | 6 | 168 | 2 | 1.190% | 18.62 | amg performance tuning |
| BMW / Battery / starting | 4 | 166 | 0 | 0.000% | 27.67 | bmw battery replacement |
| Porsche / Battery / starting | 4 | 153 | 0 | 0.000% | 27.09 | porsche battery replacement dubai |
| Generic / Engine / fuel system | 3 | 151 | 1 | 0.662% | 18.68 | fuel system repair |
| Porsche / Performance tuning | 3 | 149 | 0 | 0.000% | 28.60 | porsche performance tuning dubai |
| Aston Martin / Engine / fuel system | 2 | 147 | 0 | 0.000% | 24.03 | aston martin engine repair dubai |
| Porsche / Diagnostics | 4 | 147 | 0 | 0.000% | 14.82 | porsche diagnostics dip2 |
| Mercedes-Benz / Other business / partner navigation | 3 | 137 | 1 | 0.730% | 7.77 | gad mercedes |
| Mercedes-Maybach / Workshop / service hub | 4 | 134 | 1 | 0.746% | 15.46 | maybach service center dubai |
| Aston Martin / Brakes | 1 | 133 | 0 | 0.000% | 23.88 | aston martin brake repair dubai |
| Lamborghini / Battery / starting | 1 | 129 | 0 | 0.000% | 25.52 | lamborghini battery replacement dubai |
| Range Rover / Body repair | 3 | 129 | 0 | 0.000% | 21.47 | range rover body repair |
| BMW / Coding / programming | 2 | 129 | 0 | 0.000% | 43.44 | bmw coding service |
| Mercedes-Benz / Diagnostics | 3 | 122 | 0 | 0.000% | 11.97 | mercedes diagnostic dubai |
| Generic / Ambiguous brake motors | 2 | 121 | 0 | 0.000% | 46.79 | brake motors dubai |

## Named systems: measured versus researched

Literal system-name observed queries are COMAND's likely “command” variant(586), CUE screen(499+174), and Volkswagen DSG oil change(20). The broader Cadillac CUE/touchscreen repair owner totals1,374 impressions,0 clicks,weighted position47.71 including generic Cadillac touchscreens and SRX/XTS. Mercedes audio upgrades total838 impressions,0 clicks,weighted position44.23. Bentley reverse-camera354/0/44.35 and Lamborghini reverse-camera213/0/22.77 deserve existing-page/section checks; their wording does not establish repair versus installation without SERP or page evidence.

AIRMATIC, MBUX, XENTRY,7G/9G-Tronic, PDK, PASM, PDCC, PIWIS, PCM, ISTA, iDrive, VANOS, Valvetronic, xDrive, ODIS, JLR, Pivi Pro, Terrain Response, Manettino and MagneRide do not have measured literal system-name query rows in this workbook. Their legitimacy/applicability and workshop capability require appropriate technical verification. Existing broader branded service demand can justify useful sections; it does not turn generated system terms into measured demand. Do not label every suspension repair as air suspension, every Porsche gearbox as PDK, or every Lamborghini gearbox as E-gear.

Volkswagen ODIS appears in the user's business capabilities but not in this workbook's systems list, which contains VAG diagnostics. That is a useful expertise/diagnostic section gap, not evidence of search volume.

## Model evidence and conservative decisions

| Observed query | Impressions | Clicks | Avg position | Initial handling | Source |
| --- | --- | --- | --- | --- | --- |
| cadillac srx screen replacement in dubai | 188 | 0 | 53.49 | CUE compatibility section | Master Keywords!A93:L93; GSC Opportunities!A91:G91 |
| mercedes e class audio upgrade in dubai | 183 | 0 | 55.93 | Audio service compatibility section | Master Keywords!A94:L94 |
| cadillac xts touch screen replacement in dubai | 98 | 0 | 44.31 | CUE compatibility section | Master Keywords!A189:L189; GSC Opportunities!A186:G186 |
| rox01 soft close door | 64 | 0 | 7.31 | ROX soft-close section; monitor, not broad model expansion | Master Keywords!A314:L314 |
| range rover sport subwoofer upgrade in dubai | 52 | 0 | 90.42 | Audio service compatibility section | Master Keywords!A375:L375 |
| porsche targa service dubai | 34 | 0 | 29 | Porsche hub model/trim section; monitor | Master Keywords!A543:L543; GSC Opportunities!A528:G528 |
| porsche carrera service dubai | 23 | 0 | 43.26 | Porsche hub model/trim section; monitor | Master Keywords!A759:L759; GSC Opportunities!A746:G746 |
| porsche panamera repair dubai | 23 | 0 | 29.7 | Porsche hub model/trim section; monitor | Master Keywords!A760:L760; GSC Opportunities!A736:G736 |
| porsche turbo service dubai | 23 | 0 | 33.52 | Resolve Turbo trim versus component | Master Keywords!A762:L762; GSC Opportunities!A739:G739 |
| porsche turbo repair dubai | 23 | 0 | 21.04 | Resolve Turbo trim versus component | Master Keywords!A763:L763; GSC Opportunities!A732:G732 |
| porsche 911 repair dubai | 22 | 0 | 26.36 | Porsche hub model/trim section; monitor | Master Keywords!A779:L779; GSC Opportunities!A760:G760 |
| porsche gt3 service dubai | 22 | 0 | 21.09 | Porsche hub model/trim section; monitor | Master Keywords!A780:L780; GSC Opportunities!A758:G758 |
| rox 01 soft close | 19 | 0 | 8.89 | ROX soft-close section; monitor, not broad model expansion | Master Keywords!A862:L862 |

There is no observed-query evidence here for separate G63, S-Class, C-Class, GLE, GLS, Cayenne, Macan, BMW X5/X6/X7/M3/M4/M5, Range Rover Vogue or Defender110 landing pages. No blank generated row should be presented as evidence to create them. Porsche 911/Targa/Carrera/GT3 overlap as model/body/trim terms and should be evaluated together. A standalone model page requires recurring commercial demand, job evidence and unique relevant service content; none is proven by simply listing models.

## Symptom-language gap

The master entirely lacks literal “shaking”, “jerking”, “rough idle”, “screen black”, “black screen”, “frozen”, “white smoke”, “blue smoke” and “black smoke”. “AC not cooling”32 rows, “overheating”64, “misfire”32, “gear shifting problem”32, “warning light”128, “camera not working”32, “oil leak”32, “coolant leak”32 and “battery drain”32 are all generated, not observed. The repeated counts come from systematic brand/location expansion, not observed symptom demand.

These gaps justify improving explanations and symptom sections on the right commercial service, with FAQs for safe next steps, not32 new URLs per symptom. Owner mapping: no-start/battery-drain→diagnostics/electrical; hot AC→AC; coolant leak/overheating→cooling; rough idle/misfire/knock/smoke/loss of power→engine diagnostics; jerking/slipping/hard shifts→transmission; dropped/leaning car→suspension; brake grinding/squeal→brakes; black/frozen screen and failed camera→infotainment/electrical. Multiple possible causes warrant diagnosis and contextual links rather than claiming a symptom proves a failed part. Content about urgent warning lights must be technically reviewed for safe advice.

## Scope and ambiguity controls

Out-of-supplied-target-brand demand totals7,643 impressions and2 clicks across22 brands, including McLaren1,609 and Audi1,088. It should be explicitly monitored against service scope, not silently absorbed into generic clusters or automatically discarded as useless; the user specified16 target brands. These figures are an architecture scope observation, not an instruction to remove existing out-of-scope pages.

Abu Dhabi modifiers total656 impressions and0 clicks. Do not build Abu Dhabi location pages without real service-area/business evidence. Dubai locality terms (Al Quoz, DIP2, Motor City, Deira, Jumeirah, Naif, Al Murar) belong to actual location/service-area context, not cloned neighborhood pages. `Master Keywords!A702` (“car paint protection film artarmon”,25 impressions,0 clicks,position20.44) is non-UAE location noise; IGNORE for this Dubai architecture. `A312/A344` “brake motors” totals121 impressions and is ambiguous industrial/entity intent; MONITOR or exclude after SERP review. `A840` “transmission repair parts”20 impressions may be parts retail; cover repair process only if that is the delivered service. There are no measured diagnostic-software download queries to justify download pages.

## Recommended evidence use in the main audit

1. Use `exclusive_cluster_summary` for score inputs, current-page comparison and master ownership table. Use `exclusive_cluster_membership` to audit every included observed query and exclude irrelevant terms. Never imply148 buckets require148 pages.
2. Use `model_evidence` to keep model claims quantitative and modest. Use `corrected_brand_summary` for all16 marques, including absent evidence for Jetour and Defender.
3. Use `classification_conflicts`, `master_only_observed` and `gsc_only_observed` as a compact measurement repair list. Fix source reconciliation during the later approved Batch0; no source workbook edit was made here.
4. Use crawl evidence to decide KEEP/OPTIMIZE/MERGE/NEW PAGE, because workbook data cannot identify an existing URL or confirm ranking cannibalization.
5. Obtain query×page×date data with country/device controls, index coverage and conversion evidence before deleting/redirecting pages or forecasting growth. No conversion, revenue or difficulty metric is present; any scoring factor based on them must be an explicit editorial assumption or unverified input.
