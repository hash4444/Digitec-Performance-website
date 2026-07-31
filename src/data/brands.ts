export interface Brand {
  name: string;
  slug: string;
  logo: string;
  intro: string;
  specialization: string;
  whyChoose: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
  relatedServices: string[];
}
import bydLogo from '@/assets/byd-logo.png.asset.json';
import roxLogo from '@/assets/rox-logo.png.asset.json';

export const brands: Brand[] = [
  {
    name: 'Mercedes-Benz',
    slug: 'mercedes-benz-service-dubai',
    logo: '/lovable-uploads/a6f453f2-f2c5-4140-8f2a-bfa3401611d7.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      'Digi-Tec Performance Centre is an independent Mercedes-Benz specialist workshop in Al Quoz, Dubai. We diagnose, maintain and repair C-Class, E-Class, S-Class, G-Class, GLE, GLS, AMG and other Mercedes models using XENTRY and Star Diagnostics, with a clear inspection and estimate before approved work begins.',
    whyChoose: [
      { title: 'Mercedes XENTRY, DAS & Star Diagnostics', description: 'Fault-code analysis, live data, guided testing, service resets and adaptations where supported by the fitted Mercedes control systems.' },
      { title: 'AIRMATIC, ABC & E-ACTIVE Suspension', description: 'System testing for low ride height, slow lifting, compressor noise, harsh ride and suspension warnings before a component is recommended.' },
      { title: '7G-Tronic, 9G-Tronic & AMG SpeedShift', description: 'Diagnosis for delayed engagement, rough shifting, slipping, leaks and transmission warnings, followed by the repair scope the test results support.' },
      { title: 'Mercedes-AMG & G-Class Experience', description: 'Model-aware diagnostics and mechanical support for C63, E63, G63, S63, AMG GT and other high-output Mercedes platforms.' },
    ],
    faqs: [
      { q: 'Where can I find a Mercedes specialist in Dubai?', a: 'Digi-Tec Performance Centre is an independent Mercedes-Benz specialist in Al Quoz Industrial Area 3, Dubai. We handle scheduled maintenance, diagnostics and mechanical, transmission, suspension, AC, brake and electrical repairs.' },
      { q: 'How often should a Mercedes-Benz be serviced in Dubai?', a: 'Follow the ASSYST service reminder and the interval specified for the exact model and year. Dubai heat, traffic, dust, mileage and driving pattern can justify additional inspections or earlier fluid attention, so we confirm the scope from the vehicle rather than applying one interval to every Mercedes.' },
      { q: 'What is the difference between Mercedes Service A and Service B?', a: 'Service A is generally the smaller scheduled visit, while Service B adds a wider set of inspections and service items. The exact checklist varies by model, age, mileage and the ASSYST display, so the VIN and service history should be checked before quoting.' },
      { q: 'Do you use genuine Mercedes-Benz parts?', a: 'The estimate can specify genuine Mercedes-Benz parts, established OE-supplier components or a suitable customer-approved alternative. We explain the proposed parts and required Mercedes fluid specification before work is approved.' },
      { q: 'How long does Mercedes repair or service take?', a: 'Timing depends on the model, inspection findings, parts availability and required programming or road testing. After diagnosis, we explain the recommended work and expected timeline before the repair proceeds.' },
      { q: 'Do you repair Mercedes AIRMATIC suspension faults?', a: 'Yes. We test AIRMATIC, ABC and E-ACTIVE symptoms such as one side sitting low, slow lifting, compressor noise, harsh ride and suspension warnings. The cause may be pneumatic, mechanical, sensor-related or electrical, so diagnosis comes before replacement.' },
      { q: 'Can you diagnose 7G-Tronic and 9G-Tronic transmission problems?', a: 'Yes. We inspect delayed engagement, jerking, slipping, leaks and transmission warnings using scan data, fluid and mechanical checks, and a road test where appropriate before defining the repair scope.' },
      { q: 'Which Mercedes models do you repair?', a: 'Coverage includes A-Class, C-Class, E-Class, S-Class, CLA, CLS, GLA, GLB, GLC, GLE, GLS, G-Class, AMG models, selected EQ vehicles and V-Class. For an older or unusual model, send the VIN and concern before booking.' },
      { q: 'Do you use Mercedes XENTRY diagnostics?', a: 'Yes. XENTRY, DAS and Star Diagnostics support fault tracing, live data, guided tests, resets and adaptations where applicable. Scan results are combined with physical inspection because a fault code alone does not prove which part has failed.' },
      { q: 'Is Digi-Tec a Mercedes garage in Al Quoz, Dubai?', a: 'Yes. The workshop is in Al Quoz Industrial Area 3, Warehouse 11–15, Dubai. The Mercedes page includes a direct Google Maps link, phone number and WhatsApp booking option.' },
      { q: 'How should I choose the best Mercedes workshop in Dubai?', a: 'Look for Mercedes-specific diagnostics, a model-aware inspection process, clear evidence behind the diagnosis, written parts and fluid options, and approval before work begins. Ask the workshop to explain the test results and post-repair checks for your exact model.' },
    ],
    relatedServices: ['mercedes-oil-change-dubai', 'mercedes-transmission-repair-dubai', 'mercedes-suspension-repair-dubai', 'mercedes-diagnostics-dubai'],
  },
  {
    name: 'Maybach',
    slug: 'maybach-service-dubai',
    logo: 'https://www.carlogos.org/car-logos/maybach-logo.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Maybach demands the highest standard of care, and Digi-Tec delivers exactly that. From chauffeur-driven sedans to private ownership, we provide white-glove maintenance, advanced diagnostics, and bespoke detailing tailored to the marque's ultra-luxury heritage.",
    whyChoose: [
      { title: 'E-ACTIVE Body Control Service', description: 'Specialist work on Maybach S-Class active suspension, including curve tilting calibration and road-scanning camera alignment.' },
      { title: 'Rear-Cabin Electronics & MBUX', description: 'Full diagnostics for reclining executive seats, rear infotainment, fragrance system, and ambient lighting modules.' },
      { title: 'V12 M279 Powertrain Specialists', description: 'Service expertise on the twin-turbo M279 V12 in Maybach S600 and S680, including ignition coil packs, plenum, and turbo work.' },
      { title: 'Concierge Collection & Delivery', description: 'Discreet collection and return across Dubai with covered transport and detailed handover reporting for every visit.' },
    ],
    faqs: [
      { q: 'How often should a Maybach be serviced in Dubai?', a: 'Every 10,000 km or 6 months for Service A. Chauffeur-driven cars covering high mileage benefit from quarterly inspections of brakes, fluids, and suspension.' },
      { q: 'Do you use genuine Maybach parts?', a: 'Yes. All filters, fluids, brakes, and electronic modules are genuine Mercedes-Maybach OEM, sourced through approved channels.' },
      { q: 'How long does a typical Maybach service take?', a: 'Standard service is completed within one working day. Complex V12 or E-ACTIVE work is quoted with a clear timeline before any work begins.' },
      { q: 'Can you service the rear executive cabin and fragrance system?', a: 'Yes. We diagnose and repair the full rear-cabin suite including reclining seats, hot-stone massage, fragrance atomiser, and rear MBUX.' },
    ],
    relatedServices: ['mercedes-oil-change-dubai', 'suspension-repair-dubai', 'car-ac-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Porsche',
    slug: 'porsche-service-dubai',
    logo: '/lovable-uploads/8e7e2545-680e-42ac-bd97-ba1f9c063649.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "From 911 GT3 track cars to Cayenne daily drivers, Digi-Tec is Dubai's destination for Porsche service. Our specialists handle PDK transmissions, turbocharger systems, and chassis alignment with the precision Stuttgart engineering deserves.",
    whyChoose: [
      { title: 'PIWIS 3 Factory Diagnostics', description: 'Full PIWIS Tester 3 access for coding, software updates, and adaptation across every modern Porsche platform.' },
      { title: 'PDK & Tiptronic Transmission Service', description: 'Mechatronic unit service, fluid flushing, and clutch-pack inspection for 7-speed PDK and 8-speed Tiptronic gearboxes.' },
      { title: 'PCCB Carbon Ceramic Brake Specialists', description: 'Inspection, refurbishment, and replacement of Porsche Ceramic Composite Brakes on 911 Turbo S, GT3, and Cayenne Turbo GT.' },
      { title: 'VTG Turbo & IPD Plenum Upgrades', description: 'Performance work on 991/992 Turbo S VTG turbochargers, IPD plenums, exhausts, and Stage tuning for measurable gains.' },
    ],
    faqs: [
      { q: 'How often should a Porsche be serviced in Dubai?', a: 'Minor service every 15,000 km or 12 months and major service every 30,000 km. GT cars and track-driven 911s benefit from more frequent fluid changes.' },
      { q: 'Do you use genuine Porsche parts?', a: 'Yes. Genuine Porsche Classic and Porsche Tequipment parts, plus approved aftermarket performance components when the customer requests them.' },
      { q: 'How long does a typical Porsche service take?', a: 'Minor service is same day. Major service with brake fluid, spark plugs, and full diagnostics is 1, 2 working days.' },
      { q: 'Can you service PDK transmissions?', a: 'Yes. PDK fluid and filter service, mechatronic diagnostics, and clutch-pack inspection are all done in-house with PIWIS.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'brake-repair-dubai', 'car-diagnostics-dubai'],
  },
  {
    name: 'Audi',
    slug: 'audi-service-dubai',
    logo: '/lovable-uploads/a3e92dde-70a9-499b-a7b0-ae0df117baf9.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Digi-Tec services the full Audi range, from A4 sedans to RS6 Avants and R8 supercars. Our team is equipped for Quattro drivetrain work, S Tronic gearbox service, and RS-grade performance upgrades using genuine VAG components.",
    whyChoose: [
      { title: 'ODIS Factory Coding & VCDS', description: 'Full ODIS and VCDS coverage for ECU updates, retrofits, and adaptation across every Audi platform from A1 to R8.' },
      { title: 'Quattro & Sport Differential Service', description: 'Haldex pack service, centre diff work, and rear sport differential calibration for S, RS, and R8 models.' },
      { title: 'S Tronic DCT Gearbox Specialists', description: 'DL501 / DQ500 mechatronic and clutch-pack service with correct G055529 fluid and basic settings reset.' },
      { title: 'EA888 & 4.0 TFSI V8 Tuning', description: 'Stage 1 to Stage 3 tuning on RS3, RS4, RS6, and RS7 platforms including turbo, intake, and downpipe upgrades.' },
    ],
    faqs: [
      { q: 'How often should an Audi be serviced in Dubai?', a: 'Audi recommends every 15,000 km or 12 months. RS models and tuned cars benefit from more frequent oil and DSG fluid changes due to Dubai temperatures.' },
      { q: 'Do you use genuine Audi parts?', a: 'Yes. Genuine Audi OEM and VAG-approved parts for every service, with performance equivalents available on customer request.' },
      { q: 'How long does a typical Audi service take?', a: 'Standard service is same day. Major service with DSG fluid and brakes is typically 1, 2 working days.' },
      { q: 'Can you tune an RS3, RS6, or RS7?', a: 'Yes. We offer Stage 1, 2, and 3 tuning packages with full data logging, supported by hardware upgrades when the platform demands it.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'car-diagnostics-dubai', 'brake-repair-dubai'],
  },
  {
    name: 'BMW',
    slug: 'bmw-service-dubai',
    logo: '/lovable-uploads/d66ea83e-7d6a-4c19-bf30-f27eca93ac8e.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "BMW owners in Dubai trust Digi-Tec for everything from routine 5 Series maintenance to full M Series performance builds. Our workshop is equipped with the latest ISTA diagnostic tools, iDrive coding capability, and genuine BMW parts inventory.",
    whyChoose: [
      { title: 'ISTA+ & E-Sys Coding', description: 'Full ISTA+ diagnostics and E-Sys coding for retrofits, FA edits, and feature unlocks on F, G, and i-Series BMWs.' },
      { title: 'S55, S58 & S63 Engine Specialists', description: 'Charge pipe upgrades, oil cooler service, VANOS solenoids, and full builds for M3, M4, M5, and X5M/X6M platforms.' },
      { title: 'ZF 8HP Transmission Service', description: 'ZF 8HP fluid and filter service with correct Lifeguard 8, plus TCU tuning for crisper shifts and higher torque capacity.' },
      { title: 'iDrive 7 / 8 Retrofits & CarPlay', description: 'Apple CarPlay full-screen unlock, BMW Live Cockpit retrofits, and DAB+ coding handled in-house.' },
    ],
    faqs: [
      { q: 'How often should a BMW be serviced in Dubai?', a: 'Condition-Based Service typically calls for an oil service every 12,000, 15,000 km. We recommend halving that interval for M cars driven hard in summer.' },
      { q: 'Do you use genuine BMW parts?', a: 'Yes. Genuine BMW and BMW M Performance parts, plus approved fluids (LL-04, LL-01 FE) and OE-supplier equivalents on request.' },
      { q: 'How long does a typical BMW service take?', a: 'Oil service is same day. Full inspection with brake fluid and microfilters is 1 working day. M Series performance work is quoted individually.' },
      { q: 'Can you code iDrive features and retrofits?', a: 'Yes. We code CarPlay full-screen, video-in-motion, sport displays, and most factory retrofits using E-Sys with valid FA backup.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'car-diagnostics-dubai', 'transmission-repair-dubai', 'brake-repair-dubai'],
  },
  {
    name: 'Lamborghini',
    slug: 'lamborghini-service-dubai',
    logo: '/lovable-uploads/8c4046ee-9977-417a-90a9-820452146832.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Whether it's a Huracán, Urus, or Aventador, Digi-Tec has the specialists, the lift capacity, and the patience to service Lamborghini's V10 and V12 platforms. We handle major services, carbon-ceramic brake work, and bespoke aesthetic enhancements.",
    whyChoose: [
      { title: 'Lamborghini LDAS Factory Diagnostics', description: 'Authorised-level diagnostics for Huracán, Urus, and Aventador with full ECU coverage and software update capability.' },
      { title: 'CCB Carbon Ceramic Brake Service', description: 'Inspection, refurbishment, and replacement of Lamborghini CCB rotors and pads, with proper bedding-in protocol.' },
      { title: 'LDF / ISR Gearbox Specialists', description: 'Lamborghini Doppia Frizione DCT service on Huracán and Urus, and Independent Shifting Rod (ISR) work on Aventador.' },
      { title: 'ANIMA Drive Mode & Magneto-Rheological Dampers', description: 'Adaptive damper diagnostics and ANIMA selector calibration to keep Strada, Sport, and Corsa modes responding correctly.' },
    ],
    faqs: [
      { q: 'How often should a Lamborghini be serviced in Dubai?', a: 'Annual service or every 10,000 km, whichever comes first. Track-driven cars benefit from more frequent brake fluid and gearbox oil changes.' },
      { q: 'Do you use genuine Lamborghini parts?', a: 'Yes. Genuine Lamborghini OEM parts, filters, and fluids, sourced through approved supply chains.' },
      { q: 'How long does a typical Lamborghini service take?', a: 'Annual service is typically 1, 2 working days. CCB brake or gearbox work is quoted individually with a clear timeline.' },
      { q: 'Can you service carbon ceramic brakes?', a: 'Yes. CCB inspection, rotor measurement, pad replacement, and full system refurbishment are routine for our Lamborghini specialists.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'suspension-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Bentley',
    slug: 'bentley-service-dubai',
    logo: '/lovable-uploads/b2cd5f78-8a43-4a9b-8a0a-19124642ca5a.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Bentley craftsmanship deserves equally meticulous service. Digi-Tec supports the entire Bentley range, including Continental GT, Flying Spur, and Bentayga, with W12 powertrain expertise, air suspension service, and interior preservation work.",
    whyChoose: [
      { title: 'W12 TSI Twin-Turbo Specialists', description: 'Coil pack, coolant transfer pipe, and timing chain service on the 6.0 W12 fitted to Continental, Flying Spur, and Bentayga.' },
      { title: 'Continuous Damping Control & Air Suspension', description: 'Full 48V active anti-roll and air strut service with correct ride-height calibration via ODIS.' },
      { title: 'ZF 8HP Gearbox Service', description: 'Bentley-spec ZF 8HP fluid and filter service with proper temperature-based fill procedure and adaptation reset.' },
      { title: 'Hand-Stitched Interior Preservation', description: 'Specialist leather, veneer, and headlining care to protect the interior craftsmanship that defines every Bentley.' },
    ],
    faqs: [
      { q: 'How often should a Bentley be serviced in Dubai?', a: 'Bentley recommends annual service or every 16,000 km. Continental GT and Bentayga driven daily benefit from interim oil checks every 6 months.' },
      { q: 'Do you use genuine Bentley parts?', a: 'Yes. Genuine Bentley OEM parts and approved fluids for every service, with documentation for full service history.' },
      { q: 'How long does a typical Bentley service take?', a: 'Standard annual service is 1 working day. W12 timing or air suspension work is quoted with a clear timeline.' },
      { q: 'Do you service the W12 coolant transfer pipe?', a: 'Yes. This is a known W12 wear item and we replace it with the updated genuine Bentley part, including full coolant system flush.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'suspension-repair-dubai', 'transmission-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'McLaren',
    slug: 'mclaren-service-dubai',
    logo: '/lovable-uploads/7f8d98f4-3581-451c-bfaf-262eb67cf14b.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Digi-Tec is one of the few Dubai workshops equipped to service McLaren's MonoCell carbon chassis and twin-turbo V8 platform. From 570S to 720S to Artura, we handle scheduled service, fluid changes, and performance recalibration in a controlled environment.",
    whyChoose: [
      { title: 'MonoCell II / II-T Carbon Tub Handling', description: 'Trained handling of the McLaren carbon monocoque with appropriate lift points and torque procedures on every visit.' },
      { title: 'M838T & M840T Twin-Turbo V8 Service', description: 'Specialist work on 3.8 and 4.0 twin-turbo V8s, including coil packs, dry-sump oil service, and turbo inspection.' },
      { title: 'Proactive Chassis Control & Active Aero', description: 'Hydraulic suspension service, accumulator replacement, and active rear wing calibration on Super Series and Ultimate cars.' },
      { title: 'SSG 7-Speed DCT Gearbox', description: 'Graziano SSG seamless shift gearbox fluid service and clutch-pack inspection with McLaren factory tooling.' },
    ],
    faqs: [
      { q: 'How often should a McLaren be serviced in Dubai?', a: 'Annual service or every 10,000 km. Cars used on track benefit from more frequent oil, brake fluid, and accumulator inspection.' },
      { q: 'Do you use genuine McLaren parts?', a: 'Yes. Genuine McLaren OEM parts and approved fluids, with full documentation for service history continuity.' },
      { q: 'How long does a typical McLaren service take?', a: 'Annual service is typically 1, 2 working days. Active hydraulic suspension or gearbox work is quoted individually.' },
      { q: 'Can you service the hydraulic suspension accumulators?', a: 'Yes. Accumulator replacement on 12C, 650S, 720S, and 765LT is part of our routine McLaren service offering.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'suspension-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Ferrari',
    slug: 'ferrari-service-dubai',
    logo: '/lovable-uploads/11f29482-f2d3-4278-ae2a-397044a1ff95.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Ferrari ownership is a relationship, and Digi-Tec treats every Prancing Horse with the reverence it deserves. We service the full range, including 488, F8, SF90, and Roma, with factory-grade diagnostics, F1 transmission expertise, and genuine OEM parts.",
    whyChoose: [
      { title: 'Ferrari SD3 / DEIS Diagnostics', description: 'Factory-level diagnostics for every modern Ferrari including 488, F8, SF90, Roma, and 812 platforms.' },
      { title: 'F1 DCT 7-Speed Gearbox Service', description: 'Getrag F1 DCT clutch wear measurement, fluid service, and adaptation, plus full TCU programming.' },
      { title: 'CCM Carbon Ceramic Brake Specialists', description: 'CCM3 and CCM-R rotor inspection, pad replacement, and bedding-in to keep stopping performance at factory spec.' },
      { title: 'Magnetorheological SCM Damper Service', description: 'Diagnosis and replacement of Ferrari SCM dampers with proper calibration through SD3.' },
    ],
    faqs: [
      { q: 'How often should a Ferrari be serviced in Dubai?', a: 'Annual service or every 12,500 km. Cars used hard or on track benefit from more frequent oil and brake fluid changes.' },
      { q: 'Do you use genuine Ferrari parts?', a: 'Yes. Genuine Ferrari OEM parts and approved fluids, fully documented to protect service history and resale value.' },
      { q: 'How long does a typical Ferrari service take?', a: 'Annual service is typically 1, 2 working days. F1 clutch replacement or CCM brake work is quoted individually.' },
      { q: 'Can you measure F1 clutch wear?', a: 'Yes. We measure F1 clutch position via SD3 diagnostics and provide a clear remaining-life report on every visit.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'transmission-repair-dubai', 'paint-protection-dubai'],
  },
  {
    name: 'Bugatti',
    slug: 'bugatti-service-dubai',
    logo: '/lovable-uploads/69bd2660-e800-47b4-bc4d-de6e6b65b984.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Servicing a Bugatti requires a level of precision few workshops can match. Digi-Tec works on Veyron and Chiron platforms with appropriate tooling, climate-controlled bays, and complete confidentiality for every owner.",
    whyChoose: [
      { title: 'W16 Quad-Turbo Powertrain Handling', description: 'Carefully procedural service of the 8.0 W16 in Veyron and Chiron, including coolant, oil, and ignition system work.' },
      { title: 'DSG 7-Speed DCT Gearbox', description: 'Ricardo-built DCT fluid and clutch-pack inspection with factory-recommended fluid only.' },
      { title: 'Carbon Ceramic Brake System', description: 'Eight-piston front, six-piston rear CCB inspection, rotor measurement, and pad replacement to Bugatti spec.' },
      { title: 'Confidential Climate-Controlled Bay', description: 'Dedicated, screened bay with NDA-backed handling and discreet collection and delivery across the UAE.' },
    ],
    faqs: [
      { q: 'How often should a Bugatti be serviced in Dubai?', a: 'Annual service is standard. Mileage-based intervals are agreed individually with the owner based on use pattern.' },
      { q: 'Do you use genuine Bugatti parts?', a: 'Yes. Only genuine Bugatti OEM parts and approved fluids, sourced through authorised supply.' },
      { q: 'How long does a typical Bugatti service take?', a: 'A full annual service is typically 2, 4 working days depending on scope, documented end to end.' },
      { q: 'Is handling confidential?', a: 'Yes. Bugatti owners receive a dedicated screened bay, NDA-backed handling, and discreet collection and return.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'brake-repair-dubai', 'paint-protection-dubai', 'car-diagnostics-dubai'],
  },
  {
    name: 'Land Rover',
    slug: 'land-rover-service-dubai',
    logo: '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "From Range Rover Autobiography to Defender and Discovery, Digi-Tec services the full Land Rover lineup. Our specialists handle air suspension, Terrain Response systems, and the supercharged V8 powertrains that define the marque.",
    whyChoose: [
      { title: 'EAS Air Suspension Specialists', description: 'Air strut, compressor, valve block, and ride-height sensor service for Range Rover, Sport, and Discovery platforms.' },
      { title: 'Terrain Response 2 Calibration', description: 'Diagnostics and recalibration of TR2 modes, active locking diff, and Wade Sensing via SDD / Pathfinder.' },
      { title: 'Supercharged 5.0 V8 & Ingenium Service', description: 'Supercharger snout service, intercooler work, and full Ingenium I4/I6 timing chain and oil service.' },
      { title: 'ZF 8HP & Active Driveline Service', description: 'ZF 8HP fluid service plus active rear locking differential fluid and PTU oil replacement on Sport and SVR models.' },
    ],
    faqs: [
      { q: 'How often should a Range Rover be serviced in Dubai?', a: 'Every 16,000 km or 12 months. Air suspension compressors and supercharger fluid benefit from inspection at 50,000 km.' },
      { q: 'Do you use genuine Land Rover parts?', a: 'Yes. Genuine Land Rover and Range Rover OEM parts, plus approved fluids for every service.' },
      { q: 'How long does a typical Range Rover service take?', a: 'Standard service is same day. Air suspension repair is typically 1 working day.' },
      { q: 'Can you repair Range Rover air suspension?', a: 'Yes. Air strut replacement, compressor service, and valve block work are routine, with ride-height calibration on completion.' },
    ],
    relatedServices: ['suspension-repair-dubai', 'mechanical-repair-dubai', 'car-diagnostics-dubai', 'transmission-repair-dubai'],
  },
  {
    name: 'Rolls-Royce',
    slug: 'rolls-royce-service-dubai',
    logo: '/lovable-uploads/a4c040e8-740a-4fcb-b837-b86e15c25306.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Rolls-Royce service at Digi-Tec is delivered with the discretion and precision the marque demands. We support Phantom, Ghost, Wraith, and Cullinan with V12 expertise, air suspension service, and meticulous interior preservation.",
    whyChoose: [
      { title: 'N74 V12 Twin-Turbo Specialists', description: 'Service for the 6.6 and 6.75 N74 V12, including coil packs, VVT, and turbo inspection across Ghost, Wraith, and Cullinan.' },
      { title: 'Self-Levelling Air Suspension', description: 'Air strut, compressor, and Magic Carpet Ride camera calibration to keep the ride signature exactly as Goodwood intended.' },
      { title: 'Planar Suspension & Flagbearer Camera', description: 'Calibration of the road-scanning camera and Planar suspension system used on current Ghost and Spectre.' },
      { title: 'Bespoke Interior Preservation', description: 'Specialist care for hand-stitched leather, Canadel veneer, and starlight headliners, with NDA-backed handling.' },
    ],
    faqs: [
      { q: 'How often should a Rolls-Royce be serviced in Dubai?', a: 'Annual service or every 16,000 km. Cars stored or used seasonally benefit from a preservation check every 6 months.' },
      { q: 'Do you use genuine Rolls-Royce parts?', a: 'Yes. Only genuine Rolls-Royce OEM parts and approved fluids, sourced through authorised supply.' },
      { q: 'How long does a typical Rolls-Royce service take?', a: 'Standard annual service is 1, 2 working days. Air suspension or V12 work is quoted with a clear timeline.' },
      { q: 'Is the visit discreet?', a: 'Yes. Owners receive a dedicated bay, NDA-backed handling, and concierge collection and delivery across the UAE.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'suspension-repair-dubai', 'paint-protection-dubai', 'car-ac-repair-dubai'],
  },
  {
    name: 'Aston Martin',
    slug: 'aston-martin-service-dubai',
    logo: '/lovable-uploads/8d3bad14-09df-4ef1-86c6-13cfcba7042b.png',
    specialization: 'Repair • Maintenance • Diagnostics • Performance',
    intro:
      "Digi-Tec services the full Aston Martin range, from DB11 grand tourers to Vantage performance cars and DBX SUVs. Our workshop is equipped for V8 and V12 powertrain work, ZF transmission service, and genuine parts replacement.",
    whyChoose: [
      { title: 'AMG M177 V8 & AM V12 Specialists', description: 'Service for the AMG-sourced 4.0 V8 in Vantage, DB11, and DBX, and the 5.2 twin-turbo V12 in DB11 AMR and DBS.' },
      { title: 'ZF 8HP Transaxle Service', description: 'Transaxle gearbox fluid and filter service, plus mounting and torque-tube inspection on DB11, Vantage, and DBS.' },
      { title: 'Adaptive Damping & Carbon Ceramic Brakes', description: 'Adaptive damper diagnostics and CCM brake inspection / replacement on DBS and Vantage F1 Edition.' },
      { title: 'Hand-Crafted Interior Preservation', description: 'Specialist care for Bridge of Weir leather and hand-stitched trim to protect the Aston Martin interior signature.' },
    ],
    faqs: [
      { q: 'How often should an Aston Martin be serviced in Dubai?', a: 'Annual service or every 16,000 km. Track-driven Vantages benefit from more frequent oil, brake fluid, and gearbox fluid changes.' },
      { q: 'Do you use genuine Aston Martin parts?', a: 'Yes. Genuine Aston Martin OEM parts and approved fluids for every service, fully documented.' },
      { q: 'How long does a typical Aston Martin service take?', a: 'Standard service is 1 working day. V12 timing or transaxle work is quoted with a clear timeline.' },
      { q: 'Can you service the V12 in DB11 AMR and DBS?', a: 'Yes. Full coil-on-plug, plug, and coolant service for the 5.2 twin-turbo V12, plus turbo and timing inspection as required.' },
    ],
    relatedServices: ['mechanical-repair-dubai', 'transmission-repair-dubai', 'brake-repair-dubai', 'paint-protection-dubai'],
  },
];

const additionalBrandEntries: Array<[string, string]> = [
  ['Abarth', 'abarth-service-dubai'], ['Alfa Romeo', 'alfa-romeo-service-dubai'],
  ['BYD', 'byd-service-dubai'],
  ['Cadillac', 'cadillac-service-dubai'],
  ['Chevrolet', 'chevrolet-service-dubai'], ['Chrysler', 'chrysler-service-dubai'],
  ['Corvette', 'corvette-service-dubai'],
  ['Dodge', 'dodge-service-dubai'], ['FIAT', 'fiat-service-dubai'], ['Ford', 'ford-service-dubai'],
  ['Genesis', 'genesis-service-dubai'], ['GMC', 'gmc-service-dubai'],
  ['Hummer', 'hummer-service-dubai'], ['Infiniti', 'infiniti-service-dubai'],
  ['Jaguar', 'jaguar-service-dubai'], ['Jeep', 'jeep-service-dubai'], ['Jetour', 'jetour-service-dubai'],
  ['Koenigsegg', 'koenigsegg-service-dubai'], ['Lexus', 'lexus-service-dubai'], ['Lincoln', 'lincoln-service-dubai'],
  ['Lotus', 'lotus-service-dubai'], ['Maserati', 'maserati-service-dubai'], ['Mazda', 'mazda-service-dubai'],
  ['MINI', 'mini-service-dubai'], ['Mitsubishi', 'mitsubishi-service-dubai'],
  ['Nissan', 'nissan-service-dubai'], ['Pagani', 'pagani-service-dubai'],
  ['Renault', 'renault-service-dubai'],
  ['ROX', 'rox-service-dubai'],
  ['Subaru', 'subaru-service-dubai'], ['Tesla', 'tesla-service-dubai'],
  ['Toyota', 'toyota-service-dubai'], ['Volkswagen', 'volkswagen-service-dubai'], ['Volvo', 'volvo-service-dubai'],
];

const additionalBrandLogos: Record<string, string> = {
  // Colored transparent-PNG marque logos from carlogos.org, matching the
  // clean centred look of the primary brands' /lovable-uploads/*.png badges.
  Abarth: 'https://www.carlogos.org/car-logos/abarth-logo.png',
  'Alfa Romeo': 'https://www.carlogos.org/car-logos/alfa-romeo-logo.png',
  BYD: bydLogo.url,
  Cadillac: 'https://www.carlogos.org/car-logos/cadillac-logo.png',
  Chevrolet: 'https://www.carlogos.org/car-logos/chevrolet-logo.png',
  Chrysler: 'https://www.carlogos.org/car-logos/chrysler-logo.png',
  Corvette: 'https://www.carlogos.org/car-logos/corvette-logo.png',
  Dodge: 'https://www.carlogos.org/car-logos/dodge-logo.png',
  FIAT: 'https://www.carlogos.org/car-logos/fiat-logo.png',
  Ford: 'https://www.carlogos.org/car-logos/ford-logo.png',
  Genesis: 'https://www.carlogos.org/car-logos/genesis-logo.png',
  GMC: 'https://www.carlogos.org/car-logos/gmc-logo.png',
  Hummer: 'https://www.carlogos.org/car-logos/hummer-logo.png',
  Infiniti: 'https://www.carlogos.org/car-logos/infiniti-logo.png',
  Jaguar: 'https://www.carlogos.org/car-logos/jaguar-logo.png',
  Jeep: 'https://www.carlogos.org/car-logos/jeep-logo.png',
  Jetour: '/brand-logos/jetour-color.png',
  Koenigsegg: 'https://www.carlogos.org/car-logos/koenigsegg-logo.png',
  Lexus: 'https://www.carlogos.org/car-logos/lexus-logo.png',
  Lincoln: 'https://www.carlogos.org/car-logos/lincoln-logo.png',
  Lotus: 'https://www.carlogos.org/car-logos/lotus-logo.png',
  Maserati: 'https://www.carlogos.org/car-logos/maserati-logo.png',
  Mazda: 'https://www.carlogos.org/car-logos/mazda-logo.png',
  MINI: 'https://www.carlogos.org/car-logos/mini-logo.png',
  Mitsubishi: 'https://www.carlogos.org/car-logos/mitsubishi-logo.png',
  Nissan: 'https://www.carlogos.org/car-logos/nissan-logo.png',
  Pagani: 'https://www.carlogos.org/car-logos/pagani-logo.png',
  'Range Rover': '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
  Renault: 'https://www.carlogos.org/car-logos/renault-logo.png',
  ROX: roxLogo.url,
  Subaru: 'https://www.carlogos.org/car-logos/subaru-logo.png',
  Tesla: 'https://www.carlogos.org/car-logos/tesla-logo.png',
  Toyota: 'https://www.carlogos.org/car-logos/toyota-logo.png',
  Volkswagen: 'https://www.carlogos.org/car-logos/volkswagen-logo.png',
  Volvo: 'https://www.carlogos.org/car-logos/volvo-logo.png',
};

const createAdditionalBrand = ([name, slug]: [string, string]): Brand => ({
  name,
  slug,
  logo: additionalBrandLogos[name] ?? '',
  specialization: 'Repair • Maintenance • Diagnostics',
  intro: `Digi-Tec Performance Centre provides professional ${name} repair, maintenance, diagnostics, and electrical support in Dubai. Our Al Quoz workshop follows a diagnostic-first process, uses quality parts and approved fluids, and gives every owner a clear written explanation of the recommended work before it begins.`,
  whyChoose: [
    { title: 'Diagnostic-First Inspection', description: `We inspect ${name} fault codes, live data, and the affected system before recommending a repair.` },
    { title: 'Maintenance & Mechanical Repair', description: `From routine servicing and fluid changes to brakes, suspension, cooling, and mechanical repairs, each ${name} is handled with a documented workshop process.` },
    { title: 'Electrical & Comfort Systems', description: `We diagnose batteries, charging systems, sensors, control modules, air conditioning, and everyday electrical concerns.` },
    { title: 'Clear Quotes and Customer Care', description: 'You receive a transparent estimate, practical repair options, and a clear handover once the work is complete.' },
  ],
  faqs: [
    { q: `Do you service ${name} vehicles in Dubai?`, a: `Yes. Digi-Tec provides scheduled maintenance, diagnostics, mechanical repair, brake, suspension, air-conditioning, and electrical support for ${name} owners in Dubai.` },
    { q: `Can you diagnose a warning light on my ${name}?`, a: `Yes. We begin with a diagnostic scan and live-data checks, then explain the fault and the recommended next step before work starts.` },
    { q: `Do you use quality parts for ${name} repairs?`, a: 'We use genuine OEM, OE-supplier, or quality approved parts according to the repair requirement and your agreed quotation.' },
    { q: `Where is Digi-Tec located?`, a: 'Digi-Tec Performance Centre is located in Al Quoz Industrial Area 3, Dubai. Call or WhatsApp us to arrange an inspection.' },
  ],
  relatedServices: ['mechanical-repair-dubai', 'car-diagnostics-dubai', 'brake-repair-dubai', 'car-ac-repair-dubai'],
});

brands.push(...additionalBrandEntries.map(createAdditionalBrand));

brands.push(
  {
    name: 'Range Rover',
    slug: 'range-rover-service-dubai',
    logo: '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
    specialization: 'Service • Repair • Diagnostics • Air Suspension',
    intro: 'Digi-Tec is a specialist Range Rover workshop in Al Quoz, Dubai. We service and repair Range Rover, Range Rover Sport, Velar and Evoque models with JLR diagnostics, approved parts, air-suspension expertise and clear quotes before work begins.',
    whyChoose: [
      { title: 'JLR Diagnostics & Coding', description: 'SDD and Pathfinder diagnostics for fault tracing, service resets, module programming and calibration.' },
      { title: 'Air Suspension Specialists', description: 'Range Rover air struts, compressors, valve blocks, ride-height sensors and calibration are diagnosed and repaired in-house.' },
      { title: 'Ingenium, V8 & ZF 8HP Care', description: 'Routine service and mechanical repairs for Ingenium engines, supercharged and twin-turbo V8s, and ZF automatic transmissions.' },
      { title: 'Dubai-Focused Maintenance', description: 'Cooling, AC, suspension and battery checks tailored to Dubai heat, dust and daily driving conditions.' },
    ],
    faqs: [
      { q: 'Do you service Range Rover vehicles in Dubai?', a: 'Yes. We service and repair Range Rover, Range Rover Sport, Velar and Evoque models from our Al Quoz workshop.' },
      { q: 'Can you repair Range Rover air suspension?', a: 'Yes. We diagnose air struts, compressors, valve blocks and height sensors, then calibrate the system after repair.' },
      { q: 'Do you use JLR diagnostics?', a: 'Yes. We use JLR-compatible SDD and Pathfinder diagnostic tooling to read faults, inspect live data and complete required calibrations.' },
      { q: 'How often should a Range Rover be serviced in Dubai?', a: 'Most Range Rover models should be inspected at least every 10,000 to 16,000 km or annually. Dubai heat can make interim checks worthwhile.' },
    ],
    relatedServices: ['suspension-repair-dubai', 'mechanical-repair-dubai', 'car-diagnostics-dubai', 'transmission-repair-dubai'],
  },
  {
    name: 'Defender',
    slug: 'defender-service-dubai',
    logo: '/lovable-uploads/4bb58917-704a-4c5d-84b6-dc428a00c004.png',
    specialization: 'Service • Repair • Diagnostics • Off-Road Systems',
    intro: 'Digi-Tec provides specialist Land Rover Defender service and repair in Dubai for Defender 90 and Defender 110 models. Our Al Quoz workshop handles JLR diagnostics, scheduled maintenance, air suspension, cooling, brakes, driveline and electrical repairs.',
    whyChoose: [
      { title: 'Defender 90 & 110 Diagnostics', description: 'JLR SDD and Pathfinder diagnostics for modern Defender systems, warnings, coding and calibration.' },
      { title: 'Terrain Response & Driveline Care', description: 'Service and diagnosis for four-wheel-drive, Terrain Response, transfer-case, differential and off-road systems.' },
      { title: 'Air Suspension & Cooling Repair', description: 'Accurate repair of air-suspension and cooling faults that are common in demanding Dubai conditions.' },
      { title: 'Clear Workshop Reporting', description: 'We explain the fault, the practical options and the parts required before work starts.' },
    ],
    faqs: [
      { q: 'Do you service the new Land Rover Defender in Dubai?', a: 'Yes. We service and repair modern Defender 90 and Defender 110 models, including diagnostics, maintenance, brakes, suspension and electrical work.' },
      { q: 'Can you diagnose Defender warning lights?', a: 'Yes. We use JLR-compatible diagnostic tooling and live data to identify the affected system before recommending repairs.' },
      { q: 'Do you repair Defender air suspension?', a: 'Yes. We inspect and repair air-suspension components, then complete the required height calibration and road test.' },
      { q: 'Where is your Defender workshop?', a: 'Digi-Tec Performance Centre is in Al Quoz Industrial Area 3, Dubai. Contact us to book an inspection.' },
    ],
    relatedServices: ['suspension-repair-dubai', 'mechanical-repair-dubai', 'car-diagnostics-dubai', 'brake-repair-dubai'],
  },
);

export const getBrandBySlug = (slug: string) => brands.find((b) => b.slug === slug);

export const getSlugForOrbitName = (orbitName: string): string | undefined => {
  // Map BrandsWeServe display names to brand slugs.
  const map: Record<string, string> = {
    'Range Rover': 'land-rover-service-dubai',
    'Rolls Royce': 'rolls-royce-service-dubai',
  };
  if (map[orbitName]) return map[orbitName];
  return brands.find((b) => b.name === orbitName)?.slug;
};
