import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle2, ArrowRight, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSeo } from '@/hooks/use-seo';
import { brands, getBrandBySlug } from '@/data/brands';
import { getServiceBySlug } from '@/data/services';
import {
  BRAND_OFFER_CATALOG,
  buildBrand,
  buildBreadcrumb,
  buildFAQ,
  buildService,
  buildWebPage,
  pageGraph,
} from '@/lib/schema';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BrandBookingForm from '@/components/BrandBookingForm';
import { BRAND_PROFILES, getServicesForBrand } from '@/data/brandServices';
import { CtaAssurance } from '@/components/TrustBar';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/use-locale';
import { arBrandServices, arBrandServiceNames, localizeBrandToArabic } from '@/i18n/ar-brands';
import { localizeServiceToArabic } from '@/i18n/ar-services';
import ferrariEngineWorkshop from '@/assets/ferrari-engine-workshop-dubai.jpg';
import rangeRoverWorkshop from '@/assets/range-rover-workshop-dubai.png';
import defenderWorkshop from '@/assets/defender-workshop-dubai.jpg';
import nissanWorkshop from '@/assets/nissan-workshop-dubai.jpg';
import lamborghiniWorkshop from '@/assets/lamborghini-workshop-dubai.jpg';
import lamborghiniUrusWorkshop from '@/assets/lamborghini-urus-workshop-dubai.jpg';
import porscheWorkshop from '@/assets/porsche-workshop-dubai.jpg';
import porscheGt3rsWorkshop from '@/assets/porsche-gt3rs-workshop-dubai.jpg';
import maybachWorkshop from '@/assets/maybach-workshop-dubai.jpg';
import mercedesWorkshop from '@/assets/mercedes-repair-guide-workshop.jpg';
import mercedesAmgEngine from '@/assets/mercedes-amg-engine-repair-dubai.jpg';
import g63BrabusFinishedFront from '@/assets/g63-brabus-g800-finished-front.jpg';

const MERCEDES_META_TITLE = 'Mercedes Repair & Service Dubai | Digi-Tec Specialists';
const MERCEDES_META_DESCRIPTION = 'Specialist Mercedes repair and service in Dubai for C-Class, E-Class, S-Class, G-Class, GLE, GLS and AMG. XENTRY diagnostics at our Al Quoz workshop in Dubai.';

const RANGE_ROVER_META_TITLE = 'Range Rover Workshop Dubai | Repair & Service';
const RANGE_ROVER_META_DESCRIPTION = 'Range Rover workshop in Al Quoz, Dubai for Vogue, Sport, Velar and Evoque repair and service. JLR diagnostics, air suspension, cooling and ZF expertise.';
const DEFENDER_META_TITLE = 'Defender Repair Dubai | Land Rover Specialists | Digi-Tec';
const DEFENDER_META_DESCRIPTION = 'Land Rover Defender repair and service in Dubai for Defender 90, 110, 130, V8 and OCTA. JLR diagnostics, air suspension and 4x4 care in Al Quoz.';

const MERCEDES_SEO_COPY = {
  intro: 'Digi-Tec Performance Centre in Al Quoz provides Mercedes-Benz repair, scheduled maintenance and diagnostics for daily drivers, luxury models, G-Class and AMG vehicles. We begin with the reported symptom, scan data and a physical inspection, then explain the recommended scope before repair work starts.',
  dubai: 'Dubai heat, traffic and fine dust place extra load on Mercedes cooling systems, engine oil, batteries, rubber components and air conditioning. Our inspections account for the vehicle model, mileage and actual use rather than applying one generic schedule. Cooling performance, fluid condition, battery health, suspension wear and AC output receive particular attention.',
  expertise: 'Mercedes work is supported by XENTRY and DAS with Star Diagnostics for fault tracing, live data, service resets and adaptations where applicable. Our technical coverage includes M254 and M256 engines, M177 and M178 AMG V8 platforms, OM656 diesels, 7G-Tronic and 9G-Tronic transmissions, and AIRMATIC, ABC and E-ACTIVE suspension systems.',
  parts: 'Each estimate identifies the proposed parts and fluids before approval. Depending on the repair and owner preference, this can include genuine Mercedes-Benz parts, established OE-supplier components or a suitable customer-approved alternative. The correct Mercedes fluid specification, fitting procedure and post-repair checks matter more than a one-size-fits-all parts claim.',
  cta: 'For Mercedes repair, maintenance or a second-opinion inspection in Dubai, call +971 4 340 2223, message Digi-Tec on WhatsApp or use the booking form below. Include the model, year, mileage, warning message and symptoms so the workshop can prepare for the right first inspection.',
};

const RANGE_ROVER_SEO_COPY = {
  intro: 'Digi-Tec Performance Centre in Al Quoz provides specialist Range Rover repair, scheduled maintenance and diagnostics for Range Rover, Range Rover Sport, Velar and Evoque models. We start with the reported symptom, diagnostic data and a physical inspection, then explain the recommended work and parts options before any repair begins.',
  dubai: 'Dubai heat, traffic and dust put extra demand on Range Rover cooling systems, air conditioning, batteries, air suspension and rubber components. Our inspection considers the exact model, mileage, service history and how the vehicle is used, with close attention to cooling performance, air-system leaks, brake wear and battery health.',
  expertise: 'Range Rover work starts with the VIN, reported concern and vehicle condition. Compatible diagnostic access, live data, service functions and any calibration are confirmed for the exact model, module and required scope before they are quoted. Relevant systems may include Ingenium engines, V8 platforms, ZF transmissions, Terrain Response and electronic air suspension.',
  parts: 'The estimate identifies proposed parts, fluids and any supported calibration before approval. Genuine JLR, established OE-supplier or suitable customer-approved alternatives may be quoted depending on the repair, availability and owner preference.',
  cta: 'For Range Rover repair, service or an air-suspension inspection in Dubai, call +971 4 340 2223, send Digi-Tec a WhatsApp message or use the booking form below. Include your model, year, mileage, warning message and symptoms so we can prepare for the right first inspection.',
};

const DEFENDER_SEO_COPY = {
  intro: 'Digi-Tec Performance Centre in Al Quoz provides specialist Land Rover Defender repair, scheduled maintenance and diagnostics for Defender 90, Defender 110, Defender 130, Defender V8 and Defender OCTA models. We combine the reported symptom with JLR diagnostic data, a physical inspection and a road test where appropriate before recommending repairs.',
  dubai: 'Defenders in Dubai deal with heat, stop-start traffic, sand and off-road use. We pay particular attention to cooling, air conditioning, battery condition, brakes, wheel and tyre condition, suspension, underbody and driveline systems—then tailor the work to the vehicle’s actual use rather than applying a generic schedule.',
  expertise: 'Defender diagnosis starts with the VIN, reported concern and vehicle condition. Compatible diagnostic access, live data, service functions and any calibration are confirmed for the exact model, module and required scope before they are quoted. Relevant systems may include Ingenium, P400 or V8 powertrains, eight-speed transmissions, Terrain Response, four-wheel drive, air suspension and electrical systems.',
  parts: 'Before approved work starts, the estimate identifies proposed parts and fluids. Genuine JLR, established OE-supplier or suitable customer-approved alternatives may be quoted depending on the repair, availability and owner preference; relevant post-repair checks depend on the system repaired.',
  cta: 'For Defender repair, service, diagnostics or a pre-trip inspection in Dubai, call +971 4 340 2223, message Digi-Tec on WhatsApp or use the booking form below. Send the Defender model, year, mileage, warning message and symptoms for the most useful first inspection.',
};

