# Query implementation release — 9 September 2026

The approved Search Console map is implemented on top of production source commit `622176a65a48cd1e680fa2b289d79ac7cd905f65`. All 23 priority proposals were reviewed: 22 pages have direct changes, while the stronger polishing page is retained and gains inbound links. Production content is not published by this branch.

## Changes

- Six clearer titles and three H1 changes for BMW, Porsche and generic service owners.
- Specific BMW gearbox and diagnostics content; Porsche steering and diagnostics symptoms, process, repair decisions and qualified FAQs.
- Grammatical shared model headings, service-specific introductions for extended services, qualified symptom descriptions and contextual enquiry labels.
- Hero, mid-page and final enquiry placements on important commercial owners; existing phone, WhatsApp implementation and analytics retained.
- PPF self-healing limitations, ceramic quote checklist, stronger links from brand/body-repair pages to the existing polishing, film and coating owners.
- One indexation exception: the existing English ROX01 soft-close page. Its Arabic version remains noindex. Thirteen other reviewed combinations remain noindex; seven unsupported retrofit/component topics get no new page.
- Correct Arabic hub destinations for 29 English-only model language links.
- Streamed HTML now joins UTF-8 bytes before decoding and strips invalid NUL padding reproduced in React 18 Arabic output. No source-language wording is changed by this cleanup.

The existing Mercedes architecture, newer live metadata, model-aware Aston Martin/McLaren copy, paint-care owners and verified workshop material are preserved. No invented capability, project, product brand, price, warranty, review, location or manufacturer relationship is added.

## Validation

- Both TypeScript configurations pass; `git diff --check` passes.
- Full ten-step production build passes: 1,438 real React routes and 1,155 sitemap URLs.
- Route, canonical, robots, title/description/H1, schema and existing paint-care checks pass.
- 51,940 commercial-page internal links checked; zero unresolved locale/alias fallbacks.
- Existing Mercedes scoped routing tests: 792 alias cases and 67 slash variants.
- Added redirect checks use actual generated destination HTML: 16 GET/HEAD cases for the two legacy aliases, host/scheme and slash variants, query preservation, empty redirect/HEAD bodies, single hop, 200 destination and self-canonical.
- All generated routes checked for invalid NUL characters.
- All 23 priorities checked in a browser at 1440px desktop and 390px mobile; one H1, no overflow, phone/WhatsApp links and no broken loaded images. Extra 320px Aston Martin CTA review and tyre-page check passed.
- Porsche steering FAQ expansion works. Paint assessment required fields validate and populated synthetic details open the correct WhatsApp draft. No message sent.
- Pure WhatsApp tracking check confirms one `whatsapp_click` with enquiry query/fragment text excluded from analytics.

Build source fingerprint: `a37aa45176e1451b73a03b5fc52b29b5675405bc6aa5900538f9900015a094df`.

## Public routing and external work

The existing scoped handler in `cloudflare/mercedes-seo-router.js` permanently redirects `/services/mercedes-repair-dubai` and `/services/mercedes-service-dubai` to `/brands/mercedes-benz-service-dubai` with query preservation. Local production-output tests pass.

Activation on digitecme.com remains blocked: Lovable serves the edge files as static assets, and the Cloudflare dashboard is not signed in. No domain-routing connector is available. Uploading the files alone is not a live redirect fix. Follow [the existing scoped deployment procedure](mercedes-release-deployment.md) with the account controlling domain routing, then repeat public GET/HEAD tests. No unrelated global routing system or DNS change was deployed.

The full local implementation report and CSV ledgers are under `outputs/query-implementation-2026-09-09/`: all changed paths, the 23 priorities, all 106 original CRITICAL rows, all 47 CTR flags, all 25 indexation/evidence decisions and every added/relabelled internal link. The original classifications are preserved. Ranking URLs and CTR causes cannot be inferred from an export without query/page pairs.

Workshop evidence, capability confirmation, Google Business Profile, reviews, backlinks/PR and post-publication Search Console measurements are external follow-up work. No public rankings, CTR lifts or Google indexing are claimed from this build.
