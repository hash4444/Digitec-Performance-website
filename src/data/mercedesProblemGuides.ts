import { MERCEDES_HUB_PATH, MERCEDES_SERVICE_LINKS } from '@/data/mercedesModelPages';

export interface MercedesGuideSection {
  title: string;
  paragraphs: string[];
  points?: string[];
}

export interface MercedesProblemGuide {
  slug: string;
  path: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  urgent: boolean;
  sections: MercedesGuideSection[];
  driveAdvice: string;
  diagnosticSteps: string[];
  faultCodeNote: string;
  professionalHelp: string;
  relatedServices: { label: string; path: string; description: string }[];
  relatedModels: { label: string; path: string }[];
  faqs: { question: string; answer: string }[];
}

export const MERCEDES_PROBLEMS_PATH = '/mercedes/problems';
export const MERCEDES_GUIDE_PUBLISHED = '2026-08-31';

const guidePath = (slug: string) => `${MERCEDES_PROBLEMS_PATH}/${slug}`;

const service = (label: string, path: string, description: string) => ({ label, path, description });

export const mercedesProblemGuides: MercedesProblemGuide[] = [
  {
    slug: 'airmatic-malfunction',
    path: guidePath('airmatic-malfunction'),
    title: 'Mercedes AIRMATIC Malfunction: Meaning, Causes and Diagnosis',
    h1: 'Mercedes AIRMATIC Malfunction',
    metaTitle: 'Mercedes AIRMATIC Malfunction | Causes & Diagnosis',
    metaDescription: 'What a Mercedes AIRMATIC malfunction means, possible air-spring, compressor, valve, sensor and voltage causes, and how the fault should be diagnosed.',
    summary: 'An AIRMATIC warning means the suspension control system has detected a condition outside its expected range. It does not identify which component failed, and it does not automatically mean the compressor or all four air struts need replacement.',
    urgent: true,
    sections: [
      {
        title: 'What the warning can feel like',
        paragraphs: ['The vehicle may stay at normal height, rise slowly, sit low at one corner, feel unusually firm, restrict drive modes or display a message such as “AIRMATIC malfunction”, “Vehicle rising” or “Stop vehicle — vehicle too low”. The exact wording and behaviour matter.'],
        points: ['One corner remains low after start-up', 'The whole car is low or takes longer than usual to rise', 'The compressor runs repeatedly or sounds different', 'Ride quality becomes very firm after a control fault', 'The warning appears only after parking, heat soak or a long drive'],
      },
      {
        title: 'Potential causes',
        paragraphs: ['AIRMATIC is a pneumatic and electronic system. The same dashboard message can be produced by loss of air, inability to create pressure, implausible height data, voltage supply or module communication.'],
        points: ['Air-spring or air-strut leakage', 'Line, fitting or reservoir leakage', 'Compressor wear, thermal cut-out, relay, fuse or power-supply fault', 'Valve-block leakage or sticking', 'Ride-height sensor, linkage or calibration problem', 'Wiring, connector, low-voltage or control-module communication fault'],
      },
      {
        title: 'AIRMATIC is not the same on every Mercedes',
        paragraphs: ['S-Class, E-Class, GLE and GLS applications differ by chassis and equipment. Some vehicles use conventional AIRMATIC, some combine air springs with E-ACTIVE BODY CONTROL, and other Mercedes models—such as the G63 and C63—use coil springs rather than AIRMATIC. The fitted system must be identified first.'],
      },
      {
        title: 'Warning signs that change the urgency',
        paragraphs: ['A vehicle that is visibly too low, has tyre-to-body contact, will not rise, rides on its bump stops or shows a red stop warning should not be driven normally. A mild warning with normal height may still need prompt diagnosis because repeated compressor operation can add a second fault.'],
      },
    ],
    driveAdvice: 'Stop if the vehicle is very low, one tyre is close to the body, steering or braking is affected, or the display instructs you to stop. If height and control remain normal, avoid heavy loads and long trips and arrange diagnosis soon; do not keep cycling the ignition in an attempt to force the compressor to run.',
    diagnosticSteps: [
      'Record the exact warning text, vehicle height, affected corner and whether the fault is cold, hot or time-dependent.',
      'Identify the chassis and fitted suspension system from vehicle data and a physical check.',
      'Scan the suspension and related voltage/network modules without clearing the stored context.',
      'Compare commanded and actual ride heights and inspect sensor/linkage condition.',
      'Test for external leakage at air springs, lines, fittings, reservoir and valve paths.',
      'Measure pressure build, compressor current/run time and power supply as applicable.',
      'Confirm calibration only after the underlying mechanical, pneumatic and electrical condition is sound.',
    ],
    faultCodeNote: 'A code for pressure build-up, level control or a specific corner describes what the control unit observed. It does not by itself prove that the compressor, strut or sensor is defective. For example, a compressor can run too long because a leaking air spring is demanding more air than the system can retain.',
    professionalHelp: 'Professional diagnosis is appropriate when the warning repeats, the car changes height, the compressor runs often, the ride becomes harsh or the system will not complete a height change. A workshop should be able to explain the leak, pressure, sensor or supply evidence behind the repair recommendation.',
    relatedServices: [service('Mercedes suspension repair in Dubai', MERCEDES_SERVICE_LINKS.suspension, 'Commercial inspection and repair information for AIRMATIC, ABC and supported active-suspension systems.')],
    relatedModels: [
      { label: 'Mercedes S-Class service guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
      { label: 'Mercedes E-Class service guide', path: '/blog/mercedes-e-class-service-dubai-guide' },
      { label: 'Mercedes GLE service guide', path: '/mercedes/models/gle-service-repair-dubai' },
      { label: 'Mercedes GLS service guide', path: '/mercedes/models/gls-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Does an AIRMATIC malfunction always mean the compressor has failed?', answer: 'No. A leak, valve block, height sensor, wiring, relay, voltage or control fault can prevent correct pressure or height control. Pressure, current, leak and scan evidence should be compared.' },
      { question: 'Can I reset an AIRMATIC warning by disconnecting the battery?', answer: 'A reset may hide the message temporarily and erase useful fault context. It does not repair a leak, pressure or electrical problem and can create additional initialization issues.' },
      { question: 'Does my G63 have AIRMATIC?', answer: 'No. Mercedes-AMG G63 models use coil springs. A G63 ride-control warning belongs to its adaptive damping or chassis system, not an AIRMATIC air leak.' },
    ],
  },
  {
    slug: 'suspension-dropping-overnight',
    path: guidePath('suspension-dropping-overnight'),
    title: 'Mercedes Suspension Dropping Overnight: What It Usually Means',
    h1: 'Mercedes Suspension Dropping Overnight',
    metaTitle: 'Mercedes Suspension Dropping Overnight | Leak Guide',
    metaDescription: 'Why a Mercedes with air suspension may drop overnight, how corner and full-vehicle height loss differ, and how leaks should be isolated before repair.',
    summary: 'A Mercedes that sits lower after several hours is showing a height-retention symptom. On an air-equipped model, the pattern—one corner, one axle or the whole vehicle—helps direct leak testing, but the parked position alone does not prove which component is leaking.',
    urgent: false,
    sections: [
      {
        title: 'What the symptom looks like',
        paragraphs: ['Owners often notice a wheel arch closer to the tyre in the morning, a low rear axle after the vehicle has carried passengers, or a car that rises after start-up and then repeats the same drop the next day. Photographing all four corners on level ground can preserve useful evidence.'],
        points: ['One corner drops while the other three remain stable', 'Both rear corners settle', 'The entire vehicle settles evenly', 'Height changes only after a particular temperature or parking duration', 'The compressor runs for a long time on the next start'],
      },
      {
        title: 'Potential leak paths',
        paragraphs: ['Air can escape through the flexible air spring, an air line or fitting, the valve block or another sealed pneumatic path. A control valve may also allow air to move between parts of the system. Temperature changes alter air pressure, so repeatable measured height is more useful than a single glance.'],
        points: ['Porous or cracked air-spring bellows', 'Strut or spring seal leakage', 'Line or fitting damage', 'Valve-block internal leakage', 'Reservoir or supply-line leakage', 'Incorrect height information or commanded venting that mimics a leak'],
      },
      {
        title: 'Why the compressor may be a consequence',
        paragraphs: ['The compressor replaces air lost by the system. When a leak is present it may run longer and hotter, so an eventually weak compressor can be secondary damage rather than the original cause. Replacing only the compressor can restore lifting temporarily while leaving the leak unchanged.'],
      },
      {
        title: 'Models and systems differ',
        paragraphs: ['S-Class, E-Class, GLE and GLS vehicles may use different AIRMATIC generations, and selected later SUVs combine air springs with E-ACTIVE BODY CONTROL. G-Class/G63 and C-Class/C63 vehicles generally use coil springs, so “dropping overnight” should first be confirmed as an actual air-suspension application.'],
      },
    ],
    driveAdvice: 'If the vehicle rises to normal height quickly and no tyre contact or red warning is present, a short careful trip to diagnosis may be possible. Do not drive if it remains very low, rises unevenly, contacts the body, rides harshly on its stops or displays a stop instruction.',
    diagnosticSteps: [
      'Park on level ground, record ambient conditions and measure each wheel-centre-to-arch height.',
      'Confirm whether the control system was left active and whether the vehicle commanded a level change.',
      'Repeat measurements after a defined period to establish the pattern.',
      'Scan height values and related suspension faults without clearing them.',
      'Leak-test the affected spring/strut, lines, fittings and valve path.',
      'Check compressor recovery only after quantifying the leak demand.',
      'Verify normal height retention and compressor operation after repair.',
    ],
    faultCodeNote: 'An overnight leak may leave no decisive fault code because the vehicle is parked and the pressure loss is physical. Conversely, a compressor run-time or level-control code can be the result of the leak rather than proof that the compressor started the problem.',
    professionalHelp: 'Arrange diagnosis when the drop repeats, the compressor runs longer than before or ride height affects driving. Ask for measured height or leak evidence and confirmation of whether the compressor was damaged by the original leak.',
    relatedServices: [service('Mercedes suspension repair in Dubai', MERCEDES_SERVICE_LINKS.suspension, 'Commercial service information for air-spring, compressor, valve and height-control diagnosis.')],
    relatedModels: [
      { label: 'Mercedes S-Class service guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
      { label: 'Mercedes-AMG E63 service guide', path: '/mercedes/models/e63-service-repair-dubai' },
      { label: 'Mercedes GLE service guide', path: '/mercedes/models/gle-service-repair-dubai' },
      { label: 'Mercedes GLS service guide', path: '/mercedes/models/gls-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Is a small overnight height change normal?', answer: 'Temperature and control activity can change height slightly. A repeatable, visible drop at one corner or axle is still useful evidence and should be measured on level ground.' },
      { question: 'Should the compressor be replaced when the car rises slowly?', answer: 'Not until leakage, supply voltage, relay/control and pressure output are checked. A leak can make a healthy compressor appear slow by increasing the volume it must replace.' },
      { question: 'Can only one air spring be repaired?', answer: 'Repair scope depends on the diagnosed leak, condition of the remaining components, parts strategy and owner approval. Diagnosis should identify the failed path before a pair or full system is proposed.' },
    ],
  },
  {
    slug: 'gearbox-jerking',
    path: guidePath('gearbox-jerking'),
    title: 'Mercedes Gearbox Jerking When Changing Gears: Diagnostic Guide',
    h1: 'Mercedes Gearbox Jerking When Changing Gears',
    metaTitle: 'Mercedes Gearbox Jerking | 7G, 9G & AMG Guide',
    metaDescription: 'Why a Mercedes gearbox may jerk when changing gears, differences across 7G-TRONIC, 9G-TRONIC and AMG transmissions, and how to diagnose it.',
    summary: '“Jerking” can mean a sharp upshift, a thump into Drive, a bump during coast-down or a shudder under light acceleration. Those are different events. Identifying the gear, temperature, load and direction of torque is more useful than replacing parts from a code list.',
    urgent: false,
    sections: [
      {
        title: 'What the symptom may feel like',
        paragraphs: ['A useful description separates engagement from an actual gear change. Note whether the car jerks selecting Drive or Reverse, during a specific upshift, when slowing to a stop, or when the torque converter or start-off clutch is applying.'],
        points: ['Cold 1–2 or 2–3 shift is firmer than later shifts', 'Thump when selecting Drive or Reverse', 'Bump during a downshift while braking', 'Repeated shudder at steady light throttle', 'Harsh shift only in Sport/AMG mode or only after a long drive'],
      },
      {
        title: 'Potential causes beyond the gearbox',
        paragraphs: ['The transmission reacts to requested engine torque and is mounted in a driveline. An engine misfire, unstable torque signal, worn mount, propshaft or differential play can be felt at the same moment as a shift.'],
        points: ['Fluid level, condition or incorrect specification', 'Adaptation or software/control issue', 'Valve-body, solenoid or mechatronic hydraulic fault', 'Speed-sensor or conductor-plate evidence on relevant 7G applications', 'Internal clutch or mechanical wear', 'Engine/gearbox mounts, driveline play or engine torque irregularity'],
      },
      {
        title: '7G-TRONIC, 9G-TRONIC and AMG differences',
        paragraphs: ['7G-TRONIC (including 722.9 applications) and 9G-TRONIC (725.0 family) use different hardware, fluids and control strategies. AMG SPEEDSHIFT can be a torque-converter automatic, an MCT with a wet start-off clutch or a dual-clutch unit depending on model. The AMG badge does not identify one transmission.'],
      },
      {
        title: 'Warning signs that need faster action',
        paragraphs: ['Stop hard driving if jerking is joined by slipping, delayed engagement, a transmission warning, limp mode, fluid leakage, burning smell or repeated inability to select a gear. A sudden severe bang after impact or with driveline noise also needs prompt inspection.'],
      },
    ],
    driveAdvice: 'Mild, consistent harshness with normal engagement may allow a careful trip for diagnosis. Avoid full-throttle shifts, towing and repeated testing. Do not continue if gears slip, a red warning appears, the vehicle loses drive, fluid is leaking or engagement is dangerously delayed.',
    diagnosticSteps: [
      'Define the event: selection, upshift, downshift, converter/start-off clutch or steady-speed shudder.',
      'Identify the exact transmission and review service/repair history.',
      'Scan engine and transmission modules and retain freeze-frame data.',
      'Road-test with fluid temperature, requested/actual gear, speeds and slip data where supported.',
      'Inspect mounts, driveline play, leaks, fluid condition and tyre consistency on all-wheel-drive models.',
      'Test electrical or hydraulic suspects indicated by the evidence.',
      'Confirm the result with a controlled post-repair road test and any required adaptation procedure.',
    ],
    faultCodeNote: 'A solenoid, ratio or speed-sensor code identifies a circuit or measured condition. It does not prove that the named solenoid, valve body or complete gearbox is the root cause. Wiring, fluid/pressure, mechanical slip and control inputs must be checked against the code conditions.',
    professionalHelp: 'Professional diagnosis is appropriate when the symptom repeats, worsens hot, affects engagement or appears with a warning. Ask the workshop to identify the transmission and explain whether the evidence points to maintenance, mounts/driveline, electrical control, mechatronics or internal repair.',
    relatedServices: [service('Mercedes transmission repair in Dubai', MERCEDES_SERVICE_LINKS.transmission, 'Commercial service details for 7G-TRONIC, 9G-TRONIC and compatible AMG transmission diagnosis.')],
    relatedModels: [
      { label: 'Mercedes C-Class service guide', path: '/blog/mercedes-c-class-service-dubai-guide' },
      { label: 'Mercedes E-Class service guide', path: '/blog/mercedes-e-class-service-dubai-guide' },
      { label: 'Mercedes-AMG G63 service guide', path: '/blog/mercedes-g63-service-dubai-guide' },
      { label: 'Mercedes GLE service guide', path: '/mercedes/models/gle-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Will changing the transmission fluid stop the jerking?', answer: 'It can help when the approved diagnosis shows fluid condition or level is relevant. It will not repair every valve-body, electrical, mount, driveline or internal clutch fault.' },
      { question: 'Should adaptations be reset?', answer: 'Only when the manufacturer procedure and repair context call for it. Resetting learned values without fixing the cause can make shift quality temporarily different while removing useful evidence.' },
      { question: 'Is every AMG gearbox an MCT?', answer: 'No. AMG models use different transmission types by platform, including torque-converter automatics, MCT units and dual-clutch transmissions. Identify the exact vehicle first.' },
    ],
  },
  {
    slug: 'transmission-slipping',
    path: guidePath('transmission-slipping'),
    title: 'Mercedes Transmission Slipping: Signs, Causes and Next Steps',
    h1: 'Mercedes Transmission Slipping',
    metaTitle: 'Mercedes Transmission Slipping | Signs & Diagnosis',
    metaDescription: 'How to recognize Mercedes transmission slipping, possible fluid, hydraulic, clutch and control causes, driving risk, and the diagnostic process.',
    summary: 'Transmission slip is a mismatch between engine speed and the vehicle acceleration or commanded gear. Owners may describe an RPM flare, delayed drive or loss of pull. It should be distinguished from a normal downshift, traction-control intervention or engine power fault.',
    urgent: true,
    sections: [
      {
        title: 'What slipping feels like',
        paragraphs: ['The clearest report is an engine-speed rise without matching acceleration during a gear change or while a gear should be fully applied. Delayed engagement after selecting Drive or Reverse can be related but is not the same event.'],
        points: ['RPM flares between two gears', 'Engine revs rise under load but road speed does not follow', 'Drive or Reverse takes several seconds to engage', 'A gear disengages or the vehicle enters limp mode', 'Burning smell, new fluid leak or transmission warning appears'],
      },
      {
        title: 'Potential causes',
        paragraphs: ['Slipping can result from inadequate hydraulic apply pressure, incorrect fluid level, internal clutch wear, valve-body/mechatronic control, a speed-sensor problem or a mechanical failure. Engine and traction-system data should also be checked when the sensation is uncertain.'],
        points: ['Fluid leak, incorrect level or unsuitable fluid', 'Valve-body, solenoid or mechatronic pressure-control fault', 'Internal clutch or brake wear', 'Torque-converter or AMG start-off-clutch issue where applicable', 'Input/output speed information or wiring fault', 'Control strategy responding to another drivetrain fault'],
      },
      {
        title: 'Transmission family changes the diagnosis',
        paragraphs: ['A 7G-TRONIC torque-converter unit, a 9G-TRONIC, an AMG MCT and a dual-clutch AMG transmission transfer torque differently. The same “slip” description can therefore refer to different components and normal operating transitions.'],
      },
      {
        title: 'Why continuing to drive can increase damage',
        paragraphs: ['Friction elements create heat while slipping. Repeated acceleration tests can increase debris and thermal damage, turning a control or limited clutch concern into broader internal wear.'],
      },
    ],
    driveAdvice: 'Avoid driving except to reach safety if slip is repeatable, engagement is delayed, a warning appears or fluid is leaking. Do not test the car with hard acceleration. If it loses drive, smells burnt or cannot select a gear, arrange recovery rather than continuing.',
    diagnosticSteps: [
      'Confirm that the event is actual ratio slip rather than wheelspin, downshift, engine power loss or normal hybrid intervention.',
      'Identify the transmission and record when the event occurs.',
      'Inspect for fluid loss before operating the vehicle further.',
      'Compare commanded gear, input/output speed and clutch-slip data where supported.',
      'Check fluid level/condition using the specified temperature procedure when appropriate.',
      'Test hydraulic, electrical or mechanical causes indicated by the evidence.',
      'Inspect the pan or removed fluid for evidence only when that step is justified and approved.',
    ],
    faultCodeNote: 'A ratio-monitoring code confirms that actual speeds did not match the control unit’s expected ratio under recorded conditions. It does not alone identify whether the cause is fluid, hydraulic pressure, a sensor/circuit, a clutch or a mechanical part.',
    professionalHelp: 'Prompt diagnosis is appropriate after the first repeatable slip. A professional estimate should separate testing from repair and explain whether measured ratio, pressure, fluid or internal evidence supports the proposed component work.',
    relatedServices: [service('Mercedes transmission repair in Dubai', MERCEDES_SERVICE_LINKS.transmission, 'Commercial transmission inspection, service and repair information after the symptom has been diagnosed.')],
    relatedModels: [
      { label: 'Mercedes-AMG E63 service guide', path: '/mercedes/models/e63-service-repair-dubai' },
      { label: 'Mercedes-AMG S63 service guide', path: '/mercedes/models/s63-service-repair-dubai' },
      { label: 'Mercedes E-Class service guide', path: '/blog/mercedes-e-class-service-dubai-guide' },
      { label: 'Mercedes GLS service guide', path: '/mercedes/models/gls-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Can low transmission fluid cause slipping?', answer: 'Yes, inadequate fluid can affect pressure and lubrication, but the reason for a low level must be found and the exact fill procedure followed. Adding fluid blindly can also create problems.' },
      { question: 'Will a fluid flush repair slipping clutch packs?', answer: 'No. Fluid service cannot restore worn friction material. The condition should be diagnosed before choosing maintenance, hydraulic work or internal repair.' },
      { question: 'Can a Mercedes still drive normally after one flare?', answer: 'It may, but a repeatable flare is a warning sign. Avoid hard driving and arrange diagnosis before additional heat and wear develop.' },
    ],
  },
  {
    slug: 'check-engine-light',
    path: guidePath('check-engine-light'),
    title: 'Mercedes Check Engine Light: What the Warning Really Tells You',
    h1: 'Mercedes Check Engine Light',
    metaTitle: 'Mercedes Check Engine Light | Meaning & Diagnosis',
    metaDescription: 'Mercedes check engine light guide: steady vs flashing warnings, possible ignition, fuel, boost and emissions causes, and why a code is not a diagnosis.',
    summary: 'The check-engine light means the engine or emissions control has detected a fault that meets its reporting threshold. A steady light and a flashing light carry different urgency, while the stored code identifies the monitored condition—not automatically the failed part.',
    urgent: true,
    sections: [
      {
        title: 'Steady, flashing and message-centre warnings',
        paragraphs: ['A steady amber light may accompany normal driving, reduced power or rough running. A flashing light often indicates a severe active misfire with catalyst-damage risk. Red temperature, oil-pressure or stop messages are separate warnings and should be followed immediately.'],
        points: ['Steady light with no obvious symptom', 'Steady light with reduced power or rough idle', 'Flashing light under acceleration', 'Light appears after refuelling or battery work', 'Engine light plus coolant, oil or drivetrain warning'],
      },
      {
        title: 'Potential Mercedes fault areas',
        paragraphs: ['The exact engine changes the likely test path. Common categories include ignition and misfire, unmetered air or boost leakage, fuel pressure and injectors, oxygen/NOx and emissions control, cam/crank timing information, coolant-temperature control and electrical supply.'],
      },
      {
        title: 'Why symptoms and freeze-frame data matter',
        paragraphs: ['A code recorded at idle after a cold start tells a different story from the same code under high boost at operating temperature. Freeze-frame load, speed, temperature and fuel data can preserve that context after the light goes off.'],
      },
      {
        title: 'What a basic code reader may miss',
        paragraphs: ['Generic OBD data covers emissions-related faults but may not expose all Mercedes module events, guided tests or manufacturer-specific values. A wider scan is useful, but it still needs electrical and physical testing.'],
      },
    ],
    driveAdvice: 'Stop and switch off if the light flashes continuously, the engine shakes badly, temperature or oil-pressure warnings appear, or power loss makes driving unsafe. With a steady light and normal operation, avoid heavy load and arrange diagnosis soon.',
    diagnosticSteps: [
      'Record whether the light is steady or flashing and note all other messages and symptoms.',
      'Scan the full relevant vehicle systems and retain freeze-frame and misfire data.',
      'Identify the engine and review recent fuel, battery, maintenance or repair events.',
      'Use live data to narrow the affected air, fuel, ignition, boost, emissions or timing system.',
      'Perform the indicated wiring, pressure, smoke, compression or mechanical tests.',
      'Repair the proven cause, clear faults and verify the same operating conditions without recurrence.',
    ],
    faultCodeNote: 'A code such as “system too lean”, “misfire cylinder 3” or “boost pressure deviation” names the detected result or circuit. It does not prove an oxygen sensor, coil, injector or turbocharger has failed. Vacuum/boost leaks, wiring, fuel supply and mechanical condition can produce the same monitored result.',
    professionalHelp: 'Arrange prompt diagnosis for any flashing light, rough running, reduced power or recurring code. Even a steady light should be read before inspection renewal or a long trip, because a stored condition may affect emissions, fuel use or secondary components.',
    relatedServices: [service('Mercedes diagnostics in Dubai', MERCEDES_SERVICE_LINKS.diagnostics, 'Commercial information for full-module scanning, live data and directed testing.')],
    relatedModels: [
      { label: 'Mercedes C-Class service guide', path: '/blog/mercedes-c-class-service-dubai-guide' },
      { label: 'Mercedes-AMG C63 service guide', path: '/mercedes/models/c63-service-repair-dubai' },
      { label: 'Mercedes-AMG G63 service guide', path: '/blog/mercedes-g63-service-dubai-guide' },
      { label: 'Mercedes GLE service guide', path: '/mercedes/models/gle-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Can I drive with a steady Mercedes check-engine light?', answer: 'If the car runs normally and there are no temperature, oil-pressure or red stop warnings, a short gentle trip may be possible. Avoid heavy load and arrange diagnosis promptly.' },
      { question: 'Does a cylinder misfire code mean the ignition coil is bad?', answer: 'Not necessarily. A coil is one possibility, alongside plug, injector, wiring, air leak, compression and other causes. The fault should be reproduced and tested.' },
      { question: 'Why did the light turn off by itself?', answer: 'The monitored condition may not have repeated for enough drive cycles. The code and freeze-frame can remain stored, so the underlying intermittent fault may still be diagnosable.' },
    ],
  },
  {
    slug: 'engine-overheating',
    path: guidePath('engine-overheating'),
    title: 'Mercedes Engine Overheating: What to Do and How It Is Diagnosed',
    h1: 'Mercedes Engine Overheating',
    metaTitle: 'Mercedes Engine Overheating | Stop & Diagnose Guide',
    metaDescription: 'What to do when a Mercedes overheats, possible coolant leak, pump, thermostat, fan and airflow causes, and how the cooling system is diagnosed.',
    summary: 'Overheating means the cooling system is no longer controlling engine temperature under the current load. Continuing to drive can turn a hose, fan or pump fault into cylinder-head, turbocharger or lubrication damage.',
    urgent: true,
    sections: [
      {
        title: 'What owners may notice',
        paragraphs: ['The first sign may be a red temperature warning, rising gauge, reduced power, cooling fan running loudly, steam, coolant smell or weak AC in traffic. A low-coolant message is not identical to overheating but can become one if the system cannot retain coolant.'],
      },
      {
        title: 'Potential causes',
        paragraphs: ['Cooling depends on retained coolant, circulation, controlled thermostat flow, heat rejection through the radiator and airflow from vehicle speed or fans. Modern Mercedes engines may also have separate low-temperature or hybrid circuits.'],
        points: ['Coolant leak at hose, tank, radiator, pump, thermostat housing or engine component', 'Water-pump flow or control fault', 'Thermostat stuck or reporting implausible temperature', 'Cooling fan, relay, wiring or control problem', 'Restricted or contaminated radiator/condenser stack', 'Combustion-gas or internal engine issue after other causes are assessed'],
      },
      {
        title: 'Why Dubai traffic exposes marginal cooling',
        paragraphs: ['At low road speed the fans must move air through the AC condenser and radiator while ambient temperature and AC load are high. A system may appear normal on the motorway yet overheat in traffic if airflow or fan performance is weak.'],
      },
      {
        title: 'Do not open a hot cooling system',
        paragraphs: ['Pressurised coolant can cause severe burns. Switch off safely, move away from traffic and allow the vehicle to cool. Do not remove the cap or pour cold water into a severely overheated engine.'],
      },
    ],
    driveAdvice: 'Stop as soon as it is safe when a red temperature warning, steam or confirmed overheating appears. Switch off the engine and arrange recovery. Do not continue because the temperature falls briefly after turning off the AC; that does not identify or remove the cause.',
    diagnosticSteps: [
      'Confirm the warning, gauge behaviour, coolant level only when cold and any visible leak evidence.',
      'Identify which cooling circuits are fitted to the engine, charge-air, transmission or hybrid system.',
      'Pressure-test the relevant circuit when safe and inspect for external leakage.',
      'Compare temperature sensors and thermostat/pump commands with actual warm-up behaviour.',
      'Test fan speeds, airflow and radiator/condenser condition.',
      'Check coolant circulation and internal-engine evidence if external control and leakage tests do not explain the fault.',
      'Verify operation under the original traffic/load condition after repair.',
    ],
    faultCodeNote: 'A thermostat, pump or temperature-sensor code can indicate unexpected warm-up or control response; it does not automatically prove that component is the only fault. Low coolant, trapped air, wiring, airflow and sensor plausibility can alter the same data.',
    professionalHelp: 'Any true overheat warrants professional inspection before normal driving resumes. Repeated coolant top-ups, fan operation after every trip or temperature rise in traffic are early reasons to book diagnosis even before a red warning occurs.',
    relatedServices: [
      service('Mercedes mechanical repair in Dubai', MERCEDES_SERVICE_LINKS.mechanical, 'Commercial information for cooling-system inspection and mechanical repair.'),
      service('Mercedes diagnostics in Dubai', MERCEDES_SERVICE_LINKS.diagnostics, 'Live-data and control-system testing where a warning or intermittent overheat needs tracing.'),
    ],
    relatedModels: [
      { label: 'Mercedes-AMG G63 service guide', path: '/blog/mercedes-g63-service-dubai-guide' },
      { label: 'Mercedes-AMG C63 service guide', path: '/mercedes/models/c63-service-repair-dubai' },
      { label: 'Mercedes GLE service guide', path: '/mercedes/models/gle-service-repair-dubai' },
      { label: 'Mercedes GLS service guide', path: '/mercedes/models/gls-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Can I add coolant and keep driving?', answer: 'Only check or add coolant when the system is cold and the specified coolant is available. If the engine has overheated or coolant is escaping, topping up does not make continued driving safe.' },
      { question: 'Why does my Mercedes overheat only in traffic?', answer: 'Low-speed overheating often directs attention to fan operation and airflow, though coolant level, pump, thermostat and other causes must still be tested.' },
      { question: 'Can weak AC and overheating be connected?', answer: 'Yes. The AC condenser and radiator share airflow and cooling-fan capacity. A fan or blocked-stack problem can affect both systems, but pressure and temperature tests are needed.' },
    ],
  },
  {
    slug: 'ac-not-cooling',
    path: guidePath('ac-not-cooling'),
    title: 'Mercedes AC Not Cooling: Causes and Proper Diagnostic Checks',
    h1: 'Mercedes AC Not Cooling',
    metaTitle: 'Mercedes AC Not Cooling | Causes & Diagnosis',
    metaDescription: 'Why a Mercedes AC may blow warm, cool only while moving or differ by vent, plus refrigerant, compressor, airflow and climate-control diagnosis.',
    summary: 'Weak Mercedes AC can be caused by refrigerant loss, inadequate condenser airflow, compressor control, pressure/temperature sensors, blower restriction or air-distribution faults. “Needs gas” is a symptom guess, not a leak diagnosis.',
    urgent: false,
    sections: [
      {
        title: 'How the symptom pattern helps',
        paragraphs: ['Cooling only while driving points to a different test emphasis from cooling only at idle. One warm side can involve flap or zone control, while all vents warming together may point toward refrigerant or compressor performance.'],
        points: ['Cold while moving, warm in traffic', 'Cold at first, then warm after heat soak', 'Driver side and passenger side differ', 'Rear zones weak while front remains cold', 'Blower noise is normal but airflow is low', 'Compressor or fan noise changed before cooling weakened'],
      },
      {
        title: 'Potential causes',
        paragraphs: ['The system must move cabin air, compress refrigerant, reject heat at the condenser and meter cold air through the correct vents. A fault in any part can produce “not cooling”.'],
        points: ['Refrigerant leak and low charge', 'Condenser restriction or cooling-fan fault', 'Variable compressor or control-valve problem', 'Pressure/temperature sensor or wiring issue', 'Cabin filter, evaporator airflow or blower fault', 'Blend-door, actuator or multi-zone control problem'],
      },
      {
        title: 'R-134a and R-1234yf are not interchangeable',
        paragraphs: ['Mercedes refrigerant specification changes by model and year. The under-bonnet label identifies the required refrigerant and charge quantity. Recovery, leak testing, oil and recharge equipment must be compatible with that specification.'],
      },
      {
        title: 'Why topping up can delay the real repair',
        paragraphs: ['Refrigerant does not normally get consumed like fuel. If charge is low, the leak path should be assessed. Overcharging or mixing refrigerants can reduce cooling and damage equipment or components.'],
      },
    ],
    driveAdvice: 'Weak AC alone does not usually make the car unsafe, but stop if it accompanies an engine-temperature warning. In extreme heat, avoid transporting vulnerable passengers in a cabin that cannot be kept safe and arrange diagnosis rather than repeated top-ups.',
    diagnosticSteps: [
      'Record vent temperatures, affected zones, ambient conditions and idle-versus-road behaviour.',
      'Identify the specified refrigerant and inspect the condenser and cabin filter.',
      'Scan climate and related engine/fan control data where supported.',
      'Measure high/low-side behaviour with compatible equipment and compare compressor command.',
      'Leak-test likely paths before adding charge to a low system.',
      'Check blower, evaporator temperature and flap/actuator operation for airflow or zone faults.',
      'Verify cooling at idle and under realistic Dubai load after repair.',
    ],
    faultCodeNote: 'A pressure-sensor or compressor-control code can be caused by the circuit, implausible pressure from low refrigerant, wiring or a commanded safety shutdown. The code should be matched to actual pressures, temperatures and electrical measurements.',
    professionalHelp: 'Professional diagnosis is appropriate when cooling is weak, refrigerant has been added before, one zone differs or the system stops cooling in traffic. Ask for the specified refrigerant, measured performance and leak/control evidence behind the estimate.',
    relatedServices: [service('Mercedes AC repair in Dubai', MERCEDES_SERVICE_LINKS.ac, 'Commercial AC leak, compressor, condenser and climate-control service information.')],
    relatedModels: [
      { label: 'Mercedes C-Class service guide', path: '/blog/mercedes-c-class-service-dubai-guide' },
      { label: 'Mercedes S-Class service guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
      { label: 'Mercedes GLE service guide', path: '/mercedes/models/gle-service-repair-dubai' },
      { label: 'Mercedes GLS service guide', path: '/mercedes/models/gls-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Why is the AC cold while driving but warm at idle?', answer: 'That pattern often makes condenser airflow and fan performance important checks, but refrigerant charge and compressor control still need measurement.' },
      { question: 'Can I use any AC refrigerant in my Mercedes?', answer: 'No. Use the refrigerant, oil and charge quantity specified on the vehicle label with compatible recovery and recharge equipment.' },
      { question: 'Does low refrigerant always mean the compressor is bad?', answer: 'No. Low refrigerant usually prompts leak assessment. Compressor performance is tested separately using pressure, temperature and command data.' },
    ],
  },
  {
    slug: 'oil-leak',
    path: guidePath('oil-leak'),
    title: 'Mercedes Oil Leak: Finding the Source Before Replacing Parts',
    h1: 'Mercedes Oil Leak',
    metaTitle: 'Mercedes Oil Leak | Sources, Risk & Diagnosis',
    metaDescription: 'Mercedes oil leak guide covering leak patterns, possible covers, housings, coolers, turbo lines and sump sources, driving risk and diagnosis.',
    summary: 'Oil on the undertray or garage floor confirms leakage but not its origin. Mercedes undertrays and airflow can carry oil rearward, so diagnosis should start at the highest fresh wet point after the area is inspected and, when appropriate, cleaned.',
    urgent: false,
    sections: [
      {
        title: 'What owners may notice',
        paragraphs: ['The first evidence may be a drop on the floor, burning smell after a drive, smoke near the exhaust, oil-level message or residue found during service. A leaking engine can also stay dry on the ground because the undertray retains the oil.'],
      },
      {
        title: 'Potential source areas vary by engine',
        paragraphs: ['Possible sources include cam/valve covers, front covers, oil-filter or cooler housings, vacuum-pump areas, turbocharger oil lines, crank seals and the sump. This is not a parts list: the exact engine layout and fresh leak path determine which areas are relevant.'],
      },
      {
        title: 'Engine oil, transmission fluid and hydraulic fluid look similar when dirty',
        paragraphs: ['Fluid colour and location offer clues, but road dirt and heat can change appearance. The source system should be identified before the level, fluid specification and repair plan are decided.'],
      },
      {
        title: 'Why a small leak can still matter',
        paragraphs: ['A slow seep may remain stable, but oil reaching an exhaust component can smoke or create fire risk, and oil reaching belts or rubber mounts can cause secondary damage. A sudden leak or low-pressure warning is a different, urgent condition.'],
      },
    ],
    driveAdvice: 'Stop immediately for a red oil-pressure warning, rapid loss, smoke from oil on hot exhaust parts or a level below the safe range. A minor damp area with correct level may allow a short trip for diagnosis, but monitor the warning system and do not rely on repeated top-ups as a repair.',
    diagnosticSteps: [
      'Identify the fluid and confirm the level using the vehicle procedure.',
      'Remove or inspect the undertray safely and locate the highest fresh wet point.',
      'Check the exact engine’s cover, housing, cooler, line, seal and sump areas suggested by the leak path.',
      'Clean the area when needed and use a controlled run, UV tracer or repeat inspection where appropriate.',
      'Check crankcase pressure or related causes if the leak pattern suggests it.',
      'Replace the proven seal/component and clean retained oil from the underbody.',
      'Recheck after heat cycling and a road test.',
    ],
    faultCodeNote: 'Many oil leaks generate no fault code. An oil-level or oil-pressure code does not identify the leak source, and a pressure warning may represent a more urgent lubrication problem than external seepage.',
    professionalHelp: 'Arrange diagnosis for any recurring oil smell, new floor stain, level message or wet undertray. Seek immediate help for rapid leakage, smoke or an oil-pressure warning. A useful estimate should name the traced source rather than a list of possible gaskets.',
    relatedServices: [service('Mercedes mechanical repair in Dubai', MERCEDES_SERVICE_LINKS.mechanical, 'Commercial mechanical inspection and repair information for verified engine oil leaks.')],
    relatedModels: [
      { label: 'Mercedes-AMG G63 service guide', path: '/blog/mercedes-g63-service-dubai-guide' },
      { label: 'Mercedes-AMG C63 service guide', path: '/mercedes/models/c63-service-repair-dubai' },
      { label: 'Mercedes E-Class service guide', path: '/blog/mercedes-e-class-service-dubai-guide' },
      { label: 'Mercedes S-Class service guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
    ],
    faqs: [
      { question: 'Why is there oil on the rear of the undertray?', answer: 'Airflow can carry oil rearward from a higher front or side source. The undertray should be inspected and the highest fresh point traced before the rear-most wet area is treated as the origin.' },
      { question: 'Can an oil leak cause a burning smell without a puddle?', answer: 'Yes. Oil can collect on the undertray or reach a hot exhaust surface and burn off before a floor drop forms.' },
      { question: 'Will a diagnostic scan find an oil leak?', answer: 'Usually not. Scan data can help with oil level, pressure or related control concerns, but external leakage primarily needs physical tracing.' },
    ],
  },
  {
    slug: 'wont-start',
    path: guidePath('wont-start'),
    title: "Mercedes Won't Start: No-Crank and Crank-No-Start Diagnosis",
    h1: "Mercedes Won't Start",
    metaTitle: "Mercedes Won't Start | No-Crank Diagnostic Guide",
    metaDescription: "Mercedes won't start guide: how no-crank differs from crank-no-start, possible battery, starter, key, fuel and sensor causes, and safe diagnosis.",
    summary: 'The most useful first distinction is whether the engine does not crank, cranks at normal speed but does not start, cranks slowly, or starts and immediately stops. Each pattern leads to a different electrical, authorization, fuel or engine-management test path.',
    urgent: false,
    sections: [
      {
        title: 'Describe exactly what happens',
        paragraphs: ['Dashboard lights alone do not prove the battery is healthy because control modules need far less current than the starter. Listen for a click, note cranking speed and record whether the key is recognized or a “do not switch off” message appeared earlier.'],
        points: ['No dashboard and no crank', 'Dashboard on, single click, no crank', 'Slow crank', 'Normal crank speed but engine never fires', 'Starts and stalls immediately', 'No-start after battery, key, fuel or recent repair work'],
      },
      {
        title: 'Possible no-crank causes',
        paragraphs: ['No-crank diagnosis may involve the 12-volt battery, terminals, grounds, starter, relay/control path, gear-position information, key authorization or network communication. Later 48-volt and hybrid models can have additional start architecture.'],
      },
      {
        title: 'Possible crank-no-start causes',
        paragraphs: ['If cranking speed is normal, testing moves toward crank/cam signals, fuel supply and pressure, ignition, air/boost path, immobilizer authorization and mechanical timing or compression as indicated.'],
      },
      {
        title: 'Why repeated cranking is not a diagnosis',
        paragraphs: ['Repeated attempts can discharge the battery, overheat the starter and remove useful fault context. On a fuel or timing fault it may also worsen another problem. Capture the symptom and begin with controlled electrical and scan checks.'],
      },
    ],
    driveAdvice: 'A car that will not start should be made safe and recovered if the cause is unknown. Do not jump-start a damaged, swollen or leaking battery, and do not work on 48-volt or high-voltage components. If it starts after a jump, the charging system still needs testing before normal use.',
    diagnosticSteps: [
      'Classify the symptom as no-power, no-crank, slow-crank, crank-no-start or start-and-stall.',
      'Measure battery voltage and voltage drop under the relevant load; inspect terminals and grounds.',
      'Check key recognition, gear-position and start authorization data where supported.',
      'For no-crank, test starter command and the high-current path.',
      'For crank-no-start, confirm RPM signal, fuel pressure/command, ignition and immobilizer state.',
      'Follow the evidence into wiring, sensor, fuel or mechanical tests.',
      'Verify charging and repeat-start performance after repair.',
    ],
    faultCodeNote: 'A stored undervoltage code may be a result of repeated failed starts, while a starter, crank-sensor or authorization code may describe a circuit or missing signal. Voltage-drop and signal tests are needed before the named part is replaced.',
    professionalHelp: 'Arrange recovery and professional diagnosis when the car repeatedly will not crank, cranks but will not fire, stalls immediately or shows key/authorization, 48-volt or hybrid warnings. A mobile jump-start is not a substitute for determining why the battery was low.',
    relatedServices: [
      service('Mercedes diagnostics in Dubai', MERCEDES_SERVICE_LINKS.diagnostics, 'Commercial diagnostic information for no-start scan and system testing.'),
      service('Mercedes electrical repair in Dubai', MERCEDES_SERVICE_LINKS.electrical, 'Battery, starter, wiring, ground and module-circuit repair information.'),
    ],
    relatedModels: [
      { label: 'Mercedes C-Class service guide', path: '/blog/mercedes-c-class-service-dubai-guide' },
      { label: 'Mercedes E-Class service guide', path: '/blog/mercedes-e-class-service-dubai-guide' },
      { label: 'Mercedes S-Class service guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
      { label: 'Mercedes G-Class service guide', path: '/mercedes/models/g-class-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Can the lights work even when the battery cannot start the car?', answer: 'Yes. Lights and modules draw much less current than the starter. Battery voltage under load and cable voltage drop are more useful than the lights alone.' },
      { question: 'Why does the Mercedes start after a jump and then fail again?', answer: 'The battery may not retain charge, the charging system may be weak or the vehicle may have an excessive key-off draw. All three require measurement.' },
      { question: 'Does a crankshaft-sensor code prove the sensor failed?', answer: 'Not always. Wiring, supply, signal integrity, timing and low cranking speed can affect the observed signal. Test the circuit and waveform or live data as appropriate.' },
    ],
  },
  {
    slug: 'battery-warning',
    path: guidePath('battery-warning'),
    title: 'Mercedes Battery Warning: 12V, Auxiliary and 48V Messages Explained',
    h1: 'Mercedes Battery Warning',
    metaTitle: 'Mercedes Battery Warning | 12V, 48V & Charging',
    metaDescription: 'What Mercedes battery and charging warnings can mean across 12V, auxiliary and 48V systems, when to stop, and how voltage faults are diagnosed.',
    summary: 'A Mercedes battery message can refer to low 12-volt state of charge, an auxiliary/backup battery function, a charging-system fault or, on equipped models, a 48-volt/DC-DC problem. Replacing the main battery without identifying the exact message can miss the fault.',
    urgent: true,
    sections: [
      {
        title: 'Common message patterns',
        paragraphs: ['Wording changes by model. “Start engine — see owner’s manual” may indicate low state of charge, while a red battery symbol during driving can indicate that the 12-volt system is not being charged. “Auxiliary battery malfunction” and 48-volt messages belong to different circuits.'],
        points: ['White or amber low-battery/start-engine message', 'Red battery symbol while driving', 'Auxiliary battery malfunction', 'Stop vehicle — leave engine running', '48V battery or electrical-system warning', 'Several unrelated warnings after start'],
      },
      {
        title: 'Potential causes',
        paragraphs: ['Battery age is only one factor. Testing may need the main battery, terminals, grounds, charging source, drive belt where applicable, battery sensor, wiring, auxiliary storage device, DC-DC converter or 48-volt system.'],
      },
      {
        title: 'Why a new battery may need more than fitting',
        paragraphs: ['Some Mercedes battery-management systems require registration, adaptation or confirmation of type/capacity after replacement. Whether that applies depends on the exact model and system; it should not be claimed universally.'],
      },
      {
        title: 'Heat, storage and short trips',
        paragraphs: ['Dubai heat can accelerate battery ageing, while parked vehicles and repeated short trips can leave state of charge low. These conditions do not rule out an alternator, DC-DC, wiring or parasitic-draw fault.'],
      },
    ],
    driveAdvice: 'A red charging warning while driving can mean the vehicle is running only on stored electrical energy. Reduce nonessential electrical loads and move to a safe place; stop immediately if steering, temperature or belt-related warnings appear. Follow any red stop instruction and arrange recovery for 48-volt or severe electrical warnings.',
    diagnosticSteps: [
      'Record the exact message colour and wording and whether it appears before start or while driving.',
      'Identify the vehicle’s 12-volt, auxiliary, 48-volt or high-voltage architecture.',
      'Measure battery state of charge/health and inspect terminals and grounds.',
      'Test charging voltage/current or DC-DC behaviour under the relevant conditions.',
      'Inspect drive belt and charging source where the architecture uses them.',
      'Scan battery-management and related modules and check quiescent draw if discharge occurs while parked.',
      'Register or initialize the replacement only when the exact vehicle procedure requires it.',
    ],
    faultCodeNote: 'Undervoltage codes across many modules may show that supply dropped, but not why. They can result from an ageing battery, poor connection, charging fault or repeated start attempts. A 48-volt code likewise needs isolation to the storage, converter, wiring or control system.',
    professionalHelp: 'Seek prompt help for a red charging symbol, repeated low-battery message, no-start or 48-volt warning. A battery replacement should follow load/health and charging tests, not be used as the first diagnostic step for every electrical message.',
    relatedServices: [
      service('Mercedes electrical repair in Dubai', MERCEDES_SERVICE_LINKS.electrical, 'Commercial charging, wiring, module and 48-volt diagnostic information.'),
      service('Mercedes battery replacement in Dubai', MERCEDES_SERVICE_LINKS.battery, 'Battery testing and replacement information after the correct battery system is identified.'),
    ],
    relatedModels: [
      { label: 'Mercedes E-Class service guide', path: '/blog/mercedes-e-class-service-dubai-guide' },
      { label: 'Mercedes S-Class service guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
      { label: 'Mercedes-AMG S63 service guide', path: '/mercedes/models/s63-service-repair-dubai' },
      { label: 'Mercedes GLS service guide', path: '/mercedes/models/gls-service-repair-dubai' },
    ],
    faqs: [
      { question: 'Does a battery warning always mean the battery is bad?', answer: 'No. It may indicate low charge, a charging source, wiring/connection, auxiliary or 48-volt fault. Test the system identified by the exact warning.' },
      { question: 'Can I drive with the red battery symbol on?', answer: 'The car may stop once stored energy is depleted, and a belt-related problem can also affect cooling on some vehicles. Move to safety, reduce loads and arrange prompt assistance.' },
      { question: 'Does every Mercedes battery need coding?', answer: 'No. Registration or coding depends on the model and battery-management system. The VIN, specified type/capacity and service procedure determine the requirement.' },
    ],
  },
];

export const getMercedesProblemGuide = (slug: string) =>
  mercedesProblemGuides.find((guide) => guide.slug === slug);

export const MERCEDES_PROBLEM_GUIDE_LINKS = mercedesProblemGuides.map((guide) => ({
  label: guide.h1,
  path: guide.path,
}));

export const mercedesProblemHubLinks = [
  { label: 'Mercedes-Benz repair and service hub', path: MERCEDES_HUB_PATH },
  { label: 'Mercedes suspension repair', path: MERCEDES_SERVICE_LINKS.suspension },
  { label: 'Mercedes transmission repair', path: MERCEDES_SERVICE_LINKS.transmission },
  { label: 'Mercedes diagnostics', path: MERCEDES_SERVICE_LINKS.diagnostics },
];
