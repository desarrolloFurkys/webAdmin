# SEO de Furky's

## Qué está implementado

| Pieza | Archivo | Función |
|---|---|---|
| Interruptor de indexación | `src/lib/site.ts` (`ALLOW_INDEXING`) | Activa o bloquea todo el SEO desde una variable de entorno. |
| robots.txt | `src/app/robots.ts` | Bloquea todo si no se permite indexar; si se permite, excluye `/api/` e indica el sitemap. |
| sitemap.xml | `src/app/sitemap.ts` | Lista home, guía y productos. Vacío si no se permite indexar. |
| Metadatos globales | `src/app/layout.tsx` | Plantilla de título, Open Graph `es_CO`, Twitter y canonical. |
| Metadatos de producto | `src/app/(site)/product/[slug]/page.tsx` | Título, descripción (máx. 155), canonical e imagen por producto. |
| Metadatos de guía | `src/app/(site)/guia/page.tsx` | Título y descripción propios. |
| Páginas privadas | `src/lib/noIndexLayout.tsx` | `noindex` en checkout, confirmación y `/template`. |

## Variables de entorno

| Variable | Host temporal | Producción |
|---|---|---|
| `NEXT_PUBLIC_ALLOW_INDEXING` | sin definir o `false` | `true` |
| `NEXT_PUBLIC_SITE_URL` | URL del host | dominio real con `https://`, sin `/` final |

Ambas se incrustan al compilar: se definen antes del build.

El build falla si `ALLOW_INDEXING=true` y `SITE_URL` no es un dominio público con `https://` (`src/lib/validateSeoEnv.ts`).

Hosting: AWS Amplify. Las variables se definen en la consola de Amplify, en Variables de entorno de la rama, y se aplican en cada build. Tras cambiarlas hay que volver a desplegar.

Con `ALLOW_INDEXING` apagado: `robots.txt` bloquea todo, el sitemap queda vacío y todas las páginas llevan `noindex`.

## Salir a producción

1. Definir `NEXT_PUBLIC_SITE_URL` y `NEXT_PUBLIC_ALLOW_INDEXING=true` en el hosting.
2. Desplegar y comprobar `/robots.txt` (debe incluir `Allow: /` y el sitemap) y `/sitemap.xml` (con el dominio real).
3. Verificar en el HTML de un producto que el canonical y `og:image` usan el dominio real.
4. Verificar el dominio en Google Search Console y enviar `/sitemap.xml`.
5. Si el host temporal ya fue indexado, solicitar su eliminación en Search Console.

## Persistencia con base de datos

Hoy los productos salen de `src/data/furkys-products.ts`. Al pasar a base de datos el SEO no cambia de forma; solo cambia la fuente de datos.

1. Una sola capa de acceso: `getPublishedProducts()` y `getProductBySlug(slug)`, asíncronas. Sitemap, metadatos y página usan estas funciones.
2. `getProductBySlug` se envuelve en `cache()` de React para consultar una sola vez por petición, aunque la usen `generateMetadata` y la página.
3. `sitemap.ts` pasa a `async`, consulta los productos publicados y usa `updatedAt` como `lastModified`.
4. Productos nuevos: `generateStaticParams` pre-genera los existentes y Next genera los nuevos en la primera visita.
5. Actualización: el panel admin llama a `revalidateTag("products")` al guardar, y sitemap y páginas se renuevan de inmediato.
6. Despublicar: la página responde `notFound()` y el producto sale del sitemap. Los productos con historial se marcan agotados en lugar de borrarse.

Campos necesarios en la tabla de productos:

| Campo | Uso |
|---|---|
| `slug` (único, estable) | URL. Si cambia, guardar el anterior y redirigir con 301. |
| `status` | `publicado`, `borrador` o `agotado`. |
| `updatedAt` | `lastModified` del sitemap. |
| `images` | URL completas o rutas relativas al dominio. |
| `seoTitle`, `seoDescription` | Opcionales; si faltan, se usan nombre y descripción. |

Catálogos de más de 50.000 URL: dividir el sitemap con `generateSitemaps`.
