import type { ServiceData } from './services';

// Service availability confirmed by the business owner on 16 September 2026.
// Specific systems, parts, installation scope and pricing still require assessment.
const electrical = { label: 'Car electrical diagnosis and wiring repair', path: '/services/auto-electrical-repair-dubai' };
const cue = { label: 'Cadillac CUE touchscreen repair', path: '/services/cadillac-cue-screen-repair-dubai' };
const headUnit = { label: 'Head-unit and Mercedes COMAND repair', path: '/services/head-unit-repair-dubai' };
const audio = { label: 'Mercedes stereo and audio upgrades', path: '/services/mercedes-audio-upgrade-dubai' };
const camera = { label: 'Bentley reverse-camera installation and diagnosis', path: '/brands/bentley-service-dubai/electrical-repair#reverse-camera' };
export const electronicsLinks = [cue, headUnit, audio, camera];

export const electronicsServices: ServiceData[] = [
  {
    slug: 'cadillac-cue-screen-repair-dubai',
    metaTitle: 'Cadillac CUE Screen Repair & Replacement Dubai | DIGI-TEC',
    metaDescription: 'Cadillac CUE touchscreen repair and replacement in Al Quoz, Dubai. Unresponsive touch, ghost touches and display faults assessed before parts are selected.',
    title: 'Cadillac CUE Screen Repair & Replacement in Dubai',
    description: 'Restore usable touchscreen controls with a repair selected from the fault and the fitted CUE system.',
    image: '/images/paint-correction/workshop-floor-960.webp',
    imageAlt: 'DIGI-TEC Performance Center workshop in Dubai',
    category: 'Diagnostics & Electrical',
    seoKeyword: 'Cadillac CUE Screen Repair Dubai',
    intro: 'DIGI-TEC provides Cadillac CUE screen repair and replacement at its independent workshop in Al Quoz, Dubai. An unresponsive touchscreen, unintended touches or a damaged display can make audio, navigation and other fitted controls difficult to use. We identify the vehicle and installed system, assess the complaint and explain whether the touch layer, display, wiring or another component needs attention before a replacement is agreed.',
    whyImportant: 'The touchscreen is one part of the infotainment system. A visible image with no touch response differs from a completely blank display, loss of sound or a unit that repeatedly restarts. Replacing the screen does not resolve every power, communication, software or head-unit fault.',
    whyChoose: 'Bring a description of the fault, the model year and any previous screen or infotainment work. DIGI-TEC separates diagnosis, compatible parts, labour and any required setup in the proposed scope. Parts availability and completion timing are confirmed for the specific unit.',
    includes: ['Touch-response and display assessment', 'Screen and digitizer repair or replacement where the findings support it', 'Relevant power, connector and system checks', 'Compatibility review before ordering a replacement', 'Touch and related function checks after the agreed work'],
    modelsSection: {
      heading: 'Cadillac XTS, SRX and other CUE-equipped models',
      intro: 'For a Cadillac XTS touchscreen replacement or Cadillac SRX screen replacement enquiry, send the year and a clear photograph of the installed screen. Similar-looking units can differ by generation and specification.',
      models: ['XTS: identify the installed screen, unit and model year', 'SRX: confirm the CUE version and existing equipment', 'Other Cadillac models: confirm that CUE is fitted and review component compatibility'],
      outro: 'Model names alone do not identify the required part. A replacement or upgrade fitted previously also changes what needs to be checked.',
    },
    servicesIntro: { heading: 'Symptoms to describe when booking', text: 'Tell us whether the screen ignores touches, responds in the wrong area, makes selections by itself, has visible cracks, loses its image or restarts. Mention whether sound and physical buttons still work and whether the fault changes after the vehicle warms up.' },
    extraSections: [
      { heading: 'Screen, digitizer or head unit?', text: 'The digitizer detects touch; the display produces the image. A touch fault with a clear picture may need a different repair from a display fault or an infotainment unit that has no power. Inspection establishes the affected part and whether related wiring or controls need further testing.' },
      { heading: 'Diagnosis before repair or replacement', items: ['Record the symptom and check the fitted unit and previous work.', 'Assess screen condition, touch response and related system functions.', 'Explain supported repair versus replacement, parts and any further diagnosis.', 'After the agreed repair, check response across the screen and the relevant audio and vehicle controls.'] },
      { heading: 'What affects the quote?', text: 'The installed generation, damaged component, part compatibility, access and any required setup determine the estimate. Share photographs and the model year for an initial discussion; an image alone cannot diagnose the full system.' },
    ],
    faqs: [
      { question: 'Will a new CUE screen fix ghost touches?', answer: 'It may be appropriate when the touch layer is faulty, but unwanted inputs need assessment first. The repair recommendation follows the screen and system checks.' },
      { question: 'Can a blank CUE screen be repaired?', answer: 'A blank screen can involve the display, power supply, wiring or head unit. Diagnosis determines whether a screen repair, replacement or another repair is appropriate.' },
      { question: 'Do you replace Cadillac XTS and SRX touchscreens?', answer: 'DIGI-TEC provides CUE screen replacement. For XTS and SRX enquiries, the model year, fitted system, compatible part and availability are confirmed before the work is accepted.' },
      { question: 'Will my existing controls still work after replacement?', answer: 'The proposed part and repair scope are checked against the installed system. Relevant touch, audio and vehicle-control functions are tested after the agreed work; compatibility is confirmed before parts are ordered.' },
    ],
    localIntent: 'Arrange Cadillac touchscreen diagnosis at DIGI-TEC in Al Quoz Industrial Area 3, Dubai. Send the model, year, screen photograph and symptoms to discuss an appointment.',
    details: 'CUE touch and display assessment with compatible repair or replacement following diagnosis.',
    ctaLabel: 'Request a CUE Screen Assessment',
    quoteGuidance: 'Send your Cadillac model and year, a screen photo and whether touch, picture, sound or several functions are affected. We will confirm the initial inspection and the information needed for parts matching.',
    relatedServiceLinks: [electrical, headUnit, { label: 'Cadillac service and diagnostics', path: '/brands/cadillac-service-dubai' }],
  },
  {
    slug: 'head-unit-repair-dubai',
    metaTitle: 'Head Unit & Mercedes COMAND Repair Dubai | DIGI-TEC',
    metaDescription: 'Head-unit and Mercedes COMAND fault diagnosis in Al Quoz, Dubai. Screen, sound, restarts and connectivity problems checked before repair or replacement.',
    title: 'Head Unit & Mercedes COMAND Repair in Dubai',
    description: 'Infotainment fault finding for screens, audio and connectivity, with repair options matched to the installed system.',
    image: '/images/paint-correction/workshop-floor-960.webp',
    imageAlt: 'DIGI-TEC Performance Center workshop in Dubai',
    category: 'Diagnostics & Electrical',
    seoKeyword: 'Head Unit Repair Dubai',
    intro: 'A head unit that restarts, loses sound or stops responding needs diagnosis before it is replaced. DIGI-TEC assesses infotainment faults in Al Quoz, including supported Mercedes COMAND and MBUX systems. Power supply, connections, amplifiers, displays and communication faults can produce similar symptoms, so the fitted equipment and reported problem guide the tests.',
    whyImportant: 'A working screen does not prove that the amplifier or speakers are functioning, and a blank screen does not by itself establish that the head unit has failed. Replacing a unit without identifying the cause can leave the original fault unresolved.',
    whyChoose: 'We review the original system, symptoms and any previous retrofit or repair before discussing compatible diagnosis and component repair. A replacement unit may need matching hardware, coding or setup; support is confirmed for the exact vehicle before a part is purchased.',
    includes: ['Installed infotainment system identification', 'Screen, audio and control fault assessment', 'Relevant supply, wiring and communication checks', 'Head-unit or amplifier repair options where supported', 'Replacement compatibility and required setup review', 'Verification of the functions covered by the agreed work'],
    extraSections: [
      { heading: 'COMAND, “command” and MBUX', text: 'Owners sometimes describe the Mercedes unit as a “command unit”. COMAND is the name used for certain Mercedes infotainment generations; MBUX is a different system family. Neither term applies to every model year. Send the model, year and a dashboard photograph so the installed generation can be identified.' },
      { heading: 'Describe the symptom, not just the fault code', items: ['Blank, flickering or frozen display; note whether sound remains.', 'No audio, sound on only some channels or intermittent output.', 'Repeated restarts, a unit that fails to boot or unresponsive controls.', 'Bluetooth or other fitted connectivity functions that disconnect or fail to pair.', 'A problem that began after battery, wiring or aftermarket equipment work.'] },
      { heading: 'How repair decisions are made', text: 'First confirm the fault and the equipment fitted. Relevant power, ground, connector and compatible system checks help separate an external fault from an internal unit problem. We then explain further testing, supported component repair or replacement and any separate setup requirements. Clearing codes or updating software is not a universal repair.' },
      { heading: 'Repairing a fault or planning an upgrade?', text: 'A fault assessment aims to restore the intended function. A stereo or sound-system upgrade changes the installed equipment and needs its own compatibility and installation plan. Describe the result you want so the quotation covers the right work.' },
    ],
    faqs: [
      { question: 'Can every Mercedes COMAND unit be repaired?', answer: 'No blanket repair coverage is promised. The generation, part number, damage, test findings and parts availability determine the available repair or replacement route.' },
      { question: 'Can I bring a used replacement head unit?', answer: 'Discuss it before buying. Matching a connector or screen size is not sufficient; hardware, software, vehicle integration and any required access or coding must be checked.' },
      { question: 'Does no sound mean the head unit has failed?', answer: 'No. An amplifier, speaker circuit, supply or communication fault can also affect audio. The inspection follows the symptom before a component is selected.' },
      { question: 'Do you assess head units from other vehicle brands?', answer: 'Send the make, model, year and fitted system details. Diagnostic coverage and the available repair scope are confirmed for that unit. Cadillac CUE touchscreen enquiries have a dedicated assessment page.' },
    ],
    localIntent: 'Book an infotainment assessment at the DIGI-TEC workshop in Al Quoz Industrial Area 3, Dubai. Bring the fault history and details of any previous repair or retrofit.',
    details: 'Head-unit, COMAND and supported infotainment diagnosis with repair or replacement based on findings.',
    ctaLabel: 'Discuss a Head-Unit Fault',
    quoteGuidance: 'Send the make, model, year, dashboard photo and the affected functions. Include whether the unit starts, whether sound works and any recent electrical or infotainment work.',
    relatedServiceLinks: [electrical, audio, cue, { label: 'Mercedes electrical repair', path: '/services/mercedes-electrical-repair-dubai' }, { label: 'Mercedes service and maintenance', path: '/brands/mercedes-benz-service-dubai' }],
  },
  {
    slug: 'mercedes-audio-upgrade-dubai',
    metaTitle: 'Mercedes Stereo & Audio Upgrade Dubai | DIGI-TEC',
    metaDescription: 'Mercedes stereo and sound-system upgrades in Dubai, including E-Class enquiries. Review fitted equipment, speaker and amplifier options and vehicle integration.',
    title: 'Mercedes Stereo & Audio Upgrades in Dubai',
    description: 'Plan a sound-system upgrade around your listening priorities, the equipment fitted and the controls you want to retain.',
    image: '/images/paint-correction/workshop-floor-960.webp',
    imageAlt: 'DIGI-TEC Performance Center workshop in Dubai',
    category: 'Diagnostics & Electrical',
    seoKeyword: 'Mercedes Stereo Upgrade Dubai',
    intro: 'DIGI-TEC provides Mercedes stereo and audio upgrades in Al Quoz, Dubai. Start with what you want to improve: clarity, output, bass response or the overall listening experience. The existing head unit, amplifier, speakers, wiring and vehicle specification determine the compatible options and installation scope. We agree the equipment and integration requirements before work begins.',
    whyImportant: 'Mercedes audio equipment varies across models, generations and option packages. A component that fits physically may not integrate with the factory amplifier, controls or signal path. An upgrade plan needs to account for the complete fitted system, not only the replacement speaker or screen.',
    whyChoose: 'The enquiry starts with the model year, installed equipment and intended result. DIGI-TEC reviews the proposed components, wiring and integration requirements and explains what is included in the quote. Specific product brands, power ratings, features and retention of factory functions are confirmed for the selected system.',
    includes: ['Review of the installed stereo and listening priorities', 'Compatible speaker, amplifier and system options', 'Integration and wiring assessment for the proposed equipment', 'Installation of the agreed compatible upgrade', 'Audio and relevant vehicle-control checks on completion'],
    modelsSection: {
      heading: 'Mercedes E-Class audio upgrade planning',
      intro: 'An E-Class badge does not identify its audio system. The production year, body style, factory options and previous changes matter when choosing a sound-system upgrade.',
      models: ['E-Class: confirm generation, current display and factory audio package', 'C-Class and S-Class: assess fitted equipment and proposed changes individually', 'Other Mercedes models: confirm system compatibility and supported scope before booking'],
      outro: 'Share a dashboard photo and any amplifier or option information you already have. A system inspection may be needed to complete the quote.',
    },
    extraSections: [
      { heading: 'Choose the scope around the result', items: ['Clarity or distortion concerns: first distinguish a fault from the limits of functioning equipment.', 'Speaker changes: review fit, mounting, signal and compatibility with the existing amplifier.', 'Amplifier or wider system changes: assess power supply, signal integration, wiring and adjustment.', 'Head-unit or feature changes: confirm vehicle interfaces and the factory functions to retain.'] },
      { heading: 'Factory controls and integration', text: 'Discuss steering-wheel controls, parking sounds, calls and other functions you rely on before equipment is selected. Retention depends on the original system and compatible interfaces. The quote should identify any limitations and any required setup rather than assume every function transfers automatically.' },
      { heading: 'From enquiry to handover', text: 'We identify the existing system, agree the listening goals and compatible equipment, confirm the installation scope, then check the agreed audio and vehicle functions after installation. If the car already has no sound or repeated infotainment resets, fault diagnosis comes first.' },
      { heading: 'What determines upgrade cost?', text: 'The chosen equipment, installation access, signal and power integration, wiring, setup and any work to resolve existing faults determine the estimate. There is no single package that suits every Mercedes or E-Class.' },
    ],
    faqs: [
      { question: 'Can I upgrade the sound without replacing the factory screen?', answer: 'That can be an option depending on the installed system and desired change. The speaker, amplifier and signal-path compatibility are reviewed before the scope is confirmed.' },
      { question: 'Do you offer Mercedes E-Class sound-system upgrades?', answer: 'Yes. Send the year, body style, fitted audio equipment and what you want to improve. Components and integration are selected for that vehicle rather than for the E-Class name alone.' },
      { question: 'Will an audio upgrade fix a faulty head unit?', answer: 'Not necessarily. No sound, resets or a blank display need fault diagnosis. Repair and upgrade requirements are quoted separately where both are needed.' },
      { question: 'Will all factory functions remain available?', answer: 'The functions to retain are agreed before work. Compatibility depends on the original equipment, selected components and available interfaces; limitations are explained before installation.' },
    ],
    localIntent: 'Discuss a Mercedes sound-system upgrade at DIGI-TEC in Al Quoz Industrial Area 3, Dubai. Share the vehicle details, current equipment and listening priorities to arrange an assessment.',
    details: 'Mercedes stereo and audio upgrade planning, compatible installation and function checks.',
    ctaLabel: 'Discuss a Mercedes Audio Upgrade',
    quoteGuidance: 'Send the model and year, a dashboard photo, current audio package if known and the change you want. Mention existing faults and the factory controls or features you need to retain.',
    relatedServiceLinks: [headUnit, { label: 'Mercedes electrical diagnosis', path: '/services/mercedes-electrical-repair-dubai' }, { label: 'Mercedes service in Al Quoz', path: '/brands/mercedes-benz-service-dubai' }, electrical],
  },
];
