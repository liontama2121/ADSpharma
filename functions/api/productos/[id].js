/**
 * GET /api/productos/:id — ficha clinica de un producto.
 *
 * Solo responde con sesion valida (cliente o admin). Sin sesion devuelve 401:
 * el frontend lo usa para decidir si muestra la ficha en el modal o el boton
 * de "iniciar sesion".
 *
 * Los datos vienen de lib/fichas-data.json, que genera scripts/generar-fichas.mjs
 * antes del build. No estan en el HTML publico a proposito.
 *
 * Las escrituras (POST/PUT/PATCH/DELETE) ya exigen rol admin en
 * functions/_middleware.js; aqui todavia no hay implementacion.
 */

import { json, sesionDe } from "../../../lib/auth.js";
import FICHAS from "../../../lib/fichas-data.json";

export async function onRequestGet({ request, env, params }) {
  const sesion = await sesionDe(request, env);
  if (!sesion) {
    return json(401, { ok: false, mensaje: "Necesitas iniciar sesion" });
  }

  const id = String(params.id || "");
  const ficha = FICHAS[id];
  if (!ficha) {
    return json(404, { ok: false, mensaje: "Producto no encontrado" });
  }

  return json(200, { ok: true, rol: sesion.rol, ficha });
}

export function onRequestPost() {
  return json(501, { ok: false, mensaje: "Creacion de productos en construccion" });
}

export function onRequestPut() {
  return json(501, { ok: false, mensaje: "Edicion de productos en construccion" });
}

export function onRequestPatch() {
  return json(501, { ok: false, mensaje: "Edicion de productos en construccion" });
}

export function onRequestDelete() {
  return json(501, { ok: false, mensaje: "Borrado de productos en construccion" });
}
