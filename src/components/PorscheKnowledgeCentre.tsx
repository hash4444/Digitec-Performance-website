import { ArrowRight, BookOpen, CircleAlert, Cog } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { porscheModelNavigation, type PorscheNavigationItem } from '@/data/porscheArchitecture';

const ownerGuideCategories = [
  {
    id: 'porsche-systems',
    title: 'Understand your Porsche systems',
    description: 'Explore PDK, PASM, air suspension, brakes and other fitted equipment.',
    path: '/porsche/systems',
    icon: Cog,
  },
  {
    id: 'porsche-problems',
    title: 'Warning lights and symptoms',
    description: 'Find guidance on unusual shifts, leaks, cooling and chassis warnings.',
    path: '/porsche/problems',
    icon: CircleAlert,
  },
  {
    id: 'porsche-guides',
    title: 'Maintenance and ownership',
    description: 'Plan servicing, understand Dubai conditions and prepare for a used-car inspection.',
    path: '/blog/porsche-maintenance-guide-dubai',
    icon: BookOpen,
  },
];

const ModelCard = ({ item }: { item: PorscheNavigationItem }) => item.path ? (
  <Link to={item.path} className="card-premium group block rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange">
    <div className="flex items-start justify-between gap-3">
      <h3 className="font-bold text-off-white transition-colors group-hover:text-burnt-orange">{item.title}</h3>
      <ArrowRight className="h-4 w-4 shrink-0 text-burnt-orange" />
    </div>
    <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.path === '/porsche/macan' ? 'Petrol 95B Macan: PDK, PTM, transfer-case, suspension and maintenance guidance.' : item.description}</p>
  </Link>
) : null;

const PorscheKnowledgeCentre = () => (
  <section id="porsche-knowledge-centre" aria-labelledby="porsche-owner-guides-title" className="scroll-mt-24 border-t border-white/5 bg-gradient-to-b from-charcoal/50 to-black py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-burnt-orange">Porsche owner guides</p>
        <h2 id="porsche-owner-guides-title" className="mt-3 text-3xl font-black leading-tight text-off-white sm:text-5xl">Find guidance for your Porsche</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-300">
          Choose your model for maintenance and repair information, or explore the warning signs and fitted systems relevant to your concern before discussing an inspection.
        </p>
      </header>

      <nav id="porsche-models" aria-label="Porsche model guides" className="mt-8 grid scroll-mt-24 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {porscheModelNavigation.map((item) => <ModelCard key={item.title} item={item} />)}
      </nav>

      <nav aria-label="More Porsche ownership guidance" className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
        {ownerGuideCategories.map(({ id, title, description, path, icon: Icon }) => (
          <Link id={id} key={path} to={path} className="group block scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.025] p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange">
            <Icon className="mb-3 h-5 w-5 text-burnt-orange" />
            <h3 className="flex items-start justify-between gap-3 font-bold text-off-white transition-colors group-hover:text-burnt-orange">
              {title}<ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-burnt-orange" />
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-400">{description}</p>
          </Link>
        ))}
      </nav>
    </div>
  </section>
);

export default PorscheKnowledgeCentre;