const RANGE_ROVER_COMMON_ISSUES = [
  { title: 'Suspension Fault, low corner or slow lifting', description: 'Electronic air suspension symptoms can come from an air strut, compressor, valve block, air leak, height sensor or electrical fault. We test the system before recommending parts.', path: 'suspension-repair', label: 'Range Rover air suspension repair' },
  { title: 'Cooling warning, coolant loss or overheating', description: 'Cooling-system concerns can involve a leak, thermostat, water pump, radiator, fan or another engine-management issue. We identify the cause before replacing components.', path: 'mechanical-repair', label: 'Range Rover mechanical repair' },
  { title: 'Transmission warning, harsh shift or driveline noise', description: 'ZF 8HP and four-wheel-drive symptoms require scan data, fluid and leak checks, a physical inspection and a road test where appropriate before repair scope is defined.', path: 'transmission-repair', label: 'Range Rover transmission repair' },
  { title: 'Weak AC or poor cabin cooling', description: 'Dubai temperatures expose weak compressors, leaks, condensers, cooling fans and climate-control issues. A proper diagnosis checks performance before refrigerant or parts are added.', path: 'ac-repair', label: 'Range Rover AC repair' },
  { title: 'Warning lights or electrical concerns', description: 'Battery voltage, charging faults, wiring, sensors and module communication can create several warning messages. We use diagnostic data together with electrical tests.', path: 'electrical-repair', label: 'Range Rover electrical diagnostics' },
  { title: 'Brake vibration, warning or reduced confidence', description: 'Brake checks cover pads, discs, sensors, calipers, fluid, hydraulic operation and the source of vibration before the parts route is agreed.', path: 'brake-repair', label: 'Range Rover brake repair' },
];

const DEFENDER_COMMON_ISSUES = [
  { title: 'Suspension Fault or vehicle sitting unevenly', description: 'Defender air-suspension symptoms can involve an air spring, compressor, valve block, air leak, height sensor or electrical issue. Diagnosis comes before parts replacement.', path: 'suspension-repair', label: 'Defender suspension repair' },
  { title: '4x4, Terrain Response or driveline warning', description: 'A four-wheel-drive warning needs diagnostic data, transfer-case and differential checks, wheel-speed information and a physical inspection before a repair plan is made.', path: 'mechanical-repair', label: 'Defender 4x4 diagnostics' },
  { title: 'Cooling, AC or engine warning', description: 'Heat places high demand on cooling and climate systems. We inspect the reported warning or symptom, data and the physical system instead of treating the code alone as the cause.', path: 'engine-diagnostics', label: 'Defender diagnostics' },
  { title: 'Battery, camera, sensor or electrical fault', description: 'Modern Defender systems rely on stable voltage, communication networks and correctly calibrated cameras and sensors. Testing establishes the affected system before repair.', path: 'electrical-repair', label: 'Defender electrical repair' },
  { title: 'Brake wear, vibration or warning light', description: 'Inspection covers pads, discs, sensors, calipers, brake fluid and the cause of vibration, including the demands of towing, off-road driving and Dubai traffic.', path: 'brake-repair', label: 'Defender brake repair' },
  { title: 'Steering, tyre or underbody concern', description: 'After kerb impacts or off-road use, steering, tyre condition, wheel alignment and underbody components deserve a documented inspection before further work is planned.', path: 'steering-repair', label: 'Defender steering repair' },
];

const RANGE_ROVER_MODEL_GROUPS = [
  { title: 'Range Rover', models: 'Range Rover, Autobiography and SV', description: 'Flagship Range Rover service, diagnostics, air suspension, cooling, brakes, electrical systems and powertrain work, confirmed against the vehicle’s exact specification.' },
  { title: 'Range Rover Sport', models: 'Range Rover Sport, SV and SVR', description: 'Maintenance and diagnosis for performance-oriented SUV systems, including brakes, cooling, driveline, ZF transmission and electronic air suspension.' },
  { title: 'Range Rover Velar', models: 'Velar petrol, diesel and PHEV variants', description: 'Model-aware servicing for engine, electrical, climate, steering, suspension and warning-light concerns, with the correct diagnostic functions used where applicable.' },
  { title: 'Range Rover Evoque', models: 'Evoque petrol, diesel and PHEV variants', description: 'Routine service, cooling, brakes, AC, electrical and drivetrain diagnosis for urban and UAE-driven Evoque models.' },
];

const DEFENDER_MODEL_GROUPS = [
  { title: 'Defender 90', models: 'Three-door Defender 90', description: 'Service, diagnostics, brakes, suspension, steering and four-wheel-drive checks tailored to the compact Defender platform.' },
  { title: 'Defender 110', models: 'Five-door Defender 110', description: 'Maintenance and repair for daily-driven, family and expedition Defender 110 vehicles, including cooling, driveline and electrical systems.' },
  { title: 'Defender 130', models: 'Extended Defender 130', description: 'Inspection and maintenance for the longer Defender platform, including braking, suspension, cooling and load-related drivetrain requirements.' },
  { title: 'Defender V8 & OCTA', models: 'Defender V8 and Defender OCTA', description: 'Model-aware diagnostic, mechanical, brake, suspension and cooling support for high-output Defender platforms.' },
];

const getBrandSeoCopy = (brand: { name: string; specialization: string; whyChoose: { title: string }[] }) => {
  const focusAreas = brand.whyChoose.map((w) => w.title).slice(0, 4);
  return {
    intro: `Digi-Tec Performance Center is an independent European and luxury car workshop in Al Quoz, Dubai, established in 2002. This page explains the inspection, maintenance and repair topics owners can discuss for a ${brand.name}; the team confirms the exact model and requested work before booking.`,
    dubai: `Dubai heat, traffic and dust can add load to cooling, battery, brake, tyre and air-conditioning systems. A ${brand.name} inspection can account for those conditions, while the correct maintenance plan still depends on the exact model, recorded history, mileage and how the vehicle is used.`,
    expertise: `Common ${brand.name} enquiries include ${focusAreas.join(', ')}. The available inspection and repair scope depends on the vehicle and concern, so diagnostic findings are reviewed before parts or additional work are recommended.`,
    parts: `Each estimate should identify the proposed parts and fluids before approval. Depending on the repair, availability and owner preference, this may include genuine ${brand.name} parts, established OE-supplier components or another suitable customer-approved option.`,
    cta: `To discuss ${brand.specialization.toLowerCase()} or another ${brand.name} request, call +971 4 340 2223, send a WhatsApp enquiry or use the booking form. Include the model, year, mileage and concern so the team can confirm the appropriate next step and appointment availability.`,
  };
};

const SERVICES = [
  {
    title: 'Vehicle Maintenance',
    description:
      'Scheduled servicing, fluid changes, brake work and preventive inspections based on the vehicle and approved scope.',
  },
  {
    title: 'Mechanical Repairs',
    description:
      'Inspection and repair planning for engine, transmission, suspension and drivetrain concerns.',
  },
  {
    title: 'Auto Body & Painting',
    description:
      'Collision assessment, panel work and refinishing options based on the vehicle inspection.',
  },
  {
    title: 'Detailing',
    description:
      'Paint correction, ceramic coating, PPF, and full interior detailing tailored to luxury finishes.',
  },
  {
    title: 'Electrical & Diagnostics',
    description:
      'Fault-code review, physical testing and electrical repair planning for modern vehicle systems.',
  },
];

const MERCEDES_SERVICE_PATHS: Record<string, string> = {
  'oil-change': '/services/mercedes-oil-change-dubai',
  'brake-repair': '/services/mercedes-brake-repair-dubai',
  'transmission-repair': '/services/mercedes-transmission-repair-dubai',
  'ac-repair': '/services/mercedes-ac-repair-dubai',
  'suspension-repair': '/services/mercedes-suspension-repair-dubai',
  'engine-diagnostics': '/services/mercedes-diagnostics-dubai',
  'mechanical-repair': '/services/mercedes-mechanical-repair-dubai',
  'steering-repair': '/services/mercedes-steering-repair-dubai',
  'battery-replacement': '/services/mercedes-battery-replacement-dubai',
  'electrical-repair': '/services/mercedes-electrical-repair-dubai',
  'exhaust-repair': '/services/mercedes-exhaust-repair-dubai',
  'fuel-system-repair': '/services/mercedes-fuel-system-repair-dubai',
  'body-repair': '/services/mercedes-body-repair-dubai',
  'tire-repair': '/services/mercedes-tire-repair-dubai',
};

