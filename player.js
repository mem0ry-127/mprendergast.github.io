(function () {
  "use strict";

  // The single, persistent audio engine for the whole site. This file's
  // own <script> tag only ever executes once per real page load — the
  // router (router.js) swaps page content around it but never touches
  // this script or the widget it builds, which is what lets a track
  // keep playing gaplessly as you navigate between pages. Inline audio
  // tiles (script.js's buildAudioTile) don't own any audio themselves;
  // they just call into window.SitePlayer and mirror its state.

  const VOLUME_KEY = "photo-site-audio-volume";
  function getStoredVolume() {
    const v = parseFloat(localStorage.getItem(VOLUME_KEY));
    return isFinite(v) && v >= 0 && v <= 1 ? v : 0.8;
  }
  function setStoredVolume(v) {
    localStorage.setItem(VOLUME_KEY, String(v));
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }
  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + pad(s);
  }

  const allPhotos = typeof PHOTOS !== "undefined" && Array.isArray(PHOTOS) ? PHOTOS : [];
  const playlist = allPhotos.filter((p) => !p.hidden && (p.type || "photo") === "audio");

  const audioEl = new Audio();
  audioEl.preload = "none";
  audioEl.volume = getStoredVolume();

  let currentIndex = -1; // index into playlist, or -1 if nothing chosen yet

  /* ---------------- Widget ---------------- */

  const widget = document.createElement("div");
  widget.id = "site-player";
  widget.hidden = true;
  widget.innerHTML =
    // Mini bar: mobile-only compact state (see the max-width media
    // query in styles.css — on desktop this never displays, the full
    // player below is always shown). Tapping it expands to .site-player-full;
    // its own play/pause and next stay directly usable without expanding.
    '<div class="site-player-mini">' +
    '<button class="audio-play site-player-mini-play" type="button" aria-label="Play">▶</button>' +
    '<span class="site-player-mini-title"></span>' +
    '<button class="site-player-mini-next" type="button" aria-label="Next track">⏭</button>' +
    "</div>" +
    '<div class="site-player-full">' +
    '<div class="site-player-header">' +
    '<span class="site-player-now">Now Playing</span>' +
    '<div class="site-player-header-actions">' +
    '<button class="site-player-collapse" type="button" aria-label="Minimize player">⌄</button>' +
    '<button class="site-player-close" type="button" aria-label="Close player">✕</button>' +
    "</div>" +
    "</div>" +
    '<div class="site-player-track">' +
    '<span class="site-player-title"></span>' +
    '<span class="site-player-date"></span>' +
    "</div>" +
    '<div class="audio-progress site-player-progress"><div class="audio-progress-fill"></div></div>' +
    '<div class="audio-time site-player-time">0:00 / 0:00</div>' +
    '<div class="site-player-transport">' +
    '<button class="site-player-prev" type="button" aria-label="Previous track">⏮</button>' +
    '<button class="audio-play site-player-playpause" type="button" aria-label="Play">▶</button>' +
    '<button class="site-player-next" type="button" aria-label="Next track">⏭</button>' +
    '<input class="audio-volume site-player-volume" type="range" min="0" max="1" step="0.01" aria-label="Volume">' +
    "</div>" +
    '<ul class="site-player-playlist"></ul>' +
    "</div>";
  document.body.appendChild(widget);

  const els = {
    miniBar: widget.querySelector(".site-player-mini"),
    miniPlay: widget.querySelector(".site-player-mini-play"),
    miniTitle: widget.querySelector(".site-player-mini-title"),
    miniNext: widget.querySelector(".site-player-mini-next"),
    collapse: widget.querySelector(".site-player-collapse"),
    close: widget.querySelector(".site-player-close"),
    title: widget.querySelector(".site-player-title"),
    date: widget.querySelector(".site-player-date"),
    progress: widget.querySelector(".site-player-progress"),
    progressFill: widget.querySelector(".audio-progress-fill"),
    time: widget.querySelector(".site-player-time"),
    prev: widget.querySelector(".site-player-prev"),
    playpause: widget.querySelector(".site-player-playpause"),
    next: widget.querySelector(".site-player-next"),
    volume: widget.querySelector(".site-player-volume"),
    list: widget.querySelector(".site-player-playlist"),
  };
  els.volume.value = String(audioEl.volume);

  playlist.forEach((photo, i) => {
    const li = document.createElement("li");
    li.className = "site-player-playlist-item";
    const btn = document.createElement("button");
    btn.type = "button";
    const title = document.createElement("span");
    title.className = "site-player-playlist-title";
    title.textContent = photo.title || "Untitled";
    const duration = document.createElement("span");
    duration.className = "site-player-playlist-duration";
    duration.textContent = photo.duration || "";
    btn.appendChild(title);
    btn.appendChild(duration);
    btn.addEventListener("click", () => playIndex(i));
    li.appendChild(btn);
    els.list.appendChild(li);
  });

  function playlistRow(i) {
    return els.list.children[i] || null;
  }

  /* ---------------- Core playback ---------------- */

  function playIndex(i) {
    if (i < 0 || i >= playlist.length) return;
    const changingTrack = i !== currentIndex;
    const wasHidden = widget.hidden;
    const prevRow = playlistRow(currentIndex);
    if (prevRow) prevRow.classList.remove("is-current");
    currentIndex = i;
    const photo = playlist[i];
    if (changingTrack) {
      audioEl.src = photo.file;
      audioEl.currentTime = 0;
    }
    audioEl.play();
    els.title.textContent = photo.title || "Untitled";
    els.date.textContent = photo.date || "";
    els.miniTitle.textContent = photo.title || "Untitled";
    widget.hidden = false;
    // Default to the compact mini bar (mobile only -- see styles.css)
    // whenever the player is newly appearing, so starting a track
    // never blocks browsing. Doesn't re-collapse an already-open
    // player just because the track changed underneath it.
    if (wasHidden) widget.classList.add("is-collapsed");
    const row = playlistRow(i);
    if (row) {
      row.classList.add("is-current");
      row.scrollIntoView({ block: "nearest" });
    }
    syncActiveTile();
  }

  function playOrToggle(photo) {
    const i = playlist.indexOf(photo);
    if (i === -1) return;
    if (i === currentIndex && !widget.hidden) {
      if (audioEl.paused) audioEl.play();
      else audioEl.pause();
    } else {
      playIndex(i);
    }
  }

  function next() {
    if (!playlist.length) return;
    playIndex((currentIndex + 1) % playlist.length);
  }
  function prev() {
    if (!playlist.length) return;
    playIndex((currentIndex - 1 + playlist.length) % playlist.length);
  }
  function seek(fraction) {
    if (!audioEl.duration) return;
    audioEl.currentTime = Math.min(Math.max(fraction, 0), 1) * audioEl.duration;
  }
  function setVolume(v) {
    audioEl.volume = Math.min(Math.max(v, 0), 1);
    setStoredVolume(audioEl.volume);
    els.volume.value = String(audioEl.volume);
    syncActiveTile();
  }
  function closePlayer() {
    audioEl.pause();
    widget.hidden = true;
    const row = playlistRow(currentIndex);
    if (row) row.classList.remove("is-current");
    currentIndex = -1;
    syncActiveTile();
  }

  function togglePlayPause() {
    if (currentIndex === -1) return;
    if (audioEl.paused) audioEl.play();
    else audioEl.pause();
  }

  els.close.addEventListener("click", closePlayer);
  els.collapse.addEventListener("click", () => widget.classList.add("is-collapsed"));
  els.playpause.addEventListener("click", togglePlayPause);
  els.prev.addEventListener("click", prev);
  els.next.addEventListener("click", next);
  els.volume.addEventListener("input", () => setVolume(parseFloat(els.volume.value)));
  els.progress.addEventListener("click", (e) => {
    const rect = els.progress.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  });

  // Tapping the mini bar expands it; its own play/pause and next stay
  // directly usable without expanding first, so they stop the tap from
  // also bubbling up to the expand handler.
  els.miniBar.addEventListener("click", () => widget.classList.remove("is-collapsed"));
  els.miniPlay.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlayPause();
  });
  els.miniNext.addEventListener("click", (e) => {
    e.stopPropagation();
    next();
  });

  audioEl.addEventListener("play", () => {
    els.playpause.textContent = "❚❚";
    els.miniPlay.textContent = "❚❚";
    syncActiveTile();
  });
  audioEl.addEventListener("pause", () => {
    els.playpause.textContent = "▶";
    els.miniPlay.textContent = "▶";
    syncActiveTile();
  });
  audioEl.addEventListener("ended", next);
  audioEl.addEventListener("timeupdate", () => {
    const pct = audioEl.duration ? (audioEl.currentTime / audioEl.duration) * 100 : 0;
    els.progressFill.style.width = pct + "%";
    els.time.textContent = formatTime(audioEl.currentTime) + " / " + formatTime(audioEl.duration);
    syncActiveTile();
  });

  /* ---------------- Inline tile mirroring ----------------
     Inline audio tiles (rendered fresh by script.js on every gallery
     render / page navigation) hold no playback state of their own —
     they just reflect whatever SitePlayer is doing for their track,
     looked up fresh by data-file each time rather than kept as a
     stored reference, so there's nothing to leak as tiles come and go. */

  function currentTrack() {
    return currentIndex === -1 ? null : playlist[currentIndex];
  }

  function applyTileState(tileEl) {
    tileEl.classList.add("is-expanded");
    const playerBox = tileEl.querySelector(".tile-audio-player");
    if (playerBox) playerBox.hidden = false;
    const fill = tileEl.querySelector(".audio-progress-fill");
    const time = tileEl.querySelector(".audio-time");
    const playBtn = tileEl.querySelector(".audio-play");
    const volumeInput = tileEl.querySelector(".audio-volume");
    const pct = audioEl.duration ? (audioEl.currentTime / audioEl.duration) * 100 : 0;
    if (fill) fill.style.width = pct + "%";
    if (time) time.textContent = formatTime(audioEl.currentTime) + " / " + formatTime(audioEl.duration);
    if (playBtn) playBtn.textContent = audioEl.paused ? "▶" : "❚❚";
    if (volumeInput) volumeInput.value = String(audioEl.volume);
  }

  function collapseTile(tileEl) {
    tileEl.classList.remove("is-expanded");
    const playerBox = tileEl.querySelector(".tile-audio-player");
    if (playerBox) playerBox.hidden = true;
  }

  function syncActiveTile() {
    const track = currentTrack();
    document.querySelectorAll(".tile-audio.is-expanded").forEach((el) => {
      if (!track || el.dataset.file !== track.file) collapseTile(el);
    });
    if (!track) return;
    const el = document.querySelector('.tile-audio[data-file="' + CSS.escape(track.file) + '"]');
    if (el) applyTileState(el);
  }

  // Called by a freshly-built tile (script.js) so it reflects an
  // already-playing track immediately, instead of waiting for the
  // next timeupdate tick (~every quarter second during playback).
  function syncTile(tileEl) {
    const track = currentTrack();
    if (track && tileEl.dataset.file === track.file) applyTileState(tileEl);
  }

  window.SitePlayer = {
    playOrToggle: playOrToggle,
    next: next,
    prev: prev,
    seek: seek,
    setVolume: setVolume,
    syncTile: syncTile,
  };
})();
