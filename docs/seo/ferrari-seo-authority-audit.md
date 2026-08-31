# Ferrari SEO authority audit and phased implementation plan

Audit date: 2026-08-31

## Executive decision

`/brands/ferrari-service-dubai` remains the only primary commercial Ferrari hub. No replacement Ferrari service, repair, specialist, garage or workshop page will be created.

The first implementation release is deliberately limited to:

1. improving the existing hub without changing its URL or broad intent;
2. correcting unsafe or overly universal Ferrari claims across the existing service pages;
3. improving contextual internal links and conversion paths;
4. publishing four technically differentiated model pages: 488, F8 Tributo, Roma and SF90;
5. retaining and separating the existing Ferrari 488 maintenance guide;
6. creating unpublished, verified-only case-study infrastructure.

Later system guides, symptom guides and additional ownership guides remain planned rather than being published in bulk.

## Existing technical state

The Ferrari hub and all fourteen existing Ferrari child-service URLs currently have:

- one H1;
- a unique title and meta description;
- a self-referencing canonical;
- indexable robots behaviour;
- XML-sitemap inclusion;
- breadcrumb navigation and `BreadcrumbList` data;
- visible FAQ content and matching FAQ data;
- `Service`, `WebPage` and `Brand` entities;
- descriptive alt text on rendered images;
- mobile-first layouts and WhatsApp/call actions;
- inbound links from the Ferrari hub.

These foundations should be retained.

## URL-by-URL classification

### KEEP + IMPROVE — primary hub

- `/brands/ferrari-service-dubai`

Keep the URL, broad commercial intent, hero, real workshop imagery, service navigation, contact details, breadcrumbs and current business schema. Improve it with a compact model knowledge centre, clearer independent-workshop language, model/service links, and more conservative technical wording. Do not turn it into a long model or problem article.

### KEEP + IMPROVE — existing commercial child pages

- `/brands/ferrari-service-dubai/oil-change`
- `/brands/ferrari-service-dubai/brake-repair`
- `/brands/ferrari-service-dubai/transmission-repair`
- `/brands/ferrari-service-dubai/ac-repair`
- `/brands/ferrari-service-dubai/suspension-repair`
- `/brands/ferrari-service-dubai/engine-diagnostics`
- `/brands/ferrari-service-dubai/mechanical-repair`
- `/brands/ferrari-service-dubai/steering-repair`
- `/brands/ferrari-service-dubai/battery-replacement`
- `/brands/ferrari-service-dubai/electrical-repair`
- `/brands/ferrari-service-dubai/exhaust-repair`
- `/brands/ferrari-service-dubai/fuel-system-repair`
- `/brands/ferrari-service-dubai/body-repair`
- `/brands/ferrari-service-dubai/tire-repair`

Keep every URL and its transactional intent. Correct Ferrari-specific copy where the current shared template implies one oil specification, mileage interval, gearbox, brake package, suspension system, refrigerant or diagnostic function across all models. Add contextual model and guide links without changing these pages into informational articles.

### KEEP + IMPROVE — existing informational pages

- `/blog/ferrari-488-service-dubai-guide`
  - Keep as the informational 488 maintenance and ownership guide.
  - Remove absolute annual-service and guaranteed clutch-measurement claims.
  - Link it to the new commercial 488 model page and appropriate service pages.
- `/blog/ferrari-maintenance-guide-dubai`
  - Keep as the broad ownership and maintenance-planning guide.
  - Avoid implying one interval or maintenance package applies to every Ferrari.
  - Remove “costs” from the title unless the page provides verified cost factors rather than invented prices.
- `/best-ferrari-workshop-dubai`
  - Keep the indexed URL but reframe it as a workshop-selection checklist.
  - It must not compete with the Ferrari hub for the primary “Ferrari service and repair Dubai” intent.
- `/blog/pre-purchase-inspection-dubai-guide`
  - Keep as the current multi-brand PPI guide.
  - Do not create a Ferrari PPI commercial page until the exact Ferrari inspection scope is verified as a current workshop offering.

### MERGE

No current Ferrari page requires a URL merge in this release. Intent can be separated with copy and links without sacrificing indexed URLs.

### REMOVE

No strong existing Ferrari URL should be removed. Future empty case-study routes must remain outside the sitemap and internal navigation.

### CREATE — release one

- `/brands/ferrari-service-dubai/488`
- `/brands/ferrari-service-dubai/f8-tributo`
- `/brands/ferrari-service-dubai/roma`
- `/brands/ferrari-service-dubai/sf90`

These are model-level commercial pages. The 488 page links to, but does not repeat, the existing maintenance guide.

## Technical claim corrections

The shared Ferrari profile currently creates several unsafe universal implications. Release one must correct the following:

