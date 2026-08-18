import { FurkysProduct } from "models/furkys-product.model";

// Ported from the Furky's Store v2 (Bazaar) design prototype's DATA()/ADDON().
// Prices are in COP. Images are placeholders — real product photography is
// still needed; see FurkysPlaceholderImage.
export const FURKYS_PRODUCTS: FurkysProduct[] = [
  {
    id: 1,
    brand: "Furky's",
    name: "Arena para Gatos",
    slug: "arena-para-gatos",
    cat: "Arena",
    price: 29800,
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Arena para gatos",
    imgLabel2: "Foto · Arena para gatos (uso)",
    badge: "100% Natural y Biodegradable",
    tagline: "Absorción superior y control de olores",
    sold: 86,
    rating: 4.9,
    reviewCount: 312,
    variants: [
      { label: "3.5 kg", price: 29800 },
      { label: "10 kg", price: 74900 }
    ],
    desc: "Arena para gatos de alta absorción que forma grumos firmes y controla los olores del arenero. Fácil de limpiar y disponible en dos presentaciones según tu necesidad."
  },
  {
    id: 2,
    brand: "Furky's",
    name: "Pala para Arena de Gatos",
    slug: "pala-para-arena-de-gatos",
    cat: "Accesorios",
    price: 5700,
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Pala para arena",
    imgLabel2: "Foto · Pala para arena (detalle)",
    badge: "Resistente y duradera",
    tagline: "Limpieza rápida y sin desperdicio",
    sold: 34,
    rating: 4.7,
    reviewCount: 98,
    variants: [],
    desc: "Pala resistente con ranuras para retirar fácilmente los grumos y mantener el arenero limpio sin desperdiciar arena."
  },
  {
    id: 3,
    brand: "Furky's",
    name: "Plato Antideslizante para Mascotas",
    slug: "plato-antideslizante-para-mascotas",
    cat: "Accesorios",
    price: 10800,
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Plato antideslizante",
    imgLabel2: "Foto · Plato antideslizante (en uso)",
    badge: "Antideslizante certificado",
    tagline: "Evita derrames mientras tu mascota come",
    sold: 52,
    rating: 4.8,
    reviewCount: 145,
    variants: [],
    desc: "Plato con base antideslizante que evita derrames y se mantiene fijo en el piso mientras tu mascota come o bebe. Fácil de lavar."
  },
  {
    id: 4,
    brand: "Furky's",
    name: "Plato Elevado para Gatos",
    slug: "plato-elevado-para-gatos",
    cat: "Accesorios",
    price: 8800,
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Plato elevado",
    imgLabel2: "Foto · Plato elevado (en uso)",
    badge: "Diseño ergonómico",
    tagline: "Mejor postura, mejor digestión",
    sold: 29,
    rating: 4.6,
    reviewCount: 61,
    variants: [],
    desc: "Plato elevado que mejora la postura de tu gato al comer y favorece una mejor digestión. Diseño cómodo y estable."
  },
  {
    id: 5,
    brand: "Furky's",
    name: "Comedero Cascada para Gatos",
    slug: "comedero-cascada-para-gatos",
    cat: "Accesorios",
    price: 5800,
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Comedero cascada",
    imgLabel2: "Foto · Comedero cascada (en uso)",
    badge: "Dosificación continua",
    tagline: "Alimento disponible todo el día",
    sold: 41,
    rating: 4.7,
    reviewCount: 87,
    variants: [],
    desc: "Comedero tipo cascada que dosifica el alimento de forma continua para que tu gato siempre tenga su ración disponible."
  },
  {
    id: 6,
    brand: "Furky's",
    name: "Plato Doble de Plástico para Gatos",
    slug: "plato-doble-de-plastico-para-gatos",
    cat: "Accesorios",
    price: 9800,
    oldPrice: null,
    tag: "Más vendido",
    imgLabel: "Foto · Plato doble",
    imgLabel2: "Foto · Plato doble (en uso)",
    badge: "2 en 1: agua y comida",
    tagline: "Agua y comida en un solo lugar",
    sold: 37,
    rating: 4.6,
    reviewCount: 73,
    variants: [],
    desc: "Plato doble para servir agua y alimento al mismo tiempo. Práctico, liviano y muy fácil de limpiar."
  },
  {
    id: 7,
    brand: "Furky's",
    name: "Catnip Premium para Gatos",
    slug: "catnip-premium-para-gatos",
    cat: "Catnip",
    price: 15900,
    oldPrice: null,
    tag: null,
    imgLabel: "Foto · catnip",
    imgLabel2: "Foto · gato jugando con catnip",
    badge: "100% Natural",
    tagline: "Diversión y relajación natural",
    sold: 63,
    rating: 4.9,
    reviewCount: 204,
    variants: [],
    desc: "Catnip 100% natural que estimula el juego y ayuda a tu gato a liberar energía y relajarse."
  },
  {
    id: 8,
    brand: "Furky's",
    name: "Refugio Cueva para Gatos",
    slug: "refugio-cueva-para-gatos",
    cat: "Refugio",
    price: 89900,
    oldPrice: null,
    tag: null,
    imgLabel: "Foto · refugio para gatos",
    imgLabel2: "Foto · gato dentro del refugio",
    badge: "Materiales suaves y seguros",
    tagline: "Su propio refugio para descansar",
    sold: 19,
    rating: 4.8,
    reviewCount: 42,
    variants: [],
    desc: "Refugio tipo cueva, suave y acogedor, para que tu gato tenga su propio espacio para esconderse, descansar y observar desde lejos."
  },
  {
    id: 9,
    brand: "Furky's",
    name: "Pañoleta para Gatos",
    slug: "panoleta-para-gatos",
    cat: "Pañoletas",
    price: 12900,
    oldPrice: null,
    tag: null,
    imgLabel: "Foto · pañoleta para gatos",
    imgLabel2: "Foto · gato modelando la pañoleta",
    badge: "Ajuste cómodo y seguro",
    tagline: "Estilo y comodidad en un accesorio",
    sold: 47,
    rating: 4.7,
    reviewCount: 66,
    variants: [
      { label: "Talla S", price: 12900 },
      { label: "Talla M", price: 13900 }
    ],
    desc: "Pañoleta ajustable y cómoda para que tu gato luzca su estilo en cualquier ocasión."
  }
];

export const FURKYS_ADDON: FurkysProduct = {
  id: 900,
  brand: "Furky's",
  name: "Mini Juguete de Plumas",
  slug: "mini-juguete-de-plumas",
  cat: "Accesorios",
  price: 4900,
  oldPrice: null,
  tag: null,
  imgLabel: "Foto · juguete de plumas",
  imgLabel2: "Foto · juguete de plumas",
  badge: "Regalo para tu gato",
  tagline: "Se añade junto con tu compra",
  sold: 0,
  rating: 4.8,
  reviewCount: 21,
  variants: [],
  desc: "Juguete de regalo para tu gato."
};

export function getFurkysProductBySlug(slug: string): FurkysProduct | undefined {
  if (slug === FURKYS_ADDON.slug) return FURKYS_ADDON;
  return FURKYS_PRODUCTS.find((p) => p.slug === slug);
}

export function getFurkysRelatedProducts(excludeSlug: string, count = 4): FurkysProduct[] {
  return FURKYS_PRODUCTS.filter((p) => p.slug !== excludeSlug).slice(0, count);
}

export function formatCOP(amount: number): string {
  return `$${Math.round(amount).toLocaleString("es-CO")}`;
}
