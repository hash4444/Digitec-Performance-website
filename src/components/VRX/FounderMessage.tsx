import React from 'react';
import { motion } from 'framer-motion';

const FounderMessage = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Left Column: Car Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/vrx-founder-car1.jpg"
                alt="VRX V-Class front view"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/vrx-trophy.jpg"
                alt="VRX SCC Trophy"
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            <div className="mt-2">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-white/70 mb-1">V-CLASS VRX</p>
              <a
                href="#"
                className="text-xs text-red-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                ▶ Watch video
              </a>
            </div>
          </motion.div>

          {/* Center Column: Founder Photo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-stretch"
          >
            <img
              src="/images/vrx-founder.jpg"
              alt="Sebastian Daminger, Founder of GAD Motors"
              className="w-full h-full object-cover rounded-2xl"
            />
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl font-black text-off-white leading-tight mb-6">
              WE WERE READY TO TAKE THE LEAD IN DEVELOPING A PREMIUM VAN OURSELVES.
            </h2>

            <p className="text-sm text-white/50 leading-relaxed mb-4">
              We wanted to create more than just a tuned vehicle. The VRX is the result of years of engineering passion, where every detail has been carefully refined to deliver an unmatched driving experience in the luxury van segment.
            </p>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              From the powertrain to the interior, every component has been reimagined to reflect the highest standards of performance and craftsmanship.
            </p>

            <blockquote className="text-red-600 italic text-sm sm:text-base leading-relaxed mb-8 border-l-2 border-red-600 pl-4">
              "We don't sell cars. At GAD, we build them for those who never ask 'Why?' because they know there is no other level for them."
            </blockquote>

            <div>
              <img
                src="/images/vrx-signature.png"
                alt="Sebastian Daminger signature"
                className="h-10 mb-2 invert opacity-80"
              />
              <p className="text-xs font-bold text-white uppercase tracking-wider">Sebastian Daminger</p>
              <p className="text-xs text-white/50 uppercase tracking-wider">GAD-MOTORS</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
