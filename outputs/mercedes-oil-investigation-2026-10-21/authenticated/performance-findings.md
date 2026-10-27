# Authenticated GSC performance evidence

Observed on 21 October 2026 in Search Console for `sc-domain:digitecme.com`. Root directly configured/observed Exact query filters, confirmed by GSC performance URLs using `query=!text`. All observations below also apply Country = United Arab Emirates and Search type = Web. Query, country and optional page filters apply jointly in each captured view. This supplies real query-by-page evidence, without joining independent export tables.

## Exact query: mercedes oil change

The native 28-day report covers **21 September–18 October 2026**. This is the latest available daily period shown by GSC, rather than an assumed window ending the day before observation. The UI reports last update 5.5 hours ago. Ordinary daily report dates follow GSC's Pacific Time convention. The separate 24-hour export labels UTC+04:00 hourly bins.

| Scope | Clicks | Impressions | CTR | UI average position |
|---|---:|---:|---:|---:|
| Exact query + UAE, property | 0 | 70 | 0% | 9.6 |
| Exact query + UAE + /services/mercedes-oil-change-dubai/ | 0 | 66 | 0% | 6.5 |
| Exact query + UAE, Pages row /services/oil-change-dubai | 0 | 4 | 0% | 61.0 |

Only the dedicated slash URL and generic oil page appear in the exact-query Pages table. Neither the blog nor the Mercedes brand hub appears for this query in this 28-day view. The dedicated service page consistently holds the stronger position within the observed query-by-page evidence.

### Daily trend, summarized by week

| Period | Property impressions | Approx. property position | Dedicated page impressions | Approx. dedicated page position |
|---|---:|---:|---:|---:|
| 21–27 September | 22 | 9.72 | 21 | 6.43 |
| 28 September–4 October | 26 | 10.27 | 24 | 6.34 |
| 5–11 October | 10 | 11.29 | 9 | 6.99 |
| 12–18 October | 12 | 6.76 | 12 | 6.76 |
| All 28 days | 70 | 9.64 | 66 | 6.53 |

Weekly values are independently calculated from the captured daily rows using impression-weighted positions. Daily UI positions are rounded to one decimal, so these derived averages are approximate. All clicks and CTR are zero. Zero-impression days retain unavailable position rather than position zero. The two scopes remain separate aggregates: the table is a side-by-side comparison, not an impression-level join.

The dedicated page's nonzero daily average positions range from 5.0 to 9.0. Its four weekly averages remain between 6.34 and 6.99. This is evidence against a sustained decline to 45.5 for that URL through 18 October. It is not post-change recovery evidence and does not settle what happened after that daily cutoff.

Complete daily CSVs:

- `exact-uae-28d-daily.csv` — exact query + UAE, property aggregation.
- `exact-uae-target-28d-daily.csv` — exact query + UAE + dedicated target page, page aggregation.

### Device slices

| Query/page scope | Device | Clicks | Impressions | CTR | Position |
|---|---|---:|---:|---:|---:|
| Exact query + UAE, property | Mobile | 0 | 41 | 0% | 9.4 |
| Exact query + UAE, property | Desktop | 0 | 29 | 0% | 10.0 |
| Exact query + UAE + dedicated page | Mobile | 0 | 39 | 0% | 6.6 |
| Exact query + UAE + dedicated page | Desktop | 0 | 27 | 0% | 6.4 |

The 24-hour exact-query + UAE view reproduces **1 click, 4 impressions, 25% CTR, position 45.5**. All four returned property impressions are Desktop. Its dedicated page row reproduces **1 click, 2 impressions, 50% CTR, position 6.0**. Authenticated capture therefore confirms the exported observation, while the property/page discrepancy remains unresolved. Do not assign the missing impressions to a URL or infer their position by subtraction.

## Exact query: mercedes oil change dubai

Same 28-day period, UAE and Web filters. Property aggregate: **0 clicks, 26 impressions, 0% CTR, position 11.2**.

| Page shown under this exact-query filter | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| /brands/mercedes-benz-service-dubai | 0 | 13 | 0% | 5.2 |
| /services/mercedes-oil-change-dubai/ | 0 | 13 | 0% | 15.8 |
| /services/oil-change-dubai | 0 | 7 | 0% | 53.1 |
| /blog/best-oil-change-dubai-mercedes | 0 | 2 | 0% | 48.5 |

