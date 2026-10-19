export interface FurkysProductVariant {
  label: string;
  price: number;
}

export interface FurkysProductDetails {
  title: string;
  intro: string;
  bullets: { k: string; v: string }[];
  closing: string;
  steps: string[];
  tipQ: string;
  tipA: string;
  care: string;
}

export interface FurkysProduct {
  id: number;
  brand: string;
  name: string;
  slug: string;
  cat: string;
  price: number;
  oldPrice: number | null;
  tag: string | null;
  imgLabel: string;
  imgLabel2: string;
  badge: string;
  tagline: string;
  sold: number;
  rating: number;
  reviewCount: number;
  variants: FurkysProductVariant[];
  desc: string;
  sku?: string;
  images?: string[];
  pricePerKg?: number;
  subcat?: string;
  variantLabel?: string;
  details?: FurkysProductDetails;
}
