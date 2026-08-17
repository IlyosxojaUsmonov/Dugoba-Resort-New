import { MapPin, Phone, Send, Clock, Mountain, MessageCircle } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { resortInfo, IMAGES } from '@/data/accommodations';

export default function Contact() {
  return (
    <div>
      <PageHero
        title="Aloqa"
        subtitle="Biz bilan bog'laning — savollaringizga javob beramiz va bron qilishingizga yordam beramiz"
        image={IMAGES.resortFacade}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Aloqa' }]}
      />

      <section className="py-20 bg-white">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <p className="section-subtitle">Bog'lanish</p>
              <h2 className="section-title mb-8">Aloqa ma'lumotlari</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Manzil</h4>
                    <a
                      href={resortInfo.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-600 hover:text-forest-700 transition-colors"
                    >
                      {resortInfo.location}
                    </a>
                    <p className="text-sm text-stone-500 mt-1">Tog'ning eng yuqori nuqtasida</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Telefon</h4>
                    <a href={`tel:${resortInfo.phone.replace(/\s/g, '')}`} className="text-sm text-stone-600 hover:text-forest-700 transition-colors">
                      {resortInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Send size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Telegram</h4>
                    <a
                      href={resortInfo.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-600 hover:text-forest-700 transition-colors"
                    >
                      {resortInfo.telegramUsername}
                    </a>
                    <p className="text-sm text-stone-500 mt-1">Bron qilish uchun Telegram orqali bog'laning</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-stone-50 rounded-sm">
                  <div className="w-12 h-12 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                    <Clock size={22} className="text-forest-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 mb-1">Ish vaqti</h4>
                    <p className="text-sm text-stone-600">24/7 — yil davomida</p>
                  </div>
                </div>
              </div>

              {/* Quick booking CTA */}
              <div className="mt-8 p-8 bg-forest-950 rounded-sm text-white">
                <MessageCircle size={32} className="text-forest-400 mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Tezkor bron qilish</h3>
                <p className="text-sm text-white/70 mb-5">
                  O'zingizga mos obyektni tanlang va bron so'rovini yuboring. Administrator
                  bo'sh kunlarni tekshiradi va sizga xabar beradi.
                </p>
                <a
                  href={resortInfo.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-forest-600 text-white text-sm font-medium rounded-sm hover:bg-forest-500 transition-colors"
                >
                  <Send size={16} />
                  Telegram orqali bog'lanish
                </a>
              </div>
            </div>

            {/* Image / location */}
            <div className="space-y-4">
              <a href={resortInfo.mapUrl} target="_blank" rel="noopener noreferrer" className="block group">
                <img src={IMAGES.resortAerial} alt="Resort joylashuvi" className="w-full h-80 object-cover rounded-sm shadow-lg transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
              </a>
              <div className="grid grid-cols-2 gap-4">
                <img src={IMAGES.mountain1} alt="Tog' manzarasi" className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={IMAGES.cottage1} alt="Kottej" className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
              <div className="p-6 bg-stone-50 rounded-sm">
                <Mountain size={24} className="text-forest-600 mb-3" />
                <h4 className="font-medium text-stone-900 mb-2">Resort haqida</h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Dugoba Resort — Farg'ona viloyati, Shohimardon qishlog'ining eng yuqori
                  nuqtasida joylashgan premium resort. 29 ta alohida obyekt: 5 kottej va 24 xona.
                  Tog' manzarasi, tur paketlari va to'liq qulayliklar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
