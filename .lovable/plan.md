

## SEO-Friendly Service URL Migration

Rename every service URL to a slug derived from its H1 (lowercase, hyphenated, stop words removed, primary keyword + `dubai`). All current URLs keep working via single-step permanent redirects, so existing Google rankings, backlinks, and the redirects you already added are preserved.

### New slug map (old → new)

| Old slug | New slug (H1-derived) |
|---|---|
| `mercedes-repair` | `mercedes-repair-dubai` |
| `mechanical-repair` | `mechanical-repair-dubai` |
| `transmission-services` | `transmission-repair-dubai` |
| `suspension-repair` | `suspension-repair-dubai` |
| `steering-repair` | `steering-repair-dubai` |
| `brake-system-repairs` | `brake-repair-dubai` |
| `routine-maintenance` | `car-service-dubai` |
| `oil-change-service` | `oil-change-dubai` |
| `tire-repair` | `tire-repair-dubai` |
| `battery-changes` | `battery-replacement-dubai` |
| `exhaust-repair` | `exhaust-repair-dubai` |
| `car-programming-diagnostic` | `car-diagnostics-dubai` |
| `electrical-system-repairs` | `auto-electrical-repair-dubai` |
| `fuel-system-repair` | `fuel-system-repair-dubai` |
| `ac-repair-maintenance` | `car-ac-repair-dubai` |
| `car-body-repair` | `car-body-repair-dubai` |
| `car-paint-protection` | `paint-protection-dubai` |

### How SEO is preserved (the important part)

Lovable hosts an SPA, so true server-side `301` headers aren't issued — but Google treats consistent client-side `Navigate replace` redirects + a single canonical as equivalent for ranking transfer, which is exactly what your site already does for `mercedes-body-repair-dubai`, `mercedes-brake-repair-dubai`, etc. We extend that same pattern:

1. **Change `slug` in `src/data/services.ts`** to the new value for each service. The page becomes the new URL and is the only canonical.
2. **Build a single `OLD_TO_NEW_SLUG` map in `src/pages/ServicePage.tsx`** containing every previous slug pointing directly to its new slug. The existing `SLUG_REDIRECTS` and `-dubai` suffix logic merge into this one map so there are zero redirect chains (old → new in one hop, never old → intermediate → new).
3. **Canonical + JSON-LD `url`** automatically use the new slug (already derived from `service.slug`). Meta title, description, schema, and content stay untouched.
4. **Internal links** in `Services.tsx`, `ServicePage.tsx` (related services), `ServiceGrid.tsx`, and any other reference are already generated from `service.slug`, so they update automatically.
5. **`public/sitemap.xml`** rewritten to list only the 17 new URLs with today's `lastmod`. Old URLs removed so Google stops indexing them and follows the redirect to the new ones.
6. **No `noindex` added.** All new pages stay fully indexable. Old slugs render the redirect immediately (no flash of content), so Google sees a clean redirect signal.
7. **`App.tsx` redirect** for `mercedes-body-repair-dubai` updated to point straight to `/services/car-body-repair-dubai` (one hop, not two).

### Files changed

- `src/data/services.ts` — update 17 `slug` values only.
- `src/pages/ServicePage.tsx` — replace the redirect logic with one consolidated `OLD_TO_NEW_SLUG` map covering all 17 previous slugs plus the existing legacy entries (`mercedes-brake-repair-dubai`, `mercedes-transmission-repair-dubai`, `mercedes-ac-repair-dubai`, `mercedes-suspension-repair-dubai`, `engine-diagnostics-dubai`, `mercedes-oil-change-dubai`, `performance-tuning-dubai`). Drop the generic `-dubai` strip since new slugs themselves end in `-dubai`.
- `src/App.tsx` — update the `mercedes-body-repair-dubai` Navigate target to the new slug.
- `public/sitemap.xml` — replace the 17 service URLs with the new ones, refresh `lastmod` to 2026-04-21.

### Validation after implementation

- Visit each old URL (e.g. `/services/oil-change-service`) → should land on `/services/oil-change-dubai` with the correct page rendered.
- Visit each new URL directly → renders, canonical points to itself, no console errors, no 404.
- Confirm `/services` index, homepage `ServiceGrid`, and related-services links on `ServicePage` all use the new slugs.
- Confirm sitemap.xml contains only new slugs.
- No redirect chains: old slug → new slug in exactly one `Navigate replace`.

### Note on your concern about existing old URLs already redirecting

Your current `SLUG_REDIRECTS` (e.g. `mercedes-brake-repair-dubai → /services/brake-system-repairs`) would become a **chain** if we just renamed slugs (old Google URL → old slug → new slug = two hops, bad for SEO). The plan avoids this by **rewriting every entry in that map to point directly at the new slug**, so every legacy URL — whether from Google's index, backlinks, or your prior redirect map — resolves in a single hop to the final new URL. Ranking signals consolidate cleanly on the new canonical.

