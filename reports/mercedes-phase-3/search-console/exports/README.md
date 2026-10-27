# Native 90-day unfiltered export control

The root agent downloaded the native Search Console CSV ZIP from the authenticated `sc-domain:digitecme.com` property. The original ZIP is preserved unchanged; seven CSVs were extracted byte-for-byte to `unfiltered-90d/` after CRC and path checks. File sizes, row counts and SHA256 hashes are recorded in `unfiltered-90d-control-summary.json`.

`Filters.csv` records **Web (text-based)** and **27 July–24 October 2026**. No Query, Page, Country or Device filter is recorded. The authenticated UI separately proves the property and search-type selection; the export itself does not contain a property ID. The root agent confirmed October 24 as the common latest complete day and Pacific Time daily reporting basis. No API `dataState` field is supplied by this CSV export.

`Chart.csv` has exactly **90 unique consecutive dates**, July 27–October 24. Queries and Pages each have **1,000 visible rows**, at the UI export limit; their completeness is not established. Countries has 183 rows, Devices three and Search appearance one. These remain separate dimensions.

| Sitewide daily-chart window | Clicks | Impressions | Calculated CTR | Approximate weighted position |
| --- | ---: | ---: | ---: | ---: |
| October 18–24, 7 days | 49 | 10,790 | 0.454% | 19.03 |
| September 27–October 24, 28 days | 186 | 41,445 | 0.449% | 17.12 |
| July 27–October 24, 90 days | 575 | 117,271 | 0.490% | 20.19 |

CTR above is total clicks divided by total impressions. Position is impression-weighted from rounded daily positions and is approximate. The windows overlap and cannot be added. The seven latest daily clicks, impressions and displayed positions exactly match the existing October 26 workbook baseline.

The structured summary also preserves six exact **query-only, all-country, all-device** 90-day rows with their actual CSV source-row numbers. It does not attribute those queries to Pages rows. Likewise, the UAE Country row and Mobile/Desktop Device rows are sitewide controls, not Mercedes-specific segments. No join of these separate tables was performed.

Every reporting day ends before the October 26 redirect deployment. This control does not measure redirect recovery, current ranking, current Google-selected canonical or any deployment effect. Exact filtered Query × Pages evidence is collected separately by the root agent.

Files:

- `gsc-90d-all-country-all-device-unfiltered-2026-10-26.zip`: unchanged native export.
- `unfiltered-90d/`: unchanged extracted CSVs.
- `unfiltered-90d-control-summary.json`: derived control checks, source hashes and limitations.
- `../extract-unfiltered-control.py`: offline extraction/analysis script; no network, source refresh or external mutation.
