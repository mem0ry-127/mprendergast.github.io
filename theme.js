(function () {
  "use strict";

  // The actual theme is applied by an inline script in <head>, before
  // CSS paints, to avoid a flash of the wrong theme on load. This just
  // syncs the toggle buttons' labels and handles switching + persistence.
  // Shared by every page (index, about, archive) that includes it.
  //
  // Two independent toggles: a base light/dark preference (THEME_KEY),
  // and a playful overlay (PLAYFUL_KEY) that takes over the full color
  // scheme when on. Turning playful off falls back to whatever base was
  // set; clicking the base toggle always resolves to dark or light and
  // turns playful off, so it does what its own label says regardless of
  // whether playful was active.
  const THEME_KEY = "photo-site-theme";
  const PLAYFUL_KEY = "photo-site-playful";
  const themeToggle = document.getElementById("theme-toggle");
  const playfulToggle = document.getElementById("playful-toggle");
  const colorSchemeMeta = document.getElementById("color-scheme-meta");
  if (!themeToggle) return;

  function storedBase() {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  }
  function storedPlayful() {
    return localStorage.getItem(PLAYFUL_KEY) === "on";
  }

  function apply() {
    const base = storedBase();
    const playful = storedPlayful();
    const effective = playful ? "playful" : base;

    if (effective === "dark") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", effective);

    if (colorSchemeMeta) {
      colorSchemeMeta.setAttribute("content", effective === "dark" ? "dark light" : "light dark");
    }

    themeToggle.textContent = base === "light" ? "Dark" : "Light";
    themeToggle.setAttribute("aria-label", base === "light" ? "Switch to dark theme" : "Switch to light theme");

    if (playfulToggle) {
      playfulToggle.classList.toggle("is-active", playful);
      playfulToggle.setAttribute("aria-pressed", String(playful));
    }
  }

  apply();

  themeToggle.addEventListener("click", () => {
    localStorage.setItem(THEME_KEY, storedBase() === "light" ? "dark" : "light");
    localStorage.setItem(PLAYFUL_KEY, "off");
    apply();
  });

  if (playfulToggle) {
    playfulToggle.addEventListener("click", () => {
      localStorage.setItem(PLAYFUL_KEY, storedPlayful() ? "off" : "on");
      apply();
    });
  }
})();
