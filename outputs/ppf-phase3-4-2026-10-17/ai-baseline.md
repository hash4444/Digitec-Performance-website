# AI discoverability observation baseline

17 October 2026, Asia/Dubai. **No inspectable generated AI answer was obtained. AI mention/citation visibility is therefore unknown.** Public AI access was attempted, and four separate conventional web-retrieval samples were collected. These are different evidence types and are kept separate in [JSON](ai-observations.json) and [CSV](ai-observations.csv).

Six attempted AI-interface/query access checks produced zero inspectable answers. This is an access denominator, not “zero mentions out of six answers.” No AI mention rate, AI citation rate, comprehensive visibility conclusion or ranking claim can be computed. In particular, neither this access result nor absent URLs in a limited conventional sample proves overall invisibility.

## Actual AI access attempts

The computer-use skill, guidance and confirmations were read before UI work. The available Browser Use tool reported `Browser is not available: iab`; its browser/app inventory was empty. No enabled browser surface existed for logged-out or authenticated UI observation. Read-only direct public URLs were then attempted through the web page tool. No account login, paid operation, private AI conversation, CAPTCHA interaction or contact with another person occurred.

| Platform / intended surface | Exact question | Observed access outcome | Mention, website citation, competitors, answer accuracy |
|---|---|---|---|
| Google AI Mode | Where can I get PPF installed in Dubai? | Direct query URL with `udm=50`, `hl=en`, `gl=ae` inaccessible through the tool. | All unknown; no generated answer observed. |
| Google Search / possible AI Overview | Where can I get PPF installed in Dubai? | Direct public search URL with `hl=en`, `gl=ae` inaccessible. | All unknown; no AI Overview UI observed. |
| Google Search / possible AI Overview | Is PPF better than ceramic coating for Dubai driving? | Direct public search URL with `hl=en`, `gl=ae` inaccessible. | All unknown; no AI Overview UI observed. |
| Bing Copilot Search | Where can I get PPF installed in Dubai? | Public Copilot Search query URL inaccessible. | All unknown; no generated answer observed. |
| ChatGPT search | Where can I get PPF installed in Dubai? | Query URL returned a cache miss. Generic public landing page was retrievable, but no response to the question was captured. | All unknown; no verified model/search execution. |
| Gemini | Where can I get PPF installed in Dubai? | Public app extraction displayed Sign in only; query was not entered. | All unknown; no generated answer observed. |

Full attempt URLs, observed tool messages and browser inventory are saved in [AI access evidence](crawlability/ai-access-evidence.json). The observation date is known; exact per-attempt wall-clock time was not instrumented, so the dataset records the date/timezone and a consolidation timestamp instead of fabricating precise times. The query URL settings request English/UAE context; they do not prove a UAE physical location, a personalized Google session or a particular model.

In the dataset, `query_submitted: false` means no confirmed interactive AI-query submission/execution was observed. URL access was attempted. `null` / `unknown` mention, citation and competitor fields mean unobserved, not absent. Generic platform landing text is not treated as an answer to the test question.

## Separate conventional retrieval samples

Four **individual** natural-language web searches were run without domain or recency filtering. The tool returned selected source results rather than a Google UI, Maps ranking, AI Overview, AI Mode answer, ChatGPT answer or Gemini answer. Result order is tool-return order, not a verified Google rank. Provider personalization, physical geolocation and browser history were not available.

