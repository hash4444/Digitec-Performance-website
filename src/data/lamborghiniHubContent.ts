export const LAMBORGHINI_HUB_PATH = '/brands/lamborghini-service-dubai';

export const LAMBORGHINI_HUB_INTRO = 'DIGI-TEC is an independent workshop in Al Quoz, Dubai, where Lamborghini owners can request maintenance, diagnostics and vehicle-specific repair assessments. Send the model, year, mileage and concern so the team can confirm diagnostic access, parts and the appropriate workshop scope before booking.';

export const LAMBORGHINI_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to request a Lamborghini assessment.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: \nPreferred appointment time: ')}`;

export const LAMBORGHINI_SERVICES = [
  { slug: 'oil-change', title: 'Maintenance and oil servicing', anchor: 'Lamborghini oil service in Dubai', copy: 'Oil, filters, fluids and inspection items are confirmed from the exact model, year and available service information. We do not apply one interval or package to every Lamborghini.' },
  { slug: 'engine-diagnostics', title: 'Engine diagnostics and warning lights', anchor: 'Lamborghini engine diagnostics', copy: 'Compatible fault data is combined with appropriate physical testing for warning lights, misfires, starting concerns and changes in drivability.' },
  { slug: 'mechanical-repair', title: 'Engine, cooling and mechanical concerns', anchor: 'Lamborghini mechanical repair assessment', copy: 'Oil leaks, coolant loss, overheating, unusual noises and drivability concerns are assessed before parts or a repair scope are proposed.' },
  { slug: 'transmission-repair', title: 'Transmission and gearbox assessment', anchor: 'Lamborghini transmission assessment', copy: 'The fitted transmission is identified first: Huracán EVO uses a seven-speed LDF dual-clutch transmission, Urus S an eight-speed automatic, and Aventador SVJ an ISR gearbox.' },
  { slug: 'suspension-repair', title: 'Suspension and vehicle-lift concerns', anchor: 'Lamborghini suspension assessment', copy: 'Urus S adaptive air suspension is not the same system as a supercar front-axle lift. The model, variant and fitted equipment determine the inspection and supported repair scope.' },
  { slug: 'brake-repair', title: 'Brake inspection and repair', anchor: 'Lamborghini brake inspection', copy: 'Pads, discs, sensors, calipers and fluid can be inspected. Carbon-ceramic component measurement, parts and procedures are confirmed for the fitted system.' },
  { slug: 'battery-replacement', title: 'Low-voltage battery and starting concerns', anchor: 'Lamborghini battery assessment', copy: 'Starting, charging and battery-drain concerns are assessed as low-voltage work. Hybrid traction-battery service is not implied and requires separate capability confirmation.' },
  { slug: 'electrical-repair', title: 'Electrical assessment', anchor: 'Lamborghini electrical assessment', copy: 'Voltage, wiring, sensors and module communication may require testing. Coding or programming is offered only when access and workshop capability are confirmed.' },
  { slug: 'ac-repair', title: 'AC and climate concerns', anchor: 'Lamborghini AC assessment', copy: 'Weak cooling, leaks, airflow and compressor concerns are tested before refrigerant or parts are recommended; the vehicle label determines the specification.' },
] as const;

export const LAMBORGHINI_SECONDARY_SERVICES = [
  { slug: 'steering-repair', label: 'Lamborghini steering assessment' },
  { slug: 'exhaust-repair', label: 'Lamborghini exhaust assessment' },
  { slug: 'fuel-system-repair', label: 'Lamborghini fuel-system assessment' },
  { slug: 'body-repair', label: 'Lamborghini body-repair enquiry' },
  { slug: 'tire-repair', label: 'Lamborghini tyre inspection' },
] as const;

export const LAMBORGHINI_FAQS = [
  { q: 'Where is your Lamborghini workshop in Dubai?', a: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Use the directions link or send the model, year, mileage and concern on WhatsApp before visiting.' },
  { q: 'Which Lamborghini models and services can you assess?', a: 'Enquiries can include Urus, Huracán, Aventador, Gallardo and Revuelto models. Maintenance, diagnostics and selected mechanical, transmission, suspension, brake, low-voltage electrical and AC concerns can be discussed; acceptance depends on the exact vehicle and required scope.' },
  { q: 'What determines Lamborghini service cost?', a: 'Cost depends on the model, history, diagnostic time, agreed service or repair scope, parts, fluids and findings. An accurate repair estimate may require an inspection.' },
  { q: 'Do you provide Lamborghini oil and filter servicing?', a: 'Oil-service enquiries are welcome. The correct oil, filter, seals, due items and supported reset are confirmed from vehicle-specific information before quotation.' },
  { q: 'Can you investigate battery-drain or starting problems?', a: 'Low-voltage battery, charging, unwanted-current and starting concerns can be assessed. Battery specification and any supported registration procedure are confirmed for the exact vehicle. This does not advertise hybrid traction-battery repair.' },
  { q: 'Can you diagnose engine or gearbox warning lights?', a: 'Compatible fault information can be combined with physical tests and a road test when appropriate. A warning code does not by itself identify the failed part, and supported diagnostic functions are confirmed before booking.' },
  { q: 'Can you inspect Urus suspension or Lamborghini front-lift concerns?', a: 'The concern can be discussed and the fitted system identified. Urus air suspension and supercar front-lift systems are different, so hydraulic procedures, calibration, parts and accepted repair scope are confirmed for the exact model.' },
  { q: 'Can you inspect carbon-ceramic brakes?', a: 'Brake concerns can be inspected, but not every Lamborghini has the same brake specification. Measurement method, replacement parts and accepted workshop scope are confirmed for the fitted system.' },
  { q: 'How is the correct maintenance schedule determined?', a: 'Use manufacturer service information for the exact model and year, then consider history, mileage, storage and Dubai use. DIGI-TEC does not publish one universal interval for every Lamborghini.' },
  { q: 'What information should I send for an estimate?', a: 'Send the model, year, mileage, warning text, symptoms, when they occur and your preferred appointment time. A VIN is not required for the first enquiry but may be requested later to confirm systems or parts.' },
] as const;
