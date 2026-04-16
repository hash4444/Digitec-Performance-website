
The user wants the Tuning page to rank on Google for searches like "GAD tuning Dubai". This is an SEO task — the page already has good content and basic SEO via `useSeo`, but we can strengthen it.

Current state:
- `useSeo` sets title, description, canonical, OG tags
- Page is in `public/sitemap.xml` at `/tuning`
- `robots.txt` allows all crawlers
- Title: "Mercedes Performance Tuning Dubai | DIGI-TEC Performance Center"
- Description does not mention GAD

Gaps:
1. Title/description don't target "GAD tuning" keywords
2. No JSON-LD structured data on the Tuning page (Service schema would help)
3. Sitemap entry could have a `<lastmod>` to encourage recrawl
4. No keywords meta or Open Graph image specific to tuning

## Plan

**1. Update SEO metadata in `src/pages/Tuning.tsx`**
- Title: "GAD Tuning Dubai | GAD Motors Performance Parts & ECU Tuning, Digitec"
- Description: keyword-rich, includes "GAD tuning Dubai", "GAD Motors parts", "ECU tuning Mercedes AMG", "GAD partner UAE"
- Canonical: keep `https://digitecme.com/tuning`

**2. Extend `useSeo` hook (`src/hooks/use-seo.ts`)**
Add optional support for:
- `keywords` meta tag
- `ogImage` (so Tuning gets a relevant share image, not the homepage one)
- `jsonLd` injection (Service / AutomotiveBusiness schema) that mounts on the page and cleans up on unmount

**3. Add JSON-LD structured data to the Tuning page**
A `Service` schema marking Digitec as the provider, GAD Motors as the brand, area served Dubai/UAE, service type "ECU Tuning & Performance Parts". This helps Google understand the page intent for GAD-related queries.

**4. Update `public/sitemap.xml`**
- Add `<lastmod>2026-04-16</lastmod>` to the `/tuning` entry
- Bump priority to 0.9

**5. Add semantic HTML cues to existing Tuning content**
- Ensure the H1 in the GAD section uses keyword-rich text (already good)
- Add `id="gad-tuning-dubai"` and `id="gad-parts-dubai"` anchors so Google can deep-link sitelinks

**6. Tell user about post-deploy steps (chat note, not code)**
- After publishing, submit the URL to Google Search Console for indexing
- Verify the domain in GSC and submit the updated sitemap
- Backlinks from gad-motors.de partner page would significantly boost ranking

## Files to change
- `src/hooks/use-seo.ts` — add `keywords`, `ogImage`, `jsonLd` support
- `src/pages/Tuning.tsx` — update SEO call, add JSON-LD, add section anchor IDs
- `public/sitemap.xml` — add lastmod, bump priority

No new dependencies. No backend changes.
