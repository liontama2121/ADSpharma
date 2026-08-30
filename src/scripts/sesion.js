// Estado de sesion compartido por todo el sitio.
//
// Una sola llamada a /api/auth/me por carga: el resultado se comparte entre el
// indicador del navbar y el modal del portafolio.

let promesa = null;

export function estadoSesion() {
  if (!promesa) {
    promesa = fetch("/api/auth/me", { credentials: "same-origin" })
      .then(r => (r.ok ? r.json() : { logueado: false, rol: null }))
      .catch(() => ({ logueado: false, rol: null }));
  }
  return promesa;
}

const ETIQUETA = { admin: "Administrador", cliente: "Cliente" };

/** Pinta "Ingresar" o "Hola, [rol] · Cerrar sesión" en el hueco del navbar. */
export async function pintarSesionEnNav() {
  const slot = document.getElementById("navSesion");
  if (!slot) return;

  const { logueado, rol } = await estadoSesion();

  if (!logueado) {
    slot.innerHTML = '<a class="nav-sesion-link" href="/login">Ingresar</a>';
    slot.hidden = false;
    return;
  }

  const saludo = document.createElement("span");
  saludo.className = "nav-sesion-saludo";
  saludo.textContent = `Hola, ${ETIQUETA[rol] || rol}`;

  const salir = document.createElement("button");
  salir.type = "button";
  salir.className = "nav-sesion-salir";
  salir.textContent = "Cerrar sesión";
  salir.addEventListener("click", async () => {
    salir.disabled = true;
    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } catch {
      /* aunque falle la respuesta, se recarga: la cookie puede haberse borrado */
    }
    window.location.reload();
  });

  slot.replaceChildren(saludo, salir);
  slot.hidden = false;
}
