export const SUSPENSION_PATH = '/services/suspension-repair-dubai';
export const SUSPENSION_TITLE = 'Car Suspension Repair Dubai | Air Suspension | DIGI-TEC';
export const SUSPENSION_DESCRIPTION = 'Clunks, a harsh ride or sagging air suspension? Book a suspension inspection in Al Quoz, Dubai. Vehicle-specific diagnosis and a clear repair quote.';
export const SUSPENSION_H1 = 'Car Suspension Repair in Dubai';
export const SUSPENSION_INTRO = 'Knocks over bumps, an uneven ride height or a harsher ride? DIGI-TEC inspects conventional, adaptive and air suspension in Al Quoz, Dubai. We identify the fitted system and assess the fault before recommending parts or repairs.';

export const suspensionWhatsApp = (concern = 'I would like to book a suspension inspection.') =>
  `https://wa.me/97143402223?text=${encodeURIComponent(`Hi DIGI-TEC, ${concern}\n\nMake, model and year: \nMileage: \nWhen it happens / affected corner: \nWarning message, if any: \nRecent repairs or impact, if relevant: \nPreferred appointment: `)}`;

export const suspensionConcerns = [
  { id: 'noise', label: 'Knocks & clunks', short: 'Over bumps, when turning or on rough roads', heading: 'Tell us when the noise happens.', detail: 'A knock can come from more than one component. The inspection may cover control arms, bushes, ball joints, stabilizer links, mounts and related steering or wheel components.', prompt: 'Note the affected corner, road surface and whether turning or braking changes the sound.', enquiry: 'I would like a suspension inspection for knocking or clunking.' },
  { id: 'height', label: 'Low or uneven height', short: 'One corner drops or the car settles overnight', heading: 'Start with the fitted suspension system.', detail: 'On an air-suspension vehicle, leaks, valve operation, height data and compressor performance may need testing. Uneven height does not, on its own, identify which part has failed.', prompt: 'Tell us which corner drops, how long it takes and whether the height changes after starting.', enquiry: 'I would like a suspension inspection for low or uneven ride height.' },
  { id: 'ride', label: 'Harsh or bouncy ride', short: 'More movement, vibration or a change in control', heading: 'Look at the complete ride concern.', detail: 'Dampers, springs, mounts, tyres, wheels and fitted electronic controls can all be relevant. A road assessment is considered only when appropriate and safe.', prompt: 'Describe the speed, road conditions and any recent tyre, wheel or suspension work.', enquiry: 'I would like a suspension inspection for a harsh, bouncy or unsettled ride.' },
  { id: 'warning', label: 'Suspension warning', short: 'A dashboard message or restricted height adjustment', heading: 'Share the exact warning message.', detail: 'A compatible scan can support the inspection, but a fault code alone is not a replacement instruction. Mechanical condition, wiring, sensors and system operation may also need checking.', prompt: 'Send the message and when it appears. Follow the vehicle handbook if it instructs you to stop.', enquiry: 'I would like advice about a suspension warning before arranging an inspection.' },
];

export const suspensionScope = [
  { title: 'Shocks, struts & mounts', detail: 'Assess damping concerns, condition, leakage and mounting components before confirming replacement scope.' },
  { title: 'Control arms, bushes & joints', detail: 'Inspect for relevant wear, damage or movement; confirm the parts arrangement for the vehicle.' },
  { title: 'Springs & stabilizer links', detail: 'Check applicable springs, links and related components against the reported noise or ride concern.' },
  { title: 'Air suspension', detail: 'Vehicle-specific leak, air-spring, compressor, valve and ride-height checks where the fitted system supports them.' },
  { title: 'Adaptive & active systems', detail: 'Identify the installed equipment and confirm diagnostic access, component options and supported procedures.' },
  { title: 'Geometry & final checks', detail: 'Define any required alignment, supported calibration and post-repair checks in the agreed estimate.' },
];

export const suspensionProcess = [
  { title: 'Understand the concern', detail: 'Record symptoms, affected corner, warning messages, history and the exact vehicle configuration.' },
  { title: 'Inspect & test', detail: 'Use relevant mechanical, ride-height, leak and compatible electronic checks. Road assessment depends on safety and the concern.' },
  { title: 'Explain & agree', detail: 'Discuss the findings, proposed parts, labour, required procedures and expected timing before repair approval.' },
  { title: 'Repair & verify', detail: 'Carry out agreed work and applicable final checks, including alignment or supported calibration when required.' },
];

