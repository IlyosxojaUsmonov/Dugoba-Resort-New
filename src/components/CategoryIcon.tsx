import {
  Utensils, Shirt, Armchair, Laptop, BookOpen, Baby, Package,
  type LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  utensils: Utensils,
  shirt: Shirt,
  armchair: Armchair,
  laptop: Laptop,
  'book-open': BookOpen,
  baby: Baby,
  package: Package,
};

export function CategoryIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Package;
  return <Icon className={className} />;
}
