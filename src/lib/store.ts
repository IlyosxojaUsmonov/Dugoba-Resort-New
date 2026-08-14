import { create } from 'zustand';

interface BookingModalState {
  isOpen: boolean;
  accommodationId: string | null;
  accommodationName: string | null;
  priceDisplay: string | null;
  open: (id: string, name: string, priceDisplay: string) => void;
  close: () => void;
}

export const useBookingModal = create<BookingModalState>((set) => ({
  isOpen: false,
  accommodationId: null,
  accommodationName: null,
  priceDisplay: null,
  open: (id, name, priceDisplay) =>
    set({ isOpen: true, accommodationId: id, accommodationName: name, priceDisplay }),
  close: () =>
    set({ isOpen: false, accommodationId: null, accommodationName: null, priceDisplay: null }),
}));
