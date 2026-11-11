import { FurkysProduct } from "models/furkys-product.model";

const ARENA_DETAILS = {
  title: "Arena de Maíz Furky’s: bienestar para tu gato, comodidad para ti",
  intro:
    "Elaborada a base de maíz y biodegradable, la arena Furky’s combina absorción, control de olores y fácil limpieza para una rutina más cómoda.",
  bullets: [
    { k: "Aglomeración firme", v: "forma grumos compactos que facilitan la recolección." },
    { k: "Control de olores", v: "ayuda a mantener el arenero fresco, sin necesidad de fragancias fuertes." },
    { k: "Bajo polvo y textura suave", v: "mayor comodidad para sus patas y menos polvo al manipularla." },
    { k: "Mayor aprovechamiento", v: "retira solo lo usado y conserva la arena limpia por más tiempo." }
  ],
  closing: "Una alternativa de origen vegetal para cuidar su espacio y disfrutar de un hogar más limpio.",
  steps: [
    "Asegúrate de que el arenero esté limpio y seco. Agrega una capa de arena Furky’s de aproximadamente 5 cm.",
    "Recoge las heces y los grumos de orina con una pala diariamente, conservando la arena limpia.",
    "Añade arena para mantener el nivel y facilitar la formación de grumos."
  ],
  tipQ: "¿Tu gato está cambiando de arena?",
  tipA: "Haz una transición gradual, aumentando la proporción de Furky’s durante varios días.",
  care: "guarda la bolsa bien cerrada en un lugar fresco y seco."
};

// Ported from the Furky's Store v2 (Bazaar) design prototype's DATA()/ADDON().
// Prices are in COP. Only products with Estado = Publicado from the
// "PRODUCTOS WEB" sheet are listed here.
export const FURKYS_PRODUCTS: FurkysProduct[] = [
  {
    id: 1,
    brand: "Furky's",
    name: "Arena Para Gatos Ecológica de Maíz 3.5 kg",
    slug: "arena-ecologica-maiz-3-5-kg",
    cat: "Arenas e Higiene",
    subcat: "Arena Biodegradables",
    price: 29800,
    pricePerKg: 8514,
    variantLabel: "3.5 kg",
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Arena para gatos",
    imgLabel2: "Foto · Arena para gatos (uso)",
    sku: "FRK-ARE-001",
    images: [
      "/assets/furkys/products/arena-3-5kg-frente.png",
      "/assets/furkys/products/arena-3-5kg-atras.png",
      "/assets/furkys/products/arena-3-5kg-duracion.png"
    ],
    badge: "100% Natural y Biodegradable",
    tagline: "Absorción superior y control de olores",
    sold: 86,
    rating: 4.9,
    reviewCount: 312,
    variants: [],
    desc: ARENA_DETAILS.intro,
    details: ARENA_DETAILS
  },
  {
    id: 2,
    brand: "Furky's",
    name: "Arena Para Gatos Ecológica de Maíz 10 kg",
    slug: "arena-ecologica-maiz-10-kg",
    cat: "Arenas e Higiene",
    subcat: "Arena Biodegradables",
    price: 77600,
    pricePerKg: 7760,
    variantLabel: "10 kg",
    oldPrice: null,
    tag: null,
    imgLabel: "Foto · Arena para gatos 10 kg",
    imgLabel2: "Foto · Arena para gatos 10 kg (uso)",
    sku: "FRK-ARE-002",
    images: [
      "/assets/furkys/products/arena-10kg-frente.png",
      "/assets/furkys/products/arena-10kg-atras.png",
      "/assets/furkys/products/arena-10kg-duracion.png"
    ],
    badge: "100% Natural y Biodegradable",
    tagline: "Absorción superior y control de olores",
    sold: 52,
    rating: 4.9,
    reviewCount: 188,
    variants: [],
    desc: ARENA_DETAILS.intro,
    details: ARENA_DETAILS
  }
];

export function getFurkysProductBySlug(slug: string): FurkysProduct | undefined {
  return FURKYS_PRODUCTS.find((p) => p.slug === slug);
}

export function formatCOP(amount: number): string {
  return Math.round(amount).toLocaleString("es-CO");
}
