# Guía de Git y repositorio

Se trabaja con **trunk-based development**: todo el trabajo converge en `main`, que es el tronco único.

`main` se despliega solo en AWS Amplify al recibir un cambio. Por eso `main` debe estar siempre en un estado que se pueda publicar.

## 1. Ramas

- Existe una sola rama permanente: `main`.
- Toda rama sale de `main` actualizado y vuelve a `main`. Nunca de otra rama de trabajo.
- Las ramas viven poco: horas o uno o dos días como máximo. Si un cambio tarda más, se divide en pasos que se puedan fusionar por separado.
- Nombre: `tipo/descripcion-corta`, con los mismos tipos que los commits. Ejemplo: `feat/datos-estructurados`.
- Al fusionar se borra la rama.

## 2. Pull requests

- Todo PR apunta a `main`. Nunca se apila un PR sobre otro: si depende de uno anterior, se espera a que ese se fusione.
- Antes de abrirlo: actualizar con `main` (`git rebase origin/main`) y comprobar que `npm run build` pasa.
- PR pequeños y de un solo propósito, para que se revisen y fusionen el mismo día.
- La descripción indica qué cambia, qué variables de entorno exige y cómo verificarlo.
- Se fusiona con `main` verde. Después se verifica el despliegue.

## 3. Trabajo a medias en `main`

Como `main` se publica, lo incompleto no se esconde en ramas largas: se mantiene apagado.

- Una funcionalidad sin terminar se fusiona detrás de una variable de entorno apagada por defecto.
- Ejemplo del proyecto: `NEXT_PUBLIC_ALLOW_INDEXING` mantiene el sitio sin indexar hasta el dominio final.
- Los cambios con riesgo de despliegue (`amplify.yml`, variables de entorno) se anuncian en la descripción del PR.

## 4. Commits

- Un commit, un propósito. No mezclar refactor, funcionalidad y arreglos.
- Formato: `tipo(alcance): descripción en español, en minúscula y sin punto final`.
- Tipos: `feat`, `fix`, `refactor`, `perf`, `docs`, `chore`, `test`.
- La descripción dice qué cambia, no cómo. Ejemplo: `feat(producto): añadir metadatos por producto`.
- Cuerpo solo si el porqué no es evidente.
- No añadir líneas `Co-Authored-By` ni otras atribuciones automáticas a commits ni a descripciones de PR.
- Conservar los saltos de línea originales de cada archivo.

## 5. Historial

- Nunca reescribir el historial de `main` ni hacer `push --force` sobre él.
- En una rama propia sin fusionar se permite `rebase` y `push --force-with-lease`.
- Un error en `main` se corrige con un commit nuevo o con `git revert`.
