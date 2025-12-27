'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToRSVP = () => {
    const element = document.getElementById('rsvp');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient inspired by sunset photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCF0EA] via-[#F4C4B5]/30 to-[#FDF8F5]" />
      
      {/* Decorative circles */}
      <motion.div
        className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-[#F9DDD0]/30 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-[#C3D7E7]/30 blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Engagement Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
            {/* Photo frame decoration */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-[#F4C4B5]/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-2 rounded-full border border-[#F9DDD0]/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />
            
            {/* The actual engagement photo */}
            <div className="absolute inset-3 rounded-full overflow-hidden shadow-2xl">
              <Image
                src="/engagement.jpg"
                alt="Ela & Gabriel"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating hearts around photo */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: `${20 + i * 15}%`,
                  left: i % 2 === 0 ? '-10%' : '90%',
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.3,
                }}
              >
                <Heart
                  size={12 + i * 2}
                  className="text-[#E8A87C] fill-[#F4C4B5]"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-[#2A4052] mb-4">
            <span className="gradient-text">Ela</span>
            <motion.span
              className="inline-block mx-4 text-[#E8A87C]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              &
            </motion.span>
            <span className="gradient-text">Gabriel</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-[#476F8F] font-light mb-2"
        >
          {t('subtitle')}
        </motion.p>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span className="w-12 h-px bg-[#F4C4B5]" />
          <p className="text-lg md:text-xl text-[#C17767] font-serif tracking-widest">
            {t('date')}
          </p>
          <span className="w-12 h-px bg-[#F4C4B5]" />
        </motion.div>

        {/* CTA Button - DaisyUI style */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToRSVP}
          className="btn btn-lg rounded-full text-white border-0 shadow-lg hover:scale-105 transition-transform"
          style={{ background: 'linear-gradient(135deg, #E8A87C 0%, #C17767 100%)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t('cta')}
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={32} className="text-[#E8A87C]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
