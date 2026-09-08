# Mercedes release: content and HTTP routing

## Production project

The authenticated Lovable project is [dubai-performance-art](https://lovable.dev/projects/b8255283-fdd9-4c2d-8b46-ccb596f695e1), synchronized with `hash4444/Digitec-Performance-website`. Its pre-release commit was `704245d7ebfb561c9ad29d6001fa76c6d8564c11`, matching the local checkout and GitHub main. The old README project ID was stale and has been corrected.

Publish the verified source commit through this existing project, then check `https://digitecme.com` directly. The separate project in `.openai/hosting.json` is a Sites mirror and is not evidence of publication to the custom domain.

## Why the existing redirect files do not fix production

On 8 September 2026 the public domain returned `_redirects` and `_worker.js` as downloadable assets while the Mercedes legacy URLs still returned the homepage with HTTP 200. Lovable was not executing these files as edge configuration. React navigation changes the browser location after loading; it cannot supply a permanent HTTP response.

[Lovable's custom-domain documentation](https://docs.lovable.dev/features/custom-domain) describes using a reverse proxy/CDN and domain-level redirects. Cloudflare Pages' [`_redirects`](https://developers.cloudflare.com/pages/configuration/redirects/) and [`_worker.js`](https://developers.cloudflare.com/pages/functions/advanced-mode/) behavior is platform-specific.

## Activate only the scoped Mercedes rules

The build generates two alternatives. Choose one; do not enable both or the older global route guard incidentally.

### Scoped Worker

Deploy `cloudflare/mercedes-seo-router.js` in the authorized Cloudflare account for the domain. After confirming the existing zone and proxy configuration, attach it to `digitecme.com/*` and `www.digitecme.com/*`. Do not change DNS ownership, purchase a plan or alter unrelated routing.

The handler:

- Restricts redirects to GET and HEAD on those two hosts.
- Maps exact known Mercedes aliases directly to their final HTTPS apex destination.
- Normalizes case, repeated slashes and trailing slashes only when a known Mercedes path matches.
- Preserves the original query string, including repeated parameters and click IDs.
- Expands known Arabic model/problem fallbacks into concrete paths; no literal `:slug` entry is deployed.
- Passes every unrelated URL, unknown path and mutation request to the existing origin unchanged.

### Bulk Redirect alternative

Import `docs/seo/mercedes-permanent-redirects.csv` into a dedicated list and enable only that list with a rule restricted to GET/HEAD. The headerless CSV specifies status 308, query preservation, exact paths, no subpath matching and no subdomain expansion. Apex/www and trailing-slash aliases are explicit, as are www/HTTP forms of canonical Mercedes pages.

The CSV covers exact variants; unlike the Worker it does not provide general case/repeated-slash normalization. Keep existing unrelated rules intact and inspect rule order for any earlier redirect that could introduce a chain. [Cloudflare Bulk Redirect parameters](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/parameters/) describe these flags.

## Required verification after activation

GET and HEAD requests to `/services/mercedes-repair-dubai`, its trailing-slash form, `/best-mercedes-workshop-dubai` and `/services/mercedes-service-dubai` must return 301 or 308 directly to `/brands/mercedes-benz-service-dubai`.

`/brands/mercedes-benz-service-dubai/suspension-repair` must redirect directly to `/services/mercedes-suspension-repair-dubai`. Include marketing parameters and check they reach the destination unchanged. Canonical destinations must return 200 with their own title, H1, canonical and updated content. Check representative unaffected URLs to confirm the origin still handles them.

The production pipeline runs routing tests, all-page SEO/sitemap validation and existing paint-care regression checks. Local tests prove the prepared rules, not their activation on the domain.

## Rollback

Detach only the scoped Worker routes or disable only the dedicated Bulk Redirect rule to restore prior HTTP handling. Content rollback uses the preceding verified source commit and the same Lovable publication flow.

## Content boundaries

The release does not create an audio-upgrade page or invent repair records, prices, reviews or qualifications. Four older Arabic model templates are excluded from indexing and alternate-language declarations until actual model translations exist; model language navigation leads explicitly to the Arabic Mercedes service hub. The Arabic hub itself remains indexable with reciprocal language links.

Model corrections were checked against [Mercedes-Benz C-Class body styles and optional W205 AIRMATIC](https://media.mercedes-benz.com/article/ced8c5a0-ceee-4901-97d2-e5b1ed70fd7f), [E-Class coupe/cabriolet history](https://media.mercedes-benz.fr/nouvelles-mercedes-benz-classe-e-coupe-et-cabriolet/) and [S-Class S63/S65 coupe/cabriolet coverage](https://media.mercedes-benz.pt/os-novos-classe-s-coupe-e-classe-s-cabriolet/). Vehicle-specific workshop capability is still confirmed separately.
