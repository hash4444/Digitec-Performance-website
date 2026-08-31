import { ArrowRight, Cog } from 'lucide-react';
import Header from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalizedLink as Link } from '@/components/LocalizedLink';
import { PORSCHE_HUB_PATH } from '@/data/porscheArchitecture';
import { PORSCHE_SYSTEMS_PATH, porscheSystemGuides } from '@/data/porscheSystemGuides';
import { useSeo } from '@/hooks/use-seo';
import { buildBreadcrumb, buildWebPage, pageGraph, SITE_URL } from '@/lib/schema';

const PorscheSystemsIndex = () => {
  const url = `${SITE_URL}${PORSCHE_SYSTEMS_PATH}`;
  useSeo({ title: 'Porsche Systems Explained | Digi-Tec Dubai', description: 'Understand Porsche PDK, Tiptronic, PASM, PDCC, PCCB, air suspension, Sport Chrono, rear-axle steering and PTM systems.', canonical: url, jsonLd: pageGraph([buildWebPage({ url, name: 'Porsche Systems Explained', description: 'Technical Porsche system guides for owners.', breadcrumbId: `${url}#breadcrumb` }), buildBreadcrumb(url, [{ name: 'Home', url: SITE_URL }, { name: 'Porsche', url: `${SITE_URL}${PORSCHE_HUB_PATH}` }, { name: 'Systems', url }])]) });
  return <div className="min-h-screen bg-black text-off-white"><Header /><main><nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 pt-6 text-sm text-white/50 sm:px-6"><Link to="/">Home</Link> / <Link to={PORSCHE_HUB_PATH}>Porsche</Link> / <span className="text-white">Systems</span></nav><section className="py-14 sm:py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6"><Cog className="h-9 w-9 text-burnt-orange" /><h1 className="mt-5 text-4xl font-black sm:text-6xl">Porsche Systems Explained</h1><p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/65">Technical, owner-readable guides that separate normal system behaviour from warning signs and connect education to the appropriate diagnostic service.</p><div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{porscheSystemGuides.map((guide) => <Link key={guide.slug} to={`${PORSCHE_SYSTEMS_PATH}/${guide.slug}`} className="card-premium group rounded-2xl p-6"><h2 className="text-xl font-black group-hover:text-burnt-orange">{guide.name}</h2><p className="mt-3 text-sm leading-relaxed text-white/55">{guide.intro}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-burnt-orange">Read guide <ArrowRight className="h-4 w-4" /></span></Link>)}</div></div></section></main><Footer /></div>;
};
export default PorscheSystemsIndex;
