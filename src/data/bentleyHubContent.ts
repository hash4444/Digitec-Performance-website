export const BENTLEY_HUB_PATH = '/brands/bentley-service-dubai';

export const BENTLEY_HUB_INTRO = 'DIGI-TEC is an independent Bentley workshop in Al Quoz, Dubai. Bentley owners can request maintenance, repair and diagnostics for the exact vehicle; send the model, year, mileage, history and concern so the team can confirm the appropriate assessment, parts and workshop scope before booking.';

export const BENTLEY_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to request a Bentley service assessment.\n\nModel: \nYear: \nMileage: \nService history: \nWarning or symptoms: \nPreferred appointment time: ')}`;

export const BENTLEY_SERVICES = [
  { slug: 'oil-change', title: 'Bentley maintenance and oil service', anchor: 'Bentley maintenance in Dubai', copy: 'The model year, engine, mileage, history and applicable service information determine the oil, filters, fluids and due inspection items. One generic package is not applied to every Bentley.' },
  { slug: 'engine-diagnostics', title: 'Bentley diagnostics and warning lights', anchor: 'Bentley diagnostics in Dubai', copy: 'Warning messages, misfires, reduced performance and starting concerns are assessed with compatible data and suitable physical tests. A fault code is a diagnostic starting point, not a parts diagnosis.' },
  { slug: 'mechanical-repair', title: 'Engine, cooling and mechanical repair', anchor: 'Bentley mechanical repair assessment', copy: 'Oil leaks, coolant loss, overheating, unusual noise and drivability concerns are inspected before a repair route, parts or timing are proposed.' },
  { slug: 'transmission-repair', title: 'Bentley transmission repair', anchor: 'Bentley transmission repair in Dubai', copy: 'Gearbox warnings, leaks, engagement and shift-quality concerns are assessed against the fitted transmission. Fluid, service functions and repair scope are confirmed for the exact vehicle.' },
  { slug: 'suspension-repair', title: 'Bentley suspension repair', anchor: 'Bentley suspension repair in Dubai', copy: 'Ride-height warnings, leaning, compressor operation, noise and ride-quality changes need a model-specific inspection. Air suspension, damping and 48-volt systems are not assumed across every Bentley.' },
  { slug: 'brake-repair', title: 'Bentley brake inspection and repair', anchor: 'Bentley brake repair in Dubai', copy: 'Pads, discs, brake fluid, sensors, calipers, steering and tyre condition are checked before replacement parts or alignment work are recommended.' },
  { slug: 'electrical-repair', title: 'Bentley electrical and battery concerns', anchor: 'Bentley electrical repair in Dubai', copy: 'Low-voltage warnings, battery drain, charging, comfort-system and module-communication faults require testing. Coding or programming depends on confirmed access and capability.' },
  { slug: 'ac-repair', title: 'Bentley AC repair', anchor: 'Bentley AC repair in Dubai', copy: 'Weak cooling, leaks, airflow, compressor noise and cabin-zone concerns are tested before refrigerant or parts are proposed. The vehicle label determines the correct refrigerant and equipment.' },
] as const;

export const BENTLEY_SECONDARY_SERVICES = [
  { slug: 'battery-replacement', label: 'Bentley battery assessment' },
  { slug: 'steering-repair', label: 'Bentley steering assessment' },
  { slug: 'fuel-system-repair', label: 'Bentley fuel-system assessment' },
  { slug: 'exhaust-repair', label: 'Bentley exhaust assessment' },
  { slug: 'body-repair', label: 'Bentley body-repair enquiry' },
  { slug: 'tire-repair', label: 'Bentley tyre inspection' },
] as const;

export const BENTLEY_MODEL_GROUPS = [
  { name: 'Continental GT and GTC', copy: 'Continental GT generations, engines and transmission arrangements differ. Maintenance, cooling, brake, suspension and drivetrain enquiries should be tied to the model year and fitted equipment.', guide: '/blog/bentley-continental-gt-service-dubai-guide' },
  { name: 'Flying Spur', copy: 'Flying Spur service enquiries can include maintenance, ride quality, cooling, brakes, electrical systems and warning messages. The model year and vehicle specification guide the initial assessment.' },
  { name: 'Bentayga and Bentayga EWB', copy: 'Bentayga models use a mix of petrol and hybrid powertrains. Air suspension, Dynamic Ride and all-wheel steering references apply only where fitted; hybrid high-voltage work is not implied.' },
  { name: 'Earlier Bentley models', copy: 'Mulsanne and earlier Continental or Flying Spur vehicles need an assessment based on age, history, condition and parts access. No universal system or repair procedure is assumed.' },
] as const;

export const BENTLEY_FAQS = [
  { q: 'Where is your Bentley workshop in Dubai?', a: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Send the Bentley model, year, mileage and concern on WhatsApp before visiting so the suitable first assessment can be confirmed.' },
  { q: 'Are you an independent Bentley workshop?', a: 'Yes. DIGI-TEC is an independent workshop and is not presented as Bentley-authorised or factory-endorsed. Vehicle acceptance, diagnostic access, parts and procedures are confirmed for the requested work.' },
  { q: 'What Bentley models can you assess?', a: 'Enquiries can include Continental GT, Continental GTC, Flying Spur, Bentayga, Bentayga EWB and earlier Bentley models. The exact model year, engine, transmission and fitted systems determine the accepted scope.' },
  { q: 'Can you inspect a Bentley gearbox warning?', a: 'A gearbox warning, leak, shift or engagement concern can be assessed against the fitted transmission. Compatible diagnostic access, fluid specification, parts and supported repair scope are confirmed before work.' },
  { q: 'Can you diagnose Bentley air-suspension concerns?', a: 'Ride-height warnings, leaning, compressor operation, noise and changes in ride quality can be assessed. The fitted suspension, damping and 48-volt equipment must be identified before repairs or calibration are proposed.' },
  { q: 'Can you repair Bentley AC problems in Dubai?', a: 'Weak cooling, leaks, airflow, compressor noise and cabin-zone concerns can be assessed. The refrigerant, equipment, parts and accepted repair scope are matched to the exact vehicle.' },
  { q: 'Can you replace a Bentley battery?', a: 'Low-voltage starting, charging and battery-drain concerns can be assessed. Battery specification, fitment and any supported registration or initialization procedure are confirmed for the exact vehicle.' },
  { q: 'How is Bentley maintenance planned in Dubai?', a: 'Use the service information for the exact model and year, then account for mileage, available history, storage, heat exposure and inspection findings. DIGI-TEC does not publish one universal Bentley interval.' },
  { q: 'Do you use genuine Bentley or OE-quality parts?', a: 'The estimate should identify the proposed parts, fluids, quantities and labour before approval. Part choice and availability are confirmed for the vehicle rather than assumed from the badge.' },
  { q: 'What should I send before booking?', a: 'Send the model, year, mileage, service history, warning or symptoms, when they occur and your preferred appointment time. A VIN may be requested later to confirm systems or parts.' },
] as const;
