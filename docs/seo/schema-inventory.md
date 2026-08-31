# Schema and route inventory

Generated from the production build on 2026-08-20. The CSV in this folder contains one row for every public content route.

## Before

- Synthetic crawler-only route bodies replaced the real React UI.
- Route JSON-LD was duplicated after JavaScript and could persist across navigation.
- 994 sitemap URLs omitted 60 indexable routes and included one redirect.
- 280 pruned pages switched from noindex to index after hydration.
- Shared entity names and facts conflicted, and unsupported ratings/recommendations appeared in visible content.

## After

- 1437 real React routes are statically rendered: 1157 indexable and 280 consistently noindex.
- The sitemap contains only canonical indexable content routes.
- Every route has one site entity graph and one route graph, with stable IDs.
- Initial HTML contains the route title, description, canonical, H1, semantic content, internal links and JSON-LD.

## Route counts

- about: 2
- article: 211
- blog-hub: 2
- brand: 98
- brand-service: 984
- brands-hub: 2
- faq: 2
- home: 2
- html-sitemap: 3
- service: 111
- services-hub: 2
- tuning: 2
- vrx: 2
- workshop-guide: 14

## Validation

- Errors: 130
- Warnings: 0
