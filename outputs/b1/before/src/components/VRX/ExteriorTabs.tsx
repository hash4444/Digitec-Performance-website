import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/i18n/use-locale';

// Motor sub-tab data
const motorSubTabs = [
  {
    id: 'motor',
    label: 'Motor',
    content: (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
        <div className="flex-1 space-y-2">
          <p className="font-semibold text-off-white">GAD M177 447</p>
          <p>Gasoline V8 BiTurbo Displacement 3998 cc</p>
          <p>Power 585–920 hp</p>
          <p>Torque 900–1150 Nm</p>
        </div>
        <img src="/images/vrx-motor.png" alt="GAD Motors VRX Engine" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
      </div>
    ),
  },
  {
    id: 'engine-parts',
    label: 'Engine Parts',
    content: (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
        <div className="flex-1 space-y-4">
          <p className="font-semibold text-off-white">Engine Parts</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {['Sump', 'Engine mounts', 'Oil pump suction pipe', 'Engine gasket set', 'Lambda sensors', 'Various accessories', 'Generator', 'Starter', 'Oil cooler', 'Compressor intercooler LS2', 'Low temperature cooler'].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-white/50">LS2 compressor intercooler, low temperature cooler</p>
        </div>
        <img src="/images/vrx-engine-bay.png" alt="VRX Engine Bay" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
      </div>
    ),
  },
  {
    id: 'electronics',
    label: 'Electronics',
    content: (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
        <div className="flex-1 space-y-4">
          <p className="font-semibold text-off-white">Engine Control Unit</p>
          <ul className="space-y-2.5">
            {['New control unit', 'Software for CPC control unit + software for the transmission'].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <img src="/images/vrx-engine-bay.png" alt="VRX Engine Bay" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
      </div>
    ),
  },
  {
    id: 'transmission',
    label: 'Transmission',
    content: (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
        <div className="flex-1 space-y-4">
          <p className="font-semibold text-off-white">Transmission</p>
          <p>9 speed TCT Tronic<br />transmission booster NAG 3</p>
          <ul className="space-y-2.5">
            {['Manual transmission booster', 'Gearbox amplification up to approx. 1100 Nm'].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <img src="/images/vrx-transmission.png" alt="VRX Transmission" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
      </div>
    ),
  },
  {
    id: 'exhaust',
    label: 'Exhaust System',
    content: (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
        <div className="flex-1">
          <ul className="space-y-2.5">
            {['Exhaust pipes with catalytic converter and particulate filter for gasoline engines', 'Dual 70mm stainless steel exhaust system with cross flow silencer'].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <img src="/images/vrx-exhaust.png" alt="VRX Exhaust System" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
      </div>
    ),
  },
  {
    id: 'fuel',
    label: 'Fuel System',
    content: (
      <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
        <div className="flex-1">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
            {['Gas tank', 'Gasoline pump', 'Gasoline pump'].map((item, i) => (
              <li key={`${item}-${i}`} className="flex items-start gap-2.5">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <img src="/images/vrx-fuel.png" alt="VRX Fuel System" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
      </div>
    ),
  },
];

const carbonPackage1 = [
  'Left front side spoiler',
  'Right front side spoiler',
  'Right front spoiler fairing',
  'Front license plate cover',
  'Middle anterior lip',
  'Left front lip',
  'Right front lip',
  'Rear diffuser',
];

const carbonPackage2 = [
  'Rear left fender',
  'Rear right fender',
  'Front left fender (lower area)',
  'Tailgate trim',
  'Engine cover',
  'Hood (lower area)',
  'Front bumper extension, right side',
  'Front bumper extension',
  'Front right fender',
  'Front bumper extension, left',
  'Assembly and painting',
];

const brakesClassic = [
  '6 piston fixed caliper brake for the front axle with steel brake discs, diameter 390 mm.',
  '4 piston fixed caliper brake for the rear axle with steel brake discs, diameter 360 mm.',
];

const brakesCarbonCeramic = {
  intro: 'Carbon ceramic braking system',
  parts: ['Brake discs', 'Brake pads', 'Brake caliper', 'Brake caliper bracket'],
  specs: [
    '6 piston fixed caliper brake for the front axle with 402 mm carbon ceramic brake discs.',
    '4 piston fixed caliper brake for the rear axle with 360 mm carbon ceramic brake discs.',
  ],
};

const mainTabs = [
  { id: 'motor', label: 'Motor' },
  { id: 'carbon', label: 'Carbon Package' },
  { id: 'wheels', label: 'Wheels' },
];

const arMainTabLabels: Record<string, string> = { motor: 'المحرك', carbon: 'حزمة الكربون', wheels: 'العجلات والفرامل' };
const arMotorTabLabels: Record<string, string> = { motor: 'المحرك', 'engine-parts': 'قطع المحرك', electronics: 'الإلكترونيات', transmission: 'ناقل الحركة', exhaust: 'نظام العادم', fuel: 'نظام الوقود' };
const arCarbonPackage1 = ['جناح جانبي أمامي أيسر', 'جناح جانبي أمامي أيمن', 'غطاء الجناح الأمامي الأيمن', 'غطاء لوحة الأرقام الأمامية', 'الشفة الأمامية الوسطى', 'الشفة الأمامية اليسرى', 'الشفة الأمامية اليمنى', 'مشتت الهواء الخلفي'];
const arCarbonPackage2 = ['رفرف خلفي أيسر', 'رفرف خلفي أيمن', 'الجزء السفلي من الرفرف الأمامي الأيسر', 'تزيين باب الصندوق', 'غطاء المحرك', 'الجزء السفلي من غطاء المحرك', 'امتداد الصدام الأمامي الأيمن', 'امتداد الصدام الأمامي', 'الرفرف الأمامي الأيمن', 'امتداد الصدام الأمامي الأيسر', 'التركيب والطلاء'];
const arBrakesClassic = ['كليبر ثابت بست مكابس للمحور الأمامي مع أقراص فرامل فولاذية بقطر 390 مم.', 'كليبر ثابت بأربع مكابس للمحور الخلفي مع أقراص فرامل فولاذية بقطر 360 مم.'];
const arBrakesCarbonCeramic = {
  intro: 'نظام فرامل كربون سيراميك',
  parts: ['أقراص الفرامل', 'فحمات الفرامل', 'كليبر الفرامل', 'حامل كليبر الفرامل'],
  specs: ['كليبر ثابت بست مكابس للمحور الأمامي مع أقراص كربون سيراميك بقطر 402 مم.', 'كليبر ثابت بأربع مكابس للمحور الخلفي مع أقراص كربون سيراميك بقطر 360 مم.'],
};

const ArabicMotorContent = ({ id }: { id: string }) => {
  if (id === 'motor') return (
    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
      <div className="flex-1 space-y-2"><p className="font-semibold text-off-white">GAD M177 447</p><p>محرك بنزين V8 ثنائي التيربو بسعة 3998 سم³</p><p>القوة 585–920 حصاناً</p><p>العزم 900–1150 نيوتن متر</p></div>
      <img src="/images/vrx-motor.png" alt="محرك GAD Motors VRX" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
    </div>
  );
  if (id === 'engine-parts') return (
    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70">
      <div className="flex-1 space-y-4"><p className="font-semibold text-off-white">قطع المحرك</p><ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">{['حوض الزيت', 'قواعد المحرك', 'أنبوب سحب مضخة الزيت', 'طقم جوانات المحرك', 'حساسات الأكسجين', 'ملحقات متنوعة', 'الدينمو', 'بادئ التشغيل', 'مبرد الزيت', 'إنتركولر ضاغط LS2', 'مبرد منخفض الحرارة'].map((item) => <li key={item} className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" /><span>{item}</span></li>)}</ul><p className="text-white/50">إنتركولر ضاغط LS2 ومبرد منخفض الحرارة</p></div>
      <img src="/images/vrx-engine-bay.png" alt="حجرة محرك VRX" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
    </div>
  );
  if (id === 'electronics') return (
    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70"><div className="flex-1 space-y-4"><p className="font-semibold text-off-white">وحدة التحكم بالمحرك</p><ul className="space-y-2.5">{['وحدة تحكم جديدة', 'برمجيات وحدة CPC وبرمجيات ناقل الحركة'].map((item) => <li key={item} className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" /><span>{item}</span></li>)}</ul></div><img src="/images/vrx-engine-bay.png" alt="إلكترونيات محرك VRX" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" /></div>
  );
  if (id === 'transmission') return (
    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70"><div className="flex-1 space-y-4"><p className="font-semibold text-off-white">ناقل الحركة</p><p>ناقل TCT Tronic بتسع سرعات<br />معزز ناقل الحركة NAG 3</p><ul className="space-y-2.5">{['تعزيز يدوي لناقل الحركة', 'تعزيز ناقل الحركة حتى نحو 1100 نيوتن متر'].map((item) => <li key={item} className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" /><span>{item}</span></li>)}</ul></div><img src="/images/vrx-transmission.png" alt="ناقل حركة VRX" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" /></div>
  );
  if (id === 'exhaust') return (
    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70"><div className="flex-1"><ul className="space-y-2.5">{['أنابيب عادم مع محول حفاز وفلتر جسيمات لمحركات البنزين', 'نظام عادم مزدوج من الفولاذ المقاوم للصدأ بقطر 70 مم وكاتم بتدفق متقاطع'].map((item) => <li key={item} className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" /><span>{item}</span></li>)}</ul></div><img src="/images/vrx-exhaust.png" alt="نظام عادم VRX" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" /></div>
  );
  return (
    <div className="flex flex-col md:flex-row gap-6 text-sm text-white/70"><div className="flex-1"><ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">{['خزان الوقود', 'مضخة الوقود', 'مضخة وقود إضافية'].map((item) => <li key={item} className="flex items-start gap-2.5"><span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" /><span>{item}</span></li>)}</ul></div><img src="/images/vrx-fuel.png" alt="نظام وقود VRX" className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" /></div>
  );
};