const MERCEDES_SERVICE_LABELS: Record<string, string> = {
  'oil-change': 'Mercedes-Benz Oil Change and Scheduled Maintenance in Dubai',
  'brake-repair': 'Mercedes-Benz Brake Repair in Dubai',
  'transmission-repair': 'Mercedes-Benz Transmission Repair in Dubai',
  'ac-repair': 'Mercedes-Benz AC Repair in Dubai',
  'suspension-repair': 'Mercedes-Benz Suspension Repair in Dubai',
  'engine-diagnostics': 'Mercedes-Benz XENTRY Diagnostics in Dubai',
  'mechanical-repair': 'Mercedes-Benz Mechanical Repair in Dubai',
  'steering-repair': 'Mercedes-Benz Steering Repair in Dubai',
  'battery-replacement': 'Mercedes-Benz Battery Replacement in Dubai',
  'electrical-repair': 'Mercedes-Benz Electrical Repair in Dubai',
  'exhaust-repair': 'Mercedes-Benz Exhaust Repair in Dubai',
  'fuel-system-repair': 'Mercedes-Benz Fuel System Repair in Dubai',
  'body-repair': 'Mercedes-Benz Body Repair in Dubai',
  'tire-repair': 'Mercedes-Benz Tyre Repair in Dubai',
};

const MERCEDES_CORE_SERVICES = [
  {
    title: 'Mercedes Maintenance & Oil Service',
    description: 'Service A, Service B, oil and filter changes, fluid checks and maintenance resets using the specification required by the vehicle.',
    path: MERCEDES_SERVICE_PATHS['oil-change'],
  },
  {
    title: 'XENTRY Diagnostics & Warning Lights',
    description: 'Fault-code analysis, live data and guided testing for engine, transmission, suspension, safety, comfort and electrical systems.',
    path: MERCEDES_SERVICE_PATHS['engine-diagnostics'],
  },
  {
    title: '7G-Tronic & 9G-Tronic Transmission Repair',
    description: 'Diagnosis for delayed engagement, rough shifting, slipping, leaks and transmission warnings before parts are recommended.',
    path: MERCEDES_SERVICE_PATHS['transmission-repair'],
  },
  {
    title: 'AIRMATIC, ABC & Suspension Repair',
    description: 'Testing for a low corner, slow lifting, compressor noise, harsh ride or a Mercedes suspension warning message.',
    path: MERCEDES_SERVICE_PATHS['suspension-repair'],
  },
  {
    title: 'Mercedes AC, Cooling & Mechanical Repair',
    description: 'Inspection of weak AC, overheating, coolant loss, oil leaks, unusual engine noise and reduced performance in Dubai conditions.',
    path: MERCEDES_SERVICE_PATHS['mechanical-repair'],
  },
  {
    title: 'AMG & G-Class Specialist Support',
    description: 'Model-aware diagnostics, brakes, driveline, suspension and engine health checks for C63, E63, G63, S63, AMG GT and other AMG models.',
    path: MERCEDES_SERVICE_PATHS['mechanical-repair'],
  },
];

const MERCEDES_COMMON_ISSUES = [
  {
    title: 'Suspension Fault or one side sitting low',
    description: 'AIRMATIC, ABC and E-ACTIVE systems can involve an air spring, compressor, valve block, pressure leak, sensor or electrical fault. S-Class, GLE and GLS vehicles need system testing before a component is replaced.',
    path: MERCEDES_SERVICE_PATHS['suspension-repair'],
    label: 'Mercedes suspension diagnostics',
  },
  {
    title: 'Jerking, slipping or delayed gear engagement',
    description: '7G-Tronic, 9G-Tronic and AMG SpeedShift symptoms may relate to fluid condition, adaptations, sensors, a conductor plate, mechatronics or internal wear. A scan and road test help define the repair scope.',
    path: MERCEDES_SERVICE_PATHS['transmission-repair'],
    label: 'Mercedes transmission repair',
  },
  {
    title: 'Engine light, rough idle or loss of power',
    description: 'The cause can sit in ignition, air metering, boost, fuel delivery, emissions or cooling—not just the component named by a stored code. XENTRY data and physical testing are used together.',
    path: MERCEDES_SERVICE_PATHS['engine-diagnostics'],
    label: 'Mercedes XENTRY diagnostics',
  },
  {
    title: 'Weak AC or rising coolant temperature',
    description: 'High ambient temperatures expose weak compressors, refrigerant leaks, restricted condensers, cooling fans, thermostats and coolant leaks. Early diagnosis matters before Dubai summer load increases.',
    path: MERCEDES_SERVICE_PATHS['ac-repair'],
    label: 'Mercedes AC repair',
  },
  {
    title: 'Battery warning or intermittent electrical faults',
    description: 'A weak main or auxiliary battery, charging fault, voltage drop, wiring concern or control-module communication issue can create several warning messages at once. Any required battery registration or coding is confirmed for compatibility and quoted where supported.',
    path: MERCEDES_SERVICE_PATHS['electrical-repair'],
    label: 'Mercedes electrical repair',
  },
  {
    title: 'Brake warning, vibration or reduced confidence',
    description: 'Mercedes and AMG brake checks cover pad and disc condition, sensors, calipers, fluid, hydraulic operation and the cause of vibration. The correct parts route depends on the fitted brake package.',
    path: MERCEDES_SERVICE_PATHS['brake-repair'],
    label: 'Mercedes brake repair',
  },
];

const MERCEDES_MODEL_GROUPS = [
  {
    title: 'C-Class, CLA & compact models',
    models: 'A-Class, B-Class, CLA, C-Class and CLE',
    description: 'Scheduled service, warning-light diagnosis, brakes, AC, cooling, steering and suspension support for compact Mercedes saloons, hatchbacks, estates and coupes.',
    links: [
      { label: 'Oil service', path: MERCEDES_SERVICE_PATHS['oil-change'] },
      { label: 'Diagnostics', path: MERCEDES_SERVICE_PATHS['engine-diagnostics'] },
      { label: 'Brake repair', path: MERCEDES_SERVICE_PATHS['brake-repair'] },
    ],
  },
  {
    title: 'E-Class, CLS & executive models',
    models: 'E-Class, CLS and earlier CLK platforms',
    description: 'Diagnosis and repair for 7G-Tronic and 9G-Tronic behaviour, electrical warnings, selected AIRMATIC systems, cooling, oil leaks, brakes and climate-control concerns.',
    links: [
      { label: 'Transmission repair', path: MERCEDES_SERVICE_PATHS['transmission-repair'] },
      { label: 'Electrical repair', path: MERCEDES_SERVICE_PATHS['electrical-repair'] },
      { label: 'AC repair', path: MERCEDES_SERVICE_PATHS['ac-repair'] },
    ],
  },
  {
    title: 'S-Class & flagship Mercedes',
    models: 'S-Class W221, W222 and W223, plus earlier flagship platforms',
    description: 'Specialist attention to AIRMATIC, ABC and E-ACTIVE ride systems, comfort electronics, V8 and V12 mechanical systems, cooling and advanced module diagnostics.',
    links: [
      { label: 'Suspension repair', path: MERCEDES_SERVICE_PATHS['suspension-repair'] },
      { label: 'Mechanical repair', path: MERCEDES_SERVICE_PATHS['mechanical-repair'] },
      { label: 'Electrical repair', path: MERCEDES_SERVICE_PATHS['electrical-repair'] },
    ],
  },
  {
    title: 'GLC, GLE, GLS & Mercedes SUVs',
    models: 'GLA, GLB, GLC, GLE, GLS, ML, GL and GLK',
    description: 'Dubai-focused maintenance and repair for SUV cooling, AC, 4MATIC driveline, transmission, brakes and air suspension, with model-specific inspection before quoting.',
    links: [
      { label: 'Suspension repair', path: MERCEDES_SERVICE_PATHS['suspension-repair'] },
      { label: 'Transmission repair', path: MERCEDES_SERVICE_PATHS['transmission-repair'] },
      { label: 'Mechanical repair', path: MERCEDES_SERVICE_PATHS['mechanical-repair'] },
    ],
  },
  {
    title: 'G-Class, G-Wagon & Mercedes-AMG',
    models: 'G500, G550, G63, C43, C63, E53, E63, S63, SL and AMG GT',
    description: 'AMG-aware engine, transmission, brake, suspension and diagnostic work for high-output Mercedes platforms, plus planned support for G-Class body and performance projects.',
    links: [
      { label: 'AMG mechanical repair', path: MERCEDES_SERVICE_PATHS['mechanical-repair'] },
      { label: 'AMG diagnostics', path: MERCEDES_SERVICE_PATHS['engine-diagnostics'] },
      { label: 'G63 case study', path: '/blog/g63-to-brabus-g800-conversion-dubai' },
    ],
  },
  {
    title: 'EQ, V-Class & specialist Mercedes platforms',
    models: 'EQB, EQE, EQS, EQE SUV, EQS SUV, V-Class and Vito',
    description: 'Diagnostic inspection, low-voltage electrical support, brakes, tyres, suspension and climate-system checks, with high-voltage work confirmed against the exact model and requested scope before booking.',
    links: [
      { label: 'Electrical repair', path: MERCEDES_SERVICE_PATHS['electrical-repair'] },
      { label: 'Diagnostics', path: MERCEDES_SERVICE_PATHS['engine-diagnostics'] },
      { label: 'Tyre service', path: MERCEDES_SERVICE_PATHS['tire-repair'] },
    ],
  },
];

