

# Premium SEO Copywriting for All Service Pages

## Overview
Rewrite all 17 service pages with premium SEO copy and restructure the `ServicePage` component to render rich, sectioned content instead of a single paragraph.

## Data Model Change
Expand the `ServiceData` interface to support structured content:

```typescript
export interface ServiceData {
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  seoKeyword: string;           // e.g. "Mercedes Repair Dubai"
  intro: string;                // SEO intro paragraph
  whyImportant: string;         // Why this service matters
  whyChoose: string;            // Why Digi-Tec specifically
  includes: string[];           // Bullet points of what's included
  localIntent: string;          // "If you're searching for..." paragraph
  details: string;              // Keep for backward compat / fallback
}
```

## ServicePage Component Update
Replace the single `<p>{service.details}</p>` with structured sections:

1. **Intro** — H2 + paragraph (naturally includes "[Service] Dubai")
2. **Why It Matters** — H2 + paragraph (performance/safety/longevity angle)
3. **Why Choose Digi-Tec** — H2 + paragraph (German expertise, diagnostics, parts, turnaround)
4. **What's Included** — H2 + styled bullet list
5. **Local Search Intent** — Paragraph with natural "near me" / location copy
6. **CTA block** — WhatsApp booking + visit prompt (fix the broken WhatsApp link to `97143402223`)

## SEO Copy for All 17 Services
Each service gets 300-600 words of premium, human-sounding copy. Tone: trustworthy, high-end, performance-focused. Key rules:
- Natural keyword inclusion ("[Service] Dubai", "near me", "German car specialist Dubai")
- No keyword stuffing
- Mentions Mercedes, BMW, Audi, Porsche where relevant
- Clean, confident, no fluff

### Services to rewrite:
1. Mercedes Repair
2. Mechanical Repair
3. Transmission Services
4. Suspension Repair
5. Steering Repair
6. Brake System Repairs
7. Routine Maintenance
8. Oil Change Service
9. Tire Repair
10. Battery Changes
11. Exhaust Repair
12. Car Programming & Diagnostic
13. Electrical System Repairs
14. Fuel System Repair
15. AC Repair & Maintenance
16. Car Body Repair
17. Car Paint & Protection

## SEO Hook Update
Update `useSeo` in the ServicePage to use the new `seoKeyword` field for better title/description generation.

## Files Changed
- `src/data/services.ts` — Expanded interface + all 17 services rewritten
- `src/pages/ServicePage.tsx` — Structured content sections, fixed WhatsApp link

