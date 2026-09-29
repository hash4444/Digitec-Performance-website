# B2 Porsche regression report

Checked locally on 28 September 2026 against the preserved pre-B2 working-tree snapshot. B2 is uncommitted and has not been pushed or deployed.

| Check | Result | Evidence / qualification |
| --- | --- | --- |
| B0-A preservation | PASS | Routing response test passed: 1,247 valid routes, 37 negative cases, 94 Arabic fallbacks, 99 Mercedes aliases, 253 legacy paths and 6 origin cases. Protected B0-A routing collections and 404 content are unchanged. |
| B1 Mercedes preservation | PASS | All Mercedes-path visible content, links, image attributes and SEO objects match the pre-B2 baseline. Two hub HTML hashes changed only because transient Radix IDs were regenerated. No Mercedes content regression was found. |
| Route comparison | PASS | 1,247 routes before and after; zero availability, redirect or path-policy changes. No new Porsche URL. `/best-porsche-workshop-dubai` remains in place with its prior policy. |
| Canonical / robots comparison | PASS | Zero canonical, noindex or robots-policy changes across routes. |
| Hreflang / language comparison | PASS | Zero language-availability changes; 242 rendered hreflang links checked without a mismatch. Existing Arabic Porsche routes were retained; no artificial equivalents were created. |
| Sitemap comparison | PASS | 996 indexable sitemap URLs; membership and route policy unchanged. Lastmod was updated for the 34 substantively changed Porsche URLs. |
| TypeScript and production build | PASS | `npm.cmd run typecheck` and `npm.cmd run build` passed. Existing SEO, route, query, B0-A, hosting and service validators ran in the production build. Porsche expected-title and lastmod assertions were updated to the actual B2 copy, without disabling checks. |
| Generated routing data | PASS with expected asset refresh | `cloudflare/routing-response-data.js` changed only for generated client/CSS references. `node outputs/b1/verify-generated.mjs` confirmed the protected routing collections and 404 content were unchanged. |
| Porsche links and crawl | PASS | 1,412 rendered internal links checked: zero broken, zero redirecting, zero missing fragments; zero orphan Porsche pages; maximum locale-specific crawl depth 3. |
| Structured data | PASS | 114 emitted FAQ question/answer pairs match visible initial HTML; zero schema issues. No fabricated Review, AggregateRating or Offer nodes. |
| Initial HTML / no JavaScript | PASS | Representative pages include title, description, canonical, robots, H1, substantive copy and key internal links in server-rendered HTML. No initial-HTML failures. |
| Desktop / mobile | PASS | 23 representative routes × two viewports = 46 checks, plus eight FAQ interactions and two navigation journeys. No overflow, broken image, runtime or hydration issue was observed in the tested set. |
| Porsche content and policy | PASS | 101 Porsche URLs reviewed; 34 changed; zero new. No free-diagnostic claim, unresolved primary-owner conflict or classified keyword gap. |

The machine-readable audit is [final-audit-summary.json](outputs/b2/final-audit-summary.json), the visual/browser result is [verification.json](outputs/b2/browser/verification.json), and the local build logs are [typecheck.log](outputs/b2/typecheck.log) and [build.log](outputs/b2/build.log). The [B2 change manifest](outputs/b2/b2-change-manifest.json) isolates 20 B2 source/generated files from the working tree's pre-existing changes. Browser checks used a local production preview, not the live site. Search performance and live deployment behavior remain unmeasured.
