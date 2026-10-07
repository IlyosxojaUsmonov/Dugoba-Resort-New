import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, X, Plus } from 'lucide-react';
import { cn } from '../utils';

const NAV_LINKS = [
  { to: '/', label: 'Bosh sahifa' },
  { to: '/browse', label: 'E\'lonlar' },
  { to: '/how-it-works', label: 'Qanday ishlaydi' },
  { to: '/safety', label: 'Xavfsizlik' },
  { to: '/contact', label: 'Bog\'lanish' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Heart className="h-5 w-5" fill="white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold text-neutral-800">
              xayr-ehson
            </span>
            <span className="text-[10px] font-medium text-primary-600">.uz</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-700 hover:bg-neutral-50'
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link to="/profile" className="btn-ghost">
            <Heart className="h-4 w-4" />
            Mening profilm
          </Link>
          <Link to="/create" className="btn-primary">
            <Plus className="h-4 w-4" />
            E'lon joylashtirish
          </Link>
        </div>

        <button
          className="lg:hidden rounded-lg p-2 text-neutral-700 hover:bg-neutral-100"
          onClick={() => setOpen(!open)}
          aria-label="Menyu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-neutral-200 bg-white">
          <nav className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2.5 text-sm font-medium',
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-neutral-600 hover:bg-neutral-50'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/profile"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Mening profilm
            </Link>
            <Link
              to="/create"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2"
            >
              <Plus className="h-4 w-4" />
              E'lon joylashtirish
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
