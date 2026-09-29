export const AUDI_HUB_PATH = '/brands/audi-service-dubai';

export const AUDI_HUB_INTRO = 'DIGI-TEC is an independent Audi workshop in Al Quoz, Dubai. Owners can request maintenance, diagnostics and repair assessment for an Audi, with the model, year, mileage, warning or symptom and fitted systems checked before work is recommended.';

export const AUDI_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to book an Audi inspection.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: \nPreferred appointment time: ')}`;

export const AUDI_SERVICES = [
  { slug: 'oil-change', title: 'Audi maintenance and oil service', anchor: 'Audi oil service in Dubai', copy: 'Service items, oil approval, filters and any supported reset are matched to the engine, model year, history and vehicle information.' },
  { slug: 'engine-diagnostics', title: 'Engine diagnostics and warning lights', anchor: 'Audi engine diagnostics', copy: 'Fault context, live data and suitable physical checks help investigate warning lights, misfires, reduced power and starting concerns.' },
  { slug: 'mechanical-repair', title: 'Engine, cooling and mechanical repair', anchor: 'Audi mechanical repair assessment', copy: 'Coolant loss, overheating, leaks, unusual noise and drivability concerns are assessed before parts or a repair path is proposed.' },
  { slug: 'transmission-repair', title: 'Transmission and gearbox repair', anchor: 'Audi transmission repair in Dubai', copy: 'S tronic, tiptronic and quattro-related symptoms are separated by identifying the fitted transmission, driveline and vehicle history first.' },
  { slug: 'brake-repair', title: 'Brake repair and inspection', anchor: 'Audi brake repair in Dubai', copy: 'Pads, discs, sensors, calipers, fluid and vibration concerns are inspected for the actual brake system fitted to the vehicle.' },
  { slug: 'suspension-repair', title: 'Suspension and air-suspension repair', anchor: 'Audi suspension repair in Dubai', copy: 'Mechanical, adaptive and air-suspension concerns need different checks; ride-height systems are assessed only where fitted.' },
  { slug: 'ac-repair', title: 'AC repair', anchor: 'Audi AC repair in Dubai', copy: 'Weak cooling, airflow, leak, compressor and climate-control concerns are tested under the vehicle-specific refrigerant and system specification.' },
  { slug: 'battery-replacement', title: 'Battery replacement and charging diagnosis', anchor: 'Audi battery replacement in Dubai', copy: 'Battery condition, charging performance and unwanted-current concerns are tested before a low-voltage battery is recommended.' },
  { slug: 'body-repair', title: 'Body repair', anchor: 'Audi body repair in Dubai', copy: 'Bodywork is a separate service option. The damage, paint, parts and repair route are assessed independently from mechanical diagnosis.' },
] as const;

export const AUDI_SECONDARY_SERVICES = [
  { slug: 'electrical-repair', label: 'Audi electrical assessment' },
  { slug: 'steering-repair', label: 'Audi steering assessment' },
  { slug: 'fuel-system-repair', label: 'Audi fuel-system assessment' },
  { slug: 'exhaust-repair', label: 'Audi exhaust assessment' },
  { slug: 'tire-repair', label: 'Audi tyre inspection' },
] as const;

export const AUDI_FAQS = [
  { q: 'Where is your Audi workshop in Dubai?', a: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Send the Audi model, year, mileage and concern on WhatsApp before visiting so the appropriate inspection can be confirmed.' },
  { q: 'How often should an Audi be serviced in Dubai?', a: 'Follow the service information for the exact model and year, then consider mileage, recorded history and conditions such as heat, traffic and dust. The correct due items are confirmed for the individual vehicle.' },
  { q: 'Can you diagnose Audi engine or drivetrain warnings?', a: 'Compatible fault data can be combined with suitable physical testing and, where appropriate, a road test. A stored code is evidence for diagnosis, not proof that the named part must be replaced.' },
  { q: 'Can you investigate an Audi S tronic or tiptronic concern?', a: 'Yes, transmission symptoms can be assessed. The fitted transmission, vehicle history, fault information and drivability concern must be identified before fluid, adaptation or repair work is recommended.' },
  { q: 'Can you replace an Audi battery?', a: 'Low-voltage battery and charging concerns can be assessed. Battery specification, fitment and any supported registration or initialization requirement are confirmed for the exact vehicle before replacement.' },
  { q: 'Can you repair Audi AC problems in Dubai?', a: 'Weak cooling, airflow, leaks, compressor and electrical climate concerns can be assessed. The exact vehicle and refrigerant label determine the relevant test and service specification.' },
  { q: 'Do you use genuine Audi or OE-quality parts?', a: 'Parts options depend on the exact repair and availability. The estimate identifies the proposed part option before approval; part numbers and fitment are confirmed for the specific vehicle.' },
  { q: 'What should I send before booking?', a: 'Send the Audi model, year, mileage, warning message or symptoms, when they occur and your preferred appointment time. Photos or a short video can help describe an intermittent concern.' },
] as const;
