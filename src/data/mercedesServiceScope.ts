import type { ServiceKey } from './brandServices';

export type MercedesScopeItem = {
  id?: string;
  title: string;
  description: string;
  path?: string;
  linkLabel?: string;
};
export type MercedesServiceScope = { heading: string; intro: string; items: MercedesScopeItem[] };
const problem = '/mercedes/problems';

// Existing commercial owners answer these narrower questions within their scope.
// Symptoms remain evidence to investigate, not diagnoses or new URL targets.
export const MERCEDES_ADDITIONAL_SERVICE_SCOPE: Partial<Record<ServiceKey, MercedesServiceScope>> = {
  'mechanical-repair': {
    heading: 'Engine symptoms and the inspection they need',
    intro: 'Tell us when the change happens: cold start, warm idle, acceleration, traffic or after parking. That context helps separate an engine-running fault from transmission, mount or driveline vibration.',
    items: [
      { id: 'rough-idle', title: 'Rough idle, shaking or vibration', description: 'Record whether it happens while stationary, in gear or only at road speed. Ignition, fuel delivery, air leaks, compression and mount condition are different test paths; shaking alone does not establish which part needs work.', path: `${problem}/check-engine-light`, linkLabel: 'Warning lights and engine-running symptoms' },
      { id: 'exhaust-smoke', title: 'White or blue exhaust smoke', description: 'Note the colour, duration, smell and whether oil or coolant is being lost. Brief condensation and persistent smoke need different assessment. Smoke colour alone cannot confirm a head-gasket, turbocharger or internal-engine fault.' },
      { id: 'coolant-leak', title: 'Coolant loss and rising temperature', description: 'Leak tracing and cooling-system tests establish the source before a hose, pump, thermostat or internal repair is proposed. A temperature warning needs prompt attention; do not open a hot cooling system.', path: `${problem}/engine-overheating`, linkLabel: 'Overheating: stop and assessment guidance' },
      { id: 'loss-of-power', title: 'Loss of power or a turbo-related warning', description: 'Air/boost leaks, fuel or ignition faults, exhaust restrictions and control problems can feel similar. Diagnostic evidence comes first; turbo or engine repairs follow only if the fault is confirmed.', path: '/services/mercedes-diagnostics-dubai', linkLabel: 'XENTRY diagnosis for reduced power' },
      { id: 'oil-leaks', title: 'Oil leaks and burning smells', description: 'Identify the fluid, source and spread of the leak. Oil on an undertray or a photograph of a wet engine cannot establish which seal or component failed.', path: `${problem}/oil-leak`, linkLabel: 'How an oil leak is investigated' },
      { id: 'mounts-belts', title: 'Mounts, belts, pulleys and engine noise', description: 'The inspection checks when a noise or movement occurs and which assembly it follows. Parts compatibility, access and any further dismantling are explained before the repair is authorised.' },
    ],
  },
  'transmission-repair': {
    heading: 'Identify the gearbox before choosing the repair',
    intro: '7G-Tronic, 9G-Tronic and AMG transmission variants are not interchangeable. The VIN, fitted unit and service history determine fluid requirements, access to live data and any supported adaptation procedure.',
    items: [
      { title: 'Jerking or harsh changes', description: 'Describe the gear, speed, temperature and load at which the change occurs. Engine-running or driveline faults can imitate a gearbox complaint.', path: `${problem}/gearbox-jerking`, linkLabel: 'Understand jerking and delayed engagement' },
      { title: 'Slipping or engine speed rising without drive', description: 'Report loss of drive and warning messages before arranging the visit. Repeatedly forcing acceleration to reproduce the symptom can worsen the situation.', path: `${problem}/transmission-slipping`, linkLabel: 'Slipping symptoms and inspection guidance' },
      { title: 'Fluid leaks and service history', description: 'Confirm the leak source, fluid condition and applicable schedule. A fluid change is due maintenance when specified; it is not a guaranteed repair for internal wear or control faults.' },
      { title: 'Control, mechatronic and mechanical findings', description: 'Power supply, wiring, sensors, hydraulic operation and internal condition may require different tests. The estimate distinguishes supported component repair, further investigation and replacement.' },
      { title: 'Adaptations after agreed work', description: 'Resets, coding or relearning are performed only where required by the completed repair and supported for the fitted gearbox. Clearing learned values is not a universal cure.' },
      { title: 'What a quote should explain', description: 'Ask for the diagnosed concern, labour, fluid approval, parts route, exclusions and verification. A rebuild or replacement is not selected from a fault-code label alone.' },
    ],
  },
  'ac-repair': {
    heading: 'Weak cooling, airflow and climate-control faults',
    intro: 'Compare the complaint at idle and while driving, on each side of the cabin and at different fan settings. The fitted refrigerant and climate equipment are checked before any service is quoted.',
    items: [
      { title: 'Not cold or blowing warm air', description: 'Vent temperature, operating pressures and leak evidence help distinguish refrigerant loss from a compressor, condenser or control concern.', path: `${problem}/ac-not-cooling`, linkLabel: 'Why Mercedes AC may stop cooling' },
      { title: 'Weak airflow or blower stops', description: 'A filter restriction, blower, regulator, supply or control fault can reduce airflow even when the refrigerant circuit is functioning. Report fan behaviour separately from air temperature.' },
      { title: 'One side warm or rear cabin not cooling', description: 'The exact climate-zone configuration matters. Sensors, blend-door operation, refrigerant performance and communication may need assessment; a warm vent does not prove a failed compressor.' },
      { title: 'Refrigerant and compressor decisions', description: 'Confirm the correct refrigerant, charge specification and oil before work. Any leak or electrical concern is explained first; a refill alone does not fix every cooling fault.' },
    ],
  },
  'battery-replacement': {
    heading: 'Test the battery and identify its role',
    intro: 'A starting battery, an auxiliary supply and a 48V or traction-battery system are different jobs. Send the exact message and model details so the appropriate low-voltage assessment can be confirmed.',
    items: [
      { title: 'Starting battery test and fitment', description: 'Condition, charging, connections and the reported starting behaviour guide the decision. Replacement type, capacity, access and installation procedure must match the exact vehicle.' },
      { title: 'Auxiliary battery message', description: 'The message can refer to different components across generations. Identify the system before quoting an auxiliary battery or related component.', path: `${problem}/battery-warning`, linkLabel: 'Understand 12V, auxiliary and 48V warnings' },
      { title: 'Registration or coding', description: 'Confirm whether the fitted system requires a replacement registration, supported reset or coding, and include the agreed procedure in the quote. It is not one universal process for every Mercedes.' },
      { title: 'A new battery repeatedly goes flat', description: 'Repeated discharge may require charging, connection or unwanted-draw testing. Replacing another battery without tracing the fault can leave the concern unresolved.', path: '/services/mercedes-electrical-repair-dubai#battery-drain', linkLabel: 'Electrical investigation for repeated drain' },
    ],
  },
  'electrical-repair': {
    heading: 'Repair the electrical fault supported by testing',
    intro: 'XENTRY and physical electrical tests help isolate the concern before a repair is proposed. For software configuration requests, discuss the required function through Mercedes diagnostics and coding.',
    items: [
      { id: 'battery-drain', title: 'Battery keeps dying after parking', description: 'Tell us how long the car stands, its recent battery history and any aftermarket equipment. Charging, connections and sleep-current behaviour may need separate testing before a component is blamed.', path: `${problem}/wont-start`, linkLabel: 'Separate no-power, no-crank and no-start symptoms' },
      { id: 'charging-fault', title: 'Charging and voltage warnings', description: 'Supply, grounds, connectors and charging equipment are assessed for the fitted system. A 48V message is not permission to disconnect or work on that system yourself.', path: `${problem}/battery-warning`, linkLabel: 'Battery and charging-warning guide' },
      { id: 'reverse-camera', title: 'Reverse camera not working', description: 'Record whether the display changes in reverse, shows a warning or stays blank. Camera supply, wiring, communication and display integration are checked before camera or head-unit replacement is proposed.', path: '/services/head-unit-repair-dubai', linkLabel: 'Head-unit assessment if other screen functions also fail' },
      { title: 'Wiring, water ingress and intermittent accessories', description: 'Recent repairs, water entry and the exact failing functions guide connector, circuit and network checks. Confirm the supported repair and any further observation needed for an intermittent fault.' },
      { title: 'ECU, SAM and communication faults', description: 'Fault-code wording alone does not confirm module damage. Repairability, replacement compatibility and any necessary software work depend on the part number and test findings.' },
      { title: 'Coding is a separate scope', description: 'Supported coding, programming and adaptations require the vehicle, module, function and access to be confirmed. Electrical repair may be necessary before software work can proceed.', path: '/services/mercedes-diagnostics-dubai', linkLabel: 'Discuss XENTRY and supported coding' },
    ],
  },
  'brake-repair': {
    heading: 'Brake noise, vibration and warning messages',
    intro: 'The fitted brake package, measured condition and driving symptom determine the work. Standard and AMG components must be identified before pads, discs or other parts are ordered.',
    items: [
      { id: 'brake-noise', title: 'Squeaking or grinding brakes', description: 'Noise can involve pad/disc condition, contamination, mounting or another component. Grinding, changed braking feel or reduced braking warrants prompt assessment; do not assume a pad change alone is sufficient.' },
      { title: 'Vibration when braking', description: 'Record whether vibration appears only under braking or also at speed. Brake condition, wheel/tyre condition and suspension can require different checks.', path: '/services/mercedes-steering-repair-dubai#steering-vibration', linkLabel: 'Steering-wheel vibration and related checks' },
      { title: 'Wear, ABS or other brake warnings', description: 'Record the exact warning and follow the vehicle handbook. Wear sensors, hydraulic concerns and electronic warnings require different investigation; a warning alone does not identify every part needed.' },
      { title: 'Parts, measurements and completion checks', description: 'The quote identifies the brake equipment, measured findings, parts and fluid work where due. Supported service functions and checks after repair are confirmed for the vehicle.' },
    ],
  },
  'steering-repair': {
    heading: 'Separate steering, wheel and suspension concerns',
    intro: 'Describe whether the change occurs when turning, accelerating, braking or cruising. Steering assistance and chassis equipment vary by model and generation.',
    items: [
      { id: 'steering-vibration', title: 'Steering-wheel vibration', description: 'The speed and operating condition matter. Wheel/tyre balance or damage, brake condition, joints and mountings may require assessment before the steering rack is considered.', path: '/services/mercedes-tire-repair-dubai', linkLabel: 'Tyre and wheel-condition assessment' },
      { title: 'Heavy steering or assistance warning', description: 'Identify the electric or hydraulic assistance system, then check relevant supply, fluid or mechanical findings. Sudden loss of assistance needs prompt advice before driving further.' },
      { title: 'Pulling or off-centre steering', description: 'Tyre pressure/condition, alignment and steering or suspension wear are separate checks. Alignment is not a substitute for repairing a worn or damaged part.', path: '/services/mercedes-suspension-repair-dubai', linkLabel: 'Suspension and chassis inspection' },
      { title: 'After a steering repair', description: 'The estimate explains alignment and any supported steering-angle or assistance calibration required by the work. Not every repair requires the same procedure.' },
    ],
  },
  'body-repair': {
    heading: 'Accident, panel and paintwork assessment',
    intro: 'Photographs help plan an inspection. They cannot establish structural condition, hidden damage or the final repair cost.',
    items: [
      { title: 'Bumpers, dents and panel damage', description: 'Inspect the material, access, mountings and adjoining components before selecting repair or replacement. The estimate identifies the affected panels and any dismantling assumptions.' },
      { title: 'Sensors and equipment behind the damage', description: 'Parking sensors, cameras, lighting and wiring may need separate checks. Required calibration, specialist processes and who will perform them are confirmed before work is accepted.' },
      { title: 'Paint preparation and finish', description: 'Existing paint, repair history and finish determine preparation and blending requirements. Review the agreed finish, panel fit and relevant functions at handover.' },
      { title: 'Protection after repair', description: 'PPF, ceramic coating and polishing have different purposes and are separately agreed only when suitable for the repaired finish.', path: '/services/paint-protection-dubai', linkLabel: 'Compare paint-care and protection options' },
    ],
  },
  'exhaust-repair': {
    heading: 'Exhaust leaks, noise and related engine warnings',
    intro: 'Inspection starts with the fitted petrol, diesel or AMG system and any previous modification. Repair and performance upgrades are separate requests.',
    items: [
      { title: 'Rattle, leak or changed sound', description: 'Check joints, mountings, shields and damaged sections before replacing an assembly. Describe when the noise occurs and any impact or recent work.' },
      { title: 'Smoke or loss of power', description: 'Engine-running and boost concerns can appear at the exhaust. Smoke or a warning does not prove that an exhaust component is the cause.', path: '/services/mercedes-mechanical-repair-dubai#exhaust-smoke', linkLabel: 'Engine smoke and power-loss assessment' },
      { title: 'Sensor or emissions-related code', description: 'Confirm relevant wiring, leaks and operating data before selecting a sensor or component. Diagnostic work and any supported repair are quoted for the fitted system.', path: '/services/mercedes-diagnostics-dubai', linkLabel: 'Diagnosis before exhaust-component replacement' },
    ],
  },
  'fuel-system-repair': {
    heading: 'Fuel delivery and injector concerns',
    intro: 'Petrol and diesel fuel systems require different specifications and test procedures. The fitted system and evidence determine the work; a misfire does not by itself identify a faulty injector.',
    items: [
      { title: 'Hard starting, rough running or hesitation', description: 'Ignition, air, fuel supply and mechanical causes may overlap. Compare relevant pressure/data and physical findings before selecting a pump or injector.', path: `${problem}/check-engine-light`, linkLabel: 'Engine-warning and running-fault guide' },
      { title: 'Fuel smell or suspected leakage', description: 'A strong fuel smell or visible leak needs prompt workshop advice. Avoid starting or continuing to drive a leaking vehicle; do not loosen high-pressure fuel components.' },
      { title: 'Confirmed component repair', description: 'The quote identifies the tested fault, compatible component, seals and labour. Injector coding or other service functions are included only where required and supported.' },
      { title: 'No-start investigation', description: 'Fuel delivery is one possible cause of crank-no-start. No power and no crank follow different electrical or starting-system checks.', path: `${problem}/wont-start`, linkLabel: 'Describe the exact starting symptom' },
    ],
  },
  'tire-repair': {
    heading: 'Tyre damage, pressure warnings and vibration',
    intro: 'Confirm the actual wheel sizes, axle fitment and tyre specification. A repair is offered only when the damage and tyre condition are suitable.',
    items: [
      { title: 'Puncture or repeated pressure loss', description: 'Inspect the tyre, valve and wheel to identify the leak and assess repairability. Sidewall damage, internal condition and previous low-pressure use can rule out a repair.' },
      { title: 'Run-flat and mixed axle fitments', description: 'Check the fitted specification and manufacturer requirements before selecting a replacement. Do not assume every Mercedes uses run-flat tyres or the same size on both axles.' },
      { title: 'Vibration or uneven wear', description: 'Wheel condition, balance, alignment and chassis wear may need separate checks. Replacing tyres alone may not resolve the underlying concern.', path: '/services/mercedes-steering-repair-dubai#steering-vibration', linkLabel: 'Vibration and steering-related checks' },
      { title: 'Pressure monitoring', description: 'Set pressures using the applicable vehicle guidance and confirm the supported reset or sensor procedure. A warning can require more than a dashboard reset.' },
    ],
  },
};
