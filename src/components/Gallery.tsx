'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, Camera, ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import Image from 'next/image';

// Using engagement photo as placeholder - add your photos to /public/gallery/
const photos = [
  { src: '/engagement.jpg', alt: 'Our journey begins' },
  { src: '/engagement.jpg', alt: 'Adventure together' },
  { src: '/engagement.jpg', alt: 'Special moments' },
  { src: '/engagement.jpg', alt: 'Love by the sea' },
  { src: '/engagement.jpg', alt: 'Forever us' },
  { src: '/engagement.jpg', alt: 'Our love story' },
];

export default function Gallery() {
  const t = useTranslations('gallery');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-[#FDF8F5] via-white to-[#FDF8F5]"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#FCF0EA]/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C3D7E7]/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

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
            <Camera size={28} className="text-[#E8A87C]" />
          </motion.div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A4052] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#476F8F] text-lg">{t('subtitle')}</p>
          <div className="romantic-divider">
            <Heart size={16} className="text-[#E8A87C] fill-[#F4C4B5]" />
          </div>
        </motion.div>

        {/* Main Carousel - DaisyUI style */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="carousel w-full rounded-3xl overflow-hidden shadow-2xl border border-[#FCF0EA]">
            <div className="carousel-item relative w-full aspect-[16/9] md:aspect-[21/9]">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={photos[currentSlide].src}
                  alt={photos[currentSlide].alt}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {/* Caption */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="badge badge-lg bg-white/90 backdrop-blur border-0 text-[#2A4052] gap-2 px-4 py-3">
                    <Sparkles size={14} className="text-[#E8A87C]" />
                    {photos[currentSlide].alt}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <motion.button
              onClick={prevSlide}
              className="btn btn-circle bg-white/80 backdrop-blur border-0 shadow-lg hover:bg-white pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft size={24} className="text-[#2A4052]" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="btn btn-circle bg-white/80 backdrop-blur border-0 shadow-lg hover:bg-white pointer-events-auto"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight size={24} className="text-[#2A4052]" />
            </motion.button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentSlide === index
                    ? 'w-8 h-2 bg-[#E8A87C]'
                    : 'w-2 h-2 bg-[#F4C4B5]/50 hover:bg-[#F4C4B5]'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Thumbnail grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4"
        >
          {photos.map((photo, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`relative aspect-square rounded-xl overflow-hidden group transition-all duration-300 ${
                currentSlide === index
                  ? 'ring-4 ring-[#E8A87C] ring-offset-2'
                  : 'hover:ring-2 hover:ring-[#F4C4B5]'
              }`}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className={`absolute inset-0 transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-[#E8A87C]/20'
                  : 'bg-black/0 group-hover:bg-black/20'
              }`} />

              {/* Active indicator */}
              {currentSlide === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Heart size={24} className="text-white fill-white drop-shadow-lg" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 btn btn-circle btn-ghost text-white"
            onClick={() => setSelectedPhoto(null)}
          >
            <X size={24} />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-5xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[selectedPhoto].src}
              alt={photos[selectedPhoto].alt}
              fill
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
