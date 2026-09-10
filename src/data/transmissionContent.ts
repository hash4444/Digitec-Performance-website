export const TRANSMISSION_PATH = '/services/transmission-repair-dubai';
export const TRANSMISSION_TITLE = 'Transmission Repair Dubai | Gearbox Specialists | DIGI-TEC';
export const TRANSMISSION_DESCRIPTION = 'Transmission and gearbox repair in Dubai for automatic, DCT, DSG, CVT and manual systems. Diagnostics, fluid service and repair at DIGI-TEC Al Quoz.';
export const TRANSMISSION_H1 = 'Transmission Repair & Gearbox Repair in Dubai';
export const TRANSMISSION_INTRO = 'Experiencing jerking, slipping gears, delayed shifting, a gearbox warning or unusual transmission noise? DIGI-TEC diagnoses supported automatic, DCT, DSG, CVT and manual systems at its Al Quoz workshop before recommending service or repair.';
const draft = (message: string) => `https://wa.me/97143402223?text=${encodeURIComponent(`${message}\n\nMake, model and year: \nMileage: \nTransmission or gearbox, if known: \nWarning and symptoms: \nWhen it happens: \nPreferred appointment: `)}`;
export const TRANSMISSION_WHATSAPP = draft('Hi DIGI-TEC, I would like to arrange a transmission inspection.');

export const transmissionSymptoms = [
  ['Jerking During Gear Changes','Harsh or sudden shifts can be associated with transmission control, hydraulic, fluid, mount or internal gearbox problems. The cause needs diagnosis before service or repair is selected.'],
  ['Transmission Slipping','A flare in engine speed or loss of drive can have several transmission or control-related causes. Avoid heavy use and arrange an assessment.'],
  ['Delayed Drive / Reverse','A pause before engagement may relate to fluid level or pressure, control, clutch, converter or internal conditions depending on the fitted gearbox.'],
  ['Gearbox Warning Light','Record the exact message and driving condition. Compatible fault data and directed checks are needed before any component is blamed.'],
  ['Transmission Fluid Leak','Fluid near the gearbox may come from a seal, line, pan or another nearby system. The source and fluid level should be checked.'],
  ['Grinding / Humming Noise','Noise can travel through mounts and driveline components. Its location, speed, load and selected gear help define the inspection.'],
  ['Vibration / Judder','Judder may involve the gearbox, clutch, converter, mounts, shafts, wheels or engine operation. Testing separates overlapping causes.'],
  ['Car Stuck in Gear','A car that will not select or leave a gear may have an electronic, hydraulic, selector or mechanical fault. Follow the vehicle warning guidance and seek assistance if it cannot be driven safely.'],
] as const;

export const transmissionServices = [
  ['Automatic transmission repair','Diagnosis and supported repair for harsh shifts, slipping, delayed engagement, leaks and gearbox warnings.'],
  ['Gearbox diagnostics','Compatible fault-code, live-data and physical checks to separate electronic, hydraulic, mechanical and driveline causes.'],
  ['Fluid & filter service','Correct fluid, filter and level procedures for the identified transmission and agreed maintenance scope.'],
  ['Mechatronic assessment','Diagnosis and supported repair planning for electronic and hydraulic gearbox-control concerns.'],
  ['Torque-converter assessment','Investigation of supported converter-related judder, slipping and abnormal engagement before repair is proposed.'],
  ['DCT & DSG service','Diagnosis and servicing for supported dual-clutch systems, matched to the fitted gearbox and history.'],
  ['CVT repair assessment','Inspection, servicing and supported repair planning for continuously variable transmissions.'],
  ['Manual gearbox & clutch','Inspection of manual gearboxes and associated clutch, flywheel, mounts and driveline components.'],
  ['Gearbox rebuild assessment','Determine whether component repair, specialist rebuild assessment or replacement is the appropriate route. Rebuild capability is confirmed after diagnosis.'],
] as const;

