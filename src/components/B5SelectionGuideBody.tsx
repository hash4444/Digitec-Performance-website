import { LocalizedLink as Link } from '@/components/LocalizedLink';

type Brand = 'Rolls-Royce' | 'Bentley' | 'Maybach';
type Pair = { en: string; ar: string };
type Section = { title: Pair; paragraphs: Pair[] };

const content: Record<Brand, { lead: Pair; sections: Section[]; service: string; serviceLabel: Pair }> = {
  'Rolls-Royce': {
    lead: {
      en: 'Start by identifying the exact Rolls-Royce and the task. A Ghost ride-height warning, a Cullinan cabin-cooling concern and a Spectre charging question do not call for the same equipment or service procedure. Ask the workshop to confirm what it can inspect on that vehicle before arranging work.',
      ar: 'ابدأ بتحديد طراز رولز رويس والمهمة المطلوبة. تحذير ارتفاع سيارة Ghost، ومشكلة تبريد مقصورة Cullinan، واستفسار شحن Spectre ليست أعمالاً متشابهة. اطلب من الورشة تأكيد الفحوص التي تستطيع تنفيذها على السيارة المحددة قبل ترتيب العمل.',
    },
    service: '/brands/rolls-royce-service-dubai', serviceLabel: { en: 'Rolls-Royce service options', ar: 'خدمات رولز رويس' },
    sections: [
      { title: { en: 'Identify the model and fitted system', ar: 'تحديد الطراز والنظام المركب' }, paragraphs: [
        { en: 'For Ghost, Phantom, Cullinan, Wraith or Dawn, give the year, VIN when requested, warning text and service history. Suspension, transmission and comfort-system equipment varies by generation; a workshop should not quote a strut, module or gearbox procedure from the badge alone.', ar: 'في Ghost أو Phantom أو Cullinan أو Wraith أو Dawn، أرسل السنة ورقم الهيكل عند الطلب ونص التحذير وسجل الصيانة. تختلف أنظمة التعليق وناقل الحركة والراحة حسب الجيل، فلا يصح تسعير دعامة أو وحدة إلكترونية أو إجراء لناقل الحركة اعتماداً على الشعار وحده.' },
        { en: 'Spectre is fully electric. Confirm a separate, verified EV work scope before booking; a combustion-engine oil or exhaust service is not a Spectre maintenance task. An independent workshop should be clear about any high-voltage work it cannot accept.', ar: 'سيارة Spectre كهربائية بالكامل. تأكد من نطاق العمل الكهربائي المثبت قبل الحجز؛ تغيير زيت محرك الاحتراق أو إصلاح العادم ليس من صيانتها. يجب أن توضح الورشة المستقلة أي عمل جهد عالٍ لا يمكنها قبوله.' },
      ] },
      { title: { en: 'Ask how a ride or warning concern will be tested', ar: 'اسأل عن طريقة فحص التعليق والتحذيرات' }, paragraphs: [
        { en: 'If the car sits unevenly, record whether it drops after parking, only on one side or after a drive. The first assessment may need visible leak checks and supported height, pressure or fault information. Leaning does not by itself prove a failed air strut.', ar: 'إذا انخفضت السيارة أو مالت، دوّن ما إذا حدث ذلك بعد الوقوف أو في جهة واحدة أو بعد القيادة. قد يحتاج الفحص الأول إلى مراجعة التسربات المرئية ومعلومات الارتفاع أو الضغط أو الأعطال المتاحة. الميل وحده لا يثبت تلف الدعامة الهوائية.' },
        { en: 'For engine, gearbox or low-voltage warnings on combustion models, ask which data and physical checks are available for the exact vehicle. A stored code or change in shift feel is evidence to investigate, not approval to replace a major component.', ar: 'لتحذيرات المحرك أو الناقل أو البطارية منخفضة الجهد في طرازات الاحتراق، اسأل عن البيانات والاختبارات الفعلية المتاحة للسيارة. رمز العطل أو تغير سلوك النقل دليل يحتاج إلى فحص، لا موافقة تلقائية على استبدال مكوّن كبير.' },
      ] },
      { title: { en: 'Compare the estimate and maintenance plan', ar: 'قارن عرض السعر وخطة الصيانة' }, paragraphs: [
        { en: 'Ask for the initial inspection, parts specification, supported functions and any further specialist work to be itemised. The maintenance plan should use the exact model, year, history and use rather than one mileage interval or fluid recommendation for the whole marque.', ar: 'اطلب تفصيل الفحص الأول ومواصفات القطع والوظائف المتاحة وأي عمل متخصص إضافي. يجب أن تعتمد خطة الصيانة على الطراز والسنة والسجل والاستخدام، لا على مسافة أو توصية سوائل واحدة لجميع سيارات العلامة.' },
        { en: 'DIGI-TEC is an independent Al Quoz workshop. Send the concern and vehicle details so it can confirm an appropriate first inspection and accepted work scope; no manufacturer-authorised status or universal diagnostic access is implied.', ar: 'ديجي-تك ورشة مستقلة في القوز. أرسل المشكلة وبيانات السيارة حتى يؤكد الفريق الفحص الأول المناسب ونطاق العمل المقبول، من دون الإيحاء باعتماد الشركة المصنعة أو وصول تشخيصي شامل.' },
      ] },
    ],
  },
  Bentley: {
    lead: {
      en: 'A useful Bentley workshop comparison begins with the vehicle, not a luxury-car slogan. Continental GT, Bentayga and Flying Spur can differ in powertrain, suspension, display and camera equipment. Share the year, VIN when needed, fitted options and the symptom before asking for a repair estimate.',
      ar: 'تبدأ مقارنة ورش بنتلي من السيارة نفسها لا من وصف عام للفخامة. قد تختلف Continental GT وBentayga وFlying Spur في المحرك والتعليق والشاشة وتجهيز الكاميرا. أرسل السنة ورقم الهيكل عند الحاجة والتجهيزات والأعراض قبل طلب تقدير الإصلاح.',
    },
    service: '/brands/bentley-service-dubai', serviceLabel: { en: 'Bentley service options', ar: 'خدمات بنتلي' },
    sections: [
      { title: { en: 'Separate a camera fault from a new installation', ar: 'افصل بين عطل الكاميرا وتركيب كاميرا جديدة' }, paragraphs: [
        { en: 'For a blank or intermittent reversing image, explain when the screen switches, whether parking sensors still work and whether the system is original or modified. Camera power, wiring, interface and display can produce similar symptoms; replacing the camera without testing can miss the cause.', ar: 'عند غياب صورة الرجوع أو تقطعها، اشرح متى تنتقل الشاشة وهل ما زالت حساسات الوقوف تعمل وهل النظام أصلي أم معدل. قد تتشابه أعراض خلل التغذية أو الأسلاك أو الواجهة أو الشاشة مع عطل الكاميرا؛ والاستبدال قبل الاختبار قد لا يعالج السبب.' },
        { en: 'Adding a camera is a different request. Confirm screen compatibility, mounting, wiring, integration and any retained parking functions before agreeing to installation. The Bentley electrical page keeps these two tasks separate.', ar: 'تركيب كاميرا جديدة طلب مختلف. يجب تأكيد توافق الشاشة والتثبيت والأسلاك والتكامل ووظائف الوقوف التي ستبقى قبل الموافقة. تفصل صفحة كهرباء بنتلي بين مهمتي الإصلاح والتركيب.' },
      ] },
      { title: { en: 'Check the fitted drivetrain and chassis', ar: 'تحقق من المحرك والناقل والتعليق المركب' }, paragraphs: [
        { en: 'A gearbox warning or shift change should be assessed against the exact transmission and model year. The same applies to ride-height warnings: the workshop should identify fitted air suspension, damping and related electrical equipment before proposing a part or calibration.', ar: 'يجب فحص تحذير ناقل الحركة أو تغير النقل وفق نوع الناقل وسنة السيارة. وينطبق الأمر على تحذيرات ارتفاع السيارة: حدد التعليق الهوائي والتخميد والتجهيزات الكهربائية المركبة قبل اقتراح قطعة أو معايرة.' },
        { en: 'Current Continental GT information describes a hybrid powertrain, but older generations are not identical. Do not transfer a current model’s architecture, maintenance procedure or high-voltage requirement to every Continental GT. Ask which work is supported for the particular car.', ar: 'تصف معلومات Continental GT الحالية نظام دفع هجينا، لكن الأجيال الأقدم ليست مطابقة. لا تطبق بنية الطراز الحالي أو صيانته أو متطلبات الجهد العالي على جميع سيارات Continental GT. اسأل عن العمل المتاح للسيارة المحددة.' },
      ] },
      { title: { en: 'Request an evidence-led quote', ar: 'اطلب عرضاً مبنياً على الفحص' }, paragraphs: [
        { en: 'For maintenance, provide the service record, mileage, storage and recent work. Ask the workshop to separate due items from newly diagnosed concerns and to verify the fluid, part and procedure for the fitted vehicle. One advertised package cannot describe every Bentley service.', ar: 'للصيانة، قدم السجل والمسافة وفترات التخزين والأعمال الأخيرة. اطلب فصل البنود المستحقة عن الأعطال المكتشفة حديثاً والتحقق من السائل والقطعة والإجراء المناسب للسيارة. لا يمكن لحزمة معلنة واحدة وصف صيانة كل بنتلي.' },
        { en: 'At DIGI-TEC in Al Quoz, the practical next step is an agreed inspection and itemised scope. Send the exact symptom and vehicle details; a remote description cannot establish which component has failed or the final cost.', ar: 'الخطوة العملية لدى ديجي-تك في القوز هي الاتفاق على فحص ونطاق عمل مفصل. أرسل العَرَض وبيانات السيارة؛ فالوصف عن بُعد لا يحدد القطعة التالفة أو التكلفة النهائية.' },
      ] },
    ],
  },
  Maybach: {
    lead: {
      en: 'A Mercedes-Maybach enquiry needs more than a generic S-Class or GLS service checklist. Identify whether it is an S580, S680, GLS 600 or another Maybach, then describe the rear-cabin, ride, climate, electrical or powertrain concern. The fitted comfort and chassis equipment determines the inspection route.',
      ar: 'يحتاج استفسار مرسيدس-مايباخ إلى أكثر من قائمة صيانة عامة لفئة S أو GLS. حدد ما إذا كانت S580 أو S680 أو GLS 600 أو طرازاً آخر، ثم صف مشكلة المقصورة الخلفية أو الراحة أو التكييف أو الكهرباء أو نظام الدفع. التجهيزات المركبة تحدد مسار الفحص.',
    },
    service: '/brands/maybach-service-dubai', serviceLabel: { en: 'Maybach service options', ar: 'خدمات مايباخ' },
    sections: [
      { title: { en: 'Confirm the Maybach equipment', ar: 'تأكد من تجهيزات مايباخ' }, paragraphs: [
        { en: 'AIRMATIC and E-ACTIVE BODY CONTROL are not interchangeable labels for every Maybach. The exact model, year and specification determine what is fitted. For a ride-height warning or uneven stance, ask for evidence from the fitted system before approving a strut, compressor or control-unit replacement.', ar: 'ليست AIRMATIC وE-ACTIVE BODY CONTROL تسميتين متبادلتين لكل مايباخ. يحدد الطراز والسنة والمواصفات النظام المركب. عند تحذير الارتفاع أو ميل السيارة، اطلب دليل الفحص من النظام الفعلي قبل اعتماد دعامة أو ضاغط أو وحدة تحكم.' },
        { en: 'Rear screens, seat functions and multi-zone climate controls also vary. Explain which function fails, when it fails and whether other cabin features change at the same time; that helps separate a local switch or supply issue from a wider control-system concern.', ar: 'تختلف الشاشات الخلفية ووظائف المقاعد والتكييف متعدد المناطق أيضاً. صف الوظيفة التي تعطلت ووقت ظهور المشكلة وما إذا تغيرت وظائف أخرى؛ فهذا يساعد على التمييز بين خلل مفتاح أو تغذية موضعي ومشكلة نظام تحكم أوسع.' },
      ] },
      { title: { en: 'Keep Mercedes and Maybach tasks distinct', ar: 'ميز بين مهام مرسيدس ومايباخ' }, paragraphs: [
        { en: 'The Mercedes S-Class and GLS resources explain the wider vehicle families. A Maybach booking should stay with the Maybach hub or the relevant Maybach commercial service, because the badge and fitted equipment affect the question being asked. Shared Mercedes systems are useful context, not a reason to merge the owners.', ar: 'تشرح صفحات مرسيدس فئة S وGLS العائلات الأوسع. يبقى حجز مايباخ في مركز مايباخ أو صفحة خدمتها المناسبة، لأن الشعار والتجهيزات يؤثران في المهمة المطلوبة. تشابه بعض أنظمة مرسيدس يوفر سياقاً مفيداً ولا يلغي تمييز الصفحات.' },
        { en: 'Compatible diagnosis or XENTRY access must be confirmed for the exact vehicle and requested function. A fault code does not by itself prove a failed module, and no workshop can promise every coding or programming operation without checking support and access.', ar: 'يجب تأكيد التشخيص المتوافق أو وصول XENTRY للسيارة والوظيفة المطلوبة. رمز العطل وحده لا يثبت تلف وحدة إلكترونية، ولا يمكن وعد كل عمليات الترميز أو البرمجة قبل التحقق من الدعم والوصول.' },
      ] },
      { title: { en: 'Plan maintenance and approval around the car', ar: 'خطط للصيانة والموافقة وفق السيارة' }, paragraphs: [
        { en: 'Send the VIN, year, service history, mileage, use pattern and any warning. Do not apply one Maybach-wide interval, oil grade or cost estimate to S-Class and GLS variants. The workshop should identify due items, inspect the reported concern and separate optional work in an itemised estimate.', ar: 'أرسل رقم الهيكل والسنة وسجل الصيانة والمسافة وطريقة الاستخدام وأي تحذير. لا تطبق موعد صيانة أو درجة زيت أو تقدير تكلفة واحداً على طرازات S وGLS. يجب تحديد البنود المستحقة وفحص المشكلة وفصل الأعمال الاختيارية في عرض مفصل.' },
        { en: 'DIGI-TEC is an independent Al Quoz workshop. Ask it to confirm the first assessment, available diagnostic functions and accepted repair scope before booking. Manufacturer-authorised status and universal programming capability are not claimed.', ar: 'ديجي-تك ورشة مستقلة في القوز. اطلب تأكيد الفحص الأول ووظائف التشخيص المتاحة ونطاق الإصلاح المقبول قبل الحجز. لا تدعي الصفحة اعتماد الشركة المصنعة أو قدرة برمجة شاملة.' },
      ] },
    ],
  },
};

export function B5SelectionGuideBody({ brand, isArabic }: { brand: Brand; isArabic: boolean }) {
  const guide=content[brand];const language=isArabic?'ar':'en';
  return <>
    <section className={`${isArabic ? 'border-r-2 pr-5' : 'border-l-2 pl-5'} border-burnt-orange`}>
      <h2 className="text-2xl font-black sm:text-3xl">{isArabic ? `كيف تختار ورشة ${brand}؟` : `Choosing a ${brand} workshop`}</h2>
      <p className="mt-4 text-lg leading-relaxed text-gray-300">{guide.lead[language]}</p>
    </section>
    {guide.sections.map(section=><section key={section.title.en} className="mt-14">
      <h2 className="text-2xl font-black sm:text-3xl">{section.title[language]}</h2>
      {section.paragraphs.map(paragraph=><p key={paragraph.en} className="mt-4 leading-relaxed text-gray-300">{paragraph[language]}</p>)}
    </section>)}
    <p className="mt-10"><Link to={guide.service} className="font-semibold text-burnt-orange underline underline-offset-4">{guide.serviceLabel[language]}</Link></p>
  </>;
}
