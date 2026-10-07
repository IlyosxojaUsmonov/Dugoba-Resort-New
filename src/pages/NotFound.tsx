import { Link } from 'react-router-dom';
import { Heart, Home, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
        <Heart className="h-8 w-8" fill="currentColor" />
      </div>
      <h1 className="mt-6 font-display text-6xl font-bold text-neutral-800">404</h1>
      <h2 className="mt-2 text-xl font-semibold text-neutral-700">
        Sahifa topilmadi
      </h2>
      <p className="mt-2 max-w-sm text-neutral-500">
        Bu sahifa mavjud emas yoki o'chirilgan bo'lishi mumkin. Bosh sahifaga
        qaytib, kerakli bo'limni topishingiz mumkin.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" />
          Bosh sahifa
        </Link>
        <Link to="/browse" className="btn-outline">
          <ArrowLeft className="h-4 w-4" />
          E\'lonlarga qaytish
        </Link>
      </div>
    </div>
  );
}