const MERCEDES_SCHEMA_OFFERS = Object.entries(MERCEDES_SERVICE_PATHS).map(([serviceSlug, path]) => ({
  name: MERCEDES_SERVICE_LABELS[serviceSlug],
  path,
}));

// Models help search engines and AI systems understand the vehicles covered by
// each brand hub. Detailed profiles provide the fallback for newer brands.
const BRAND_MODELS: Record<string, string[]> = {
  'mercedes-benz-service-dubai': ['A-Class','B-Class','CLA','C-Class','CLE','E-Class','CLS','S-Class','GLA','GLB','GLC','GLE','GLS','G-Class','G63','AMG GT','SL','EQB','EQE','EQS','V-Class'],
  'maybach-service-dubai': ['Maybach S-Class','Maybach GLS','Maybach S680','Maybach S580'],
  'porsche-service-dubai': ['911','718 Cayman','718 Boxster','Panamera','Macan','Cayenne','Taycan'],
  'audi-service-dubai': ['A3','A4','A5','A6','A7','A8','Q3','Q5','Q7','Q8','RS Range','R8','e-tron'],
  'bmw-service-dubai': ['1 Series','3 Series','4 Series','5 Series','7 Series','8 Series','X1','X3','X5','X6','X7','M Range','i Range'],
  'lamborghini-service-dubai': ['Huracán','Urus','Revuelto','Aventador'],
  'bentley-service-dubai': ['Continental GT','Flying Spur','Bentayga'],
  'mclaren-service-dubai': ['720S','765LT','Artura','GT','750S'],
  'ferrari-service-dubai': ['Roma','Portofino','296','SF90','812','Purosangue'],
  'bugatti-service-dubai': ['Chiron','Divo','Mistral'],
  'land-rover-service-dubai': ['Range Rover','Range Rover Sport','Range Rover Velar','Range Rover Evoque','Defender','Discovery'],
  'range-rover-service-dubai': ['Range Rover','Range Rover Sport','Range Rover Velar','Range Rover Evoque'],
  'defender-service-dubai': ['Defender 90','Defender 110','Defender 130','Defender V8','Defender OCTA'],
  'rolls-royce-service-dubai': ['Phantom','Ghost','Cullinan','Spectre','Wraith','Dawn'],
  'aston-martin-service-dubai': ['DB12','Vantage','DBX','DBS'],
};

const getServiceProfileSlug = (brandSlug: string) => brandSlug;

