# Production HTTP routing for digitecme.com

## Current live behaviour (measured, apex on Cloudflare + Lovable hosting)

| Request | Live now | Required |
| --- | --- | --- |
| `/` | 200 | 200 |
| `/brands/porsche-service-dubai` | 200 | 200 |
| `/about-us` | **200** (SPA fallback) | 301/308 -> `/about` |
| `/services/engine-diagnostics` | **200** (SPA fallback) | 301/308 -> `/services/car-diagnostics-dubai` |
| `www.digitecme.com/...` | **302** | 301/308 to apex |
| nonexistent URL | **200** (SPA fallback) | 404 + `X-Robots-Tag: noindex, follow` |
| `/robots.txt`, `/sitemap.xml` | 200 | 200 |

Lovable hosting serves `index.html` with status `200` for any unmatched navigation and
does **not** execute `_redirects`, `_worker.js`, `_headers`, `netlify.toml` or `vercel.json`.
So the repository build cannot, on its own, produce the statuses above. The generated
artefacts are correct and tested, but they need an edge that runs them.

## What the repository now produces

`npm run build` runs `scripts/generate-hosting-rules.mjs` then `scripts/test-hosting-rules.mjs`
and emits:

- `dist/_redirects` — 141 permanent (308) legacy rules plus the `www` -> apex rule.
- `dist/_worker.js` — a Cloudflare Pages advanced-mode worker implementing all four
  behaviours (apex canonicalisation, one-hop 308 redirects with query preservation,
  200 for the 1,334 prerendered routes, real 404 with `X-Robots-Tag: noindex, follow`).
- `dist/404.html` — branded 404 body matching the React `NotFound` page.
- `docs/seo/permanent-redirects.csv` — audit trail; the test asserts no rule points at
  another rule, so every hop is final.

Nothing in page content, canonical tags, hreflang, structured data or sitemap URLs is
modified by this step. `/functions/*`, `/assets/*`, `/lovable-uploads/*` and any path with a
file extension bypass the worker logic entirely, so MCP and Supabase calls are untouched.

## Option A (no migration): Cloudflare rules on the existing zone

These run in front of Lovable hosting and need no DNS or hosting change.

### A1. Canonical host — Bulk/Single Redirect Rule

Rules -> Redirects -> Create rule:

- Name: `www to apex`
- If: `Hostname equals www.digitecme.com`
- Then: Dynamic redirect, expression
  `concat("https://digitecme.com", http.request.uri.path, if(len(http.request.uri.query) > 0, concat("?", http.request.uri.query), ""))`
- Status: **301** (or 308)
- Preserve query string: on

This replaces the current 302.

### A2. Legacy redirects — Bulk Redirects list

1. Account Home -> Bulk Redirects -> Create list, name `digitec-legacy`.
2. Upload `docs/seo/permanent-redirects.csv` (columns map to source/target; set status 301,
   Preserve query string **on**, Subpath matching **off**, Preserve path suffix **off**).
   Source URLs must be entered as `digitecme.com/about-us` form.
3. Create a Bulk Redirect Rule that applies the list to all incoming requests.

Because the CSV is chain-free, every legacy URL resolves in a single hop.

### A3. Genuine 404s — Cloudflare Worker route

A Redirect Rule cannot emit a 404 body, so this part needs a Worker. Create a Worker
with the contents of `dist/_worker.js`, replacing the `env.ASSETS.fetch(request)`
calls with `fetch(request)` (pass-through to Lovable origin), and bind it to the route
`digitecme.com/*`. Keep `ROUTES` in sync by redeploying the Worker after each site
build that adds or removes routes (the generated file is regenerated every build).

Without A3, unknown URLs keep returning 200 and Google keeps treating them as soft 404s.

## Option B (needs explicit approval): host `dist` on Cloudflare Pages

Deploy the built `dist` directory to Cloudflare Pages with the apex custom domain.
Pages executes `_worker.js` and `_redirects` natively, so all six requirements are met
by the build with zero extra configuration, and `ROUTES` is always current. This is a
hosting migration and a DNS change, so it must not be done without approval.

## Verification after any of the above

```bash
for u in / /brands/porsche-service-dubai /about-us /services/engine-diagnostics \
         /robots.txt /sitemap.xml /definitely-not-a-page-$RANDOM; do
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}  $u\n" "https://digitecme.com$u"
done
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" \
  "https://www.digitecme.com/brands/porsche-service-dubai?utm_source=test"
curl -sI https://digitecme.com/definitely-not-a-page | grep -i x-robots-tag
```

Local equivalent, run on every build: `npm run test:routing`.
