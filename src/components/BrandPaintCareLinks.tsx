import { LocalizedLink as Link } from '@/components/LocalizedLink';

const contexts: Record<string, { introduction: string; filmAnchor: string; next: string; href: string; anchor: string; ending: string }> = {
  'Mercedes-Benz': { introduction: 'For your Mercedes-Benz, assess the finish and any previous paintwork before choosing ', filmAnchor: 'paint protection film', next: '. If wash marks or haze are the concern, start with ', href: '/services/car-polishing-dubai', anchor: 'a paint assessment', ending: ' to discuss which defects may safely improve.' },
  BMW: { introduction: 'For a BMW used regularly, compare the covered panels and care needs of ', filmAnchor: 'PPF coverage options', next: '. If easier washing is your main priority, explore ', href: '/services/ceramic-coating', anchor: 'ceramic coating', ending: ' and confirm the preparation appropriate for the paint.' },
  Porsche: { introduction: 'Original paint, repaired panels and how you use your Porsche all matter when selecting ', filmAnchor: 'film protection for your Porsche', next: '. Existing surface marks may call for ', href: '/services/car-polishing-dubai', anchor: 'polishing or paint correction', ending: ' before the protection plan is agreed.' },
  Ferrari: { introduction: 'Discuss your Ferrari’s finish and the panels you want to preserve when reviewing ', filmAnchor: 'paint protection film coverage', next: '. For swirls or dullness, ', href: '/services/car-polishing-dubai', anchor: 'assess the paint’s correction limits', ending: ' before pursuing a more intensive finish treatment.' },
  Lamborghini: { introduction: 'The finish and panel coverage on your Lamborghini should be confirmed before choosing ', filmAnchor: 'full-body or selected-panel PPF', next: '. For surface behaviour and ongoing cleaning, compare ', href: '/services/ceramic-coating', anchor: 'coating options', ending: ' and ask which products suit the paint or film.' },
  McLaren: { introduction: 'Choose the areas you want to protect on your McLaren, then discuss the scope of ', filmAnchor: 'PPF installation', next: '. The ', href: '/blog/ceramic-coating-vs-ppf-dubai', anchor: 'film and ceramic comparison guide', ending: ' explains the different roles of physical coverage and surface treatment.' },
  'Aston Martin': { introduction: 'Your Aston Martin’s paint history and current finish guide the choice of ', filmAnchor: 'paint protection options with film', next: '. Where reflections look hazy or marked, discuss ', href: '/services/car-polishing-dubai', anchor: 'restoring paint clarity', ending: ' within the safe limits of the existing finish.' },
  'Rolls-Royce': { introduction: 'Preserving the presentation of your Rolls-Royce means considering both ', filmAnchor: 'physical paint protection', next: ' and the care routine. Explore ', href: '/services/ceramic-coating', anchor: 'ceramic paint protection', ending: ' if finish maintenance and easier cleaning are priorities.' },
  'Range Rover': { introduction: 'For your Range Rover, discuss the painted panels exposed in your normal driving and compare ', filmAnchor: 'selected-panel and full-body film', next: '. For day-to-day surface care, review ', href: '/services/ceramic-coating', anchor: 'coating preparation and maintenance', ending: ' alongside the physical coverage you need.' },
};

export default function BrandPaintCareLinks({ brandName }: { brandName: string }) {
  const context = contexts[brandName];
  if (!context) return null;
  return <section className="brand-section py-12 border-t border-white/10" aria-label={`${brandName} paint care`}>
    <div className="max-w-5xl mx-auto px-5 sm:px-6">
      <h2 className="text-2xl font-bold mb-4">Paint care for your {brandName}</h2>
      <p className="text-gray-300 leading-8">{context.introduction}<Link to="/services/paint-protection-film" className="text-burnt-orange underline">{context.filmAnchor}</Link>{context.next}<Link to={context.href} className="text-burnt-orange underline">{context.anchor}</Link>{context.ending}</p>
    </div>
  </section>;
}
