import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tuningCars, stageLabels, type Stage, type TuningCar } from '@/data/tuningCars';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap, Gauge, Timer, Wrench, Clock, DollarSign, Crown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocale } from '@/i18n/use-locale';
import { arTuning, arabicStageLabels, localizeDuration, localizeTuningMod } from '@/i18n/ar-tuning';

// ─── Animated Stat ───
function AnimatedStat({ label, value, unit, icon: Icon, gain }: {
  label: string; value: number; unit: string; icon: React.ElementType; gain?: number;
}) {
  const display = useAnimatedCounter(value, 700, unit === 's' ? 1 : 0);
  return (
    <div className="flex min-w-52 flex-col items-center border-y border-white/[0.1] px-6 py-5 md:py-6">
      <Icon className="w-5 h-5 text-burnt-orange mb-2" />
      <span className="text-xs uppercase tracking-widest text-white/40 mb-1">{label}</span>
      <span className="text-3xl font-semibold tracking-[-0.04em] text-off-white tabular-nums md:text-4xl">
        {display}
        <span className="text-lg ml-1 text-white/50">{unit}</span>
      </span>
      {gain !== undefined && gain !== 0 && (
        <span className={`text-sm mt-1 font-semibold ${gain > 0 ? 'text-burnt-orange' : 'text-green-400'}`}>
          {gain > 0 ? '+' : ''}{gain}{unit === 's' ? 's' : ` ${unit}`}
        </span>
      )}
    </div>
  );
}

