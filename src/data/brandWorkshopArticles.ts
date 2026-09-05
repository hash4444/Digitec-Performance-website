import lamborghiniUrusWorkshop from '@/assets/lamborghini-urus-workshop-dubai.jpg';

export type BrandWorkshopArticle = {
  brand: string;
  slug: string;
  title: string;
  primaryKeyword: string;
  metaTitle?: string;
  metaDescription?: string;
  datePublished?: string;
  dateModified?: string;
  existingBestPage?: string;
  brandHub?: string;
  models: string;
  excerpt?: string;
  diagnosticFocus: string;
  commonProblems: string[];
  repairFocus: string[];
  maintenanceNote: string;
  performanceNote: string;
  imageAlt: string;
  coverGradient: string;
  coverImage?: string;
};

const profiles: Omit<BrandWorkshopArticle, 'slug' | 'title' | 'primaryKeyword' | 'existingBestPage' | 'brandHub'>[] = [
  {
    brand: 'Mercedes-Benz', models: 'C-Class, E-Class, S-Class, GLE, GLS, G-Class and AMG models', diagnosticFocus: 'XENTRY-led fault tracing, live data review and service-history checks',
    commonProblems: ['AIRMATIC leaks or compressor strain that affect ride height', '9G-Tronic, 7G-Tronic or AMG transmission shift-quality concerns', 'Cooling, electrical and sensor faults that need system-level diagnosis'],
    repairFocus: ['scheduled Service A and Service B work', 'suspension, brake, transmission and electrical repairs', 'AMG inspection and performance-upgrade planning where suitable'], maintenanceNote: 'Dubai heat, traffic and short trips can shorten fluid, cooling-system and tyre-inspection intervals. A condition-led inspection is more useful than waiting for a dashboard warning.', performanceNote: 'For AMG and performance models, any tuning decision should begin with a health check, data review and a clear conversation about supporting hardware, fuel quality and reliability.', imageAlt: 'Mercedes-Benz receiving diagnostics at DIGI-TEC workshop in Dubai', coverGradient: 'from-slate-800 via-charcoal to-black',
  },
  {
    brand: 'Maybach', models: 'Maybach S-Class, GLS and Mercedes-Maybach V12 models', diagnosticFocus: 'comfort-system, active-suspension and powertrain diagnostics with a documented inspection plan',
    commonProblems: ['air-suspension and ride-comfort faults', 'complex electrical, climate-control and rear-cabin comfort concerns', 'V8 and V12 cooling, ignition and service requirements'], repairFocus: ['chauffeur-car maintenance planning', 'air-suspension, braking and climate-system repairs', 'careful inspections of high-value comfort and electrical systems'], maintenanceNote: 'Maybach ownership benefits from proactive checks of suspension, tyres, cooling and cabin systems, especially when the car is chauffeur driven or spends long periods idling.', performanceNote: 'Performance work is considered only after preserving refinement, drivability and the vehicle’s original comfort systems.', imageAlt: 'Maybach luxury sedan receiving a workshop inspection in Dubai', coverGradient: 'from-zinc-700 via-charcoal to-black',
  },
  {
    brand: 'Porsche', models: '911, Cayenne, Macan, Panamera, Taycan and GT models', diagnosticFocus: 'model-appropriate scan-tool diagnostics, PDK data checks and a road-test-led fault assessment',
    commonProblems: ['PDK shift behaviour, clutch adaptation or transmission-service needs', 'cooling, vacuum and turbo-system concerns on performance models', 'brake, suspension and tyre wear that affect handling'], repairFocus: ['scheduled servicing and fluid inspections', 'PDK, brake, suspension and cooling-system repair', 'pre-purchase and track-use inspections'], maintenanceNote: 'Porsche maintenance should reflect how the car is actually used: daily commuting, desert heat, occasional driving or track use all change what deserves attention first.', performanceNote: 'For performance models, upgrades should be matched to the car’s cooling, braking, tyre and drivetrain condition rather than selected as a standalone power figure.', imageAlt: 'Porsche performance car undergoing diagnostics at DIGI-TEC Dubai', coverGradient: 'from-red-950 via-charcoal to-black',
  },
  {
    brand: 'BMW', models: '3 Series, 5 Series, 7 Series, X models, M cars and i models', diagnosticFocus: 'condition-based service review, fault-code analysis and live-data checks before parts are recommended',
    commonProblems: ['cooling-system, oil-leak and ignition concerns', 'ZF transmission and transfer-case service requirements', 'electrical, battery-registration and iDrive-related faults'], repairFocus: ['BMW maintenance and inspection plans', 'engine, cooling, transmission, suspension and brake repairs', 'M-car health checks and upgrade planning'], maintenanceNote: 'A BMW used in Dubai benefits from earlier oil, cooling, battery and tyre checks than a schedule designed for a milder climate.', performanceNote: 'M-car upgrades should be planned around diagnostic health, cooling capacity, braking, tyres and intended use.', imageAlt: 'BMW M vehicle being inspected in an Al Quoz workshop', coverGradient: 'from-blue-950 via-charcoal to-black',
  },
  {
    brand: 'Audi', models: 'A4, A6, A8, Q5, Q7, Q8, RS models and R8', diagnosticFocus: 'VAG-platform diagnostics, module communication checks and a clear repair path before work starts',
    commonProblems: ['S Tronic or automatic-transmission service needs', 'cooling, PCV and oil-consumption concerns on selected engines', 'Quattro, suspension and electrical-system faults'], repairFocus: ['maintenance, oil-service and inspection work', 'transmission, brakes, suspension and diagnostics', 'RS and R8 health checks before performance work'], maintenanceNote: 'Audi servicing in Dubai should account for heat load, traffic, dust, tyre condition and the vehicle’s recorded service history.', performanceNote: 'RS and performance upgrades should follow a baseline scan, cooling review and realistic discussion of use, fuel and supporting parts.', imageAlt: 'Audi receiving diagnostic inspection at DIGI-TEC Dubai', coverGradient: 'from-zinc-800 via-charcoal to-black',
  },
  {
    brand: 'Bentley', models: 'Continental GT, Flying Spur, Bentayga and Mulsanne', diagnosticFocus: 'luxury-platform diagnostics with attention to drivetrain, air suspension, comfort systems and service records',
    commonProblems: ['air-suspension, ride-height and steering concerns', 'cooling, electrical and comfort-system faults', 'transmission and brake wear on high-torque vehicles'], repairFocus: ['Bentley service planning and inspection', 'suspension, braking, cooling and drivetrain repairs', 'careful pre-purchase and long-distance travel checks'], maintenanceNote: 'Bentley maintenance should be planned around mileage, heat exposure, tyre age, battery condition and long-idle periods rather than mileage alone.', performanceNote: 'Any performance discussion should protect the car’s drivetrain calibration, cooling margins and refined driving character.', imageAlt: 'Bentley luxury car in a specialist workshop in Dubai', coverGradient: 'from-emerald-950 via-charcoal to-black',
  },
  {
    brand: 'Rolls-Royce', models: 'Cullinan, Ghost, Phantom, Wraith, Dawn and Spectre', diagnosticFocus: 'a vehicle-specific review of compatible fault data and the mechanical, suspension, low-voltage electrical or climate concern reported by the owner',
    commonProblems: ['ride-height, suspension and ride-quality concerns', 'low-voltage battery, charging and electrical warnings', 'cooling, braking, climate and drivetrain service needs'], repairFocus: ['model-specific maintenance planning', 'diagnostic, mechanical, transmission, suspension, climate, electrical and brake assessment', 'clear findings and approval before supported repair work'], maintenanceNote: 'The maintenance plan should follow information for the exact model and year, then account for mileage, history, storage, condition and Dubai use. Low mileage does not prevent tyres, seals, fluids or low-voltage batteries from ageing.', performanceNote: 'Parts, fluids, diagnostic access and repair capability are confirmed for the exact vehicle. This guide does not advertise Rolls-Royce tuning, proprietary programming, Spectre high-voltage work or unsupported specialist procedures.', excerpt: 'How to compare Rolls-Royce workshops in Dubai, prepare a useful enquiry and review maintenance, diagnostic and repair estimates.', metaTitle: 'Rolls-Royce Workshop Selection Guide Dubai | DIGI-TEC', metaDescription: 'Compare Rolls-Royce workshops in Dubai by assessment process, diagnostic scope, parts, estimates and vehicle-specific repair capability.', datePublished: '2026-07-16', dateModified: '2026-09-05', imageAlt: 'DIGI-TEC workshop facilities in Al Quoz, Dubai', coverGradient: 'from-neutral-700 via-charcoal to-black',
  },
  {
    brand: 'Ferrari', models: 'California, Portofino, Roma, 488, F8, SF90, Purosangue and classic models', diagnosticFocus: 'a careful pre-work scan, fluid and temperature review, and road-test-led assessment for performance systems',
    commonProblems: ['F1 or dual-clutch transmission symptoms that need model-specific diagnosis', 'brake, tyre and suspension concerns that affect confidence', 'cooling, battery and electronic-system faults after heat or storage'], repairFocus: ['routine service and multi-point inspection', 'brake, suspension, cooling and transmission-related repairs', 'pre-purchase, pre-trip and post-storage checks'], maintenanceNote: 'Ferrari maintenance is as much about usage and storage as mileage: battery support, tyre age, fluid condition and heat management deserve planned attention.', performanceNote: 'Track or performance preparation should begin with safety, braking, cooling, tyre and drivetrain condition—not a power upgrade alone.', excerpt: 'A practical Ferrari ownership and maintenance guide for Dubai, covering service planning, warning signs, storage and the checks that matter in UAE conditions.', metaTitle: 'Ferrari Maintenance Dubai | Ownership & Service Guide', metaDescription: 'Plan Ferrari maintenance in Dubai with a model-aware guide to service timing, warning signs, storage and essential checks for UAE heat and performance use.', datePublished: '2026-07-16', dateModified: '2026-08-31', imageAlt: 'Two red Ferrari 348 sports cars inside a specialist workshop', coverGradient: 'from-red-900 via-charcoal to-black', coverImage: '/images/ferrari-maintenance-dubai.jpg',
  },
  {
    brand: 'Lamborghini', models: 'Huracán, Urus, Aventador, Gallardo and Revuelto', diagnosticFocus: 'vehicle-specific assessment of warning data, drivetrain, cooling, brakes, suspension and low-voltage electrical systems',
    commonProblems: ['warning messages or changes in drivability that need measured diagnosis', 'brake, tyre, suspension or lift-system concerns that vary by model', 'cooling, low-voltage battery and electrical symptoms after heat or storage'], repairFocus: ['model-specific maintenance planning', 'diagnostic, mechanical, transmission, brake and suspension assessment', 'post-storage condition checks where the requested scope is confirmed'], maintenanceNote: 'The correct plan depends on manufacturer information for the exact Lamborghini model and year, its service history, mileage, storage and Dubai use; one interval is not applied to every vehicle.', performanceNote: 'Parts, fluids, diagnostic access and repair capability are confirmed for the exact vehicle. This guide does not advertise Lamborghini tuning, proprietary programming, carbon-structure work or hybrid high-voltage repair.', excerpt: 'A practical Lamborghini maintenance guide for Dubai owners, covering model-specific schedules, warning signs, storage and service preparation.', metaTitle: 'Lamborghini Maintenance Dubai | Owner Service Guide', metaDescription: 'Plan Lamborghini maintenance in Dubai using model-specific service information, vehicle history, inspection findings and clear workshop scope.', datePublished: '2026-07-16', dateModified: '2026-09-05', imageAlt: 'Lamborghini Urus inside the DIGI-TEC workshop in Al Quoz, Dubai', coverGradient: 'from-orange-950 via-charcoal to-black', coverImage: lamborghiniUrusWorkshop,
  },
  {
    brand: 'McLaren', models: '570S, 570GT, 600LT, 650S, 675LT, 720S, 765LT, 750S, GT, GTS, Artura and earlier road cars', diagnosticFocus: 'a vehicle-specific assessment that combines compatible fault data with physical checks of the reported concern',
    commonProblems: ['warning messages, cooling concerns or changes in drivability', 'battery, starting and electrical symptoms after heat or storage', 'gearbox, suspension, lift-system, brake and tyre concerns that vary by fitted system'], repairFocus: ['maintenance and oil-service planning', 'diagnostic, mechanical, transmission, suspension and electrical assessment', 'post-storage or used-vehicle condition checks only where the requested scope is confirmed'], maintenanceNote: 'The correct plan depends on the exact McLaren model and year, its service information, history, mileage, storage and use in Dubai; no single oil grade or interval is applied to every vehicle.', performanceNote: 'Parts, fluids, procedures, diagnostic access and repair capability are confirmed for the exact McLaren before an estimate is approved. This guide does not advertise McLaren tuning, factory authorization, carbon-tub repair or hybrid high-voltage work.', imageAlt: 'DIGI-TEC workshop service bays in Al Quoz, Dubai', coverGradient: 'from-amber-950 via-charcoal to-black', excerpt: 'A practical guide to comparing an independent McLaren workshop in Dubai, understanding inspection scope and preparing a useful service or repair enquiry.', metaTitle: 'Choosing a McLaren Workshop Dubai | Owner Guide', metaDescription: 'Compare a McLaren workshop in Dubai by inspection process, vehicle-specific capability, estimate clarity and location. Continue to DIGI-TEC’s McLaren service hub.', datePublished: '2026-07-16', dateModified: '2026-09-05',
  },
  {
    brand: 'Aston Martin', models: 'Vantage, DB11, DBS, DBX and Rapide', diagnosticFocus: 'a structured inspection that connects engine, transaxle, suspension, braking and electrical findings',
    commonProblems: ['battery and electrical faults on low-use vehicles', 'cooling, ignition and oil-system concerns', 'brake, tyre, suspension and transmission service needs'], repairFocus: ['Aston Martin scheduled maintenance', 'drivetrain, cooling, brake and suspension repair', 'condition reports for purchase, sale or long-distance travel'], maintenanceNote: 'Aston Martin vehicles benefit from regular battery conditioning, fluid checks and tyre inspections, even when the odometer remains low.', performanceNote: 'Performance work should protect the car’s balance, cooling, braking and transmission characteristics, with a clear specification agreed first.', imageAlt: 'Aston Martin inspected in a specialist Dubai workshop', coverGradient: 'from-teal-950 via-charcoal to-black',
  },
  {
    brand: 'Maserati', models: 'Ghibli, Levante, Quattroporte, GranTurismo and Grecale', diagnosticFocus: 'a full-system scan and inspection covering powertrain, cooling, suspension, brake and electrical systems',
    commonProblems: ['battery and electrical-system faults', 'cooling, ignition and oil-leak concerns', 'suspension, braking and transmission service requirements'], repairFocus: ['scheduled servicing and diagnostics', 'engine, cooling, brake and suspension repair', 'pre-purchase and seasonal inspections'], maintenanceNote: 'Maserati servicing in Dubai should prioritise heat-affected fluids, cooling efficiency, battery health and tyre condition.', performanceNote: 'Performance planning should follow verified mechanical health and should account for heat, drivetrain limits and the car’s intended use.', imageAlt: 'Maserati receiving diagnostics at an Al Quoz workshop', coverGradient: 'from-sky-950 via-charcoal to-black',
  },
  {
    brand: 'Range Rover', models: 'Range Rover, Range Rover Sport, Velar, Evoque and SV models', diagnosticFocus: 'a Land Rover-focused diagnostic approach for suspension, drivetrain, cooling, electrical and terrain-response systems',
    commonProblems: ['air-suspension, ride-height and compressor faults', 'cooling, timing, oil-leak and engine-management concerns', 'transfer-case, transmission and electrical-system warnings'], repairFocus: ['routine service and condition checks', 'suspension, cooling, drivetrain and brake repair', 'pre-purchase and off-road-use inspections'], maintenanceNote: 'Range Rover maintenance should include regular cooling, suspension, battery, brake and tyre checks because heat, traffic and stop-start driving add load.', performanceNote: 'For SV and performance models, upgrades should follow an honest assessment of cooling, brakes, tyres and drivetrain condition.', imageAlt: 'Range Rover suspension inspection at DIGI-TEC Dubai', coverGradient: 'from-green-950 via-charcoal to-black',
  },
  {
    brand: 'Land Rover', models: 'Defender, Discovery, Discovery Sport and older Land Rover platforms', diagnosticFocus: 'a practical inspection of drivetrain, suspension, cooling, electrical and terrain-use systems',
    commonProblems: ['air-suspension or chassis-system warnings', 'cooling, oil-leak and engine-management concerns', 'transfer-case, brake and electrical faults'], repairFocus: ['scheduled maintenance and inspections', 'suspension, drivetrain, cooling and brake repairs', 'Defender and off-road-use health checks'], maintenanceNote: 'Land Rover maintenance in the UAE should include earlier checks of cooling, tyres, brakes and suspension components after desert, towing or city use.', performanceNote: 'Upgrades must suit the intended use—touring, towing, urban driving or off-road travel—and should not compromise safety systems.', imageAlt: 'Land Rover receiving a drivetrain inspection in Dubai', coverGradient: 'from-lime-950 via-charcoal to-black',
  },
  {
    brand: 'Jaguar', models: 'F-PACE, XE, XF, F-Type, I-PACE and XJ', diagnosticFocus: 'Jaguar-focused diagnostics for engine management, cooling, electrical, suspension and driveline concerns',
    commonProblems: ['cooling, battery and electrical-system warnings', 'suspension and brake wear affecting ride and handling', 'engine-management and transmission concerns'], repairFocus: ['maintenance, inspections and diagnostics', 'cooling, electrical, brake and suspension repairs', 'pre-purchase and I-PACE condition checks'], maintenanceNote: 'Jaguar owners in Dubai should keep cooling, battery, tyres and brake systems under review, particularly on low-mileage or heat-exposed cars.', performanceNote: 'Performance work is evaluated only after the car has a clean diagnostic baseline and the braking and cooling systems are ready for it.', imageAlt: 'Jaguar receiving diagnostics in a Dubai workshop', coverGradient: 'from-cyan-950 via-charcoal to-black',
  },
  {
    brand: 'Lexus', models: 'LS, LX, GX, RX, ES, IS, LC and hybrid models', diagnosticFocus: 'a careful review of hybrid, petrol, cooling, brake, suspension and electronic systems',
    commonProblems: ['hybrid-battery, cooling and electrical-system concerns', 'brake, suspension and steering wear on SUVs', 'air-conditioning and infotainment-related faults'], repairFocus: ['scheduled servicing and inspection', 'cooling, brake, suspension and electrical repairs', 'hybrid-system health checks where required'], maintenanceNote: 'Lexus maintenance in Dubai should prioritise cooling efficiency, air-conditioning, tyres, brakes and battery condition in addition to the scheduled service plan.', performanceNote: 'For Lexus models, any performance or accessory work should be compatible with the vehicle’s safety, hybrid and electrical systems.', imageAlt: 'Lexus SUV undergoing a workshop inspection in Dubai', coverGradient: 'from-stone-800 via-charcoal to-black',
  },
  {
    brand: 'Cadillac', models: 'Escalade, CT5, CT4, XT5, XT6 and performance models', diagnosticFocus: 'a model-specific scan and inspection for powertrain, suspension, brake, electrical and comfort systems',
    commonProblems: ['battery, electrical and infotainment faults', 'suspension and ride-control concerns', 'cooling, brake and transmission service needs'], repairFocus: ['Cadillac scheduled maintenance', 'electrical, suspension, cooling and brake repairs', 'Escalade pre-trip and long-distance inspections'], maintenanceNote: 'Large luxury SUVs need proactive cooling, brake, tyre and battery checks in Dubai, especially where city traffic and idling are frequent.', performanceNote: 'Any upgrade should be planned around the vehicle’s braking, cooling, tyre and suspension capacity rather than power alone.', imageAlt: 'Cadillac Escalade inspected at DIGI-TEC Dubai', coverGradient: 'from-slate-700 via-charcoal to-black',
  },
  {
    brand: 'Chevrolet', models: 'Tahoe, Suburban, Silverado, Camaro, Corvette and performance models', diagnosticFocus: 'a practical scan-and-inspection process for engine, gearbox, cooling, braking, electrical and chassis systems',
    commonProblems: ['cooling, battery and electrical-system faults', 'transmission service needs and drivability concerns', 'brake, suspension and tyre wear on SUVs and performance cars'], repairFocus: ['maintenance and oil-service planning', 'cooling, brake, suspension and transmission repairs', 'Corvette and Camaro health checks before performance work'], maintenanceNote: 'Chevrolet vehicles in Dubai benefit from regular cooling, battery, tyre and brake inspections that reflect heat, traffic and towing or performance use.', performanceNote: 'For Corvette and Camaro projects, start with diagnostics, cooling, braking, tyres and clear goals for street or track use.', imageAlt: 'Chevrolet performance car receiving service in Dubai', coverGradient: 'from-yellow-950 via-charcoal to-black',
  },
  {
    brand: 'Ford', models: 'Mustang, F-150, Bronco, Explorer, Everest and performance models', diagnosticFocus: 'a full-system inspection for engine, cooling, transmission, brake, suspension and electronic systems',
    commonProblems: ['cooling and turbo-system concerns on selected engines', 'transmission, driveline and steering issues', 'battery, electrical and air-conditioning faults'], repairFocus: ['Ford routine servicing and diagnostics', 'cooling, brake, suspension and drivetrain repair', 'Mustang and F-150 usage-based inspections'], maintenanceNote: 'Ford maintenance in Dubai should reflect heat, traffic, towing, desert driving and the vehicle’s actual workload rather than mileage alone.', performanceNote: 'Mustang and truck upgrades should be balanced with cooling, braking, tyre, driveline and legal-road-use considerations.', imageAlt: 'Ford Mustang inspected at a Dubai workshop', coverGradient: 'from-blue-900 via-charcoal to-black',
  },
  {
    brand: 'Nissan', models: 'Patrol, Armada, Z, GT-R, X-Trail and Pathfinder', diagnosticFocus: 'a Nissan-focused diagnostic and inspection path for engine, cooling, drivetrain, suspension, brake and electrical systems',
    commonProblems: ['cooling, ignition and engine-management faults', 'transmission, transfer-case and driveline concerns', 'suspension, brake and air-conditioning wear'], repairFocus: ['routine servicing and inspection', 'cooling, brakes, suspension and drivetrain repair', 'Patrol, Z and GT-R health checks before modification'], maintenanceNote: 'Nissan vehicles in Dubai often work hard in heat, traffic and desert conditions, making cooling, transmission, brakes and tyres priority inspection items.', performanceNote: 'GT-R, Z and Patrol performance work should follow a full baseline inspection and a realistic plan for heat management and supporting hardware.', imageAlt: 'Nissan Patrol receiving diagnostics at DIGI-TEC Dubai', coverGradient: 'from-red-950 via-charcoal to-black',
  },
  {
    brand: 'Toyota', models: 'Land Cruiser, Prado, Camry, Supra, GR models and hybrid vehicles', diagnosticFocus: 'a vehicle-specific diagnostic review across engine, cooling, hybrid, drivetrain, suspension, brake and electrical systems',
    commonProblems: ['cooling, air-conditioning and battery concerns', 'brake, suspension and steering wear on SUVs', 'transmission, driveline and hybrid-system warnings'], repairFocus: ['scheduled servicing and multi-point inspections', 'cooling, brake, suspension and electrical repairs', 'Land Cruiser, GR and hybrid health checks'], maintenanceNote: 'Toyota maintenance in the UAE should take account of heat, towing, off-road use, traffic and air-conditioning demand—not only the standard mileage interval.', performanceNote: 'GR and Supra projects need a staged plan that verifies cooling, braking, tyres and drivetrain health before any power increase.', imageAlt: 'Toyota Land Cruiser receiving inspection in Dubai', coverGradient: 'from-rose-950 via-charcoal to-black',
  },
  {
    brand: 'Volkswagen', models: 'Golf GTI, Golf R, Tiguan, Touareg, Passat and ID models', diagnosticFocus: 'VAG-platform diagnostics for engine, transmission, electrical, cooling and driver-assistance systems',
    commonProblems: ['DSG service or shift-quality concerns', 'cooling, ignition, PCV and engine-management faults', 'electrical, battery and suspension issues'], repairFocus: ['Volkswagen scheduled servicing', 'DSG, cooling, brake and suspension repair', 'Golf GTI and Golf R health checks before upgrades'], maintenanceNote: 'Volkswagen ownership in Dubai benefits from earlier monitoring of oil condition, cooling, DSG service history, tyres and battery health.', performanceNote: 'GTI and Golf R tuning should follow a scan, service-history review and assessment of cooling, DSG and supporting hardware.', imageAlt: 'Volkswagen Golf R undergoing diagnostics in Dubai', coverGradient: 'from-indigo-950 via-charcoal to-black',
  },
  {
    brand: 'MINI', models: 'MINI Cooper, Cooper S, John Cooper Works, Countryman and Clubman', diagnosticFocus: 'a BMW-platform-informed inspection of engine, cooling, electrical, brake, suspension and transmission systems',
    commonProblems: ['cooling, oil-leak and ignition concerns', 'battery, electrical and infotainment faults', 'brake, suspension and transmission service needs'], repairFocus: ['MINI maintenance and diagnostics', 'cooling, brake, suspension and electrical repairs', 'John Cooper Works health checks before upgrades'], maintenanceNote: 'MINI servicing in Dubai should pay close attention to cooling, oil condition, battery health and tyre wear, especially on turbocharged models.', performanceNote: 'Cooper S and JCW upgrades should begin with a complete diagnostic and mechanical baseline, then move in stages with supporting parts where needed.', imageAlt: 'MINI Cooper undergoing inspection at DIGI-TEC Dubai', coverGradient: 'from-amber-900 via-charcoal to-black',
  },
  {
    brand: 'Alfa Romeo', models: 'Giulia, Stelvio, Quadrifoglio, Tonale and classic Alfa Romeo models', diagnosticFocus: 'a detailed scan and inspection of engine, cooling, brake, suspension, drivetrain and electrical systems',
    commonProblems: ['battery, electrical and infotainment concerns', 'cooling, ignition and engine-management faults', 'brake, suspension and transmission service requirements'], repairFocus: ['scheduled maintenance and diagnostics', 'cooling, brake, suspension and electrical repairs', 'Quadrifoglio and performance-model health checks'], maintenanceNote: 'Alfa Romeo maintenance in Dubai should include proactive checks of cooling, tyres, brakes, battery health and fluids to suit the climate and driving pattern.', performanceNote: 'Quadrifoglio upgrades should be planned only after a diagnostic baseline, cooling review, brake inspection and a clear reliability-first specification.', imageAlt: 'Alfa Romeo Giulia receiving diagnostics in Dubai', coverGradient: 'from-red-950 via-charcoal to-black',
  },
];

