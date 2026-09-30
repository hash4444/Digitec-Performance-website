from pathlib import Path
p=Path('src/pages/ServicePage.tsx');s=p.read_text(encoding='utf-8');s=s.replace("import { localizeServiceToArabic }", "import { refineArabicProtectionService } from '@/i18n/ar-protection-services';\nimport { localizeServiceToArabic }")
s=s.replace('refineGenericArabicService(localizeServiceToArabic(sourceService))','refineArabicProtectionService(refineGenericArabicService(localizeServiceToArabic(sourceService)))')
needle="                {!isArabic && service.slug === 'paint-protection-dubai' && ("
s=s.replace(needle,'''                {isArabic && ['paint-protection-dubai', 'paint-protection-film', 'ceramic-coating'].includes(service.slug) && (
                  <p className="mt-5 text-gray-300 leading-relaxed text-lg">
                    قارن <Link to="/services/paint-protection-dubai" className="text-burnt-orange underline">خيارات حماية الطلاء</Link>،
                    وراجع <Link to="/services/paint-protection-film" className="text-burnt-orange underline">تغطية أفلام PPF</Link> أو
                    <Link to="/services/ceramic-coating" className="text-burnt-orange underline"> معالجة السيراميك والعناية</Link>.
                    يساعد <Link to="/blog/ceramic-coating-vs-ppf-dubai" className="text-burnt-orange underline">دليل المقارنة</Link> في اختيار الهدف؛
                    أما فقدان الطلاء أو الضرر العميق فيحتاج إلى <Link to="/services/car-body-repair-dubai" className="text-burnt-orange underline">تقييم إصلاح الهيكل والدهان</Link>.
                  </p>
                )}
'''+needle)
p.write_text(s,encoding='utf-8')
p=Path('src/data/aiGuidePostsExtra.ts');s=p.read_text(encoding='utf-8');start=s.index("    slug: 'ceramic-coating-vs-ppf-dubai'");end=s.index("    slug: 'oil-specification-guide",start);a=s[start:end]
a=a.replace("date: '2026-08-13',","date: '2026-08-13',\n    updatedDate: '2026-09-30',")
replacements={
'PPF: absorbs stone chips, road rash and light abrasion on the panels it covers.':'PPF: a physical film that can reduce small-impact damage and minor abrasion on covered panels; it cannot prevent every chip or scratch.',
'PPF: self healing on light swirls with heat, depending on the film used.':'PPF: some products can reduce light surface marks under their specified conditions. Confirm the selected film; cuts, tears and deep damage are not self-healed.',
'Ceramic coating: adds a hard, hydrophobic layer that makes washing easier.':'Ceramic coating: a compatible surface treatment may improve water behaviour and ease of cleaning, depending on the product.',
'Ceramic coating: improves resistance to UV dulling, bird lime and water spotting.':'Ceramic coating: environmental resistance depends on verified product properties. Water spots and contaminants can still mark the finish.',
'No. Coating is a chemical layer. Only paint protection film provides meaningful protection against stone chips.':'Ceramic coating does not provide the physical small-impact barrier of film. Suitable PPF can reduce some stone-chip damage on covered panels, but neither option makes paint damage-proof.',
'Longevity depends on the product, the preparation and how the car is stored and washed. Covered parking and correct washing make the largest difference.':'Longevity depends on the selected product, preparation, exposure and care. Ask for product-specific maintenance instructions and any written warranty terms; no single lifespan applies to every film or coating.',
'Yes. Applying film to impact areas and coating over the whole car is a common approach here.':'Compatible coating and film can be combined where both manufacturers support the surfaces and application. Confirm the products, covered areas, application order and care requirements rather than assuming every coating suits every film.'}
for x,y in replacements.items():assert x in a,x;a=a.replace(x,y)
s=s[:start]+a+s[end:];p.write_text(s,encoding='utf-8')
p=Path('src/data/ppfContent.ts');s=p.read_text(encoding='utf-8');needle="  { question: 'How should PPF be maintained?'";pos=s.index(needle)
s=s[:pos]+'''  { question: 'What should I do about bubbles, lifting edges or damaged PPF?', answer: 'Record when the film was installed and send photographs of the affected area. Settling, contamination, adhesion issues and physical damage need different assessments. Do not puncture, pull or heat the film yourself. Follow the selected product’s guidance and ask for inspection before deciding whether any work is appropriate.' },
  { question: 'Is PPF removal or replacement included in installation?', answer: 'No. Existing-film removal, panel replacement and any work on damaged film are separate enquiries. Describe the film’s age, condition and previous paint repairs, and confirm workshop availability, suitability, risks and the proposed scope before booking. Installation alone does not establish that every removal or repair request can be accepted.' },
'''+s[pos:];p.write_text(s,encoding='utf-8')
p=Path('src/pages/PpfPage.tsx');s=p.read_text(encoding='utf-8').replace("dateModified: '2026-09-16'","dateModified: '2026-09-30'");p.write_text(s,encoding='utf-8')
print('Scoped protection edits applied; no route changes.')