interface Props {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-2.5">
    <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
    <span>{children}</span>
  </li>
);

const SubTabButton = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-sm sm:text-base font-bold uppercase tracking-wider transition-all duration-300 pb-1 ${
      active ? 'text-burnt-orange border-b-2 border-burnt-orange' : 'text-white/30 hover:text-white/50'
    }`}
  >
    {label}
  </button>
);

const ExteriorTabs = ({ activeTab, setActiveTab }: Props) => {
  const { isArabic } = useLocale();
  const [carbonSub, setCarbonSub] = useState<'pkg1' | 'pkg2'>('pkg1');
  const [wheelsSub, setWheelsSub] = useState<'classic' | 'ceramic'>('classic');
  const [motorSub, setMotorSub] = useState('motor');

  return (
    <>
      <div className="flex justify-center gap-3 mb-6">
        {mainTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-2xl text-sm font-semibold transition-all duration-300 px-[30px] mx-0 py-[10px] text-center ${
              activeTab === tab.id
                ? 'bg-burnt-orange text-black'
                : 'bg-white/[0.04] text-white/50 border border-white/[0.06] hover:border-white/10 hover:text-white/70'
            }`}
          >
            {isArabic ? arMainTabLabels[tab.id] : tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Motor */}
        {activeTab === 'motor' && (
          <motion.div
            key="motor"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-6">
              {motorSubTabs.map((sub) => (
                <SubTabButton
                  key={sub.id}
                  active={motorSub === sub.id}
                  label={isArabic ? arMotorTabLabels[sub.id] : sub.label}
                  onClick={() => setMotorSub(sub.id)}
                />
              ))}
            </div>
            <AnimatePresence mode="wait">
              {motorSubTabs.map((sub) =>
                motorSub === sub.id ? (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isArabic ? <ArabicMotorContent id={sub.id} /> : sub.content}
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Carbon Package */}
        {activeTab === 'carbon' && (
          <motion.div
            key="carbon"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex gap-6 mb-6">
              <SubTabButton active={carbonSub === 'pkg1'} label={isArabic ? 'حزمة الكربون 1' : 'Carbon Package 1'} onClick={() => setCarbonSub('pkg1')} />
              <SubTabButton active={carbonSub === 'pkg2'} label={isArabic ? 'حزمة الكربون 2' : 'Carbon Package 2'} onClick={() => setCarbonSub('pkg2')} />
            </div>

            <AnimatePresence mode="wait">
              {carbonSub === 'pkg1' && (
                <motion.div
                  key="pkg1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col md:flex-row gap-6 text-sm text-white/70"
                >
                  <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {(isArabic ? arCarbonPackage1 : carbonPackage1).map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                  <img src="/images/vrx-carbon-parts.png" alt={isArabic ? 'حزمة كربون VRX' : 'VRX Carbon Package'} className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
                </motion.div>
              )}
              {carbonSub === 'pkg2' && (
                <motion.div
                  key="pkg2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col md:flex-row gap-6 text-sm text-white/70"
                >
                  <ul className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                    {(isArabic ? arCarbonPackage2 : carbonPackage2).map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                  <img src="/images/vrx-carbon-parts.png" alt={isArabic ? 'حزمة كربون VRX' : 'VRX Carbon Package'} className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Wheels */}
        {activeTab === 'wheels' && (
          <motion.div
            key="wheels"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex gap-6 mb-6">
              <SubTabButton active={wheelsSub === 'classic'} label={isArabic ? 'قياسية' : 'Classic'} onClick={() => setWheelsSub('classic')} />
              <SubTabButton active={wheelsSub === 'ceramic'} label={isArabic ? 'كربون سيراميك' : 'Carbon Ceramic'} onClick={() => setWheelsSub('ceramic')} />
            </div>

            <AnimatePresence mode="wait">
              {wheelsSub === 'classic' && (
                <motion.div
                  key="classic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col md:flex-row gap-6 text-sm text-white/70"
                >
                  <ul className="flex-1 space-y-2.5">
                    {(isArabic ? arBrakesClassic : brakesClassic).map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                  <img src="/images/vrx-wheels-classic.png" alt={isArabic ? 'فرامل VRX القياسية' : 'VRX Classic Brakes'} className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
                </motion.div>
              )}
              {wheelsSub === 'ceramic' && (
                <motion.div
                  key="ceramic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col md:flex-row gap-6 text-sm text-white/70"
                >
                  <div className="flex-1 space-y-4">
                    <p className="font-semibold text-off-white">{isArabic ? arBrakesCarbonCeramic.intro : brakesCarbonCeramic.intro}</p>
                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                      {(isArabic ? arBrakesCarbonCeramic.parts : brakesCarbonCeramic.parts).map((item) => (
                        <Bullet key={item}>{item}</Bullet>
                      ))}
                    </ul>
                    <ul className="space-y-2.5">
                      {(isArabic ? arBrakesCarbonCeramic.specs : brakesCarbonCeramic.specs).map((item) => (
                        <Bullet key={item}>{item}</Bullet>
                      ))}
                    </ul>
                  </div>
                  <img src="/images/vrx-wheels-ceramic.png" alt={isArabic ? 'فرامل VRX الكربون سيراميك' : 'VRX Carbon Ceramic Brakes'} className="w-full md:w-64 lg:w-72 h-auto rounded-2xl object-cover shrink-0" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExteriorTabs;
