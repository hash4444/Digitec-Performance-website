# Current tuning page audit

Audited deployed https://digitecme.com/tuning and repository baseline 546e02f on 2026-10-05 (Dubai). Repository initial HTML and parsed evidence are under baseline/. The live rendered DOM and mobile screenshot were captured through the browser; direct Node HTTP fetching was unavailable (live-response.json records that limitation). The deployed page was also inspected in a 390 × 844 mobile viewport.

## Metadata and headings

Title: Performance Tuning Dubai | ECU & Hardware Projects | Digi-Tec

Description: Vehicle-specific ECU tuning and supporting-hardware projects for performance cars at Digi-Tec in Al Quoz, Dubai.

Canonical: https://digitecme.com/tuning

Robots: index, follow, max-image-preview:large

Hreflang: en-AE: https://digitecme.com/tuning; ar-AE: https://digitecme.com/ar/tuning; x-default: https://digitecme.com/tuning

- h1: GAD Motors Performance Tuning
- h2: How should a performance tuning project be planned?
- h2: Performance Tuning and Supporting Hardware in Dubai
- h3: GAD Motors Performance Parts in Dubai
- h2: Mercedes-AMG ECU tuning and project planning
- h3: What do Stage 1 and Stage 2 mean?
- h3: GAD guidance and documented Mercedes projects
- h2: Performance tuning questions
- h3: How does Digi-Tec plan an ECU tuning project?
- h3: How much power can a tuned car gain?
- h3: Which cars can Digi-Tec assess for tuning?
- h2: Build Your Power
- h3: AMG GT / GTS
- h3: Stage 1 Package
- h2: GAD Tuning Near Me in Dubai
- h2: Tell us about your vehicle.
- h3: Share the details
- h3: Arrange the visit
- h3: Review the scope
- h2: Quick Links
- h2: Popular Services
- h2: Contact

## Copy, services and GAD

Intro describes vehicle condition, fuel, use and supporting hardware. Hero H1 leads with GAD and omits Dubai. Main copy lists Mercedes, Porsche, Lamborghini, Aston Martin and broad other platforms. The visible and JSON-LD FAQ incorrectly adds BMW and Audi. Performance service schema lists ECU, Stage 1/2, turbo, intake, exhaust and AMG upgrades. GAD outbound link and VRX/build articles exist, but current page does not explain a documented relationship. GAD’s own homepage lists DIGI-TEC under UAE/Al Quoz contacts; precise relationship evidence is in gad-motors-evidence.md.

## Configurator, data and prices

The actual rendering consumes src/data/tuningCars.ts directly: 16 vehicles (14 Mercedes, Aston Martin DB11, Lamborghini Urus), 67 tuning packages plus 16 stock references. Porsche is absent in this dataset. The user confirmed a separate current Porsche model list exists and will provide it later: support is confirmed, model/engine/stage/price details remain pending. No BMW/Audi entries.

Source stores stock/tuned HP, torque Nm, 0–100 figures, mods, EUR price strings and estimated time. Some model-generation clues exist only in source comments; no year ranges. Required/optional hardware distinctions are not separately modeled. Generated power curves are illustrative calculations, not measured dyno records; they are not used as new SEO evidence.

Initial HTML exposes names through images but detailed text only for selected AMG GT/GTS Stage 1: 522 stock HP; 605 tuned HP; +83 HP; €2,721; 1–2 days; Airfilter, engine software optimization and V-Max deactivation. Torque exists in data but is not rendered by the current selected result. Other packages require selection. Stage labels include 1–5 and VIP where available. No per-stage or query-state URLs.

## Initial HTML, no JavaScript and mobile

The site prerenders real React HTML. Schema and FAQ are present without JavaScript, but only one selected configuration is initially included. Several Framer Motion elements begin with opacity zero, so the selected name/package and output can remain invisible without hydration. A static semantic package comparison is needed for all configurations.

Live mobile observation (390 × 844): responsive hero/menu/CTA readable; document width 382px, no page-level overflow. Baseline configurator has 0 semantic package comparison rows. Car choices are primarily images and numbered dots; keyboard labels and selected states can be clearer. Arabic localizeTuningMod ignores the real source modification and substitutes positional generic text, causing incorrect package contents.

## Links and CTA

43 total outgoing anchors, including navigation/footer. 32 contextual incoming link instances to tuning owners were found across the built routes after removing header/footer. Exact source/target/anchor register is in baseline/tuning-page-evidence.json.

Outgoing contextual destinations: VRX; Mercedes diagnostics; GAD guide; AMG GT guide/build; G63 conversion; GAD Motors; WhatsApp. CTA requests a tuning consultation at +971 4 340 2223, with a generic final workshop appointment CTA. VIP consultation button has no destination. There are no commercial tuning-model pages yet.

## Required changes

Remove BMW/Audi tuning support statements in visible and schema copy. Keep generic tuning, ECU/remap, chip terminology, stages, GAD and general cost on /tuning. Publish native browsable model/package tables and factual work lists from the same dataset; retain selector UX and currency qualifiers. Create only model pages justified by exceptional package depth in this workbook window, consolidate variants, and retain informational/service owners. Porsche configuration expansion awaits the separate list.
