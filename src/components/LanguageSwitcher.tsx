import { useTranslation } from '@/i18n/useTranslation';
import type { Language } from '@/i18n/language';

const LANGS: { code: Language; label: string }[] = [
  { code: 'uz', label: "O'zbekcha" },
  { code: 'ru', label: 'Русский' },
];

interface Props {
  variant?: 'dark' | 'light';
}

export default function LanguageSwitcher({ variant = 'dark' }: Props) {
  const { language, setLanguage } = useTranslation();

  const base =
    variant === 'dark'
      ? 'border-forest-400/40 text-white/80'
      : 'border-stone-300 text-stone-600';

  return (
    <div className={`flex items-center rounded-sm border ${base} overflow-hidden text-sm`}>
      {LANGS.map((l, i) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLanguage(l.code)}
          aria-pressed={language === l.code}
          className={`px-3 py-1.5 font-medium tracking-wide transition-colors duration-300 ${
            i > 0 ? 'border-l border-inherit' : ''
          } ${
            language === l.code
              ? 'bg-forest-700 text-white'
              : variant === 'dark'
                ? 'text-white/70 hover:text-white hover:bg-white/10'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          {l.code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
