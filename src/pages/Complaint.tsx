import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Flag, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../context';
import { COMPLAINT_REASONS, type ComplaintReason } from '../types';

export function Complaint() {
  const { listingId } = useParams<{ listingId: string }>();
  const navigate = useNavigate();
  const { getListingById, addComplaint } = useApp();
  const listing = listingId ? getListingById(listingId) : undefined;

  const [reason, setReason] = useState<ComplaintReason | ''>('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!reason) newErrors.reason = 'Sababni tanlang';
    if (!description.trim()) newErrors.description = 'Izoh yozing';
    else if (description.trim().length < 10)
      newErrors.description = 'Izoh kamida 10 ta harfdan iborat bo\'lsin';
    if (!reporterName.trim()) newErrors.reporterName = 'Ismingizni kiriting (yoki "Anonim" deb yozing)';

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0 && listing) {
      addComplaint({
        listingId: listing.id,
        listingTitle: listing.title,
        reason: reason as ComplaintReason,
        description: description.trim(),
        reporterName: reporterName.trim(),
      });
      setSent(true);
    }
  };

  if (!listing) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-xl font-semibold text-neutral-800">E'lon topilmadi</h1>
        <Link to="/browse" className="mt-6 inline-flex btn-primary">
          E\'lonlarga qaytish
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8 lg:py-12">
      <div className="mx-auto max-w-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Orqaga
        </button>

        {sent ? (
          <div className="card p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100">
              <CheckCircle2 className="h-8 w-8 text-primary-600" />
            </div>
            <h1 className="mt-4 text-xl font-semibold text-neutral-800">
              Shikoyat qabul qilindi
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              «{listing.title}» e'loni bo'yicha shikoyatingiz moderatsiyaga
              yuborildi. Tez orada ko\'rib chiqamiz.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/browse" className="btn-primary">
                E\'lonlarga qaytish
              </Link>
            </div>
          </div>
        ) : (
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                <Flag className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-neutral-800">Shikoyat qilish</h1>
                <p className="text-sm text-neutral-500">«{listing.title}»</p>
              </div>
            </div>

            <div className="mt-4 flex gap-3 rounded-lg border border-accent-200 bg-accent-50 p-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 text-accent-600" />
              <p className="text-xs text-accent-700">
                Faqat haqiqiy muammo uchun shikoyat qiling. Noto'g'ri shikoyat
                berish sizning profilingizga ta'sir qilishi mumkin.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="label-text">Sababni tanlang</label>
                <div className="space-y-2">
                  {COMPLAINT_REASONS.map((r) => (
                    <label
                      key={r.value}
                      className="flex items-center gap-3 rounded-lg border-2 border-neutral-200 p-3 cursor-pointer transition-colors hover:border-primary-300 has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50"
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={r.value}
                        checked={reason === r.value}
                        onChange={(e) => {
                          setReason(e.target.value as ComplaintReason);
                          setErrors((p) => ({ ...p, reason: '' }));
                        }}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-neutral-700">{r.label}</span>
                    </label>
                  ))}
                </div>
                {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
              </div>

              <div>
                <label className="label-text">Izoh</label>
                <textarea
                  className="input-field min-h-[100px] resize-y"
                  placeholder="Nima sodir bo'lganini aniq yozing..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="label-text">Ismingiz (yoki "Anonim")</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Ismingiz yoki Anonim"
                  value={reporterName}
                  onChange={(e) => setReporterName(e.target.value)}
                />
                {errors.reporterName && (
                  <p className="mt-1 text-sm text-red-600">{errors.reporterName}</p>
                )}
              </div>

              <button type="submit" className="btn-primary w-full">
                <Flag className="h-4 w-4" />
                Shikoyat yuborish
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
