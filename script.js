(function () {
  "use strict";

  const gallery = document.getElementById("gallery");
  const emptyState = document.getElementById("empty-state");
  const indexCount = document.getElementById("index-count");
  const typeNav = document.getElementById("type-nav");
  const filtersNav = document.getElementById("filters");

  // Fixed top-level sections, shown in this order regardless of which
  // ones have entries yet — sections with nothing in them just show
  // the existing empty state rather than being hidden from the nav.
  const TYPES = ["all", "photo", "text", "audio"];
  const TYPE_LABELS = { all: "All", photo: "Photography", text: "Text", audio: "Audio" };

  const lightbox = document.getElementById("lightbox");
  const lightboxFigure = document.querySelector(".lightbox-figure");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxText = document.getElementById("lightbox-text");
  const lightboxTextBody = document.getElementById("lightbox-text-body");
  const plainTextToggle = document.getElementById("plain-text-toggle");
  const lightboxIndex = document.getElementById("lightbox-index");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const lightboxSpecs = document.getElementById("lightbox-specs");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  const allPhotos = typeof PHOTOS !== "undefined" && Array.isArray(PHOTOS) ? PHOTOS : [];
  let activeType = "all";
  let activeTag = "all";
  let visiblePhotos = [];
  let currentIndex = 0;
  let lastFocused = null;
  let touchStartX = null;
  let isZoomed = false;
  let isPlainText = false;

  function itemType(p) {
    return p.type || "photo";
  }

  // Verse: literal line breaks + blank-line stanza breaks, no special
  // per-poem indentation or effects. Prose: a single justified block,
  // reflowing normally. This is a deliberately simplified, consistent
  // template rather than a faithful per-poem replica of the source PDF.
  function renderTextBody(item, plain) {
    lightboxTextBody.innerHTML = "";
    lightboxTextBody.className = "lightbox-text-body" + (plain ? " is-plain" : "");
    const body = item.body || "";
    const stanzas = body.split(/\n\s*\n/);
    stanzas.forEach((stanza) => {
      const p = document.createElement("p");
      if (!plain && item.format === "prose") {
        p.className = "text-prose";
        p.textContent = stanza.replace(/\n/g, " ").trim();
      } else {
        p.className = "text-verse";
        stanza.split("\n").forEach((line, i) => {
          if (i > 0) p.appendChild(document.createElement("br"));
          p.appendChild(document.createTextNode(line));
        });
      }
      lightboxTextBody.appendChild(p);
    });
  }

  function itemsOfActiveType() {
    if (activeType === "all") return allPhotos.slice();
    return allPhotos.filter((p) => itemType(p) === activeType);
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function metaLine(photo) {
    return [photo.date, photo.location].filter(Boolean).join(" \u00b7 ");
  }

  function specLine(photo) {
    return [photo.camera, photo.lens, photo.aperture, photo.shutter, photo.iso, photo.film]
      .filter(Boolean)
      .join(" \u00b7 ");
  }

  /* ---------------- Type nav (top-level sections) ---------------- */

  function renderTypeNav() {
    typeNav.hidden = false;
    typeNav.innerHTML = "";
    TYPES.forEach((t) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "type-chip" + (activeType === t ? " is-active" : "");
      btn.textContent = TYPE_LABELS[t];
      btn.addEventListener("click", () => setActiveType(t));
      typeNav.appendChild(btn);
    });
  }

  function setActiveType(type) {
    activeType = type;
    activeTag = "all";
    if (lightbox.classList.contains("is-open")) closeLightbox();
    renderTypeNav();
    renderFilters();
    applyFilter();
  }

  /* ---------------- Tag filters (scoped to the active type) ---------------- */

  function collectTags() {
    const tags = new Set();
    itemsOfActiveType().forEach((p) => {
      if (Array.isArray(p.tags)) p.tags.forEach((t) => tags.add(t));
    });
    return Array.from(tags).sort();
  }

  function renderFilters() {
    // "All" is the merged view across every section — no sub-tag row.
    // A specific section only gets a tag row when it actually has tags.
    if (activeType === "all") {
      filtersNav.hidden = true;
      return;
    }
    const tags = collectTags();
    if (tags.length === 0) {
      filtersNav.hidden = true;
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
    if (lightbox.classList.contains("is-open")) closeLightbox();
    renderFilters();
    applyFilter();
  }

  function applyFilter() {
    const base = itemsOfActiveType();
    visiblePhotos =
      activeTag === "all" ? base.slice() : base.filter((p) => Array.isArray(p.tags) && p.tags.includes(activeTag));
    renderGallery();
  }

  /* ---------------- Gallery ---------------- */

  function renderGallery() {
    gallery.innerHTML = "";
    indexCount.textContent = "N\u00b0 " + pad(visiblePhotos.length);

    if (visiblePhotos.length === 0) {
      emptyState.hidden = false;
      return;
    }
    emptyState.hidden = true;

    const frag = document.createDocumentFragment();

    visiblePhotos.forEach((photo, i) => {
      const size = ["lg", "md", "sm"].includes(photo.size) ? photo.size : "md";
      const isText = itemType(photo) === "text";

      const figure = document.createElement("figure");
      figure.className = "tile tile--" + size;

      const button = document.createElement("button");
      button.className = "tile-button" + (isText ? " tile-button--text" : "");
      button.type = "button";
      button.setAttribute("aria-label", "Open " + (photo.title || "photograph") + " full size");
      button.addEventListener("click", () => openLightbox(i));

      const indexTag = document.createElement("span");
      indexTag.className = "tile-index";
      indexTag.textContent = "N\u00b0 " + pad(i + 1);

      if (isText) {
        const preview = document.createElement("div");
        preview.className = "tile-text-preview";
        const previewTitle = document.createElement("span");
        previewTitle.className = "tile-text-title";
        previewTitle.textContent = photo.title || "Untitled";
        const excerpt = document.createElement("p");
        excerpt.className = "tile-text-excerpt";
        excerpt.textContent = (photo.body || "").split(/\n+/).slice(0, 3).join(" \u2014 ");
        preview.appendChild(previewTitle);
        preview.appendChild(excerpt);
        button.appendChild(preview);
      } else {
        const img = document.createElement("img");
        img.src = photo.file;
        img.alt = photo.alt || "";
        img.loading = "lazy";
        button.appendChild(img);
      }
      button.appendChild(indexTag);

      const caption = document.createElement("figcaption");
      const title = document.createElement("span");
      title.className = "tile-title";
      title.textContent = photo.title || "Untitled";

      const meta = document.createElement("span");
      meta.className = "tile-meta";
      meta.textContent = metaLine(photo);

      caption.appendChild(title);
      caption.appendChild(meta);

      figure.appendChild(button);
      figure.appendChild(caption);
      frag.appendChild(figure);
    });

    gallery.appendChild(frag);
  }

  /* ---------------- Lightbox ---------------- */

  function openLightbox(i) {
    if (!visiblePhotos.length) return;
    currentIndex = i;
    lastFocused = document.activeElement;
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
    if (lastFocused) lastFocused.focus();
  }

  function updateLightbox() {
    const photo = visiblePhotos[currentIndex];
    const isText = itemType(photo) === "text";
    isPlainText = false;

    lightboxImage.hidden = isText;
    lightboxText.hidden = !isText;
    if (isText) {
      plainTextToggle.textContent = "Plain text";
      renderTextBody(photo, false);
    } else {
      lightboxImage.src = photo.file;
      lightboxImage.alt = photo.alt || "";
    }

    lightboxIndex.textContent = "N\u00b0 " + pad(currentIndex + 1) + " / " + pad(visiblePhotos.length);
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
  plainTextToggle.addEventListener("click", () => {
    isPlainText = !isPlainText;
    plainTextToggle.textContent = isPlainText ? "Styled" : "Plain text";
    renderTextBody(visiblePhotos[currentIndex], isPlainText);
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Tap zones: clicking the left/right third of the image steps
  // through the set, same as the arrow buttons — useful on phones
  // where the arrow buttons sit near the screen edge. The center
  // third toggles a zoomed, scrollable full-resolution view instead.
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

  // Swipe navigation for touch devices.
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

  renderTypeNav();
  renderFilters();
  applyFilter();
})();
