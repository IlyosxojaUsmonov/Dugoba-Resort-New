import { Link } from 'react-router-dom';
import {
  Mountain, Users, Wifi, ShowerHead, TreePine, Store, Flame,
  Baby, ArrowRight, ChevronRight, Building2,
} from 'lucide-react';
import { accommodations, IMAGES } from '@/data/accommodations';
import AccommodationCard from '@/components/AccommodationCard';

export default function Home() {
  const featuredCottages = accommodations.filter((a) => a.type === 'cottage').slice(0, 3);
  const featuredRooms = accommodations.filter((a) => a.type === 'room').slice(0, 6);
  const stats = [
    { icon: Building2, value: '29', label: 'Alohida obyekt' },
    { icon: Mountain, value: '5', label: 'Premium kottej' },
    { icon: Users, value: '24', label: 'Zamonaviy xona' },
    { icon: TreePine, value: '100%', label: 'Tog\' manzarasi' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.heroResort}
            alt="Dugoba Resort"
            className="w-full h-full object-cover animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/80" />
        </div>

        <div className="relative container-lux text-center text-white pt-20">
          <div className="animate-fade-up">
            <p className="text-sm sm:text-base text-forest-300 tracking-[0.3em] uppercase font-medium mb-4">
              Farg'ona viloyati · Shohimardon
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight text-shadow-lux mb-6">
              Dugoba Resort
            </h1>
            <p className="text-lg sm:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Tog'ning eng yuqori nuqtasida joylashgan premium resort. Go'zal tog' manzarasi,
              qulay kottejlar va zamonaviy xonalar bilan dam olishning eng yuqori darajasi.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/xonalar" className="btn-primary">
                Xonalarni ko'rish
              </Link>
              <span aria-disabled="true" className="btn-secondary cursor-not-allowed">
                Tur paketlarini ko'rish
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-lux pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 backdrop-blur-md rounded-sm overflow-hidden">
              {stats.map((s) => (
                <div key={s.label} className="bg-stone-950/40 backdrop-blur-md p-4 sm:p-6 text-center">
                  <s.icon size={24} className="text-forest-300 mx-auto mb-2" />
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle">Resort haqida</p>
              <h2 className="section-title mb-6">
                Tog'ning cho'qqisida joylashgan<br />tanaffus sz uchun ideal joy
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Dugoba Resort Farg'ona viloyati, Shohimardon qishlog'ining eng yuqori nuqtasida
                joylashgan. Resort tog'ning eng yuqori qismida joylashgani sababli bu yerdan
                tog'lar va go'zal tog' manzarasi juda yaxshi ko'rinadi.
              </p>
              <p className="text-stone-600 leading-relaxed mb-8">
                Resortda 5 ta alohida kottej, 24 ta alohida xona, tur paketlari, o'choqxona,
                bolalar maydonchasi va boshqa ko'plab qulayliklar mavjud. Har bir obyekt alohida
                sahifa va barcha zarur ma'lumotlarga ega.
              </p>
              <Link to="/resort" className="inline-flex items-center gap-2 text-forest-700 font-medium hover:gap-3 transition-all">
                Batafsil ma'lumot
                <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img src={IMAGES.mountain1} alt="Tog' manzarasi" className="w-full h-64 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={IMAGES.cottage1} alt="Kottej" className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
              <div className="space-y-4 pt-8">
                <img src={IMAGES.resortTerrace} alt="Resort terasi" className="w-full h-48 object-cover rounded-sm shadow-md" loading="lazy" />
                <img src={IMAGES.mountain3} alt="Tog'lar" className="w-full h-64 object-cover rounded-sm shadow-md" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED COTTAGES */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-subtitle">Premium turar joy</p>
              <h2 className="section-title">Kottejlar</h2>
              <p className="text-stone-600 mt-3 max-w-xl">
                5 ta alohida kottej — har biri o'zining sig'im, narx va qulayliklariga ega.
              </p>
            </div>
            <Link to="/kottejlar" className="btn-ghost">
              Barcha kottejlar
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCottages.map((c) => (
              <AccommodationCard key={c.id} accommodation={c} />
            ))}
          </div>
        </div>
      </section>

      {/* PARALLAX MOUNTAIN VIEW */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center parallax-bg" style={{ backgroundImage: `url(${IMAGES.mountain2})` }}>
        <div className="absolute inset-0 bg-stone-950/50" />
        <div className="relative container-lux text-center text-white">
          <Mountain size={48} className="mx-auto mb-6 text-forest-300" />
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-4 text-shadow-lux">
            Tog' manzarasi
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Resortning eng yuqori nuqtasidan tog'larning go'zal manzarasini bahramand bo'ling
          </p>
          <Link to="/tog-manzarasi" className="btn-secondary">
            Tog' manzarasini ko'rish
          </Link>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <p className="section-subtitle">Zamonaviy turar joy</p>
              <h2 className="section-title">Xonalar</h2>
              <p className="text-stone-600 mt-3 max-w-xl">
                24 ta alohida xona — 3, 4, 6, 8 va 10 kishilik variantlar.
              </p>
            </div>
            <Link to="/xonalar" className="btn-ghost">
              Barcha xonalar
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((r) => (
              <AccommodationCard key={r.id} accommodation={r} />
            ))}
          </div>
        </div>
      </section>

      {/* AMENITIES PREVIEW */}
      <section className="py-24 bg-white">
        <div className="container-lux">
          <div className="text-center mb-12">
            <p className="section-subtitle">Resort qulayliklari</p>
            <h2 className="section-title">Dam olish uchun barcha sharoitlar</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Mountain, label: 'Tog\' manzarasi' },
              { icon: Store, label: 'Magazin' },
              { icon: Flame, label: 'O\'choqxona' },
              { icon: Baby, label: 'Bolalar maydoni' },
              { icon: Wifi, label: 'Wi-Fi' },
              { icon: ShowerHead, label: 'Dush va sanuzel' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-sm hover:border-forest-200 hover:shadow-md transition-all group">
                <div className="w-14 h-14 rounded-full bg-forest-50 flex items-center justify-center mb-3 group-hover:bg-forest-100 transition-colors">
                  <item.icon size={24} className="text-forest-600" />
                </div>
                <span className="text-sm font-medium text-stone-700">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/qulayliklar" className="btn-ghost">
              Barcha qulayliklar
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.resortPool} alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-stone-950/80" />
        </div>
        <div className="relative container-lux text-center text-white">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold mb-4">
            Dam olishni boshlang
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8">
            29 ta alohida obyektdan o'zingizga mosini tanlang va bron qiling.
            Administrator bo'sh kunlarni tekshiradi va sizga xabar beradi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/xonalar" className="btn-primary">
              Xonalar va kottejlar
            </Link>
            <Link to="/aloqa" className="btn-secondary">
              Bog'lanish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
