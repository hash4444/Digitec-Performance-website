# Mercedes-Benz topical architecture audit

Audit date: 2026-08-31

## Decision summary

The existing `/brands/mercedes-benz-service-dubai` page remains the parent Mercedes-Benz authority and conversion hub. Its copy, metadata, hierarchy and commercial positioning stay intact. The implementation may add only compact navigation links inside the existing Models and Common Problems sections.

Four requested model intents already have indexable pages. Creating parallel landing pages would split relevance and links, so those URLs will be retained and upgraded in place as the canonical model pages:

- `/blog/mercedes-g63-service-dubai-guide`
- `/blog/mercedes-c-class-service-dubai-guide`
- `/blog/mercedes-e-class-service-dubai-guide`
- `/blog/mercedes-s-class-service-dubai-guide`

The fourteen existing Mercedes commercial service pages already satisfy repair/service intent. Their copy and metadata remain unchanged; only a compact related-model/owner-guide link module is permitted.

## Existing Mercedes URLs and disposition

### Parent hub — unchanged except internal navigation

- `/brands/mercedes-benz-service-dubai`

The hub already has a unique H1, broad Mercedes service positioning, breadcrumbs, Service/WebPage structured data, workshop imagery, model coverage, problem summaries, commercial service links and conversion actions. It should not absorb detailed model or symptom copy.

### Existing commercial service pages — content and metadata unchanged

- `/services/mercedes-oil-change-dubai`
- `/services/mercedes-mechanical-repair-dubai`
- `/services/mercedes-transmission-repair-dubai`
- `/services/mercedes-suspension-repair-dubai`
- `/services/mercedes-steering-repair-dubai`
- `/services/mercedes-brake-repair-dubai`
- `/services/mercedes-tire-repair-dubai`
- `/services/mercedes-battery-replacement-dubai`
- `/services/mercedes-exhaust-repair-dubai`
- `/services/mercedes-diagnostics-dubai`
- `/services/mercedes-electrical-repair-dubai`
- `/services/mercedes-fuel-system-repair-dubai`
- `/services/mercedes-ac-repair-dubai`
- `/services/mercedes-body-repair-dubai`

These pages keep transactional titles, Service schema and booking intent. They receive only contextually relevant links to informational guides and model pages.

### Existing pages retained and upgraded in place

- `/blog/mercedes-g63-service-dubai-guide` becomes the canonical Mercedes-AMG G63 model page.
- `/blog/mercedes-c-class-service-dubai-guide` becomes the canonical Mercedes C-Class model page.
- `/blog/mercedes-e-class-service-dubai-guide` becomes the canonical Mercedes E-Class model page.
- `/blog/mercedes-s-class-service-dubai-guide` becomes the canonical Mercedes S-Class model page.

Keeping these URLs avoids duplicating their existing “model + service Dubai” search intent. Their current journal listing can remain, but the route itself will use the model-page layout and Service schema.

### Existing informational and workshop-evidence pages — remain published

- `/blog/mercedes-repair-dubai-complete-guide` remains the broad Mercedes problems overview and links down to the specific symptom cluster.
- `/blog/air-suspension-repair-dubai-guide` remains a brand-agnostic air-suspension diagnostic overview.
- `/blog/transmission-service-7g-9g-dubai` remains a maintenance/service explainer rather than a symptom guide.
- `/blog/check-engine-light-dubai-guide` remains a multi-brand warning-light guide.
- `/blog/engine-overheating-dubai-what-to-do` remains a multi-brand emergency guide.
- `/blog/g63-to-brabus-g800-conversion-dubai` remains a real G63 workshop project and links to the G63 model page.
- `/blog/mercedes-amg-gt-black-series-1300hp-build-dubai` remains a real AMG workshop project.

No new case-study record will be published without real vehicle and workshop evidence.

## Canonical model architecture

Existing canonical URLs are preserved where intent already exists; only missing model intents receive new URLs.

| Requested model | Canonical URL | Action |
| --- | --- | --- |
| Mercedes-AMG G63 | `/blog/mercedes-g63-service-dubai-guide` | Upgrade existing page |
| Mercedes G-Class | `/mercedes/models/g-class-service-repair-dubai` | New |
| Mercedes-AMG C63 | `/mercedes/models/c63-service-repair-dubai` | New |
| Mercedes C-Class | `/blog/mercedes-c-class-service-dubai-guide` | Upgrade existing page |
| Mercedes-AMG E63 | `/mercedes/models/e63-service-repair-dubai` | New |
| Mercedes E-Class | `/blog/mercedes-e-class-service-dubai-guide` | Upgrade existing page |
| Mercedes S-Class | `/blog/mercedes-s-class-service-dubai-guide` | Upgrade existing page |
| Mercedes-AMG S63 | `/mercedes/models/s63-service-repair-dubai` | New |
| Mercedes GLE | `/mercedes/models/gle-service-repair-dubai` | New |
| Mercedes GLS | `/mercedes/models/gls-service-repair-dubai` | New |

