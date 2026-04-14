import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { tuningCars, stageLabels, type Stage, type TuningCar } from '@/data/tuningCars';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap, Gauge, Timer, Wrench, Clock, DollarSign, Crown, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Animated Stat ───
function AnimatedStat({ label, value, unit, icon: Icon, gain }: {
  label: string; value: number; unit: string; icon: React.ElementType; gain?: number;
}) {
  const display = useAnimatedCounter(value, 700, unit === 's' ? 1 : 0);
  return (
    <div className="flex flex-col items-center p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
      <Icon className="w-5 h-5 text-burnt-orange mb-2" />
      <span className="text-xs uppercase tracking-widest text-white/40 mb-1">{label}</span>
      <span className="text-3xl md:text-4xl font-black text-off-white tabular-nums">
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
function CarSelector({ cars, selectedIndex, onSelect }: {
  cars: TuningCar[]; selectedIndex: number; onSelect: (i: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const itemWidth = 280;
    const center = el.clientWidth / 2 - itemWidth / 2;
    el.scrollTo({ left: index * itemWidth - center + 140, behavior: 'smooth' });
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
      <button onClick={prev} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-burnt-orange hover:border-burnt-orange/40 transition-all">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-burnt-orange hover:border-burnt-orange/40 transition-all">
        <ChevronRight className="w-5 h-5" />
      </button>

      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide gap-2 py-8 px-[40%] cursor-grab active:cursor-grabbing"
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
              className="flex-shrink-0 flex flex-col items-center cursor-pointer transition-all duration-500"
              style={{ width: 280 }}
            >
              <div className={`relative transition-all duration-500 ${isSelected ? 'scale-110' : 'scale-75 opacity-40 blur-[1px]'}`}>
                {isSelected && (
                  <div className="absolute inset-0 rounded-full bg-burnt-orange/20 blur-3xl scale-150 -z-10" />
                )}
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-64 h-40 object-contain drop-shadow-2xl"
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

      <div className="flex justify-center gap-1.5 mt-2">
        {cars.map((_, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === selectedIndex ? 'bg-burnt-orange w-6' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Stage Selector ───
function StageSelector({ stages, active, onChange }: { stages: Stage[]; active: Stage; onChange: (s: Stage) => void }) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 p-1.5 bg-white/[0.03] rounded-2xl border border-white/[0.06] backdrop-blur-sm mx-auto w-fit flex-wrap">
      {stages.map((stage) => {
        const isActive = stage === active;
        const isVip = stage === 'vip';
        return (
          <button
            key={stage}
            onClick={() => onChange(stage)}
            className={`relative px-3 md:px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
              isActive
                ? isVip
                  ? 'bg-gradient-to-r from-burnt-orange to-yellow-500 text-black shadow-lg shadow-burnt-orange/30'
                  : 'bg-burnt-orange text-black shadow-lg shadow-burnt-orange/30'
                : 'text-white/50 hover:text-white/80 hover:bg-white/[0.05]'
            }`}
          >
            {isVip && <Crown className="w-3 h-3 inline-block mr-1 -mt-0.5" />}
            {stageLabels[stage]}
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

  const stageIdx = availableStages.indexOf(stage);
  const intensity = stageIdx / (availableStages.length - 1) * 0.25;

  return (
    <section className={`relative py-16 md:py-24 transition-colors duration-700 ${isVip ? 'bg-gradient-to-b from-black via-[#0a0500] to-black' : 'bg-black'}`}>
      {isVip && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-burnt-orange/[0.06] rounded-full blur-[120px]" />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-burnt-orange text-xs uppercase tracking-[0.3em] font-semibold mb-3">Performance Configurator</p>
          <h2 className="text-3xl md:text-5xl font-black text-off-white">
            Build Your <span className="text-burnt-orange">Power</span>
          </h2>
          <p className="text-white/40 mt-3 max-w-lg mx-auto text-sm md:text-base">
            Select your vehicle and configure your performance stage
          </p>
        </div>

        <CarSelector cars={tuningCars} selectedIndex={carIndex} onSelect={setCarIndex} />

        <div className="mt-10 mb-10">
          <StageSelector stages={availableStages} active={stage} onChange={setStage} />
        </div>

        <motion.div
          key={`${car.id}-${stage}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mb-12"
        >
          <AnimatedStat label="Horsepower" value={stageInfo.spec.hp} unit="HP" icon={Zap} gain={hpGain} />
          <AnimatedStat label="Torque" value={stageInfo.spec.torque} unit="Nm" icon={Gauge} gain={torqueGain} />
          <AnimatedStat label="0–100 km/h" value={stageInfo.spec.zeroToHundred} unit="s" icon={Timer} gain={timeGain} />
        </motion.div>

        <div className="relative flex justify-center items-center mb-12">
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
            <div
              className="w-[500px] h-[300px] rounded-full blur-[80px] transition-all duration-700"
              style={{
                background: isVip
                  ? 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)'
                  : `radial-gradient(circle, rgba(255,107,53,${0.03 + intensity * 0.3}) 0%, transparent 70%)`,
              }}
            />
          </div>
          <motion.img
            key={`${car.id}-img`}
            src={car.image}
            alt={car.name}
            className="relative z-10 w-[340px] md:w-[500px] h-auto object-contain drop-shadow-2xl"
            style={{
              filter: `brightness(${1 - intensity * 0.4}) contrast(${1 + intensity * 0.3}) saturate(${1 + intensity * 0.2})`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          <motion.div
            key={`mods-${car.id}-${stage}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-off-white mb-4 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-burnt-orange" />
              {stage === 'stock' ? 'Factory Specifications' : `${stageLabels[stage]} Package`}
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
                  {mod}
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
                  <span className="text-off-white font-semibold">{stageInfo.time}</span>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            key={`graph-${car.id}-${stage}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-off-white mb-4">
              Power & Torque Curves
            </h3>
            <PerformanceGraph car={car} stage={stage} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isVip && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto rounded-3xl border border-burnt-orange/20 bg-gradient-to-br from-burnt-orange/[0.08] to-transparent p-8 md:p-12 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-burnt-orange/[0.06] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <Crown className="w-10 h-10 text-burnt-orange mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-black text-off-white mb-3">
                VIP Performance Package
              </h3>
              <p className="text-white/50 max-w-xl mx-auto mb-6 text-sm md:text-base">
                Custom-built for maximum performance. Includes bespoke ECU calibration, 
                professional dyno testing, advanced hardware upgrades, and a dedicated 
                performance engineer assigned to your build.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                {['Custom Dyno Tuning', 'Premium Components', '1-Year Warranty'].map((item) => (
                  <div key={item} className="flex items-center justify-center gap-2 text-sm text-burnt-orange font-medium">
                    <div className="w-1 h-1 rounded-full bg-burnt-orange" />
                    {item}
                  </div>
                ))}
              </div>
              <button className="mt-8 px-8 py-3 bg-gradient-to-r from-burnt-orange to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-burnt-orange/30 transition-all duration-300 hover:scale-105">
                Request VIP Consultation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
