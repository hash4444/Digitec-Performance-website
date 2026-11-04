# DIGI-TEC AI discovery implementation — 4 November 2026

## Scope and publication status

Implemented in the existing website source, preserving the preceding Mercedes,
tuning, Range Rover and Defender work. No new public routes, fabricated cases,
technicians, credentials, reviews, measured power figures or business profiles
were added. Existing package specifications, EUR prices and FAQ data remain.

The local build is not proof of deployment. The connected Lovable `get_project`
request for the documented production project returned an internal error. No
production publish action has been run. The local `dist` includes the existing
working copy as well as this change; follow the current release workflow in
[mercedes-release-deployment.md](mercedes-release-deployment.md). The Sites
mirror in `.openai/hosting.json` is not the custom-domain production project.

## Website improvements

- Mercedes articles and both language versions of the repair hub now lead to
  the relevant diagnostic, symptom or performance-planning owners. Arabic
  links use existing Arabic pages rather than nonexistent translated models.
- The Mercedes problems hub links repair, diagnosis, maintenance and tuning.
  Symptom guides identify their organizational publisher and link directly to
  Mercedes diagnostics as well as the relevant repair service.
- All nine tuning model pages include readable package provenance, pre-tuning
  fault assessment and measurement criteria. AMG pages link back to Mercedes
  diagnosis and repair. Existing project photos/video are linked with limits
  on what those records establish. Interactive figures are labelled as package
  references. Arabic navigation retains the existing `/ar/tuning` fallback.
- Blog bylines link to the publisher. English and Arabic About pages explain
  guidance, case-study evidence, performance figures, attribution and how to
  request a correction. Article and organization schema reference that visible
  policy; no named technical review is implied without supporting records.
- Real Mercedes repair cases will automatically surface on their linked
  service, model, article and problem owners, plus the repair/problems hubs.
  They stay absent while the approved collection is empty.
- Case publication requires explicit workshop-record, original-media and
  publication approvals, documented findings/work/result, real dates and
  captioned images. Build checks reject incomplete records, missing shipped
  media and invalid related owners. A named reviewer is optional and appears
  in visible content and matching schema only when actually supplied.
- Search, Gemini-grounding and existing training preferences are explicit in
  `robots.txt`. These preserve the previous broad permissions rather than
  claiming to fix an observed production crawler block.
- The supplemental `llms.txt` directory contains 45 canonical links. It is
  maintained for systems that may use it; it is not a Google ranking mechanism.
- AI referral attribution now accepts exact known host-style UTM sources such
  as `gemini.google.com` and `perplexity.ai`, consistently in the initial
  analytics bootstrap and later contact events. Unknown sources, private
  query strings and lookalike domains remain excluded.

## Verification and repeatable commands

Run `npm run build:release:local` for the declared production pipeline. The
build now also runs `validate-ai-discovery.mjs` and
`validate-mercedes-evidence.mjs`. It fingerprints the source to detect changes
during the build. The final result is in `release-qa.local/build-results.json`.

Additional checks:

```powershell
npm run typecheck
node scripts/validate-tuning-models.mjs
node scripts/test-tuning-models-browser.mjs outputs/ai-visibility-2026-11-04/tuning-browser 5224
node outputs/ai-visibility-2026-11-04/verify-pages.mjs
```

The discovery check covers canonical/indexable sitemap owners, readable HTML,
snippet restrictions, JSON-LD and robots matching. The case gate is exercised
with synthetic in-memory fixtures which never become website content.

Final verification passed: all 21 production steps (1,256 routes and 1,005
sitemap owners), both TypeScript projects, scoped lint, 46 discovery pages,
35 case-evidence checks, nine tuning-model validators, 18 tuning viewport
cases with 104 stage selections and nine JavaScript-disabled pages, and 18
English/Arabic content browser cases. The browser runs reported no runtime
errors or local failed responses. Mobile screenshots were inspected. A
language-menu regression found during testing was corrected before the final
build; the passing reports describe the corrected state.

The read-only production baseline in
`outputs/ai-visibility-2026-11-04/production-before/http-discovery.json` passed
24 page probes plus robots, sitemap and supplemental-directory requests. This
is the live site before this release. Copied crawler user agents do not prove
access from real crawler IP addresses, indexing or actual AI recommendations.

After publication:

```powershell
node scripts/check-ai-discovery.mjs --out=outputs/ai-visibility-2026-11-04/production-after
```

Confirm the newly visible policy/resource sections and crawler file contents
as well as HTTP checks, since an old release can also pass general access
checks. Verify genuine crawlers separately in CDN/server logs. The earlier
`http-fixture` result records a restricted local-network test environment, not
a production failure.

## Required owner material and external follow-through

Use [mercedes-case-study-intake.txt](mercedes-case-study-intake.txt) for each
actual repair or tuning project. Rough notes and original files are enough;
the template records vehicle, complaint, diagnosis, repair, outcome, media,
reviewer and publication permission. For a tuning result, add fuel, hardware,
calibration and actual before/after measurements with their method/conditions.
Do not provide a customer identity or full VIN for the public article.

Real reviewer biographies, qualifications and the exact official business
profile URL are still needed before adding those claims or identity links.
Current website ratings were not refreshed without verification of the live
Google Business Profile.

Outside the website: correct the EasyUAE location discrepancy after confirming
the business address, maintain the verified Google Business Profile and genuine
reviews, submit the released sitemap in webmaster tools, verify GA4 delivery,
and establish an actual ChatGPT/Gemini query baseline. These have not been
represented as completed by repository changes.

## Official references

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots)
- [Google crawler and Google-Extended controls](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers)
- [Google generative-AI Search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Gemini source links](https://support.google.com/gemini/answer/14143489?hl=en)
- [Schema.org publishingPrinciples](https://schema.org/publishingPrinciples)
