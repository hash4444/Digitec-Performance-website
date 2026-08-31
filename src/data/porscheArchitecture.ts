export const PORSCHE_HUB_PATH = '/brands/porsche-service-dubai';

export type PorscheNavigationItem = {
  title: string;
  description: string;
  path?: string;
  status?: 'planned';
};

export const porscheModelNavigation: PorscheNavigationItem[] = [
  {
    title: '911',
    description: 'Carrera, GTS, Turbo and GT generations, including 997, 991 and 992.',
    path: '/blog/porsche-911-service-dubai-guide',
  },
  {
    title: 'Cayenne',
    description: 'Powertrain, Tiptronic, suspension, cooling and brake guidance for Cayenne models.',
    path: '/blog/porsche-cayenne-service-dubai-guide',
  },
  {
    title: 'Macan',
    description: 'Model-specific PDK, PTM, transfer-case, suspension and maintenance guidance.',
    path: '/porsche/macan',
  },
  {
    title: 'Panamera',
    description: 'Engine, transmission, suspension, cooling and electrical guidance by generation.',
    path: '/blog/porsche-panamera-service-dubai-guide',
  },
  {
    title: '718 Cayman & Boxster',
    description: 'Mid-engine Cayman, Boxster, GTS, GT4 and Spyder service considerations.',
    path: '/porsche/718',
  },
  {
    title: 'Taycan',
    description: 'Charging, thermal-management, 12V, brake and suspension ownership guidance.',
    path: '/porsche/taycan',
  },
];

export const porscheSystemNavigation: PorscheNavigationItem[] = [
  { title: 'PDK', description: 'Dual-clutch operation, normal behaviour and warning signs.', path: '/porsche/systems/pdk' },
  { title: 'Tiptronic', description: 'Torque-converter automatic operation and diagnosis.', path: '/porsche/systems/tiptronic' },
  { title: 'PASM & PDCC', description: 'Adaptive damping and active roll-control systems.', path: '/porsche/systems/pasm' },
  { title: 'PCCB', description: 'Ceramic-composite brake operation and inspection.', path: '/porsche/systems/pccb' },
  { title: 'Air suspension', description: 'Ride-height control, normal operation and warnings.', path: '/porsche/systems/air-suspension' },
  { title: 'Browse all systems', description: 'Sport Chrono, rear-axle steering, PTM and more.', path: '/porsche/systems' },
];

export const porscheProblemNavigation: PorscheNavigationItem[] = [
  { title: 'PDK jerking', description: 'Possible clutch, control, engine or driveline causes.', path: '/porsche/problems/pdk-jerking' },
  { title: 'Engine overheating', description: 'Cooling, airflow and circulation warning signs.', path: '/porsche/problems/engine-overheating' },
  { title: 'Oil or coolant leak', description: 'How visible fluid is traced to its source.', path: '/porsche/problems/oil-leak' },
  { title: 'Suspension drops overnight', description: 'Air-loss and control-system diagnosis.', path: '/porsche/problems/suspension-dropping-overnight' },
  { title: 'AC not cooling', description: 'Refrigerant, airflow, compressor and control causes.', path: '/porsche/problems/ac-not-cooling' },
  { title: 'Battery or starting problem', description: 'Low-voltage, charging and no-start pathways.', path: '/porsche/problems/wont-start' },
  { title: 'Browse all problems', description: 'Warning lights, engine, chassis, Macan and Taycan guides.', path: '/porsche/problems' },
];

export const porscheGuideNavigation: PorscheNavigationItem[] = [
  {
    title: 'Porsche maintenance in Dubai',
    description: 'A broad ownership and maintenance overview for UAE conditions.',
    path: '/blog/porsche-maintenance-guide-dubai',
  },
  {
    title: 'Choosing a Porsche workshop',
    description: 'Questions to ask about diagnosis, estimates, parts and approval.',
    path: '/best-porsche-workshop-dubai',
  },
  {
    title: 'Pre-purchase inspection',
    description: 'Vehicle identity, records, body, systems, scan and road-test checklist.',
    path: '/porsche/guides/pre-purchase-inspection-checklist',
  },
  {
    title: 'Warning lights explained',
    description: 'Warning colour, message wording, urgency and diagnostic next steps.',
    path: '/porsche/guides/warning-lights',
  },
  { title: 'Buying a used Porsche', description: 'Condition, records, PPI and purchase decisions in Dubai.', path: '/porsche/guides/buying-used-porsche-dubai' },
  { title: 'Dubai heat', description: 'Cooling, AC, battery, tyre and fluid considerations.', path: '/porsche/guides/dubai-heat' },
];
