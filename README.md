# photographs

A personal index of photographs, built as a static site with no framework
and no build step. Eventually a mixed-media home for photos, audio, and
writing — for now, just the photo index.

## Architecture

`index.html` is a static shell with empty containers for the filter bar,
gallery, and lightbox. All content lives in `photos.js`, a plain array of
objects assigned to `window.PHOTOS`. `script.js` reads that array on load
and renders everything client-side: grid tiles, tag filter chips, and the
lightbox. There's no templating and no build step — editing `photos.js`
and pushing is the entire publishing workflow.

Visual design is Swiss/International Typographic Style: an asymmetric
12-column grid, a restrained type system (Archivo for display, IBM Plex
Sans for body, IBM Plex Mono for index numbers and metadata), and a single
accent color used for one deliberate flourish — a bracket frame that
tightens around a tile on hover, styled after a viewfinder. All colors and
fonts are CSS custom properties at the top of `styles.css`, so re-theming
is a matter of changing the token block, not hunting through selectors.

## Structure

```
index.html      page shell — header, filter nav, gallery/lightbox containers
styles.css      all styling; design tokens (color, type) at the top
photos.js       the photo manifest — the only file edited routinely
script.js       renders the grid + lightbox from photos.js, handles
                filtering and keyboard/touch navigation
images/         image files, organized into subfolders by trip or
                location (e.g. images/spain/, images/oregon/) — the
                manifest just needs a correct relative path, structure
                underneath images/ is otherwise free-form
```

## Adding a photo

1. Resize and compress the image first (see below) and save it into
   `images/`, e.g. `images/2026-02-rittenhouse.jpg`.
2. Open `photos.js` and add one entry near the top of the `PHOTOS` array:

```js
{ file: "images/2026-02-rittenhouse.jpg", title: "Rittenhouse, February",
  date: "2026-02", location: "Philadelphia, PA", size: "md",
  tags: ["street", "winter"], camera: "Leica M6", lens: "35mm", aperture: "f/5.6",
  alt: "Bare trees over a fountain in winter light" },
```

3. Commit and push. GitHub Pages rebuilds automatically, usually within a
   minute or two.

`size` is `"lg"`, `"md"`, or `"sm"` — it sets how much grid width the photo
takes. Mix them; a page where every photo is the same size stops looking
like a considered index and starts looking like a spreadsheet. Grid tiles
crop to a fixed 3:2 frame regardless of the source image's own aspect
ratio, so a portrait shot won't blow out the layout — the full, uncropped
image is always what opens in the lightbox.

`tags` is optional and free-form — every unique tag used across all
photos automatically becomes a filter chip above the gallery, so tagging
consistently (`"street"`, not sometimes `"streets"`) is the only thing
that matters. `camera`, `lens`, `aperture`, `shutter`, `iso`, and `film`
are also optional; whichever are filled in show up as a small spec line
at the bottom of the lightbox. Leave any out entirely if unknown — the
site only shows what's provided.

## Resizing and compressing — do this before every commit

Always resize and compress before committing. A modern phone photo can be
8–20 MB; a browser doesn't need that resolution, and git doesn't handle
large binaries gracefully — every version of every image ever committed
stays in the repo's history forever, even after it's deleted or replaced.
A folder of full-resolution originals will make the repo balloon over
time, and slow, bloated clones are the real cost of hosting images in git.

Target: **keep the original resolution where practical, JPEG quality
~85–90, aiming for 1–1.5 MB per image.** The lightbox has a click-to-zoom
view meant to show real detail, so resolution is the thing to protect —
compress toward the size target with quality first, and only downscale
resolution as a last resort for unusually detailed or grainy images
that won't fit the target at a reasonable quality floor (~q80). Those
still land well above the old flat 2200px cap.

With ImageMagick installed (`brew install imagemagick` on a Mac), this
compresses a whole folder of originals at once without touching
resolution:

```bash
mkdir -p resized
for f in originals/*.jpg; do
  magick "$f" -quality 88 -strip "resized/$(basename "$f")"
done
```

`-strip` drops EXIF/location metadata from the copy — worth doing either
way, since photos can carry GPS coordinates of where they were taken.

Without ImageMagick, [squoosh.app](https://squoosh.app) does the same
thing in the browser, one image at a time, with a size-vs-quality slider.
WebP gets smaller files than JPEG at equivalent quality if that's
preferred — browsers all support it now — but JPEG remains the safer
default.

## Publishing on GitHub Pages

This repo is `michaelprendergast/michaelprendergast.github.io` —
deployed from `main`, root folder, via **Settings → Pages → Build and
deployment → Source → Deploy from a branch**. The repo name matches the
owner account exactly, so GitHub serves it at the bare root domain:

```
https://michaelprendergast.github.io
```

Every update is: resize the image, add its entry to `photos.js`, commit,
push. Deploys typically land within a minute or two; a hard refresh
clears any stale cached copy of the page.

### Limits worth knowing (none of these matter at this scale)

- **100 MB** hard cap per file in a normal git repo (a compressed photo
  will never come close).
- **1 GB** is GitHub's recommended repo size before things feel sluggish;
  it can go well beyond that before anything actually breaks.
- **100 GB/month** soft bandwidth limit for Pages sites — effectively
  unreachable for a personal portfolio.

At the current ~1–1.5 MB per photo target, even several hundred curated
images stays in the few-hundred-MB range — nowhere near GitHub's actual
limits, though noticeably heavier than the old 200–500 KB target (worth
knowing since every version of every image stays in git history forever,
this repo's `.git` folder is already larger than the working files on
disk). Git LFS or an external image CDN still aren't worth the added
complexity at this size; that starts paying for itself in the
thousands-of-images range, or if responsive transform-on-request images
are needed. Cloudinary or imgix (generous free tiers) are the standard
choices if that point is ever reached — the site would stay on GitHub
Pages and `<img>` tags would just point at the CDN instead of `/images`.

## Planned: mixed media

The site is meant to eventually hold audio recordings and short written
pieces alongside photographs, not just photos. Not built yet — noted here
so the direction is clear before it's implemented:

- The manifest would generalize from a photo-only array to a list of
  entries with a `type` field (`"photo"` | `"audio"` | `"text"`,
  defaulting to `"photo"` for backward compatibility with existing
  entries).
- Each type gets its own tile treatment in the grid (a play control for
  audio, an excerpt for text) and its own expanded view in place of, or
  alongside, the current lightbox.
- Filtering by tag and sorting by date stay shared across all types, so
  the index reads as one continuous timeline rather than three separate
  sections.
