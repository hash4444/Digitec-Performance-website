
The user wants all pages indexed by Google. I cannot directly submit to Google Search Console (that requires their GSC account), but I can ensure every page in the app is technically indexable and discoverable.

Current state of indexability:
- `public/sitemap.xml` lists: `/`, `/services`, `/tuning`, and 17 `/services/<slug>` pages
- `public/robots.txt` allows all crawlers, references sitemap
- `useSeo` sets unique title/description/canonical/JSON-LD per page

Missing from sitemap:
- `/about` (AboutUs page)
- `/faq` (FAQPage)
- `/vrx` (VRX page)

Need to verify these routes exist in `App.tsx` and check actual paths.

Plan:

**1. Audit routes** — read `src/App.tsx` to confirm all public routes (About, FAQ, VRX, etc.) and their exact paths.

**2. Update `public/sitemap.xml`** — add missing pages (About, FAQ, VRX) with proper priority and lastmod dates. Refresh lastmod on all entries to today (2026-04-16) to signal a recrawl.

**3. Verify SEO on non-service pages** — check `AboutUs.tsx`, `FAQPage.tsx`, `VRX.tsx` use `useSeo` with unique title/description/canonical. Add where missing.

**4. Confirm robots.txt** — already correct, no change needed.

**5. Provide GSC instructions** — explain that automated submission requires the user's Google Search Console access. Provide step-by-step instructions to:
   - Verify the domain in GSC
   - Submit the updated sitemap (`https://digitecme.com/sitemap.xml`)
   - Use "URL Inspection → Request Indexing" for priority pages

## Files to change
- `public/sitemap.xml` — add About, FAQ, VRX; refresh lastmod dates
- `src/pages/AboutUs.tsx` — add `useSeo` if missing
- `src/pages/FAQPage.tsx` — add `useSeo` if missing
- `src/pages/VRX.tsx` — add `useSeo` if missing

No backend or layout changes. After deployment, user must submit sitemap in Google Search Console (Lovable cannot do this on their behalf).
