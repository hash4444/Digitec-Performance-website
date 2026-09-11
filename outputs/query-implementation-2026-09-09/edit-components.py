from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
def edit(name,fn):
 p=ROOT/name;s=p.read_text('utf-8');n=fn(s);assert n!=s,name;p.write_text(n,'utf-8')
def brand_service(s):
 lines=s.splitlines()
 for i,line in enumerate(lines):
  if "{combo.brandSlug === 'mercedes-benz-service-dubai' && !isArabic ? combo.h1" in line:
   lines[i]="            {combo.h1}"
  if 'Models We <span' in line:
   lines[i]="            {isArabic ? <>طرازات {combo.brandName} والأنظمة المركبة</> : <>{combo.brandName} models and fitted systems</>}"
 s='\n'.join(lines)+'\n'
 s=s.replace("{isArabic ? 'راسلنا عبر واتساب' : 'WhatsApp Us'}", "{isArabic ? 'راسلنا عبر واتساب' : enquiryLabel}")
 marker='              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{combo.partsCopy}</p>'
 assert marker in s
 s=s.replace(marker,marker+'''
              {!isArabic && ['mercedes-benz-service-dubai', 'bmw-service-dubai', 'porsche-service-dubai', 'aston-martin-service-dubai', 'mclaren-service-dubai'].includes(combo.brandSlug) && (
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-burnt-orange hover:underline">
                  {enquiryLabel}<ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              )}''')
 marker='      <Footer />\n    </div>\n  );'
 assert marker in s
 s=s.replace(marker,'''      <FinalCTA
        title={`${combo.brandName} ${combo.serviceName}: discuss the next step`}
        description="Share the model, year, mileage and the concern you want checked. The workshop can confirm the appropriate assessment, scope and appointment availability."
        label={enquiryLabel}
        href={whatsappHref}
      />
'''+marker)
 return s
edit('src/pages/BrandServicePage.tsx',brand_service)
edit('src/data/priorityBrandSeo.ts',lambda s:s.replace('BMW Service & Repair Dubai | Independent BMW Workshop | DIGI-TEC','BMW Service & Repair Dubai | DIGI-TEC'))
edit('src/components/BmwHubSections.tsx',lambda s:s.replace('Book a BMW inspection on WhatsApp','Request BMW Service'))
def brand(s):
 s=s.replace("isEnglishBmwHub ? 'Book a BMW inspection on WhatsApp'", "isEnglishBmwHub ? 'Request BMW Service'")
 s=s.replace("isEnglishMclarenHub ? 'Request a McLaren Assessment'", "isEnglishMclarenHub ? 'Request McLaren Service'")
 s=s.replace(": isPriorityLeadBrand ? `Request a ${brand.name} Inspection` : 'WhatsApp Us'", ": isMercedesServiceHub ? 'Book Mercedes Service' : isPriorityLeadBrand ? `Request a ${brand.name} Inspection` : `Request ${brand.name} Service`")
 return s
edit('src/pages/BrandPage.tsx',brand)
