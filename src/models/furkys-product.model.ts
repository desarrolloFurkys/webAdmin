export interface FurkysProductVariant {
  label: string;
  price: number;
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
}
