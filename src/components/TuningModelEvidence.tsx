import { LocalizedLink as Link } from '@/components/LocalizedLink';
import type { TuningModelPageDefinition } from '@/data/tuningModelPages';

const mercedesRepairResources: Record<string, { label: string; path: string }> = {
  'mercedes-amg-g63': { label: 'G63 maintenance, diagnostics and repair', path: '/blog/mercedes-g63-service-dubai-guide' },
  'mercedes-amg-c63': { label: 'C63 service and repair by generation', path: '/mercedes/models/c63-service-repair-dubai' },
  'mercedes-amg-e63': { label: 'E63 service and repair by generation', path: '/mercedes/models/e63-service-repair-dubai' },
  'mercedes-amg-s65': { label: 'S-Class maintenance and inspection guide', path: '/blog/mercedes-s-class-service-dubai-guide' },
};

/** Supporting evidence stays readable without operating the stage selector. */
export default function TuningModelEvidence({ model, firstCarId }: {
  model: TuningModelPageDefinition;
  firstCarId: string;
}) {
  const isMercedes = model.slug.startsWith('mercedes-');
  const modelRepair = mercedesRepairResources[model.slug];

  return <section id="tuning-evidence" className="tm-section" aria-labelledby="tuning-evidence-heading">
    <div className="tm-container">
      <p className="tm-eyebrow">Vehicle condition and supporting evidence</p>
      <h2 id="tuning-evidence-heading">How to assess your {model.shortName} tuning proposal</h2>
      <div className="tm-engineering-grid">
        <article>
          <h3>Read the figures as package references</h3>
          <p>The power, torque, EUR prices and workshop estimates on this page come from the <Link to={`/tuning#${firstCarId}-packages`} className="tm-text-link">DIGITEC Performance Configurator</Link>. They describe its listed configurations. They are not a before-and-after measurement of your vehicle.</p>
        </article>
        <article>
          <h3>Resolve running faults before choosing a tune</h3>
          <p>Tell the workshop about warning lights, overheating, oil loss, hesitation or gearbox symptoms, including any previous tune. Identify the cause and agree any necessary repair before deciding on extra power. Software changes should not substitute for diagnosis of an existing fault.</p>
        </article>
        <article>
          <h3>Ask what will be measured</h3>
          <p>Agree the checks and evidence for the selected work. A useful dyno report identifies the vehicle, fuel, hardware, test date and conditions, and whether figures are measured at the wheels or stated at the engine. Compare baseline and final results on a consistent basis.</p>
        </article>
      </div>
      {model.slug === 'mercedes-amg-gt' && <div className="tm-prose tm-package-story"><h3>See the individual GT Black Series project</h3><p>The <Link to="/blog/mercedes-amg-gt-black-series-1300hp-build-dubai" className="tm-text-link">GT Black Series workshop build article</Link> contains project images and video. Its 1,300 HP specification describes that individual project; it is not a measured output for the GT/GTS or GTC/GTR packages on this page.</p></div>}
      {model.slug === 'mercedes-amg-g63' && <div className="tm-prose tm-package-story"><h3>Keep body conversion and engine tuning distinct</h3><p>The <Link to="/blog/g63-to-brabus-g800-conversion-dubai" className="tm-text-link">G63 G 800-style body conversion record</Link> documents workshop preparation and fitment. A body conversion does not establish an engine power result or include an ECU tune unless that work is separately agreed.</p></div>}
      {isMercedes && <nav aria-label={`${model.shortName} repair and diagnostic resources`}>
        <h3 className="mt-8">Mercedes diagnostics and repair before tuning</h3>
        <ul className="tm-related-links">
          <li><Link to="/services/mercedes-diagnostics-dubai">Mercedes diagnostic assessment in Dubai</Link></li>
          <li><Link to="/mercedes/problems/check-engine-light">Mercedes check-engine light: causes and diagnosis</Link></li>
          <li><Link to="/mercedes/problems/engine-overheating">Mercedes overheating: inspection and next steps</Link></li>
          <li><Link to="/mercedes/problems/gearbox-jerking">Mercedes gearbox jerking: diagnostic guide</Link></li>
          {modelRepair && <li><Link to={modelRepair.path}>{modelRepair.label}</Link></li>}
          <li><Link to="/blog/gad-tuning-explained">Questions to ask before a GAD tuning project</Link></li>
        </ul>
      </nav>}
    </div>
  </section>;
}
