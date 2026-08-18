export interface FurkysGuideArticle {
  slug: string;
  ph: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  title: string;
  desc: string;
  readTime: string;
}

export const FURKYS_GUIDE_ARTICLES: FurkysGuideArticle[] = [
  {
    slug: "controlar-olores-arenero",
    ph: "Foto · arenero limpio",
    tag: "Arena y limpieza",
    tagBg: "#F1E7F9",
    tagColor: "#662681",
    title: "Cómo controlar los olores del arenero",
    desc: "Frecuencia de limpieza, tipo de arena y ubicación ideal para un hogar sin malos olores.",
    readTime: "4 min de lectura"
  },
  {
    slug: "cuanta-arena-usar",
    ph: "Foto · midiendo arena",
    tag: "Arena y limpieza",
    tagBg: "#F1E7F9",
    tagColor: "#662681",
    title: "¿Cuánta arena debe llevar el arenero?",
    desc: "La cantidad correcta según el tamaño del arenero y cómo afecta la absorción.",
    readTime: "3 min de lectura"
  },
  {
    slug: "que-es-el-catnip",
    ph: "Foto · gato oliendo catnip",
    tag: "Catnip y bienestar",
    tagBg: "#FDEDE3",
    tagColor: "#E8501D",
    title: "¿Qué es el catnip y por qué le encanta a tu gato?",
    desc: "La ciencia detrás de la reacción de los gatos y cómo usarlo de forma segura.",
    readTime: "5 min de lectura"
  },
  {
    slug: "gatos-que-no-reaccionan-al-catnip",
    ph: "Foto · gato relajado",
    tag: "Catnip y bienestar",
    tagBg: "#FDEDE3",
    tagColor: "#E8501D",
    title: "Mi gato no reacciona al catnip, ¿es normal?",
    desc: "Por qué no todos los gatos responden igual y qué alternativas existen.",
    readTime: "3 min de lectura"
  },
  {
    slug: "senales-de-un-gato-feliz",
    ph: "Foto · gato jugando en casa",
    tag: "Vida con gatos",
    tagBg: "#FBF3DF",
    tagColor: "#D9A62B",
    title: "5 señales de que tu gato es feliz en casa",
    desc: "Comportamientos que indican bienestar y cómo reforzarlos en el día a día.",
    readTime: "4 min de lectura"
  },
  {
    slug: "errores-comunes-nuevos-dueños",
    ph: "Foto · gatito explorando",
    tag: "Vida con gatos",
    tagBg: "#FBF3DF",
    tagColor: "#D9A62B",
    title: "Errores comunes de los nuevos dueños de gatos",
    desc: "Lo que casi todos hacemos mal al principio y cómo evitarlo.",
    readTime: "6 min de lectura"
  }
];

export function getFurkysGuideArticleBySlug(slug: string): FurkysGuideArticle | undefined {
  return FURKYS_GUIDE_ARTICLES.find((article) => article.slug === slug);
}
