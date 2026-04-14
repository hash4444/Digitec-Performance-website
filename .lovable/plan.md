

# Fix 404s for Google-Indexed URLs with "-dubai" Suffix

## Problem
Google has indexed URLs like `/services/mercedes-repair-dubai/` but your actual routes use `/services/mercedes-repair`. Visitors clicking those Google results get a 404.

## Solution
Add a redirect component that catches any `/services/:slug` where the slug ends in `-dubai` and redirects to the correct page without `-dubai`. This is cleaner than duplicating pages and avoids SEO duplicate content penalties.

## Technical Details

### 1. Create a redirect wrapper in `src/pages/ServicePage.tsx`
Before rendering the service page, check if the slug ends with `-dubai`. If it does, strip `-dubai` and redirect using `<Navigate to={...} replace />`. This sends a client-side redirect to the correct URL.

### 2. Update the sitemap (`public/sitemap.xml`)
Change all URLs to match the actual routes (without `-dubai` suffix) so Google re-indexes the correct URLs going forward.

### 3. No new routes needed
The existing `/services/:slug` route already captures these URLs. We just add logic inside `ServicePage` to handle the redirect.

## Files Changed
- `src/pages/ServicePage.tsx` — Add redirect logic for slugs ending in `-dubai`
- `public/sitemap.xml` — Ensure URLs match actual routes (already correct, will verify)