export const suspensionBrands = [
  { name: 'Mercedes-Benz', slug: 'mercedes-benz-service-dubai', path: '/services/mercedes-suspension-repair-dubai' },
  { name: 'BMW', slug: 'bmw-service-dubai', path: '/brands/bmw-service-dubai/suspension-repair' },
  { name: 'Porsche', slug: 'porsche-service-dubai', path: '/brands/porsche-service-dubai/suspension-repair' },
  { name: 'Audi', slug: 'audi-service-dubai', path: '/brands/audi-service-dubai/suspension-repair' },
  { name: 'Range Rover', slug: 'range-rover-service-dubai', path: '/brands/range-rover-service-dubai/suspension-repair' },
  { name: 'Bentley', slug: 'bentley-service-dubai', path: '/brands/bentley-service-dubai/suspension-repair' },
];

export const suspensionFaqs = [
  { question: 'How much does suspension repair cost in Dubai?', answer: 'Cost depends on the exact vehicle, fitted suspension, diagnostic work, failed components, parts option and labour. Required alignment or supported calibration can also affect the estimate. DIGI-TEC confirms the inspection scope and proposes a repair quote from the findings.' },
  { question: 'Can I drive with a suspension warning or a car sitting low?', answer: 'Driving suitability cannot be confirmed from a message alone. Follow the vehicle handbook. If the car is severely low, a tyre is rubbing, control feels unstable or the display instructs you to stop, stop safely and seek assistance before continuing. Ask the team about inspection arrangements.' },
  { question: 'Why does my air suspension drop overnight?', answer: 'Loss of height can involve an air spring, connection, line, valve or another system issue. The affected corner, time taken to drop, height data and appropriate leak or pressure checks help establish the cause. A low corner does not automatically mean the compressor needs replacement.' },
  { question: 'Does a suspension knock mean I need new shock absorbers?', answer: 'No. Mounts, control arms, bushes, joints, stabilizer links and related components can also create noise. Tell the workshop when the noise occurs so the inspection can target the concern before parts are proposed.' },
  { question: 'Do you repair conventional, adaptive and air suspension?', answer: 'DIGI-TEC accepts enquiries for supported conventional, adaptive and air-suspension systems. The model, year, VIN where needed and fitted equipment determine the required tools, parts and repair coverage. Hydraulic or active-system work is confirmed separately for the vehicle.' },
  { question: 'Do you inspect Mercedes AIRMATIC and ABC suspension?', answer: 'Supported Mercedes AIRMATIC and Active Body Control applications can be assessed. AIRMATIC air suspension and ABC hydraulic suspension use different systems and procedures. Chassis-specific access, parts and repair scope are confirmed before work is accepted.' },
  { question: 'Is wheel alignment the same as suspension repair?', answer: 'No. Alignment concerns wheel geometry; it does not replace a worn joint, damaged arm, failed damper or leaking air component. The findings determine whether repairs are needed and whether alignment is required afterwards.' },
  { question: 'Will my car need ride-height calibration after repair?', answer: 'Some vehicles and repair procedures require supported ride-height or related system calibration. It depends on the fitted system, work performed and manufacturer procedure. It is confirmed in the agreed scope rather than added to every repair automatically.' },
  { question: 'How long does suspension repair take?', answer: 'Timing depends on the inspection, fault, parts availability, access and any alignment or supported calibration. The workshop confirms the expected timing after defining the work. A fixed completion time cannot be assumed for every suspension concern.' },
  { question: 'Do you use genuine or other replacement suspension parts?', answer: 'The quote identifies the proposed parts for the exact vehicle and repair. Ask the team about available sourcing options and the differences relevant to your car. A particular parts source or specification is not assumed before it is confirmed.' },
  { question: 'Where can I book a suspension inspection in Al Quoz?', answer: 'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp +971 4 340 2223 with your make, model, year and symptoms to confirm coverage and arrange an inspection before travelling.' },
  { question: 'What should I send when requesting a suspension quote?', answer: 'Send your make, model, year, mileage, affected corner, exact warning and when the issue occurs. Mention recent repairs, tyre changes or an impact if relevant. A safe photo or existing video can help describe the concern; a final repair quote may still require inspection.' },
];
