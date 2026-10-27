# Search Console evidence request — prepared October 26, 2026

Status: **authenticated read-only property access verified; eleven indexed URL Inspection observations captured. Full paired historical performance exports remain requested, not retrieved.** See [actual inspection findings](indexed-findings.md), [normalized inspection rows](indexed-inspection-summary.csv) and [raw displayed evidence](indexed-inspection-observations.json). No Request indexing, Test live URL, sitemap submission or settings change was performed. The October 26 audit's supplied workbook covers October 18–24, Web (text-based), all countries and devices. Its separate Queries and Pages tabs cannot establish query-to-page attribution. The 117-query and 49-page cohorts here are copied identifiers/classifications from that audit, with no new performance metrics.

## Request to the property owner

Please provide Search Console exports for the verified `digitecme.com` property, using the exact windows and filters below, plus indexed URL Inspection evidence for the listed URLs. Prefer exports over changing account permissions. If read-only access is supplied, it must be to the intended property; no indexing requests, sitemap submissions, setting changes or production changes are requested. Do not send passwords, OAuth tokens, cookies, API keys or customer information.

Provide the original CSV/XLSX/JSON files, filter screenshots or a filter manifest, export timestamp/time zone, exact property identifier, row counts and any missing/limited-data notice. Keep raw exports unchanged. A screenshot alone is insufficient for numerical analysis; it is useful for filter and canonical evidence.

## Dates and comparable search type

Use custom inclusive date ranges, daily granularity, with the same end date as the audit baseline:

| Window ID | Start | End | Days | Purpose |
|---|---|---|---:|---|
| `7d-baseline` | 2026-10-18 | 2026-10-24 | 7 | Reconcile the existing audit |
| `28d` | 2026-09-27 | 2026-10-24 | 28 | Recent performance |
| `90d` | 2026-07-27 | 2026-10-24 | 90 | Longer context and daily series |
| `previous-28d` (optional) | 2026-08-30 | 2026-09-26 | 28 | Matched period comparison |
| `previous-90d` (optional) | 2026-04-28 | 2026-07-26 | 90 | Matched period comparison |

These are frozen windows ending October 24, not a claim that October 24 is the latest finalized day available now. Record the report's latest available day and any preliminary labels. If the endpoint must move to a different complete day, identify it and shift **all** matched exports together; retain this baseline separately. Do not substitute a calendar three-month preset for 90 days. GSC daily dates use Pacific Time; Dubai time is used only for our capture/report timestamps. The 24-hour view uses browser-local time and is outside this request. [Google date/time definitions](https://support.google.com/webmasters/answer/17011259).

