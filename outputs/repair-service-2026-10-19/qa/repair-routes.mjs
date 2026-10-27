// Existing repair owners only. No new URL or keyword page is created by this QA.
export const owners = [
  { key: 'mercedes-engine', brand: 'Mercedes', hub: '/brands/mercedes-benz-service-dubai', route: '/services/mercedes-mechanical-repair-dubai' },
  { key: 'mercedes-suspension', brand: 'Mercedes', hub: '/brands/mercedes-benz-service-dubai', route: '/services/mercedes-suspension-repair-dubai' },
  { key: 'mercedes-diagnostics', brand: 'Mercedes', hub: '/brands/mercedes-benz-service-dubai', route: '/services/mercedes-diagnostics-dubai' },
  { key: 'mercedes-transmission', brand: 'Mercedes', hub: '/brands/mercedes-benz-service-dubai', route: '/services/mercedes-transmission-repair-dubai' },
  { key: 'bmw-transmission', brand: 'BMW', hub: '/brands/bmw-service-dubai', route: '/brands/bmw-service-dubai/transmission-repair' },
  { key: 'bmw-engine', brand: 'BMW', hub: '/brands/bmw-service-dubai', route: '/brands/bmw-service-dubai/mechanical-repair' },
  { key: 'rolls-royce-engine', brand: 'Rolls-Royce', hub: '/brands/rolls-royce-service-dubai', route: '/brands/rolls-royce-service-dubai/mechanical-repair' },
  { key: 'rolls-royce-suspension', brand: 'Rolls-Royce', hub: '/brands/rolls-royce-service-dubai', route: '/brands/rolls-royce-service-dubai/suspension-repair' },
  { key: 'lamborghini-transmission', brand: 'Lamborghini', hub: '/brands/lamborghini-service-dubai', route: '/brands/lamborghini-service-dubai/transmission-repair' },
  { key: 'lamborghini-engine', brand: 'Lamborghini', hub: '/brands/lamborghini-service-dubai', route: '/brands/lamborghini-service-dubai/mechanical-repair' },
  { key: 'lamborghini-diagnostics', brand: 'Lamborghini', hub: '/brands/lamborghini-service-dubai', route: '/brands/lamborghini-service-dubai/engine-diagnostics', preservedOwner: true },
];
export const routes = owners.flatMap(owner => ['en', 'ar'].map(language => ({
  ...owner,
  language,
  route: `${language === 'ar' ? '/ar' : ''}${owner.route}`,
  hub: `${language === 'ar' ? '/ar' : ''}${owner.hub}`,
})));
