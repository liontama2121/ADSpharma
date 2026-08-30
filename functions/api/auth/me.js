/**
 * GET /api/auth/me — estado de sesion para el frontend.
 * Responde { logueado, rol }. Nunca 401: no saber quien eres es una respuesta
 * valida, no un error.
 */

import { json, sesionDe } from "../../../lib/auth.js";

export async function onRequestGet({ request, env }) {
  const sesion = await sesionDe(request, env);
  return json(200, {
    logueado: Boolean(sesion),
    rol: sesion ? sesion.rol : null
  });
}
