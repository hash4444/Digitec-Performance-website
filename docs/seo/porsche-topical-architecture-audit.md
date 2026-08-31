# Porsche topical architecture audit and controlled URL map

Audit date: 2026-08-31

## Release decision

`/brands/porsche-service-dubai` remains the parent authority and primary commercial page for **Porsche Repair & Service Dubai**. It must not be replaced or turned into a long-form encyclopedia. The first implementation batch is limited to technical corrections, navigation architecture and internal links.

The repository already publishes 21 English Porsche-related URLs (and matching Arabic routes). Three existing articles already target model-family service intent. They should be upgraded in place instead of competing with new `/porsche/911`, `/porsche/cayenne` or `/porsche/panamera` pages.

No system, symptom, ownership or case-study URL should be published merely because it appears in this map. Each content record requires technically reviewed, model-aware copy and all claims must be supportable. Empty collections and templates remain non-indexable until populated.

## Existing URLs discovered and disposition

| Existing URL | Primary intent | Decision | Proposed title tag |
| --- | --- | --- | --- |
| `/brands/porsche-service-dubai` | Porsche repair and service Dubai | Keep as parent; improve model/navigation links only | Porsche Service & Repair Dubai \| Digi-Tec Workshop |
| `/best-porsche-workshop-dubai` | How to select a Porsche workshop | Keep, but narrow to selection criteria and link to hub | Porsche Workshop in Dubai: What to Check \| Digi-Tec |
| `/blog/porsche-911-service-dubai-guide` | 911 service, repair and ownership | Keep; upgrade in place as canonical 911 model hub | Porsche 911 Service & Repair Dubai \| Digi-Tec |
| `/blog/porsche-cayenne-service-dubai-guide` | Cayenne service, repair and ownership | Keep; upgrade in place as canonical Cayenne model hub | Porsche Cayenne Service & Repair Dubai \| Digi-Tec |
| `/blog/porsche-panamera-service-dubai-guide` | Panamera service, repair and ownership | Keep; upgrade in place as canonical Panamera model hub | Porsche Panamera Service & Repair Dubai \| Digi-Tec |
| `/blog/porsche-maintenance-guide-dubai` | Broad Porsche maintenance in Dubai | Keep; refocus as knowledge-centre/maintenance overview | Porsche Maintenance Guide for Dubai Owners \| Digi-Tec |
| `/brands/porsche-service-dubai/oil-change` | Porsche oil service | Keep commercial page | Porsche Oil Change Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/brake-repair` | Porsche brake repair | Keep commercial page | Porsche Brake Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/transmission-repair` | Porsche PDK/Tiptronic repair | Keep; strengthen PDK/Tiptronic scope after verification | Porsche Transmission & PDK Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/ac-repair` | Porsche AC repair | Keep commercial page | Porsche AC Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/suspension-repair` | Porsche suspension/air suspension repair | Keep; cover PASM/PDCC/air suspension without promising unsupported work | Porsche Suspension Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/engine-diagnostics` | Porsche diagnostics | Keep; use “compatible diagnostics” until tooling is verified | Porsche Diagnostics Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/mechanical-repair` | Broad mechanical/engine/cooling repair | Keep; act as engine and cooling destination initially | Porsche Mechanical & Engine Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/steering-repair` | Porsche steering repair | Keep commercial page | Porsche Steering Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/battery-replacement` | Porsche battery testing/replacement | Keep commercial page | Porsche Battery Service Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/electrical-repair` | Porsche electrical repair | Keep commercial page | Porsche Electrical Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/exhaust-repair` | Porsche exhaust repair | Keep commercial page | Porsche Exhaust Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/fuel-system-repair` | Porsche fuel-system repair | Keep commercial page | Porsche Fuel System Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/body-repair` | Porsche body repair | Keep commercial page | Porsche Body Repair Dubai \| Digi-Tec |
| `/brands/porsche-service-dubai/tire-repair` | Porsche tyre service | Keep commercial page | Porsche Tyre Service Dubai \| Digi-Tec |

Matching `/ar/...` routes exist. They must not inherit untranslated English expansions. New Arabic alternates should be released only with complete Arabic content.

## Pages to improve, merge or leave unchanged

### Improve in place

- Hub: add clear links to the six model families, knowledge centre and existing commercial services.
- Existing 911, Cayenne and Panamera guides: retain URLs, differentiate platform content, add breadcrumbs and related system/problem/service links.
- Maintenance guide: make it the browseable Porsche knowledge centre rather than another broad service landing page.
- Best-workshop guide: remove broad commercial duplication and unsupported superiority implications.
- All service pages: keep transactional intent; add concise model, system and symptom relationships.

