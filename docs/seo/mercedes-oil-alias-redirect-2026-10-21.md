# Mercedes oil alias redirect — activated 21 October 2026

The two legacy Mercedes oil URLs returned homepage HTML with HTTP 200 because the active Cloudflare redirects did not cover them. The generated `_redirects` and `_worker.js` files were served as Lovable assets. One exact Cloudflare Single Redirect now sends these requests directly to the existing commercial service with HTTP 308 and preserves the original query string.

## Active rule

- Rule ID: `5addb0c068414fb5b985a869ded26c68`.
- Reviewed definition: [single redirect JSON](../../cloudflare/single-redirects/mercedes-oil-alias-2026-10-21.json).
- Sources: `/brands/mercedes-benz-service-dubai/oil-change` and its trailing-slash form.
- Hosts: `digitecme.com` and `www.digitecme.com`; methods: GET and HEAD.
- Static destination: `https://digitecme.com/services/mercedes-oil-change-dubai`.
- Status: 308; preserve query string: enabled.
- Position: first, before the existing Mercedes repair rule `dbe42693423442afbc3bab9b993242a7` and www rule `9781b1ef743f4ffbaadbe5cb3250eeca`. Both existing definitions and their relative order were retained.

Deployment used the authenticated Cloudflare **Create new Single Redirect** form. Submission was at **10:40:17 UAE**, with the active rule confirmed at **10:40:42 UAE** on 21 October. This Git record versions the reviewed definition and observed activation; it does not apply the rule or replace the live ruleset.

## Hosting and canonical boundary

At activation, apex and www were proxied CNAMEs to `dubai-performance-art.lovable.app`. There were no configured zone Worker routes, Page Rules or Bulk Redirect Lists. The active Lovable project was `b8255283-fdd9-4c2d-8b46-ccb596f695e1`; the Sites mirror is a separate destination. Always Use HTTPS remained enabled.

Both `/services/mercedes-oil-change-dubai` and `/services/mercedes-oil-change-dubai/` remain directly accessible with HTTP 200. The existing slashless HTML canonical, sitemap and internal-link preference are unchanged. Google previously selected the slash URL as canonical; this activation did not force that indexed page to move. Canonical convergence and ranking impact require later Google evidence.

No Worker, Lovable publication, DNS, page content, metadata, sitemap or indexing request was part of this activation. The earlier investigation's Worker proposal, including service-slash normalization, was not deployed.

## Validation

The mandatory preflight passed 28 public GET/HEAD cases and refreshed the authenticated zone, DNS and existing rule definitions/order without unexpected drift. The create-one-rule form matched the approved definition and reported successful rule validation before activation.

Live verification completed at **10:40:54 UAE** with **72/72 passing cases**:

- 48 legacy cases covered both exact paths, both hosts, HTTP/HTTPS, GET/HEAD and three query conditions. Every request returned one direct 308 to the exact target with its original query, followed by the correct service page with 200. No loops or extra hops occurred.
- 16 protected route checks covered both service forms, general oil, the oil article, Mercedes hub, diagnostics, PPF and tuning. Status, title, H1, canonical, robots and normalized main-content hashes matched fresh preflight.
- Eight checks confirmed the four existing Mercedes repair/workshop aliases retained 301 redirects to the brand hub with query preservation.

The local proposal had also passed 1,658 routing assertions and 12 relevant SEO/routing checks. At activation, all 601 protected source files and the generated service HTML hash were unchanged. Independent comparison confirmed exactly three active rules with the new rule first and the original two IDs/definitions retained.

The [verification record](mercedes-oil-alias-verification-2026-10-21.json) contains timestamps, counts and hashes. Full HTTP responses, screenshots and authenticated snapshots are retained locally under `outputs/mercedes-oil-activation-2026-10-21/`; raw GSC and authenticated account material are excluded from this Git record. These results describe the observed activation window, not continuous monitoring or ranking recovery.

## Future changes and rollback

Refresh the actual zone and all three rule IDs/definitions/order before any later change. Use an add/update-one-rule operation against the verified current state; never replace a ruleset with this single-rule JSON. The recorded `position.before` describes the approved creation order, not a command to recreate an already active rule.

No rollback was needed or performed. The user's activation instruction requires fresh approval before any rollback. If a later verification fails, stop and report it; after approval, disable only rule `5addb0c068414fb5b985a869ded26c68`, retaining the two original rules and their relative order. No DNS, Worker or content rollback is required for this rule. Previously cached permanent redirects may persist in clients after the server rule is disabled.
