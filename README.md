# ADS PHARMA — Sitio Web

Sitio estático de **ADS PHARMA S.A.S.**, laboratorio farmacéutico colombiano especialista en medicamentos inyectables premezclados.

> "Somos el instrumento en las manos que salvan vidas."

## Stack

- HTML5 + CSS3 + JavaScript vanilla.
- Sin frameworks. Sin bundler. Sin dependencias npm.
- Fuentes: Sora, Manrope, JetBrains Mono (Google Fonts, CDN).
- Imágenes en `image/` (WebP).

## Estructura

```
/
├── index.html              · Home (hero, líneas, quiénes somos, premezclado, destacados, contacto)
├── productos.html          · Portafolio completo (grid + filtros + buscador + modal de detalle)
├── nosotros.html           · Misión, visión, calidad, líneas extendidas
├── css/
│   ├── styles.css          · Sistema base, navbar, hero, footer, WhatsApp, etc.
│   └── productos.css       · Grid de productos, toolbar, modal
├── js/
│   ├── data.js             · PRODUCTOS (25), LINEAS, CLIENTES_INSTITUCIONALES
│   ├── main.js             · Navbar, scroll reveal, partículas hero
│   └── productos.js        · Grid, filtros por línea, búsqueda en vivo, modal
└── image/                  · Logo + imágenes de producto
```

## Cómo correr local

Cualquier servidor estático funciona. Dos opciones rápidas:

### Python
```bash
python -m http.server 8000
```
Abre http://localhost:8000

### VS Code Live Server
Instala la extensión **Live Server**, click derecho sobre `index.html` → *Open with Live Server*.

## Contacto

Toda interacción comercial pasa por **WhatsApp +57 320 303 5503**. No hay carrito ni pago en línea — el sitio no comercializa medicamentos al público directamente.

## Notas técnicas

- **Modal**: el detalle de cada producto se abre como panel lateral (animación + trap de foco + cierre por ESC/click fuera).
- **Filtros**: la URL `?linea=cardiovascular|anestesicos|antibioticos|antidotos|neuro|respiratorio` aplica filtro inicial. `?id=<producto>` abre el modal del producto directamente.
- **Accesibilidad**: `role="dialog"`, `aria-modal`, focus trap, `prefers-reduced-motion`, contrastes AA.
- **Rendimiento**: `loading="lazy"` en imágenes secundarias, fuentes con `display=swap`, partículas con `requestAnimationFrame`.

## Disclaimer legal

Información dirigida exclusivamente a profesionales de la salud e instituciones. Los medicamentos presentados son de uso delicado y requieren prescripción y supervisión médica. La información de dosificación es de referencia y no reemplaza el criterio médico ni la ficha técnica oficial aprobada por el INVIMA.

---

Hecho con amor por **JuanCode**.
