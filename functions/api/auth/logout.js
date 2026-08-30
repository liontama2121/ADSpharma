/**
 * /api/auth/logout — borra la cookie de sesion y vuelve al inicio.
 * Acepta GET (enlace directo) y POST (fetch desde el navbar).
 */

import { cookieBorrada, json } from "../../../lib/auth.js";

function cerrar(destino) {
  return new Response(null, {
    status: 302,
    headers: {
      location: destino,
      "set-cookie": cookieBorrada(),
      "cache-control": "no-store"
    }
  });
}

export function onRequestGet() {
  return cerrar("/");
}

export function onRequestPost() {
  return json(200, { ok: true }, { "set-cookie": cookieBorrada() });
}
