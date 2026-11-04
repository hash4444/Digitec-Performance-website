/** Model-specific editorial guidance; package specifications remain in tuningCars.ts. */
export type TuningEditorialSection = 'platform' | 'selector' | 'engineering' | 'guide' | 'packages';

export interface TuningModelEditorial {
  concept: string;
  kicker: string;
  focusTitle: string;
  focusIntro: string;
  highlights: { label: string; body: string }[];
  guideTitle: string;
  guide: { title: string; body: string }[];
  sectionOrder: TuningEditorialSection[];
  caution?: string;
}

export const tuningModelEditorial: Record<string, TuningModelEditorial> = {
  'mercedes-amg-gt': {
    concept: 'Sports-Car Performance',
    kicker: 'M178 engineering · GT, GTS, GTC & GTR',
    focusTitle: 'Choose the M178 package for your AMG GT variant',
    focusIntro: 'An AMG GT ECU remap starts with the exact sports-car configuration. The C190/R190 records separate GT/GTS from GTC/GTR, with different reference outputs and early-stage calibrations. Higher stages combine turbocharger, fuel-system and double-clutch work, so the engine package and drivetrain scope belong in the same discussion.',
    highlights: [
      { label: 'Two distinct variant records', body: 'GT/GTS and GTC/GTR have separate stock references and Stage 1–3 outputs. Select the correct record before comparing a remap or hardware package.' },
      { label: 'Gearbox work enters at Stage 2', body: 'Both Stage 2 lists name transmission software optimization. Stage 3–5 name TCU software and GAD double-clutch reinforcement.' },
      { label: 'Turbo and engine progression', body: 'Stage 3 lists a Pulse Flow exhaust manifold, GAD turbocharger and increased-flow high-pressure fuel system. Stage 4 adds forged pistons; Stage 5 adds its specified cylinder-head components.' },
    ],
    guideTitle: 'Plan the sports-car build around its use',
    guide: [
      { title: 'Identify the variant first', body: 'Share the VIN, original output and existing software. The two-door M178 packages have their own scope; the X290 GT63 four-door uses a separate M177 record.' },
      { title: 'Compare the complete installation', body: 'Review the selected turbocharger, fuel system and clutch work together. Discuss cooling condition, intended road or circuit use and how the finished installation will be checked before choosing a higher stage.' },
      { title: 'Define an individual project separately', body: 'The VIP entries request VIN availability and list bespoke ECU calibration and dyno testing. Ask for the actual hardware and validation plan in the proposal; the displayed reference is not a measured result for your car.' },
    ],
    sectionOrder: ['platform', 'engineering', 'selector', 'packages', 'guide'],
  },
  'mercedes-amg-e63': {
    concept: 'Performance Engineering',
    kicker: 'W213 M177 · Powertrain integration',
    focusTitle: 'E63 ECU and CPC calibration as a coordinated package',
    focusIntro: 'The W213 E63 package record ties engine software to CPC work from Stage 1. Its later stages introduce different turbochargers, TCU software and NAG 3 reinforcement. Owners comparing an E63 S Stage 1 remap or a larger build should first match their original output, software and vehicle condition to this specific reference.',
    highlights: [
      { label: 'ECU and CPC scope', body: 'Stage 1–2 explicitly list central powertrain controller software alongside engine software. Confirm the fitted control units and software versions when requesting an E63 ECU remap.' },
      { label: 'Different turbocharger packages', body: 'Stage 3 specifies the GAD 177 55/68 turbocharger. Stage 4 specifies GAD 177 60/76R and an increased-flow high-pressure fuel system.' },
      { label: 'Transmission integration', body: 'Stage 3–4 list TCU software and Stage 1 NAG 3 reinforcement. Compare the stated engine torque with the reinforcement description when defining the final powertrain scope.' },
    ],
    guideTitle: 'Build an E63 engineering brief',
    guide: [
      { title: 'Start from the actual W213', body: 'Provide the VIN, model year, original output and modification history. The listed reference cannot establish compatibility from the E63 or E63 S badge alone.' },
      { title: 'Review heat and hardware together', body: 'Stage 2 introduces a sport-catalyst downpipe and ceramic heat coating. Ask the workshop to assess cooling-system condition and existing exhaust and fuel hardware before agreeing a turbo upgrade.' },
      { title: 'Agree how the package will be checked', body: 'Record the ECU, CPC and any TCU work in the proposal, together with the chosen hardware, fuel requirements and validation scope. A daily-use car and an extensive performance project may call for different priorities.' },
    ],
    sectionOrder: ['platform', 'engineering', 'selector', 'guide', 'packages'],
    caution: 'The inherited E63 Stage 4 record lists 1,200 Nm engine torque and describes NAG 3 reinforcement at approximately 1,150 Nm. These source values differ. Confirm the applicable reinforcement, torque limit and final drivetrain scope in writing before selecting this package.',
  },
  'mercedes-amg-g63': {
    concept: 'Power & Capability',
    kicker: 'G63 M177 · SUV performance planning',
    focusTitle: 'G63 tuning with the supporting scope in view',
    focusIntro: 'For a G63 tune in Dubai, compare more than a headline power figure. This M177 record progresses from engine and CPC software to exhaust optimization, upgraded turbochargers and transmission work. The G63 has its own package contents and prices, even where its reference output matches another M177 model.',
    highlights: [
      { label: 'Stage 1 engine and CPC work', body: 'The G63 Stage 1 package lists an airfilter, engine software optimization, V-Max deactivation and CPC software. Its listed scope provides the starting point for a G63 ECU remap enquiry.' },
      { label: 'G63-specific exhaust scope', body: 'Stage 2 adds a sport-catalyst downpipe, ceramic heat coating and exhaust-system optimization. That exhaust work remains part of the G63 Stage 3–4 lists.' },
      { label: 'Higher-stage drivetrain planning', body: 'Stage 3–4 include TCU software and NAG 3 reinforcement alongside their different GAD turbochargers. Stage 4 also names an increased-flow high-pressure fuel system.' },
    ],
    guideTitle: 'Choose the upgrade around your G63',
    guide: [
      { title: 'Match the M177 vehicle', body: 'Send the VIN, year, original specification and current modifications. The W463 identifier in this package source does not establish support for every G-Class engine or software version.' },
      { title: 'Discuss your regular driving', body: 'Explain how the SUV is used and what you want from the upgrade. Ask for an assessment of cooling condition, fuel requirements and existing drivetrain condition before choosing the installation scope.' },
      { title: 'Confirm the full higher-stage proposal', body: 'For a turbo upgrade or VIP project, request the selected components, transmission work, testing and final quotation together. VIP is an individual build with bespoke calibration and dyno testing in its source list.' },
    ],
    sectionOrder: ['selector', 'platform', 'engineering', 'packages', 'guide'],
    caution: 'The inherited G63 Stage 4 record lists 1,200 Nm engine torque alongside NAG 3 reinforcement described at approximately 1,150 Nm. The difference remains unresolved in the source. Obtain written confirmation of reinforcement suitability and the agreed torque scope.',
  },
  'mercedes-amg-gt63': {
    concept: 'Digital Performance Dashboard',
    kicker: 'X290 GT63 4-Door · M177 package data',
    focusTitle: 'Read the GT63 performance figures with their control-unit scope',
    focusIntro: 'Use the stage comparison to connect GT63 horsepower and torque to the actual listed work. This X290 four-door record has its own M177 reference, CPC software from Stage 1 and TCU work in Stage 3–4. A GT63 S Stage 1 or ECU-remap enquiry needs the original vehicle output and software details before the package can be matched.',
    highlights: [
      { label: 'Four-door model identification', body: 'The GT63 4-Door record belongs to X290 with M177. The M178 GT/GTS and GTC/GTR sports-car records have separate outputs and package contents.' },
      { label: 'Software and exhaust progression', body: 'Stage 1 lists engine and CPC software with an airfilter. Stage 2 introduces a sport-catalyst downpipe and ceramic heat coating.' },
      { label: 'Turbo, fuel and gearbox work', body: 'Stage 3–4 list different GAD turbochargers, TCU software and NAG 3 reinforcement. Stage 4 additionally lists increased-flow high-pressure fuel-system work.' },
    ],
    guideTitle: 'Turn a stage comparison into a GT63 proposal',
    guide: [
      { title: 'Check the vehicle behind the figures', body: 'Share the VIN, year, original output and any current tune. Ask the workshop to confirm the precise engine and powertrain configuration before applying the displayed reference.' },
      { title: 'Confirm the package dependencies', body: 'Review ECU, CPC and any TCU work with the selected hardware. For larger projects, ask how cooling condition, fuel supply and drivetrain suitability will be assessed and recorded.' },
      { title: 'Define custom work explicitly', body: 'The VIP listing is an individually scoped build priced on request. Its bespoke ECU calibration and dyno-testing items need a vehicle-specific hardware and validation plan.' },
    ],
    sectionOrder: ['selector', 'engineering', 'platform', 'packages', 'guide'],
    caution: 'The inherited GT63 Stage 4 record combines 1,200 Nm engine torque with a NAG 3 reinforcement description of approximately 1,150 Nm. Preserve this distinction when comparing the package and confirm the final reinforcement and torque limits in writing.',
  },
  'mercedes-amg-s65': {
    concept: 'V12 Luxury Engineering',
    kicker: 'M279 S65 · Torque and refinement',
    focusTitle: 'M279 V12 tuning with a clear drivetrain plan',
    focusIntro: 'An S65 ECU remap should be discussed alongside the way this car delivers torque and the supporting transmission work. The W222/W217 M279 record progresses through five stages, introducing PCM adjustment, TCU software, turbocharger upgrades and cooling hardware at specific points. Use those distinctions to plan the scope for your luxury touring car.',
    highlights: [
      { label: 'PCM and TCU at Stage 2', body: 'Stage 2 adds a sport-catalyst downpipe, PCM adjustment and TCU software to the listed engine-software and airfilter scope.' },
      { label: 'NAG2 reinforcement progression', body: 'Stage 3–4 describe Stage 1 NAG2 (7G-Tronic) reinforcement around 1,250 Nm. Stage 5 describes Stage 2 reinforcement around 1,400 Nm.' },
      { label: 'Cooling work appears explicitly', body: 'Stage 4 adds low-temperature-circuit optimization and a GAD airfilter box. Stage 5 also lists a high-performance intercooler.' },
    ],
    guideTitle: 'Set the priorities for your S65',
    guide: [
      { title: 'Confirm the M279 configuration', body: 'Provide the VIN, body variant and existing modifications. The S65 package record is separate from S63 and hybrid S-Class entries.' },
      { title: 'Discuss torque delivery and condition', body: 'Explain the balance of everyday driving and performance you want. Ask the workshop to review cooling, transmission and torque-converter condition before proposing a stage and any supporting work.' },
      { title: 'Compare the reinforcement specification', body: 'Review the exact NAG2 work and its stated capacity with the requested engine torque. Keep the selected cooling hardware, gearbox work and validation scope together in the written proposal.' },
    ],
    sectionOrder: ['engineering', 'platform', 'selector', 'guide', 'packages'],
    caution: 'The inherited S65 Stage 4 record lists 1,300 Nm engine torque while its Stage 1 NAG2 reinforcement is described at approximately 1,250 Nm. The source does not resolve that difference. Confirm the reinforcement specification and permitted torque in the vehicle-specific proposal.',
  },
  'mercedes-amg-c63': {
    concept: 'Stage Comparison & Upgrade Guide',
    kicker: 'W205 C63 · M177 upgrade decisions',
    focusTitle: 'Compare a C63 ECU remap with a complete hardware build',
    focusIntro: 'This C63 tuning guide covers the W205 M177 record. Stage 1 and Stage 2 have different software and exhaust scopes; later stages introduce turbochargers, fuel-system components and MCT reinforcement. Comparing the included work makes the difference between a C63 Stage 1 enquiry and a larger performance project easier to assess.',
    highlights: [
      { label: 'W205 compatibility first', body: 'The source uses a specific W205 stock reference. W204, W206 and different original-output C63 variants require their own confirmed package match.' },
      { label: 'ECU versus transmission work', body: 'Stage 1–2 list engine software but do not name TCU work. Stage 3–5 explicitly list TCU software and their specified MCT reinforcement.' },
      { label: 'Hardware changes between stages', body: 'Stage 2 adds downpipe and ceramic heat coating. Stage 3 introduces GAD 177 50/63 turbochargers; Stage 4–5 use different turbo specifications and more extensive supporting components.' },
    ],
    guideTitle: 'Choose your W205 upgrade path',
    guide: [
      { title: 'For a daily-use C63', body: 'Start by discussing your driving pattern, current condition and preferred response. Compare the exact Stage 1 and Stage 2 lists and ask which fuel and installation requirements apply to your vehicle.' },
      { title: 'For a larger performance project', body: 'Review turbo, fuel-system and engine-component work as one installation. Stage 5 adds forged pistons and other engine parts, plus Stage 2 MCT reinforcement with a wet clutch, so it needs a different project brief from an ECU remap.' },
      { title: 'Keep the existing modifications in view', body: 'Share details of any current tune, exhaust, intake or turbo work. Confirm what the selected package includes and any additional work found necessary after inspection before agreeing the quotation.' },
    ],
    sectionOrder: ['platform', 'selector', 'guide', 'engineering', 'packages'],
  },
  'mercedes-amg-glc63': {
    concept: 'Performance Upgrade Advisor',
    kicker: 'GLC63 M177 · Vehicle and gearbox matching',
    focusTitle: 'Choose a GLC63 stage with the right transmission scope',
    focusIntro: 'A GLC63 ECU remap enquiry needs the actual engine, original output and fitted gearbox. This M177 record includes five tuning stages, while its higher-stage price ranges distinguish seven-speed and nine-speed reinforcement packages. Use the guide to clarify those choices before comparing a final quotation.',
    highlights: [
      { label: 'Engine and platform check', body: 'The source identifies this M177 record as W253 and gives no year-to-gearbox mapping. Confirm the actual vehicle by VIN, especially when comparing a later powertrain or different body variant.' },
      { label: 'Stage 1 and Stage 2 scope', body: 'Stage 1 lists an airfilter and engine software with V-Max deactivation. Stage 2 adds a sport-catalyst downpipe and ceramic heat coating.' },
      { label: 'Transmission price alternatives', body: 'Stage 3–5 have separate seven-speed and nine-speed reinforcement prices. The included-work lists describe the nine-speed option; the lower price endpoint belongs to the seven-speed alternative.' },
    ],
    guideTitle: 'Three checks before selecting a GLC63 package',
    guide: [
      { title: 'Identify the fitted powertrain', body: 'Send the VIN, original output and software details. Ask the workshop to identify the gearbox before selecting either endpoint of a higher-stage price range.' },
      { title: 'Compare the full hardware step', body: 'Stage 3 adds turbocharger and TCU work. Stage 4 adds open airboxes, a Pulse Flow manifold and fuel-system work; Stage 5 also names forged pistons and further engine components. Compare these installations with your intended use and current condition.' },
      { title: 'Request the applicable total', body: 'Have the confirmed gearbox option, included components and any additional supporting work written into the quotation. Transmission-reinforcement capacity and tuned engine torque are separate specifications.' },
    ],
    sectionOrder: ['guide', 'platform', 'selector', 'engineering', 'packages'],
  },
  'aston-martin-db11': {
    concept: 'Grand Touring Performance',
    kicker: 'DB11 M177 V8 · Grand touring priorities',
    focusTitle: 'Plan a DB11 V8 remap around the complete touring car',
    focusIntro: 'The supported DB11 ECU tuning record is the M177 V8 configuration. Its five stages move from engine software to increasingly extensive turbo, fuel-system and engine-component work. Begin with the car’s identity, condition and intended use, then discuss how the chosen scope fits your expectations for everyday grand touring.',
    highlights: [
      { label: 'A specific V8 record', body: 'The dataset identifies M177 and gives no year range. Confirm the VIN and engine before applying its package figures; DB11 V12 tuning support is not established by this record.' },
      { label: 'Transmission software is listed', body: 'Stage 2 names transmission software optimization. Stage 3–5 retain TCU software in their public included-work lists.' },
      { label: 'Higher-stage supporting components', body: 'Stage 3 introduces the GAD 177 50/63 turbocharger. Stage 4 adds open airboxes, a Pulse Flow manifold and fuel-system work; Stage 5 also names forged pistons and other engine components.' },
    ],
    guideTitle: 'Shape the DB11 consultation',
    guide: [
      { title: 'Describe the result you want', body: 'Explain how you use the car and what you expect from a remap. Ask the workshop to review fuel requirements, current calibration and cooling condition as part of the proposed installation.' },
      { title: 'Confirm gearbox hardware individually', body: 'An inherited reinforcement description is withheld because its DB11 compatibility is unverified. Ask for the actual gearbox identification and any proposed reinforcement specification in writing.' },
      { title: 'Compare software and hardware projects', body: 'Review the Stage 1 scope separately from the later turbo and engine-component packages. The final proposal should identify the selected components, any necessary supporting work and the validation plan for your car.' },
    ],
    sectionOrder: ['engineering', 'platform', 'guide', 'selector', 'packages'],
    caution: 'The public DB11 packages retain their listed transmission-software work. The inherited MCT reinforcement descriptions remain withheld pending compatibility verification; any gearbox reinforcement requires a confirmed vehicle-specific specification.',
  },
  'lamborghini-urus': {
    concept: 'Super-SUV Performance',
    kicker: 'Lamborghini Urus · V8 twin-turbo stages',
    focusTitle: 'From an Urus ECU remap to turbo and intercooler upgrades',
    focusIntro: 'Looking for a Lambo tune in Dubai? The Lamborghini package record here covers the Urus V8 twin-turbo configuration. Its four stages distinguish engine software, exhaust hardware, upgraded turbochargers and an intercooler package. Match the actual Urus variant before choosing a stage, particularly where the model year or original powertrain differs from the listed reference.',
    highlights: [
      { label: 'Stage 1 is engine software', body: 'The Urus Stage 1 included-work list names engine software optimization only. The airfilter and sport-catalyst downpipe first appear in Stage 2.' },
      { label: 'Turbo upgrade with installation kit', body: 'Stage 3–4 list the GAD 825-60/71R ball-bearing Twin Scroll turbocharger and an installation kit containing cooling-water and oil lines.' },
      { label: 'Intercooler at Stage 4', body: 'Stage 4 adds a custom high-flow intercooler to its listed package. The source contains no TCU item and ends at Stage 4.' },
    ],
    guideTitle: 'Plan the Urus upgrade in the right order',
    guide: [
      { title: 'Confirm the exact Urus configuration', body: 'Provide the VIN, year, original output and current software. The source gives no engine code, year range or separate package for other Urus powertrain variants.' },
      { title: 'Assess the supporting installation', body: 'For Stage 3–4, discuss the turbo installation kit, oil and cooling connections, existing cooling-system condition and any required supporting work together. Confirm the listed intercooler when comparing Stage 4.' },
      { title: 'Keep gearbox enquiries vehicle-specific', body: 'If transmission tuning is part of your enquiry, ask the workshop to confirm whether it is available for your car. The four published Urus engine packages do not list TCU work.' },
    ],
    sectionOrder: ['platform', 'selector', 'engineering', 'packages', 'guide'],
  },
};
