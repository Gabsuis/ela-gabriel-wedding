'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Plane, Home, Gem } from 'lucide-react';

export default function OurStory() {
  const t = useTranslations('story');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const timelineItems = [
    {
      icon: Plane,
      title: 'Massa Program',
      description: 'Where it all began in Israel',
    },
    {
      icon: Heart,
      title: 'Falling in Love',
      description: 'A friendship that became so much more',
    },
    {
      icon: Home,
      title: 'Making Aliya',
      description: 'Building our home together',
    },
    {
      icon: Gem,
      title: 'Getting Married',
      description: 'Beginning our forever journey',
    },
  ];

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F5] via-[#FCF0EA]/30 to-[#FDF8F5]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.p
            className="text-[#E8A87C] font-medium tracking-widest uppercase text-sm mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            {t('tagline')}
          </motion.p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A4052]">
            {t('title')}
          </h2>
          <div className="romantic-divider">
            <Heart size={16} className="text-[#E8A87C] fill-[#F4C4B5]" />
          </div>
        </motion.div>

        {/* Story content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="card bg-white/70 backdrop-blur border border-[#FCF0EA] shadow-xl rounded-3xl p-8 md:p-12 mb-16"
        >
          <p className="text-lg md:text-xl text-[#385670] leading-relaxed text-center font-light">
            {t('content')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#F4C4B5] via-[#D4A5A5] to-[#F4C4B5]"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            style={{ originY: 0 }}
          />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                className={`flex items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}
                >
                  <h3 className="font-serif text-xl md:text-2xl text-[#2A4052] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#476F8F] text-sm md:text-base">
                    {item.description}
                  </p>
                </div>

                {/* Icon */}
                <motion.div
                  className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-2 border-[#F9DDD0]"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <item.icon
                    className="w-5 h-5 md:w-6 md:h-6 text-[#E8A87C]"
                  />
                </motion.div>

                {/* Empty space for layout */}
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
