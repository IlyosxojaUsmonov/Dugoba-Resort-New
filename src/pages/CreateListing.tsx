import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera, Tag, FileText, Package, MapPin, Calendar,
  CheckCircle2, ArrowLeft, ArrowRight, Upload, X, PartyPopper,
} from 'lucide-react';
import { useApp } from '../context';
import {
  CATEGORIES, CONDITIONS, DISTRICTS,
  type Category, type Condition, type ListingStatus,
} from '../types';
import { CategoryIcon } from '../components/CategoryIcon';
import { cn } from '../utils';

const STEPS = [
  { icon: Camera, label: 'Rasm' },
  { icon: Tag, label: 'Kategoriya' },
  { icon: FileText, label: 'Tavsif' },
  { icon: Package, label: 'Holat' },
  { icon: MapPin, label: 'Hudud' },
  { icon: Calendar, label: 'Oziq-ovqat' },
  { icon: CheckCircle2, label: 'Tasdiqlash' },
];

const PLACEHOLDER_IMAGES: Record<Category, string> = {
  food: 'https://images.pexels.com/photos/4198362/pexels-photo-4198362.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  clothing: 'https://images.pexels.com/photos/6516571/pexels-photo-6516571.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  furniture: 'https://images.pexels.com/photos/11591259/pexels-photo-11591259.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tech: 'https://images.pexels.com/photos/26150604/pexels-photo-26150604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  books: 'https://images.pexels.com/photos/18847269/pexels-photo-18847269.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  kids: 'https://images.pexels.com/photos/11116578/pexels-photo-11116578.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  other: 'https://images.pexels.com/photos/6590920/pexels-photo-6590920.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
};

interface FormData {
  images: string[];
  category: Category | '';
  title: string;
  description: string;
  condition: Condition | '';
  district: string;
  landmark: string;
  isFood: boolean;
  packagedDate: string;
  expiryDate: string;
  isCooked: boolean;
  confirmedFree: boolean;
}

const INITIAL_DATA: FormData = {
  images: [],
  category: '',
  title: '',
  description: '',
  condition: '',
  district: '',
  landmark: '',
  isFood: false,
  packagedDate: '',
  expiryDate: '',
  isCooked: false,
  confirmedFree: false,
};

