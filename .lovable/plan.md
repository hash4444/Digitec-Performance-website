## Audit Findings (Quick)

- **Per-route titles/meta**: ✅ Every route already sets unique title + description via `useSeo` hook (client-side mutation of `document.head`). Includes Index, Services, ServicePage, BrandPage, AboutUs, FAQ, Blog, BlogPost, Tuning, VRX, NotFound.
- **Sitemap**: ✅ Exists at `public/sitemap.xml` but is a static, hand-edited file and **missing all 13 `/brands/*` URLs**.
- **⚠️ Pre-rendered content / SSR**: This is a pure client-side React SPA (Vite + BrowserRouter). The static `index.html` shipped to every URL contains only the homepage's `<title>` and `<meta description>` — `useSeo` rewrites them after JS hydrates. Googlebot executes JS and will see the per-route tags, but non-JS social/preview crawlers (LinkedIn, Slack, Facebook, X, WhatsApp link previews) only see the static head. **No SSR / prerender is in place**. Adding true SSR or build-time prerendering would require either migrating to Next.js / a vite-prerender plugin / Cloudflare Worker prerender — out of scope for one feature request. **Flagging this explicitly per your ask.**

## Plan

### 1. SEO infrastructure
- Add **all 13 brand URLs** (`/brands/[brand]-service-dubai`) to `public/sitemap.xml` with `lastmod=2026-06-18`, weekly changefreq, priority 0.8.
- Leave existing per-route `useSeo` system as-is (it already covers titles + descriptions + canonicals per page). Tighten the BrandPage SEO to also emit a `LocalBusiness` + `FAQPage` JSON-LD per brand (uses the new FAQ content from §3 below).
- Do **not** introduce `react-helmet-async` — the existing `useSeo` hook does the same job and avoids a redundant rewrite.

### 2. Brand data: extend `src/data/brands.ts`
Add new optional fields per brand so the BrandPage is data-driven (no per-brand JSX):
- `whyChoose: { title: string; description: string }[]` — 4 brand-specific technical bullets naming real systems/components (e.g. Mercedes → AIRMATIC, 9G-Tronic, Star Diagnostics, AMG 4MATIC+; Ferrari → F1-DCT, carbon-ceramic CCM brakes, magnetorheological dampers; McLaren → MonoCell II carbon tub, Proactive Chassis Control, active aero; Range Rover → air suspension, Terrain Response 2; Lamborghini → CCB brakes, LDF gearbox, ANIMA modes; etc.).
- `faqs: { q: string; a: string }[]` — 4 brand-specific Q&As ("How often should a [Brand] be serviced in Dubai?", "Do you use genuine [Brand] parts?", "How long does a typical [Brand] service take?", "Do you handle [brand-specific system, e.g. AIRMATIC / CCM brakes / iDrive coding]?").
- `relatedServices: string[]` — array of existing service slugs from `src/data/services.ts` relevant to that brand (e.g. Mercedes → `mercedes-repair-dubai`, `transmission-repair-dubai`, `car-diagnostics-dubai`, `car-ac-repair-dubai`; Ferrari → `mechanical-repair-dubai`, `brake-repair-dubai`, `suspension-repair-dubai`, `paint-protection-dubai`; etc.). All slugs validated against existing `services` array.
- `testimonial?: { name: string; vehicle: string; quote: string }` — optional brand-specific review. Where we don't have one, the page falls back to a generic trust block (ratings + stats: 50,000+ cars served, 8,000+ satisfied customers, 40,000 sq ft facility) — consistent with site stats.

### 3. BrandPage new sections (in this order, between existing "Why Choose" and "Other Brands")
1. **Why [Brand] Owners Choose Digi-Tec** — replaces the current generic `WHY_CHOOSE` array. Renders `brand.whyChoose` as a 2-col grid of cards with `CheckCircle2` icons and brand-specific technical copy.
2. **Brand-relevant testimonial / trust block** — if `brand.testimonial` exists, single quote card with name + vehicle. Otherwise a trust strip with stars, "4.9/5", and the three stats.
3. **FAQ** — Radix `Accordion` (already in project at `src/components/ui/accordion.tsx`) rendering `brand.faqs`. Also emitted as `FAQPage` JSON-LD via `useSeo`.
4. **Booking form CTA** — new section with a simple form: Name, Phone, Brand (pre-filled + locked to `brand.name`), Issue (textarea). Validated client-side with **zod** (already in deps via shadcn `form`). On submit, opens WhatsApp with a pre-filled message containing the form data (`https://wa.me/97143402223?text=...`) — no backend write needed, consistent with the site's existing WhatsApp-CTA pattern. Existing Call / WhatsApp buttons stay above the form.
5. **Related Services** — horizontal row of 3-4 cards linking to `/services/[slug]` for each slug in `brand.relatedServices`. Each card pulls `title` + `description` + `image` from `services.ts` so copy stays in one place.

### 4. Design consistency
- All new sections use the existing tokens: `bg-black`, `bg-charcoal`, `text-burnt-orange` (#F04E14), `rounded-2xl` / `rounded-3xl`, `font-black` headings, white-bg CTAs keep black text. No new colors, no new fonts.
- No hyphens/em-dashes in copy (commas/colons per project rule).
- Mobile-first; existing sticky mobile WhatsApp/Call buttons preserved.

### Files touched
```text
public/sitemap.xml                  (add 13 brand URLs)
src/data/brands.ts                  (add whyChoose, faqs, relatedServices, testimonial per brand)
src/pages/BrandPage.tsx             (new FAQ, why-brand, testimonial, booking form, related services sections + FAQ JSON-LD)
src/components/BrandBookingForm.tsx (new — zod-validated form, posts to WhatsApp)
```

### Out of scope (flagged above)
- True SSR / build-time prerendering for non-JS social crawlers — needs a separate decision (migrate to Next.js, add `vite-plugin-prerender`, or a Cloudflare Worker). Happy to do this next if you want — recommend the `vite-plugin-prerender` route since it keeps the current stack.