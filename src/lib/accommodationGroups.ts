import type { Accommodation } from '@/data/accommodations';

export interface AccommodationGroup {
  key: string;
  label: string;
  items: Accommodation[];
}

export function groupRoomsByCapacity(rooms: Accommodation[]): AccommodationGroup[] {
  const map = new Map<number, Accommodation[]>();
  for (const room of rooms) {
    const group = map.get(room.capacity);
    if (group) {
      group.push(room);
    } else {
      map.set(room.capacity, [room]);
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([capacity, items]) => ({ key: String(capacity), label: items[0].category, items }));
}

export function groupCottagesByCategory(cottages: Accommodation[]): AccommodationGroup[] {
  const map = new Map<string, Accommodation[]>();
  for (const cottage of cottages) {
    const group = map.get(cottage.category);
    if (group) {
      group.push(cottage);
    } else {
      map.set(cottage.category, [cottage]);
    }
  }
  return Array.from(map.entries()).map(([category, items]) => ({ key: category, label: category, items }));
}
