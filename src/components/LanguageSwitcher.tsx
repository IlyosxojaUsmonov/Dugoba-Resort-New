import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const isDark = variant === 'dark';

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-sm font-medium tracking-wide transition-colors duration-300 ${
          isDark
            ? 'border-forest-400/40 text-white/80 hover:bg-white/10'
            : 'border-stone-300 text-stone-600 hover:bg-stone-100'
        }`}
      >
        {language.toUpperCase()}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className={`absolute right-0 mt-2 min-w-[9rem] rounded-xl border shadow-xl overflow-hidden z-50 ${
            isDark ? 'bg-stone-900 border-forest-400/40' : 'bg-white border-stone-200'
          }`}
        >
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                role="option"
                aria-selected={language === l.code}
                onClick={() => {
                  setLanguage(l.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                  language === l.code
                    ? isDark
                      ? 'bg-forest-700 text-white'
                      : 'bg-forest-50 text-forest-700'
                    : isDark
                      ? 'text-white/70 hover:bg-white/10'
                      : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                {l.label}
                {language === l.code && <Check size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
