/**
 * Guardian unico del sitio.
 *
 * Reglas:
 *   /admin*            requiere rol admin        -> si no, redirige a /login
 *   /cms-api/*         requiere rol admin        -> si no, 401 JSON (lo llama Decap)
 *   /fichas/*          requiere sesion (cualquier rol) -> si no, redirige a /login
 *   /api/productos/*   escrituras (POST/PUT/PATCH/DELETE) requieren rol admin
 *   todo lo demas      pasa
 *
 * Falla cerrado: sin JWT_SECRET no hay sesion valida y las rutas protegidas
 * quedan cerradas. Preferible a exponerlas creyendo que estan protegidas.
 */

import { sesionDe, json } from "../lib/auth.js";

const ESCRITURAS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function aLogin(url) {
  const destino = new URL("/login", url.origin);
  // Para volver donde estaba despues de entrar. Solo rutas internas.
  destino.searchParams.set("volver", url.pathname + url.search);
  return new Response(null, {
    status: 302,
    headers: { location: destino.toString(), "cache-control": "no-store" }
  });
}

/** Lo protegido no se cachea ni se indexa, aunque el visitante tenga permiso. */
async function servirPrivado(next) {
  const respuesta = await next();
  const salida = new Response(respuesta.body, respuesta);
  salida.headers.set("cache-control", "no-store, private");
  salida.headers.set("x-robots-tag", "noindex, nofollow");
  return salida;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const ruta = url.pathname;

  const esAdmin = ruta === "/admin" || ruta.startsWith("/admin/");
  const esCms = ruta === "/cms-api" || ruta.startsWith("/cms-api/");
  const esFicha = ruta.startsWith("/fichas/");
  const esApiProductos = ruta === "/api/productos" || ruta.startsWith("/api/productos/");
  const esEscrituraProductos = esApiProductos && ESCRITURAS.has(request.method);

  if (!esAdmin && !esCms && !esFicha && !esEscrituraProductos) {
    return next();
  }

  const sesion = await sesionDe(request, env);

  if (esAdmin) {
    if (sesion?.rol !== "admin") return aLogin(url);
    return servirPrivado(next);
  }

  if (esCms) {
    if (sesion?.rol !== "admin") {
      return json(401, { error: "Necesitas iniciar sesion como administrador" });
    }
    return servirPrivado(next);
  }

  if (esEscrituraProductos) {
    if (sesion?.rol !== "admin") {
      return json(403, { ok: false, mensaje: "Solo el administrador puede modificar productos" });
    }
    return servirPrivado(next);
  }

  // /fichas/*: la ficha clinica completa. Cliente y admin la ven.
  if (!sesion) return aLogin(url);
  return servirPrivado(next);
}
