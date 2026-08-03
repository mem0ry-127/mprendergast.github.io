(function () {
  "use strict";

  // Standalone controller for beta.html — a separate, photos-only
  // layout experiment. Deliberately not wired into script.js/router.js:
  // this page isn't part of the PJAX-swapped set (see router.js's
  // ROUTES), so it's a plain full page load in and out, and it owns a
  // simplified copy of just the location/tag-filter and lightbox logic
  // it actually needs rather than sharing initIndexPage's larger,
  // multi-section machinery.

  const bgCol = document.querySelector(".beta-bg-col");
  const bgImage = document.querySelector(".beta-bg-image");
  const detail = document.getElementById("beta-detail");
  const detailClose = document.getElementById("beta-detail-close");
  const detailImageBtn = document.getElementById("beta-detail-image-btn");
  const detailImage = document.getElementById("beta-detail-image");
  const detailTitle = document.getElementById("beta-detail-title");
  const detailMeta = document.getElementById("beta-detail-meta");
  const detailSpecs = document.getElementById("beta-detail-specs");
  const locationNav = document.getElementById("beta-location-nav");
  const filtersNav = document.getElementById("beta-filters");
  const gallery = document.getElementById("beta-gallery");
  const emptyState = document.getElementById("beta-empty-state");

  const lightbox = document.getElementById("lightbox");
  const lightboxFigure = document.querySelector(".lightbox-figure");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxIndex = document.getElementById("lightbox-index");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const lightboxSpecs = document.getElementById("lightbox-specs");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  const allPhotos = (typeof PHOTOS !== "undefined" && Array.isArray(PHOTOS) ? PHOTOS : []).filter(
    (p) => !p.hidden && (p.type || "photo") === "photo"
  );

  // Kept in sync with beta.css's own breakpoint (see the comment there).
  const splitViewQuery = window.matchMedia("(min-width: 900px)");

  let activeLocation = "all";
  let activeTag = "all";
  let filtersExpanded = false;
  let visiblePhotos = [];
  let selectedIndex = null;
  let currentIndex = 0;
  let isZoomed = false;
  let touchStartX = null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function placeGroup(photo) {
    const loc = photo.location || "";
    if (/spain/i.test(loc)) return "Spain";
    return loc || "Unspecified";
  }

  function metaLine(photo) {
    return [photo.date, photo.location].filter(Boolean).join(" · ");
  }

  function specLine(photo) {
    return [photo.camera, photo.lens, photo.aperture, photo.shutter, photo.iso, photo.film]
      .filter(Boolean)
      .join(" · ");
  }

  /* ---------------- Location + tag nav (same pattern as script.js) ---------------- */

  function collectLocations() {
    const places = new Set();
    allPhotos.forEach((p) => places.add(placeGroup(p)));
    return Array.from(places).sort();
  }

  function itemsForLocation() {
    return activeLocation === "all" ? allPhotos.slice() : allPhotos.filter((p) => placeGroup(p) === activeLocation);
  }

  function collectTags() {
    const tags = new Set();
    itemsForLocation().forEach((p) => {
      if (Array.isArray(p.tags)) p.tags.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }

  function makeFiltersToggle() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filters-toggle" + (filtersExpanded || activeTag !== "all" ? " is-active" : "");
    btn.setAttribute("aria-label", filtersExpanded ? "Hide tag filters" : "Show tag filters");
    btn.setAttribute("aria-expanded", String(filtersExpanded));
    btn.textContent = "⌄";
    btn.addEventListener("click", () => {
      filtersExpanded = !filtersExpanded;
      renderLocationNav();
      renderFilters();
    });
    return btn;
  }

  function renderLocationNav() {
    const places = collectLocations();
    if (places.length === 0) {
      locationNav.hidden = true;
      locationNav.innerHTML = "";
      return;
    }
    locationNav.hidden = false;
    locationNav.innerHTML = "";

    const makeChip = (label, place) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "location-chip" + (activeLocation === place ? " is-active" : "");
      btn.textContent = label;
      btn.addEventListener("click", () => setActiveLocation(place));
      return btn;
    };

    const entries = [["All", "all"]].concat(places.map((place) => [place, place]));
    entries.forEach(([label, place]) => {
      const chip = makeChip(label, place);
      if (place === activeLocation && collectTags().length > 0) {
        const wrap = document.createElement("span");
        wrap.className = "location-chip-group";
        wrap.appendChild(chip);
        wrap.appendChild(makeFiltersToggle());
        locationNav.appendChild(wrap);
      } else {
        locationNav.appendChild(chip);
      }
    });
  }

  function setActiveLocation(place) {
    activeLocation = place;
    activeTag = "all";
    filtersExpanded = false;
    closeDetail();
    renderLocationNav();
    renderFilters();
    applyFilter();
  }

  function renderFilters() {
    if (!filtersExpanded) {
      filtersNav.hidden = true;
      filtersNav.innerHTML = "";
      return;
    }
    const tags = collectTags();
    if (tags.length === 0) {
      filtersNav.hidden = true;
      filtersNav.innerHTML = "";
      return;
    }
    filtersNav.hidden = false;
    filtersNav.innerHTML = "";

    const makeChip = (label, tag) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "filter-chip" + (activeTag === tag ? " is-active" : "");
      btn.textContent = label;
      btn.addEventListener("click", () => setActiveTag(tag));
      return btn;
    };

    filtersNav.appendChild(makeChip("All", "all"));
    tags.forEach((t) => filtersNav.appendChild(makeChip(t, t)));
  }

  function setActiveTag(tag) {
    activeTag = tag;
    closeDetail();
    renderLocationNav();
    renderFilters();
    applyFilter();
  }

  function applyFilter() {
    const base = itemsForLocation();
    visiblePhotos = activeTag === "all" ? base.slice() : base.filter((p) => Array.isArray(p.tags) && p.tags.includes(activeTag));
    renderGallery();
  }

  /* ---------------- Gallery (right column) ---------------- */

  function renderGallery() {
    gallery.innerHTML = "";
    if (visiblePhotos.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    const frag = document.createDocumentFragment();
    visiblePhotos.forEach((photo, i) => {
      const size = ["lg", "md", "sm"].includes(photo.size) ? photo.size : "md";
      const figure = document.createElement("figure");
      figure.className = "tile tile--" + size;

      const button = document.createElement("button");
      button.className = "tile-button";
      button.type = "button";
      button.setAttribute("aria-label", "View " + (photo.title || "photograph"));
      button.addEventListener("click", () => {
        // Below the split-view breakpoint there's no left column to show
        // detail in, so a tap goes straight to the lightbox instead of
        // the desktop's two-step (detail panel, then lightbox) flow.
        if (splitViewQuery.matches) showDetail(i);
        else openLightbox(i);
      });

      const img = document.createElement("img");
      img.src = photo.file;
      img.alt = photo.alt || "";
      img.loading = "lazy";
      button.appendChild(img);

      const indexTag = document.createElement("span");
      indexTag.className = "tile-index";
      indexTag.textContent = "N° " + pad(i + 1);
      button.appendChild(indexTag);
      figure.appendChild(button);

      const caption = document.createElement("figcaption");
      const title = document.createElement("span");
      title.className = "tile-title";
      title.textContent = photo.title || "Untitled";
      const meta = document.createElement("span");
      meta.className = "tile-meta";
      meta.textContent = metaLine(photo);
      caption.appendChild(title);
      caption.appendChild(meta);
      figure.appendChild(caption);

      if (selectedIndex === i) figure.classList.add("is-selected");

      frag.appendChild(figure);
    });
    gallery.appendChild(frag);
  }

  /* ---------------- Left column: background <-> detail ---------------- */

  function showDetail(i) {
    selectedIndex = i;
    const photo = visiblePhotos[i];
    detailImage.src = photo.file;
    detailImage.alt = photo.alt || "";
    detailTitle.textContent = photo.title || "Untitled";
    detailMeta.textContent = metaLine(photo);
    const specs = specLine(photo);
    detailSpecs.textContent = specs;
    detailSpecs.hidden = specs.length === 0;

    detail.hidden = false;
    bgImage.classList.add("is-dimmed");
    renderGallery();
  }

  function closeDetail() {
    if (selectedIndex === null) return;
    selectedIndex = null;
    detail.hidden = true;
    bgImage.classList.remove("is-dimmed");
    renderGallery();
  }

  detailClose.addEventListener("click", closeDetail);
  detailImageBtn.addEventListener("click", () => {
    if (selectedIndex !== null) openLightbox(selectedIndex);
  });

  /* ---------------- Lightbox (photos only — no text/audio branches needed) ---------------- */

  function openLightbox(i) {
    if (!visiblePhotos.length) return;
    currentIndex = i;
    updateLightbox();
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    closeBtn.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onKeydown);
    setZoomed(false);
  }

  function updateLightbox() {
    const photo = visiblePhotos[currentIndex];
    lightboxImage.src = photo.file;
    lightboxImage.alt = photo.alt || "";
    lightboxIndex.textContent = "N° " + pad(currentIndex + 1) + " / " + pad(visiblePhotos.length);
    lightboxTitle.textContent = photo.title || "Untitled";
    lightboxMeta.textContent = metaLine(photo);
    lightboxSpecs.textContent = specLine(photo);
    lightboxSpecs.hidden = specLine(photo).length === 0;
  }

  function step(delta) {
    setZoomed(false);
    currentIndex = (currentIndex + delta + visiblePhotos.length) % visiblePhotos.length;
    updateLightbox();
  }

  function setZoomed(state) {
    isZoomed = state;
    lightboxFigure.classList.toggle("is-zoomed", state);
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  }

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxImage.addEventListener("click", (e) => {
    if (isZoomed) {
      setZoomed(false);
      return;
    }
    const rect = lightboxImage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3) step(-1);
    else if (x > (rect.width * 2) / 3) step(1);
    else setZoomed(true);
  });

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true }
  );
  lightbox.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) step(dx > 0 ? -1 : 1);
      touchStartX = null;
    },
    { passive: true }
  );

  renderLocationNav();
  renderFilters();
  applyFilter();
})();