These are verified query-by-page observations. Their sum, 35 page impressions, is not the same unit as the property's 26 impressions. The brand hub's visibility alongside the dedicated service page establishes commercial-intent overlap for the Dubai variant. Aggregate overlap alone does not prove harmful cannibalization, alternating URL ownership, or lost clicks.

### Dubai variant: per-page time series

| Period | Brand hub impressions | Approx. hub position | Dedicated page impressions | Approx. dedicated page position |
|---|---:|---:|---:|---:|
| 21–27 September | 6 | 2.83 | 3 | 27.00 |
| 28 September–4 October | 1 | 3.00 | 4 | 10.50 |
| 5–11 October | 4 | 2.50 | 1 | 26.00 |
| 12–18 October | 2 | 18.50 | 5 | 11.40 |
| All 28 days | 13 | 5.15 | 13 | 15.85 |

Both URLs receive impressions on five shared calendar dates: 23 and 25 September, and 7, 12 and 17 October. This is same-day coexistence in independently filtered page aggregates, not proof that both appeared in the same search. Other dates show only one of them, with too few impressions to interpret absence as loss of ranking. The service page receives five impressions in the last week, versus one the week before. Its weekly average improves from 26.0 to 11.4. The hub's last-week 18.5 is driven by one impression at 3.0 and one at 34.0.

This establishes intermittent overlapping visibility and a possible ownership concern for the Dubai query. It does not show a sustained displacement pattern or establish harm to total clicks. Some weekly positions vary inversely, but each page has only 13 impressions over 28 days and all clicks are zero. A controlled device/location series and more finalized observations are needed before declaring genuine harmful cannibalization. Do not merge, redirect or reassign canonical ownership on this evidence.

Separate complete daily series are in `dubai-exact-uae-hub-28d-daily.csv` and `dubai-exact-uae-target-28d-daily.csv`. `exact-query-by-page-28d.csv` contains all eight observed query-by-page rows across the three exact query filters, with their common date range, country and aggregation labels.

## Exact query: mercedes oil change near me

Same 28-day period, UAE and Web filters. Property aggregate: **0 clicks, 2 impressions, 0% CTR, position 13.0**.

| Page shown under this exact-query filter | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| /services/mercedes-oil-change-dubai/ | 0 | 1 | 0% | 5.0 |
| /brands/mercedes-benz-service-dubai | 0 | 1 | 0% | 21.0 |

Two impressions are insufficient to infer a persistent ownership problem. This query has local proximity intent; observations are UAE-filtered, not a fixed Dubai location or controlled local-pack rank check.

## Assessment supported by these captures

High confidence: 45.5 is a real four-impression property average, dominated by three impressions in a poorer-position hourly bin. It is not the dedicated service page's measured position. The exact-query + UAE target-page daily series is stable through the latest available daily cutoff shown, 18 October. These UI captures do not include API finalization metadata.

Moderate confidence: short-term sampling, changing result contexts and preliminary reporting explain the apparent alarm more plausibly than a broad sustained collapse. The captures do not reveal the exact cause or URLs of every poorer-position impression. They do not rule out a change after 18 October.

The Dubai variant has verified multi-URL overlap deserving monitoring. No source rewrite or canonical ownership change follows from these performance observations alone. Preserve the differentiated intent of the Mercedes commercial service, general oil service, informational guide and broad brand hub. Reassess after aligned finalized daily/device/page evidence accumulates.

## Capture references

Raw authenticated UI text and table JSON are adjacent to this report. `exact-uae-28d-pages.txt`, `exact-uae-28d-devices.txt`, `exact-uae-target-28d-devices.txt`, `exact-uae-24h-pages.txt`, `exact-uae-24h-devices.txt`, `dubai-exact-uae-28d-pages.txt` and `near-me-exact-uae-28d-pages.txt` retain each observed filter and metric context. `exact-operator-proof-near-me.txt` retains the Exact query dialog. Root directly observed the equivalent Exact operator for the other query filters. `weekly-summary.json` retains calculation inputs/outputs for all four daily series. Raw captures may contain account identity in the GSC toolbar. The analysis and summary omit those details.

Method: [Google GSC aggregation and preliminary-data definitions](https://support.google.com/webmasters/answer/7576553?hl=en), [Google API date/aggregation definitions](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).
