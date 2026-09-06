import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from '@/i18n/useTranslation';

const STORAGE_KEY = 'dugoba-cookie-consent';

interface CookiePrefs {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

function readStoredPrefs(): CookiePrefs | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed as CookiePrefs;
    return null;
  } catch {
    return null;
  }
}

function savePrefs(prefs: Omit<CookiePrefs, 'timestamp'>) {
  const full: CookiePrefs = { ...prefs, timestamp: Date.now() };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
}

function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
        checked ? 'bg-forest-700' : 'bg-stone-300'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readStoredPrefs();
    if (!existing) {
      setMounted(true);
      const timer = window.setTimeout(() => setBannerOpen(true), 400);
      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = settingsOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [settingsOpen]);

  const closeBanner = () => {
    setBannerOpen(false);
    setSettingsOpen(false);
    window.setTimeout(() => setMounted(false), 350);
  };

  const acceptAll = () => {
    savePrefs({ necessary: true, analytics: true, marketing: true });
    closeBanner();
  };

  const saveSettings = () => {
    savePrefs({ necessary: true, analytics, marketing });
    closeBanner();
  };

  if (!mounted) return null;

  return (
    <>
      <div
        role="dialog"
        aria-live="polite"
        aria-label={t('cookieConsent.modalTitle')}
        className={`fixed inset-x-0 bottom-0 z-[80] flex justify-center px-4 pb-4 sm:px-6 transition-all duration-[350ms] ease-out ${
          bannerOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full max-w-3xl overflow-hidden rounded-xl border-t-2 border-forest-500 bg-white shadow-2xl">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="hidden shrink-0 sm:flex h-11 w-11 items-center justify-center rounded-full bg-forest-50">
              <Cookie size={22} className="text-forest-700" />
            </div>

            <p className="flex-1 text-sm leading-relaxed text-stone-600">
              {t('cookieConsent.message')}{' '}
              <Link to="/maxfiylik-siyosati" className="font-medium text-forest-700 underline underline-offset-2 hover:text-forest-800">
                {t('cookieConsent.privacyLink')}
              </Link>
            </p>

            <div className="flex shrink-0 flex-col-reverse gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={() => setSettingsOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50"
              >
                <SlidersHorizontal size={15} />
                {t('cookieConsent.settings')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="inline-flex items-center justify-center rounded-xl bg-forest-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-800"
              >
                {t('cookieConsent.acceptAll')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {settingsOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={() => setSettingsOpen(false)} />

          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl animate-scale-in" data-lenis-prevent>
            <div className="flex items-center justify-between border-b border-stone-100 p-6">
              <h3 className="font-serif text-xl font-semibold text-stone-900">{t('cookieConsent.modalTitle')}</h3>
              <button onClick={() => setSettingsOpen(false)} className="p-1 text-stone-400 hover:text-stone-600" aria-label={t('cookieConsent.close')}>
                <X size={22} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <p className="text-sm leading-relaxed text-stone-600">{t('cookieConsent.modalDescription')}</p>

              <div className="flex items-start justify-between gap-4 rounded-xl bg-stone-50 p-4">
                <div>
                  <h4 className="text-sm font-medium text-stone-900">{t('cookieConsent.necessaryTitle')}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">{t('cookieConsent.necessaryDesc')}</p>
                  <span className="mt-2 inline-block text-[11px] font-medium uppercase tracking-wide text-forest-600">
                    {t('cookieConsent.alwaysOn')}
                  </span>
                </div>
                <Toggle checked disabled />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl p-4">
                <div>
                  <h4 className="text-sm font-medium text-stone-900">{t('cookieConsent.analyticsTitle')}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">{t('cookieConsent.analyticsDesc')}</p>
                </div>
                <Toggle checked={analytics} onChange={setAnalytics} />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-xl p-4">
                <div>
                  <h4 className="text-sm font-medium text-stone-900">{t('cookieConsent.marketingTitle')}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">{t('cookieConsent.marketingDesc')}</p>
                </div>
                <Toggle checked={marketing} onChange={setMarketing} />
              </div>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-stone-100 p-6 sm:flex-row">
              <button
                type="button"
                onClick={saveSettings}
                className="w-full rounded-xl bg-forest-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-800"
              >
                {t('cookieConsent.save')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="w-full rounded-xl border border-stone-300 px-6 py-3 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-50"
              >
                {t('cookieConsent.acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