const BrandPage = () => {
  const { isArabic, localizedPath } = useLocale();
  const { slug } = useParams<{ slug: string }>();
  const sourceBrand = slug ? getBrandBySlug(slug) : undefined;
  const brand = sourceBrand && isArabic ? localizeBrandToArabic(sourceBrand) : sourceBrand;
  const serviceProfileSlug = brand ? getServiceProfileSlug(brand.slug) : '';

  const brandJsonLd = React.useMemo(() => {
    if (!brand) return undefined;
    const url = `https://digitecme.com${isArabic ? '/ar' : ''}/brands/${brand.slug}`;
    const isMercedes = brand.slug === 'mercedes-benz-service-dubai';
    const isRangeRoverHub = brand.slug === 'range-rover-service-dubai';
    const isDefenderHub = brand.slug === 'defender-service-dubai';
    const entityName = isArabic
      ? `صيانة وإصلاح ${brand.name} في دبي`
      : `${brand.name} Service & Repair in Dubai`;
    const schemaDescription = isArabic
      ? `خدمة وفحص سيارات ${brand.name} لدى ورشة ديجي-تك في القوز، دبي. تواصل مع الفريق لتأكيد نطاق الخدمة المناسب لطراز سيارتك.`
      : `${brand.name} vehicle inspection, maintenance and repair at Digi-Tec Performance Center in Al Quoz, Dubai. Contact the team to confirm the appropriate service scope for your model.`;
    const breadcrumb = buildBreadcrumb(url, [
      { name: isArabic ? 'الرئيسية' : 'Home', url: `https://digitecme.com${isArabic ? '/ar' : '/'}` },
      { name: isArabic ? 'العلامات' : 'Brands', url: `https://digitecme.com${isArabic ? '/ar' : ''}/brands` },
      { name: brand.name, url },
    ]);
    const webPage = buildWebPage({
      url,
      name: entityName,
      description: schemaDescription,
      breadcrumbId: `${url}#breadcrumb`,
      primaryImage: isMercedes ? mercedesWorkshop : isRangeRoverHub ? rangeRoverWorkshop : isDefenderHub ? defenderWorkshop : brand.logo || undefined,
      mainEntityId: `${url}#service`,
    });
    const brandEntity = buildBrand({
      name: brand.name,
      logo: brand.logo || undefined,
    });
    const schemaOffers = isMercedes && !isArabic
      ? MERCEDES_SCHEMA_OFFERS.map((offer) => offer.name)
      : (isArabic ? arBrandServices.map((service) => service.title) : BRAND_OFFER_CATALOG)
        .map((offer) => `${brand.name} ${offer}`);
    const svc = buildService({
      url,
      name: entityName,
      serviceType: isArabic ? `خدمة سيارات ${brand.name}` : `${brand.name} vehicle service`,
      description: schemaDescription,
      image: isMercedes ? mercedesWorkshop : isRangeRoverHub ? rangeRoverWorkshop : isDefenderHub ? defenderWorkshop : brand.logo || undefined,
      brand: brand.name,
      offers: schemaOffers,
      areaServed: [isArabic ? 'دبي' : 'Dubai'],
    });
    const faq = buildFAQ(
      url,
      brand.faqs.map((f) => ({ question: f.q, answer: f.a })),
    );
    return pageGraph([webPage, breadcrumb, brandEntity, svc, ...(faq ? [faq] : [])]);
  }, [brand, isArabic]);

  const isMercedesServiceHub = brand?.slug === 'mercedes-benz-service-dubai';
  const isRangeRoverServiceHub = brand?.slug === 'range-rover-service-dubai';
  const isDefenderServiceHub = brand?.slug === 'defender-service-dubai';
  const specialistHubTitle = isMercedesServiceHub ? MERCEDES_META_TITLE : isRangeRoverServiceHub ? RANGE_ROVER_META_TITLE : isDefenderServiceHub ? DEFENDER_META_TITLE : undefined;
  const specialistHubDescription = isMercedesServiceHub ? MERCEDES_META_DESCRIPTION : isRangeRoverServiceHub ? RANGE_ROVER_META_DESCRIPTION : isDefenderServiceHub ? DEFENDER_META_DESCRIPTION : undefined;

  useSeo({
    title: brand
      ? isArabic ? `إصلاح وصيانة ${brand.name} في دبي | مركز ديجي-تك` : specialistHubTitle ?? `${brand.name} Repair Dubai | Digi-Tec`
      : 'Brand Service in Dubai | Digi-Tec Performance Centre',
    description: brand
      ? isArabic ? `إصلاح وصيانة ${brand.name} في دبي: تشخيص وصيانة وفرامل وناقل حركة وتعليق وتكييف مع قطع بالمواصفات المناسبة لدى مركز ديجي-تك.` : specialistHubDescription ?? `Specialist ${brand.name} repair and service in Dubai: diagnostics, maintenance, brakes, transmission, suspension and AC at Digi-Tec, Al Quoz.`
      : 'Expert luxury car maintenance, diagnostics, and performance tuning in Dubai at Digi-Tec Performance Centre.',
    canonical: brand ? `https://digitecme.com${isArabic ? '/ar' : ''}/brands/${brand.slug}` : `https://digitecme.com${isArabic ? '/ar' : '/'}`,
    ogImage: isMercedesServiceHub ? `https://digitecme.com${mercedesWorkshop}` : isRangeRoverServiceHub ? `https://digitecme.com${rangeRoverWorkshop}` : isDefenderServiceHub ? `https://digitecme.com${defenderWorkshop}` : undefined,
    ogTitle: specialistHubTitle,
    ogDescription: specialistHubDescription,
    noindex: !brand,
    jsonLd: brandJsonLd,
  });

  if (!brand) {
    return <Navigate to={localizedPath('/')} replace />;
  }

  const whatsappHref = `https://wa.me/97143402223?text=${encodeURIComponent(
    isArabic ? `مرحباً، أود الاستفسار عن خدمة ${brand.name} لدى مركز ديجي-تك بيرفورمانس.` : `Hi, I'd like to enquire about ${brand.name} service at Digi-Tec Performance Centre.`,
  )}`;

  const otherBrands = brands.filter((b) => b.slug !== brand.slug).slice(0, 12);
  const relatedServices = brand.relatedServices
    .map((s) => getServiceBySlug(s))
    .filter((s): s is NonNullable<ReturnType<typeof getServiceBySlug>> => Boolean(s));
  const seoCopy = isArabic ? {
    intro: `ديجي-تك مركز مستقل ومتخصص في خدمة ${brand.name} في دبي. نجمع بين التشخيص المتقدم والقطع المناسبة والفنيين ذوي الخبرة لتقديم صيانة وإصلاح واضحين من ورشتنا في القوز.`,
    dubai: `تضع حرارة الإمارات ضغطاً إضافياً على التبريد والزيوت والبطارية والمطاط والتكييف. لذلك نفحص سيارات ${brand.name} مع مراعاة ظروف دبي وطريقة الاستخدام الفعلية.`,
    expertise: `تشمل خبرتنا بسيارات ${brand.name} الصيانة والتشخيص والمحرك وناقل الحركة والتعليق والفرامل والكهرباء والتكييف، مع المعايرة والاختبار بعد الإصلاح.`,
    parts: `يحدد عرض السعر القطع والسوائل المقترحة قبل الموافقة. قد تشمل الخيارات قطعاً أصلية أو من مورّد مطابق أو بديلاً مناسباً يوافق عليه المالك بحسب الإصلاح والتوفر.`,
    cta: `لحجز خدمة ${brand.name} في دبي، اتصل على +971 4 340 2223 أو أرسل رسالة واتساب أو استخدم نموذج الحجز في هذه الصفحة.`,
  } : isMercedesServiceHub ? MERCEDES_SEO_COPY : isRangeRoverServiceHub ? RANGE_ROVER_SEO_COPY : isDefenderServiceHub ? DEFENDER_SEO_COPY : getBrandSeoCopy(brand);
  const displayedServices = isArabic ? arBrandServices : SERVICES;
  const brandServices = getServicesForBrand(serviceProfileSlug);
  const profile = BRAND_PROFILES[serviceProfileSlug];
  const models = BRAND_MODELS[brand.slug] ?? profile?.models ?? [];
  const getServicePath = (serviceSlug: string) =>
    brand.slug === 'mercedes-benz-service-dubai'
      ? MERCEDES_SERVICE_PATHS[serviceSlug] ?? `/brands/${serviceProfileSlug}/${serviceSlug}`
      : `/brands/${serviceProfileSlug}/${serviceSlug}`;
  const isFerrari = brand.slug === 'ferrari-service-dubai';
  const isRangeRover = brand.slug === 'range-rover-service-dubai';
  const isDefender = brand.slug === 'defender-service-dubai' || brand.name === 'Defender';
  const isNissan = brand.slug === 'nissan-service-dubai';
  const isLamborghini = brand.slug === 'lamborghini-service-dubai';
  const isPorsche = brand.slug === 'porsche-service-dubai';
  const isMaybach = brand.slug === 'maybach-service-dubai';
  const heroImage = isMercedesServiceHub
    ? mercedesWorkshop
    : isMaybach
      ? maybachWorkshop
      : isPorsche
        ? porscheGt3rsWorkshop
        : isLamborghini
          ? lamborghiniWorkshop
          : isNissan
            ? nissanWorkshop
            : isDefender
              ? defenderWorkshop
              : isRangeRover
                ? rangeRoverWorkshop
                : isFerrari
                  ? ferrariEngineWorkshop
                  : undefined;

  return (
    <div className="min-h-screen bg-black text-off-white">
      <Header />

      {isMercedesServiceHub && (
        <nav aria-label={isArabic ? 'مسار التنقل' : 'Breadcrumb'} className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 text-xs sm:text-sm text-gray-400">
          <ol className="flex flex-wrap items-center gap-2">
            <li><Link to="/" className="hover:text-burnt-orange">{isArabic ? 'الرئيسية' : 'Home'}</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/brands" className="hover:text-burnt-orange">{isArabic ? 'العلامات' : 'Brands'}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-off-white font-semibold">{isArabic ? 'إصلاح وصيانة مرسيدس-بنز في دبي' : 'Mercedes-Benz Repair & Service Dubai'}</li>
          </ol>
        </nav>
      )}

      {/* Hero */}
      <section className="relative bg-black overflow-hidden">
        {heroImage ? (
          <>
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover opacity-60 ${isMercedesServiceHub ? 'object-[center_52%]' : 'object-center'}`}
            />
            <div className={`absolute inset-0 ${isMercedesServiceHub ? 'bg-black/75' : 'bg-black/80'}`} />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-burnt-orange/10 via-transparent to-transparent" />
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-20 lg:py-24 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div>
              <div className="flex items-center gap-4 mb-5 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 bg-white/90 rounded-full shadow-xl flex items-center justify-center overflow-hidden">
                  {brand.logo ? (
                    <img src={brand.logo} alt={`${brand.name} logo`} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-2xl font-black text-burnt-orange">{brand.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-burnt-orange font-bold uppercase tracking-widest text-xs sm:text-sm">
                  {brand.specialization}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 leading-tight">
                {brand.name} <span className="text-burnt-orange">{isArabic ? 'للإصلاح والصيانة في دبي' : isMercedesServiceHub ? 'Repair & Service Dubai' : 'Repair & Service Dubai'}</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                {brand.intro}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? 'راسلنا عبر واتساب' : 'WhatsApp Us'}
                </a>
                <a href="tel:+97143402223" className="btn-secondary">
                  <Phone className="w-5 h-5" />
                  {isArabic ? 'اتصل على +971 4 340 2223' : 'Call +971 4 340 2223'}
                </a>
                {(isMercedesServiceHub || isRangeRoverServiceHub || isDefenderServiceHub) && (
                  <a
                    href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Warehouse+No.11-15+Dubai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <MapPin className="w-5 h-5" />
                    {isArabic ? 'الاتجاهات إلى القوز' : 'Directions to Al Quoz'}
                  </a>
                )}
              </div>
              <CtaAssurance className="mt-4" align="start" text={isArabic ? 'تواصل معنا لمناقشة السيارة وطلب موعد' : undefined} />
            </div>
          </div>
        </div>
      </section>

      {isRangeRoverServiceHub && !isArabic && (
        <section className="py-12 sm:py-16 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-6 items-stretch">
              <div className="card-premium rounded-2xl p-6 sm:p-8">
                <span className="inline-flex items-center gap-2 text-burnt-orange text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-4 h-4" /> Al Quoz Industrial Area 3
                </span>
                <h2 className="text-2xl sm:text-4xl font-black mt-3">Range Rover Workshop Near You in Dubai</h2>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
                  Searching for a Range Rover workshop near you? Digi-Tec is located in Al Quoz Industrial Area 3, close to Sheikh Zayed Road. Our workshop serves Range Rover owners from Al Quoz, Downtown Dubai, Business Bay, Dubai Hills, Jumeirah, Umm Suqeim, Palm Jumeirah, Dubai Marina, Arabian Ranches and surrounding communities.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed mt-4">
                  Call before travelling so we can confirm the right inspection slot for your Range Rover, Sport, Velar or Evoque and prepare the appropriate JLR diagnostic equipment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <a href="https://maps.google.com/?q=Al+Quoz+Industrial+Area+3+Warehouse+No.11-15+Dubai" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <MapPin className="w-5 h-5" /> Get Directions
                  </a>
                  <a href="tel:+97143402223" className="btn-secondary"><Phone className="w-5 h-5" /> Call the Workshop</a>
                </div>
              </div>
              <div className="card-premium rounded-2xl p-6 sm:p-8 flex flex-col justify-center">
                <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest">Workshop selection guide</span>
                <h2 className="text-xl sm:text-2xl font-black mt-3">Why Choose a Range Rover Specialist?</h2>
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  See the diagnostic tools, technical capabilities and workshop criteria owners should compare before booking an independent Range Rover specialist in Dubai.
                </p>
                <Link to="/best-range-rover-workshop-dubai" className="inline-flex items-center gap-2 text-burnt-orange font-semibold mt-5 hover:text-off-white transition-colors">
                  Read the workshop selection guide <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {isArabic ? <>خدمات <span className="text-burnt-orange">{brand.name}</span></> : isMercedesServiceHub ? <>Mercedes <span className="text-burnt-orange">Repair & Maintenance</span> in Dubai</> : <>Our <span className="text-burnt-orange">{brand.name}</span> Services</>}
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm sm:text-lg">
              {isArabic ? `عناية متكاملة بسيارات ${brand.name}، من الصيانة الدورية إلى الإصلاحات المتقدمة.` : isMercedesServiceHub ? 'Start with the symptom or service your Mercedes needs. Each area below links to a focused page with the relevant warning signs, inspection process and model-specific technical detail.' : `Comprehensive care for every ${brand.name}, from routine maintenance to advanced performance work.`}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {isMercedesServiceHub && !isArabic
              ? MERCEDES_CORE_SERVICES.map((s) => (
                  <Link
                    key={s.title}
                    to={s.path}
                    className="card-premium group rounded-2xl p-6 sm:p-7 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-burnt-orange transition-colors">{s.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4">
                      Explore service <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))
              : displayedServices.map((s) => (
                  <div
                    key={s.title}
                    className="card-premium rounded-2xl p-6 sm:p-7 transition-all duration-300"
                  >
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{s.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{s.description}</p>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* Brand-specific workshop capability */}
      {profile && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                {isArabic ? <>كيف نخدم <span className="text-burnt-orange">{brand.name}</span> في دبي</> : <>How We Service <span className="text-burnt-orange">{brand.name}</span> in Dubai</>}
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                {isArabic ? `نخصص خطوات الورشة لأنظمة التشخيص ومجموعة الحركة ونقاط التآكل المرتبطة بالمناخ في سيارة ${brand.name}.` : `The workshop process is tailored to the diagnostic systems, drivetrain, and climate-related wear points of your ${brand.name}.`}
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? 'منصة التشخيص' : 'Diagnostic platform'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{isArabic ? `يتم تأكيد توافق الفحص وقراءة البيانات وأي برمجة أو إعادة ضبط مطلوبة لسيارة ${brand.name} المحددة قبل إدراجها في عرض السعر.` : `${profile.diagnosticTool}. Compatible fault tracing, live data, coding, programming and service-reset functions are confirmed for the exact vehicle and required module before quotation.`}</p>
              </div>
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? 'الأنظمة الأساسية' : 'Core systems'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{isArabic ? `المحرك وناقل الحركة ونظام التعليق والأنظمة الإلكترونية الخاصة بطرازات ${brand.name}.` : <>{profile.transmissionName} • {profile.suspensionType} • {profile.engineFamily}</>}</p>
              </div>
              <div className="card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? 'عناية تناسب دبي' : 'Dubai-focused care'}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{isArabic ? 'نفحص التبريد والبطارية والزيوت والإطارات والفرامل مع مراعاة حرارة دبي والازدحام وطريقة الاستخدام.' : profile.climateNote}</p>
              </div>
            </div>
            {isPorsche && (
              <figure className="max-w-xl mx-auto mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex">
                <img
                  src={porscheWorkshop}
                  alt="Porsche receiving specialist service at Digi-Tec Performance Centre in Dubai"
                  className="w-28 sm:w-36 h-36 sm:h-40 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4 sm:p-5 flex flex-col justify-center">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-1">Porsche workshop</span>
                  <p className="text-gray-300 text-sm leading-relaxed">Specialist care for Porsche performance, maintenance and repair in our Al Quoz workshop.</p>
                </figcaption>
              </figure>
            )}
            {isLamborghini && (
              <figure className="max-w-xl mx-auto mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-white/10 bg-black/40 flex">
                <img
                  src={lamborghiniUrusWorkshop}
                  alt="Lamborghini Urus receiving specialist service on a lift at Digi-Tec Performance Centre in Dubai"
                  className="w-28 sm:w-36 h-36 sm:h-40 object-cover"
                  loading="lazy"
                />
                <figcaption className="p-4 sm:p-5 flex flex-col justify-center">
                  <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest mb-1">Lamborghini workshop</span>
                  <p className="text-gray-300 text-sm leading-relaxed">Specialist Urus maintenance, diagnostics and repair in our Al Quoz workshop.</p>
                </figcaption>
              </figure>
            )}
            {isMercedesServiceHub && !isArabic && (
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <figure className="card-premium rounded-2xl overflow-hidden">
                  <img
                    src={mercedesAmgEngine}
                    alt="Mercedes-AMG engine inspected at Digi-Tec Performance Centre in Al Quoz, Dubai"
                    className="w-full aspect-[16/9] object-cover"
                    loading="lazy"
                    width="1086"
                    height="1448"
                  />
                  <figcaption className="p-5">
                    <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest">Inside our Mercedes workshop</span>
                    <h3 className="text-lg font-bold text-off-white mt-2">Model-aware mechanical inspection</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mt-2">A real Mercedes-AMG engine in the Digi-Tec workshop. Diagnostics, fluid specifications and repair planning are matched to the fitted powertrain—not just the badge.</p>
                  </figcaption>
                </figure>
                <Link to="/blog/g63-to-brabus-g800-conversion-dubai" className="card-premium group rounded-2xl overflow-hidden">
                  <img
                    src={g63BrabusFinishedFront}
                    alt="Finished Mercedes-AMG G63 G 800-style conversion at Digi-Tec Dubai"
                    className="w-full aspect-[16/9] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width="1344"
                    height="1792"
                  />
                  <div className="p-5">
                    <span className="text-burnt-orange text-xs font-bold uppercase tracking-widest">Recent Mercedes case study</span>
                    <h3 className="text-lg font-bold text-off-white mt-2 group-hover:text-burnt-orange transition-colors">Mercedes-AMG G63 to G 800-style conversion</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mt-2">See the actual strip-down, body preparation, fitment and completed G-Class project from the Digi-Tec workshop.</p>
                    <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4">View the G63 project <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </Link>
              </div>
            )}
            {models.length > 0 && (!isMercedesServiceHub || isArabic) && (
              <div className="mt-6 sm:mt-8 card-premium rounded-2xl p-5 sm:p-6">
                <h3 className="text-lg font-bold text-off-white mb-3">{isArabic ? `طرازات ${brand.name} التي نخدمها` : `${brand.name} models we work with`}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{models.join(' • ')}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {isMercedesServiceHub && !isArabic && (
        <section className="py-12 sm:py-20 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                Common <span className="text-burnt-orange">Mercedes Problems</span> We Diagnose in Dubai
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                A warning message or symptom is a starting point, not a final diagnosis. These are common reasons Mercedes owners contact our Al Quoz workshop and the focused service page for each concern.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {MERCEDES_COMMON_ISSUES.map((issue) => (
                <Link key={issue.title} to={issue.path} className="card-premium group rounded-2xl p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-off-white group-hover:text-burnt-orange transition-colors">{issue.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">{issue.description}</p>
                  <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4">
                    {issue.label} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(isRangeRoverServiceHub || isDefenderServiceHub) && !isArabic && (
        <section className="py-12 sm:py-20 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                Common <span className="text-burnt-orange">{isRangeRoverServiceHub ? 'Range Rover' : 'Defender'} Problems</span> We Diagnose in Dubai
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                The warning message or symptom is a starting point, not a diagnosis. These are the concerns owners commonly bring to our Al Quoz workshop and the specialist service area for each one.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {(isRangeRoverServiceHub ? RANGE_ROVER_COMMON_ISSUES : DEFENDER_COMMON_ISSUES).map((issue) => (
                <Link key={issue.title} to={getServicePath(issue.path)} className="card-premium group rounded-2xl p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-off-white group-hover:text-burnt-orange transition-colors">{issue.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">{issue.description}</p>
                  <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold mt-4">
                    {issue.label} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {(isRangeRoverServiceHub || isDefenderServiceHub) && !isArabic && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                {isRangeRoverServiceHub ? 'Range Rover' : 'Defender'} Models We <span className="text-burnt-orange">Repair & Service</span> in Dubai
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                The exact procedure, fluid specification, diagnostic function and repair scope are confirmed from the model, year, VIN, fitted systems and reported concern.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {(isRangeRoverServiceHub ? RANGE_ROVER_MODEL_GROUPS : DEFENDER_MODEL_GROUPS).map((group) => (
                <article key={group.title} className="card-premium rounded-2xl p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-off-white">{group.title}</h3>
                  <p className="text-burnt-orange text-sm font-semibold mt-2">{group.models}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">{group.description}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4">
                    <Link to={getServicePath('engine-diagnostics')} className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors">Diagnostics <ArrowRight className="w-3.5 h-3.5" /></Link>
                    <Link to={getServicePath('suspension-repair')} className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors">Suspension repair <ArrowRight className="w-3.5 h-3.5" /></Link>
                    <Link to={getServicePath('mechanical-repair')} className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors">Mechanical repair <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </div>
                </article>
              ))}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mx-auto mt-8 text-center">
              {isRangeRoverServiceHub ? <>For Defender-specific repair and off-road systems, see our dedicated <Link to="/brands/defender-service-dubai" className="text-burnt-orange font-semibold hover:text-off-white">Defender service and repair page</Link>.</> : <>For Range Rover, Range Rover Sport, Velar and Evoque service, see our dedicated <Link to="/brands/range-rover-service-dubai" className="text-burnt-orange font-semibold hover:text-off-white">Range Rover service and repair page</Link>.</>}
            </p>
          </div>
        </section>
      )}

      {isMercedesServiceHub && !isArabic && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                Mercedes Models We <span className="text-burnt-orange">Repair & Service</span> in Dubai
              </h2>
              <p className="text-gray-400 max-w-3xl mx-auto text-sm sm:text-base">
                Digi-Tec supports current and earlier Mercedes-Benz platforms. The exact diagnostic procedure, parts specification and workshop scope are confirmed from the model, year, VIN and fitted systems.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {MERCEDES_MODEL_GROUPS.map((group) => (
                <article key={group.title} className="card-premium rounded-2xl p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-off-white">{group.title}</h3>
                  <p className="text-burnt-orange text-sm font-semibold mt-2">{group.models}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mt-3">{group.description}</p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-4" aria-label={`${group.title} related services`}>
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link to={link.path} className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold hover:text-off-white transition-colors">
                          {link.label} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-4xl mx-auto mt-8 text-center">
              Mercedes-Maybach owners can view our dedicated <Link to="/brands/maybach-service-dubai" className="text-burnt-orange font-semibold hover:text-off-white">Maybach repair and service page</Link>. For an unlisted Mercedes model or earlier chassis, send the VIN and concern by WhatsApp so coverage can be confirmed before the visit.
            </p>
          </div>
        </section>
      )}

      {/* Why Choose */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {isArabic ? <>لماذا يختار ملاك {brand.name} <span className="text-burnt-orange">D</span>IGI-TEC؟</> : isMercedesServiceHub ? <>Why Choose Digi-Tec as Your <span className="text-burnt-orange">Mercedes Workshop</span> in Dubai?</> : <>Why {brand.name} Owners Choose <span className="text-burnt-orange">D</span>igi-Tec</>}
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
              {isArabic ? `خبرة فنية فعلية بأنظمة ${brand.name} وخدمة مصممة للسيارة، لا حلول عامة.` : isMercedesServiceHub ? 'The right Mercedes specialist should be able to explain the diagnostic evidence, fitted systems, parts options and repair plan before asking you to approve the work.' : `Real technical depth on the systems that define your ${brand.name}, not generic service copy.`}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            {brand.whyChoose.map((item) => (
              <div
                key={item.title}
                className="card-premium rounded-2xl p-5 sm:p-6 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-burnt-orange flex-shrink-0 mt-1" />
                  <h3 className="text-base sm:text-lg font-bold text-off-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed pl-8">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated brand-service SEO pages */}
      {brandServices.length > 0 && (
        <section className="py-12 sm:py-20 bg-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3">
                {isArabic ? <>{brand.name} <span className="text-burnt-orange">للإصلاح في دبي</span> — جميع الخدمات</> : isMercedesServiceHub ? <>Mercedes <span className="text-burnt-orange">Repair Services</span> in Dubai</> : <>{brand.name} <span className="text-burnt-orange">Repair Dubai</span> — Every Service</>}
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
                {isArabic ? `اختر صفحة إصلاح ${brand.name} أو تغيير الزيت أو إصلاح الفرامل لمراجعة المعلومات العامة، ثم تواصل معنا لتأكيد نطاق الخدمة المتاح لسيارتك.` : isMercedesServiceHub ? 'Choose the exact service to see its warning signs, diagnostic process, relevant Mercedes systems and booking options. Broad Mercedes repair questions stay on this hub; detailed service questions live on the pages below.' : `Choose a ${brand.name} repair, oil-change or brake page for general guidance, then contact the workshop to confirm the available scope for your exact vehicle.`}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {brandServices.map((s) => (
                <Link
                  key={s.serviceSlug}
                  to={getServicePath(s.serviceSlug)}
                  className="card-premium group flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 min-h-[110px]"
                >
                  <span className="text-off-white font-bold text-sm sm:text-base leading-tight group-hover:text-burnt-orange">
                    {brand.name} {isArabic ? arBrandServiceNames[s.serviceSlug] ?? s.label : s.label}
                  </span>
                  <span className="inline-flex items-center gap-1 text-burnt-orange text-xs font-semibold mt-3">
                    {isArabic ? 'اعرف المزيد' : 'Learn more'} <ArrowRight className={`w-3.5 h-3.5 ${isArabic ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
            <div className="max-w-4xl mx-auto mt-10 sm:mt-14 space-y-6 sm:space-y-8">
              {isMercedesServiceHub && !isArabic ? (
                <>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">Mercedes Service A vs Service B</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      Mercedes Service A is generally the smaller scheduled visit, while Service B adds a wider set of inspections and maintenance items. The correct scope depends on the model, model year, mileage, ASSYST display and available service history. We confirm those details before quoting instead of applying the same checklist to every Mercedes.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">How a Mercedes Repair Is Diagnosed</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      The process starts with the symptom and warning message, followed by XENTRY scan data, a physical inspection and a road test when appropriate. We then explain the likely cause, further tests if needed, parts options and estimated scope. A stored fault code is evidence, but it is not treated as proof that the named component must be replaced.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">Mercedes Parts and Fluid Specifications</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                      The estimate identifies the proposed genuine Mercedes-Benz, OE-supplier or customer-approved alternative parts and the fluid specification required by the vehicle. Approval comes before fitting, and post-repair checks are matched to the system repaired.
                    </p>
                  </div>
                </>
              ) : (
                <>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {isArabic ? `إصلاح ${brand.name} في دبي` : `${brand.name} Repair Dubai`}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {isArabic ? `يمكن أن يشمل الفحص مشكلات المحرك وناقل الحركة والتعليق والفرامل والتبريد والأنظمة الكهربائية. يُؤكد نطاق الإصلاح المتاح بعد مراجعة السيارة والمشكلة.` : `Inspection and repair planning can cover engine, transmission, suspension, brake, cooling and electrical concerns. The available repair scope is confirmed after the vehicle and concern are reviewed.`}
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {isArabic ? `تغيير زيت ${brand.name} في دبي` : `${brand.name} Oil Change Dubai`}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {isArabic ? `يتم تأكيد مواصفة الزيت والفلتر حسب طراز ${brand.name} والمحرك. وقد يشمل نطاق الخدمة المتفق عليه فحوصاً إضافية وإعادة ضبط المؤشر عند الحاجة.` : `The oil and filter specification is confirmed for the exact ${brand.name} model and engine. The agreed service scope may include additional checks and a service-indicator reset where applicable.`}
                </p>
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-2">
                  {isArabic ? `إصلاح فرامل ${brand.name} في دبي` : `${brand.name} Brake Repair Dubai`}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {isArabic ? `يمكن أن يشمل الفحص الفحمات والأقراص والحساسات والكليبرات والنظام الهيدروليكي. تعتمد القطع والإجراءات المقترحة على نظام الفرامل المركب في السيارة.` : `Inspection can cover pads, discs, sensors, calipers and the hydraulic system. Proposed parts and procedures depend on the brake system fitted to the exact vehicle.`}
                </p>
              </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Trust */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="card-premium text-center rounded-2xl p-6 sm:p-10">
            {isMercedesServiceHub && !isArabic ? (
              <>
                <p className="text-off-white font-bold text-xl sm:text-2xl mb-2">A Mercedes Workshop Process You Can Check</p>
                <p className="text-gray-400 text-sm sm:text-base mb-8">Specific tools, a documented location and approval before repair are stronger trust signals than unsupported superlatives.</p>
                <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 text-left">
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <MapPin className="w-5 h-5 text-burnt-orange mb-3" />
                    <h3 className="text-off-white font-bold">Al Quoz Industrial Area 3</h3>
                    <p className="text-gray-400 text-sm mt-2">Warehouses 11–15, Dubai, with a direct Google Maps route from this page.</p>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-burnt-orange mb-3" />
                    <h3 className="text-off-white font-bold">XENTRY, DAS & Star</h3>
                    <p className="text-gray-400 text-sm mt-2">Mercedes diagnostic data is combined with physical checks and model-specific testing.</p>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <CheckCircle2 className="w-5 h-5 text-burnt-orange mb-3" />
                    <h3 className="text-off-white font-bold">Inspect, explain, approve</h3>
                    <p className="text-gray-400 text-sm mt-2">The recommended repair, parts route and expected timing are explained before approved work starts.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
            <p className="text-off-white font-bold text-xl sm:text-2xl mb-2">
              {isArabic ? `خدمة مستقلة لسيارات ${brand.name} في دبي` : `Independent ${brand.name} service in Dubai`}
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-8">
              {isArabic ? 'نخدم دبي منذ عام 2002 مع شرح الفحص والعمل المقترح قبل الموافقة.' : 'Serving Dubai since 2002 with inspection findings and proposed work explained before approval.'}
            </p>
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">2002</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{isArabic ? 'سنة التأسيس' : 'Established'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">Al Quoz</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{isArabic ? 'ورشة دبي' : 'Dubai Workshop'}</div>
              </div>
              <div>
                <div className="text-2xl sm:text-4xl font-black text-burnt-orange">11–15</div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{isArabic ? 'المستودعات' : 'Warehouses'}</div>
              </div>
            </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* SEO Content */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className="space-y-8 sm:space-y-10">
            <header>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                {isArabic ? <>خدمة مستقلة لسيارات <span className="text-burnt-orange">{brand.name}</span> في دبي</> : isMercedesServiceHub ? <>Independent <span className="text-burnt-orange">Mercedes-Benz Workshop</span> in Dubai</> : <>Independent <span className="text-burnt-orange">{brand.name}</span> Service in Dubai</>}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">{seoCopy.intro}</p>
            </header>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {isArabic ? 'خدمة تناسب ظروف القيادة في دبي' : 'Built for Dubai Driving Conditions'}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.dubai}</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {isArabic ? `نطاق فحص وخدمة سيارات ${brand.name}` : `${brand.name} Inspection and Service Scope`}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.expertise}</p>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-off-white mb-3">
                {isArabic ? 'خيارات واضحة للقطع والسوائل' : 'Clear Parts and Fluid Options'}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{seoCopy.parts}</p>
            </div>
            <div className={`${isArabic ? 'border-r-2 pr-5 sm:pr-6' : 'border-l-2 pl-5 sm:pl-6'} border-burnt-orange`}>
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">{seoCopy.cta}</p>
            </div>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-3 sm:mb-4">
              {brand.name} <span className="text-burnt-orange">{isArabic ? 'الأسئلة الشائعة' : 'FAQs'}</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {isArabic ? `أكثر الأسئلة التي يطرحها ملاك ${brand.name}.` : `The questions ${brand.name} owners ask us most.`}
            </p>
          </div>
          <Accordion type="single" collapsible className="space-y-3">
            {brand.faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="bg-white/[0.03] border border-white/10 rounded-2xl px-5 sm:px-6 data-[state=open]:border-burnt-orange/40"
              >
                <AccordionTrigger className={`${isArabic ? 'text-right' : 'text-left'} text-off-white font-semibold text-base sm:text-lg hover:no-underline py-5`}>
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 text-sm sm:text-base leading-relaxed pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Booking CTA + Form */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black mb-4 sm:mb-6 leading-tight">
                {isArabic ? <>احجز خدمة <span className="text-burnt-orange">{brand.name}</span></> : <>Book Your <span className="text-burnt-orange">{brand.name}</span> Service</>}
              </h2>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                {isArabic ? 'أخبرنا عن سيارتك والخدمة المطلوبة، وسنتواصل معك عبر واتساب بعرض السعر وأقرب موعد متاح.' : isMercedesServiceHub ? 'Tell us the Mercedes model, year, mileage, warning message and symptoms. We will reply on WhatsApp to confirm the appropriate first inspection and available booking options.' : 'Tell us about your car and the work you need. We will get back to you on WhatsApp with a quote and the earliest available slot.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-burnt-orange hover:bg-burnt-orange/90 text-black font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5" />
                  {isArabic ? 'واتساب الآن' : 'WhatsApp Now'}
                </a>
                <a
                  href="tel:+97143402223"
                  className="inline-flex items-center justify-center gap-2 bg-off-white text-black hover:bg-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 shadow-xl"
                >
                  <Phone className="w-5 h-5" />
                  +971 4 340 2223
                </a>
              </div>
              <p className="text-gray-500 text-sm">
                {isArabic ? 'أو استخدم النموذج لإرسال تفاصيلك مباشرة.' : 'Or use the form to send your details directly.'}
              </p>
            </div>
            <div className="card-premium rounded-2xl p-5 sm:p-8">
              <BrandBookingForm brandName={brand.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-12 sm:py-20 bg-gradient-to-br from-charcoal/40 to-black border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-4xl font-black mb-3">
                {isArabic ? <>خدمات <span className="text-burnt-orange">ذات صلة</span> بـ {brand.name}</> : <>Related <span className="text-burnt-orange">Services</span> for {brand.name}</>}
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                {isArabic ? `أكثر الخدمات التي نقدمها لملاك ${brand.name}.` : `The specialist work we do most often for ${brand.name} owners.`}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedServices.map((sourceService) => {
                const s = isArabic ? localizeServiceToArabic(sourceService) : sourceService;
                return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="card-premium group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black">
                    <img
                      src={typeof s.image === 'string' ? s.image : (s.image as unknown as string)}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold text-off-white mb-2 group-hover:text-burnt-orange transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-burnt-orange text-sm font-semibold">
                      {isArabic ? 'اعرف المزيد' : 'Learn more'} <ArrowRight className={`w-4 h-4 ${isArabic ? 'rotate-180' : ''}`} />
                    </span>
                  </div>
                </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Other Brands */}
      <section className="py-12 sm:py-20 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-black mb-3">
              {isArabic ? <>علامات <span className="text-burnt-orange">أخرى</span> نخدمها</> : <>Other <span className="text-burnt-orange">Brands</span> We Service</>}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {isArabic ? 'عناية متخصصة بمختلف علامات السيارات الفاخرة في ورشتنا.' : 'Specialist care for every prestige marque in our workshop.'}
            </p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
            {otherBrands.map((b) => (
              <Link
                key={b.slug}
                to={`/brands/${b.slug}`}
                className="group flex flex-col items-center gap-2 p-3 sm:p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-burnt-orange/40 rounded-2xl transition-all duration-300"
                aria-label={isArabic ? `خدمة ${b.name} في دبي` : `${b.name} service in Dubai`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 p-2 bg-white/90 rounded-full flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {b.logo ? (
                    <img src={b.logo} alt={isArabic ? `شعار ${b.name}` : `${b.name} logo`} className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-xl font-black text-burnt-orange">{b.name.charAt(0)}</span>
                  )}
                </div>
                <span className="text-[11px] sm:text-xs text-gray-300 group-hover:text-burnt-orange text-center font-medium leading-tight">
                  {b.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BrandPage;
