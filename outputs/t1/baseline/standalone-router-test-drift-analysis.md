# Standalone production router test finding

The baseline failure in `test-production-seo-router.log` is an obsolete request-reference assertion, not evidence of a routing regression. `scripts/test-production-seo-router.mjs:25` requires the exact original Request object for every route, including `/unknown-page` and `/assets/app.js`. `cloudflare/routing-response-guard.js:24` intentionally constructs `new Request(request, { redirect: 'manual' })` for unknown GET/HEAD requests. This preserves origin redirect responses rather than silently following them. A new Request object is required for that redirect policy, so reference equality is the wrong contract for those cases.

The existing alias loop remains correct and should stay unchanged. Valid routes, protected endpoints, unrelated hosts and mutation methods should retain their identity checks. Request URL, query parameters, method and headers must remain identical for the guarded unknown requests, and their forwarded redirect policy must be `manual`.

A read-only diagnostic against the current source router confirmed:

| Request | Origin response | Forwarded Request | Result |
| --- | --- | --- | --- |
| GET `/tuning` | HTML 200 | Original object, redirect follow | 200 |
| GET `/unknown-page` | Plain text 200 | New object, same URL/method/header, redirect manual | 200 preserved |
| GET `/unknown-page` | HTML 200 | New object, same URL/method/header, redirect manual | 404, noindex/follow |
| HEAD `/unknown-page` | HTML 200 | New object, same URL/method/header, redirect manual | 404, empty body, noindex/follow |
| GET `/assets/app.js` | JavaScript 200 | New object, same URL/method/header, redirect manual | Asset 200 preserved |
| GET `/functions/contact` | HTML 200 | Original object, redirect follow | 200 |
| POST `/unknown-page` | HTML 200 | Original object, redirect follow | 200 |

Every diagnostic case called the injected origin exactly once. The test requests included a custom `X-Test: preserve` header and `?a=1&tag=x&tag=y` query to verify actual preservation rather than comparison of empty fixtures.

The passing build validator `scripts/test-hosting-rules.mjs` already checks the bundled hosting worker's true unknown-page 404, assets, functions, permanent redirects, removed URLs and Mercedes alias behavior. Its reference-equality checks apply to the scoped Mercedes router, which forwards unknown paths before the response guard. The two tests currently exercise different contracts; making every production-router request identical would remove the response guard's deliberate manual-fetch behavior and weaken handling of origin redirects.

Recommended narrow update to the standalone test, with no backend changes:

1. In the pass-through loop, identify the guarded pair `/unknown-page` and `/assets/app.js` for GET/HEAD. Require `r !== request`, `r.redirect === 'manual'`, identical URL and method, and identical header entries for those cases. Keep `r === request` for all canonical routes, protected function endpoints and POST cases. Add a nonempty test header to the fixtures.
2. Keep exact origin invocation counts and existing 200 preservation assertions for the non-HTML fixture. Its `new Response('origin')` content type defaults to plain text, so 200 is correct under the guard.
3. Add explicit cases for unknown HTML 200 becoming 404, HEAD returning no body, unknown Arabic HTML using the Arabic 404 response, actual JavaScript/image assets remaining 200, and origin 3xx/5xx remaining unchanged. Assert 404 robots/language headers and exact redirect Location preservation. These verify the intended behavior behind the cloned Request.
4. Preserve unrelated-host and POST identity checks; a POST body fixture can verify the body is forwarded unchanged. If abort handling is checked, verify propagated cancellation rather than requiring signal-object identity, because Request cloning creates a dependent signal.
5. Update the report scope wording to describe response guarding. The current wording says other paths are unchanged, which is false for unknown HTML pages under the existing B0-A guard.

No router, guard or test source file was modified for this investigation. The original failing baseline log remains intact. A later successful run of the corrected standalone test should be recorded separately from the pre-change baseline failure.

## Subsequent test correction

After the investigation, the standalone test was corrected as recommended. The production router and response guard were left unchanged. The revised test preserves request-reference checks for canonical routes, endpoint bypasses, unrelated hosts and mutations; it checks cloned guarded-request URL/method/headers and manual redirect policy, actual asset response preservation, origin 302/307/503 responses, POST-body preservation, and English/Arabic unknown-page 404 responses including empty HEAD bodies.

The revised standalone test passed: 4,848 alias cases, 233 passthrough cases, 13 guarded-request checks, four 404/language/HEAD cases and five asset/origin-response cases. The fresh report is `outputs/t1/validation/scoped-router-tests.json`. `SEO_ROUTER_TEST_OUTPUT_DIR` allows current validation output without overwriting the historical September 16 evidence. The original failing baseline log is preserved as a record of test drift.
