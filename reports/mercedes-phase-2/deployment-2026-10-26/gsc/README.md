# Search Console indexed-inspection preflight refresh

Captured 26 October 2026, 07:07:18.888–07:09:13.062 UTC (11:07:18.888–11:09:13.062 Asia/Dubai). The authenticated property was `sc-domain:digitecme.com`.

All eleven reviewed URLs were inspected using the existing Google Index report. No Test Live URL, indexing request, sitemap submission or website/configuration mutation was performed. The JSON evidence contains rendered report text and excludes account names, email addresses, credentials and inspection-session IDs.

Compared with the reviewed Phase 2 observations, all eleven URL index statuses, crawl fields, last-crawl timestamps, user-declared canonicals and Google-selected canonicals are unchanged. Seven records show changes only to Search Console's sitemap-discovery display; these are enumerated in the comparison JSON. Those reporting changes do not establish any sitemap configuration change.

| Inspected path | Indexed status | User-declared canonical | Google-selected canonical |
| --- | --- | --- | --- |
| `/ar/brands/mercedes-benz-service-dubai/oil-change` | Indexed | `/ar/services/mercedes-oil-change-dubai` | Inspected legacy URL |
| `/ar/services/mercedes-oil-change-dubai` | Indexed | Same as inspected URL | Inspected URL |
| `/brands/mercedes-benz-service-dubai/body-repair` | Indexed | `/services/mercedes-body-repair-dubai` | Inspected legacy URL |
| `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | Page with redirect | `/ar/services/mercedes-battery-replacement-dubai` | Same as user-declared canonical |
| `/ar/services/mercedes-battery-replacement-dubai` | Indexed | Same as inspected URL | Inspected URL |
| `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | Indexed | `/ar/services/mercedes-mechanical-repair-dubai` | Inspected legacy URL |
| `/ar/services/mercedes-mechanical-repair-dubai` | Indexed | Same as inspected URL | Inspected URL |
| `/services/mercedes-body-repair-dubai` | Crawled - currently not indexed | N/A | N/A |
| `/services/mercedes-oil-change-dubai` | Crawled - currently not indexed | N/A | N/A |
| `/services/mercedes-oil-change-dubai/` | Indexed | `/services/mercedes-oil-change-dubai` | Inspected slash URL |
| `/brands/mercedes-benz-service-dubai` | Indexed | Same as inspected URL | Inspected URL |

All paths in this table use `https://digitecme.com`. Every indexed report's last crawl remains the reviewed historical crawl; this refresh is not a fresh Google crawl or a live-page test. Search Console's displayed crawl timezone has not been verified and is preserved verbatim in the evidence.

The reviewed body-destination exclusion and English oil canonical convergence uncertainty remain. No new declared-canonical or index-status change was observed. This evidence provides no claim that Google has processed the proposed redirects or that indexing will change immediately after deployment.

Files:

- `indexed-inspection-observations.json`: fresh rendered report text and precise capture timestamps for eleven URLs.
- `indexed-inspection-comparison.json`: normalized fields, resolved canonical labels and per-field differences against the reviewed snapshot.
- `compare-indexed-inspections.ps1`: local read-only comparison that validates required fields and fails on status/canonical/crawl-field drift. It has no network or production actions.
