import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://dugobaresort.uz';
const SITE_NAME = 'Dugoba Resort';

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

interface DocumentMetaOptions {
  /** Sahifaga xos sarlavha. "— Dugoba Resort" avtomatik qo'shiladi. */
  title: string;
  description: string;
  /** true bo'lsa, title oxiriga "— Dugoba Resort" qo'shilmaydi (masalan, bosh sahifa uchun). */
  rawTitle?: boolean;
}

/** Har bir sahifada chaqirilib, document title/meta description/canonical'ni SPA navigatsiyasida yangilab turadi. */
export function useDocumentMeta({ title, description, rawTitle = false }: DocumentMetaOptions) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = rawTitle ? title : `${title} — ${SITE_NAME}`;
    document.title = fullTitle;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', `${SITE_URL}${location.pathname}`);
    setCanonical(`${SITE_URL}${location.pathname}`);
  }, [title, description, rawTitle, location.pathname]);
}
