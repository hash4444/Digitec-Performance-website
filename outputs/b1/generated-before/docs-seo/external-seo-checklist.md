# External SEO and AI-discovery checklist

These actions require access to the production host, analytics, webmaster tools, or business profiles. They cannot be completed safely from the website repository alone.

## Production hosting

- Deploy the generated `dist` directory without rewriting missing asset or page requests to `index.html` with status `200`.
- Serve generated route files as normal `200` pages and `404.html` with a real HTTP `404` status.
- Implement permanent HTTP `301` or `308` redirects for the legacy aliases currently handled in the React router.
- Redirect HTTP and `www` to `https://digitecme.com` with one permanent hop.
- Preserve marketing parameters such as `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, and `gclid` on landing pages. Canonical tags remain query-free.
- Confirm that the CDN/WAF does not challenge or block Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, GPTBot, or other desired crawlers.
- Verify the deployed response, response status, canonical, robots directive, hreflang, title, description, H1, and JSON-LD for representative English and Arabic URLs.

## Search platforms

- Verify the apex HTTPS property in Google Search Console and Bing Webmaster Tools.
- Submit `https://digitecme.com/sitemap.xml` after deployment.
- Inspect representative home, service, brand, brand-service, article, and Arabic URLs, then request indexing for the most important canonical pages.
- Review Indexing/Crawl reports after deployment for soft 404s, redirect URLs in the sitemap, duplicate canonicals, blocked resources, and crawled-currently-not-indexed patterns.
- Monitor rich-result and structured-data reports, but do not treat rich-result eligibility as a ranking guarantee.

## Business entity corroboration

- Complete and verify the Google Business Profile using the exact confirmed name, phone, address, website, category, and hours.
- Use the same business name, address, phone, founding year, and canonical website on Bing Places, Apple Business Connect, major UAE directories, and verified social profiles.
- Link only official Digi-Tec profiles from the website. Model partners as separate entities instead of adding a partner profile to Digi-Tec's `sameAs` list.
- Add verified workshop photos, signage, team information, credentials, and service evidence to first-party pages and business profiles.

## Analytics and lead attribution

- Confirm that GA4 measurement ID `G-4TRCEJSY4S` belongs to the production property.
- Mark `generate_lead` as a key event after verifying phone, email, WhatsApp, directions, and form-submit behavior.
- Test SPA page views and outbound lead clicks in GA4 DebugView/Realtime.
- Preserve and report AI referrals from ChatGPT, Perplexity, Copilot, Gemini, and other assistants. Use tagged links such as `utm_source=chatgpt.com` when Digi-Tec controls the link.
- Connect Search Console to GA4 and establish a monthly review of organic landing pages, qualified leads, brand queries, local visibility, and AI referral traffic.

## Content and reputation

- Replace generic claims with dated first-party evidence: real case studies, original workshop photos, inspection findings, parts decisions, and post-repair checks.
- Assign articles to real, qualified authors or reviewers and publish profile pages describing relevant experience.
- Keep publication and modification dates truthful. Update `dateModified` only when visible content was materially revised.
- Request genuine customer reviews without incentives or review gating. Never add self-authored ratings or review schema.
- Earn relevant local and automotive mentions through verifiable work, partnerships, suppliers, associations, and editorial coverage.

## Ongoing quality control

- Re-run `npm run build` before every release; its SEO validator checks every public route.
- Re-crawl production after major routing, content, schema, or hosting changes.
- Review owner-verification items before restoring any partnership, certification, ranking, inventory, price, opening-hours, or performance claim.