// ─── Car Selector ───
function CarSelector({ cars, selectedIndex, onSelect, isArabic }: {
  cars: TuningCar[]; selectedIndex: number; onSelect: (i: number) => void; isArabic: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;
    const childCenter = child.offsetLeft + child.offsetWidth / 2;
    el.scrollTo({ left: childCenter - el.clientWidth / 2, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToIndex(selectedIndex);
  }, [selectedIndex, scrollToIndex]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.pageX, scrollLeft: scrollRef.current?.scrollLeft || 0 };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = e.pageX - dragStart.current.x;
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const handleMouseUp = () => setIsDragging(false);

  const prev = () => onSelect(Math.max(0, selectedIndex - 1));
  const next = () => onSelect(Math.min(cars.length - 1, selectedIndex + 1));

  return (
    <div className="relative">
      <button aria-label={isArabic ? arTuning.configurator.previous : 'Previous car'} onClick={prev} className="absolute left-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151617] text-white/60 transition-colors hover:border-white/30 hover:text-white md:left-4 md:h-10 md:w-10">
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>
      <button aria-label={isArabic ? arTuning.configurator.next : 'Next car'} onClick={next} className="absolute right-1 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#151617] text-white/60 transition-colors hover:border-white/30 hover:text-white md:right-4 md:h-10 md:w-10">
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 py-6 md:py-8 px-[35%] md:px-[40%] cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {cars.map((car, i) => {
          const isSelected = i === selectedIndex;
          return (
            <div
              key={car.id}
              onClick={() => onSelect(i)}
              className="flex w-[220px] flex-shrink-0 cursor-pointer flex-col items-center transition-all duration-500 sm:w-[280px]"
            >
              <div className={`relative transition-all duration-500 ${isSelected ? 'scale-105' : 'scale-[0.82] opacity-35'}`}>
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-48 h-28 md:w-64 md:h-40 object-contain drop-shadow-2xl"
                  loading="lazy"
                  draggable={false}
                />
              </div>
              <AnimatePresence mode="wait">
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-3 text-center"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-burnt-orange font-medium">{car.brand}</p>
                    <h3 className="text-xl md:text-2xl font-bold text-off-white mt-1">{car.name}</h3>
                    <p className="text-xs text-white/30 mt-0.5">{car.engine}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-1 md:gap-1.5 mt-2 flex-wrap px-4">
        {cars.map((_, i) => (
          <button
            key={i}
            aria-label={isArabic ? `اختر السيارة رقم ${i + 1}` : `Select car ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex ? 'bg-burnt-orange w-4 md:w-6' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Stage Selector ───
function StageSelector({ stages, active, onChange, isArabic }: { stages: Stage[]; active: Stage; onChange: (s: Stage) => void; isArabic: boolean }) {
  return (
    <div className="mx-4 flex flex-wrap items-center justify-center gap-1 border-y border-white/[0.08] p-1.5 md:mx-auto md:w-fit md:gap-2">
      {stages.map((stage) => {
        const isActive = stage === active;
        const isVip = stage === 'vip';
        return (
          <button
            key={stage}
            onClick={() => onChange(stage)}
            className={`relative px-2.5 sm:px-3 md:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? isVip
                  ? 'bg-burnt-orange text-black'
                  : 'bg-burnt-orange text-black'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
            }`}
          >
            {isVip && <Crown className="w-3 h-3 inline-block mr-1 -mt-0.5" />}
            {isArabic ? arabicStageLabels[stage] : stageLabels[stage]}
          </button>
        );
      })}
    </div>
  );
}

// ─── Performance Graph ───
function PerformanceGraph({ car, stage }: { car: TuningCar; stage: Stage }) {
  const stockData = car.stages.stock?.powerCurve || [];
  const tunedData = car.stages[stage]?.powerCurve || [];
  const isStock = stage === 'stock';

  const combined = stockData.map((point, i) => ({
    rpm: point.rpm,
    stockPower: point.power,
    stockTorque: point.torque,
    ...(isStock ? {} : { tunedPower: tunedData[i]?.power, tunedTorque: tunedData[i]?.torque }),
  }));

  return (
    <div className="w-full h-64 md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combined} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="rpm" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#fff', fontSize: 12 }}
            labelFormatter={(v) => `${v} RPM`}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }} />
          <Line type="monotone" dataKey="stockPower" name="Stock HP" stroke="rgba(255,255,255,0.25)" strokeWidth={2} dot={false} strokeDasharray="6 4" />
          <Line type="monotone" dataKey="stockTorque" name="Stock Nm" stroke="rgba(255,255,255,0.15)" strokeWidth={2} dot={false} strokeDasharray="6 4" />
          {!isStock && (
            <>
              <Line type="monotone" dataKey="tunedPower" name="Tuned HP" stroke="#ff6b35" strokeWidth={3} dot={false} animationDuration={800} />
              <Line type="monotone" dataKey="tunedTorque" name="Tuned Nm" stroke="#ff9a35" strokeWidth={3} dot={false} animationDuration={800} />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── Main Configurator ───
export default function TuningConfigurator() {
  const { isArabic } = useLocale();
  const [carIndex, setCarIndex] = useState(0);
  const [stage, setStage] = useState<Stage>('stage1');

  const car = tuningCars[carIndex];
  const availableStages = car.availableStages;

  // Reset stage when car changes if current stage isn't available
  useEffect(() => {
    if (!availableStages.includes(stage)) {
      setStage(availableStages[1] || availableStages[0]);
    }
  }, [carIndex, availableStages, stage]);

  const stageInfo = car.stages[stage];
  const stockSpec = car.stages.stock?.spec;
  if (!stageInfo || !stockSpec) return null;

  const isVip = stage === 'vip';
  const hpGain = stageInfo.spec.hp - stockSpec.hp;
  const torqueGain = stageInfo.spec.torque - stockSpec.torque;
  const timeGain = +(stageInfo.spec.zeroToHundred - stockSpec.zeroToHundred).toFixed(1);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#101113] py-16 transition-colors duration-700 md:py-24">

      <div className="relative z-10 mx-auto max-w-[90rem] px-5 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <p className="home-kicker mb-3">{isArabic ? arTuning.configurator.eyebrow : 'Performance Configurator'}</p>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-off-white sm:text-4xl md:text-5xl">
            {isArabic ? arTuning.configurator.headingPrefix : 'Build Your'} <span className="text-burnt-orange">{isArabic ? arTuning.configurator.headingAccent : 'Power'}</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/45 md:text-base">
            {isArabic ? arTuning.configurator.description : 'Select your vehicle and configure your performance stage'}
          </p>
        </div>

        <CarSelector cars={tuningCars} selectedIndex={carIndex} onSelect={setCarIndex} isArabic={isArabic} />

        <div className="mt-10 mb-10">
          <StageSelector stages={availableStages} active={stage} onChange={setStage} isArabic={isArabic} />
        </div>

        <motion.div
          key={`${car.id}-${stage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-12"
        >
          <AnimatedStat label={isArabic ? arTuning.configurator.horsepower : 'Horsepower'} value={stageInfo.spec.hp} unit="HP" icon={Zap} gain={hpGain} />
        </motion.div>

        <div className="relative mb-12 flex items-center justify-center">
          <motion.img
            key={`${car.id}-img`}
            src={car.image}
            alt={car.name}
            className="relative z-10 h-auto w-[260px] object-contain sm:w-[340px] md:w-[500px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            key={`mods-${car.id}-${stage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="border-t border-white/[0.1] py-6 md:py-8"
          >
            <h3 className="text-lg font-bold text-off-white mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-burnt-orange" />
              {stage === 'stock'
                ? isArabic ? arTuning.configurator.factory : 'Factory Specifications'
                : isArabic ? `${arTuning.configurator.package} ${arabicStageLabels[stage]}` : `${stageLabels[stage]} Package`}
            </h3>
            <ul className="space-y-3 mb-6">
              {stageInfo.mods.map((mod, i) => (
                <motion.li
                  key={mod}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-burnt-orange flex-shrink-0 mt-1.5" />
                  {isArabic ? localizeTuningMod(mod, i) : mod}
                </motion.li>
              ))}
            </ul>
            {stage !== 'stock' && (
              <div className="flex items-center gap-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <DollarSign className="w-4 h-4 text-burnt-orange" />
                  <span className="text-off-white font-semibold">{stageInfo.price}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Clock className="w-4 h-4 text-burnt-orange" />
                  <span className="text-off-white font-semibold">{isArabic ? localizeDuration(stageInfo.time) : stageInfo.time}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {isVip && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto max-w-4xl overflow-hidden border-t border-burnt-orange/35 py-8 text-center md:py-12"
            >
              <Crown className="w-10 h-10 text-burnt-orange mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-black text-off-white mb-3">
                {isArabic ? arTuning.configurator.vipTitle : 'VIP Performance Package'}
              </h3>
              <p className="text-white/50 max-w-xl mx-auto mb-6 text-sm md:text-base">
                {isArabic ? arTuning.configurator.vipDescription : 'Custom-built for maximum performance. Includes bespoke ECU calibration, professional dyno testing, advanced hardware upgrades, and a dedicated performance engineer assigned to your build.'}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                {(isArabic ? arTuning.configurator.vipItems : ['Custom Dyno Tuning', 'Premium Components']).map((item) => (
                  <div key={item} className="flex items-center justify-center gap-2 text-sm text-burnt-orange font-medium">
                    <div className="w-1 h-1 rounded-full bg-burnt-orange" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="btn-primary mt-8">
                {isArabic ? arTuning.configurator.vipCta : 'Request VIP Consultation'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
