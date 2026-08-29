import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AccommodationGroup } from '@/lib/accommodationGroups';

interface Props {
  open: boolean;
  groups: AccommodationGroup[];
  viewAllTo: string;
  viewAllLabel: string;
  onNavigate: () => void;
}

export default function NavMegaMenu({ open, groups, viewAllTo, viewAllLabel, onNavigate }: Props) {
  const [activeKey, setActiveKey] = useState(groups[0]?.key ?? '');

  useEffect(() => {
    if (open) setActiveKey(groups[0]?.key ?? '');
  }, [open, groups]);

  const activeGroup = groups.find((g) => g.key === activeKey) ?? groups[0];

  return (
    <div
      className={`absolute left-0 top-full w-[40rem] max-w-[90vw] pt-3 transition-all duration-300 ease-out ${
        open
          ? 'visible translate-y-0 opacity-100'
          : 'invisible -translate-y-2 opacity-0 pointer-events-none'
      }`}
    >
      <div className="overflow-hidden rounded-sm border-t-2 border-forest-500 bg-white shadow-2xl">
        <div className="flex">
          <div className="w-48 shrink-0 border-r border-stone-100 bg-stone-50 py-3">
            {groups.map((group) => (
              <button
                key={group.key}
                type="button"
                onMouseEnter={() => setActiveKey(group.key)}
                onFocus={() => setActiveKey(group.key)}
                className={`flex w-full items-center justify-between gap-2 px-5 py-3 text-left text-[13px] font-medium tracking-wide transition-colors ${
                  activeGroup?.key === group.key
                    ? 'bg-white text-forest-700'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span className="truncate">{group.label}</span>
                <span className="shrink-0 text-[11px] text-stone-400">{group.items.length}</span>
              </button>
            ))}
          </div>

          <div className="max-h-[26rem] flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-1.5">
              {activeGroup?.items.map((item) => (
                <Link
                  key={item.id}
                  to={`/obyekt/${item.id}`}
                  onClick={onNavigate}
                  className="group flex items-center gap-3 rounded-sm p-2 transition-colors hover:bg-stone-50"
                >
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    loading="lazy"
                    className="h-12 w-12 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-medium text-stone-800 group-hover:text-forest-700">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-stone-400">{item.priceDisplay}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Link
          to={viewAllTo}
          onClick={onNavigate}
          className="block border-t border-stone-100 py-3 text-center text-sm font-medium text-forest-700 transition-colors hover:bg-forest-50"
        >
          {viewAllLabel}
        </Link>
      </div>
    </div>
  );
}
