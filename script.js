(function () {
  "use strict";

  const gallery = document.getElementById("gallery");
  const emptyState = document.getElementById("empty-state");
  const indexCount = document.getElementById("index-count");
  const typeNav = document.getElementById("type-nav");
  const locationNav = document.getElementById("location-nav");
  const filtersNav = document.getElementById("filters");

  // Fixed top-level sections, shown in this order regardless of which
  // ones have entries yet — sections with nothing in them just show
  // the existing empty state rather than being hidden from the nav.
  // "All" is last and never the default — the site opens on Photography.
  const TYPES = ["photo", "text", "audio", "ceramics", "all"];
  const TYPE_LABELS = { all: "All", photo: "Photography", text: "Text", audio: "Audio", ceramics: "Ceramics" };
  const DEFAULT_TYPE = "photo";

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

  const allPhotos = (typeof PHOTOS !== "undefined" && Array.isArray(PHOTOS) ? PHOTOS : []).filter(
    (p) => !p.hidden
  );
  let activeType = DEFAULT_TYPE;
  let activeLocation = "all";
  let activeTag = "all";
  let visiblePhotos = [];
  let currentIndex = 0;
  let lastFocused = null;
  let touchStartX = null;
  let isZoomed = false;
  let isPlainText = false;
  let activeAudioTile = null; // { pause, collapse } for whichever audio tile is expanded

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
    let items = activeType === "all" ? allPhotos.slice() : allPhotos.filter((p) => itemType(p) === activeType);
    if (activeType === "photo" && activeLocation !== "all") {
      items = items.filter((p) => placeGroup(p) === activeLocation);
    }
    return items;
  }

  // Groups the free-text `location` field into a coarser place for the
  // Photography section's location nav. Most locations map to
  // themselves; multi-city countries (Spain currently has entries
  // tagged with the bare country and three different city names) merge
  // into one bucket so the location nav reads as one trip, not four.
  function placeGroup(photo) {
    const loc = photo.location || "";
    if (/spain/i.test(loc)) return "Spain";
    return loc || "Unspecified";
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function formatAudioTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + pad(s);
  }

  const VOLUME_KEY = "photo-site-audio-volume";
  function getStoredVolume() {
    const v = parseFloat(localStorage.getItem(VOLUME_KEY));
    return isFinite(v) && v >= 0 && v <= 1 ? v : 0.8;
  }
  function setStoredVolume(v) {
    localStorage.setItem(VOLUME_KEY, String(v));
  }

  // Audio plays inline within its own grid tile rather than opening the
  // lightbox — there's nothing to navigate prev/next between, so the
  // modal doesn't apply. Only one tile's player is expanded at a time.
  function buildAudioTile(photo, indexTag) {
    const container = document.createElement("div");
    container.className = "tile-audio";

    const toggle = document.createElement("button");
    toggle.className = "tile-audio-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Play " + (photo.title || "track"));

    const mark = document.createElement("span");
    mark.className = "tile-audio-mark";
    mark.textContent = "▸";
    const previewTitle = document.createElement("span");
    previewTitle.className = "tile-text-title";
    previewTitle.textContent = photo.title || "Untitled";
    toggle.appendChild(mark);
    toggle.appendChild(previewTitle);

    const player = document.createElement("div");
    player.className = "tile-audio-player";
    player.hidden = true;

    const audioEl = document.createElement("audio");
    audioEl.preload = "none";
    audioEl.volume = getStoredVolume();

    const playBtn = document.createElement("button");
    playBtn.className = "audio-play";
    playBtn.type = "button";
    playBtn.setAttribute("aria-label", "Play");
    playBtn.textContent = "▶";

    const progress = document.createElement("div");
    progress.className = "audio-progress";
    const progressFill = document.createElement("div");
    progressFill.className = "audio-progress-fill";
    progress.appendChild(progressFill);

    const time = document.createElement("span");
    time.className = "audio-time";
    time.textContent = "0:00 / 0:00";

    const volume = document.createElement("input");
    volume.className = "audio-volume";
    volume.type = "range";
    volume.min = "0";
    volume.max = "1";
    volume.step = "0.01";
    volume.value = String(audioEl.volume);
    volume.setAttribute("aria-label", "Volume");
    volume.addEventListener("input", () => {
      audioEl.volume = parseFloat(volume.value);
      setStoredVolume(audioEl.volume);
    });
    volume.addEventListener("click", (e) => e.stopPropagation());

    player.appendChild(audioEl);
    player.appendChild(playBtn);
    player.appendChild(progress);
    player.appendChild(time);
    player.appendChild(volume);

    function collapse() {
      audioEl.pause();
      audioEl.removeAttribute("src");
      audioEl.load();
      playBtn.textContent = "▶";
      progressFill.style.width = "0%";
      time.textContent = "0:00 / 0:00";
      player.hidden = true;
      container.classList.remove("is-expanded");
    }

    function expand() {
      if (activeAudioTile && activeAudioTile.collapse !== collapse) {
        activeAudioTile.collapse();
      }
      activeAudioTile = { collapse };
      audioEl.volume = getStoredVolume();
      volume.value = String(audioEl.volume);
      player.hidden = false;
      container.classList.add("is-expanded");
      if (!audioEl.getAttribute("src")) audioEl.src = photo.file;
      audioEl.play();
    }

    toggle.addEventListener("click", () => {
      if (player.hidden) expand();
      else if (audioEl.paused) audioEl.play();
      else audioEl.pause();
    });
    playBtn.addEventListener("click", () => {
      if (audioEl.paused) audioEl.play();
      else audioEl.pause();
    });
    audioEl.addEventListener("play", () => {
      playBtn.textContent = "❚❚";
    });
    audioEl.addEventListener("pause", () => {
      playBtn.textContent = "▶";
    });
    audioEl.addEventListener("ended", () => {
      playBtn.textContent = "▶";
    });
    audioEl.addEventListener("timeupdate", () => {
      const pct = audioEl.duration ? (audioEl.currentTime / audioEl.duration) * 100 : 0;
      progressFill.style.width = pct + "%";
      time.textContent = formatAudioTime(audioEl.currentTime) + " / " + formatAudioTime(audioEl.duration);
    });
    audioEl.addEventListener("loadedmetadata", () => {
      time.textContent = formatAudioTime(audioEl.currentTime) + " / " + formatAudioTime(audioEl.duration);
    });
    progress.addEventListener("click", (e) => {
      if (!audioEl.duration) return;
      const rect = progress.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audioEl.currentTime = pct * audioEl.duration;
    });

    container.appendChild(indexTag);
    container.appendChild(toggle);
    container.appendChild(player);
    return container;
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
    activeLocation = "all";
    activeTag = "all";
    if (lightbox.classList.contains("is-open")) closeLightbox();
    renderTypeNav();
    renderLocationNav();
    renderFilters();
    applyFilter();
  }

  /* ---------------- Location nav (Photography only) ---------------- */

  function collectLocations() {
    const places = new Set();
    allPhotos.filter((p) => itemType(p) === "photo").forEach((p) => places.add(placeGroup(p)));
    return Array.from(places).sort();
  }

  function renderLocationNav() {
    if (activeType !== "photo") {
      locationNav.hidden = true;
      return;
    }
    const places = collectLocations();
    if (places.length === 0) {
      locationNav.hidden = true;
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

    locationNav.appendChild(makeChip("All", "all"));
    places.forEach((place) => locationNav.appendChild(makeChip(place, place)));
  }

  function setActiveLocation(place) {
    activeLocation = place;
    activeTag = "all";
    if (lightbox.classList.contains("is-open")) closeLightbox();
    renderLocationNav();
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
    if (activeAudioTile) {
      activeAudioTile.collapse();
      activeAudioTile = null;
    }
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
      const isAudio = itemType(photo) === "audio";

      const figure = document.createElement("figure");
      figure.className = "tile tile--" + size;

      const indexTag = document.createElement("span");
      indexTag.className = "tile-index";
      indexTag.textContent = "N\u00b0 " + pad(i + 1);

      if (isAudio) {
        figure.appendChild(buildAudioTile(photo, indexTag));
      } else {
        const button = document.createElement("button");
        button.className = "tile-button" + (isText ? " tile-button--text" : "");
        button.type = "button";
        button.setAttribute("aria-label", "Open " + (photo.title || "photograph") + " full size");
        button.addEventListener("click", () => openLightbox(i));

        if (isText) {
          const preview = document.createElement("div");
          preview.className = "tile-text-preview";
          const previewTitle = document.createElement("span");
          previewTitle.className = "tile-text-title";
          previewTitle.textContent = photo.title || "Untitled";
          const excerpt = document.createElement("p");
          excerpt.className = "tile-text-excerpt";
          excerpt.textContent = photo.body || "";
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
        figure.appendChild(button);
      }

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
  renderLocationNav();
  renderFilters();
  applyFilter();
})();
