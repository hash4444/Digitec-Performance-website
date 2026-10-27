# Authenticated indexed URL observations

Captured October 26, 2026, **10:47–10:49 UAE**, using the authorized `sc-domain:digitecme.com` property and the normal Google Index report. These are eleven dated stored-index observations, not live fetches. Exact displayed text is preserved in [raw observations](indexed-inspection-observations.json); [normalized CSV](indexed-inspection-summary.csv) records each field and capture time. Last-crawl strings are retained as the UI displayed them; their time zone was not explicitly verified, so no UTC conversion is asserted.

No indexing requests, live tests, validation submissions, new permissions or configuration changes were made. The full query/page/country/device/window performance export matrix remains a prepared request. No new performance totals are claimed from these inspections.

In the table, `self` means the UI displayed “Inspected URL”; `target` means the specific corresponding proposed service URL. All URLs use `https://digitecme.com`.

| Inspected path | Stored state | Stored user canonical | Stored Google canonical | Last crawl date shown |
|---|---|---|---|---|
| `/ar/brands/mercedes-benz-service-dubai/oil-change` | Indexed | Arabic oil service | self, legacy source | October 8 |
| `/ar/services/mercedes-oil-change-dubai` | Indexed | self | self | September 26 |
| `/brands/mercedes-benz-service-dubai/body-repair` | Indexed | English body service | self, legacy source | September 24 |
| `/services/mercedes-body-repair-dubai` | Crawled – currently not indexed | N/A | N/A | October 11 |
| `/ar/brands/mercedes-benz-service-dubai/battery-replacement` | Not indexed: Page with redirect | Arabic battery service | Same as user-declared, target | October 14 |
| `/ar/services/mercedes-battery-replacement-dubai` | Indexed | self | self | October 15 |
| `/ar/brands/mercedes-benz-service-dubai/mechanical-repair` | Indexed | Arabic mechanical service | self, legacy source | October 9 |
| `/ar/services/mercedes-mechanical-repair-dubai` | Indexed | self | self | September 26 |
| `/services/mercedes-oil-change-dubai` | Crawled – currently not indexed | N/A | N/A | October 11 |
| `/services/mercedes-oil-change-dubai/` | Indexed | Slashless English oil service | self, slash URL | September 25 |
| `/brands/mercedes-benz-service-dubai` | Indexed | self | self | October 16 |

## Interpretation for this package

The four proposed destinations are technically eligible in today's public checks, but **the English body target is not confirmed indexed**: the stored report explicitly says crawled, currently not indexed. Do not replace that value with the current HTML canonical or assume the new redirect guarantees its inclusion. Review relevance/content quality and subsequent recrawl/indexing after an approved migration, keeping the existing legitimate service owner.

Three legacy sources remain selected as their own Google canonicals in these stored reports despite declared target canonicals. The Arabic battery source instead records an earlier redirect. Today's public HTTP checks find homepage fallback on all four. The timestamps show why these observations must be kept separate: they do not prove the current fallback existed at each last crawl or identify when it began.

The English oil slash page remains selected/indexed in the captured record, while the slashless destination is recorded as crawled, currently not indexed. The stored crawl dates **precede the October 21 redirect activation**. These records therefore cannot establish that the October 21 rule caused the discrepancy. Preserve that rule and the existing declared canonical/sitemap/internal-link preference; collect post-recrawl evidence before considering any separately approved normalization change. No English oil change is included here.

Some reports show “Temporary processing error” in the Sitemaps field. Preserve that displayed value. It is not proof that today's public sitemap fails: the current public sitemap fetch passed. Do not submit/resubmit a sitemap or start a validation action under this preparation task.

The 24-URL cohort includes additional slash variants, protected English oil alias and suspension controls. Only the eleven rows above were collected in this package; use the [remaining inspection instructions](README.md#indexed-canonical-evidence-ui-procedure-and-url-set) for the rest. A current URL Inspection capture still describes Google's stored knowledge until a later crawl occurs. [Google URL Inspection documentation](https://support.google.com/webmasters/answer/9012289).
