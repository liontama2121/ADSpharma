import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Base de todas las colecciones editables desde el dashboard.
const PAGINAS = "./src/content/paginas";

const cta = z.object({
  texto: z.string(),
  url: z.string()
});

const seo = z.object({
  titulo: z.string(),
  descripcion: z.string(),
  ogTitulo: z.string().default(""),
  ogDescripcion: z.string().default(""),
  noindex: z.boolean().default(false)
});

/* ---------- Portafolio ---------- */

// Todo con default: el CMS puede guardar la tabla vacia o a medio llenar
// sin tumbar el build. El render ya omite las tablas sin filas.
const tabla = z.object({
  titulo: z.string().default(""),
  headers: z.array(z.string()).default([]),
  // Lista de objetos en vez de array-de-arrays: el CMS no edita matrices crudas.
  rows: z.array(z.object({ celdas: z.array(z.string()).default([]) })).default([])
});

const productos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/productos" }),
  schema: z.object({
    nombre: z.string(),
    principioActivo: z.string().default(""),
    presentacion: z.string().default(""),
    linea: z.string(),
    registro: z.string().default(""),
    imagen: z.string().default(""),
    orden: z.number().default(999),
    destacado: z.boolean().default(false),
    ordenDestacado: z.number().default(0),
    indicaciones: z.string().default(""),
    dosis: z.string().default(""),
    contraindicaciones: z.string().default(""),
    precauciones: z.string().default(""),
    ram: z.string().default(""),
    disolucion: z.string().default(""),
    tabla: tabla.nullable().optional().default(null)
  })
});

const lineas = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/lineas" }),
  schema: z.object({
    nombre: z.string(),
    color: z.string(),
    color2: z.string(),
    orden: z.number(),
    visibleEnHome: z.boolean().default(true),
    // Contenido del path del SVG del icono (atributo `d`).
    iconoPath: z.string().default(""),
    descripcionHome: z.string().default(""),
    tituloNosotros: z.string().default(""),
    descripcionNosotros: z.string().default("")
  })
});

/* ---------- Paginas ---------- */
// Una coleccion por archivo: mismo folder para el CMS, tipado real por pagina.

const global = defineCollection({
  loader: glob({ pattern: "global.json", base: PAGINAS }),
  schema: z.object({
    empresa: z.string(),
    tagline: z.string(),
    direccion: z.object({
      linea1: z.string(),
      linea2: z.string(),
      mapsUrl: z.string(),
      mapsEmbed: z.string()
    }),
    telefonos: z.array(z.string()),
    whatsapp: z.object({ numero: z.string(), mensaje: z.string() }),
    emails: z.array(z.string()),
    redes: z.object({
      facebook: z.string(),
      instagram: z.string(),
      linkedin: z.string()
    }),
    navegacion: z.array(cta),
    disclaimer: z.string(),
    copyright: z.string(),
    creditos: z.object({ texto: z.string(), nombre: z.string(), url: z.string() }),
    clientesInstitucionales: z.array(z.string())
  })
});

const home = defineCollection({
  loader: glob({ pattern: "home.json", base: PAGINAS }),
  schema: z.object({
    seo,
    hero: z.object({
      eyebrow: z.string(),
      titulo: z.string(),
      subtitulo: z.string(),
      ctaPrimario: cta,
      ctaSecundario: cta
    }),
    lineas: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      texto: z.string()
    }),
    quienesSomos: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      cards: z.array(z.object({ titulo: z.string(), texto: z.string() })),
      cta
    }),
    premezclado: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      texto: z.string(),
      metricas: z.array(
        z.object({ simbolo: z.string(), titulo: z.string(), texto: z.string() })
      )
    }),
    portafolio: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      cta
    }),
    clientes: z.object({ titulo: z.string() }),
    contacto: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      texto: z.string()
    })
  })
});

const nosotros = defineCollection({
  loader: glob({ pattern: "nosotros.json", base: PAGINAS }),
  schema: z.object({
    seo,
    intro: z.object({
      titulo: z.string(),
      subtitulo: z.string(),
      texto: z.string()
    }),
    valores: z.array(z.object({ titulo: z.string(), texto: z.string() })),
    lineas: z.object({ titulo: z.string(), texto: z.string() }),
    clientes: z.object({ titulo: z.string() }),
    cta: z.object({
      eyebrow: z.string(),
      titulo: z.string(),
      texto: z.string(),
      boton: z.string()
    })
  })
});

const portafolio = defineCollection({
  loader: glob({ pattern: "portafolio.json", base: PAGINAS }),
  schema: z.object({
    seo,
    titulo: z.string(),
    subtitulo: z.string(),
    buscadorPlaceholder: z.string(),
    chipTodos: z.string(),
    textoSinResultados: z.string(),
    textoVerDetalle: z.string(),
    textoSolicitarInfo: z.string(),
    textoSinFicha: z.string()
  })
});

const comingSoon = defineCollection({
  loader: glob({ pattern: "coming-soon.json", base: PAGINAS }),
  schema: z.object({
    seo,
    activa: z.boolean().default(true),
    badge: z.string(),
    titulo: z.string(),
    subtitulo: z.string(),
    ctaWhatsapp: z.string(),
    ctaEmail: z.string()
  })
});

export const collections = {
  productos,
  lineas,
  global,
  home,
  nosotros,
  portafolio,
  comingSoon
};
