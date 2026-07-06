## Goal
Ship 78 dedicated SEO landing pages, one for every combination of 13 luxury brands × 6 core services, at `/brands/{brand}/{service}`. Each page targets a specific long-tail query like "BMW oil change Dubai" or "Porsche brake repair Dubai" with fully custom copy, FAQs, and Schema.org markup.

## Brands and services covered

**13 brands:** Mercedes, BMW, Porsche, Audi, Lamborghini, Bugatti, Ferrari, McLaren, Bentley, Rolls-Royce, Aston Martin, Range Rover, Maybach

**6 services per brand:**
1. Oil change
2. Brake repair
3. Transmission repair
4. AC repair
5. Suspension repair
6. Engine diagnostics

## URL structure
```
/brands/bmw-service-dubai/oil-change
/brands/porsche-service-dubai/brake-repair
/brands/lamborghini-service-dubai/transmission-repair
...
```

The brand slug reuses the existing `/brands/:slug` slugs (already SEO-optimized). The service slug is short and clean.

## What each page contains

Each of the 78 pages gets genuinely unique content, not templated boilerplate:

- **H1**: "{Brand} {Service} Dubai" (e.g. "BMW Oil Change Dubai")
- **Meta title + description**: unique, keyword-targeted, under limits
- **Hero paragraph** (150 to 250 words): brand-specific + service-specific reasons, real Dubai context (heat, fuel quality, traffic wear patterns)
- **Common symptoms / when to book** (4 to 6 bullets specific to that brand+service combo)
- **What we service section**: 4 to 6 relevant models for that brand (e.g. BMW: M3, M5, X5, X7, 7-Series, i8)
- **Our process** (3 to 5 steps, brand-specific tools mentioned where relevant: ISTA for BMW, XENTRY for Mercedes, PIWIS for Porsche, ODIS for Audi, etc.)
- **Parts & fluids policy** (1 short paragraph on genuine/OEM parts for that brand)
- **FAQs** (5 to 7 questions unique to the brand+service combination)
- **Cross-links**: back to the parent brand hub `/brands/{brand}` and sideways to the other 5 services for the same brand
- **WhatsApp CTA** with a dynamic prefilled message referencing the specific brand and service

## Files to create

1. **`src/data/brandServices.ts`** (new, large — approx. 78 entries)
   - Exports `brandServiceCombos: BrandServiceCombo[]`
   - Each entry: `{ brandSlug, serviceSlug, brandName, serviceName, title, description, heroCopy, symptoms[], models[], processSteps[], partsCopy, faqs[] }`
   - Content is hand-authored per combo, drawing on brand-specific quirks (e.g. Lamborghini carbon-ceramic brakes, Range Rover air suspension, Porsche PDK transmission)

2. **`src/pages/BrandServicePage.tsx`** (new)
   - Reads `useParams<{ brandSlug, serviceSlug }>()`
   - Looks up the combo; 404 if not found
   - Renders hero, symptoms, models, process, parts, FAQs, cross-links, CTA
   - Injects JSON-LD: `Service` (with `brand: { @type: Brand, name }`, `provider: {@id: business}`, `areaServed: Dubai`, `hasOfferCatalog` listing the sub-steps), `FAQPage`, `BreadcrumbList` (Home > Brands > {Brand} > {Service})

## Files to edit

3. **`src/App.tsx`** — add `<Route path="/brands/:brandSlug/:serviceSlug" element={<BrandServicePage />} />` above the catch-all
4. **`src/pages/BrandPage.tsx`** — add a "Services for {Brand}" grid of 6 cards linking to the new pages
5. **`src/pages/Services.tsx`** — under each brand card, show a subtle count "6 services available"
6. **`public/sitemap.xml`** — append all 78 URLs

## Schema.org (auto per page)

```json
{
  "@type": "Service",
  "@id": "https://digitecme.com/brands/bmw-service-dubai/oil-change#service",
  "name": "BMW Oil Change Dubai",
  "serviceType": "BMW Oil Change",
  "brand": { "@type": "Brand", "name": "BMW" },
  "provider": { "@id": "https://digitecme.com/#business" },
  "areaServed": [{"@type":"City","name":"Dubai"}, ...],
  "hasOfferCatalog": { "@type":"OfferCatalog", "itemListElement":[...processSteps] }
}
```
Plus `FAQPage` and `BreadcrumbList` (Home > Brands > {Brand} > {Service}).

## Scope realism

78 fully custom pages is a large volume of hand-written copy. To keep quality high I'll:
- Write real brand+service-specific paragraphs (no "Lorem ipsum", no interchangeable filler)
- Use brand-specific technical vocabulary (ISTA, XENTRY, PIWIS, ODIS, PDK, xDrive, quattro, 4MATIC, air suspension, carbon-ceramic, etc.)
- Vary FAQs so no two pages share the same questions verbatim
- Ship all 78 in one pass; the codebase will grow by ~one large data file (~2500 to 3500 lines), which is expected for this SEO strategy

## Technical details

- Route file: `src/pages/BrandServicePage.tsx`
- Data: single TS file (not JSON) so we get typing + can reuse `detectBrand` helper from `src/lib/schema.ts`
- Existing helpers reused: `useSeo`, `buildService`, `buildFAQ`, `buildBreadcrumb`, WhatsApp CTA component pattern
- No new dependencies
- Scroll-to-top already handled globally in `App.tsx`
- Sitemap: currently a static file, so I'll append the 78 entries directly (matches existing convention). No generator script migration.
- No changes to backend, brand data, or existing `/services/*` pages
