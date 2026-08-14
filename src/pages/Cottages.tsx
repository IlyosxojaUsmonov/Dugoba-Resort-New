import PageHero from '@/components/PageHero';
import AccommodationCard from '@/components/AccommodationCard';
import { accommodations, IMAGES } from '@/data/accommodations';

export default function Cottages() {
  const cottages = accommodations.filter((a) => a.type === 'cottage');

  return (
    <div>
      <PageHero
        title="Kottejlar"
        subtitle="5 ta alohida kottej — har biri o'zining sig'im, narx, qulayliklar va shaxsiy tapchaniga ega"
        image={IMAGES.cottage1}
        breadcrumb={[{ label: 'Bosh sahifa', to: '/' }, { label: 'Kottejlar' }]}
      />

      <section className="py-24 bg-stone-50">
        <div className="container-lux">
          <div className="mb-12 text-center">
            <p className="section-subtitle">Premium turar joy</p>
            <h2 className="section-title">Barcha kottejlar</h2>
            <p className="text-stone-600 mt-3 max-w-2xl mx-auto">
              Resortning to'g'ri qismida jami 5 ta kottej mavjud. Har bir kottej alohida obyekt
              sifatida yaratilgan — o'zining rasmi, galereyasi, videosi, tavsifi va bron qilish
              tugmasi bilan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cottages.map((c) => (
              <AccommodationCard key={c.id} accommodation={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
