import { STATUS_LABELS, STATUS_DOT_COLORS, STATUS_COLORS, type ListingStatus } from '../types';

export function StatusBadge({ status }: { status: ListingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT_COLORS[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}
