import { Link } from 'react-router-dom';
import { WineOff, CigaretteOff, Shirt, ShieldAlert } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { useTranslation } from '@/i18n/useTranslation';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';

export default function Rules() {
  const { t } = useTranslation();
  useDocumentMeta({ title: t('rules.heroTitle'), description: t('rules.heroSubtitle') });

  const rules = [
    { icon: WineOff, title: t('rules.alcoholTitle'), body: t('rules.alcoholBody') },
    { icon: CigaretteOff, title: t('rules.smokingTitle'), body: t('rules.smokingBody') },
    { icon: Shirt, title: t('rules.dressTitle'), body: t('rules.dressBody') },
  ];

  return (
    <div>
      <section className="relative bg-stone-900 py-24 flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-stone-900 to-stone-950" />
        <div className="relative container-lux pb-8">
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors">{t('common.home')}</Link>
            <span>/</span>
            <span className="text-sand-300">{t('rules.heroTitle')}</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold text-white text-shadow-lux animate-fade-up">
            {t('rules.heroTitle')}
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t('rules.heroSubtitle')}
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-lux max-w-3xl">
          <Reveal variant="fade-up">
            <p className="text-stone-600 leading-relaxed mb-14">{t('rules.intro')}</p>
          </Reveal>

          <Reveal variant="fade-up" stagger={0.1} className="space-y-6">
            {rules.map((rule) => (
              <div key={rule.title} className="flex items-start gap-5 p-6 bg-stone-50 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                  <rule.icon size={22} className="text-red-600" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-semibold text-stone-900 mb-1.5">{rule.title}</h2>
                  <p className="text-stone-600 leading-relaxed">{rule.body}</p>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal variant="fade-up" className="mt-10 flex items-start gap-3 p-6 border border-stone-200 rounded-xl">
            <ShieldAlert size={20} className="text-forest-600 shrink-0 mt-0.5" />
            <p className="text-sm text-stone-500 leading-relaxed">{t('rules.note')}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
