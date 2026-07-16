import React from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/use-locale';

const FounderMessage = () => {
  const { isArabic } = useLocale();
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
            <a
              href="https://www.youtube.com/watch?v=dqZZtKhT6_k"
              target="_blank"
              rel="noopener noreferrer"
              className="relative rounded-2xl overflow-hidden group block"
            >
              <img
                src="/images/vrx-video-thumb.png"
                alt={isArabic ? 'فيديو مرسيدس V-Class VRX' : 'VRX V-Class video'}
                className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="relative rounded-2xl overflow-hidden mt-4">
              <img
                src="https://vrx.gadcloud.de/wp-content/themes/blankslate/img/owner2.png?_v=1759610925260"
                alt={isArabic ? 'مرسيدس V-Class VRX' : 'VRX V-Class'}
                className="w-full h-auto object-cover rounded-2xl"
              />
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
              alt={isArabic ? 'سيباستيان دامينغر مؤسس GAD Motors' : 'Sebastian Daminger, Founder of GAD Motors'}
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
              {isArabic ? 'كنا مستعدين لقيادة تطوير سيارة فان فاخرة من ابتكارنا.' : 'WE WERE READY TO TAKE THE LEAD IN DEVELOPING A PREMIUM VAN OURSELVES.'}
            </h2>

            <p className="text-sm text-white/50 leading-relaxed mb-4">
              {isArabic ? 'أردنا ابتكار أكثر من مجرد سيارة معدلة. جاءت VRX ثمرة سنوات من الشغف الهندسي، وصُقل كل تفصيل فيها بعناية لتقديم تجربة قيادة استثنائية في فئة سيارات الفان الفاخرة.' : 'We wanted to create more than just a tuned vehicle. The VRX is the result of years of engineering passion, where every detail has been carefully refined to deliver an unmatched driving experience in the luxury van segment.'}
            </p>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              {isArabic ? 'من منظومة القوة إلى المقصورة، أُعيد تصور كل مكوّن ليعكس أعلى معايير الأداء والحرفية.' : 'From the powertrain to the interior, every component has been reimagined to reflect the highest standards of performance and craftsmanship.'}
            </p>

            <blockquote className={`text-red-600 italic text-sm sm:text-base leading-relaxed mb-8 ${isArabic ? 'border-r-2 pr-4' : 'border-l-2 pl-4'} border-red-600`}>
              {isArabic ? '«نحن لا نبيع السيارات. في GAD نصنعها لمن لا يسألون: لماذا؟ لأنهم يعرفون أنه لا يوجد مستوى آخر يناسبهم.»' : '"We don\'t sell cars. At GAD, we build them for those who never ask \'Why?\' because they know there is no other level for them."'}
            </blockquote>

            <div>
              <img
                src="/images/vrx-signature.png"
                alt={isArabic ? 'توقيع سيباستيان دامينغر' : 'Sebastian Daminger signature'}
                className="h-16 invert opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FounderMessage;
