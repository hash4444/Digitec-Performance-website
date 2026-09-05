export const ROLLS_ROYCE_HUB_PATH = '/brands/rolls-royce-service-dubai';

export const ROLLS_ROYCE_HUB_INTRO = 'DIGI-TEC is an independent workshop in Al Quoz, Dubai, for Rolls-Royce maintenance, diagnostics and vehicle-specific repair enquiries. Send the model, year, mileage, service history and concern so the team can confirm the appropriate first assessment and workshop scope.';

export const ROLLS_ROYCE_WHATSAPP_HREF = `https://wa.me/97143402223?text=${encodeURIComponent('Hi DIGI-TEC, I would like to request a Rolls-Royce service assessment.\n\nModel: \nYear: \nMileage: \nService history: \nWarning or symptoms: \nPreferred appointment time: ')}`;

export const ROLLS_ROYCE_SERVICES = [
  { slug: 'oil-change', title: 'Maintenance and oil servicing', anchor: 'Rolls-Royce oil service in Dubai', copy: 'The model, year, mileage and service history determine the due maintenance items. Oil, filters, fluids and any supported service reset are confirmed from vehicle-specific information before quotation.' },
  { slug: 'engine-diagnostics', title: 'Diagnostics and warning lights', anchor: 'Rolls-Royce diagnostics in Dubai', copy: 'Warning messages, misfires, starting concerns and changes in drivability are assessed with compatible fault data and appropriate physical testing. A stored code is evidence, not proof that a part has failed.' },
  { slug: 'mechanical-repair', title: 'Engine, cooling and mechanical concerns', anchor: 'Rolls-Royce mechanical repair assessment', copy: 'Oil leaks, coolant loss, overheating, unusual noise and other mechanical concerns are inspected before a repair route, parts or timing are proposed.' },
  { slug: 'transmission-repair', title: 'Transmission and gearbox assessment', anchor: 'Rolls-Royce transmission assessment', copy: 'Gearbox warnings, leaks, delayed engagement and shift-quality concerns are assessed against the fitted transmission. Fluid, service functions and repair availability are confirmed for the exact vehicle.' },
  { slug: 'suspension-repair', title: 'Air suspension and ride quality', anchor: 'Rolls-Royce suspension assessment', copy: 'Ride-height warnings, leaning, compressor operation, noise and changes in ride quality require identification of the fitted suspension. Parts and supported calibration functions are confirmed before work.' },
  { slug: 'brake-repair', title: 'Brakes, steering and tyres', anchor: 'Rolls-Royce brake inspection', copy: 'Brake warnings, vibration, pad and disc condition, steering concerns and tyre wear are measured before parts or alignment work are recommended.' },
  { slug: 'electrical-repair', title: 'Electrical and battery concerns', anchor: 'Rolls-Royce electrical assessment', copy: 'Battery drain, low-voltage warnings, no-start concerns and electrical faults are traced with appropriate testing. Coding or programming is not assumed and requires separate confirmation.' },
  { slug: 'ac-repair', title: 'Air conditioning and cabin climate', anchor: 'Rolls-Royce AC assessment', copy: 'Weak cooling, airflow, leaks, compressor noise and cabin-zone concerns are tested before refrigerant or parts are proposed. The vehicle label determines the correct refrigerant and service equipment.' },
] as const;

export const ROLLS_ROYCE_SECONDARY_SERVICES = [
  { slug: 'steering-repair', label: 'Rolls-Royce steering assessment' },
  { slug: 'battery-replacement', label: 'Rolls-Royce battery assessment' },
  { slug: 'exhaust-repair', label: 'Rolls-Royce exhaust assessment' },
  { slug: 'fuel-system-repair', label: 'Rolls-Royce fuel-system assessment' },
  { slug: 'body-repair', label: 'Rolls-Royce body-repair enquiry' },
  { slug: 'tire-repair', label: 'Rolls-Royce tyre inspection' },
] as const;

