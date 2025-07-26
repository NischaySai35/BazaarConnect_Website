export interface Vendor {
  id: string;
  name: string;
  location: string;
  materials: string[];
  quantity: string;
  phone?: string;
}

export interface Supplier {
  id: string;
  name: string;
  product_hi: string;
  product_en: string;
  pricePerKg: number;
  location_hi: string;
  location_en: string;
  rating: number;
  distance: number;
  phone: string;
  verified: boolean;
}

export interface VendorRequest {
  name: string;
  location: string;
  material: string;
  quantity: string;
}

export interface SupplierRegistration {
  name: string;
  product: string;
  pricePerKg: string;
  location: string;
  phone: string;
}

export type UserType = 'vendor' | 'supplier' | null;
export type Language = 'hi' | 'en';