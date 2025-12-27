'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Building2,
  PartyPopper,
  Star,
  Heart,
  MapPin,
  Clock,
  Calendar,
  ChevronRight,
  Sparkles,
  MapPinned
} from 'lucide-react';

const eventIcons = {
  mairie: Building2,
  oriental: PartyPopper,
  kiddush: Star,
  huppa: Heart,
};

const eventColors = {
  mairie: { bg: 'from-[#7BA3C4] to-[#476F8F]', accent: '#7BA3C4' },
  oriental: { bg: 'from-[#E8A87C] to-[#C17767]', accent: '#E8A87C' },
  kiddush: { bg: 'from-[#F4C4B5] to-[#D4917A]', accent: '#F4C4B5' },
  huppa: { bg: 'from-[#D4A5A5] to-[#E8A87C]', accent: '#D4A5A5' },
};

const eventEmojis = {
  mairie: '🏛️',
  oriental: '🎉',
  kiddush: '✡️',
  huppa: '💒',
};

export default function Events() {
  const t = useTranslations('events');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeEvent, setActiveEvent] = useState<number>(0);

  const events = ['mairie', 'oriental', 'kiddush', 'huppa'] as const;

  return (
    <section
      id="events"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F5] via-white to-[#FDF8F5]" />

      {/* Decorative floating elements */}
      <motion.div
        className="absolute top-20 right-20 opacity-20"
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Sparkles size={60} className="text-[#E8A87C]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FCF0EA] mb-6"
          >
            <Calendar size={28} className="text-[#E8A87C]" />
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A4052] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#476F8F] text-lg">{t('subtitle')}</p>
          <div className="romantic-divider">
            <Heart size={16} className="text-[#E8A87C] fill-[#F4C4B5]" />
          </div>
        </motion.div>

        {/* DaisyUI Steps - horizontal timeline for desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block mb-12"
        >
          <ul className="steps steps-horizontal w-full">
            {events.map((eventKey, index) => {
              const Icon = eventIcons[eventKey];
              const colors = eventColors[eventKey];
              const isActive = index === activeEvent;

              return (
                <li
                  key={eventKey}
                  className={`step cursor-pointer transition-all duration-300 ${
                    index <= activeEvent ? 'step-primary' : ''
                  }`}
                  data-content={eventEmojis[eventKey]}
                  onClick={() => setActiveEvent(index)}
                  style={{
                    '--step-color': isActive ? colors.accent : undefined,
                  } as React.CSSProperties}
                >
                  <motion.span
                    className={`text-sm font-medium transition-colors ${
                      isActive ? 'text-[#2A4052]' : 'text-[#7BA3C4]'
                    }`}
                    animate={{ scale: isActive ? 1.1 : 1 }}
                  >
                    {t(`${eventKey}.title`)}
                  </motion.span>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {events.map((eventKey, index) => {
            const Icon = eventIcons[eventKey];
            const colors = eventColors[eventKey];
            const isActive = index === activeEvent;

            return (
              <motion.article
                key={eventKey}
                initial={{ opacity: 0, y: 50, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className="event-card group perspective-1000"
                onMouseEnter={() => setActiveEvent(index)}
              >
                <motion.div
                  className={`card bg-white shadow-xl border-2 overflow-hidden transform-gpu transition-all duration-500 ${
                    isActive
                      ? 'border-[#E8A87C] shadow-2xl scale-[1.02]'
                      : 'border-[#FCF0EA]/50 hover:border-[#F4C4B5]'
                  }`}
                  whileHover={{ y: -8 }}
                >
                  {/* Card header with gradient */}
                  <div className={`relative h-36 bg-gradient-to-r ${colors.bg} p-6 overflow-hidden`}>
                    {/* Animated background pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                                         radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                      }}
                      animate={{ x: [0, 40], y: [0, 40] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Decorative circles */}
                    <motion.div
                      className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-white/10"
                      animate={{ scale: [1.1, 1, 1.1] }}
                      transition={{ duration: 5, repeat: Infinity }}
                    />

                    {/* Icon with glow */}
                    <motion.div
                      className="absolute top-1/2 right-6 -translate-y-1/2"
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 w-20 h-20 rounded-full bg-white/30 blur-xl" />
                        <div className="relative w-18 h-18 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center p-4">
                          <Icon className="w-10 h-10 text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </motion.div>

                    {/* Event title */}
                    <div className="relative z-10">
                      <span className="text-white/70 text-sm font-medium tracking-wider uppercase">
                        {t(`${eventKey}.date`)}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl text-white mt-1 drop-shadow-md">
                        {t(`${eventKey}.title`)}
                      </h3>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="card-body p-6">
                    {/* Date and time badges */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <motion.div
                        className="badge badge-lg bg-gradient-to-r from-[#FCF0EA] to-[#FDF8F5] border-0 text-[#385670] gap-2 py-3 px-4 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Clock size={14} className="text-[#E8A87C]" />
                        {t(`${eventKey}.time`)}
                      </motion.div>
                    </div>

                    {/* Location with map pin */}
                    <motion.div
                      className="flex items-start gap-3 mb-4 p-3 rounded-xl bg-[#FCF0EA]/30 border border-[#FCF0EA]"
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FCF0EA] flex items-center justify-center flex-shrink-0">
                        <MapPinned size={18} className="text-[#E8A87C]" />
                      </div>
                      <div>
                        <span className="text-xs text-[#7BA3C4] uppercase tracking-wide">Location</span>
                        <p className="text-[#385670] font-medium">
                          {t(`${eventKey}.location`)}
                        </p>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <p className="text-[#476F8F] text-sm leading-relaxed">
                      {t(`${eventKey}.description`)}
                    </p>

                    {/* View details link */}
                    <motion.div
                      className="flex items-center gap-2 mt-4 text-[#E8A87C] font-medium cursor-pointer group/link"
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm">View details</span>
                      <ChevronRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                    </motion.div>

                    {/* Decorative bottom line */}
                    <motion.div
                      className={`h-1 rounded-full bg-gradient-to-r ${colors.bg} mt-4`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0.3 }}
                      transition={{ duration: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom timeline with animated connector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="hidden md:block mt-16"
        >
          <div className="relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#FCF0EA] rounded-full -translate-y-1/2" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#7BA3C4] via-[#E8A87C] to-[#D4A5A5] rounded-full -translate-y-1/2"
              initial={{ width: '0%' }}
              animate={isInView ? { width: `${((activeEvent + 1) / events.length) * 100}%` } : {}}
              transition={{ duration: 0.5 }}
            />

            {/* Timeline dots */}
            <div className="relative flex justify-between items-center">
              {events.map((eventKey, index) => {
                const Icon = eventIcons[eventKey];
                const colors = eventColors[eventKey];
                const isActive = index === activeEvent;
                const isPast = index <= activeEvent;

                return (
                  <motion.button
                    key={eventKey}
                    onClick={() => setActiveEvent(index)}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Outer glow */}
                    {isActive && (
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors.bg} blur-xl opacity-50`}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: '60px', height: '60px', left: '-10px', top: '-10px' }}
                      />
                    )}

                    {/* Main circle */}
                    <motion.div
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isPast
                          ? `bg-gradient-to-r ${colors.bg} shadow-lg`
                          : 'bg-white border-2 border-[#FCF0EA]'
                      }`}
                      animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                    >
                      <Icon
                        size={18}
                        className={isPast ? 'text-white' : 'text-[#7BA3C4]'}
                      />
                    </motion.div>

                    {/* Label */}
                    <motion.div
                      className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-colors ${
                        isActive ? 'text-[#2A4052]' : 'text-[#7BA3C4]'
                      }`}
                    >
                      {t(`${eventKey}.date`).split(',')[0]}
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