export const ROLLS_ROYCE_MODEL_GROUPS = [
  { name: 'Cullinan', models: 'Cullinan and Black Badge Cullinan', copy: 'Maintenance, brake, suspension, battery, cooling and warning-light enquiries are assessed against the exact model year and fitted equipment.' },
  { name: 'Ghost', models: 'Ghost and Ghost Extended', copy: 'Ghost generations differ. Planar, Flagbearer and satellite-aided transmission references apply to the relevant newer Ghost generation and are not assumed for every Ghost.' },
  { name: 'Phantom', models: 'Phantom and Phantom Extended', copy: 'Service history, age, mileage and the fitted mechanical, suspension, comfort and electrical systems guide the initial inspection.' },
  { name: 'Earlier coupé and convertible models', models: 'Wraith and Dawn', copy: 'Maintenance and repair enquiries are reviewed around the exact vehicle, history, parts access and reported concern. Roof work is not advertised without scope confirmation.' },
  { name: 'Spectre', models: 'Spectre and Spectre Series II', copy: 'Spectre is fully electric and is kept separate from combustion-engine servicing. General and low-voltage enquiries can be discussed; high-voltage battery, charging and isolation work is not advertised.' },
] as const;

export const ROLLS_ROYCE_FAQS = [
  { q: 'Where is your Rolls-Royce workshop in Dubai?', a: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Use the directions link on this page or send the model, year, mileage and concern on WhatsApp before visiting.' },
  { q: 'Are you an independent Rolls-Royce workshop?', a: 'Yes. DIGI-TEC is an independent vehicle workshop and is not presented as Rolls-Royce-authorised or factory-endorsed. Vehicle acceptance, diagnostic access, parts and procedures are confirmed for the requested work.' },
  { q: 'Which Rolls-Royce models and services can you accept?', a: 'Enquiries can include Cullinan, Ghost, Phantom, Wraith, Dawn and Spectre. Maintenance, diagnostics and selected mechanical, transmission, suspension, brake, electrical, battery and AC concerns can be discussed. Acceptance depends on the exact model, systems, tooling, parts and findings.' },
  { q: 'What determines Rolls-Royce service cost?', a: 'Model, year, mileage, history, due maintenance, diagnostic time, parts, fluids, labour and inspection findings affect the estimate. A responsible repair price may require an in-workshop assessment first.' },
  { q: 'Can you assess a Rolls-Royce engine or gearbox warning?', a: 'The team can discuss an assessment using compatible fault data and appropriate physical checks. A warning or code does not by itself identify a failed component, and supported diagnostic functions are confirmed for the vehicle.' },
  { q: 'Can you investigate ride-height or suspension concerns?', a: 'Ride-height warnings, leaning, compressor operation, noise and changes in ride quality can be assessed. The fitted suspension, parts and supported calibration procedures are confirmed before repair.' },
  { q: 'Can you inspect battery drain or cabin-cooling problems?', a: 'Low-voltage battery, charging, unwanted current draw and cabin-cooling concerns can be discussed. Testing, refrigerant, equipment, parts and accepted repair scope are matched to the exact vehicle.' },
  { q: 'How is the correct maintenance schedule determined?', a: 'The model-year service information, mileage, history, vehicle condition, storage and use determine the plan. DIGI-TEC does not apply one annual or kilometre interval to every Rolls-Royce.' },
  { q: 'Which parts and fluids will the estimate include?', a: 'The estimate should identify proposed parts, fluids, quantities, labour and any diagnostic or additional work. The vehicle specification and availability are checked before an option is proposed for approval.' },
  { q: 'How do I request an appointment?', a: 'Call the Al Quoz workshop or open the WhatsApp enquiry on this page. Send the model, year, mileage, service history, warning or symptoms and preferred time. The team will then confirm availability and the appropriate first step.' },
] as const;
