import { useLanguageStore } from './language';
import { translations } from './translations';

type Primitive = string | number;

function resolve(obj: unknown, path: string[]): unknown {
  let node: unknown = obj;
  for (const key of path) {
    if (node && typeof node === 'object' && key in node) {
      node = (node as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return node;
}

export function useTranslation() {
  const language = useLanguageStore((s) => s.language);
  const setLanguage = useLanguageStore((s) => s.setLanguage);

  function t(key: string): string {
    const path = key.split('.');
    const value = resolve(translations[language], path);
    if (typeof value === 'string') return value;
    const fallback = resolve(translations.uz, path);
    if (typeof fallback === 'string') return fallback;
    return key;
  }

  function tList(key: string): string[] {
    const path = key.split('.');
    const value = resolve(translations[language], path);
    if (Array.isArray(value)) return value as string[];
    const fallback = resolve(translations.uz, path);
    return Array.isArray(fallback) ? (fallback as string[]) : [];
  }

  return { t, tList, language, setLanguage };
}

export type { Primitive };
