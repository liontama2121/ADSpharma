import { getEntry } from "astro:content";

export type Whatsapp = { numero: string; mensaje: string };

/** Imagen generica de apoyo para los productos que aun no tienen render propio. */
export const IMG_CONTEXTO = "/image/Artboard-1@3x-8.webp";

export async function getGlobal() {
  const entry = await getEntry("global", "global");
  if (!entry) throw new Error("Falta src/content/paginas/global.json");
  return entry.data;
}

export async function getComingSoon() {
  const entry = await getEntry("comingSoon", "coming-soon");
  if (!entry) throw new Error("Falta src/content/paginas/coming-soon.json");
  return entry.data;
}

/** Enlace de WhatsApp con mensaje propio o el mensaje por defecto del sitio. */
export function waHref(wa: Whatsapp, mensaje?: string) {
  return `https://wa.me/${wa.numero}?text=${encodeURIComponent(mensaje ?? wa.mensaje)}`;
}

/**
 * Mientras el modo "proximamente" esta activo, la raiz muestra la pagina de
 * construccion y el sitio real vive en /home. Las URLs guardadas en global.json
 * siempre apuntan a la raiz; aqui se reescriben segun el modo.
 */
export function resolveUrl(url: string, comingSoonActiva: boolean) {
  if (!comingSoonActiva) return url;
  if (url === "/") return "/home";
  if (url.startsWith("/#")) return "/home" + url.slice(1);
  return url;
}
