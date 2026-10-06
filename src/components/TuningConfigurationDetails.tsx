import { type TuningCar, stageLabels } from '@/data/tuningCars';
import { getTuningPriceNote, getTuningPublicationNote, hasPublishedTuningPackage, publishedTuningMods } from '@/data/tuningPublication';
import { arabicStageLabels, localizeDuration, localizeTuningMod } from '@/i18n/ar-tuning';

/** The same source as the selector, rendered without client state or animation. */
export default function TuningConfigurationDetails({ cars, isArabic = false, heading }: {
  cars: TuningCar[]; isArabic?: boolean; heading?: string;
}) {
  const brands = [...new Set(cars.map(car => car.brand))];
  return <section id="performance-packages" className="border-t border-white/10 py-14 sm:py-20">
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      <h2 className="text-2xl font-semibold sm:text-4xl">{heading ?? (isArabic ? 'السيارات والحِزم وأسعار تطوير الأداء' : 'Supported vehicles, tuning packages and prices')}</h2>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-white/65">{isArabic
        ? 'افتح الطراز لمقارنة جميع الحِزم. الأرقام والأسعار والمدد هي بيانات مُهيئ الأداء. الأسعار باليورو كما نُشرت، وليست تحويلاً إلى الدرهم. أكّد مواصفات السيارة وبرمجتها والقطع الحالية ونطاق العمل مع الورشة قبل الحجز. أرقام المُهيئ مرجعية ولا تضمن نتيجة كل سيارة.'
        : 'Open a model to compare every listed package. Figures, prices and workshop estimates come from the Performance Configurator. Prices remain in EUR as published. Confirm the exact vehicle, software version, existing modifications and final installation scope with the workshop before booking. Reference outputs are not a guarantee for every car.'}</p>
      {brands.map(brand => <div key={brand} className="mt-10">
        <h3 className="mb-4 text-xl font-semibold">{brand}</h3>
        <div className="space-y-4">{cars.filter(car => car.brand === brand).map((car, index) => {
          const stock = car.stages.stock?.spec;
          const stages = car.availableStages.filter(stage => stage !== 'stock');
          const publicationNote = getTuningPublicationNote(car.id, isArabic);
          return <details key={car.id} id={`${car.id}-packages`} open={cars.length === 1 || index === 0} className="rounded-xl border border-white/15 bg-white/[0.02] p-4 sm:p-6">
            <summary className="cursor-pointer text-lg font-semibold text-off-white">{car.name} · {car.engine}</summary>
            <div className="mt-5">
              {publicationNote && <p data-tuning-publication-note={car.id} className="mb-4 text-sm leading-7 text-white/70">{publicationNote}</p>}
              {hasPublishedTuningPackage(car.id) && <>
              <h4 className="font-semibold">{car.name} — {isArabic ? 'المحرك والمواصفات الأصلية' : 'engine and stock output'}</h4>
              <p className="mt-2 text-sm leading-7 text-white/70">{car.engine}{stock && ` · ${stock.hp} HP · ${stock.torque} Nm`}</p>
              <p className="mt-2 text-sm text-white/65">{isArabic ? 'المراحل المتاحة: ' : 'Available packages: '}{stages.map(stage => isArabic ? arabicStageLabels[stage] : stageLabels[stage]).join(', ')}</p>
              <div className="mt-5 overflow-x-auto rounded-lg border border-white/10" role="region" aria-label={`${car.name} ${isArabic ? 'مقارنة الحِزم' : 'package comparison'}`} tabIndex={0}>
                <table className="w-full min-w-[760px] text-left text-sm">
                  <caption className="px-4 py-3 text-left text-white/70">{car.name}: {isArabic ? 'القوة والعزم والسعر والوقت لكل حزمة' : 'stock vs tuned power, torque, price and workshop time'}</caption>
                  <thead className="bg-white/5"><tr>{(isArabic
                    ? ['الحزمة', 'قوة المصنع HP', 'قوة الحزمة HP', 'زيادة HP', 'عزم المصنع Nm', 'عزم الحزمة Nm', 'زيادة Nm', 'السعر EUR', 'المدة المتوقعة']
                    : ['Package', 'Stock HP', 'Tuned HP', 'HP gain', 'Stock Nm', 'Tuned Nm', 'Nm gain', 'Price (EUR)', 'Estimated time']).map(label => <th key={label} scope="col" className="px-3 py-3 font-semibold">{label}</th>)}</tr></thead>
                  <tbody>{stages.map(stage => {
                    const info = car.stages[stage];
                    if (!info) return null;
                    return <tr key={stage} data-tuning-package={`${car.id}:${stage}`} className="border-t border-white/10">
                      <th scope="row" className="px-3 py-3 text-left font-medium">{isArabic ? arabicStageLabels[stage] : stageLabels[stage]}</th>
                      <td className="px-3 py-3">{stock?.hp}</td><td className="px-3 py-3">{info.spec.hp}</td><td className="px-3 py-3">{stock ? info.spec.hp - stock.hp : ''}</td>
                      <td className="px-3 py-3">{stock?.torque}</td><td className="px-3 py-3">{info.spec.torque}</td><td className="px-3 py-3">{stock ? info.spec.torque - stock.torque : ''}</td>
                      <td className="whitespace-nowrap px-3 py-3">{info.price}</td><td className="whitespace-nowrap px-3 py-3">{isArabic ? localizeDuration(info.time) : info.time}</td>
                    </tr>;
                  })}</tbody>
                </table>
              </div>
              <div className="mt-6 grid gap-6 md:grid-cols-2">{stages.map(stage => {
                const info = car.stages[stage];
                if (!info) return null;
                return <div key={stage} id={`${car.id}-${stage}`}>
                  <h5 className="font-semibold text-burnt-orange">{isArabic ? arabicStageLabels[stage] : stageLabels[stage]} — {isArabic ? 'العمل المشمول' : "what’s included"}</h5>
                  {getTuningPriceNote(car.id, stage, isArabic) && <p className="mt-3 text-sm leading-7 text-white/70">{getTuningPriceNote(car.id, stage, isArabic)}</p>}
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-white/70">{publishedTuningMods(car.id, stage, info.mods).map((mod, i) => <li key={`${mod}-${i}`}>{isArabic ? localizeTuningMod(mod, i) : mod}</li>)}</ul>
                </div>;
              })}</div>
              </>}
            </div>
          </details>;
        })}</div>
      </div>)}
    </div>
  </section>;
}
