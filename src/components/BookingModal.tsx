import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { useBookingModal } from '@/lib/store';

const TELEGRAM_USERNAME = 'sherzod015';
const NIGHT_PRESETS = [1, 2, 3, 4, 5, 7, 10];

export default function BookingModal() {
  const { isOpen, accommodationName, close } = useBookingModal();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [customNights, setCustomNights] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setSent(false);
        setError(null);
        setName('');
        setPhone('');
        setGuests(1);
        setNights(1);
        setCustomNights('');
        setNotes('');
      }, 300);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const finalNights = customNights ? parseInt(customNights, 10) || nights : nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accommodationName) return;

    if (!name.trim() || !phone.trim()) {
      setError('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
      return;
    }

    if (!finalNights || finalNights < 1) {
      setError('Iltimos, qolish muddatini kiriting.');
      return;
    }

    setError(null);

    const lines = [
      'Dugoba Resort — Bron so\'rovi',
      '',
      `Xona/kottej: ${accommodationName}`,
      `Ism: ${name.trim()}`,
      `Telefon: ${phone.trim()}`,
      `Mehmonlar soni: ${guests} kishi`,
      `Qolish muddati: ${finalNights} kun`,
      `Izoh: ${notes.trim() || '—'}`,
    ];

    const message = lines.join('\n');
    const url = `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={close} />

      <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        {sent ? (
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mb-4">
                <CheckCircle2 size={36} className="text-forest-600" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                Telegram ochildi
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Yangi oynada Telegram chatiga o'tdingiz. Bron ma'lumotlaringiz tayyor xabar
                sifatida kiritilgan — so'rovni yuborish uchun Telegramdagi{' '}
                <span className="font-medium text-stone-900">Yuborish (Send)</span> tugmasini bosing.
                Admin siz bilan bog'lanib, kelish sanasini birgalikda kelishadi.
              </p>
            </div>

            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-forest-700 text-white font-medium rounded-sm hover:bg-forest-800 transition-colors mb-3"
            >
              <Send size={18} />
              Telegramni qayta ochish
            </a>
            <button
              onClick={close}
              className="w-full px-6 py-3 border border-stone-300 text-stone-600 font-medium rounded-sm hover:bg-stone-50 transition-colors"
            >
              Yopish
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-xl font-semibold text-stone-900">Bron qilish</h3>
                <p className="text-sm text-forest-600 mt-1">{accommodationName}</p>
              </div>
              <button onClick={close} className="text-stone-400 hover:text-stone-600 p-1">
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-xs text-stone-500 bg-stone-50 p-3 rounded-sm">
                Ma'lumotlaringizni to'ldiring — tayyor xabar bilan Telegram ochiladi. Kelish
                sanasini kiritish shart emas, admin siz bilan bog'lanib kelishadi.
              </p>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Ism <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition-all"
                  placeholder="Ismingiz"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Telefon raqam <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition-all"
                  placeholder="+998 XX XXX XX XX"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Mehmonlar soni
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-stone-300 rounded-sm text-stone-600 hover:bg-stone-100"
                  >
                    −
                  </button>
                  <span className="w-12 text-center font-medium text-stone-900">{guests}</span>
                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-stone-300 rounded-sm text-stone-600 hover:bg-stone-100"
                  >
                    +
                  </button>
                  <span className="text-xs text-stone-400 ml-2">kishi</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-2">
                  Necha kun qolmoqchisiz? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {NIGHT_PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => { setNights(n); setCustomNights(''); }}
                      className={`px-4 py-2 text-sm rounded-sm border transition-all ${
                        nights === n && !customNights
                          ? 'bg-forest-700 text-white border-forest-700'
                          : 'bg-white text-stone-600 border-stone-300 hover:border-forest-400'
                      }`}
                    >
                      {n} kun
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min="1"
                  value={customNights}
                  onChange={(e) => setCustomNights(e.target.value)}
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition-all"
                  placeholder="Yoki o'zingiz kun sonini kiriting"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1.5">
                  Qo'shimcha izoh
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition-all resize-none"
                  placeholder="Qo'shimcha ma'lumot yoki savollar..."
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 text-red-700 rounded-sm text-sm">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full px-6 py-3.5 bg-forest-700 text-white font-medium rounded-sm hover:bg-forest-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Bron qilish
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-3">
                  Telegram orqali @{TELEGRAM_USERNAME} ga tayyor xabar bilan yo'naltirasiz
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
