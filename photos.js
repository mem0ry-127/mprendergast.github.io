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

  { file: "images/oregon/2022-10-fog-line.jpg", title: "Fog line", date: "2022-10",
    location: "Oregon", size: "lg", tags: ["landscape"],
    film: "Ilford HP5",
    alt: "A person standing in tall grass on a fog-covered cliff top, pine trees emerging from the mist" },

  { file: "images/oregon/2022-10-sea-stack.jpg", title: "Sea stack", date: "2022-10",
    location: "Oregon", size: "md", tags: ["landscape", "coast"],
    film: "Ilford HP5",
    alt: "A rocky sea stack and cliff face above rough surf, seen from above in overcast light" },

  { file: "images/cape-may-point/2022-07-beach-portrait.jpg", title: "Beach portrait", date: "2022-07",
    location: "Cape May Point, NJ", size: "md", tags: ["beach", "portrait"],
    film: "Kodak Portra 400",
    alt: "A woman smiling at the camera on a beach, dune grass and a distant house behind her" },

  { file: "images/cape-may-point/2022-07-volleyball.jpg", title: "Evening volleyball", date: "2022-07",
    location: "Cape May Point, NJ", size: "sm", tags: ["beach"],
    film: "Kodak Portra 400",
    alt: "Three friends playing beach volleyball at dusk, one leaping to hit the ball" },

  { file: "images/spain/2022-06-collapse.jpg", title: "Collapse", date: "2022-06",
    location: "Spain", size: "lg", tags: ["architecture"],
    film: "Kodak Portra 400",
    alt: "The rubble of a collapsed building with vines growing through it, intact houses visible above" },

  { file: "images/spain/2022-06-bar-polvorin.jpg", title: "Bar Polvorín", date: "2022-06",
    location: "Spain", size: "sm", tags: ["street"],
    film: "Kodak Portra 400",
    alt: "A weathered hanging sign reading Bar Polvorin next to a faded Coca-Cola panel, photographed from below against a blue sky" },

  { file: "images/spain/2022-06-hillside-village.jpg", title: "Hillside village", date: "2022-06",
    location: "Spain", size: "md", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "A hillside Spanish village of stone and whitewashed houses above a river, flowering oleander in the foreground" },

  { file: "images/spain/2022-06-mountain-road.jpg", title: "Mountain road", date: "2022-06",
    location: "Spain", size: "sm", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "A winding road through scrubland toward a rocky ridge, seen from a moving car" },

  { file: "images/spain/2022-06-ridge.jpg", title: "Ridge, from the car", date: "2022-06",
    location: "Spain", size: "md", tags: ["landscape"],
    film: "Kodak Portra 400",
    alt: "A rocky mountain ridge under a blue sky with scattered clouds, seen through a car window" },

];