### Merge by consolidation, not URL deletion

- “Porsche PDK repair” belongs on the existing transmission-repair URL; no separate commercial PDK URL.
- “Porsche air suspension repair” belongs on the existing suspension-repair URL unless future evidence demonstrates a materially distinct service workflow.
- “Porsche engine repair” and “cooling system repair” initially belong on mechanical-repair. Split only after substantive, verified service content exists.
- “Porsche service Dubai” and “Porsche repair Dubai” remain combined on the parent hub.

### Leave structurally unchanged

- Existing commercial service slugs and canonicals.
- Existing body, exhaust, fuel-system, tyre and steering pages unless their visible copy contains an inaccurate Porsche-specific claim.
- No fake case-study records or placeholder case-study links.

## Canonical model architecture

| Parent | Canonical URL | Primary search intent | Action | Proposed title tag |
| --- | --- | --- | --- | --- |
| Porsche hub | `/blog/porsche-911-service-dubai-guide` | Porsche 911 service and repair Dubai | Upgrade existing | Porsche 911 Service & Repair Dubai \| Digi-Tec |
| Porsche hub | `/blog/porsche-cayenne-service-dubai-guide` | Porsche Cayenne service and repair Dubai | Upgrade existing | Porsche Cayenne Service & Repair Dubai \| Digi-Tec |
| Porsche hub | `/porsche/macan` | Porsche Macan service and repair Dubai | New | Porsche Macan Service & Repair Dubai \| Digi-Tec |
| Porsche hub | `/blog/porsche-panamera-service-dubai-guide` | Porsche Panamera service and repair Dubai | Upgrade existing | Porsche Panamera Service & Repair Dubai \| Digi-Tec |
| Porsche hub | `/porsche/718` | Porsche 718 Cayman/Boxster service Dubai | New | Porsche 718 Cayman & Boxster Service Dubai \| Digi-Tec |
| Porsche hub | `/porsche/taycan` | Porsche Taycan service and repair Dubai | New | Porsche Taycan Service & Repair Dubai \| Digi-Tec |
| 911 model hub | `/porsche/911/997` | Porsche 997 service and repair Dubai | New | Porsche 997 Service & Repair Dubai \| Digi-Tec |
| 911 model hub | `/porsche/911/991` | Porsche 991 service and repair Dubai | New | Porsche 991 Service & Repair Dubai \| Digi-Tec |
| 911 model hub | `/porsche/911/992` | Porsche 992 service and repair Dubai | New | Porsche 992 Service & Repair Dubai \| Digi-Tec |

Carrera, Carrera S, GTS, Turbo, Turbo S, GT3 and GT3 RS remain sections of the 911/generation pages. Cayenne, Macan, Panamera, 718 and Taycan trims remain sections of their family pages. Generation/trim URLs are deferred until unique technical scope and search intent can be demonstrated.

## System authority URL map

Parent collection: `/porsche/systems` — **Porsche Systems Explained | DIGI-TEC**.

| Child URL | Primary intent | Proposed title tag | Main commercial destination |
| --- | --- | --- | --- |
| `/porsche/systems/pdk` | What Porsche PDK is and how it behaves | Porsche PDK Explained: Operation & Warning Signs \| Digi-Tec | transmission repair |
| `/porsche/systems/tiptronic` | What Porsche Tiptronic is | Porsche Tiptronic Explained \| Digi-Tec | transmission repair |
| `/porsche/systems/pasm` | How PASM works | Porsche PASM Explained \| Digi-Tec | suspension repair |
| `/porsche/systems/pdcc` | How PDCC works | Porsche PDCC Explained \| Digi-Tec | suspension repair |
| `/porsche/systems/pccb` | PCCB operation and inspection | Porsche PCCB Explained \| Digi-Tec | brake repair |
| `/porsche/systems/air-suspension` | Porsche air-suspension operation | Porsche Air Suspension Explained \| Digi-Tec | suspension repair |
| `/porsche/systems/sport-chrono` | Sport Chrono functions | Porsche Sport Chrono Explained \| Digi-Tec | diagnostics |
| `/porsche/systems/rear-axle-steering` | Rear-axle steering operation | Porsche Rear-Axle Steering Explained \| Digi-Tec | steering repair |
| `/porsche/systems/ptm-awd` | Porsche Traction Management/AWD | Porsche PTM & AWD Explained \| Digi-Tec | mechanical repair |

