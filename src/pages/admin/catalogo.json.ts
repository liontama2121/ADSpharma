import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

/**
 * Lista minima de productos para el panel (/admin): numero, nombre y linea.
 * El widget "numero" la usa para proponer el siguiente numero libre al crear
 * un producto y avisar si un numero ya esta ocupado.
 *
 * Vive bajo /admin, asi que functions/_middleware.js exige sesion de admin.
 * Se regenera en cada deploy: un producto recien creado aparece aqui cuando
 * Cloudflare termina de publicar.
 */
export const GET: APIRoute = async () => {
  const productos = (await getCollection("productos"))
    .map((p) => ({
      id: p.id,
      orden: p.data.orden,
      nombre: p.data.nombre,
      linea: p.data.linea
    }))
    .sort((a, b) => a.orden - b.orden);

  return new Response(JSON.stringify({ productos }), {
    headers: { "content-type": "application/json; charset=utf-8" }
  });
};
