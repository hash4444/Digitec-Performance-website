# SEO-safe HTTP routing deployment

The production build now creates two edge-routing artifacts in `dist/`:

- `_redirects`: one-hop permanent redirects generated from the React redirect routes.
- `_worker.js`: an edge guard generated from the same public route manifest used by prerendering and the sitemap.

The same Worker source is saved at `cloudflare/digitec-seo-router.js` so it can be copied directly from the repository into a Cloudflare Worker.

It also creates `docs/seo/permanent-redirects.csv` in Cloudflare's Bulk Redirect CSV format. The file contains full source and destination URLs, no header row, status `301`, query preservation enabled, and exact-path matching.

The worker provides these behaviors without changing page content or canonical URLs:

1. `http` and `www` requests permanently redirect to `https://digitecme.com` with status `308`.
2. Historical URLs permanently redirect to their final canonical destination in one hop.
3. Every route in the generated public route manifest passes through unchanged.
4. Existing static assets and `/functions/*` requests pass through unchanged.
5. Unknown page paths return the branded `404.html` with status `404` and `X-Robots-Tag: noindex, follow`.

## Deployment requirement

Lovable Cloud currently supplies the SPA fallback that returns `200` for unknown paths. Repository changes alone cannot change an HTTP response after Lovable has sent it. The generated worker therefore needs to run at Cloudflare before the Lovable origin.

The domain already uses Cloudflare nameservers. A Worker route requires an orange-clouded/proxied DNS record. Configure the Lovable domain as using Cloudflare/a similar proxy, follow the CNAME shown by Lovable, and confirm both production hostnames are proxied before deploying `dist/_worker.js` as a Cloudflare zone Worker on:

- `digitecme.com/*`
- `www.digitecme.com/*`

Keep the React redirects in place as a browser fallback. Do not add a blanket redirect from unknown paths to the homepage.

Import `docs/seo/permanent-redirects.csv` into a Cloudflare Bulk Redirect List and enable that list with a Bulk Redirect Rule. Create a separate Single Redirect for `www.digitecme.com` to the apex hostname, with path and query string preservation.

## Release verification

Verify every release before requesting reindexing:

| Request | Expected response |
| --- | --- |
| `https://digitecme.com/brands/porsche-service-dubai` | `200` |
| `https://digitecme.com/about-us` | `308` to `/about` |
| `https://digitecme.com/services/engine-diagnostics` | `308` to `/services/car-diagnostics-dubai` |
| `https://www.digitecme.com/brands/porsche-service-dubai` | `308` to the apex URL |
| A unique nonexistent path | `404` with the branded page |
| `https://digitecme.com/robots.txt` | `200` |
| `https://digitecme.com/sitemap.xml` | `200` |

Run `npm run build` before deployment. The build fails if a redirect loops, chains, conflicts, or targets a route that is not in the public route manifest.

## Rollback

Detach the two Worker routes to restore the existing Lovable response behavior. The page files, canonicals, sitemap, and React application are not changed by that rollback.
