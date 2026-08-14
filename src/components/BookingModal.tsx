import { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, AlertCircle, Send } from 'lucide-react';
import { useBookingModal } from '@/lib/store';

interface BookingResult {
  success: boolean;
  message: string;
  booking?: {
    first_name: string;
    last_name: string;
    phone: string;
    guests: number;
    nights: number;
    accommodation_name: string;
    price_per_night: string;
    notes?: string | null;
    status: string;
  };
}

const NIGHT_PRESETS = [1, 2, 3, 5, 7, 10];

export default function BookingModal() {
  const { isOpen, accommodationId, accommodationName, priceDisplay, close } = useBookingModal();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(1);
  const [customNights, setCustomNights] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BookingResult | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setTimeout(() => {
        setResult(null);
        setError(null);
        setFirstName('');
        setLastName('');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accommodationId || !accommodationName || !priceDisplay) return;
    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setError('Iltimos, barcha majburiy maydonlarni to\'ldiring.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      const response = await fetch(`${supabaseUrl}/functions/v1/send-telegram-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          accommodation_id: accommodationId,
          accommodation_name: accommodationName,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          guests: Number(guests),
          nights: Number(finalNights),
          notes: notes.trim() || null,
          price_per_night: priceDisplay,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Xatolik yuz berdi');
      }

      setResult({
        success: true,
        message: data.message || 'Bron so\'rovingiz yuborildi.',
        booking: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone.trim(),
          guests: Number(guests),
          nights: Number(finalNights),
          accommodation_name: accommodationName,
          price_per_night: priceDisplay,
          notes: notes.trim() || null,
          status: 'pending',
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bron yuborishda xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm" onClick={close} />

      <div className="relative bg-white rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in">
        {result ? (
          <div className="p-8">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-forest-100 flex items-center justify-center mb-4">
                <CheckCircle2 size={36} className="text-forest-600" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-stone-900 mb-2">
                Bron so'rovingiz yuborildi
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Administrator bo'sh kunlarni tekshiradi va sizga xabar beradi.
              </p>
            </div>

            <div className="bg-stone-50 rounded-sm p-6 mb-6">
              <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-4">
                Sizning bron so'rovingiz
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between text-sm">
                  <dt className="text-stone-500">Obyekt</dt>
                  <dd className="font-medium text-stone-900">{result.booking?.accommodation_name}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-stone-500">Ism</dt>
                  <dd className="font-medium text-stone-900">{result.booking?.first_name} {result.booking?.last_name}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-stone-500">Telefon</dt>
                  <dd className="font-medium text-stone-900">{result.booking?.phone}</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-stone-500">Mehmonlar soni</dt>
                  <dd className="font-medium text-stone-900">{result.booking?.guests} kishi</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-stone-500">Dam olish muddati</dt>
                  <dd className="font-medium text-stone-900">{result.booking?.nights} kun</dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-stone-500">Kunlik narx</dt>
                  <dd className="font-medium text-stone-900">{result.booking?.price_per_night}</dd>
                </div>
                {result.booking?.notes && (
                  <div className="flex justify-between text-sm">
                    <dt className="text-stone-500">Izoh</dt>
                    <dd className="font-medium text-stone-900 text-right max-w-[60%]">{result.booking.notes}</dd>
                  </div>
                )}
                <div className="pt-3 border-t border-stone-200">
                  <div className="flex justify-between text-sm">
                    <dt className="text-stone-500">Status</dt>
                    <dd className="font-medium text-sand-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sand-500 animate-pulse" />
                      Administrator tekshirmoqda
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="flex gap-3">
              <button
                onClick={close}
                className="flex-1 px-6 py-3 bg-forest-700 text-white font-medium rounded-sm hover:bg-forest-800 transition-colors"
              >
                Yopish
              </button>
            </div>
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
                Administrator bo'sh kunlarni tekshiradi va sizga xabar beradi. Kelish va ketish
                sanasini kiritish shart emas — faqat necha kun dam olmoqchi ekanligingizni ko'rsating.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Ism <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition-all"
                    placeholder="Ismingiz"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1.5">
                    Familiya <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-stone-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-transparent text-sm transition-all"
                    placeholder="Familiyangiz"
                  />
                </div>
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
                  Necha kun dam olmoqchisiz?
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
                  disabled={loading}
                  className="w-full px-6 py-3.5 bg-forest-700 text-white font-medium rounded-sm hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Yuborilmoqda...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Bron so'rovini yuborish
                    </>
                  )}
                </button>
                <p className="text-[11px] text-stone-400 text-center mt-3">
                  Ma'lumotlaringiz administratorga Telegram orqali yuboriladi
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
