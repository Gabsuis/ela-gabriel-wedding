'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import OurStory from '@/components/OurStory';
import Gallery from '@/components/Gallery';
import Events from '@/components/Events';
import RSVPForm from '@/components/RSVPForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <main ref={containerRef} className="relative">
      {/* Decorative floating elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-3 h-3 rounded-full bg-[#E8A87C]/30"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-40 right-20 w-2 h-2 rounded-full bg-[#F4C4B5]/40"
          animate={{
            y: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
        <motion.div
          className="absolute top-60 left-1/4 w-4 h-4 rounded-full bg-[#7BA3C4]/20"
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
      </div>

      <Navigation />

      <Hero />

      <Countdown />

      <OurStory />

      <Gallery />

      <Events />

      <RSVPForm />

      <Footer />

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E8A87C] via-[#F4C4B5] to-[#E8A87C] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    </main>
  );
}
