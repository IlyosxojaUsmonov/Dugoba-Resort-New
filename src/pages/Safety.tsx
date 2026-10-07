import { Link } from 'react-router-dom';
import {
  ShieldCheck, AlertTriangle, Ban, Scale, Flag, Utensils, Pill, Heart,
} from 'lucide-react';

const FOOD_RULES = [
  'Yaroqlilik muddati ko\'rsatilgan va o\'tmagan bo\'lishi shart.',
  'Tayyorlangan/qadoqlangan sana aniq yozilishi kerak.',
  'Pishirilgan taom 24 soat ichida olib ketilishi tavsiya etiladi.',
  'Qadoqlangan oziq-ovqat original qadoqda bo\'lsa, yaxshi.',
  'Muddati o\'tgan, buzilgan yoki shubhali oziq-ovqat joylash mumkin emas.',
  'Oziq-ovqatni uchrashganda ko\'zdan kechirib, so\'ng oling.',
];

const PROHIBITED = [
  'Dori-darmon va retsept bo\'yicha beriladigan vositalar',
  'Tibbiy asbob-uskunalar va shpritslar',
  'Ochiq yaraga ishlatiladigan materiallar',
  'Muddati noma\'lum yoki belgisiz oziq-ovqat',
  'Pul so\'rash yoki yashirin to\'lov talab qilish',
];

export function Safety() {
  return (
    <div className="container-page py-8 lg:py-12">
      <div className="max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-neutral-800">
              Xavfsizlik va qoidalar
            </h1>
            <p className="text-neutral-500">
              Hamma uchun xavfsiz va ishonchli muhit
            </p>
          </div>
        </div>

        {/* Food safety */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-800">
            <Utensils className="h-5 w-5 text-primary-600" />
            Oziq-ovqat xavfsizligi
          </h2>
          <p className="mt-2 text-neutral-600">
            Oziq-ovqat berish — mas'uliyatli ish. Quyidagi qoidalarga rioya
            qilish har bir beruvchi uchun majburiy:
          </p>
          <ul className="mt-4 space-y-2">
            {FOOD_RULES.map((rule, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-700">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Heart className="h-3 w-3" fill="currentColor" />
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Prohibited */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-800">
            <Ban className="h-5 w-5 text-red-600" />
            Qat'iy taqiqlangan narsalar
          </h2>
          <p className="mt-2 text-neutral-600">
            Quyidagi narsalar platformada joylash mumkin emas. Agar topsangiz,
            shikoyat qiling:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {PROHIBITED.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-neutral-700">
                <Pill className="h-4 w-4 flex-shrink-0 text-red-600" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-800">
            <Scale className="h-5 w-5 text-primary-600" />
            Mas'uliyat cheklovi
          </h2>
          <div className="mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-5">
            <div className="flex gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-accent-600" />
              <p className="text-sm leading-relaxed text-neutral-600">
                xayr-ehson.uz — faqat muloqot vositasidir. Platforma
                foydalanuvchilar tomonidan beriladigan buyumlar holati,
                sifati yoki xavfsizligi uchun javobgar emas. Har bir
                foydalanuvchi o\'z harakatlari uchun shaxsan javobgardir.
                Oziq-ovqat va boshqa buyumlarni uchrashganda tekshirib olish
                sizning mas'uliyatingizdir.
              </p>
            </div>
          </div>
        </section>

        {/* Complaint guide */}
        <section className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-neutral-800">
            <Flag className="h-5 w-5 text-primary-600" />
            Firibgarlik yoki pul so\'rash bo\'lsa
          </h2>
          <p className="mt-2 text-neutral-600">
            Agar kimdir sizdan pul so\'rasa, yolg\'on ma\'lumot bersa yoki
            spam tarqatsa — darhol shikoyat qiling:
          </p>
          <ol className="mt-4 space-y-3">
            <li className="flex gap-3 text-sm text-neutral-700">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">1</span>
              E'lon sahifasidagi "Shikoyat qilish" tugmasini bosing
            </li>
            <li className="flex gap-3 text-sm text-neutral-700">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">2</span>
              Shikoyat sababini tanlang va izoh yozing
            </li>
            <li className="flex gap-3 text-sm text-neutral-700">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">3</span>
              Yuborish — biz har bir shikoyatni moderatsiya qilamiz
            </li>
          </ol>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/browse" className="btn-primary">
            E\'lonlarni ko\'rish
          </Link>
          <Link to="/contact" className="btn-outline">
            Savol bering
          </Link>
        </div>
      </div>
    </div>
  );
}
