export const MCLAREN_HUB_PATH = '/brands/mclaren-service-dubai';

export const MCLAREN_HUB_INTRO = 'DIGI-TEC is an independent workshop in Al Quoz, Dubai, for McLaren service, maintenance, diagnostics and vehicle-specific repair enquiries. Tell us the model, year, mileage and concern; we then confirm the appropriate assessment, diagnostic access and workshop scope for the exact vehicle.';

export const MCLAREN_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to request a McLaren assessment.\n\nModel: \nYear: \nMileage: \nWarning or symptoms: \nPreferred appointment time: ')}`;

export const MCLAREN_SERVICES = [
  { slug: 'oil-change', title: 'Maintenance and oil servicing', anchor: 'McLaren oil change and maintenance', copy: 'Service planning starts with the exact model, year, mileage and available history. Oil, filters, fluids and inspection items are confirmed from vehicle-specific information before an estimate is prepared.' },
  { slug: 'engine-diagnostics', title: 'Engine diagnostics and warning lights', anchor: 'McLaren engine diagnostics', copy: 'Warning lights, reduced performance, misfires and starting concerns require compatible fault-data review and physical testing. Diagnostic coverage and supported functions are confirmed for the vehicle.' },
  { slug: 'mechanical-repair', title: 'Engine, cooling and mechanical concerns', anchor: 'McLaren mechanical repair assessment', copy: 'Oil leaks, coolant loss, overheating, unusual noise and drivability concerns are assessed before parts or repair work are proposed.' },
  { slug: 'transmission-repair', title: 'Transmission and gearbox assessment', anchor: 'McLaren transmission repair assessment', copy: 'Shift concerns, warning messages, leaks and clutch behaviour are assessed against the fitted transmission. Fluid service, calibration and internal repair availability are confirmed only after identification and inspection.' },
  { slug: 'suspension-repair', title: 'Suspension and vehicle-lift concerns', anchor: 'McLaren suspension assessment', copy: 'Ride-height, front-lift, noise and handling concerns require identification of the model-specific suspension system. Hydraulic work, parts and supported calibration functions are confirmed before acceptance.' },
  { slug: 'brake-repair', title: 'Brakes and tyres', anchor: 'McLaren brake inspection', copy: 'Brake warnings, vibration, pad or rotor wear and tyre condition are inspected against the fitted system. Carbon-ceramic components require vehicle-specific measurement and parts confirmation.' },
  { slug: 'electrical-repair', title: 'Electrical and battery concerns', anchor: 'McLaren electrical assessment', copy: 'Battery drain, low-voltage warnings, starting problems and electrical faults are traced with appropriate testing. Module programming is not assumed and requires separate capability and vehicle-compatibility confirmation.' },
  { slug: 'ac-repair', title: 'AC and climate concerns', anchor: 'McLaren AC assessment', copy: 'Weak cooling, leaks, compressor noise and airflow problems are tested before refrigerant or parts are recommended. The vehicle label determines the correct refrigerant and service equipment.' },
] as const;

export const MCLAREN_SECONDARY_SERVICES = [
  { slug: 'steering-repair', label: 'McLaren steering assessment' },
  { slug: 'battery-replacement', label: 'McLaren battery replacement' },
  { slug: 'exhaust-repair', label: 'McLaren exhaust assessment' },
  { slug: 'fuel-system-repair', label: 'McLaren fuel-system assessment' },
  { slug: 'body-repair', label: 'McLaren body-repair enquiry' },
  { slug: 'tire-repair', label: 'McLaren tyre inspection' },
] as const;

export const MCLAREN_MODEL_GROUPS = [
  { name: 'Sports Series', models: '570S, 570GT and 600LT', copy: 'Maintenance, warning-light, cooling, brake, suspension and drivability enquiries are assessed against the exact generation and fitted systems.' },
  { name: 'Super Series', models: '650S, 675LT, 720S, 765LT and 750S', copy: 'Engine, SSG transmission, braking, vehicle-lift and suspension considerations differ across generations, so scope is confirmed from the vehicle.' },
  { name: 'GT and GTS', models: 'McLaren GT and GTS', copy: 'Service history, mileage, storage, battery condition, cooling and the reported concern guide the first inspection.' },
  { name: 'Artura', models: 'Artura and Artura Spider', copy: 'General service and low-voltage enquiries can be discussed. Hybrid high-voltage work is not advertised and requires separate confirmation of training, equipment and scope.' },
  { name: 'Earlier road cars', models: 'MP4-12C / 12C', copy: 'Age, service history, parts access and the exact mechanical, electrical or hydraulic concern are reviewed before work is accepted.' },
] as const;

export const MCLAREN_FAQS = [
  { q: 'Where is your McLaren workshop in Dubai?', a: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Use the directions link on this page or send your model, year, mileage and concern on WhatsApp before visiting.' },
  { q: 'Are you an independent McLaren workshop?', a: 'Yes. DIGI-TEC is an independent vehicle workshop and is not presented as McLaren-authorised or factory-endorsed. Availability, diagnostic access, parts and procedures are confirmed for the exact vehicle and requested work.' },
  { q: 'What information is needed for a McLaren service quote?', a: 'Send the model, year, mileage, available service history, requested work and any warning or symptom. A VIN may be requested later when it is needed to confirm the fitted system, parts or procedure.' },
  { q: 'How much does McLaren servicing cost in Dubai?', a: 'There is no responsible single price for every McLaren. The estimate depends on the model, history, agreed inspection, diagnostic time, fluids, parts and findings. An accurate repair quote may require the vehicle to be inspected first.' },
  { q: 'How often should my McLaren be serviced?', a: 'Follow the schedule and service information for the exact model and year, then consider mileage, history, storage and use. We do not apply one interval, oil grade or checklist to every McLaren.' },
  { q: 'Can you assess a McLaren engine warning light?', a: 'An assessment can combine compatible fault data with physical checks and a road test when appropriate. A warning code is a starting point for diagnosis, not proof that the named component has failed.' },
  { q: 'Can you inspect McLaren gearbox or shifting problems?', a: 'Gearbox warnings, leaks, engagement and shift-quality concerns can be assessed. The fitted transmission is identified first; service, clutch, calibration, internal repair and parts availability are confirmed only after diagnosis.' },
  { q: 'Which McLaren models and repair scopes can you accept?', a: 'Enquiries can include Sports Series, Super Series, GT, GTS, Artura and earlier road cars. Maintenance, diagnostics and selected mechanical, transmission, suspension, brake, electrical, battery and AC concerns can be discussed, but acceptance depends on the exact model, systems, access and findings. Hybrid high-voltage work is not advertised.' },
  { q: 'What parts and fluids will be included in the estimate?', a: 'The estimate should identify the proposed parts or fluid specification, quantity, labour and any diagnostic or additional work. Vehicle-specific information is checked before a part or fluid is proposed; availability and applicable terms are confirmed at quotation.' },
  { q: 'How do I request a McLaren appointment?', a: 'Call the Al Quoz workshop or open the WhatsApp enquiry on this page. Share the model, year, mileage, warning or symptoms and preferred time. Sending the message requests an appointment; the team will confirm availability.' },
];
