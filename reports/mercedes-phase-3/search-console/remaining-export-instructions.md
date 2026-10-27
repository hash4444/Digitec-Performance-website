# Remaining Search Console exports after rate-limit stop

Collection stopped at 2026-10-26T08:26:29.037Z on an explicit “429 / Too many requests” page. The saved [AX evidence](raw/gsc-rate-limit-429-ax.txt) and [stop record](raw/gsc-rate-limit-429.json) are preserved. No further GSC navigation, retry loop, account/session change, API workaround or indexing action was used. Resume normal UI work only after Google again permits ordinary access; no immediate user action or new permission is needed for this report.

## Collected and unavailable

All 108 period query-to-Pages cells are validated, with 328 actual paired rows. All 36 query-only daily series and 33 of 96 planned exact-page daily series are validated, totaling 6,210 explicit dates. Three attempted exact-page series are incomplete and rejected, and 60 were never attempted. These 63 planned series are unavailable, not zero. They comprise 5 UAE all-device pairs, 23 UAE mobile pairs and 35 UAE desktop pairs. See [exact missing filter rows](missing-daily-series.csv) and [full final availability](collection-final-availability.json).

## Exact export procedure for each missing row

1. Use the existing sc-domain:digitecme.com property in Performance / Search results. Keep Web and Text-based search type; verify those selected labels. Set custom July 27–October 24, 2026 inclusive, with all four metric cards enabled. Preserve Pacific Time daily reporting boundaries and record capture time separately.
2. Clear previous Query, Page, Country, Device and Search appearance filters. Add Query using **Exact query** and the entire exact_query value from missing-daily-series.csv. Add Country=United Arab Emirates. Leave Device absent for ALL; otherwise set Mobile or Desktop exactly as listed.
3. Add Page using **Exact URL** and the complete exact_page value, including scheme, apex host, path and trailing slash. Do not substitute a canonical, redirect target or normalized variant.
4. Select Dates/DAYS with daily granularity. Wait until filter chips, custom date span and metric tables are complete and no loading message remains. Export CSV through the normal UI. Keep the original ZIP and its Filters/Chart tables with their original bytes. Save a separate manifest row with exact filters, dates, availability, table row count, capture timestamp and file hash.
5. Verify ninety unique dates July 27–October 24, all four metrics and complete table/export pagination. Actual displayed zero-count rows may be preserved; a missing date, empty screen or missing table must remain unavailable. Retain em-dash CTR/position as null. If no-data is explicitly shown, preserve that UI and record its status rather than manufacturing rows.
6. Keep the three rejected originals. Save a later successful export as a new attempt ID and revalidate it; do not silently overwrite the earlier evidence. Stop again if Google returns a rate-limit/error page.

The five remaining ALL-device pairs are all for exact “mercedes oil change dubai”: generic /services/oil-change-dubai, /blog/best-oil-change-dubai-mercedes, the Mercedes hub, the observed Maybach oil alias, and the observed legacy Mercedes repair URL. The precise URL strings in the CSV are authoritative. Current UAE period Pages and query-daily device comparisons remain available even though exact-page daily device series are missing. Do not describe the missing device daily matrix as collected.

## Optional global exact-page daily and preceding 90days

Global query-only daily coverage is complete across all three device filters. Global exact-page daily is **not collected and was not part of the 132-series plan**. If required, collection-final-availability.json enumerates 100 actual observed global90day query/page/device pairs as optional specifications. Use the same procedure with Country filter cleared; do not join unfiltered Queries and Pages or assume UAE pages exhaust global ownership.

An earlier matched90day comparator must be separately exported for **April 28–July 26, 2026 inclusive**, immediately preceding the current July 27–October 24 window. Repeat the same six exact queries, countries ALL/UAE, devices ALL/Mobile/Desktop, and Web/Text-based selection. Start with Pages unfiltered to retain every actual prior-period landing URL; request Query+Dates for query-level daily comparisons and Exact Query+Exact Page+Dates only for actual observed page pairs, using the union of current and prior owners. Record suppressed/unavailable values and export limits. Do not reuse contains-family oil exports or a “3months” preset as this exact comparator. Prior 7 and prior 28 matched windows are already derivable from the accepted ninety-day series; no invented prior 90 values are supplied.

## Remaining stored indexed reports

Eight strict accepted URL inspections are normalized in [indexed summary](indexed-summary.md). The original planning list has additional candidates, including legacy aliases and further language/slash variants; they remain uncollected in this session. When ordinary access permits, paste each exact candidate into URL inspection, wait for displayed URL equality, expand Page indexing and capture stored status, last crawl, allowed/fetch fields, declared and Google-selected canonical, sitemap notice and referring pages. Preserve N/A and unverified crawl timezone. Do not click Test live URL, Request indexing, Validate fix, sitemap submission or settings. Stored pre-deployment crawls cannot show redirect recovery.
