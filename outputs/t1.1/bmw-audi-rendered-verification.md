# T1.1 BMW/Audi rendered-content verification

Checked 2026-10-05 (Asia/Dubai) against the completed local production build. This narrower pass supplements the comprehensive final broad audit in bmw-audi-final-rendered-verification.md, which records the T1.1 copy corrections and verifies all remaining broad matches.

**PASS — positive BMW tuning claims: 0; positive Audi tuning claims: 0.** These are assessed actual results, not inferred zeroes.

Scanned 1256 generated route HTML files, including English/Arabic pages, full visible semantic blocks, main/page context, title/description and schema string fields/FAQ question-answer context. Found 32 full-page same-block broad matches, 0 metadata matches and 2 schema matches. Also reviewed 76 tuning/ECU/programming-keyword blocks on BMW/Audi-owned pages to catch brand context implied by the page heading. These collections overlap; their counts are not added as unique claims. 0 contexts remain unclassified.

All same-block visible matches concern existing repair coding/reset/parts-calibration paragraphs or the service hub's explicit separation of repair brands from tuning coverage. The two schema matches are exactly Audi/BMW Engine & ECU Diagnostics. The four best-workshop-page company footer matches describe general DIGI-TEC capability and make no brand-specific tuning offer. No generic corporate footer or ECU-repair word was automatically treated as a tuning claim.

The exact contexts and classifications are preserved in the JSON/CSV. No unrelated BMW/Audi service, repair, diagnostics, model, article or route architecture was changed for this verification.

## Reviewed sentence contexts

- REPAIR COMPATIBILITY / OEM PROGRAMMING: تحدد بيانات سيارة Audi والنظام المركب والنتائج القطع المناسبة. يتم تأكيد التوافق والمصدر والتوفر وأي وظائف برمجة أو معايرة مطلوبة قبل طلب المكونات.
  Reason: Confirms the installed system, repair findings, parts compatibility, and any required coding/calibration before ordering components. The whole rendered repair paragraph has no performance remap, tuning output, or tuning offer.

- REPAIR SCANNING / PROGRAMMING / RESETS: يتم تأكيد توافق الفحص وقراءة البيانات وأي برمجة أو إعادة ضبط مطلوبة لسيارة Audi المحددة قبل إدراجها في عرض السعر.
  Reason: The exact rendered sentence requires confirmation of inspection, data reading, programming or resets before quotation. This is module/fault-service scope, with no performance-calibration claim.

- REPAIR COMPATIBILITY / OEM PROGRAMMING: تحدد بيانات سيارة BMW والنظام المركب والنتائج القطع المناسبة. يتم تأكيد التوافق والمصدر والتوفر وأي وظائف برمجة أو معايرة مطلوبة قبل طلب المكونات.
  Reason: Confirms the installed system, repair findings, parts compatibility, and any required coding/calibration before ordering components. The whole rendered repair paragraph has no performance remap, tuning output, or tuning offer.

- REPAIR SCANNING / PROGRAMMING / RESETS: يتم تأكيد توافق الفحص وقراءة البيانات وأي برمجة أو إعادة ضبط مطلوبة لسيارة BMW المحددة قبل إدراجها في عرض السعر.
  Reason: The exact rendered sentence requires confirmation of inspection, data reading, programming or resets before quotation. This is module/fault-service scope, with no performance-calibration claim.

- EXPLICIT REPAIR / TUNING SCOPE SEPARATION: يقدم ديجي-تك في القوز، دبي الصيانة الدورية وتغيير الزيت، والتشخيص الإلكتروني، وإصلاح المحرك وناقل الحركة، والفرامل والتعليق والتوجيه، وإصلاح التكييف والكهرباء، والبرمجة والتكويد، وأعمال الهيكل والطلاء، وحماية الطلاء والسيراميك. تشمل علامات الصيانة والإصلاح مرسيدس وبي إم دبليو وأودي وبورشه والسيارات الفاخرة والكهربائية. تُراجع حِزم تطوير الأداء والتغطية بشكل منفصل وفق مهيئ الأداء ومواصفات السيارة.
  Reason: The Arabic paragraph assigns the listed brands to maintenance/repair and separately reviews performance packages against the configurator. It gives no BMW/Audi performance offer.

- EXPLICIT REPAIR / TUNING SCOPE SEPARATION: Digi-Tec in Al Quoz, Dubai covers scheduled servicing and oil changes, electronic diagnostics, engine and transmission repair, brakes, suspension and steering, air conditioning and electrical repair, module coding and programming, body and paint work, paint protection film and ceramic coating. Workshop service and repair brands include Mercedes-Benz, BMW, Audi, Porsche, Ferrari, Lamborghini, Range Rover and luxury electric vehicles. Performance tuning packages and coverage are reviewed separately against the Performance Configurator and exact vehicle specification.
  Reason: The sentence labels BMW/Audi as workshop service and repair brands, then explicitly places tuning coverage under the separate Performance Configurator. Neither brand appears in the tuning dataset. This is not a positive BMW/Audi tuning claim.

- SHARED CORPORATE FOOTER: مركز دبي المتخصص في السيارات الفاخرة وتطوير الأداء، بخبرة تجمع بين الهندسة الدقيقة والخدمة الاحترافية.
  Reason: The generic Arabic company footer describes the workshop overall without a BMW/Audi model or tuning offer. It is not a brand-specific service claim.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: يجب أن يكون اختيار القطع واضحاً. من حقك معرفة ما إذا كانت القطعة أصلية أو مكافئة لمواصفات المصنع أو من سوق البدائل، ولماذا تناسب الإصلاح وما شروط ضمانها. تحتاج مكونات السلامة والإلكترونيات وناقل الحركة والأنظمة الحساسة للبرمجة إلى عناية خاصة في الاختيار.
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: تأكيد القطع والإجراءات والعمالة وأي برمجة أو معايرة مطلوبة ومتاحة قبل الموافقة.
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: تشخيص متقدم وبرمجة وحدات التحكم وإصلاح الأنظمة الكهربائية الحديثة.
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: برمجة وتشخيص السيارات
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: برمجة وحدات التحكم وإعادة الضبط والفحص الرقمي الكامل.
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- SHARED CORPORATE FOOTER: Independent luxury and performance car workshop in Al Quoz, Dubai. Specialist diagnostics, repair, maintenance and performance upgrades since 2002.
  Reason: This shared company footer describes DIGI-TEC overall and does not name BMW/Audi or extend configurator coverage to the current brand page. The actual brand page copy/metadata/schema offers repair and diagnostics. It is retained and identified as a search false positive.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: Can you code a new ECU or module?
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: Car Diagnostics & ECU Programming in Dubai
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- EXISTING DIAGNOSTICS / REPAIR / COMPONENT PROGRAMMING: Vehicle-specific fault scanning, supported ECU functions, resets and digital system inspection in Dubai.
  Reason: Read in its actual brand repair or maintenance context, this concerns fault scanning, OEM functions, coding, resets or selecting repair components. It does not invite a tuning enquiry or advertise power/torque upgrades.

- DIAGNOSTICS SCHEMA: Audi Engine & ECU Diagnostics
  Reason: Service.serviceType identifies ECU diagnostics on the existing engine-diagnostics owner. ECU presence is not an offer of performance tuning.

- DIAGNOSTICS SCHEMA: BMW Engine & ECU Diagnostics
  Reason: Service.serviceType identifies ECU diagnostics on the existing engine-diagnostics owner. ECU presence is not an offer of performance tuning.
