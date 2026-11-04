# Range Rover and Defender SEO — R1 and R1.1

The existing Range Rover and Defender hubs now provide distinct English/Arabic service guidance, model coverage, repair links, workshop imagery and contextual WhatsApp enquiries. The general Land Rover hub retains broader marque ownership and links to both specialist families.

R1 improved 44 existing localized pages. R1.1 refined eight existing routes, including the two existing Range Rover body-repair equivalents: body damage assessment, a Sport/SVR brake-pad enquiry FAQ, relevant internal links and Defender model-context drafts. The body-service card spans its grid row. Photos provide existing workshop context; no undocumented accident job, generation, repair outcome or capability is inferred.

No new routes, redirects, dependencies, canonical ownership, indexability or language policy changes are introduced. Public coverage remains 1,256 routes and 1,005 sitemap canonicals. Existing GA4/GTM events, WhatsApp destination, telephone contact and shared business schema are retained. Contact clicks and drafts are distinct from received enquiries or confirmed bookings.

## Validation

Validated against base commit `085e64fe1e0e17c373b041ea6afeb579c36df89b`:

- Declared production build and both TypeScript configurations pass.
- ESLint reports no errors; changed application and verification files pass targeted lint.
- R1/R1.1 static checks cover 106 cluster routes, canonical/hreflang/language/RTL, internal links, local assets and visible FAQ/schema agreement.
- Browser verification covers 138 distinct route/viewport cases at 390, 768 and 1440 pixels, 46 routes without JavaScript, 76 contact-event checks, four booking forms, six model drafts and four bidirectional language switches.
- An isolated copy of the base plus exactly twelve application files passes all nineteen production pipeline steps and both TypeScript checks without concurrent tuning, App, route-manifest or Supabase changes.

## Reproducing current checks

With the repository dependencies installed:

```sh
npm run build
npm run typecheck
npm run lint
node scripts/test-r1-browser.mjs 5217 --growth
```

The browser harness needs Playwright and Chromium or Edge. It resolves an available local Playwright installation or the bundled Codex runtime. It tests the built local production router, blocks external requests and intercepts telephone, WhatsApp and form actions. It sends no enquiry. `--growth --hubs` and `--growth --body` run focused checks in separate output directories.

The audit scripts capture immutable before/after route evidence. `validate-r1.mjs` and `validate-r11.mjs` compare those captures and require their historical evidence files; they are not standalone substitutes for a production build. The four committed R1.1 configuration files define the application and route allowlists. The original pre-commit evidence remains local; Git HEAD must remain fixed during a new before/after comparison.

## Source scope

The application change set comprises twelve files: `BrandPage.tsx`, `BrandServicePage.tsx`, `BlogPost.tsx`, `priorityBrandSeo.ts`, `aiGuidePosts.ts`, `aiGuidePostsExtra.ts`, `ar-model-blog-content.ts`, `R1HubPage.tsx`, `r1HubContent.ts`, `r1ServiceContent.ts`, `r11RangeRoverBodyContent.ts` and `r1-hubs.css` in their established source directories.

Separate tuning and Supabase work, source spreadsheets, private search exports, raw audit captures, screenshots, local build bundles and shared generated infrastructure/SEO files are excluded. Production artifacts should be regenerated from this source. No production settings, release or merge are part of this change.
