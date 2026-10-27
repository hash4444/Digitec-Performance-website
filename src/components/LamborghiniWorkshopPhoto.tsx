export function LamborghiniWorkshopPhoto({ isArabic }: { isArabic: boolean }) {
  return (
    <figure className="max-w-3xl mx-auto grid sm:grid-cols-[0.85fr_1.15fr] overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
      <img
        src="/images/lamborghini-exhaust-valve-workshop-dubai.jpg"
        alt={isArabic ? 'لامبورغيني رمادية داخل ورشة ديجي-تك في دبي مع عبارة إصلاح صمام العادم على الصورة' : 'Grey Lamborghini inside the DIGI-TEC workshop in Dubai with an exhaust valve repair caption'}
        loading="lazy"
        decoding="async"
        width="1125"
        height="1825"
        className="w-full h-auto self-center"
      />
      <figcaption className="p-5 sm:p-7 flex flex-col justify-center">
        <span className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold">{isArabic ? 'داخل ديجي-تك' : 'Inside Digi-Tec'}</span>
        <h3 className="text-xl font-bold text-off-white mt-3">{isArabic ? 'لامبورغيني في ورشتنا' : 'Lamborghini in our workshop'}</h3>
        <p className="text-white/60 text-sm leading-relaxed mt-3">{isArabic ? 'لامبورغيني داخل ورشة ديجي-تك في القوز، دبي.' : 'A Lamborghini inside the DIGI-TEC workshop in Al Quoz, Dubai.'}</p>
      </figcaption>
    </figure>
  );
}