export function CreateListing() {
  const navigate = useNavigate();
  const { addListing } = useApp();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState('');

  const update = (field: keyof FormData, value: unknown) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // Step 5 (food) only shows if category === 'food'
  const actualSteps = data.category === 'food' ? STEPS : STEPS.filter((_, i) => i !== 5);
  const maxStep = actualSteps.length - 1;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (data.images.length === 0)
        newErrors.images = 'Kamida bitta rasm joylash kerak';
    }
    if (currentStep === 1) {
      if (!data.category) newErrors.category = 'Kategoriya tanlang';
    }
    if (currentStep === 2) {
      if (!data.title.trim()) newErrors.title = 'Sarlavha yozing';
      else if (data.title.trim().length < 5)
        newErrors.title = 'Sarlavha kamida 5 ta harfdan iborat bo\'lsin';
      if (!data.description.trim())
        newErrors.description = 'Tavsif yozing';
      else if (data.description.trim().length < 10)
        newErrors.description = 'Tavsif kamida 10 ta harfdan iborat bo\'lsin';
    }
    if (currentStep === 3) {
      if (!data.condition) newErrors.condition = 'Holatni belgilang';
    }
    if (currentStep === 4) {
      if (!data.district) newErrors.district = 'Hududni tanlang';
      if (!data.landmark.trim())
        newErrors.landmark = 'Taxminiy manzil yoki mo\'jal yozing';
    }
    // Step 5 is food details (only when category is food)
    if (data.category === 'food' && currentStep === 5) {
      if (!data.packagedDate) newErrors.packagedDate = 'Sana kiriting';
      if (!data.expiryDate) newErrors.expiryDate = 'Yaroqlilik muddatini kiriting';
    }
    // Final step: confirmation
    const finalStepIndex = data.category === 'food' ? 6 : 5;
    if (currentStep === finalStepIndex) {
      if (!data.confirmedFree)
        newErrors.confirmedFree = 'Tekin ekanligini tasdiqlash kerak';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, maxStep));
    }
  };

  const handlePrev = () => {
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = () => {
    if (!validateStep(step)) return;

    const newId = addListing({
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category as Category,
      condition: data.condition as Condition,
      district: data.district,
      landmark: data.landmark.trim(),
      images: data.images,
      status: 'available' as ListingStatus,
      foodDetails:
        data.category === 'food'
          ? {
              packagedDate: data.packagedDate,
              expiryDate: data.expiryDate,
              isCooked: data.isCooked,
            }
          : undefined,
    });

    setSubmittedId(newId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container-page py-16 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
            <PartyPopper className="h-10 w-10 text-primary-600" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold text-neutral-800">
            Tabriklaymiz!
          </h1>
          <p className="mt-3 text-neutral-500">
            E'loningiz muvaffaqiyatli joylashtildi va katalogda ko'rinadi.
            Kimgadir bu buyum yangi hayot topadi.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(`/listing/${submittedId}`)}
              className="btn-primary"
            >
              E'lonni ko\'rish
            </button>
            <button
              onClick={() => {
                setData(INITIAL_DATA);
                setStep(0);
                setSubmitted(false);
              }}
              className="btn-outline"
            >
              Yana e\'lon joylashtirish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-neutral-800">
          E\'lon joylashtirish
        </h1>
        <p className="mt-2 text-neutral-500">
          Ortig'ingizni kimgadir bering — 0 so'mga, so'ramasdan
        </p>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-1 overflow-x-auto no-scrollbar pb-2">
          {actualSteps.map((s, i) => (
            <div key={i} className="flex items-center gap-1 flex-shrink-0">
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  i < step && 'bg-primary-600 text-white',
                  i === step && 'bg-primary-100 text-primary-700 ring-2 ring-primary-500',
                  i > step && 'bg-neutral-100 text-neutral-400'
                )}
              >
                {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
              </div>
              {i < actualSteps.length - 1 && (
                <div className={cn('h-0.5 w-6', i < step ? 'bg-primary-600' : 'bg-neutral-200')} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 text-sm font-medium text-primary-700">
          {actualSteps[step].label}
        </div>

        {/* Step content */}
        <div className="mt-6 card p-6">
          {/* Step 0: Images */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">Rasm joylash</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Buyumingizning 1-3 ta rasmini joylang
              </p>

              <div
                className="mt-4 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center cursor-pointer hover:border-primary-400 transition-colors"
                onClick={() => {
                  const placeholder = PLACEHOLDER_IMAGES[data.category || 'other'];
                  if (data.images.length < 3) {
                    update('images', [...data.images, placeholder]);
                  }
                }}
              >
                <Upload className="h-8 w-8 text-neutral-400" />
                <p className="mt-2 text-sm font-medium text-neutral-600">
                  Rasm yuklash uchun bosing
                </p>
                <p className="mt-1 text-xs text-neutral-400">
                  JPG, PNG — maksimal 3 ta rasm
                </p>
              </div>

              {data.images.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-3">
                  {data.images.map((img, i) => (
                    <div key={i} className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      <button
                        onClick={() => update('images', data.images.filter((_, idx) => idx !== i))}
                        className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-neutral-600 hover:bg-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.images && (
                <p className="mt-2 text-sm text-red-600">{errors.images}</p>
              )}
            </div>
          )}

          {/* Step 1: Category */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">Kategoriya tanlash</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Buyumingiz qaysi turga kiradi?
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => update('category', cat.value)}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all',
                      data.category === cat.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    )}
                  >
                    <CategoryIcon name={cat.icon} className="h-7 w-7 text-primary-600" />
                    <span className="text-sm font-medium text-neutral-700">{cat.label}</span>
                  </button>
                ))}
              </div>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600">{errors.category}</p>
              )}
            </div>
          )}

          {/* Step 2: Title + Description */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-800">Sarlavha va tavsif</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Buyumni aniq va tushunarli ta'riflang
                </p>
              </div>
              <div>
                <label className="label-text">Sarlavha</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masalan: Yangi pishirilgan non (2 dona)"
                  value={data.title}
                  onChange={(e) => update('title', e.target.value)}
                />
                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
              </div>
              <div>
                <label className="label-text">Tavsif</label>
                <textarea
                  className="input-field min-h-[120px] resize-y"
                  placeholder="Buyum holati, hajmi, nechta ekanligi va boshqa kerakli ma'lumotlarni yozing"
                  value={data.description}
                  onChange={(e) => update('description', e.target.value)}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Condition */}
          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">Holatni belgilash</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Buyum holati qanday?
              </p>
              <div className="mt-4 space-y-3">
                {CONDITIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => update('condition', c.value)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl border-2 p-4 transition-all text-left',
                      data.condition === c.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-primary-300'
                    )}
                  >
                    <div className={cn(
                      'flex h-5 w-5 items-center justify-center rounded-full border-2',
                      data.condition === c.value ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'
                    )}>
                      {data.condition === c.value && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                    <span className="font-medium text-neutral-700">{c.label}</span>
                  </button>
                ))}
              </div>
              {errors.condition && (
                <p className="mt-2 text-sm text-red-600">{errors.condition}</p>
              )}
            </div>
          )}

          {/* Step 4: Location */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-800">Hudud va manzil</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Aniq manzil emas — taxminiy mo\'jal yetarli
                </p>
              </div>
              <div>
                <label className="label-text">Tuman / Shahar</label>
                <select
                  className="input-field"
                  value={data.district}
                  onChange={(e) => update('district', e.target.value)}
                >
                  <option value="">Tanlang...</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.district && <p className="mt-1 text-sm text-red-600">{errors.district}</p>}
              </div>
              <div>
                <label className="label-text">Taxminiy manzil / Mo\'jal</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Masalan: Chilonzor metrosi yaqinidagi 3-uy"
                  value={data.landmark}
                  onChange={(e) => update('landmark', e.target.value)}
                />
                {errors.landmark && (
                  <p className="mt-1 text-sm text-red-600">{errors.landmark}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 5: Food details (only if food) */}
          {data.category === 'food' && step === 5 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-neutral-800">Oziq-ovqat ma'lumotlari</h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Xavfsizlik uchun sana ma'lumotlari shart
                </p>
              </div>
              <div>
                <label className="label-text">Tayyorlangan / Qadoqlangan sana</label>
                <input
                  type="date"
                  className="input-field"
                  value={data.packagedDate}
                  onChange={(e) => update('packagedDate', e.target.value)}
                />
                {errors.packagedDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.packagedDate}</p>
                )}
              </div>
              <div>
                <label className="label-text">Yaroqlilik muddati</label>
                <input
                  type="date"
                  className="input-field"
                  value={data.expiryDate}
                  onChange={(e) => update('expiryDate', e.target.value)}
                />
                {errors.expiryDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
                )}
              </div>
              <div>
                <label className="label-text">Turi</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => update('isCooked', false)}
                    className={cn(
                      'flex-1 rounded-xl border-2 p-3 text-sm font-medium transition-all',
                      !data.isCooked ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600'
                    )}
                  >
                    Qadoqlangan
                  </button>
                  <button
                    onClick={() => update('isCooked', true)}
                    className={cn(
                      'flex-1 rounded-xl border-2 p-3 text-sm font-medium transition-all',
                      data.isCooked ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600'
                    )}
                  >
                    Pishirilgan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Final step: Review + Confirm */}
          {step === maxStep && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">Ko'rib chiqish va tasdiqlash</h2>
              <p className="mt-1 text-sm text-neutral-500">
                Ma'lumotlarni tekshiring va e'lonni joylang
              </p>

              <div className="mt-4 space-y-3 rounded-xl bg-neutral-50 p-4 text-sm">
                <ReviewRow label="Sarlavha" value={data.title} />
                <ReviewRow label="Kategoriya" value={data.category ? CATEGORIES.find(c => c.value === data.category)?.label : ''} />
                <ReviewRow label="Holat" value={data.condition ? CONDITIONS.find(c => c.value === data.condition)?.label : ''} />
                <ReviewRow label="Hudud" value={data.district} />
                <ReviewRow label="Manzil" value={data.landmark} />
                {data.category === 'food' && (
                  <>
                    <ReviewRow label="Tayyorlangan sana" value={data.packagedDate} />
                    <ReviewRow label="Yaroqlilik muddati" value={data.expiryDate} />
                    <ReviewRow label="Turi" value={data.isCooked ? 'Pishirilgan' : 'Qadoqlangan'} />
                  </>
                )}
                <ReviewRow label="Rasmlar" value={`${data.images.length} ta`} />
              </div>

              {data.images.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {data.images.map((img, i) => (
                    <div key={i} className="h-16 w-16 overflow-hidden rounded-lg bg-neutral-100">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}

              <label className="mt-5 flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.confirmedFree}
                  onChange={(e) => {
                    update('confirmedFree', e.target.checked);
                  }}
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-neutral-700">
                  Bu buyum 100% tekin ekanligini tasdiqlayman. Pul so'ramayman va
                  hech qanday shart qo'ymayman.
                </span>
              </label>
              {errors.confirmedFree && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmedFree}</p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className="btn-ghost"
            >
              <ArrowLeft className="h-4 w-4" />
              Orqaga
            </button>
            {step < maxStep ? (
              <button onClick={handleNext} className="btn-primary">
                Keyingi
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={handleSubmit} className="btn-primary">
                <CheckCircle2 className="h-4 w-4" />
                E'lonni joylash
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-neutral-500">{label}</span>
      <span className="font-medium text-neutral-800 text-right">{value || '—'}</span>
    </div>
  );
}
