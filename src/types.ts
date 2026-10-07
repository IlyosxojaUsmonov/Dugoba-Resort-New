export type Category =
  | 'food'
  | 'clothing'
  | 'furniture'
  | 'tech'
  | 'books'
  | 'kids'
  | 'other';

export type Condition = 'new' | 'good' | 'used';

export type ListingStatus = 'available' | 'reserved' | 'taken';

export type ComplaintReason =
  | 'spam'
  | 'money'
  | 'false'
  | 'other';

export type AdminStatus = 'pending' | 'approved' | 'rejected';

export interface FoodDetails {
  packagedDate: string;
  expiryDate: string;
  isCooked: boolean;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  category: Category;
  condition: Condition;
  district: string;
  landmark: string;
  images: string[];
  status: ListingStatus;
  giverName: string;
  giverId: string;
  giverRating: number;
  giverHelpCount: number;
  giverPhone: string;
  giverTelegram: string;
  createdAt: string;
  foodDetails?: FoodDetails;
  adminStatus: AdminStatus;
  reservedBy?: string;
  reservedAt?: string;
}

export interface Complaint {
  id: string;
  listingId: string;
  listingTitle: string;
  reason: ComplaintReason;
  description: string;
  reporterName: string;
  createdAt: string;
  status: 'pending' | 'reviewed';
}

export const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'food', label: 'Oziq-ovqat', icon: 'utensils' },
  { value: 'clothing', label: 'Kiyim', icon: 'shirt' },
  { value: 'furniture', label: 'Mebel', icon: 'armchair' },
  { value: 'tech', label: 'Texnika', icon: 'laptop' },
  { value: 'books', label: 'Kitob', icon: 'book-open' },
  { value: 'kids', label: 'Bolalar buyumlari', icon: 'baby' },
  { value: 'other', label: 'Boshqa', icon: 'package' },
];

export const CONDITIONS: { value: Condition; label: string }[] = [
  { value: 'new', label: 'Yangi' },
  { value: 'good', label: 'Yaxshi' },
  { value: 'used', label: 'Ishlatilgan' },
];

export const DISTRICTS: string[] = [
  'Bektemir',
  'Chilonzor',
  'Mirobod',
  'Mirzo Ulug\'bek',
  'Sergeli',
  'Shayxontohur',
  'Olmazor',
  'Uchtepa',
  'Yakkasaroy',
  'Yashnobod',
  'Yunusobod',
  'Samarqand',
  'Buxoro',
  'Andijon',
];

export const COMPLAINT_REASONS: { value: ComplaintReason; label: string }[] = [
  { value: 'spam', label: 'Spam yoki takroriy e\'lon' },
  { value: 'money', label: 'Pul so\'ralmoqda (pullik sotuv)' },
  { value: 'false', label: 'Yolg\'on ma\'lumot berilgan' },
  { value: 'other', label: 'Boshqa sabab' },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  food: 'Oziq-ovqat',
  clothing: 'Kiyim',
  furniture: 'Mebel',
  tech: 'Texnika',
  books: 'Kitob',
  kids: 'Bolalar buyumlari',
  other: 'Boshqa',
};

export const CONDITION_LABELS: Record<Condition, string> = {
  new: 'Yangi',
  good: 'Yaxshi',
  used: 'Ishlatilgan',
};

export const STATUS_LABELS: Record<ListingStatus, string> = {
  available: 'Mavjud',
  reserved: 'Bron qilingan',
  taken: 'Olib ketilgan',
};

export const STATUS_COLORS: Record<ListingStatus, string> = {
  available: 'bg-primary-100 text-primary-800',
  reserved: 'bg-accent-100 text-accent-800',
  taken: 'bg-neutral-200 text-neutral-500',
};

export const STATUS_DOT_COLORS: Record<ListingStatus, string> = {
  available: 'bg-primary-500',
  reserved: 'bg-accent-500',
  taken: 'bg-neutral-400',
};
