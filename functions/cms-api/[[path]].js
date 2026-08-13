/**
 * Puente entre el panel de contenido (/admin) y GitHub.
 *
 * Vive en el mismo dominio que el sitio a proposito: asi cada peticion del CMS
 * llega con la cookie de Cloudflare Access y podemos verificar quien la hizo.
 * Una peticion cross-origin no llevaria esa cookie.
 *
 * Rutas:
 *   GET /cms-api/auth       completa el saludo OAuth que espera Decap CMS
 *   ANY /cms-api/github/*   reenvia a api.github.com firmando con GITHUB_TOKEN
 *
 * Variables de entorno (Cloudflare Pages > Settings > Environment variables):
 *   ACCESS_TEAM_DOMAIN   ej. tpz.cloudflareaccess.com
 *   ACCESS_AUD           Application Audience Tag de la app de Access
 *                        (varios separados por coma si son apps distintas)
 *   GITHUB_REPO          ej. liontama2121/ADSpharma
 *   CORREOS_PERMITIDOS   opcional, separados por coma
 *   GITHUB_TOKEN         SECRETO: token con permiso de escritura solo en ese repo
 */

const GITHUB_API = "https://api.github.com";
const encoder = new TextEncoder();

/* ---------- Utilidades ---------- */

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

function bytesFromBase64Url(input) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const relleno = base64.length % 4 ? 4 - (base64.length % 4) : 0;
  const binario = atob(base64 + "=".repeat(relleno));
  const salida = new Uint8Array(binario.length);
  for (let i = 0; i < binario.length; i++) salida[i] = binario.charCodeAt(i);
  return salida;
}

function jsonFromBase64Url(input) {
  return JSON.parse(new TextDecoder().decode(bytesFromBase64Url(input)));
}

function leerCookie(request, nombre) {
  const cookies = request.headers.get("Cookie") || "";
  for (const parte of cookies.split(";")) {
    const [clave, ...resto] = parte.trim().split("=");
    if (clave === nombre) return resto.join("=");
  }
  return null;
}

/* ---------- Verificacion del token de Cloudflare Access ---------- */

// Las claves publicas rotan; se cachean una hora por aislado.
let cacheJwks = { claves: null, vence: 0 };

async function obtenerClaves(teamDomain) {
  const ahora = Date.now();
  if (cacheJwks.claves && cacheJwks.vence > ahora) return cacheJwks.claves;

  const res = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error("no se pudieron leer las claves de Access");
  const datos = await res.json();
  cacheJwks = { claves: datos.keys || [], vence: ahora + 60 * 60 * 1000 };
  return cacheJwks.claves;
}

async function verificarAcceso(token, teamDomain, audConfigurado) {
  const partes = token.split(".");
  if (partes.length !== 3) throw new Error("token con formato invalido");
  const [cabeceraB64, cuerpoB64, firmaB64] = partes;

  const cabecera = jsonFromBase64Url(cabeceraB64);
  const cuerpo = jsonFromBase64Url(cuerpoB64);

  if (cabecera.alg !== "RS256") throw new Error("algoritmo de firma no aceptado");

  const claves = await obtenerClaves(teamDomain);
  const jwk = claves.find((k) => k.kid === cabecera.kid);
  if (!jwk) throw new Error("la clave que firmo el token no existe");

  const clave = await crypto.subtle.importKey(
    "jwk",
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const firmaValida = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    clave,
    bytesFromBase64Url(firmaB64),
    encoder.encode(`${cabeceraB64}.${cuerpoB64}`)
  );
  if (!firmaValida) throw new Error("la firma no coincide");

  const ahora = Math.floor(Date.now() / 1000);
  if (typeof cuerpo.exp === "number" && cuerpo.exp < ahora) throw new Error("token expirado");
  if (typeof cuerpo.nbf === "number" && cuerpo.nbf > ahora + 60) throw new Error("token todavia no es valido");
  if (cuerpo.iss !== `https://${teamDomain}`) throw new Error("el token no lo emitio esta organizacion");

  // ACCESS_AUD admite varios tags separados por coma, por si /admin y /cms-api
  // quedaron como aplicaciones de Access distintas.
  const esperados = audConfigurado.split(",").map((s) => s.trim()).filter(Boolean);
  const audiencias = Array.isArray(cuerpo.aud) ? cuerpo.aud : [cuerpo.aud];
  if (!audiencias.some((a) => esperados.includes(a))) {
    throw new Error("el token es de otra aplicacion");
  }

  return cuerpo;
}

/* ---------- /cms-api/auth ---------- */

