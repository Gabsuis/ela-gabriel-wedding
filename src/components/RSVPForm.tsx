'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Send, 
  Check, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Users,
  Heart,
  Loader2
} from 'lucide-react';

type AttendanceStatus = 'attending' | 'notAttending' | null;

interface RSVPData {
  name: string;
  email: string;
  phone: string;
  guests: string;
  dietary: string;
  message: string;
  mairie: AttendanceStatus;
  oriental: AttendanceStatus;
  kiddush: AttendanceStatus;
  huppa: AttendanceStatus;
}

export default function RSVPForm() {
  const t = useTranslations('rsvp');
  const tEvents = useTranslations('events');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState<RSVPData>({
    name: '',
    email: '',
    phone: '',
    guests: '1',
    dietary: '',
    message: '',
    mairie: null,
    oriental: null,
    kiddush: null,
    huppa: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const events = [
    { key: 'mairie', date: 'July 6' },
    { key: 'oriental', date: 'July 24' },
    { key: 'kiddush', date: 'July 25' },
    { key: 'huppa', date: 'July 26' },
  ] as const;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAttendanceChange = (eventKey: string, status: AttendanceStatus) => {
    setFormData((prev) => ({ ...prev, [eventKey]: status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const sheetData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        guests: formData.guests,
        dietary: formData.dietary,
        message: formData.message,
        mairie: formData.mairie === 'attending' ? 'Yes' : formData.mairie === 'notAttending' ? 'No' : 'Not answered',
        oriental: formData.oriental === 'attending' ? 'Yes' : formData.oriental === 'notAttending' ? 'No' : 'Not answered',
        kiddush: formData.kiddush === 'attending' ? 'Yes' : formData.kiddush === 'notAttending' ? 'No' : 'Not answered',
        huppa: formData.huppa === 'attending' ? 'Yes' : formData.huppa === 'notAttending' ? 'No' : 'Not answered',
      };

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: '1',
          dietary: '',
          message: '',
          mairie: null,
          oriental: null,
          kiddush: null,
          huppa: null,
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="rsvp"
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#FDF8F5] via-[#FCF0EA]/30 to-[#FDF8F5]"
    >
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 opacity-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <Heart size={60} className="text-[#F4C4B5]" />
      </motion.div>
      <motion.div
        className="absolute bottom-20 right-10 opacity-20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <Heart size={40} className="text-[#D4A5A5]" />
      </motion.div>

      <div className="max-w-2xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A4052] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#476F8F] text-lg">{t('subtitle')}</p>
          <div className="romantic-divider">
            <Heart size={16} className="text-[#E8A87C] fill-[#F4C4B5]" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="card bg-white/70 backdrop-blur border border-[#FCF0EA] shadow-xl p-8 md:p-10"
        >
          {/* Personal info */}
          <div className="space-y-4 mb-8">
            {/* Name */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#F9DDD0] focus-within:border-[#E8A87C] focus-within:outline-[#E8A87C]">
              <User size={18} className="text-[#E8A87C]" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('form.name')}
                required
                className="grow bg-transparent text-[#2A4052] placeholder:text-[#7BA3C4]"
              />
            </label>

            {/* Email */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#F9DDD0] focus-within:border-[#E8A87C]">
              <Mail size={18} className="text-[#E8A87C]" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder={t('form.email')}
                required
                className="grow bg-transparent text-[#2A4052] placeholder:text-[#7BA3C4]"
              />
            </label>

            {/* Phone */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#F9DDD0] focus-within:border-[#E8A87C]">
              <Phone size={18} className="text-[#E8A87C]" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t('form.phone')}
                className="grow bg-transparent text-[#2A4052] placeholder:text-[#7BA3C4]"
              />
            </label>

            {/* Number of guests */}
            <label className="input input-bordered flex items-center gap-2 bg-white/50 border-[#F9DDD0] focus-within:border-[#E8A87C]">
              <Users size={18} className="text-[#E8A87C]" />
              <select
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="grow bg-transparent text-[#2A4052] cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'guest' : 'guests'}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Event attendance */}
          <div className="mb-8">
            <p className="text-[#385670] font-medium mb-4">{t('events.selectAll')}</p>
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.key}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/50 border border-[#FCF0EA]"
                >
                  <div>
                    <p className="font-medium text-[#2A4052]">
                      {tEvents(`${event.key}.title`)}
                    </p>
                    <p className="text-sm text-[#7BA3C4]">{event.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(event.key, 'attending')}
                      className={`btn btn-sm rounded-full ${
                        formData[event.key as keyof RSVPData] === 'attending'
                          ? 'btn-success text-white'
                          : 'btn-outline border-green-400 text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {t('form.attending')}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAttendanceChange(event.key, 'notAttending')}
                      className={`btn btn-sm rounded-full ${
                        formData[event.key as keyof RSVPData] === 'notAttending'
                          ? 'btn-error text-white'
                          : 'btn-outline border-rose-400 text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      {t('form.notAttending')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          {/* Message */}
          <div className="mb-8">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={t('form.messagePlaceholder')}
              rows={4}
              className="textarea textarea-bordered w-full bg-white/50 border-[#F9DDD0] focus:border-[#E8A87C] text-[#2A4052] placeholder:text-[#7BA3C4] resize-none"
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-lg w-full rounded-full text-white border-0 shadow-lg disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #E8A87C 0%, #C17767 100%)' }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                {t('form.submit')}
              </>
            )}
          </motion.button>

          {/* Status messages */}
          <AnimatePresence>
            {submitStatus !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`alert mt-4 ${
                  submitStatus === 'success' ? 'alert-success' : 'alert-error'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <Check size={20} />
                    {t('form.success')}
                  </>
                ) : (
                  <>
                    <AlertCircle size={20} />
                    {t('form.error')}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
