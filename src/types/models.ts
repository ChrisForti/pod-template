export interface ProductVariant {
  id: number;
  sku?: string;
  name: string;
  size: string;
  color: string;
  price: number;
  inStock: boolean;
}

export interface Product {
  id: number;
  externalId?: string;
  name: string;
  category: string;
  description?: string;
  image: string;
  images?: { front?: string; back?: string; detail?: string };
  price: number;
  variants?: ProductVariant[];
}

export interface Customization {
  boatName?: string;
  templateId: string;
  logoUrl?: string;
}

export interface CartItem {
  id: string;
  productId: number;
  variantId?: number;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  customization?: Customization;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  stateCode: string;
  zip: string;
  countryCode: string;
}

export interface OrderDraft {
  items: CartItem[];
  shipping: ShippingAddress;
  notes?: string;
}
