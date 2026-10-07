import { MapPin, Phone, Send, Clock, Mountain, MessageCircle, Radio, Instagram } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { resortInfo, IMAGES, getResortLocation } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import Reveal from '@/components/motion/Reveal';

export default function Contact() {
  const { t, language } = useTranslation();
  useDocumentMeta({ title: t('contact.heroTitle'), description: t('contact.heroSubtitle') });

  return (
    <div>
      <PageHero
        title={t('contact.heroTitle')}
        subtitle={t('contact.heroSubtitle')}
        image={IMAGES.resortFacade}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('contact.heroTitle') }]}
      />

      <section className="py-20 bg-white">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <Reveal variant="fade-up">
                <p className="section-subtitle">{t('contact.subtitle')}</p>
                <h2 className="section-title mb-8">{t('contact.title')}</h2>
              </Reveal>

              <Reveal variant="fade-up" stagger={0.08} className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">{t('contact.addressLabel')}</h3>
                    <a
                      href={resortInfo.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-600 hover:text-forest-700 transition-colors"
                    >
                      {getResortLocation(language)}
                    </a>
                    <p className="text-sm text-stone-500 mt-1">{t('contact.addressNote')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">{t('contact.phoneLabel')}</h3>
                    <a href={`tel:${resortInfo.phone.replace(/\s/g, '')}`} className="text-sm text-stone-600 hover:text-forest-700 transition-colors">
                      {resortInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Send size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">{t('contact.telegramLabel')}</h3>
                    <a
                      href={resortInfo.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-600 hover:text-forest-700 transition-colors"
                    >
                      {resortInfo.telegramUsername}
                    </a>
                    <p className="text-sm text-stone-500 mt-1">{t('contact.telegramNote')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Radio size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">{t('contact.telegramChannelLabel')}</h3>
                    <a
                      href={resortInfo.telegramChannel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-600 hover:text-forest-700 transition-colors"
                    >
                      {resortInfo.telegramChannelUsername}
                    </a>
                    <p className="text-sm text-stone-500 mt-1">{t('contact.telegramChannelNote')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Instagram size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">{t('contact.instagramLabel')}</h3>
                    <a
                      href={resortInfo.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-600 hover:text-forest-700 transition-colors"
                    >
                      {resortInfo.instagramUsername}
                    </a>
                    <p className="text-sm text-stone-500 mt-1">{t('contact.instagramNote')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 mb-1">{t('contact.hoursLabel')}</h3>
                    <p className="text-sm text-stone-600">{t('contact.hoursValue')}</p>
                  </div>
                </div>
              </Reveal>

              {/* Quick booking CTA */}
              <Reveal variant="fade-up" className="mt-8 p-8 bg-forest-950 rounded-xl text-white">
                <MessageCircle size={32} className="text-forest-400 mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">{t('contact.quickBookTitle')}</h3>
                <p className="text-sm text-white/70 mb-5">
                  {t('contact.quickBookDesc')}
                </p>
                <a
                  href={resortInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white text-sm font-medium rounded-xl hover:bg-forest-500 transition-colors"
                >
                  <Send size={16} />
                  {t('contact.quickBookButton')}
                </a>
              </Reveal>
            </div>

            {/* Image / location */}
            <div className="space-y-4">
              <Reveal variant="fade-in">
                <a href={resortInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="block group">
                  <img src={IMAGES.resortAerial} alt="Resort joylashuvi" className="w-full h-80 object-cover rounded-xl shadow-lg transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                </a>
              </Reveal>
              <Reveal variant="fade-up" stagger={0.1} className="grid grid-cols-2 gap-4">
                <img src={IMAGES.mountain1} alt="Tog' manzarasi" width={1800} height={1200} className="w-full h-48 object-cover rounded-xl shadow-md" loading="lazy" />
                <img src={IMAGES.cottage1} alt="Kottej" className="w-full h-48 object-cover rounded-xl shadow-md" loading="lazy" />
              </Reveal>
              <Reveal variant="fade-up" className="p-6 bg-stone-50 rounded-xl">
                <Mountain size={24} className="text-forest-600 mb-3" />
                <h3 className="font-medium text-stone-900 mb-2">{t('contact.aboutTitle')}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('contact.aboutDesc')}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
