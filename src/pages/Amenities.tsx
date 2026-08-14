import { Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { amenities, IMAGES } from '@/data/accommodations';

export default function Amenities() {
  return (
    <div>
      <PageHero
        title="Qulayliklar"
        subtitle="Resortning barcha qulayliklari — dam olish uchun zarur bo'lgan barcha sharoitlar"
        image={IMAGES.resortElegant}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Qulayliklar' }]}
      />

      {/* AMENITIES GRID */}
      <section className="py-20 bg-white">
        <div className="container-lux">
          <div className="text-center mb-12">
            <p className="section-subtitle">Barcha qulayliklar</p>
            <h2 className="section-title">Dam olish uchun to'liq sharoit</h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              Resort tog'ning eng yuqori nuqtasida joylashgan bo'lib, mehmonlarga
              barcha zarur qulayliklarni taqdim etadi.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenities.map((amenity) => (
              <div key={amenity.id} className="lux-card overflow-hidden group">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 right-4 font-serif text-xl font-semibold text-white">
                    {amenity.name}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-stone-600 leading-relaxed">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL LIST */}
      <section className="py-20 bg-stone-50">
        <div className="container-lux max-w-4xl">
          <p className="section-subtitle mb-3">To'liq ro'yxat</p>
          <h2 className="section-title mb-8">Barcha qulayliklar ro'yxati</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              'Farg\'ona viloyati, Shohimardon qishlog\'ining eng yuqori nuqtasi',
              'Tog\' manzarasi',
              'Tur paketlari',
              'Tur bilan kelib-ketish imkoniyati',
              'Kirish qismidagi kichik magazin',
              'Zarur narsalarni xarid qilish imkoniyati',
              'O\'choqxona',
              'Mehmonlarning o\'zlari ovqat pishirish imkoniyati',
              'O\'choqxona chap tomonidagi tapchanlar',
              'O\'choqxona o\'ng tomonidagi tapchanlar',
              'Umumiy bolalar maydonchasi',
              '5 ta asosiy kottej',
              'Har bir kottej uchun shaxsiy orqa tapchan',
              'Xonalarda dush',
              'Xonalarda sanuzel',
              'Wi-Fi',
              'Televizor',
              'Har bir xona uchun shaxsiy so\'ri/tapchan',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-sm border border-stone-100">
                <div className="w-6 h-6 rounded-full bg-forest-50 flex items-center justify-center shrink-0">
                  <Check size={14} className="text-forest-600" />
                </div>
                <span className="text-sm text-stone-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