// Decap abre esta ventana esperando un intercambio OAuth. Como Cloudflare Access
// ya autentico a la persona, se responde de inmediato. El token que se entrega
// aqui no da acceso a nada: el proxy vuelve a validar la cookie de Access en
// cada peticion y es el que pone el token real de GitHub.
function respuestaSaludo(origen) {
  const carga = JSON.stringify({ token: "cloudflare-access", provider: "github" });
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8" /><title>Entrando…</title></head>
<body style="font-family:system-ui;background:#0b1020;color:#aeb9d4;display:grid;place-items:center;height:100vh;margin:0">
<p>Autenticando…</p>
<script>
(function () {
  var origen = ${JSON.stringify(origen)};
  function alRecibir(e) {
    if (e.origin !== origen) return;
    window.removeEventListener("message", alRecibir, false);
    window.opener.postMessage("authorization:github:success:" + ${JSON.stringify(carga)}, origen);
    window.close();
  }
  window.addEventListener("message", alRecibir, false);
  window.opener.postMessage("authorizing:github", origen);
})();
</script>
</body></html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

/* ---------- /cms-api/github/* ---------- */

function rutaPermitida(ruta, repo) {
  // El token solo debe poder tocar este repositorio.
  if (ruta === "user" || ruta === "user/") return true;
  return ruta === `repos/${repo}` || ruta.startsWith(`repos/${repo}/`);
}

async function reenviarAGithub(request, ruta, busqueda, env, identidad) {
  // Decap pide /user para saber a nombre de quien firmar los commits.
  // Se responde con la identidad de Cloudflare Access para que el historial
  // de Git muestre quien edito de verdad, no el dueno del token.
  if (ruta === "user" || ruta === "user/") {
    const correo = identidad.email || "";
    return json(200, {
      login: correo.split("@")[0] || "editor",
      name: identidad.name || correo,
      email: correo,
      avatar_url: ""
    });
  }

  const destino = `${GITHUB_API}/${ruta}${busqueda}`;
  const cabeceras = new Headers();
  cabeceras.set("Authorization", `Bearer ${env.GITHUB_TOKEN}`);
  cabeceras.set("Accept", request.headers.get("Accept") || "application/vnd.github+json");
  cabeceras.set("X-GitHub-Api-Version", "2022-11-28");
  cabeceras.set("User-Agent", "adspharma-cms");
  const tipo = request.headers.get("Content-Type");
  if (tipo) cabeceras.set("Content-Type", tipo);

  const tieneCuerpo = !["GET", "HEAD"].includes(request.method);
  const respuesta = await fetch(destino, {
    method: request.method,
    headers: cabeceras,
    body: tieneCuerpo ? await request.arrayBuffer() : undefined
  });

  // Se copia la respuesta quitando cabeceras que no deben viajar al navegador.
  const salida = new Headers(respuesta.headers);
  salida.delete("content-encoding");
  salida.delete("content-length");
  salida.delete("set-cookie");
  return new Response(respuesta.body, { status: respuesta.status, headers: salida });
}

/* ---------- Entrada ---------- */

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  const faltantes = ["ACCESS_TEAM_DOMAIN", "ACCESS_AUD", "GITHUB_REPO", "GITHUB_TOKEN"].filter(
    (v) => !env[v]
  );
  if (faltantes.length) {
    return json(500, { error: `Faltan variables de entorno: ${faltantes.join(", ")}` });
  }

  // Access inyecta esta cabecera en todo lo que pasa su politica.
  const token =
    request.headers.get("Cf-Access-Jwt-Assertion") || leerCookie(request, "CF_Authorization");
  if (!token) {
    return json(401, {
      error: "Esta ruta debe estar protegida por Cloudflare Access y no llego el token."
    });
  }

  let identidad;
  try {
    identidad = await verificarAcceso(token, env.ACCESS_TEAM_DOMAIN, env.ACCESS_AUD);
  } catch (e) {
    return json(401, { error: `Acceso denegado: ${e.message}` });
  }

  // Segunda barrera, por si la politica de Access se afloja por error.
  const permitidos = (env.CORREOS_PERMITIDOS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const correo = (identidad.email || "").toLowerCase();
  if (permitidos.length && !permitidos.includes(correo)) {
    return json(403, { error: `${correo || "este usuario"} no tiene permiso de edicion` });
  }

  const segmentos = context.params.path || [];
  const ruta = Array.isArray(segmentos) ? segmentos.join("/") : String(segmentos);

  if (ruta === "auth") {
    return respuestaSaludo(url.origin);
  }

  if (ruta === "github" || ruta.startsWith("github/")) {
    const rutaGithub = ruta.slice("github".length).replace(/^\//, "");
    if (!rutaPermitida(rutaGithub, env.GITHUB_REPO)) {
      return json(403, { error: "Esta ruta de GitHub no esta permitida" });
    }
    return reenviarAGithub(request, rutaGithub, url.search, env, identidad);
  }

  return json(404, { error: "Ruta no encontrada" });
}
