import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import type { AccommodationGroup } from '@/lib/accommodationGroups';

interface Props {
  label: string;
  to: string;
  viewAllLabel: string;
  groups: AccommodationGroup[];
  onNavigate: () => void;
}

export default function MobileNavAccordion({ label, to, viewAllLabel, groups, onNavigate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const isActive = useLocation().pathname === to;

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-base font-medium rounded-sm border transition-colors ${
          isActive
            ? 'bg-forest-50 border-forest-200 text-forest-700'
            : 'bg-white/60 border-stone-200 text-stone-700 hover:bg-stone-100 hover:text-stone-900'
        }`}
      >
        {label}
        <ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-2 pl-3 pr-1">
            {groups.map((group) => (
              <div key={group.key}>
                <button
                  type="button"
                  onClick={() => setOpenCategory((prev) => (prev === group.key ? null : group.key))}
                  aria-expanded={openCategory === group.key}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900"
                >
                  <span>
                    {group.label} <span className="text-stone-400">({group.items.length})</span>
                  </span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${openCategory === group.key ? 'rotate-180' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    openCategory === group.key ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="grid max-h-72 grid-cols-1 gap-1.5 overflow-y-auto overscroll-contain py-1.5 pl-2 pr-1 sm:grid-cols-2" data-lenis-prevent>
                      {group.items.map((item) => (
                        <Link
                          key={item.id}
                          to={`/obyekt/${item.id}`}
                          onClick={onNavigate}
                          className="flex items-center gap-2.5 rounded-sm bg-stone-50 p-1.5 transition-colors hover:bg-stone-100"
                        >
                          <img
                            src={item.mainImage}
                            alt={item.name}
                            loading="lazy"
                            className="h-11 w-11 shrink-0 rounded-sm object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-[13px] font-medium text-stone-800">{item.name}</p>
                            <p className="text-[11px] text-forest-600">{item.priceDisplay}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link
              to={to}
              onClick={onNavigate}
              className="mt-1 block rounded-sm px-3 py-2.5 text-sm font-medium text-forest-700 hover:bg-stone-100"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