## Problem and symptom URL map

Parent collection: `/porsche/problems` — **Porsche Problems & Warning Signs | DIGI-TEC**. Every child uses informational/Article positioning and links to, but does not copy, its commercial destination.

| Child URL | Unique intent | Proposed title tag | Commercial destination |
| --- | --- | --- | --- |
| `/porsche/problems/pdk-jerking` | Jerky shifts | Porsche PDK Jerking: Causes & Next Steps \| Digi-Tec | transmission repair |
| `/porsche/problems/pdk-slipping` | Slip/flaring symptom | Porsche PDK Slipping: Symptoms & Diagnosis \| Digi-Tec | transmission repair |
| `/porsche/problems/pdk-warning-message` | PDK warning displayed | Porsche PDK Warning Message Explained \| Digi-Tec | diagnostics / transmission |
| `/porsche/problems/delayed-gear-engagement` | Delay selecting drive/reverse | Porsche Delayed Gear Engagement: Causes \| Digi-Tec | transmission repair |
| `/porsche/problems/coolant-leak` | Visible/low coolant | Porsche Coolant Leak: Signs & Causes \| Digi-Tec | mechanical repair |
| `/porsche/problems/engine-overheating` | High coolant temperature | Porsche Engine Overheating: What to Do \| Digi-Tec | mechanical repair |
| `/porsche/problems/oil-leak` | External oil leak | Porsche Oil Leak: Common Sources & Diagnosis \| Digi-Tec | mechanical repair |
| `/porsche/problems/excessive-oil-consumption` | Oil level falling without visible leak | Porsche Excessive Oil Consumption Explained \| Digi-Tec | diagnostics / mechanical |
| `/porsche/problems/engine-misfire` | Misfire/rough running | Porsche Engine Misfire: Causes & Diagnosis \| Digi-Tec | diagnostics |
| `/porsche/problems/check-engine-light` | CEL warning | Porsche Check Engine Light: Meaning & Next Steps \| Digi-Tec | diagnostics |
| `/porsche/problems/pasm-fault` | PASM fault warning | Porsche PASM Fault: Causes & Diagnosis \| Digi-Tec | suspension repair |
| `/porsche/problems/pdcc-fault` | PDCC fault warning | Porsche PDCC Fault: Causes & Diagnosis \| Digi-Tec | suspension repair |
| `/porsche/problems/suspension-dropping-overnight` | Static height loss | Porsche Suspension Drops Overnight: Causes \| Digi-Tec | suspension repair |
| `/porsche/problems/air-suspension-warning` | Air-suspension warning | Porsche Air Suspension Warning Explained \| Digi-Tec | suspension repair |
| `/porsche/problems/brake-warning-light` | Brake warning | Porsche Brake Warning Light Explained \| Digi-Tec | brake repair |
| `/porsche/problems/battery-warning` | Battery/charging warning | Porsche Battery Warning: Causes & Checks \| Digi-Tec | electrical / battery |
| `/porsche/problems/wont-start` | No-start symptom | Porsche Won't Start: Causes & Safe Checks \| Digi-Tec | diagnostics / electrical |
| `/porsche/problems/ac-not-cooling` | Weak/warm AC | Porsche AC Not Cooling in Dubai: Causes \| Digi-Tec | AC repair |
| `/porsche/problems/steering-vibration` | Vibration through steering | Porsche Steering Vibration: Causes \| Digi-Tec | steering / tyre |
| `/porsche/problems/macan-transfer-case` | Macan driveline shudder/binding | Porsche Macan Transfer Case Symptoms \| Digi-Tec | mechanical repair |
| `/porsche/problems/cayenne-air-suspension` | Cayenne-specific height/warning issues | Porsche Cayenne Air Suspension Problems \| Digi-Tec | suspension repair |
| `/porsche/problems/911-cooling` | 911 cooling symptoms | Porsche 911 Cooling Problems Explained \| Digi-Tec | mechanical repair |
| `/porsche/problems/taycan-charging` | Taycan charging failure/interruption | Porsche Taycan Charging Problems: Checks & Diagnosis \| Digi-Tec | electrical repair |
| `/porsche/problems/taycan-12v-battery` | Taycan low-voltage battery issue | Porsche Taycan 12V Battery Problems \| Digi-Tec | battery / electrical |

## Ownership and maintenance URL map

Parent collection is the retained `/blog/porsche-maintenance-guide-dubai`. It links to the following editorial children.