## Informational problem architecture

The collection URL is `/mercedes/problems`. Each child page answers a symptom-led question and links to, but does not duplicate, the corresponding commercial service page.

| Guide | URL | Commercial destination |
| --- | --- | --- |
| Mercedes AIRMATIC Malfunction | `/mercedes/problems/airmatic-malfunction` | Mercedes suspension repair |
| Mercedes Suspension Dropping Overnight | `/mercedes/problems/suspension-dropping-overnight` | Mercedes suspension repair |
| Mercedes Gearbox Jerking When Changing Gears | `/mercedes/problems/gearbox-jerking` | Mercedes transmission repair |
| Mercedes Transmission Slipping | `/mercedes/problems/transmission-slipping` | Mercedes transmission repair |
| Mercedes Check Engine Light | `/mercedes/problems/check-engine-light` | Mercedes diagnostics |
| Mercedes Engine Overheating | `/mercedes/problems/engine-overheating` | Mercedes mechanical repair / diagnostics |
| Mercedes AC Not Cooling | `/mercedes/problems/ac-not-cooling` | Mercedes AC repair |
| Mercedes Oil Leak | `/mercedes/problems/oil-leak` | Mercedes mechanical repair |
| Mercedes Won't Start | `/mercedes/problems/wont-start` | Mercedes diagnostics / electrical repair |
| Mercedes Battery Warning | `/mercedes/problems/battery-warning` | Mercedes electrical repair / battery replacement |

## Case-study infrastructure

Future verified repair records use `/mercedes/case-studies/{vehicle-model-repair-slug}`. The reusable data contract supports:

- vehicle
- model year
- engine/platform
- customer complaint
- symptoms
- initial inspection
- diagnostic process
- fault identified
- repair performed
- parts/components used
- testing after repair
- result
- workshop images
- related service
- related model
- related problem guide

The dynamic route and renderer may exist before the first record, but no URL is added to the route manifest, internal links or sitemap until a real case study is populated.

## Internal-link-only changes

- The Mercedes hub exposes the model pages and symptom-guide collection without adding long-form copy.
- Mercedes commercial service pages receive a short “model and owner guides” module.
- The real G63 workshop project points to the retained G63 model URL.
- The broad Mercedes problems overview and relevant generic diagnostic guides point into the specific Mercedes problem cluster.

## Cannibalization controls

1. **Hub vs model pages:** the hub retains broad Mercedes workshop intent; model pages target one platform or model family and link back to the hub.
2. **AMG vs base model:** C63, E63, S63 and G63 pages focus on AMG-specific engines, transmissions, brakes, cooling and suspension. C-Class, E-Class, S-Class and G-Class pages cover the wider family and avoid positioning themselves as AMG pages.
3. **G63 vs G-Class:** the G63 page focuses on AMG V8 and AMG driveline/service considerations; the G-Class page covers non-AMG and earlier G-Class platforms, transfer case, differential locks and utility/off-road maintenance.
4. **Guide vs service:** symptom pages use Article schema, diagnostic titles and owner-safety answers. Commercial pages keep Service schema, repair titles and booking intent.
5. **AIRMATIC malfunction vs overnight drop:** the malfunction guide focuses on warnings, control faults and system-level diagnosis; the overnight-drop guide focuses on static height loss and leak isolation.
6. **Generic vs Mercedes-specific guides:** existing generic check-engine, overheating, transmission-service and air-suspension pages stay multi-brand. New guides use Mercedes system and model detail and link laterally rather than repeating generic content.
7. **Broad problems overview vs symptom guides:** the existing overview remains a navigation-level ownership article; detailed diagnosis belongs to the ten child guides.
8. **Battery warning vs battery replacement:** the guide explains charging-system and low-voltage warnings; the commercial page targets testing and replacement work.

## Technical release requirements

- Add every new indexable URL to the shared route manifest so prerendering and XML sitemap generation remain automatic.
- Preserve one H1, unique title, description and self-canonical per URL.
- Use Service + BreadcrumbList schema on model pages and BlogPosting + BreadcrumbList on symptom guides.
- Do not advertise Arabic alternates until translated Arabic pages exist.
- Keep future empty case-study routes out of the sitemap.
- Validate inbound internal links, metadata duplication, schema and production rendering in the existing SEO build pipeline.
