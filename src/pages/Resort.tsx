import { Link } from 'react-router-dom';
import { Mountain, Store, Flame, Baby, MapPin } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { IMAGES, resortInfo } from '@/data/accommodations';

export default function Resort() {
  return (
    <div>
      <PageHero
        title="Resort haqida"
        subtitle="Farg'ona viloyati, Shohimardon qishlog'ining eng yuqori nuqtasida joylashgan premium resort"
        image={IMAGES.heroResort}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Resort' }]}
      />

      {/* RESORT DESCRIPTION */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <p className="section-subtitle">Dugoba Resort</p>
              <h2 className="section-title mb-6">Tog'ning cho'qqisida</h2>
              <div className="space-y-4 text-stone-600 leading-relaxed">
                <p>
                  Dugoba Resort Farg'ona viloyati, Shohimardon qishlog'ining eng yuqori
                  nuqtasida joylashgan. Resort tog'ning eng yuqori qismida joylashgani sababli
                  bu yerdan tog'lar va go'zal tog' manzarasi juda yaxshi ko'rinadi.
                </p>
                <p>
                  Resortda tur paketlari ham mavjud. Mehmonlar tur paketlari orqali resortga
                  kelib-ketishlari mumkin. Bu dam olishni yanada qulay va unutilmas qiladi.
                </p>
                <p>
                  Resort hududida 5 ta alohida kottej, 24 ta alohida xona, o'choqxona, bolalar
                  maydonchasi, kirish qismidagi magazin va ko'plab boshqa qulayliklar mavjud.
                  Har bir obyekt alohida sahifa va barcha zarur ma'lumotlarga ega.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-forest-50 rounded-sm">
                  <div className="font-serif text-3xl font-bold text-forest-700">29</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Obyekt</div>
                </div>
                <div className="text-center p-4 bg-forest-50 rounded-sm">
                  <div className="font-serif text-3xl font-bold text-forest-700">5</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Kottej</div>
                </div>
                <div className="text-center p-4 bg-forest-50 rounded-sm">
                  <div className="font-serif text-3xl font-bold text-forest-700">24</div>
                  <div className="text-xs text-stone-500 uppercase tracking-wider mt-1">Xona</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-4">
              <img src={IMAGES.resortAerial} alt="Resort aerial ko'rinishi" className="w-full h-80 object-cover rounded-sm shadow-lg" loading="lazy" />
              <div className="grid grid-cols-2 gap-4">
                <img src={IMAGES.resortTerrace} alt="Resort terasi" className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={IMAGES.resortGarden} alt="Resort bog'i" className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESORT AREAS */}
      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="text-center mb-16">
            <p className="section-subtitle">Resort hududi</p>
            <h2 className="section-title">Qulayliklar va hududlar</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.shop1} alt="Magazin" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Store size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">Kirish qismidagi magazin</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Resortga kirib kelganda, eshik tagida kichik magazin mavjud. Ushbu magazinda
                  mehmonlarga dam olish vaqtida kerak bo'ladigan zarur narsalarning barchasini
                  xarid qilish mumkin.
                </p>
              </div>
            </div>

            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.stove} alt="O'choqxona" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Flame size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">O'choqxona</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Resort hududiga kirib kelganda to'g'ridan mehmonlar ovqat tayyorlashi uchun
                  o'choqxona mavjud. O'choqxona odamlar o'zlari ovqat pishirishlari uchun
                  mo'ljallangan. Chap va o'ng tomonlarida tapchanlar mavjud.
                </p>
              </div>
            </div>

            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.playground1} alt="Bolalar maydonchasi" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Baby size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">Bolalar maydonchasi</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Resort hududida barcha mehmonlar uchun bitta umumiy bolalar maydonchasi mavjud.
                  Ushbu bolalar maydonchasidan resortdagi barcha mehmonlar foydalanishi mumkin.
                </p>
              </div>
            </div>

            <div className="lux-card flex flex-col sm:flex-row overflow-hidden">
              <img src={IMAGES.mountain1} alt="Tog' manzarasi" className="w-full sm:w-2/5 h-48 sm:h-auto object-cover" loading="lazy" />
              <div className="p-6 flex-1">
                <Mountain size={28} className="text-forest-600 mb-3" />
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2">Tog' manzarasi</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  Resort tog'ning eng yuqori qismida joylashgani sababli bu yerdan tog'lar va
                  go'zal tog' manzarasi juda yaxshi ko'rinadi. Bu resortning asosiy afzalligidir.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-24 bg-forest-950 text-white">
        <div className="container-lux text-center">
          <MapPin size={40} className="mx-auto text-forest-400 mb-6" />
          <p className="section-subtitle text-forest-400">Joylashuv</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold mb-4">
            {resortInfo.location}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Shohimardon qishlog'ining eng yuqori nuqtasida, tog'lar qo'ynida joylashgan.
            Tur paketlari orqali resortga kelib-ketish mumkin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span aria-disabled="true" className="btn-primary cursor-not-allowed">
              Tur paketlari
            </span>
            <Link to="/aloqa" className="btn-secondary">
              Aloqa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
