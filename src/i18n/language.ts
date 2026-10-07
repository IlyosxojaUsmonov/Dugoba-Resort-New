import { create } from 'zustand';

export type Language = 'uz' | 'ru';

const STORAGE_KEY = 'dugoba-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'uz';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return saved === 'ru' ? 'ru' : 'uz';
}

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (lang) => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    set({ language: lang });
  },
}));

if (typeof document !== 'undefined') {
  document.documentElement.lang = useLanguageStore.getState().language;
}
