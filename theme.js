(function () {
  "use strict";

  // The actual theme is applied by an inline script in <head>, before
  // CSS paints, to avoid a flash of the wrong theme on load. This just
  // syncs the toggle buttons' labels and handles switching + persistence.
  // Shared by every page (index, about, archive, classic) that includes it.
  //
  // Two independent toggles: a base light/dark preference (THEME_KEY),
  // and an alt-theme cycle (ALT_KEY) that takes over the full color
  // scheme when active. Each click of the Alt button advances to the
  // next entry in ALT_THEMES, looping back to "off" (plain base) after
  // the last one. Clicking the base toggle always resolves to dark or
  // light and clears whatever alt theme was active, so it does what
  // its own label says regardless of which alt theme was showing.
  const THEME_KEY = "photo-site-theme";
  const ALT_KEY = "photo-site-alt";
  const ALT_THEMES = [
    { value: "walnut", label: "Walnut" },
    { value: "forest", label: "Forest" },
    { value: "mono", label: "Mono" },
    { value: "playful", label: "Playful" },
  ];
  const themeToggle = document.getElementById("theme-toggle");
  const altToggle = document.getElementById("playful-toggle");
  const colorSchemeMeta = document.getElementById("color-scheme-meta");
  if (!themeToggle) return;

  function storedBase() {
    return localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
  }
  function storedAlt() {
    const v = localStorage.getItem(ALT_KEY);
    return ALT_THEMES.some((t) => t.value === v) ? v : "";
  }

  function apply() {
    const base = storedBase();
    const alt = storedAlt();
    const effective = alt || base;

    if (effective === "dark") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", effective);

    if (colorSchemeMeta) {
      colorSchemeMeta.setAttribute("content", effective === "dark" ? "dark light" : "light dark");
    }

    themeToggle.textContent = base === "light" ? "Dark" : "Light";
    themeToggle.setAttribute("aria-label", base === "light" ? "Switch to dark theme" : "Switch to light theme");

    if (altToggle) {
      const active = ALT_THEMES.find((t) => t.value === alt);
      altToggle.classList.toggle("is-active", !!active);
      altToggle.setAttribute("aria-pressed", String(!!active));
      altToggle.setAttribute("aria-label", active ? "Alt theme: " + active.label + " — click for next" : "Cycle alt theme");
      altToggle.title = active ? active.label : "";
    }
  }

  apply();

  themeToggle.addEventListener("click", () => {
    localStorage.setItem(THEME_KEY, storedBase() === "light" ? "dark" : "light");
    localStorage.setItem(ALT_KEY, "");
    apply();
  });

  if (altToggle) {
    altToggle.addEventListener("click", () => {
      const idx = ALT_THEMES.findIndex((t) => t.value === storedAlt());
      const next = ALT_THEMES[(idx + 1) % ALT_THEMES.length];
      localStorage.setItem(ALT_KEY, next.value);
      apply();
    });
  }
})();
