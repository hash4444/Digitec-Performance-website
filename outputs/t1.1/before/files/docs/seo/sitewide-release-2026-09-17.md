# Sitewide SEO release — 17 September 2026

This release keeps the existing canonical URL and indexing policy. It improves Arabic article relevance, service explanations, contextual navigation, shared social metadata and loading of existing images.

- Replace generic Arabic article bodies with source-grounded topic adaptations. Preserve publication dates and record actual content update dates.
- Use service-specific Arabic symptoms and FAQs; add practical decision questions to extended repair services. Preserve specialist English overrides.
- Correct broken Arabic related links, article metadata and the missing Range Rover logo reference.
- Connect Porsche system and symptom guides from the established Porsche hub.
- Derive article social metadata from each page's existing schema. Use absolute image URLs, preserve explicit choices, and avoid enlarging small brand logos as automatic previews.
- Keep initial homepage sections visible without JavaScript; animate below-the-fold sections as an enhancement. Add the homepage main landmark and clearer workshop-location heading.
- Serve compressed versions of the existing hero, contact-widget and Mercedes engine images. Original artwork is retained.
- Match the visible footer warehouse address to the existing business schema.

The modification-date register is derived from the saved before/after primary content and metadata comparison. Footer-only changes do not reset every URL date. Existing URLs and the sitemap membership are preserved.

## Validation

Run `npm run build`, `npm run typecheck`, `npm run lint`, `npm run validate:master-seo`, and `npm run audit:sitewide`. The production build includes the new all-route social metadata validator. The browser smoke test accepts an existing Playwright package directory and a local production preview URL; it checks representative desktop/mobile pages, metadata replacement during navigation, and initial homepage visibility with JavaScript disabled.

## Hosting boundary

Lovable remains the production host. The previously prepared domain routing correction still requires access to the Cloudflare zone controlling digitecme.com. Uploading routing files into a static deployment does not make those rules execute. Confirm permanent legacy redirects and real missing-page status responses on the live domain after the domain-level correction is activated.

Technical eligibility and these improvements do not establish future search positions. Ranking evaluation requires subsequent Search Console measurements and ongoing first-party business evidence.
