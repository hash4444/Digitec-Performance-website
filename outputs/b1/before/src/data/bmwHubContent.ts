import { BMW_HUB_PATH } from './bmwModelPages';
import type { ServiceKey } from './brandServices';

type BmwHubService = { slug: ServiceKey; label: string; description?: string; title?: string };

export const BMW_HUB_INTRO = 'DIGI-TEC is an independent BMW workshop in Al Quoz, Dubai, for maintenance, repair, diagnostics and coding enquiries. We check your model, VIN, service history and the reported concern before recommending work. Diagnostic access, coding functions and repair options are confirmed for your exact vehicle. Book an inspection on WhatsApp or call the workshop.';

export const BMW_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to book a BMW inspection.\n\nBMW model: \nYear: \nMileage: \nWarning lights or symptoms: \nPreferred appointment time: ')}`;

export const BMW_CORE_SERVICES = [
  { title: 'BMW maintenance & major service', slug: 'oil-change', label: 'BMW oil change and service checks', description: 'Plan routine or major service around the Condition Based Service display, mileage and service history. Oil, filters, spark plugs, brake fluid and additional checks are included when due for the fitted engine and agreed service scope.' },
  { title: 'Engine repair & cooling', slug: 'mechanical-repair', label: 'BMW engine and mechanical repair', description: 'Oil leaks, coolant loss, overheating and unusual engine noises need inspection before parts are chosen. The repair plan follows the engine code, test findings and condition of the cooling and lubrication systems.' },
  { title: 'BMW diagnostics', slug: 'engine-diagnostics', label: 'BMW engine diagnostics in Dubai', description: 'A drivetrain malfunction, check-engine light or rough idle can have several causes. ISTA-compatible fault review, live data and physical tests help identify the source; supported diagnostic access is confirmed for your model.' },
  { title: 'Transmission repair & ZF service', slug: 'transmission-repair', label: 'BMW transmission repair in Dubai', description: 'Harsh shifts, slipping, leaks or a gearbox warning call for checks of fault data, fluid condition and the connected driveline. ZF 8HP service, M-DCT and manual gearbox procedures are matched to the transmission fitted.' },
  { title: 'Brake inspection & repair', slug: 'brake-repair', label: 'BMW brake repair', description: 'Brake warnings, squealing or vibration can involve pads, discs, sensors, calipers or hydraulic components. We inspect the cause and confirm the standard, M Sport or M brake specification before proposing parts.' },
  { title: 'Suspension & air suspension', slug: 'suspension-repair', label: 'BMW suspension repair', description: 'Knocking, uneven ride height or a harsh ride needs checks of bushes, arms, dampers and the fitted suspension system. Air springs, leaks, compressors and height sensors are considered on air-equipped models.' },
  { title: 'Air conditioning repair', slug: 'ac-repair', label: 'BMW AC repair in Dubai', description: 'Weak cooling, warm air at idle or uneven cabin temperature needs AC performance testing. Inspection may cover refrigerant leaks, the compressor, condenser, fans and climate controls before a recharge or repair is proposed.' },
  { title: 'Electrical, iDrive & coding', slug: 'electrical-repair', label: 'BMW electrical repair and coding enquiries', description: 'Electrical faults, iDrive issues and coding requests start with voltage, wiring, module and compatibility checks. Coding, programming and retrofit functions depend on the VIN, fitted hardware, software and required access.' },
  { title: 'Battery replacement & registration', slug: 'battery-replacement', label: 'BMW battery replacement', description: 'Slow starting and battery warnings can also involve charging or unwanted current draw. Battery type, capacity and the supported registration or coding procedure are confirmed for the vehicle before replacement.' },
] satisfies BmwHubService[];

export const BMW_ADDITIONAL_SERVICES = [
  { slug: 'body-repair', label: 'BMW body repair', description: 'Panel damage, paintwork and collision repair enquiries are assessed separately from routine mechanical servicing.' },
  { slug: 'steering-repair', label: 'BMW steering repair' },
  { slug: 'exhaust-repair', label: 'BMW exhaust repair' },
  { slug: 'fuel-system-repair', label: 'BMW fuel system repair' },
  { slug: 'tire-repair', label: 'BMW tyre repair' },
] satisfies BmwHubService[];

export const bmwServicePath = (slug: ServiceKey) => `${BMW_HUB_PATH}/${slug}`;

export const BMW_HUB_FAQS = [
  { q: 'How often should a BMW be serviced in Dubai?', a: 'Start with the BMW Condition Based Service display and the maintenance guidance for your exact model. We also review mileage, history and use in Dubai heat and traffic. An oil service, brake-fluid change or major service is quoted according to what is due; there is no single interval for every BMW.' },
  { q: 'What does BMW Condition Based Service mean?', a: 'Condition Based Service uses time, mileage and vehicle data to estimate when monitored maintenance items are due. It helps plan servicing but does not replace inspection of a warning, leak, noise or other symptom.' },
  { q: 'Can you diagnose BMW drivetrain malfunction warnings?', a: 'We can inspect the warning using compatible fault data, live readings and physical tests. Engine, ignition, boost, fuel, voltage, transmission and driveline concerns can trigger similar messages. Send the exact warning, model, year and symptoms so the workshop can confirm the first inspection.' },
  { q: 'Does a BMW ZF 8HP transmission need servicing?', a: 'The service decision depends on the fitted 8HP variant, applicable BMW and transmission guidance, history, use and condition. We identify the gearbox before proposing fluid, a filter or a procedure. Harsh shifting or a warning needs diagnosis; fluid service alone may not resolve a shifting fault.' },
  { q: 'Can you replace and register a BMW battery?', a: 'Battery replacement and registration are confirmed for the exact BMW and its energy-management system. We check the existing battery specification and charging condition, then confirm the correct replacement and supported registration function. A change in battery type or capacity may also require coding.' },
  { q: 'Can you repair BMW AC problems in Dubai?', a: 'We can inspect weak cooling, warm air and climate-control faults. AC performance, leaks, compressor operation, airflow and electrical controls may need testing. The available repair and refrigerant specification are confirmed for your vehicle before work is agreed.' },
  { q: 'Do you offer BMW coding and iDrive diagnostics?', a: 'Coding and iDrive requests are reviewed against the VIN, head unit, software level, fitted modules and required access. Tell us the fault or feature you want checked. Supported diagnostics, coding, programming or retrofit functions are confirmed before booking; availability varies by vehicle.' },
  { q: 'Do you use genuine BMW or OE-quality parts?', a: 'Depending on the job and availability, parts options may include genuine BMW parts, established OE-supplier components or a suitable customer-approved alternative. Ask for the proposed manufacturer, specification and fluid approval in the estimate before agreeing to the work.' },
  { q: 'Why is my BMW losing coolant?', a: 'Possible causes include a hose, expansion tank, radiator, thermostat housing, water pump or an internal engine concern. An inspection is needed to find the source. Repeated top-ups do not resolve a leak; stop driving if the engine overheats.' },
  { q: 'What BMW models use the B58?', a: 'Selected 340i and M340i, 440i and M440i, 540i, 740i, X3 M40i, X4 M40i and X5 40i variants use the B58. Fitment varies by generation and market, so the VIN and engine code must confirm the specification.' },
  { q: 'How much does BMW service cost and how long does it take?', a: 'Cost and timing depend on the model, due maintenance, diagnostic work, required parts and workshop availability. Send your model, year, mileage and symptoms for the appropriate next step. The team confirms the scope and available appointment; additional repair work may require an inspection first.' },
];