export const transmissionProcess = [
  ['Identify','Confirm the vehicle, VIN where needed, fitted transmission, history and exact symptom.'],
  ['Scan','Review compatible stored faults and relevant operating data without treating a code as the diagnosis.'],
  ['Inspect','Check for visible leaks, damage and related drivetrain or mount concerns.'],
  ['Assess','Review behaviour, service history and fluid condition where applicable.'],
  ['Recommend','Explain the evidence and propose service, repair, further specialist assessment or replacement.'],
  ['Test','Complete applicable procedures and post-work testing after the agreed work is finished.'],
] as const;

export const transmissionBrands = [
  ['Mercedes-Benz','/services/mercedes-transmission-repair-dubai','7G-TRONIC · 9G-TRONIC'],
  ['BMW','/brands/bmw-service-dubai/transmission-repair','ZF automatic · DCT · manual'],
  ['Porsche','/brands/porsche-service-dubai/transmission-repair','PDK · Tiptronic'],
  ['Audi','/brands/audi-service-dubai/transmission-repair','S tronic · Tiptronic'],
  ['Range Rover','/brands/range-rover-service-dubai/transmission-repair','Fitted ZF applications'],
  ['Rolls-Royce','/brands/rolls-royce-service-dubai/transmission-repair','Vehicle-specific automatic'],
  ['Bentley','/brands/bentley-service-dubai/transmission-repair','Model-specific gearbox'],
  ['Lamborghini','/brands/lamborghini-service-dubai/transmission-repair','Variant-specific transmission'],
] as const;

export const transmissionFaqs = [
  {question:'How much does transmission repair cost in Dubai?',answer:'Cost depends on the vehicle, fitted gearbox, fault, diagnostic time, parts and approved labour scope. DIGI-TEC defines the inspection first, then provides an estimate based on the findings.'},
  {question:'What are the signs of a transmission problem?',answer:'Possible signs include jerking, slipping, delayed engagement, loss of drive, unusual noise, vibration, a fluid leak or a gearbox warning. These symptoms overlap with other systems, so diagnosis is required.'},
  {question:'Can an automatic gearbox be repaired?',answer:'Many automatic-transmission concerns can be assessed for service or repair, but the available route depends on the exact gearbox and findings. Internal repair or rebuild capability is confirmed after diagnosis.'},
  {question:'Can a transmission be repaired instead of replaced?',answer:'Sometimes. The choice between service, component repair, rebuild assessment and replacement depends on fault evidence, damage, parts, cost and the supported repair scope.'},
  {question:'Why does my car jerk when changing gears?',answer:'Jerking can be associated with control, hydraulic, fluid, clutch, converter, mount, engine or internal transmission conditions. A symptom alone cannot identify the failed part.'},
  {question:'Why is my transmission slipping?',answer:'Slipping or engine-speed flare may relate to control, pressure, clutch, converter, fluid or internal wear. Reduce unnecessary load and arrange diagnosis, especially if drive is unreliable or a warning appears.'},
  {question:'Can low transmission fluid cause gearbox problems?',answer:'Incorrect fluid level can affect operation, but a low level may indicate a leak and is not the only possible cause. The correct fluid, level procedure and source of any loss must be confirmed.'},
  {question:'Do you repair transmission mechatronic units?',answer:'DIGI-TEC can assess supported mechatronic concerns. Diagnostic access, parts and internal repair capability are confirmed for the exact unit before work is accepted.'},
  {question:'Do you repair DCT, DSG and CVT transmissions?',answer:'Supported DCT, DSG and CVT systems can be inspected and serviced. The exact gearbox code, required procedures and repair capability are confirmed from the vehicle before booking.'},
  {question:'Do you repair Mercedes, BMW, Audi and Porsche transmissions?',answer:'Dedicated pages cover transmission assessment for Mercedes-Benz, BMW, Audi and Porsche. The exact fitted gearbox and available diagnostic or repair scope are confirmed for each vehicle.'},
  {question:'Where is DIGI-TEC located?',answer:'DIGI-TEC Performance Center is in Al Quoz Industrial Area 3, Dubai. Share your vehicle details and symptoms by WhatsApp or call +971 4 340 2223 before travelling.'},
];