| Child URL | Primary intent | Proposed title tag |
| --- | --- | --- |
| `/porsche/guides/service-intervals-uae` | Official schedule plus UAE-use caveat | Porsche Service Intervals UAE Guide \| Digi-Tec |
| `/porsche/guides/how-often-service-dubai` | Usage-based service frequency | How Often Should a Porsche Be Serviced in Dubai? |
| `/porsche/guides/major-vs-minor-service` | Major versus minor scope | Porsche Major vs Minor Service Explained \| Digi-Tec |
| `/porsche/guides/pdk-service-intervals` | PDK schedule by application | Porsche PDK Service Intervals Guide \| Digi-Tec |
| `/porsche/guides/oil-change-intervals` | Oil interval factors | Porsche Oil Change Intervals in the UAE \| Digi-Tec |
| `/porsche/guides/maintenance-cost-dubai` | Cost drivers, no invented prices | Porsche Maintenance Cost in Dubai: Key Factors |
| `/porsche/guides/battery-life-dubai` | Battery longevity factors | Porsche Battery Life in Dubai \| Digi-Tec |
| `/porsche/guides/dubai-heat` | Heat effects across systems | How Dubai Heat Affects Porsche Cars \| Digi-Tec |
| `/porsche/guides/ac-maintenance-dubai` | Preventive AC care | Porsche AC Maintenance in Dubai \| Digi-Tec |
| `/porsche/guides/cooling-maintenance` | Cooling-system care | Porsche Cooling System Maintenance Guide |
| `/porsche/guides/brake-wear-dubai` | Brake wear factors | Porsche Brake Wear in Dubai \| Digi-Tec |
| `/porsche/guides/tyre-wear-dubai` | Tyre wear/alignment factors | Porsche Tyre Wear in Dubai \| Digi-Tec |
| `/porsche/guides/pre-purchase-inspection-checklist` | PPI checklist | Porsche Pre-Purchase Inspection Checklist UAE |
| `/porsche/guides/buying-used-porsche-dubai` | Used-purchase process | Buying a Used Porsche in Dubai: Owner Guide |
| `/porsche/guides/dealer-vs-independent-specialist` | Workshop-choice comparison | Porsche Dealer vs Independent Specialist Dubai |
| `/porsche/guides/warning-lights` | Warning-light overview | Porsche Warning Lights Explained \| Digi-Tec |
| `/porsche/guides/common-problems-dubai` | Broad problem navigation | Common Porsche Problems in Dubai \| Digi-Tec |
| `/porsche/guides/macan-maintenance` | Macan ownership maintenance | Porsche Macan Maintenance Guide UAE \| Digi-Tec |
| `/porsche/guides/718-maintenance` | 718 ownership maintenance | Porsche 718 Maintenance Guide UAE \| Digi-Tec |
| `/porsche/guides/taycan-maintenance` | Taycan ownership maintenance | Porsche Taycan Maintenance Guide UAE \| Digi-Tec |

Separate 911, Cayenne and Panamera maintenance URLs are **not** proposed: their existing canonical model pages should contain those maintenance sections. Creating additional pages would duplicate model + maintenance/service intent.

## Parent/child and internal-link map

```text
/brands/porsche-service-dubai
├── retained/new model hubs
│   ├── 911 existing hub ── 997 / 991 / 992
│   ├── Cayenne existing hub
│   ├── Macan / Panamera existing hub / 718 / Taycan
│   └── each model → relevant systems → symptoms → commercial service
├── /blog/porsche-maintenance-guide-dubai
│   └── /porsche/guides/* → relevant model + symptom + service
├── /porsche/systems
│   └── system child → applicable models + problems + service
├── /porsche/problems
│   └── symptom child → applicable model + system + service
└── existing commercial service pages
    └── related models + systems + symptom guides + parent hub
```

Required semantic chains include: Cayenne → Cayenne air-suspension problem → air-suspension explainer → suspension repair; and 992 → PDK jerking → PDK explainer → transmission repair. Breadcrumbs must reflect the logical parent even where a retained `/blog/...` model URL is used.

Future verified case studies use `/porsche/case-studies/{real-job-slug}` and link model → system → problem → service. The template may support vehicle, generation, year, engine, transmission, mileage, complaint, symptoms, inspection, diagnosis, fault, repair, components, testing, result and workshop images. No route, sitemap entry or “recent case” card is published until a real record and imagery exist.

## Cannibalization conflicts and controls

