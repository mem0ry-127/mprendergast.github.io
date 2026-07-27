(function () {
  "use strict";

  // The actual theme is applied by an inline script in <head>, before
  // CSS paints, to avoid a flash of the wrong theme on load. This just
  // syncs the toggle button's label and handles switching + persistence.
  // Shared by every page (index, about, archive) that includes it.
  const THEME_KEY = "photo-site-theme";
  const themeToggle = document.getElementById("theme-toggle");
  const colorSchemeMeta = document.getElementById("color-scheme-meta");
  if (!themeToggle) return;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") document.documentElement.setAttribute("data-theme", "light");
    else document.documentElement.removeAttribute("data-theme");
    if (colorSchemeMeta) colorSchemeMeta.setAttribute("content", theme === "light" ? "light dark" : "dark light");
    themeToggle.textContent = theme === "light" ? "Dark" : "Light";
    themeToggle.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  }

  applyTheme(currentTheme());
  themeToggle.addEventListener("click", () => {
    const next = currentTheme() === "light" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
  });
})();
