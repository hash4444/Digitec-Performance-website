type GuideLink = { href: string; label: string };
type MaintenanceGuide = {
  title: string;
  metaTitle: string;
  description: string;
  sections: { heading: string; text: string; items?: string[]; links?: GuideLink[] }[];
  faqs: { question: string; answer: string }[];
  related: GuideLink[];
};

export const MERCEDES_MAINTENANCE_UPDATED = '2026-09-28';

/** Planning guidance for the existing EN/AR article, separate from service booking. */
export const mercedesMaintenanceGuide: Record<'en' | 'ar', MaintenanceGuide> = {
  en: {
    title: 'Mercedes-Benz Maintenance Planning for Dubai Owners',
    metaTitle: 'Mercedes Maintenance Planning Dubai | Owner Guide',
    description: 'Build a Mercedes maintenance plan from service records, vehicle condition and Dubai use. Separate due work, warning signs and items to monitor.',
    sections: [
      {
        heading: 'Start with a record of the car you own',
        text: 'A useful maintenance plan brings the vehicle information, completed work and current condition together. It helps you decide what is due, what needs investigation and what can be monitored. Start with the VIN, model year, engine and fitted equipment; C-Class, E-Class, S-Class, GLE, GLS, G-Class and AMG versions do not all share the same service requirements.',
        items: ['Keep invoices with dates, mileages, parts and fluid specifications.', 'Record the complete service-display message and current mileage.', 'List previous repairs, modifications and concerns that remain unresolved.', 'Note regular short trips, prolonged parking, towing or other demanding use.'],
      },
      {
        heading: 'Separate scheduled work from a new fault',
        text: 'Use the applicable service schedule, ASSYST information and completed-work records to identify due maintenance. Keep a separate list of warning lights, leaks, noises or changes in operation. A service reminder does not diagnose a fault, and an oil change does not automatically resolve one. Follow the handbook instructions for a warning that calls for stopping or urgent assistance.',
        links: [{ href: '/blog/mercedes-service-intervals-dubai-heat', label: 'Interpret ASSYST and service intervals' }, { href: '/mercedes/problems', label: 'Find the guide for a Mercedes warning or symptom' }],
      },
      {
        heading: 'Use Dubai driving conditions to focus the review',
        text: 'Describe the way the car is used, rather than applying one Dubai mileage rule. Difficult operating conditions may require more frequent work under the guidance for the exact vehicle. Discuss cooling and AC performance, battery condition, tyres, brakes and any fluid loss. The recommendation should explain whether it follows the schedule, an operating-condition requirement or an inspection finding.',
        items: ['Mention cooling or AC changes in traffic and on longer journeys.', 'Describe starting difficulty after parking and any repeat discharge.', 'Record fluid top-ups and changes in consumption; do not hide a repeated loss with top-ups alone.', 'Ask which items need action now and which should be reviewed at an agreed date or mileage.'],
      },
      {
        heading: 'Plan around incomplete history and periods of storage',
        text: 'For a recently purchased car, compare the available records with the applicable schedule before repeating or deferring work. Mark missing history as unknown, not as proof that everything is overdue or already complete. After a long period parked, discuss the manufacturer storage guidance and a condition review before returning to regular use. Low mileage alone does not establish the condition of tyres, fluids or the battery.',
        links: [{ href: '/blog/pre-purchase-inspection-dubai-guide', label: 'Prepare for a used-car condition inspection' }],
      },
      {
        heading: 'Keep the plan specific to the fitted systems',
        text: 'Confirm the engine and oil approval before oil service, the gearbox before transmission work and the installed suspension before any chassis recommendation. AIRMATIC applies only where fitted; it is not a description of every Mercedes suspension. Combustion, hybrid and fully electric vehicles also have different maintenance tasks. Confirm acceptance and the requested work for the exact vehicle before booking.',
        links: [{ href: '/blog/best-oil-change-dubai-mercedes', label: 'Compare an oil-service proposal' }],
      },
      {
        heading: 'Turn the findings into a written maintenance plan',
        text: 'Ask for due maintenance, fault diagnosis, confirmed repairs and monitoring items to be listed separately. Agree the parts and fluid specifications, included checks and approval process for additional work. After the visit, keep the invoice and findings with the date and mileage. Confirm any relevant service reminder is reset only for completed work, and record the next review point and any declined or pending items.',
        links: [{ href: '/blog/mercedes-service-cost-dubai-guide', label: 'Compare Service A/B scope and cost factors' }, { href: '/brands/mercedes-benz-service-dubai', label: 'Discuss the plan and book Mercedes service' }],
      },
    ],
    faqs: [
      { question: 'What if my Mercedes has no complete service history?', answer: 'Gather the invoices and service information available, then compare them with the requirements for the exact vehicle. A workshop can identify confirmed work, gaps in the record and items needing inspection before recommending catch-up maintenance.' },
      { question: 'Does low mileage mean I can postpone maintenance?', answer: 'Mileage is only part of the plan. Check time-based requirements, storage guidance and the actual condition of the car. A service reminder or low odometer reading does not replace that review.' },
      { question: 'Should every inspection finding become an immediate repair?', answer: 'Ask which finding is confirmed, what makes it urgent and what can reasonably be monitored. Request the next review point and the warning signs that should bring the car back sooner. Follow any immediate-action instructions for a safety warning.' },
      { question: 'What records should I keep after the appointment?', answer: 'Keep the dated invoice, mileage, parts and fluid details, completed checks, diagnosis findings and any outstanding recommendations. The records should distinguish work performed from quotations or work that was declined.' },
    ],
    related: [{ href: '/blog/mercedes-service-intervals-dubai-heat', label: 'ASSYST and service scheduling' }, { href: '/blog/mercedes-service-cost-dubai-guide', label: 'Service scope and quote comparison' }, { href: '/blog/mercedes-repair-dubai-complete-guide', label: 'Mercedes warning-sign overview' }],
  },
  ar: {
    title: 'دليل تخطيط صيانة مرسيدس لمالكي السيارات في دبي',
    metaTitle: 'تخطيط صيانة مرسيدس في دبي | دليل المالك',
    description: 'نظّم صيانة مرسيدس وفق سجل السيارة وحالتها واستخدامها في دبي، وافصل بين الأعمال المستحقة والأعطال والبنود التي تحتاج إلى متابعة.',
    sections: [
      {
        heading: 'ابدأ بملف واضح للسيارة',
        text: 'تجمع خطة الصيانة المفيدة بيانات السيارة والأعمال المنفذة والحالة الحالية، حتى تعرف ما استحق وما يحتاج إلى تشخيص وما يمكن متابعته. سجّل رقم الهيكل وسنة الصنع والمحرك والتجهيزات؛ لا تتطابق متطلبات C-Class وE-Class وS-Class وGLE وGLS وG-Class ونسخ AMG في كل التفاصيل.',
        items: ['احتفظ بفواتير التاريخ والمسافة والقطع ومواصفات السوائل.', 'صوّر رسالة الخدمة كاملة وسجّل المسافة الحالية.', 'دوّن الإصلاحات والتعديلات السابقة والملاحظات التي لم تُحل.', 'اشرح الرحلات القصيرة والتوقف الطويل والقطر أو ظروف الاستخدام المجهدة.'],
      },
      {
        heading: 'افصل الصيانة الدورية عن ظهور عطل جديد',
        text: 'تُحدد الأعمال المستحقة من جدول السيارة ومعلومات ASSYST وسجل ما أُنجز. ضع التحذيرات والتسربات والأصوات وتغير الأداء في قائمة منفصلة. تذكير الخدمة لا يشخّص عطلاً، وتغيير الزيت لا يعالج كل تحذير. اتبع تعليمات دليل السيارة إذا طلبت الرسالة التوقف أو المساعدة العاجلة.',
        links: [{ href: '/blog/mercedes-service-intervals-dubai-heat', label: 'فهم مواعيد الخدمة ورسائل ASSYST' }, { href: '/blog/mercedes-repair-dubai-complete-guide', label: 'دليل أعراض وتحذيرات مرسيدس' }],
      },
      {
        heading: 'اربط المراجعة بالاستخدام الفعلي في دبي',
        text: 'اشرح طريقة استخدام السيارة بدلاً من اعتماد مسافة واحدة لكل سيارات دبي. قد تستلزم الظروف المجهدة صيانة أكثر تكراراً وفق إرشادات السيارة المحددة. ناقش التبريد والتكييف والبطارية والإطارات والفرامل وأي نقص سوائل. يجب أن تبين التوصية هل مصدرها الجدول أم متطلبات التشغيل أم نتيجة فحص.',
        items: ['اذكر تغير التبريد أو التكييف في الزحام والرحلات الطويلة.', 'اشرح صعوبة التشغيل بعد الوقوف أو تكرر تفريغ البطارية.', 'دوّن إضافة السوائل وتغير استهلاكها، واطلب تحديد سبب النقص المتكرر.', 'اطلب فصل البنود العاجلة عما يحتاج إلى متابعة في تاريخ أو مسافة محددة.'],
      },
      {
        heading: 'تعامل مع السجل الناقص والتخزين بخطة مناسبة',
        text: 'عند شراء سيارة مستعملة، قارن الفواتير المتاحة بالجدول قبل تكرار أعمال أو تأجيلها. السجل المفقود يعني أن العمل غير مؤكد، لا أنه أُنجز أو أن كل شيء متأخر. بعد التخزين الطويل، راجع إرشادات الشركة وحالة السيارة قبل العودة إلى الاستخدام المنتظم؛ قلة المسافة وحدها لا تثبت سلامة الإطارات والسوائل والبطارية.',
        links: [{ href: '/blog/pre-purchase-inspection-dubai-guide', label: 'الاستعداد لفحص سيارة مستعملة قبل الشراء' }],
      },
      {
        heading: 'حدّد التجهيزات قبل اختيار أعمال الصيانة',
        text: 'أكد المحرك وموافقة الزيت قبل خدمته، ونوع ناقل الحركة قبل أعماله، ونظام التعليق المركب قبل اقتراح إصلاح. ينطبق AIRMATIC على السيارات المزودة به فقط. كذلك تختلف مهام سيارات الاحتراق والهجينة والكهربائية بالكامل. أكد قبول السيارة ونطاق العمل المطلوب قبل الحجز.',
        links: [{ href: '/blog/best-oil-change-dubai-mercedes', label: 'معايير اختيار خدمة زيت مرسيدس' }],
      },
      {
        heading: 'حوّل نتائج المراجعة إلى سجل قابل للمتابعة',
        text: 'اطلب فصل الصيانة المستحقة والتشخيص والإصلاح المؤكد والبنود التي ستُراقب. اتفق على مواصفات القطع والسوائل والفحوص وطريقة اعتماد أي عمل إضافي. بعد الزيارة، احفظ الفاتورة والنتائج والتاريخ والمسافة، وتأكد من ربط إعادة تذكير الخدمة بالعمل المكتمل. سجّل موعد المتابعة والأعمال المعلقة أو التي لم تعتمدها.',
        links: [{ href: '/blog/mercedes-service-cost-dubai-guide', label: 'مقارنة نطاق وتكلفة Service A وService B' }, { href: '/brands/mercedes-benz-service-dubai', label: 'مناقشة الخطة وحجز صيانة مرسيدس' }],
      },
    ],
    faqs: [
      { question: 'ماذا أفعل إذا كان سجل صيانة مرسيدس غير مكتمل؟', answer: 'اجمع الفواتير ومعلومات الخدمة المتاحة وقارنها بمتطلبات السيارة المحددة. تساعد المراجعة في فصل العمل المؤكد عن الفجوات والبنود التي تحتاج إلى فحص قبل اعتماد صيانة استدراكية.' },
      { question: 'هل تسمح قلة المسافة بتأجيل الصيانة؟', answer: 'المسافة عامل واحد؛ راجع المتطلبات المرتبطة بالوقت وإرشادات التخزين والحالة الفعلية. لا يغني رقم العداد أو تذكير الخدمة وحده عن هذه المراجعة.' },
      { question: 'هل كل ملاحظة في الفحص تستدعي إصلاحاً فورياً؟', answer: 'اسأل عما تأكد وما الذي يجعله عاجلاً وما يمكن مراقبته. اطلب موعد المراجعة والعلامات التي تستدعي العودة مبكراً، مع الالتزام بتعليمات التصرف الفوري عند تحذيرات السلامة.' },
      { question: 'ما الوثائق التي أحتفظ بها بعد الزيارة؟', answer: 'احفظ الفاتورة المؤرخة والمسافة ومواصفات القطع والسوائل والفحوص المنفذة ونتائج التشخيص والتوصيات المعلقة. افصل العمل المنفذ عن عروض السعر والأعمال التي لم تعتمدها.' },
    ],
    related: [{ href: '/blog/mercedes-service-intervals-dubai-heat', label: 'مواعيد الصيانة وASSYST' }, { href: '/blog/mercedes-service-cost-dubai-guide', label: 'مقارنة نطاق الخدمة وعرض السعر' }, { href: '/blog/mercedes-repair-dubai-complete-guide', label: 'أعراض وتحذيرات مرسيدس' }],
  },
};
