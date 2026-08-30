import { Phone, Send } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/motion/Reveal';
import { IMAGES, resortInfo } from '@/data/accommodations';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  useDocumentMeta({ title: t('privacyPolicy.heroTitle'), description: t('privacyPolicy.heroSubtitle') });

  const sections = [
    { title: t('privacyPolicy.collectTitle'), body: t('privacyPolicy.collectBody') },
    { title: t('privacyPolicy.cookieTypesTitle'), body: t('privacyPolicy.cookieTypesBody') },
    { title: t('privacyPolicy.manageTitle'), body: t('privacyPolicy.manageBody') },
    { title: t('privacyPolicy.securityTitle'), body: t('privacyPolicy.securityBody') },
  ];

  const cookieTypes = [
    { title: t('cookieConsent.necessaryTitle'), desc: t('cookieConsent.necessaryDesc') },
    { title: t('cookieConsent.analyticsTitle'), desc: t('cookieConsent.analyticsDesc') },
    { title: t('cookieConsent.marketingTitle'), desc: t('cookieConsent.marketingDesc') },
  ];

  return (
    <div>
      <PageHero
        title={t('privacyPolicy.heroTitle')}
        subtitle={t('privacyPolicy.heroSubtitle')}
        image={IMAGES.resortFacade}
        breadcrumb={[{ label: t('common.home'), to: '/' }, { label: t('privacyPolicy.heroTitle') }]}
      />

      <section className="py-20 bg-white">
        <div className="container-lux max-w-3xl">
          <Reveal variant="fade-up">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-forest-600 mb-8">
              {t('privacyPolicy.updatedLabel')}: {t('privacyPolicy.updatedDate')}
            </p>
            <p className="text-stone-600 leading-relaxed mb-14">{t('privacyPolicy.intro')}</p>
          </Reveal>

          <Reveal variant="fade-up" stagger={0.08} className="space-y-12">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">{section.title}</h2>
                <p className="text-stone-600 leading-relaxed">{section.body}</p>

                {section.title === t('privacyPolicy.cookieTypesTitle') && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {cookieTypes.map((c) => (
                      <div key={c.title} className="rounded-sm bg-stone-50 p-4">
                        <h3 className="text-sm font-medium text-stone-900 mb-1.5">{c.title}</h3>
                        <p className="text-xs leading-relaxed text-stone-500">{c.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </Reveal>

          <Reveal variant="fade-up" className="mt-14 pt-10 border-t border-stone-100">
            <h2 className="font-serif text-2xl font-semibold text-stone-900 mb-3">
              {t('privacyPolicy.contactTitle')}
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">{t('privacyPolicy.contactBody')}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${resortInfo.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-forest-800 transition-colors"
              >
                <Phone size={16} />
                {resortInfo.phone}
              </a>
              <a
                href={resortInfo.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-forest-700 hover:text-forest-800 transition-colors"
              >
                <Send size={16} />
                {resortInfo.telegramUsername}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
