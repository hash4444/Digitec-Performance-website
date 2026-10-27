# T1 implementation and verification

Readiness and public factual corrections are superseded by [T1.1 final factual verification](../t1.1/README.md). This document records the original T1 implementation.

Implemented locally for DIGI-TEC Performance Center L.L.C., Dubai, on 2026-10-05. Baseline HEAD: 546e02fb214212e187c159c303fda2354d480ff3; branch main. No commit, push or deployment performed.

## Result

/tuning remains the primary commercial owner for generic car/performance tuning, ECU/remap, chip terminology, generic stages, GAD and general price/local searches. Its title and H1 now lead with performance tuning in Dubai. New sections explain calibration, chip terminology, configuration-dependent stages, prices and package-specific TCU scope. GAD relationship wording is supported by its [primary contact listing](https://www.gad-motors.de/). BMW/Audi positive tuning signals were corrected in master, FAQs/schema and the supporting ecosystem; unrelated service owners are retained.

The existing selector remains. A native expandable comparison exposes all 16 vehicles and 67 tuning packages in initial English/Arabic HTML, including stock/tuned HP, torque, gains, source EUR price qualifiers, estimated time and exact included work. Arabic package content now follows the actual item, replacing inaccurate positional substitutions. No tuning dataset figures were changed.

## Model architecture

Nine English commercial model owners were created from exceptional configurator depth, as allowed by T1. This workbook contains no model-specific query demand; none is claimed. GT/GTS and GTC/GTR share one page; each other supported model has one page with its actual stages as sections. No stage-specific or filter-state URLs were created.

- /tuning/aston-martin-db11
- /tuning/lamborghini-urus
- /tuning/mercedes-amg-c63
- /tuning/mercedes-amg-e63
- /tuning/mercedes-amg-g63
- /tuning/mercedes-amg-glc63
- /tuning/mercedes-amg-gt
- /tuning/mercedes-amg-gt63
- /tuning/mercedes-amg-s65

Six entries remain Tier 2 in the master configurator: S63 AMG E Performance, C43 AMG W205, C450 AMG W205, C400 W205, CLA45 AMG and A45 AMG. The S63 stored output scope needs confirmation; other Tier 2 records lack model-level demand and exceptional package depth. The AMG GT guide remains informational and links to the commercial model owner. Model pages link to the master and existing brand/service owners; master and HTML/XML sitemaps link to all new pages. New model pages have no unpublished Arabic hreflang; language selection uses the real Arabic tuning master.

## Evidence and requested deliverables

- baseline/: clean Git evidence, T1_BASELINE_HEAD, original source/HTML/sitemap, build/typecheck/validator logs, baseline sitewide evidence, live rendered/mobile evidence.
- current-tuning-page-audit.md: metadata, heading, copy, GAD, schema, rendering, link and CTA baseline.
- unsupported-tuning-brand-audit.md and gad-motors-evidence.md: evidence and precise source corrections.
- performance-configurator-inventory.csv: 83 rows (16 stock references +67 tuning packages), all 21 required columns.
- tuning-supported-vehicle-whitelist.csv: 16 actual configurator records and all 12 required columns.
- tuning-gsc-query-register.csv: all 113 observed queries, unchanged metrics, all 17 required columns.
- tuning-wrong-owner-queries.csv: 14 reviewed cases with owner/correction and evidence strength.
- tuning-model-page-decisions.csv: 16 decisions, all 20 required columns, 10 Tier 1 records consolidated into nine URLs and six Tier 2 records.
- tuning-gsc-workbook-scope.md / tuning-gsc-workbook-data.json: every relevant tab, filters/date window and reconciliation limits.
- tuning-master-generic-ownership-assessment.csv: every minimum generic intent, including absent exact queries without invented metrics.
- tuning-model-tier-rationale.md and tuning-model-factual-qa.json: nonnumeric decisions, unique package depth and numerical/source checks.
- verification/: final package, architecture, sitewide, router and existing validator evidence plus desktop/mobile/no-JavaScript screenshots.

## GSC scope and limits

Workbook exported October 5 explicitly filters https://digitecme.com/tuning, Web, Last 28 days; dates shown September 5–October 2, 2026. Chart/Pages totals are 11 clicks and 991 impressions; Queries/Countries/Devices total 1 click and 627 impressions. The discrepancy is preserved and remains unexplained. No overlapping periods or dimensional totals are added. Three audio queries contribute 100 visible impressions and belong to the existing Mercedes audio owner. BMW tuning has five impressions and is excluded. Porsche tuning has 12 impressions and retains /tuning ownership.

## Verification

- TypeScript and complete production build: passed.
- All build SEO/routing/service/contact/social validators: passed.
- Additional master SEO, BMW hub, paint-care cluster and standalone production-router tests: passed.
- Tuning validator: 16 vehicles, 67 exact packages, nine model owners; FAQ/schema, canonical, robots, sitemap, language and stage-routing checks passed.
- Sitewide audit: 0 errors, 0 metadata issues, 0 duplicate titles, 0 duplicate descriptions, 0 duplicate pages, 0 broken links and 0 broken fragments. Existing six pages without contextual incoming links and 58 short pages are unchanged; new model pages have incoming links.
- Architecture: 1,247 →1,256 public routes and 996 →1,005 sitemap canonical URLs. All existing public routes and indexability states retained; no existing canonical owner removed. Permanent redirects remain 263; removed historical URLs remain 194.
- Browser checks: working selector/stage change, native details expansion, mobile 390 ×844 without document overflow, model landing page and desktop comparison. A local preview response with script-src 'none' verifies native package tables/accordions without JavaScript.
- Baseline standalone router test failed on stale request-reference assertions. It was corrected to test preserved URL/method/headers, intended cloned-request policy, HTML404/noindex, empty HEAD, assets and preserved origin redirects/errors. Backend routing code is unchanged. Baseline failure and final passing report are retained.
- Existing React fetchPriority and build-size warnings are inherited; no new compilation error. Vite build needed filesystem-sandbox escalation. The plugin's incidental machine-local MCP rewrite was restored after each build; no backend change is included.

## Pending business data

The user confirmed Porsche support and a separate current model list, to be supplied later. Porsche stays eligible by confirmed business evidence, with enquiry wording on /tuning. No Porsche model, engine, stage, price or output was fabricated. Model expansion awaits that list. GLC63 price-range endpoints and DB11 inherited MCT package terminology are explicitly qualified; S63 combined-vs-engine output remains a recorded verification gap.

To review the finished local build, run node outputs/t1/preview-t1.mjs and open http://127.0.0.1:5191/tuning. Append ?t1-no-js=1 for the no-JavaScript view.
