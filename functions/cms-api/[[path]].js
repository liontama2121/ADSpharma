/**
 * Puente entre el panel de contenido y GitHub.
 *
 * Vive en el mismo dominio que el sitio a proposito: asi cada peticion del CMS
 * llega con la cookie de sesion y podemos verificar quien la hizo. Una peticion
 * cross-origin no llevaria esa cookie (SameSite=Strict).
 *
 * Rutas:
 *   GET /cms-api/auth       completa el saludo OAuth que espera Decap CMS
 *   ANY /cms-api/github/*   reenvia a api.github.com firmando con GITHUB_TOKEN
 *
 * El rol admin ya lo exige functions/_middleware.js antes de llegar aqui;
 * se vuelve a comprobar por si el middleware cambia.
 *
 * Variables de entorno (Cloudflare Pages > Settings > Environment variables):
 *   JWT_SECRET     SECRETO: firma de la sesion
 *   GITHUB_REPO    ej. liontama2121/ADSpharma
 *   GITHUB_TOKEN   SECRETO: token con escritura solo en ese repositorio
 */

import { sesionDe, json } from "../../lib/auth.js";

const GITHUB_API = "https://api.github.com";

/* ---------- /cms-api/auth ---------- */

// Decap abre esta ventana esperando un intercambio OAuth. Como la sesion del
// sitio ya autentico a la persona, se responde de inmediato. El token que se
// entrega aqui no da acceso a nada: el proxy vuelve a validar la cookie en cada
// peticion y es el que pone el token real de GitHub.
function respuestaSaludo(origen) {
  const carga = JSON.stringify({ token: "sesion-ads", provider: "github" });
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

async function reenviarAGithub(request, ruta, busqueda, env) {
  // Decap pide /user para saber a nombre de quien firmar los commits.
  if (ruta === "user" || ruta === "user/") {
    return json(200, {
      login: "admin",
      name: "Administrador ADS PHARMA",
      email: env.CMS_EMAIL || "",
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

  const faltantes = ["JWT_SECRET", "GITHUB_REPO", "GITHUB_TOKEN"].filter((v) => !env[v]);
  if (faltantes.length) {
    return json(500, { error: `Faltan variables de entorno: ${faltantes.join(", ")}` });
  }

  const sesion = await sesionDe(request, env);
  if (sesion?.rol !== "admin") {
    return json(401, { error: "Necesitas iniciar sesion como administrador" });
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
    return reenviarAGithub(request, rutaGithub, url.search, env);
  }

  return json(404, { error: "Ruta no encontrada" });
}
