## Goal
Restructure `/services` to boost SEO by surfacing brands-we-serve and giving each luxury brand its own dedicated service landing page (e.g. "BMW Repair Dubai", "Porsche Service Dubai"). This creates targeted long-tail keyword pages instead of one generic services list.

## Why this helps SEO
- Ranks for high-intent queries like "BMW repair Dubai", "Porsche service Dubai", "Lamborghini mechanic Dubai".
- Each brand page becomes a semantic hub linking to relevant services + models.
- Currently only Mercedes has a dedicated flagship page (`mercedes-repair-dubai`). The other 12 brands have thin `/brands/{slug}` pages without a services-per-brand structure.

## Plan

### 1. Update `/services` page (`src/pages/Services.tsx`)
Add a new **"Brands We Service"** section at the top (below hero, above categories):
- Grid of 13 brand logos/cards (Mercedes, BMW, Porsche, Audi, Lamborghini, Bugatti, Ferrari, McLaren, Bentley, Rolls-Royce, Aston Martin, Range Rover, Maybach).
- Each card links to a new brand-specific service page: `/services/{brand}-repair-dubai`.
- Keep existing category sections below.

### 2. Create brand-service page template
Reuse the existing dynamic `ServicePage.tsx` pattern. Add 12 new entries to `src/data/services.ts` (one per non-Mercedes brand) with:
- Slug: `bmw-repair-dubai`, `porsche-service-dubai`, `lamborghini-repair-dubai`, etc.
- Brand-specific title, description, hero copy.
- 6-8 sub-services listed (Engine, Transmission, ECU, Suspension, Brakes, AC, Oil Service, Diagnostics).
- Brand-specific FAQs (5-7 per brand): "Which {Brand} models do you service?", "Do you use genuine parts?", "Common {Brand} issues in Dubai?", etc.
- Common models list (e.g. BMW: M3, M5, X5, X7, 7-Series, i8).

### 3. Schema.org (JSON-LD)
Leverage existing `src/lib/schema.ts` `detectBrand` helper + `buildService` with `hasOfferCatalog`. Each brand page automatically gets:
- `Service` schema with `brand: { "@type": "Brand", name: "BMW" }`
- `hasOfferCatalog` listing the sub-services
- `FAQPage` schema from the FAQ items
- `BreadcrumbList`: Home > Services > {Brand} Repair Dubai

### 4. Internal linking
- Homepage brands section already links to `/brands/{slug}` — add secondary link "View {Brand} services" pointing to `/services/{brand}-repair-dubai`.
- On each new brand-service page, cross-link to the general service pages (oil change, brake repair, etc.) and to `/brands/{slug}` (model showcase).

### 5. Sitemap
Add all 12 new URLs to `public/sitemap.xml`.

## Scope decisions to confirm
1. **Which brands get dedicated service pages?** All 13, or start with top 5 (Mercedes done + BMW, Porsche, Audi, Lamborghini, Range Rover)?
2. **Brand section style on `/services`**: logo grid (compact, visual) or card grid with short description (more content = better SEO)?
3. **Keep `/brands/{slug}` pages** as model-focused pages, and make `/services/{brand}-repair-dubai` the SEO/repair-focused pages? (Recommended, avoids duplication.)

## Files to change
- `src/pages/Services.tsx` — add brands section
- `src/data/services.ts` — add 12 brand-service entries with FAQs
- `src/components/Header.tsx` or homepage brand section — add service links (optional)
- `public/sitemap.xml` — add new URLs
