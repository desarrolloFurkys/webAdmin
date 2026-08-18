# Furkys

Tienda online de Furkys construida sobre una base Next.js/React, con páginas y componentes de marca propia (`furkys`) para la home, el detalle de producto, el carrito y el checkout, e integración de pagos con **Bold** (Colombia).

## Sobre el proyecto

Este repositorio parte de la plantilla de e-commerce Bonik y la extiende con:

- Secciones de landing propias en [src/page-sections/furkys](src/page-sections/furkys) (Hero, carrusel de productos, moods, testimonios, FAQ, redes sociales).
- Componentes de marca en [src/components/furkys](src/components/furkys): header, footer, carrito lateral, tarjeta y detalle de producto, confirmación de orden, botón de WhatsApp, etc.
- Checkout propio con integración de **Bold "Botón de Pagos"** ([src/lib/bold.ts](src/lib/bold.ts), [src/app/api/bold](src/app/api/bold)) para crear órdenes y recibir webhooks de pago.
- Página de guía (`/guia`) y demás rutas de tienda, producto, login/registro y dashboard heredadas de la base Bonik.

## 🛠 Stack tecnológico

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Lenguaje**: TypeScript
- **Estilos**: [styled-components](https://styled-components.com/) + [styled-system](https://styled-system.com/)
- **Formularios y validación**: [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
- **HTTP**: [Axios](https://axios-http.com/) (con `axios-mock-adapter` para datos simulados)
- **UI/UX**: [Motion](https://motion.dev/) (animaciones), [Tabler Icons](https://tabler.io/icons), `react-slick`/`slick-carousel` (carruseles), `react-select`, `react-modal`, `react-dropzone`, `react-paginate`, `simplebar-react`
- **Gráficas**: Chart.js + react-chartjs-2 (dashboard)
- **Imágenes**: [sharp](https://sharp.pixelplumbing.com/)
- **Pagos**: [Bold](https://bold.co) (Botón de Pagos, checkout redireccionado con firma de integridad SHA-256)
- **Utilidades**: lodash, date-fns, clsx

## 🚀 Puesta en marcha

### Requisitos

- Node.js v18 o superior
- npm v9 o superior

### Instalación

```bash
git clone <url-del-repositorio>
cd furkysV2
npm install
```

### Variables de entorno

Copia `.env.example` a `.env.local` y completa las credenciales de Bold:

```bash
cp .env.example .env.local
```

- `BOLD_API_KEY`: llave pública de identidad de Bold, usada para abrir el checkout.
- `BOLD_SECRET_KEY`: llave secreta usada para firmar el hash de integridad en el servidor (nunca se expone al cliente).
- `NEXT_PUBLIC_SITE_URL`: URL base del sitio, usada para construir la URL de redirección de Bold.

### Desarrollo

```bash
npm run dev
```

### Build de producción

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

## 📁 Estructura relevante

```
src/
├── app/                # Rutas (App Router): home, checkout, producto, tienda, api/bold, etc.
├── page-sections/furkys/  # Secciones de la landing de Furkys
├── components/furkys/     # Componentes de marca (header, footer, carrito, checkout, etc.)
├── lib/bold.ts             # Integración con Bold (creación de orden, firma de integridad)
├── theme/                  # Theming y fuentes de marca (furkysFonts.ts)
└── contexts/                # Estado global (carrito, etc.)
```
