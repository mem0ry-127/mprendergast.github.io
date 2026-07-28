(function () {
  "use strict";

  // Ambient pixel-snow overlay, toggled from the header. Off by default;
  // the on/off state persists across pages and sessions like the theme.
  // Shared by every page (index, about, archive) that includes it.
  const SNOW_KEY = "photo-site-snow";
  const toggle = document.getElementById("snow-toggle");
  if (!toggle) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const FLAKE_COUNT = 90;
  const SIZES = [2, 2, 2, 3, 3, 4];
  const COLORS = ["#ffffff", "#f1f6fb", "#cfe0ee"];

  let canvas = null;
  let ctx = null;
  let flakes = [];
  let width = 0;
  let height = 0;
  let windPhase = Math.random() * Math.PI * 2;
  let animId = null;
  let running = false;

  function randomFlake(seedAcrossScreen) {
    const size = SIZES[Math.floor(Math.random() * SIZES.length)];
    return {
      x: Math.random() * width,
      y: seedAcrossScreen ? Math.random() * height : -size,
      size: size,
      speed: 0.25 + Math.random() * 0.45 + size * 0.12,
      drift: Math.random() * 0.5 - 0.25,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function ensureCanvas() {
    if (canvas) return;
    canvas = document.createElement("canvas");
    canvas.id = "snow-canvas";
    canvas.hidden = true;
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    resize();
    flakes = Array.from({ length: FLAKE_COUNT }, () => randomFlake(true));
    window.addEventListener("resize", resize);
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    windPhase += 0.0025;
    const wind = Math.sin(windPhase) * 0.35;
    for (let i = 0; i < flakes.length; i++) {
      const f = flakes[i];
      f.y += f.speed;
      f.phase += 0.015;
      f.x += f.drift + wind + Math.sin(f.phase) * 0.25;
      if (f.y > height + f.size) {
        f.y = -f.size;
        f.x = Math.random() * width;
      }
      if (f.x > width + f.size) f.x = -f.size;
      if (f.x < -f.size) f.x = width + f.size;
      ctx.fillStyle = f.color;
      ctx.fillRect(Math.round(f.x), Math.round(f.y), f.size, f.size);
    }
    animId = requestAnimationFrame(step);
  }

  function start() {
    ensureCanvas();
    if (running) return;
    running = true;
    canvas.hidden = false;
    animId = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    if (animId) cancelAnimationFrame(animId);
    animId = null;
    if (canvas) canvas.hidden = true;
  }

  function applyState(on) {
    toggle.classList.toggle("is-active", on);
    toggle.setAttribute("aria-pressed", String(on));
    if (on) start();
    else stop();
  }

  // Honor the OS-level reduced-motion preference for the initial,
  // unattended auto-start; an explicit click is still respected either
  // way, since that's a deliberate in-the-moment choice.
  const savedOn = localStorage.getItem(SNOW_KEY) === "on";
  applyState(savedOn && !prefersReducedMotion);

  toggle.addEventListener("click", () => {
    const next = !running;
    localStorage.setItem(SNOW_KEY, next ? "on" : "off");
    applyState(next);
  });
})();
