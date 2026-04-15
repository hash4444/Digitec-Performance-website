import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Motor sub-tab data
const motorSubTabs = [
  {
    id: 'motor',
    label: 'Motor',
    content: (
      <div className="space-y-2 text-sm text-white/70">
        <p className="font-semibold text-off-white">GAD M177 447</p>
        <p>Gasoline V8 BiTurbo Displacement 3998 cc</p>
        <p>Power 585–920 hp</p>
        <p>Torque 900–1150 Nm</p>
      </div>
    ),
  },
  {
    id: 'engine-parts',
    label: 'Engine Parts',
    content: (
      <div className="space-y-4 text-sm text-white/70">
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
    ),
  },
  {
    id: 'electronics',
    label: 'Electronics',
    content: (
      <div className="space-y-4 text-sm text-white/70">
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
    ),
  },
  {
    id: 'transmission',
    label: 'Transmission',
    content: (
      <div className="space-y-4 text-sm text-white/70">
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
    ),
  },
  {
    id: 'exhaust',
    label: 'Exhaust System',
    content: (
      <div className="text-sm text-white/70">
        <ul className="space-y-2.5">
          {['Exhaust pipes with catalytic converter and particulate filter for gasoline engines', 'Dual 70mm stainless steel exhaust system with cross flow silencer'].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'fuel',
    label: 'Fuel System',
    content: (
      <div className="text-sm text-white/70">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
          {['Gas tank', 'Gasoline pump', 'Gasoline pump'].map((item, i) => (
            <li key={`${item}-${i}`} className="flex items-start gap-2.5">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-burnt-orange shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
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
            {tab.label}
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
                  label={sub.label}
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
                    {sub.content}
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
              <SubTabButton active={carbonSub === 'pkg1'} label="Carbon Package 1" onClick={() => setCarbonSub('pkg1')} />
              <SubTabButton active={carbonSub === 'pkg2'} label="Carbon Package 2" onClick={() => setCarbonSub('pkg2')} />
            </div>

            <AnimatePresence mode="wait">
              {carbonSub === 'pkg1' && (
                <motion.ul
                  key="pkg1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-white/70"
                >
                  {carbonPackage1.map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </motion.ul>
              )}
              {carbonSub === 'pkg2' && (
                <motion.ul
                  key="pkg2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-white/70"
                >
                  {carbonPackage2.map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </motion.ul>
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
              <SubTabButton active={wheelsSub === 'classic'} label="Classic" onClick={() => setWheelsSub('classic')} />
              <SubTabButton active={wheelsSub === 'ceramic'} label="Carbon Ceramic" onClick={() => setWheelsSub('ceramic')} />
            </div>

            <AnimatePresence mode="wait">
              {wheelsSub === 'classic' && (
                <motion.ul
                  key="classic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2.5 text-sm text-white/70"
                >
                  {brakesClassic.map((item) => (
                    <Bullet key={item}>{item}</Bullet>
                  ))}
                </motion.ul>
              )}
              {wheelsSub === 'ceramic' && (
                <motion.div
                  key="ceramic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-sm text-white/70 space-y-4"
                >
                  <p className="font-semibold text-off-white">{brakesCarbonCeramic.intro}</p>
                  <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5">
                    {brakesCarbonCeramic.parts.map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
                  <ul className="space-y-2.5">
                    {brakesCarbonCeramic.specs.map((item) => (
                      <Bullet key={item}>{item}</Bullet>
                    ))}
                  </ul>
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
