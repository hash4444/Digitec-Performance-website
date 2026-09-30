"""Apply narrowly scoped, reviewed G2 article body changes; metadata retained."""
import json,re
from pathlib import Path
R=Path(__file__).resolve().parents[2]
def p(text):return {'type':'p','text':text}
def h(text):return {'type':'h2','text':text}
def q(text):return {'type':'h3','text':text}
def ul(*items):return {'type':'ul','items':list(items)}
content={
'car-ac-not-cold-dubai-causes':[
p('Warm air and weak airflow are different complaints. Note whether air reaches the vents normally but stays warm, or whether little air comes out even at a higher fan setting. Refrigerant condition, heat exchange, airflow and climate controls may be involved. The symptom alone does not establish a leak or a failed compressor.'),
h('Cooling at speed, at idle or on one side'),
p('Tell the workshop whether cooling changes in traffic, improves while moving, differs between left and right vents, or fades after a period of operation. Record the selected temperature and fan setting. These observations help direct checks of airflow through the heat exchangers, cabin airflow and temperature control; they do not identify one failed part.'),
h('Useful observations before the appointment'),
ul('Describe whether airflow is weak or the air is warm despite normal airflow.','Mention unusual noises or smells and whether they appear only with AC selected.','Explain when the complaint began, including any recent AC work.','Provide the model, year and any dashboard messages. Do not attempt refrigerant handling or touch moving engine-bay components.'),
h('What an AC assessment may include'),
p('DIGI-TEC can discuss an AC inspection covering vent temperature, airflow, accessible components and system operation. Pressure readings, temperature measurements and supported live data are considered together. Cabin filter and blower checks address airflow; refrigerant and leak checks address the refrigerant circuit. The inspection scope depends on the vehicle and findings.'),
h('Why a recharge is not the default answer'),
p('A low charge needs investigation of its amount, service history and possible leakage. Warm air can also occur with a control or airflow fault, so a symptom does not justify a refill. Refrigerant type, quantity and any oil requirement must match the exact vehicle. Replacing a compressor should follow confirmation of the fault and repair scope, not the description “not cold.”'),
h('When to limit driving'),
p('For reduced cabin cooling alone, arrange an AC inspection and avoid journeys where cabin heat would make travel unsafe for occupants. Poor demisting can also affect visibility. If cooling loss occurs with a high-temperature warning, smoke or a burning smell, stop safely and seek assistance rather than treating it as a comfort-only fault. An AC fault on an electrified vehicle does not establish that high-voltage work is available at this workshop.'),
h('FAQs'),q('Why does the AC cool while driving but not at idle?'),p('The operating pattern helps guide airflow, fan, refrigerant and control checks. It does not prove a fan or compressor failure. Describe how quickly the temperature changes and whether an engine-temperature warning also appears.'),
q('Does warm air always mean the AC needs gas?'),p('No. Refrigerant quantity is one check among several. Air distribution, compressor control and airflow can also affect cooling. The system needs assessment before a recharge or replacement decision.'),
q('What is the next step?'),p('Use the AC repair service below to describe the cooling or airflow complaint and arrange an assessment in Al Quoz. The findings establish the proposed repair and quote before work is approved.')],
'engine-overheating-dubai-what-to-do':[
p('An abnormal temperature reading, a high-temperature warning or steam can indicate that the vehicle needs to be stopped safely. Move out of traffic as soon as it is safe, switch off the engine and follow the vehicle handbook. Do not keep driving to test whether the temperature will settle. Arrange assistance if overheating persists or there is steam or significant fluid loss.'),
h('Do not open a hot cooling system'),
p('Keep clear of steam and hot components. Do not remove a coolant cap while the system is hot or pressurised, and do not open the bonnet if steam or smoke makes approaching unsafe. Wait for professional assistance where needed. Turning on the cabin heater is not a substitute for stopping and does not establish that further driving is safe.'),
h('Overheating and coolant loss are different observations'),
p('A leak can exist without a high-temperature reading, and overheating can occur without an obvious puddle. Cooling-system circulation, airflow, coolant loss, temperature measurement and engine operating conditions may be involved. Neither overheating nor the colour of a puddle identifies a failed pump, radiator or head gasket.'),
h('What to tell the workshop'),
ul('The exact warning or gauge behaviour, and whether it appeared in traffic or at road speed.','Whether there was steam, a visible leak, reduced power or another warning.','Any recent cooling-system work or repeated need to add coolant.','The vehicle model, year and powertrain. Record observations only when safe; do not restart solely to reproduce the fault.'),
h('How the cause is investigated'),
p('Once safe and cool, an inspection can compare reported symptoms with coolant level and condition, visible leakage, airflow and supported temperature data. Pressure testing and further circulation or component checks depend on the system and findings. A single symptom or test result is not a blanket head-gasket diagnosis. The mechanical service owner below handles the inspection enquiry and confirmed repair scope.'),
h('When recovery is the appropriate next step'),
p('A continuing high-temperature warning, steam, major fluid loss or abnormal engine operation is a reason to avoid restarting and arrange recovery advice. If an oil-pressure warning also appears while the engine is running, stop safely and switch off rather than assuming a coolant top-up will resolve it. Exact warning instructions vary by vehicle. This generic guide does not replace a manufacturer-specific procedure or imply high-voltage thermal-system repair capability.'),
h('FAQs'),q('Can I drive a short distance after an overheating warning?'),p('Do not assume a short distance is safe. Stop safely and follow the handbook. Continuing overheating, steam or fluid loss requires assistance; a falling gauge alone does not confirm the problem is resolved.'),
q('Why does it happen only in traffic?'),p('Low-speed airflow and fan operation may be relevant, but circulation, coolant condition and other controls can also need checking. The traffic pattern directs inspection rather than confirming one component.'),
q('Does a coolant leak mean the engine is damaged?'),p('Not necessarily. The location, amount of loss, temperature history and test results matter. Keep coolant-loss and engine-damage conclusions separate until the vehicle has been inspected.')],
'check-engine-light-dubai-guide':[
p('A check-engine warning calls for fault investigation. The exact lamp, message, whether it is steady or flashing, and how the car is running all matter. A steady light is not a blanket assurance that driving is safe. Read the vehicle handbook and describe any change in power, vibration, temperature or other warnings when arranging help.'),
h('When to stop and seek assistance'),
p('If the light flashes with severe shaking or reduced power, stop as soon as it is safe and seek assistance. Also stop safely for an accompanying oil-pressure warning, high-temperature warning, smoke or major change in vehicle control. Do not keep restarting or driving to reproduce a severe symptom. Warning behaviour varies by model and powertrain.'),
h('A steady light with no other symptoms'),
p('Arrange prompt diagnostic assessment and follow the handbook for that specific warning. If the car develops rough running, power loss or another warning, reassess the situation rather than relying on the lamp being steady. If you cannot establish that a trip can be made safely, ask for recovery advice. A warning that later disappears can still merit investigation.'),
h('Fault codes are a starting point'),
p('A code describes a condition detected by a control system; it does not by itself prove a failed component. Depending on the vehicle, power supply, wiring, air or fuel delivery, combustion and control-system behaviour may need checking. Avoid clearing codes before assessment because stored information can help establish when the fault occurred.'),
h('Misfire, rough idle and loss of power'),
p('Describe whether shaking occurs while stationary, under acceleration or only at a certain road speed. An engine-running complaint is different from steering-wheel vibration or vibration while braking. Rough idle and power loss guide the diagnostic work, but they do not automatically identify spark plugs, a turbo or a transmission as the cause. Severe running changes with a flashing warning require the stronger stop-and-assistance response above.'),
h('What DIGI-TEC would assess'),
p('Provide the model, year, warning message, operating conditions and recent service history. The diagnostic assessment can review stored information, supported live data and relevant electrical or mechanical checks. Tool access and procedures depend on the vehicle and system. Findings determine whether electrical, mechanical or another repair service is needed; a scan alone is not a parts-replacement instruction.'),
h('FAQs'),q('Does a steady check-engine light mean I can keep driving?'),p('Not by itself. Follow the handbook and consider the way the vehicle is running and any other warning. Seek assistance if there is severe vibration, power loss, overheating, smoke or an oil-pressure warning.'),
q('Does clearing the code repair the fault?'),p('Clearing a code does not establish that the cause has been repaired. Preserve the warning details for the workshop, which can determine whether a fault is active, intermittent or resolved through testing.'),
q('How much will diagnosis cost?'),p('The scope depends on the vehicle, the symptom and the testing required. Contact DIGI-TEC through the diagnostic service below to discuss the assessment and quote; this guide does not offer a free scan or a fixed diagnostic price.')]
}
path=R/'src/data/aiGuidePostsExtra.ts';text=path.read_text(encoding='utf-8')
for slug,blocks in content.items():
 start=text.index("    slug: '"+slug+"'"); a=text.index('    content: [',start); end=text.index('\n  },',a)
 text=text[:a]+'    content: '+json.dumps(blocks,ensure_ascii=False,indent=2)+','+text[end:]
