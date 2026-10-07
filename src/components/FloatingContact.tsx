import { useState } from 'react';
import { Instagram, Send, Phone, MessageCircle, X } from 'lucide-react';
import { resortInfo } from '@/data/accommodations';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    {
      href: resortInfo.instagram,
      icon: Instagram,
      label: 'Instagram',
      bg: 'bg-gradient-to-br from-pink-500 to-purple-600',
    },
    {
      href: resortInfo.telegram,
      icon: Send,
      label: 'Telegram',
      bg: 'bg-sky-500',
    },
    {
      href: `tel:${resortInfo.phone.replace(/\s/g, '')}`,
      icon: Phone,
      label: resortInfo.phone,
      bg: 'bg-forest-600',
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {links.map((link, i) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('tel:') ? undefined : '_blank'}
            rel={link.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
            className={`flex items-center gap-3 transition-all duration-300 ${
              isOpen
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-3 pointer-events-none'
            }`}
            style={{ transitionDelay: isOpen ? `${i * 60}ms` : '0ms' }}
          >
            <span className="hidden sm:block px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-medium shadow-lg whitespace-nowrap">
              {link.label}
            </span>
            <span
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg ${link.bg}`}
            >
              <link.icon size={20} />
            </span>
          </a>
        ))}

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Aloqa menyusini yopish' : 'Aloqa menyusini ochish'}
          className="w-14 h-14 rounded-full bg-forest-700 hover:bg-forest-800 text-white shadow-xl flex items-center justify-center transition-all duration-300"
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </>
  );
}
