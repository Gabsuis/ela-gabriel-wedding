'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

const languages = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'he', label: 'עב', flag: '🇮🇱' },
];

export default function Navigation() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${currentPath}`);
    setIsLangMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t('home'), id: 'hero' },
    { label: t('story'), id: 'story' },
    { label: t('events'), id: 'events' },
    { label: t('rsvp'), id: 'rsvp' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FDF8F5]/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src="/logo.png"
              alt="E & G"
              width={40}
              height={40}
              className="rounded-full"
            />
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-[#385670] hover:text-[#E8A87C] transition-colors font-medium"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}

            {/* Language Switcher - DaisyUI dropdown */}
            <div className="dropdown dropdown-end">
              <motion.div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm rounded-full bg-[#FCF0EA] hover:bg-[#F9DDD0]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={16} className="text-[#C17767]" />
                <span className="text-sm font-medium text-[#C17767]">
                  {languages.find(l => l.code === locale)?.flag}
                </span>
              </motion.div>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-32 p-2 shadow-lg border border-[#FCF0EA] mt-2">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex items-center gap-3 ${locale === lang.code ? 'bg-[#FCF0EA]' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm font-medium text-[#385670]">{lang.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile Language Switcher */}
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle bg-[#FCF0EA]">
                <Globe size={18} className="text-[#C17767]" />
              </button>
              <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-32 p-2 shadow-lg border border-[#FCF0EA] mt-2">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex items-center gap-3 ${locale === lang.code ? 'bg-[#FCF0EA]' : ''}`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-sm">{lang.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-sm btn-circle bg-[#FCF0EA]"
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-[#C17767]" />
              ) : (
                <Menu size={24} className="text-[#C17767]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left py-3 px-4 rounded-lg text-[#385670] hover:bg-[#FCF0EA] transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
