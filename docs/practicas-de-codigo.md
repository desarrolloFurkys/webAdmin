# Prácticas de código y commits

## 1. Nunca repetir código

Antes de escribir una función, un tipo o una constante, buscar si ya existe. Si existe, importarla. Si se necesita en dos lugares, moverla a su lugar central.

| Qué | Dónde |
|---|---|
| Funciones auxiliares (formato, cálculo, transformación) | `src/utils/` |
| Constantes compartidas | `src/utils/constants.ts` |
| Tipos e interfaces de dominio | `src/models/` (`*.model.ts`) y `src/interfaces/` |
| Datos del catálogo | `src/data/` |
| Hooks reutilizables | `src/hooks/` |

Reglas:
- Un tipo se declara una sola vez y se importa. No redeclarar la misma forma en componentes.
- Una función auxiliar no vive dentro de un archivo de datos ni de un componente si otro archivo puede necesitarla.
- Si al revisar aparece lógica duplicada, se extrae en el mismo cambio.

## 2. Código declarativo, sin comentarios

El código debe explicarse solo.

- Nombres que dicen qué hace y por qué: `isFreeShippingEligible`, no `check`.
- Extraer condiciones y pasos a funciones o constantes con nombre en lugar de explicarlos con un comentario.
- Preferir `map`, `filter`, `find` y expresiones sobre bucles imperativos con estado.
- Sin números ni textos mágicos: dar nombre a cada constante.
- No dejar código comentado. Para eso está git.
- Un comentario solo se justifica ante una restricción externa que el código no puede expresar (un bug de una librería, un requisito legal). Debe ser excepcional y de una línea.

## 3. Commits claros y puntuales

- Un commit, un propósito. No mezclar refactor, funcionalidad y arreglos.
- Formato: `tipo(alcance): descripción en español, en minúscula y sin punto final`.
- Tipos: `feat`, `fix`, `refactor`, `perf`, `docs`, `chore`, `test`.
- La descripción dice qué cambia, no cómo. Ejemplo: `feat(producto): añadir metadatos por producto`.
- Cuerpo solo si el porqué no es evidente.
- No añadir líneas `Co-Authored-By` ni otras atribuciones automáticas a commits ni a descripciones de PR.
- No reescribir el historial de `main`.

## 4. SEO

Detalle de lo implementado, salida a producción y persistencia: `docs/seo.md`.

Los archivos de SEO se mantienen junto con el contenido. Todo cambio que añada, mueva o elimine páginas o productos debe revisar y actualizar:

| Archivo | Cuándo modificarlo |
|---|---|
| `src/app/sitemap.ts` | Se crea o se retira una ruta pública o un tipo de contenido. |
| `src/app/robots.ts` | Se añade una ruta que no debe rastrearse (API, panel). |
| `src/lib/site.ts` | Cambia el dominio, el nombre del sitio o los límites de metadatos. |
| `generateMetadata` de la página | Cambian los campos que alimentan título, descripción o imagen. |
| `src/lib/noIndexLayout.tsx` | Una ruta nueva es privada o transaccional y no debe indexarse. |

Reglas:
- Toda página pública exporta `metadata` o `generateMetadata`, con título y descripción propios.
- Toda ruta privada, transaccional o de demostración lleva `noindex` mediante `noIndexLayout`.
- El dominio sale siempre de `NEXT_PUBLIC_SITE_URL`. Nunca se escribe en el código.
- Mientras el sitio esté en un host temporal, no debe indexarse: el dominio definitivo se configura solo al pasar a producción.
- Los datos de SEO de un producto se derivan de la misma fuente que su página, sin copiarlos a otro lugar.