const existingBestPages: Record<string, string> = {
  'Mercedes-Benz': '/brands/mercedes-benz-service-dubai',
  BMW: '/best-bmw-workshop-dubai',
  Porsche: '/best-porsche-workshop-dubai',
  Audi: '/best-audi-workshop-dubai',
  'Range Rover': '/best-range-rover-workshop-dubai',
  Ferrari: '/best-ferrari-workshop-dubai',
  Lamborghini: '/best-lamborghini-workshop-dubai',
};

const existingBrandHubs: Record<string, string> = {
  'Mercedes-Benz': '/brands/mercedes-benz-service-dubai', Maybach: '/brands/maybach-service-dubai', Porsche: '/brands/porsche-service-dubai', BMW: '/brands/bmw-service-dubai', Audi: '/brands/audi-service-dubai', Bentley: '/brands/bentley-service-dubai', 'Rolls-Royce': '/brands/rolls-royce-service-dubai', Ferrari: '/brands/ferrari-service-dubai', Lamborghini: '/brands/lamborghini-service-dubai', McLaren: '/brands/mclaren-service-dubai', 'Aston Martin': '/brands/aston-martin-service-dubai', 'Land Rover': '/brands/land-rover-service-dubai',
};

const slugFor = (brand: string) => brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const brandWorkshopArticles: BrandWorkshopArticle[] = profiles.map((profile) => {
  const existingBestPage = existingBestPages[profile.brand];
  const suffix = existingBestPage ? 'maintenance-guide-dubai' : 'best-workshop-dubai';
  const brandSlug = slugFor(profile.brand);
  return {
    ...profile,
    slug: `${brandSlug}-${suffix}`,
    title: profile.brand === 'Ferrari'
      ? 'Ferrari Maintenance in Dubai: Ownership & Service Guide'
      : existingBestPage
        ? `${profile.brand} Maintenance Guide for Dubai Owners`
        : `Choosing a ${profile.brand} Workshop in Dubai: Owner Guide`,
    primaryKeyword: existingBestPage
      ? `${profile.brand} maintenance Dubai`
      : `${profile.brand} Workshop Dubai`,
    existingBestPage,
    brandHub: existingBrandHubs[profile.brand],
  };
});

export const getBrandWorkshopArticle = (slug: string) => brandWorkshopArticles.find((article) => article.slug === slug);

export const brandWorkshopArticleSummaries = brandWorkshopArticles.map((article) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt ?? (article.existingBestPage
    ? `A practical ${article.brand} maintenance and repair guide for Dubai owners, covering common concerns, diagnostic steps and workshop preparation.`
    : `How to choose a ${article.brand} workshop in Dubai, what to ask, common issues to discuss, and how to book a clear inspection plan.`),
  category: 'Workshop Guides',
  author: 'DIGI-TEC Workshop',
  date: article.dateModified ?? article.datePublished ?? '2026-07-16',
  readTime: '12 min read',
  coverGradient: article.coverGradient,
  coverImage: article.coverImage,
  metaTitle: article.metaTitle ?? (article.existingBestPage
    ? `${article.brand} Maintenance Dubai | DIGI-TEC`
    : `${article.brand} Workshop Dubai | Owner Guide`),
  metaDescription: article.metaDescription ?? `${article.brand} workshop in Dubai for diagnostics, maintenance and repair. Visit DIGI-TEC in Al Quoz for clear inspections, practical guidance and booking support.`,
}));
