'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative py-16 bg-gradient-to-b from-[#FDF8F5] to-[#FCF0EA]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F4C4B5] to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <Image
            src="/logo.png"
            alt="Ela & Gabriel"
            width={100}
            height={100}
            className="mx-auto"
          />
        </motion.div>

        {/* Names */}
        <motion.h3
          className="font-serif text-3xl md:text-4xl text-[#2A4052] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Ela & Gabriel
        </motion.h3>

        {/* Hashtag */}
        <motion.p
          className="text-[#E8A87C] font-medium tracking-wider mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {t('hashtag')}
        </motion.p>

        {/* Decorative hearts */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -5, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            >
              <Heart
                size={i === 2 ? 20 : 14}
                className={`${
                  i === 2
                    ? 'text-[#E8A87C] fill-[#E8A87C]'
                    : 'text-[#F4C4B5] fill-[#F4C4B5]'
                }`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Made with love */}
        <motion.p
          className="text-[#7BA3C4] text-sm flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t('madeWith')}{' '}
          <Heart size={14} className="text-[#E8A87C] fill-[#E8A87C]" />
        </motion.p>

        {/* Copyright */}
        <motion.p
          className="text-[#A5C3DB] text-xs mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          © 2025 Ela & Gabriel
        </motion.p>
      </div>
    </footer>
  );
}
