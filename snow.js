(function () {
  "use strict";

  // Ambient pixel-snow overlay, toggled from the header. Off by default;
  // the on/off state persists across pages and sessions like the theme.
  // Shared by every page (index, about, archive) that includes it.
  const SNOW_KEY = "photo-site-snow";
  const SPEED_KEY = "photo-site-snow-speed";
  const AMOUNT_KEY = "photo-site-snow-amount";
  const WIND_KEY = "photo-site-snow-wind";

  const toggle = document.getElementById("snow-toggle");
  if (!toggle) return;

  const settingsToggle = document.getElementById("snow-settings-toggle");
  const settingsPanel = document.getElementById("snow-settings-panel");
  const speedInput = document.getElementById("snow-speed");
  const amountInput = document.getElementById("snow-amount");
  const windInput = document.getElementById("snow-wind");

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // BASE_FLAKE_COUNT is how many flakes show at Amount's default (1x).
  // POOL_SIZE is pre-generated once and just partially drawn/updated
  // each frame -- Math.round(BASE_FLAKE_COUNT * amount) of them -- so
  // changing Amount doesn't need to resize any array, just draw more
  // or fewer of the same pool.
  const BASE_FLAKE_COUNT = 90;
  const POOL_SIZE = 180;
  const SIZES = [2, 2, 2, 3, 3, 4];
  const COLORS = ["#ffffff", "#f1f6fb", "#cfe0ee"];
  const WIND_STRENGTH = 0.6;

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }
  function storedNumber(key, fallback, min, max) {
    const v = parseFloat(localStorage.getItem(key));
    return isFinite(v) ? clamp(v, min, max) : fallback;
  }

  let speedSetting = storedNumber(SPEED_KEY, 1, 0.3, 2.5);
  let amountSetting = storedNumber(AMOUNT_KEY, 1, 0.2, 2);
  let windSetting = storedNumber(WIND_KEY, 0, -1, 1);

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
    flakes = Array.from({ length: POOL_SIZE }, () => randomFlake(true));
    window.addEventListener("resize", resize);
  }

  function activeFlakeCount() {
    return Math.round(clamp(BASE_FLAKE_COUNT * amountSetting, 1, POOL_SIZE));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);
    windPhase += 0.0025;
    // Wind is mostly the user's directional slider now -- the sine
    // term is just a small residual wobble so a fixed slider position
    // still feels a little alive rather than perfectly static.
    const wind = windSetting * WIND_STRENGTH + Math.sin(windPhase) * 0.1;
    const count = activeFlakeCount();
    for (let i = 0; i < count; i++) {
      const f = flakes[i];
      f.y += f.speed * speedSetting;
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

  /* ---------------- Settings dropdown ----------------
     Speed/Amount/Wind sliders, opened from the small arrow next to
     the Snow toggle. All three persist independently of the on/off
     state and of each other, same pattern as volume/theme. */
  if (settingsToggle && settingsPanel && speedInput && amountInput && windInput) {
    speedInput.value = String(speedSetting);
    amountInput.value = String(amountSetting);
    windInput.value = String(windSetting);

    function closePanel() {
      settingsPanel.hidden = true;
      settingsToggle.setAttribute("aria-expanded", "false");
    }
    function openPanel() {
      settingsPanel.hidden = false;
      settingsToggle.setAttribute("aria-expanded", "true");
    }

    settingsToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (settingsPanel.hidden) openPanel();
      else closePanel();
    });
    // Interacting with the panel itself (dragging a slider) shouldn't
    // bubble up to the document click listener that closes it.
    settingsPanel.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", () => {
      if (!settingsPanel.hidden) closePanel();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !settingsPanel.hidden) closePanel();
    });

    speedInput.addEventListener("input", () => {
      speedSetting = clamp(parseFloat(speedInput.value), 0.3, 2.5);
      localStorage.setItem(SPEED_KEY, String(speedSetting));
    });
    amountInput.addEventListener("input", () => {
      amountSetting = clamp(parseFloat(amountInput.value), 0.2, 2);
      localStorage.setItem(AMOUNT_KEY, String(amountSetting));
    });
    windInput.addEventListener("input", () => {
      windSetting = clamp(parseFloat(windInput.value), -1, 1);
      localStorage.setItem(WIND_KEY, String(windSetting));
    });
  }
})();
