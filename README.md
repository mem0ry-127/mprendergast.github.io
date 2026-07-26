# photographs

A minimal, Swiss-grid photo index. Static HTML/CSS/JS — no build step, no framework.

## Structure

```
index.html      page shell
styles.css      all styling (design tokens at the top)
photos.js       ← the only file you edit routinely: the list of photos
script.js       renders the grid + lightbox from photos.js
images/         the actual image files (currently 8 placeholder .svg graphics)
```

## Adding a photo

1. Resize and compress the image first (see below) — save it into `images/`,
   e.g. `images/2026-02-rittenhouse.jpg`.
2. Open `photos.js` and add one entry near the top of the `PHOTOS` array:

```js
{ file: "images/2026-02-rittenhouse.jpg", title: "Rittenhouse, February",
  date: "2026-02", location: "Philadelphia, PA", size: "md",
  tags: ["street", "winter"], camera: "Leica M6", lens: "35mm", aperture: "f/5.6",
  alt: "Bare trees over a fountain in winter light" },
```

3. Delete the `-demo.svg` placeholder entries (and files) once you have a
   few real photos in — they're just there so the grid isn't empty on first load.
4. Commit and push. GitHub Pages rebuilds automatically, usually within a
   minute or two.

`size` is `"lg"`, `"md"`, or `"sm"` — it sets how much grid width the photo
takes. Mix them; a page where every photo is the same size stops looking
like a considered index and starts looking like a spreadsheet.

`tags` is optional and free-form — every unique tag used across all your
photos automatically becomes a filter chip above the gallery, so tagging
consistently (`"street"`, not sometimes `"streets"`) is the only thing
that matters. `camera`, `lens`, `aperture`, `shutter`, `iso`, and `film`
are also optional; whichever you fill in show up as a small spec line at
the bottom of the full-size lightbox view. Leave any of them out entirely
if you don't want to bother — the site only shows what you provide.

## Resizing and compressing — do this before every commit

Short answer to your question: **yes, always resize and compress before
committing.** A modern phone photo can be 8–20 MB; a browser doesn't need
that resolution, and git repositories don't handle large binary files
gracefully — every version of every image you ever commit stays in the
repo's history forever, even if you later delete or replace it. A folder of
full-resolution JPEGs will make your repo balloon over months of use, and
slow, bloated clones are the main real downside of hosting images in git.

Target: **long edge around 2000–2400px, JPEG quality ~80, aiming for
150–500 KB per image.** That's indistinguishable from full-res on a screen
but a fraction of the file size.

If you have ImageMagick installed (`brew install imagemagick` on a Mac),
this resizes and compresses everything in a folder of originals in one go:

```bash
mkdir -p resized
for f in originals/*.jpg; do
  magick "$f" -resize 2200x2200\> -quality 82 -strip "resized/$(basename "$f")"
done
```

`-strip` drops EXIF/location metadata from the copy — worth knowing either
way, since by default photos can carry GPS coordinates of where they were
taken.

No terminal tools installed? [squoosh.app](https://squoosh.app) does the
same thing in the browser, one image at a time, with a size-vs-quality
slider so you can see the trade-off directly. WebP will get you smaller
files than JPEG at equivalent quality if you want to use it instead —
browsers all support it now — but JPEG is the safer default if you'd rather
not think about it.

## Publishing on GitHub Pages

1. Push this folder to a new GitHub repository.
2. In the repo: **Settings → Pages → Build and deployment → Source** →
   "Deploy from a branch" → branch `main`, folder `/ (root)` → Save.
3. Your site is live at `https://<username>.github.io/<repo-name>/`
   within a minute or two. (If the repo is named `<username>.github.io`
   exactly, it's served at the bare `https://<username>.github.io` instead.)
4. Every future update is: add the image, add its entry to `photos.js`,
   `git add -A && git commit -m "add photo" && git push`.

### Limits worth knowing (none of these matter at your scale)

- **100 MB** hard cap per file in a normal git repo (a compressed photo
  will never come close to this).
- **1 GB** is GitHub's recommended repo size before things start feeling
  sluggish; it can go well beyond that before anything breaks.
- **100 GB/month** soft bandwidth limit for Pages sites, effectively
  unreachable for a personal portfolio.

A "few dozen" curated photos at 200–400 KB each is a few megabytes total —
nowhere near any of these. Don't reach for Git LFS or an external image CDN
for a project this size; it adds complexity that only starts paying for
itself in the hundreds-of-images range or if you need automatic responsive
resizing at request time. If the collection eventually grows large or you
want that kind of transform-on-request behavior, Cloudinary or imgix
(generous free tiers) are the standard choices — you'd keep the site on
GitHub Pages and just point `<img>` tags at the CDN instead of `/images`.
