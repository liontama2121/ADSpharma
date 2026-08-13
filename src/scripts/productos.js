// Portafolio: filtros + buscador + modal de detalle.
// Las tarjetas se renderizan en el servidor; aqui solo se muestran/ocultan.
// La ficha clinica completa viaja en el <script type="application/json">.

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

  function buildSection(title, body) {
    if (!body || !body.trim()) return "";
    return `
      <details class="modal-section" open>
        <summary>${escapeHTML(title)}</summary>
        <div class="content">${escapeHTML(body).replace(/\n/g, "<br/>")}</div>
      </details>
    `;
  }

  function buildTabla(tabla) {
    if (!tabla || !tabla.rows || !tabla.rows.length) return "";
    const titulo = tabla.titulo ? `<div class="tabla-titulo">${escapeHTML(tabla.titulo)}</div>` : "";
    const heads = tabla.headers.map(h => `<th>${escapeHTML(h)}</th>`).join("");
    const rows = tabla.rows.map(r =>
      `<tr>${(r.celdas || []).map(c => `<td>${escapeHTML(c)}</td>`).join("")}</tr>`
    ).join("");
    return `
      <details class="modal-section" open>
        <summary>Tabla de dosificación</summary>
        <div class="content">
          ${titulo}
          <table class="tabla-dosif"><thead><tr>${heads}</tr></thead><tbody>${rows}</tbody></table>
        </div>
      </details>
    `;
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

    const sections =
      buildSection("Indicaciones", p.indicaciones) +
      buildSection("Dosis y administración", p.dosis) +
      buildSection("Contraindicaciones", p.contraindicaciones) +
      buildSection("Precauciones y advertencias", p.precauciones) +
      buildSection("RAM / Efectos adversos", p.ram) +
      buildSection("Disolución y soluciones compatibles", p.disolucion) +
      buildTabla(p.tabla);

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

        <div class="modal-col-sections">
          ${sections || `<p class="modal-empty">${escapeHTML(DATOS.textos.sinFicha)}</p>`}
        </div>
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
  }

  function closeModal() {
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
