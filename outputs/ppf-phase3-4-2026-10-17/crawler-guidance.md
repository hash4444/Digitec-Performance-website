# PPF crawler controls and AI discovery

Reviewed 17 October 2026. The existing public robots file already allows public service/article crawling and explicitly allows OpenAI agents. No crawler directive, security restriction, private endpoint or CDN rule was changed.

| Control | Current official meaning | Action for this release |
|---|---|---|
| OAI-SearchBot | OpenAI search crawling; separate from training control. | Existing allow retained. Search inclusion and citations remain unverified. |
| GPTBot | OpenAI training crawler, independently configurable from search. | Existing policy retained; training permission is an owner policy decision, not a prerequisite for search inclusion. |
| ChatGPT-User | User-initiated retrieval; not the agent determining search eligibility. | Existing group retained. Do not equate a user fetch with indexing or a citation. |
| Googlebot | Google Search crawling, including AI Overviews and AI Mode. | Normal indexability and useful crawlable content retained. No special AI schema or AI text file added. |
| Google-Extended | Controls specified Gemini/Vertex training and grounding uses; does not control Search inclusion or ranking. | No policy change. Keep separate from Googlebot and Google Search observations. |

The OpenAI agent distinctions and independent search/training controls are described in [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots). Google's [AI features guidance](https://developers.google.com/search/docs/appearance/ai-features) applies established SEO practices to Search AI features and requires no special schema or AI text file. Google's [common crawler documentation](https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers) separately explains Google-Extended's scope, including grounding. These official pages were checked on the review date; the crawler page was updated on 15 October 2026.

Robots permission, initial HTML, canonical/hreflang and sitemap checks establish technical readiness within their scope. They do not prove a crawler visited, a page was indexed, an AI answer used it, or a user became a customer. User-agent strings alone are not authenticated bot identities. No CDN/WAF logs, verified crawler IP traffic or Search Console selected-canonical evidence was available. Preserve current endpoint exclusions and verify real requests through authorized account evidence before diagnosing a crawler-specific block.

See [crawlability and entity audit](crawlability-entity-audit.md) for the eight public owners and final local-build comparison. Live alias/invalid-path failures still require the separate production routing release work; a permissive robots file cannot repair those responses.
