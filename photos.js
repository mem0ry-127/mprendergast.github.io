/*
  PHOTOS is the entire content of the site.
  To add a photograph:
    1. Resize/compress the image (see README.md) and drop it in /images.
    2. Add one entry below, at the TOP of the array (newest first).

  Fields:
    file      required — path to the image, relative to the site root
    title     required — short caption
    date      required — "YYYY-MM" or "YYYY-MM-DD"
    location  optional — leave as "" to omit
    size      required — "lg" | "md" | "sm", controls the grid module
              (roughly: lg = wide feature, md = standard, sm = compact —
              mix them so the grid doesn't fall into a flat repeating pattern)
    alt       required — plain description, for screen readers, not a caption

  These first entries are placeholder demo graphics, not photographs.
  Delete them once you've added your own.
*/

const PHOTOS = [
  { file: "images/01-demo.svg", title: "Sample frame — replace me", date: "2026-01", location: "Philadelphia, PA", size: "lg", alt: "Abstract demo graphic, overlapping circle and diagonal bar" },
  { file: "images/02-demo.svg", title: "Sample frame — replace me", date: "2026-01", location: "", size: "md", alt: "Abstract demo graphic, quarter circle in corner" },
  { file: "images/03-demo.svg", title: "Sample frame — replace me", date: "2025-12", location: "Mt. Airy, Philadelphia", size: "sm", alt: "Abstract demo graphic, grid of small dots" },
  { file: "images/04-demo.svg", title: "Sample frame — replace me", date: "2025-12", location: "", size: "sm", alt: "Abstract demo graphic, single diagonal line" },
  { file: "images/05-demo.svg", title: "Sample frame — replace me", date: "2025-11", location: "Wissahickon Valley", size: "md", alt: "Abstract demo graphic, concentric circles" },
  { file: "images/06-demo.svg", title: "Sample frame — replace me", date: "2025-11", location: "", size: "lg", alt: "Abstract demo graphic, offset rectangles" },
  { file: "images/07-demo.svg", title: "Sample frame — replace me", date: "2025-10", location: "Philadelphia, PA", size: "sm", alt: "Abstract demo graphic, radiating lines" },
  { file: "images/08-demo.svg", title: "Sample frame — replace me", date: "2025-10", location: "", size: "md", alt: "Abstract demo graphic, two circles and a bar" },
];