1. **Hub vs best-workshop page:** hub owns repair/service intent; best-workshop page owns selection criteria and must not claim “best”.
2. **Existing model articles vs proposed clean model slugs:** retain the established article URLs for 911, Cayenne and Panamera; do not create redirects or parallel pages without traffic/backlink evidence.
3. **Model page vs maintenance guide:** model hubs cover platform-specific workshop and ownership needs; separate model maintenance guides are omitted for 911/Cayenne/Panamera.
4. **Service vs symptom:** service pages use transactional copy and Service schema; symptom pages explain meaning, causes, safety and diagnosis with Article schema.
5. **PDK repair vs transmission repair:** one commercial destination; PDK system and symptom pages remain informational.
6. **Air suspension vs suspension repair:** one commercial destination; system and fault guides remain informational.
7. **Generic site guides vs Porsche guides:** existing generic overheating, check-engine, air-suspension and battery content stays multi-brand; Porsche children must contain Porsche system/model context and link laterally rather than repeat it.
8. **Broad maintenance guide vs child ownership guides:** parent is navigation/overview; children answer one ownership question deeply.
9. **Generation vs variant:** generation pages may discuss Carrera/GTS/Turbo/GT variants; variant doorway pages are prohibited.

## Technical claims requiring verification or correction

- **Corrected in Phase 0:** `M177` was listed as a Porsche Cayenne/Panamera engine. M177 is a Mercedes-AMG designation and has been removed from the Porsche profile.
- Verify every exact Porsche engine code and avoid mixing internal engine-family shorthand, sales codes and platform codes.
- Verify the single PDK fluid part number; PDK generation/application may require different fluids and procedures. VIN/transmission identification should control advice.
- Verify oil approvals and intervals by model year, engine, market and service schedule; do not state a universal 15,000 km or annual interval.
- Verify which models/options use PASM, PDCC, PCCB, rear-axle steering and air suspension. Do not imply universal fitment.
- Verify PDK versus Tiptronic applications by model/generation. In particular, do not generalize 7-speed PDK or 8-speed Tiptronic across the range.
- Verify refrigerant by build data/service label rather than broad platform rules.
- PIWIS ownership, access, supported functions, coding/programming and technician competence require business verification. Until confirmed, publish only “Porsche-compatible diagnostics; functions confirmed per vehicle.”
- “Porsche-trained,” Porsche certification/dealer affiliation, factory tooling, genuine-part guarantees, warranties and years of Porsche specialization are prohibited unless documented by the business.
- Existing claims that Dubai driving automatically shortens fluid life or that a fault is “common” need evidence or more conservative wording.
- Existing battery-life ranges and any cost statements require sourced evidence or removal.
- Taycan high-voltage diagnosis/repair capability and safety qualifications require explicit operational verification before commercial claims.

## Pages that should not be created

- `/porsche/911`, `/porsche/cayenne`, `/porsche/panamera` while the retained article URLs serve the same model intent.
- Separate “repair,” “service,” “workshop,” “garage” and “best workshop” pages for any one model/generation.
- Carrera, Carrera S, GTS, Turbo, Turbo S, GT3, GT3 RS, Cayenne S/GTS/Turbo, Macan S/GTS, Panamera 4S/GTS/Turbo, 718 GTS/GT4/Spyder or Taycan 4S/Turbo/Turbo S pages solely because trims exist.
- Separate commercial PDK-repair and Tiptronic-repair pages while transmission repair satisfies the booking intent.
- Separate commercial Porsche air-suspension, cooling or engine pages until the existing service URLs are proven insufficient and unique service copy is available.
- Porsche 911/Cayenne/Panamera maintenance-guide children that compete with retained model pages.
- Any “PIWIS specialist,” “Porsche certified,” “Porsche-trained,” pricing, warranty, genuine-parts guarantee or “best” page without verification.
- Any case study without a real repair record and workshop images.
- Thin Arabic mirrors of new English pages.

## Controlled implementation batches

1. Phase 0: correct technical errors and remove/qualify unverified claims.
2. Phase 1: add knowledge-centre navigation, logical breadcrumbs and link modules without changing the hub's primary intent.
3. Phase 2: upgrade the three retained model pages; publish Macan, 718 and Taycan only after unique copy review.
4. Phase 3: publish 997, 991 and 992 after generation-specific technical review.
5. Later batches: commercial enhancements, then systems, symptoms and ownership guides in small reviewed groups.
6. Final pass: route manifest, sitemap, canonicals, schema, metadata uniqueness, Arabic policy, broken links and production prerender validation.
