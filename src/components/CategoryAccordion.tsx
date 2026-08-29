import { ChevronDown, Users } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  count: number;
  countLabel: string;
  capacityLabel: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function CategoryAccordion({
  title,
  count,
  countLabel,
  capacityLabel,
  isOpen,
  onToggle,
  children,
}: Props) {
  return (
    <div className="bg-white rounded-sm shadow-sm border border-stone-100 overflow-hidden">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-stone-50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <h3 className="font-serif text-xl font-semibold text-stone-900 truncate">{title}</h3>
          <span className="shrink-0 flex items-center gap-1 text-xs text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full">
            <Users size={13} className="text-forest-600" />
            {capacityLabel}
          </span>
          <span className="shrink-0 text-xs text-stone-400">
            {count} {countLabel}
          </span>
        </div>
        <ChevronDown
          size={22}
          className={`shrink-0 text-forest-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 px-6 pb-6 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