1. **Oil:** no single oil grade or mileage interval should be presented as correct for every Ferrari. Use the VIN, model year, engine, market specification, handbook and service history.
2. **Transmission:** older automated-manual F1 systems, seven-speed dual-clutch applications and newer eight-speed dual-clutch applications require separate wording. `7DCL750` must not be presented as universal.
3. **Brakes:** CCM generations, rotor dimensions, calipers and steel-versus-carbon-ceramic fitment vary. Replacement must follow the applicable inspection and measurement procedure, not mileage alone.
4. **Suspension:** SCM/SCM-E and magnetorheological damping are model- and generation-dependent. Ferrari Dynamic Enhancer is not a universal suspension component. Generic air-suspension terminology must not appear on conventional Ferrari model pages.
5. **Diagnostics:** SD3/DEIS and other compatible functions depend on the vehicle, module, software, security/account access and available tooling. Never claim factory-level or universal access.
6. **Hybrid vehicles:** SF90 content must separate the internal-combustion, high-voltage, front electric axle, rear motor, transmission, cooling and low-voltage systems. DIGI-TEC must not claim battery-pack opening, inverter repair, motor repair or high-voltage component replacement without verified support.
7. **Fault finding:** a warning or code is evidence, not proof that the component named by a code has failed.

## Canonical model architecture

| Model | Canonical path | Release | Intent |
| --- | --- | --- | --- |
| Ferrari 488 | `/brands/ferrari-service-dubai/488` | Publish now | Commercial model service/repair |
| Ferrari F8 Tributo | `/brands/ferrari-service-dubai/f8-tributo` | Publish now | Commercial model service/repair |
| Ferrari Roma | `/brands/ferrari-service-dubai/roma` | Publish now | Commercial model service/repair |
| Ferrari SF90 | `/brands/ferrari-service-dubai/sf90` | Publish now | Commercial model service/diagnostic assessment |
| Ferrari 296 | `/brands/ferrari-service-dubai/296` | Phase 3 published | Hybrid-aware commercial model page with explicit high-voltage scope limits |
| Ferrari Portofino | `/brands/ferrari-service-dubai/portofino` | Phase 3 published | Original Portofino and Portofino M differentiated by gearbox and controls |
| Ferrari 812 | `/brands/ferrari-service-dubai/812` | Phase 3 published | V12 model page with Superfast, GTS and Competizione variant separation |
| Ferrari Purosangue | `/brands/ferrari-service-dubai/purosangue` | Phase 3 published | V12, 4RM-S evo and TASV active-suspension model page |

Older 458 Italia, California, F12berlinetta, FF and GTC4Lusso pages are deferred until real workshop demand and evidence justify them.

## Future system, problem and guide architecture

The following are reserved content directions, not release-one indexable routes:

- Engines: F154, F140 and F163.
- Transmissions: F1 automated manual, seven-speed DCT, eight-speed DCT and gearbox diagnostics.
- Chassis: carbon-ceramic brakes, SCM suspension and steering.
- Diagnostics: warning lights, engine, transmission and electrical diagnosis.
- Symptoms: gearbox warning, check-engine light, overheating, coolant leak, oil leak, misfire, suspension warning, battery warning, AC not cooling and brake warning.
- Ownership: service intervals, Dubai maintenance, storage, battery care, carbon-ceramic brake explanation and model maintenance guides.

Publishing should proceed in the requested order: four priority models, remaining verified models, system guides, symptom guides, then ownership guides.

## Cannibalisation controls

1. **Hub vs model pages:** the hub targets broad Ferrari workshop/service/repair intent; a model page targets one vehicle family.
2. **Hub vs workshop-selection page:** `/best-ferrari-workshop-dubai` becomes a selection checklist rather than another service landing page.
3. **488 commercial page vs maintenance guide:** the model page handles booking and repair scope; the blog guide answers maintenance-planning questions.
4. **Model vs service pages:** model pages describe the integrated vehicle; service pages remain transactional destinations for one repair category.
5. **Future symptom vs service pages:** symptoms explain possible systems, diagnosis and urgency; commercial pages describe inspection and repair availability.
6. **Future engine guides vs model pages:** engine guides explain an engine family across correct applications; model pages cover the whole vehicle.
7. **Hybrid models:** SF90 and 296 pages must not imply unsupported high-voltage repair capability.

## Case-study governance

The reusable Ferrari case-study data contract may be implemented now, but its records remain empty. A route becomes indexable only when a real workshop record includes:

- vehicle and model year;
- engine/platform;
- customer complaint and observed symptoms;
- initial inspection and diagnostic findings;
- cause and recommended repair;
- work actually performed;
- verification after repair;
- genuine workshop images;
- related service, model and guide links.

No placeholder or invented Ferrari case study may be added to the route manifest or sitemap.

## Release-one acceptance criteria

- Existing indexed URLs remain stable.
- Four model pages have unique metadata, one H1, self-canonicals and valid breadcrumbs/Service data.
- All new pages link to the Ferrari hub and relevant commercial services.
- The hub and relevant service pages link back to the new model pages.
- New English-only pages do not advertise untranslated Arabic alternates.
- Ferrari-specific technical claims use conditional, model-aware wording.
- No invented certification, manufacturer relationship, price, warranty, tool access, repair capability or case study appears.
- New routes are prerendered, indexable, included in the XML and HTML sitemaps, and pass the existing SEO validator.
