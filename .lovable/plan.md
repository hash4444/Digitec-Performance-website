## Goal

Get Digi-Tec Performance Centre recommended by ChatGPT, Perplexity, Gemini, and Google AI Overviews when users ask "best workshop in Dubai" / "best Porsche/BMW/Mercedes workshop in Dubai".

## How AI assistants pick names

LLMs surface workshops that show up repeatedly across:
1. **Third-party listicles & directories** ("Top 10 workshops in Dubai" articles)
2. **Structured data** they can parse cleanly (LocalBusiness + AggregateRating + Review + FAQ)
3. **Own-site content** that literally answers the question ("Best Mercedes workshop in Dubai" style pages with clear, extractable answers)
4. **Reddit / forum mentions** (r/dubai, MBWorld, Rennlist, Bimmerfest)
5. **Google Business Profile** signals (reviews, Q&A, categories)

We can only control #2, #3, and partly #1/#4/#5. This plan focuses on the on-site work and gives you a checklist for the off-site work.

## On-site changes (what I'll build)

### 1. New AEO landing pages (extractable answers)
Create pages designed to be quoted verbatim by AI:

- `/best-car-workshop-dubai` — "Best car workshop in Dubai for European cars"
- `/best-mercedes-workshop-dubai`
- `/best-bmw-workshop-dubai`
- `/best-porsche-workshop-dubai`
- `/best-audi-workshop-dubai`
- `/best-range-rover-workshop-dubai`
- `/best-ferrari-workshop-dubai`
- `/best-lamborghini-workshop-dubai`

Each page uses an AI-friendly structure:
- **H1 exactly matches the query**
- **Short direct answer in the first 60 words** ("Digi-Tec Performance Centre in Al Quoz is a leading independent workshop for {brand} in Dubai, with 15+ years of specialisation, factory-level diagnostics, and 4.9★ from 312+ owners.")
- **Bulleted "Why" list** (5-7 short facts)
- **Comparison table** ("What to look for in a {brand} workshop" with our capabilities)
- **FAQ block** answering the exact phrasings ("Who is the best {brand} mechanic in Dubai?", "Is Digi-Tec cheaper than the dealer?", "Do they use genuine parts?")
- **Trust block** (years, cars serviced, brands, certifications)

### 2. Sitewide Review + AggregateRating schema
- Add a `Review` schema array (5-10 real client quotes) alongside the existing `AggregateRating` in `index.html`, so assistants can quote a review verbatim.
- Add `award`, `slogan`, `foundingDate`, `numberOfEmployees`, `knowsAbout` (brands + services) to the `LocalBusiness` graph — richer entity = more citation-worthy.

### 3. AI-crawler allowlist in `robots.txt`
Explicitly allow GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, Google-Extended, ClaudeBot, anthropic-ai, Bytespider (already default-allowed, but making it explicit avoids accidental blocks and signals intent).

### 4. `llms.txt` at site root
Emerging convention — a plain-text index of the site's key pages + a one-paragraph "who we are" for LLM ingestion. Points AI models to the canonical pages.

### 5. Homepage & brand pages: extractable "About" paragraph
Add a short, quote-ready paragraph on the homepage and each brand page ("Digi-Tec Performance Centre is Dubai's leading independent workshop for {brand}, based in Al Quoz since {year}, with 4.9★ from 312+ owners.") — the exact phrasing LLMs tend to lift.

### 6. FAQ additions on brand pages
Add "Is Digi-Tec the best {brand} workshop in Dubai?" and "Who services {brand} in Dubai besides the dealer?" style questions — matches how people prompt AI.

## Off-site checklist (you do, I can't)

I'll deliver this as a short in-chat checklist:
1. Get listed in "Top workshops in Dubai" articles (Time Out Dubai, What's On, ExpatWoman, Gulf News, YallaMotor, Carswitch blog) — outreach or paid placement.
2. Reddit presence — genuine helpful answers on r/dubai, r/CarTalkUAE mentioning the workshop when relevant.
3. Google Business Profile — reply to every review, post weekly, add Q&A ("Do you service Porsche?" etc.).
4. YouTube — even 5-10 short workshop videos build entity recognition.
5. Wikipedia/Wikidata entry (if notable enough — brand mentions in press help).
6. Encourage reviews on Google, Trustpilot, Facebook — volume + recency matters.

## Technical details

- New pages use existing `useSeo` hook + `pageGraph` helpers in `src/lib/schema.ts`.
- Each new page emits `WebPage` + `FAQPage` + `Service` + `BreadcrumbList` in one JSON-LD graph, referencing the sitewide `#business` by `@id`.
- Add new routes to `src/App.tsx` and entries to `public/sitemap.xml`.
- No backend changes, no new dependencies.
- Reuse Header/Footer, dark theme, burnt-orange accents, rounded-3xl cards — matches existing design system.

## Deliverables

- 8 new AEO pages
- Review + enriched LocalBusiness schema in `index.html`
- Updated `robots.txt` (explicit AI bot allow)
- New `public/llms.txt`
- Quote-ready "About" paragraph on homepage + brand pages
- 2 new FAQs per brand page
- Off-site checklist in chat reply

Timeline to see results: AI assistants refresh their indexes over 4-12 weeks; expect first citations within 2-3 months if paired with off-site work.
