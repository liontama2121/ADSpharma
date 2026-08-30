// Formulario de acceso. Envia a /api/auth/login; la cookie la pone el servidor.

(function () {
  const form = document.getElementById("loginForm");
  if (!form) return;

  const error = document.getElementById("loginError");
  const boton = document.getElementById("loginSubmit");

  /** Solo se acepta volver a rutas internas: nunca a otro dominio. */
  function destino() {
    const volver = new URLSearchParams(window.location.search).get("volver");
    if (volver && volver.startsWith("/") && !volver.startsWith("//")) return volver;
    return "/productos";
  }

  function mostrarError(mensaje) {
    error.textContent = mensaje;
    error.hidden = false;
  }

  form.addEventListener("submit", async e => {
    e.preventDefault();
    error.hidden = true;

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value;
    if (!usuario || !password) {
      mostrarError("Escribe usuario y contraseña.");
      return;
    }

    boton.disabled = true;
    boton.textContent = "Ingresando…";

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ usuario, password })
      });
      const datos = await res.json().catch(() => ({}));

      if (res.ok && datos.ok) {
        window.location.href = destino();
        return;
      }
      mostrarError(datos.mensaje || "Credenciales incorrectas");
    } catch {
      mostrarError("No se pudo conectar. Intenta de nuevo.");
    }

    boton.disabled = false;
    boton.textContent = "Ingresar";
  });
})();
