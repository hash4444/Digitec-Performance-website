import type { ServiceKey } from './brandServices';
import { PORSCHE_HUB_PATH } from './porscheArchitecture';

type PorscheHubService = { slug: ServiceKey; title: string; description: string; label: string };

export const PORSCHE_HUB_INTRO = 'Book Porsche service and repair at DIGI-TEC, an independent workshop in Al Quoz, Dubai. Discuss scheduled maintenance, oil leaks, PDK or Tiptronic concerns, brakes, suspension and AC with the team. PIWIS 3 capability supports fault investigation alongside physical checks, with available functions confirmed for your Porsche. Send your model, year and concern to arrange the right first inspection.';

export const PORSCHE_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to arrange Porsche service or repair.\n\nPorsche model: \nYear: \nMileage: \nService needed, warning or symptom: \nPreferred appointment day and time: ')}`;

export const porscheServicePath = (slug: ServiceKey) => `${PORSCHE_HUB_PATH}/${slug}`;

export const PORSCHE_HUB_SERVICES = [
  { slug: 'oil-change', title: 'Porsche maintenance & oil service', description: 'Plan service around your Porsche model, mileage and service history. The correct oil approval, filters and other due items are confirmed before the work is agreed.', label: 'Porsche oil change and service checks' },
  { slug: 'engine-diagnostics', title: 'PIWIS 3 diagnostics', description: 'A warning light, misfire or loss of performance needs more than a code read. Supported PIWIS 3 data and physical tests help trace the cause before a repair is proposed.', label: 'Porsche diagnostics in Dubai' },
  { slug: 'mechanical-repair', title: 'Engine repair, oil leaks & cooling', description: 'Oil leaks, coolant loss, overheating and unusual noises start with inspection of the fitted engine and affected system. The findings guide the repair and parts estimate.', label: 'Porsche engine and mechanical repair' },
  { slug: 'transmission-repair', title: 'PDK & Tiptronic transmission repair', description: 'Jerking, slipping, delayed engagement or gearbox warnings are checked alongside fluid history, engine operation and the connected driveline. Service and repair depend on the fitted gearbox.', label: 'Porsche transmission and PDK repair' },
  { slug: 'brake-repair', title: 'Brake inspection & repair', description: 'Brake warnings, noise or vibration need checks of pads, discs, sensors and related components. Steel, surface-coated and PCCB systems require their own inspection and parts decisions.', label: 'Porsche brake repair' },
  { slug: 'suspension-repair', title: 'Suspension, PASM & air suspension', description: 'Knocking, a low corner or a chassis warning needs physical checks and relevant system data. We identify the fitted suspension before assessing leaks, dampers, bushes or controls.', label: 'Porsche suspension repair' },
  { slug: 'ac-repair', title: 'Porsche AC repair', description: 'Warm air, weak cooling or different temperatures across the cabin need performance, airflow and leak checks. Refrigerant and repair requirements are matched to your vehicle.', label: 'Porsche air-conditioning repair' },
  { slug: 'electrical-repair', title: 'Electrical & starting faults', description: 'Repeated battery discharge, screen faults and electrical warnings can involve supply voltage, wiring or modules. Coding, programming and service functions are confirmed for the exact vehicle.', label: 'Porsche electrical fault diagnosis' },
] satisfies PorscheHubService[];

export const PORSCHE_ADDITIONAL_SERVICES = [
  { slug: 'battery-replacement', label: 'Battery checks and replacement' },
  { slug: 'steering-repair', label: 'Steering repair' },
  { slug: 'exhaust-repair', label: 'Exhaust repair' },
  { slug: 'fuel-system-repair', label: 'Fuel-system repair' },
  { slug: 'body-repair', label: 'Body and paint repair' },
  { slug: 'tire-repair', label: 'Tyre service' },
] satisfies { slug: ServiceKey; label: string }[];

export const PORSCHE_HUB_FAQS = [
  { q: 'How do I book Porsche service at DIGI-TEC?', a: 'Call or WhatsApp +971 4 340 2223 with your Porsche model, year, mileage, the service needed or symptom, and your preferred appointment time. A photo of the warning message and available service history can help. The team confirms the suitable first inspection and appointment availability before your visit to Al Quoz Industrial Area 3, Dubai.' },
  { q: 'How much does Porsche service or repair cost?', a: 'The estimate depends on the exact model, due maintenance, inspection needed, findings and parts availability. Send your vehicle details and concern for the next step. Ask the team to confirm the inspection scope and any diagnostic charge, then review the proposed work, parts and timing before authorising repairs.' },
  { q: 'Which Porsche models can I enquire about?', a: 'You can enquire about 911, Cayenne, Macan, Panamera, Cayman, Boxster and Taycan inspection and service. The model year, powertrain and fitted equipment determine the available work. Taycan, electric Macan and other high-voltage requests require separate confirmation of workshop capability and diagnostic access before acceptance.' },
  { q: 'Do you use PIWIS 3 for Porsche diagnostics?', a: 'DIGI-TEC has PIWIS 3 capability for Porsche fault investigation. Supported scans, live data, service functions, coding and programming depend on the model, control unit and required access. Fault data guides further testing; a stored code alone does not identify the failed part.' },
  { q: 'Can you inspect Porsche PDK, Tiptronic and suspension problems?', a: 'Transmission symptoms, chassis warnings and ride-height concerns can be assessed. Send the warning text and explain when the issue occurs. The fitted gearbox, PASM, PDCC or air-suspension equipment is identified before tests or repairs are proposed; a warning does not by itself confirm which component needs replacement.' },
  { q: 'What parts and service schedule will you use for my Porsche?', a: 'Maintenance follows the applicable schedule for your model, year and specification, with mileage, history and use reviewed. The estimate identifies proposed parts and fluids. Depending on the job and availability, options may include genuine Porsche parts, OE-supplier components or a suitable customer-approved alternative; ask for the manufacturer and specification before agreeing to the work.' },
];