path.write_text(text,encoding='utf-8')
# Arabic adaptations retain existing titles and summaries; add task-specific observations and FAQ.
ar={
'car-ac-not-cold-dubai-causes':[
h('متى يتغير التبريد؟'),p('وضح إن كان الهواء دافئاً مع تدفق طبيعي أم أن التدفق نفسه ضعيف، وهل يتغير الأداء عند الوقوف أو الحركة أو بين جهتي المقصورة. هذه الملاحظات توجه الفحص ولا تثبت عطل الضاغط أو الحاجة إلى تعبئة الغاز.'),
h('متى تتوقف وتطلب المساعدة؟'),p('رتب فحصاً عند ضعف التبريد وحده، وتجنب الرحلات التي تجعل حرارة المقصورة أو ضعف إزالة الضباب القيادة غير آمنة. إذا ظهر تحذير حرارة أو دخان أو رائحة احتراق، توقف بأمان واطلب المساعدة. لا تفترض أن عطل التكييف يثبت توفر إصلاحات الجهد العالي لدى الورشة.'),
h('الأسئلة الشائعة'),q('هل الهواء الدافئ يعني دائماً نقص الغاز؟'),p('لا. تحتاج كمية غاز التبريد والتحكم وتوزيع الهواء إلى فحص حسب السيارة. لا يحدد العَرَض وحده الحاجة إلى التعبئة أو الاستبدال.')],
'engine-overheating-dubai-what-to-do':[
h('الحرارة المرتفعة ليست تشخيصاً لقطعة واحدة'),p('قد يرتبط العَرَض بفقدان السائل أو دورانه أو تدفق الهواء أو قياس الحرارة. قد يوجد تسرب من دون ارتفاع ظاهر في الحرارة، وقد ترتفع الحرارة من دون بركة سائل. لا تثبت هذه العلامات وحدها عطل المضخة أو تلف المحرك.'),
h('معلومات تساعد في الفحص'),p('اذكر نص التحذير وظروف ظهوره وأي بخار أو تسرب أو فقدان قدرة، مع الطراز والسنة وأعمال التبريد السابقة. لا تعِد تشغيل المحرك لمجرد تكرار المشكلة. عند استمرار التحذير أو وجود بخار أو فقدان كبير للسائل، اطلب المساعدة ولا تفترض أن انخفاض المؤشر يعني زوال الخلل.'),
h('الأسئلة الشائعة'),q('هل يمكن فتح غطاء سائل التبريد بعد التوقف مباشرة؟'),p('لا تفتح الغطاء والنظام ساخن أو مضغوط، وابتعد عن البخار والمكونات الساخنة. اتبع دليل السيارة واطلب المساعدة إذا لم يكن الاقتراب آمناً.'),q('هل تحذير ضغط الزيت جزء من مشكلة التبريد؟'),p('لا تفترض ذلك. إذا ظهر تحذير ضغط الزيت والمحرك يعمل، توقف بأمان وأطفئ المحرك واتبع تعليمات السيارة. تعبئة سائل التبريد ليست حلاً مفترضاً لهذا التحذير.')],
'check-engine-light-dubai-guide':[
h('ثبات اللمبة لا يضمن سلامة القيادة'),p('راجع دليل السيارة وحالتها الفعلية. عند الوميض مع اهتزاز شديد أو فقدان قدرة، أو مع تحذير حرارة أو ضغط زيت أو دخان، توقف بأمان واطلب المساعدة. لا تواصل القيادة لمجرد أن اللمبة ثابتة، ولا تكرر التشغيل لاختبار عَرَض شديد.'),
h('تمييز الاهتزاز وفقدان القدرة'),p('اذكر إن كان الاهتزاز أثناء الوقوف أو التسارع أو عند سرعة معينة أو الفرملة. اختلاف السياق قد يوجه الفحص إلى أنظمة مختلفة، ولا يثبت وحده عطل شمعات الإشعال أو التيربو أو ناقل الحركة. تبدأ الخطوة التالية بفحص وتشخيص متوافق مع السيارة قبل اقتراح إصلاح.'),
h('الأسئلة الشائعة'),q('هل مسح رمز العطل يصلح المشكلة؟'),p('مسح الرمز لا يثبت إصلاح السبب. احتفظ بتفاصيل التحذير وظروف ظهوره ليتمكن الفحص من تقييم المشكلة.'),q('هل توجد تكلفة واحدة للتشخيص؟'),p('يعتمد نطاق الفحص والتكلفة على السيارة والعَرَض والاختبارات المطلوبة. ناقش التقييم وعرض السعر مع ديجي-تك؛ لا يتضمن هذا الدليل وعداً بفحص مجاني.')]
}
path=R/'src/i18n/ar-general-blog-content.ts';text=path.read_text(encoding='utf-8')
for slug,blocks in ar.items():
 start=text.index("  '"+slug+"': guide(");end=text.index('\n    ],',start)
 text=text[:end]+',\n'.join('      '+json.dumps(b,ensure_ascii=False) for b in blocks)+',\n'+text[end:]
path.write_text(text,encoding='utf-8')
