import { ArrowRight, Camera, MessageCircle, Phone } from 'lucide-react';
import { LocalizedLink as Link } from '@/components/LocalizedLink';

const cameraWhatsAppHref = `https://wa.me/97143402223?text=${encodeURIComponent(
  'Hello DIGI-TEC, I would like to discuss a Bentley reverse camera.\n\nModel and year: \nExisting camera or new installation: \nDisplay/system details: \nSymptoms or desired result: \nPreferred appointment: ',
)}`;

const cameraFaqs = [
  {
    question: 'Can a reverse camera work with my Bentley factory display?',
    answer: 'Compatibility depends on the model year, fitted display, control units, connections and any previous modifications. The workshop checks the integration route, available camera options and parking functions before confirming an installation.',
  },
  {
    question: 'Does a blank camera image mean the camera needs replacing?',
    answer: 'Not necessarily. Power supply, wiring, connectors, the interface, display or control system can also cause a missing or intermittent image. Testing determines whether the camera, a connection or another component needs attention.',
  },
  {
    question: 'Will parking sensors and guidance lines still work?',
    answer: 'Existing parking sensors, screen switching and any guidance-line functions are reviewed before work is agreed. Their behaviour depends on the fitted equipment and proposed integration. Retained functions and any limitations are explained in the estimate and checked after the work.',
  },
];

export default function BentleyCameraSection() {
  return (
    <section id="reverse-camera" aria-labelledby="bentley-camera-heading" className="scroll-mt-28 border-t border-white/10 bg-gradient-to-br from-charcoal/40 to-black py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 inline-flex items-center gap-2"><Camera className="h-4 w-4" aria-hidden="true" /> Parking visibility and integration</p>
          <h2 id="bentley-camera-heading" className="text-3xl font-black leading-tight sm:text-5xl">Bentley reverse-camera installation in Dubai</h2>
          <p className="mt-5 text-base leading-8 text-gray-300">DIGI-TEC installs reverse cameras and investigates existing camera faults at our Al Quoz workshop. For Continental GT, Flying Spur and Bentayga enquiries, we check the exact year, factory display and fitted equipment before confirming compatibility or a repair plan.</p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <article className="card-premium rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold">Adding a reverse camera</h3>
            <p className="mt-4 text-base leading-7 text-gray-300">Tell us whether you want to add a camera or change an existing setup. We review the display interface, camera mounting, wiring route and reverse-gear activation, along with the parking functions you want to retain. Parts, integration and any supported setup procedures are agreed before installation.</p>
          </article>
          <article className="card-premium rounded-2xl p-6 sm:p-8">
            <h3 className="text-xl font-bold">Repairing a missing or intermittent image</h3>
            <p className="mt-4 text-base leading-7 text-gray-300">A black screen, flickering picture or failure to switch into camera view needs diagnosis. Camera power, wiring, connectors, the display and interface are checked as appropriate. Describe whether the fault is constant, appears after starting or changes when selecting reverse.</p>
          </article>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl border border-white/10 p-6 sm:p-8">
            <h3 className="text-xl font-bold">What is checked before handover</h3>
            <p className="mt-4 text-base leading-7 text-gray-300">After the agreed work, the team checks image operation, reverse selection, screen switching and the parking functions included in the scope. Any required setup or calibration is identified for the fitted system before work is accepted.</p>
            <p className="mt-4 text-base leading-7 text-gray-300">The camera is a parking aid. Continue to use mirrors and direct observation, and check the surrounding area before moving.</p>
            <div className="mt-6 flex flex-col items-start gap-3 text-sm font-semibold">
              <Link to="/brands/bentley-service-dubai" className="inline-flex items-center gap-2 text-burnt-orange hover:underline">Bentley service and maintenance <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
              <Link to="/services/auto-electrical-repair-dubai" className="inline-flex items-center gap-2 text-burnt-orange hover:underline">Electrical and wiring fault diagnosis <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /></Link>
            </div>
          </div>
          <aside className="rounded-2xl border border-burnt-orange/25 bg-burnt-orange/5 p-6 sm:p-8" aria-label="Bentley camera enquiry details">
            <h3 className="text-xl font-bold">Request a camera assessment</h3>
            <p className="mt-4 text-base leading-7 text-gray-300">Send the model and year, a photo of the display, details of any existing camera or modifications, and the fault or result you want. The estimate depends on compatible parts, access, integration and any diagnostic work needed.</p>
            <div className="mt-6 flex flex-col gap-3">
              <a href={cameraWhatsAppHref} data-cta-placement="camera_scope" target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" /> Discuss a Bentley camera</a>
              <a href="tel:+97143402223" data-cta-placement="camera_scope" className="btn-secondary"><Phone className="h-5 w-5 shrink-0" aria-hidden="true" /> Call the Al Quoz workshop</a>
            </div>
          </aside>
        </div>

        <div className="mt-10 max-w-4xl">
          <h3 className="mb-5 text-xl font-bold">Bentley reverse-camera questions</h3>
          <div className="space-y-3">
            {cameraFaqs.map(({ question, answer }) => (
              <details key={question} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 open:border-burnt-orange/40">
                <summary className="cursor-pointer text-base font-semibold leading-7 text-off-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burnt-orange">{question}</summary>
                <p className="mt-4 text-base leading-7 text-gray-300">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
