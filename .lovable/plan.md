
## Goal
Add unique SEO metadata (title, description, JSON-LD where helpful) to every service page and the Tuning page. Confirm H1 includes "Dubai".

## Scope: 18 pages
All 17 services in `src/data/services.ts` (rendered by `src/pages/ServicePage.tsx`) + `src/pages/Tuning.tsx` (already done last turn, will verify).

Service slugs covered:
mercedes-repair, mechanical-repair, transmission-services, suspension-repair, steering-repair, brake-system-repairs, routine-maintenance, oil-change-service, tire-repair, battery-changes, exhaust-repair, car-programming-diagnostic, electrical-system-repairs, fuel-system-repair, ac-repair-maintenance, car-body-repair, car-paint-protection.

## Approach

**1. Extend `ServiceData` interface in `src/data/services.ts`**
Add two optional fields:
- `metaTitle?: string` (≤60 chars)
- `metaDescription?: string` (≤155 chars)

Populate both for ALL 17 services with unique, keyword-rich values following the format:
`[Service Name] Dubai | Digitec Performance Center`

**2. Update `src/pages/ServicePage.tsx`**
Replace the current `useSeo` call to use `service.metaTitle` and `service.metaDescription` when present (fallback to current logic). Also pass a `Service` JSON-LD schema (provider = Digitec, areaServed Dubai/UAE) so each service page gets structured data — this significantly helps Google rank these pages for "[service] Dubai" queries.

**3. Verify H1 includes "Dubai"**
Every `title` field in services already ends with "in Dubai" (verified mercedes-repair, mechanical-repair). I'll audit all 17 during implementation and append "in Dubai" to any that lack it.

**4. Tuning page**
Already updated last turn with keyword-rich metadata + JSON-LD. Will verify title is ≤60 chars and trim if needed (current title is 71 chars — needs shortening to: `GAD Tuning Dubai | Digitec Performance Center` = 46 chars).

## Sample Meta Titles & Descriptions (all unique)

| Slug | Meta Title | Meta Description |
|---|---|---|
| mercedes-repair | Mercedes Repair Dubai \| Digitec Performance Center | Expert Mercedes-Benz repair in Dubai by Digitec. Star Diagnostic, OEM parts, AMG specialists. Dealer quality, faster turnaround. |
| mechanical-repair | Mechanical Repair Dubai \| Digitec Performance Center | Professional mechanical repair in Dubai by Digitec. Engine, drivetrain, and complex fault diagnostics for luxury and German cars. |
| transmission-services | Transmission Repair Dubai \| Digitec Performance Center | Expert transmission service and repair in Dubai by Digitec. Gearbox rebuilds, fluid flush, and DCT specialists for German cars. |
| suspension-repair | Suspension Repair Dubai \| Digitec Performance Center | Precision suspension repair in Dubai by Digitec. Air suspension, shocks, and ride height fixes for luxury and performance cars. |
| steering-repair | Steering Repair Dubai \| Digitec Performance Center | Professional steering repair in Dubai by Digitec. Power steering, rack, and alignment specialists for German and luxury vehicles. |
| brake-system-repairs | Brake Repair Dubai \| Digitec Performance Center | Expert brake repair in Dubai by Digitec. Pads, rotors, calipers, and performance brake upgrades for luxury and German cars. |
| routine-maintenance | Car Service Dubai \| Digitec Performance Center | Routine car maintenance in Dubai by Digitec. Scheduled servicing, fluids, and inspections for luxury and German vehicles. |
| oil-change-service | Oil Change Dubai \| Digitec Performance Center | Professional oil change in Dubai by Digitec. Fast service using premium OEM-approved oils for maximum engine performance. |
| tire-repair | Tire Repair Dubai \| Digitec Performance Center | Fast tire repair in Dubai by Digitec. Puncture repair, tire replacement, and wheel alignment with premium brands. |
| battery-changes | Car Battery Replacement Dubai \| Digitec Performance | Fast car battery replacement in Dubai by Digitec. Same-day service with premium OEM-approved batteries for all makes. |
| exhaust-repair | Exhaust Repair Dubai \| Digitec Performance Center | Expert exhaust repair in Dubai by Digitec. Catalytic converters, mufflers, and performance exhaust for luxury cars. |
| car-programming-diagnostic | Car Diagnostics Dubai \| Digitec Performance Center | Advanced car diagnostics and ECU programming in Dubai by Digitec. Star Diagnostic, fault scanning, and coding specialists. |
| electrical-system-repairs | Auto Electrical Repair Dubai \| Digitec Performance | Expert auto electrical repair in Dubai by Digitec. Wiring, sensors, and ECU fault tracing for luxury and German cars. |
| fuel-system-repair | Fuel System Repair Dubai \| Digitec Performance Center | Professional fuel system repair in Dubai by Digitec. Injectors, pumps, and fuel rail service for performance vehicles. |
| ac-repair-maintenance | Car AC Repair Dubai \| Digitec Performance Center | Expert car AC repair in Dubai by Digitec. Gas refill, compressor, and cooling system service for luxury vehicles. |
| car-body-repair | Car Body Repair Dubai \| Digitec Performance Center | Professional car body repair in Dubai by Digitec. Dent repair, panel work, and accident damage for luxury and German cars. |
| car-paint-protection | Paint Protection Dubai \| Digitec Performance Center | Premium paint protection film (PPF) and ceramic coating in Dubai by Digitec. Long-lasting shine and protection. |
| /tuning (Tuning.tsx) | GAD Tuning Dubai \| Digitec Performance Center | GAD Motors tuning in Dubai by Digitec. Official GAD partner offering ECU tuning, turbo kits, and AMG performance upgrades. |

All titles ≤60 chars, all descriptions ≤155 chars, all unique, all include "Dubai" + brand.

## Files to change
- `src/data/services.ts` — add `metaTitle` + `metaDescription` to each of 17 entries; add interface fields
- `src/pages/ServicePage.tsx` — use new fields in `useSeo`, inject Service JSON-LD
- `src/pages/Tuning.tsx` — shorten meta title to ≤60 chars

No layout, design, or existing copy changes.
