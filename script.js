(function () {
  "use strict";

  const gallery = document.getElementById("gallery");
  const emptyState = document.getElementById("empty-state");
  const indexCount = document.getElementById("index-count");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxIndex = document.getElementById("lightbox-index");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  const photos = Array.isArray(window.PHOTOS) ? window.PHOTOS : [];
  let currentIndex = 0;
  let lastFocused = null;

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function metaLine(photo) {
    return [photo.date, photo.location].filter(Boolean).join(" · ");
  }

  function render() {
    indexCount.textContent = "N\u00b0 " + pad(photos.length);

    if (photos.length === 0) {
      emptyState.hidden = false;
      return;
    }

    const frag = document.createDocumentFragment();

    photos.forEach((photo, i) => {
      const size = ["lg", "md", "sm"].includes(photo.size) ? photo.size : "md";

      const figure = document.createElement("figure");
      figure.className = "tile tile--" + size;

      const button = document.createElement("button");
      button.className = "tile-button";
      button.type = "button";
      button.setAttribute("aria-label", "Open " + (photo.title || "photograph") + " full size");
      button.addEventListener("click", () => openLightbox(i));

      const img = document.createElement("img");
      img.src = photo.file;
      img.alt = photo.alt || "";
      img.loading = "lazy";

      const indexTag = document.createElement("span");
      indexTag.className = "tile-index";
      indexTag.textContent = "N\u00b0 " + pad(i + 1);

      button.appendChild(img);
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

  function openLightbox(i) {
    if (!photos.length) return;
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
    if (lastFocused) lastFocused.focus();
  }

  function updateLightbox() {
    const photo = photos[currentIndex];
    lightboxImage.src = photo.file;
    lightboxImage.alt = photo.alt || "";
    lightboxIndex.textContent = "N\u00b0 " + pad(currentIndex + 1) + " / " + pad(photos.length);
    lightboxTitle.textContent = photo.title || "Untitled";
    lightboxMeta.textContent = metaLine(photo);
  }

  function step(delta) {
    currentIndex = (currentIndex + delta + photos.length) % photos.length;
    updateLightbox();
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

  render();
})();
