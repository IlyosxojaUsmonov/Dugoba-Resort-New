import { Link } from "react-router-dom";
import {
  Camera,
  Tag,
  HandHeart,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Heart,
  Package,
  Bookmark,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

const GIVER_STEPS = [
  {
    icon: Camera,
    title: "Rasm yuklang",
    desc: "Ortig'ingiz qolgan narsani suratga oling. 1-3 ta rasm yetarli.",
  },
  {
    icon: Tag,
    title: "Kategoriya va holat tanlang",
    desc: "Narsa turini va holatini belgilang (Yangi, Yaxshi, Ishlatilgan).",
  },
  {
    icon: MapPin,
    title: "Hududni ko'rsating",
    desc: "Aniq manzil emas, faqat tuman va taxminiy mo'jal yetarli.",
  },
  {
    icon: HandHeart,
    title: "Uchrashib bering",
    desc: "Muhtoj kishi bron qilganda, kontakti ochiladi. Qulay joyda uchrashing.",
  },
];

const RECEIVER_STEPS = [
  {
    icon: Package,
    title: "Katalogdan qiding",
    desc: "Kategoriya va hudud bo'yicha kerakli narsani toping.",
  },
  {
    icon: Bookmark,
    title: "Bron qiling",
    desc: 'E\'lon sahifasida "Bron qilish" tugmasini bosing va tasdiqlang.',
  },
  {
    icon: HandHeart,
    title: "Bog'laning",
    desc: "Bron qilingandan keyin beruvchining telefon va Telegram kontakti ochiladi.",
  },
  {
    icon: CheckCircle2,
    title: "Olib keting",
    desc: "24 soat ichida uchrashib, buyumni olib keting. Holatni tekshirishni unutmang.",
  },
];

const FAQ = [
  {
    q: "Bu platformada haqiqatdan ham hammasi tekinmi?",
    a: "Ha. Platformada faqat 0 so'm e'lonlar joylashadi. Pul so'rash qat'iy taqiqlangan va shikoyat qilingan foydalanuvchilar o'chiriladi.",
  },
  {
    q: "Aniq manzilim ko'rinib qoladimi?",
    a: "Yo'q. Siz faqat tuman va taxminiy mo'jal ko'rsatasiz (masalan, \"metro yaqini\"). Aniq manzilni faqat o'z ixtiyoringiz bilan, beruvchi bilan kelishgandan keyin aytasiz.",
  },
  {
    q: "Oziq-ovqat qanday xavfsiz?",
    a: "Oziq-ovqat e'lonlarida tayyorlangan/qadoqlangan sana va yaroqlilik muddati ko'rsatilishi shart. Muddati o'tgan oziq-ovqat joylash mumkin emas. Uchrashganda holatni tekshirib oling.",
  },
  {
    q: "Dori-darmon bera olamanmi?",
    a: "Yo'q. Dori-darmon va tibbiy buyumlar platformada qat'iy taqiqlangan. Bu xavfsizlik qoidalaridir.",
  },
  {
    q: "Bron qildim, lekin 24 soatda olib ketolmadim — nima bo'ladi?",
    a: "Bron avtomatik bekor qilinadi va e'lon qaytadan \"Mavjud\" statusiga o'tadi. Qayta bron qilishingiz mumkin.",
  },
  {
    q: "Pul so'rashdi yoki firibgarlik sezdim — nima qilaman?",
    a: "Darhol e'lon sahifasidagi \"Shikoyat qilish\" tugmasi orqali shikoyat yuboring. Biz har bir shikoyatni ko'rib chiqamiz.",
  },
];

export function HowItWorks() {
  return (
    <div className="container-page py-8 lg:py-12">
      <div className="text-center">
        <h1 className="font-display text-3xl font-semibold text-neutral-800 lg:text-4xl">
          Qanday ishlaydi?
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-neutral-500">
          xayr-ehson.uz — bu ehson shkafining raqamli varianti. Ortig'ingizni
          bering yoki muhtoj narsani oling. Hammasi tekin, so'ramasdan.
        </p>
      </div>

      {/* Giver guide */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-neutral-800">
          <Heart className="h-6 w-6 text-primary-600" fill="currentColor" />
          Beruvchilar uchun
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {GIVER_STEPS.map((step, i) => (
            <div key={i} className="card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-xs font-bold text-accent-600">
                {i + 1}-qadam
              </div>
              <h3 className="mt-1 font-semibold text-neutral-800">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-neutral-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Receiver guide */}
      <section className="mt-12">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-neutral-800">
          <Package className="h-6 w-6 text-primary-600" />
          Oluvchilar uchun
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RECEIVER_STEPS.map((step, i) => (
            <div key={i} className="card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-xs font-bold text-accent-600">
                {i + 1}-qadam
              </div>
              <h3 className="mt-1 font-semibold text-neutral-800">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-neutral-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-16">
        <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-neutral-800">
          <HelpCircle className="h-6 w-6 text-primary-600" />
          Ko'p beriladigan savollar
        </h2>
        <div className="mt-6 space-y-3">
          {FAQ.map((item, i) => (
            <details key={i} className="card group p-5">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-neutral-800 list-none">
                {item.q}
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-neutral-400 transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 rounded-2xl bg-primary-700 p-10 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-accent-300" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-white">
          Tayyormisiz?
        </h2>
        <p className="mt-2 text-primary-100">
          Ortig'ingizni bering yoki muhtoj narsani oling
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link to="/create" className="btn-accent">
            <Camera className="h-5 w-5" />
            E'lon joylashtirish
          </Link>
          <Link
            to="/browse"
            className="btn border border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            E'lonlarni ko'rish
          </Link>
        </div>
      </section>
    </div>
  );
}
