# B0-A browser verification

Observed with the Codex in-app browser on 28 September 2026. These observations complement the HTTP records; they are not substitutes for HTTP status checks.

## Before (live site)

| Requested path | Browser state after scripts loaded |
| --- | --- |
| `/` | English homepage, self-canonical, lang en. |
| `/ar/` | Arabic homepage at `/ar`, Arabic self-canonical, lang ar. |
| `/brands/porsche-service-dubai` | Correct English Porsche hub and canonical. |
| `/ar/brands/porsche-service-dubai` | Correct Arabic Porsche hub and canonical. |
| `/ar/porsche/systems/pdk` | Client navigated to `/ar/brands/porsche-service-dubai`. |
| `/ar/porsche/problems/pasm-fault` | Client navigated to `/ar/brands/porsche-service-dubai`. |
| `/ar/porsche/guides/service-intervals-uae` | Client navigated to `/ar/brands/porsche-service-dubai`. |
| `/ar/mercedes/problems` | Client navigated to `/ar/brands/mercedes-benz-service-dubai`. |
| `/seo-audit-nonexistent-20260928` | H1 404; title “Page Not Found \| DIGI-TEC Performance Center”; noindex, follow; canonical absent; lang en. |
| `/services/this-page-does-not-exist-20260928` | Initially homepage; then H1 “Service Not Found”, title “Service Not Found \| DIGI-TEC”, noindex, follow, canonical absent; lang en. |
| `/ar/this-page-does-not-exist-20260928` | H1 404; Arabic not-found title, noindex, follow, canonical absent, but HTML lang remained en. |
| `/porsche/911` | Initially homepage; eventually client navigated to English Porsche hub. It is absent from the public route manifest. |

The nested service case required observing the lazy component after the initial document: waiting specifically for an H1 of “404” did not match its old “Service Not Found” UI. The initial and final states must not be conflated. Hydration mismatch errors were observed on that live homepage-fallback response.

## After (local production-entry preview)

Base: `http://127.0.0.1:5191`. The canonical URLs remain the production URLs by design.

- The four valid examples retain their correct language, title, H1 and canonical.
- The four Arabic fallback examples reach their existing Arabic hubs. Actual local HTTP records confirm one 308 then 200.
- The root fake, nested service fake, Arabic fake and `/porsche/911` retain H1 404, noindex, no canonical and zero JSON-LD scripts. Their URL is not replaced by a homepage/hub.
- An additional invented Arabic system slug `/ar/porsche/systems/b0a-missing-9-20260928` also remains an Arabic 404.
- On `/porsche/systems/pdk`, opening “Language selection” exposed an Arabic link whose href is exactly `/ar/brands/porsche-service-dubai`. Clicking it reached that Arabic hub.
- After the final build and preview restart, `/ar/this-page-does-not-exist-20260928` displayed the Arabic 404 copy and real links to `/ar` and `/ar/services`. Clicking “الخدمات” reached the Arabic services page successfully.

Local page was refreshed after the final build. No forms were submitted and no external state was changed.
