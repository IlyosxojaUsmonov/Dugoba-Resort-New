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
    <div className="border-b border-white/5 last:border-b-0">
      <div className="flex items-center">
        <Link
          to={to}
          onClick={onNavigate}
          className={`flex-1 px-4 py-3 text-base font-medium rounded-sm transition-colors ${
            isActive ? 'bg-forest-800 text-forest-300' : 'text-white/80 hover:bg-stone-800 hover:text-white'
          }`}
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={label}
          className="p-3 text-white/60 hover:text-white"
        >
          <ChevronDown size={18} className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

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
                  className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium text-white/70 hover:text-white"
                >
                  <span>
                    {group.label} <span className="text-white/40">({group.items.length})</span>
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
                    <div className="flex flex-col gap-0.5 py-1 pl-3">
                      {group.items.map((item) => (
                        <Link
                          key={item.id}
                          to={`/obyekt/${item.id}`}
                          onClick={onNavigate}
                          className="rounded-sm px-3 py-2 text-sm text-white/60 hover:bg-stone-800 hover:text-white"
                        >
                          {item.name}
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
              className="mt-1 block rounded-sm px-3 py-2.5 text-sm font-medium text-forest-300 hover:bg-stone-800"
            >
              {viewAllLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
