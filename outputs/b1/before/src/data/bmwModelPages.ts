export const BMW_HUB_PATH = '/brands/bmw-service-dubai';

export const BMW_SERVICE_LINKS = {
  maintenance: `${BMW_HUB_PATH}/oil-change`,
  diagnostics: `${BMW_HUB_PATH}/engine-diagnostics`,
  mechanical: `${BMW_HUB_PATH}/mechanical-repair`,
  transmission: `${BMW_HUB_PATH}/transmission-repair`,
  suspension: `${BMW_HUB_PATH}/suspension-repair`,
  brakes: `${BMW_HUB_PATH}/brake-repair`,
  electrical: `${BMW_HUB_PATH}/electrical-repair`,
  ac: `${BMW_HUB_PATH}/ac-repair`,
} as const;

export interface BmwModelPageData {
  slug: string;
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  generations: { code: string; detail: string }[];
  sections: { title: string; summary: string; points: string[] }[];
  symptoms: { title: string; detail: string; servicePath: string; serviceLabel: string }[];
  services: { label: string; path: string; detail: string }[];
  faqs: { question: string; answer: string }[];
}

const modelPath = (slug: string) => `${BMW_HUB_PATH}/${slug}`;
const service = (label: string, path: string, detail: string) => ({ label, path, detail });

