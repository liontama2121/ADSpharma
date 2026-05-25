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

  // Hero título: stagger por palabra
  const words = document.querySelectorAll(".hero-title .word");
  words.forEach((w, i) => {
    w.style.animationDelay = (0.08 * i) + "s";
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
      const n = Math.max(20, Math.min(48, Math.floor(w / 36)));
      for (let i = 0; i < n; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          r: 0.6 + Math.random() * 1.4,
          a: 0.2 + Math.random() * 0.4
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
