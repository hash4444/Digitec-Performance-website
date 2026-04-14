

## Plan: SEO Improvements for Google Search Console Indexing

### Problem
Google Search Console can't discover your 17 individual service pages because there's no sitemap telling it they exist, and all pages share the same generic title/description from `index.html`.

### What We'll Do

**1. Generate a `public/sitemap.xml`**
- List all pages: `/`, `/tuning`, and all 17 `/services/{slug}` URLs
- Use your domain `https://digitec-performance.ae` as the base URL
- This file is what you submit to Google Search Console

**2. Add dynamic `<title>` and `<meta description>` per service page**
- Install `react-helmet-async` to set page-specific meta tags from React components
- Each service page will get a unique title like *"Mercedes Repair | DIGI-TEC Performance Center Dubai"* and a unique description pulled from the service data
- Also add dynamic meta tags to the Tuning page and homepage

**3. Update `robots.txt` to include the sitemap reference**
- Add `Sitemap: https://digitec-performance.ae/sitemap.xml` to `robots.txt`

### Technical Details

| File | Change |
|------|--------|
| `public/sitemap.xml` | New — all URLs with lastmod dates |
| `public/robots.txt` | Add sitemap directive |
| `src/main.tsx` | Wrap app with `HelmetProvider` |
| `src/pages/ServicePage.tsx` | Add `<Helmet>` with dynamic title + description |
| `src/pages/Tuning.tsx` | Add `<Helmet>` with tuning-specific meta |
| `src/pages/Index.tsx` | Add `<Helmet>` with homepage meta |

### After Implementation
You'll submit `https://digitec-performance.ae/sitemap.xml` in Google Search Console under **Sitemaps** → **Add a new sitemap**. Google will then crawl and index all 17 service pages individually.