export const bmwModelPages: BmwModelPageData[] = [
  {
    slug: 'x5', name: 'BMW X5', h1: 'BMW X5 Service & Repair Dubai',
    metaTitle: 'BMW X5 Service & Repair Dubai | Digi-Tec Al Quoz',
    metaDescription: 'BMW X5 service and repair in Dubai for E70, F15 and G05: cooling, ZF transmission, xDrive, air suspension, brakes and ISTA diagnostics.',
    intro: 'The X5 combines BMW powertrains with xDrive, a heavy SUV chassis and generation-dependent suspension and electronics. Digi-Tec plans maintenance and fault-finding around the exact E70, F15 or G05 configuration—not the X5 badge alone.',
    generations: [
      { code: 'E70 (2006–2013)', detail: 'N52, N55, N63 and diesel applications vary by market; six-speed and eight-speed automatic configurations require exact identification.' },
      { code: 'F15 (2013–2018)', detail: 'Includes N55, N57 and N63 variants, ZF 8HP gearboxes and optional rear self-levelling air suspension.' },
      { code: 'G05 (2018–present)', detail: 'Includes B58, B57, N63 and plug-in hybrid variants, with integrated chassis, driver-assistance and current iDrive systems.' },
    ],
    sections: [
      { title: 'Engines, cooling and Dubai thermal load', summary: 'X5 engine families do not share one leak pattern or cooling layout. High ambient temperature increases thermal load, making coolant condition, airflow and leak-free circuits especially important.', points: ['Trace coolant or oil from the highest fresh point before naming a component.', 'On B58 40i models, inspect engine and charge-air cooling circuits according to the symptom.', 'Hybrid high-voltage work requires model-specific capability and is confirmed before booking.'] },
      { title: 'ZF gearbox, transfer case and xDrive', summary: 'A shudder or harsh shift can originate in the engine, automatic gearbox, transfer case, propshaft, differential, mounts or mismatched tyres.', points: ['Identify the fitted transmission before selecting fluid or a service procedure.', 'Review tyre circumference and transfer-case data when xDrive judder is reported.', 'Road-test and scan evidence should lead any adaptation or repair decision.'] },
      { title: 'Suspension, steering and brakes', summary: 'E70, F15 and G05 equipment differs. Some vehicles use steel springs, some rear air springs and some two-axle air suspension; a low corner is not automatically a failed strut.', points: ['Leak-test the air circuit and check compressor, valve and height-sensor data where fitted.', 'Inspect thrust arms, bushes, dampers and wheel bearings for knocks or braking vibration.', 'Calibrate relevant ride-height or driver-assistance systems after applicable work.'] },
    ],
    symptoms: [
      { title: 'Vehicle leaning or suspension warning', detail: 'Possible causes include an air leak, compressor, valve block, height sensor, wiring or a non-air chassis fault.', servicePath: BMW_SERVICE_LINKS.suspension, serviceLabel: 'BMW suspension repair' },
      { title: 'Drivetrain malfunction or reduced power', detail: 'The message can be triggered by engine, boost, fuel, ignition, transmission or voltage faults; the message alone is not a diagnosis.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW diagnostics' },
      { title: 'Shudder on tight turns or acceleration', detail: 'Tyres, transfer-case control, mounts, propshafts and differentials should be separated before parts are recommended.', servicePath: BMW_SERVICE_LINKS.transmission, serviceLabel: 'BMW transmission and driveline repair' },
    ],
    services: [service('X5 maintenance', BMW_SERVICE_LINKS.maintenance, 'Oil, filters and inspection items matched to engine and history.'), service('X5 suspension repair', BMW_SERVICE_LINKS.suspension, 'Steel, rear-air and two-axle-air systems identified before testing.'), service('X5 transmission repair', BMW_SERVICE_LINKS.transmission, 'ZF gearbox and xDrive concerns diagnosed as connected but separate systems.'), service('ISTA diagnostics', BMW_SERVICE_LINKS.diagnostics, 'Fault memory, live data and directed physical tests.')],
    faqs: [{ question: 'Does every BMW X5 have air suspension?', answer: 'No. Suspension equipment varies by generation, market and option package. Some X5s use steel springs, some rear self-levelling air suspension and some two-axle air suspension.' }, { question: 'What should I send when booking X5 diagnosis?', answer: 'Send the VIN, model year, engine or badge, mileage, exact warning text and when the symptom occurs. Photos or a short video can also help prepare the first inspection.' }],
  },
  {
    slug: 'x6', name: 'BMW X6', h1: 'BMW X6 Service & Repair Dubai',
    metaTitle: 'BMW X6 Service & Repair Dubai | Digi-Tec',
    metaDescription: 'BMW X6 service and repair Dubai for E71, F16 and G06, covering xDrive, ZF 8HP, adaptive suspension, cooling, brakes and diagnostics.',
    intro: 'X6 diagnosis must distinguish its generation, engine and chassis options. The E71, F16 and G06 use different electronics and powertrains, while xDrive, wide staggered tyres and adaptive chassis systems can make one symptom appear in several systems.',
    generations: [{ code: 'E71 (2008–2014)', detail: 'N54/N55 and V8-era powertrains with generation-specific six- or eight-speed automatic and xDrive systems.' }, { code: 'F16 (2014–2019)', detail: 'N55/N63 and diesel applications commonly paired with ZF 8HP and adaptive chassis options.' }, { code: 'G06 (2019–present)', detail: 'B58, B57, N63 and M-derived variants with current iDrive, driver assistance and integrated chassis control.' }],
    sections: [
      { title: 'Powertrain and cooling', summary: 'The correct diagnostic route follows the engine code and symptom, not a generic X6 common-fault list.', points: ['Pressure-test and inspect cooling circuits before repeated top-ups.', 'Use misfire counts, mixture data and physical tests before replacing coils or injectors.', 'Check oil leaks with undertrays removed and the source area cleaned where needed.'] },
      { title: 'xDrive and staggered tyres', summary: 'Large staggered wheels make tyre specification, rolling circumference and wear particularly relevant to xDrive behaviour.', points: ['Record all four tyre sizes, brands, tread depths and pressures.', 'Separate transfer-case shudder from wheel, shaft, mount or gearbox vibration.', 'Confirm alignment only after worn suspension parts are repaired.'] },
      { title: 'Adaptive chassis and braking', summary: 'Dynamic damper, active roll and air-suspension equipment varies. Warning messages require equipment-specific scanning and physical checks.', points: ['Do not assume every X6 uses the same air-suspension layout.', 'Inspect bushes, arms and wheel bearings when braking produces vibration.', 'Use ride-height calibration only when required by the completed repair.'] },
    ],
    symptoms: [{ title: 'xDrive or chassis warning', detail: 'Voltage, wheel-speed, transfer-case and chassis faults can overlap.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW diagnostics' }, { title: 'Suspension knock or uneven ride', detail: 'Arms, bushes, dampers, links, air components or wheel equipment may contribute.', servicePath: BMW_SERVICE_LINKS.suspension, serviceLabel: 'BMW suspension repair' }, { title: 'Gearbox warning or rough shift', detail: 'Scan data, temperature, fluid condition and drivetrain checks help isolate the source.', servicePath: BMW_SERVICE_LINKS.transmission, serviceLabel: 'BMW transmission repair' }],
    services: [service('X6 diagnostics', BMW_SERVICE_LINKS.diagnostics, 'ISTA-compatible scanning supported by physical testing.'), service('X6 suspension repair', BMW_SERVICE_LINKS.suspension, 'Adaptive chassis faults and mechanical wear assessed together.'), service('X6 transmission repair', BMW_SERVICE_LINKS.transmission, 'Gearbox symptoms separated from xDrive and engine torque concerns.'), service('X6 brake repair', BMW_SERVICE_LINKS.brakes, 'Pads, discs, calipers, sensors and vibration diagnosis.')],
    faqs: [{ question: 'Can different tyres cause BMW X6 xDrive symptoms?', answer: 'Material differences in tyre size, rolling circumference or wear can affect an xDrive vehicle. The tyres should be measured and checked alongside transfer-case and driveline data.' }, { question: 'Is a chassis warning always an air-suspension failure?', answer: 'No. Equipment varies, and voltage, sensors, wiring, damper control, ride-height systems or mechanical faults can produce chassis warnings.' }],
  },
  {
    slug: '3-series', name: 'BMW 3 Series', h1: 'BMW 3 Series Service & Repair Dubai',
    metaTitle: 'BMW 3 Series Service & Repair Dubai | Digi-Tec',
    metaDescription: 'BMW 3 Series service Dubai for E90, F30 and G20, including N20, N55, B48 and B58 engines, ZF 8HP, cooling, suspension and ISTA diagnostics.',
    intro: 'The 3 Series spans naturally aspirated, turbocharged, diesel, hybrid, rear-wheel-drive and xDrive variants. E90, F30 and G20 maintenance is planned around the engine, transmission and fitted equipment rather than a badge-only checklist.',
    generations: [{ code: 'E90/E91/E92/E93 (2005–2013)', detail: 'N46, N52, N54, N55 and diesel families vary by body and market, with manual and automatic transmissions.' }, { code: 'F30/F31/F34 (2011–2019)', detail: 'N20, N55, B48, B58, diesel and hybrid variants; most automatics use generation-specific ZF 8HP applications.' }, { code: 'G20/G21 (2018–present)', detail: 'B48 and B58 petrol, diesel and plug-in hybrid variants with current electronic and driver-assistance systems.' }],
    sections: [
      { title: 'Four- and six-cylinder engine families', summary: 'N20, N55, B48 and B58 engines have different architectures and service parts. Engine-code identification prevents generic recommendations.', points: ['Investigate oil or coolant loss instead of treating top-up frequency as normal.', 'A rough idle needs ignition, fuel, air, crankcase ventilation and mechanical checks.', 'Use the oil approval specified for the exact engine and market application.'] },
      { title: 'ZF 8HP and driveline', summary: 'Many F30 and G20 automatics use ZF 8HP variants, while earlier cars and manuals require different procedures.', points: ['Identify the gearbox from vehicle data before fluid service.', 'Separate shift quality from engine hesitation, mounts and differential play.', 'xDrive variants add transfer-case and front-driveline inspection needs.'] },
      { title: 'Front suspension and steering feel', summary: 'Control-arm bushes, ball joints, dampers, tyres and alignment all influence the precise steering feel owners expect.', points: ['Repair looseness before alignment.', 'Diagnose brake vibration across discs, hubs, bushes and wheel condition.', 'Calibrate steering or driver-assistance functions where the repair procedure requires it.'] },
    ],
    symptoms: [{ title: 'Rough idle or misfire', detail: 'Possible ignition, fuel, air, PCV, sensor or mechanical causes need testing.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW engine diagnostics' }, { title: 'Oil or coolant warning', detail: 'Confirm level safely, inspect for leaks and avoid repeated topping-up without diagnosis.', servicePath: BMW_SERVICE_LINKS.mechanical, serviceLabel: 'BMW mechanical repair' }, { title: 'Front-end knock or brake vibration', detail: 'Suspension joints, bushes, hubs, brakes, wheels and tyres can interact.', servicePath: BMW_SERVICE_LINKS.suspension, serviceLabel: 'BMW suspension repair' }],
    services: [service('3 Series oil service', BMW_SERVICE_LINKS.maintenance, 'Engine-specific oil approval and service reset.'), service('3 Series diagnostics', BMW_SERVICE_LINKS.diagnostics, 'Warning, misfire and live-data diagnosis.'), service('3 Series suspension repair', BMW_SERVICE_LINKS.suspension, 'Steering feel, knocks and tyre-wear causes assessed.'), service('3 Series transmission repair', BMW_SERVICE_LINKS.transmission, 'Automatic, manual and xDrive scope confirmed per car.')],
    faqs: [{ question: 'Which BMW 3 Series models use the B58?', answer: 'B58 applications include selected F30 340i and G20 M340i variants. Exact engine version and market specification should be confirmed from the VIN.' }, { question: 'Are E90, F30 and G20 service requirements the same?', answer: 'No. They use different engines, gearboxes, electronics and service procedures. The generation, engine code and recorded history determine the plan.' }],
  },
  {
    slug: '5-series', name: 'BMW 5 Series', h1: 'BMW 5 Series Service & Repair Dubai',
    metaTitle: 'BMW 5 Series Service & Repair Dubai | Digi-Tec',
    metaDescription: 'BMW 5 Series service Dubai for F10, G30 and G60: B48, B58, N55 and N63 engines, ZF transmissions, chassis electronics and diagnostics.',
    intro: 'A 5 Series can be a four-cylinder commuter, B58-powered 540i, V8 550i, diesel or electrified model. F10, G30 and G60 systems differ substantially, so the VIN, engine and option list guide every service or diagnostic plan.',
    generations: [{ code: 'F10/F11 (2010–2017)', detail: 'N20, N55, N63 and diesel variants with generation-specific ZF automatics and optional adaptive chassis equipment.' }, { code: 'G30/G31 (2017–2023)', detail: 'B48, B58, N63, diesel and plug-in hybrid models with newer driver assistance and iDrive.' }, { code: 'G60/G61 (2023–present)', detail: 'Current combustion, plug-in hybrid and i5-derived architecture; high-voltage work is separately scoped.' }],
    sections: [
      { title: 'Engine and heat management', summary: 'B48, B58, N55 and N63 platforms differ in cooling circuits, lubrication and control systems.', points: ['Review coolant and oil consumption trends with physical leak inspection.', 'Investigate fan, thermostat, pump and airflow performance when temperature behaviour changes.', 'Confirm hybrid or 48-volt safety requirements before applicable work.'] },
      { title: 'Transmission and smoothness complaints', summary: 'A luxury-saloon vibration can come from engine operation, mounts, wheels, propshaft, differential or gearbox—not only the transmission.', points: ['Reproduce the symptom at known road speed, load and temperature.', 'Identify the ZF variant and fluid specification before service.', 'Use adaptations as diagnostic context, not a universal cure.'] },
      { title: 'Adaptive suspension and electronics', summary: 'Damper control, integral active steering and air-suspension equipment vary by generation and options.', points: ['Scan the correct chassis modules and test power supply first when warnings multiply.', 'Inspect mechanical arms, bushes and tyres alongside electronic faults.', 'Programming and coding depend on module access, software and vehicle configuration.'] },
    ],
    symptoms: [{ title: 'Drivetrain malfunction', detail: 'Engine, voltage, gearbox or communication faults may trigger the message.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW diagnostics' }, { title: 'Vibration at idle or road speed', detail: 'The operating condition helps separate engine, mount, wheel and driveline sources.', servicePath: BMW_SERVICE_LINKS.mechanical, serviceLabel: 'BMW mechanical repair' }, { title: 'Chassis or steering warning', detail: 'Check voltage, modules, sensors, actuators and mechanical condition together.', servicePath: BMW_SERVICE_LINKS.suspension, serviceLabel: 'BMW suspension repair' }],
    services: [service('5 Series maintenance', BMW_SERVICE_LINKS.maintenance, 'CBS review plus engine- and history-specific work.'), service('5 Series diagnostics', BMW_SERVICE_LINKS.diagnostics, 'ISTA-supported fault tracing and live data.'), service('5 Series electrical repair', BMW_SERVICE_LINKS.electrical, 'Battery, network, module and iDrive-related diagnosis.'), service('5 Series suspension repair', BMW_SERVICE_LINKS.suspension, 'Adaptive chassis and mechanical wear diagnosis.')],
    faqs: [{ question: 'What does BMW Condition Based Service mean on a 5 Series?', answer: 'CBS estimates when monitored service items are due using time, mileage and vehicle data. It does not identify every fluid, age-related item or developing fault, so history and inspection still matter.' }, { question: 'Can you diagnose a BMW 5 Series iDrive problem?', answer: 'Yes, an iDrive concern can be inspected. Available coding, programming or repair functions depend on the head unit, modules, software level, hardware and access.' }],
  },
  {
    slug: 'm3', name: 'BMW M3', h1: 'BMW M3 Service & Repair Dubai',
    metaTitle: 'BMW M3 Service & Repair Dubai | F80 & G80 | Digi-Tec',
    metaDescription: 'BMW M3 service Dubai for E90/E92, F80 S55 and G80 S58: M-DCT or ZF 8HP, cooling, M differential, brakes, suspension and diagnostics.',
    intro: 'M3 generations are mechanically distinct. The V8 E9x, S55-powered F80 and S58-powered G80 require different oil, cooling, transmission and diagnostic decisions. Digi-Tec identifies the chassis and installed hardware before planning maintenance or performance-related inspection.',
    generations: [{ code: 'E90/E92/E93 M3 (2007–2013)', detail: 'S65 naturally aspirated V8 with six-speed manual or seven-speed M-DCT.' }, { code: 'F80 M3 (2014–2018)', detail: 'S55 twin-turbo inline-six with six-speed manual or seven-speed M-DCT.' }, { code: 'G80 M3 (2020–present)', detail: 'S58 twin-turbo inline-six; manual rear-drive and eight-speed M Steptronic rear- or all-wheel-drive configurations vary.' }],
    sections: [
      { title: 'S65, S55 and S58 are different platforms', summary: 'M3 maintenance cannot be reduced to one M-car interval or oil specification.', points: ['Check the exact engine approval, use and service record before choosing fluids.', 'Assess cooling and charge-air systems on turbocharged generations under realistic load.', 'Treat tuning requests as health-assessment projects, not a software-only transaction.'] },
      { title: 'Manual, M-DCT and ZF 8HP', summary: 'Transmission type changes the fluid, service method, fault patterns and road-test plan.', points: ['F80 DCT behaviour should be separated from clutch wear, adaptations, mounts and differential play.', 'G80 Competition uses an eight-speed M Steptronic; it is not M-DCT.', 'Confirm the fitted transmission and differential before ordering parts or fluid.'] },
      { title: 'M brakes, differential and adaptive suspension', summary: 'High loads make measurement and history especially important, while carbon-ceramic equipment needs its own inspection approach.', points: ['Measure discs and pads and identify compound or carbon-ceramic hardware.', 'Inspect differential leaks, mounts and operation when noise or judder is reported.', 'Check dampers, arms, bushes, wheels and tyres before alignment or chassis calibration.'] },
    ],
    symptoms: [{ title: 'Drivetrain malfunction under load', detail: 'Boost, ignition, fuel, temperature, transmission and sensor conditions can contribute.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW M diagnostics' }, { title: 'DCT warning or harsh engagement', detail: 'F80 diagnosis must consider clutch, hydraulic, control, fluid, mount and driveline evidence.', servicePath: BMW_SERVICE_LINKS.transmission, serviceLabel: 'BMW transmission repair' }, { title: 'Cooling warning or reduced performance', detail: 'Stop if temperature is unsafe; inspect the applicable engine and charge-air circuits.', servicePath: BMW_SERVICE_LINKS.mechanical, serviceLabel: 'BMW mechanical repair' }],
    services: [service('M3 maintenance', BMW_SERVICE_LINKS.maintenance, 'Generation-specific oil, filters and inspection.'), service('M3 engine diagnostics', BMW_SERVICE_LINKS.diagnostics, 'S65, S55 or S58 fault tracing.'), service('M3 transmission service', BMW_SERVICE_LINKS.transmission, 'Manual, M-DCT and ZF 8HP correctly distinguished.'), service('M3 brakes and suspension', BMW_SERVICE_LINKS.suspension, 'M chassis condition assessed before setup changes.')],
    faqs: [{ question: 'What is the difference between the S55 and S58 in the M3?', answer: 'The F80 M3 uses the S55; the G80 M3 uses the newer S58. They are different engine families with different cooling, control, hardware and service requirements.' }, { question: 'Does the G80 M3 use M-DCT?', answer: 'No. G80 automatic variants use an eight-speed M Steptronic transmission; some rear-wheel-drive models use a six-speed manual. The F80 offered the seven-speed M-DCT.' }],
  },
  {
    slug: 'm4', name: 'BMW M4', h1: 'BMW M4 Service & Repair Dubai',
    metaTitle: 'BMW M4 Service & Repair Dubai | F82 & G82 | Digi-Tec',
    metaDescription: 'BMW M4 service Dubai for F82/F83 S55 and G82/G83 S58: M-DCT or ZF 8HP, cooling, brakes, differential, suspension and ISTA diagnostics.',
    intro: 'The M4 name covers the F82/F83 S55 platform and the G82/G83 S58 platform. Their gearbox choices, chassis electronics and cooling packages differ, so maintenance and fault diagnosis begin with the exact generation and installed equipment.',
    generations: [{ code: 'F82/F83 M4 (2014–2020)', detail: 'S55 twin-turbo inline-six with manual or seven-speed M-DCT; Competition and CS hardware varies.' }, { code: 'G82/G83 M4 (2020–present)', detail: 'S58 twin-turbo inline-six with manual or eight-speed M Steptronic; xDrive is fitted to selected variants.' }],
    sections: [
      { title: 'S55 versus S58 service planning', summary: 'Both are M twin-turbo sixes, but their architecture, control and thermal systems are not interchangeable.', points: ['Confirm oil approval and quantity for the exact variant.', 'Log boost, mixture, ignition and temperatures when diagnosing load-related faults.', 'Inspect the cooling package before track use or supported performance work.'] },
      { title: 'M-DCT, manual and eight-speed automatic', summary: 'F82 DCT and G82 eight-speed automatic procedures must never be conflated.', points: ['Identify when, how and at what temperature a shift symptom occurs.', 'Inspect mounts and differential behaviour with gearbox data.', 'Use the correct fluid and post-service procedure for the fitted unit.'] },
      { title: 'Convertible and coupe chassis differences', summary: 'F83 and G83 convertibles add body and roof systems and carry different weight and chassis considerations from coupes.', points: ['Diagnose roof or body-electrical concerns separately from powertrain warnings.', 'Measure brakes and tyres based on actual condition and use.', 'Check adaptive dampers and alignment only after mechanical wear is addressed.'] },
    ],
    symptoms: [{ title: 'Power loss or misfire under boost', detail: 'Air, boost, ignition, fuel, temperature or control faults require recorded evidence.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW diagnostics' }, { title: 'Rear differential noise or judder', detail: 'Fluid history, mounts, tyres and driveline play should be checked before repair scope.', servicePath: BMW_SERVICE_LINKS.mechanical, serviceLabel: 'BMW mechanical repair' }, { title: 'Transmission warning', detail: 'The route differs between F82 M-DCT and G82 eight-speed cars.', servicePath: BMW_SERVICE_LINKS.transmission, serviceLabel: 'BMW transmission repair' }],
    services: [service('M4 maintenance', BMW_SERVICE_LINKS.maintenance, 'S55 or S58-specific service planning.'), service('M4 diagnostics', BMW_SERVICE_LINKS.diagnostics, 'ISTA-supported engine, chassis and network testing.'), service('M4 transmission repair', BMW_SERVICE_LINKS.transmission, 'Manual, M-DCT or eight-speed systems identified.'), service('M4 brake repair', BMW_SERVICE_LINKS.brakes, 'Compound and optional carbon-ceramic systems inspected appropriately.')],
    faqs: [{ question: 'Do F82 and G82 BMW M4 models use the same engine?', answer: 'No. The F82/F83 uses the S55, while the G82/G83 uses the S58. Their hardware, control systems and service requirements differ.' }, { question: 'Can an M4 be inspected before tuning?', answer: 'A health and compatibility inspection can be requested. Available performance work depends on the exact vehicle, software, hardware, condition and intended use.' }],
  },
  {
    slug: 'm5', name: 'BMW M5', h1: 'BMW M5 Service & Repair Dubai',
    metaTitle: 'BMW M5 Service & Repair Dubai | F10 & F90 | Digi-Tec',
    metaDescription: 'BMW M5 service Dubai for F10 and F90 S63 V8 models: M-DCT or ZF 8HP, cooling, M xDrive, differential, brakes and diagnostics.',
    intro: 'The F10 and F90 M5 share an S63 lineage but not one drivetrain. F10 uses rear-wheel drive and M-DCT; F90 combines an updated S63 with an eight-speed automatic and M xDrive. Diagnosis and maintenance must follow that distinction.',
    generations: [{ code: 'F10 M5 (2011–2016)', detail: 'S63TU twin-turbo V8, seven-speed M-DCT and rear-wheel drive.' }, { code: 'F90 M5 (2017–2023)', detail: 'Updated S63 twin-turbo V8, eight-speed M Steptronic and switchable M xDrive.' }, { code: 'Current M5', detail: 'Electrified current-generation architecture requires separate high-voltage capability confirmation before applicable work.' }],
    sections: [
      { title: 'S63 lubrication and heat management', summary: 'The hot-V S63 operates under high thermal load. Dubai conditions make cooling airflow, fluid condition and leak-free systems particularly important without proving any particular failure.', points: ['Investigate oil level change, smoke or smell with leak, ventilation and combustion checks.', 'Inspect engine and charge-air cooling performance according to the generation.', 'Establish baseline health before supported performance work.'] },
      { title: 'F10 M-DCT versus F90 ZF 8HP', summary: 'These are fundamentally different transmissions and need different fluids, tests and service decisions.', points: ['Record shift concern, temperature, drive mode and load.', 'Check engine torque delivery, mounts and differential play alongside gearbox data.', 'F90 M xDrive adds transfer-case and front-driveline checks absent from F10.'] },
      { title: 'M chassis and high-performance brakes', summary: 'Vehicle weight, output and use make accurate measurement important for brakes, tyres, arms, dampers and alignment.', points: ['Identify compound or carbon-ceramic brake equipment before quoting.', 'Inspect adaptive damper faults with mechanical suspension condition.', 'Check all four tyres carefully on M xDrive models.'] },
    ],
    symptoms: [{ title: 'Oil smell or smoke', detail: 'External leakage, crankcase ventilation and exhaust-entry paths need inspection; do not diagnose from smell alone.', servicePath: BMW_SERVICE_LINKS.mechanical, serviceLabel: 'BMW mechanical repair' }, { title: 'Drivetrain malfunction', detail: 'S63 engine, voltage, transmission or xDrive faults can trigger reduced power.', servicePath: BMW_SERVICE_LINKS.diagnostics, serviceLabel: 'BMW diagnostics' }, { title: 'Harsh shift or driveline thump', detail: 'F10 M-DCT and F90 eight-speed/M xDrive routes are different.', servicePath: BMW_SERVICE_LINKS.transmission, serviceLabel: 'BMW transmission repair' }],
    services: [service('M5 maintenance', BMW_SERVICE_LINKS.maintenance, 'S63 service planning based on generation and use.'), service('M5 diagnostics', BMW_SERVICE_LINKS.diagnostics, 'Engine, gearbox, xDrive and chassis fault tracing.'), service('M5 transmission repair', BMW_SERVICE_LINKS.transmission, 'F10 DCT and F90 8HP distinguished.'), service('M5 cooling and mechanical repair', BMW_SERVICE_LINKS.mechanical, 'Leak, temperature and engine concerns diagnosed before parts.')],
    faqs: [{ question: 'Do F10 and F90 M5 models use the same transmission?', answer: 'No. F10 M5 uses a seven-speed M-DCT. F90 M5 uses an eight-speed M Steptronic automatic and adds M xDrive.' }, { question: 'How should an M5 be maintained in Dubai?', answer: 'Follow the correct BMW requirements and CBS while also reviewing actual use, history, fluid condition, cooling performance, brakes, tyres and any modifications. There is no single shorter interval suitable for every M5.' }],
  },
];

export const getBmwModelBySlug = (slug?: string) => bmwModelPages.find((model) => model.slug === slug);
export const getBmwModelPath = (slug: string) => modelPath(slug);
