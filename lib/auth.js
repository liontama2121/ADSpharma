/**
 * Sesion por JWT firmado con HS256.
 *
 * Reemplaza al esquema anterior de Cloudflare Access. Aqui no hay proveedor
 * externo: dos usuarios definidos en variables de entorno, un token firmado
 * con JWT_SECRET y una cookie httpOnly.
 *
 * Lo usan:
 *   functions/_middleware.js          guardian de /admin, /fichas y escrituras
 *   functions/api/auth/*.js           login, logout y estado de sesion
 *   functions/api/productos/[id].js   entrega la ficha clinica solo con sesion
 *
 * Falla cerrado: si falta JWT_SECRET nadie entra.
 */

import jwt from "@tsndr/cloudflare-worker-jwt";

export const COOKIE = "ads_sesion";
export const DURACION_SEGUNDOS = 24 * 60 * 60; // 24 h

export function json(status, body, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers
    }
  });
}

export function leerCookie(request, nombre) {
  const cookies = request.headers.get("Cookie") || "";
  for (const parte of cookies.split(";")) {
    const [clave, ...resto] = parte.trim().split("=");
    if (clave === nombre) return resto.join("=");
  }
  return null;
}

/**
 * Compara dos cadenas sin filtrar por tiempo cual caracter fallo.
 * Evita que se pueda adivinar la contrasena midiendo la respuesta.
 */
export function igualSeguro(a, b) {
  const x = String(a ?? "");
  const y = String(b ?? "");
  // La longitud si se filtra; el contenido no. Se compara siempre el mismo
  // numero de posiciones para que el bucle no termine antes de tiempo.
  const largo = Math.max(x.length, y.length);
  let diff = x.length ^ y.length;
  for (let i = 0; i < largo; i++) {
    diff |= (x.charCodeAt(i) || 0) ^ (y.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/** Devuelve el rol si las credenciales coinciden con alguno de los dos usuarios. */
export function rolDeCredenciales(usuario, password, env) {
  const candidatos = [
    { rol: "admin", usuario: env.USUARIO_ADMIN, password: env.PASSWORD_ADMIN },
    { rol: "cliente", usuario: env.USUARIO_CLIENTE, password: env.PASSWORD_CLIENTE }
  ];

  let encontrado = null;
  for (const c of candidatos) {
    // Sin variables configuradas ese usuario simplemente no existe.
    if (!c.usuario || !c.password) continue;
    // Se recorren todos los candidatos aunque ya haya coincidencia: asi el
    // tiempo de respuesta no revela cual de los dos usuarios existe.
    const ok = igualSeguro(usuario, c.usuario) && igualSeguro(password, c.password);
    if (ok && !encontrado) encontrado = c.rol;
  }
  return encontrado;
}

export async function firmarSesion(rol, env) {
  const ahora = Math.floor(Date.now() / 1000);
  return jwt.sign(
    { rol, iat: ahora, exp: ahora + DURACION_SEGUNDOS },
    env.JWT_SECRET,
    { algorithm: "HS256" }
  );
}

/**
 * Lee la cookie y verifica la firma.
 * Devuelve { rol } o null. Nunca lanza: quien llama solo necesita saber
 * si hay sesion valida o no.
 */
export async function sesionDe(request, env) {
  if (!env.JWT_SECRET) return null;
  const token = leerCookie(request, COOKIE);
  if (!token) return null;

  try {
    const datos = await jwt.verify(token, env.JWT_SECRET, { algorithm: "HS256" });
    if (!datos) return null;
    const rol = datos.payload?.rol;
    if (rol !== "admin" && rol !== "cliente") return null;
    return { rol, exp: datos.payload.exp };
  } catch {
    return null;
  }
}

export function cookieSesion(token) {
  return `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${DURACION_SEGUNDOS}`;
}

export function cookieBorrada() {
  return `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}
