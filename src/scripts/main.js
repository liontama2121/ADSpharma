import { pintarSesionEnNav } from "./sesion.js";

// El indicador de sesion se pinta en cuanto responde /api/auth/me.
pintarSesionEnNav();

// Navbar, reveal scroll, partículas hero, etc.

(function () {
  // Navbar burger
  const nav = document.getElementById("nav");
  const burger = document.getElementById("navBurger");
  if (burger && nav) {
    burger.addEventListener("click", () => nav.classList.toggle("open"));
    document.querySelectorAll(".nav-links a").forEach(a => {
      a.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  // Scroll reveal con IntersectionObserver
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  // Carruseles horizontales (flechas desktop + drag + swipe táctil nativo)
  document.querySelectorAll(".carousel").forEach(car => {
    const track = car.querySelector(".car-track");
    const prev = car.querySelector(".car-prev");
    const next = car.querySelector(".car-next");
    if (!track) return;

    function step() {
      const first = track.querySelector(":scope > *");
      const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "18") || 18;
      const cardW = first ? first.getBoundingClientRect().width : track.clientWidth * 0.8;
      return Math.max(cardW + gap, track.clientWidth * 0.8);
    }
    function updateBtns() {
      const max = track.scrollWidth - track.clientWidth - 1;
      if (prev) prev.disabled = track.scrollLeft <= 1;
      if (next) next.disabled = track.scrollLeft >= max;
    }
    if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" }));
    if (next) next.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" }));
    track.addEventListener("scroll", updateBtns, { passive: true });
    window.addEventListener("resize", updateBtns);

    // Drag con mouse (desktop). El swipe táctil ya funciona por overflow nativo.
    let down = false, startX = 0, startScroll = 0, moved = 0;
    track.addEventListener("pointerdown", e => {
      if (e.pointerType !== "mouse") return;
      down = true; moved = 0;
      startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add("dragging");
    });
    track.addEventListener("pointermove", e => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.abs(dx);
      track.scrollLeft = startScroll - dx;
    });
    function endDrag() {
      if (!down) return;
      down = false;
      track.classList.remove("dragging");
    }
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointerleave", endDrag);
    // Evita que el click navegue tras un drag real
    track.addEventListener("click", e => { if (moved > 6) { e.preventDefault(); e.stopPropagation(); } }, true);

    requestAnimationFrame(updateBtns);
  });

  // Partículas hero
  const canvas = document.getElementById("heroCanvas");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w = 0, h = 0;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      particles = [];
      const density = (w * h) / 14000;
      const n = Math.max(60, Math.min(140, Math.floor(density)));
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 0.6 + Math.random() * 1.4,
          a: 0.25 + Math.random() * 0.45
        });
      }
    }
    function tick() {
      ctx.clearRect(0, 0, w, h);
      // Líneas tenues entre cercanos
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(77,168,255,${(1 - dist / 110) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(174,185,212,${p.a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(tick);
    }
    resize(); init(); tick();
    window.addEventListener("resize", () => { resize(); init(); });
  }
})();
