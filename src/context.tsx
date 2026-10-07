import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Listing, Complaint } from './types';
import { DEMO_LISTINGS, DEMO_COMPLAINTS, DEMO_PENDING_LISTINGS } from './data';

interface AppContextValue {
  listings: Listing[];
  complaints: Complaint[];
  currentUser: {
    id: string;
    name: string;
    district: string;
    joinedAt: string;
    rating: number;
    helpCount: number;
  };
  addListing: (listing: Omit<Listing, 'id' | 'createdAt' | 'giverName' | 'giverId' | 'giverRating' | 'giverHelpCount' | 'giverPhone' | 'giverTelegram' | 'adminStatus'>) => string;
  reserveListing: (id: string) => void;
  cancelReservation: (id: string) => void;
  markAsTaken: (id: string) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'status'>) => void;
  approveListing: (id: string) => void;
  rejectListing: (id: string) => void;
  reviewComplaint: (id: string) => void;
  getListingById: (id: string) => Listing | undefined;
}

const AppContext = createContext<AppContextValue | null>(null);

const CURRENT_USER = {
  id: 'u-current',
  name: 'Siz',
  district: 'Chilonzor',
  joinedAt: '2026-08-01T00:00:00Z',
  rating: 5,
  helpCount: 3,
};

const CURRENT_USER_CONTACT = {
  giverPhone: '+998 90 000 00 00',
  giverTelegram: '@siz',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [listings, setListings] = useState<Listing[]>([
    ...DEMO_PENDING_LISTINGS,
    ...DEMO_LISTINGS,
  ]);
  const [complaints, setComplaints] = useState<Complaint[]>(DEMO_COMPLAINTS);

  const addListing: AppContextValue['addListing'] = useCallback((listing) => {
    const id = `l-${Date.now()}`;
    const newListing: Listing = {
      ...listing,
      id,
      createdAt: new Date().toISOString(),
      giverName: CURRENT_USER.name,
      giverId: CURRENT_USER.id,
      giverRating: CURRENT_USER.rating,
      giverHelpCount: CURRENT_USER.helpCount,
      giverPhone: CURRENT_USER_CONTACT.giverPhone,
      giverTelegram: CURRENT_USER_CONTACT.giverTelegram,
      adminStatus: 'approved',
    };
    setListings((prev) => [newListing, ...prev]);
    return id;
  }, []);

  const reserveListing = useCallback((id: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id && l.status === 'available'
          ? {
              ...l,
              status: 'reserved',
              reservedBy: CURRENT_USER.id,
              reservedAt: new Date().toISOString(),
            }
          : l
      )
    );
  }, []);

  const cancelReservation = useCallback((id: string) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id && l.status === 'reserved'
          ? { ...l, status: 'available', reservedBy: undefined, reservedAt: undefined }
          : l
      )
    );
  }, []);

  const markAsTaken = useCallback((id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'taken' } : l))
    );
  }, []);

  const addComplaint: AppContextValue['addComplaint'] = useCallback((complaint) => {
    const newComplaint: Complaint = {
      ...complaint,
      id: `c-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };
    setComplaints((prev) => [newComplaint, ...prev]);
  }, []);

  const approveListing = useCallback((id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, adminStatus: 'approved' } : l))
    );
  }, []);

  const rejectListing = useCallback((id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const reviewComplaint = useCallback((id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'reviewed' } : c))
    );
  }, []);

  const getListingById = useCallback(
    (id: string) => listings.find((l) => l.id === id),
    [listings]
  );

  return (
    <AppContext.Provider
      value={{
        listings,
        complaints,
        currentUser: CURRENT_USER,
        addListing,
        reserveListing,
        cancelReservation,
        markAsTaken,
        addComplaint,
        approveListing,
        rejectListing,
        reviewComplaint,
        getListingById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
