# B3 BMW regression report

Checked locally on 28 September 2026 against the preserved pre-B3 working tree. B3 remains uncommitted and has not been pushed or deployed.

| Check | Result | Evidence / limit |
| --- | --- | --- |
| B0-A routing | PASS | Routing test: 1,247 valid paths, 37 negative cases, 94 localized fallbacks, 99 Mercedes aliases, 253 legacy paths and six origin cases. Protected routing collections and 404 content are unchanged. |
| B1 Mercedes | PASS | Every Mercedes-path SEO object, visible content, links and image attributes matches the pre-B3 snapshot. Zero rendered content regression. |
| B2 Porsche | PASS | Every Porsche-path SEO object, visible content, links and image attributes matches the pre-B3 snapshot. A shared best-workshop component was constrained so the Porsche page's link text remains exactly as before. Zero rendered content regression. |
| Route availability / redirects | PASS | 1,247 routes before and after; zero path, redirect or locale-policy changes. No BMW URL added. `/best-bmw-workshop-dubai` was not redirected, deleted, merged or canonicalized to the hub. |
| Canonical / robots | PASS | Zero canonical, noindex or robots-policy changes across all routes. |
| Hreflang / Arabic | PASS | 128 rendered BMW hreflang links checked with no invalid destination. Existing Arabic BMW paths retained; no artificial language counterpart created. |
| Sitemap | PASS | 996 canonical indexable URLs; membership retained. Lastmod updated for 21 changed BMW routes. |
| TypeScript / production build | PASS | `npm.cmd run typecheck` and `npm.cmd run build` passed. Existing hosting, SEO, route, query, contact, oil, suspension, transmission, protection and social validators passed. The exact BMW diagnostics title and oil/suspension lastmod expectations were updated without disabling validators. |
| B0-A generated routing data | PASS with expected asset refresh | `cloudflare/routing-response-data.js` regenerated client/CSS references; the routing collections and 404 content remained unchanged under `outputs/b1/verify-generated.mjs`. |
| BMW rendered links / crawl | PASS | 813 internal links checked: zero broken, redirecting or missing-fragment links; zero orphan BMW pages; maximum same-locale crawl depth four. |
| FAQ / schema | PASS | All 167 emitted BMW FAQ question/answer pairs match server-rendered visible copy. Zero schema issues; no Review, AggregateRating or Offer nodes fabricated. |
| Initial HTML | PASS | All 45 BMW-path pages have required initial metadata, one H1, substantive body and expected structured data; zero recorded initial-HTML failures. |
| Browser / mobile | PASS | 20 representative routes × desktop/mobile = 40 checks, eight FAQ interactions, two hub-to-diagnostics journeys and six no-JavaScript checks passed in local production preview. No sampled overflow, visible broken image, runtime or hydration error. |
| Ownership / keyword coverage | PASS | 45 BMW URLs reviewed; 21 rendered pages changed; zero new. 490 normalized terms reviewed, with 20 intentionally untargeted, zero classified gaps and zero unresolved editorial primary-owner conflicts. |

Machine-readable evidence: [final-audit-summary.json](outputs/b3/final-audit-summary.json), [browser verification](outputs/b3/browser/verification.json), [build log](outputs/b3/build.log) and [keyword owner records](outputs/b3/bmw-keyword-owner-records.csv). These are local and rendered checks. They do not measure post-release ranking, traffic, conversion or live-site behavior.
