// Portafolio: grid + filtros + buscador + modal de detalle.

(function () {
  const grid = document.getElementById("productosGrid");
  const search = document.getElementById("search");
  const chipsWrap = document.getElementById("chips");
  const modal = document.getElementById("modal");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalClose = document.getElementById("modalClose");
  const modalContent = document.getElementById("modalContent");

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

  // Render chips
  function renderChips() {
    const chips = [
      { id: "todos", nombre: "Todos", color: "" },
      ...Object.entries(LINEAS).map(([id, l]) => ({ id, nombre: l.nombre, color: l.color }))
    ];
    chipsWrap.innerHTML = "";
    chips.forEach(c => {
      const btn = document.createElement("button");
      btn.className = "chip" + (c.id === activeLinea ? " active" : "");
      btn.textContent = c.nombre;
      btn.dataset.linea = c.id;
      if (c.color) btn.style.setProperty("--chip-color", c.color);
      btn.addEventListener("click", () => {
        activeLinea = c.id;
        const url = new URL(window.location);
        if (c.id === "todos") url.searchParams.delete("linea");
        else url.searchParams.set("linea", c.id);
        window.history.replaceState({}, "", url);
        renderChips();
        renderGrid();
      });
      chipsWrap.appendChild(btn);
    });
  }

  function filtered() {
    const q = activeQuery.trim().toLowerCase();
    return PRODUCTOS.filter(p => {
      const lineaOk = activeLinea === "todos" || p.linea === activeLinea;
      if (!lineaOk) return false;
      if (!q) return true;
      return (
        p.nombre.toLowerCase().includes(q) ||
        (p.principioActivo || "").toLowerCase().includes(q)
      );
    });
  }

  function renderGrid() {
    const items = filtered();
    grid.innerHTML = "";
    if (!items.length) {
      grid.innerHTML = `<div class="empty-state">Sin resultados. Prueba con otro término o cambia el filtro.</div>`;
      return;
    }
    items.forEach((p, i) => {
      const linea = LINEAS[p.linea];
      const color = linea ? linea.color : "var(--glow-cyan)";
      const tag = linea ? linea.nombre : p.linea;
      const card = document.createElement("article");
      card.className = "producto-card";
      card.style.setProperty("--linea-color", color);
      card.dataset.id = p.id;
      card.style.animationDelay = (i * 0.04) + "s";
      // Sin onerror inline (rompía el HTML y filtraba basura tipo "</>").
      const img = p.imagen
        ? `<img src="${escapeHTML(p.imagen)}" alt="${escapeHTML(p.nombre)}" loading="lazy" />`
        : `<div class="placeholder">${escapeHTML(p.nombre)}</div>`;
      const ctxClass = p.imagenContexto ? " has-context" : "";
      const ctxLabel = p.imagenContexto ? `<span class="ctx-label">ADS PHARMA</span>` : "";
      // Ronda 2: la card solo muestra nombre + presentación técnica.
      // Toda la info clínica va en el modal de detalle.
      card.innerHTML = `
        <div class="img-wrap${ctxClass}">${img}${ctxLabel}</div>
        <div class="card-body">
          <div class="nombre">${escapeHTML(p.nombre)}</div>
          <div class="presentacion">${escapeHTML(p.principioActivo || "")}</div>
          <div class="footer-row">
            <span class="tag-linea">${escapeHTML(tag)}</span>
            <span class="ver-mas">Ver detalle →</span>
          </div>
        </div>
      `;
      // Fallback de imagen sin inyectar HTML.
      const imgEl = card.querySelector(".img-wrap img");
      if (imgEl) {
        imgEl.addEventListener("error", () => {
          const ph = document.createElement("div");
          ph.className = "placeholder";
          ph.textContent = p.nombre;
          imgEl.replaceWith(ph);
        });
      }
      card.addEventListener("click", () => openModal(p.id, card));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(p.id, card);
        }
      });
      card.tabIndex = 0;
      grid.appendChild(card);
    });
  }

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
      `<tr>${r.map(c => `<td>${escapeHTML(c)}</td>`).join("")}</tr>`
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
    const p = PRODUCTOS.find(x => x.id === id);
    if (!p) return;
    const linea = LINEAS[p.linea];
    const color = linea ? linea.color : "var(--glow-cyan)";
    const lineaNombre = linea ? linea.nombre : p.linea;

    modal.style.setProperty("--linea-color", color);

    const modalPh = `<div class="modal-placeholder">${escapeHTML(p.nombre.charAt(0))}</div>`;
    const img = p.imagen
      ? `<img class="modal-img" src="${escapeHTML(p.imagen)}" alt="${escapeHTML(p.nombre)}" />`
      : modalPh;

    const waText = encodeURIComponent(
      `Hola ADS PHARMA, me interesa el producto ${p.nombre} (${p.registro || ""}). ¿Me pueden dar más información?`
    );
    const waHref = `https://wa.me/573203035503?text=${waText}`;

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
          <span class="tag-linea">${escapeHTML(lineaNombre)}</span>
          <h2 id="modalTitle">${escapeHTML(p.nombre)}</h2>
          <div class="pa-mono">${escapeHTML(p.principioActivo || "")}</div>
          ${p.presentacion ? `<p class="modal-presentacion">${escapeHTML(p.presentacion)}</p>` : ""}
          ${p.registro ? `<span class="badge-registro">${escapeHTML(p.registro)}</span>` : ""}
          <a class="btn btn-wa modal-wa" href="${waHref}" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.9 11.9 0 0 0 3 18.5L1.5 24l5.7-1.5A11.9 11.9 0 1 0 20.5 3.5Zm-8.4 18.3a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.4.9.9-3.3-.2-.4a9.9 9.9 0 1 1 8.1 4.4Z"/></svg>
            Solicitar info por WhatsApp
          </a>
        </div>

        <div class="modal-col-sections">
          ${sections || `<p class="modal-empty">Sin información clínica adicional disponible.</p>`}
        </div>
      </div>

      <div class="modal-disclaimer">
        Información dirigida exclusivamente a profesionales de la salud e instituciones. Los medicamentos aquí presentados son de uso delicado y requieren prescripción y supervisión médica. La información de dosificación es de referencia y no reemplaza el criterio médico ni la ficha técnica oficial aprobada por el INVIMA. ADS PHARMA S.A.S. no comercializa medicamentos directamente al público a través de este sitio.
      </div>
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
    url.searchParams.set("id", p.id);
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

  // Eventos
  search.addEventListener("input", e => {
    activeQuery = e.target.value;
    renderGrid();
  });

  renderChips();
  renderGrid();

  // Abrir modal por ?id= directo
  const initialId = params.get("id");
  if (initialId) {
    setTimeout(() => openModal(initialId, null), 50);
  }
})();
