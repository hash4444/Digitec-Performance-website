from pathlib import Path

p = Path('src/pages/BrandPage.tsx')
s = p.read_text(encoding='utf-8')
def replace(old, new, count=1):
    global s
    found = s.count(old)
    if found != count:
        raise ValueError(f'Expected {count} matches, found {found}: {old[:100]}')
    s = s.replace(old, new)

replace("import { BMW_CORE_SERVICES,", "import { PORSCHE_HUB_INTRO, PORSCHE_HUB_FAQS, PORSCHE_HUB_SERVICES, PORSCHE_WHATSAPP_HREF } from '@/data/porscheHubContent';\nimport { BMW_CORE_SERVICES,")
replace("const PorscheKnowledgeCentre =", "const PorscheHubSections = React.lazy(() => import('@/components/PorscheHubSections'));\nconst PorscheKnowledgeCentre =")
replace("  const isEnglishBmwHub =", "  const isEnglishPorscheHub = !isArabic && sourceBrand?.slug === 'porsche-service-dubai';\n  const isEnglishBmwHub =")
replace(": isEnglishBmwHub ? { ...sourceBrand, intro: BMW_HUB_INTRO", ": isEnglishPorscheHub ? { ...sourceBrand, intro: PORSCHE_HUB_INTRO, faqs: PORSCHE_HUB_FAQS, specialization: 'Service • Repairs • PIWIS 3 Diagnostics' } : isEnglishBmwHub ? { ...sourceBrand, intro: BMW_HUB_INTRO")
replace("      : isEnglishBmwHub ? [...BMW_CORE_SERVICES", "      : isEnglishPorscheHub ? PORSCHE_HUB_SERVICES.map((service) => service.title)\n      : isEnglishBmwHub ? [...BMW_CORE_SERVICES")
replace("}, [brand, isArabic, isEnglishAstonHub", "}, [brand, isArabic, isEnglishPorscheHub, isEnglishAstonHub")
replace(": isEnglishAstonHub ? ASTON_WHATSAPP_HREF", ": isEnglishPorscheHub ? PORSCHE_WHATSAPP_HREF : isEnglishAstonHub ? ASTON_WHATSAPP_HREF")
replace("!isEnglishBmwHub && !isEnglishAudiHub", "!isEnglishPorscheHub && !isEnglishBmwHub && !isEnglishAudiHub", count=4)
replace("{!isEnglishBmwHub && !isFerrari", "{!isEnglishPorscheHub && !isEnglishBmwHub && !isFerrari")
replace("      {isPorscheServiceHub && !isArabic && <PorscheKnowledgeCentre />}\n", '')
replace("      {isEnglishBmwHub && (\n", '''      {isEnglishPorscheHub && (
        <nav aria-label="Porsche page sections" className="border-b border-white/10 bg-black">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-4 sm:px-6">
            {[
              ['Services & repairs', '#porsche-services'],
              ['Our workshop', '#porsche-workshop'],
              ['FAQs', '#porsche-faqs'],
              ['Request a booking', '#porsche-booking'],
              ['Model guides', '#porsche-knowledge-centre'],
            ].map(([label, href]) => (
              <a key={href} href={href} className="inline-flex min-h-11 items-center rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-gray-200 hover:border-burnt-orange/50 hover:text-burnt-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-burnt-orange">{label}</a>
            ))}
          </div>
        </nav>
      )}

      {isEnglishBmwHub && (
''')
replace(": isEnglishAstonHub ? <AstonMartinHubSections />", ": isEnglishPorscheHub ? <PorscheHubSections /> : isEnglishAstonHub ? <AstonMartinHubSections />")
replace("<section id={isMercedesServiceHub && !isArabic ? 'mercedes-faqs' : undefined}", "<section id={isEnglishPorscheHub ? 'porsche-faqs' : isMercedesServiceHub && !isArabic ? 'mercedes-faqs' : undefined}")
replace("${isEnglishBmwHub || isEnglishAudiHub", "${isEnglishPorscheHub || isEnglishBmwHub || isEnglishAudiHub")
replace("<section id={isMercedesServiceHub ? 'mercedes-booking' : undefined}", "<section id={isPorscheServiceHub ? 'porsche-booking' : isMercedesServiceHub ? 'mercedes-booking' : undefined}")
replace("{isMercedesServiceHub ? (isArabic ? 'أرسل طراز مرسيدس", "{isPorscheServiceHub ? (isArabic ? 'أرسل طراز بورشه وسنة الصنع والمسافة وسجل الصيانة والخدمة المطلوبة أو الأعراض والموعد المفضل. يؤكد الفريق الفحص المناسب والتوفر؛ وقد يلزم فحص السيارة قبل تقديم تقدير للإصلاح. تُوضح القطع والسوائل والأجرة قبل الموافقة على العمل.' : 'Send your Porsche model, year, mileage, service history, service due or symptoms, and preferred appointment time. The team confirms the appropriate assessment and availability. A repair estimate may need a vehicle inspection; parts, fluids and labour are explained before you approve the work.') : isMercedesServiceHub ? (isArabic ? 'أرسل طراز مرسيدس")
replace("{serviceSprintBrand ? (isArabic ? 'يجهز النموذج", "{serviceSprintBrand || isPorscheServiceHub ? (isArabic ? 'يجهز النموذج")
replace("issuePlaceholder={isEnglishAstonHub ?", "issuePlaceholder={isEnglishPorscheHub ? 'Porsche model, year, mileage, service history, service due or symptoms, and preferred appointment day/time' : isEnglishAstonHub ?")
replace("      {/* Related Services */}", "      {isEnglishPorscheHub && <PorscheKnowledgeCentre />}\n\n      {/* Related Services */}")
replace("{relatedServices.length > 0 && !isMercedesServiceHub", "{relatedServices.length > 0 && !isEnglishPorscheHub && !isMercedesServiceHub")
p.write_text(s, encoding='utf-8')

seo = Path('src/data/priorityBrandSeo.ts')
s = seo.read_text(encoding='utf-8')
replace("title: 'Porsche Service & Repair Dubai | Digi-Tec Workshop'", "title: 'Porsche Repair & Service Dubai | DIGI-TEC Al Quoz'")
replace("description: 'Porsche service and repair in Dubai for 911, Cayenne, Macan, Panamera, Cayman and Taycan, with diagnostics, PDK, brakes and suspension care in Al Quoz.'", "description: 'Independent Porsche repair and service in Al Quoz, Dubai. Maintenance, PIWIS 3 diagnostics, engine, PDK, brakes and suspension. Request an inspection.'")
seo.write_text(s, encoding='utf-8')
print('Integrated Porsche-only services, booking flow, FAQs and metadata.')
