import { ArrowRight, BookOpen, Car, CircleAlert, Cog, Wrench } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import {
  porscheGuideNavigation,
  porscheModelNavigation,
  porscheProblemNavigation,
  porscheSystemNavigation,
  type PorscheNavigationItem,
} from '@/data/porscheArchitecture';

const NavigationCard = ({ item }: { item: PorscheNavigationItem }) => {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-off-white transition-colors group-hover:text-burnt-orange">{item.title}</h3>
        {item.path ? <ArrowRight className="h-4 w-4 shrink-0 text-burnt-orange" /> : null}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-400">{item.description}</p>
      {item.status === 'planned' ? (
        <span className="mt-3 inline-flex rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">
          Detailed guide planned
        </span>
      ) : null}
    </>
  );

  return item.path ? (
    <Link to={item.path} className="card-premium group block rounded-2xl p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange">
      {content}
    </Link>
  ) : (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">{content}</div>
  );
};

const NavigationGroup = ({
  id,
  title,
  description,
  items,
  icon: Icon,
}: {
  id: string;
  title: string;
  description: string;
  items: PorscheNavigationItem[];
  icon: typeof Car;
}) => (
  <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
    <div className="mb-5 flex items-start gap-3">
      <span className="rounded-xl border border-burnt-orange/25 bg-burnt-orange/10 p-2.5 text-burnt-orange"><Icon className="h-5 w-5" /></span>
      <div>
        <h2 id={`${id}-title`} className="text-xl font-black text-off-white sm:text-2xl">{title}</h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-400">{description}</p>
      </div>
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => <NavigationCard key={item.title} item={item} />)}
    </div>
  </section>
);

const PorscheKnowledgeCentre = () => (
  <section id="porsche-knowledge-centre" className="border-t border-white/5 bg-gradient-to-b from-charcoal/50 to-black py-14 sm:py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-burnt-orange">Porsche Knowledge Centre</p>
        <h2 className="mt-3 text-3xl font-black leading-tight text-off-white sm:text-5xl">Browse by model, system or symptom</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-300">
          Start with the Porsche you own, the system you want to understand or the symptom you have noticed. Published guides and workshop services are linked now; planned guides are shown without creating empty pages.
        </p>
      </header>

      <nav aria-label="Porsche knowledge centre sections" className="my-8 flex flex-wrap gap-2 border-y border-white/10 py-4">
        {[
          ['Models', '#porsche-models'],
          ['Systems', '#porsche-systems'],
          ['Problems', '#porsche-problems'],
          ['Guides', '#porsche-guides'],
          ['Services', '#porsche-services'],
        ].map(([label, href]) => (
          <a key={href} href={href} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:border-burnt-orange/50 hover:text-burnt-orange">
            {label}
          </a>
        ))}
      </nav>

      <div className="space-y-12 sm:space-y-16">
        <NavigationGroup id="porsche-models" title="Porsche models" description="Model-family guidance with generation detail added only where the platform creates a distinct owner need." items={porscheModelNavigation} icon={Car} />
        <NavigationGroup id="porsche-systems" title="Porsche systems" description="Choose the fitted system or workshop area. Dedicated explainers will be introduced in a later reviewed batch." items={porscheSystemNavigation} icon={Cog} />
        <NavigationGroup id="porsche-problems" title="Problems and warning signs" description="A symptom is a starting point, not a confirmed diagnosis. These links lead to the relevant inspection or repair area." items={porscheProblemNavigation} icon={CircleAlert} />
        <NavigationGroup id="porsche-guides" title="Ownership guides" description="Maintenance and workshop-selection information for Porsche owners in Dubai." items={porscheGuideNavigation} icon={BookOpen} />

        <section aria-labelledby="porsche-cases-title" className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="rounded-xl border border-burnt-orange/25 bg-burnt-orange/10 p-2.5 text-burnt-orange"><Wrench className="h-5 w-5" /></span>
            <div>
              <h2 id="porsche-cases-title" className="text-xl font-black text-off-white sm:text-2xl">Recent workshop cases</h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-400">
                Verified Porsche case studies will appear here only when a real workshop record, diagnostic process, completed repair and supporting DIGI-TEC images are available. No example jobs are presented as completed work.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
);

export default PorscheKnowledgeCentre;
