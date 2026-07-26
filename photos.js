/*
  PHOTOS is the entire content of the site.
  To add a photograph:
    1. Resize/compress the image (see README.md) and drop it in /images.
    2. Add one entry below, at the TOP of the array (newest first).

  Required fields:
    file      path to the image, relative to the site root
    title     short caption
    date      "YYYY-MM" or "YYYY-MM-DD"
    size      "lg" | "md" | "sm" — controls the grid module width.
              Mix these so the grid doesn't fall into a flat repeating
              pattern; roughly lg = wide feature, md = standard, sm = compact.
    alt       plain description, for screen readers — not a caption

  Optional fields (omit any you don't want to bother with — the site
  hides anything blank rather than showing empty punctuation):
    location  e.g. "Philadelphia, PA"
    tags      array of short lowercase strings, e.g. ["street","winter"].
              Every unique tag across all photos becomes a filter chip
              above the gallery automatically — no extra setup.
    camera, lens, aperture, shutter, iso, film
              shown as a small spec line at the bottom of the lightbox
              only, to keep the grid view uncluttered. Fill in whichever
              you actually know; leave the rest out.

  These first entries are placeholder demo graphics, not photographs —
  delete them once you've added your own.
*/

const PHOTOS = [
  { file: "images/01-demo.svg", title: "Sample frame — replace me", date: "2026-01",
    location: "Philadelphia, PA", size: "lg", tags: ["circle", "geometry"],
    camera: "Demo View 4x5", lens: "150mm", aperture: "f/8", shutter: "1/60", iso: "100",
    alt: "Abstract demo graphic, overlapping circle and diagonal bar" },

  { file: "images/02-demo.svg", title: "Sample frame — replace me", date: "2026-01",
    size: "md", tags: ["arc"],
    alt: "Abstract demo graphic, quarter circle in corner" },

  { file: "images/03-demo.svg", title: "Sample frame — replace me", date: "2025-12",
    location: "Mt. Airy, Philadelphia", size: "sm", tags: ["dots", "grid"],
    camera: "Demo Rangefinder", lens: "35mm", aperture: "f/5.6",
    alt: "Abstract demo graphic, grid of small dots" },

  { file: "images/04-demo.svg", title: "Sample frame — replace me", date: "2025-12",
    size: "sm", tags: ["line"],
    alt: "Abstract demo graphic, single diagonal line" },

  { file: "images/05-demo.svg", title: "Sample frame — replace me", date: "2025-11",
    location: "Wissahickon Valley", size: "md", tags: ["circle"],
    film: "Demo 400", iso: "400",
    alt: "Abstract demo graphic, concentric circles" },

  { file: "images/06-demo.svg", title: "Sample frame — replace me", date: "2025-11",
    size: "lg", tags: ["geometry"],
    alt: "Abstract demo graphic, offset rectangles" },

  { file: "images/07-demo.svg", title: "Sample frame — replace me", date: "2025-10",
    location: "Philadelphia, PA", size: "sm", tags: ["line", "geometry"],
    alt: "Abstract demo graphic, radiating lines" },

  { file: "images/08-demo.svg", title: "Sample frame — replace me", date: "2025-10",
    size: "md", tags: ["circle"],
    camera: "Demo Rangefinder", lens: "50mm", aperture: "f/2", shutter: "1/125", iso: "200",
    alt: "Abstract demo graphic, two circles and a bar" },
];
