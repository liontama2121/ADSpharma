// Portafolio: filtros + buscador + modal de detalle.
//
// Las tarjetas se renderizan en el servidor; aqui solo se muestran/ocultan.
//
// La ficha clinica NO viaja en el HTML de esta pagina. El modal publico solo
// muestra lo identificativo (nombre, principio activo, presentacion, INVIMA,
// linea, imagen y WhatsApp). Indicaciones, dosis, contraindicaciones,
// precauciones y RAM se piden a /api/productos/:id, que exige sesion. Ocultarlas
// con CSS o JS no seria proteccion: el texto seguiria en el codigo fuente.

import { estadoSesion } from "./sesion.js";

(function () {
  const dataEl = document.getElementById("datos-portafolio");
  if (!dataEl) return;
  const DATOS = JSON.parse(dataEl.textContent);

  const search = document.getElementById("search");
  const chipsWrap = document.getElementById("chips");
  const emptyState = document.getElementById("emptyState");
  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalContent = document.getElementById("modalContent");
  const cards = Array.from(document.querySelectorAll(".producto-card"));

  const params = new URLSearchParams(window.location.search);
  let activeLinea = params.get("linea") || "todos";
  let activeQuery = "";
  let lastFocusedEl = null;

  // Rol actual (null mientras /api/auth/me no responde) y fichas ya descargadas.
  let sesion = null;
  const fichasCache = new Map();
  // Solo se pinta la ficha si el modal sigue mostrando el producto que se pidio.
  let idAbierto = null;

  function escapeHTML(s) {
    if (s == null) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ---------- Filtros ---------- */

  function syncChips() {
    chipsWrap.querySelectorAll(".chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.linea === activeLinea);
    });
  }

  function applyFilters() {
    const q = activeQuery.trim().toLowerCase();
    let visibles = 0;
    cards.forEach(card => {
      const lineaOk = activeLinea === "todos" || card.dataset.linea === activeLinea;
      const queryOk = !q || (card.dataset.buscar || "").includes(q);
      const visible = lineaOk && queryOk;
      card.style.display = visible ? "" : "none";
      if (visible) visibles++;
    });
    if (emptyState) emptyState.hidden = visibles > 0;
  }

  chipsWrap.addEventListener("click", e => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    activeLinea = chip.dataset.linea;
    const url = new URL(window.location);
    if (activeLinea === "todos") url.searchParams.delete("linea");
    else url.searchParams.set("linea", activeLinea);
    window.history.replaceState({}, "", url);
    syncChips();
    applyFilters();
  });

  search.addEventListener("input", e => {
    activeQuery = e.target.value;
    applyFilters();
  });

  /* ---------- Modal ---------- */

  /* ---------- Ficha clinica (solo con sesion) ---------- */

  const CANDADO = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>`;

  /** Convierte saltos de linea en <br> sobre texto ya escapado. */
  function parrafo(texto) {
    return escapeHTML(texto).replace(/\r?\n/g, "<br />");
  }

  function bloqueSeccion(titulo, texto) {
    return `
      <details class="modal-section" open>
        <summary>${escapeHTML(titulo)}</summary>
        <div class="content">${parrafo(texto)}</div>
      </details>`;
  }

  function bloqueTabla(tabla) {
    const headers = (tabla.headers || []).map(h => `<th>${escapeHTML(h)}</th>`).join("");
    const filas = (tabla.rows || [])
      .map(r => `<tr>${(r.celdas || []).map(c => `<td>${escapeHTML(c)}</td>`).join("")}</tr>`)
      .join("");
    return `
      <details class="modal-section" open>
        <summary>Tabla de dosificación</summary>
        <div class="content">
          ${tabla.titulo ? `<div class="tabla-titulo">${escapeHTML(tabla.titulo)}</div>` : ""}
          <table class="tabla-dosif">
            <thead><tr>${headers}</tr></thead>
            <tbody>${filas}</tbody>
          </table>
        </div>
      </details>`;
  }

  /** Aviso + boton de acceso para quien no tiene sesion. */
  function bloqueBloqueado(id) {
    const volver = encodeURIComponent(`${window.location.pathname}?id=${encodeURIComponent(id)}`);
    return `
      <div class="modal-reservado">
        ${CANDADO}
        <p>${escapeHTML(DATOS.textos.avisoReservado)}</p>
        <a class="btn btn-juancode" href="/login?volver=${volver}">
          🔒 ${escapeHTML(DATOS.textos.iniciarSesion)}
        </a>
      </div>`;
  }

  function bloqueFicha(id, ficha) {
    const secciones = [
      ["Indicaciones", ficha.indicaciones],
      ["Dosis y administración", ficha.dosis],
      ["Contraindicaciones", ficha.contraindicaciones],
      ["Precauciones y advertencias", ficha.precauciones],
      ["RAM / Efectos adversos", ficha.ram],
      ["Disolución y soluciones compatibles", ficha.disolucion]
    ].filter(([, texto]) => texto && texto.trim());

    const tabla = ficha.tabla && ficha.tabla.rows?.length ? ficha.tabla : null;

    if (!secciones.length && !tabla) {
      return `<p class="modal-empty">${escapeHTML(DATOS.textos.sinFicha)}</p>`;
    }

    return (
      secciones.map(([titulo, texto]) => bloqueSeccion(titulo, texto)).join("") +
      (tabla ? bloqueTabla(tabla) : "") +
      `<a class="btn btn-ghost modal-ficha-link" href="/fichas/${encodeURIComponent(id)}">
        ${escapeHTML(DATOS.textos.verFicha)}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>`
    );
  }

  /**
   * Pinta la columna derecha del modal segun el estado de sesion.
   * Se llama dos veces cuando aun no se sabe el rol: una con el aviso de carga
   * y otra cuando /api/auth/me y /api/productos/:id ya respondieron.
   */
  async function pintarSecciones(id) {
    const destino = document.getElementById("modalSecciones");
    if (!destino) return;

    if (sesion === null) {
      destino.innerHTML = `<p class="modal-cargando">Comprobando acceso…</p>`;
      sesion = await estadoSesion();
      if (idAbierto !== id) return;
    }

    if (!sesion.logueado) {
      destino.innerHTML = bloqueBloqueado(id);
      return;
    }

    if (fichasCache.has(id)) {
      destino.innerHTML = bloqueFicha(id, fichasCache.get(id));
      return;
    }

    destino.innerHTML = `<p class="modal-cargando">Cargando ficha clínica…</p>`;
    try {
      const res = await fetch(`/api/productos/${encodeURIComponent(id)}`, {
        credentials: "same-origin"
      });
      if (idAbierto !== id) return;

      if (res.status === 401) {
        // La sesion expiro mientras navegaba.
        sesion = { logueado: false, rol: null };
        destino.innerHTML = bloqueBloqueado(id);
        return;
      }
      const datos = await res.json();
      if (!res.ok || !datos.ok) throw new Error(datos.mensaje || "error");

      fichasCache.set(id, datos.ficha);
      if (idAbierto === id) destino.innerHTML = bloqueFicha(id, datos.ficha);
    } catch {
      if (idAbierto !== id) return;
      destino.innerHTML = `<p class="modal-empty">No se pudo cargar la ficha clínica. Intenta de nuevo.</p>`;
    }
  }

  function openModal(id, triggerEl) {
    const p = DATOS.productos[id];
    if (!p) return;

    modal.style.setProperty("--linea-color", p.lineaColor);

    const img = p.imagen
      ? `<img class="modal-img" src="${escapeHTML(p.imagen)}" alt="${escapeHTML(p.nombre)}" />`
      : `<div class="modal-placeholder">${escapeHTML(p.nombre.charAt(0))}</div>`;

    const waText = encodeURIComponent(
      `Hola ${DATOS.empresa}, me interesa el producto ${p.nombre} (${p.registro || ""}). ¿Me pueden dar más información?`
    );
    const waHref = `https://wa.me/${DATOS.whatsapp.numero}?text=${waText}`;

    modalContent.innerHTML = `
      <div class="modal-grid">
        <div class="modal-col-image">
          <div class="modal-img-wrap">${img}</div>
          <span class="tag-linea">${escapeHTML(p.lineaNombre)}</span>
          <h2 id="modalTitle">${escapeHTML(p.nombre)}</h2>
          <div class="pa-mono">${escapeHTML(p.principioActivo || "")}</div>
          ${p.presentacion ? `<p class="modal-presentacion">${escapeHTML(p.presentacion)}</p>` : ""}
          ${p.registro ? `<span class="badge-registro">${escapeHTML(p.registro)}</span>` : ""}
          <a class="btn btn-wa modal-wa" href="${waHref}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 3 18.5L1.5 24l5.7-1.5A11.9 11.9 0 1 0 20.5 3.5Zm-8.4 18.3a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.4.9.9-3.3-.2-.4a9.9 9.9 0 1 1 8.1 4.4Z"/></svg>
            ${escapeHTML(DATOS.textos.solicitarInfo)}
          </a>
        </div>

        <div class="modal-col-sections" id="modalSecciones"></div>
      </div>

      <div class="modal-disclaimer">${escapeHTML(DATOS.disclaimer)}</div>
    `;

    const modalImgEl = modalContent.querySelector(".modal-img");
    if (modalImgEl) {
      modalImgEl.addEventListener("error", () => {
        const ph = document.createElement("div");
        ph.className = "modal-placeholder";
        ph.textContent = p.nombre.charAt(0);
        modalImgEl.replaceWith(ph);
      });
    }

    lastFocusedEl = triggerEl || document.activeElement;
    document.body.classList.add("modal-open");
    modal.classList.add("open");
    modalBackdrop.classList.add("open");
    requestAnimationFrame(() => {
      modal.focus();
      const focusable = modal.querySelector("button, a, [tabindex]:not([tabindex='-1'])");
      if (focusable) focusable.focus();
    });

    const url = new URL(window.location);
    url.searchParams.set("id", id);
    window.history.replaceState({}, "", url);

    idAbierto = id;
    pintarSecciones(id);
  }

  function closeModal() {
    idAbierto = null;
    modal.classList.remove("open");
    modalBackdrop.classList.remove("open");
    document.body.classList.remove("modal-open");
    const url = new URL(window.location);
    url.searchParams.delete("id");
    window.history.replaceState({}, "", url);
    if (lastFocusedEl && typeof lastFocusedEl.focus === "function") lastFocusedEl.focus();
  }

  // Trap focus dentro del modal
  modal.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
    if (e.key === "Tab") {
      const focusables = modal.querySelectorAll("button, a, [tabindex]:not([tabindex='-1'])");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal);

  cards.forEach(card => {
    // Fallback de imagen sin inyectar HTML.
    const imgEl = card.querySelector(".img-wrap img");
    if (imgEl) {
      imgEl.addEventListener("error", () => {
        const ph = document.createElement("div");
        ph.className = "placeholder";
        ph.textContent = card.querySelector(".nombre")?.textContent || "";
        imgEl.replaceWith(ph);
      });
    }
    card.addEventListener("click", () => openModal(card.dataset.id, card));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.id, card);
      }
    });
  });

  syncChips();
  applyFilters();

  // Abrir modal por ?id= directo
  const initialId = params.get("id");
  if (initialId) setTimeout(() => openModal(initialId, null), 50);
})();
