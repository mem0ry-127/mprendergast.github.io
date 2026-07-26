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
  { file: "images/MPP03325.JPEG", title: "cmp", date: "2026-07-25", location: "Philadelphia, PA", size: "lg", alt: "" },
];
