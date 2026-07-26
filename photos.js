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
*/

const PHOTOS = [
  { file: "images/MPP03325.jpg", title: "Rescue boat, dusk", date: "2026-07-22",
    location: "Cape May Point, NJ", size: "lg", tags: ["beach"],
    camera: "Sony a6400", lens: "16-50mm", aperture: "f/4.5", shutter: "1/160", iso: "1000",
    alt: "A white lifeguard rescue boat resting on its beach trailer at dusk, dune grass and shoreline in the background" },

];