Select **Web: text-based** in the UI to match the source workbook. Record the exact displayed label. Google now documents separate text-based and multimodal Web views; do not silently combine them. [Google search-type definitions](https://support.google.com/webmasters/answer/7576553).

## Required export matrix

Enable Clicks, Impressions, Average CTR and Average position before export. Complete `28d` and `90d`; include `7d-baseline` to reconcile the source.

| Dataset | Country | Device | Query/page filters and grouping |
|---|---|---|---|
| Context controls | All; then United Arab Emirates | All | No query/page filter; export Queries, Pages, Countries, Devices and Dates tabs |
| Mercedes query discovery | All; then UAE | All; Mobile; Desktop separately | Mercedes discovery regex below; Queries tab, then Dates tab |
| Exact query × page | All; then UAE | All; Mobile; Desktop separately | Each exact query from `query-cohort.csv`; **Pages** tab; retain every returned page |
| Exact query × page × day | UAE, and All as context | Mobile and Desktop separately | For each observed query-page pair, retain exact query plus exact page; export **Dates**, daily |
| Page-led discovery | All; then UAE | All; Mobile; Desktop separately | Each exact URL in `page-cohort.csv` plus the priority inspection URLs; **Queries** tab; retain all returned queries |

Start the exact-query workflow with these commercial priorities: `mercedes repair dubai`, `mercedes repair in dubai`, `mercedes specialist dubai`, `mercedes service dubai`, `mercedes workshop dubai`, `mercedes service center dubai`, `mercedes maintenance dubai`, `mercedes oil change`, and `صيانة مرسيدس`. The 117-query cohort expands this starting set; it includes service, model, problem, tuning and audio intent. Keep intent groups separate during interpretation.

Use this discovery regex in a **Query > Custom (regex) > Matches regex** filter:

```text
(?i)(mercedes|merceds|\bbenz\b|\bamg\b|مرسيدس|مرسيدز|مرسدس|بنز|مرسيديز|ميرسيدس)
```

This is a discovery filter, not a complete definition of Mercedes traffic. It misses model-only queries. Use the ten reviewed model-only strings in `query-cohort.csv` as exact queries; inspect newly found model/chassis terms manually before adding them. Do not classify every bare chassis or `mb` string as Mercedes. Use `mercedes` as a Page URL-containing discovery filter, **and** inspect the exact 49-page cohort to retain known pages whose URL lacks that word.

## Precise UI procedure when authenticated extraction is unavailable

1. Sign in to [Search Console](https://search.google.com/search-console/) with an account already authorized for the site. Select the correct property from the top-left selector; record whether it is a Domain property (`sc-domain:digitecme.com`) or URL-prefix property (`https://digitecme.com/`). Do not create a property.
2. Open **Performance > Search results**. Remove existing query, page, country, device and search-appearance filters. Set Search type to **Web: text-based** and Date to **Custom**, entering one exact window above. Choose Daily granularity and enable all four metrics.
3. For a UAE export, choose **+ Add filter** (some accounts show **+ New**) > **Country** > **United Arab Emirates** > Apply. For global context remove the Country filter. UAE is a country segment; it does not isolate Dubai.
4. For an exact-query attribution export, add **Query > Exact query** (or **Queries exactly matching**) and paste one full string, e.g. `mercedes repair dubai`. Select the **Pages** tab below the chart. Do not add a Page filter at this stage: we need every page Google attributes to that query.
5. Export using the top-right **Export > Download CSV** or **Download Excel**. Preserve the package/Filters tab plus Pages data. Name it, for example, `gsc_28d_UAE_Mobile_exact-query_mercedes-repair-dubai_Pages_2026-10-26.xlsx`. Record the query verbatim in the manifest; a filename slug is insufficient.
6. Keep that exact-query filter, add **Device > Mobile**, export Pages; change to **Desktop**, export Pages. Remove Device for All. Repeat for All countries by removing Country while retaining the exact query. Repeat windows and exact queries. Clear the previous query before selecting another.
7. To obtain the daily series for a returned pair, keep the exact Query, Country and Device filters; add **Page > Exact URL** matching that Pages row, including its scheme/host/trailing slash. Select **Dates**, choose Daily and export. The two exact filters make this a query-page series. Repeat for competing URLs, including URLs outside Mercedes paths. Remove the Page filter before discovering pages for the next query.
8. To discover queries landing on a known page, clear Query, set **Page > Exact URL**, select **Queries** and export. Repeat the country/device/window matrix. A Pages export without a query filter and a Queries export without a page filter are separate summaries; **do not join their rows as if they were paired observations**.
9. Save a screenshot of the active filters and the export timestamp. Record an empty result as `no_visible_rows`, with its filters; do not invent zero ranking or substitute an unfiltered row. Repeat for the selected windows.

Google supports simultaneous filters and RE2 custom regex; an exact-query filter followed by the Pages tab provides attribution within that filter. [Google filtering instructions](https://support.google.com/webmasters/answer/17011165). The UI table is limited to 1,000 rows and privacy suppression/truncation can prevent reconciliation. A UI export is therefore a visible-data lower bound. [Google discrepancy guidance](https://support.google.com/webmasters/answer/17010575).

## Preferred read-only API extraction, if an authorized analyst already has it

The JSON file in this folder contains **request templates, not executed results**. Use the verified property identifier and OAuth scope `https://www.googleapis.com/auth/webmasters.readonly`; never put bearer tokens in these files. Run daily requests for July 27–October 24, saving the date as metadata. Extract actual `query`, `page`, `country`, `device` keys together, first for UAE and then global context if feasible. Separate query-only/property controls avoid conflating page aggregation with property metrics. Paginate each identical daily request with `rowLimit: 25000` and `startRow: 0`, `25000`, `50000`… until an empty response; retain request and response metadata. Use `dataState: final`. API device filter values are documented as `MOBILE`, `DESKTOP`, `TABLET`; country uses alpha-3 `ARE`. Preserve returned key casing. [Search Analytics API reference](https://developers.google.com/webmaster-tools/v1/searchanalytics/query).

**Search-type comparability remains an explicit check:** the current API reference documents `type: web` as combined All-tab traffic; it does not document a `web_text` value or a text-based/multimodal selector. The API templates therefore label their type `web`, and must not be relabeled as proven equivalent to UI Web: text-based. Request the UI text-based exports as controls; if exact equivalence cannot be verified for this property, analyze the series separately and disclose the limitation. Do not invent an API parameter.

Daily pagination reduces omissions but does not make API data exhaustive: Google documents a 50,000-row daily/search-type ceiling and possible loss when requesting query/page detail. Keep unfiltered property controls and record row counts rather than claiming complete traffic. [Google extraction and limits](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data).

## Indexed canonical evidence: UI procedure and URL set

Use `priority-inspection-urls.csv` (24 exact URLs): the four source aliases, four intended destinations, protected English oil alias/destination, English hub and English suspension destination, each in slashless and trailing-slash forms. Suspension is an existing audit duplicate control; it is not in the redirect proposal. Inspect exact URLs, not fragment links or UTM variants.

For each URL, paste it into the **Inspect any URL** bar and load the normal **Google Index** result. Expand **Page indexing**. Record/capture: overall status, coverage/indexing reason, User-declared canonical, Google-selected canonical (including `not available`), last crawl, crawled as, crawl allowed, page fetch, indexing allowed, sitemaps and referring page. Save each raw API inspection response if available; otherwise save screenshots and fill the CSV template. Inspect a displayed canonical separately if it differs. Never replace an unavailable Google-selected value with the current HTML canonical.

The indexed report describes Google's stored version and may predate the redirect/content change. **Test live URL cannot establish Google's selected canonical**, and for redirects it can follow the target without making that distinction clear. Keep indexed and any separately requested live-test observations in different fields. No **Request indexing**, **Validate fix**, sitemap submission or removal action is included. [Google URL Inspection guide](https://support.google.com/webmasters/answer/9012289).

The optional URL Inspection API request is read-only despite HTTP POST. It returns the indexed result, not a live test. [Inspection method](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect). `googleCanonical` may be absent when the URL is not indexed; retain absence and the returned state, rather than guessing. [Inspection result fields](https://developers.google.com/webmaster-tools/v1/urlInspection.index/UrlInspectionResult).

## Requested delivery schema and interpretation

`export-manifest-template.csv`, `performance-rows-template.csv` and `url-inspection-template.csv` contain headers only; they contain no measured values. Keep native raw exports alongside normalized CSVs. For UI period rows, leave `date` empty and populate `window_start`/`window_end`; for daily API/UI rows, populate `date` and retain window provenance. Use explicit `ALL` for an unfiltered country/device and blank for a key that is unknown. Keep original property, filters, exact query/page, search-type label, metric definitions, source file and extraction method. CTR is a fraction from 0 to 1 in the normalized schema; document conversion of UI percentages.

GSC average position is an impression-weighted search-performance measure, not a fixed Dubai rank or Maps position. Compare UAE Mobile versus UAE Desktop for the **same exact query/page/window** and show impressions. Calculate aggregate CTR as total clicks / total impressions; calculate a weighted position only for compatible rows and disclose rounding. Do not average CTR percentages or add overlapping 7/28/90-day totals. Do not sum page rows to recreate a query-only/property average. Low or absent impressions do not prove a page never ranks. Country/device result mix and canonical attribution can affect the comparison.

Eleven indexed reports have now been captured: the four slashless legacy sources, their four slashless destinations, the English oil destination in both slash forms and the main hub. They establish what the indexed UI reported on October 26, based on the recorded earlier crawl dates. The remaining exact URLs in the 24-URL inspection cohort, including uninspected trailing-slash sources and the protected English oil alias, still need indexed-report collection. Do not substitute their current HTTP responses for missing Google-selected canonical data.

What remains uncertain until supplied: paired query-page ownership, UAE-specific Mercedes positions, Mercedes-specific mobile/desktop differences, matched 28/90-day performance interpretation, uninspected canonical variants and any ranking effect of the October 21 redirect. The captured body/oil indexing and canonical uncertainties are described in [indexed findings](indexed-findings.md); no future index inclusion, canonical convergence or ranking-recovery result is inferred.
