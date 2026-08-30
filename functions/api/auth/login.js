/**
 * POST /api/auth/login
 *
 * Cuerpo: { usuario, password }
 * Respuesta 200: { ok: true, rol } + cookie de sesion httpOnly.
 * Respuesta 401: { ok: false, mensaje }
 *
 * Variables de entorno (Cloudflare Pages > Settings > Environment variables):
 *   USUARIO_CLIENTE    texto
 *   PASSWORD_CLIENTE   secreto
 *   USUARIO_ADMIN      texto
 *   PASSWORD_ADMIN     secreto
 *   JWT_SECRET         secreto, cadena larga y aleatoria
 */

import { json, rolDeCredenciales, firmarSesion, cookieSesion } from "../../../lib/auth.js";

export async function onRequestPost({ request, env }) {
  if (!env.JWT_SECRET) {
    return json(503, { ok: false, mensaje: "El acceso todavia no esta configurado" });
  }

  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return json(400, { ok: false, mensaje: "Cuerpo invalido" });
  }

  const usuario = typeof cuerpo?.usuario === "string" ? cuerpo.usuario.trim() : "";
  const password = typeof cuerpo?.password === "string" ? cuerpo.password : "";
  if (!usuario || !password) {
    return json(400, { ok: false, mensaje: "Usuario y contrasena son obligatorios" });
  }

  const rol = rolDeCredenciales(usuario, password, env);
  if (!rol) {
    // Mismo mensaje para usuario inexistente y contrasena mala: no se confirma
    // que un usuario exista.
    return json(401, { ok: false, mensaje: "Credenciales incorrectas" });
  }

  const token = await firmarSesion(rol, env);
  return json(200, { ok: true, rol }, { "set-cookie": cookieSesion(token) });
}