| Exact question | DIGI-TEC URL returned in this conventional sample? | Other examples returned; no quality/authorization claim endorsed |
|---|---|---|
| Where can I get PPF installed in Dubai? | No, among 27 returned source URLs. | [PPF Dubai](https://ppfdubai.ae/dubai), [Pentagon Performance](https://www.pentagonauto.ae/), [Smart Auto UAE](https://www.smartautouae.ae/services/paint-protection-film-dubai-sharjah). |
| Who installs paint protection film in Al Quoz? | No, among 33 returned source URLs. | [Approved Detailing](https://approveddetailing.ae/), [Gloss Boss](https://glossbossgulf.com/), [TRUE KÖNCEPT](https://truekoncept.com/services/). |
| What affects the cost of full-body PPF in Dubai? | No, among 27 returned source URLs. | [ZGuard cost guide](https://zguard.ae/blog-ppf-cost-dubai), [Detailing Dynamics guide](https://dd-uae.com/blog/ppf-cost-dubai-price-guide), [PPF Dubai guide](https://ppfdubai.ae/ppf-cost-dubai). |
| Is PPF better than ceramic coating for Dubai driving? | **Yes:** the existing [DIGI-TEC comparison URL](https://digitecme.com/blog/ceramic-coating-vs-ppf-dubai), among 26 returned URLs. | [WRP comparison](https://wrpdetailing.ae/blog/ppf-vs-ceramic-coating/), [Easy Auto comparison](https://easyauto.ae/guides/ppf-vs-ceramic-coating), [Peeyesyem guide](https://peeyesyemautodetailing.com/guides/ppf-vs-ceramic-coating-dubai/). |

The DIGI-TEC retrieval result used the title “Ceramic Coating vs PPF Dubai | Which Protection Is Right?”; fresh public HTML uses “Ceramic Coating vs PPF: Dubai Owner’s Guide | DIGI-TEC”. Its retrieved snippet also differs from the current page. This is a cached/retrieval representation discrepancy to monitor, not evidence that an AI system made an inaccurate recommendation. No snippet-derived product promise, price or supplier claim was added to website copy.

The other provider names above are **conventional source examples**. AI competitor-mention fields remain unknown. Their marketing claims, certifications, reviews, pricing and installation quality were not validated by this baseline and are not recommendations. All returned source URLs are recorded in the dataset; a preceding multi-query exploratory retrieval was excluded from the four-row benchmark because it merged query results.

## What this baseline supports

- The comparison owner can be returned for a relevant natural-language conventional retrieval question. It remains an appropriate comparison owner; this is not a reason to create a duplicate question page.
- Fresh public canonical PPF/hub/comparison content is crawlable and describes identity, location, film/coating distinctions and enquiries. The [crawlability/entity audit](crawlability-entity-audit.md) records the actual technical evidence and publication gaps.
- The earlier production release dependency persists: local form/entity improvements are not established as published, and live aliases return homepage 200 responses. Improving local copy cannot by itself resolve remote Worker activation.
- No evidence here establishes an AI recommendation, an AI referral, a qualified lead, an installation, revenue or a ranking improvement.

## Repeatable next observation session

Use an enabled ordinary browser with an explicitly documented session. Keep English/UAE settings, location handling, logged-in/out state, search mode/model, device/viewport and personalization state consistent. Do not claim a fixed Dubai location merely because the query contains Dubai or `gl=ae` was requested. Do not grant location permission or sign into a different account silently.

For each exact question, capture the actual generated answer or the platform's observed “no AI answer” state, the date/time and configuration, visible DIGI-TEC mention, actual citation link/hostname, named alternatives, and accuracy against current verified business records. Retain a screenshot/export or an accessible public result URL where permitted. Open citation links to verify destinations. If a platform is inaccessible, record access failure separately and exclude it from mention/citation denominators.

Repeat a stable panel once per monthly audit and record controlled reruns separately; do not keep refreshing until the desired answer appears. Preserve previous observations. Use the same commercial, installer-choice, cost, comparison, aftercare and limitation questions assigned to existing page owners in the combined Phase 3–4 query map. A later result can be compared only with observations made under comparable conditions.

No monitoring automation or monthly scheduled job was created. Account-level referral and enquiry attribution requires verified analytics/CRM data. An AI mention or website citation is not a lead; the existing draft/click events remain distinct from received enquiries and paid installations.
